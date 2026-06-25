import { useState, useEffect } from "react";

const C = {
  navy:"#1a3a6b", navyDeep:"#0f2347",
  gold:"#b8963e", goldLight:"#d4af6a",
  cream:"#f0e6cc", creamDim:"#c8b890",
  muted:"#8a7a5a", mutedDark:"#5a4e32",
  border:"#1e3a6e", dark:"#091a35",
  red:"#8b1a1a", green:"#4a7c5e",
};

export default function AmbassadorAdmin({ adminKey }) {
  const [ambassadors, setAmbassadors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({ name:"", email:"", note:"" });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { if (adminKey) loadAmbassadors(); }, [adminKey]);

  const loadAmbassadors = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ambassadors?action=list&adminKey=" + adminKey);
      const data = await res.json();
      setAmbassadors(data.ambassadors || []);
    } catch(e) { setMsg("Could not load ambassadors."); }
    setLoading(false);
  };

  const addAmbassador = async () => {
    if (!form.name.trim() || !form.email.trim()) { setMsg("Name and email are required."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/ambassadors", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ action:"add", adminKey, name:form.name.trim(), email:form.email.trim().toLowerCase(), note:form.note.trim() })
      });
      const data = await res.json();
      if (data.ok) {
        setMsg("Ambassador added. Code: " + data.code);
        setForm({ name:"", email:"", note:"" });
        setShowForm(false);
        await loadAmbassadors();
      } else { setMsg(data.error || "Failed to add."); }
    } catch(e) { setMsg("Error adding ambassador."); }
    setLoading(false);
  };

  const removeAmbassador = async (code) => {
    if (!confirm("Remove this ambassador? Their access will be revoked immediately.")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/ambassadors", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ action:"remove", adminKey, code })
      });
      const data = await res.json();
      if (data.ok) { setMsg("Ambassador removed."); await loadAmbassadors(); }
    } catch(e) { setMsg("Error removing ambassador."); }
    setLoading(false);
  };

  const Btn = ({ onClick, children, color, small }) => (
    <button onClick={onClick} style={{ background:color||C.gold, color:color?"white":C.navyDeep, border:"none", cursor:"pointer", fontWeight:700, fontFamily:"sans-serif", padding:small?"5px 12px":"10px 20px", fontSize:small?10:12 }}>{children}</button>
  );

  if (!adminKey) return (
    <div style={{ minHeight:"100vh", background:C.dark, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ color:"#8b1a1a", fontFamily:"sans-serif" }}>Access denied.</div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
      <div style={{ background:C.navyDeep, borderBottom:"1px solid #1e3a6e", padding:"1rem 1.5rem", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
        <div>
          <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.muted, fontFamily:"sans-serif" }}>ADMIN</div>
          <div style={{ fontSize:16, color:C.goldLight }}>Ambassador Management</div>
        </div>
        <Btn onClick={() => setShowForm(!showForm)}>+ Add Ambassador</Btn>
      </div>

      <div style={{ maxWidth:860, margin:"0 auto", padding:"2rem 1.5rem" }}>
        {msg && (
          <div style={{ background:"rgba(184,150,62,0.1)", border:"1px solid #b8963e", padding:"10px 16px", marginBottom:16, fontSize:13, color:C.gold, fontFamily:"sans-serif", lineHeight:1.6 }}>{msg}</div>
        )}

        {showForm && (
          <div style={{ background:C.navyDeep, border:"1px solid #b8963e", padding:"1.5rem", marginBottom:"1.5rem" }}>
            <div style={{ fontSize:12, color:C.gold, fontFamily:"sans-serif", letterSpacing:"0.1em", marginBottom:16 }}>NEW AMBASSADOR</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
              <div>
                <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif", marginBottom:6 }}>FULL NAME</div>
                <input type="text" value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Brother First Last" style={{ width:"100%", padding:"10px 12px", background:"#1a3a6b", border:"1px solid #1e3a6e", color:C.cream, fontSize:13, fontFamily:"sans-serif", boxSizing:"border-box" }} />
              </div>
              <div>
                <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif", marginBottom:6 }}>EMAIL ADDRESS</div>
                <input type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} placeholder="email@example.com" style={{ width:"100%", padding:"10px 12px", background:"#1a3a6b", border:"1px solid #1e3a6e", color:C.cream, fontSize:13, fontFamily:"sans-serif", boxSizing:"border-box" }} />
              </div>
            </div>
            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif", marginBottom:6 }}>NOTE (optional — for your reference)</div>
              <input type="text" value={form.note} onChange={e => setForm({...form, note:e.target.value})} placeholder="How you know him, his role, etc." style={{ width:"100%", padding:"10px 12px", background:"#1a3a6b", border:"1px solid #1e3a6e", color:C.cream, fontSize:13, fontFamily:"sans-serif", boxSizing:"border-box" }} />
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <Btn onClick={addAmbassador}>Add Ambassador</Btn>
              <button onClick={() => { setShowForm(false); setForm({ name:"", email:"", note:"" }); }} style={{ background:"transparent", color:C.muted, border:"1px solid #1e3a6e", padding:"10px 16px", cursor:"pointer", fontFamily:"sans-serif", fontSize:11 }}>Cancel</button>
            </div>
          </div>
        )}

        <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.gold, fontFamily:"sans-serif", marginBottom:14, borderBottom:"1px solid #1e3a6e", paddingBottom:8 }}>
          ACTIVE AMBASSADORS ({ambassadors.length})
        </div>

        {loading && <div style={{ color:C.muted, fontFamily:"sans-serif", padding:"2rem", textAlign:"center" }}>Loading...</div>}

        {!loading && ambassadors.length === 0 && (
          <div style={{ color:C.muted, fontFamily:"sans-serif", textAlign:"center", padding:"3rem" }}>
            No ambassadors yet. Add the first one above.
          </div>
        )}

        {ambassadors.map(amb => (
          <div key={amb.code} style={{ background:C.navyDeep, border:"1px solid #1e3a6e", padding:"1.25rem", marginBottom:12, display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:16, flexWrap:"wrap" }}>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                <div style={{ fontSize:15, color:C.goldLight, fontFamily:"Georgia,serif" }}>{amb.name}</div>
                <div style={{ background:C.gold, color:C.navyDeep, fontSize:8, fontWeight:700, padding:"2px 8px", fontFamily:"sans-serif", letterSpacing:"0.1em" }}>AMBASSADOR</div>
              </div>
              <div style={{ fontSize:11, color:C.muted, fontFamily:"sans-serif", marginBottom:4 }}>{amb.email}</div>
              {amb.note && <div style={{ fontSize:11, color:C.mutedDark, fontFamily:"sans-serif", fontStyle:"italic", marginBottom:6 }}>{amb.note}</div>}
              <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
                <div>
                  <div style={{ fontSize:9, color:C.mutedDark, fontFamily:"sans-serif", marginBottom:2 }}>ACCESS CODE</div>
                  <div style={{ fontSize:12, color:C.gold, fontFamily:"sans-serif", fontWeight:700, letterSpacing:"0.1em" }}>{amb.code}</div>
                </div>
                <div>
                  <div style={{ fontSize:9, color:C.mutedDark, fontFamily:"sans-serif", marginBottom:2 }}>ADDED</div>
                  <div style={{ fontSize:11, color:C.creamDim, fontFamily:"sans-serif" }}>{new Date(amb.createdAt).toLocaleDateString("en-US", { month:"long", day:"numeric", year:"numeric" })}</div>
                </div>
                {amb.lastAccess && (
                  <div>
                    <div style={{ fontSize:9, color:C.mutedDark, fontFamily:"sans-serif", marginBottom:2 }}>LAST ACCESS</div>
                    <div style={{ fontSize:11, color:C.creamDim, fontFamily:"sans-serif" }}>{new Date(amb.lastAccess).toLocaleDateString("en-US", { month:"long", day:"numeric", year:"numeric" })}</div>
                  </div>
                )}
              </div>
            </div>
            <Btn onClick={() => removeAmbassador(amb.code)} color={C.red} small>Remove</Btn>
          </div>
        ))}
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
