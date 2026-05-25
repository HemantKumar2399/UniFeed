"use client";

import { Calendar } from "lucide-react";
import { useState } from "react";

import type { OrganizerLiveAttendanceMetrics } from "@/features/attendance/realtime-attendance";
import { formatDashboardDate, getRsvpActivityLabel } from "@/features/dashboard/dashboard-metrics";
import { api } from "@/trpc/react";

function MetricCard(props: {
  description: string;
  label: string;
  tone?: "amber" | "blue" | "emerald" | "slate";
  value: number;
}) {
  const toneClasses =
    props.tone === "amber"
      ? "bg-[#fff8ec] dark:bg-amber-500/10 text-[#9a6500] dark:text-amber-400"
      : props.tone === "emerald"
        ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
        : props.tone === "slate"
          ? "bg-[#f6f5f4] dark:bg-muted text-[#615d59] dark:text-muted-foreground"
          : "bg-[#f2f9ff] dark:bg-blue-500/10 text-[#097fe8] dark:text-blue-400";

  return (
    <div className="rounded-[24px] border border-whisper bg-card-bg p-5 shadow-card transition-colors duration-300">
      <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${toneClasses} transition-colors`}>
        {props.label}
      </span>
      <p className="mt-4 text-[34px] font-bold tracking-tight text-foreground">{props.value}</p>
      <p className="mt-2 text-[13px] font-medium leading-relaxed text-muted-foreground">{props.description}</p>
    </div>
  );
}

export function OrganizerLiveAttendanceContent(props: {
  eventCount: number;
  initialLiveMetrics: OrganizerLiveAttendanceMetrics;
  liveEventCount: number;
  pendingApprovalCount: number;
}) {
  const [liveMetrics, setLiveMetrics] = useState(props.initialLiveMetrics);

  api.dashboard.getOrganizerLiveMetrics.useQuery(undefined, {
    initialData: props.initialLiveMetrics,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  api.dashboard.onOrganizerAttendanceChange.useSubscription(undefined, {
    onData: (nextMetrics) => {
      setLiveMetrics(nextMetrics);
    },
  });

  return (
    <>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          description="Every event currently inside your managed scope, across all workflow states."
          label="All Events"
          value={props.eventCount}
        />
        <MetricCard
          description="Live attendee demand across the events you can manage right now."
          label="Total RSVPs"
          tone="emerald"
          value={liveMetrics.rsvpCount}
        />
        <MetricCard
          description="Published future events that students can currently discover and attend."
          label="Live Upcoming"
          value={props.liveEventCount}
        />
        <MetricCard
          description="Submitted events waiting on a college-admin decision before they can move forward."
          label="Pending Review"
          tone="amber"
          value={props.pendingApprovalCount}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <div className="rounded-[28px] border border-whisper bg-card-bg p-6 shadow-card transition-colors duration-300">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Recent Attendee Activity</p>
              <h2 className="mt-2 text-[24px] font-bold tracking-tight text-foreground">Who moved recently</h2>
            </div>
            <Calendar className="h-5 w-5 text-[#097fe8]" />
          </div>

          {liveMetrics.recentActivity.length > 0 ? (
            <div className="mt-6 space-y-3">
              {liveMetrics.recentActivity.map((activity) => (
                <div
                  className="rounded-[20px] border border-whisper bg-app-bg px-4 py-4 transition-colors"
                  key={`${activity.rsvpId}-${activity.status}-${activity.registeredAt.toISOString()}`}
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                      <p className="text-[15px] font-semibold text-foreground">{activity.attendeeName}</p>
                      <p className="truncate text-[13px] text-muted-foreground">
                        {activity.eventTitle} on {formatDashboardDate(activity.eventDate)}
                      </p>
                      <p className="mt-1 text-[12px] text-muted-foreground/80">
                        {activity.attendeeEmail ?? "No email on file"}
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-2 md:items-end">
                      <span className="rounded-full border border-whisper bg-card-bg px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/80 transition-colors">
                        {getRsvpActivityLabel(activity.status)}
                      </span>
                      <p className="text-[12px] font-medium text-muted-foreground">
                        {formatDashboardDate(activity.registeredAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-[20px] border border-dashed border-input bg-app-bg px-5 py-10 text-center transition-colors">
              <p className="text-[16px] font-semibold text-foreground">No attendee activity yet</p>
              <p className="mt-2 text-[13px] font-medium leading-relaxed text-muted-foreground">
                Once students RSVP or get checked in, their latest activity will show up here.
              </p>
            </div>
          )}
        </div>

        <aside className="space-y-5">
          <div className="rounded-[28px] border border-whisper bg-card-bg p-6 shadow-card transition-colors duration-300">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">RSVP States</p>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-whisper bg-app-bg px-4 py-3 transition-colors">
                <p className="text-[13px] font-semibold text-foreground">Going</p>
                <p className="mt-1 text-[13px] font-medium text-muted-foreground">{liveMetrics.rsvpTotals.going}</p>
              </div>
              <div className="rounded-2xl border border-whisper bg-app-bg px-4 py-3 transition-colors">
                <p className="text-[13px] font-semibold text-foreground">Attended</p>
                <p className="mt-1 text-[13px] font-medium text-muted-foreground">{liveMetrics.rsvpTotals.attended}</p>
              </div>
              <div className="rounded-2xl border border-whisper bg-app-bg px-4 py-3 transition-colors">
                <p className="text-[13px] font-semibold text-foreground">Waitlisted</p>
                <p className="mt-1 text-[13px] font-medium text-muted-foreground">{liveMetrics.rsvpTotals.waitlisted}</p>
              </div>
              <div className="rounded-2xl border border-whisper bg-app-bg px-4 py-3 transition-colors">
                <p className="text-[13px] font-semibold text-foreground">Cancelled RSVPs</p>
                <p className="mt-1 text-[13px] font-medium text-muted-foreground">{liveMetrics.rsvpTotals.cancelled}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-whisper bg-card-bg p-6 shadow-card transition-colors duration-300">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Next Steps</p>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-[16px] font-bold tracking-tight text-foreground">1. Resolve anything submitted</h3>
                <p className="mt-1 text-[13px] font-medium leading-relaxed text-muted-foreground">
                  Open your submitted tab or the admin queue to keep events from stalling before publish time.
                </p>
              </div>
              <div>
                <h3 className="text-[16px] font-bold tracking-tight text-foreground">2. Publish approved work</h3>
                <p className="mt-1 text-[13px] font-medium leading-relaxed text-muted-foreground">
                  Approved events are not live yet. Publish them when the student-facing listing should open.
                </p>
              </div>
              <div>
                <h3 className="text-[16px] font-bold tracking-tight text-foreground">3. Watch attendance activity</h3>
                <p className="mt-1 text-[13px] font-medium leading-relaxed text-muted-foreground">
                  Recent RSVP movement helps you decide when to promote, remind, or staff check-in support.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
