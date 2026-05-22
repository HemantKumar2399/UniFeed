"use client";

import { use } from "react";
import { api } from "@/trpc/react";
import Link from "next/link";
import { ArrowLeft, Download, AlertCircle, ScanLine } from "lucide-react";

function getProfileFieldLabel(): string {
  return "Pending profile";
}

export default function EventAttendeesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const eventId = parseInt(resolvedParams.id, 10);

  const { data: attendees, isLoading, error } = api.event.getAttendees.useQuery(
    { eventId },
    {
      enabled: !isNaN(eventId),
    }
  );

  const handleExportCsv = () => {
    try {
      if (!attendees || attendees.length === 0) return;

      // Header row
      const headers = ["Name", "Email", "PRN", "Branch", "RSVP Status", "Checked In"];
      
      // Prevent formula injection
      const sanitizeCsvField = (value: string | null | undefined) => {
        const str = String(value ?? "N/A");
        if (/^[=+\-@\t]/.test(str)) return `'${str}`;
        return `"${str.replace(/"/g, '""')}"`;
      };

      // Data rows
      const rows = attendees.map((rsvp) => {
        const isCheckedIn = rsvp.status === "ATTENDED" ? "Yes" : "No";

        return [
          sanitizeCsvField(rsvp.user.name),
          sanitizeCsvField(rsvp.user.email),
          sanitizeCsvField(getProfileFieldLabel()),
          sanitizeCsvField(getProfileFieldLabel()),
          sanitizeCsvField(rsvp.status),
          sanitizeCsvField(isCheckedIn)
        ].join(",");
      });

      const csvContent = [headers.join(","), ...rows].join("\r\n");
      const blob = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), csvContent], { type: 'text/csv;charset=utf-8;' });
      const encodedUri = URL.createObjectURL(blob);
      
      // Create download trigger
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `event-${eventId}-attendees.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(encodedUri);
    } catch (err) {
      console.error("Export failed", err);
    }
  };

  if (isNaN(eventId)) {
    return (
      <div className="p-8 text-center text-muted-foreground flex flex-col items-center">
        <AlertCircle className="mb-2 h-8 w-8 text-destructive" />
        <p>Invalid event ID.</p>
        <Link href="/dashboard" className="text-primary hover:underline mt-4 inline-flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="h-8 w-64 animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-32 animate-pulse rounded-md bg-muted" />
          </div>
        </div>
        <div className="rounded-md border border-border">
          <div className="h-10 border-b border-border bg-muted/50" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-14 border-b border-border last:border-0 animate-pulse bg-muted/20" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive flex items-start">
        <AlertCircle className="mt-0.5 mr-3 h-5 w-5 shrink-0" />
        <div>
          <h3 className="font-semibold">Error Loading Attendees</h3>
          <p className="text-sm mt-1">{error.message}</p>
          <Link href="/dashboard" className="inline-flex items-center mt-4 text-sm font-medium hover:underline text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go back
          </Link>
        </div>
      </div>
    );
  }

  const attendeesList = attendees ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 mb-2">
            <Link 
              href="/dashboard/events" 
              className="text-sm font-semibold tracking-badge uppercase text-warm-gray-500 hover:text-notion-black inline-flex items-center transition-colors duration-haptic active:scale-95"
            >
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
              Back to Events
            </Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-notion-black">Attendees</h1>
          <p className="text-warm-gray-500 mt-1 text-base">
            <span className="font-semibold text-notion-black mr-1">{attendeesList.length}</span> 
            {attendeesList.length === 1 ? 'person' : 'people'} registered for this event.
          </p>
          <p className="mt-2 text-sm text-warm-gray-500">
            TODO-MVP: student PRN and branch fields will appear here after Epic 1 adds the real student profile model.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Link
            href={`/dashboard/events/${eventId}/scan`}
            className="inline-flex h-10 items-center justify-center rounded-[var(--radius-micro)] border border-[var(--border-input)] bg-pure-white px-4 py-2 text-sm font-medium text-notion-black transition-colors duration-haptic active:scale-95 hover:bg-warm-white"
          >
            <ScanLine className="mr-2 h-4 w-4" />
            Scan Mode
          </Link>
          <button
            onClick={handleExportCsv}
            disabled={attendeesList.length === 0}
            className="inline-flex h-10 items-center justify-center rounded-[var(--radius-micro)] bg-notion-blue px-4 py-2 text-sm font-medium text-pure-white transition-colors duration-haptic active:scale-95 shadow-none hover:bg-focus-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-blue)] focus-visible:border-[var(--color-focus-blue)] disabled:pointer-events-none disabled:opacity-50"
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-[var(--radius-comfortable)] border border-[var(--border-whisper)] shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-warm-white text-left border-b border-[var(--border-whisper)]">
              <tr>
                <th className="px-6 py-4 font-semibold text-warm-gray-500 uppercase tracking-badge text-xs">Name</th>
                <th className="px-6 py-4 font-semibold text-warm-gray-500 uppercase tracking-badge text-xs truncate">PRN</th>
                <th className="px-6 py-4 font-semibold text-warm-gray-500 uppercase tracking-badge text-xs truncate">Branch</th>
                <th className="px-6 py-4 font-semibold text-warm-gray-500 uppercase tracking-badge text-xs">Status</th>
                <th className="px-6 py-4 font-semibold text-warm-gray-500 uppercase tracking-badge text-xs text-center">Check In</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-whisper)] bg-pure-white">
              {attendeesList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-warm-gray-500 bg-pure-white">
                    <p className="font-medium">No attendees have registered yet.</p>
                  </td>
                </tr>
              ) : (
                attendeesList.map((rsvp) => {
                  const isCheckedIn = rsvp.status === "ATTENDED";

                  return (
                    <tr 
                      key={rsvp.userId} 
                      className={`hover:bg-warm-white/50 transition-colors duration-200 ${isCheckedIn ? 'bg-teal-50/50' : ''}`}
                    >
                      <td className="px-6 py-4 align-middle">
                        <div className="font-semibold text-notion-black">
                          {rsvp.user.name ?? rsvp.user.email?.split('@')[0] ?? "Unknown User"}
                        </div>
                        {rsvp.user.email && (
                          <div className="text-xs text-warm-gray-500 mt-0.5">{rsvp.user.email}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 align-middle font-mono text-xs text-warm-gray-500">{getProfileFieldLabel()}</td>
                      <td className="px-6 py-4 align-middle text-warm-gray-500 font-medium">{getProfileFieldLabel()}</td>
                      <td className="px-6 py-4 align-middle">
                        <span className="inline-flex items-center rounded-pill bg-green-50 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-badge text-green-700">
                          {rsvp.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 align-middle text-center">
                        <span
                          className={`inline-flex min-w-[90px] items-center justify-center rounded-pill px-2.5 py-0.5 text-xs font-semibold uppercase tracking-badge ${
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
