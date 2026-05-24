import assert from "node:assert/strict";
import test from "node:test";

import {
  buildEventAttendanceRealtimePayload,
  mergeLiveRecentActivity,
  normalizeLiveViewerRsvpStatus,
  type AttendanceLatestActivity,
} from "@/features/attendance/realtime-attendance";
import type { AttendeeRow } from "@/features/attendance/attendee-management";

const baseAttendees: AttendeeRow[] = [
  {
    rsvpId: 1,
    userId: "student-going",
    name: "Going Student",
    email: "going@example.com",
    prn: "PRN-001",
    branch: "Computer Science",
    course: "BTech",
    graduationYear: 2026,
    status: "GOING",
    registeredAt: new Date("2030-05-01T10:00:00.000Z"),
  },
  {
    rsvpId: 2,
    userId: "student-attended",
    name: "Attended Student",
    email: "attended@example.com",
    prn: "PRN-002",
    branch: "Information Technology",
    course: "BTech",
    graduationYear: 2026,
    status: "ATTENDED",
    registeredAt: new Date("2030-05-01T11:00:00.000Z"),
  },
  {
    rsvpId: 3,
    userId: "student-waitlisted",
    name: "Waitlisted Student",
    email: "waitlisted@example.com",
    prn: "PRN-003",
    branch: "Electronics",
    course: "BTech",
    graduationYear: 2027,
    status: "WAITLISTED",
    registeredAt: new Date("2030-05-01T12:00:00.000Z"),
  },
  {
    rsvpId: 4,
    userId: "student-cancelled",
    name: "Cancelled Student",
    email: "cancelled@example.com",
    prn: "PRN-004",
    branch: "Mechanical",
    course: "BTech",
    graduationYear: 2027,
    status: "CANCELLED",
    registeredAt: new Date("2030-05-01T13:00:00.000Z"),
  },
];

function createActivity(input: Partial<AttendanceLatestActivity> = {}): AttendanceLatestActivity {
  return {
    rsvpId: input.rsvpId ?? 1,
    userId: input.userId ?? "student-going",
    attendeeName: input.attendeeName ?? "Going Student",
    attendeeEmail: input.attendeeEmail ?? "going@example.com",
    eventId: input.eventId ?? 99,
    eventTitle: input.eventTitle ?? "Realtime Event",
    eventDate: input.eventDate ?? new Date("2030-05-10T18:00:00.000Z"),
    status: input.status ?? "GOING",
    registeredAt: input.registeredAt ?? new Date("2030-05-01T14:00:00.000Z"),
  };
}

void test("buildEventAttendanceRealtimePayload counts only active RSVP states toward capacity", () => {
  const payload = buildEventAttendanceRealtimePayload({
    eventId: 99,
    collegeId: "college-1",
    clubId: 7,
    totalCapacity: 10,
    attendees: baseAttendees,
  });

  assert.equal(payload.goingCount, 1);
  assert.equal(payload.attendedCount, 1);
  assert.equal(payload.waitlistedCount, 1);
  assert.equal(payload.cancelledCount, 1);
  assert.equal(payload.activeCount, 2);
  assert.equal(payload.remainingCapacity, 8);
});

void test("mergeLiveRecentActivity prepends the latest update and keeps rows deduped by RSVP", () => {
  const current = [
    createActivity({
      rsvpId: 10,
      status: "GOING",
      registeredAt: new Date("2030-05-01T11:00:00.000Z"),
    }),
    createActivity({
      rsvpId: 11,
      userId: "student-b",
      attendeeName: "Student B",
      attendeeEmail: "b@example.com",
      status: "WAITLISTED",
      registeredAt: new Date("2030-05-01T10:00:00.000Z"),
    }),
  ];

  const merged = mergeLiveRecentActivity(
    current,
    createActivity({
      rsvpId: 10,
      status: "ATTENDED",
      registeredAt: new Date("2030-05-01T12:00:00.000Z"),
    }),
  );

  assert.equal(merged.length, 2);
  assert.equal(merged[0]?.rsvpId, 10);
  assert.equal(merged[0]?.status, "ATTENDED");
  assert.equal(merged[1]?.rsvpId, 11);
});

void test("normalizeLiveViewerRsvpStatus clears cancelled RSVPs but preserves active ones", () => {
  assert.equal(normalizeLiveViewerRsvpStatus("CANCELLED"), null);
  assert.equal(normalizeLiveViewerRsvpStatus("GOING"), "GOING");
  assert.equal(normalizeLiveViewerRsvpStatus("WAITLISTED"), "WAITLISTED");
});
