"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";

type AdminReviewActionsProps = {
  eventId: number;
  status: "DRAFT" | "SUBMITTED" | "APPROVED" | "PUBLISHED" | "REJECTED" | "CANCELLED";
  approvalBlockedReason?: string | null;
};

export function AdminReviewActions({
  eventId,
  status,
  approvalBlockedReason,
}: AdminReviewActionsProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const [reason, setReason] = useState("");

  const approveEvent = api.admin.approveEvent.useMutation({
    onSuccess: () => {
      toast.success("Event approved. The organizer can publish it now.");
      void utils.admin.getPendingEvents.invalidate();
      void utils.admin.getEventReviewDetail.invalidate({ eventId });
      void utils.admin.getApprovalHistory.invalidate({ eventId });
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const rejectEvent = api.admin.rejectEvent.useMutation({
    onSuccess: () => {
      toast.success("Event rejected with feedback for the organizer.");
      setReason("");
      void utils.admin.getPendingEvents.invalidate();
      void utils.admin.getEventReviewDetail.invalidate({ eventId });
      void utils.admin.getApprovalHistory.invalidate({ eventId });
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const isReviewable = status === "SUBMITTED";
  const canApprove = isReviewable && !approvalBlockedReason;

  return (
    <div className="card-surface p-6">
      <p className="text-eyebrow text-muted-foreground">Admin Decision</p>
      {isReviewable ? (
        <div className="mt-4 space-y-4">
          <Button
            onClick={() => approveEvent.mutate({ eventId })}
            disabled={approveEvent.isPending || rejectEvent.isPending || !canApprove}
            className="w-full"
          >
            {approveEvent.isPending ? "Approving..." : "Approve Event"}
          </Button>

          {approvalBlockedReason ? (
            <div className="alert-panel surface-status-danger text-caption">
              {approvalBlockedReason}
            </div>
          ) : null}

          <div className="rounded-[16px] border border-whisper bg-app-bg p-4">
            <label className="text-eyebrow block text-muted-foreground">
              Rejection Reason
            </label>
            <Textarea
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="Explain what must change before this event can be approved."
              className="mt-3 min-h-[120px] resize-none bg-card-bg text-foreground"
            />
            <Button
              onClick={() => rejectEvent.mutate({ eventId, reason })}
              variant="destructive"
              disabled={approveEvent.isPending || rejectEvent.isPending || reason.trim().length < 10}
              className="mt-3 w-full"
            >
              {rejectEvent.isPending ? "Rejecting..." : "Reject Event"}
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-caption mt-3 text-muted-foreground">
          This event is currently <span className="text-foreground">{status}</span>. Admin review actions are only available while an event is submitted.
        </p>
      )}
    </div>
  );
}
