import type { RSVPStatus } from "@prisma/client";

import { getAttendeeCounts, type AttendeeCounts, type AttendeeRow } from "@/features/attendance/attendee-management";

export type AttendanceStatusTotals = {
  total: number;
  going: number;
  attended: number;
  waitlisted: number;
  cancelled: number;
};

export type AttendanceLatestActivity = {
  rsvpId: number;
  userId: string;
  attendeeName: string;
  attendeeEmail: string | null;
  eventId: number;
  eventTitle: string;
  eventDate: Date;
  status: RSVPStatus;
  registeredAt: Date;
};

export type EventAttendanceRealtimePayload = {
  eventId: number;
  collegeId: string;
  clubId: number;
  totalCapacity: number;
  goingCount: number;
  attendedCount: number;
  waitlistedCount: number;
  cancelledCount: number;
  activeCount: number;
  remainingCapacity: number;
  attendees: AttendeeRow[];
  latestActivity: AttendanceLatestActivity | null;
};

export type OrganizerLiveAttendanceMetrics = {
  rsvpCount: number;
  rsvpTotals: AttendanceStatusTotals;
  recentActivity: AttendanceLatestActivity[];
};

const DEFAULT_RECENT_ACTIVITY_LIMIT = 8;

export function buildLiveAttendanceTotals(counts: AttendeeCounts): AttendanceStatusTotals {
  return {
    total: counts.all,
    going: counts.going,
    attended: counts.attended,
    waitlisted: counts.waitlisted,
    cancelled: counts.cancelled,
  };
}

export function buildEventAttendanceRealtimePayload(input: {
  eventId: number;
  collegeId: string;
  clubId: number;
  totalCapacity: number;
  attendees: AttendeeRow[];
  latestActivity?: AttendanceLatestActivity | null;
}): EventAttendanceRealtimePayload {
  const counts = getAttendeeCounts(input.attendees);
  const activeCount = counts.going + counts.attended;

  return {
    eventId: input.eventId,
    collegeId: input.collegeId,
    clubId: input.clubId,
    totalCapacity: input.totalCapacity,
    goingCount: counts.going,
    attendedCount: counts.attended,
    waitlistedCount: counts.waitlisted,
    cancelledCount: counts.cancelled,
    activeCount,
    remainingCapacity: Math.max(0, input.totalCapacity - activeCount),
    attendees: input.attendees,
    latestActivity: input.latestActivity ?? null,
  };
}

export function mergeLiveRecentActivity(
  current: AttendanceLatestActivity[],
  latestActivity: AttendanceLatestActivity | null,
  limit = DEFAULT_RECENT_ACTIVITY_LIMIT,
): AttendanceLatestActivity[] {
  if (!latestActivity) {
    return current.slice(0, limit);
  }

  const deduped = current.filter((activity) => activity.rsvpId !== latestActivity.rsvpId);
  return [latestActivity, ...deduped]
    .sort((left, right) => right.registeredAt.getTime() - left.registeredAt.getTime())
    .slice(0, limit);
}

export function normalizeLiveViewerRsvpStatus(
  status: RSVPStatus | null | undefined,
): RSVPStatus | null {
  if (!status || status === "CANCELLED") {
    return null;
  }

  return status;
}
