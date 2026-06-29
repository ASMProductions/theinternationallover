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
  const { token, type } = req.query;
  if (!token) return res.redirect("/?error=invalid");

  const email = await redisGet(`il:magic:${token}`);
  if (!email) return res.redirect("/?error=expired");

  await redisDel(`il:magic:${token}`);

  const isWoman = type === "women";
  const dest = isWoman ? "/matrimonial" : "/";
  const accessType = isWoman ? "women" : "member";

  res.redirect(`/auth-callback?email=${encodeURIComponent(email)}&type=${accessType}&dest=${encodeURIComponent(dest)}`);
}
