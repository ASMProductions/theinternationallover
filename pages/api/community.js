import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ADMIN_KEY = process.env.IL_ADMIN_KEY;
const POSTS_INDEX = "il:posts:index";
const BANS_KEY = "il:banned:sessions";

function postKey(id) { return "il:post:" + id; }

async function isBanned(token) {
  if (!token) return false;
  const banned = await redis.sismember(BANS_KEY, token);
  return !!banned;
}

async function listPosts() {
  const ids = await redis.lrange(POSTS_INDEX, 0, -1);
  if (!ids || ids.length === 0) return [];
  const posts = await Promise.all(
    ids.map(async id => {
      try {
        const raw = await redis.get(postKey(id));
        if (!raw) return null;
        return typeof raw === "string" ? JSON.parse(raw) : raw;
      } catch(e) { return null; }
    })
  );
  return posts.filter(Boolean).sort((a, b) => b.createdAt - a.createdAt);
}

async function getPost(id) {
  const raw = await redis.get(postKey(id));
  if (!raw) return null;
  return typeof raw === "string" ? JSON.parse(raw) : raw;
}

async function savePost(post) {
  await redis.set(postKey(post.id), JSON.stringify(post));
}

export default async function handler(req, res) {

  if (req.method === "GET") {
    const { action, id, token } = req.query;

    if (action === "checkBan") {
      const banned = await isBanned(token);
      return res.status(200).json({ banned });
    }

    if (action === "list") {
      const posts = await listPosts();
      return res.status(200).json({ posts });
    }

    if (action === "post" && id) {
      const post = await getPost(id);
      if (!post) return res.status(404).json({ error: "Not found" });
      return res.status(200).json({ post });
    }

    if (action === "listBans") {
      if (req.query.adminKey !== ADMIN_KEY) return res.status(403).json({ error: "Forbidden" });
      const tokens = await redis.smembers(BANS_KEY);
      return res.status(200).json({ tokens: tokens || [] });
    }

    return res.status(400).json({ error: "Invalid action" });
  }

  if (req.method === "POST") {
    const body = req.body;
    const { action } = body;

    // ── MEMBER ACTIONS (check ban first) ──────────────────────
    if (action === "comment" || action === "createThread") {
      const banned = await isBanned(body.token);
      if (banned) return res.status(200).json({ banned: true });
    }

    if (action === "comment") {
      const post = await getPost(body.postId);
      if (!post) return res.status(404).json({ error: "Not found" });
      post.comments = post.comments || [];
      post.comments.push({
        author: (body.author || "Member").slice(0, 40),
        text: (body.text || "").slice(0, 2000),
        token: body.token || "",
        createdAt: Date.now(),
      });
      await savePost(post);
      return res.status(200).json({ ok: true });
    }

    if (action === "createThread") {
      const post = {
        id: "thread_" + Date.now(),
        title: (body.title || "").slice(0, 200),
        body: (body.body || "").slice(0, 10000),
        type: "member",
        author: (body.author || "Member").slice(0, 40),
        token: body.token || "",
        isAmbassador: body.isAmbassador === true,
        comments: [],
        createdAt: Date.now(),
      };
      await savePost(post);
      await redis.lpush(POSTS_INDEX, post.id);
      return res.status(200).json({ ok: true, id: post.id });
    }

    // ── ADMIN ACTIONS ─────────────────────────────────────────
    if (body.adminKey !== ADMIN_KEY) return res.status(403).json({ error: "Forbidden" });

    if (action === "createPost") {
      const id = "post_" + Date.now();
      const post = {
        id,
        title: (body.title || "").slice(0, 200),
        body: (body.body || "").slice(0, 10000),
        type: body.type || "author",
        author: body.type === "member" ? (body.author || "Member") : "The International Lover",
        token: "admin",
        comments: [],
        createdAt: Date.now(),
      };
      await savePost(post);
      await redis.lpush(POSTS_INDEX, id);
      return res.status(200).json({ ok: true, id });
    }

    if (action === "editPost") {
      const post = await getPost(body.id);
      if (!post) return res.status(404).json({ error: "Not found" });
      post.title = (body.title || "").slice(0, 200);
      post.body = (body.body || "").slice(0, 10000);
      post.updatedAt = Date.now();
      await savePost(post);
      return res.status(200).json({ ok: true });
    }

    if (action === "deletePost") {
      await redis.del(postKey(body.id));
      await redis.lrem(POSTS_INDEX, 0, body.id);
      return res.status(200).json({ ok: true });
    }

    if (action === "deleteComment") {
      const post = await getPost(body.postId);
      if (!post) return res.status(404).json({ error: "Not found" });
      post.comments = post.comments || [];
      post.comments.splice(body.commentIdx, 1);
      await savePost(post);
      return res.status(200).json({ ok: true });
    }

    if (action === "banSession") {
      const token = body.token;
      if (!token || token === "admin") return res.status(400).json({ error: "Invalid token" });
      await redis.sadd(BANS_KEY, token);
      // Also delete all posts and comments from this token
      const posts = await listPosts();
      for (const post of posts) {
        let changed = false;
        if (post.token === token) {
          await redis.del(postKey(post.id));
          await redis.lrem(POSTS_INDEX, 0, post.id);
          continue;
        }
        const before = (post.comments || []).length;
        post.comments = (post.comments || []).filter(c => c.token !== token);
        if (post.comments.length !== before) { await savePost(post); }
      }
      return res.status(200).json({ ok: true });
    }

    if (action === "unban") {
      await redis.srem(BANS_KEY, body.token);
      return res.status(200).json({ ok: true });
    }

    if (action === "kick") {
      // Kick just clears their posts/comments but does not ban the session
      const posts = await listPosts();
      for (const post of posts) {
        if (post.token === body.token) {
          await redis.del(postKey(post.id));
          await redis.lrem(POSTS_INDEX, 0, post.id);
          continue;
        }
        const before = (post.comments || []).length;
        post.comments = (post.comments || []).filter(c => c.token !== body.token);
        if (post.comments.length !== before) { await savePost(post); }
      }
      return res.status(200).json({ ok: true });
    }

    // ── ADMIN ACTIONS ──────────────────────────────────────────
    if (body.adminKey !== ADMIN_KEY) return res.status(403).json({ error: "Forbidden" });

    if (action === "delete") {
      const { postId } = body;
      if (!postId) return res.status(400).json({ error: "postId required" });
      await redis.del(postKey(postId));
      await redis.lrem(POSTS_INDEX, 0, postId);
      return res.status(200).json({ ok: true });
    }

    if (action === "approve") {
      const { postId } = body;
      const post = await getPost(postId);
      if (!post) return res.status(404).json({ error: "Not found" });
      post.approved = true;
      await savePost(post);
      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ error: "Invalid action" });
  }

  res.status(405).json({ error: "Method not allowed" });
}
