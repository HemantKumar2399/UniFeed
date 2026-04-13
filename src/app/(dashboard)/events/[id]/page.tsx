"use client";

import { useState } from "react";
import { type NextPage } from "next";
import { api } from "@/trpc/react";
import Link from "next/link";
import { ArrowLeft, Check, Download, AlertCircle } from "lucide-react";

export default function EventAttendeesPage({
  params,
}: {
  params: { id: string };
}) {
  const eventId = parseInt(params.id, 10);
  const [checkedInIds, setCheckedInIds] = useState<Set<string>>(new Set());

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
        const str = String(value || "N/A");
        if (/^[=+\-@\t]/.test(str)) return `'${str}`;
        return `"${str.replace(/"/g, '""')}"`;
      };

      // Data rows
      const rows = attendees.map((rsvp) => {
        const prn = (rsvp.user as any).prn ? String((rsvp.user as any).prn) : `PRN-${rsvp.user.id.substring(0, 6).padEnd(6, '0')}`;
        const branch = (rsvp.user as any).branch ? String((rsvp.user as any).branch) : "N/A";
        const isCheckedIn = checkedInIds.has(rsvp.user.id) ? "Yes" : "No";       
        
        return [
          sanitizeCsvField(rsvp.user.name),
          sanitizeCsvField(rsvp.user.email),
          sanitizeCsvField(prn),
          sanitizeCsvField(branch),
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

  const toggleCheckIn = (userId: string) => {
    const next = new Set(checkedInIds);
    if (next.has(userId)) {
      next.delete(userId);
    } else {
      next.add(userId);
    }
    setCheckedInIds(next);
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
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link 
              href="/dashboard" 
              className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center transition-colors"
            >
              <ArrowLeft className="mr-1 h-3 w-3" />
              Dashboard
            </Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Attendees</h1>
          <p className="text-muted-foreground mt-1">
            {attendeesList.length} {attendeesList.length === 1 ? 'person' : 'people'} registered for this event.
          </p>
        </div>
        
        <div className="flex items-center">
          <button
            onClick={handleExportCsv}
            disabled={attendeesList.length === 0}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="px-4 py-3 font-medium text-muted-foreground">Name</th>
                <th className="px-4 py-3 font-medium text-muted-foreground truncate">PRN</th>
                <th className="px-4 py-3 font-medium text-muted-foreground truncate">Branch</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 font-medium text-muted-foreground text-center">Check In</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {attendeesList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground bg-card/50">
                    <p>No attendees have registered yet.</p>
                  </td>
                </tr>
              ) : (
                attendeesList.map((rsvp) => {
                  const isCheckedIn = checkedInIds.has(rsvp.user.id);
                  // Since User model doesn't explicitly store PRN/Branch yet, use fallbacks
                  // or derived values if they become available.
                  const prn = (rsvp.user as any).prn ? String((rsvp.user as any).prn) : `PRN-${rsvp.user.id.substring(0, 6).padEnd(6, '0')}`;
                  const branch = (rsvp.user as any).branch ? String((rsvp.user as any).branch) : "N/A";

                  return (
                    <tr 
                      key={rsvp.userId} 
                      className={`hover:bg-muted/50 transition-colors ${isCheckedIn ? 'bg-primary/5' : ''}`}
                    >
                      <td className="px-4 py-3 align-middle">
                        <div className="font-medium text-foreground">
                          {rsvp.user.name || rsvp.user.email?.split('@')[0] || "Unknown User"}
                        </div>
                        {rsvp.user.email && (
                          <div className="text-xs text-muted-foreground">{rsvp.user.email}</div>
                        )}
                      </td>
                      <td className="px-4 py-3 align-middle font-mono text-xs">{prn}</td>
                      <td className="px-4 py-3 align-middle">{branch}</td>
                      <td className="px-4 py-3 align-middle">
                        <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-600 dark:text-green-400">
                          {rsvp.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 align-middle text-center">
                        <button
                          onClick={() => toggleCheckIn(rsvp.user.id)}
                          className={`inline-flex h-8 w-8 items-center justify-center rounded-sm border transition-colors ${
                            isCheckedIn 
                              ? 'bg-primary border-primary text-primary-foreground shadow-sm' 
                              : 'bg-background border-input text-foreground hover:bg-accent hover:text-accent-foreground'
                          }`}
                          aria-label={isCheckedIn ? "Undo check-in" : "Check in"}
                        >
                          {isCheckedIn && <Check className="h-4 w-4" />}
                        </button>
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
