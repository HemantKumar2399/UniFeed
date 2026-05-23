import { CalendarClock, Plus, Tag } from "lucide-react";
import Link from "next/link";

import { EmptyState } from "@/components/EmptyState";
import { EventActions } from "./EventActions";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { isAdminUserRole } from "@/server/permissions/club-management";

const manageableClubRoles = ["OWNER", "EDITOR"] as const;

function formatEventDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export default async function DashboardEventsPage() {
  const session = await auth();
  const user = session?.user;

  const events = !user
    ? []
    : await db.event.findMany({
        where:
          isAdminUserRole(user.role) && user.collegeId
            ? { collegeId: user.collegeId }
            : {
                club: {
                  is: {
                    members: {
                      some: {
                        userId: user.id,
                        role: {
                          in: [...manageableClubRoles],
                        },
                      },
                    },
                  },
                },
              },
        include: {
          club: {
            select: {
              id: true,
              name: true,
            },
          },
          _count: {
            select: {
              rsvps: true,
            },
          },
        },
        orderBy: [{ date: "desc" }, { createdAt: "desc" }],
      });

  return (
    <div className="flex flex-col gap-8 pb-32 md:pb-12">
      <header className="px-1 md:px-0 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[40px] md:text-[48px] font-bold text-black/95 leading-[1.1] tracking-[-1.5px] mb-2">
            Events
          </h1>
          <p className="text-[16px] text-[#615d59] font-medium leading-relaxed">
            Manage your experiences, track RSVPs, and edit event details.
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

      <section className="px-1 md:px-0">
        {events.length === 0 ? (
          <EmptyState
            title="No events yet for your managed communities"
            description="Create your first event draft to see it here. This list now shows real events tied to the clubs you manage."
            actionLabel="Create Event"
            actionHref="/dashboard/events/new"
            icon={<CalendarClock className="h-7 w-7" />}
          />
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <article
                key={event.id}
                className="rounded-[18px] border border-[rgba(0,0,0,0.08)] bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#f2f9ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#097fe8]">
                        {event.status}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#8a847d]">
                        <Tag className="h-3.5 w-3.5" />
                        {event.club.name}
                      </span>
                    </div>

                    <div>
                      <h2 className="text-[24px] font-bold leading-tight tracking-[-0.02em] text-black/95">
                        {event.title}
                      </h2>
                      <p className="mt-1 text-[14px] text-[#615d59]">
                        {event.location} • {formatEventDate(event.date)}
                      </p>
                    </div>

                    <p className="line-clamp-2 max-w-3xl text-[14px] leading-relaxed text-[#615d59]">
                      {event.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-[13px] font-medium text-[#615d59]">
                      <span>{event.capacity} seats</span>
                      <span>{event._count.rsvps} RSVPs</span>
                    </div>
                  </div>

                  <div className="w-full md:w-auto md:min-w-[240px]">
                    <EventActions eventId={event.id} status={event.status} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
