import type { EventStatus, RSVPStatus } from "@prisma/client";

export const ORGANIZER_STATUS_CARD_ORDER = [
  "DRAFT",
  "SUBMITTED",
  "PUBLISHED",
  "REJECTED",
  "CANCELLED",
] as const;

export type OrganizerStatusCardStatus = (typeof ORGANIZER_STATUS_CARD_ORDER)[number];

export type OrganizerStatusCard = {
  status: OrganizerStatusCardStatus;
  title: string;
  count: number;
  href: string;
  ctaLabel: string;
  description: string;
};

export type RsvpStatusTotals = {
  total: number;
  going: number;
  attended: number;
  waitlisted: number;
  cancelled: number;
};

export type RsvpConversionEventInput = {
  id: number;
  title: string;
  date: Date;
  rsvps: Array<{
    status: RSVPStatus;
  }>;
};

export type RsvpConversionRow = {
  eventId: number;
  title: string;
  date: Date;
  rsvpTotal: number;
  confirmedCount: number;
  attendedCount: number;
  waitlistedCount: number;
  cancelledCount: number;
  conversionPercentage: number;
};

const statusCardCopy: Record<
  OrganizerStatusCardStatus,
  { title: string; href: string; ctaLabel: string; description: string }
> = {
  DRAFT: {
    title: "Drafts",
    href: "/dashboard/events?tab=draft",
    ctaLabel: "Finish drafts",
    description: "Events still being shaped before review.",
  },
  SUBMITTED: {
    title: "Submitted",
    href: "/dashboard/events?tab=submitted",
    ctaLabel: "Track review queue",
    description: "Waiting on college admin approval.",
  },
  PUBLISHED: {
    title: "Published",
    href: "/dashboard/events?tab=published",
    ctaLabel: "View live events",
    description: "Visible to students and ready for attendance.",
  },
  REJECTED: {
    title: "Rejected",
    href: "/dashboard/events?tab=rejected",
    ctaLabel: "Fix feedback",
    description: "Need changes before they can move again.",
  },
  CANCELLED: {
    title: "Cancelled",
    href: "/dashboard/events?tab=cancelled",
    ctaLabel: "Review records",
    description: "Closed events with a saved cancellation trail.",
  },
};

export function createEmptyEventStatusCounts(): Record<EventStatus, number> {
  return {
    DRAFT: 0,
    SUBMITTED: 0,
    APPROVED: 0,
    PUBLISHED: 0,
    REJECTED: 0,
    CANCELLED: 0,
  };
}

export function buildOrganizerStatusCards(
  counts: Partial<Record<EventStatus, number>>,
): OrganizerStatusCard[] {
  return ORGANIZER_STATUS_CARD_ORDER.map((status) => {
    const copy = statusCardCopy[status];

    return {
      status,
      title: copy.title,
      count: counts[status] ?? 0,
      href: copy.href,
      ctaLabel: copy.ctaLabel,
      description: copy.description,
    };
  });
}

export function summarizeRsvpStatuses(statuses: RSVPStatus[]): RsvpStatusTotals {
  return statuses.reduce<RsvpStatusTotals>(
    (totals, status) => {
      totals.total += 1;

      switch (status) {
        case "GOING":
          totals.going += 1;
          break;
        case "ATTENDED":
          totals.attended += 1;
          break;
        case "WAITLISTED":
          totals.waitlisted += 1;
          break;
        case "CANCELLED":
          totals.cancelled += 1;
          break;
      }

      return totals;
    },
    {
      total: 0,
      going: 0,
      attended: 0,
      waitlisted: 0,
      cancelled: 0,
    },
  );
}

export function calculateRsvpConversionPercentage(
  attendedCount: number,
  confirmedCount: number,
): number {
  if (confirmedCount <= 0) {
    return 0;
  }

  return Math.round((attendedCount / confirmedCount) * 100);
}

export function buildRsvpConversionRows(
  events: RsvpConversionEventInput[],
): RsvpConversionRow[] {
  return events.map((event) => {
    const totals = summarizeRsvpStatuses(event.rsvps.map((rsvp) => rsvp.status));
    const confirmedCount = totals.going + totals.attended;

    return {
      eventId: event.id,
      title: event.title,
      date: event.date,
      rsvpTotal: totals.total,
      confirmedCount,
      attendedCount: totals.attended,
      waitlistedCount: totals.waitlisted,
      cancelledCount: totals.cancelled,
      conversionPercentage: calculateRsvpConversionPercentage(
        totals.attended,
        confirmedCount,
      ),
    };
  });
}

export function formatDashboardDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function getRsvpActivityLabel(status: RSVPStatus): string {
  switch (status) {
    case "ATTENDED":
      return "Checked in";
    case "WAITLISTED":
      return "Waitlisted";
    case "CANCELLED":
      return "Cancelled RSVP";
    case "GOING":
    default:
      return "Registered";
  }
}
