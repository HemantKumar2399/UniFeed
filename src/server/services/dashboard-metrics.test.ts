/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
process.env.SKIP_ENV_VALIDATION = "1";

import assert from "node:assert/strict";
import test from "node:test";

import {
  ADMIN_DECISION_WINDOW_DAYS,
  getAdminDashboardMetrics,
  getOrganizerDashboardMetrics,
} from "./dashboard-metrics";

void test("getAdminDashboardMetrics returns college-scoped workflow and RSVP totals", async () => {
  let activeCommunityWhere: unknown;
  let upcomingEventWhere: unknown;
  let approvalWhere: unknown;
  let rsvpWhere: unknown;

  const now = new Date("2030-05-24T10:00:00.000Z");
  const metrics = await getAdminDashboardMetrics(
    {
      event: {
        count: async (args: any) => {
          if (args.where.status === "SUBMITTED") {
            return 3;
          }

          upcomingEventWhere = args.where;
          return 9;
        },
      },
      club: {
        count: async (args: any) => {
          activeCommunityWhere = args.where;
          return 6;
        },
      },
      eventApprovalLog: {
        findMany: async (args: any) => {
          approvalWhere = args.where;
          return [{ action: "APPROVED" }, { action: "APPROVED" }, { action: "REJECTED" }];
        },
      },
      rSVP: {
        findMany: async (args: any) => {
          rsvpWhere = args.where;
          return [
            { status: "GOING" },
            { status: "ATTENDED" },
            { status: "WAITLISTED" },
          ];
        },
      },
    } as any,
    "college-1",
    now,
  );

  assert.deepEqual(activeCommunityWhere, {
    collegeId: "college-1",
    deletedAt: null,
    OR: [
      { events: { some: { deletedAt: null } } },
      { members: { some: {} } },
      { followers: { some: {} } },
    ],
  });
  assert.deepEqual(upcomingEventWhere, {
    collegeId: "college-1",
    status: "PUBLISHED",
    date: {
      gte: now,
    },
    deletedAt: null,
  });
  assert.deepEqual(rsvpWhere, {
    event: {
      collegeId: "college-1",
      deletedAt: null,
    },
  });
  assert.equal((approvalWhere as any).event.collegeId, "college-1");
  assert.equal((approvalWhere as any).event.deletedAt, null);
  assert.equal((approvalWhere as any).createdAt.gte.toISOString(), "2030-04-24T10:00:00.000Z");
  assert.equal(metrics.pendingApprovals, 3);
  assert.equal(metrics.activeCommunities, 6);
  assert.equal(metrics.upcomingEvents, 9);
  assert.equal(metrics.approvedInPeriod, 2);
  assert.equal(metrics.rejectedInPeriod, 1);
  assert.equal(metrics.decisionWindowDays, ADMIN_DECISION_WINDOW_DAYS);
  assert.deepEqual(metrics.rsvpTotals, {
    total: 3,
    going: 1,
    attended: 1,
    waitlisted: 1,
    cancelled: 0,
  });
});

void test("getOrganizerDashboardMetrics scopes organizer metrics to managed clubs and recent activity", async () => {
  let membershipWhere: unknown;
  let eventWhere: unknown;
  let conversionWhere: unknown;
  let rsvpStatusWhere: unknown;
  let recentActivityWhere: unknown;

  const now = new Date("2030-05-24T10:00:00.000Z");
  const metrics = await getOrganizerDashboardMetrics(
    {
      clubMembership: {
        findMany: async (args: any) => {
          membershipWhere = args.where;
          return [{ clubId: 4 }, { clubId: 9 }];
        },
      },
      event: {
        findMany: async (args: any) => {
          if (args.select?.rsvps) {
            conversionWhere = args.where;
            return [
              {
                id: 7,
                title: "Past Workshop",
                date: new Date("2030-05-20T10:00:00.000Z"),
                rsvps: [
                  { status: "ATTENDED" },
                  { status: "GOING" },
                  { status: "WAITLISTED" },
                ],
              },
            ];
          }

          eventWhere = args.where;
          return [
            { id: 1, status: "DRAFT", date: new Date("2030-05-30T10:00:00.000Z") },
            { id: 2, status: "SUBMITTED", date: new Date("2030-05-31T10:00:00.000Z") },
            { id: 3, status: "PUBLISHED", date: new Date("2030-05-25T10:00:00.000Z") },
            { id: 4, status: "APPROVED", date: new Date("2030-05-28T10:00:00.000Z") },
            { id: 5, status: "REJECTED", date: new Date("2030-05-20T10:00:00.000Z") },
            { id: 6, status: "CANCELLED", date: new Date("2030-05-18T10:00:00.000Z") },
          ];
        },
      },
      rSVP: {
        findMany: async (args: any) => {
          if (args.orderBy) {
            recentActivityWhere = args.where;
            return [
              {
                id: 44,
                userId: "student-1",
                status: "ATTENDED",
                createdAt: new Date("2030-05-24T09:45:00.000Z"),
                user: {
                  name: "Aarav Sharma",
                  email: "aarav@college.edu",
                },
                event: {
                  id: 3,
                  title: "Robotics Workshop",
                  date: new Date("2030-05-25T10:00:00.000Z"),
                },
              },
            ];
          }

          rsvpStatusWhere = args.where;
          return [{ status: "GOING" }, { status: "ATTENDED" }, { status: "ATTENDED" }];
        },
      },
    } as any,
    {
      id: "organizer-1",
      role: "ORGANIZER",
      collegeId: "college-1",
    },
    now,
  );

  assert.deepEqual(membershipWhere, {
    userId: "organizer-1",
    role: {
      in: ["OWNER", "EDITOR"],
    },
  });
  assert.deepEqual(eventWhere, {
    clubId: {
      in: [4, 9],
    },
    deletedAt: null,
  });
  assert.deepEqual(rsvpStatusWhere, {
    event: {
      clubId: {
        in: [4, 9],
      },
      deletedAt: null,
    },
  });
  assert.deepEqual(recentActivityWhere, {
    event: {
      clubId: {
        in: [4, 9],
      },
      deletedAt: null,
    },
  });
  assert.deepEqual(conversionWhere, {
    clubId: {
      in: [4, 9],
    },
    deletedAt: null,
    date: {
      lt: now,
    },
    status: {
      in: ["PUBLISHED", "CANCELLED"],
    },
  });
  assert.equal(metrics.eventCount, 6);
  assert.equal(metrics.rsvpCount, 3);
  assert.equal(metrics.upcomingEventCount, 1);
  assert.equal(metrics.pendingApprovalCount, 1);
  assert.equal(metrics.liveEventCount, 1);
  assert.equal(metrics.approvedEventCount, 1);
  assert.equal(metrics.statusCounts.DRAFT, 1);
  assert.equal(metrics.statusCounts.CANCELLED, 1);
  assert.equal(metrics.rsvpTotals.attended, 2);
  assert.equal(metrics.recentActivity[0]?.attendeeName, "Aarav Sharma");
  assert.equal(metrics.recentActivity[0]?.status, "ATTENDED");
  assert.equal(metrics.conversionRows[0]?.eventId, 7);
  assert.equal(metrics.conversionRows[0]?.conversionPercentage, 50);
});

void test("getOrganizerDashboardMetrics returns an empty state when an organizer manages no clubs", async () => {
  const metrics = await getOrganizerDashboardMetrics(
    {
      clubMembership: {
        findMany: async () => [],
      },
    } as any,
    {
      id: "organizer-1",
      role: "ORGANIZER",
      collegeId: "college-1",
    },
    new Date("2030-05-24T10:00:00.000Z"),
  );

  assert.deepEqual(metrics.statusCounts, {
    DRAFT: 0,
    SUBMITTED: 0,
    APPROVED: 0,
    PUBLISHED: 0,
    REJECTED: 0,
    CANCELLED: 0,
  });
  assert.equal(metrics.eventCount, 0);
  assert.equal(metrics.rsvpCount, 0);
  assert.equal(metrics.recentActivity.length, 0);
  assert.equal(metrics.conversionRows.length, 0);
});
