"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { api } from "@/trpc/react";

const CANCEL_REASON_MIN_LENGTH = 10;

type EventStatus = "DRAFT" | "SUBMITTED" | "APPROVED" | "PUBLISHED" | "REJECTED" | "CANCELLED";

type EventActionsProps = {
  eventId: number;
  status: EventStatus;
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
  rejectionReason,
  cancellationReason,
  isPast = false,
}: EventActionsProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [cancelReason, setCancelReason] = useState(cancellationReason ?? "");

  const invalidateLists = () => {
    void utils.event.getOrganizerDrafts.invalidate();
    void utils.admin.getPendingEvents.invalidate();
  };

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
    cancelEvent.isPending;
  const canDelete = status === "DRAFT" || status === "REJECTED";
  const canSubmit = (status === "DRAFT" || status === "REJECTED") && !isPast;
  const canPublish = status === "APPROVED" && !isPast;
  const canCancel = status === "PUBLISHED" && !isPast;

  return (
    <div className="flex flex-col items-stretch gap-2 md:items-end">
      <Link
        href={`/dashboard/events/${eventId}/edit`}
        className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black/85 transition-colors hover:bg-black/5"
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
        <div className="rounded-xl border border-[#ddcaa7] bg-[#fff8ec] px-4 py-3 text-sm font-medium text-[#9a6500]">
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

      {status === "REJECTED" ? (
        <div className="rounded-xl border border-[#e8503a]/15 bg-[#fff4f2] px-4 py-3 text-sm font-medium text-[#8c372a]">
          {rejectionReason ? "Review admin feedback before recreating or replacing this event." : "This event was rejected by college admin review."}
        </div>
      ) : null}

      {status === "PUBLISHED" ? (
        <>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <span className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              {isPast ? "Past Event" : "Live for students"}
            </span>
            <Link
              href={`/dashboard/events/${eventId}`}
              className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black/85 transition-colors hover:bg-black/5"
            >
              View Attendees
            </Link>
          </div>
          {canCancel ? (
            showCancelForm ? (
              <div className="w-full space-y-2 rounded-xl border border-red-100 bg-red-50 p-3 text-left">
                <textarea
                  value={cancelReason}
                  onChange={(event) => setCancelReason(event.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-red-100 bg-white px-3 py-2 text-sm text-black/85 outline-none focus-visible:border-red-300"
                  placeholder="Explain why this event is being cancelled."
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCancelForm(false)}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-black/70 transition-colors hover:bg-black/5"
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
                className="inline-flex items-center justify-center rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100"
              >
                Cancel Event
              </button>
            )
          ) : null}
        </>
      ) : null}

      {status === "CANCELLED" ? (
        <>
          <div className="rounded-xl border border-black/10 bg-[#f6f5f4] px-4 py-3 text-sm font-medium text-[#615d59]">
            {cancellationReason ? `Cancelled: ${cancellationReason}` : "This event has been cancelled."}
          </div>
          <Link
            href={`/dashboard/events/${eventId}`}
            className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black/85 transition-colors hover:bg-black/5"
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
