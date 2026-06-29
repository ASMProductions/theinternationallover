// pages/api/verify-magic-link.js
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { token } = req.body;
  if (!token) return res.status(400).json({ valid: false, error: "No token provided" });

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  const redisRes = await fetch(`${redisUrl}/get/il:magic:${token}`, {
    headers: { Authorization: `Bearer ${redisToken}` },
  });
  const redisData = await redisRes.json();

  if (!redisData.result) {
    return res.status(200).json({ valid: false, error: "Link expired or invalid." });
  }

  const parts = redisData.result.split(":");
  const email = decodeURIComponent(parts[0]);
  const expiry = parts[parts.length - 1];

  if (Date.now() > parseInt(expiry)) {
    await fetch(`${redisUrl}/del/il:magic:${token}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${redisToken}` },
    });
    return res.status(200).json({ valid: false, error: "Link has expired. Please request a new one." });
  }

  // Delete token — one-time use only
  await fetch(`${redisUrl}/del/il:magic:${token}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${redisToken}` },
  });

  return res.status(200).json({ valid: true, email });
}
