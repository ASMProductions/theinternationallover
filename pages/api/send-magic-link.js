// pages/api/send-magic-link.js
import crypto from "crypto";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  const normalizedEmail = email.toLowerCase().trim();
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  // Check if email has paid
  const paidRes = await fetch(`${redisUrl}/get/il:paid:${normalizedEmail}`, {
    headers: { Authorization: `Bearer ${redisToken}` },
  });
  const paidData = await paidRes.json();

  if (!paidData.result) {
    return res.status(200).json({
      sent: false,
      error: "No purchase found for that email. Please use the email you paid with, or enroll below.",
    });
  }

  // Check if registered via for-women — if lead record exists, they are a woman
  const leadKey = "il:lead:" + normalizedEmail.replace(/[^a-z0-9]/g, "_");
  const leadRes = await fetch(`${redisUrl}/get/${leadKey}`, {
    headers: { Authorization: `Bearer ${redisToken}` },
  });
  const leadData = await leadRes.json();
  const isWoman = !!leadData.result;

  // Generate one-time token
  const token = crypto.randomBytes(32).toString("hex");
  const expiry = Date.now() + 15 * 60 * 1000;

  // Store token in Redis — value in URL path, TTL via separate EXPIRE
  await fetch(`${redisUrl}/set/il:magic:${token}/${encodeURIComponent(normalizedEmail + ":" + expiry)}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${redisToken}` },
  });
  await fetch(`${redisUrl}/expire/il:magic:${token}/900`, {
    method: "POST",
    headers: { Authorization: `Bearer ${redisToken}` },
  });

  const magicLink = `https://www.theinternationallover.com/magic-link?token=${token}${isWoman ? "&type=women" : ""}`;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"The International Lover" <${process.env.SMTP_USER}>`,
      to: normalizedEmail,
      subject: "Your access link — The International Lover™",
      html: `
        <div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;padding:2rem;background:#050d1a;color:#c8b890;border-radius:8px;">
          <div style="text-align:center;margin-bottom:1.5rem;">
            <div style="font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:#b8963e;margin-bottom:8px;font-family:sans-serif;">THE INTERNATIONAL LOVER™</div>
          </div>
          <p style="color:#c8b890;line-height:1.8;">Click the link below to access the platform. This link expires in 15 minutes and can only be used once.</p>
          <div style="text-align:center;margin:2rem 0;">
            <a href="${magicLink}" style="display:inline-block;padding:14px 32px;background:#b8963e;color:#050d1a;text-decoration:none;border-radius:24px;font-size:15px;font-weight:700;font-family:sans-serif;">
              Enter the Platform →
            </a>
          </div>
          <p style="font-size:12px;color:#5a4e32;text-align:center;font-family:sans-serif;">If you did not request this link you can ignore this email.</p>
          <p style="font-size:12px;color:#5a4e32;text-align:center;font-family:sans-serif;">If the button does not work, copy and paste this link:<br>${magicLink}</p>
        </div>
      `,
    });
    return res.status(200).json({ sent: true });
  } catch(emailErr) {
    console.error("SMTP error:", emailErr.message);
    return res.status(500).json({ sent: false, error: "Failed to send email. Please try again." });
  }
}
