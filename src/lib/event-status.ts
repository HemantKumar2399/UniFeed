import { type EventStatus } from "@prisma/client";

export type EventStatusType = EventStatus;

export interface StatusMeta {
  label: string;
  description: string;
  colorClass: string; // Tailwind bg/text classes for consistent visuals
  bgClass: string;
  textClass: string;
  icon?: string; // name of a lucide icon or similar if needed
}

export const EVENT_STATUS_META: Record<EventStatusType, StatusMeta> = {
  DRAFT: {
    label: "Draft",
    description: "Not submitted yet",
    colorClass: "bg-gray-100 text-gray-700 border-gray-200",
    bgClass: "bg-gray-50",
    textClass: "text-gray-600",
  },
  SUBMITTED: {
    label: "Pending Review",
    description: "Waiting for college admin review",
    colorClass: "bg-amber-100 text-amber-800 border-amber-200",
    bgClass: "bg-amber-50/50",
    textClass: "text-amber-700",
  },
  APPROVED: {
    label: "Approved",
    description: "Approved by admin, ready to publish",
    colorClass: "bg-emerald-100 text-emerald-800 border-emerald-200",
    bgClass: "bg-emerald-50/50",
    textClass: "text-emerald-700",
  },
  REJECTED: {
    label: "Needs Changes",
    description: "Admin requested changes",
    colorClass: "bg-rose-100 text-rose-800 border-rose-200",
    bgClass: "bg-rose-50/50",
    textClass: "text-rose-700",
  },
  PUBLISHED: {
    label: "Published",
    description: "Visible to students",
    colorClass: "bg-blue-100 text-blue-800 border-blue-200",
    bgClass: "bg-blue-50/50",
    textClass: "text-blue-700",
  },
  CANCELLED: {
    label: "Cancelled",
    description: "No longer active",
    colorClass: "bg-red-100 text-red-800 border-red-200",
    bgClass: "bg-red-50/50",
    textClass: "text-red-700",
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
    colorClass: "bg-emerald-100 text-emerald-800 border-emerald-200",
    bgClass: "bg-emerald-50/50",
    textClass: "text-emerald-700",
  },
  CLOSING_SOON: {
    label: "Closing Soon",
    colorClass: "bg-amber-100 text-amber-800 border-amber-200 animate-pulse",
    bgClass: "bg-amber-50/50",
    textClass: "text-amber-700",
  },
  CLOSED_BY_DEADLINE: {
    label: "Registration Closed",
    colorClass: "bg-gray-100 text-gray-800 border-gray-200",
    bgClass: "bg-gray-50",
    textClass: "text-gray-600",
  },
  FULL: {
    label: "Full",
    colorClass: "bg-rose-100 text-rose-800 border-rose-200",
    bgClass: "bg-rose-50/50",
    textClass: "text-rose-700",
  },
  EVENT_STARTED: {
    label: "Event Started",
    colorClass: "bg-indigo-100 text-indigo-800 border-indigo-200",
    bgClass: "bg-indigo-50/50",
    textClass: "text-indigo-700",
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
