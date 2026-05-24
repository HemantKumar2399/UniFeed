"use client";

import { use, useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, ScanLine } from "lucide-react";

import { ManualCheckInFallback } from "@/components/ManualCheckInFallback";
import { Scanner } from "@/components/Scanner";
import { useLiveEventAttendance } from "@/hooks/use-live-event-attendance";
import { api } from "@/trpc/react";

export default function EventScanModePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const eventId = Number.parseInt(resolvedParams.id, 10);
  const isValidEventId = Number.isInteger(eventId) && eventId > 0;

  const [flash, setFlash] = useState<"idle" | "success" | "warning" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("Scanner ready");

  const { data: attendees, error: attendeesError } = api.event.getAttendees.useQuery(
    { eventId },
    {
      enabled: isValidEventId,
      retry: false,
    },
  );

  const verifyStudentQr = api.event.verifyStudentQrForEvent.useMutation({
    onSuccess: (result) => {
      if (result.outcome === "CHECKED_IN") {
        setFlash("success");
        setFeedbackMessage(result.message);
        window.setTimeout(() => setFlash("idle"), 250);
        return;
      }

      setFlash(result.outcome === "ALREADY_CHECKED_IN" ? "warning" : "error");
      setFeedbackMessage(result.message);
      window.setTimeout(() => setFlash("idle"), 320);
    },
    onError: (error) => {
      setFlash("error");
      setFeedbackMessage(error.message);
      window.setTimeout(() => setFlash("idle"), 320);
    },
  });

  const liveAttendance = useLiveEventAttendance({
    eventId,
    totalCapacity: attendees?.event.capacity ?? 0,
    initialActiveCount: (attendees?.counts.going ?? 0) + (attendees?.counts.attended ?? 0),
    initialAttendees: attendees?.attendees ?? [],
    initialCounts: attendees?.counts,
    enabled: Boolean(attendees?.event),
  });

  const handleDetected = useCallback(
    (token: string) => {
      if (!isValidEventId || verifyStudentQr.isPending) {
        return;
      }
      verifyStudentQr.mutate({ eventId, token });
    },
    [eventId, isValidEventId, verifyStudentQr],
  );

  const checkedInCount = useMemo(
    () => liveAttendance.counts.attended,
    [liveAttendance.counts.attended],
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
            flash === "success"
              ? "bg-green-500/50"
              : flash === "warning"
                ? "bg-amber-400/40"
                : "bg-red-500/45"
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
            <p aria-live="polite" className="mt-1 text-sm text-warm-gray-500">
              {feedbackMessage}
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-badge text-warm-gray-500">
              Scan the student&apos;s permanent passport QR for this event.
            </p>
          </div>
          <div className="rounded-[14px] border border-[var(--border-whisper)] bg-pure-white px-4 py-2 text-right shadow-sm">
            <p className="text-xs uppercase tracking-badge text-warm-gray-500">Checked-In</p>
            <p className="text-lg font-semibold text-notion-black">{checkedInCount}</p>
          </div>
        </div>
      </header>

      {attendeesError ? (
        <div
          aria-live="polite"
          className="flex items-start gap-3 rounded-[20px] border border-red-200 bg-red-50 p-4 text-red-800 shadow-sm"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="text-sm font-semibold">Unable to load attendees for this event.</p>
            <p className="mt-1 text-sm">{attendeesError.message}</p>
          </div>
        </div>
      ) : null}

      <Scanner onDetected={handleDetected} isBusy={verifyStudentQr.isPending} />

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
