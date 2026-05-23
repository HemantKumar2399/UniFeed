import assert from "node:assert/strict";
import test from "node:test";

import {
  buildOrganizerStatusCards,
  getRsvpActivityLabel,
  summarizeRsvpStatuses,
} from "./dashboard-metrics";

void test("buildOrganizerStatusCards preserves Epic 11 status order and CTA targets", () => {
  const cards = buildOrganizerStatusCards({
    DRAFT: 2,
    SUBMITTED: 1,
    PUBLISHED: 4,
    REJECTED: 3,
    CANCELLED: 1,
  });

  assert.deepEqual(
    cards.map((card) => [card.status, card.count, card.href]),
    [
      ["DRAFT", 2, "/dashboard/events?tab=draft"],
      ["SUBMITTED", 1, "/dashboard/events?tab=submitted"],
      ["PUBLISHED", 4, "/dashboard/events?tab=published"],
      ["REJECTED", 3, "/dashboard/events?tab=rejected"],
      ["CANCELLED", 1, "/dashboard/events?tab=cancelled"],
    ],
  );
  assert.equal(cards[1]?.ctaLabel, "Track review queue");
  assert.equal(cards[3]?.ctaLabel, "Fix feedback");
});

void test("summarizeRsvpStatuses counts each RSVP state without inventing check-in timestamps", () => {
  const totals = summarizeRsvpStatuses([
    "GOING",
    "ATTENDED",
    "ATTENDED",
    "WAITLISTED",
    "CANCELLED",
  ]);

  assert.deepEqual(totals, {
    total: 5,
    going: 1,
    attended: 2,
    waitlisted: 1,
    cancelled: 1,
  });
});

void test("getRsvpActivityLabel maps attendance states to honest dashboard copy", () => {
  assert.equal(getRsvpActivityLabel("GOING"), "Registered");
  assert.equal(getRsvpActivityLabel("ATTENDED"), "Checked in");
  assert.equal(getRsvpActivityLabel("WAITLISTED"), "Waitlisted");
  assert.equal(getRsvpActivityLabel("CANCELLED"), "Cancelled RSVP");
});
