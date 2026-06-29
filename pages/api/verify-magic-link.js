const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

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

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const { token, type } = req.query;

  if (!token) return res.status(400).json({ error: "invalid" });

  const email = await redisGet(`il:magic:${token}`);
  if (!email) return res.status(200).json({ error: "expired" });

  await redisDel(`il:magic:${token}`);

  // Return email and type — magic-link page sets sessionStorage client-side
  return res.status(200).json({ email, type: type || "member" });
}
