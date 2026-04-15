"use client";

/**
 * useReducedMotion — WCAG Accessibility Hook
 * Story 6.2: Tactile Utility Component Variations
 *
 * Reads the OS-level `prefers-reduced-motion` media query.
 * When true, all animations should be suppressed or simplified.
 *
 * Note: Tailwind's `motion-safe:` and `motion-reduce:` utility prefixes
 * handle this automatically in CSS. Use this hook only when you need
 * JavaScript-level control (e.g., conditionally rendering animated components,
 * skipping canvas animations, controlling JS-driven timers).
 *
 * @example
 * const prefersReducedMotion = useReducedMotion();
 * const duration = prefersReducedMotion ? 0 : 200;
 */

import { useEffect, useState } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function useReducedMotion(): boolean {
  // SSR-safe: default to false (animations on) until we can read the media query
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Guard: media queries are browser-only
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);

    // Set the initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for OS-level changes (user can toggle in system settings)
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
}
