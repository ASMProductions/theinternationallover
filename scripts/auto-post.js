// scripts/auto-post.js
// Runs nightly via GitHub Actions.
// Posts one unused IL book quote to the IL Consulate channel in Redis.
// Completely separate from the masterylevelfasting.com auto-post system.

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const REDIS_URL   = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!REDIS_URL || !REDIS_TOKEN) {
  console.error("Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN");
  process.exit(1);
}

// ── Redis helpers ─────────────────────────────────────────────────────────
// Use command-in-body POST format to avoid Node.js 24 colon-encoding bug
async function redisCmd(...args) {
  const r = await fetch(REDIS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });
  return r.json();
}

async function redisGet(key) {
  const data = await redisCmd("GET", key);
  if (!data.result) return [];
  try {
    let parsed = typeof data.result === "string" ? JSON.parse(data.result) : data.result;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed) && typeof parsed.value === "string") {
      parsed = JSON.parse(parsed.value);
    }
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function redisSet(key, value) {
  const data = await redisCmd("SET", key, JSON.stringify(value));
  if (!data.result || data.result !== "OK") {
    throw new Error(`Redis SET failed for "${key}": ${JSON.stringify(data)}`);
  }
}

// ── Post selection ────────────────────────────────────────────────────────
function pickUnused(pool, usedIds) {
  const usedSet = new Set(usedIds || []);
  const available = pool.filter((p) => !usedSet.has(p.id));

  if (available.length === 0) {
    console.log("  Pool exhausted — resetting used list.");
    return { post: pool[Math.floor(Math.random() * pool.length)], reset: true };
  }

  const post = available[Math.floor(Math.random() * available.length)];
  return { post, reset: false };
}

// ── Main ──────────────────────────────────────────────────────────────────
async function main() {
  const pool = JSON.parse(readFileSync(join(__dirname, "il-posts-pool.json"), "utf8"));

  console.log(`[IL Consulate] Pool: ${pool.length} posts`);

  const APPROVED_KEY = "consulate:approved";
  const USED_KEY     = "autopost:used:consulate";

  try {
    const usedIds = (await redisGet(USED_KEY)) || [];
    console.log(`  Used: ${usedIds.length}`);

    const { post, reset } = pickUnused(pool, usedIds);
    const entry = { ...post, date: new Date().toISOString() };

    const approved = (await redisGet(APPROVED_KEY)) || [];
    const updatedApproved = Array.isArray(approved) ? [...approved, entry] : [entry];
    await redisSet(APPROVED_KEY, updatedApproved);

    const updatedUsed = reset ? [post.id] : [...usedIds, post.id];
    await redisSet(USED_KEY, updatedUsed);

    console.log(`  ✓ Posted: "${entry.text.slice(0, 80)}..."`);
  } catch (err) {
    console.error(`  ✗ Error:`, err.message);
    process.exit(1);
  }

  console.log("\nDone.");
}

main();
