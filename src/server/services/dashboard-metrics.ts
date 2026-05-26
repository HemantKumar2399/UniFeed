import type { EventStatus, RSVPStatus } from "@prisma/client";

import {
  createEmptyEventStatusCounts,
  buildRsvpConversionRows,
  summarizeRsvpStatuses,
  type RsvpConversionRow,
  type RsvpStatusTotals,
} from "@/features/dashboard/dashboard-metrics";
import type { db as prismaDb } from "@/server/db";
import { isAdminUserRole } from "@/server/permissions/club-management";

const MANAGEABLE_CLUB_ROLES = ["OWNER", "EDITOR"] as const;
export const ADMIN_DECISION_WINDOW_DAYS = 30;
const RECENT_ACTIVITY_LIMIT = 8;
const CONVERSION_ROW_LIMIT = 8;

type DashboardUser = {
  id: string;
  role: "STUDENT" | "ORGANIZER" | "ADMIN";
  collegeId?: string | null;
};

export type AdminDashboardMetrics = {
  pendingApprovals: number;
  activeCommunities: number;
  upcomingEvents: number;
  approvedInPeriod: number;
  rejectedInPeriod: number;
  decisionWindowDays: number;
  rsvpTotals: RsvpStatusTotals;
};

export type OrganizerRecentActivity = {
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

export type OrganizerDashboardMetrics = {
  eventCount: number;
  rsvpCount: number;
  upcomingEventCount: number;
  pendingApprovalCount: number;
  liveEventCount: number;
  approvedEventCount: number;
  statusCounts: Record<EventStatus, number>;
  rsvpTotals: RsvpStatusTotals;
  recentActivity: OrganizerRecentActivity[];
  conversionRows: RsvpConversionRow[];
};

type DashboardDb = typeof prismaDb;

function getDecisionWindowStart(now: Date): Date {
  const start = new Date(now);
  start.setDate(start.getDate() - ADMIN_DECISION_WINDOW_DAYS);
  return start;
}

export async function getManagedClubIdsForDashboardUser(db: DashboardDb, user: DashboardUser) {
  if (isAdminUserRole(user.role)) {
    return null;
  }

  const memberships = await db.clubMembership.findMany({
    where: {
      userId: user.id,
      role: {
        in: [...MANAGEABLE_CLUB_ROLES],
      },
    },
    select: {
      clubId: true,
    },
  });

  return memberships.map((membership) => membership.clubId);
}

function reduceEventStatuses(
  events: Array<{ status: EventStatus }>,
): Record<EventStatus, number> {
  return events.reduce<Record<EventStatus, number>>((counts, event) => {
    counts[event.status] += 1;
    return counts;
  }, createEmptyEventStatusCounts());
}

export async function getAdminDashboardMetrics(
  db: DashboardDb,
  collegeId: string,
  now = new Date(),
): Promise<AdminDashboardMetrics> {
  const decisionWindowStart = getDecisionWindowStart(now);

  const [pendingApprovals, activeCommunities, upcomingEvents, decisionActions, rsvpRows] =
    await Promise.all([
      db.event.count({
        where: {
          collegeId,
          status: "SUBMITTED",
          deletedAt: null,
        },
      }),
      db.club.count({
        where: {
          collegeId,
          deletedAt: null,
          OR: [
            { events: { some: { deletedAt: null } } },
            { members: { some: {} } },
            { followers: { some: {} } },
          ],
        },
      }),
      db.event.count({
        where: {
          collegeId,
          status: "PUBLISHED",
          date: {
            gte: now,
          },
          deletedAt: null,
        },
      }),
      db.eventApprovalLog.findMany({
        where: {
          event: {
            collegeId,
            deletedAt: null,
          },
          action: {
            in: ["APPROVED", "REJECTED"],
          },
          createdAt: {
            gte: decisionWindowStart,
          },
        },
        select: {
          action: true,
        },
      }),
      db.rSVP.findMany({
        where: {
          event: {
            collegeId,
            deletedAt: null,
          },
        },
        select: {
          status: true,
        },
      }),
    ]);

  const approvedInPeriod = decisionActions.filter((row) => row.action === "APPROVED").length;
  const rejectedInPeriod = decisionActions.filter((row) => row.action === "REJECTED").length;
  const rsvpTotals = summarizeRsvpStatuses(rsvpRows.map((row) => row.status));

  return {
    pendingApprovals,
    activeCommunities,
    upcomingEvents,
    approvedInPeriod,
    rejectedInPeriod,
    decisionWindowDays: ADMIN_DECISION_WINDOW_DAYS,
    rsvpTotals,
  };
}

export async function getOrganizerDashboardMetrics(
  db: DashboardDb,
  user: DashboardUser,
  now = new Date(),
): Promise<OrganizerDashboardMetrics> {
  const managedClubIds = await getManagedClubIdsForDashboardUser(db, user);

  const eventScope = isAdminUserRole(user.role)
    ? user.collegeId
      ? { collegeId: user.collegeId, deletedAt: null }
      : null
    : managedClubIds && managedClubIds.length > 0
      ? { clubId: { in: managedClubIds }, deletedAt: null }
      : null;

  if (!eventScope) {
    return {
      eventCount: 0,
      rsvpCount: 0,
      upcomingEventCount: 0,
      pendingApprovalCount: 0,
      liveEventCount: 0,
      approvedEventCount: 0,
      statusCounts: createEmptyEventStatusCounts(),
      rsvpTotals: summarizeRsvpStatuses([]),
      recentActivity: [],
      conversionRows: [],
    };
  }

  const [events, rsvpRows, recentActivityRows, conversionEventRows] = await Promise.all([
    db.event.findMany({
      where: eventScope,
      select: {
        id: true,
        status: true,
        date: true,
      },
    }),
    db.rSVP.findMany({
      where: {
        event: eventScope,
      },
      select: {
        status: true,
      },
    }),
    db.rSVP.findMany({
      where: {
        event: eventScope,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: RECENT_ACTIVITY_LIMIT,
      select: {
        id: true,
        userId: true,
        status: true,
        createdAt: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        event: {
          select: {
            id: true,
            title: true,
            date: true,
          },
        },
      },
    }),
    db.event.findMany({
      where: {
        ...eventScope,
        date: {
          lt: now,
        },
        status: {
          in: ["PUBLISHED", "CANCELLED"],
        },
      },
      orderBy: {
        date: "desc",
      },
      take: CONVERSION_ROW_LIMIT,
      select: {
        id: true,
        title: true,
        date: true,
        rsvps: {
          select: {
            status: true,
          },
        },
      },
    }),
  ]);

  const statusCounts = reduceEventStatuses(events);
  const rsvpTotals = summarizeRsvpStatuses(rsvpRows.map((row) => row.status));

  return {
    eventCount: events.length,
    rsvpCount: rsvpTotals.total,
    upcomingEventCount: events.filter((event) => event.status === "PUBLISHED" && event.date >= now)
      .length,
    pendingApprovalCount: statusCounts.SUBMITTED,
    liveEventCount: events.filter((event) => event.status === "PUBLISHED" && event.date >= now)
      .length,
    approvedEventCount: statusCounts.APPROVED,
    statusCounts,
    rsvpTotals,
    recentActivity: recentActivityRows.map((row) => ({
      rsvpId: row.id,
      userId: row.userId,
      attendeeName: row.user.name ?? row.user.email ?? "Student",
      attendeeEmail: row.user.email,
      eventId: row.event.id,
      eventTitle: row.event.title,
      eventDate: row.event.date,
      status: row.status,
      registeredAt: row.createdAt,
    })),
    conversionRows: buildRsvpConversionRows(conversionEventRows),
  };
}
