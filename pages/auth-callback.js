import { useEffect } from "react";

export default function AuthCallback() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email") || "";
    const type = params.get("type") || "member";
    const dest = params.get("dest") || "/";

    if (email) {
      sessionStorage.setItem("il_email", email);
      if (type === "women") {
        sessionStorage.setItem("il_women_access", "true");
        sessionStorage.setItem("il_gender", "woman");
      } else {
        sessionStorage.setItem("il_access", "true");
      }
    }

    window.location.replace(dest);
  }, []);

  return (
    <div style={{ minHeight:"100vh", background:"#050d1a", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ color:"#b8963e", fontFamily:"Georgia,serif", fontSize:14 }}>Signing you in...</div>
    </div>
  );
}
