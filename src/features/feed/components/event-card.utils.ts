import { formatPlatformDate } from "@/lib/platform-date";
export const EXPAND_ANIMATION_DURATION_MS = 300;

export function formatEventDateMeta(dateInput: Date | string): string {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  return formatPlatformDate(date, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function getDescriptionRevealClasses(isExpanded: boolean): string {
  const stateClasses = isExpanded
    ? "grid-rows-[1fr] opacity-100"
    : "grid-rows-[0fr] opacity-0";

  return [
    "grid overflow-hidden",
    stateClasses,
    "motion-safe:transition-[grid-template-rows,opacity]",
    `motion-safe:duration-${EXPAND_ANIMATION_DURATION_MS}`,
    "motion-safe:ease-out",
  ].join(" ");
}
