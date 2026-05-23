import { TRPCError } from "@trpc/server";
import { notFound, redirect } from "next/navigation";

import { buildEventEditorDraft } from "@/features/events/event-editor.utils";
import {
  EVENT_CATEGORY_OPTIONS,
  EVENT_DOMAIN_OPTIONS,
} from "@/features/events/event-metadata";
import { EventEditor } from "@/features/events/components/EventEditor";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { assertCanManageEvent } from "@/server/permissions/club-management";

type EditEventPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditEventPage({ params }: EditEventPageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { id: rawId } = await params;
  const id = parseInt(rawId, 10);
  if (isNaN(id)) {
    notFound();
  }

  try {
    await assertCanManageEvent(
      {
        db,
        session: {
          user: {
            id: session.user.id,
            role: session.user.role,
            collegeId: session.user.collegeId,
          },
        },
      },
      id,
      {
        forbiddenMessage: "You cannot manage this event.",
      },
    );
  } catch (error) {
    if (error instanceof TRPCError && error.code === "NOT_FOUND") {
      notFound();
    }

    redirect("/unauthorized");
  }

  const event = await db.event.findUnique({
    where: { id },
    include: {
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
        },
      },
    },
  });

  if (!event) {
    notFound();
  }

  const category = EVENT_CATEGORY_OPTIONS.includes(event.category as (typeof EVENT_CATEGORY_OPTIONS)[number])
    ? (event.category as (typeof EVENT_CATEGORY_OPTIONS)[number])
    : "Academic";
  const domain = EVENT_DOMAIN_OPTIONS.includes(event.domain as (typeof EVENT_DOMAIN_OPTIONS)[number])
    ? (event.domain as (typeof EVENT_DOMAIN_OPTIONS)[number])
    : "Campus Life";

  const initialDraft = buildEventEditorDraft({
    clubId: event.clubId,
    title: event.title,
    description: event.description,
    date: event.date,
    location: event.location,
    imageUrl: event.imageUrl,
    capacity: event.capacity,
    category,
    tags: event.tags,
    domain,
    isFreeFood: event.isFreeFood,
    hasCertificate: event.hasCertificate,
    isPaid: event.isPaid,
    targetBranches: event.targetBranches,
  });

  return (
    <EventEditor
      mode="edit"
      eventId={event.id}
      initialDraft={initialDraft}
      eventStatus={event.status}
      submittedAt={event.submittedAt?.toISOString() ?? null}
      latestRejectionReason={event.approvalLogs[0]?.reason ?? null}
      cancellationReason={event.cancellationReason}
    />
  );
}
