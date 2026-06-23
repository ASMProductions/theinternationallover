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
  const { token } = req.query;
  if (!token) return res.redirect("/?error=invalid");

  const raw = await redisGet(`il:partner-token:${token}`);
  if (!raw) return res.redirect("/?error=expired");

  const { email, partner } = JSON.parse(raw);
  await redisDel(`il:partner-token:${token}`);

  res.setHeader("Set-Cookie", `il_access=${encodeURIComponent(email)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`);
  res.redirect("/library");
}
