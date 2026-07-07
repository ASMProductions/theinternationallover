// pages/api/stripe-webhook.js — grants AND revokes platform access for The International Lover™
// checkout.session.completed / customer.subscription.created / invoice.payment_succeeded
//   -> SET il:paid:{email} true
// charge.refunded / customer.subscription.deleted
//   -> DEL il:paid:{email} + destroy all active IL sessions for that email
// SEPARATE SYSTEM — IL keys only. Cannot touch MLF or TVG access.
// Env: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
// Uses raw Upstash fetch (command-in-body) per established pattern.

import Stripe from "stripe";
export const config = { api: { bodyParser: false } };
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function redis(cmd) {
  const r = await fetch(process.env.UPSTASH_REDIS_REST_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cmd),
  });
  if (!r.ok) throw new Error("Redis request failed");
  return (await r.json()).result;
}

function rawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

async function grantAccess(email) {
  const clean = email.toLowerCase().trim();
  await redis(["SET", `il:paid:${clean}`, "true"]);
  console.log("IL access granted:", clean);
}

async function revokeAccess(email) {
  const clean = email.toLowerCase().trim();
  // 1. Remove the paid flag — no new magic links can be issued
  await redis(["DEL", `il:paid:${clean}`]);
  // 2. Kill every active session — existing logins stop working immediately
  try {
    const tokens = await redis(["SMEMBERS", `il:sessions:${clean}`]);
    if (Array.isArray(tokens)) {
      for (const t of tokens) {
        await redis(["DEL", `il:session:${t}`]);
      }
    }
    await redis(["DEL", `il:sessions:${clean}`]);
  } catch (err) {
    console.error("Session revocation error:", err.message);
  }
  console.log("IL access revoked:", clean);
}

async function emailFromCustomer(customerId) {
  try {
    const customer = await stripe.customers.retrieve(customerId);
    return customer.email || null;
  } catch (err) {
    console.error("Could not retrieve customer:", err.message);
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  let event;
  try {
    const buf = await rawBody(req);
    const sig = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature failed:", err.message);
    return res.status(400).json({ error: err.message });
  }

  try {
    // ---- GRANTS ----
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const email = session.customer_details?.email || session.customer_email;
      if (email) await grantAccess(email);
    }
    if (event.type === "customer.subscription.created") {
      const sub = event.data.object;
      const email = await emailFromCustomer(sub.customer);
      if (email) await grantAccess(email);
    }
    if (event.type === "invoice.payment_succeeded") {
      const invoice = event.data.object;
      const email = invoice.customer_email;
      if (email) await grantAccess(email);
    }

    // ---- REVOCATIONS ----
    if (event.type === "charge.refunded") {
      const charge = event.data.object;
      let email = charge.billing_details?.email || charge.receipt_email;
      if (!email && charge.customer) email = await emailFromCustomer(charge.customer);
      if (email) await revokeAccess(email);
    }
    if (event.type === "customer.subscription.deleted") {
      const sub = event.data.object;
      const email = await emailFromCustomer(sub.customer);
      if (email) await revokeAccess(email);
    }
  } catch (err) {
    console.error("Webhook handling error:", err.message);
    return res.status(500).json({ error: "Webhook handler failed" });
  }

  return res.status(200).json({ received: true });
}
