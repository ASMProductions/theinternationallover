const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redisGet(key) {
  const res = await fetch(`${REDIS_URL}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
  });
  const data = await res.json();
  return data.result;
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const { id } = req.query;
  if (!id) return res.status(400).json({ valid: false, error: "Certificate ID required." });

  const raw = await redisGet(`il:certificate:${id}`);
  if (!raw) return res.status(404).json({ valid: false, error: "Certificate not found." });

  const cert = JSON.parse(raw);
  return res.status(200).json({
    valid: true,
    name: cert.name,
    certified: cert.certified,
    date_issued: cert.date_issued,
    regions_completed: cert.regions_completed,
  });
}
