import { Calendar, Library, Plus, Settings, ShieldCheck } from "lucide-react";
import Link from "next/link";

import {
  buildOrganizerStatusCards,
  formatDashboardDate,
  getRsvpActivityLabel,
} from "@/features/dashboard/dashboard-metrics";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { getOrganizerDashboardMetrics } from "@/server/services/dashboard-metrics";

const adminRouteCards = [
  {
    href: "/admin",
    title: "Admin Panel",
    description: "Open the college control center for approvals, roles, and community oversight.",
    icon: ShieldCheck,
  },
  {
    href: "/dashboard/hubs",
    title: "Community Hubs",
    description: "Jump into hub ownership and content management without leaving the dashboard.",
    icon: Library,
  },
  {
    href: "/dashboard/settings",
    title: "Shared Settings",
    description: "Reach account tools and shared dashboard configuration from one place.",
    icon: Settings,
  },
] as const;

function MetricCard(props: {
  label: string;
  value: number;
  description: string;
  tone?: "blue" | "amber" | "emerald" | "slate";
}) {
  const toneClasses =
    props.tone === "amber"
      ? "bg-[#fff8ec] text-[#9a6500]"
      : props.tone === "emerald"
        ? "bg-emerald-50 text-emerald-700"
        : props.tone === "slate"
          ? "bg-[#f6f5f4] text-[#615d59]"
          : "bg-[#f2f9ff] text-[#097fe8]";

  return (
    <div className="rounded-[24px] border border-black/10 bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
      <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${toneClasses}`}>
        {props.label}
      </span>
      <p className="mt-4 text-[34px] font-bold tracking-tight text-black/95">{props.value}</p>
      <p className="mt-2 text-[13px] font-medium leading-relaxed text-[#615d59]">{props.description}</p>
    </div>
  );
}

function StatusCard(props: {
  title: string;
  count: number;
  href: string;
  ctaLabel: string;
  description: string;
}) {
  return (
    <article className="rounded-[24px] border border-black/10 bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#a39e98]">{props.title}</p>
          <p className="mt-3 text-[30px] font-bold tracking-tight text-black/95">{props.count}</p>
        </div>
        <Link
          href={props.href}
          className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-[12px] font-semibold text-black/75 transition-colors hover:bg-black/5"
        >
          {props.ctaLabel}
        </Link>
      </div>
      <p className="mt-4 text-[13px] font-medium leading-relaxed text-[#615d59]">{props.description}</p>
    </article>
  );
}

export default async function DashboardPage() {
  const session = await auth();
  const organizerName = session?.user?.name ?? "Organizer";
  const user = session?.user;
  const isAdmin = user?.role === "ADMIN";

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
      <header className="flex flex-col justify-between gap-4 px-1 md:flex-row md:items-end md:px-0">
        <div>
          <p className="mb-1 text-[14px] font-semibold uppercase tracking-wider text-[#a39e98]">Command Center</p>
          <h1 className="text-[40px] font-bold leading-[1.1] tracking-[-1.5px] text-black/95 md:text-[48px]">
            Overview
          </h1>
          <p className="mt-2 max-w-3xl text-[16px] font-medium leading-relaxed text-[#615d59]">
            {organizerName}, this view now reflects your live event pipeline, RSVP volume, and the attendee activity that needs attention next.
          </p>
        </div>
        <Link
          href="/dashboard/events/new"
          className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#0075de] px-5 py-3 text-[15px] font-semibold text-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-all hover:bg-[#005bab] active:scale-95"
        >
          <Plus className="h-5 w-5" />
          Create Event
        </Link>
      </header>

      {isAdmin ? (
        <section className="grid gap-4 px-1 md:px-0 lg:grid-cols-3">
          {adminRouteCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-[24px] border border-black/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f2f9ff] text-[#097fe8]">
                <card.icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-[20px] font-bold tracking-tight text-black/95">{card.title}</h2>
              <p className="mt-2 text-[14px] font-medium leading-relaxed text-[#615d59]">{card.description}</p>
            </Link>
          ))}
        </section>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="All Events"
          value={metrics?.eventCount ?? 0}
          description="Every event currently inside your managed scope, across all workflow states."
        />
        <MetricCard
          label="Total RSVPs"
          value={metrics?.rsvpCount ?? 0}
          description="Live attendee demand across the events you can manage right now."
          tone="emerald"
        />
        <MetricCard
          label="Live Upcoming"
          value={metrics?.liveEventCount ?? 0}
          description="Published future events that students can currently discover and attend."
        />
        <MetricCard
          label="Pending Review"
          value={metrics?.pendingApprovalCount ?? 0}
          description="Submitted events waiting on a college-admin decision before they can move forward."
          tone="amber"
        />
      </section>

      <section className="space-y-4">
        <div className="px-1 md:px-0">
          <h2 className="text-[26px] font-bold tracking-tight text-black/95">Status Lanes</h2>
          <p className="mt-1 text-[14px] font-medium leading-relaxed text-[#615d59]">
            Each lane points to the exact event tab you should open next.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {statusCards.map((card) => (
            <StatusCard
              key={card.status}
              title={card.title}
              count={card.count}
              href={card.href}
              ctaLabel={card.ctaLabel}
              description={card.description}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#a39e98]">Recent Attendee Activity</p>
              <h2 className="mt-2 text-[24px] font-bold tracking-tight text-black/95">Who moved recently</h2>
            </div>
            <Calendar className="h-5 w-5 text-[#097fe8]" />
          </div>

          {metrics && metrics.recentActivity.length > 0 ? (
            <div className="mt-6 space-y-3">
              {metrics.recentActivity.map((activity) => (
                <div
                  key={activity.rsvpId}
                  className="rounded-[20px] border border-black/10 bg-[#f6f5f4] px-4 py-4"
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                      <p className="text-[15px] font-semibold text-black/95">{activity.attendeeName}</p>
                      <p className="truncate text-[13px] text-[#615d59]">
                        {activity.eventTitle} on {formatDashboardDate(activity.eventDate)}
                      </p>
                      <p className="mt-1 text-[12px] text-[#8b8680]">
                        {activity.attendeeEmail ?? "No email on file"}
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-2 md:items-end">
                      <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/75">
                        {getRsvpActivityLabel(activity.status)}
                      </span>
                      <p className="text-[12px] font-medium text-[#8b8680]">
                        {formatDashboardDate(activity.registeredAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-[20px] border border-dashed border-black/10 bg-[#f6f5f4] px-5 py-10 text-center">
              <p className="text-[16px] font-semibold text-black/85">No attendee activity yet</p>
              <p className="mt-2 text-[13px] font-medium leading-relaxed text-[#615d59]">
                Once students RSVP or get checked in, their latest activity will show up here.
              </p>
            </div>
          )}
        </div>

        <aside className="space-y-5">
          <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#a39e98]">RSVP States</p>
            <div className="mt-4 space-y-3">
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
          </div>

          <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#a39e98]">Next Steps</p>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-[16px] font-bold tracking-tight text-black/95">1. Resolve anything submitted</h3>
                <p className="mt-1 text-[13px] font-medium leading-relaxed text-[#615d59]">
                  Open your submitted tab or the admin queue to keep events from stalling before publish time.
                </p>
              </div>
              <div>
                <h3 className="text-[16px] font-bold tracking-tight text-black/95">2. Publish approved work</h3>
                <p className="mt-1 text-[13px] font-medium leading-relaxed text-[#615d59]">
                  Approved events are not live yet. Publish them when the student-facing listing should open.
                </p>
              </div>
              <div>
                <h3 className="text-[16px] font-bold tracking-tight text-black/95">3. Watch attendance activity</h3>
                <p className="mt-1 text-[13px] font-medium leading-relaxed text-[#615d59]">
                  Recent RSVP movement helps you decide when to promote, remind, or staff check-in support.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
