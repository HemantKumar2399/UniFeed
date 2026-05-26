import assert from "node:assert/strict";
import test from "node:test";

import {
  buildAttendeeCsv,
  buildAttendeeDashboardHref,
  filterAndSortAttendees,
  normalizeAttendeeFilters,
} from "./attendee-management";

const attendees = [
  {
    rsvpId: 1,
    userId: "student-1",
    name: "Aarav Sharma",
    email: "aarav@college.edu",
    prn: "PRN-2026-001",
    branch: "Computer Science",
    course: "BTech",
    graduationYear: 2026,
    status: "GOING" as const,
    checkedInAt: null,
    registeredAt: new Date("2026-05-20T09:00:00.000Z"),
  },
  {
    rsvpId: 2,
    userId: "student-2",
    name: "Mira Patel",
    email: "mira@college.edu",
    prn: "PRN-2026-002",
    branch: "Information Technology",
    course: "BTech",
    graduationYear: 2026,
    status: "ATTENDED" as const,
    checkedInAt: new Date("2026-05-22T12:30:00.000Z"),
    registeredAt: new Date("2026-05-22T09:00:00.000Z"),
  },
  {
    rsvpId: 3,
    userId: "student-3",
    name: "Nikhil Rao",
    email: "nikhil@college.edu",
    prn: null,
    branch: null,
    course: null,
    graduationYear: null,
    status: "WAITLISTED" as const,
    checkedInAt: null,
    registeredAt: new Date("2026-05-21T09:00:00.000Z"),
  },
];

void test("normalizeAttendeeFilters applies defaults for invalid URL params", () => {
  assert.deepEqual(
    normalizeAttendeeFilters({
      q: "  aarav  ",
      status: "UNKNOWN",
      sort: "not-a-sort",
    }),
    {
      q: "aarav",
      status: "ALL",
      sort: "registered_desc",
    },
  );
});

void test("filterAndSortAttendees filters by real PRN and supports checked-in-first sorting", () => {
  const prnResults = filterAndSortAttendees(attendees, {
    q: "2026-001",
    status: "ALL",
    sort: "registered_desc",
  });

  assert.equal(prnResults.length, 1);
  assert.equal(prnResults[0]?.userId, "student-1");

  const sortedResults = filterAndSortAttendees(attendees, {
    status: "ALL",
    sort: "checked_in_first",
  });

  assert.equal(sortedResults[0]?.status, "ATTENDED");
  assert.equal(sortedResults[1]?.userId, "student-3");
});

void test("buildAttendeeDashboardHref preserves only non-default attendee filters", () => {
  assert.equal(
    buildAttendeeDashboardHref(88, {
      q: "aarav",
      status: "ATTENDED",
      sort: "checked_in_first",
    }),
    "/dashboard/events/88?q=aarav&status=ATTENDED&sort=checked_in_first",
  );

  assert.equal(buildAttendeeDashboardHref(88, {}), "/dashboard/events/88");
});

void test("buildAttendeeCsv sanitizes spreadsheet formulas and exports event metadata", () => {
  const csv = buildAttendeeCsv({
    event: {
      id: 88,
      title: "=Campus Fest",
      date: new Date("2030-05-14T18:45:00.000Z"),
      capacity: 180,
      clubName: "Coding Club",
      collegeName: "North Campus",
    },
    attendees: [attendees[0]!],
  });

  assert.match(csv, /^Event Title,Event Date,Community,College,Name,Email,PRN,Branch,Course,Graduation Year,RSVP Status,Checked In,Checked In At,Registered At/m);
  assert.match(csv, /"'=Campus Fest"/);
  assert.match(csv, /"Coding Club"/);
  assert.match(csv, /"PRN-2026-001"/);
  assert.match(csv, /"false"/);
  assert.match(csv, /"N\/A"/);
});

void test("buildAttendeeCsv exports real check-in timestamps for attended rows", () => {
  const csv = buildAttendeeCsv({
    event: {
      id: 88,
      title: "Campus Fest",
      date: new Date("2030-05-14T18:45:00.000Z"),
      capacity: 180,
      clubName: "Coding Club",
      collegeName: "North Campus",
    },
    attendees: [attendees[1]!],
  });

  assert.match(csv, /"true","2026-05-22T12:30:00.000Z","2026-05-22T09:00:00.000Z"/);
});
