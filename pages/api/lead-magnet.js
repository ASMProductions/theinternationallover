// pages/api/lead-magnet.js
// Saves email to Redis and sends the Vetting Standard PDF via SMTP.

import nodemailer from "nodemailer";

const REDIS_URL   = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const PDF_URL  = "https://theinternationallover.com/vetting_standard.pdf";
const LIST_KEY = "leads:vetting-standard";

async function redisCmd(...args) {
  const r = await fetch(REDIS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });
  return r.json();
}

async function sendGuide(email) {
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
    from: `"The International Lover™" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Your Free Guide — The Vetting Standard",
    html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#091a35;font-family:Georgia,serif;">
  <div style="max-width:560px;margin:0 auto;padding:2rem 1.5rem;">
    <div style="text-align:center;margin-bottom:2rem;padding-bottom:1.5rem;border-bottom:1px solid #1e3a6e;">
      <div style="font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:#b8963e;margin-bottom:6px;font-family:sans-serif;">The International Lover™</div>
      <div style="color:#d4af6a;font-size:20px;font-family:Georgia,serif;">The Vetting Standard</div>
    </div>
    <p style="color:#c8c0b0;font-size:15px;line-height:1.85;margin-bottom:1.25rem;">
      The man who vets correctly never has to recover from what he should have seen coming.
    </p>
    <p style="color:#c8c0b0;font-size:15px;line-height:1.85;margin-bottom:2rem;">
      Your copy of <strong style="color:#d4af6a;">The Vetting Standard — How To Know She Is Real Before You Board The Plane</strong> is ready. Click below to download it.
    </p>
    <div style="text-align:center;margin-bottom:2.5rem;">
      <a href="${PDF_URL}" style="display:inline-block;background:#b8963e;color:#091a35;text-decoration:none;padding:14px 36px;font-size:14px;font-weight:bold;font-family:sans-serif;letter-spacing:0.1em;">Download the Guide →</a>
    </div>
    <p style="color:#8a7a5a;font-size:12px;line-height:1.8;margin-bottom:0.5rem;font-family:sans-serif;">
      If the button does not work, copy and paste this link into your browser:
    </p>
    <p style="color:#b8963e;font-size:11px;word-break:break-all;margin-bottom:2rem;font-family:sans-serif;">${PDF_URL}</p>
    <div style="border-top:1px solid #1e3a6e;padding-top:1.5rem;">
      <p style="color:#8a7a5a;font-size:12px;line-height:1.8;font-family:sans-serif;">
        When you are ready to go deeper — the book, the virtual simulation with 22 women across six regions, and the matrimonial platform — are inside the platform at
        <a href="https://theinternationallover.com" style="color:#b8963e;">theinternationallover.com</a>.
      </p>
    </div>
    <div style="margin-top:2rem;text-align:center;">
      <div style="font-size:9px;color:#2a3a5a;font-family:sans-serif;letter-spacing:0.15em;">© ASM Productions LLC · theinternationallover.com</div>
    </div>
  </div>
</body>
</html>`,
    text: `The Vetting Standard — How To Know She Is Real Before You Board The Plane\n\nDownload your guide here:\n${PDF_URL}\n\nWhen you are ready to go deeper, visit theinternationallover.com.\n\n— The International Lover™`,
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email } = req.body || {};
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Valid email required." });
  }

  const clean = email.toLowerCase().trim();

  try {
    if (REDIS_URL && REDIS_TOKEN) {
      await redisCmd("SADD", LIST_KEY, clean);
    }
    await sendGuide(clean);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("IL lead-magnet error:", err.message);
    return res.status(500).json({ error: "Could not send the guide. Please try again." });
  }
}
