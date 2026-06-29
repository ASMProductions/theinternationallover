import { useEffect, useState } from "react";

export default function MagicLink() {
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const type = params.get("type") || "member";

    if (!token) { setStatus("invalid"); return; }

    // Call our verify API which handles Redis and returns email
    fetch(`/api/verify-magic-link?token=${token}&type=${type}`)
      .then(r => r.json())
      .then(data => {
        if (!data.email) { setStatus(data.error === "expired" ? "expired" : "invalid"); return; }

        // Set session client-side
        sessionStorage.setItem("il_email", data.email);
        if (data.type === "women") {
          sessionStorage.setItem("il_women_access", "true");
          sessionStorage.setItem("il_gender", "woman");
          window.location.replace("/matrimonial");
        } else {
          sessionStorage.setItem("il_access", "true");
          window.location.replace("/");
        }
      })
      .catch(() => setStatus("error"));
  }, []);

  const C = { dark:"#050d1a", gold:"#b8963e", cream:"#f0e6cc", muted:"#8a7a5a" };

  return (
    <div style={{ minHeight:"100vh", background:C.dark, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:16, padding:"2rem", fontFamily:"Georgia,serif" }}>
      <div style={{ fontSize:11, letterSpacing:"0.35em", color:C.gold, fontFamily:"sans-serif" }}>THE INTERNATIONAL LOVER™</div>
      {status === "verifying" && (
        <>
          <div style={{ fontSize:18, color:C.cream }}>Verifying your access…</div>
          <div style={{ fontSize:12, color:C.muted, fontFamily:"sans-serif" }}>Please wait</div>
        </>
      )}
      {status === "expired" && (
        <>
          <div style={{ fontSize:18, color:C.cream }}>This link has expired.</div>
          <div style={{ fontSize:13, color:C.muted, fontFamily:"sans-serif", textAlign:"center", maxWidth:360 }}>Magic links expire after 15 minutes. Return to the platform to request a new one.</div>
          <a href="/" style={{ marginTop:8, padding:"10px 24px", background:C.gold, color:C.dark, fontFamily:"sans-serif", fontSize:12, fontWeight:700, textDecoration:"none" }}>Return to Platform →</a>
        </>
      )}
      {(status === "invalid" || status === "error") && (
        <>
          <div style={{ fontSize:18, color:C.cream }}>{status === "error" ? "Something went wrong." : "Invalid link."}</div>
          <a href="/" style={{ marginTop:8, padding:"10px 24px", background:C.gold, color:C.dark, fontFamily:"sans-serif", fontSize:12, fontWeight:700, textDecoration:"none" }}>Return to Platform →</a>
        </>
      )}
    </div>
  );
}
