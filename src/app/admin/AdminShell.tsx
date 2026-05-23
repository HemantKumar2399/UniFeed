import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

import { SignOutForm } from "@/components/SignOutForm";

import { AdminNav } from "./AdminNav";

type AdminShellProps = {
  children: React.ReactNode;
  collegeName: string;
  pendingReviewCount: number;
  userName: string;
  userRole: string;
};

export function AdminShell({
  children,
  collegeName,
  pendingReviewCount,
  userName,
  userRole,
}: AdminShellProps) {
  return (
    <div className="min-h-screen bg-[#f6f1eb] text-[rgba(0,0,0,0.95)] selection:bg-[#dd5b00]/20 font-sans">
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/88 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-6 py-5 lg:px-12">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-4">
              <Link
                href="/dashboard"
                className="mt-1 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-black/10 bg-white text-black/85 shadow-sm transition-colors hover:bg-black/5"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#dd5b00]/15 bg-[#fff3ea] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#dd5b00]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  College Admin Control Center
                </div>
                <div>
                  <h1 className="text-[34px] font-bold tracking-[-1.2px] text-black/95 md:text-[42px]">
                    {collegeName}
                  </h1>
                  <p className="mt-2 max-w-3xl text-[15px] font-medium leading-relaxed text-[#615d59] md:text-[16px]">
                    Review college submissions, manage community ownership, and move between admin tools without hunting for hidden routes.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <div className="rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a39e98]">Pending Reviews</p>
                <p className="mt-1 text-[20px] font-bold tracking-tight text-[#9d4200]">{pendingReviewCount}</p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a39e98]">Signed in as</p>
                <p className="mt-1 text-[14px] font-semibold text-black/95">{userName}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#dd5b00]">
                  {userRole.replace("_", " ")}
                </p>
              </div>
              <SignOutForm className="inline-flex h-10 items-center justify-center rounded-2xl border border-black/10 bg-white px-5 text-[15px] font-semibold text-black/90 transition-colors hover:bg-black/5">
                Sign Out
              </SignOutForm>
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <div className="rounded-[28px] border border-white/80 bg-[linear-gradient(180deg,_rgba(255,255,255,0.92)_0%,_rgba(255,247,241,0.95)_100%)] p-4 shadow-[0_18px_44px_rgba(0,0,0,0.05)]">
              <AdminNav pendingReviewCount={pendingReviewCount} />
            </div>

            <div className="rounded-[28px] border border-[#dd5b00]/12 bg-[linear-gradient(180deg,_rgba(255,243,234,0.9)_0%,_rgba(255,255,255,0.96)_100%)] p-5 shadow-[0_18px_44px_rgba(0,0,0,0.05)]">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#dd5b00]">Admin Focus</p>
              <h2 className="mt-2 text-[20px] font-bold tracking-tight text-black/95">
                Approval is now a first-class workflow
              </h2>
              <p className="mt-2 text-[14px] font-medium leading-relaxed text-[#615d59]">
                Drafts move to submitted, admins review with context, and only approved events become publishable by organizers. This space should feel operational, not generic.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-12">
        <div className="rounded-[32px] border border-white/70 bg-white/92 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.06)] backdrop-blur-xl md:p-8 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
