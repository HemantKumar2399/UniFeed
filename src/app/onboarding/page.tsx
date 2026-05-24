import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { OnboardingForm } from "./OnboardingForm";

export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  const session = await auth();

  if (!session?.user?.id) redirect("/login");
  if (session.user.role !== "STUDENT") redirect("/home");

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: { college: true, studentProfile: true },
  });

  if (!user) redirect("/login");
  if (user.studentProfile) redirect("/home");

  return (
    <main
      className="flex h-screen w-screen antialiased overflow-hidden"
      style={{ fontFeatureSettings: '"lnum" 1, "locl" 1' }}
    >
      {/* ═══════════════════════════════════════════════════════
          LEFT PANEL  ·  zinc-900 warm-dark — mirrors the
          "Digital Passport" bento card on the landing page
      ═══════════════════════════════════════════════════════ */}
      <aside
        className="hidden lg:flex flex-col justify-between relative overflow-hidden"
        style={{
          width: "44%",
          minWidth: "440px",
          flexShrink: 0,
          backgroundColor: "#18181b",   /* zinc-900 — matches landing page */
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Dot-grid texture — identical opacity to landing page ghost icons */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.04 }}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="ob-dots" width="22" height="22" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ob-dots)" />
          </svg>
        </div>

        {/* ── Logo ────────────────────────────────────────── */}
        <div className="relative z-10 px-10 pt-10">
          <span className="text-white text-[17px] font-semibold tracking-tight">
            ⚡ UniFeed
          </span>
        </div>

        {/* ── Centre: headline + ticket ───────────────────── */}
        <div className="relative z-10 px-10 flex-1 flex flex-col justify-center py-10 space-y-7">

          {/* Headline block */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-3"
               style={{ color: "rgba(255,255,255,0.3)" }}>
              Student Passport
            </p>
            <h2 className="text-white font-bold leading-tight mb-2"
                style={{ fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.55px" }}>
              Your Digital Campus Passport
            </h2>
            <p className="leading-relaxed"
               style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.38)" }}>
              Verify your profile to claim tickets, join clubs, and build a
              verified campus portfolio.
            </p>
          </div>

          {/* ── THE TICKET ──────────────────────────────────
              Compact, minimal — white card on zinc-900 panel.
              Same DNA as landing bento cards, tighter scale.
          ────────────────────────────────────────────────── */}
          <div
            className="rounded-2xl relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid rgba(0,0,0,0.09)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.9), 0 8px 28px rgba(0,0,0,0.28), 0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            {/* ── HEADER ── */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-black/5 rounded-lg flex items-center justify-center text-[14px]">
                  🎓
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.12em]"
                     style={{ color: "rgba(0,0,0,0.3)" }}>
                    UniFeed
                  </p>
                  <p className="text-[12px] font-bold leading-tight"
                     style={{ color: "rgba(0,0,0,0.82)", letterSpacing: "-0.15px" }}>
                    Student Pass
                  </p>
                </div>
              </div>
              <span
                className="inline-flex items-center gap-1 text-[9px] font-bold rounded-full px-2 py-0.5"
                style={{
                  backgroundColor: "rgba(22,163,74,0.07)",
                  color: "#15803d",
                  border: "1px solid rgba(22,163,74,0.14)",
                  letterSpacing: "0.04em",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
                Active
              </span>
            </div>

            {/* ── BODY: property rows ── */}
            <div className="px-4 py-3 space-y-2">
              <div className="flex items-baseline gap-2.5">
                <span className="text-[10px] font-medium w-16 flex-shrink-0"
                      style={{ color: "rgba(0,0,0,0.32)" }}>Name</span>
                <span className="text-[12px] font-semibold truncate"
                      style={{ color: "rgba(0,0,0,0.82)" }}>
                  {user.name ?? "Guest Student"}
                </span>
              </div>
              <div className="flex items-baseline gap-2.5">
                <span className="text-[10px] font-medium w-16 flex-shrink-0"
                      style={{ color: "rgba(0,0,0,0.32)" }}>Uni</span>
                <span className="text-[11px] font-medium leading-snug"
                      style={{ color: "rgba(0,0,0,0.6)" }}>
                  {user.college.name}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-medium w-16 flex-shrink-0"
                      style={{ color: "rgba(0,0,0,0.32)" }}>Access</span>
                <div className="flex gap-1">
                  {["Events", "Clubs", "Passport"].map((tag) => (
                    <span key={tag}
                          className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
                          style={{
                            backgroundColor: "rgba(0,0,0,0.05)",
                            color: "rgba(0,0,0,0.5)",
                            border: "1px solid rgba(0,0,0,0.07)",
                          }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── BOTTOM: pass ID + QR ── */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
            >
              <div>
                <p className="text-[8px] font-bold uppercase tracking-[0.12em] mb-0.5"
                   style={{ color: "rgba(0,0,0,0.22)" }}>
                  Pass ID
                </p>
                <p className="text-[11px] font-mono font-semibold"
                   style={{ color: "rgba(0,0,0,0.45)" }}>
                  UNF-2025-001
                </p>
                <p className="text-[9px] font-medium mt-0.5"
                   style={{ color: "rgba(0,0,0,0.28)" }}>
                  Valid · AY 2025–26
                </p>
              </div>

              {/* QR — 48×48, proper finder patterns */}
              <div
                className="rounded-xl p-2 relative"
                style={{
                  backgroundColor: "#f6f5f4",
                  border: "1px solid rgba(0,0,0,0.07)",
                }}
              >
                <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Finder TL */}
                  <rect x="4"  y="4"  width="18" height="18" rx="3"   fill="rgba(0,0,0,0.82)" />
                  <rect x="8"  y="8"  width="10" height="10" rx="1.5" fill="#f6f5f4" />
                  <rect x="10" y="10" width="6"  height="6"  rx="0.5" fill="rgba(0,0,0,0.82)" />
                  {/* Finder TR */}
                  <rect x="42" y="4"  width="18" height="18" rx="3"   fill="rgba(0,0,0,0.82)" />
                  <rect x="46" y="8"  width="10" height="10" rx="1.5" fill="#f6f5f4" />
                  <rect x="48" y="10" width="6"  height="6"  rx="0.5" fill="rgba(0,0,0,0.82)" />
                  {/* Finder BL */}
                  <rect x="4"  y="42" width="18" height="18" rx="3"   fill="rgba(0,0,0,0.82)" />
                  <rect x="8"  y="46" width="10" height="10" rx="1.5" fill="#f6f5f4" />
                  <rect x="10" y="48" width="6"  height="6"  rx="0.5" fill="rgba(0,0,0,0.82)" />
                  {/* Data modules */}
                  <rect x="26" y="4"  width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="32" y="4"  width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="56" y="4"  width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="26" y="10" width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="56" y="12" width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="32" y="16" width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="4"  y="26" width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="10" y="26" width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="26" y="26" width="6" height="6" rx="1"   fill="rgba(0,0,0,0.82)" />
                  <rect x="34" y="26" width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="40" y="26" width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="46" y="26" width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="4"  y="32" width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="16" y="32" width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="26" y="34" width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="34" y="32" width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="42" y="32" width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="50" y="32" width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="26" y="40" width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="32" y="40" width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="38" y="40" width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="46" y="40" width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="54" y="40" width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="4"  y="56" width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="12" y="56" width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="26" y="46" width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="34" y="46" width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="42" y="46" width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="50" y="46" width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="26" y="54" width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="38" y="54" width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="50" y="54" width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                  <rect x="56" y="54" width="4" height="4" rx="0.5" fill="rgba(0,0,0,0.65)" />
                </svg>
                {/* Notion Blue 2px bottom accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 rounded-b-xl"
                  style={{ height: "2px", backgroundColor: "#0075de" }}
                />
              </div>
            </div>
          </div>
          {/* /ticket */}
        </div>

        {/* ── FOOTER: benefits ────────────────────────────── */}
        <div
          className="relative z-10 px-10 pb-10 space-y-2.5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "18px" }}
        >
          {[
            { emoji: "🎫", label: "One-Tap Event RSVPs — no forms" },
            { emoji: "🛡️", label: "Verified .EDU college-exclusive feed" },
            { emoji: "📊", label: "Real-time live capacity tracker" },
          ].map(({ emoji, label }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="text-sm leading-none">{emoji}</span>
              <span className="text-[12px] font-medium"
                    style={{ color: "rgba(255,255,255,0.35)" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </aside>

      {/* ═══════════════════════════════════════════════════════
          RIGHT PANEL  ·  Pure white — form, no scroll leak
      ═══════════════════════════════════════════════════════ */}
      <section
        className="flex-1 flex flex-col bg-white h-full overflow-hidden"
        style={{ minWidth: 0 }}
      >
        {/* Mobile top bar (desktop left panel replaces this) */}
        <div
          className="lg:hidden flex-shrink-0 flex items-center justify-between px-6 py-4 bg-white"
          style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}
        >
          <span className="text-[17px] font-bold tracking-tight flex items-center gap-2"
                style={{ color: "rgba(0,0,0,0.9)" }}>
            ⚡ UniFeed
          </span>
          <span
            className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{ backgroundColor: "#f0f9ff", color: "#0075de", border: "1px solid rgba(0,117,222,0.15)" }}
          >
            Onboarding
          </span>
        </div>

        {/* Form — min-h-0 + overflow-y-auto = only this scrolls on tiny screens */}
        <div className="flex-1 min-h-0 overflow-y-auto flex items-center justify-center px-6 sm:px-12 lg:px-16 py-8">
          <div className="w-full" style={{ maxWidth: "420px" }}>
            <OnboardingForm userName={user.name} collegeName={user.college.name} />
          </div>
        </div>
      </section>
    </main>
  );
}
