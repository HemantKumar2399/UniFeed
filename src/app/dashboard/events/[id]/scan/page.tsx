"use client";

import { use, useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ScanLine } from "lucide-react";

import { ManualCheckInFallback } from "@/components/ManualCheckInFallback";
import { Scanner } from "@/components/Scanner";
import { api } from "@/trpc/react";

export default function EventScanModePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const eventId = Number.parseInt(resolvedParams.id, 10);
  const isValidEventId = Number.isInteger(eventId) && eventId > 0;

  const utils = api.useUtils();
  const [flash, setFlash] = useState<"idle" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("Scanner ready");

  const { data: attendees } = api.event.getAttendees.useQuery(
    { eventId },
    { enabled: isValidEventId },
  );

  const redeemTicket = api.event.redeemTicket.useMutation({
    onSuccess: async (result) => {
      setFlash("success");
      setFeedbackMessage(`Checked in: ${result.attendeeName}`);
      await utils.event.getAttendees.invalidate({ eventId });
      window.setTimeout(() => setFlash("idle"), 250);
    },
    onError: (error) => {
      setFlash("error");
      setFeedbackMessage(error.message);
      window.setTimeout(() => setFlash("idle"), 320);
    },
  });

  const handleDetected = useCallback(
    (token: string) => {
      if (!isValidEventId || redeemTicket.isPending) {
        return;
      }
      redeemTicket.mutate({ eventId, token });
    },
    [eventId, isValidEventId, redeemTicket],
  );

  const checkedInCount = useMemo(
    () => (attendees ?? []).filter((attendee) => attendee.status === "ATTENDED").length,
    [attendees],
  );

  if (!isValidEventId) {
    return (
      <div className="rounded-[20px] border border-red-200 bg-red-50 p-6 text-red-700">
        Invalid event ID.
      </div>
    );
  }

  return (
    <div className="relative space-y-6 pb-24">
      {flash !== "idle" ? (
        <div
          className={`pointer-events-none fixed inset-0 z-50 ${
            flash === "success" ? "bg-green-500/50" : "bg-red-500/45"
          }`}
        />
      ) : null}

      <header className="flex flex-col gap-2">
        <Link
          href={`/dashboard/events/${eventId}`}
          className="inline-flex w-fit items-center text-sm font-semibold uppercase tracking-badge text-warm-gray-500 transition-colors hover:text-notion-black"
        >
          <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
          Back to Attendees
        </Link>

        <div className="flex items-end justify-between gap-3">
          <div>
            <h1 className="inline-flex items-center gap-2 text-3xl font-bold tracking-tight text-notion-black">
              <ScanLine className="h-7 w-7" />
              Scan Mode
            </h1>
            <p className="mt-1 text-sm text-warm-gray-500">{feedbackMessage}</p>
          </div>
          <div className="rounded-[14px] border border-[var(--border-whisper)] bg-pure-white px-4 py-2 text-right shadow-sm">
            <p className="text-xs uppercase tracking-badge text-warm-gray-500">Checked-In</p>
            <p className="text-lg font-semibold text-notion-black">{checkedInCount}</p>
          </div>
        </div>
      </header>

      <Scanner onDetected={handleDetected} isBusy={redeemTicket.isPending} />

      <ManualCheckInFallback
        eventId={eventId}
        onCheckInSuccess={(message) => {
          setFlash("success");
          setFeedbackMessage(message);
          window.setTimeout(() => setFlash("idle"), 250);
        }}
        onCheckInError={(message) => {
          setFlash("error");
          setFeedbackMessage(message);
          window.setTimeout(() => setFlash("idle"), 320);
        }}
      />
    </div>
  );
}
