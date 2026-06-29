import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export const config = { api: { bodyParser: true } };

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
    // Save as pending lead only — no access granted until admin approves
    const leadKey = "il:lead:" + email.replace(/[^a-z0-9]/g, "_");
    await redis.set(leadKey, JSON.stringify({
      email, name, source,
      approved: false,
      createdAt: Date.now()
    }));
    await redis.lpush("il:leads:index", email);

    return res.status(200).json({ ok: true });
  } catch(e) {
    console.error("lead-capture error:", e);
    return res.status(500).json({ error: String(e) });
  }
}
