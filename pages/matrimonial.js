import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ADMIN_KEY = process.env.IL_ADMIN_KEY;

function profileKey(email) { return "il:mat:profile:" + email.toLowerCase().replace(/[^a-z0-9]/g, "_"); }
function msgKey(a, b) { const pair = [a,b].sort().join("__"); return "il:mat:msg:" + pair; }
function blockKey(email) { return "il:mat:blocks:" + email.toLowerCase().replace(/[^a-z0-9]/g, "_"); }
function reportKey() { return "il:mat:reports"; }

async function getProfile(email) {
  try {
    const raw = await redis.get(profileKey(email));
    if (!raw) return null;
    return typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch(e) { return null; }
}

async function listApprovedProfiles(gender, requestorEmail) {
  try {
    const keys = await redis.keys("il:mat:profile:*");
    if (!keys || keys.length === 0) return [];
    const profiles = await Promise.all(keys.map(async k => {
      try {
        const raw = await redis.get(k);
        if (!raw) return null;
        return typeof raw === "string" ? JSON.parse(raw) : raw;
      } catch(e) { return null; }
    }));
    const blocks = await redis.smembers(blockKey(requestorEmail)).catch(() => []);
    return profiles
      .filter(p => p && p.approved && p.gender === gender && !p.hidden && !blocks.includes(p.email))
      .sort((a, b) => b.createdAt - a.createdAt);
  } catch(e) { return []; }
}

async function listAllProfiles() {
  try {
    const keys = await redis.keys("il:mat:profile:*");
    if (!keys || keys.length === 0) return [];
    const profiles = await Promise.all(keys.map(async k => {
      try {
        const raw = await redis.get(k);
        if (!raw) return null;
        return typeof raw === "string" ? JSON.parse(raw) : raw;
      } catch(e) { return null; }
    }));
    return profiles.filter(p => p).sort((a, b) => (b.createdAt||0) - (a.createdAt||0));
  } catch(e) { return []; }
}

async function listPendingProfiles() {
  try {
    const keys = await redis.keys("il:mat:profile:*");
    if (!keys || keys.length === 0) return [];
    const profiles = await Promise.all(keys.map(async k => {
      try {
        const raw = await redis.get(k);
        if (!raw) return null;
        return typeof raw === "string" ? JSON.parse(raw) : raw;
      } catch(e) { return null; }
    }));
    return profiles.filter(p => p && !p.approved && p.gender === "woman");
  } catch(e) { return []; }
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "GET") {
    const { action, email, gender, other, adminKey } = req.query;

    if (action === "list" && email && gender) {
      const oppositeGender = gender === "man" ? "woman" : "man";
      const profiles = await listApprovedProfiles(oppositeGender, email);
      return res.status(200).json({ profiles });
    }

    if (action === "myProfile" && email) {
      const profile = await getProfile(email);
      return res.status(200).json({ profile });
    }

    if (action === "messages" && email && other) {
      try {
        const raw = await redis.get(msgKey(email, other));
        const messages = raw ? (typeof raw === "string" ? JSON.parse(raw) : raw) : [];
        return res.status(200).json({ messages });
      } catch(e) { return res.status(200).json({ messages: [] }); }
    }

    if (action === "pending" && adminKey === ADMIN_KEY) {
      const profiles = await listPendingProfiles();
      return res.status(200).json({ profiles });
    }

    if (action === "allProfiles" && adminKey === ADMIN_KEY) {
      const profiles = await listAllProfiles();
      return res.status(200).json({ profiles });
    }

    if (action === "deleteProfile" && adminKey === ADMIN_KEY && email) {
      await redis.del(profileKey(email));
      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ error: "Invalid action" });
  }

  if (req.method === "POST") {
    const body = req.body;
    const { action } = body;

    if (action === "createProfile") {
      const { email, gender, displayName, age, city, country, region, religion, bio,
              familyInvolvement, virtueStatus, maritalStatus, hasChildren,
              education, languages, height, seeking, photoBase64 } = body;
      if (!email || !displayName || !age || !city || !bio) {
        return res.status(400).json({ error: "Required fields missing" });
      }
      const profile = {
        email: email.toLowerCase(),
        gender,
        displayName,
        age: parseInt(age),
        city, country, region, religion, bio,
        familyInvolvement, virtueStatus, maritalStatus, hasChildren,
        education, languages, height, seeking,
        approved: gender === "man", // men auto-approve, women need admin
        hidden: false,
        isCertified: false,
        isAmbassador: false,
        createdAt: Date.now(),
        photoUrl: body.photoBase64 || null,
      };
      await redis.set(profileKey(email), JSON.stringify(profile));
      return res.status(200).json({ ok: true });
    }

    if (action === "approve") {
      if (body.adminKey !== ADMIN_KEY) return res.status(403).json({ error: "Forbidden" });
      const profile = await getProfile(body.email);
      if (!profile) return res.status(404).json({ error: "Not found" });
      profile.approved = true;
      await redis.set(profileKey(body.email), JSON.stringify(profile));
      return res.status(200).json({ ok: true });
    }

    if (action === "reject") {
      if (body.adminKey !== ADMIN_KEY) return res.status(403).json({ error: "Forbidden" });
      await redis.del(profileKey(body.email));
      return res.status(200).json({ ok: true });
    }

    if (action === "toggleHide") {
      const profile = await getProfile(body.email);
      if (!profile) return res.status(404).json({ error: "Not found" });
      profile.hidden = !profile.hidden;
      await redis.set(profileKey(body.email), JSON.stringify(profile));
      return res.status(200).json({ ok: true, hidden: profile.hidden });
    }

    if (action === "sendMessage") {
      const { from, to, text, isAmbassador: senderIsAmb, adminKey: senderAdminKey } = body;
      if (!from || !to || !text) return res.status(400).json({ error: "Missing fields" });
      // Block messages to virtual profiles — only the admin/founder can contact them
      const targetProfile = await getProfile(to);
      if (targetProfile && targetProfile.isVirtual && senderAdminKey !== ADMIN_KEY) {
        return res.status(403).json({ error: "virtual_profile" });
      }
      const key = msgKey(from, to);
      let messages = [];
      try {
        const raw = await redis.get(key);
        messages = raw ? (typeof raw === "string" ? JSON.parse(raw) : raw) : [];
      } catch(e) {}
      messages.push({ from, text, timestamp: Date.now(), isAmbassador: !!senderIsAmb });
      await redis.set(key, JSON.stringify(messages));
      return res.status(200).json({ ok: true });
    }

    if (action === "block") {
      const { email, target } = body;
      await redis.sadd(blockKey(email), target);
      return res.status(200).json({ ok: true });
    }

    if (action === "report") {
      const { email, target, reason } = body;
      const report = { reporter: email, target, reason, timestamp: Date.now() };
      await redis.lpush(reportKey(), JSON.stringify(report));
      return res.status(200).json({ ok: true });
    }

    if (action === "markCertified") {
      if (body.adminKey !== ADMIN_KEY) return res.status(403).json({ error: "Forbidden" });
      const profile = await getProfile(body.email);
      if (!profile) return res.status(404).json({ error: "Not found" });
      profile.isCertified = true;
      await redis.set(profileKey(body.email), JSON.stringify(profile));
      return res.status(200).json({ ok: true });
    }

    if (action === "markAmbassador") {
      if (body.adminKey !== ADMIN_KEY) return res.status(403).json({ error: "Forbidden" });
      const profile = await getProfile(body.email);
      if (!profile) return res.status(404).json({ error: "Not found" });
      profile.isAmbassador = true;
      await redis.set(profileKey(body.email), JSON.stringify(profile));
      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ error: "Invalid action" });
  }

  res.status(405).json({ error: "Method not allowed" });
}
