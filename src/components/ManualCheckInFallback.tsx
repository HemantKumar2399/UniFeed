"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2, Search, UserCheck, X } from "lucide-react";

import { api } from "@/trpc/react";

type ManualCheckInFallbackProps = {
  eventId: number;
  onCheckInSuccess: (message: string) => void;
  onCheckInError: (message: string) => void;
};

function formatAcademicSummary(attendee: {
  branch: string | null;
  course: string | null;
  graduationYear: number | null;
}) {
  const parts = [
    attendee.branch,
    attendee.course,
    attendee.graduationYear?.toString(),
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(" • ") : "Academic profile missing";
}

export function ManualCheckInFallback({
  eventId,
  onCheckInSuccess,
  onCheckInError,
}: ManualCheckInFallbackProps) {
  const [query, setQuery] = useState("");
  const [confirmingRsvpId, setConfirmingRsvpId] = useState<number | null>(null);
  const normalizedQuery = useMemo(() => query.trim(), [query]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const utils = api.useUtils();
  const { data: results, isFetching } = api.event.searchAttendees.useQuery(
    {
      eventId,
      query: normalizedQuery,
    },
    {
      enabled: normalizedQuery.length >= 2,
    },
  );

  const forceCheckIn = api.event.forceCheckIn.useMutation({
    onSuccess: async (payload) => {
      setConfirmingRsvpId(null);
      onCheckInSuccess(`Manual check-in complete: ${payload.attendeeName}`);
      await utils.event.searchAttendees.invalidate();
    },
    onError: (error) => {
      setConfirmingRsvpId(null);
      onCheckInError(error.message);
    },
  });

  return (
    <div className="rounded-[20px] border border-whisper bg-card-bg p-5 shadow-card transition-colors duration-300">
      <h2 className="text-lg font-semibold text-foreground">Manual Fallback</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Search by student name, email, or PRN and confirm a manual check-in when QR scanning fails.
      </p>

      <div className="mt-4 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, email, or PRN"
            inputMode="text"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            className="h-11 w-full rounded-[12px] border border-input bg-card-bg pl-10 pr-3 text-base text-foreground outline-none focus-visible:border-[var(--color-focus-blue)] transition-colors shadow-sm"
          />
        </div>
      </div>

      {normalizedQuery.length < 2 ? (
        <p className="mt-3 text-xs text-muted-foreground">
          Type at least 2 characters to search attendees.
        </p>
      ) : null}

      {isFetching ? (
        <div
          aria-live="polite"
          className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground"
        >
          <Loader2 className="h-4 w-4 animate-spin" />
          Searching attendees...
        </div>
      ) : null}

      {normalizedQuery.length >= 2 && !isFetching ? (
        <div className="mt-3 space-y-2">
          {(results ?? []).length === 0 ? (
            <p className="text-sm text-muted-foreground">No attendees match your query.</p>
          ) : (
            (results ?? []).map((attendee) => {
              const alreadyCheckedIn = attendee.status === "ATTENDED";
              const canCheckIn = attendee.status === "GOING";
              const isConfirming = confirmingRsvpId === attendee.rsvpId;

              return (
                <div
                  key={attendee.rsvpId}
                  className="flex items-center justify-between gap-3 rounded-[12px] border border-whisper px-3 py-3 transition-colors hover:bg-muted/10 bg-app-bg/50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {attendee.name ?? attendee.email ?? "Unknown"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {attendee.email ?? "No email"}
                      {attendee.prn ? ` • ${attendee.prn}` : " • Profile missing"}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground/80">
                      {formatAcademicSummary(attendee)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isConfirming ? (
                      <>
                        <button
                          type="button"
                          disabled={forceCheckIn.isPending}
                          onClick={() => {
                            forceCheckIn.mutate({ eventId, userId: attendee.userId });
                          }}
                          className="inline-flex h-10 items-center gap-1 rounded-[10px] bg-foreground px-4 text-xs font-semibold text-background transition-all hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                        >
                          <UserCheck className="h-3.5 w-3.5" />
                          {forceCheckIn.isPending ? "Saving..." : "Confirm"}
                        </button>
                        <button
                          type="button"
                          disabled={forceCheckIn.isPending}
                          onClick={() => setConfirmingRsvpId(null)}
                          className="inline-flex h-10 items-center gap-1 rounded-[10px] border border-input px-4 text-xs font-semibold text-foreground transition-all hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                        >
                          <X className="h-3.5 w-3.5" />
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        disabled={!canCheckIn || forceCheckIn.isPending}
                        onClick={() => setConfirmingRsvpId(attendee.rsvpId)}
                        className="inline-flex h-10 items-center gap-1 rounded-[10px] bg-foreground px-4 text-xs font-semibold text-background transition-all hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                      >
                        <UserCheck className="h-3.5 w-3.5" />
                        {alreadyCheckedIn
                          ? "Checked-In"
                          : canCheckIn
                            ? "Force Check-In"
                            : "Unavailable"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : null}
    </div>
  );
}
