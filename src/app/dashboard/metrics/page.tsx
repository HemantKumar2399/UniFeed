import { ArrowRight, BarChart3, Clock3, Users } from "lucide-react";
import Link from "next/link";

import {
  buildOrganizerStatusCards,
  formatDashboardDate,
  getRsvpActivityLabel,
} from "@/features/dashboard/dashboard-metrics";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { getOrganizerDashboardMetrics } from "@/server/services/dashboard-metrics";

function MetricBlock(props: {
  label: string;
  value: number;
  detail: string;
}) {
  return (
    <div className="rounded-[24px] border border-black/10 bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
      <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#a39e98]">{props.label}</p>
      <p className="mt-3 text-[32px] font-bold tracking-tight text-black/95">{props.value}</p>
      <p className="mt-2 text-[13px] font-medium leading-relaxed text-[#615d59]">{props.detail}</p>
    </div>
  );
}

export default async function MetricsPage() {
  const session = await auth();
  const user = session?.user;
  const metrics = user
    ? await getOrganizerDashboardMetrics(db, {
        id: user.id,
        role: user.role,
        collegeId: user.collegeId,
      })
    : null;
  const statusCards = buildOrganizerStatusCards(metrics?.statusCounts ?? {});

  return (
    <div className="flex flex-col gap-8 pb-32 md:pb-12">
      <header className="px-1 md:px-0">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-[#f2f9ff] p-3 text-[#097fe8]">
            <BarChart3 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-[40px] font-bold leading-[1.1] tracking-[-1.5px] text-black/95 md:text-[48px]">
              Metrics
            </h1>
            <p className="mt-1 text-[16px] font-medium leading-relaxed text-[#615d59]">
              Real organizer reporting for event volume, RSVP health, and attendance activity.
            </p>
          </div>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricBlock
          label="All Events"
          value={metrics?.eventCount ?? 0}
          detail="Everything inside your managed scope, including drafts and completed workflow states."
        />
        <MetricBlock
          label="Upcoming Live"
          value={metrics?.upcomingEventCount ?? 0}
          detail="Published future events currently visible to students."
        />
        <MetricBlock
          label="Pending Review"
          value={metrics?.pendingApprovalCount ?? 0}
          detail="Submitted work still waiting on a college-admin decision."
        />
        <MetricBlock
          label="Approved Holding"
          value={metrics?.approvedEventCount ?? 0}
          detail="Approved events that still need an organizer publish action."
        />
        <MetricBlock
          label="Total RSVPs"
          value={metrics?.rsvpCount ?? 0}
          detail="Live attendee demand across the events you are responsible for."
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,1fr)]">
        <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#a39e98]">Workflow Snapshot</p>
              <h2 className="mt-2 text-[24px] font-bold tracking-tight text-black/95">Status cards with next actions</h2>
            </div>
            <Clock3 className="h-5 w-5 text-[#097fe8]" />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {statusCards.map((card) => (
              <Link
                key={card.status}
                href={card.href}
                className="group rounded-[22px] border border-black/10 bg-[#f6f5f4] p-5 transition-colors hover:bg-white"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#a39e98]">{card.title}</p>
                    <p className="mt-3 text-[28px] font-bold tracking-tight text-black/95">{card.count}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#097fe8] transition-transform group-hover:translate-x-0.5" />
                </div>
                <p className="mt-3 text-[13px] font-medium leading-relaxed text-[#615d59]">{card.description}</p>
                <p className="mt-4 text-[13px] font-semibold text-[#097fe8]">{card.ctaLabel}</p>
              </Link>
            ))}
          </div>
        </div>

        <aside className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-[#f2f9ff] p-3 text-[#097fe8]">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#a39e98]">RSVP Mix</p>
              <h2 className="text-[24px] font-bold tracking-tight text-black/95">Attendance state totals</h2>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="rounded-2xl border border-black/10 bg-[#f6f5f4] px-4 py-3">
              <p className="text-[13px] font-semibold text-black/95">Going</p>
              <p className="mt-1 text-[13px] font-medium text-[#615d59]">{metrics?.rsvpTotals.going ?? 0}</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-[#f6f5f4] px-4 py-3">
              <p className="text-[13px] font-semibold text-black/95">Attended</p>
              <p className="mt-1 text-[13px] font-medium text-[#615d59]">{metrics?.rsvpTotals.attended ?? 0}</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-[#f6f5f4] px-4 py-3">
              <p className="text-[13px] font-semibold text-black/95">Waitlisted</p>
              <p className="mt-1 text-[13px] font-medium text-[#615d59]">{metrics?.rsvpTotals.waitlisted ?? 0}</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-[#f6f5f4] px-4 py-3">
              <p className="text-[13px] font-semibold text-black/95">Cancelled RSVPs</p>
              <p className="mt-1 text-[13px] font-medium text-[#615d59]">{metrics?.rsvpTotals.cancelled ?? 0}</p>
            </div>
          </div>
        </aside>
      </section>

      <section className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#a39e98]">Recent Activity</p>
            <h2 className="mt-2 text-[24px] font-bold tracking-tight text-black/95">Latest attendee movement</h2>
          </div>
          <Link
            href="/dashboard"
            className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-[12px] font-semibold text-black/75 transition-colors hover:bg-black/5"
          >
            Back to Overview
          </Link>
        </div>

        {metrics && metrics.recentActivity.length > 0 ? (
          <div className="mt-6 grid gap-3 lg:grid-cols-2">
            {metrics.recentActivity.map((activity) => (
              <div key={activity.rsvpId} className="rounded-[20px] border border-black/10 bg-[#f6f5f4] px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold text-black/95">{activity.attendeeName}</p>
                    <p className="truncate text-[13px] text-[#615d59]">{activity.eventTitle}</p>
                    <p className="mt-1 text-[12px] text-[#8b8680]">{activity.attendeeEmail ?? "No email on file"}</p>
                  </div>
                  <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/75">
                    {getRsvpActivityLabel(activity.status)}
                  </span>
                </div>
                <p className="mt-3 text-[12px] font-medium text-[#8b8680]">
                  Event date: {formatDashboardDate(activity.eventDate)}
                </p>
                <p className="mt-1 text-[12px] font-medium text-[#8b8680]">
                  Activity recorded: {formatDashboardDate(activity.registeredAt)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-[20px] border border-dashed border-black/10 bg-[#f6f5f4] px-5 py-10 text-center">
            <p className="text-[16px] font-semibold text-black/85">No attendee movement yet</p>
            <p className="mt-2 text-[13px] font-medium leading-relaxed text-[#615d59]">
              Once students RSVP or are checked in, this page will show their latest state changes.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
