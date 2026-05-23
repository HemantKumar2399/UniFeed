import { AlertCircle, ArrowLeft, Filter, ScanLine, Search } from "lucide-react";
import Link from "next/link";

import {
  attendeeFilterStatuses,
  buildAttendeeDashboardHref,
  normalizeAttendeeFilters,
  type AttendeeFilterStatus,
} from "@/features/attendance/attendee-management";
import { EventAttendeesClient } from "@/features/attendance/components/EventAttendeesClient";

type EventAttendeesPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    q?: string;
    sort?: string;
    status?: string;
  }>;
};

const attendeeStatusLabels: Record<AttendeeFilterStatus, string> = {
  ALL: "All",
  GOING: "Going",
  ATTENDED: "Attended",
  CANCELLED: "Cancelled",
  WAITLISTED: "Waitlisted",
};

export default async function EventAttendeesPage({
  params,
  searchParams,
}: EventAttendeesPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const eventId = Number.parseInt(resolvedParams.id, 10);
  const filters = normalizeAttendeeFilters(resolvedSearchParams);

  if (!Number.isInteger(eventId) || eventId <= 0) {
    return (
      <div className="flex flex-col items-center p-8 text-center text-muted-foreground">
        <AlertCircle className="mb-2 h-8 w-8 text-destructive" />
        <p>Invalid event ID.</p>
        <Link
          href="/dashboard"
          className="mt-4 inline-flex items-center text-primary hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <div className="mb-2 flex items-center gap-2">
            <Link
              href="/dashboard/events"
              className="inline-flex items-center text-sm font-semibold uppercase tracking-badge text-warm-gray-500 transition-colors duration-haptic hover:text-notion-black active:scale-95"
            >
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
              Back to Events
            </Link>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-notion-black">
            Attendee Management
          </h1>
          <p className="mt-1 text-base text-warm-gray-500">
            Review real student records, filter large rosters, and export the current attendance view.
          </p>
        </div>

        <Link
          href={`/dashboard/events/${eventId}/scan`}
          className="inline-flex h-10 items-center justify-center rounded-[var(--radius-micro)] border border-[var(--border-input)] bg-pure-white px-4 py-2 text-sm font-medium text-notion-black transition-colors duration-haptic hover:bg-warm-white active:scale-95"
        >
          <ScanLine className="mr-2 h-4 w-4" />
          Scan Mode
        </Link>
      </div>

      <section className="space-y-4 rounded-[var(--radius-comfortable)] border border-[var(--border-whisper)] bg-pure-white p-5 shadow-none">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-badge text-warm-gray-500">
          <Filter className="h-4 w-4" />
          Filters
        </div>

        <div className="flex flex-wrap gap-2">
          {attendeeFilterStatuses.map((status) => {
            const isActive = filters.status === status;

            return (
              <Link
                key={status}
                href={buildAttendeeDashboardHref(eventId, {
                  q: filters.q,
                  status,
                  sort: filters.sort,
                })}
                className={`inline-flex min-h-[44px] items-center justify-center rounded-pill border px-4 py-2 text-sm font-semibold transition-colors active:scale-95 ${
                  isActive
                    ? "border-notion-black bg-notion-black text-pure-white"
                    : "border-[var(--border-input)] bg-warm-white text-notion-black hover:bg-pure-white"
                }`}
              >
                {attendeeStatusLabels[status]}
              </Link>
            );
          })}
        </div>

        <form method="get" className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px_auto]">
          <input type="hidden" name="status" value={filters.status} />

          <label className="flex min-h-[44px] items-center rounded-[16px] border border-input bg-warm-white px-3 py-2 shadow-sm">
            <Search className="h-4 w-4 text-warm-gray" />
            <input
              type="search"
              name="q"
              defaultValue={filters.q}
              placeholder="Search by name, email, or PRN"
              className="w-full bg-transparent px-3 py-1 text-sm text-notion-black outline-none placeholder:text-warm-gray-muted"
            />
          </label>

          <label className="flex min-h-[44px] items-center rounded-[16px] border border-input bg-warm-white px-3 py-2 shadow-sm">
            <Filter className="h-4 w-4 text-warm-gray" />
            <select
              name="sort"
              defaultValue={filters.sort}
              className="w-full bg-transparent px-3 py-1 text-sm text-notion-black outline-none"
            >
              <option value="registered_desc">Newest registrations</option>
              <option value="registered_asc">Oldest registrations</option>
              <option value="checked_in_first">Checked in first</option>
            </select>
          </label>

          <button
            type="submit"
            className="inline-flex min-h-[44px] items-center justify-center rounded-[16px] border border-input bg-white px-4 py-2 text-sm font-semibold text-notion-black transition-colors hover:bg-warm-white active:scale-95"
          >
            Apply Filters
          </button>
        </form>
      </section>

      <EventAttendeesClient eventId={eventId} filters={filters} />
    </div>
  );
}
