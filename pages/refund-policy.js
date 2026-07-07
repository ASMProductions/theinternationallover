// pages/refund-policy.js — The International Lover™
// Cancellation & Refund Policy. Linked from footer and near checkout buttons.
// REPLACE STRIPE_PORTAL_LINK below with your Customer Portal login link
// (Stripe Dashboard → Settings → Billing → Customer Portal → copy login link)

const STRIPE_PORTAL_LINK = "https://billing.stripe.com/p/login/REPLACE_ME";

const C = {
  dark: "#091a35", navyDeep: "#0f2347", gold: "#b8963e", goldLight: "#d4af6a",
  cream: "#f0e6cc", creamDim: "#c8b890", muted: "#8a7a5a", border: "#1e3a6e",
};

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <h2 style={{ fontSize: 12, color: C.gold, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: "0.875rem", fontWeight: 700 }}>{title}</h2>
      {children}
    </div>
  );
}

function P({ children }) {
  return <p style={{ fontSize: 14, color: C.creamDim, lineHeight: 1.85, marginBottom: "1rem", fontFamily: "sans-serif" }}>{children}</p>;
}

export default function RefundPolicy() {
  return (
    <div style={{ minHeight: "100vh", background: C.dark, fontFamily: "Georgia, serif" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "3rem 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: C.gold, marginBottom: 10, fontFamily: "sans-serif" }}>The International Lover™</div>
          <h1 style={{ fontSize: "clamp(22px,3.5vw,30px)", color: C.goldLight, fontWeight: "normal", margin: 0 }}>Cancellation &amp; Refund Policy</h1>
          <div style={{ fontSize: 12, color: C.muted, fontFamily: "sans-serif", marginTop: 8 }}>Effective as of the date of purchase · theinternationallover.com</div>
        </div>

        <Section title="One-Time Purchases (Course & Lifetime Commission)">
          <P>Purchases of digital course access and Lifetime Commission may be refunded within <strong style={{ color: C.goldLight }}>24 hours of purchase</strong>, provided that less than 20% of the content has been accessed.</P>
          <P>After 24 hours, or once more than 20% of the content has been accessed — whichever comes first — <strong style={{ color: C.goldLight }}>all sales are final</strong>. Digital content cannot be returned once it has been consumed.</P>
          <P>To request a refund within the eligible window, email <a href="mailto:info@theinternationallover.com" style={{ color: C.gold }}>info@theinternationallover.com</a> from the email address used at purchase.</P>
        </Section>

        <Section title="Subscriptions (Complete Platform)">
          <P>You may cancel your membership at any time — no phone call, no explanation required. Manage or cancel your subscription here:</P>
          <p style={{ textAlign: "center", margin: "1.5rem 0" }}>
            <a href={STRIPE_PORTAL_LINK} style={{ display: "inline-block", background: C.gold, color: C.dark, textDecoration: "none", fontWeight: 700, padding: "13px 30px", fontSize: 13, fontFamily: "sans-serif", letterSpacing: "0.08em" }}>Manage My Subscription →</a>
          </p>
          <P>Cancellation stops all future billing. Your access continues until the end of the billing period you have already paid for. <strong style={{ color: C.goldLight }}>Cancellation is not a refund</strong> — partial months and partial years are not refunded, because the access for that period was delivered as purchased.</P>
        </Section>

        <Section title="Consultations & Briefings">
          <P>Booked consultations may be rescheduled up to 24 hours before the appointed time at no charge. Missed appointments without notice are non-refundable.</P>
        </Section>

        <Section title="Important Notes">
          <P>This policy is presented before purchase and agreed to at checkout. Refunds, where eligible, are returned to the original payment method and may take 5–10 business days to appear depending on your bank.</P>
        </Section>

        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "1.5rem", textAlign: "center" }}>
          <div style={{ fontSize: 12, color: C.muted, fontFamily: "sans-serif" }}>Questions? <a href="mailto:info@theinternationallover.com" style={{ color: C.gold }}>info@theinternationallover.com</a></div>
          <div style={{ fontSize: 10, color: "#2a3a5a", fontFamily: "sans-serif", marginTop: 6 }}>© The International Lover™ · ASM Productions LLC · All rights reserved</div>
        </div>
      </div>
    </div>
  );
}
