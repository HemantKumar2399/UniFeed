import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { OnboardingForm } from "./OnboardingForm";

export default async function OnboardingPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Only STUDENT role needs onboarding
  if (session.user.role !== "STUDENT") {
    redirect("/home");
  }

  // Fetch the user and their college information
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      college: true,
      studentProfile: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  // If the student already completed their profile, redirect to home
  if (user.studentProfile) {
    redirect("/home");
  }

  return (
    <main className="h-screen w-screen bg-white text-[var(--color-notion-black)] overflow-hidden antialiased selection:bg-[var(--color-badge-bg)] selection:text-[var(--color-notion-blue)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 h-full w-full">
        
        {/* Left Panel: High-fidelity Visuals (Desktop Only) */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[var(--color-warm-dark)] to-[#1e1e1d] text-white p-12 lg:p-16 flex-col justify-between relative overflow-hidden h-full">
          {/* Background decorative subtle pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Brand Logo */}
          <div className="relative z-10 flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white">
              ⚡ UniFeed
            </span>
          </div>

          {/* Passport Showcase */}
          <div className="relative z-10 my-auto py-8 space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight leading-tight text-white">
                Your Digital Campus Passport
              </h2>
              <p className="text-sm text-[var(--color-warm-gray-300)] leading-relaxed">
                Verify your student profile to claim tickets, join clubs, and record verified skill credentials for your academic career.
              </p>
            </div>

            {/* Premium Ticket Card Mockup */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-2xl relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-white/20">
              {/* Glow effect */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-[var(--color-notion-blue)] rounded-full filter blur-[40px] opacity-35" />

              {/* Ticket Top */}
              <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">University</span>
                  <span className="text-xs font-semibold text-white truncate max-w-[140px]">{user.college.name}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[var(--color-badge-bg)] text-[var(--color-badge-text)] text-[9px] font-bold tracking-wider uppercase">
                  Student Pass
                </span>
              </div>
              
              {/* Ticket Body */}
              <div className="flex justify-between items-end">
                <div className="space-y-3">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 block">Student</span>
                    <span className="text-sm font-semibold text-white truncate max-w-[140px]">{user.name ?? "Guest Student"}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 block">Status</span>
                      <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Ready
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 block">Security</span>
                      <span className="text-xs font-semibold text-white/70">Verified</span>
                    </div>
                  </div>
                </div>
                
                {/* Mock QR Code */}
                <div className="flex flex-col items-center bg-white p-2 rounded-lg shadow-md">
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-black">
                    <rect x="2" y="2" width="6" height="6" rx="1" />
                    <rect x="2" y="16" width="6" height="6" rx="1" />
                    <rect x="16" y="2" width="6" height="6" rx="1" />
                    <rect x="16" y="16" width="3" height="3" />
                    <rect x="20" y="20" width="2" height="2" />
                    <rect x="16" y="20" width="2" height="2" />
                    <rect x="20" y="16" width="2" height="2" />
                    <rect x="10" y="10" width="4" height="4" />
                    <path d="M10 2h4M10 22h4M2 10v4M22 10v4" strokeLinecap="round" />
                  </svg>
                  <span className="text-[6px] font-mono text-black font-bold mt-1 tracking-wider">UNIFEED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Left Footer Benefits */}
          <div className="relative z-10 pt-6 border-t border-white/10 space-y-3">
            <div className="flex items-center gap-3 text-xs font-medium text-white/80">
              <span className="text-base">🎫</span>
              <span>One-Tap Event RSVPs (No forms)</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium text-white/80">
              <span className="text-base">🛡️</span>
              <span>Verified .EDU college-exclusive feed</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium text-white/80">
              <span className="text-base">📊</span>
              <span>Real-time live capacity tracker</span>
            </div>
          </div>
        </div>

        {/* Right Panel: Onboarding Form (Adaptive for mobile and desktop) */}
        <div className="col-span-1 lg:col-span-7 bg-white flex flex-col justify-between h-full relative overflow-y-auto">
          {/* Header for mobile view only */}
          <div className="lg:hidden p-6 pb-0 flex items-center justify-between border-b border-[var(--border-whisper)] bg-white sticky top-0 z-10">
            <span className="text-[18px] font-bold tracking-tight text-[var(--color-notion-black)] flex items-center gap-2">
              ⚡ UniFeed
            </span>
            <span className="text-xs font-bold text-[var(--color-warm-gray-500)] uppercase tracking-wider bg-[var(--color-warm-white)] px-2.5 py-1 rounded-[var(--radius-pill)]">
              Onboarding
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-center p-6 sm:p-12 lg:p-16 w-full max-w-md mx-auto">
            <OnboardingForm userName={user.name} collegeName={user.college.name} />
          </div>
        </div>

      </div>
    </main>
  );
}
