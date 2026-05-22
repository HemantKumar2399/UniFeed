import assert from "node:assert/strict";
import test from "node:test";

import {
  matchesAttendeeQuery,
  resolveAttendeePrn,
} from "./checkin-search.utils";

void test("resolveAttendeePrn prefers explicit PRN when provided", () => {
  assert.equal(
    resolveAttendeePrn({
      userId: "abcdef",
      prn: "PRN-2026-001",
    }),
    "PRN-2026-001",
  );
});

void test("resolveAttendeePrn returns null when a real PRN is unavailable", () => {
  assert.equal(
    resolveAttendeePrn({
      userId: "stu001abc",
      email: "2026cs001@college.edu",
    }),
    null,
  );
});

void test("matchesAttendeeQuery supports name and real PRN lookup", () => {
  const attendee = {
    userId: "stu001abc",
    name: "Aarav Sharma",
    email: "aarav@college.edu",
    prn: "PRN-2026-001",
  };

  assert.equal(matchesAttendeeQuery(attendee, "aarav"), true);
  assert.equal(matchesAttendeeQuery(attendee, "2026-001"), true);
  assert.equal(matchesAttendeeQuery(attendee, "non-existent"), false);
});

void test("matchesAttendeeQuery does not fabricate PRN values", () => {
  const attendee = {
    userId: "stu001abc",
    name: "Campus User",
  };

  assert.equal(matchesAttendeeQuery(attendee, "PRN-stu001"), false);
});
