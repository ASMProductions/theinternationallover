import crypto from "crypto";
import nodemailer from "nodemailer";

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redisSet(key, value, exSeconds) {
  const url = exSeconds
    ? `${REDIS_URL}/set/${encodeURIComponent(key)}/${encodeURIComponent(value)}/ex/${exSeconds}`
    : `${REDIS_URL}/set/${encodeURIComponent(key)}/${encodeURIComponent(value)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
  });
  return res.json();
}

async function redisPush(key, value) {
  const res = await fetch(`${REDIS_URL}/lpush/${encodeURIComponent(key)}/${encodeURIComponent(value)}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
  });
  return res.json();
}

export const config = { api: { bodyParser: true } };

async function sendAccessEmail(to, name, magicLink) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: true,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  await transporter.sendMail({
    from: `"The International Lover" <${process.env.SMTP_USER}>`,
    to,
    subject: "Your Access Link — The International Lover™",
    html: `
      <div style="background:#050d1a;padding:40px;font-family:Georgia,serif;color:#f0e6cc;max-width:520px;margin:0 auto;">
        <div style="text-align:center;margin-bottom:32px;">
          <div style="font-size:11px;letter-spacing:0.35em;color:#b8963e;font-family:sans-serif;margin-bottom:8px;">THE INTERNATIONAL LOVER™</div>
          <div style="font-size:11px;letter-spacing:0.2em;color:#5a4e32;font-family:sans-serif;">ASM PRODUCTIONS LLC</div>
        </div>
        <div style="border:1px solid #b8963e;padding:32px;">
          <p style="font-size:15px;color:#c8b890;line-height:1.85;margin-bottom:8px;">Welcome${name ? ", " + name : ""}.</p>
          <p style="font-size:14px;color:#c8b890;line-height:1.85;margin-bottom:24px;">
            Your registration is confirmed. Click below to enter the platform and create your profile.
          </p>
          <div style="text-align:center;">
            <a href="${magicLink}" style="display:inline-block;padding:14px 36px;background:#b8963e;color:#050d1a;font-family:sans-serif;font-size:13px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;">Enter the Platform →</a>
          </div>
          <p style="font-size:11px;color:#5a4e32;margin-top:24px;font-family:sans-serif;text-align:center;">This link expires in 15 minutes. Return to theinternationallover.com/for-women to request a new one.</p>
        </div>
        <div style="text-align:center;margin-top:24px;font-size:10px;color:#3a2e18;font-family:sans-serif;letter-spacing:0.1em;">theinternationallover.com</div>
      </div>
    `,
  });
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const body = req.body || {};
  const email = (body.email || "").trim().toLowerCase();
  const name = (body.name || "").trim();
  const source = body.source || "unknown";

  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  try {
    // Save lead
    const leadKey = "il:lead:" + email.replace(/[^a-z0-9]/g, "_");
    await redisSet(leadKey, JSON.stringify({ email, name, source, approved: true, createdAt: Date.now() }));
    await redisPush("il:leads:index", email);

    // Grant access
    await redisSet(`il:paid:${email}`, "true");

    // Generate magic link token (15 min TTL)
    const token = crypto.randomBytes(32).toString("hex");
    await redisSet(`il:magic:${token}`, email, 900);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://theinternationallover.com";
    const magicLink = `${baseUrl}/magic-link?token=${token}&type=women`;

    // Send email — isolated so failure doesn't block registration
    try {
      await sendAccessEmail(email, name, magicLink);
    } catch(emailErr) {
      console.error("Email send failed:", emailErr.message);
    }

    return res.status(200).json({ ok: true });

  } catch(e) {
    console.error("lead-capture error:", String(e));
    return res.status(500).json({ error: String(e) });
  }
}
