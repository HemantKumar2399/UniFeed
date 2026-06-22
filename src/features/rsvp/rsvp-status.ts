import type { RSVPStatus } from "@prisma/client";

import type { BadgeProps } from "@/components/ui/badge";

export function getRsvpStatusLabel(status: RSVPStatus): string {
  switch (status) {
    case "GOING":
      return "Going";
    case "ATTENDED":
      return "Attended";
    case "WAITLISTED":
      return "Waitlisted";
    case "CANCELLED":
      return "Cancelled";
    default:
      return status;
  }
}

export function getRsvpStatusBadgeVariant(
  status: RSVPStatus,
): NonNullable<BadgeProps["variant"]> {
  switch (status) {
    case "GOING":
    case "ATTENDED":
      return "success";
    case "WAITLISTED":
      return "warning";
    case "CANCELLED":
      return "danger";
    default:
      return "neutral";
  }
}
