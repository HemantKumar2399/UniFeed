import assert from "node:assert/strict";
import { test } from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

void test("metrics page renders the RSVP conversion section with organizer analytics rows", async () => {
  const { MetricsPageView } = await import("@/features/dashboard/components/MetricsPageView");
  const markup = renderToStaticMarkup(
    <MetricsPageView
      metrics={{
        eventCount: 6,
        rsvpCount: 14,
        upcomingEventCount: 2,
        pendingApprovalCount: 1,
        liveEventCount: 2,
        approvedEventCount: 1,
        statusCounts: {
          DRAFT: 1,
          SUBMITTED: 1,
          APPROVED: 1,
          PUBLISHED: 2,
          REJECTED: 0,
          CANCELLED: 1,
        },
        rsvpTotals: {
          total: 14,
          going: 4,
          attended: 6,
          waitlisted: 2,
          cancelled: 2,
        },
        recentActivity: [],
        conversionRows: [
          {
            eventId: 88,
            title: "Robotics Workshop",
            date: new Date("2030-05-20T10:00:00.000Z"),
            rsvpTotal: 5,
            confirmedCount: 3,
            attendedCount: 2,
            waitlistedCount: 1,
            cancelledCount: 1,
            conversionPercentage: 67,
          },
        ],
      }}
    />,
  );

  assert.match(markup, /RSVP Conversion/);
  assert.match(markup, /Attendance drop-off by event/);
  assert.match(markup, /Robotics Workshop/);
  assert.match(markup, /67% attended/);
  assert.match(markup, /2 attended/);
  assert.match(markup, /3 confirmed/);
});
