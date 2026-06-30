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
  { id:"us", label:"North America / USA" },
  { id:"na", label:"North Africa" },
  { id:"me", label:"Middle East" },
  { id:"as", label:"Asia" },
  { id:"la", label:"Latin America" },
  { id:"ss", label:"Sub-Saharan Africa" },
];

const RELIGIONS = ["All", "Muslim", "Christian", "Catholic", "Hebrew Israelite", "Other"];
const AGE_RANGES = ["All Ages", "18-24", "25-30", "31-35", "36+"];
const FAMILY_PREFS = ["All", "Direct contact", "Through family", "Family must be involved"];

function AmbassadorBadge() {
  return <span style={{ background:C.gold, color:C.navyDeep, fontSize:8, fontWeight:700, padding:"2px 8px", fontFamily:"sans-serif", letterSpacing:"0.1em", verticalAlign:"middle", marginLeft:6 }}>AMBASSADOR</span>;
}

function CertifiedBadge() {
  return <span style={{ background:C.green, color:"white", fontSize:8, fontWeight:700, padding:"2px 8px", fontFamily:"sans-serif", letterSpacing:"0.1em", verticalAlign:"middle", marginLeft:6 }}>CERTIFIED</span>;
}

function FounderBadge() {
  return <span style={{ background:C.navyDeep, border:"1px solid " + C.gold, color:C.gold, fontSize:8, fontWeight:700, padding:"2px 8px", fontFamily:"sans-serif", letterSpacing:"0.1em", verticalAlign:"middle", marginLeft:6 }}>FOUNDER</span>;
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


function MatrimonialPlatform({ userEmail, isAmbassador, isCertified, gender, isAdmin, autoAdmin }) {
  const [profiles, setProfiles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [view, setView] = useState("browse"); // browse | profile | create | messages | admin
  const [activeProfile, setActiveProfile] = useState(null);
  const [myProfile, setMyProfile] = useState(null);
  const [profileEmail, setProfileEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [filters, setFilters] = useState({ region:"all", religion:"All", age:"All Ages", family:"All" });
  const [createForm, setCreateForm] = useState({
    displayName:"", age:"", city:"", country:"", region:"north_america", regions:[],
    religion:"Islam", bio:"", seeking:"marriage",
    familyInvolvement:"Family must be involved",
    virtueStatus:"prefer_not_say", maritalStatus:"single",
    hasChildren:"no", education:"", languages:"",
    height:"", photos:[]
  });
  const [conversations, setConversations] = useState([]);
  const [adminViewProfile, setAdminViewProfile] = useState(null);
  const [adminViewConvos, setAdminViewConvos] = useState([]);
  const [toast, setToast] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);
  const [adminSearch, setAdminSearch] = useState("");
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [reports, setReports] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [passedProfiles, setPassedProfiles] = useState([]);
  const [blockedProfiles, setBlockedProfiles] = useState([]);
  const [allPasses, setAllPasses] = useState([]);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [activityLog, setActivityLog] = useState([]);
  const [activeConvo, setActiveConvo] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [hidden, setHidden] = useState(false);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [allProfiles, setAllProfiles] = useState([]);
  const [adminTab, setAdminTab] = useState("profiles"); // profiles | consulate | ambassadors | myprofile
  const [consulatePosts, setConsulatePosts] = useState([]);
  const [ambassadors, setAmbassadors] = useState([]);
  const [newAmbForm, setNewAmbForm] = useState({ name:"", email:"", note:"" });
  const [newAmbResult, setNewAmbResult] = useState("");
  const [leads, setLeads] = useState([]);

  const canContact = isAmbassador || isCertified || isAdmin;
  const showMen = gender === "woman";
  const showWomen = gender !== "woman"; // default to showing women (men + unset sessions)

  useEffect(() => { 
    // Re-load whenever email or gender arrives from session
    loadProfiles(); 
    if (userEmail) loadMyProfile(); 
  }, [userEmail, gender]);

  useEffect(() => {
    if (autoAdmin && isAdmin) {
      setAdminTab("profiles");
      loadAllProfiles();
      loadPendingApprovals();
      setView("admin");
    }
  }, [autoAdmin, isAdmin]);

  useEffect(() => {
    let result = profiles;
    if (filters.region !== "all") result = result.filter(p => p.region === filters.region);
    if (filters.religion !== "All") result = result.filter(p => {
      const rel = (p.religion || "").toLowerCase();
      const f = filters.religion.toLowerCase();
      if (f === "muslim") return rel.includes("muslim") || rel.includes("islam");
      if (f === "christian") return rel.includes("christian") && !rel.includes("catholic") && !rel.includes("orthodox");
      if (f === "catholic") return rel.includes("catholic");
      if (f === "hebrew israelite") return rel.includes("hebrew");
      return rel.includes(f);
    });
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
      // Send viewer's gender — API returns profiles of the opposite gender
      const viewerGender = gender || "man";
      const res = await fetch("/api/matrimonial?action=list&gender=" + viewerGender + "&email=" + encodeURIComponent(userEmail || ""));
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

  const loadAllProfiles = async () => {
    try {
      const adminKey = await getAdminKey();
      const res = await fetch("/api/matrimonial?action=allProfiles&adminKey=" + encodeURIComponent(adminKey));
      const data = await res.json();
      setAllProfiles(data.profiles || []);
    } catch(e) {}
  };

  const loadConsulatePosts = async () => {
    try {
      const res = await fetch("/api/community?action=list");
      const data = await res.json();
      setConsulatePosts(data.posts || []);
    } catch(e) {}
  };

  const loadAmbassadors = async () => {
    try {
      const adminKey = await getAdminKey();
      const res = await fetch("/api/ambassadors?action=list&adminKey=" + encodeURIComponent(adminKey));
      const data = await res.json();
      setAmbassadors(data.ambassadors || []);
    } catch(e) {}
  };

  const createAmbassador = async () => {
    if (!newAmbForm.name || !newAmbForm.email) { setNewAmbResult("Name and email required."); return; }
    try {
      const adminKey = await getAdminKey();
      const res = await fetch("/api/ambassadors", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ action:"add", adminKey, ...newAmbForm })
      });
      const data = await res.json();
      if (data.ok) {
        setNewAmbResult("Ambassador created. Code: " + data.code);
        setNewAmbForm({ name:"", email:"", note:"" });
        loadAmbassadors();
      } else { setNewAmbResult(data.error || "Failed."); }
    } catch(e) { setNewAmbResult("Error."); }
  };

  const revokeAmbassador = async (code) => {
    askConfirm("Revoke ambassador code " + code + "?", async () => {
    try {
      const adminKey = await getAdminKey();
      await fetch("/api/ambassadors", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ action:"remove", adminKey, code })
      });
      setAmbassadors(prev => prev.filter(a => a.code !== code));
      showToast("Ambassador code revoked.", "success");
    } catch(e) {}
    });
  };

  const deleteConsulatePost = async (postId) => {
    try {
      const adminKey = await getAdminKey();
      await fetch("/api/community", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ action:"delete", adminKey, postId })
      });
      setConsulatePosts(prev => prev.filter(p => p.id !== postId));
    } catch(e) {}
  };

  // Admin auth: use ADMINTEST code directly — all admin APIs accept it
  const getAdminKey = async () => "ADMINTEST";

  const showToast = (message, type) => {
    setToast({ message, type: type || "info" });
    setTimeout(() => setToast(null), 3500);
  };

  const askConfirm = (message, onConfirm) => {
    setConfirmModal({ message, onConfirm });
  };

  const loadReports = async () => {
    try {
      const res = await fetch("/api/matrimonial?action=listReports&adminKey=ADMINTEST");
      const data = await res.json();
      setReports(data.reports || []);
    } catch(e) {}
  };

  const loadBlocks = async () => {
    try {
      const res = await fetch("/api/matrimonial?action=listBlocks&adminKey=ADMINTEST");
      const data = await res.json();
      setBlocks(data.blocks || []);
    } catch(e) {}
  };

  const loadAllPasses = async () => {
    try {
      const res = await fetch("/api/matrimonial?action=listPasses&adminKey=ADMINTEST");
      const data = await res.json();
      setAllPasses(data.passes || []);
    } catch(e) {}
  };

  const adminClearPass = async (passer, target) => {
    try {
      await fetch("/api/matrimonial", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ action:"adminClearPass", adminKey:"ADMINTEST", passer, target })
      });
      setAllPasses(prev => prev.map(p => p.passer === passer ? { ...p, passed: p.passed.filter(t => t !== target) } : p).filter(p => p.passed.length > 0));
      showToast("Pass relationship cleared.", "success");
    } catch(e) {}
  };

  const adminClearBlock = async (blocker, target) => {
    try {
      await fetch("/api/matrimonial", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ action:"adminClearBlock", adminKey:"ADMINTEST", blocker, target })
      });
      setBlocks(prev => prev.map(b => b.blocker === blocker ? { ...b, blocked: b.blocked.filter(t => t !== target) } : b).filter(b => b.blocked.length > 0));
      showToast("Block relationship cleared.", "success");
    } catch(e) {}
  };

  const loadActivityLog = async () => {
    try {
      const res = await fetch("/api/matrimonial?action=activityLog&adminKey=ADMINTEST");
      const data = await res.json();
      setActivityLog(data.log || []);
    } catch(e) {}
  };

  const dismissReport = async (reportIndex, target) => {
    try {
      const res = await fetch("/api/matrimonial", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ action:"dismissReport", adminCode:"ADMINTEST", adminKey:"ADMINTEST", reportIndex, target })
      });
      const data = await res.json();
      if (data.ok) { showToast("Report dismissed.", "success"); loadReports(); }
      else showToast(data.error || "Failed to dismiss.", "error");
    } catch(e) { showToast("Error dismissing report.", "error"); }
  };

  const bulkDeleteProfiles = async () => {
    if (selectedProfiles.length === 0) return;
    askConfirm(`Delete ${selectedProfiles.length} selected profile(s)? This cannot be undone.`, async () => {
      try {
        const res = await fetch("/api/matrimonial", {
          method:"POST", headers:{"Content-Type":"application/json"},
          body: JSON.stringify({ action:"bulkDelete", adminKey:"ADMINTEST", emails:selectedProfiles })
        });
        const data = await res.json();
        if (data.ok) {
          showToast(`${data.deleted} profile(s) deleted.`, "success");
          setAllProfiles(prev => prev.filter(p => !selectedProfiles.includes(p.email)));
          setSelectedProfiles([]);
        } else showToast(data.error || "Bulk delete failed.", "error");
      } catch(e) { showToast("Error during bulk delete.", "error"); }
    });
  };

  const seedVirtualWomen = async () => {
    try {
      const res = await fetch("/api/seed-virtual-women?code=ADMINTEST");
      const data = await res.json();
      if (data.seeded) {
        showToast("Success — " + data.seeded + " virtual women added.", "success");
        loadAllProfiles();
      } else {
        showToast(data.error || "Seed failed.", "error");
      }
    } catch(e) { 
      showToast("Seed route not found. Check deployment.", "error");
    }
  };

  const seedFounderProfile = async () => {
    try {
      const res = await fetch("/api/seed-founder?code=ADMINTEST");
      const data = await res.json();
      if (data.ok) {
        showToast("Founder profile seeded successfully.", "success");
        loadAllProfiles();
        loadMyProfile();
      } else {
        showToast(data.error || "Seed failed.", "error");
      }
    } catch(e) { showToast("Error seeding founder profile.", "error"); }
  };

  const loadLeads = async () => {
    try {
      const res = await fetch("/api/approve-lead?action=list&code=ADMINTEST");
      const data = await res.json();
      setLeads(data.leads || []);
    } catch(e) {}
  };

  const approveLead = async (email) => {
    try {
      const res = await fetch("/api/approve-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminCode: "ADMINTEST", email })
      });
      const data = await res.json();
      if (data.ok) {
        showToast("Approved — access email sent to " + email, "success");
        setLeads(prev => prev.map(l => l.email === email ? {...l, approved:true} : l));
      } else {
        showToast("Error: " + (data.error || "Failed"), "error");
      }
    } catch(e) { showToast("Error approving lead.", "error"); }
  };

  const backfillWomenGender = async () => {
    try {
      const res = await fetch("/api/approve-lead?action=list&code=ADMINTEST");
      const data = await res.json();
      const leads = data.leads || [];
      let count = 0;
      for (const lead of leads) {
        await fetch("/api/approve-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ adminCode: "ADMINTEST", email: lead.email, setGender: true })
        });
        count++;
      }
      showToast(`Gender backfilled for ${count} women.`, "success");
    } catch(e) { showToast("Error backfilling gender.", "error"); }
  };

  const setLeadGender = async (email, gender) => {
    try {
      const res = await fetch("/api/approve-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminCode: "ADMINTEST", email, setGenderOnly: true, gender })
      });
      const data = await res.json();
      if (data.ok) {
        showToast(`Gender set to "${gender}" for ${email}.`, "success");
        setLeads(prev => prev.map(l => l.email === email ? {...l, gender} : l));
      } else {
        showToast(data.error || "Failed.", "error");
      }
    } catch(e) { showToast("Error setting gender.", "error"); }
  };

  const loadPendingApprovals = async () => {
    try {
      const adminKey = await getAdminKey();
      const res = await fetch("/api/matrimonial?action=pending&adminKey=" + encodeURIComponent(adminKey));
      const data = await res.json();
      setPendingApprovals(data.profiles || []);
    } catch(e) {}
  };

  const submitProfile = async () => {
    setMsg("");
    const emailToUse = profileEmail || userEmail;
    if (!emailToUse) { setMsg("Please enter your email address."); return; }
    if (!createForm.displayName || !createForm.age || !createForm.city || !createForm.bio) {
      setMsg("Please fill in all required fields."); return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/matrimonial", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ action: isEditing ? "updateProfile" : "createProfile", email:emailToUse, gender, ...createForm, photoBase64: (createForm.photos && createForm.photos[0]) || createForm.photoBase64 || null, photos: createForm.photos || [] })
      });
      const data = await res.json();
      if (data.ok) {
        setMsg(isEditing ? "Profile updated successfully." : "Profile created successfully.");
        setView(isEditing ? "myprofile" : "browse");
        loadMyProfile();
      } else { 
        setMsg("Failed: " + (data.error || "Unknown error. Check all required fields."));
      }
    } catch(e) { setMsg("Error submitting profile: " + String(e)); }
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!messageText.trim() || !activeConvo) return;
    if (!canContact) { setMsg("Complete the course to contact members."); return; }
    try {
      const adminKey = isAdmin ? await getAdminKey() : "";
      const res = await fetch("/api/matrimonial", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ action:"sendMessage", from:userEmail, to:activeConvo.email, text:messageText.trim(), isAmbassador, adminKey })
      });
      const data = await res.json();
      if (!data.ok) { setMsg(data.error || "Failed to send message."); return; }
      setMessageText("");
      loadConversation(activeConvo.email);
    } catch(e) { setMsg("Error sending message: " + String(e)); }
  };

  const loadConversations = async () => {
    try {
      const res = await fetch("/api/matrimonial?action=listConversations&email=" + encodeURIComponent(userEmail));
      const data = await res.json();
      setConversations(data.conversations || []);
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
    askConfirm("Block this member? They will no longer be able to contact you or see your profile.", async () => {
    try {
      await fetch("/api/matrimonial", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ action:"block", email:userEmail, target:targetEmail })
      });
      setProfiles(prev => prev.filter(p => p.email !== targetEmail));
      setView("browse");
      showToast("Member blocked.", "success");
    } catch(e) {}
    });
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
      showToast("Report submitted. Thank you.", "success");
    } catch(e) {}
  };

  const passUser = async (targetEmail) => {
    try {
      await fetch("/api/matrimonial", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ action:"pass", email:userEmail, target:targetEmail })
      });
      setProfiles(prev => prev.filter(p => p.email !== targetEmail));
      setView("browse");
      showToast("Passed. You can revisit this anytime under My Profile → Passed Profiles.", "info");
    } catch(e) {}
  };

  const loadPassedProfiles = async () => {
    try {
      const res = await fetch("/api/matrimonial?action=listPassed&email=" + encodeURIComponent(userEmail));
      const data = await res.json();
      setPassedProfiles(data.profiles || []);
    } catch(e) {}
  };

  const unpassUser = async (targetEmail) => {
    try {
      await fetch("/api/matrimonial", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ action:"unpass", email:userEmail, target:targetEmail })
      });
      setPassedProfiles(prev => prev.filter(p => p.email !== targetEmail));
      showToast("Profile restored to your browse list.", "success");
    } catch(e) {}
  };

  const loadBlockedProfiles = async () => {
    try {
      const res = await fetch("/api/matrimonial?action=listBlocked&email=" + encodeURIComponent(userEmail));
      const data = await res.json();
      setBlockedProfiles(data.profiles || []);
    } catch(e) {}
  };

  const unblockUser = async (targetEmail) => {
    try {
      await fetch("/api/matrimonial", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ action:"unblock", email:userEmail, target:targetEmail })
      });
      setBlockedProfiles(prev => prev.filter(p => p.email !== targetEmail));
      showToast("Member unblocked. They can contact you and see your profile again.", "success");
    } catch(e) {}
  };

  const approveProfile = async (profileEmail) => {
    try {
      await fetch("/api/matrimonial", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ action:"approve", adminKey: await getAdminKey(), email:profileEmail })
      });
      setPendingApprovals(prev => prev.filter(p => p.email !== profileEmail));
    } catch(e) {}
  };

  const rejectProfile = async (profileEmail) => {
    try {
      await fetch("/api/matrimonial", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ action:"reject", adminKey: await getAdminKey(), email:profileEmail })
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
              <button onClick={() => passUser(activeProfile.email)} style={{ background:"none", border:"1px solid " + C.muted, color:C.muted, padding:"6px 12px", cursor:"pointer", fontSize:10, fontFamily:"sans-serif" }}>Pass</button>
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
                {activeProfile.isFounder && <FounderBadge />}
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
          {activeProfile.photos && activeProfile.photos.length > 1 && (
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:"1.5rem" }}>
              {activeProfile.photos.slice(1).map((photo, i) => (
                <img key={i} src={photo} alt={"Photo " + (i+2)} style={{ width:80, height:100, objectFit:"cover", objectPosition:"center top", border:"1px solid " + C.border, cursor:"pointer" }} onClick={() => setLightboxPhoto(photo)} />
              ))}
            </div>
          )}
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
              {activeProfile.isVirtual ? null : canContact ? (
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
        {lightboxPhoto && (
          <div onClick={() => setLightboxPhoto(null)} style={{ position:"fixed", inset:0, background:"rgba(5,13,26,0.92)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:9997, padding:"2rem", cursor:"pointer" }}>
            <img src={lightboxPhoto} alt="Full size" style={{ maxWidth:"90vw", maxHeight:"85vh", objectFit:"contain", border:"1px solid " + C.gold }} />
          </div>
        )}
        {toast && (
          <div style={{ position:"fixed", bottom:20, left:"50%", transform:"translateX(-50%)", background: toast.type==="error"?"#3a1414":toast.type==="success"?"#14301c":"#16243f", border:"1px solid "+(toast.type==="error"?C.red:toast.type==="success"?C.green:C.gold), color:C.cream, padding:"12px 24px", fontSize:13, fontFamily:"sans-serif", zIndex:9999, boxShadow:"0 4px 20px rgba(0,0,0,0.5)" }}>
            {toast.message}
          </div>
        )}
        {confirmModal && (
          <div style={{ position:"fixed", inset:0, background:"rgba(5,13,26,0.85)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:9998, padding:"1.5rem" }}>
            <div style={{ background:C.navyDeep, border:"1px solid "+C.gold, padding:"1.75rem", maxWidth:420, width:"100%" }}>
              <div style={{ fontSize:14, color:C.cream, fontFamily:"sans-serif", lineHeight:1.6, marginBottom:20 }}>{confirmModal.message}</div>
              <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
                <button onClick={() => setConfirmModal(null)} style={{ padding:"8px 18px", background:"transparent", border:"1px solid "+C.border, color:C.muted, cursor:"pointer", fontFamily:"sans-serif", fontSize:12 }}>Cancel</button>
                <button onClick={() => { const fn = confirmModal.onConfirm; setConfirmModal(null); fn(); }} style={{ padding:"8px 18px", background:C.red, color:"white", border:"none", cursor:"pointer", fontFamily:"sans-serif", fontSize:12, fontWeight:700 }}>Confirm</button>
              </div>
            </div>
          </div>
        )}
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
            <div>
              {conversations.length === 0 ? (
                <div style={{ color:C.muted, textAlign:"center", padding:"3rem", fontFamily:"sans-serif" }}>No conversations yet.</div>
              ) : (
                conversations.map(c => (
                  <div key={c.email} onClick={() => loadConversation(c.email)} style={{ display:"flex", gap:14, alignItems:"center", padding:"1rem", background:C.navyDeep, border:"1px solid " + C.border, marginBottom:8, cursor:"pointer" }}>
                    {c.photoUrl ? (
                      <img src={c.photoUrl} alt={c.displayName} style={{ width:48, height:48, borderRadius:"50%", objectFit:"cover", flexShrink:0 }} />
                    ) : (
                      <div style={{ width:48, height:48, borderRadius:"50%", background:"rgba(184,150,62,0.15)", border:"1px solid " + C.gold, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, color:C.gold, flexShrink:0 }}>{(c.displayName||"?")[0].toUpperCase()}</div>
                    )}
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:14, color:C.goldLight, marginBottom:2 }}>{c.displayName}</div>
                      <div style={{ fontSize:12, color:C.muted, fontFamily:"sans-serif", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{c.lastMessage}</div>
                    </div>
                    {c.lastTimestamp > 0 && <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif", flexShrink:0 }}>{new Date(c.lastTimestamp).toLocaleDateString()}</div>}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        {toast && (
          <div style={{ position:"fixed", bottom:20, left:"50%", transform:"translateX(-50%)", background: toast.type==="error"?"#3a1414":toast.type==="success"?"#14301c":"#16243f", border:"1px solid "+(toast.type==="error"?C.red:toast.type==="success"?C.green:C.gold), color:C.cream, padding:"12px 24px", fontSize:13, fontFamily:"sans-serif", zIndex:9999, boxShadow:"0 4px 20px rgba(0,0,0,0.5)" }}>
            {toast.message}
          </div>
        )}
        {confirmModal && (
          <div style={{ position:"fixed", inset:0, background:"rgba(5,13,26,0.85)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:9998, padding:"1.5rem" }}>
            <div style={{ background:C.navyDeep, border:"1px solid "+C.gold, padding:"1.75rem", maxWidth:420, width:"100%" }}>
              <div style={{ fontSize:14, color:C.cream, fontFamily:"sans-serif", lineHeight:1.6, marginBottom:20 }}>{confirmModal.message}</div>
              <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
                <button onClick={() => setConfirmModal(null)} style={{ padding:"8px 18px", background:"transparent", border:"1px solid "+C.border, color:C.muted, cursor:"pointer", fontFamily:"sans-serif", fontSize:12 }}>Cancel</button>
                <button onClick={() => { const fn = confirmModal.onConfirm; setConfirmModal(null); fn(); }} style={{ padding:"8px 18px", background:C.red, color:"white", border:"none", cursor:"pointer", fontFamily:"sans-serif", fontSize:12, fontWeight:700 }}>Confirm</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // CREATE PROFILE VIEW
  if (view === "create") {
    return (
      <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
        <div style={{ background:C.navyDeep, borderBottom:"1px solid " + C.border, padding:"1rem 1.5rem", display:"flex", alignItems:"center", gap:12 }}>
          <button onClick={() => setView("browse")} style={{ background:"none", border:"1px solid " + C.gold, color:C.gold, padding:"6px 14px", cursor:"pointer", fontSize:12, fontFamily:"sans-serif" }}>← Back</button>
          <div style={{ fontSize:14, color:C.goldLight }}>{isEditing ? "Edit Your Profile" : "Create Your Profile"}</div>
        </div>
        <div style={{ maxWidth:620, margin:"0 auto", padding:"2rem 1.5rem" }}>
          {gender === "woman" && (
            <div style={{ background:"rgba(74,124,94,0.1)", border:"1px solid " + C.green, padding:"0.875rem", marginBottom:"1.5rem", fontSize:12, color:C.green, fontFamily:"sans-serif" }}>
              {isEditing ? "Update your profile details below." : "Women join free. Create your profile and start browsing."}
            </div>
          )}
          {msg && <div style={{ color:C.red, fontFamily:"sans-serif", fontSize:12, marginBottom:12, padding:"8px 12px", background:"rgba(139,26,26,0.1)", border:"1px solid " + C.red }}>{msg}</div>}
          <Input label="EMAIL ADDRESS *" type="email" value={profileEmail} onChange={e => setProfileEmail(e.target.value)} placeholder="Your email address — this is your account key" />
          <Input label="DISPLAY NAME *" value={createForm.displayName} onChange={e => setCreateForm({...createForm, displayName:e.target.value})} placeholder="How you will appear on the platform" />
          <Input label="AGE *" type="number" value={createForm.age} onChange={e => setCreateForm({...createForm, age:e.target.value})} />
          <Input label="CITY *" value={createForm.city} onChange={e => setCreateForm({...createForm, city:e.target.value})} />
          <Input label="COUNTRY *" value={createForm.country} onChange={e => setCreateForm({...createForm, country:e.target.value})} />
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif", letterSpacing:"0.1em", marginBottom:8 }}>{gender === "man" ? "REGIONS (select all that apply)" : "REGION *"}</div>
            {gender === "man" ? (
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {REGIONS.filter(r => r.id !== "all").map(r => {
                  const selected = (createForm.regions || []).includes(r.id);
                  return (
                    <div key={r.id} onClick={() => {
                      const current = createForm.regions || [];
                      const updated = selected ? current.filter(x => x !== r.id) : [...current, r.id];
                      setCreateForm({...createForm, regions: updated, region: updated[0] || "north_america"});
                    }} style={{ padding:"6px 14px", border:"1px solid " + (selected ? C.gold : C.border), background: selected ? C.gold + "22" : C.dark, color: selected ? C.goldLight : C.muted, fontSize:11, fontFamily:"sans-serif", cursor:"pointer" }}>
                      {selected ? "✓ " : ""}{r.label}
                    </div>
                  );
                })}
              </div>
            ) : (
              <select value={createForm.region} onChange={e => setCreateForm({...createForm, region:e.target.value})} style={{ width:"100%", padding:"10px 12px", background:C.dark, border:"1px solid " + C.border, color:C.cream, fontSize:13, fontFamily:"sans-serif" }}>
                {REGIONS.filter(r => r.id !== "all").map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
              </select>
            )}
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
              <option value="married">Married</option>
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
            <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif", letterSpacing:"0.1em", marginBottom:6 }}>PROFILE PHOTOS (optional, up to 6)</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:10 }}>
              {(createForm.photos || []).map((photo, i) => (
                <div key={i} style={{ position:"relative", width:90, height:112 }}>
                  <img src={photo} alt={"Photo " + (i+1)} style={{ width:90, height:112, objectFit:"cover", objectPosition:"center top", border: i===0 ? "2px solid " + C.gold : "1px solid " + C.border }} />
                  {i === 0 && <div style={{ position:"absolute", top:2, left:2, background:C.gold, color:C.navyDeep, fontSize:8, fontWeight:700, padding:"1px 5px", fontFamily:"sans-serif" }}>PRIMARY</div>}
                  <button onClick={() => {
                    const updated = (createForm.photos || []).filter((_, idx) => idx !== i);
                    setCreateForm({...createForm, photos: updated, photoBase64: updated[0] || null, photoPreview: updated[0] || null});
                  }} style={{ position:"absolute", top:2, right:2, background:"rgba(10,10,20,0.85)", border:"none", color:C.red, cursor:"pointer", fontSize:13, width:18, height:18, lineHeight:"18px", textAlign:"center", padding:0 }}>×</button>
                </div>
              ))}
              {(createForm.photos || []).length < 6 && (
                <label style={{ width:90, height:112, border:"1px dashed " + C.border, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", cursor:"pointer", color:C.muted, fontFamily:"sans-serif" }}>
                  <div style={{ fontSize:22, marginBottom:4 }}>＋</div>
                  <div style={{ fontSize:9 }}>Add Photo</div>
                  <input type="file" accept="image/*" style={{ display:"none" }} onChange={e => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const current = createForm.photos || [];
                    if (current.length >= 6) { showToast("Maximum 6 photos.", "error"); return; }
                    if (file.size > 8 * 1024 * 1024) { showToast("Photo must be under 8MB.", "error"); return; }
                    const img = new Image();
                    const reader = new FileReader();
                    reader.onload = ev => {
                      img.onload = () => {
                        const maxDim = 800;
                        let w = img.width, h = img.height;
                        if (w > maxDim || h > maxDim) {
                          if (w > h) { h = Math.round(h * maxDim / w); w = maxDim; }
                          else { w = Math.round(w * maxDim / h); h = maxDim; }
                        }
                        const canvas = document.createElement("canvas");
                        canvas.width = w; canvas.height = h;
                        const ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0, w, h);
                        const compressed = canvas.toDataURL("image/jpeg", 0.8);
                        const updated = [...current, compressed];
                        setCreateForm(f => ({...f, photos: updated, photoBase64: updated[0], photoPreview: updated[0]}));
                      };
                      img.src = ev.target.result;
                    };
                    reader.readAsDataURL(file);
                  }} />
                </label>
              )}
            </div>
            <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif" }}>JPG or PNG · Max 8MB each · First photo is your primary/cover image · {(createForm.photos || []).length}/6 used</div>
          </div>
          <button onClick={submitProfile} disabled={loading} style={{ width:"100%", padding:"14px", background:loading ? C.border : C.gold, color:C.navyDeep, border:"none", cursor:loading ? "default" : "pointer", fontSize:13, fontWeight:700, fontFamily:"sans-serif" }}>
            {loading ? "Saving..." : isEditing ? "Save Changes →" : "Create Profile →"}
          </button>
          {gender === "woman" && (
            <div style={{ fontSize:11, color:C.muted, fontFamily:"sans-serif", textAlign:"center", marginTop:12, lineHeight:1.6 }}>
              
            </div>
          )}
        </div>
        {toast && (
          <div style={{ position:"fixed", bottom:20, left:"50%", transform:"translateX(-50%)", background: toast.type==="error"?"#3a1414":toast.type==="success"?"#14301c":"#16243f", border:"1px solid "+(toast.type==="error"?C.red:toast.type==="success"?C.green:C.gold), color:C.cream, padding:"12px 24px", fontSize:13, fontFamily:"sans-serif", zIndex:9999, boxShadow:"0 4px 20px rgba(0,0,0,0.5)" }}>
            {toast.message}
          </div>
        )}
        {confirmModal && (
          <div style={{ position:"fixed", inset:0, background:"rgba(5,13,26,0.85)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:9998, padding:"1.5rem" }}>
            <div style={{ background:C.navyDeep, border:"1px solid "+C.gold, padding:"1.75rem", maxWidth:420, width:"100%" }}>
              <div style={{ fontSize:14, color:C.cream, fontFamily:"sans-serif", lineHeight:1.6, marginBottom:20 }}>{confirmModal.message}</div>
              <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
                <button onClick={() => setConfirmModal(null)} style={{ padding:"8px 18px", background:"transparent", border:"1px solid "+C.border, color:C.muted, cursor:"pointer", fontFamily:"sans-serif", fontSize:12 }}>Cancel</button>
                <button onClick={() => { const fn = confirmModal.onConfirm; setConfirmModal(null); fn(); }} style={{ padding:"8px 18px", background:C.red, color:"white", border:"none", cursor:"pointer", fontFamily:"sans-serif", fontSize:12, fontWeight:700 }}>Confirm</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ADMIN VIEW
  if (view === "admin" && isAdmin) {
    const cardStyle = { background:C.navyDeep, border:"1px solid " + C.border, padding:"1rem 1.25rem", marginBottom:10, display:"flex", gap:14, alignItems:"flex-start" };
    const ADMIN_TABS = [
      { id:"profiles", label:"Profiles" },
      { id:"reports", label:"Reports" + (reports.length ? ` (${reports.length})` : "") },
      { id:"blocks", label:"Blocks" },
      { id:"passes", label:"Passes" },
      { id:"consulate", label:"Consulate" },
      { id:"ambassadors", label:"Ambassadors" },
      { id:"leads", label:"Women's Profiles" },
      { id:"activity", label:"Activity" },
      { id:"myprofile", label:"My Profile" },
    ];
    return (
      <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
        {/* Header */}
        <div style={{ background:C.navyDeep, borderBottom:"1px solid " + C.border, padding:"1rem 1.5rem", display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
          <button onClick={() => setView("browse")} style={{ background:"none", border:"1px solid " + C.gold, color:C.gold, padding:"6px 14px", cursor:"pointer", fontSize:12, fontFamily:"sans-serif" }}>← Platform</button>
          <div style={{ fontSize:14, color:C.goldLight, fontFamily:"Georgia,serif" }}>The International Lover™ — Admin</div>
          <div style={{ display:"flex", gap:6, marginLeft:"auto", flexWrap:"wrap" }}>
            {ADMIN_TABS.map(t => (
              <button key={t.id} onClick={() => {
                setAdminTab(t.id);
                if (t.id === "profiles") { loadAllProfiles(); loadPendingApprovals(); }
                if (t.id === "reports") loadReports();
                if (t.id === "blocks") loadBlocks();
                if (t.id === "passes") loadAllPasses();
                if (t.id === "consulate") loadConsulatePosts();
                if (t.id === "ambassadors") loadAmbassadors();
                if (t.id === "leads") loadLeads();
                if (t.id === "activity") loadActivityLog();
                if (t.id === "myprofile") loadMyProfile();
              }} style={{ padding:"6px 14px", background:adminTab===t.id?C.gold:"transparent", color:adminTab===t.id?C.navyDeep:C.muted, border:"1px solid "+(adminTab===t.id?C.gold:C.border), cursor:"pointer", fontSize:11, fontFamily:"sans-serif", fontWeight:adminTab===t.id?700:400 }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ maxWidth:900, margin:"0 auto", padding:"1.5rem" }}>

          {/* ── PROFILES ── */}
          {adminTab === "profiles" && (
            <div>
              {/* Pending approvals */}
              {pendingApprovals.length > 0 && (
                <div style={{ marginBottom:"2rem" }}>
                  <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.red, fontFamily:"sans-serif", marginBottom:12 }}>PENDING APPROVAL — {pendingApprovals.length} women awaiting review</div>
                  {pendingApprovals.map(p => (
                    <div key={p.email} style={cardStyle}>
                      {p.photoUrl && <img src={p.photoUrl} alt={p.displayName} style={{ width:72, height:90, objectFit:"cover", objectPosition:"center top", flexShrink:0 }} />}
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:14, color:C.goldLight, marginBottom:3 }}>{p.displayName} · {p.age} · {p.city}</div>
                        <div style={{ fontSize:11, color:C.muted, fontFamily:"sans-serif", marginBottom:6 }}>{p.email} · {p.religion}</div>
                        <p style={{ fontSize:11, color:C.creamDim, fontFamily:"sans-serif", lineHeight:1.6, margin:"0 0 10px" }}>{(p.bio||"").slice(0,160)}...</p>
                        <div style={{ display:"flex", gap:8 }}>
                          <button onClick={() => approveProfile(p.email)} style={{ padding:"6px 14px", background:C.green, color:"white", border:"none", cursor:"pointer", fontFamily:"sans-serif", fontSize:11, fontWeight:700 }}>Approve</button>
                          <button onClick={() => rejectProfile(p.email)} style={{ padding:"6px 14px", background:C.red, color:"white", border:"none", cursor:"pointer", fontFamily:"sans-serif", fontSize:11, fontWeight:700 }}>Reject</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* All profiles */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12, flexWrap:"wrap", gap:8 }}>
                <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.muted, fontFamily:"sans-serif" }}>ALL PROFILES — {allProfiles.length} total in Redis</div>
                <button onClick={seedVirtualWomen} style={{ padding:"6px 14px", background:"transparent", border:"1px solid #4a6fa5", color:"#7aa0d0", cursor:"pointer", fontSize:11, fontFamily:"sans-serif" }}>＋ Seed Virtual Women</button>
                <button onClick={seedFounderProfile} style={{ padding:"6px 14px", background:"transparent", border:"1px solid " + C.gold, color:C.gold, cursor:"pointer", fontSize:11, fontFamily:"sans-serif" }}>✦ Seed Founder Profile</button>
              </div>
              <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:14, flexWrap:"wrap" }}>
                <input value={adminSearch} onChange={e => setAdminSearch(e.target.value)} placeholder="Search by name or email…" style={{ flex:1, minWidth:200, padding:"8px 12px", background:C.dark, border:"1px solid " + C.border, color:C.cream, fontSize:12, fontFamily:"sans-serif" }} />
                {selectedProfiles.length > 0 && (
                  <button onClick={bulkDeleteProfiles} style={{ padding:"8px 14px", background:"transparent", border:"1px solid " + C.red, color:C.red, cursor:"pointer", fontSize:11, fontFamily:"sans-serif", fontWeight:700 }}>Delete Selected ({selectedProfiles.length})</button>
                )}
              </div>
              {allProfiles.length === 0 && <div style={{ color:C.muted, textAlign:"center", padding:"2rem", fontFamily:"sans-serif" }}>No profiles found. Click "Seed Virtual Women" above to add the 22 course women.</div>}
              {allProfiles
                .filter(p => {
                  if (!adminSearch.trim()) return true;
                  const q = adminSearch.trim().toLowerCase();
                  return (p.displayName||"").toLowerCase().includes(q) || (p.email||"").toLowerCase().includes(q);
                })
                .map(p => (
                <div key={p.email} style={cardStyle}>
                  <input type="checkbox" checked={selectedProfiles.includes(p.email)} onChange={() => {
                    setSelectedProfiles(prev => prev.includes(p.email) ? prev.filter(e => e !== p.email) : [...prev, p.email]);
                  }} style={{ marginTop:4, flexShrink:0 }} />
                  {p.photoUrl && <img src={p.photoUrl} alt={p.displayName} style={{ width:60, height:76, objectFit:"cover", objectPosition:"center top", flexShrink:0, border:"1px solid " + C.border }} />}
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:4, flexWrap:"wrap" }}>
                      <span style={{ fontSize:13, color:C.goldLight }}>{p.displayName}</span>
                      <span style={{ fontSize:9, color:p.approved?C.green:C.red, fontFamily:"sans-serif", border:"1px solid "+(p.approved?C.green:C.red), padding:"1px 5px" }}>{p.approved?"APPROVED":"PENDING"}</span>
                      <span style={{ fontSize:9, color:C.muted, fontFamily:"sans-serif" }}>{p.gender}</span>
                      {p.isVirtual && <span style={{ fontSize:9, color:"#7aa0d0", fontFamily:"sans-serif" }}>VIRTUAL</span>}
                      {p.isFounder && <span style={{ fontSize:9, color:C.gold, fontFamily:"sans-serif" }}>FOUNDER</span>}
                      {p.isAmbassador && <span style={{ fontSize:9, color:C.gold, fontFamily:"sans-serif" }}>AMBASSADOR</span>}
                      {p.hidden && <span style={{ fontSize:9, color:C.red, fontFamily:"sans-serif" }}>HIDDEN</span>}
                    </div>
                    <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif", marginBottom:6 }}>{p.email} · {p.age} · {p.city}</div>
                    <div style={{ display:"flex", gap:6 }}>
                      <button onClick={async () => {
                        setAdminViewProfile(p);
                        try {
                          const res = await fetch("/api/matrimonial?action=listConversations&email=" + encodeURIComponent(p.email));
                          const data = await res.json();
                          setAdminViewConvos(data.conversations || []);
                        } catch(e) { setAdminViewConvos([]); }
                      }} style={{ padding:"3px 10px", background:"transparent", border:"1px solid " + C.gold, color:C.gold, cursor:"pointer", fontFamily:"sans-serif", fontSize:10 }}>View</button>
                      {!p.approved && <button onClick={() => approveProfile(p.email)} style={{ padding:"3px 10px", background:C.green, color:"white", border:"none", cursor:"pointer", fontFamily:"sans-serif", fontSize:10 }}>Approve</button>}
                      <button onClick={() => rejectProfile(p.email)} style={{ padding:"3px 10px", background:C.red, color:"white", border:"none", cursor:"pointer", fontFamily:"sans-serif", fontSize:10 }}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── CONSULATE ── */}
          {adminTab === "consulate" && (
            <div>
              <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.muted, fontFamily:"sans-serif", marginBottom:16 }}>CONSULATE POSTS — {consulatePosts.length} total</div>
              {consulatePosts.length === 0 && <div style={{ color:C.muted, textAlign:"center", padding:"3rem", fontFamily:"sans-serif" }}>No posts yet.</div>}
              {consulatePosts.map(p => (
                <div key={p.id} style={{ ...cardStyle, flexDirection:"column", gap:10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", width:"100%" }}>
                    <div>
                      <div style={{ fontSize:13, color:C.goldLight, marginBottom:2 }}>{p.author || "Anonymous"}</div>
                      <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif" }}>{new Date(p.createdAt).toLocaleDateString()} · {p.channel || "general"}</div>
                    </div>
                    <div style={{ display:"flex", gap:6 }}>
                      {!p.approved && (
                        <button onClick={async () => {
                          const key = await getAdminKey(); await fetch("/api/community", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ action:"approve", adminKey: key, postId:p.id }) });
                          setConsulatePosts(prev => prev.map(x => x.id === p.id ? {...x, approved:true} : x));
                        }} style={{ padding:"4px 10px", background:C.green, color:"white", border:"none", cursor:"pointer", fontFamily:"sans-serif", fontSize:10 }}>Approve</button>
                      )}
                      <button onClick={() => deleteConsulatePost(p.id)} style={{ padding:"4px 10px", background:C.red, color:"white", border:"none", cursor:"pointer", fontFamily:"sans-serif", fontSize:10 }}>Delete</button>
                    </div>
                  </div>
                  <p style={{ fontSize:13, color:C.creamDim, fontFamily:"sans-serif", lineHeight:1.7, margin:0 }}>{p.content}</p>
                  {!p.approved && <div style={{ fontSize:9, color:C.red, fontFamily:"sans-serif" }}>⚠ Pending approval</div>}
                </div>
              ))}
            </div>
          )}

          {/* ── AMBASSADORS ── */}
          {adminTab === "ambassadors" && (
            <div>
              {/* Create new ambassador */}
              <div style={{ background:C.navyDeep, border:"1px solid " + C.gold, padding:"1.25rem", marginBottom:"1.5rem" }}>
                <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.gold, fontFamily:"sans-serif", marginBottom:14 }}>CREATE AMBASSADOR CODE</div>
                <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:10 }}>
                  <input value={newAmbForm.name} onChange={e => setNewAmbForm({...newAmbForm, name:e.target.value})} placeholder="Full name *" style={{ flex:1, minWidth:140, padding:"8px 12px", background:C.dark, border:"1px solid " + C.border, color:C.cream, fontSize:12, fontFamily:"sans-serif" }} />
                  <input value={newAmbForm.email} onChange={e => setNewAmbForm({...newAmbForm, email:e.target.value})} placeholder="Email *" style={{ flex:1, minWidth:160, padding:"8px 12px", background:C.dark, border:"1px solid " + C.border, color:C.cream, fontSize:12, fontFamily:"sans-serif" }} />
                  <input value={newAmbForm.note} onChange={e => setNewAmbForm({...newAmbForm, note:e.target.value})} placeholder="Note (optional)" style={{ flex:1, minWidth:120, padding:"8px 12px", background:C.dark, border:"1px solid " + C.border, color:C.cream, fontSize:12, fontFamily:"sans-serif" }} />
                </div>
                <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                  <button onClick={createAmbassador} style={{ padding:"8px 20px", background:C.gold, color:C.navyDeep, border:"none", cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"sans-serif" }}>Generate Code →</button>
                  {newAmbResult && <div style={{ fontSize:12, color:newAmbResult.includes("Code:")?C.green:C.red, fontFamily:"sans-serif" }}>{newAmbResult}</div>}
                </div>
              </div>
              {/* Ambassador list */}
              <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.muted, fontFamily:"sans-serif", marginBottom:12 }}>ACTIVE AMBASSADORS — {ambassadors.length}</div>
              {ambassadors.length === 0 && <div style={{ color:C.muted, textAlign:"center", padding:"3rem", fontFamily:"sans-serif" }}>No ambassadors yet.</div>}
              {ambassadors.map(a => (
                <div key={a.code} style={cardStyle}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:4, flexWrap:"wrap" }}>
                      <span style={{ fontSize:14, color:C.goldLight }}>{a.name}</span>
                      <span style={{ fontSize:11, color:C.gold, fontFamily:"monospace", background:"rgba(184,150,62,0.1)", border:"1px solid " + C.gold, padding:"1px 8px" }}>{a.code}</span>
                    </div>
                    <div style={{ fontSize:11, color:C.muted, fontFamily:"sans-serif", marginBottom:4 }}>{a.email}</div>
                    {a.note && <div style={{ fontSize:11, color:C.creamDim, fontFamily:"sans-serif", marginBottom:4, fontStyle:"italic" }}>{a.note}</div>}
                    <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif" }}>
                      Created: {new Date(a.createdAt).toLocaleDateString()}
                      {a.lastAccess ? " · Last used: " + new Date(a.lastAccess).toLocaleDateString() : " · Never used"}
                    </div>
                  </div>
                  <button onClick={() => revokeAmbassador(a.code)} style={{ padding:"6px 14px", background:"transparent", color:C.red, border:"1px solid " + C.red, cursor:"pointer", fontFamily:"sans-serif", fontSize:11, flexShrink:0 }}>Revoke</button>
                </div>
              ))}
            </div>
          )}

          {/* ── REPORTS ── */}
          {adminTab === "reports" && (
            <div>
              <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.muted, fontFamily:"sans-serif", marginBottom:16 }}>REPORTS — {reports.length} total</div>
              {reports.length === 0 && <div style={{ color:C.muted, textAlign:"center", padding:"3rem", fontFamily:"sans-serif" }}>No reports filed. This is good.</div>}
              {reports.map((r, i) => (
                <div key={i} style={{ ...cardStyle, flexDirection:"column", gap:8 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", width:"100%", flexWrap:"wrap", gap:8 }}>
                    <div>
                      <div style={{ fontSize:13, color:C.goldLight, marginBottom:2 }}>{r.target}</div>
                      <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif" }}>Reported by {r.reporter} · {r.timestamp ? new Date(r.timestamp).toLocaleString() : "Unknown date"}</div>
                    </div>
                    <button onClick={() => dismissReport(i, r.target)} style={{ padding:"4px 12px", background:"transparent", border:"1px solid " + C.border, color:C.muted, cursor:"pointer", fontFamily:"sans-serif", fontSize:10 }}>Dismiss</button>
                  </div>
                  {r.reason && <p style={{ fontSize:12, color:C.creamDim, fontFamily:"sans-serif", lineHeight:1.6, margin:0 }}>{r.reason}</p>}
                </div>
              ))}
            </div>
          )}

          {/* ── BLOCKS ── */}
          {adminTab === "blocks" && (
            <div>
              <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.muted, fontFamily:"sans-serif", marginBottom:16 }}>BLOCK RELATIONSHIPS — {blocks.length} members with active blocks</div>
              <p style={{ fontSize:11, color:C.muted, fontFamily:"sans-serif", marginBottom:16, lineHeight:1.6 }}>Members can also undo their own blocks under My Profile → Blocked Members. Use Clear here only for testing or support purposes.</p>
              {blocks.length === 0 && <div style={{ color:C.muted, textAlign:"center", padding:"3rem", fontFamily:"sans-serif" }}>No blocks on the platform.</div>}
              {blocks.map(b => (
                <div key={b.blocker} style={{ ...cardStyle, flexDirection:"column", alignItems:"flex-start", gap:8 }}>
                  <div style={{ fontSize:13, color:C.goldLight }}>{b.blocker}</div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                    {b.blocked.map(t => (
                      <div key={t} style={{ display:"flex", alignItems:"center", gap:6, background:C.dark, border:"1px solid " + C.border, padding:"3px 10px", fontSize:11, fontFamily:"sans-serif", color:C.creamDim }}>
                        {t}
                        <button onClick={() => adminClearBlock(b.blocker, t)} style={{ background:"none", border:"none", color:C.red, cursor:"pointer", fontSize:11, padding:0 }}>×</button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── PASSES ── */}
          {adminTab === "passes" && (
            <div>
              <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.muted, fontFamily:"sans-serif", marginBottom:16 }}>PASS RELATIONSHIPS — {allPasses.length} members with active passes</div>
              <p style={{ fontSize:11, color:C.muted, fontFamily:"sans-serif", marginBottom:16, lineHeight:1.6 }}>Pass is reversible — users can undo it themselves under My Profile → Passed Profiles. Use Clear here only for testing or support purposes.</p>
              {allPasses.length === 0 && <div style={{ color:C.muted, textAlign:"center", padding:"3rem", fontFamily:"sans-serif" }}>No passes on the platform.</div>}
              {allPasses.map(p => (
                <div key={p.passer} style={{ ...cardStyle, flexDirection:"column", alignItems:"flex-start", gap:8 }}>
                  <div style={{ fontSize:13, color:C.goldLight }}>{p.passer}</div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                    {p.passed.map(t => (
                      <div key={t} style={{ display:"flex", alignItems:"center", gap:6, background:C.dark, border:"1px solid " + C.border, padding:"3px 10px", fontSize:11, fontFamily:"sans-serif", color:C.creamDim }}>
                        {t}
                        <button onClick={() => adminClearPass(p.passer, t)} style={{ background:"none", border:"none", color:C.red, cursor:"pointer", fontSize:11, padding:0 }}>×</button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── ACTIVITY ── */}
          {adminTab === "activity" && (
            <div>
              <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.muted, fontFamily:"sans-serif", marginBottom:16 }}>ACTIVITY LOG — last {activityLog.length} actions</div>
              {activityLog.length === 0 && <div style={{ color:C.muted, textAlign:"center", padding:"3rem", fontFamily:"sans-serif" }}>No activity recorded yet.</div>}
              {activityLog.map((entry, i) => (
                <div key={i} style={{ padding:"0.65rem 1rem", borderBottom:"1px solid " + C.border, display:"flex", justifyContent:"space-between", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                  <div style={{ fontSize:12, color:C.creamDim, fontFamily:"sans-serif" }}>
                    <span style={{ color:C.gold, fontWeight:700 }}>{entry.action}</span> · {entry.target}{entry.detail ? " — " + entry.detail : ""}
                  </div>
                  <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif", flexShrink:0 }}>{entry.timestamp ? new Date(entry.timestamp).toLocaleString() : ""}</div>
                </div>
              ))}
            </div>
          )}

          {/* ── LEADS ── */}
          {adminTab === "leads" && (
            <div>
              {/* Manual gender fix for any email */}
              <div style={{ background:C.navyDeep, border:"1px solid " + C.border, padding:"1rem", marginBottom:16 }}>
                <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.muted, fontFamily:"sans-serif", marginBottom:10 }}>SET GENDER FOR ANY EMAIL</div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
                  <input
                    id="genderEmailInput"
                    type="email"
                    placeholder="email@address.com"
                    style={{ flex:1, minWidth:200, padding:"7px 12px", background:C.dark, border:"1px solid " + C.border, color:C.cream, fontSize:12, fontFamily:"sans-serif" }}
                  />
                  <button onClick={() => {
                    const email = document.getElementById("genderEmailInput").value.trim().toLowerCase();
                    if (!email) return;
                    setLeadGender(email, "woman");
                  }} style={{ padding:"7px 14px", background:"transparent", border:"1px solid #7aa0d0", color:"#7aa0d0", cursor:"pointer", fontFamily:"sans-serif", fontSize:11 }}>Set as Woman</button>
                  <button onClick={() => {
                    const email = document.getElementById("genderEmailInput").value.trim().toLowerCase();
                    if (!email) return;
                    setLeadGender(email, "man");
                  }} style={{ padding:"7px 14px", background:"transparent", border:"1px solid " + C.muted, color:C.muted, cursor:"pointer", fontFamily:"sans-serif", fontSize:11 }}>Set as Man</button>
                </div>
              </div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12, flexWrap:"wrap", gap:8 }}>
                <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.muted, fontFamily:"sans-serif" }}>WOMEN'S PROFILES — {leads.length} total</div>
                <button onClick={backfillWomenGender} style={{ padding:"5px 12px", background:"transparent", border:"1px solid #4a6fa5", color:"#7aa0d0", cursor:"pointer", fontSize:10, fontFamily:"sans-serif" }}>Fix Gender for All</button>
              </div>
              <input value={adminSearch} onChange={e => setAdminSearch(e.target.value)} placeholder="Search by name or email…" style={{ width:"100%", padding:"8px 12px", background:C.dark, border:"1px solid " + C.border, color:C.cream, fontSize:12, fontFamily:"sans-serif", marginBottom:14, boxSizing:"border-box" }} />
              {leads.length === 0 && <div style={{ color:C.muted, textAlign:"center", padding:"3rem", fontFamily:"sans-serif" }}>No registrations yet.</div>}
              {leads
                .filter(lead => {
                  if (!adminSearch.trim()) return true;
                  const q = adminSearch.trim().toLowerCase();
                  return (lead.name||"").toLowerCase().includes(q) || (lead.email||"").toLowerCase().includes(q);
                })
                .map(lead => (
                <div key={lead.email} style={{ background:C.navyDeep, border:"1px solid " + (lead.approved ? C.green : C.border), padding:"1rem 1.25rem", marginBottom:10, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
                  <div>
                    <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:4 }}>
                      <span style={{ fontSize:14, color:C.goldLight }}>{lead.name || lead.email}</span>
                      <span style={{ fontSize:9, color:lead.approved?C.green:C.red, border:"1px solid "+(lead.approved?C.green:C.red), padding:"1px 6px", fontFamily:"sans-serif" }}>{lead.approved?"APPROVED":"PENDING"}</span>
                      {lead.gender && <span style={{ fontSize:9, color:"#7aa0d0", border:"1px solid #7aa0d0", padding:"1px 6px", fontFamily:"sans-serif" }}>{lead.gender.toUpperCase()}</span>}
                    </div>
                    <div style={{ fontSize:12, color:C.muted, fontFamily:"sans-serif", marginBottom:2 }}>{lead.email}</div>
                    <div style={{ fontSize:10, color:C.muted, fontFamily:"sans-serif" }}>
                      {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : "Unknown date"} · {lead.source || "for-women"}
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                    {!lead.approved && (
                      <button onClick={() => approveLead(lead.email)} style={{ padding:"8px 18px", background:C.green, color:"white", border:"none", cursor:"pointer", fontFamily:"sans-serif", fontSize:12, fontWeight:700 }}>
                        Approve + Send Link
                      </button>
                    )}
                    <button onClick={() => setLeadGender(lead.email, "woman")} style={{ padding:"8px 14px", background:"transparent", border:"1px solid #7aa0d0", color:"#7aa0d0", cursor:"pointer", fontFamily:"sans-serif", fontSize:11 }}>
                      Set as Woman
                    </button>
                    <button onClick={() => setLeadGender(lead.email, "man")} style={{ padding:"8px 14px", background:"transparent", border:"1px solid " + C.muted, color:C.muted, cursor:"pointer", fontFamily:"sans-serif", fontSize:11 }}>
                      Set as Man
                    </button>
                    <button onClick={() => {
                      askConfirm("Delete profile for " + lead.email + "? This removes all their access.", async () => {
                      const res = await fetch("/api/approve-lead", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ adminCode:"ADMINTEST", email:lead.email, deleteProfile:true }) });
                      const data = await res.json();
                      if (data.ok) { setLeads(prev => prev.filter(l => l.email !== lead.email)); showToast("Profile deleted.", "success"); }
                      else showToast(data.error || "Delete failed.", "error");
                      });
                    }} style={{ padding:"8px 14px", background:"transparent", border:"1px solid " + C.red, color:C.red, cursor:"pointer", fontFamily:"sans-serif", fontSize:11 }}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── MY PROFILE ── */}
          {adminTab === "myprofile" && (
            <div>
              {!myProfile ? (
                <div style={{ color:C.muted, textAlign:"center", padding:"3rem", fontFamily:"sans-serif" }}>
                  No profile found for {userEmail || "this session"}.
                  <div style={{ marginTop:16 }}>
                    <button onClick={() => { setIsEditing(false); setProfileEmail(userEmail); setMsg(""); setView("create"); }} style={{ background:C.gold, color:C.navyDeep, border:"none", padding:"8px 18px", cursor:"pointer", fontFamily:"sans-serif", fontSize:12, fontWeight:700 }}>Create Profile</button>
                  </div>
                </div>
              ) : (
                <div style={{ background:C.navyDeep, border:"1px solid " + C.gold, padding:"1.5rem" }}>
                  <div style={{ display:"flex", gap:16, alignItems:"flex-start", marginBottom:"1rem", flexWrap:"wrap" }}>
                    {myProfile.photoUrl && <img src={myProfile.photoUrl} alt={myProfile.displayName} style={{ width:100, height:130, objectFit:"cover", objectPosition:"center top", flexShrink:0, border:"2px solid " + C.gold }} />}
                    <div>
                      <div style={{ fontSize:20, color:C.goldLight, marginBottom:4 }}>{myProfile.displayName}</div>
                      <div style={{ fontSize:12, color:C.muted, fontFamily:"sans-serif", marginBottom:3 }}>{myProfile.email}</div>
                      <div style={{ fontSize:12, color:C.muted, fontFamily:"sans-serif", marginBottom:3 }}>{myProfile.age} · {myProfile.city}, {myProfile.country}</div>
                      <div style={{ fontSize:12, color:C.muted, fontFamily:"sans-serif", marginBottom:10 }}>{myProfile.religion} · {myProfile.gender}</div>
                      <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                        <span style={{ fontSize:10, color:myProfile.approved?C.green:C.red, border:"1px solid "+(myProfile.approved?C.green:C.red), padding:"2px 8px", fontFamily:"sans-serif" }}>{myProfile.approved?"APPROVED":"PENDING"}</span>
                        {myProfile.isFounder && <span style={{ fontSize:10, color:C.gold, border:"1px solid "+C.gold, padding:"2px 8px", fontFamily:"sans-serif" }}>FOUNDER</span>}
                        {myProfile.isAmbassador && <span style={{ fontSize:10, color:C.gold, border:"1px solid "+C.gold, padding:"2px 8px", fontFamily:"sans-serif" }}>AMBASSADOR</span>}
                        {myProfile.hidden && <span style={{ fontSize:10, color:C.red, border:"1px solid "+C.red, padding:"2px 8px", fontFamily:"sans-serif" }}>HIDDEN</span>}
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize:13, color:C.creamDim, fontFamily:"sans-serif", lineHeight:1.85, margin:0 }}>{myProfile.bio}</p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* ADMIN PROFILE DETAIL MODAL */}
        {adminViewProfile && (
          <div style={{ position:"fixed", inset:0, background:"rgba(5,13,26,0.92)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:999, padding:"1.5rem" }} onClick={() => setAdminViewProfile(null)}>
            <div onClick={e => e.stopPropagation()} style={{ background:C.navyDeep, border:"1px solid " + C.gold, maxWidth:560, width:"100%", maxHeight:"85vh", overflowY:"auto", padding:"1.75rem" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1.25rem" }}>
                <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.muted, fontFamily:"sans-serif" }}>PROFILE DETAIL — ADMIN VIEW</div>
                <button onClick={() => setAdminViewProfile(null)} style={{ background:"none", border:"none", color:C.muted, fontSize:20, cursor:"pointer" }}>×</button>
              </div>
              <div style={{ display:"flex", gap:16, alignItems:"flex-start", marginBottom:"1.25rem", flexWrap:"wrap" }}>
                {adminViewProfile.photoUrl && <img src={adminViewProfile.photoUrl} alt={adminViewProfile.displayName} style={{ width:90, height:115, objectFit:"cover", objectPosition:"center top", border:"1px solid "+C.border }} />}
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:18, color:C.goldLight, marginBottom:4 }}>{adminViewProfile.displayName}</div>
                  <div style={{ fontSize:12, color:C.muted, fontFamily:"sans-serif", marginBottom:2 }}>{adminViewProfile.email}</div>
                  <div style={{ fontSize:12, color:C.muted, fontFamily:"sans-serif", marginBottom:2 }}>{adminViewProfile.age} · {adminViewProfile.city}{adminViewProfile.country?", "+adminViewProfile.country:""}</div>
                  <div style={{ fontSize:12, color:C.muted, fontFamily:"sans-serif", marginBottom:8 }}>{adminViewProfile.religion} · {adminViewProfile.gender}</div>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    <span style={{ fontSize:9, color:adminViewProfile.approved?C.green:C.red, border:"1px solid "+(adminViewProfile.approved?C.green:C.red), padding:"1px 6px", fontFamily:"sans-serif" }}>{adminViewProfile.approved?"APPROVED":"PENDING"}</span>
                    {adminViewProfile.isVirtual && <span style={{ fontSize:9, color:"#7aa0d0", border:"1px solid #7aa0d0", padding:"1px 6px", fontFamily:"sans-serif" }}>VIRTUAL</span>}
                    {adminViewProfile.hidden && <span style={{ fontSize:9, color:C.red, border:"1px solid "+C.red, padding:"1px 6px", fontFamily:"sans-serif" }}>HIDDEN</span>}
                  </div>
                </div>
              </div>
              <p style={{ fontSize:13, color:C.creamDim, fontFamily:"sans-serif", lineHeight:1.75, marginBottom:"1.5rem" }}>{adminViewProfile.bio}</p>

              {!adminViewProfile.isVirtual && (
                <button onClick={() => {
                  setCreateForm({ displayName:adminViewProfile.displayName||"", age:adminViewProfile.age||"", city:adminViewProfile.city||"", country:adminViewProfile.country||"", region:adminViewProfile.region||"all", religion:adminViewProfile.religion||"Muslim", bio:adminViewProfile.bio||"", familyInvolvement:adminViewProfile.familyInvolvement||"", virtueStatus:adminViewProfile.virtueStatus||"", maritalStatus:adminViewProfile.maritalStatus||"", hasChildren:adminViewProfile.hasChildren||"No", seeking:adminViewProfile.seeking||"Marriage", photos: adminViewProfile.photos || (adminViewProfile.photoUrl ? [adminViewProfile.photoUrl] : []), photoBase64:null });
                  setIsEditing(true);
                  setProfileEmail(adminViewProfile.email);
                  setMsg("");
                  setAdminViewProfile(null);
                  setView("create");
                }} style={{ padding:"8px 18px", background:C.gold, color:C.navyDeep, border:"none", cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"sans-serif", marginBottom:"1.5rem" }}>Edit This Profile</button>
              )}

              <div style={{ fontSize:9, letterSpacing:"0.2em", color:C.muted, fontFamily:"sans-serif", marginBottom:10, borderTop:"1px solid "+C.border, paddingTop:"1.25rem" }}>CONVERSATIONS — {adminViewConvos.length}</div>
              {adminViewConvos.length === 0 && <div style={{ color:C.muted, fontFamily:"sans-serif", fontSize:12 }}>No conversations.</div>}
              {adminViewConvos.map(c => (
                <div key={c.email} style={{ padding:"0.75rem", background:C.dark, border:"1px solid "+C.border, marginBottom:8 }}>
                  <div style={{ fontSize:12, color:C.goldLight, marginBottom:3 }}>{c.displayName} <span style={{ color:C.muted, fontSize:10 }}>({c.email})</span></div>
                  <div style={{ fontSize:11, color:C.creamDim, fontFamily:"sans-serif" }}>{c.lastMessage}</div>
                  {c.lastTimestamp > 0 && <div style={{ fontSize:9, color:C.muted, fontFamily:"sans-serif", marginTop:4 }}>{new Date(c.lastTimestamp).toLocaleString()}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
        {toast && (
          <div style={{ position:"fixed", bottom:20, left:"50%", transform:"translateX(-50%)", background: toast.type==="error"?"#3a1414":toast.type==="success"?"#14301c":"#16243f", border:"1px solid "+(toast.type==="error"?C.red:toast.type==="success"?C.green:C.gold), color:C.cream, padding:"12px 24px", fontSize:13, fontFamily:"sans-serif", zIndex:9999, boxShadow:"0 4px 20px rgba(0,0,0,0.5)" }}>
            {toast.message}
          </div>
        )}
        {confirmModal && (
          <div style={{ position:"fixed", inset:0, background:"rgba(5,13,26,0.85)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:9998, padding:"1.5rem" }}>
            <div style={{ background:C.navyDeep, border:"1px solid "+C.gold, padding:"1.75rem", maxWidth:420, width:"100%" }}>
              <div style={{ fontSize:14, color:C.cream, fontFamily:"sans-serif", lineHeight:1.6, marginBottom:20 }}>{confirmModal.message}</div>
              <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
                <button onClick={() => setConfirmModal(null)} style={{ padding:"8px 18px", background:"transparent", border:"1px solid "+C.border, color:C.muted, cursor:"pointer", fontFamily:"sans-serif", fontSize:12 }}>Cancel</button>
                <button onClick={() => { const fn = confirmModal.onConfirm; setConfirmModal(null); fn(); }} style={{ padding:"8px 18px", background:C.red, color:"white", border:"none", cursor:"pointer", fontFamily:"sans-serif", fontSize:12, fontWeight:700 }}>Confirm</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  // MY PROFILE VIEW
  if (view === "passed") {
    return (
      <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
        <div style={{ background:C.navyDeep, borderBottom:"1px solid " + C.border, padding:"1rem 1.5rem", display:"flex", alignItems:"center", gap:12 }}>
          <button onClick={() => setView("myprofile")} style={{ background:"none", border:"1px solid " + C.gold, color:C.gold, padding:"6px 14px", cursor:"pointer", fontSize:12, fontFamily:"sans-serif" }}>← Back</button>
          <div style={{ fontSize:14, color:C.goldLight }}>Passed Profiles</div>
        </div>
        <div style={{ maxWidth:620, margin:"0 auto", padding:"2rem 1.5rem" }}>
          <p style={{ fontSize:12, color:C.muted, fontFamily:"sans-serif", lineHeight:1.6, marginBottom:"1.5rem" }}>Profiles you've passed on are hidden from your browse list. Undo any of them below to bring them back.</p>
          {passedProfiles.length === 0 && <div style={{ color:C.muted, textAlign:"center", padding:"3rem", fontFamily:"sans-serif" }}>You haven't passed on anyone.</div>}
          {passedProfiles.map(p => (
            <div key={p.email} style={{ display:"flex", gap:14, alignItems:"center", padding:"1rem", background:C.navyDeep, border:"1px solid " + C.border, marginBottom:8 }}>
              {p.photoUrl ? (
                <img src={p.photoUrl} alt={p.displayName} style={{ width:48, height:60, objectFit:"cover", objectPosition:"center top", flexShrink:0 }} />
              ) : (
                <div style={{ width:48, height:60, background:"rgba(184,150,62,0.15)", border:"1px solid " + C.gold, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, color:C.gold, flexShrink:0 }}>{(p.displayName||"?")[0].toUpperCase()}</div>
              )}
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:14, color:C.goldLight }}>{p.displayName}</div>
                <div style={{ fontSize:11, color:C.muted, fontFamily:"sans-serif" }}>{p.age} · {p.city}</div>
              </div>
              <button onClick={() => unpassUser(p.email)} style={{ padding:"6px 14px", background:"transparent", border:"1px solid " + C.gold, color:C.gold, cursor:"pointer", fontFamily:"sans-serif", fontSize:11, flexShrink:0 }}>Undo</button>
            </div>
          ))}
        </div>
        {toast && (
          <div style={{ position:"fixed", bottom:20, left:"50%", transform:"translateX(-50%)", background: toast.type==="error"?"#3a1414":toast.type==="success"?"#14301c":"#16243f", border:"1px solid "+(toast.type==="error"?C.red:toast.type==="success"?C.green:C.gold), color:C.cream, padding:"12px 24px", fontSize:13, fontFamily:"sans-serif", zIndex:9999, boxShadow:"0 4px 20px rgba(0,0,0,0.5)" }}>
            {toast.message}
          </div>
        )}
        {confirmModal && (
          <div style={{ position:"fixed", inset:0, background:"rgba(5,13,26,0.85)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:9998, padding:"1.5rem" }}>
            <div style={{ background:C.navyDeep, border:"1px solid "+C.gold, padding:"1.75rem", maxWidth:420, width:"100%" }}>
              <div style={{ fontSize:14, color:C.cream, fontFamily:"sans-serif", lineHeight:1.6, marginBottom:20 }}>{confirmModal.message}</div>
              <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
                <button onClick={() => setConfirmModal(null)} style={{ padding:"8px 18px", background:"transparent", border:"1px solid "+C.border, color:C.muted, cursor:"pointer", fontFamily:"sans-serif", fontSize:12 }}>Cancel</button>
                <button onClick={() => { const fn = confirmModal.onConfirm; setConfirmModal(null); fn(); }} style={{ padding:"8px 18px", background:C.red, color:"white", border:"none", cursor:"pointer", fontFamily:"sans-serif", fontSize:12, fontWeight:700 }}>Confirm</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (view === "blocked") {
    return (
      <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
        <div style={{ background:C.navyDeep, borderBottom:"1px solid " + C.border, padding:"1rem 1.5rem", display:"flex", alignItems:"center", gap:12 }}>
          <button onClick={() => setView("myprofile")} style={{ background:"none", border:"1px solid " + C.gold, color:C.gold, padding:"6px 14px", cursor:"pointer", fontSize:12, fontFamily:"sans-serif" }}>← Back</button>
          <div style={{ fontSize:14, color:C.goldLight }}>Blocked Members</div>
        </div>
        <div style={{ maxWidth:620, margin:"0 auto", padding:"2rem 1.5rem" }}>
          <p style={{ fontSize:12, color:C.muted, fontFamily:"sans-serif", lineHeight:1.6, marginBottom:"1.5rem" }}>Members you've blocked cannot contact you or see your profile. Unblock any of them below to restore normal access.</p>
          {blockedProfiles.length === 0 && <div style={{ color:C.muted, textAlign:"center", padding:"3rem", fontFamily:"sans-serif" }}>You haven't blocked anyone.</div>}
          {blockedProfiles.map(p => (
            <div key={p.email} style={{ display:"flex", gap:14, alignItems:"center", padding:"1rem", background:C.navyDeep, border:"1px solid " + C.border, marginBottom:8 }}>
              {p.photoUrl ? (
                <img src={p.photoUrl} alt={p.displayName} style={{ width:48, height:60, objectFit:"cover", objectPosition:"center top", flexShrink:0 }} />
              ) : (
                <div style={{ width:48, height:60, background:"rgba(184,150,62,0.15)", border:"1px solid " + C.gold, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, color:C.gold, flexShrink:0 }}>{(p.displayName||"?")[0].toUpperCase()}</div>
              )}
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:14, color:C.goldLight }}>{p.displayName}</div>
                <div style={{ fontSize:11, color:C.muted, fontFamily:"sans-serif" }}>{p.age} · {p.city}</div>
              </div>
              <button onClick={() => unblockUser(p.email)} style={{ padding:"6px 14px", background:"transparent", border:"1px solid " + C.red, color:C.red, cursor:"pointer", fontFamily:"sans-serif", fontSize:11, flexShrink:0 }}>Unblock</button>
            </div>
          ))}
        </div>
        {toast && (
          <div style={{ position:"fixed", bottom:20, left:"50%", transform:"translateX(-50%)", background: toast.type==="error"?"#3a1414":toast.type==="success"?"#14301c":"#16243f", border:"1px solid "+(toast.type==="error"?C.red:toast.type==="success"?C.green:C.gold), color:C.cream, padding:"12px 24px", fontSize:13, fontFamily:"sans-serif", zIndex:9999, boxShadow:"0 4px 20px rgba(0,0,0,0.5)" }}>
            {toast.message}
          </div>
        )}
        {confirmModal && (
          <div style={{ position:"fixed", inset:0, background:"rgba(5,13,26,0.85)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:9998, padding:"1.5rem" }}>
            <div style={{ background:C.navyDeep, border:"1px solid "+C.gold, padding:"1.75rem", maxWidth:420, width:"100%" }}>
              <div style={{ fontSize:14, color:C.cream, fontFamily:"sans-serif", lineHeight:1.6, marginBottom:20 }}>{confirmModal.message}</div>
              <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
                <button onClick={() => setConfirmModal(null)} style={{ padding:"8px 18px", background:"transparent", border:"1px solid "+C.border, color:C.muted, cursor:"pointer", fontFamily:"sans-serif", fontSize:12 }}>Cancel</button>
                <button onClick={() => { const fn = confirmModal.onConfirm; setConfirmModal(null); fn(); }} style={{ padding:"8px 18px", background:C.red, color:"white", border:"none", cursor:"pointer", fontFamily:"sans-serif", fontSize:12, fontWeight:700 }}>Confirm</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (view === "myprofile") {
    return (
      <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
        <div style={{ background:C.navyDeep, borderBottom:"1px solid " + C.border, padding:"1rem 1.5rem", display:"flex", alignItems:"center", gap:12 }}>
          <button onClick={() => setView("browse")} style={{ background:"none", border:"1px solid " + C.gold, color:C.gold, padding:"6px 14px", cursor:"pointer", fontSize:12, fontFamily:"sans-serif" }}>← Back</button>
          <div style={{ fontSize:14, color:C.goldLight }}>My Profile</div>
        </div>
        <div style={{ maxWidth:620, margin:"0 auto", padding:"2rem 1.5rem" }}>
          {!myProfile ? (
            <div style={{ textAlign:"center", padding:"3rem" }}>
              <div style={{ color:C.muted, fontFamily:"sans-serif", fontSize:13, marginBottom:24 }}>You don't have a profile yet.</div>
              <button onClick={() => { setIsEditing(false); setProfileEmail(userEmail); setMsg(""); setView("create"); }} style={{ background:C.gold, color:C.navyDeep, border:"none", padding:"12px 28px", cursor:"pointer", fontSize:13, fontWeight:700, fontFamily:"sans-serif" }}>Create Profile →</button>
            </div>
          ) : (
            <div>
              <div style={{ background:C.navyDeep, border:"1px solid " + C.gold, padding:"1.5rem", marginBottom:"1.5rem" }}>
                <div style={{ display:"flex", gap:16, alignItems:"flex-start", flexWrap:"wrap", marginBottom:"1rem" }}>
                  {myProfile.photoUrl && <img src={myProfile.photoUrl} alt={myProfile.displayName} style={{ width:90, height:115, objectFit:"cover", objectPosition:"center top", flexShrink:0, border:"2px solid " + C.gold }} />}
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:20, color:C.goldLight, marginBottom:4 }}>{myProfile.displayName}</div>
                    <div style={{ fontSize:12, color:C.muted, fontFamily:"sans-serif", marginBottom:2 }}>{myProfile.age} · {myProfile.city}{myProfile.country ? ", " + myProfile.country : ""}</div>
                    <div style={{ fontSize:12, color:C.muted, fontFamily:"sans-serif", marginBottom:8 }}>{myProfile.religion}</div>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                      <span style={{ fontSize:10, color:myProfile.approved?C.green:C.red, border:"1px solid "+(myProfile.approved?C.green:C.red), padding:"2px 8px", fontFamily:"sans-serif" }}>{myProfile.approved ? "ACTIVE" : "PENDING REVIEW"}</span>
                      {myProfile.hidden && <span style={{ fontSize:10, color:C.red, border:"1px solid "+C.red, padding:"2px 8px", fontFamily:"sans-serif" }}>HIDDEN</span>}
                    </div>
                  </div>
                </div>
                <p style={{ fontSize:13, color:C.creamDim, fontFamily:"sans-serif", lineHeight:1.85, margin:0 }}>{myProfile.bio}</p>
              </div>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                <button onClick={() => { setIsEditing(true); setCreateForm({ displayName:myProfile.displayName||"", age:myProfile.age||"", city:myProfile.city||"", country:myProfile.country||"", region:myProfile.region||"all", religion:myProfile.religion||"Muslim", bio:myProfile.bio||"", familyInvolvement:myProfile.familyInvolvement||"", virtueStatus:myProfile.virtueStatus||"", maritalStatus:myProfile.maritalStatus||"", hasChildren:myProfile.hasChildren||"No", seeking:myProfile.seeking||"Marriage", photos: myProfile.photos || (myProfile.photoUrl ? [myProfile.photoUrl] : []), photoBase64:null }); setIsEditing(true); setProfileEmail(userEmail); setMsg(""); setView("create"); }} style={{ padding:"10px 22px", background:C.gold, color:C.navyDeep, border:"none", cursor:"pointer", fontSize:13, fontWeight:700, fontFamily:"sans-serif" }}>Edit Profile</button>
                <button onClick={toggleHideProfile} style={{ padding:"10px 22px", background:"transparent", border:"1px solid " + C.border, color:C.muted, cursor:"pointer", fontSize:13, fontFamily:"sans-serif" }}>{myProfile.hidden ? "Show Profile" : "Hide Profile"}</button>
                <button onClick={() => { loadPassedProfiles(); setView("passed"); }} style={{ padding:"10px 22px", background:"transparent", border:"1px solid " + C.border, color:C.muted, cursor:"pointer", fontSize:13, fontFamily:"sans-serif" }}>Passed Profiles</button>
                <button onClick={() => { loadBlockedProfiles(); setView("blocked"); }} style={{ padding:"10px 22px", background:"transparent", border:"1px solid " + C.border, color:C.muted, cursor:"pointer", fontSize:13, fontFamily:"sans-serif" }}>Blocked Members</button>
              </div>
            </div>
          )}
        </div>
        {toast && (
          <div style={{ position:"fixed", bottom:20, left:"50%", transform:"translateX(-50%)", background: toast.type==="error"?"#3a1414":toast.type==="success"?"#14301c":"#16243f", border:"1px solid "+(toast.type==="error"?C.red:toast.type==="success"?C.green:C.gold), color:C.cream, padding:"12px 24px", fontSize:13, fontFamily:"sans-serif", zIndex:9999, boxShadow:"0 4px 20px rgba(0,0,0,0.5)" }}>
            {toast.message}
          </div>
        )}
        {confirmModal && (
          <div style={{ position:"fixed", inset:0, background:"rgba(5,13,26,0.85)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:9998, padding:"1.5rem" }}>
            <div style={{ background:C.navyDeep, border:"1px solid "+C.gold, padding:"1.75rem", maxWidth:420, width:"100%" }}>
              <div style={{ fontSize:14, color:C.cream, fontFamily:"sans-serif", lineHeight:1.6, marginBottom:20 }}>{confirmModal.message}</div>
              <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
                <button onClick={() => setConfirmModal(null)} style={{ padding:"8px 18px", background:"transparent", border:"1px solid "+C.border, color:C.muted, cursor:"pointer", fontFamily:"sans-serif", fontSize:12 }}>Cancel</button>
                <button onClick={() => { const fn = confirmModal.onConfirm; setConfirmModal(null); fn(); }} style={{ padding:"8px 18px", background:C.red, color:"white", border:"none", cursor:"pointer", fontFamily:"sans-serif", fontSize:12, fontWeight:700 }}>Confirm</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // BROWSE VIEW
  return (
    <div style={{ minHeight:"100vh", background:C.dark, color:C.cream, fontFamily:"Georgia,serif" }}>
      <div style={{ background:C.navyDeep, borderBottom:"1px solid " + C.border, padding:"1rem 1.5rem", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
        <div style={{ fontSize:15, color:C.goldLight }}>The International Lover™ — Matrimonial</div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          {isAdmin && <button onClick={() => { setAdminTab("profiles"); loadAllProfiles(); loadPendingApprovals(); setView("admin"); }} style={{ background:"none", border:"1px solid " + C.gold, color:C.gold, padding:"6px 12px", cursor:"pointer", fontSize:11, fontFamily:"sans-serif" }}>Admin</button>}
          <button onClick={() => { setActiveConvo(null); loadConversations(); setView("messages"); }} style={{ background:"none", border:"1px solid " + C.border, color:C.muted, padding:"6px 12px", cursor:"pointer", fontSize:11, fontFamily:"sans-serif" }}>Messages</button>
          <button onClick={() => setView("myprofile")} style={{ background:C.gold, color:C.navyDeep, border:"none", padding:"8px 18px", cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"sans-serif" }}>My Profile</button>
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
              <div style={{ height:260, background:C.dark, position:"relative" }}>
                {p.photoUrl ? (
                  <img src={p.photoUrl} alt={p.displayName} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }} />
                ) : (
                  <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg, #0a1628, #1a2a4a)", gap:8 }}>
                    <div style={{ width:64, height:64, borderRadius:"50%", background:"rgba(184,150,62,0.15)", border:"1px solid " + C.gold, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, color:C.gold, fontFamily:"Georgia,serif" }}>
                      {(p.displayName||"?")[0].toUpperCase()}
                    </div>
                    <div style={{ fontSize:9, color:C.muted, fontFamily:"sans-serif", letterSpacing:"0.1em" }}>NO PHOTO</div>
                  </div>
                )}
                {p.isVirtual && (
                  <div style={{ position:"absolute", top:8, left:8, background:"rgba(10,20,50,0.85)", border:"1px solid #4a6fa5", color:"#7aa0d0", fontSize:7, fontWeight:700, padding:"2px 6px", fontFamily:"sans-serif", letterSpacing:"0.08em" }}>VIRTUAL PROFILE</div>
                )}
                {p.isFounder && (
                  <div style={{ position:"absolute", top:8, right:8, background:C.navyDeep, border:"1px solid " + C.gold, color:C.gold, fontSize:7, fontWeight:700, padding:"2px 6px", fontFamily:"sans-serif" }}>FOUNDER</div>
                )}
                {p.isAmbassador && !p.isFounder && (
                  <div style={{ position:"absolute", top:8, right:8, background:C.gold, color:C.navyDeep, fontSize:7, fontWeight:700, padding:"2px 6px", fontFamily:"sans-serif" }}>AMBASSADOR</div>
                )}
                {p.isCertified && !p.isAmbassador && (
                  <div style={{ position:"absolute", top:8, right:8, background:C.green, color:"white", fontSize:7, fontWeight:700, padding:"2px 6px", fontFamily:"sans-serif" }}>CERTIFIED</div>
                )}
              </div>
              <div style={{ padding:"1rem" }}>
                <div style={{ fontSize:15, color:C.goldLight, marginBottom:4, fontFamily:"Georgia,serif" }}>{p.displayName}</div>
                <div style={{ fontSize:11, color:C.muted, fontFamily:"sans-serif", marginBottom:4 }}>{p.age} · {p.city}{p.country ? ", " + p.country : ""}</div>
                <div style={{ fontSize:10, color:C.creamDim, fontFamily:"sans-serif", marginBottom:8, textTransform:"uppercase", letterSpacing:"0.06em" }}>{p.religion}</div>
                <p style={{ fontSize:12, color:C.creamDim, fontFamily:"sans-serif", lineHeight:1.65, margin:0, display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{p.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {toast && (
        <div style={{ position:"fixed", bottom:20, left:"50%", transform:"translateX(-50%)", background: toast.type==="error"?"#3a1414":toast.type==="success"?"#14301c":"#16243f", border:"1px solid "+(toast.type==="error"?C.red:toast.type==="success"?C.green:C.gold), color:C.cream, padding:"12px 24px", fontSize:13, fontFamily:"sans-serif", zIndex:9999, boxShadow:"0 4px 20px rgba(0,0,0,0.5)" }}>
          {toast.message}
        </div>
      )}
      {confirmModal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(5,13,26,0.85)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:9998, padding:"1.5rem" }}>
          <div style={{ background:C.navyDeep, border:"1px solid "+C.gold, padding:"1.75rem", maxWidth:420, width:"100%" }}>
            <div style={{ fontSize:14, color:C.cream, fontFamily:"sans-serif", lineHeight:1.6, marginBottom:20 }}>{confirmModal.message}</div>
            <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
              <button onClick={() => setConfirmModal(null)} style={{ padding:"8px 18px", background:"transparent", border:"1px solid "+C.border, color:C.muted, cursor:"pointer", fontFamily:"sans-serif", fontSize:12 }}>Cancel</button>
              <button onClick={() => { const fn = confirmModal.onConfirm; setConfirmModal(null); fn(); }} style={{ padding:"8px 18px", background:C.red, color:"white", border:"none", cursor:"pointer", fontFamily:"sans-serif", fontSize:12, fontWeight:700 }}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MatrimonialPage() {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState({
    userEmail: "",
    gender: "man",
    isAdmin: false,
    isAmbassador: false,
    isCertified: false,
    autoAdmin: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const email = sessionStorage.getItem("il_email") || "";
    const adminSession = sessionStorage.getItem("il_admin_session") === "true";
    const gender = sessionStorage.getItem("il_gender") || "man";
    const isAmbassador = sessionStorage.getItem("il_ambassador") === "true";
    const isCertified = sessionStorage.getItem("il_certified") === "true";
    const isAdmin = adminSession || email === "amin@theinternationallover.com";
    const autoAdmin = new URLSearchParams(window.location.search).get("admin") === "1";

    // Auth gate: must have platform access
    const hasAccess = sessionStorage.getItem("il_access") === "true" || isAdmin;
    const hasWomenAccess = sessionStorage.getItem("il_women_access") === "true";
    if (!hasAccess && !hasWomenAccess) {
      window.location.replace("/");
      return;
    }

    setSession({ userEmail: email, gender, isAdmin, isAmbassador, isCertified, autoAdmin });
    setReady(true);
  }, []);

  if (!ready) return (
    <div style={{ minHeight:"100vh", background:"#091a35", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ color:"#b8963e", fontFamily:"Georgia,serif", fontSize:14 }}>Loading...</div>
    </div>
  );

  return <MatrimonialPlatform {...session} />;
}
