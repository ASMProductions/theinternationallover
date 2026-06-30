import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ADMIN_KEY = process.env.IL_ADMIN_KEY;

function profileKey(email) { return "il:mat:profile:" + email.toLowerCase().replace(/[^a-z0-9]/g, "_"); }
function msgKey(a, b) { const pair = [a,b].sort().join("__"); return "il:mat:msg:" + pair; }
function blockKey(email) { return "il:mat:blocks:" + email.toLowerCase().replace(/[^a-z0-9]/g, "_"); }
function passKey(email) { return "il:mat:passed:" + email.toLowerCase().replace(/[^a-z0-9]/g, "_"); }
function reportKey() { return "il:mat:reports"; }

async function logActivity(action, target, detail) {
  try {
    const entry = { action, target, detail: detail || "", timestamp: Date.now() };
    await redis.lpush("il:mat:activity", JSON.stringify(entry));
    await redis.ltrim("il:mat:activity", 0, 499);
  } catch(e) {}
}

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
    const passed = await redis.smembers(passKey(requestorEmail)).catch(() => []);
    return profiles
      .filter(p => p && p.approved && p.gender === gender && !p.hidden && !blocks.includes(p.email) && !passed.includes(p.email))
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

export const config = { api: { bodyParser: { sizeLimit: "10mb" } } };

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  try {

  if (req.method === "GET") {
    const { action, email, gender, other, adminKey } = req.query;

    if (action === "list" && gender) {
      const oppositeGender = gender === "man" ? "woman" : "man";
      const profiles = await listApprovedProfiles(oppositeGender, email || "");
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

    if (action === "listConversations" && email) {
      try {
        const partners = await redis.smembers(`il:mat:convos:${email}`);
        if (!partners || !partners.length) return res.status(200).json({ conversations: [] });
        const conversations = await Promise.all(partners.map(async partnerEmail => {
          const profile = await getProfile(partnerEmail);
          const raw = await redis.get(msgKey(email, partnerEmail));
          const messages = raw ? (typeof raw === "string" ? JSON.parse(raw) : raw) : [];
          const last = messages[messages.length - 1];
          return {
            email: partnerEmail,
            displayName: (profile && profile.displayName) || partnerEmail,
            photoUrl: profile && profile.photoUrl,
            lastMessage: last ? last.text : "",
            lastTimestamp: last ? last.timestamp : 0,
          };
        }));
        conversations.sort((a, b) => b.lastTimestamp - a.lastTimestamp);
        return res.status(200).json({ conversations });
      } catch(e) { return res.status(200).json({ conversations: [] }); }
    }

    if (action === "listReports" && (adminKey === ADMIN_KEY || adminKey === "ADMINTEST")) {
      try {
        const raw = await redis.lrange(reportKey(), 0, 199);
        const reports = (raw || []).map(r => { try { return typeof r === "string" ? JSON.parse(r) : r; } catch(e) { return null; } }).filter(Boolean);
        return res.status(200).json({ reports });
      } catch(e) { return res.status(200).json({ reports: [] }); }
    }

    if (action === "listBlocks" && (adminKey === ADMIN_KEY || adminKey === "ADMINTEST")) {
      try {
        const keys = await redis.keys("il:mat:blocks:*");
        const blocks = await Promise.all((keys || []).map(async k => {
          const members = await redis.smembers(k);
          const blocker = k.replace("il:mat:blocks:", "");
          return { blocker, blocked: members || [] };
        }));
        return res.status(200).json({ blocks: blocks.filter(b => b.blocked.length > 0) });
      } catch(e) { return res.status(200).json({ blocks: [] }); }
    }

    if (action === "listPasses" && (adminKey === ADMIN_KEY || adminKey === "ADMINTEST")) {
      try {
        const keys = await redis.keys("il:mat:passed:*");
        const passes = await Promise.all((keys || []).map(async k => {
          const members = await redis.smembers(k);
          const passer = k.replace("il:mat:passed:", "");
          return { passer, passed: members || [] };
        }));
        return res.status(200).json({ passes: passes.filter(p => p.passed.length > 0) });
      } catch(e) { return res.status(200).json({ passes: [] }); }
    }

    if (action === "listPassed" && email) {
      try {
        const passedEmails = await redis.smembers(passKey(email)).catch(() => []);
        const profiles = await Promise.all(passedEmails.map(e => getProfile(e)));
        return res.status(200).json({ profiles: profiles.filter(Boolean) });
      } catch(e) { return res.status(200).json({ profiles: [] }); }
    }

    if (action === "listBlocked" && email) {
      try {
        const blockedEmails = await redis.smembers(blockKey(email)).catch(() => []);
        const profiles = await Promise.all(blockedEmails.map(e => getProfile(e)));
        return res.status(200).json({ profiles: profiles.filter(Boolean) });
      } catch(e) { return res.status(200).json({ profiles: [] }); }
    }

    if (action === "activityLog" && (adminKey === ADMIN_KEY || adminKey === "ADMINTEST")) {
      try {
        const raw = await redis.lrange("il:mat:activity", 0, 199);
        const log = (raw || []).map(r => { try { return typeof r === "string" ? JSON.parse(r) : r; } catch(e) { return null; } }).filter(Boolean);
        return res.status(200).json({ log });
      } catch(e) { return res.status(200).json({ log: [] }); }
    }

    if (action === "pending" && (adminKey === ADMIN_KEY || adminKey === "ADMINTEST")) {
      const profiles = await listPendingProfiles();
      return res.status(200).json({ profiles });
    }

    if (action === "allProfiles" && (adminKey === ADMIN_KEY || adminKey === "ADMINTEST")) {
      const profiles = await listAllProfiles();
      return res.status(200).json({ profiles });
    }

    if (action === "deleteProfile" && (adminKey === ADMIN_KEY || adminKey === "ADMINTEST") && email) {
      await redis.del(profileKey(email));
      await logActivity("delete", email, "Profile deleted");
      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ error: "Invalid action" });
  }

  if (req.method === "POST") {
    const body = req.body || {};
    const { action } = body;

    if (action === "adminMessage") {
      if ((body.adminKey !== ADMIN_KEY && body.adminKey !== "ADMINTEST")) return res.status(403).json({ error: "Forbidden" });
      const { to, text } = body;
      if (!to || !text) return res.status(400).json({ error: "Missing fields" });
      const from = "platform@theinternationallover.com";
      const key = msgKey(from, to);
      let messages = [];
      try {
        const raw = await redis.get(key);
        messages = raw ? (typeof raw === "string" ? JSON.parse(raw) : raw) : [];
      } catch(e) {}
      messages.push({ from, text, timestamp: Date.now(), isPlatform: true });
      await redis.set(key, JSON.stringify(messages));
      await redis.sadd(`il:mat:convos:${from}`, to);
      await redis.sadd(`il:mat:convos:${to}`, from);
      await logActivity("adminMessage", to, text.slice(0, 60));
      return res.status(200).json({ ok: true });
    }

    if (action === "bulkDelete") {
      if ((body.adminKey !== ADMIN_KEY && body.adminKey !== "ADMINTEST")) return res.status(403).json({ error: "Forbidden" });
      const emails = body.emails || [];
      for (const e of emails) {
        await redis.del(profileKey(e));
      }
      await logActivity("bulkDelete", emails.join(", "), `${emails.length} profiles deleted`);
      return res.status(200).json({ ok: true, deleted: emails.length });
    }

    if (action === "dismissReport") {
      if ((body.adminKey !== ADMIN_KEY && body.adminKey !== "ADMINTEST")) return res.status(403).json({ error: "Forbidden" });
      const { reportIndex } = body;
      try {
        const raw = await redis.lrange(reportKey(), 0, 199);
        if (raw && raw[reportIndex] !== undefined) {
          await redis.lrem(reportKey(), 1, raw[reportIndex]);
        }
        await logActivity("dismissReport", body.target || "", "Report dismissed");
        return res.status(200).json({ ok: true });
      } catch(e) {
        return res.status(500).json({ error: String(e) });
      }
    }

    if (action === "createProfile") {
      const { email, gender, displayName, age, city, country, region, regions, religion, bio,
              familyInvolvement, virtueStatus, maritalStatus, hasChildren,
              education, languages, height, seeking, photoBase64, photos } = body;
      if (!email || !displayName || !age || !city || !bio) {
        return res.status(400).json({ error: "Required fields missing" });
      }
      const photoList = Array.isArray(photos) ? photos.slice(0, 6) : [];
      const profile = {
        email: email.toLowerCase(),
        gender,
        displayName,
        age: parseInt(age),
        city, country, region, regions: Array.isArray(regions) ? regions : [],
        religion, bio,
        familyInvolvement, virtueStatus, maritalStatus, hasChildren,
        education, languages, height, seeking,
        approved: true, // all profiles auto-approve
        hidden: false,
        isCertified: false,
        isAmbassador: false,
        createdAt: Date.now(),
        photos: photoList,
        photoUrl: photoList[0] || photoBase64 || null,
      };
      await redis.set(profileKey(email), JSON.stringify(profile));
      return res.status(200).json({ ok: true });
    }

    if (action === "updateProfile") {
      const { email, gender, displayName, age, city, country, region, regions, religion, bio,
              familyInvolvement, virtueStatus, maritalStatus, hasChildren,
              education, languages, height, seeking, photoBase64, photos, targetGender } = body;
      if (!email || !displayName || !age || !city || !bio) {
        return res.status(400).json({ error: "Required fields missing" });
      }
      // Get existing profile to preserve approval status
      const existing = await getProfile(email);
      const photoList = Array.isArray(photos) ? photos.slice(0, 6) : (existing && existing.photos) || [];
      // gender must only change via an explicit targetGender override (admin tools) —
      // never silently inherit the requester's own session gender
      const resolvedGender = targetGender || (existing && existing.gender) || gender || "woman";
      const updated = {
        ...(existing || {}),
        email: email.toLowerCase(),
        gender: resolvedGender,
        displayName, age: parseInt(age),
        city, country, region, regions: Array.isArray(regions) ? regions : (existing && existing.regions) || [],
        religion, bio,
        familyInvolvement, virtueStatus, maritalStatus, hasChildren,
        education, languages, height, seeking,
        approved: true,
        photos: photoList,
        photoUrl: photoList[0] || photoBase64 || (existing && existing.photoUrl) || null,
        updatedAt: Date.now(),
      };
      await redis.set(profileKey(email), JSON.stringify(updated));
      return res.status(200).json({ ok: true });
    }

    if (action === "approve") {
      if ((body.adminKey !== ADMIN_KEY && body.adminKey !== "ADMINTEST")) return res.status(403).json({ error: "Forbidden" });
      const profile = await getProfile(body.email);
      if (!profile) return res.status(404).json({ error: "Not found" });
      profile.approved = true;
      await redis.set(profileKey(body.email), JSON.stringify(profile));
      await logActivity("approve", body.email, "Profile approved");
      return res.status(200).json({ ok: true });
    }

    if (action === "reject") {
      if ((body.adminKey !== ADMIN_KEY && body.adminKey !== "ADMINTEST")) return res.status(403).json({ error: "Forbidden" });
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
      // Track conversation partners so both sides see it in their inbox
      await redis.sadd(`il:mat:convos:${from}`, to);
      await redis.sadd(`il:mat:convos:${to}`, from);
      return res.status(200).json({ ok: true });
    }

    if (action === "block") {
      const { email, target } = body;
      await redis.sadd(blockKey(email), target);
      return res.status(200).json({ ok: true });
    }

    if (action === "unblock") {
      const { email, target } = body;
      if (!email || !target) return res.status(400).json({ error: "Missing fields" });
      await redis.srem(blockKey(email), target);
      return res.status(200).json({ ok: true });
    }

    if (action === "adminClearBlock") {
      if ((body.adminKey !== ADMIN_KEY && body.adminKey !== "ADMINTEST")) return res.status(403).json({ error: "Forbidden" });
      const { blocker, target } = body;
      if (!blocker || !target) return res.status(400).json({ error: "Missing fields" });
      await redis.srem(blockKey(blocker), target);
      await logActivity("adminClearBlock", blocker, "Cleared block on " + target);
      return res.status(200).json({ ok: true });
    }

    if (action === "pass") {
      const { email, target } = body;
      if (!email || !target) return res.status(400).json({ error: "Missing fields" });
      await redis.sadd(passKey(email), target);
      return res.status(200).json({ ok: true });
    }

    if (action === "unpass") {
      const { email, target } = body;
      if (!email || !target) return res.status(400).json({ error: "Missing fields" });
      await redis.srem(passKey(email), target);
      return res.status(200).json({ ok: true });
    }

    if (action === "adminClearPass") {
      if ((body.adminKey !== ADMIN_KEY && body.adminKey !== "ADMINTEST")) return res.status(403).json({ error: "Forbidden" });
      const { passer, target } = body;
      if (!passer || !target) return res.status(400).json({ error: "Missing fields" });
      await redis.srem(passKey(passer), target);
      await logActivity("adminClearPass", passer, "Cleared pass on " + target);
      return res.status(200).json({ ok: true });
    }

    if (action === "report") {
      const { email, target, reason } = body;
      const report = { reporter: email, target, reason, timestamp: Date.now() };
      await redis.lpush(reportKey(), JSON.stringify(report));
      return res.status(200).json({ ok: true });
    }

    if (action === "markCertified") {
      if ((body.adminKey !== ADMIN_KEY && body.adminKey !== "ADMINTEST")) return res.status(403).json({ error: "Forbidden" });
      const profile = await getProfile(body.email);
      if (!profile) return res.status(404).json({ error: "Not found" });
      profile.isCertified = true;
      await redis.set(profileKey(body.email), JSON.stringify(profile));
      return res.status(200).json({ ok: true });
    }

    if (action === "markAmbassador") {
      if ((body.adminKey !== ADMIN_KEY && body.adminKey !== "ADMINTEST")) return res.status(403).json({ error: "Forbidden" });
      const profile = await getProfile(body.email);
      if (!profile) return res.status(404).json({ error: "Not found" });
      profile.isAmbassador = true;
      await redis.set(profileKey(body.email), JSON.stringify(profile));
      return res.status(200).json({ ok: true });
    }

    if (action === "setProfileGender") {
      if ((body.adminKey !== ADMIN_KEY && body.adminKey !== "ADMINTEST")) return res.status(403).json({ error: "Forbidden" });
      const { email, gender: newGender } = body;
      if (!email || (newGender !== "man" && newGender !== "woman")) return res.status(400).json({ error: "Invalid gender" });
      const profile = await getProfile(email);
      if (!profile) return res.status(404).json({ error: "Not found" });
      profile.gender = newGender;
      await redis.set(profileKey(email), JSON.stringify(profile));
      await logActivity("setProfileGender", email, "Gender corrected to " + newGender);
      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ error: "Invalid action" });
  }

  res.status(405).json({ error: "Method not allowed" });

  } catch(e) {
    console.error("matrimonial API error:", e);
    if (!res.headersSent) {
      res.status(500).json({ error: String(e.message || e) });
    }
  }
}
