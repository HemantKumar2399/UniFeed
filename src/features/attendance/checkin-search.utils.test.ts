import assert from "node:assert/strict";
import test from "node:test";

import {
  fallbackPrnFromUserId,
  matchesAttendeeQuery,
  resolveAttendeePrn,
} from "./checkin-search.utils";

void test("fallbackPrnFromUserId produces deterministic PRN", () => {
  assert.equal(fallbackPrnFromUserId("abc123xyz"), "PRN-abc123");
});

void test("resolveAttendeePrn prefers explicit PRN when provided", () => {
  assert.equal(
    resolveAttendeePrn({
      userId: "abcdef",
      prn: "PRN-2026-001",
    }),
    "PRN-2026-001",
  );
});

void test("resolveAttendeePrn derives PRN from email local part", () => {
  assert.equal(
    resolveAttendeePrn({
      userId: "stu001abc",
      email: "2026cs001@college.edu",
    }),
    "PRN-2026CS001",
  );
});

void test("matchesAttendeeQuery supports name and PRN lookup", () => {
  const attendee = {
    userId: "stu001abc",
    name: "Aarav Sharma",
    email: "aarav@college.edu",
  };

  assert.equal(matchesAttendeeQuery(attendee, "aarav"), true);
  assert.equal(matchesAttendeeQuery(attendee, "PRN-aarav"), true);
  assert.equal(matchesAttendeeQuery(attendee, "non-existent"), false);
});

void test("matchesAttendeeQuery falls back to user-id PRN when email missing", () => {
  const attendee = {
    userId: "stu001abc",
    name: "Campus User",
  };

  assert.equal(matchesAttendeeQuery(attendee, "PRN-stu001"), true);
});
