// pages/api/auth.js — platform access for The International Lover™
// POST { email } -> if paid (il:paid:{email}), email a magic link
// GET  ?token=x  -> validate one-time login token, set cookie, redirect
//                   men -> /   women (il:gender = woman) -> /matrimonial
// Sessions: il:session:{token} -> email, 30-day expiry.
// Session index: il:sessions:{email} -> set of session tokens (for refund revocation).
// SEPARATE SYSTEM — IL keys only. No access to MLF or TVG.
// Uses raw Upstash fetch (command-in-body) per established pattern.

import nodemailer from "nodemailer";
import crypto from "crypto";

const SITE = "https://www.theinternationallover.com";
const SESSION_DAYS = 30;

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
  const data = await r.json();
  return data.result;
}

function newToken() {
  return crypto.randomBytes(24).toString("hex");
}

function sessionCookie(token) {
  const maxAge = SESSION_DAYS * 24 * 60 * 60;
  return `il_session=${token}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`;
}

export default async function handler(req, res) {
  // ---- Magic-link landing ----
  if (req.method === "GET") {
    const { token } = req.query || {};
    if (!token) return res.redirect("/");
    try {
      const email = await redis(["GETDEL", `il:login:${token}`]);
      if (!email) {
        return res.redirect("/?error=expired");
      }
      const session = newToken();
      const ttl = String(SESSION_DAYS * 24 * 60 * 60);
      await redis(["SET", `il:session:${session}`, email, "EX", ttl]);
      // Index the session by email so a refund can revoke it instantly
      await redis(["SADD", `il:sessions:${email}`, session]);
      await redis(["EXPIRE", `il:sessions:${email}`, ttl]);
      res.setHeader("Set-Cookie", sessionCookie(session));
      // Women registered through /for-women go to the matrimonial platform
      const gender = await redis(["GET", `il:gender:${email}`]);
      if (gender === "woman") return res.redirect("/matrimonial");
      return res.redirect("/");
    } catch {
      return res.redirect("/?error=server");
    }
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body || {};
  if (!email) {
    return res.status(400).json({ error: "Please enter your email address." });
  }

  const clean = String(email).toLowerCase().trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  try {
    const paid = await redis(["GET", `il:paid:${clean}`]);
    // Always answer the same way, so addresses can't be fished.
    if (paid) {
      const token = newToken();
      await redis(["SET", `il:login:${token}`, clean, "EX", "900"]); // 15 min
      const link = `${SITE}/api/auth?token=${token}`;

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "465"),
        secure: parseInt(process.env.SMTP_PORT || "465") === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"The International Lover" <${process.env.SMTP_USER}>`,
        to: clean,
        subject: "Your access link — The International Lover™",
        text:
          "Here is your sign-in link for the platform:\n" +
          link +
          "\n\nThis link works once and expires in 15 minutes. " +
          "Once you sign in, you will stay signed in for 30 days on this device.\n\n" +
          "The International Lover™\n" + SITE,
        html: `
          <div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;padding:2rem;background:#050d1a;color:#c8b890;border-radius:8px;">
            <div style="text-align:center;margin-bottom:1.5rem;">
              <div style="font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:#b8963e;margin-bottom:8px;font-family:sans-serif;">THE INTERNATIONAL LOVER™</div>
            </div>
            <p style="color:#c8b890;line-height:1.8;">Click the link below to access the platform. This link works once and expires in 15 minutes. After you sign in, you will stay signed in for 30 days on this device.</p>
            <div style="text-align:center;margin:2rem 0;">
              <a href="${link}" style="display:inline-block;padding:14px 32px;background:#b8963e;color:#050d1a;text-decoration:none;border-radius:24px;font-size:15px;font-weight:700;font-family:sans-serif;">
                Enter the Platform →
              </a>
            </div>
            <p style="font-size:12px;color:#5a4e32;text-align:center;font-family:sans-serif;">If you did not request this link you can ignore this email.</p>
            <p style="font-size:12px;color:#5a4e32;text-align:center;font-family:sans-serif;">If the button does not work, copy and paste this link:<br>${link}</p>
          </div>
        `,
      });
    }
    return res.status(200).json({
      sent: true,
      message:
        "If that email has platform access, a sign-in link is on its way. Check your inbox (and spam folder).",
    });
  } catch (err) {
    console.error("IL auth error:", err.message);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
