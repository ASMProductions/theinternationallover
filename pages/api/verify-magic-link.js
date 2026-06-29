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

  const email = await redisGet(`il:magic:${token}`);
  if (!email) return res.redirect("/?error=expired");

  await redisDel(`il:magic:${token}`);

  // Check if this is a women's access (lead approval)
  const leadKey = "il:lead:" + email.replace(/[^a-z0-9]/g, "_");
  const leadRaw = await redisGet(leadKey);
  const isWoman = leadRaw && (typeof leadRaw === "string" ? JSON.parse(leadRaw) : leadRaw).source === "for-women";

  // Redirect to a page that sets sessionStorage then forwards to the right place
  const destination = isWoman ? "/matrimonial" : "/";
  const accessType = isWoman ? "women" : "member";

  res.redirect(`/auth-callback?email=${encodeURIComponent(email)}&type=${accessType}&dest=${encodeURIComponent(destination)}`);
}
