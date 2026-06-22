import { Suspense } from "react";
import { Library, Plus, Settings, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { auth } from "@/server/auth";
import { DashboardMetricsWrapper } from "@/features/dashboard/components/DashboardMetricsWrapper";
import { DashboardSkeleton } from "@/features/dashboard/components/DashboardSkeleton";

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

export default async function DashboardPage() {
  const session = await auth();
  const organizerName = session?.user?.name ?? "Organizer";
  const user = session?.user;
  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="flex flex-col gap-8 pb-32 md:pb-12">
      <header className="flex flex-col justify-between gap-4 px-1 md:flex-row md:items-end md:px-0">
        <div>
          <p className="text-eyebrow mb-1 text-muted-foreground">Command Center</p>
          <h1 className="text-page-title text-foreground">
            Overview
          </h1>
          <p className="text-page-lead mt-2 max-w-3xl text-muted-foreground">
            {organizerName}, this view now reflects your live event pipeline, RSVP volume, and the attendee activity that needs attention next.
          </p>
        </div>
        <Link
          href="/dashboard/events/new"
          className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-notion-blue px-5 py-3 text-[15px] font-semibold text-white shadow-card transition-all hover:bg-[var(--color-notion-blue-hover)] active:scale-95"
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
              className="card-surface rounded-[24px] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-deep"
            >
              <div className="surface-brand-subtle flex h-12 w-12 items-center justify-center rounded-2xl border">
                <card.icon className="h-5 w-5" />
              </div>
              <h2 className="text-panel-title mt-5 text-foreground">{card.title}</h2>
              <p className="text-caption mt-2 leading-relaxed text-muted-foreground">{card.description}</p>
            </Link>
          ))}
        </section>
      ) : null}

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardMetricsWrapper />
      </Suspense>
    </div>
  );
}
