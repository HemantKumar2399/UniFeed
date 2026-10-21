import Link from "next/link";
import { LogOut, ShieldCheck, ArrowUpRight } from "lucide-react";
import { auth } from "@/server/auth";
import { SignOutForm } from "@/components/SignOutForm";

export default async function DashboardSettingsPage() {
  const session = await auth();
  const userName = session?.user?.name ?? "Organizer";
  const userInitial = userName.charAt(0) || "O";
  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <div className="flex max-w-4xl flex-col gap-8 pb-32 transition-colors duration-300 md:pb-12">
      <header className="px-1 md:px-0">
        <h1 className="text-page-title text-foreground mb-8">Settings</h1>

        <div className="bg-app-bg border-whisper flex w-full items-center gap-6 rounded-[24px] border p-6 transition-colors">
          <div className="bg-notion-blue text-entity-title shadow-card flex h-20 w-20 items-center justify-center rounded-full text-white">
            {userInitial}
          </div>
          <div>
            <h2 className="text-panel-title text-foreground">{userName}</h2>
            <p className="text-nav text-muted-foreground mt-1">
              {session?.user?.email}
            </p>
          </div>
        </div>
      </header>

      {isAdmin && (
        <section className="px-1 md:px-0">
          <Link
            href="/admin"
            className="card-surface hover:shadow-deep flex items-center justify-between gap-4 rounded-[24px] p-5 transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-4">
              <div className="surface-brand-subtle flex h-12 w-12 items-center justify-center rounded-2xl border">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-muted-foreground text-[12px] font-semibold tracking-[0.18em] uppercase">
                  Admin Access
                </p>
                <h2 className="text-foreground text-[18px] font-bold tracking-tight">
                  Open College Control Center
                </h2>
                <p className="text-muted-foreground mt-1 text-[13px] font-medium">
                  Jump to role management, community ownership, and route
                  shortcuts for admin workflows.
                </p>
              </div>
            </div>
            <ArrowUpRight className="text-link-accent h-5 w-5 shrink-0" />
          </Link>
        </section>
      )}

      <section className="border-input bg-card-bg rounded-2xl border p-5">
        <h2 className="font-semibold">Community settings</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Manage community logos, resources, and editors from the hub editor.
        </p>
        <Link
          href="/dashboard/hubs"
          className="text-link-accent mt-4 inline-flex min-h-11 items-center underline"
        >
          Open hub management
        </Link>
      </section>

      {/* Sign Out */}
      <div className="mt-4 px-1 md:px-0">
        <SignOutForm className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[12px] py-4 font-semibold text-[#e8503a] transition-all hover:bg-red-50 active:scale-[0.98] dark:hover:bg-red-950/20">
          <LogOut className="h-[18px] w-[18px]" />
          Sign Out of Command Center
        </SignOutForm>
      </div>
    </div>
  );
}
