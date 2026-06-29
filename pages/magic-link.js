// pages/magic-link.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function MagicLinkPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Verifying your access…");

  useEffect(() => {
    const { token, type } = router.query;
    if (!token) return;

    async function verify() {
      try {
        const res = await fetch("/api/verify-magic-link", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = await res.json();
        if (data.valid) {
          try {
            sessionStorage.setItem("il_email", data.email);
            if (type === "women") {
              sessionStorage.setItem("il_women_access", "true");
              sessionStorage.setItem("il_gender", "woman");
            } else {
              sessionStorage.setItem("il_access", "true");
            }
          } catch(e) {}
          setStatus("Access confirmed. Entering the platform…");
          setTimeout(() => {
            if (type === "women") {
              router.replace("/matrimonial");
            } else {
              router.replace("/");
            }
          }, 1500);
        } else {
          setStatus(data.error || "Link invalid. Please request a new one.");
        }
      } catch {
        setStatus("Connection error. Please try again.");
      }
    }
    verify();
  }, [router.query]);

  const C = { dark:"#050d1a", gold:"#b8963e", cream:"#f0e6cc", muted:"#8a7a5a" };

  return (
    <div style={{
      minHeight: "100vh",
      background: C.dark,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Georgia, serif",
      color: C.gold,
      fontSize: "18px",
      textAlign: "center",
      padding: "20px",
    }}>
      <div>
        <div style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: C.gold, marginBottom: 16, fontFamily: "sans-serif" }}>
          The International Lover™
        </div>
        <div style={{ color: C.cream, fontSize: 16, fontFamily: "sans-serif" }}>{status}</div>
      </div>
    </div>
  );
}
