import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

import { SignOutForm } from "@/components/SignOutForm";
import { ThemeToggle } from "@/components/ThemeToggle";

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
    <div className="min-h-screen bg-app-bg text-foreground selection:bg-status-warning-surface font-sans transition-colors duration-300">
      <header className="border-b border-whisper bg-card-bg/85 backdrop-blur-xl transition-colors duration-300">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-6 py-5 lg:px-12">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-4">
              <Link
                href="/dashboard"
                className="mt-1 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-whisper bg-card-bg text-foreground shadow-sm transition-colors hover:bg-muted"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="space-y-2">
                <div className="surface-status-warning inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  College Admin Control Center
                </div>
                <div>
                  <h1 className="text-page-title-compact text-foreground md:text-[42px]">
                    {collegeName}
                  </h1>
                  <p className="text-page-lead mt-2 max-w-3xl text-muted-foreground md:text-[16px]">
                    Review college submissions, manage community ownership, and move between admin tools without hunting for hidden routes.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <div className="rounded-2xl border border-whisper bg-card-bg px-4 py-3 shadow-sm transition-colors">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Pending Reviews</p>
                <p className="mt-1 text-[20px] font-bold tracking-tight text-orange">{pendingReviewCount}</p>
              </div>
              <div className="rounded-2xl border border-whisper bg-card-bg px-4 py-3 shadow-sm transition-colors">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Signed in as</p>
                <p className="mt-1 text-[14px] font-semibold text-foreground">{userName}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange">
                  {userRole.replace("_", " ")}
                </p>
              </div>
              <SignOutForm className="inline-flex h-10 items-center justify-center rounded-2xl border border-whisper bg-card-bg px-5 text-[15px] font-semibold text-foreground/90 transition-colors hover:bg-muted cursor-pointer">
                Sign Out
              </SignOutForm>
              <ThemeToggle />
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <div className="rounded-[28px] border border-whisper bg-card-bg p-4 shadow-card transition-colors">
              <AdminNav pendingReviewCount={pendingReviewCount} />
            </div>

            <div className="surface-status-warning rounded-[28px] border p-5 shadow-card transition-colors">
              <p className="text-eyebrow">Admin Focus</p>
              <h2 className="text-panel-title mt-2 text-foreground">
                Approval is now a first-class workflow
              </h2>
              <p className="text-caption mt-2 leading-relaxed text-muted-foreground">
                Drafts move to submitted, admins review with context, and only approved events become publishable by organizers. This space should feel operational, not generic.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-12">
        <div className="rounded-[32px] border border-whisper bg-card-bg/92 p-6 shadow-deep backdrop-blur-xl md:p-8 lg:p-10 transition-colors duration-300">
          {children}
        </div>
      </main>
    </div>
  );
}
