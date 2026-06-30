import { useState } from "react";

const C = {
  navy:"#1a3a6b", navyDeep:"#0f2347", navyMid:"#1e4080",
  gold:"#b8963e", goldLight:"#d4af6a", goldDim:"#7a6228",
  cream:"#f0e6cc", creamDim:"#c8b890",
  muted:"#8a7a5a", border:"#1e3a6e", dark:"#091a35",
  green:"#4a7c5e",
};

function Eyebrow({ children }) {
  return <div style={{ fontSize:9, letterSpacing:"0.25em", textTransform:"uppercase", color:C.gold, fontFamily:"sans-serif", marginBottom:10 }}>{children}</div>;
}

export default function ForWomen() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setMsg("Please enter your name and a valid email address."); return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), source: "for-women" }),
      });
      const data = await res.json();
      if (data.ok) {
        setSubmitted(true);
      } else { setMsg("Something went wrong. Please try again."); }
    } catch(e) { setMsg("Connection error. Please try again."); }
    setLoading(false);
  };

  return (
    <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia, serif" }}>

      {/* Nav */}
      <div style={{ background:C.navyDeep, borderBottom:"1px solid " + C.border, padding:"1rem 1.5rem", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <a href="/" style={{ color:C.gold, fontSize:13, textDecoration:"none", fontFamily:"sans-serif" }}>← The International Lover™</a>
        <a href="/matrimonial" style={{ color:C.goldLight, fontSize:12, fontFamily:"sans-serif", border:"1px solid " + C.gold, padding:"6px 14px", textDecoration:"none" }}>Already registered? Sign in →</a>
      </div>

      {/* Hero */}
      <section style={{ background:"linear-gradient(180deg, #0f2347 0%, #091a35 100%)", padding:"5rem 1.5rem 4rem", textAlign:"center", borderBottom:"1px solid " + C.border }}>
        <div style={{ maxWidth:640, margin:"0 auto" }}>
          <Eyebrow>For Women — Free Membership</Eyebrow>
          <h1 style={{ fontSize:"clamp(1.6rem,4vw,2.4rem)", color:C.goldLight, fontWeight:"normal", lineHeight:1.3, marginBottom:"1.25rem" }}>
            You deserve a man who prepared.
          </h1>
          <p style={{ fontSize:"clamp(13px,1.8vw,16px)", color:C.creamDim, lineHeight:1.85, fontFamily:"sans-serif", marginBottom:"2.5rem", maxWidth:520, margin:"0 auto 2.5rem" }}>
            The International Lover™ is a matrimonial platform for serious men who have studied cultural intelligence, family protocol, and what marriage actually requires. Women join free — always.
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <a href="#join" style={{ background:C.gold, color:C.navyDeep, padding:"14px 32px", fontSize:14, fontWeight:700, fontFamily:"sans-serif", textDecoration:"none" }}>
              Create Your Free Profile →
            </a>
            <a href="#how-it-works" style={{ background:"transparent", color:C.gold, border:"1px solid " + C.gold, padding:"14px 32px", fontSize:14, fontFamily:"sans-serif", textDecoration:"none" }}>
              How It Works
            </a>
          </div>
        </div>
      </section>

      {/* What makes this different */}
      <section style={{ padding:"4rem 1.5rem", borderBottom:"1px solid " + C.border }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"3rem" }}>
            <Eyebrow>What Makes This Different</Eyebrow>
            <h2 style={{ fontSize:"clamp(18px,2.5vw,24px)", color:C.goldLight, fontWeight:"normal" }}>The men here have done the work.</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px,1fr))", gap:20 }}>
            {[
              { icon:"📖", title:"Educated Before They Arrive", desc:"Every man on this platform has completed a course in cultural intelligence, family engagement, and international marriage protocol. They are not guessing." },
              { icon:"👨‍👩‍👧", title:"Family Comes First", desc:"The men here understand that marrying you means entering your family. They have studied how to approach a father, meet a family, and honor your tradition." },
              { icon:"🌍", title:"Internationally Aware", desc:"These men have studied the specific cultures, regions, and protocols relevant to where you are from. They are not treating every culture as interchangeable." },
              { icon:"✦", title:"Verified and Screened", desc:"Profiles are real. Men must complete the course or hold Ambassador status before they can contact any woman. No casual browsers." },
            ].map(f => (
              <div key={f.title} style={{ background:C.navyDeep, border:"1px solid " + C.border, padding:"1.5rem" }}>
                <div style={{ fontSize:28, marginBottom:10 }}>{f.icon}</div>
                <div style={{ color:C.goldLight, fontSize:14, fontWeight:"bold", marginBottom:8, fontFamily:"sans-serif" }}>{f.title}</div>
                <div style={{ color:C.muted, fontSize:12, lineHeight:1.7, fontFamily:"sans-serif" }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{ padding:"4rem 1.5rem", background:C.navyDeep, borderBottom:"1px solid " + C.border }}>
        <div style={{ maxWidth:680, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"3rem" }}>
            <Eyebrow>How It Works</Eyebrow>
            <h2 style={{ fontSize:"clamp(18px,2.5vw,24px)", color:C.goldLight, fontWeight:"normal" }}>Simple. Secure. On your terms.</h2>
          </div>
          {[
            { n:"1", title:"Register below — free, always", desc:"Enter your name and email. You will receive your access link by email immediately. Click it to enter the platform." },
            { n:"2", title:"Create your profile", desc:"Your region, your faith, your family involvement preferences, your education, your background. You control what is visible. You can hide or remove your profile at any time." },
            { n:"3", title:"Browse men's profiles", desc:"Women can browse freely. You will see men's profiles, their backgrounds, and whether they hold Certified or Ambassador status." },
            { n:"4", title:"Contact on your own timeline", desc:"Women can initiate contact with any man on the platform. Men can only contact you if they have completed the course or hold Ambassador status." },
            { n:"5", title:"Your family's involvement is respected", desc:"You set your family involvement preference on your profile. Men who have studied the protocol will respect it." },
          ].map(s => (
            <div key={s.n} style={{ display:"flex", gap:16, alignItems:"flex-start", marginBottom:"1.75rem" }}>
              <div style={{ width:32, height:32, background:C.gold, color:C.navyDeep, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, fontFamily:"sans-serif", flexShrink:0, marginTop:2 }}>{s.n}</div>
              <div>
                <div style={{ color:C.goldLight, fontSize:14, fontFamily:"sans-serif", fontWeight:"bold", marginBottom:4 }}>{s.title}</div>
                <div style={{ color:C.muted, fontSize:13, lineHeight:1.7, fontFamily:"sans-serif" }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Your safety */}
      <section style={{ padding:"4rem 1.5rem", borderBottom:"1px solid " + C.border }}>
        <div style={{ maxWidth:680, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <Eyebrow>Your Safety</Eyebrow>
            <h2 style={{ fontSize:"clamp(18px,2.5vw,24px)", color:C.goldLight, fontWeight:"normal" }}>You are in control at every step.</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px,1fr))", gap:14 }}>
            {[
              "Hide your profile at any time — one click",
              "Block any member permanently",
              "Report any concerning behavior",
              "Your email is never visible to other members",
              "Your profile, your control",
              "Contact men only when you are ready",
            ].map(item => (
              <div key={item} style={{ background:C.navyDeep, border:"1px solid " + C.border, padding:"1rem", display:"flex", gap:10, alignItems:"flex-start" }}>
                <div style={{ color:C.green, fontSize:14, flexShrink:0 }}>✓</div>
                <div style={{ color:C.creamDim, fontSize:12, lineHeight:1.6, fontFamily:"sans-serif" }}>{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration form */}
      <section id="join" style={{ padding:"5rem 1.5rem", background:C.navyDeep, borderBottom:"1px solid " + C.border }}>
        <div style={{ maxWidth:480, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <Eyebrow>Join Free</Eyebrow>
            <h2 style={{ fontSize:"clamp(18px,2.5vw,24px)", color:C.goldLight, fontWeight:"normal", marginBottom:8 }}>Create your free profile.</h2>
            <p style={{ color:C.muted, fontSize:12, fontFamily:"sans-serif", lineHeight:1.7 }}>Women join free. Create your profile and start browsing right away. You are never charged.</p>
          </div>

          {submitted ? (
            <div style={{ textAlign:"center", padding:"2.5rem 1rem", background:C.dark, border:"1px solid " + C.green }}>
              <div style={{ fontSize:36, marginBottom:12 }}>✓</div>
              <div style={{ color:C.goldLight, fontSize:18, marginBottom:10 }}>Registration complete.</div>
              <p style={{ color:C.muted, fontSize:13, fontFamily:"sans-serif", lineHeight:1.7 }}>
                Check your email for your access link. Click it to enter the platform and create your profile.
              </p>
            </div>
          ) : (
            <div style={{ background:C.dark, border:"1px solid " + C.border, padding:"2rem" }}>
              <div style={{ marginBottom:14 }}>
                <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif", letterSpacing:"0.12em", marginBottom:6 }}>YOUR NAME</div>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your first name"
                  style={{ width:"100%", padding:"12px 14px", background:C.navyDeep, border:"1px solid " + C.border, color:C.cream, fontSize:14, fontFamily:"sans-serif", boxSizing:"border-box", outline:"none" }}
                />
              </div>
              <div style={{ marginBottom:20 }}>
                <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif", letterSpacing:"0.12em", marginBottom:6 }}>EMAIL ADDRESS</div>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  placeholder="Your email address"
                  style={{ width:"100%", padding:"12px 14px", background:C.navyDeep, border:"1px solid " + C.border, color:C.cream, fontSize:14, fontFamily:"sans-serif", boxSizing:"border-box", outline:"none" }}
                />
              </div>
              {msg && <div style={{ color:"#c08080", fontSize:12, fontFamily:"sans-serif", marginBottom:14 }}>{msg}</div>}
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{ width:"100%", padding:"14px", background:loading ? C.border : C.gold, color:C.navyDeep, border:"none", cursor:loading ? "default" : "pointer", fontSize:14, fontWeight:700, fontFamily:"sans-serif" }}
              >
                {loading ? "Registering..." : "Register Free →"}
              </button>
              <div style={{ fontSize:11, color:C.muted, fontFamily:"sans-serif", textAlign:"center", marginTop:12 }}>
                No payment required. Ever.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <div style={{ background:C.dark, padding:"2rem 1.5rem", textAlign:"center", borderTop:"1px solid " + C.border }}>
        <div style={{ color:C.gold, fontSize:14, marginBottom:6 }}>The International Lover™</div>
        <div style={{ color:C.muted, fontSize:11, fontFamily:"sans-serif" }}>A platform by ASM Productions LLC · <a href="/" style={{ color:C.muted }}>theinternationallover.com</a></div>
      </div>
    </div>
  );
}
