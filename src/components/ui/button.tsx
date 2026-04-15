/**
 * Button Component — Tactile Utility 3-Tier Hierarchy
 * Story 6.1 / 6.2: Typography & Color Token Definition + Tactile Variants
 *
 * Tiers:
 *   1. primary   — Notion Blue CTA (#0075de) — reserve for the primary action
 *   2. secondary — Translucent warm gray — secondary actions
 *   3. ghost     — Transparent + underline hover — tertiary / inline links
 *   4. destructive — Red-tinted — destructive confirmation only
 *
 * All variants enforce:
 *   - active:scale-95 haptic transform (< 50ms via CSS)
 *   - motion-safe wrapper (WCAG requirement)
 *   - minimum 44×44px touch targets (UX-DR9)
 *   - focus-visible ring via globals.css :focus-visible
 */

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // BASE: shared across all variants
  [
    // Layout
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    // Typography (Nav/Button tier from design system)
    "text-[0.9375rem] font-semibold leading-[1.33]",
    // Minimum touch target (UX-DR9: 44×44px)
    "min-h-[44px] min-w-[44px]",
    // Interaction
    "cursor-pointer select-none",
    "transition-all duration-200 ease-out",
    // Haptic scale — motion-safe guard (WCAG: prefers-reduced-motion)
    "motion-safe:active:scale-95",
    // Disabled state
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        // TIER 1: Primary — Notion Blue
        // Use ONLY for the most important CTA on a page/section
        primary: [
          "bg-[var(--color-notion-blue)] text-white",
          "border border-transparent",
          "hover:bg-[var(--color-notion-blue-hover)]",
          "motion-safe:hover:scale-[1.02]",
        ].join(" "),

        // TIER 2: Secondary — Solid translucent warm gray
        // Supporting actions, form submissions
        secondary: [
          "bg-black/[0.05] text-[rgba(0,0,0,0.95)]",
          "border border-transparent",
          "hover:bg-black/[0.08]",
          "motion-safe:hover:scale-[1.02]",
        ].join(" "),

        // TIER 3: Ghost / Link — Transparent, underline on hover
        // Tertiary actions, inline text links
        ghost: [
          "bg-transparent text-[rgba(0,0,0,0.95)]",
          "border border-transparent",
          "hover:underline",
        ].join(" "),

        // Outline variant — whisper border, no fill
        outline: [
          "bg-transparent text-[rgba(0,0,0,0.95)]",
          "border border-[rgba(0,0,0,0.1)]",
          "hover:bg-black/[0.03]",
          "motion-safe:hover:scale-[1.02]",
        ].join(" "),

        // Destructive — red-tinted for dangerous actions
        destructive: [
          "bg-red-600 text-white",
          "border border-transparent",
          "hover:bg-red-700",
          "motion-safe:hover:scale-[1.02]",
        ].join(" "),
      },

      size: {
        // Standard button: 8px vertical, 16px horizontal padding (DESIGN.md spec)
        default: "px-4 py-2 rounded-[4px]",
        // Compact — form actions, tight layouts
        sm: "px-3 py-1.5 rounded-[4px] text-sm",
        // Large — hero CTAs
        lg: "px-6 py-3 rounded-[4px] text-base",
        // Icon-only — must still hit 44×44px touch target
        icon: "size-11 rounded-[4px] p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/**
 * Button — use `variant` to select the tier, `size` to adjust padding.
 * Always set a descriptive `aria-label` on icon-only buttons.
 *
 * @example
 * <Button variant="primary">RSVP Now</Button>
 * <Button variant="secondary">Save Draft</Button>
 * <Button variant="ghost">Cancel</Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
