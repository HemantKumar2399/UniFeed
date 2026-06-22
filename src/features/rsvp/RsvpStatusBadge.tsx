import type { RSVPStatus } from "@prisma/client";

import { Badge, type BadgeProps } from "@/components/ui/badge";
import {
  getRsvpStatusBadgeVariant,
  getRsvpStatusLabel,
} from "@/features/rsvp/rsvp-status";

type RsvpStatusBadgeProps = Omit<BadgeProps, "children" | "variant"> & {
  status: RSVPStatus;
};

export function RsvpStatusBadge({
  status,
  className,
  ...props
}: RsvpStatusBadgeProps) {
  return (
    <Badge
      className={className}
      variant={getRsvpStatusBadgeVariant(status)}
      {...props}
    >
      {getRsvpStatusLabel(status)}
    </Badge>
  );
}
