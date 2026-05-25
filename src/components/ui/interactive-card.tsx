/**
 * InteractiveCard — Tactile Utility Clickable Card Surface
 * Story 6.2: Tactile Utility Component Variations
 *
 * Wraps Card with haptic press behavior for clickable card contexts
 * (e.g., event cards, hub cards, ticket cards).
 *
 * Design rules:
 *   - active:scale-95 haptic bounce (motion-safe guarded)
 *   - Hover: shadow intensification (more depth, not color change)
 *   - Focus: visible ring per :focus-visible in globals.css
 *   - Keyboard: full keyboard navigable as a div[role=button]
 *   - aria-live: announce state changes at call site using useAsyncState
 *
 * @example
 * <InteractiveCard onClick={() => openSheet(event)}>
 *   <EventCardContent event={event} />
 * </InteractiveCard>
 */

import * as React from "react";
import { cn } from "@/lib/utils";
import { HAPTIC_PRESS_CLASSES } from "@/lib/animations";

interface InteractiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the card is in a disabled/loading state */
  disabled?: boolean;
}

const InteractiveCard = React.forwardRef<HTMLDivElement, InteractiveCardProps>(
  ({ className, children, disabled, onClick, onKeyDown, ...props }, ref) => {
    const isClickable = Boolean(onClick) && !disabled;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      // Keyboard activation: Enter or Space triggers onClick
      if (isClickable && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
      }
      onKeyDown?.(e);
    };

    return (
      <div
        ref={ref}
        role={isClickable ? "button" : undefined}
        tabIndex={isClickable ? 0 : undefined}
        aria-disabled={disabled ?? undefined}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        className={cn(
          // Surface
          "bg-card-bg",
          // Whisper border
          "border-whisper",
          // Comfortable radius for standard cards
          "rounded-[12px]",
          // Base shadow: 4-layer soft card
          "shadow-card",
          // Hover: shadow intensification — felt not seen
          isClickable &&
            "motion-safe:hover:shadow-[rgba(0,0,0,0.07)_0px_8px_24px,rgba(0,0,0,0.04)_0px_4px_8px,rgba(0,0,0,0.02)_0px_1px_3px]",
          // Haptic press — the defining Tactile Utility behavior
          isClickable && HAPTIC_PRESS_CLASSES,
          // Cursor
          isClickable ? "cursor-pointer select-none" : "cursor-default",
          // Overflow clip for image cards
          "overflow-hidden",
          // Disabled
          disabled && "opacity-50 pointer-events-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

InteractiveCard.displayName = "InteractiveCard";

export { InteractiveCard };
