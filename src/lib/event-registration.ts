import { formatPlatformDate } from "@/lib/platform-date";
import type { EventStatus } from "@prisma/client";

const CLOSING_SOON_WINDOW_MS = 24 * 60 * 60 * 1000;

export type RegistrationAvailability =
  | "OPEN"
  | "CLOSING_SOON"
  | "CLOSED_BY_DEADLINE"
  | "FULL"
  | "WAITLIST_OPEN"
  | "EVENT_STARTED"
  | "EVENT_CANCELLED"
  | "NOT_PUBLISHED";

type RegistrationAvailabilityInput = {
  status: EventStatus;
  date: Date;
  registrationClosesAt: Date | null;
  capacity: number;
  activeCount: number;
  waitlistEnabled: boolean;
  now?: Date;
};

type RegistrationReopenableInput = {
  status: EventStatus;
  date: Date;
  now?: Date;
};

export function getRegistrationAvailability(
  input: RegistrationAvailabilityInput,
): RegistrationAvailability {
  const now = input.now ?? new Date();

  if (input.status === "CANCELLED") {
    return "EVENT_CANCELLED";
  }

  if (input.status !== "PUBLISHED") {
    return "NOT_PUBLISHED";
  }

  if (input.date <= now) {
    return "EVENT_STARTED";
  }

  if (!input.registrationClosesAt || input.registrationClosesAt <= now) {
    return "CLOSED_BY_DEADLINE";
  }

  if (input.activeCount >= input.capacity) {
    return input.waitlistEnabled ? "WAITLIST_OPEN" : "FULL";
  }

  if (
    input.registrationClosesAt.getTime() - now.getTime() <=
    CLOSING_SOON_WINDOW_MS
  ) {
    return "CLOSING_SOON";
  }

  return "OPEN";
}

export type OrganizerDeadlineStateInput = {
  status: EventStatus;
  date: Date;
  registrationClosesAt: Date | null;
  isReopened?: boolean;
  now?: Date;
};

export function getOrganizerDeadlineState(
  input: OrganizerDeadlineStateInput,
): string {
  const now = input.now ?? new Date();

  if (!input.registrationClosesAt) {
    return "Deadline missing";
  }

  if (input.registrationClosesAt >= input.date) {
    return "Deadline invalid";
  }

  if (input.registrationClosesAt <= now) {
    if (
      input.status === "SUBMITTED" ||
      input.status === "APPROVED" ||
      input.status === "DRAFT"
    ) {
      return "Deadline expired before approval";
    }
    return "Registration closed";
  }

  if (input.status === "PUBLISHED") {
    if (input.isReopened) {
      return "Reopened";
    }
    if (
      input.registrationClosesAt.getTime() - now.getTime() <=
      CLOSING_SOON_WINDOW_MS
    ) {
      return "Closing soon";
    }
    return "Registration open";
  }

  if (input.status === "APPROVED") {
    return "Ready to publish";
  }

  return "Registration scheduled";
}

export type AdminDeadlineStateInput = {
  registrationClosesAt: Date | null;
  eventDate: Date;
  now?: Date;
};

export function getApprovalBlockedReason(
  input: AdminDeadlineStateInput,
): string | null {
  const now = input.now ?? new Date();

  if (!input.registrationClosesAt) {
    return "This event is missing a registration deadline.";
  }

  if (input.registrationClosesAt >= input.eventDate) {
    return "The registration deadline must be earlier than the event start time.";
  }

  if (input.registrationClosesAt <= now) {
    return "The registration deadline has already expired.";
  }

  return null;
}

export function getAdminDeadlineState(input: AdminDeadlineStateInput) {
  const now = input.now ?? new Date();

  if (!input.registrationClosesAt) {
    return {
      label: "Missing deadline (Blocks approval)",
      className: "border-red-200 bg-red-50 text-red-700",
    };
  }

  if (input.registrationClosesAt >= input.eventDate) {
    return {
      label: "Invalid deadline (Blocks approval)",
      className: "border-red-200 bg-red-50 text-red-700",
    };
  }

  if (input.registrationClosesAt <= now) {
    return {
      label: "Expired deadline (Blocks approval)",
      className: "border-red-200 bg-red-50 text-red-700",
    };
  }

  if (
    input.registrationClosesAt.getTime() - now.getTime() <=
    CLOSING_SOON_WINDOW_MS
  ) {
    return {
      label: "Closing soon",
      className: "border-amber-200 bg-amber-50 text-amber-700",
    };
  }

  return {
    label: "Valid deadline",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  };
}

export function isRegistrationReopenable(
  input: RegistrationReopenableInput,
): boolean {
  const now = input.now ?? new Date();

  return (
    (input.status === "APPROVED" || input.status === "PUBLISHED") &&
    input.date > now
  );
}

export function formatRegistrationDeadline(
  date: Date | null | undefined,
): string {
  if (!date) {
    return "Not set";
  }

  return formatPlatformDate(date, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function getRegistrationAvailabilityLabel(
  availability: RegistrationAvailability,
): string {
  switch (availability) {
    case "OPEN":
      return "Registration open";
    case "CLOSING_SOON":
      return "Closing soon";
    case "CLOSED_BY_DEADLINE":
      return "Registration closed";
    case "FULL":
      return "Event full";
    case "WAITLIST_OPEN":
      return "Waitlist open";
    case "EVENT_STARTED":
      return "Event started";
    case "EVENT_CANCELLED":
      return "Event cancelled";
    case "NOT_PUBLISHED":
      return "Not published";
    default:
      return "Registration open";
  }
}

export function getRegistrationActionLabel(
  availability: RegistrationAvailability,
): string {
  switch (availability) {
    case "WAITLIST_OPEN":
      return "Join Waitlist";
    case "FULL":
      return "Event Full";
    case "CLOSED_BY_DEADLINE":
      return "Registration Closed";
    case "EVENT_STARTED":
      return "Event Started";
    case "EVENT_CANCELLED":
      return "Event Cancelled";
    case "NOT_PUBLISHED":
      return "Not Published";
    case "OPEN":
    case "CLOSING_SOON":
    default:
      return "Reserve Spot";
  }
}

export function getRegistrationAvailabilityBadgeVariant(
  availability: RegistrationAvailability,
): "default" | "success" | "warning" | "critical" | "neutral" {
  switch (availability) {
    case "OPEN":
      return "success";
    case "CLOSING_SOON":
    case "WAITLIST_OPEN":
      return "warning";
    case "FULL":
    case "CLOSED_BY_DEADLINE":
    case "EVENT_STARTED":
    case "EVENT_CANCELLED":
      return "neutral";
    case "NOT_PUBLISHED":
    default:
      return "default";
  }
}
