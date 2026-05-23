import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock3, MapPin, Users } from "lucide-react";
import { TRPCError } from "@trpc/server";

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

  return (
    <div className="flex flex-col gap-8">
      <header className="space-y-4">
        <Link
          href="/admin/events"
          className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#615d59] transition-colors hover:text-black/90"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to pending reviews
        </Link>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[#ddcaa7] bg-[#fff8ec] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a6500]">
                {event.status}
              </span>
              <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#615d59]">
                {event.club.name}
              </span>
            </div>
            <div>
              <h2 className="text-[34px] font-bold tracking-[-1px] text-black/95 md:text-[40px]">{event.title}</h2>
              <p className="mt-2 max-w-3xl text-[15px] font-medium leading-relaxed text-[#615d59]">
                Review the full event details, check organizer and community context, and decide whether this event should move into the approved state.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
            <div className="relative aspect-[16/8] w-full bg-[#f6f5f4]">
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
                <div className="rounded-2xl border border-black/10 bg-[#f6f5f4] p-4">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8a847d]">Schedule</p>
                  <p className="mt-2 inline-flex items-center gap-2 text-[14px] font-semibold text-black/90">
                    <CalendarDays className="h-4 w-4 text-[#097fe8]" />
                    {formatDateTime(event.date)}
                  </p>
                </div>
                <div className="rounded-2xl border border-black/10 bg-[#f6f5f4] p-4">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8a847d]">Capacity</p>
                  <p className="mt-2 inline-flex items-center gap-2 text-[14px] font-semibold text-black/90">
                    <Users className="h-4 w-4 text-[#097fe8]" />
                    {event.capacity} seats
                  </p>
                </div>
                <div className="rounded-2xl border border-black/10 bg-[#f6f5f4] p-4">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8a847d]">Location</p>
                  <p className="mt-2 inline-flex items-center gap-2 text-[14px] font-semibold text-black/90">
                    <MapPin className="h-4 w-4 text-[#097fe8]" />
                    {event.location}
                  </p>
                </div>
                <div className="rounded-2xl border border-black/10 bg-[#f6f5f4] p-4">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8a847d]">Submitted</p>
                  <p className="mt-2 inline-flex items-center gap-2 text-[14px] font-semibold text-black/90">
                    <Clock3 className="h-4 w-4 text-[#097fe8]" />
                    {formatDateTime(event.submittedAt ?? event.createdAt)}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8a847d]">Description</p>
                <p className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-[#615d59]">{event.description}</p>
              </div>

              {latestRejection?.reason ? (
                <div className="mt-6 rounded-2xl border border-[#e8503a]/15 bg-[#fff4f2] p-4">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#e8503a]">Latest rejection reason</p>
                  <p className="mt-2 text-[14px] font-medium leading-relaxed text-[#8c372a]">{latestRejection.reason}</p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#a39e98]">Approval History</p>
            <div className="mt-4 space-y-4">
              {event.approvalLogs.length === 0 ? (
                <p className="text-[14px] font-medium text-[#615d59]">
                  No approval actions have been recorded for this event yet.
                </p>
              ) : (
                event.approvalLogs.map((log) => (
                  <div key={log.id} className="rounded-2xl border border-black/10 bg-[#f6f5f4] p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-[14px] font-semibold text-black/90">{log.action}</p>
                        <p className="mt-1 text-[13px] font-medium text-[#615d59]">
                          {log.actor.name ?? log.actor.email ?? "Administrator"}
                        </p>
                      </div>
                      <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8a847d]">
                        {formatDateTime(log.createdAt)}
                      </p>
                    </div>
                    {log.reason ? (
                      <p className="mt-3 text-[14px] leading-relaxed text-[#615d59]">{log.reason}</p>
                    ) : null}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#a39e98]">Organizer Context</p>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-black/10 bg-[#f6f5f4] p-4">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8a847d]">Organizer</p>
                <p className="mt-2 text-[15px] font-semibold text-black/90">{event.author.name ?? "Unnamed organizer"}</p>
                <p className="mt-1 text-[13px] font-medium text-[#615d59]">{event.author.email}</p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-[#f6f5f4] p-4">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8a847d]">Community</p>
                <p className="mt-2 text-[15px] font-semibold text-black/90">{event.club.name}</p>
              </div>
            </div>
          </div>

          <AdminReviewActions eventId={event.id} status={event.status} />
        </aside>
      </section>
    </div>
  );
}
