"use client";

import { AlertCircle, Download } from "lucide-react";
import { useMemo } from "react";

import {
  buildAttendeeCsv,
  filterAndSortAttendees,
  type AttendeeFilters,
} from "@/features/attendance/attendee-management";
import { useLiveEventAttendance } from "@/hooks/use-live-event-attendance";
import { api } from "@/trpc/react";

type EventAttendeesClientProps = {
  eventId: number;
  filters: AttendeeFilters;
};

function sanitizeFilenamePart(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
}

function getStatusBadgeClass(status: string): string {
  switch (status) {
    case "ATTENDED":
      return "bg-notion-blue text-pure-white";
    case "GOING":
      return "bg-green-50 text-green-700";
    case "WAITLISTED":
      return "bg-amber-100 text-amber-800";
    case "CANCELLED":
      return "bg-rose-100 text-rose-700";
    default:
      return "bg-warm-white text-warm-gray-500";
  }
}

function formatAcademicProfile(attendee: {
  branch: string | null;
  course: string | null;
  graduationYear: number | null;
}): string {
  const parts = [attendee.branch, attendee.course, attendee.graduationYear?.toString()].filter(Boolean);
  return parts.length > 0 ? parts.join(" • ") : "Profile missing";
}

export function EventAttendeesClient({
  eventId,
  filters,
}: EventAttendeesClientProps) {
  const { data, isLoading, error } = api.event.getAttendees.useQuery(
    { eventId },
    {
      enabled: Number.isInteger(eventId) && eventId > 0,
      retry: false,
    },
  );

  const liveAttendance = useLiveEventAttendance({
    eventId,
    totalCapacity: data?.event.capacity ?? 0,
    initialActiveCount: (data?.counts.going ?? 0) + (data?.counts.attended ?? 0),
    initialAttendees: data?.attendees ?? [],
    initialCounts: data?.counts,
    enabled: Boolean(data?.event),
  });

  const attendees = useMemo(() => {
    return filterAndSortAttendees(liveAttendance.attendees, filters);
  }, [filters, liveAttendance.attendees]);

  const event = data?.event;
  const counts = liveAttendance.counts;

  const handleExportCsv = () => {
    if (!event || attendees.length === 0) {
      return;
    }

    try {
      const csvContent = buildAttendeeCsv({
        event,
        attendees,
      });
      const blob = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), csvContent], {
        type: "text/csv;charset=utf-8;",
      });
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const filenamePart = sanitizeFilenamePart(event.title) || `event-${eventId}`;

      link.setAttribute("href", objectUrl);
      link.setAttribute("download", `${filenamePart}-attendees.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);
    } catch (exportError) {
      console.error("Export failed", exportError);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="h-8 w-72 animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-52 animate-pulse rounded-md bg-muted" />
          </div>
          <div className="h-10 w-36 animate-pulse rounded-[var(--radius-micro)] bg-muted" />
        </div>

        <div className="rounded-md border border-border">
          <div className="h-10 border-b border-border bg-muted/50" />
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              className="h-16 animate-pulse border-b border-border bg-muted/20 last:border-0"
              key={index}
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-start rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
        <AlertCircle className="mr-3 mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <h3 className="font-semibold">Error Loading Attendees</h3>
          <p className="mt-1 text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-notion-black">
            {event?.title ?? "Attendees"}
          </h2>
          <p className="mt-1 text-sm text-warm-gray-500">
            <span className="font-semibold text-notion-black">{counts.all}</span> registered,{" "}
            <span className="font-semibold text-notion-black">{counts.attended}</span> checked in.
          </p>
          {filters.q || filters.status !== "ALL" ? (
            <p className="mt-1 text-sm text-warm-gray-500">
              Showing <span className="font-semibold text-notion-black">{attendees.length}</span>{" "}
              attendee{attendees.length === 1 ? "" : "s"} in the current filter view.
            </p>
          ) : null}
        </div>

        <button
          className="inline-flex h-10 items-center justify-center rounded-[var(--radius-micro)] bg-notion-blue px-4 py-2 text-sm font-medium text-pure-white shadow-none transition-colors duration-haptic hover:bg-focus-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-blue)] disabled:pointer-events-none disabled:opacity-50 active:scale-95"
          disabled={attendees.length === 0}
          onClick={handleExportCsv}
          type="button"
        >
          <Download className="mr-2 h-4 w-4" />
          Export Filtered CSV
        </button>
      </div>

      <div className="overflow-hidden rounded-[var(--radius-comfortable)] border border-[var(--border-whisper)] shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[var(--border-whisper)] bg-warm-white text-left">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-badge text-warm-gray-500">
                  Name
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-badge text-warm-gray-500">
                  PRN
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-badge text-warm-gray-500">
                  Academic Profile
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-badge text-warm-gray-500">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-badge text-warm-gray-500">
                  Check In
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-whisper)] bg-pure-white">
              {attendees.length === 0 ? (
                <tr>
                  <td
                    className="bg-pure-white px-6 py-12 text-center text-warm-gray-500"
                    colSpan={5}
                  >
                    <p className="font-medium">No attendees match this view.</p>
                  </td>
                </tr>
              ) : (
                attendees.map((attendee) => {
                  const isCheckedIn = attendee.status === "ATTENDED";

                  return (
                    <tr
                      className={`transition-colors duration-200 hover:bg-warm-white/50 ${
                        isCheckedIn ? "bg-teal-50/40" : ""
                      }`}
                      key={attendee.rsvpId}
                    >
                      <td className="px-6 py-4 align-middle">
                        <div className="font-semibold text-notion-black">
                          {attendee.name ?? attendee.email?.split("@")[0] ?? "Unknown User"}
                        </div>
                        <div className="mt-0.5 text-xs text-warm-gray-500">
                          {attendee.email ?? "No email on file"}
                        </div>
                      </td>
                      <td className="px-6 py-4 align-middle font-mono text-xs text-warm-gray-500">
                        {attendee.prn ?? "Profile missing"}
                      </td>
                      <td className="px-6 py-4 align-middle text-warm-gray-500">
                        {formatAcademicProfile(attendee)}
                      </td>
                      <td className="px-6 py-4 align-middle">
                        <span
                          className={`inline-flex items-center rounded-pill px-2.5 py-0.5 text-xs font-semibold uppercase tracking-badge ${getStatusBadgeClass(
                            attendee.status,
                          )}`}
                        >
                          {attendee.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 align-middle text-center">
                        <span
                          className={`inline-flex min-w-[110px] items-center justify-center rounded-pill px-2.5 py-0.5 text-xs font-semibold uppercase tracking-badge ${
                            isCheckedIn
                              ? "bg-notion-blue text-pure-white"
                              : "bg-warm-white text-warm-gray-500"
                          }`}
                        >
                          {isCheckedIn ? "Checked In" : "Not Checked In"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
