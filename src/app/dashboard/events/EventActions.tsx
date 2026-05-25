"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { formatRegistrationDeadline, isRegistrationReopenable } from "@/lib/event-registration";
import { api } from "@/trpc/react";

const CANCEL_REASON_MIN_LENGTH = 10;

type EventStatus = "DRAFT" | "SUBMITTED" | "APPROVED" | "PUBLISHED" | "REJECTED" | "CANCELLED";

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

  const extendRegistrationDeadline = api.event.extendRegistrationDeadline.useMutation({
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
    const nextDeadline = toLocalDateTime(registrationCloseDate, registrationCloseTime);

    if (Number.isNaN(nextDeadline.getTime())) {
      toast.error("Enter a valid registration deadline.");
      return;
    }

    extendRegistrationDeadline.mutate({
      id: eventId,
      registrationClosesAt: nextDeadline,
    });
  };

  return (
    <div className="flex flex-col items-stretch gap-2 md:items-end">
      <Link
        href={`/dashboard/events/${eventId}/edit`}
        className="inline-flex items-center justify-center rounded-xl border border-input bg-card-bg px-4 py-2 text-sm font-semibold text-foreground/85 transition-colors hover:bg-muted"
      >
        {getEditLabel(status)}
      </Link>

      {canSubmit ? (
        <button
          type="button"
          onClick={() => submitForReview.mutate({ id: eventId })}
          disabled={isBusy}
          className="inline-flex items-center justify-center rounded-xl bg-[#097fe8] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#086dc6] disabled:opacity-60"
        >
          {submitForReview.isPending
            ? "Submitting..."
            : status === "REJECTED"
              ? "Resubmit for Review"
              : "Submit for Review"}
        </button>
      ) : null}

      {status === "SUBMITTED" ? (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm font-medium text-amber-600">
          Waiting for college admin review
        </div>
      ) : null}

      {canPublish ? (
        <button
          type="button"
          onClick={() => publishApproved.mutate({ id: eventId })}
          disabled={isBusy}
          className="inline-flex items-center justify-center rounded-xl bg-[#097fe8] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#086dc6] disabled:opacity-60"
        >
          {publishApproved.isPending ? "Publishing..." : "Publish Event"}
        </button>
      ) : null}

      {canExtendRegistration ? (
        showExtendForm ? (
          <div className="w-full space-y-2 rounded-xl border border-blue-500/20 bg-blue-500/10 p-3 text-left">
            <p className="text-sm font-medium text-blue-500">
              Current deadline: {formatRegistrationDeadline(registrationClosesAt)}
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              <input
                value={registrationCloseDate}
                onChange={(event) => setRegistrationCloseDate(event.target.value)}
                type="date"
                className="w-full rounded-lg border border-blue-500/20 bg-card-bg px-3 py-2 text-sm text-foreground outline-none focus-visible:border-blue-400"
              />
              <input
                value={registrationCloseTime}
                onChange={(event) => setRegistrationCloseTime(event.target.value)}
                type="time"
                className="w-full rounded-lg border border-blue-500/20 bg-card-bg px-3 py-2 text-sm text-foreground outline-none focus-visible:border-blue-400"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowExtendForm(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-muted"
              >
                Keep Current
              </button>
              <button
                type="button"
                disabled={isBusy}
                onClick={handleExtendRegistration}
                className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
              >
                {extendRegistrationDeadline.isPending ? "Updating..." : "Extend Registration"}
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowExtendForm(true)}
            className="inline-flex items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-500 transition-colors hover:bg-blue-500/20"
          >
            Reopen / Extend Registration
          </button>
        )
      ) : null}

      {status === "REJECTED" ? (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-500">
          {rejectionReason ? "Review admin feedback before recreating or replacing this event." : "This event was rejected by college admin review."}
        </div>
      ) : null}

      {status === "PUBLISHED" ? (
        <>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <span className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-500">
              {isPast ? "Past Event" : "Live for students"}
            </span>
            <Link
              href={`/dashboard/events/${eventId}`}
              className="inline-flex items-center justify-center rounded-xl border border-input bg-card-bg px-4 py-2 text-sm font-semibold text-foreground/85 transition-colors hover:bg-muted"
            >
              View Attendees
            </Link>
          </div>
          {canCancel ? (
            showCancelForm ? (
              <div className="w-full space-y-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-left">
                <textarea
                  value={cancelReason}
                  onChange={(event) => setCancelReason(event.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-red-500/20 bg-card-bg px-3 py-2 text-sm text-foreground outline-none focus-visible:border-red-400"
                  placeholder="Explain why this event is being cancelled."
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCancelForm(false)}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-muted"
                  >
                    Keep Live
                  </button>
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() => {
                      const trimmed = cancelReason.trim();
                      if (trimmed.length < CANCEL_REASON_MIN_LENGTH) {
                        toast.error(`Please enter a cancellation reason with at least ${CANCEL_REASON_MIN_LENGTH} characters.`);
                        return;
                      }
                      cancelEvent.mutate({ id: eventId, reason: trimmed });
                    }}
                    className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-60"
                  >
                    {cancelEvent.isPending ? "Cancelling..." : "Confirm Cancel"}
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowCancelForm(true)}
                className="inline-flex items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-500 transition-colors hover:bg-red-500/20"
              >
                Cancel Event
              </button>
            )
          ) : null}
        </>
      ) : null}

      {status === "CANCELLED" ? (
        <>
          <div className="rounded-xl border border-whisper bg-muted px-4 py-3 text-sm font-medium text-muted-foreground">
            {cancellationReason ? `Cancelled: ${cancellationReason}` : "This event has been cancelled."}
          </div>
          <Link
            href={`/dashboard/events/${eventId}`}
            className="inline-flex items-center justify-center rounded-xl border border-input bg-card-bg px-4 py-2 text-sm font-semibold text-foreground/85 transition-colors hover:bg-muted"
          >
            View Attendees
          </Link>
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
          className="text-sm font-medium text-rose-600 hover:text-rose-900 disabled:opacity-60"
          disabled={isBusy}
        >
          {deleteEvent.isPending ? "Deleting..." : "Delete Event"}
        </button>
      ) : null}
    </div>
  );
}

function toDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toTimeInputValue(date: Date): string {
  const hours = `${date.getHours()}`.padStart(2, "0");
  const minutes = `${date.getMinutes()}`.padStart(2, "0");
  return `${hours}:${minutes}`;
}

function toLocalDateTime(dateValue: string, timeValue: string): Date {
  const [year = Number.NaN, month = Number.NaN, day = Number.NaN] = dateValue.split("-").map(Number);
  const [hours = Number.NaN, minutes = Number.NaN] = timeValue.split(":").map(Number);

  if (
    !Number.isFinite(year) ||
    !Number.isFinite(month) ||
    !Number.isFinite(day) ||
    !Number.isFinite(hours) ||
    !Number.isFinite(minutes)
  ) {
    return new Date(Number.NaN);
  }

  return new Date(year, month - 1, day, hours, minutes, 0);
}
