import { formatPlatformDate } from "@/lib/platform-date";
import { CalendarClock, Filter, Search, Users } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { EmptyState } from "@/components/EmptyState";
import {
  EventStatusBadge,
  RegistrationStatusBadge,
} from "@/components/EventStatusBadge";
import {
  formatRegistrationDeadline,
  getAdminDeadlineState,
} from "@/lib/event-registration";
import { getRegistrationStatus } from "@/lib/event-status";
import { createCaller } from "@/server/api/root";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { type RouterOutputs } from "@/trpc/react";

function formatDateTime(date: Date | null | undefined) {
  if (!date) {
    return "Not submitted yet";
  }

  return formatPlatformDate(date, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

type AdminEventsPageProps = {
  searchParams: Promise<{
    q?: string;
    clubId?: string;
  }>;
};

type CommunityItem = RouterOutputs["admin"]["getCollegeCommunities"][number];
type PendingEventItem = RouterOutputs["admin"]["getPendingEvents"][number];

export default async function AdminEventsPage({
  searchParams,
}: AdminEventsPageProps) {
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
      ...(parsedClubId && Number.isInteger(parsedClubId)
        ? { clubId: parsedClubId }
        : {}),
    }),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <div>
          <p className="text-eyebrow text-muted-foreground">Approval Queue</p>
          <h1 className="text-page-title text-foreground mt-1">
            Pending event reviews
          </h1>
          <p className="text-page-lead text-muted-foreground mt-2 max-w-3xl">
            Review submitted community events for your college, inspect
            organizer context, and decide whether each event moves to approved
            status.
          </p>
        </div>
      </header>

      <section className="card-surface p-5">
        <form className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px_auto]">
          <label className="border-input bg-app-bg flex items-center gap-3 rounded-2xl border px-4 py-3">
            <Search className="text-muted-foreground h-4 w-4" />
            <input
              type="search"
              name="q"
              defaultValue={q ?? ""}
              placeholder="Search by event title or organizer"
              className="text-foreground placeholder:text-muted-foreground w-full bg-transparent text-[14px] font-medium outline-none"
            />
          </label>

          <label className="border-input bg-app-bg flex items-center gap-3 rounded-2xl border px-4 py-3">
            <Filter className="text-muted-foreground h-4 w-4" />
            <select
              name="clubId"
              defaultValue={clubId ?? ""}
              className="text-foreground w-full bg-transparent text-[14px] font-medium outline-none"
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
            className="bg-notion-blue inline-flex items-center justify-center rounded-2xl px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[var(--color-notion-blue-hover)]"
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
                <article key={event.id} className="card-surface p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <EventStatusBadge status={event.status} />
                        <RegistrationStatusBadge status={regStatus} />
                        <span className="text-badge border-whisper bg-app-bg text-muted-foreground rounded-full border px-3.5 py-1 uppercase">
                          {event.club.name}
                        </span>
                        <span
                          className={`text-badge rounded-full border px-3.5 py-1 uppercase ${deadlineBadge.className}`}
                        >
                          {deadlineBadge.label}
                        </span>
                      </div>

                      <div>
                        <h2 className="text-panel-title text-foreground">
                          {event.title}
                        </h2>
                        <p className="text-caption text-muted-foreground mt-1">
                          {event.location} - {formatDateTime(event.date)}
                        </p>
                      </div>

                      <div className="text-caption text-muted-foreground flex flex-wrap items-center gap-4">
                        <span>{event.capacity} seats</span>
                        <span>
                          Submitted{" "}
                          {formatDateTime(event.submittedAt ?? event.createdAt)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {event.author.name ??
                            event.author.email ??
                            "Organizer"}
                        </span>
                      </div>

                      {event.registrationClosesAt && (
                        <div
                          className={`text-caption mt-3 flex items-center gap-2 rounded-xl border p-3 leading-normal ${
                            regStatus === "CLOSED_BY_DEADLINE"
                              ? "border-status-danger-border bg-status-danger-surface text-danger"
                              : regStatus === "CLOSING_SOON"
                                ? "border-status-warning-border bg-status-warning-surface text-orange motion-safe:animate-pulse"
                                : "border-whisper bg-app-bg text-muted-foreground"
                          }`}
                        >
                          <CalendarClock className="h-4 w-4 shrink-0" />
                          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                            <span>
                              Registration deadline:{" "}
                              <strong>
                                {formatRegistrationDeadline(
                                  event.registrationClosesAt,
                                )}
                              </strong>
                            </span>
                            <span className="text-micro opacity-75 sm:border-l sm:border-current sm:pl-2">
                              ({deadlineBadge.label})
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-start lg:justify-end">
                      <Link
                        href={`/admin/events/${event.id}`}
                        className="bg-notion-blue inline-flex items-center justify-center rounded-2xl px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[var(--color-notion-blue-hover)]"
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
