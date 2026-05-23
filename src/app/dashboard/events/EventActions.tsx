"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { api } from "@/trpc/react";

type EventStatus = "DRAFT" | "SUBMITTED" | "APPROVED" | "PUBLISHED" | "REJECTED" | "CANCELLED";

type EventActionsProps = {
  eventId: number;
  status: EventStatus;
  rejectionReason?: string | null;
};

export function EventActions({ eventId, status, rejectionReason }: EventActionsProps) {
  const router = useRouter();
  const utils = api.useUtils();

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

  const isBusy = deleteEvent.isPending || submitForReview.isPending || publishApproved.isPending;
  const canDelete = status === "DRAFT" || status === "REJECTED";

  return (
    <div className="flex flex-col items-stretch gap-2 md:items-end">
      {status === "DRAFT" ? (
        <button
          type="button"
          onClick={() => submitForReview.mutate({ id: eventId })}
          disabled={isBusy}
          className="inline-flex items-center justify-center rounded-xl bg-[#097fe8] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#086dc6] disabled:opacity-60"
        >
          {submitForReview.isPending ? "Submitting..." : "Submit for Review"}
        </button>
      ) : null}

      {status === "SUBMITTED" ? (
        <div className="rounded-xl border border-[#ddcaa7] bg-[#fff8ec] px-4 py-3 text-sm font-medium text-[#9a6500]">
          Waiting for college admin review
        </div>
      ) : null}

      {status === "APPROVED" ? (
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
        <div className="flex flex-wrap items-center justify-end gap-2">
          <span className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            Live for students
          </span>
          <Link
            href={`/dashboard/events/${eventId}`}
            className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black/85 transition-colors hover:bg-black/5"
          >
            View Attendees
          </Link>
        </div>
      ) : null}

      {status === "CANCELLED" ? (
        <div className="rounded-xl border border-black/10 bg-[#f6f5f4] px-4 py-3 text-sm font-medium text-[#615d59]">
          This event has been cancelled.
        </div>
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
