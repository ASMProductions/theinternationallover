import crypto from "crypto";

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redisSet(key, value, exSeconds) {
  const res = await fetch(`${REDIS_URL}/set/${encodeURIComponent(key)}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ value, ex: exSeconds }),
  });
  return res.json();
}

async function redisGet(key) {
  const res = await fetch(`${REDIS_URL}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
  });
  const data = await res.json();
  return data.result;
}

async function sendEmail(to, magicLink) {
  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.default.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: true,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  await transporter.sendMail({
    from: `"The International Lover" <${process.env.SMTP_USER}>`,
    to,
    subject: "Your Access Link — The International Lover",
    html: `
      <div style="background:#050d1a;padding:40px;font-family:Georgia,serif;color:#f0e6cc;max-width:520px;margin:0 auto;">
        <div style="text-align:center;margin-bottom:32px;">
          <div style="font-size:11px;letter-spacing:0.35em;color:#b8963e;font-family:sans-serif;margin-bottom:8px;">THE INTERNATIONAL LOVER™</div>
          <div style="font-size:11px;letter-spacing:0.2em;color:#5a4e32;font-family:sans-serif;">ASM PRODUCTIONS LLC</div>
        </div>
        <div style="border:1px solid #b8963e;padding:32px;text-align:center;">
          <p style="font-size:15px;color:#c8b890;line-height:1.85;margin-bottom:24px;">Your access link is ready. Click below to enter the platform.</p>
          <a href="${magicLink}" style="display:inline-block;padding:14px 36px;background:#b8963e;color:#050d1a;font-family:sans-serif;font-size:13px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;">Enter the Platform →</a>
          <p style="font-size:11px;color:#5a4e32;margin-top:24px;font-family:sans-serif;">This link expires in 15 minutes. If you did not request this, disregard.</p>
        </div>
        <div style="text-align:center;margin-top:24px;font-size:10px;color:#3a2e18;font-family:sans-serif;letter-spacing:0.1em;">theinternationallover.com</div>
      </div>
    `,
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required." });

  const emailLower = email.toLowerCase().trim();
  const paidKey = `il:paid:${emailLower}`;
  const paid = await redisGet(paidKey);
  if (!paid) return res.status(200).json({ sent: false, error: "No purchase found for this email. Please enroll below or use your access code." });

  const token = crypto.randomBytes(32).toString("hex");
  await redisSet(`il:magic:${token}`, emailLower, 900);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://theinternationallover.com";
  const magicLink = `${baseUrl}/api/verify-magic-link?token=${token}`;

  try {
    await sendEmail(emailLower, magicLink);
    return res.status(200).json({ sent: true });
  } catch (err) {
    console.error("Email error:", err);
    return res.status(500).json({ error: "Failed to send email. Please try again." });
  }
}
