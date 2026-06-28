// Returns the matrimonial admin key to the browser for admin sessions.
// Only accessible from the IL platform — the access code acts as the gate.
export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const { code } = req.query;
  // Only return the key if the requester knows the ADMINTEST code
  if (!code || code.toUpperCase() !== "ADMINTEST") {
    return res.status(403).json({ error: "Forbidden" });
  }
  return res.status(200).json({ key: process.env.IL_ADMIN_KEY || "" });
}
