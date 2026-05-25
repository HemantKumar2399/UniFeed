/**
 * Badge Component — Tactile Utility Pill Badge System
 * Story 6.1: Typography & Color Token Definition
 *
 * Design spec (DESIGN.md §4 Pill Badge Button):
 *   - Radius: 9999px (FULL pill — defining characteristic)
 *   - Font: 12px / 600 / ls +0.125px (ONLY positive tracking in the system)
 *   - Default: tinted blue bg (#f2f9ff) + blue text (#097fe8)
 *   - Semantic variants: success (green), warning (orange), critical (pink)
 *   - Use: status indicators, tags, category labels, RSVP state, capacity state
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  // BASE: shared across all badge variants
  [
    "inline-flex items-center justify-center",
    "px-2 py-1", // 8px horizontal / 4px vertical
    "rounded-[9999px]", // FULL PILL — non-negotiable per design spec
    // Badge typography tier: 12px / 600 / +0.125px
    "text-[0.75rem] font-semibold leading-[1.33]",
    "tracking-[0.125px]", // Only positive letter-spacing in the system
    // Layout
    "whitespace-nowrap shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        // DEFAULT: Notion Blue tint — status/category labels
        default: "bg-[#f2f9ff] text-[#097fe8]",

        // SUCCESS: Confirmed / Attended / Completed
        success: "bg-[rgba(26,174,57,0.1)] text-[#1aae39]",

        // WARNING: Capacity > 75%, approaching deadline
        warning: "bg-[rgba(221,91,0,0.1)] text-[#dd5b00]",

        // CRITICAL: Capacity > 95%, urgent
        critical: "bg-[rgba(255,100,200,0.12)] text-[#cc44a0]",

        // NEUTRAL: Muted label, inactive state
        neutral: "bg-muted text-muted-foreground",

        // DARK: Inverted — for use on dark surfaces
        dark: "bg-white/10 text-white",

        // OUTLINE: Whisper border variant
        outline:
          "bg-transparent border border-whisper text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Badge — pill-shaped status indicator.
 * Always use <span> (not <button>) unless it's interactive.
 * For interactive badges (e.g. filter toggles), use Button with pill styling.
 *
 * @example
 * <Badge>New</Badge>
 * <Badge variant="success">✓ Secured</Badge>
 * <Badge variant="warning">Filling up</Badge>
 * <Badge variant="critical">Almost full</Badge>
 */
const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
