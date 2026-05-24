"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
    <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
      <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#a39e98]">Admin Decision</p>
      {isReviewable ? (
        <div className="mt-4 space-y-4">
          <button
            type="button"
            onClick={() => approveEvent.mutate({ eventId })}
            disabled={approveEvent.isPending || rejectEvent.isPending || !canApprove}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-[#097fe8] px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#086dc6] disabled:opacity-60"
          >
            {approveEvent.isPending ? "Approving..." : "Approve Event"}
          </button>

          {approvalBlockedReason ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] font-medium leading-relaxed text-red-800">
              {approvalBlockedReason}
            </div>
          ) : null}

          <div className="rounded-2xl border border-black/10 bg-[#f6f5f4] p-4">
            <label className="block text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8a847d]">
              Rejection Reason
            </label>
            <textarea
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="Explain what must change before this event can be approved."
              className="mt-3 min-h-[120px] w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-[14px] font-medium text-black/90 outline-none focus:border-[#097fe8]"
            />
            <button
              type="button"
              onClick={() => rejectEvent.mutate({ eventId, reason })}
              disabled={approveEvent.isPending || rejectEvent.isPending || reason.trim().length < 10}
              className="mt-3 inline-flex w-full items-center justify-center rounded-2xl border border-[#e8503a]/15 bg-[#fff4f2] px-5 py-3 text-[14px] font-semibold text-[#e8503a] transition-colors hover:bg-[#ffe9e5] disabled:opacity-60"
            >
              {rejectEvent.isPending ? "Rejecting..." : "Reject Event"}
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-3 text-[14px] font-medium leading-relaxed text-[#615d59]">
          This event is currently <span className="font-semibold text-black/90">{status}</span>. Admin review actions are only available while an event is submitted.
        </p>
      )}
    </div>
  );
}
