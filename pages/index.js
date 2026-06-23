import { useState, useEffect } from "react";

const C = {
  navy:"#0d1f3c", navyDeep:"#091629", navyMid:"#122444",
  gold:"#b8963e", goldLight:"#d4af6a", goldPale:"#e8d5a3",
  goldDim:"#7a6228", cream:"#f0e6cc", creamDim:"#c8b890",
  white:"#ffffff", muted:"#8a7a5a", mutedDark:"#5a4e32",
  border:"#1e3358", borderGold:"#3a2e18", dark:"#050d1a",
  scarlet:"#8b1a1a",
};

const FREE_CODES = { "ILACCESS": true, "ADMINTEST": true };

const TIERS = [
  { id:"course", label:"The Course", sublabel:"Course + Full Resource Library", price:"$497", cycle:"one time · lifetime access", stripe:"https://buy.stripe.com/placeholder1",
    features:["Complete simulation course — all five regions","Fifteen profile cards across five arcs","Branching scenarios — visual novel format","Full cultural obstacle modules","Complete resource library — 14 modules","Certificate of The International Lover™"], highlight:false },
  { id:"complete", label:"Complete Platform", sublabel:"Everything. Active membership.", price:"$49.99", cycle:"per month · or $397/year", stripe:"https://buy.stripe.com/placeholder2",
    features:["Full book — 17 chapters with read-aloud","Complete simulation course","Full resource library — 14 modules","Certificate of The International Lover™","The Consulate — community forum","All five regional subgroups","Member consultation rates","All future content included"], highlight:true },
  { id:"lifetime", label:"Lifetime Commission", sublabel:"Everything. Permanently.", price:"$997", cycle:"one time · never pay again", stripe:"https://buy.stripe.com/placeholder3",
    features:["Everything in Complete Platform","Permanent access — no recurring billing","One complimentary 60-min consultation","Discounted consultation rates forever","Priority author Q&A","Early access to all new titles"], highlight:false },
];

const CONSULTATIONS = [
  { label:"Email Consultation",   duration:"Written response within 48hrs", pub:97,  mem:75,  stripe:"https://buy.stripe.com/placeholder4" },
  { label:"30-Min Phone Session", duration:"30 minutes",                    pub:175, mem:125, stripe:"https://buy.stripe.com/placeholder5" },
  { label:"60-Min Phone Session", duration:"60 minutes",                    pub:297, mem:197, stripe:"https://buy.stripe.com/placeholder6" },
  { label:"60-Min Video Session", duration:"60 minutes via video",          pub:397, mem:297, stripe:"https://buy.stripe.com/placeholder7" },
];

const REGIONS = [
  { id:"na", label:"North Africa",       desc:"Morocco · Tunisia · Algeria · Egypt" },
  { id:"me", label:"Middle East",        desc:"Jordan · Lebanon · Yemen · Syria" },
  { id:"as", label:"Asia",               desc:"Indonesia · Philippines · Bangladesh" },
  { id:"la", label:"Latin America",      desc:"Colombia · Dominican Republic · Peru" },
  { id:"ss", label:"Sub-Saharan Africa", desc:"Senegal · Ghana · Ethiopia · Kenya" },
];

const RESOURCES = [
  "Travel & Safety","Matrimonial Platform Reviews","Cultural Intelligence by Region",
  "The Family Meeting","Bride Price & Dowry","International Marriage Laws",
  "K-1 Visa Complete Walkthrough","Long-Distance Relationship Management",
  "Fraud Detection — Complete Guide","Her Arrival & The First Year",
  "Children & Family Structure","Legal Protection","The Step-Father Question","Community Resources",
];

function GoldDivider() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, margin:"0 auto", maxWidth:400 }}>
      <div style={{ flex:1, height:"0.5px", background:`linear-gradient(to right, transparent, ${C.gold})` }} />
      <div style={{ color:C.gold, fontSize:14 }}>✦</div>
      <div style={{ flex:1, height:"0.5px", background:`linear-gradient(to left, transparent, ${C.gold})` }} />
    </div>
  );
}

function Eyebrow({ children }) {
  return <div style={{ fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:C.gold, marginBottom:12, fontFamily:"sans-serif" }}>{children}</div>;
}

function ILShield({ size=48 }) {
  return (
    <svg viewBox="0 0 60 72" width={size} style={{ display:"block" }}>
      <path d="M30 2 L54 10 L54 38 C54 54 43 64 30 70 C17 64 6 54 6 38 L6 10 Z" fill="none" stroke={C.gold} strokeWidth="1.5"/>
      <path d="M30 8 L50 15 L50 38 C50 52 40 61 30 66 C20 61 10 52 10 38 L10 15 Z" fill={C.dark} stroke={C.goldDim} strokeWidth="0.75"/>
      <text x="30" y="42" textAnchor="middle" fill={C.gold} fontSize="14" fontFamily="sans-serif" fontWeight="700" letterSpacing="1">IL</text>
      <text x="30" y="10" textAnchor="middle" fill={C.gold} fontSize="10">✦</text>
      <text x="14" y="55" textAnchor="middle" fill={C.goldDim} fontSize="7">✦</text>
      <text x="46" y="55" textAnchor="middle" fill={C.goldDim} fontSize="7">✦</text>
    </svg>
  );
}

function StampRing({ label, size=72, active=false, onClick }) {
  return (
    <div onClick={onClick} style={{ display:"inline-flex", flexDirection:"column", alignItems:"center", justifyContent:"center", width:size, height:size, borderRadius:"50%", border:`1.5px ${active?"solid":"dashed"} ${C.gold}`, background:active?`rgba(184,150,62,0.12)`:"transparent", cursor:"pointer", transition:"all 0.3s", opacity:active?1:0.28 }}>
      <div style={{ fontSize:active?7:6.5, color:C.gold, fontFamily:"sans-serif", letterSpacing:"0.06em", textAlign:"center", lineHeight:1.35 }}>{label}</div>
    </div>
  );
}

export default function InternationalLoverLanding() {
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [stampedRegions, setStampedRegions] = useState([]);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => { setTimeout(() => setHeroVisible(true), 100); }, []);

  const stampRegion = (id) => { if (!stampedRegions.includes(id)) setStampedRegions(p => [...p, id]); };

  const handleEmailSubmit = async () => {
    if (!email.trim()) { setMsg("Please enter your email address."); return; }
    setSending(true); setMsg("");
    try {
      const res = await fetch("/api/send-magic-link", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ email:email.trim().toLowerCase() }) });
      const data = await res.json();
      if (data.sent) setMsg("Your access link has been sent to " + email + ". Check your inbox.");
      else setMsg(data.error || "No purchase found. Please enroll below or use your access code.");
    } catch { setMsg("Connection error. Please try again."); }
    finally { setSending(false); }
  };

  const handleCodeSubmit = () => {
    const upper = code.trim().toUpperCase();
    if (FREE_CODES[upper]) { window.location.href = "/library"; }
    else setMsg("Invalid access code. Please try again.");
  };

  return (
    <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia, serif", overflowX:"hidden" }}>

      {/* ── HERO ── */}
      <section style={{ background:`linear-gradient(180deg, ${C.navyDeep} 0%, ${C.navy} 55%, ${C.navyDeep} 100%)`, padding:"4rem 1.5rem 5rem", textAlign:"center", position:"relative", overflow:"hidden", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ position:"absolute", top:"35%", left:"50%", transform:"translate(-50%,-50%)", width:600, height:600, borderRadius:"50%", background:`radial-gradient(circle, rgba(184,150,62,0.06) 0%, transparent 70%)`, pointerEvents:"none" }} />
        <div style={{ fontSize:11, letterSpacing:"0.5em", color:C.goldLight, fontFamily:"sans-serif", fontWeight:700, marginBottom:"2.5rem", textTransform:"uppercase", opacity:heroVisible?1:0, transition:"opacity 1s ease" }}>PASSPORT</div>
        <div style={{ display:"inline-block", position:"relative", width:"min(280px,74vw)", marginBottom:"2.5rem", opacity:heroVisible?1:0, transform:heroVisible?"translateY(0)":"translateY(20px)", transition:"opacity 1.2s ease 0.3s, transform 1.2s ease 0.3s" }}>
          <div style={{ position:"absolute", inset:-8, border:`1px solid rgba(184,150,62,0.2)`, pointerEvents:"none" }} />
          <div style={{ position:"absolute", inset:-16, border:`0.5px solid rgba(184,150,62,0.08)`, pointerEvents:"none" }} />
          <img src="/cover.jpg" alt="The International Lover" style={{ width:"100%", height:"auto", display:"block", boxShadow:`0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px ${C.borderGold}` }} />
        </div>
        <div style={{ marginBottom:"1.5rem", opacity:heroVisible?0.65:0, transition:"opacity 1s ease 0.6s" }}>
          <svg viewBox="0 0 120 36" width="90" style={{ display:"block", margin:"0 auto" }}>
            <line x1="0" y1="18" x2="40" y2="18" stroke={C.gold} strokeWidth="0.5" opacity="0.5"/>
            <path d="M60 4 L72 8 L72 20 C72 27 66 32 60 34 C54 32 48 27 48 20 L48 8 Z" fill="none" stroke={C.gold} strokeWidth="1"/>
            <path d="M60 8 L69 11 L69 20 C69 26 64 30 60 32 C56 30 51 26 51 20 L51 11 Z" fill={C.navyDeep} stroke={C.goldDim} strokeWidth="0.5"/>
            <text x="60" y="22" textAnchor="middle" fill={C.gold} fontSize="7" fontFamily="sans-serif" fontWeight="700" letterSpacing="0.5">IL</text>
            <line x1="80" y1="18" x2="120" y2="18" stroke={C.gold} strokeWidth="0.5" opacity="0.5"/>
            <text x="44" y="21" textAnchor="middle" fill={C.gold} fontSize="6" opacity="0.6">✦</text>
            <text x="76" y="21" textAnchor="middle" fill={C.gold} fontSize="6" opacity="0.6">✦</text>
          </svg>
        </div>
        <div style={{ fontSize:10, letterSpacing:"0.2em", color:C.muted, fontFamily:"sans-serif", marginBottom:6, opacity:heroVisible?1:0, transition:"opacity 1s ease 0.7s" }}>AMIN SHABAZZ MUHAMMAD</div>
        <div style={{ fontSize:10, letterSpacing:"0.15em", color:C.mutedDark, fontFamily:"sans-serif", marginBottom:"2rem", opacity:heroVisible?1:0, transition:"opacity 1s ease 0.8s" }}>ASM PRODUCTIONS LLC</div>
        <div style={{ opacity:heroVisible?1:0, transition:"opacity 1s ease 0.9s" }}>
          <GoldDivider />
          <p style={{ fontSize:"clamp(15px,2.5vw,19px)", color:C.cream, lineHeight:1.8, fontStyle:"italic", maxWidth:480, margin:"1.75rem auto" }}>"Most men inherit their circumstances.<br />A few choose something better."</p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => setPaywallOpen(true)} style={{ padding:"14px 36px", background:C.gold, color:C.navyDeep, border:"none", cursor:"pointer", fontSize:12, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:"sans-serif", boxShadow:`0 4px 24px rgba(184,150,62,0.35)` }}>Apply for Your Passport</button>
            <button onClick={() => document.getElementById("about").scrollIntoView({ behavior:"smooth" })} style={{ padding:"14px 36px", background:"transparent", color:C.gold, border:`1px solid ${C.gold}`, cursor:"pointer", fontSize:12, letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:"sans-serif" }}>Learn More</button>
          </div>
        </div>
        <div style={{ position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:6, opacity:0.35 }}>
          <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.gold, fontFamily:"sans-serif" }}>SCROLL</div>
          <div style={{ width:1, height:36, background:`linear-gradient(to bottom, ${C.gold}, transparent)` }} />
        </div>
      </section>

      {/* ── TESTIMONY ── */}
      <section id="about" style={{ background:C.navyDeep, padding:"5rem 1.5rem", textAlign:"center", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:700, margin:"0 auto" }}>
          <Eyebrow>The Author's Testimony</Eyebrow>
          <h2 style={{ fontSize:"clamp(20px,3.5vw,30px)", color:C.goldLight, fontWeight:"normal", lineHeight:1.4, marginBottom:"1.75rem" }}>I flew abroad alone.<br />I came back with a wife.</h2>
          <GoldDivider />
          <div style={{ margin:"2.5rem 0" }}>
            <p style={{ fontSize:"clamp(13px,1.8vw,15px)", color:C.creamDim, lineHeight:2, marginBottom:"1.25rem" }}>In 2015, I flew to North Africa alone. I had prepared — the culture, the language, the family structure, the legal process. I knew what I was walking into and I conducted myself accordingly. Six months after meeting her, she was in America. We were married within 48 hours of her arrival.</p>
            <p style={{ fontSize:"clamp(13px,1.8vw,15px)", color:C.creamDim, lineHeight:2, marginBottom:"1.25rem" }}>She was half my age. She was a virgin. She was traditional. She was everything the American culture told me did not exist.</p>
            <p style={{ fontSize:"clamp(13px,1.8vw,15px)", color:C.cream, lineHeight:2, fontStyle:"italic" }}>I wrote the book on how I did it. Now I have built the platform that teaches what the book could not show.</p>
          </div>
          <GoldDivider />
          <div style={{ marginTop:"1.5rem", fontSize:12, color:C.muted, fontFamily:"sans-serif", letterSpacing:"0.05em" }}>— Amin Shabazz Muhammad · Author · Martial Artist · World Traveler · Husband · Father</div>
        </div>
      </section>

      {/* ── THREE LAYERS ── */}
      <section style={{ background:C.navy, padding:"5rem 1.5rem", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"3.5rem" }}>
            <Eyebrow>What You Are Entering</Eyebrow>
            <h2 style={{ fontSize:"clamp(20px,3vw,28px)", color:C.goldLight, fontWeight:"normal" }}>Three layers. One destination.</h2>
          </div>
          {[
            { num:"01", title:"The Book", sub:"17 Chapters · Read-Aloud · Full Text", icon:"📖", body:"The complete text of The International Lover — every chapter available with read-aloud. Your orientation. Your briefing. Your first pages. Every man reads it before the course unlocks." },
            { num:"02", title:"The Course", sub:"Five Regions · Fifteen Women · Branching Scenarios", icon:"🗺", body:"A video game style simulation set on a real world map. Five regions. Three profile cards per region. Every decision branches the story — first contact, the family meeting, fraud detection, the immigration process, life after she arrives. Complete all five regions and earn your certificate." },
            { num:"03", title:"The Consulate", sub:"Community · Regional Subgroups · Intelligence", icon:"🏛", body:"A private community of men on the same path. Five regional subgroups. Matrimonial site reviews. Country-specific intelligence. Fraud warning threads. Success story archives. The collective knowledge of men who have been where you are going." },
          ].map((l,i) => (
            <div key={l.num} style={{ display:"flex", gap:24, padding:"2rem", background:C.navyDeep, border:`1px solid ${C.border}`, borderLeft:`3px solid ${C.gold}`, flexWrap:"wrap", marginBottom:i<2?16:0 }}>
              <div style={{ fontSize:36, flexShrink:0 }}>{l.icon}</div>
              <div style={{ flex:1, minWidth:240 }}>
                <div style={{ fontSize:9, letterSpacing:"0.25em", color:C.goldDim, fontFamily:"sans-serif", marginBottom:4 }}>{l.num}</div>
                <div style={{ fontSize:"clamp(16px,2.5vw,20px)", color:C.goldLight, marginBottom:4 }}>{l.title}</div>
                <div style={{ fontSize:10, letterSpacing:"0.12em", color:C.muted, fontFamily:"sans-serif", marginBottom:12 }}>{l.sub}</div>
                <p style={{ fontSize:"clamp(12px,1.7vw,14px)", color:C.creamDim, lineHeight:1.85, margin:0, fontFamily:"sans-serif" }}>{l.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FIVE DESTINATIONS ── */}
      <section style={{ background:C.navyDeep, padding:"5rem 1.5rem", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <Eyebrow>The Course</Eyebrow>
            <h2 style={{ fontSize:"clamp(20px,3vw,28px)", color:C.goldLight, fontWeight:"normal", marginBottom:12 }}>Five destinations. Fifteen women. One passport.</h2>
            <p style={{ fontSize:"clamp(12px,1.7vw,14px)", color:C.creamDim, lineHeight:1.85, maxWidth:580, margin:"0 auto", fontFamily:"sans-serif" }}>Some women are genuine. Some are running fraud. Some are genuine and still wrong for you. You will not be told which is which.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(150px,1fr))", gap:12, marginBottom:"2rem" }}>
            {REGIONS.map(r => (
              <div key={r.id} onClick={() => stampRegion(r.id)} style={{ background:stampedRegions.includes(r.id)?C.navyMid:C.navy, border:`1px solid ${stampedRegions.includes(r.id)?C.gold:C.border}`, padding:"1.25rem 1rem", textAlign:"center", cursor:"pointer", transition:"all 0.3s", boxShadow:stampedRegions.includes(r.id)?`0 0 16px rgba(184,150,62,0.2)`:"none" }}>
                <StampRing label={r.label.toUpperCase().split(" ").join("\n")} size={64} active={stampedRegions.includes(r.id)} />
                <div style={{ fontSize:11, color:stampedRegions.includes(r.id)?C.goldLight:C.cream, marginTop:10, marginBottom:4, fontFamily:"sans-serif" }}>{r.label}</div>
                <div style={{ fontSize:9, color:C.muted, fontFamily:"sans-serif", lineHeight:1.5 }}>{r.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ background:C.navy, border:`1px solid ${C.border}`, padding:"1.5rem", textAlign:"center" }}>
            <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.mutedDark, fontFamily:"sans-serif", marginBottom:12 }}>YOUR PASSPORT STAMP PAGE</div>
            <div style={{ display:"flex", justifyContent:"center", gap:14, flexWrap:"wrap" }}>
              {REGIONS.map(r => <StampRing key={r.id} label={r.label.split(" ").map(w=>w.slice(0,3).toUpperCase()).join("\n")} size={56} active={stampedRegions.includes(r.id)} />)}
            </div>
            <div style={{ fontSize:10, color:C.mutedDark, marginTop:10, fontFamily:"sans-serif" }}>
              {stampedRegions.length === 5 ? "All five regions certified — certificate unlocked ✦" : stampedRegions.length > 0 ? `${stampedRegions.length} of 5 regions stamped` : "Click a region above to preview your stamp page"}
            </div>
          </div>
        </div>
      </section>

      {/* ── FIVE ENDINGS ── */}
      <section style={{ background:C.navy, padding:"5rem 1.5rem", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:740, margin:"0 auto", textAlign:"center" }}>
          <Eyebrow>What Is At Stake</Eyebrow>
          <h2 style={{ fontSize:"clamp(18px,3vw,26px)", color:C.goldLight, fontWeight:"normal", marginBottom:"2rem" }}>Every arc has five possible endings.</h2>
          <GoldDivider />
          <div style={{ marginTop:"2rem", textAlign:"left" }}>
            {[
              { n:"I",   label:"Successful Marriage",                     color:C.gold,    body:"You read the culture correctly. You vetted thoroughly. You navigated the family and the process with patience and integrity. This ending is earned — not given." },
              { n:"II",  label:"Failed Vetting — Pre-Travel",             color:C.goldDim, body:"You caught the fraud early. Profile inconsistencies. Communication patterns. A reverse image search. You walked away before investing more than your time." },
              { n:"III", label:"Failed Relationship — Cultural Misnavigation", color:C.muted, body:"She was genuine. You were not equipped. The relationship collapsed not from fraud but from cultural incompetence. The most instructive ending." },
              { n:"IV",  label:"Fraudulent Marriage — Pre-Citizenship",   color:C.scarlet, body:"You missed the signals. You married her. But you caught it before naturalization. The damage is limited. The debrief is unflinching." },
              { n:"V",   label:"Fraudulent Marriage — Post-Citizenship",  color:"#6b0f0f", body:"The most devastating arc. She received citizenship. She left. There may be a child. This ending exists because it has happened to real men. The course does not hide it." },
            ].map(e => (
              <div key={e.n} style={{ display:"flex", gap:16, alignItems:"flex-start", padding:"1.25rem 1.5rem", background:C.navyDeep, border:`0.5px solid ${C.border}`, borderLeft:`3px solid ${e.color}`, marginBottom:10 }}>
                <div style={{ fontSize:10, color:e.color, fontFamily:"sans-serif", letterSpacing:"0.1em", flexShrink:0, paddingTop:2, minWidth:18 }}>{e.n}</div>
                <div>
                  <div style={{ fontSize:"clamp(12px,1.7vw,14px)", color:C.cream, marginBottom:5 }}>{e.label}</div>
                  <div style={{ fontSize:"clamp(11px,1.5vw,12px)", color:C.creamDim, lineHeight:1.75, fontFamily:"sans-serif" }}>{e.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESOURCE LIBRARY ── */}
      <section style={{ background:C.navyDeep, padding:"5rem 1.5rem", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:880, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <Eyebrow>The Attaché</Eyebrow>
            <h2 style={{ fontSize:"clamp(18px,3vw,26px)", color:C.goldLight, fontWeight:"normal", marginBottom:12 }}>The complete resource library.</h2>
            <p style={{ fontSize:"clamp(12px,1.7vw,14px)", color:C.creamDim, maxWidth:560, margin:"0 auto", lineHeight:1.85, fontFamily:"sans-serif" }}>Fourteen modules covering everything from your first flight to your children's dual citizenship.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px,1fr))", gap:10 }}>
            {RESOURCES.map((r,i) => (
              <div key={r} style={{ display:"flex", alignItems:"center", gap:12, padding:"0.875rem 1rem", background:C.navy, border:`0.5px solid ${C.border}` }}>
                <div style={{ width:22, height:22, borderRadius:"50%", background:C.borderGold, border:`1px solid ${C.goldDim}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ fontSize:8, color:C.gold, fontFamily:"sans-serif" }}>{String(i+1).padStart(2,"0")}</span>
                </div>
                <span style={{ fontSize:"clamp(11px,1.5vw,12px)", color:C.creamDim, fontFamily:"sans-serif" }}>{r}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATE ── */}
      <section style={{ background:C.navy, padding:"5rem 1.5rem", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:620, margin:"0 auto", textAlign:"center" }}>
          <Eyebrow>The Commission</Eyebrow>
          <h2 style={{ fontSize:"clamp(18px,3vw,24px)", color:C.goldLight, fontWeight:"normal", marginBottom:"2rem" }}>Certificate of The International Lover™</h2>
          <div style={{ background:`linear-gradient(160deg, ${C.navyDeep}, ${C.navy})`, border:`2px solid ${C.gold}`, padding:"3rem 2rem", position:"relative", overflow:"hidden", boxShadow:`0 20px 60px rgba(0,0,0,0.5)` }}>
            <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", pointerEvents:"none" }}>
              <img src="/cover.jpg" style={{ height:"100%", width:"auto", opacity:0.04, objectFit:"cover" }} alt="" />
            </div>
            {["top-left","top-right","bottom-left","bottom-right"].map(p => (
              <div key={p} style={{ position:"absolute", [p.includes("top")?"top":"bottom"]:12, [p.includes("left")?"left":"right"]:14, fontSize:16, color:C.gold, opacity:0.4 }}>✦</div>
            ))}
            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{ fontSize:9, letterSpacing:"0.3em", color:C.muted, fontFamily:"sans-serif", marginBottom:16 }}>THE INTERNATIONAL LOVER™ · ASM PRODUCTIONS LLC</div>
              <div style={{ display:"flex", justifyContent:"center", margin:"0 auto 16px" }}><ILShield size={56} /></div>
              <div style={{ display:"flex", justifyContent:"center", gap:8, marginBottom:16, flexWrap:"wrap" }}>
                {REGIONS.map(r => <StampRing key={r.id} label={r.label.split(" ").map(w=>w.slice(0,3).toUpperCase()).join("\n")} size={44} active={true} />)}
              </div>
              <GoldDivider />
              <div style={{ marginTop:"1.25rem", fontSize:10, letterSpacing:"0.2em", color:C.muted, fontFamily:"sans-serif", marginBottom:10 }}>CERTIFICATE OF COMMISSION</div>
              <div style={{ fontSize:13, color:C.creamDim, marginBottom:12 }}>This certifies that</div>
              <div style={{ fontSize:"clamp(20px,3.5vw,26px)", fontFamily:"Georgia, serif", color:C.goldLight, fontStyle:"italic", borderBottom:`1px solid ${C.gold}`, paddingBottom:10, marginBottom:14, display:"inline-block", minWidth:220 }}>Your Name</div>
              <p style={{ fontSize:11, color:C.creamDim, lineHeight:1.85, maxWidth:420, margin:"0 auto 16px", fontStyle:"italic", fontFamily:"sans-serif" }}>having demonstrated the knowledge, cultural intelligence, and discernment required — is hereby commissioned to venture forth as an International Lover. All nations: recognize and allow the bearer to pass freely without delay or hindrance.</p>
              <div style={{ fontSize:12, color:C.muted, fontFamily:"sans-serif", letterSpacing:"0.08em" }}>— Amin Shabazz Muhammad</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ background:C.navyDeep, padding:"5rem 1.5rem", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:940, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"3rem" }}>
            <Eyebrow>Membership</Eyebrow>
            <h2 style={{ fontSize:"clamp(20px,3vw,28px)", color:C.goldLight, fontWeight:"normal", marginBottom:8 }}>Choose your level of access.</h2>
            <p style={{ fontSize:12, color:C.muted, fontFamily:"sans-serif" }}>Every entry point. Every resource. One discipline.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px,1fr))", gap:18 }}>
            {TIERS.map(t => (
              <div key={t.id} style={{ background:t.highlight?C.navy:C.navyDeep, border:`${t.highlight?"2px":"1px"} solid ${t.highlight?C.gold:C.border}`, padding:"2rem", position:"relative", boxShadow:t.highlight?`0 8px 40px rgba(184,150,62,0.2)`:"none" }}>
                {t.highlight && <div style={{ position:"absolute", top:-11, left:"50%", transform:"translateX(-50%)", background:C.gold, color:C.navyDeep, padding:"3px 16px", fontSize:8, fontWeight:700, letterSpacing:"0.2em", fontFamily:"sans-serif", whiteSpace:"nowrap" }}>✦ RECOMMENDED</div>}
                <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.goldDim, fontFamily:"sans-serif", marginBottom:5 }}>TIER {t.id==="course"?"I":t.id==="complete"?"II":"III"}</div>
                <div style={{ fontSize:"clamp(16px,2.2vw,18px)", color:C.goldLight, marginBottom:4 }}>{t.label}</div>
                <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif", marginBottom:18 }}>{t.sublabel}</div>
                <div style={{ fontSize:"clamp(28px,4vw,36px)", color:C.gold, fontWeight:700, marginBottom:3 }}>{t.price}</div>
                <div style={{ fontSize:10, color:C.mutedDark, fontFamily:"sans-serif", marginBottom:20 }}>{t.cycle}</div>
                <div style={{ marginBottom:22 }}>
                  {t.features.map(f => (
                    <div key={f} style={{ display:"flex", gap:8, alignItems:"flex-start", marginBottom:8 }}>
                      <span style={{ color:C.gold, fontSize:9, flexShrink:0, marginTop:3 }}>✦</span>
                      <span style={{ fontSize:"clamp(11px,1.5vw,12px)", color:C.creamDim, lineHeight:1.6, fontFamily:"sans-serif" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <a href={t.stripe} style={{ display:"block", textAlign:"center", padding:"12px", background:t.highlight?C.gold:"transparent", color:t.highlight?C.navyDeep:C.gold, border:`1px solid ${C.gold}`, fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:"sans-serif", textDecoration:"none", cursor:"pointer" }}>
                  {t.id==="course"?"Apply for the Course":t.id==="complete"?"Apply for Complete Access":"Apply for Lifetime Commission"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONSULTATIONS ── */}
      <section style={{ background:C.navy, padding:"5rem 1.5rem", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:780, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <Eyebrow>Personal Guidance</Eyebrow>
            <h2 style={{ fontSize:"clamp(18px,3vw,26px)", color:C.goldLight, fontWeight:"normal", marginBottom:12 }}>Request a Briefing.</h2>
            <p style={{ fontSize:"clamp(12px,1.7vw,14px)", color:C.creamDim, lineHeight:1.85, maxWidth:480, margin:"0 auto", fontFamily:"sans-serif" }}>One-on-one with the author. For the decisions the course cannot make for you.</p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {CONSULTATIONS.map(c => (
              <div key={c.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1.25rem 1.5rem", background:C.navyDeep, border:`1px solid ${C.border}`, flexWrap:"wrap", gap:14 }}>
                <div>
                  <div style={{ fontSize:"clamp(13px,1.8vw,15px)", color:C.cream, marginBottom:4 }}>{c.label}</div>
                  <div style={{ fontSize:11, color:C.muted, fontFamily:"sans-serif" }}>{c.duration}</div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:18 }}>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:10, color:C.mutedDark, textDecoration:"line-through", fontFamily:"sans-serif" }}>${c.pub} public</div>
                    <div style={{ fontSize:15, color:C.gold, fontWeight:700 }}>${c.mem} member</div>
                  </div>
                  <a href={c.stripe} style={{ padding:"10px 18px", background:"transparent", color:C.gold, border:`1px solid ${C.gold}`, cursor:"pointer", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:"sans-serif", textDecoration:"none", whiteSpace:"nowrap" }}>Book Now</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── B2B ── */}
      <section style={{ background:C.navyDeep, padding:"4rem 1.5rem", borderTop:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:660, margin:"0 auto", textAlign:"center" }}>
          <Eyebrow>Matrimonial Platform Partners</Eyebrow>
          <h2 style={{ fontSize:"clamp(17px,2.8vw,24px)", color:C.goldLight, fontWeight:"normal", marginBottom:14 }}>Are you a matrimonial platform?</h2>
          <p style={{ fontSize:"clamp(12px,1.7vw,14px)", color:C.creamDim, lineHeight:1.85, marginBottom:24, fontFamily:"sans-serif" }}>We offer white-label integration, a certified badge system for your members' profiles, and a full partner API — entry, exit, and real-time badge updates. Your members arrive prepared. Your platform becomes more trustworthy.</p>
          <a href="mailto:contact@asmproductions.co?subject=International Lover Partner Inquiry" style={{ display:"inline-block", padding:"12px 28px", background:"transparent", color:C.gold, border:`1px solid ${C.gold}`, fontSize:11, letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:"sans-serif", textDecoration:"none" }}>Request a Partnership Briefing</a>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ background:`linear-gradient(180deg, ${C.navyDeep}, ${C.dark})`, padding:"5rem 1.5rem", textAlign:"center" }}>
        <div style={{ maxWidth:520, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:"1.5rem" }}><ILShield size={44} /></div>
          <Eyebrow>The Only Question That Remains</Eyebrow>
          <h2 style={{ fontSize:"clamp(22px,4vw,34px)", color:C.cream, fontWeight:"normal", lineHeight:1.4, marginBottom:"1.5rem" }}>Are you ready to apply?</h2>
          <GoldDivider />
          <p style={{ fontSize:"clamp(13px,1.8vw,15px)", color:C.creamDim, lineHeight:1.85, fontStyle:"italic", margin:"1.75rem 0" }}>"Applying for citizenship in an elite nation."</p>
          <button onClick={() => setPaywallOpen(true)} style={{ padding:"16px 48px", background:C.gold, color:C.navyDeep, border:"none", cursor:"pointer", fontSize:13, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", fontFamily:"sans-serif", boxShadow:`0 4px 32px rgba(184,150,62,0.4)` }}>Apply for Your Passport</button>
          <div style={{ marginTop:14, fontSize:11, color:C.mutedDark, fontFamily:"sans-serif" }}>Already a member? <span onClick={() => setPaywallOpen(true)} style={{ color:C.gold, cursor:"pointer", textDecoration:"underline" }}>Sign in here</span></div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:C.dark, borderTop:`1px solid ${C.border}`, padding:"2rem 1.5rem", textAlign:"center" }}>
        <div style={{ fontSize:9, letterSpacing:"0.25em", color:C.mutedDark, fontFamily:"sans-serif", marginBottom:6 }}>THE INTERNATIONAL LOVER™ · ASM PRODUCTIONS LLC</div>
        <div style={{ fontSize:10, color:C.mutedDark, fontFamily:"sans-serif", marginBottom:6 }}>contact@asmproductions.co</div>
        <div style={{ fontSize:9, color:"#3a2e18", fontFamily:"sans-serif" }}>© 2025 ASM Productions LLC · All rights reserved · theinternationallover.com</div>
      </footer>

      {/* ── PAYWALL MODAL ── */}
      {paywallOpen && (
        <div style={{ position:"fixed", inset:0, background:"rgba(5,13,26,0.96)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:999, padding:"1rem", backdropFilter:"blur(4px)" }}>
          <div style={{ background:`linear-gradient(160deg, ${C.navyDeep}, ${C.navy})`, border:`1px solid ${C.gold}`, padding:"2.5rem 2rem", maxWidth:400, width:"100%", position:"relative", boxShadow:`0 40px 80px rgba(0,0,0,0.8)` }}>
            <button onClick={() => { setPaywallOpen(false); setMsg(""); }} style={{ position:"absolute", top:12, right:14, background:"none", border:"none", color:C.muted, fontSize:22, cursor:"pointer" }}>×</button>
            <div style={{ textAlign:"center", marginBottom:"1.75rem" }}>
              <div style={{ display:"flex", justifyContent:"center", marginBottom:10 }}><ILShield size={36} /></div>
              <div style={{ fontSize:9, letterSpacing:"0.3em", color:C.gold, fontFamily:"sans-serif", marginBottom:6 }}>THE INTERNATIONAL LOVER™</div>
              <div style={{ fontSize:"clamp(16px,3vw,20px)", color:C.cream }}>Access the Platform</div>
            </div>
            <input type="email" placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key==="Enter"&&handleEmailSubmit()} style={{ width:"100%", padding:"12px 14px", background:C.dark, border:`1px solid ${C.border}`, color:C.cream, fontSize:13, fontFamily:"Georgia, serif", marginBottom:"0.75rem", boxSizing:"border-box", outline:"none" }} />
            <button onClick={handleEmailSubmit} disabled={sending} style={{ width:"100%", padding:"12px", background:C.gold, color:C.navyDeep, border:"none", cursor:sending?"wait":"pointer", fontSize:12, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:"sans-serif", marginBottom:"1rem" }}>
              {sending ? "Sending..." : "Send Magic Link →"}
            </button>
            <div style={{ display:"flex", alignItems:"center", gap:10, margin:"1rem 0" }}>
              <div style={{ flex:1, height:"0.5px", background:C.border }} />
              <span style={{ color:C.muted, fontSize:10, fontFamily:"sans-serif" }}>or access code</span>
              <div style={{ flex:1, height:"0.5px", background:C.border }} />
            </div>
            <div style={{ display:"flex", gap:8, marginBottom:"1rem" }}>
              <input type="text" placeholder="Access code" value={code} onChange={e => setCode(e.target.value)} onKeyDown={e => e.key==="Enter"&&handleCodeSubmit()} style={{ flex:1, padding:"12px 14px", background:C.dark, border:`1px solid ${C.border}`, color:C.cream, fontSize:13, fontFamily:"sans-serif", outline:"none" }} />
              <button onClick={handleCodeSubmit} style={{ background:C.dark, border:`1px solid ${C.border}`, color:C.gold, padding:"12px 16px", cursor:"pointer", fontSize:12, fontFamily:"sans-serif" }}>Enter</button>
            </div>
            {msg && <div style={{ fontSize:11, color:msg.includes("sent")?C.gold:"#c08080", marginBottom:"0.75rem", lineHeight:1.6, fontFamily:"sans-serif" }}>{msg}</div>}
            <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:"1.25rem" }}>
              <div style={{ fontSize:10, color:C.muted, textAlign:"center", marginBottom:"0.875rem", fontFamily:"sans-serif" }}>Not enrolled yet?</div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {TIERS.map(t => (
                  <a key={t.id} href={t.stripe} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 12px", background:C.dark, border:`1px solid ${C.border}`, textDecoration:"none" }}>
                    <div style={{ fontSize:11, color:C.goldLight, fontFamily:"sans-serif" }}>{t.label}</div>
                    <div style={{ fontSize:14, color:C.gold, fontWeight:700 }}>{t.price}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
