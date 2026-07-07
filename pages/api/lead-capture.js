// pages/api/lead-capture.js — women's free registration for The International Lover™
// Saves lead, grants women's access, sends magic link via the new /api/auth flow.
// Updated: tokens now use il:login:{token} (command-in-body Redis format) and
// the link points to /api/auth?token= so women get the same 30-day cookie session.

import crypto from "crypto";
import nodemailer from "nodemailer";
export const config = { api: { bodyParser: true } };

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

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const body = req.body || {};
  const email = (body.email || "").toLowerCase().trim();
  const name = (body.name || "").trim();
  const source = body.source || "unknown";

  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  try {
    // Save lead
    const leadKey = "il:lead:" + email.replace(/[^a-z0-9]/g, "_");
    await redis([
      "SET",
      leadKey,
      JSON.stringify({ email, name, source, approved: true, createdAt: Date.now() }),
    ]);
    await redis(["LPUSH", "il:leads:index", email]);

    // Grant women's access
    await redis(["SET", `il:paid:${email}`, "true"]);

    // Store gender so magic links route to /matrimonial
    await redis(["SET", `il:gender:${email}`, "woman"]);

    // Generate one-time login token — new auth flow
    const token = crypto.randomBytes(24).toString("hex");
    await redis(["SET", `il:login:${token}`, email, "EX", "900"]); // 15 min

    const magicLink = `https://www.theinternationallover.com/api/auth?token=${token}`;

    // Send email
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "465"),
        secure: true,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      await transporter.sendMail({
        from: `"The International Lover" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Your Access Link — The International Lover™",
        html: `
          <div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;padding:2rem;background:#050d1a;color:#c8b890;border-radius:8px;">
            <div style="text-align:center;margin-bottom:1.5rem;">
              <div style="font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:#b8963e;margin-bottom:8px;font-family:sans-serif;">THE INTERNATIONAL LOVER™</div>
            </div>
            <p style="color:#c8b890;line-height:1.8;">Welcome${name ? ", " + name : ""}. Click below to enter the platform and create your profile. This link works once and expires in 15 minutes. After you sign in, you will stay signed in for 30 days on this device.</p>
            <div style="text-align:center;margin:2rem 0;">
              <a href="${magicLink}" style="display:inline-block;padding:14px 32px;background:#b8963e;color:#050d1a;text-decoration:none;border-radius:24px;font-size:15px;font-weight:700;font-family:sans-serif;">Enter the Platform →</a>
            </div>
            <p style="font-size:12px;color:#5a4e32;text-align:center;font-family:sans-serif;">This link expires in 15 minutes. Return to theinternationallover.com/for-women to request a new one.</p>
            <p style="font-size:12px;color:#5a4e32;text-align:center;font-family:sans-serif;">If the button does not work, copy and paste this link:<br>${magicLink}</p>
          </div>
        `,
      });
    } catch (e) {
      console.error("Email failed:", e.message);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Lead capture error:", err.message);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
