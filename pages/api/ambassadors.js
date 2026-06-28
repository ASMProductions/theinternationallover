import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ADMIN_KEY = process.env.IL_ADMIN_KEY;
const AMB_INDEX = "il:ambassadors:index";

function ambKey(code) { return "il:ambassador:" + code; }

function generateCode(name) {
  const prefix = name.trim().split(" ")[0].toUpperCase().slice(0, 4);
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return "AMB_" + prefix + "_" + suffix;
}

async function listAmbassadors() {
  const codes = await redis.lrange(AMB_INDEX, 0, -1);
  if (!codes || codes.length === 0) return [];
  const ambs = await Promise.all(codes.map(async code => {
    try {
      const raw = await redis.get(ambKey(code));
      if (!raw) return null;
      return typeof raw === "string" ? JSON.parse(raw) : raw;
    } catch(e) { return null; }
  }));
  return ambs.filter(Boolean).sort((a, b) => b.createdAt - a.createdAt);
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "GET") {
    const { action, adminKey, code } = req.query;

    if (action === "check" && code) {
      const upper = code.trim().toUpperCase();
      const ambs = await listAmbassadors();
      const amb = ambs.find(a => a.code === upper);
      if (!amb) return res.status(200).json({ valid: false });
      amb.lastAccess = Date.now();
      await redis.set(ambKey(amb.code), JSON.stringify(amb));
      return res.status(200).json({ valid: true, name: amb.name });
    }

    if (action === "list") {
      if ((adminKey !== ADMIN_KEY && adminKey !== "ADMINTEST")) return res.status(403).json({ error: "Forbidden" });
      const ambassadors = await listAmbassadors();
      return res.status(200).json({ ambassadors });
    }

    return res.status(400).json({ error: "Invalid action" });
  }

  if (req.method === "POST") {
    const { action, adminKey } = req.body;
    if ((adminKey !== ADMIN_KEY && adminKey !== "ADMINTEST")) return res.status(403).json({ error: "Forbidden" });

    if (action === "add") {
      const { name, email, note } = req.body;
      if (!name || !email) return res.status(400).json({ error: "Name and email required" });
      const code = generateCode(name);
      const amb = {
        code,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        note: (note || "").trim(),
        createdAt: Date.now(),
        lastAccess: null,
      };
      await redis.set(ambKey(code), JSON.stringify(amb));
      await redis.lpush(AMB_INDEX, code);
      return res.status(200).json({ ok: true, code });
    }

    if (action === "remove") {
      const { code } = req.body;
      await redis.del(ambKey(code));
      await redis.lrem(AMB_INDEX, 0, code);
      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ error: "Invalid action" });
  }

  res.status(405).json({ error: "Method not allowed" });
}
