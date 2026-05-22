"use client";

import { useMemo, useState } from "react";
import { Loader2, Search, UserCheck } from "lucide-react";

import { api } from "@/trpc/react";

type ManualCheckInFallbackProps = {
  eventId: number;
  onCheckInSuccess: (message: string) => void;
  onCheckInError: (message: string) => void;
};

export function ManualCheckInFallback({ eventId, onCheckInSuccess, onCheckInError }: ManualCheckInFallbackProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = useMemo(() => query.trim(), [query]);

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
      onCheckInSuccess(`Manual check-in complete: ${payload.attendeeName}`);
      await utils.event.getAttendees.invalidate({ eventId });
      await utils.event.searchAttendees.invalidate({ eventId, query: normalizedQuery || "a" });
    },
    onError: (error) => {
      onCheckInError(error.message);
    },
  });

  return (
    <section className="rounded-[20px] border border-[var(--border-whisper)] bg-pure-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-notion-black">Manual Fallback</h2>
      <p className="mt-1 text-sm text-warm-gray-500">Search attendee by name or email and force check-in when QR fails.</p>

      <div className="mt-4 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-gray-500" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name or email"
            className="h-10 w-full rounded-[12px] border border-[var(--border-input)] pl-9 pr-3 text-sm outline-none focus-visible:border-[var(--color-focus-blue)]"
          />
        </div>
      </div>

      {normalizedQuery.length < 2 ? (
        <p className="mt-3 text-xs text-warm-gray-500">Type at least 2 characters to search attendees.</p>
      ) : null}

      {isFetching ? (
        <div className="mt-3 inline-flex items-center gap-2 text-sm text-warm-gray-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Searching attendees...
        </div>
      ) : null}

      {normalizedQuery.length >= 2 && !isFetching ? (
        <div className="mt-3 space-y-2">
          {(results ?? []).length === 0 ? (
            <p className="text-sm text-warm-gray-500">No attendees match your query.</p>
          ) : (
            (results ?? []).map((attendee) => {
              const alreadyCheckedIn = attendee.status === "ATTENDED";
              return (
                <div
                  key={attendee.rsvpId}
                  className="flex items-center justify-between rounded-[12px] border border-[var(--border-whisper)] px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-semibold text-notion-black">{attendee.name ?? attendee.email ?? "Unknown"}</p>
                    <p className="text-xs text-warm-gray-500">
                      {attendee.email ?? "No email"}
                      {attendee.prn ? ` • ${attendee.prn}` : " • Profile pending"}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={alreadyCheckedIn || forceCheckIn.isPending}
                    onClick={() => {
                      forceCheckIn.mutate({ eventId, userId: attendee.userId });
                    }}
                    className="inline-flex h-9 items-center gap-1 rounded-[10px] bg-notion-black px-3 text-xs font-semibold text-pure-white transition-colors hover:bg-notion-black/90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <UserCheck className="h-3.5 w-3.5" />
                    {alreadyCheckedIn ? "Checked-In" : "Force Check-In"}
                  </button>
                </div>
              );
            })
          )}
        </div>
      ) : null}
    </section>
  );
}
