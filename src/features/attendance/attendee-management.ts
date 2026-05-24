import type { RSVPStatus } from "@prisma/client";

export const attendeeFilterStatuses = [
  "ALL",
  "GOING",
  "ATTENDED",
  "CANCELLED",
  "WAITLISTED",
] as const;

export const attendeeSortOptions = [
  "registered_desc",
  "registered_asc",
  "checked_in_first",
] as const;

export type AttendeeFilterStatus = (typeof attendeeFilterStatuses)[number];
export type AttendeeSortOption = (typeof attendeeSortOptions)[number];

export type AttendeeSearchCandidate = {
  userId: string;
  name?: string | null;
  email?: string | null;
  prn?: string | null;
};

export type AttendeeRow = {
  rsvpId: number;
  userId: string;
  name: string | null;
  email: string | null;
  prn: string | null;
  branch: string | null;
  course: string | null;
  graduationYear: number | null;
  status: RSVPStatus;
  registeredAt: Date;
};

export type AttendeeEventMeta = {
  id: number;
  title: string;
  date: Date;
  capacity: number;
  clubName: string;
  collegeName: string;
};

export type AttendeeCounts = {
  all: number;
  going: number;
  attended: number;
  cancelled: number;
  waitlisted: number;
};

export type AttendeeFilterInput = {
  q?: string | null;
  status?: string | null;
  sort?: string | null;
};

export type AttendeeFilters = {
  q: string;
  status: AttendeeFilterStatus;
  sort: AttendeeSortOption;
};

type AttendeeRecord = {
  id: number;
  userId: string;
  status: RSVPStatus;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    email: string | null;
    studentProfile?: {
      prn: string;
      branch: string;
      course: string;
      graduationYear: number;
    } | null;
  };
};

export function resolveAttendeePrn(candidate: AttendeeSearchCandidate): string | null {
  if (candidate.prn && candidate.prn.trim().length > 0) {
    return candidate.prn.trim();
  }

  return null;
}

export function matchesAttendeeQuery(
  candidate: AttendeeSearchCandidate,
  rawQuery: string,
): boolean {
  const query = rawQuery.trim().toLowerCase();
  if (!query) {
    return false;
  }

  const prn = resolveAttendeePrn(candidate)?.toLowerCase();
  const name = (candidate.name ?? "").toLowerCase();
  const email = (candidate.email ?? "").toLowerCase();

  return Boolean((prn?.includes(query) ?? false) || name.includes(query) || email.includes(query));
}

export function parseAttendeeFilterStatus(rawStatus: string | null | undefined): AttendeeFilterStatus {
  return attendeeFilterStatuses.find((status) => status === rawStatus) ?? "ALL";
}

export function parseAttendeeSortOption(rawSort: string | null | undefined): AttendeeSortOption {
  return attendeeSortOptions.find((sort) => sort === rawSort) ?? "registered_desc";
}

export function normalizeAttendeeFilters(filters: AttendeeFilterInput): AttendeeFilters {
  return {
    q: filters.q?.trim() ?? "",
    status: parseAttendeeFilterStatus(filters.status),
    sort: parseAttendeeSortOption(filters.sort),
  };
}

export function mapAttendeeRow(record: AttendeeRecord): AttendeeRow {
  return {
    rsvpId: record.id,
    userId: record.user.id,
    name: record.user.name,
    email: record.user.email,
    prn: resolveAttendeePrn({
      userId: record.user.id,
      prn: record.user.studentProfile?.prn ?? null,
    }),
    branch: record.user.studentProfile?.branch ?? null,
    course: record.user.studentProfile?.course ?? null,
    graduationYear: record.user.studentProfile?.graduationYear ?? null,
    status: record.status,
    registeredAt: record.createdAt,
  };
}

export function getAttendeeCounts(attendees: AttendeeRow[]): AttendeeCounts {
  return attendees.reduce<AttendeeCounts>(
    (counts, attendee) => {
      counts.all += 1;

      switch (attendee.status) {
        case "GOING":
          counts.going += 1;
          break;
        case "ATTENDED":
          counts.attended += 1;
          break;
        case "CANCELLED":
          counts.cancelled += 1;
          break;
        case "WAITLISTED":
          counts.waitlisted += 1;
          break;
      }

      return counts;
    },
    {
      all: 0,
      going: 0,
      attended: 0,
      cancelled: 0,
      waitlisted: 0,
    },
  );
}

export function filterAndSortAttendees(
  attendees: AttendeeRow[],
  rawFilters: AttendeeFilterInput,
): AttendeeRow[] {
  const filters = normalizeAttendeeFilters(rawFilters);

  return attendees
    .filter((attendee) => {
      if (filters.status !== "ALL" && attendee.status !== filters.status) {
        return false;
      }

      if (!filters.q) {
        return true;
      }

      return matchesAttendeeQuery(attendee, filters.q);
    })
    .sort((left, right) => {
      if (filters.sort === "registered_asc") {
        return left.registeredAt.getTime() - right.registeredAt.getTime();
      }

      if (filters.sort === "checked_in_first") {
        const attendedDelta =
          Number(right.status === "ATTENDED") - Number(left.status === "ATTENDED");

        if (attendedDelta !== 0) {
          return attendedDelta;
        }
      }

      return right.registeredAt.getTime() - left.registeredAt.getTime();
    });
}

export function buildAttendeeDashboardHref(
  eventId: number,
  rawFilters: AttendeeFilterInput,
): string {
  const filters = normalizeAttendeeFilters(rawFilters);
  const searchParams = new URLSearchParams();

  if (filters.q) {
    searchParams.set("q", filters.q);
  }

  if (filters.status !== "ALL") {
    searchParams.set("status", filters.status);
  }

  if (filters.sort !== "registered_desc") {
    searchParams.set("sort", filters.sort);
  }

  const query = searchParams.toString();
  return query ? `/dashboard/events/${eventId}?${query}` : `/dashboard/events/${eventId}`;
}

export function sanitizeCsvField(value: string | number | boolean | Date | null | undefined): string {
  const stringValue =
    value instanceof Date
      ? value.toISOString()
      : value === null || value === undefined || value === ""
        ? "N/A"
        : String(value);

  const escapedValue = /^[=+\-@\t]/.test(stringValue)
    ? `'${stringValue}`
    : stringValue;

  return `"${escapedValue.replace(/"/g, '""')}"`;
}

export function buildAttendeeCsv(params: {
  event: AttendeeEventMeta;
  attendees: AttendeeRow[];
}): string {
  const headers = [
    "Event Title",
    "Event Date",
    "Community",
    "College",
    "Name",
    "Email",
    "PRN",
    "Branch",
    "Course",
    "Graduation Year",
    "RSVP Status",
    "Checked In",
    "Registered At",
  ];

  const rows = params.attendees.map((attendee) =>
    [
      sanitizeCsvField(params.event.title),
      sanitizeCsvField(params.event.date),
      sanitizeCsvField(params.event.clubName),
      sanitizeCsvField(params.event.collegeName),
      sanitizeCsvField(attendee.name),
      sanitizeCsvField(attendee.email),
      sanitizeCsvField(attendee.prn),
      sanitizeCsvField(attendee.branch),
      sanitizeCsvField(attendee.course),
      sanitizeCsvField(attendee.graduationYear),
      sanitizeCsvField(attendee.status),
      sanitizeCsvField(attendee.status === "ATTENDED"),
      sanitizeCsvField(attendee.registeredAt),
    ].join(","),
  );

  return [headers.join(","), ...rows].join("\r\n");
}
