import assert from "node:assert/strict";
import { test } from "node:test";

import {
  getRsvpStatusBadgeVariant,
  getRsvpStatusLabel,
} from "@/features/rsvp/rsvp-status";

void test("maps RSVP statuses to stable labels", () => {
  assert.equal(getRsvpStatusLabel("GOING"), "Going");
  assert.equal(getRsvpStatusLabel("ATTENDED"), "Attended");
  assert.equal(getRsvpStatusLabel("WAITLISTED"), "Waitlisted");
  assert.equal(getRsvpStatusLabel("CANCELLED"), "Cancelled");
});

void test("maps RSVP statuses to semantic badge variants", () => {
  assert.equal(getRsvpStatusBadgeVariant("GOING"), "success");
  assert.equal(getRsvpStatusBadgeVariant("ATTENDED"), "success");
  assert.equal(getRsvpStatusBadgeVariant("WAITLISTED"), "warning");
  assert.equal(getRsvpStatusBadgeVariant("CANCELLED"), "danger");
});
