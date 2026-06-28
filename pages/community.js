import { useState, useEffect } from "react";

const C = {
  navy:"#1a3a6b", navyDeep:"#0f2347", navyMid:"#1e4080",
  gold:"#b8963e", goldLight:"#d4af6a", goldDim:"#7a6228",
  cream:"#f0e6cc", creamDim:"#c8b890",
  muted:"#8a7a5a", mutedDark:"#5a4e32",
  border:"#1e3a6e", dark:"#091a35",
};

function genToken() {
  return "s_" + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}

function getSession() {
  if (typeof window === "undefined") return { token: "", nickname: "" };
  let token = localStorage.getItem("il_session_token");
  if (!token) { token = genToken(); localStorage.setItem("il_session_token", token); }
  const nickname = localStorage.getItem("il_nickname") || "";
  return { token, nickname };
}

export default function CommunityPage() {
  const [view, setView] = useState("feed");
  const [posts, setPosts] = useState([]);
  const [activePost, setActivePost] = useState(null);
  const [nickname, setNickname] = useState("");
  const [nicknameSet, setNicknameSet] = useState(false);
  const [nickInput, setNickInput] = useState("");
  const [sessionToken, setSessionToken] = useState("");
  const [commentText, setCommentText] = useState("");
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [newThreadBody, setNewThreadBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [banned, setBanned] = useState(false);

  useEffect(() => {
    const { token, nickname: saved } = getSession();
    setSessionToken(token);
    if (saved) { setNickname(saved); setNicknameSet(true); }
    checkBanStatus(token);
  }, []);

  const checkBanStatus = async (token) => {
    try {
      const res = await fetch("/api/community?action=checkBan&token=" + token);
      const data = await res.json();
      if (data.banned) { setBanned(true); return; }
      loadPosts();
    } catch(e) { loadPosts(); }
  };

  const loadPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/community?action=list");
      const data = await res.json();
      setPosts(data.posts || []);
    } catch(e) { setError("Could not load posts."); }
    setLoading(false);
  };

  const loadPost = async (id) => {
    try {
      const res = await fetch("/api/community?action=post&id=" + id);
      const data = await res.json();
      setActivePost(data.post || null);
      setView("post");
    } catch(e) { setError("Could not load post."); }
  };

  const saveNickname = () => {
    const n = nickInput.trim();
    if (n.length < 2) return;
    localStorage.setItem("il_nickname", n);
    setNickname(n); setNicknameSet(true);
  };

  const submitComment = async () => {
    if (!commentText.trim() || !activePost) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/community", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ action:"comment", postId:activePost.id, author:nickname, token:sessionToken, text:commentText.trim() })
      });
      const data = await res.json();
      if (data.banned) { setBanned(true); return; }
      if (data.ok) { setCommentText(""); await loadPost(activePost.id); }
    } catch(e) { setError("Could not post comment."); }
    setSubmitting(false);
  };

  const submitThread = async () => {
    if (!newThreadTitle.trim() || !newThreadBody.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/community", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ action:"createThread", author:nickname, token:sessionToken, title:newThreadTitle.trim(), body:newThreadBody.trim(), isAmbassador: typeof window !== "undefined" && sessionStorage.getItem("il_ambassador") === "true" })
      });
      const data = await res.json();
      if (data.banned) { setBanned(true); return; }
      if (data.ok) { setNewThreadTitle(""); setNewThreadBody(""); setView("feed"); await loadPosts(); }
    } catch(e) { setError("Could not create thread."); }
    setSubmitting(false);
  };

  const goBack = () => { window.location.href = "/library"; };

  const NavBar = ({ title, left }) => (
    <div style={{ background:C.navyDeep, borderBottom:"1px solid #1e3a6e", padding:"1rem 1.5rem", display:"flex", alignItems:"center", gap:"1rem" }}>
      {left}
      <div style={{ flex:1 }}>
        <div style={{ fontSize:9, color:C.muted, letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:"sans-serif" }}>The International Lover - The Consulate</div>
        <div style={{ fontSize:15, color:C.goldLight }}>{title}</div>
      </div>
    </div>
  );

  const Btn = ({ onClick, children, style }) => (
    <button onClick={onClick} style={{ background:C.gold, color:C.navyDeep, border:"none", cursor:"pointer", fontWeight:700, fontFamily:"sans-serif", padding:"10px 20px", fontSize:12, ...style }}>{children}</button>
  );

  const GhostBtn = ({ onClick, children }) => (
    <button onClick={onClick} style={{ background:"transparent", color:C.gold, border:"1px solid #b8963e", cursor:"pointer", fontFamily:"sans-serif", padding:"8px 16px", fontSize:12 }}>{children}</button>
  );

  if (banned) return (
    <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ maxWidth:400, textAlign:"center", padding:"2rem" }}>
        <div style={{ fontSize:9, letterSpacing:"0.3em", color:"#8b1a1a", fontFamily:"sans-serif", marginBottom:16 }}>ACCESS REVOKED</div>
        <div style={{ fontSize:20, color:C.goldLight, marginBottom:12 }}>You have been removed from the Consulate.</div>
        <p style={{ fontSize:13, color:C.creamDim, lineHeight:1.8, fontFamily:"sans-serif" }}>Your access to this community has been permanently revoked by the administrator.</p>
        <button onClick={goBack} style={{ marginTop:24, background:"none", border:"1px solid #b8963e", color:C.gold, padding:"10px 24px", cursor:"pointer", fontFamily:"sans-serif", fontSize:12 }}>Return to Library</button>
      </div>
    </div>
  );

  if (!nicknameSet) return (
    <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
      <NavBar title="The Consulate" left={<button onClick={goBack} style={{ background:"none", border:"1px solid #b8963e", color:"#b8963e", padding:"6px 14px", cursor:"pointer", fontSize:13, fontFamily:"sans-serif" }}>Back</button>} />
      <div style={{ maxWidth:480, margin:"0 auto", padding:"5rem 1.5rem", textAlign:"center" }}>
        <div style={{ fontSize:9, letterSpacing:"0.3em", color:C.gold, fontFamily:"sans-serif", marginBottom:16 }}>BEFORE YOU ENTER</div>
        <div style={{ fontSize:22, color:C.goldLight, fontFamily:"Georgia,serif", marginBottom:12 }}>Choose your name in the Consulate.</div>
        <p style={{ fontSize:13, color:C.creamDim, lineHeight:1.8, marginBottom:28, fontFamily:"sans-serif" }}>This name is how others will see you. No personal information is displayed. You can change it anytime.</p>
        <input type="text" value={nickInput} onChange={e => setNickInput(e.target.value)} onKeyDown={e => e.key==="Enter" && saveNickname()} placeholder="Your display name..." style={{ width:"100%", padding:"14px 18px", background:"#1a3a6b", border:"1px solid #b8963e", color:C.cream, fontSize:16, fontFamily:"Georgia,serif", boxSizing:"border-box", marginBottom:14 }} />
        <Btn onClick={saveNickname} style={{ width:"100%", padding:"13px" }}>Enter the Consulate</Btn>
      </div>
    </div>
  );

  if (view === "post" && activePost) {
    const comments = activePost.comments || [];
    return (
      <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
        <NavBar title={activePost.title} left={<button onClick={() => { setView("feed"); setActivePost(null); loadPosts(); }} style={{ background:"none", border:"1px solid #b8963e", color:"#b8963e", padding:"6px 14px", cursor:"pointer", fontSize:13, fontFamily:"sans-serif" }}>Back</button>} />
        <div style={{ maxWidth:720, margin:"0 auto", padding:"2rem 1.5rem" }}>
          <div style={{ background:C.navyDeep, border:"1px solid #1e3a6e", padding:"1.5rem", marginBottom:"1.5rem" }}>
            <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:12 }}>
              <div style={{ width:32, height:32, background:C.navy, border:"1px solid #b8963e", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <span style={{ fontSize:12, color:C.gold, fontFamily:"sans-serif", fontWeight:700 }}>{(activePost.author||"?")[0].toUpperCase()}</span>
              </div>
              <div>
                <div style={{ fontSize:12, color:C.goldLight, fontFamily:"sans-serif", fontWeight:700 }}>{activePost.author}</div>
                <div style={{ fontSize:9, color:C.mutedDark, fontFamily:"sans-serif" }}>{activePost.type==="author" ? "The International Lover" : "Member"} - {new Date(activePost.createdAt).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</div>
              </div>
              {activePost.type==="author" && <div style={{ marginLeft:"auto", background:C.gold, color:C.navyDeep, fontSize:8, fontWeight:700, padding:"2px 8px", fontFamily:"sans-serif", letterSpacing:"0.1em" }}>AUTHOR</div>}
              {activePost.isAmbassador && activePost.type!=="author" && <div style={{ marginLeft:"auto", background:"#1a3a6b", border:"1px solid #b8963e", color:"#b8963e", fontSize:8, fontWeight:700, padding:"2px 8px", fontFamily:"sans-serif", letterSpacing:"0.1em" }}>AMBASSADOR</div>}
            </div>
            <p style={{ fontSize:"clamp(14px,2vw,16px)", color:C.cream, lineHeight:1.9, fontFamily:"Georgia,serif", whiteSpace:"pre-wrap" }}>{activePost.body}</p>
          </div>

          <div style={{ fontSize:10, color:C.gold, letterSpacing:"0.2em", fontFamily:"sans-serif", marginBottom:14 }}>{comments.length} {comments.length===1?"RESPONSE":"RESPONSES"}</div>

          {comments.map((c, i) => (
            <div key={i} style={{ background:C.navyDeep, border:"1px solid #1e3a6e", padding:"1rem 1.25rem", marginBottom:10 }}>
              <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:8 }}>
                <div style={{ width:26, height:26, background:C.navy, border:"1px solid #1e3a6e", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif", fontWeight:700 }}>{(c.author||"?")[0].toUpperCase()}</span>
                </div>
                <div style={{ fontSize:11, color:C.goldLight, fontFamily:"sans-serif" }}>{c.author}</div>
                <div style={{ fontSize:9, color:C.mutedDark, fontFamily:"sans-serif", marginLeft:"auto" }}>{new Date(c.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric"})}</div>
              </div>
              <p style={{ fontSize:13, color:C.creamDim, lineHeight:1.75, fontFamily:"sans-serif", margin:0 }}>{c.text}</p>
            </div>
          ))}

          <div style={{ background:C.navyDeep, border:"1px solid #1e3a6e", padding:"1.25rem", marginTop:"1.5rem" }}>
            <div style={{ fontSize:9, color:C.gold, letterSpacing:"0.15em", fontFamily:"sans-serif", marginBottom:10 }}>YOUR RESPONSE - {nickname}</div>
            <textarea value={commentText} onChange={e => setCommentText(e.target.value)} rows={4} placeholder="Say something real..." style={{ width:"100%", padding:"12px", background:"#1a3a6b", border:"1px solid #1e3a6e", color:C.cream, fontSize:13, fontFamily:"sans-serif", resize:"vertical", boxSizing:"border-box", marginBottom:10 }} />
            <Btn onClick={submitComment} style={{ opacity:submitting?0.6:1 }}>{submitting?"Posting...":"Post Response"}</Btn>
          </div>
        </div>
      </div>
    );
  }

  if (view === "newthread") return (
    <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
      <NavBar title="Start a Thread" left={<button onClick={() => setView("feed")} style={{ background:"none", border:"1px solid #b8963e", color:"#b8963e", padding:"6px 14px", cursor:"pointer", fontSize:13, fontFamily:"sans-serif" }}>Back</button>} />
      <div style={{ maxWidth:680, margin:"0 auto", padding:"2rem 1.5rem" }}>
        <div style={{ fontSize:9, color:C.muted, fontFamily:"sans-serif", marginBottom:20, lineHeight:1.7 }}>Posting as <span style={{ color:C.gold }}>{nickname}</span>. Keep it real. This is a space for men who are serious.</div>
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:10, color:C.gold, letterSpacing:"0.15em", fontFamily:"sans-serif", marginBottom:6 }}>TITLE</div>
          <input type="text" value={newThreadTitle} onChange={e => setNewThreadTitle(e.target.value)} placeholder="What is this thread about?" style={{ width:"100%", padding:"12px 16px", background:"#1a3a6b", border:"1px solid #1e3a6e", color:C.cream, fontSize:14, fontFamily:"Georgia,serif", boxSizing:"border-box" }} />
        </div>
        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:10, color:C.gold, letterSpacing:"0.15em", fontFamily:"sans-serif", marginBottom:6 }}>YOUR POST</div>
          <textarea value={newThreadBody} onChange={e => setNewThreadBody(e.target.value)} rows={8} placeholder="Write your post..." style={{ width:"100%", padding:"12px 16px", background:"#1a3a6b", border:"1px solid #1e3a6e", color:C.cream, fontSize:13, fontFamily:"sans-serif", resize:"vertical", boxSizing:"border-box" }} />
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <Btn onClick={submitThread} style={{ opacity:submitting?0.6:1 }}>{submitting?"Posting...":"Post Thread"}</Btn>
          <GhostBtn onClick={() => setView("feed")}>Cancel</GhostBtn>
        </div>
      </div>
    </div>
  );

  const authorPosts = posts.filter(p => p.type==="author");
  const memberPosts = posts.filter(p => p.type==="member");

  return (
    <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
      <NavBar title="The Consulate" left={<button onClick={goBack} style={{ background:"none", border:"1px solid #b8963e", color:"#b8963e", padding:"6px 14px", cursor:"pointer", fontSize:13, fontFamily:"sans-serif" }}>Back</button>} />
      <div style={{ maxWidth:760, margin:"0 auto", padding:"2rem 1.5rem" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"2rem", flexWrap:"wrap", gap:10 }}>
          <div>
            <div style={{ fontSize:9, letterSpacing:"0.25em", color:C.gold, fontFamily:"sans-serif", marginBottom:4 }}>WELCOME, {nickname.toUpperCase()}</div>
            <div style={{ fontSize:13, color:C.creamDim, fontFamily:"sans-serif" }}>This is where serious men talk seriously.</div>
          </div>
          <Btn onClick={() => setView("newthread")}>+ Start a Thread</Btn>
        </div>

        {loading && <div style={{ textAlign:"center", color:C.muted, padding:"3rem", fontFamily:"sans-serif" }}>Loading...</div>}
        {error && <div style={{ color:"#c0392b", padding:"1rem", fontFamily:"sans-serif", fontSize:13 }}>{error}</div>}

        {authorPosts.length > 0 && (
          <div style={{ marginBottom:"2.5rem" }}>
            <div style={{ fontSize:9, letterSpacing:"0.25em", color:C.gold, fontFamily:"sans-serif", marginBottom:14, borderBottom:"1px solid #1e3a6e", paddingBottom:8 }}>FROM THE AUTHOR</div>
            {authorPosts.map(post => (
              <div key={post.id} onClick={() => loadPost(post.id)} style={{ background:C.navyDeep, border:"1px solid #b8963e", padding:"1.25rem", marginBottom:12, cursor:"pointer" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                  <div style={{ fontSize:16, color:C.goldLight, fontFamily:"Georgia,serif" }}>{post.title}</div>
                  <div style={{ background:C.gold, color:C.navyDeep, fontSize:8, fontWeight:700, padding:"2px 8px", fontFamily:"sans-serif", letterSpacing:"0.1em", flexShrink:0, marginLeft:12 }}>AUTHOR</div>
                </div>
                <p style={{ fontSize:12, color:C.creamDim, lineHeight:1.7, fontFamily:"sans-serif", marginBottom:10 }}>{post.body.slice(0,200)}{post.body.length>200?"...":""}</p>
                <div style={{ display:"flex", gap:16, fontSize:10, color:C.mutedDark, fontFamily:"sans-serif" }}>
                  <span>{new Date(post.createdAt).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</span>
                  <span>{(post.comments||[]).length} responses</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div>
          <div style={{ fontSize:9, letterSpacing:"0.25em", color:C.gold, fontFamily:"sans-serif", marginBottom:14, borderBottom:"1px solid #1e3a6e", paddingBottom:8 }}>MEMBER THREADS</div>
          {memberPosts.length===0 && !loading && (
            <div style={{ textAlign:"center", padding:"3rem 1rem", color:C.muted, fontFamily:"sans-serif" }}>
              <div style={{ fontSize:14, marginBottom:8 }}>No threads yet.</div>
              <div style={{ fontSize:12, marginBottom:20 }}>Be the first to start a conversation.</div>
              <Btn onClick={() => setView("newthread")}>Start the First Thread</Btn>
            </div>
          )}
          {memberPosts.map(post => (
            <div key={post.id} onClick={() => loadPost(post.id)} style={{ background:C.navyDeep, border:"1px solid #1e3a6e", padding:"1.25rem", marginBottom:10, cursor:"pointer" }}>
              <div style={{ fontSize:15, color:C.goldLight, fontFamily:"Georgia,serif", marginBottom:6 }}>{post.title}</div>
              <p style={{ fontSize:12, color:C.creamDim, lineHeight:1.65, fontFamily:"sans-serif", marginBottom:8 }}>{post.body.slice(0,160)}{post.body.length>160?"...":""}</p>
              <div style={{ display:"flex", gap:16, fontSize:10, color:C.mutedDark, fontFamily:"sans-serif" }}>
                <span style={{ color:C.muted }}>{post.author}</span>
                <span>{new Date(post.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric"})}</span>
                <span>{(post.comments||[]).length} responses</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
