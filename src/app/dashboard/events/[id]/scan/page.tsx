"use client";

import { use, useCallback, useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Loader2, ScanLine } from "lucide-react";

import { ManualCheckInFallback } from "@/components/ManualCheckInFallback";
import { Scanner } from "@/components/Scanner";
import { useLiveEventAttendance } from "@/hooks/use-live-event-attendance";
import { api } from "@/trpc/react";
import { reconcileOfflineScans } from "@/features/attendance/offline-scan-queue";

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

  const [flash, setFlash] = useState<"idle" | "success" | "warning" | "error">(
    "idle",
  );
  const [feedbackMessage, setFeedbackMessage] = useState("Scanner ready");
  const [offlineQueue, setOfflineQueue] = useState<OfflineScanItem[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  const queueKey = `unifeed-scan-queue-${eventId}`;
  const utils = api.useUtils();

  // Helper to save queue
  const saveQueue = useCallback(
    (queue: OfflineScanItem[]) => {
      setOfflineQueue(queue);
      localStorage.setItem(queueKey, JSON.stringify(queue));
    },
    [queueKey],
  );

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

  const { data: attendees, error: attendeesError } =
    api.event.getAttendees.useQuery(
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
    initialActiveCount:
      (attendees?.counts.going ?? 0) + (attendees?.counts.attended ?? 0),
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

    try {
      const result = await reconcileOfflineScans([...offlineQueue], (item) =>
        verifyStudentQr.mutateAsync({ eventId, token: item.token }),
      );
      saveQueue(result.remaining);
      setFeedbackMessage(
        result.remaining.length === 0
          ? `Synced ${result.confirmed} check-ins successfully.`
          : `Synced ${result.confirmed}; ${result.remaining.length} unresolved. ${result.issues[0] ?? "Retry when connected."}`,
      );
    } finally {
      setIsSyncing(false);
    }
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
          setFeedbackMessage(
            `Offline: Queued check-in (${nextQueue.length} pending)`,
          );
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
          setFlash(
            result.outcome === "ALREADY_CHECKED_IN" ? "warning" : "error",
          );
          setFeedbackMessage(result.message);
          window.setTimeout(() => setFlash("idle"), 320);
        }
      } catch (err: unknown) {
        const errorObject = err instanceof Error ? err : new Error(String(err));
        const isNetworkErr =
          !navigator.onLine ||
          errorObject.message.includes("Failed to fetch") ||
          errorObject.message.includes("network") ||
          errorObject.message.includes("NetworkError");
        if (isNetworkErr) {
          const newItem = { token, scannedAt: new Date().toISOString() };
          if (!offlineQueue.some((item) => item.token === token)) {
            const nextQueue = [...offlineQueue, newItem];
            saveQueue(nextQueue);
            setFeedbackMessage(
              `Network error. Queued check-in (${nextQueue.length} pending)`,
            );
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
    [
      eventId,
      isValidEventId,
      verifyStudentQr,
      offlineQueue,
      saveQueue,
      isSyncing,
    ],
  );

  const checkedInCount = useMemo(
    () => liveAttendance.counts.attended,
    [liveAttendance.counts.attended],
  );

  if (!isValidEventId) {
    return (
      <div className="alert-panel surface-status-danger rounded-[20px] p-6">
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
              ? "bg-status-success-surface"
              : flash === "warning"
                ? "bg-status-warning-surface"
                : "bg-status-danger-surface"
          }`}
        />
      ) : null}

      <header className="flex flex-col gap-2">
        <Link
          href={`/dashboard/events/${eventId}`}
          className="text-badge text-muted-foreground hover:text-foreground inline-flex w-fit items-center uppercase transition-colors"
        >
          <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
          Back to Attendees
        </Link>

        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h1 className="text-panel-title text-foreground inline-flex items-center gap-2">
              <ScanLine className="h-7 w-7" />
              Scan Mode
            </h1>
            <p
              aria-live="polite"
              className="text-caption text-muted-foreground mt-1 truncate"
            >
              {feedbackMessage}
            </p>
            <p className="text-badge text-muted-foreground mt-1 uppercase">
              Scan the student&apos;s permanent passport QR for this event.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            {offlineQueue.length > 0 ? (
              <div className="border-status-warning-border bg-status-warning-surface rounded-[14px] border px-4 py-2 text-right shadow-sm motion-safe:animate-pulse">
                <p className="text-badge text-orange uppercase">Queued</p>
                <p className="text-orange text-lg font-bold">
                  {offlineQueue.length}
                </p>
              </div>
            ) : null}
            {isSyncing ? (
              <div className="border-brand-border bg-brand-surface flex flex-col items-center justify-center rounded-[14px] border px-4 py-2 text-right shadow-sm">
                <p className="text-badge text-notion-blue uppercase">Syncing</p>
                <Loader2 className="text-notion-blue mt-1 h-4 w-4 animate-spin" />
              </div>
            ) : null}
            <div className="border-whisper bg-card-bg rounded-[14px] border px-4 py-2 text-right shadow-sm">
              <p className="text-badge text-muted-foreground uppercase">
                Checked-In
              </p>
              <p className="text-foreground text-lg font-semibold">
                {checkedInCount}
              </p>
            </div>
          </div>
        </div>
      </header>

      {attendeesError ? (
        <div
          aria-live="polite"
          className="alert-panel surface-status-danger flex items-start gap-3 rounded-[20px] shadow-sm"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="text-sm font-semibold">
              Unable to load attendees for this event.
            </p>
            <p className="mt-1 text-sm">{attendeesError.message}</p>
          </div>
        </div>
      ) : null}

      <Scanner
        onDetected={handleDetected}
        isBusy={verifyStudentQr.isPending || isSyncing}
      />

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
