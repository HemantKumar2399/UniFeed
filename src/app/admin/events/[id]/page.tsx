import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock3, MapPin, Users } from "lucide-react";
import { TRPCError } from "@trpc/server";

import { EventStatusBadge } from "@/components/EventStatusBadge";
import { formatRegistrationDeadline, getApprovalBlockedReason } from "@/lib/event-registration";
import { createCaller } from "@/server/api/root";
import { auth } from "@/server/auth";
import { db } from "@/server/db";

import { AdminReviewActions } from "./AdminReviewActions";

function formatDateTime(date: Date | null | undefined) {
  if (!date) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}



type AdminEventDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEventDetailPage({ params }: AdminEventDetailPageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  const { id } = await params;
  const eventId = Number.parseInt(id, 10);

  if (!Number.isInteger(eventId) || eventId <= 0) {
    notFound();
  }

  const caller = createCaller({
    db,
    session,
    headers: new Headers(),
  });

  let event;
  try {
    event = await caller.admin.getEventReviewDetail({ eventId });
  } catch (error) {
    if (error instanceof TRPCError && (error.code === "NOT_FOUND" || error.code === "FORBIDDEN")) {
      notFound();
    }

    throw error;
  }

  if (!event) {
    notFound();
  }

  const latestRejection = event.approvalLogs.find((log) => log.action === "REJECTED" && log.reason);
  const approvalBlockedReason = getApprovalBlockedReason({
    registrationClosesAt: event.registrationClosesAt,
    eventDate: event.date,
  });

  return (
    <div className="flex flex-col gap-8">
      <header className="space-y-4">
        <Link
          href="/admin/events"
          className="text-link-accent text-caption inline-flex items-center gap-2 transition-colors hover:opacity-80"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to pending reviews
        </Link>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <EventStatusBadge status={event.status} />
              <span className="text-badge rounded-full border border-whisper bg-card-bg px-3 py-1 uppercase text-muted-foreground">
                {event.club.name}
              </span>
            </div>
            <div>
              <h1 className="text-page-title text-foreground">{event.title}</h1>
              <p className="text-page-lead mt-2 max-w-3xl text-muted-foreground">
                Review the full event details, check organizer and community context, and decide whether this event should move into the approved state.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <div className="space-y-6">
          <div className="card-surface-featured overflow-hidden">
            <div className="relative aspect-[16/8] w-full bg-app-bg">
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                className="object-cover"
                sizes="(min-width: 1280px) 760px, 100vw"
              />
            </div>
            <div className="p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[16px] border border-whisper bg-app-bg p-4">
                  <p className="text-eyebrow text-muted-foreground">Schedule</p>
                  <p className="text-caption mt-2 inline-flex items-center gap-2 text-foreground">
                    <CalendarDays className="text-link-accent h-4 w-4" />
                    {formatDateTime(event.date)}
                  </p>
                </div>
                <div className="rounded-[16px] border border-whisper bg-app-bg p-4">
                  <p className="text-eyebrow text-muted-foreground">Capacity</p>
                  <p className="text-caption mt-2 inline-flex items-center gap-2 text-foreground">
                    <Users className="text-link-accent h-4 w-4" />
                    {event.capacity} seats
                  </p>
                </div>
                <div className="rounded-[16px] border border-whisper bg-app-bg p-4">
                  <p className="text-eyebrow text-muted-foreground">Location</p>
                  <p className="text-caption mt-2 inline-flex items-center gap-2 text-foreground">
                    <MapPin className="text-link-accent h-4 w-4" />
                    {event.location}
                  </p>
                </div>
                <div className="rounded-[16px] border border-whisper bg-app-bg p-4">
                  <p className="text-eyebrow text-muted-foreground">Submitted</p>
                  <p className="text-caption mt-2 inline-flex items-center gap-2 text-foreground">
                    <Clock3 className="text-link-accent h-4 w-4" />
                    {formatDateTime(event.submittedAt ?? event.createdAt)}
                  </p>
                </div>
                <div className="rounded-[16px] border border-whisper bg-app-bg p-4 md:col-span-2">
                  <p className="text-eyebrow text-muted-foreground">Registration closes</p>
                  <p className="text-caption mt-2 text-foreground">
                    {formatRegistrationDeadline(event.registrationClosesAt)}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-eyebrow text-muted-foreground">Description</p>
                <p className="text-page-lead mt-3 whitespace-pre-wrap text-muted-foreground">{event.description}</p>
              </div>

              {approvalBlockedReason ? (
                <div className="alert-panel surface-status-danger mt-6">
                  <p className="text-eyebrow">Approval blocked</p>
                  <p className="text-caption mt-2">{approvalBlockedReason}</p>
                </div>
              ) : null}

              {latestRejection?.reason ? (
                <div className="alert-panel surface-status-warning mt-6">
                  <p className="text-eyebrow">Latest rejection reason</p>
                  <p className="text-caption mt-2">{latestRejection.reason}</p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="card-surface p-6">
            <p className="text-eyebrow text-muted-foreground">Approval History</p>
            <div className="mt-4 space-y-4">
              {event.approvalLogs.length === 0 ? (
                <p className="text-caption text-muted-foreground">
                  No approval actions have been recorded for this event yet.
                </p>
              ) : (
                event.approvalLogs.map((log) => (
                  <div key={log.id} className="rounded-[16px] border border-whisper bg-app-bg p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-nav text-foreground">{log.action}</p>
                        <p className="text-caption mt-1 text-muted-foreground">
                          {log.actor.name ?? log.actor.email ?? "Administrator"}
                        </p>
                      </div>
                      <p className="text-eyebrow text-muted-foreground">
                        {formatDateTime(log.createdAt)}
                      </p>
                    </div>
                    {log.reason ? (
                      <p className="text-caption mt-3 text-muted-foreground">{log.reason}</p>
                    ) : null}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card-surface p-6">
            <p className="text-eyebrow text-muted-foreground">Organizer Context</p>
            <div className="mt-4 space-y-3">
              <div className="rounded-[16px] border border-whisper bg-app-bg p-4">
                <p className="text-eyebrow text-muted-foreground">Organizer</p>
                <p className="text-nav mt-2 text-foreground">{event.author.name ?? "Unnamed organizer"}</p>
                <p className="text-caption mt-1 text-muted-foreground">{event.author.email}</p>
              </div>
              <div className="rounded-[16px] border border-whisper bg-app-bg p-4">
                <p className="text-eyebrow text-muted-foreground">Community</p>
                <p className="text-nav mt-2 text-foreground">{event.club.name}</p>
              </div>
            </div>
          </div>

          <AdminReviewActions
            eventId={event.id}
            status={event.status}
            approvalBlockedReason={approvalBlockedReason}
          />
        </aside>
      </section>
    </div>
  );
}
