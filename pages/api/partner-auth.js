import crypto from "crypto";

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redisGet(key) {
  const res = await fetch(`${REDIS_URL}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
  });
  const data = await res.json();
  return data.result;
}

async function redisSet(key, value, exSeconds) {
  await fetch(`${REDIS_URL}/set/${encodeURIComponent(key)}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ value, ex: exSeconds }),
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { partner_key, user_id, user_email, partner_name } = req.body;
  if (!partner_key || !user_id || !user_email) return res.status(400).json({ error: "Missing required fields." });

  // Validate partner key
  const partnerData = await redisGet(`il:partner:${partner_key}`);
  if (!partnerData) return res.status(401).json({ error: "Invalid partner key." });

  const partner = JSON.parse(partnerData);

  // Create or update user
  const emailLower = user_email.toLowerCase().trim();
  await redisSet(`il:paid:${emailLower}`, JSON.stringify({ source: partner_name, partner_user_id: user_id, access: partner.access_level }), 86400 * 365);

  // Generate short-lived access token
  const token = crypto.randomBytes(32).toString("hex");
  await redisSet(`il:partner-token:${token}`, JSON.stringify({ email: emailLower, partner: partner_name, user_id }), 300);

  return res.status(200).json({ token, redirect_url: `/partner/entry?token=${token}` });
}
