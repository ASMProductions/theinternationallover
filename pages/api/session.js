// pages/api/session.js — session check + sign out for The International Lover™
// GET    -> { valid, email, gender } based on il_session cookie
// DELETE -> destroys the session (sign out)
// SEPARATE SYSTEM — IL keys only.

async function redis(cmd) {
  const r = await fetch(process.env.UPSTASH_REDIS_REST_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cmd),
  });
  if (!r.ok) throw new Error("Redis request failed");
  const data = await r.json();
  return data.result;
}

function getSessionToken(req) {
  const cookies = req.headers.cookie || "";
  const match = cookies.match(/(?:^|;\s*)il_session=([^;]+)/);
  return match ? match[1] : null;
}

export default async function handler(req, res) {
  const token = getSessionToken(req);

  if (req.method === "GET") {
    if (!token) return res.status(200).json({ valid: false });
    try {
      const email = await redis(["GET", `il:session:${token}`]);
      if (!email) return res.status(200).json({ valid: false });
      const gender = await redis(["GET", `il:gender:${email}`]);
      return res.status(200).json({ valid: true, email, gender: gender || null });
    } catch {
      return res.status(200).json({ valid: false });
    }
  }

  if (req.method === "DELETE") {
    try {
      if (token) {
        const email = await redis(["GET", `il:session:${token}`]);
        await redis(["DEL", `il:session:${token}`]);
        if (email) await redis(["SREM", `il:sessions:${email}`, token]);
      }
    } catch {}
    res.setHeader(
      "Set-Cookie",
      "il_session=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax"
    );
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
