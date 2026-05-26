import assert from "node:assert/strict";
import test from "node:test";

import {
  buildRsvpConversionRows,
  buildOrganizerStatusCards,
  calculateRsvpConversionPercentage,
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

void test("buildRsvpConversionRows calculates attendance conversion without divide-by-zero drift", () => {
  const rows = buildRsvpConversionRows([
    {
      id: 88,
      title: "Robotics Workshop",
      date: new Date("2030-05-20T10:00:00.000Z"),
      rsvps: [
        { status: "ATTENDED" },
        { status: "ATTENDED" },
        { status: "GOING" },
        { status: "WAITLISTED" },
        { status: "CANCELLED" },
      ],
    },
    {
      id: 89,
      title: "Empty Event",
      date: new Date("2030-05-21T10:00:00.000Z"),
      rsvps: [{ status: "WAITLISTED" }, { status: "CANCELLED" }],
    },
  ]);

  assert.equal(calculateRsvpConversionPercentage(2, 3), 67);
  assert.equal(calculateRsvpConversionPercentage(2, 0), 0);
  assert.deepEqual(rows[0], {
    eventId: 88,
    title: "Robotics Workshop",
    date: new Date("2030-05-20T10:00:00.000Z"),
    rsvpTotal: 5,
    confirmedCount: 3,
    attendedCount: 2,
    waitlistedCount: 1,
    cancelledCount: 1,
    conversionPercentage: 67,
  });
  assert.equal(rows[1]?.confirmedCount, 0);
  assert.equal(rows[1]?.conversionPercentage, 0);
});
