import { type EventStatus } from "@prisma/client";

export type EventStatusType = EventStatus;

export interface StatusMeta {
  label: string;
  description: string;
  colorClass: string;
  bgClass: string;
  textClass: string;
  icon?: string; // name of a lucide icon or similar if needed
}

export const EVENT_STATUS_META: Record<EventStatusType, StatusMeta> = {
  DRAFT: {
    label: "Draft",
    description: "Not submitted yet",
    colorClass: "border-whisper bg-app-bg text-muted-foreground",
    bgClass: "bg-app-bg",
    textClass: "text-muted-foreground",
  },
  SUBMITTED: {
    label: "Pending Review",
    description: "Waiting for college admin review",
    colorClass: "border-status-warning-border bg-status-warning-surface text-orange",
    bgClass: "bg-status-warning-surface",
    textClass: "text-orange",
  },
  APPROVED: {
    label: "Approved",
    description: "Approved by admin, ready to publish",
    colorClass: "border-status-success-border bg-status-success-surface text-green",
    bgClass: "bg-status-success-surface",
    textClass: "text-green",
  },
  REJECTED: {
    label: "Needs Changes",
    description: "Admin requested changes",
    colorClass: "border-status-danger-border bg-status-danger-surface text-danger",
    bgClass: "bg-status-danger-surface",
    textClass: "text-danger",
  },
  PUBLISHED: {
    label: "Published",
    description: "Visible to students",
    colorClass: "border-brand-border bg-brand-surface text-notion-blue",
    bgClass: "bg-brand-surface",
    textClass: "text-notion-blue",
  },
  CANCELLED: {
    label: "Cancelled",
    description: "No longer active",
    colorClass: "border-status-danger-border bg-status-danger-surface text-danger",
    bgClass: "bg-status-danger-surface",
    textClass: "text-danger",
  },
};

export type RegistrationStatus =
  | "OPEN"
  | "CLOSING_SOON"
  | "CLOSED_BY_DEADLINE"
  | "FULL"
  | "EVENT_STARTED";

export interface RegistrationStatusMeta {
  label: string;
  colorClass: string;
  bgClass: string;
  textClass: string;
}

export const REGISTRATION_STATUS_META: Record<RegistrationStatus, RegistrationStatusMeta> = {
  OPEN: {
    label: "Registration Open",
    colorClass: "border-status-success-border bg-status-success-surface text-green",
    bgClass: "bg-status-success-surface",
    textClass: "text-green",
  },
  CLOSING_SOON: {
    label: "Closing Soon",
    colorClass: "border-status-warning-border bg-status-warning-surface text-orange motion-safe:animate-pulse",
    bgClass: "bg-status-warning-surface",
    textClass: "text-orange",
  },
  CLOSED_BY_DEADLINE: {
    label: "Registration Closed",
    colorClass: "border-whisper bg-app-bg text-muted-foreground",
    bgClass: "bg-app-bg",
    textClass: "text-muted-foreground",
  },
  FULL: {
    label: "Full",
    colorClass: "border-status-danger-border bg-status-danger-surface text-danger",
    bgClass: "bg-status-danger-surface",
    textClass: "text-danger",
  },
  EVENT_STARTED: {
    label: "Event Started",
    colorClass: "border-brand-border bg-brand-surface text-notion-blue",
    bgClass: "bg-brand-surface",
    textClass: "text-notion-blue",
  },
};

export function getRegistrationStatus(event: {
  date: Date | string;
  registrationClosesAt: Date | string | null;
  capacity: number;
  _count?: { rsvps: number } | null;
  rsvps?: { status: string }[] | null;
}): RegistrationStatus {
  const now = new Date();
  const eventDate = new Date(event.date);

  // If event has started
  if (eventDate <= now) {
    return "EVENT_STARTED";
  }

  // If registration closes at is set and passed
  if (event.registrationClosesAt) {
    const closesAt = new Date(event.registrationClosesAt);
    if (closesAt <= now) {
      return "CLOSED_BY_DEADLINE";
    }
  }

  // Count active RSVPs (GOING or ATTENDED)
  let rsvpCount = 0;
  if (event._count && typeof event._count.rsvps === "number") {
    rsvpCount = event._count.rsvps;
  } else if (event.rsvps && Array.isArray(event.rsvps)) {
    rsvpCount = event.rsvps.filter(
      (r) => r.status === "GOING" || r.status === "ATTENDED"
    ).length;
  }

  if (rsvpCount >= event.capacity) {
    return "FULL";
  }

  // Check if registration closes soon (e.g., less than 24 hours left)
  if (event.registrationClosesAt) {
    const closesAt = new Date(event.registrationClosesAt);
    const hoursLeft = (closesAt.getTime() - now.getTime()) / (1000 * 60 * 60);
    if (hoursLeft > 0 && hoursLeft <= 24) {
      return "CLOSING_SOON";
    }
  }

  return "OPEN";
}
