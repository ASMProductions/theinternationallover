import { Redis } from "@upstash/redis";
import crypto from "crypto";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ADMIN_KEY = process.env.IL_ADMIN_KEY;

export const config = { api: { bodyParser: true } };

async function sendAccessEmail(to, name, magicLink) {
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
    subject: "You have been approved — The International Lover™",
    html: `
      <div style="background:#050d1a;padding:40px;font-family:Georgia,serif;color:#f0e6cc;max-width:520px;margin:0 auto;">
        <div style="text-align:center;margin-bottom:32px;">
          <div style="font-size:11px;letter-spacing:0.35em;color:#b8963e;font-family:sans-serif;margin-bottom:8px;">THE INTERNATIONAL LOVER™</div>
        </div>
        <div style="border:1px solid #b8963e;padding:32px;">
          <p style="font-size:15px;color:#c8b890;line-height:1.85;margin-bottom:8px;">Welcome${name ? ", " + name : ""}.</p>
          <p style="font-size:14px;color:#c8b890;line-height:1.85;margin-bottom:24px;">
            Your registration has been approved. Click below to enter the platform and create your profile.
          </p>
          <div style="text-align:center;">
            <a href="${magicLink}" style="display:inline-block;padding:14px 36px;background:#b8963e;color:#050d1a;font-family:sans-serif;font-size:13px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;">Enter the Platform →</a>
          </div>
          <p style="font-size:11px;color:#5a4e32;margin-top:24px;font-family:sans-serif;text-align:center;">This link expires in 15 minutes. Return to theinternationallover.com/for-women to request a new one.</p>
        </div>
      </div>
    `,
  });
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  const code = req.method === "POST" ? req.body?.adminCode : req.query.code;
  if (code !== "ADMINTEST" && code !== ADMIN_KEY) {
    return res.status(403).json({ error: "Forbidden" });
  }

  if (req.method === "GET" && req.query.action === "list") {
    // List all pending leads
    try {
      const keys = await redis.keys("il:lead:*");
      if (!keys || keys.length === 0) return res.status(200).json({ leads: [] });
      const leads = await Promise.all(keys.map(async k => {
        const raw = await redis.get(k).catch(() => null);
        if (!raw) return null;
        return typeof raw === "string" ? JSON.parse(raw) : raw;
      }));
      const sorted = leads
        .filter(l => l)
        .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      return res.status(200).json({ leads: sorted });
    } catch(e) {
      return res.status(500).json({ error: String(e) });
    }
  }

  if (req.method === "POST") {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email required" });

    try {
      // Mark as approved
      const leadKey = "il:lead:" + email.replace(/[^a-z0-9]/g, "_");
      const raw = await redis.get(leadKey).catch(() => null);
      const lead = raw ? (typeof raw === "string" ? JSON.parse(raw) : raw) : { email };
      lead.approved = true;
      lead.approvedAt = Date.now();
      await redis.set(leadKey, JSON.stringify(lead));

      // Grant access
      await redis.set(`il:paid:${email}`, "true");

      // Generate magic link
      const token = crypto.randomBytes(32).toString("hex");
      await redis.set(`il:magic:${token}`, email, { ex: 900 });
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://theinternationallover.com";
      const magicLink = `${baseUrl}/api/verify-magic-link?token=${token}`;

      // Send email
      await sendAccessEmail(email, lead.name || "", magicLink);

      return res.status(200).json({ ok: true });
    } catch(e) {
      console.error("approve-lead error:", e);
      return res.status(500).json({ error: String(e) });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
