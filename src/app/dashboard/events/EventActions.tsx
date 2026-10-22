"use client";

import {
  PLATFORM_TIME_ZONE,
  toLocalDateTime,
  toDateInputValue,
  toTimeInputValue,
} from "@/lib/platform-date";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  formatRegistrationDeadline,
  isRegistrationReopenable,
} from "@/lib/event-registration";
import { api } from "@/trpc/react";

const CANCEL_REASON_MIN_LENGTH = 10;

type EventStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "APPROVED"
  | "PUBLISHED"
  | "REJECTED"
  | "CANCELLED";

type EventActionsProps = {
  eventId: number;
  status: EventStatus;
  eventDate: Date;
  registrationClosesAt: Date | null;
  rejectionReason?: string | null;
  cancellationReason?: string | null;
  isPast?: boolean;
};

function getEditLabel(status: EventStatus) {
  switch (status) {
    case "DRAFT":
      return "Edit Draft";
    case "REJECTED":
      return "Revise Event";
    case "SUBMITTED":
      return "View Submission";
    case "APPROVED":
      return "Open Approval";
    case "PUBLISHED":
      return "View Event";
    case "CANCELLED":
      return "View Record";
  }
}

export function EventActions({
  eventId,
  status,
  eventDate,
  registrationClosesAt,
  rejectionReason,
  cancellationReason,
  isPast = false,
}: EventActionsProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [showExtendForm, setShowExtendForm] = useState(false);
  const [cancelReason, setCancelReason] = useState(cancellationReason ?? "");
  const [registrationCloseDate, setRegistrationCloseDate] = useState(
    registrationClosesAt ? toDateInputValue(registrationClosesAt) : "",
  );
  const [registrationCloseTime, setRegistrationCloseTime] = useState(
    registrationClosesAt ? toTimeInputValue(registrationClosesAt) : "",
  );

  const invalidateLists = () => {
    void utils.event.getOrganizerDrafts.invalidate();
    void utils.admin.getPendingEvents.invalidate();
    void utils.event.getFeed.invalidate();
    void utils.event.getHappeningThisWeek.invalidate();
  };

  const extendRegistrationDeadline =
    api.event.extendRegistrationDeadline.useMutation({
      onSuccess: () => {
        toast.success("Registration deadline updated.");
        setShowExtendForm(false);
        invalidateLists();
        router.refresh();
      },
      onError: (err) => {
        toast.error(err.message || "Failed to update registration deadline.");
      },
    });

  const deleteEvent = api.event.delete.useMutation({
    onSuccess: () => {
      toast.success("Event deleted");
      invalidateLists();
      router.refresh();
    },
    onError: (err) => toast.error(err.message),
  });

  const submitForReview = api.event.submitForReview.useMutation({
    onSuccess: () => {
      toast.success("Event submitted for college admin review");
      invalidateLists();
      router.refresh();
    },
    onError: (err) => toast.error(err.message),
  });

  const publishApproved = api.event.publishApproved.useMutation({
    onSuccess: () => {
      toast.success("Approved event is now live for students");
      invalidateLists();
      router.refresh();
    },
    onError: (err) => toast.error(err.message),
  });

  const cancelEvent = api.event.cancel.useMutation({
    onSuccess: () => {
      toast.success("Event cancelled successfully");
      setShowCancelForm(false);
      invalidateLists();
      router.push("/dashboard/events?tab=cancelled");
      router.refresh();
    },
    onError: (err) => {
      toast.error(err.message || "Failed to cancel event. Please try again.");
    },
  });

  const isBusy =
    deleteEvent.isPending ||
    submitForReview.isPending ||
    publishApproved.isPending ||
    cancelEvent.isPending ||
    extendRegistrationDeadline.isPending;
  const canDelete = status === "DRAFT" || status === "REJECTED";
  const canSubmit = (status === "DRAFT" || status === "REJECTED") && !isPast;
  const canPublish = status === "APPROVED" && !isPast;
  const canCancel = status === "PUBLISHED" && !isPast;
  const canExtendRegistration = isRegistrationReopenable({
    status,
    date: eventDate,
  });

  const handleExtendRegistration = () => {
    const nextDeadline = toLocalDateTime(
      registrationCloseDate,
      registrationCloseTime,
    );

    if (Number.isNaN(nextDeadline.getTime())) {
      toast.error(
        `Enter a valid, unambiguous registration deadline in ${PLATFORM_TIME_ZONE}.`,
      );
      return;
    }

    extendRegistrationDeadline.mutate({
      id: eventId,
      registrationClosesAt: nextDeadline,
    });
  };

  return (
    <div className="flex flex-col items-stretch gap-2 md:items-end">
      <Button asChild variant="outline">
        <Link href={`/dashboard/events/${eventId}/edit`}>
          {getEditLabel(status)}
        </Link>
      </Button>

      {canSubmit ? (
        <Button
          onClick={() => submitForReview.mutate({ id: eventId })}
          disabled={isBusy}
        >
          {submitForReview.isPending
            ? "Submitting..."
            : status === "REJECTED"
              ? "Resubmit for Review"
              : "Submit for Review"}
        </Button>
      ) : null}

      {status === "SUBMITTED" ? (
        <div className="alert-panel surface-status-warning text-caption">
          Waiting for college admin review
        </div>
      ) : null}

      {canPublish ? (
        <Button
          onClick={() => publishApproved.mutate({ id: eventId })}
          disabled={isBusy}
        >
          {publishApproved.isPending ? "Publishing..." : "Publish Event"}
        </Button>
      ) : null}

      {canExtendRegistration ? (
        showExtendForm ? (
          <div className="border-brand-border bg-brand-surface w-full space-y-2 rounded-[16px] border p-3 text-left">
            <p className="text-caption text-notion-blue">
              Current deadline:{" "}
              {formatRegistrationDeadline(registrationClosesAt)} (
              {PLATFORM_TIME_ZONE})
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              <input
                value={registrationCloseDate}
                onChange={(event) =>
                  setRegistrationCloseDate(event.target.value)
                }
                type="date"
                className="border-input bg-card-bg text-foreground w-full rounded-[12px] border px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-blue)]"
              />
              <input
                value={registrationCloseTime}
                onChange={(event) =>
                  setRegistrationCloseTime(event.target.value)
                }
                type="time"
                className="border-input bg-card-bg text-foreground w-full rounded-[12px] border px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-blue)]"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowExtendForm(false)}
              >
                Keep Current
              </Button>
              <Button
                type="button"
                size="sm"
                disabled={isBusy}
                onClick={handleExtendRegistration}
              >
                {extendRegistrationDeadline.isPending
                  ? "Updating..."
                  : "Extend Registration"}
              </Button>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => setShowExtendForm(true)}
            variant="outline"
            className="border-brand-border bg-brand-surface text-notion-blue hover:bg-brand-surface/80"
          >
            Reopen / Extend Registration
          </Button>
        )
      ) : null}

      {status === "REJECTED" ? (
        <div className="alert-panel surface-status-danger text-caption">
          {rejectionReason
            ? "Review admin feedback before recreating or replacing this event."
            : "This event was rejected by college admin review."}
        </div>
      ) : null}

      {status === "PUBLISHED" ? (
        <>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <span
              className={`inline-flex items-center justify-center rounded-[12px] border px-4 py-2 text-sm font-semibold ${
                isPast
                  ? "border-whisper bg-app-bg text-muted-foreground"
                  : "border-status-success-border bg-status-success-surface text-green"
              }`}
            >
              {isPast ? "Past Event" : "Live for students"}
            </span>
            <Button asChild variant="outline">
              <Link href={`/dashboard/events/${eventId}`}>View Attendees</Link>
            </Button>
          </div>
          {canCancel ? (
            showCancelForm ? (
              <div className="border-status-danger-border bg-status-danger-surface w-full space-y-2 rounded-[16px] border p-3 text-left">
                <Textarea
                  value={cancelReason}
                  onChange={(event) => setCancelReason(event.target.value)}
                  rows={3}
                  className="bg-card-bg text-foreground"
                  placeholder="Explain why this event is being cancelled."
                />
                <div className="flex items-center justify-end gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCancelForm(false)}
                  >
                    Keep Live
                  </Button>
                  <Button
                    disabled={isBusy}
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      const trimmed = cancelReason.trim();
                      if (trimmed.length < CANCEL_REASON_MIN_LENGTH) {
                        toast.error(
                          `Please enter a cancellation reason with at least ${CANCEL_REASON_MIN_LENGTH} characters.`,
                        );
                        return;
                      }
                      cancelEvent.mutate({ id: eventId, reason: trimmed });
                    }}
                  >
                    {cancelEvent.isPending ? "Cancelling..." : "Confirm Cancel"}
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                type="button"
                onClick={() => setShowCancelForm(true)}
                variant="destructive"
              >
                Cancel Event
              </Button>
            )
          ) : null}
        </>
      ) : null}

      {status === "CANCELLED" ? (
        <>
          <div className="border-whisper bg-app-bg text-muted-foreground rounded-[12px] border px-4 py-3 text-sm font-medium">
            {cancellationReason
              ? `Cancelled: ${cancellationReason}`
              : "This event has been cancelled."}
          </div>
          <Button asChild variant="outline">
            <Link href={`/dashboard/events/${eventId}`}>View Attendees</Link>
          </Button>
        </>
      ) : null}

      {canDelete ? (
        <button
          type="button"
          onClick={() => {
            if (confirm("Are you sure you want to delete this event?")) {
              deleteEvent.mutate({ id: eventId });
            }
          }}
          className="text-danger hover:text-danger/80 text-sm font-medium transition-colors disabled:opacity-60"
          disabled={isBusy}
        >
          {deleteEvent.isPending ? "Deleting..." : "Delete Event"}
        </button>
      ) : null}
    </div>
  );
}
