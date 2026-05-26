import { ArrowRight, BarChart3, Clock3, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

import {
  buildOrganizerStatusCards,
  formatDashboardDate,
  getRsvpActivityLabel,
  type RsvpConversionRow,
} from "@/features/dashboard/dashboard-metrics";
import type { OrganizerDashboardMetrics } from "@/server/services/dashboard-metrics";

function MetricBlock(props: {
  label: string;
  value: number;
  detail: string;
}) {
  return (
    <div className="rounded-[24px] border-whisper bg-card-bg p-5 shadow-card transition-colors duration-300">
      <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{props.label}</p>
      <p className="mt-3 text-[32px] font-bold tracking-tight text-foreground">{props.value}</p>
      <p className="mt-2 text-[13px] font-medium leading-relaxed text-muted-foreground">{props.detail}</p>
    </div>
  );
}

export function MetricsConversionSection(props: {
  conversionRows: RsvpConversionRow[];
}) {
  return (
    <section className="rounded-[28px] border-whisper bg-card-bg p-6 shadow-card transition-colors duration-300">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">RSVP Conversion</p>
          <h2 className="mt-2 text-[24px] font-bold tracking-tight text-foreground">Attendance drop-off by event</h2>
        </div>
        <TrendingUp className="h-5 w-5 text-notion-blue" />
      </div>

      {props.conversionRows.length > 0 ? (
        <div className="mt-6 space-y-4">
          {props.conversionRows.map((row) => (
            <div
              className="rounded-[20px] border-whisper bg-app-bg px-4 py-4 transition-colors"
              key={row.eventId}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-semibold text-foreground">{row.title}</p>
                  <p className="mt-1 text-[12px] font-medium text-muted-foreground/70">
                    Event date: {formatDashboardDate(row.date)}
                  </p>
                </div>
                <span className="rounded-full border-whisper bg-card-bg px-3 py-1 text-[12px] font-semibold text-foreground/80 transition-colors">
                  {row.conversionPercentage}% attended
                </span>
              </div>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-muted">
                <div
                  aria-hidden="true"
                  className="h-full rounded-full bg-notion-blue transition-all"
                  style={{ width: `${row.conversionPercentage}%` }}
                />
              </div>

              <div className="mt-3 grid gap-2 text-[12px] font-medium text-muted-foreground sm:grid-cols-4">
                <span>{row.attendedCount} attended</span>
                <span>{row.confirmedCount} confirmed</span>
                <span>{row.waitlistedCount} waitlisted</span>
                <span>{row.cancelledCount} cancelled</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-[20px] border border-dashed border-input bg-app-bg px-5 py-10 text-center transition-colors">
          <p className="text-[16px] font-semibold text-foreground/90">No completed event conversion data yet</p>
          <p className="mt-2 text-[13px] font-medium leading-relaxed text-muted-foreground">
            Past published events will appear here once they have RSVP and attendance history.
          </p>
        </div>
      )}
    </section>
  );
}

export function MetricsPageView(props: {
  metrics: OrganizerDashboardMetrics | null;
}) {
  const { metrics } = props;
  const statusCards = buildOrganizerStatusCards(metrics?.statusCounts ?? {});

  return (
    <div className="flex flex-col gap-8 pb-32 md:pb-12">
      <header className="px-1 md:px-0">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-blue-500/10 p-3 text-notion-blue dark:text-blue-400">
            <BarChart3 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-[40px] font-bold leading-[1.1] tracking-[-1.5px] text-foreground md:text-[48px]">
              Metrics
            </h1>
            <p className="mt-1 text-[16px] font-medium leading-relaxed text-muted-foreground">
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
        <div className="rounded-[28px] border-whisper bg-card-bg p-6 shadow-card transition-colors duration-300">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Workflow Snapshot</p>
              <h2 className="mt-2 text-[24px] font-bold tracking-tight text-foreground">Status cards with next actions</h2>
            </div>
            <Clock3 className="h-5 w-5 text-notion-blue" />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {statusCards.map((card) => (
              <Link
                key={card.status}
                href={card.href}
                className="group rounded-[22px] border-whisper bg-app-bg p-5 transition-colors hover:bg-card-bg"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{card.title}</p>
                    <p className="mt-3 text-[28px] font-bold tracking-tight text-foreground">{card.count}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-notion-blue transition-transform group-hover:translate-x-0.5" />
                </div>
                <p className="mt-3 text-[13px] font-medium leading-relaxed text-muted-foreground">{card.description}</p>
                <p className="mt-4 text-[13px] font-semibold text-notion-blue">{card.ctaLabel}</p>
              </Link>
            ))}
          </div>
        </div>

        <aside className="rounded-[28px] border-whisper bg-card-bg p-6 shadow-card transition-colors duration-300">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-500/10 p-3 text-notion-blue dark:text-blue-400">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">RSVP Mix</p>
              <h2 className="text-[24px] font-bold tracking-tight text-foreground">Attendance state totals</h2>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="rounded-2xl border-whisper bg-app-bg px-4 py-3 transition-colors">
              <p className="text-[13px] font-semibold text-foreground">Going</p>
              <p className="mt-1 text-[13px] font-medium text-muted-foreground">{metrics?.rsvpTotals.going ?? 0}</p>
            </div>
            <div className="rounded-2xl border-whisper bg-app-bg px-4 py-3 transition-colors">
              <p className="text-[13px] font-semibold text-foreground">Attended</p>
              <p className="mt-1 text-[13px] font-medium text-muted-foreground">{metrics?.rsvpTotals.attended ?? 0}</p>
            </div>
            <div className="rounded-2xl border-whisper bg-app-bg px-4 py-3 transition-colors">
              <p className="text-[13px] font-semibold text-foreground">Waitlisted</p>
              <p className="mt-1 text-[13px] font-medium text-muted-foreground">{metrics?.rsvpTotals.waitlisted ?? 0}</p>
            </div>
            <div className="rounded-2xl border-whisper bg-app-bg px-4 py-3 transition-colors">
              <p className="text-[13px] font-semibold text-foreground">Cancelled RSVPs</p>
              <p className="mt-1 text-[13px] font-medium text-muted-foreground">{metrics?.rsvpTotals.cancelled ?? 0}</p>
            </div>
          </div>
        </aside>
      </section>

      <MetricsConversionSection conversionRows={metrics?.conversionRows ?? []} />

      <section className="rounded-[28px] border-whisper bg-card-bg p-6 shadow-card transition-colors duration-300">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Recent Activity</p>
            <h2 className="mt-2 text-[24px] font-bold tracking-tight text-foreground">Latest attendee movement</h2>
          </div>
          <Link
            href="/dashboard"
            className="rounded-full border-whisper bg-app-bg px-3 py-1.5 text-[12px] font-semibold text-foreground/80 transition-colors hover:bg-muted"
          >
            Back to Overview
          </Link>
        </div>

        {metrics && metrics.recentActivity.length > 0 ? (
          <div className="mt-6 grid gap-3 lg:grid-cols-2">
            {metrics.recentActivity.map((activity) => (
              <div key={activity.rsvpId} className="rounded-[20px] border-whisper bg-app-bg px-4 py-4 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold text-foreground">{activity.attendeeName}</p>
                    <p className="truncate text-[13px] text-muted-foreground">{activity.eventTitle}</p>
                    <p className="mt-1 text-[12px] text-muted-foreground/75">{activity.attendeeEmail ?? "No email on file"}</p>
                  </div>
                  <span className="rounded-full border-whisper bg-card-bg px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/80 transition-colors">
                    {getRsvpActivityLabel(activity.status)}
                  </span>
                </div>
                <p className="mt-3 text-[12px] font-medium text-muted-foreground/70">
                  Event date: {formatDashboardDate(activity.eventDate)}
                </p>
                <p className="mt-1 text-[12px] font-medium text-muted-foreground/70">
                  Activity recorded: {formatDashboardDate(activity.registeredAt)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-[20px] border border-dashed border-input bg-app-bg px-5 py-10 text-center transition-colors">
            <p className="text-[16px] font-semibold text-foreground/90">No attendee movement yet</p>
            <p className="mt-2 text-[13px] font-medium leading-relaxed text-muted-foreground">
              Once students RSVP or are checked in, this page will show their latest state changes.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
