import React from "react";
import Link from "next/link";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { getOrganizerDashboardMetrics } from "@/server/services/dashboard-metrics";
import { buildOrganizerStatusCards } from "@/features/dashboard/dashboard-metrics";
import { OrganizerLiveAttendanceContent } from "@/features/dashboard/components/OrganizerLiveAttendanceContent";

function StatusCard(props: {
  title: string;
  count: number;
  href: string;
  ctaLabel: string;
  description: string;
}) {
  return (
    <article className="rounded-[24px] border border-whisper bg-card-bg p-5 shadow-card transition-colors duration-300">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{props.title}</p>
          <p className="mt-3 text-[30px] font-bold tracking-tight text-foreground">{props.count}</p>
        </div>
        <Link
          href={props.href}
          className="rounded-full border border-whisper bg-app-bg px-3 py-1.5 text-[12px] font-semibold text-foreground/80 transition-colors hover:bg-muted"
        >
          {props.ctaLabel}
        </Link>
      </div>
      <p className="mt-4 text-[13px] font-medium leading-relaxed text-muted-foreground">{props.description}</p>
    </article>
  );
}

export async function DashboardMetricsWrapper() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return null;
  }

  const metrics = await getOrganizerDashboardMetrics(db, {
    id: user.id,
    role: user.role,
    collegeId: user.collegeId,
  });

  const statusCards = buildOrganizerStatusCards(metrics?.statusCounts ?? {});

  return (
    <>
      <OrganizerLiveAttendanceContent
        eventCount={metrics?.eventCount ?? 0}
        initialLiveMetrics={{
          rsvpCount: metrics?.rsvpCount ?? 0,
          rsvpTotals: metrics?.rsvpTotals ?? {
            total: 0,
            going: 0,
            attended: 0,
            waitlisted: 0,
            cancelled: 0,
          },
          recentActivity: metrics?.recentActivity ?? [],
        }}
        liveEventCount={metrics?.liveEventCount ?? 0}
        pendingApprovalCount={metrics?.pendingApprovalCount ?? 0}
      />

      <section className="space-y-4">
        <div className="px-1 md:px-0">
          <h2 className="text-[26px] font-bold tracking-tight text-foreground">Status Lanes</h2>
          <p className="mt-1 text-[14px] font-medium leading-relaxed text-muted-foreground">
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
    </>
  );
}
export default DashboardMetricsWrapper;
