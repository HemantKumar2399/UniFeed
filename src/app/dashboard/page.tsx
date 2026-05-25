import { Library, Plus, Settings, ShieldCheck } from "lucide-react";
import Link from "next/link";

import {
  buildOrganizerStatusCards,
} from "@/features/dashboard/dashboard-metrics";
import { OrganizerLiveAttendanceContent } from "@/features/dashboard/components/OrganizerLiveAttendanceContent";
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

function StatusCard(props: {
  title: string;
  count: number;
  href: string;
  ctaLabel: string;
  description: string;
}) {
  return (
    <article className="rounded-[24px] border-whisper bg-card-bg p-5 shadow-card transition-colors duration-300">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{props.title}</p>
          <p className="mt-3 text-[30px] font-bold tracking-tight text-foreground">{props.count}</p>
        </div>
        <Link
          href={props.href}
          className="rounded-full border-whisper bg-app-bg px-3 py-1.5 text-[12px] font-semibold text-foreground/80 transition-colors hover:bg-muted"
        >
          {props.ctaLabel}
        </Link>
      </div>
      <p className="mt-4 text-[13px] font-medium leading-relaxed text-muted-foreground">{props.description}</p>
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
          <p className="mb-1 text-[14px] font-semibold uppercase tracking-wider text-muted-foreground">Command Center</p>
          <h1 className="text-[40px] font-bold leading-[1.1] tracking-[-1.5px] text-foreground md:text-[48px]">
            Overview
          </h1>
          <p className="mt-2 max-w-3xl text-[16px] font-medium leading-relaxed text-muted-foreground">
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
              className="rounded-[24px] border-whisper bg-card-bg p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-deep"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-notion-blue dark:text-blue-400">
                <card.icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-[20px] font-bold tracking-tight text-foreground">{card.title}</h2>
              <p className="mt-2 text-[14px] font-medium leading-relaxed text-muted-foreground">{card.description}</p>
            </Link>
          ))}
        </section>
      ) : null}

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

    </div>
  );
}
