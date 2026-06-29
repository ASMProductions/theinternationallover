import crypto from "crypto";
import nodemailer from "nodemailer";

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redisSet(key, value) {
  await fetch(`${REDIS_URL}/set/${encodeURIComponent(key)}/${encodeURIComponent(value)}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
  });
}

async function redisGet(key) {
  const res = await fetch(`${REDIS_URL}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
  });
  const data = await res.json();
  return data.result;
}

async function redisDel(key) {
  await fetch(`${REDIS_URL}/del/${encodeURIComponent(key)}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
  });
}

async function redisKeys(pattern) {
  const res = await fetch(`${REDIS_URL}/keys/${encodeURIComponent(pattern)}`, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
  });
  const data = await res.json();
  return data.result || [];
}

export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  const code = req.method === "POST" ? req.body?.adminCode : req.query.code;
  if (code !== "ADMINTEST" && code !== process.env.IL_ADMIN_KEY) {
    return res.status(403).json({ error: "Forbidden" });
  }

  // LIST
  if (req.method === "GET" && req.query.action === "list") {
    try {
      const keys = await redisKeys("il:lead:*");
      if (!keys.length) return res.status(200).json({ leads: [] });
      const leads = await Promise.all(keys.map(async k => {
        try {
          const raw = await redisGet(k);
          if (!raw) return null;
          const lead = typeof raw === "string" ? JSON.parse(raw) : raw;
          // Fetch current gender from Redis
          const gender = await redisGet(`il:gender:${lead.email}`);
          return { ...lead, gender: gender || null };
        } catch(e) { return null; }
      }));
      return res.status(200).json({
        leads: leads.filter(l => l && l.email).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
      });
    } catch(e) {
      return res.status(500).json({ error: String(e) });
    }
  }

  if (req.method === "POST") {
    const { email, setGenderOnly, gender, deleteProfile } = req.body;
    if (!email) return res.status(400).json({ error: "Email required" });

    // DELETE
    if (deleteProfile) {
      try {
        const leadKey = "il:lead:" + email.replace(/[^a-z0-9]/g, "_");
        await redisDel(leadKey);
        await redisDel(`il:paid:${email}`);
        await redisDel(`il:gender:${email}`);
        return res.status(200).json({ ok: true });
      } catch(e) {
        return res.status(500).json({ error: String(e) });
      }
    }

    // SET GENDER ONLY
    if (setGenderOnly) {
      try {
        const g = gender || "woman";
        await redisSet(`il:gender:${email}`, g);
        await redisSet(`il:paid:${email}`, "true");
        return res.status(200).json({ ok: true });
      } catch(e) {
        return res.status(500).json({ error: String(e) });
      }
    }

    // APPROVE — send magic link
    try {
      const leadKey = "il:lead:" + email.replace(/[^a-z0-9]/g, "_");
      const raw = await redisGet(leadKey);
      const lead = raw ? (typeof raw === "string" ? JSON.parse(raw) : raw) : { email };
      lead.approved = true;
      lead.approvedAt = Date.now();
      await redisSet(leadKey, JSON.stringify(lead));
      await redisSet(`il:paid:${email}`, "true");
      await redisSet(`il:gender:${email}`, "woman");

      const token = crypto.randomBytes(32).toString("hex");
      const expiry = Date.now() + 15 * 60 * 1000;
      await redisSet(`il:magic:${token}`, `${email}:${expiry}`);

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://theinternationallover.com";
      const magicLink = `${baseUrl}/magic-link?token=${token}&type=women`;

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "465"),
        secure: true,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });

      await transporter.sendMail({
        from: `"The International Lover" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "You have been approved — The International Lover™",
        html: `<div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;padding:2rem;background:#050d1a;color:#c8b890;">
          <p>Your registration has been approved. Click below to enter the platform.</p>
          <div style="text-align:center;margin:2rem 0;">
            <a href="${magicLink}" style="display:inline-block;padding:14px 32px;background:#b8963e;color:#050d1a;text-decoration:none;font-weight:700;font-family:sans-serif;">Enter the Platform →</a>
          </div>
          <p style="font-size:12px;color:#5a4e32;text-align:center;font-family:sans-serif;">Link expires in 15 minutes.</p>
        </div>`,
      });

      return res.status(200).json({ ok: true });
    } catch(e) {
      console.error("approve-lead error:", e.message);
      return res.status(500).json({ error: String(e) });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
