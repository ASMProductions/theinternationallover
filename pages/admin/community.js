import { useState, useEffect } from "react";

const C = {
  navy:"#1a3a6b", navyDeep:"#0f2347",
  gold:"#b8963e", goldLight:"#d4af6a",
  cream:"#f0e6cc", creamDim:"#c8b890",
  muted:"#8a7a5a", mutedDark:"#5a4e32",
  border:"#1e3a6e", dark:"#091a35",
  red:"#8b1a1a",
};

export default function AdminCommunity({ adminKey }) {
  const [posts, setPosts] = useState([]);
  const [bans, setBans] = useState([]);
  const [view, setView] = useState("list");
  const [editPost, setEditPost] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newType, setNewType] = useState("author");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => { if (adminKey) { loadPosts(); loadBans(); } }, [adminKey]);

  const api = async (payload) => {
    const res = await fetch("/api/community", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ ...payload, adminKey }),
    });
    return res.json();
  };

  const loadPosts = async () => {
    setLoading(true);
    const res = await fetch("/api/community?action=list");
    const data = await res.json();
    setPosts(data.posts || []);
    setLoading(false);
  };

  const loadBans = async () => {
    const res = await fetch("/api/community?action=listBans&adminKey=" + adminKey);
    const data = await res.json();
    setBans(data.tokens || []);
  };

  const savePost = async () => {
    if (!newTitle.trim() || !newBody.trim()) return;
    setLoading(true);
    const payload = editPost
      ? { action:"editPost", id:editPost.id, title:newTitle, body:newBody }
      : { action:"createPost", title:newTitle, body:newBody, type:newType };
    const data = await api(payload);
    if (data.ok) {
      setMsg(editPost ? "Post updated." : "Post published.");
      setView("list"); setEditPost(null); setNewTitle(""); setNewBody("");
      await loadPosts();
    }
    setLoading(false);
  };

  const deletePost = async (id) => {
    if (!confirm("Delete this post and all its comments?")) return;
    setLoading(true);
    await api({ action:"deletePost", id });
    setMsg("Post deleted.");
    await loadPosts();
    setLoading(false);
  };

  const deleteComment = async (postId, commentIdx) => {
    if (!confirm("Delete this comment?")) return;
    await api({ action:"deleteComment", postId, commentIdx });
    setMsg("Comment deleted.");
    await loadPosts();
  };

  const kickUser = async (token, label) => {
    if (!confirm("Kick " + label + "? This removes all their posts and comments but does not ban them.")) return;
    await api({ action:"kick", token });
    setMsg("User kicked. Their content has been removed.");
    await loadPosts();
  };

  const banUser = async (token, label) => {
    if (!confirm("PERMANENTLY BAN " + label + "? This bans their session, removes all their content, and blocks them from posting again.")) return;
    await api({ action:"banSession", token });
    setMsg("Session banned and all content removed.");
    await loadPosts();
    await loadBans();
  };

  const unban = async (token) => {
    await api({ action:"unban", token });
    setMsg("Session unbanned.");
    await loadBans();
  };

  const startEdit = (post) => {
    setEditPost(post); setNewTitle(post.title); setNewBody(post.body); setNewType(post.type); setView("edit");
  };

  const Btn = ({ onClick, children, color, small }) => (
    <button onClick={onClick} style={{ background:color||C.gold, color:color?"white":C.navyDeep, border:"none", cursor:"pointer", fontWeight:700, fontFamily:"sans-serif", padding:small?"5px 10px":"8px 16px", fontSize:small?10:11 }}>{children}</button>
  );

  if (!adminKey) return (
    <div style={{ minHeight:"100vh", background:C.dark, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ color:"#8b1a1a", fontFamily:"sans-serif", fontSize:14 }}>Access denied.</div>
    </div>
  );

  if (view === "edit" || view === "new") return (
    <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
      <div style={{ background:C.navyDeep, borderBottom:"1px solid #1e3a6e", padding:"1rem 1.5rem", display:"flex", gap:12, alignItems:"center" }}>
        <button onClick={() => { setView("list"); setEditPost(null); setNewTitle(""); setNewBody(""); }} style={{ background:"none", border:"1px solid #b8963e", color:"#b8963e", padding:"6px 14px", cursor:"pointer", fontSize:13, fontFamily:"sans-serif" }}>Back</button>
        <div style={{ color:C.goldLight, fontSize:15 }}>{editPost ? "Edit Post" : "New Post"}</div>
      </div>
      <div style={{ maxWidth:720, margin:"0 auto", padding:"2rem 1.5rem" }}>
        {!editPost && (
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:10, color:C.gold, fontFamily:"sans-serif", marginBottom:6 }}>TYPE</div>
            <div style={{ display:"flex", gap:8 }}>
              {["author","member"].map(t => (
                <button key={t} onClick={() => setNewType(t)} style={{ padding:"8px 18px", background:newType===t?C.gold:C.navyDeep, color:newType===t?C.navyDeep:C.muted, border:"1px solid #1e3a6e", cursor:"pointer", fontFamily:"sans-serif", fontSize:11, fontWeight:newType===t?700:400 }}>
                  {t==="author" ? "Author Post" : "Member Thread"}
                </button>
              ))}
            </div>
          </div>
        )}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:10, color:C.gold, fontFamily:"sans-serif", marginBottom:6 }}>TITLE</div>
          <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} style={{ width:"100%", padding:"12px", background:"#1a3a6b", border:"1px solid #1e3a6e", color:C.cream, fontSize:14, fontFamily:"Georgia,serif", boxSizing:"border-box" }} />
        </div>
        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:10, color:C.gold, fontFamily:"sans-serif", marginBottom:6 }}>BODY</div>
          <textarea value={newBody} onChange={e => setNewBody(e.target.value)} rows={14} style={{ width:"100%", padding:"12px", background:"#1a3a6b", border:"1px solid #1e3a6e", color:C.cream, fontSize:13, fontFamily:"sans-serif", resize:"vertical", lineHeight:1.8, boxSizing:"border-box" }} />
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <Btn onClick={savePost}>{editPost ? "Save Changes" : "Publish"}</Btn>
          <button onClick={() => { setView("list"); setEditPost(null); setNewTitle(""); setNewBody(""); }} style={{ background:"transparent", color:C.muted, border:"1px solid #1e3a6e", padding:"8px 16px", cursor:"pointer", fontFamily:"sans-serif", fontSize:11 }}>Cancel</button>
        </div>
      </div>
    </div>
  );

  if (view === "bans") return (
    <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
      <div style={{ background:C.navyDeep, borderBottom:"1px solid #1e3a6e", padding:"1rem 1.5rem", display:"flex", gap:12, alignItems:"center" }}>
        <button onClick={() => setView("list")} style={{ background:"none", border:"1px solid #b8963e", color:"#b8963e", padding:"6px 14px", cursor:"pointer", fontSize:13, fontFamily:"sans-serif" }}>Back</button>
        <div style={{ color:C.goldLight, fontSize:15 }}>Banned Sessions ({bans.length})</div>
      </div>
      <div style={{ maxWidth:720, margin:"0 auto", padding:"2rem 1.5rem" }}>
        {bans.length === 0 && <div style={{ color:C.muted, fontFamily:"sans-serif", textAlign:"center", padding:"3rem" }}>No active bans.</div>}
        {bans.map((token, i) => (
          <div key={i} style={{ background:C.navyDeep, border:"1px solid #1e3a6e", padding:"1rem 1.25rem", marginBottom:10, display:"flex", justifyContent:"space-between", alignItems:"center", gap:10 }}>
            <div style={{ fontSize:11, color:C.muted, fontFamily:"sans-serif", wordBreak:"break-all" }}>{token}</div>
            <Btn onClick={() => unban(token)} small>Unban</Btn>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
      <div style={{ background:C.navyDeep, borderBottom:"1px solid #1e3a6e", padding:"1rem 1.5rem", display:"flex", gap:12, alignItems:"center", justifyContent:"space-between", flexWrap:"wrap" }}>
        <div style={{ color:C.goldLight, fontSize:15 }}>Consulate Admin</div>
        <div style={{ display:"flex", gap:8 }}>
          <Btn onClick={() => { setView("new"); setEditPost(null); setNewTitle(""); setNewBody(""); setNewType("author"); }}>+ New Post</Btn>
          <Btn onClick={() => { loadBans(); setView("bans"); }} color="#1e3a6e">Bans ({bans.length})</Btn>
        </div>
      </div>
      <div style={{ maxWidth:900, margin:"0 auto", padding:"2rem 1.5rem" }}>
        {msg && <div style={{ background:"rgba(184,150,62,0.1)", border:"1px solid #b8963e", padding:"10px 16px", marginBottom:16, fontSize:13, color:C.gold, fontFamily:"sans-serif" }}>{msg}</div>}
        {loading && <div style={{ color:C.muted, textAlign:"center", padding:"2rem", fontFamily:"sans-serif" }}>Loading...</div>}

        {posts.map(post => (
          <div key={post.id} style={{ background:C.navyDeep, border:"1px solid #1e3a6e", padding:"1.25rem", marginBottom:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8, gap:10, flexWrap:"wrap" }}>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:4 }}>
                  <div style={{ fontSize:15, color:C.goldLight, fontFamily:"Georgia,serif" }}>{post.title}</div>
                  <div style={{ background:post.type==="author"?C.gold:"#1e3a6e", color:post.type==="author"?C.navyDeep:C.muted, fontSize:8, padding:"2px 6px", fontFamily:"sans-serif", fontWeight:700 }}>{post.type.toUpperCase()}</div>
                </div>
                <div style={{ fontSize:10, color:C.mutedDark, fontFamily:"sans-serif" }}>
                  {post.author} - {new Date(post.createdAt).toLocaleDateString()} - {(post.comments||[]).length} comments
                  {post.token && post.token !== "admin" && <span style={{ marginLeft:10, color:"#3a3a6e" }}>session: {post.token.slice(0,12)}...</span>}
                </div>
              </div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                <Btn onClick={() => startEdit(post)} small>Edit</Btn>
                {post.token && post.token !== "admin" && <>
                  <Btn onClick={() => kickUser(post.token, post.author)} color="#7a5a00" small>Kick</Btn>
                  <Btn onClick={() => banUser(post.token, post.author)} color={C.red} small>Ban</Btn>
                </>}
                <Btn onClick={() => deletePost(post.id)} color="#4a0a0a" small>Delete</Btn>
              </div>
            </div>
            <p style={{ fontSize:12, color:C.creamDim, lineHeight:1.65, fontFamily:"sans-serif", marginBottom:(post.comments||[]).length>0?12:0 }}>{post.body.slice(0,200)}{post.body.length>200?"...":""}</p>

            {(post.comments||[]).length > 0 && (
              <div style={{ borderTop:"1px solid #1e3a6e", paddingTop:10 }}>
                <div style={{ fontSize:9, color:C.gold, fontFamily:"sans-serif", marginBottom:8 }}>COMMENTS ({post.comments.length})</div>
                {post.comments.map((c, ci) => (
                  <div key={ci} style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", padding:"8px 0", borderBottom:ci<post.comments.length-1?"1px solid #1a2a4a":"none", gap:10 }}>
                    <div style={{ flex:1 }}>
                      <span style={{ fontSize:10, color:C.gold, fontFamily:"sans-serif", marginRight:8 }}>{c.author}</span>
                      <span style={{ fontSize:12, color:C.creamDim, fontFamily:"sans-serif" }}>{c.text.slice(0,120)}{c.text.length>120?"...":""}</span>
                      {c.token && <span style={{ fontSize:9, color:"#2a2a5e", marginLeft:8 }}>{c.token.slice(0,10)}...</span>}
                    </div>
                    <div style={{ display:"flex", gap:4, flexShrink:0 }}>
                      {c.token && c.token !== "admin" && <>
                        <Btn onClick={() => kickUser(c.token, c.author)} color="#7a5a00" small>Kick</Btn>
                        <Btn onClick={() => banUser(c.token, c.author)} color={C.red} small>Ban</Btn>
                      </>}
                      <Btn onClick={() => deleteComment(post.id, ci)} color="#4a0a0a" small>Del</Btn>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {!loading && posts.length===0 && <div style={{ textAlign:"center", color:C.muted, padding:"3rem", fontFamily:"sans-serif" }}>No posts yet.</div>}
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const adminKey = process.env.IL_ADMIN_KEY || "";
  const provided = query.key || "";
  if (!provided || provided !== adminKey) {
    return { notFound: true };
  }
  return { props: { adminKey } };
}
