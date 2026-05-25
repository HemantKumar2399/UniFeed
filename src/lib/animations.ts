/**
 * Animation Primitives — Tactile Utility Design System
 * Story 6.2: Tactile Utility Component Variations
 *
 * Philosophy:
 *   - ALL animations must use motion-safe wrappers (WCAG requirement)
 *   - Interaction latency target: < 50ms (NFR-1)
 *   - active:scale-95 is the signature "haptic" bounce — used on every interactive element
 *   - No animation should feel heavy or slow — these are micro-interactions only
 *
 * Usage:
 *   import { ANIMATION, hapticClass } from "@/lib/animations"
 *   <button className={hapticClass("bg-blue-500 text-white")}>Click</button>
 */

import { cn } from "@/lib/utils";

// ============================================================
// DURATION CONSTANTS
// These match the CSS custom properties in globals.css @theme
// ============================================================

export const ANIMATION = {
  /** Haptic bounce: active:scale-95 — sub-50ms via CSS transform */
  HAPTIC_DURATION_MS: 200,
  /** Standard UI transitions: color, shadow, border */
  TRANSITION_DURATION_MS: 200,
  /** Skeleton loader pulse cycle */
  SKELETON_DURATION_MS: 1500,
  /** RSVP "Locking..." state timeout */
  RSVP_LOCK_TIMEOUT_MS: 150,
} as const;

// ============================================================
// TAILWIND CLASS SETS
// Pre-composed motion-safe animation class strings.
// Always use these rather than inline Tailwind chains.
// ============================================================

/**
 * Haptic Press — the signature Tactile Utility interaction.
 * - active:scale-95 provides the "physical press" sensation
 * - motion-safe: guard ensures no animation for users who prefer reduced motion
 * - hover:scale-[1.02] adds subtle lift on hover (restrained — not dramatic)
 */
export const HAPTIC_PRESS_CLASSES =
  "transition-transform duration-200 ease-out motion-safe:active:scale-95 motion-safe:hover:scale-[1.02]" as const;

/**
 * Haptic Press (no hover lift) — for elements where hover scale is unwanted
 * e.g., icon buttons, badge toggles
 */
export const HAPTIC_PRESS_NO_HOVER_CLASSES =
  "transition-transform duration-200 ease-out motion-safe:active:scale-95" as const;

/**
 * Smooth transition for color/shadow/opacity state changes
 * Use on elements that change appearance (not position/scale)
 */
export const SMOOTH_TRANSITION_CLASSES =
  "transition-all duration-200 ease-out" as const;

/**
 * Skeleton pulse animation — matches globals.css @keyframes skeleton-pulse
 */
export const SKELETON_PULSE_CLASSES =
  "animate-pulse bg-muted rounded" as const;

/**
 * Fade-in — used for bottom sheets, dialogs, overlays
 */
export const FADE_IN_CLASSES =
  "motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200" as const;

/**
 * Slide-up — used for bottom sheets appearing from bottom
 */
export const SLIDE_UP_CLASSES =
  "motion-safe:animate-in motion-safe:slide-in-from-bottom motion-safe:duration-200 motion-safe:ease-out" as const;

/**
 * Slide-down — used for dropdowns appearing from top
 */
export const SLIDE_DOWN_CLASSES =
  "motion-safe:animate-in motion-safe:slide-in-from-top-2 motion-safe:duration-150 motion-safe:ease-out" as const;

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

/**
 * hapticClass — compose any className string with haptic press behavior.
 * Automatically includes motion-safe guard.
 *
 * @example
 * <button className={hapticClass("bg-notion-blue text-white px-4 py-2")}>
 *   Click Me
 * </button>
 */
export function hapticClass(...classes: Parameters<typeof cn>): string {
  return cn(HAPTIC_PRESS_CLASSES, ...classes);
}

/**
 * interactiveCard — compose classes for card-like elements that lift on hover.
 * Combines soft shadow, whisper border, haptic press, and hover shadow lift.
 */
export function interactiveCardClass(...classes: Parameters<typeof cn>): string {
  return cn(
    // Surface
    "bg-card-bg border border-whisper rounded-[12px] transition-colors duration-300",
    // Base shadow
    "shadow-card",
    // Hover: slightly deeper shadow (shadow intensification)
    "motion-safe:hover:shadow-[rgba(0,0,0,0.07)_0px_8px_24px,rgba(0,0,0,0.04)_0px_4px_8px]",
    // Haptic transform
    HAPTIC_PRESS_CLASSES,
    ...classes
  );
}
