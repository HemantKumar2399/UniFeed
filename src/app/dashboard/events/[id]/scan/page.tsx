"use client";

import { use, useCallback, useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Loader2, ScanLine } from "lucide-react";

import { ManualCheckInFallback } from "@/components/ManualCheckInFallback";
import { Scanner } from "@/components/Scanner";
import { useLiveEventAttendance } from "@/hooks/use-live-event-attendance";
import { api } from "@/trpc/react";

interface OfflineScanItem {
  token: string;
  scannedAt: string;
}

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
  const [offlineQueue, setOfflineQueue] = useState<OfflineScanItem[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  const queueKey = `unifeed-scan-queue-${eventId}`;
  const utils = api.useUtils();

  // Helper to save queue
  const saveQueue = useCallback((queue: OfflineScanItem[]) => {
    setOfflineQueue(queue);
    localStorage.setItem(queueKey, JSON.stringify(queue));
  }, [queueKey]);

  // Load offline queue on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(queueKey);
      if (saved) {
        try {
          setOfflineQueue(JSON.parse(saved) as OfflineScanItem[]);
        } catch (e) {
          console.error("Failed to parse saved offline queue:", e);
        }
      }
    }
  }, [queueKey]);

  const { data: attendees, error: attendeesError } = api.event.getAttendees.useQuery(
    { eventId },
    {
      enabled: isValidEventId,
      retry: false,
    },
  );

  const verifyStudentQr = api.event.verifyStudentQrForEvent.useMutation();

  const liveAttendance = useLiveEventAttendance({
    eventId,
    totalCapacity: attendees?.event.capacity ?? 0,
    initialActiveCount: (attendees?.counts.going ?? 0) + (attendees?.counts.attended ?? 0),
    initialAttendees: attendees?.attendees ?? [],
    initialCounts: attendees?.counts,
    enabled: Boolean(attendees?.event),
  });

  // Sync logic
  const syncQueue = useCallback(async () => {
    if (offlineQueue.length === 0 || isSyncing || !navigator.onLine) {
      return;
    }

    setIsSyncing(true);
    setFeedbackMessage(`Syncing ${offlineQueue.length} offline check-ins...`);

    const queueToProcess = [...offlineQueue];
    const failedItems: OfflineScanItem[] = [];

    for (const item of queueToProcess) {
      try {
        await verifyStudentQr.mutateAsync({ eventId, token: item.token });
      } catch (err: unknown) {
        const errorObject = err instanceof Error ? err : new Error(String(err));
        const isNetworkErr = !navigator.onLine || 
                             errorObject.message.includes("Failed to fetch") || 
                             errorObject.message.includes("network") || 
                             errorObject.message.includes("NetworkError");
        if (isNetworkErr) {
          failedItems.push(...queueToProcess.slice(queueToProcess.indexOf(item)));
          break;
        }
      }
    }

    saveQueue(failedItems);
    setIsSyncing(false);
    setFeedbackMessage(
      failedItems.length === 0
        ? "All offline check-ins synced successfully!"
        : `Sync partial. ${failedItems.length} check-ins remaining.`
    );
    void utils.event.getAttendees.invalidate();
  }, [offlineQueue, eventId, verifyStudentQr, isSyncing, saveQueue, utils]);

  // Listen for online events
  useEffect(() => {
    const handleOnline = () => {
      void syncQueue();
    };
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, [syncQueue]);

  // Periodic sync attempt when online
  useEffect(() => {
    const interval = setInterval(() => {
      if (navigator.onLine && offlineQueue.length > 0) {
        void syncQueue();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [offlineQueue.length, syncQueue]);

  const handleDetected = useCallback(
    async (token: string) => {
      if (!isValidEventId || isSyncing) {
        return;
      }

      // Offline check
      if (typeof window !== "undefined" && !navigator.onLine) {
        const newItem = { token, scannedAt: new Date().toISOString() };
        if (!offlineQueue.some((item) => item.token === token)) {
          const nextQueue = [...offlineQueue, newItem];
          saveQueue(nextQueue);
          setFeedbackMessage(`Offline: Queued check-in (${nextQueue.length} pending)`);
          setFlash("warning");
          window.setTimeout(() => setFlash("idle"), 250);
        } else {
          setFeedbackMessage("Ticket already queued offline.");
        }
        return;
      }

      try {
        setFeedbackMessage("Verifying...");
        const result = await verifyStudentQr.mutateAsync({ eventId, token });
        if (result.outcome === "CHECKED_IN") {
          setFlash("success");
          setFeedbackMessage(result.message);
          window.setTimeout(() => setFlash("idle"), 250);
        } else {
          setFlash(result.outcome === "ALREADY_CHECKED_IN" ? "warning" : "error");
          setFeedbackMessage(result.message);
          window.setTimeout(() => setFlash("idle"), 320);
        }
      } catch (err: unknown) {
        const errorObject = err instanceof Error ? err : new Error(String(err));
        const isNetworkErr = !navigator.onLine || 
                             errorObject.message.includes("Failed to fetch") || 
                             errorObject.message.includes("network") || 
                             errorObject.message.includes("NetworkError");
        if (isNetworkErr) {
          const newItem = { token, scannedAt: new Date().toISOString() };
          if (!offlineQueue.some((item) => item.token === token)) {
            const nextQueue = [...offlineQueue, newItem];
            saveQueue(nextQueue);
            setFeedbackMessage(`Network error. Queued check-in (${nextQueue.length} pending)`);
            setFlash("warning");
            window.setTimeout(() => setFlash("idle"), 250);
          } else {
            setFeedbackMessage("Ticket already queued offline.");
          }
        } else {
          setFlash("error");
          setFeedbackMessage(errorObject.message ?? "An error occurred");
          window.setTimeout(() => setFlash("idle"), 320);
        }
      }
    },
    [eventId, isValidEventId, verifyStudentQr, offlineQueue, saveQueue, isSyncing]
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
          <div className="min-w-0 flex-1">
            <h1 className="inline-flex items-center gap-2 text-3xl font-bold tracking-tight text-notion-black">
              <ScanLine className="h-7 w-7" />
              Scan Mode
            </h1>
            <p aria-live="polite" className="mt-1 text-sm text-warm-gray-500 truncate">
              {feedbackMessage}
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-badge text-warm-gray-500">
              Scan the student&apos;s permanent passport QR for this event.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            {offlineQueue.length > 0 ? (
              <div className="rounded-[14px] border border-amber-200 bg-amber-50 px-4 py-2 text-right shadow-sm animate-pulse">
                <p className="text-xs uppercase tracking-badge text-amber-600 font-semibold">Queued</p>
                <p className="text-lg font-bold text-amber-700">{offlineQueue.length}</p>
              </div>
            ) : null}
            {isSyncing ? (
              <div className="rounded-[14px] border border-blue-200 bg-blue-50 px-4 py-2 text-right shadow-sm flex flex-col justify-center items-center">
                <p className="text-xs uppercase tracking-badge text-blue-600 font-semibold">Syncing</p>
                <Loader2 className="h-4 w-4 animate-spin mt-1 text-blue-600" />
              </div>
            ) : null}
            <div className="rounded-[14px] border border-[var(--border-whisper)] bg-pure-white px-4 py-2 text-right shadow-sm">
              <p className="text-xs uppercase tracking-badge text-warm-gray-500">Checked-In</p>
              <p className="text-lg font-semibold text-notion-black">{checkedInCount}</p>
            </div>
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

      <Scanner onDetected={handleDetected} isBusy={verifyStudentQr.isPending || isSyncing} />

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
