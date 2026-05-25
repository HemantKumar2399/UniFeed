import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarClock, Filter, Search, Users } from "lucide-react";

import { EmptyState } from "@/components/EmptyState";
import { formatRegistrationDeadline, getAdminDeadlineState } from "@/lib/event-registration";
import { createCaller } from "@/server/api/root";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { type RouterOutputs } from "@/trpc/react";
import { EventStatusBadge, RegistrationStatusBadge } from "@/components/EventStatusBadge";
import { getRegistrationStatus } from "@/lib/event-status";

function formatDateTime(date: Date | null | undefined) {
  if (!date) {
    return "Not submitted yet";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}



type AdminEventsPageProps = {
  searchParams: Promise<{
    q?: string;
    clubId?: string;
  }>;
};

type CommunityItem = RouterOutputs["admin"]["getCollegeCommunities"][number];
type PendingEventItem = RouterOutputs["admin"]["getPendingEvents"][number];

export default async function AdminEventsPage({ searchParams }: AdminEventsPageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  const { q, clubId } = await searchParams;
  const parsedClubId = clubId ? Number.parseInt(clubId, 10) : undefined;
  const now = new Date();
  const caller = createCaller({
    db,
    session,
    headers: new Headers(),
  });

  const [clubs, pendingEvents] = await Promise.all([
    caller.admin.getCollegeCommunities(),
    caller.admin.getPendingEvents({
      ...(q?.trim() ? { query: q.trim() } : {}),
      ...(parsedClubId && Number.isInteger(parsedClubId) ? { clubId: parsedClubId } : {}),
    }),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#a39e98]">Approval Queue</p>
          <h2 className="mt-1 text-[34px] font-bold tracking-[-1px] text-black/95 md:text-[40px]">
            Pending event reviews
          </h2>
          <p className="mt-2 max-w-3xl text-[15px] font-medium leading-relaxed text-[#615d59]">
            Review submitted community events for your college, inspect organizer context, and decide whether each event moves to approved status.
          </p>
        </div>
      </header>

      <section className="rounded-[28px] border border-black/10 bg-white p-5 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
        <form className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px_auto]">
          <label className="flex items-center gap-3 rounded-2xl border border-black/10 bg-[#f6f5f4] px-4 py-3">
            <Search className="h-4 w-4 text-[#8a847d]" />
            <input
              type="search"
              name="q"
              defaultValue={q ?? ""}
              placeholder="Search by event title or organizer"
              className="w-full bg-transparent text-[14px] font-medium text-black/90 outline-none placeholder:text-[#8a847d]"
            />
          </label>

          <label className="flex items-center gap-3 rounded-2xl border border-black/10 bg-[#f6f5f4] px-4 py-3">
            <Filter className="h-4 w-4 text-[#8a847d]" />
            <select
              name="clubId"
              defaultValue={clubId ?? ""}
              className="w-full bg-transparent text-[14px] font-medium text-black/90 outline-none"
            >
              <option value="">All communities</option>
              {clubs.map((club: CommunityItem) => (
                <option key={club.id} value={club.id}>
                  {club.name}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-2xl bg-[#097fe8] px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#086dc6]"
          >
            Apply Filters
          </button>
        </form>
      </section>

      <section>
        {pendingEvents.length === 0 ? (
          <EmptyState
            title="No submitted events are waiting for review"
            description="When organizers submit new community events, they will appear here for college admin approval."
            actionLabel="Return to Admin Home"
            actionHref="/admin"
            icon={<CalendarClock className="h-7 w-7" />}
          />
        ) : (
          <div className="space-y-4">
            {pendingEvents.map((event: PendingEventItem) => {
              const deadlineBadge = getAdminDeadlineState({
                registrationClosesAt: event.registrationClosesAt,
                eventDate: event.date,
                now,
              });

              const regStatus = getRegistrationStatus({
                date: event.date,
                registrationClosesAt: event.registrationClosesAt,
                capacity: event.capacity,
                _count: { rsvps: 0 },
              });

              return (
                <article
                  key={event.id}
                  className="rounded-[24px] border border-black/10 bg-white p-5 shadow-[0_12px_30px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <EventStatusBadge status={event.status} />
                        <RegistrationStatusBadge status={regStatus} />
                        <span className="rounded-full border border-black/10 bg-[#f6f5f4] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#615d59]">
                          {event.club.name}
                        </span>
                        <span
                          className={`rounded-full border px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${deadlineBadge.className}`}
                        >
                          {deadlineBadge.label}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-[24px] font-bold tracking-tight text-black/95">{event.title}</h3>
                        <p className="mt-1 text-[14px] font-medium text-[#615d59]">
                          {event.location} • {formatDateTime(event.date)}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-[13px] font-medium text-[#615d59]">
                        <span>{event.capacity} seats</span>
                        <span>Submitted {formatDateTime(event.submittedAt ?? event.createdAt)}</span>
                        <span className="inline-flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {event.author.name ?? event.author.email ?? "Organizer"}
                        </span>
                      </div>

                      {/* Registration Deadline Alert Banner */}
                      {event.registrationClosesAt && (
                        <div className={`mt-3 flex items-center gap-2 rounded-xl border p-3 text-[13px] font-medium leading-normal ${
                          regStatus === "CLOSED_BY_DEADLINE"
                            ? "border-rose-100 bg-rose-50/50 text-rose-700"
                            : regStatus === "CLOSING_SOON"
                            ? "border-amber-100 bg-amber-50/50 text-amber-700 animate-pulse"
                            : "border-gray-100 bg-gray-50/50 text-gray-700"
                        }`}>
                          <CalendarClock className="h-4 w-4 shrink-0" />
                          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                            <span>
                              Registration deadline: <strong className="font-semibold">{formatRegistrationDeadline(event.registrationClosesAt)}</strong>
                            </span>
                            <span className="text-[11px] opacity-75 sm:border-l sm:border-current sm:pl-2">
                              ({deadlineBadge.label})
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-start lg:justify-end">
                      <Link
                        href={`/admin/events/${event.id}`}
                        className="inline-flex items-center justify-center rounded-2xl bg-[#097fe8] px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#086dc6]"
                      >
                        Review Event
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
