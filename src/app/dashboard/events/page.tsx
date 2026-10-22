import { formatPlatformDate } from "@/lib/platform-date";
import type { Prisma } from "@prisma/client";
import { CalendarClock, Filter, Plus, Search, Tag } from "lucide-react";
import Link from "next/link";

import { EmptyState } from "@/components/EmptyState";
import {
  EventStatusBadge,
  RegistrationStatusBadge,
} from "@/components/EventStatusBadge";
import {
  formatRegistrationDeadline,
  getOrganizerDeadlineState,
} from "@/lib/event-registration";
import { getRegistrationStatus } from "@/lib/event-status";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import {
  getManageableClubsForUser,
  isAdminUserRole,
} from "@/server/permissions/club-management";
import { EventActions } from "./EventActions";

const manageableClubRoles = ["OWNER", "EDITOR"] as const;
const eventTabs = [
  { key: "draft", label: "Draft", status: "DRAFT" },
  { key: "submitted", label: "Submitted", status: "SUBMITTED" },
  { key: "approved", label: "Approved", status: "APPROVED" },
  { key: "published", label: "Published", status: "PUBLISHED" },
  { key: "rejected", label: "Rejected", status: "REJECTED" },
  { key: "cancelled", label: "Cancelled", status: "CANCELLED" },
  { key: "past", label: "Past", status: null },
] as const;

type EventTabKey = (typeof eventTabs)[number]["key"];

function formatEventDate(date: Date) {
  return formatPlatformDate(date, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function parseActiveTab(rawTab: string | undefined): EventTabKey {
  return eventTabs.some((tab) => tab.key === rawTab)
    ? (rawTab as EventTabKey)
    : "draft";
}

function buildTabHref(tab: EventTabKey, query: string, clubId: string) {
  const searchParams = new URLSearchParams();
  searchParams.set("tab", tab);

  if (query) {
    searchParams.set("q", query);
  }

  if (clubId) {
    searchParams.set("clubId", clubId);
  }

  return `/dashboard/events?${searchParams.toString()}`;
}

function getEmptyStateCopy(activeTab: EventTabKey) {
  switch (activeTab) {
    case "submitted":
      return "No events are waiting for college admin review right now.";
    case "approved":
      return "No approved events are ready to publish yet.";
    case "published":
      return "No live upcoming events match this filter.";
    case "rejected":
      return "No rejected events need follow-up right now.";
    case "cancelled":
      return "No cancelled events are in this view.";
    case "past":
      return "No past events match this filter yet.";
    default:
      return "Create your first event draft to see it here.";
  }
}

type DashboardEventsPageProps = {
  searchParams: Promise<{
    tab?: string;
    q?: string;
    clubId?: string;
  }>;
};

export default async function DashboardEventsPage({
  searchParams,
}: DashboardEventsPageProps) {
  const session = await auth();
  const user = session?.user;
  const params = await searchParams;

  const activeTab = parseActiveTab(params.tab);
  const query = params.q?.trim() ?? "";
  const selectedClubId = params.clubId?.trim() ?? "";
  const parsedClubId = Number.parseInt(selectedClubId, 10);
  const hasClubFilter = Number.isInteger(parsedClubId) && parsedClubId > 0;
  const now = new Date();

  const manageableClubs = !user
    ? []
    : await getManageableClubsForUser({
        db,
        session: {
          user: {
            id: user.id,
            role: user.role,
            collegeId: user.collegeId,
          },
        },
      });

  const baseWhere: Prisma.EventWhereInput | undefined = !user
    ? undefined
    : isAdminUserRole(user.role) && user.collegeId
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
        };

  const statusConfig = eventTabs.find((tab) => tab.key === activeTab);
  const events = !baseWhere
    ? []
    : await db.event.findMany({
        where: {
          ...baseWhere,
          ...(query
            ? {
                OR: [
                  { title: { contains: query, mode: "insensitive" } },
                  { description: { contains: query, mode: "insensitive" } },
                  { location: { contains: query, mode: "insensitive" } },
                  { club: { name: { contains: query, mode: "insensitive" } } },
                ],
              }
            : {}),
          ...(hasClubFilter ? { clubId: parsedClubId } : {}),
          ...(activeTab === "past"
            ? {
                date: { lt: now },
                NOT: {
                  status: "CANCELLED",
                },
              }
            : {
                status: statusConfig?.status ?? "DRAFT",
                ...(statusConfig?.status === "CANCELLED"
                  ? {}
                  : { date: { gte: now } }),
              }),
        },
        include: {
          club: {
            select: {
              id: true,
              name: true,
            },
          },
          approvalLogs: {
            where: {
              action: "REJECTED",
            },
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
            select: {
              reason: true,
              createdAt: true,
            },
          },
          _count: {
            select: {
              rsvps: {
                where: {
                  status: {
                    in: ["GOING", "ATTENDED"] as ("GOING" | "ATTENDED")[],
                  },
                },
              },
            },
          },
        },
        orderBy:
          activeTab === "past"
            ? [{ date: "desc" }, { createdAt: "desc" }]
            : [{ date: "asc" }, { createdAt: "desc" }],
      });

  const tabCounts = !baseWhere
    ? {}
    : {
        draft: await db.event.count({
          where: { ...baseWhere, status: "DRAFT", date: { gte: now } },
        }),
        submitted: await db.event.count({
          where: { ...baseWhere, status: "SUBMITTED", date: { gte: now } },
        }),
        approved: await db.event.count({
          where: { ...baseWhere, status: "APPROVED", date: { gte: now } },
        }),
        published: await db.event.count({
          where: { ...baseWhere, status: "PUBLISHED", date: { gte: now } },
        }),
        rejected: await db.event.count({
          where: { ...baseWhere, status: "REJECTED", date: { gte: now } },
        }),
        cancelled: await db.event.count({
          where: { ...baseWhere, status: "CANCELLED" },
        }),
        past: await db.event.count({
          where: {
            ...baseWhere,
            date: { lt: now },
            NOT: {
              status: "CANCELLED",
            },
          },
        }),
      };

  return (
    <div className="flex flex-col gap-8 pb-32 md:pb-12">
      <header className="flex flex-col justify-between gap-4 px-1 md:flex-row md:items-end md:px-0">
        <div>
          <h1 className="text-page-title text-foreground mb-2">Events</h1>
          <p className="text-page-lead text-muted-foreground">
            Track every event through draft, review, approval, publication, and
            cancellation without leaving your dashboard.
          </p>
        </div>
        <Link
          href="/dashboard/events/new"
          className="bg-notion-blue inline-flex items-center justify-center gap-2 rounded-[12px] px-5 py-3 text-[15px] font-semibold text-white transition-all hover:bg-[var(--color-notion-blue-hover)] active:scale-95"
        >
          <Plus className="h-5 w-5" />
          Create Event
        </Link>
      </header>

      <section className="border-whisper bg-card-bg shadow-card rounded-[20px] px-4 py-4 transition-colors duration-300">
        <div className="flex flex-wrap gap-2">
          {eventTabs.map((tab) => {
            const isActive = tab.key === activeTab;
            const count = tabCounts[tab.key] ?? 0;
            return (
              <Link
                key={tab.key}
                href={buildTabHref(tab.key, query, selectedClubId)}
                className={`rounded-pill flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors active:scale-95 ${
                  isActive
                    ? "bg-notion-blue text-white"
                    : "border-whisper bg-app-bg text-muted-foreground hover:bg-card-bg hover:text-foreground border"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-badge rounded-full px-2 py-0.5 ${isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`}
                >
                  {count}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="text-micro text-muted-foreground mt-3 flex items-center gap-1.5 px-1">
          <span className="bg-notion-blue h-1.5 w-1.5 rounded-full"></span>
          <span>
            {activeTab === "draft" &&
              "Draft: Prepare event details. These are not visible to admins or students."}
            {activeTab === "submitted" &&
              "Submitted: Waiting for college admin approval. You cannot edit submitted events."}
            {activeTab === "approved" &&
              "Approved: Approved by college admin. Click 'Publish Event' to make it live for students!"}
            {activeTab === "published" &&
              "Published: Live on the campus feed. Students can register and RSVP."}
            {activeTab === "rejected" &&
              "Needs Changes: Admin requested updates. Check feedback below and resubmit."}
            {activeTab === "cancelled" &&
              "Cancelled: Event is cancelled. Students are notified and RSVP is closed."}
            {activeTab === "past" &&
              "Past: Historical events that have already started or completed."}
          </span>
        </div>

        <form
          className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_auto]"
          method="get"
        >
          <input type="hidden" name="tab" value={activeTab} />
          <label className="border-input bg-app-bg relative flex items-center rounded-[16px] border px-3 py-2 shadow-sm transition-colors">
            <Search className="text-muted-foreground h-4 w-4" />
            <input
              name="q"
              defaultValue={query}
              placeholder="Search title, location, description, or club"
              className="text-foreground placeholder:text-muted-foreground/50 w-full bg-transparent px-3 py-1 text-sm outline-none"
            />
          </label>

          <label className="border-input bg-app-bg flex items-center rounded-[16px] border px-3 py-2 shadow-sm transition-colors">
            <Filter className="text-muted-foreground h-4 w-4" />
            <select
              name="clubId"
              defaultValue={selectedClubId}
              className="text-foreground w-full bg-transparent px-3 py-1 text-sm outline-none"
            >
              <option value="">All managed communities</option>
              {manageableClubs.map((club) => (
                <option key={club.id} value={club.id}>
                  {club.name}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            className="border-input bg-card-bg text-foreground hover:bg-muted inline-flex min-h-[44px] items-center justify-center rounded-[16px] border px-4 py-2 text-sm font-semibold transition-colors"
          >
            Apply Filters
          </button>
        </form>
      </section>

      <section className="px-1 md:px-0">
        {events.length === 0 ? (
          <EmptyState
            title={`No ${activeTab} events`}
            description={getEmptyStateCopy(activeTab)}
            actionLabel="Create Event"
            actionHref="/dashboard/events/new"
            icon={<CalendarClock className="h-7 w-7" />}
          />
        ) : (
          <div className="space-y-4">
            {events.map((event) => {
              const isPast = event.date < now && event.status !== "CANCELLED";
              const registrationLabel = getOrganizerDeadlineState({
                status: event.status,
                date: event.date,
                registrationClosesAt: event.registrationClosesAt,
                now,
              });

              const regStatus = getRegistrationStatus({
                date: event.date,
                registrationClosesAt: event.registrationClosesAt,
                capacity: event.capacity,
                _count: event._count,
              });

              return (
                <article
                  key={event.id}
                  className="card-surface p-5 transition-colors duration-300"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <EventStatusBadge status={event.status} />
                        <RegistrationStatusBadge status={regStatus} />
                        {isPast ? (
                          <span className="text-badge rounded-pill border-whisper bg-app-bg text-muted-foreground px-3 py-1 uppercase transition-colors">
                            Past
                          </span>
                        ) : null}
                        <span className="text-badge text-muted-foreground inline-flex items-center gap-1 uppercase">
                          <Tag className="h-3.5 w-3.5" />
                          {event.club.name}
                        </span>
                      </div>

                      <div>
                        <h2 className="text-panel-title text-foreground">
                          {event.title}
                        </h2>
                        <p className="text-caption text-warm-gray mt-1">
                          {event.location} - {formatEventDate(event.date)}
                        </p>
                      </div>

                      <p className="text-caption-light text-warm-gray line-clamp-2 max-w-3xl">
                        {event.description}
                      </p>

                      <div className="text-caption text-warm-gray flex flex-wrap gap-x-4 gap-y-2">
                        <span className="flex items-center gap-1">
                          <strong>Capacity:</strong> {event.capacity} seats
                        </span>
                        <span className="flex items-center gap-1">
                          <strong>RSVPs:</strong> {event._count.rsvps} joined
                        </span>
                        <span>-</span>
                        <span>{event.category ?? "Uncategorized"}</span>
                        <span>-</span>
                        <span>{event.domain ?? "General"}</span>
                        {event.submittedAt ? (
                          <span className="border-status-warning-border bg-status-warning-surface text-orange rounded-md border px-2 py-0.5">
                            Submitted {formatEventDate(event.submittedAt)}
                          </span>
                        ) : null}
                        {event.cancelledAt ? (
                          <span className="border-status-danger-border bg-status-danger-surface text-danger rounded-md border px-2 py-0.5">
                            Cancelled {formatEventDate(event.cancelledAt)}
                          </span>
                        ) : null}
                      </div>

                      {event.registrationClosesAt && (
                        <div
                          className={`text-caption mt-3 flex items-center gap-2 rounded-xl border p-3 leading-normal ${
                            regStatus === "CLOSED_BY_DEADLINE"
                              ? "border-status-danger-border bg-status-danger-surface text-danger"
                              : regStatus === "CLOSING_SOON"
                                ? "border-status-warning-border bg-status-warning-surface text-orange motion-safe:animate-pulse"
                                : "border-whisper bg-muted text-muted-foreground"
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
                              ({registrationLabel})
                            </span>
                          </div>
                        </div>
                      )}

                      {event.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {event.tags.slice(0, 4).map((tag) => (
                            <span
                              key={`${event.id}-${tag}`}
                              className="text-badge rounded-pill border-whisper bg-app-bg text-muted-foreground px-3 py-1 transition-colors"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      {event.status === "REJECTED" &&
                      event.approvalLogs[0]?.reason ? (
                        <div className="border-status-warning-border bg-status-warning-surface text-warm-gray max-w-3xl rounded-[16px] border px-4 py-3 text-[13px] leading-relaxed">
                          <span className="text-foreground font-semibold">
                            Admin feedback:
                          </span>{" "}
                          {event.approvalLogs[0].reason}
                        </div>
                      ) : null}

                      {event.cancellationReason ? (
                        <div className="border-status-danger-border bg-status-danger-surface text-warm-gray max-w-3xl rounded-[16px] border px-4 py-3 text-[13px] leading-relaxed">
                          <span className="text-foreground font-semibold">
                            Cancellation reason:
                          </span>{" "}
                          {event.cancellationReason}
                        </div>
                      ) : null}
                    </div>

                    <div className="w-full md:w-auto md:min-w-[260px]">
                      <EventActions
                        eventId={event.id}
                        status={event.status}
                        eventDate={event.date}
                        registrationClosesAt={event.registrationClosesAt}
                        rejectionReason={event.approvalLogs[0]?.reason ?? null}
                        cancellationReason={event.cancellationReason}
                        isPast={isPast}
                      />
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
