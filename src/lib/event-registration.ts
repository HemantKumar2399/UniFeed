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

  if (input.registrationClosesAt.getTime() - now.getTime() <= CLOSING_SOON_WINDOW_MS) {
    return "CLOSING_SOON";
  }

  return "OPEN";
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

export function formatRegistrationDeadline(date: Date | null | undefined): string {
  if (!date) {
    return "Not set";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
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
