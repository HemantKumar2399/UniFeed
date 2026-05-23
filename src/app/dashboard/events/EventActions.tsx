"use client";

import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

type EventStatus = "DRAFT" | "SUBMITTED" | "APPROVED" | "PUBLISHED" | "REJECTED" | "CANCELLED";

export function EventActions({ eventId, status }: { eventId: number, status: EventStatus }) {
  const router = useRouter();
  const utils = api.useUtils();
  const deleteEvent = api.event.delete.useMutation({
    onSuccess: () => {
      toast.success("Event deleted");
      void utils.event.getOrganizerDrafts.invalidate();
      router.refresh();
    },
    onError: (err) => toast.error(err.message),
  });

  const updateStatus = api.event.updateStatus.useMutation({
    onSuccess: () => {
      toast.success(`Event marked as ${status === "DRAFT" ? "PUBLISHED" : "DRAFT"}`);
      void utils.event.getOrganizerDrafts.invalidate();
      router.refresh();
    },
    onError: (err) => toast.error(err.message),
  });

  const canTogglePublish = status === "DRAFT" || status === "PUBLISHED";

  return (
    <div className="flex items-center justify-end gap-3">
      {canTogglePublish ? (
        <button 
          onClick={() => updateStatus.mutate({ id: eventId, status: status === "DRAFT" ? "PUBLISHED" : "DRAFT" })}
          className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
          disabled={updateStatus.isPending}
        >
          {updateStatus.isPending ? "Updating..." : status === "DRAFT" ? "Publish" : "Unpublish"}
        </button>
      ) : null}
      <Link href={`/dashboard/events/${eventId}/edit`} className="text-sm text-blue-600 hover:text-blue-900">
        Edit
      </Link>
      <button 
        onClick={() => {
          if (confirm("Are you sure you want to delete this event?")) {
            deleteEvent.mutate({ id: eventId });
          }
        }}
        className="text-sm font-medium text-rose-600 hover:text-rose-900"
        disabled={deleteEvent.isPending}
      >
        {deleteEvent.isPending ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
