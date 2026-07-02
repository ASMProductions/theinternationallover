// pages/community.js
// The Consulate — IL community forum, member-only
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const C = {
  navy:"#1a3a6b", navyDeep:"#0f2347", navyMid:"#1e4080",
  gold:"#b8963e", goldLight:"#d4af6a", goldPale:"#e8d5a3",
  goldDim:"#7a6228", cream:"#f0e6cc", creamDim:"#c8b890",
  white:"#ffffff", muted:"#8a7a5a", mutedDark:"#5a4e32",
  border:"#1e3a6e", borderGold:"#3a2e18", dark:"#091a35",
  scarlet:"#8b1a1a", green:"#4a7c5e",
};

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins  < 2)  return "just now";
  if (mins  < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days  < 7)  return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" });
}

export default function Consulate() {
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState(false);
  const [checking, setChecking] = useState(true);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Check paywall
  useEffect(() => {
    const access = sessionStorage.getItem("il_access");
    if (access === "true") {
      setHasAccess(true);
    } else {
      router.replace("/");
    }
    setChecking(false);
  }, []);

  // Load posts
  useEffect(() => {
    if (!hasAccess) return;
    fetch("/api/consulate")
      .then(r => r.json())
      .then(data => {
        const sorted = (data.posts || []).sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setPosts(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [hasAccess]);

  const handleSubmit = async () => {
    if (!text.trim()) { setError("Please enter a message."); return; }
    setSubmitting(true); setError("");
    try {
      const res = await fetch("/api/consulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim() }),
      });
      const data = await res.json();
      if (data.submitted) {
        setSubmitted(true);
        setText("");
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (checking) return null;

  if (!hasAccess) return null;

  return (
    <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia, serif" }}>

      {/* Header */}
      <div style={{ background:C.navyDeep, borderBottom:`1px solid ${C.border}`, padding:"1rem 1.5rem", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
        <div>
          <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.muted, fontFamily:"sans-serif", textTransform:"uppercase" }}>The International Lover™</div>
          <div style={{ fontSize:16, color:C.goldLight }}>The Consulate</div>
        </div>
        <button onClick={() => router.push("/")} style={{ background:"none", border:`1px solid ${C.gold}`, color:C.gold, padding:"6px 14px", borderRadius:20, cursor:"pointer", fontSize:12, fontFamily:"sans-serif" }}>← Library</button>
      </div>

      <div style={{ maxWidth:720, margin:"0 auto", padding:"2rem 1.5rem" }}>

        {/* Intro */}
        <div style={{ background:C.navyDeep, border:`1px solid ${C.border}`, borderLeft:`3px solid ${C.gold}`, padding:"1.25rem 1.5rem", marginBottom:"1.75rem" }}>
          <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.gold, fontFamily:"sans-serif", marginBottom:6 }}>MEMBER COMMUNITY</div>
          <p style={{ fontSize:13, color:C.creamDim, lineHeight:1.8, margin:0, fontFamily:"sans-serif" }}>
            The Consulate is the private community forum of The International Lover™ platform.
            Posts are reviewed before appearing publicly. This is not a social media feed — it is a deliberate space
            for men who are serious about the path.
          </p>
        </div>

        {/* Post form */}
        <div style={{ background:C.navyDeep, border:`1px solid ${C.border}`, padding:"1.25rem", marginBottom:"2rem" }}>
          <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.gold, fontFamily:"sans-serif", marginBottom:12 }}>POST TO THE CONSULATE</div>
          {submitted ? (
            <div style={{ padding:"1rem", background:"rgba(74,124,94,0.12)", border:"1px solid #4a7c5e", textAlign:"center" }}>
              <div style={{ fontSize:13, color:C.green, fontFamily:"sans-serif", lineHeight:1.7 }}>
                ✓ Your post has been submitted for review.<br />
                <span style={{ color:C.muted, fontSize:11 }}>It will appear once approved.</span>
              </div>
              <button onClick={() => setSubmitted(false)} style={{ marginTop:10, background:"none", border:"none", color:C.gold, fontSize:11, cursor:"pointer", fontFamily:"sans-serif", textDecoration:"underline" }}>Post again</button>
            </div>
          ) : (
            <>
              <textarea
                value={text}
                onChange={e => { setText(e.target.value); setError(""); }}
                placeholder="Share your experience, a question, or an observation..."
                rows={4}
                style={{ width:"100%", padding:"10px 14px", background:C.dark, border:`1px solid ${C.border}`, color:C.cream, fontSize:13, fontFamily:"sans-serif", resize:"vertical", boxSizing:"border-box", lineHeight:1.65, outline:"none", marginBottom:8 }}
              />
              {error && <div style={{ fontSize:11, color:"#c08080", marginBottom:8, fontFamily:"sans-serif" }}>{error}</div>}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ fontSize:10, color:C.mutedDark, fontFamily:"sans-serif" }}>Posts are reviewed before appearing publicly.</div>
                <button
                  onClick={handleSubmit}
                  disabled={submitting || !text.trim()}
                  style={{ padding:"9px 22px", background:text.trim()&&!submitting?C.gold:"#2a3a5e", color:text.trim()&&!submitting?C.navyDeep:C.muted, border:"none", cursor:text.trim()&&!submitting?"pointer":"default", fontSize:12, fontWeight:700, fontFamily:"sans-serif", letterSpacing:"0.08em" }}
                >
                  {submitting ? "Submitting..." : "Post →"}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Posts */}
        <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.muted, fontFamily:"sans-serif", marginBottom:14 }}>COMMUNITY POSTS</div>

        {loading ? (
          <div style={{ textAlign:"center", padding:"3rem", color:C.muted, fontFamily:"sans-serif", fontSize:13 }}>Loading...</div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign:"center", padding:"3rem 1rem", color:C.muted, fontFamily:"sans-serif" }}>
            <div style={{ fontSize:28, marginBottom:12, color:C.gold, opacity:0.3 }}>✦</div>
            <div style={{ fontSize:13, lineHeight:1.75 }}>The Consulate is open.<br />Be the first to post.</div>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {posts.map(post => (
              <div key={post.id} style={{ background:C.navyDeep, border:`1px solid ${C.border}`, padding:"1.25rem" }}>
                <div style={{ fontSize:"clamp(13px,1.8vw,15px)", color:C.cream, lineHeight:1.85, fontFamily:"Georgia, serif", marginBottom:12 }}>
                  {post.text}
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:6 }}>
                  <div style={{ fontSize:10, color:C.gold, fontFamily:"sans-serif", letterSpacing:"0.05em" }}>
                    — {post.name || "The Consulate"}
                  </div>
                  <div style={{ fontSize:10, color:C.mutedDark, fontFamily:"sans-serif" }}>
                    {post.date ? timeAgo(post.date) : ""}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
