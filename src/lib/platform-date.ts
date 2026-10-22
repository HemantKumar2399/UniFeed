/** Public build-time settings shared by server-rendered pages and browser forms. */
const configuredLocale = process.env.NEXT_PUBLIC_LOCALE?.trim() ?? "";
const configuredTimeZone = process.env.NEXT_PUBLIC_TIME_ZONE?.trim() ?? "";
export const PLATFORM_LOCALE =
  configuredLocale.length > 0 ? configuredLocale : "en";
export const PLATFORM_TIME_ZONE =
  configuredTimeZone.length > 0 ? configuredTimeZone : "UTC";

// Fail clearly on invalid configuration instead of silently using the host zone.
new Intl.DateTimeFormat(PLATFORM_LOCALE, {
  timeZone: PLATFORM_TIME_ZONE,
}).format(0);

export function formatPlatformDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions,
): string {
  return new Intl.DateTimeFormat(PLATFORM_LOCALE, {
    ...options,
    timeZone: PLATFORM_TIME_ZONE,
    ...(!options.dateStyle &&
    !options.timeStyle &&
    options.hour &&
    !options.timeZoneName
      ? { timeZoneName: "short" as const }
      : {}),
  }).format(typeof date === "string" ? new Date(date) : date);
}

function wallParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)!.value;
  return {
    date: `${value("year")}-${value("month")}-${value("day")}`,
    time: `${value("hour")}:${value("minute")}`,
  };
}

export function toDateInputValue(
  date: Date,
  timeZone = PLATFORM_TIME_ZONE,
): string {
  return wallParts(date, timeZone).date;
}

export function toTimeInputValue(
  date: Date,
  timeZone = PLATFORM_TIME_ZONE,
): string {
  return wallParts(date, timeZone).time;
}

/** Reject invalid dates, DST gaps and ambiguous repeated times rather than shifting silently. */
export function toLocalDateTime(
  date: string,
  time: string,
  timeZone = PLATFORM_TIME_ZONE,
): Date {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time))
    return new Date(NaN);
  const wall = Date.parse(`${date}T${time}:00.000Z`);
  if (
    !Number.isFinite(wall) ||
    new Date(wall).toISOString().slice(0, 16) !== `${date}T${time}`
  )
    return new Date(NaN);

  // Sample both sides of a possible offset transition, then check each candidate.
  const offsets = new Set<number>();
  for (const hours of [-36, -12, 0, 12, 36]) {
    const sample = wall + hours * 3600000;
    const parts = wallParts(new Date(sample), timeZone);
    offsets.add(Date.parse(`${parts.date}T${parts.time}:00.000Z`) - sample);
  }
  const matches = [...offsets]
    .map((offset) => new Date(wall - offset))
    .filter((candidate) => {
      const parts = wallParts(candidate, timeZone);
      return parts.date === date && parts.time === time;
    });
  return matches.length === 1 ? matches[0]! : new Date(NaN);
}
