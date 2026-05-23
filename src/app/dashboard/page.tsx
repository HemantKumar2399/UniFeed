import { BarChart3, Calendar, Plus, ShieldCheck, Library, Settings } from "lucide-react";
import Link from "next/link";

import { EmptyState } from "@/components/EmptyState";
import { auth } from "@/server/auth";

export default async function DashboardPage() {
  const session = await auth();
  const organizerName = session?.user?.name ?? "Organizer";
  const isAdmin = session?.user?.role === "ADMIN" || session?.user?.role === "SUPER_ADMIN";

  return (
    <div className="flex flex-col gap-8 pb-32 md:pb-12">
      <header className="px-1 md:px-0 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-[14px] font-semibold text-[#a39e98] uppercase tracking-wider mb-1">Command Center</p>
          <h1 className="text-[40px] md:text-[48px] font-bold text-black/95 leading-[1.1] tracking-[-1.5px]">
            Overview
          </h1>
          <p className="mt-2 text-[16px] text-[#615d59] font-medium leading-relaxed">
            {organizerName}, the real organizer overview is being rebuilt around live RSVP, approval, and attendance data.
          </p>
        </div>
        <Link
          href="/dashboard/events/new"
          className="inline-flex items-center justify-center gap-2 bg-[#0075de] hover:bg-[#005bab] text-white px-5 py-3 rounded-[8px] font-semibold text-[15px] active:scale-95 transition-all shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
        >
          <Plus className="w-5 h-5" />
          Create Event
        </Link>
      </header>

      {isAdmin && (
        <section className="grid gap-4 px-1 md:px-0 lg:grid-cols-3">
          <Link
            href="/admin"
            className="rounded-[24px] border border-black/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f2f9ff] text-[#097fe8]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-[20px] font-bold tracking-tight text-black/95">Admin Panel</h2>
            <p className="mt-2 text-[14px] font-medium leading-relaxed text-[#615d59]">
              Open the full college control center for user roles, community ownership, and admin route shortcuts.
            </p>
          </Link>

          <Link
            href="/dashboard/hubs"
            className="rounded-[24px] border border-black/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f2f9ff] text-[#097fe8]">
              <Library className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-[20px] font-bold tracking-tight text-black/95">Community Hubs</h2>
            <p className="mt-2 text-[14px] font-medium leading-relaxed text-[#615d59]">
              Review hubs, content ownership, and editor-management surfaces without leaving the dashboard.
            </p>
          </Link>

          <Link
            href="/dashboard/settings"
            className="rounded-[24px] border border-black/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f2f9ff] text-[#097fe8]">
              <Settings className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-[20px] font-bold tracking-tight text-black/95">Shared Settings</h2>
            <p className="mt-2 text-[14px] font-medium leading-relaxed text-[#615d59]">
              Access shared account tools, then jump back into the admin control center from the new entry link there.
            </p>
          </Link>
        </section>
      )}

      <section className="grid grid-cols-1 gap-4 px-1 md:px-0 lg:grid-cols-2">
        <EmptyState
          title="Organizer analytics are intentionally disabled for now"
          description="TODO-MVP: Epic 11 will replace the demo metrics with real event, RSVP, and attendance reporting. Until then, we avoid showing fabricated numbers."
          actionLabel="Create Event"
          actionHref="/dashboard/events/new"
          icon={<BarChart3 className="h-7 w-7" />}
          className="min-h-[260px]"
        />
        <EmptyState
          title="Use event tools, not sample KPIs"
          description="You can still create events and use scan mode on existing events. Live organizer dashboards will return once the underlying data contracts are real."
          actionLabel="View Events"
          actionHref="/dashboard/events"
          icon={<Calendar className="h-7 w-7" />}
          className="min-h-[260px]"
        />
      </section>
    </div>
  );
}
