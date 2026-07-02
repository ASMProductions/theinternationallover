// pages/api/consulate.js
// GET  -> returns approved consulate posts (public to members)
// POST -> submits a new post into the pending queue + notifies admin
import crypto from "crypto";

const redisUrl   = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redisGet(key) {
  const r = await fetch(`${redisUrl}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${redisToken}` },
  });
  const data = await r.json();
  if (!data.result) return [];
  try {
    const parsed = typeof data.result === "string" ? JSON.parse(data.result) : data.result;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function redisSet(key, value) {
  const r = await fetch(`${redisUrl}/set/${encodeURIComponent(key)}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${redisToken}`, "Content-Type": "application/json" },
    body: JSON.stringify(value),
  });
  const data = await r.json().catch(() => null);
  if (!r.ok || !data || data.result !== "OK") {
    throw new Error(`Redis SET failed for "${key}": ${r.status} ${JSON.stringify(data)}`);
  }
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

  if (req.method === "GET") {
    const posts = await redisGet("consulate:approved");
    return res.status(200).json({ posts });
  }

  if (req.method === "POST") {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: "Message text is required." });
    }

    const entry = {
      id:   crypto.randomUUID(),
      text: text.trim(),
      name: "The Consulate",
      date: new Date().toISOString(),
    };

    // Posts go into pending queue for admin review
    const pending = await redisGet("consulate:pending");
    pending.push(entry);
    await redisSet("consulate:pending", pending);

    // Notify admin if env var is set
    const adminEmail = process.env.IL_ADMIN_EMAIL;
    const adminToken = process.env.IL_ADMIN_KEY;
    if (adminEmail && adminToken) {
      try {
        await fetch("/api/notify-admin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subject: "New Consulate post pending review",
            preview: entry.text.slice(0, 140),
            token: adminToken,
          }),
        });
      } catch {}
    }

    return res.status(200).json({ submitted: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
