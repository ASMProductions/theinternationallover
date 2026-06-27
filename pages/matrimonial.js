import { useState, useEffect, useRef } from "react";

const C = {
  navy:"#1a3a6b", navyDeep:"#0f2347", navyMid:"#1e4080",
  gold:"#b8963e", goldLight:"#d4af6a", goldDim:"#7a6228",
  cream:"#f0e6cc", creamDim:"#c8b890",
  muted:"#8a7a5a", mutedDark:"#5a4e32",
  border:"#1e3a6e", dark:"#091a35",
  green:"#4a7c5e", red:"#8b1a1a",
};

const REGIONS = [
  { id:"all", label:"All Regions" },
  { id:"north_africa", label:"North Africa" },
  { id:"middle_east", label:"Middle East" },
  { id:"asia", label:"Asia" },
  { id:"latin_america", label:"Latin America" },
  { id:"sub_saharan", label:"Sub-Saharan Africa" },
];

const RELIGIONS = ["All", "Islam", "Christianity", "Orthodox Christianity", "Catholicism", "Other"];
const AGE_RANGES = ["All Ages", "18-24", "25-30", "31-35", "36+"];
const FAMILY_PREFS = ["All", "Direct contact", "Through family", "Family must be involved"];

function AmbassadorBadge() {
  return <span style={{ background:C.gold, color:C.navyDeep, fontSize:8, fontWeight:700, padding:"2px 8px", fontFamily:"sans-serif", letterSpacing:"0.1em", verticalAlign:"middle", marginLeft:6 }}>AMBASSADOR</span>;
}

function CertifiedBadge() {
  return <span style={{ background:C.green, color:"white", fontSize:8, fontWeight:700, padding:"2px 8px", fontFamily:"sans-serif", letterSpacing:"0.1em", verticalAlign:"middle", marginLeft:6 }}>CERTIFIED</span>;
}

const Input = ({ label, value, onChange, type="text", placeholder="" }) => (
  <div style={{ marginBottom:14 }}>
    <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif", letterSpacing:"0.1em", marginBottom:6 }}>{label}</div>
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={{ width:"100%", padding:"10px 12px", background:C.dark, border:"1px solid " + C.border, color:C.cream, fontSize:13, fontFamily:"sans-serif", boxSizing:"border-box", outline:"none" }} />
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div style={{ marginBottom:14 }}>
    <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif", letterSpacing:"0.1em", marginBottom:6 }}>{label}</div>
    <select value={value} onChange={onChange} style={{ width:"100%", padding:"10px 12px", background:C.dark, border:"1px solid " + C.border, color:C.cream, fontSize:13, fontFamily:"sans-serif", boxSizing:"border-box" }}>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

const Textarea = ({ label, value, onChange, rows=4, placeholder="" }) => (
  <div style={{ marginBottom:14 }}>
    <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif", letterSpacing:"0.1em", marginBottom:6 }}>{label}</div>
    <textarea value={value} onChange={onChange} rows={rows} placeholder={placeholder} style={{ width:"100%", padding:"10px 12px", background:C.dark, border:"1px solid " + C.border, color:C.cream, fontSize:13, fontFamily:"sans-serif", boxSizing:"border-box", resize:"vertical", outline:"none" }} />
  </div>
);


export default function MatrimonialPlatform({ userEmail, isAmbassador, isCertified, gender, isAdmin }) {
  const [profiles, setProfiles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [view, setView] = useState("browse"); // browse | profile | create | messages | admin
  const [activeProfile, setActiveProfile] = useState(null);
  const [myProfile, setMyProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [filters, setFilters] = useState({ region:"all", religion:"All", age:"All Ages", family:"All" });
  const [createForm, setCreateForm] = useState({
    displayName:"", age:"", city:"", country:"", region:"north_africa",
    religion:"Islam", bio:"", seeking:"marriage",
    familyInvolvement:"Family must be involved",
    virtueStatus:"prefer_not_say", maritalStatus:"single",
    hasChildren:"no", education:"", languages:"",
    height:"", photos:[]
  });
  const [conversations, setConversations] = useState([]);
  const [activeConvo, setActiveConvo] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [hidden, setHidden] = useState(false);
  const [pendingApprovals, setPendingApprovals] = useState([]);

  const canContact = isAmbassador || isCertified;
  const showMen = gender === "woman";
  const showWomen = gender === "man";

  useEffect(() => { loadProfiles(); loadMyProfile(); }, []);

  useEffect(() => {
    let result = profiles;
    if (filters.region !== "all") result = result.filter(p => p.region === filters.region);
    if (filters.religion !== "All") result = result.filter(p => p.religion === filters.religion);
    if (filters.age !== "All Ages") {
      const [min, max] = filters.age === "36+" ? [36, 200] : filters.age.split("-").map(Number);
      result = result.filter(p => {
        const age = parseInt(p.age);
        return age >= min && age <= (max || 200);
      });
    }
    if (filters.family !== "All") result = result.filter(p => p.familyInvolvement === filters.family);
    setFiltered(result);
  }, [profiles, filters]);

  const loadProfiles = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/matrimonial?action=list&gender=" + (showWomen ? "woman" : "man") + "&email=" + encodeURIComponent(userEmail));
      const data = await res.json();
      setProfiles(data.profiles || []);
    } catch(e) { setMsg("Could not load profiles."); }
    setLoading(false);
  };

  const loadMyProfile = async () => {
    try {
      const res = await fetch("/api/matrimonial?action=myProfile&email=" + encodeURIComponent(userEmail));
      const data = await res.json();
      if (data.profile) setMyProfile(data.profile);
    } catch(e) {}
  };

  const loadPendingApprovals = async () => {
    try {
      const res = await fetch("/api/matrimonial?action=pending&adminKey=" + (process.env.NEXT_PUBLIC_IL_ADMIN_HINT || ""));
      const data = await res.json();
      setPendingApprovals(data.profiles || []);
    } catch(e) {}
  };

  const submitProfile = async () => {
    if (!createForm.displayName || !createForm.age || !createForm.city || !createForm.bio) {
      setMsg("Please fill in all required fields."); return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/matrimonial", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ action:"createProfile", email:userEmail, gender, ...createForm, photoBase64: createForm.photoBase64 || null })
      });
      const data = await res.json();
      if (data.ok) {
        setMsg("Profile submitted for review. You will be notified once approved.");
        setView("browse");
        loadMyProfile();
      } else { setMsg(data.error || "Failed to submit."); }
    } catch(e) { setMsg("Error submitting profile."); }
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!messageText.trim() || !activeConvo) return;
    if (!canContact) { setMsg("Complete the course to contact members."); return; }
    try {
      await fetch("/api/matrimonial", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ action:"sendMessage", from:userEmail, to:activeConvo.email, text:messageText.trim(), isAmbassador })
      });
      setMessageText("");
      loadConversation(activeConvo.email);
    } catch(e) {}
  };

  const loadConversation = async (otherEmail) => {
    try {
      const res = await fetch("/api/matrimonial?action=messages&email=" + encodeURIComponent(userEmail) + "&other=" + encodeURIComponent(otherEmail));
      const data = await res.json();
      setActiveConvo({ email: otherEmail, messages: data.messages || [] });
    } catch(e) {}
  };

  const toggleHideProfile = async () => {
    try {
      await fetch("/api/matrimonial", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ action:"toggleHide", email:userEmail })
      });
      setHidden(!hidden);
    } catch(e) {}
  };

  const blockUser = async (targetEmail) => {
    if (!confirm("Block this member? They will no longer be able to contact you or see your profile.")) return;
    try {
      await fetch("/api/matrimonial", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ action:"block", email:userEmail, target:targetEmail })
      });
      setProfiles(prev => prev.filter(p => p.email !== targetEmail));
      setView("browse");
    } catch(e) {}
  };

  const reportUser = async (targetEmail) => {
    const reason = prompt("Reason for report:");
    if (!reason) return;
    try {
      await fetch("/api/matrimonial", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ action:"report", email:userEmail, target:targetEmail, reason })
      });
      alert("Report submitted. Thank you.");
    } catch(e) {}
  };

  const approveProfile = async (profileEmail) => {
    try {
      await fetch("/api/matrimonial", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ action:"approve", adminKey:"IL_ADMIN_FROM_ENV", email:profileEmail })
      });
      setPendingApprovals(prev => prev.filter(p => p.email !== profileEmail));
    } catch(e) {}
  };

  const rejectProfile = async (profileEmail) => {
    try {
      await fetch("/api/matrimonial", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ action:"reject", adminKey:"IL_ADMIN_FROM_ENV", email:profileEmail })
      });
      setPendingApprovals(prev => prev.filter(p => p.email !== profileEmail));
    } catch(e) {}
  };


  // PROFILE VIEW
  if (view === "profile" && activeProfile) {
    const isMine = activeProfile.email === userEmail;
    return (
      <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
        <div style={{ background:C.navyDeep, borderBottom:"1px solid " + C.border, padding:"1rem 1.5rem", display:"flex", alignItems:"center", gap:12 }}>
          <button onClick={() => setView("browse")} style={{ background:"none", border:"1px solid " + C.gold, color:C.gold, padding:"6px 14px", cursor:"pointer", fontSize:12, fontFamily:"sans-serif" }}>← Back</button>
          <div style={{ fontSize:14, color:C.goldLight }}>Profile</div>
          {!isMine && (
            <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
              <button onClick={() => reportUser(activeProfile.email)} style={{ background:"none", border:"1px solid " + C.border, color:C.muted, padding:"6px 12px", cursor:"pointer", fontSize:10, fontFamily:"sans-serif" }}>Report</button>
              <button onClick={() => blockUser(activeProfile.email)} style={{ background:"none", border:"1px solid " + C.red, color:C.red, padding:"6px 12px", cursor:"pointer", fontSize:10, fontFamily:"sans-serif" }}>Block</button>
            </div>
          )}
        </div>
        <div style={{ maxWidth:680, margin:"0 auto", padding:"2.5rem 1.5rem" }}>
          <div style={{ display:"flex", gap:20, alignItems:"flex-start", marginBottom:"2rem", flexWrap:"wrap" }}>
            <div style={{ width:120, height:150, background:C.navyDeep, border:"2px solid " + C.border, overflow:"hidden", flexShrink:0 }}>
              {activeProfile.photoUrl ? (
                <img src={activeProfile.photoUrl} alt={activeProfile.displayName} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }} />
              ) : (
                <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, color:C.border }}>◈</div>
              )}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:"clamp(18px,3vw,24px)", color:C.goldLight, marginBottom:4 }}>
                {activeProfile.displayName}
                {activeProfile.isAmbassador && <AmbassadorBadge />}
                {activeProfile.isCertified && !activeProfile.isAmbassador && <CertifiedBadge />}
              </div>
              <div style={{ fontSize:13, color:C.muted, fontFamily:"sans-serif", marginBottom:12 }}>{activeProfile.age} · {activeProfile.city}, {activeProfile.country}</div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                <span style={{ background:C.navyDeep, border:"1px solid " + C.border, padding:"3px 10px", fontSize:10, color:C.creamDim, fontFamily:"sans-serif" }}>{activeProfile.religion}</span>
                <span style={{ background:C.navyDeep, border:"1px solid " + C.border, padding:"3px 10px", fontSize:10, color:C.creamDim, fontFamily:"sans-serif" }}>{activeProfile.maritalStatus}</span>
                <span style={{ background:C.navyDeep, border:"1px solid " + C.border, padding:"3px 10px", fontSize:10, color:C.creamDim, fontFamily:"sans-serif" }}>Children: {activeProfile.hasChildren}</span>
              </div>
            </div>
          </div>
          <div style={{ background:C.navyDeep, border:"1px solid " + C.border, padding:"1.5rem", marginBottom:"1.5rem" }}>
            <div style={{ fontSize:9, letterSpacing:"0.15em", color:C.gold, fontFamily:"sans-serif", marginBottom:12 }}>ABOUT</div>
            <p style={{ fontSize:14, color:C.creamDim, lineHeight:1.85, fontFamily:"sans-serif", margin:0 }}>{activeProfile.bio}</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:"1.5rem" }}>
            {[
              ["Seeking", activeProfile.seeking],
              ["Family Involvement", activeProfile.familyInvolvement],
              ["Education", activeProfile.education],
              ["Languages", activeProfile.languages],
              ["Height", activeProfile.height],
              ["Virtue Status", activeProfile.virtueStatus === "prefer_not_say" ? "Not specified" : activeProfile.virtueStatus],
            ].filter(([,v]) => v).map(([label, value]) => (
              <div key={label} style={{ background:C.navyDeep, border:"1px solid " + C.border, padding:"0.875rem" }}>
                <div style={{ fontSize:9, color:C.muted, fontFamily:"sans-serif", marginBottom:4 }}>{label.toUpperCase()}</div>
                <div style={{ fontSize:13, color:C.cream, fontFamily:"sans-serif" }}>{value}</div>
              </div>
            ))}
          </div>
          {!isMine && (
            <div>
              {canContact ? (
                <button onClick={() => { loadConversation(activeProfile.email); setView("messages"); }} style={{ width:"100%", padding:"14px", background:C.gold, color:C.navyDeep, border:"none", cursor:"pointer", fontSize:13, fontWeight:700, fontFamily:"sans-serif" }}>
                  Send Message →
                </button>
              ) : (
                <div style={{ background:"#0a1628", border:"1px solid " + C.border, padding:"1.25rem", textAlign:"center" }}>
                  <div style={{ fontSize:13, color:C.creamDim, fontFamily:"sans-serif", marginBottom:10 }}>Complete the course to contact members.</div>
                  <a href="/course" style={{ color:C.gold, fontSize:12, fontFamily:"sans-serif" }}>Go to Course →</a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // MESSAGES VIEW
  if (view === "messages") {
    return (
      <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
        <div style={{ background:C.navyDeep, borderBottom:"1px solid " + C.border, padding:"1rem 1.5rem", display:"flex", alignItems:"center", gap:12 }}>
          <button onClick={() => setView("browse")} style={{ background:"none", border:"1px solid " + C.gold, color:C.gold, padding:"6px 14px", cursor:"pointer", fontSize:12, fontFamily:"sans-serif" }}>← Back</button>
          <div style={{ fontSize:14, color:C.goldLight }}>{activeConvo ? "Conversation" : "Messages"}</div>
        </div>
        <div style={{ maxWidth:680, margin:"0 auto", padding:"1.5rem" }}>
          {activeConvo ? (
            <div>
              <div style={{ maxHeight:"60vh", overflowY:"auto", marginBottom:"1rem", display:"flex", flexDirection:"column", gap:10 }}>
                {(activeConvo.messages || []).map((m, i) => (
                  <div key={i} style={{ alignSelf: m.from === userEmail ? "flex-end" : "flex-start", maxWidth:"80%" }}>
                    <div style={{ background: m.from === userEmail ? C.gold : C.navyDeep, color: m.from === userEmail ? C.navyDeep : C.cream, padding:"10px 14px", fontSize:13, fontFamily:"sans-serif", lineHeight:1.6 }}>{m.text}</div>
                    <div style={{ fontSize:9, color:C.muted, fontFamily:"sans-serif", marginTop:3, textAlign: m.from === userEmail ? "right" : "left" }}>{new Date(m.timestamp).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <input value={messageText} onChange={e => setMessageText(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} placeholder="Type a message..." style={{ flex:1, padding:"10px 14px", background:C.navyDeep, border:"1px solid " + C.border, color:C.cream, fontSize:13, fontFamily:"sans-serif", outline:"none" }} />
                <button onClick={sendMessage} style={{ padding:"10px 18px", background:C.gold, color:C.navyDeep, border:"none", cursor:"pointer", fontWeight:700, fontFamily:"sans-serif", fontSize:12 }}>Send</button>
              </div>
            </div>
          ) : (
            <div style={{ color:C.muted, textAlign:"center", padding:"3rem", fontFamily:"sans-serif" }}>No active conversation.</div>
          )}
        </div>
      </div>
    );
  }

  // CREATE PROFILE VIEW
  if (view === "create") {
    return (
      <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
        <div style={{ background:C.navyDeep, borderBottom:"1px solid " + C.border, padding:"1rem 1.5rem", display:"flex", alignItems:"center", gap:12 }}>
          <button onClick={() => setView("browse")} style={{ background:"none", border:"1px solid " + C.gold, color:C.gold, padding:"6px 14px", cursor:"pointer", fontSize:12, fontFamily:"sans-serif" }}>← Back</button>
          <div style={{ fontSize:14, color:C.goldLight }}>Create Your Profile</div>
        </div>
        <div style={{ maxWidth:620, margin:"0 auto", padding:"2rem 1.5rem" }}>
          {gender === "woman" && (
            <div style={{ background:"rgba(74,124,94,0.1)", border:"1px solid " + C.green, padding:"0.875rem", marginBottom:"1.5rem", fontSize:12, color:C.green, fontFamily:"sans-serif" }}>
              Women join free. Your profile will be reviewed before going live.
            </div>
          )}
          {msg && <div style={{ color:C.red, fontFamily:"sans-serif", fontSize:12, marginBottom:12, padding:"8px 12px", background:"rgba(139,26,26,0.1)", border:"1px solid " + C.red }}>{msg}</div>}
          <Input label="DISPLAY NAME *" value={createForm.displayName} onChange={e => setCreateForm({...createForm, displayName:e.target.value})} placeholder="How you will appear on the platform" />
          <Input label="AGE *" type="number" value={createForm.age} onChange={e => setCreateForm({...createForm, age:e.target.value})} />
          <Input label="CITY *" value={createForm.city} onChange={e => setCreateForm({...createForm, city:e.target.value})} />
          <Input label="COUNTRY *" value={createForm.country} onChange={e => setCreateForm({...createForm, country:e.target.value})} />
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif", letterSpacing:"0.1em", marginBottom:6 }}>REGION *</div>
            <select value={createForm.region} onChange={e => setCreateForm({...createForm, region:e.target.value})} style={{ width:"100%", padding:"10px 12px", background:C.dark, border:"1px solid " + C.border, color:C.cream, fontSize:13, fontFamily:"sans-serif" }}>
              <option value="north_africa">North Africa</option>
              <option value="middle_east">Middle East</option>
              <option value="asia">Asia</option>
              <option value="latin_america">Latin America</option>
              <option value="sub_saharan">Sub-Saharan Africa</option>
              {gender === "man" && <option value="north_america">North America</option>}
            </select>
          </div>
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif", letterSpacing:"0.1em", marginBottom:6 }}>RELIGION *</div>
            <select value={createForm.religion} onChange={e => setCreateForm({...createForm, religion:e.target.value})} style={{ width:"100%", padding:"10px 12px", background:C.dark, border:"1px solid " + C.border, color:C.cream, fontSize:13, fontFamily:"sans-serif" }}>
              {RELIGIONS.filter(r => r !== "All").map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <Textarea label="ABOUT YOU *" value={createForm.bio} onChange={e => setCreateForm({...createForm, bio:e.target.value})} rows={5} placeholder="Tell prospective partners about yourself, your values, and what you are looking for..." />
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif", letterSpacing:"0.1em", marginBottom:6 }}>FAMILY INVOLVEMENT PREFERENCE</div>
            <select value={createForm.familyInvolvement} onChange={e => setCreateForm({...createForm, familyInvolvement:e.target.value})} style={{ width:"100%", padding:"10px 12px", background:C.dark, border:"1px solid " + C.border, color:C.cream, fontSize:13, fontFamily:"sans-serif" }}>
              {FAMILY_PREFS.filter(f => f !== "All").map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <Input label="EDUCATION" value={createForm.education} onChange={e => setCreateForm({...createForm, education:e.target.value})} placeholder="e.g. Bachelor's in Education, University of Casablanca" />
          <Input label="LANGUAGES SPOKEN" value={createForm.languages} onChange={e => setCreateForm({...createForm, languages:e.target.value})} placeholder="e.g. Arabic, French, English" />
          <Input label="HEIGHT (optional)" value={createForm.height} onChange={e => setCreateForm({...createForm, height:e.target.value})} placeholder="e.g. 5'6&quot;" />
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif", letterSpacing:"0.1em", marginBottom:6 }}>MARITAL STATUS</div>
            <select value={createForm.maritalStatus} onChange={e => setCreateForm({...createForm, maritalStatus:e.target.value})} style={{ width:"100%", padding:"10px 12px", background:C.dark, border:"1px solid " + C.border, color:C.cream, fontSize:13, fontFamily:"sans-serif" }}>
              <option value="single">Single — never married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
          </div>
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif", letterSpacing:"0.1em", marginBottom:6 }}>CHILDREN</div>
            <select value={createForm.hasChildren} onChange={e => setCreateForm({...createForm, hasChildren:e.target.value})} style={{ width:"100%", padding:"10px 12px", background:C.dark, border:"1px solid " + C.border, color:C.cream, fontSize:13, fontFamily:"sans-serif" }}>
              <option value="no">No children</option>
              <option value="yes">Have children</option>
            </select>
          </div>
          {gender === "woman" && (
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif", letterSpacing:"0.1em", marginBottom:6 }}>VIRTUE STATUS (optional)</div>
              <select value={createForm.virtueStatus} onChange={e => setCreateForm({...createForm, virtueStatus:e.target.value})} style={{ width:"100%", padding:"10px 12px", background:C.dark, border:"1px solid " + C.border, color:C.cream, fontSize:13, fontFamily:"sans-serif" }}>
                <option value="prefer_not_say">Prefer not to say</option>
                <option value="virtuous">Virtuous</option>
                <option value="not_specified">Not specified</option>
              </select>
            </div>
          )}
          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif", letterSpacing:"0.1em", marginBottom:6 }}>PROFILE PHOTO (optional)</div>
            <div style={{ border:"1px dashed " + C.border, padding:"1.5rem", textAlign:"center", position:"relative" }}>
              {createForm.photoPreview ? (
                <div>
                  <img src={createForm.photoPreview} alt="Preview" style={{ width:120, height:150, objectFit:"cover", objectPosition:"center top", marginBottom:10 }} />
                  <div>
                    <button onClick={() => setCreateForm({...createForm, photoPreview:null, photoBase64:null})} style={{ background:"none", border:"1px solid " + C.border, color:C.muted, padding:"4px 12px", cursor:"pointer", fontSize:11, fontFamily:"sans-serif" }}>Remove</button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize:28, marginBottom:8, color:C.border }}>◈</div>
                  <div style={{ fontSize:12, color:C.muted, fontFamily:"sans-serif", marginBottom:10 }}>Upload a photo for your profile</div>
                  <label style={{ background:C.navyDeep, border:"1px solid " + C.border, color:C.gold, padding:"8px 18px", cursor:"pointer", fontSize:12, fontFamily:"sans-serif", display:"inline-block" }}>
                    Choose Photo
                    <input type="file" accept="image/*" style={{ display:"none" }} onChange={e => {
                      const file = e.target.files[0];
                      if (!file) return;
                      if (file.size > 5 * 1024 * 1024) { alert("Photo must be under 5MB."); return; }
                      const reader = new FileReader();
                      reader.onload = ev => {
                        setCreateForm(f => ({...f, photoPreview: ev.target.result, photoBase64: ev.target.result}));
                      };
                      reader.readAsDataURL(file);
                    }} />
                  </label>
                  <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif", marginTop:8 }}>JPG or PNG · Max 5MB</div>
                </div>
              )}
            </div>
          </div>
          <button onClick={submitProfile} disabled={loading} style={{ width:"100%", padding:"14px", background:loading ? C.border : C.gold, color:C.navyDeep, border:"none", cursor:loading ? "default" : "pointer", fontSize:13, fontWeight:700, fontFamily:"sans-serif" }}>
            {loading ? "Submitting..." : gender === "woman" ? "Submit Profile for Review →" : "Create Profile →"}
          </button>
          {gender === "woman" && (
            <div style={{ fontSize:11, color:C.muted, fontFamily:"sans-serif", textAlign:"center", marginTop:12, lineHeight:1.6 }}>
              Your profile will be reviewed before going live. This usually takes 24-48 hours.
            </div>
          )}
        </div>
      </div>
    );
  }

  // ADMIN VIEW
  if (view === "admin" && isAdmin) {
    return (
      <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
        <div style={{ background:C.navyDeep, borderBottom:"1px solid " + C.border, padding:"1rem 1.5rem", display:"flex", alignItems:"center", gap:12 }}>
          <button onClick={() => setView("browse")} style={{ background:"none", border:"1px solid " + C.gold, color:C.gold, padding:"6px 14px", cursor:"pointer", fontSize:12, fontFamily:"sans-serif" }}>← Back</button>
          <div style={{ fontSize:14, color:C.goldLight }}>Matrimonial Admin — Pending Approvals</div>
          <button onClick={loadPendingApprovals} style={{ marginLeft:"auto", background:C.gold, color:C.navyDeep, border:"none", padding:"6px 14px", cursor:"pointer", fontSize:11, fontFamily:"sans-serif" }}>Refresh</button>
        </div>
        <div style={{ maxWidth:780, margin:"0 auto", padding:"2rem 1.5rem" }}>
          {pendingApprovals.length === 0 ? (
            <div style={{ color:C.muted, textAlign:"center", padding:"3rem", fontFamily:"sans-serif" }}>No pending approvals.</div>
          ) : pendingApprovals.map(p => (
            <div key={p.email} style={{ background:C.navyDeep, border:"1px solid " + C.border, padding:"1.25rem", marginBottom:12 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12 }}>
                <div>
                  <div style={{ fontSize:15, color:C.goldLight, marginBottom:4 }}>{p.displayName} · {p.age} · {p.city}, {p.country}</div>
                  <div style={{ fontSize:11, color:C.muted, fontFamily:"sans-serif", marginBottom:8 }}>{p.religion} · {p.familyInvolvement}</div>
                  <p style={{ fontSize:13, color:C.creamDim, fontFamily:"sans-serif", lineHeight:1.7, maxWidth:480 }}>{p.bio}</p>
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={() => approveProfile(p.email)} style={{ padding:"8px 16px", background:C.green, color:"white", border:"none", cursor:"pointer", fontFamily:"sans-serif", fontSize:11, fontWeight:700 }}>Approve</button>
                  <button onClick={() => rejectProfile(p.email)} style={{ padding:"8px 16px", background:C.red, color:"white", border:"none", cursor:"pointer", fontFamily:"sans-serif", fontSize:11, fontWeight:700 }}>Reject</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // BROWSE VIEW
  return (
    <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
      <div style={{ background:C.navyDeep, borderBottom:"1px solid " + C.border, padding:"1rem 1.5rem", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
        <div style={{ fontSize:15, color:C.goldLight }}>The International Lover™ — Matrimonial</div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          {isAdmin && <button onClick={() => { loadPendingApprovals(); setView("admin"); }} style={{ background:"none", border:"1px solid " + C.gold, color:C.gold, padding:"6px 12px", cursor:"pointer", fontSize:11, fontFamily:"sans-serif" }}>Admin</button>}
          <button onClick={() => setView("messages")} style={{ background:"none", border:"1px solid " + C.border, color:C.muted, padding:"6px 12px", cursor:"pointer", fontSize:11, fontFamily:"sans-serif" }}>Messages</button>
          {!myProfile ? (
            <button onClick={() => setView("create")} style={{ background:C.gold, color:C.navyDeep, border:"none", padding:"6px 14px", cursor:"pointer", fontSize:11, fontWeight:700, fontFamily:"sans-serif" }}>Create Profile</button>
          ) : (
            <button onClick={toggleHideProfile} style={{ background:"none", border:"1px solid " + C.border, color:hidden ? C.gold : C.muted, padding:"6px 12px", cursor:"pointer", fontSize:11, fontFamily:"sans-serif" }}>{hidden ? "Show Profile" : "Hide Profile"}</button>
          )}
        </div>
      </div>

      {!canContact && (
        <div style={{ background:"rgba(139,26,26,0.15)", borderBottom:"1px solid " + C.red, padding:"10px 1.5rem", display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
          <div style={{ fontSize:12, color:"#c08080", fontFamily:"sans-serif", flex:1 }}>Complete the course to contact members. You can browse profiles freely.</div>
          <a href="/course" style={{ color:C.gold, fontSize:11, fontFamily:"sans-serif", textDecoration:"none", border:"1px solid " + C.gold, padding:"4px 12px" }}>Go to Course →</a>
        </div>
      )}

      <div style={{ maxWidth:980, margin:"0 auto", padding:"1.5rem" }}>
        {/* Filters */}
        <div style={{ background:C.navyDeep, border:"1px solid " + C.border, padding:"1rem", marginBottom:"1.5rem", display:"flex", gap:10, flexWrap:"wrap", alignItems:"center" }}>
          <div style={{ fontSize:9, color:C.gold, fontFamily:"sans-serif", letterSpacing:"0.15em", marginRight:4 }}>FILTER</div>
          {[
            { key:"region", options:REGIONS.map(r => r.id), labels:REGIONS.map(r => r.label) },
          ].map(f => (
            <select key={f.key} value={filters[f.key]} onChange={e => setFilters({...filters, [f.key]:e.target.value})} style={{ padding:"6px 10px", background:C.dark, border:"1px solid " + C.border, color:C.cream, fontSize:11, fontFamily:"sans-serif" }}>
              {f.options.map((o, i) => <option key={o} value={o}>{f.labels ? f.labels[i] : o}</option>)}
            </select>
          ))}
          <select value={filters.religion} onChange={e => setFilters({...filters, religion:e.target.value})} style={{ padding:"6px 10px", background:C.dark, border:"1px solid " + C.border, color:C.cream, fontSize:11, fontFamily:"sans-serif" }}>
            {RELIGIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <select value={filters.age} onChange={e => setFilters({...filters, age:e.target.value})} style={{ padding:"6px 10px", background:C.dark, border:"1px solid " + C.border, color:C.cream, fontSize:11, fontFamily:"sans-serif" }}>
            {AGE_RANGES.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          <select value={filters.family} onChange={e => setFilters({...filters, family:e.target.value})} style={{ padding:"6px 10px", background:C.dark, border:"1px solid " + C.border, color:C.cream, fontSize:11, fontFamily:"sans-serif" }}>
            {FAMILY_PREFS.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
          <div style={{ fontSize:11, color:C.muted, fontFamily:"sans-serif", marginLeft:"auto" }}>{filtered.length} profiles</div>
        </div>

        {loading && <div style={{ color:C.muted, textAlign:"center", padding:"3rem", fontFamily:"sans-serif" }}>Loading profiles...</div>}

        {!loading && filtered.length === 0 && (
          <div style={{ color:C.muted, textAlign:"center", padding:"3rem", fontFamily:"sans-serif" }}>No profiles match your filters.</div>
        )}

        {/* Profile Grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(240px,1fr))", gap:16 }}>
          {filtered.map(p => (
            <div key={p.email} onClick={() => { setActiveProfile(p); setView("profile"); }} style={{ background:C.navyDeep, border:"1px solid " + C.border, cursor:"pointer", overflow:"hidden" }}>
              <div style={{ height:200, background:C.dark, position:"relative" }}>
                {p.photoUrl ? (
                  <img src={p.photoUrl} alt={p.displayName} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }} />
                ) : (
                  <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:48, color:C.border }}>◈</div>
                )}
                {p.isAmbassador && (
                  <div style={{ position:"absolute", top:8, right:8, background:C.gold, color:C.navyDeep, fontSize:7, fontWeight:700, padding:"2px 6px", fontFamily:"sans-serif" }}>AMBASSADOR</div>
                )}
                {p.isCertified && !p.isAmbassador && (
                  <div style={{ position:"absolute", top:8, right:8, background:C.green, color:"white", fontSize:7, fontWeight:700, padding:"2px 6px", fontFamily:"sans-serif" }}>CERTIFIED</div>
                )}
              </div>
              <div style={{ padding:"0.875rem" }}>
                <div style={{ fontSize:14, color:C.goldLight, marginBottom:3 }}>{p.displayName}</div>
                <div style={{ fontSize:11, color:C.muted, fontFamily:"sans-serif", marginBottom:6 }}>{p.age} · {p.city}</div>
                <div style={{ fontSize:10, color:C.creamDim, fontFamily:"sans-serif", marginBottom:6 }}>{p.religion}</div>
                <p style={{ fontSize:11, color:C.creamDim, fontFamily:"sans-serif", lineHeight:1.5, margin:0, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{p.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


