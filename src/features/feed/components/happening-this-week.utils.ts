import { formatPlatformDate } from "@/lib/platform-date";
export function formatHappeningDay(dateInput: Date | string): string {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  return formatPlatformDate(date, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatHappeningTime(dateInput: Date | string): string {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  return formatPlatformDate(date, {
    hour: "numeric",
    minute: "2-digit",
  });
}
