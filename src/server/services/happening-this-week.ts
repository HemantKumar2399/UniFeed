export const HAPPENING_WINDOW_DAYS = 7;

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export function getHappeningThisWeekWindow(referenceDate: Date = new Date()): {
  start: Date;
  endExclusive: Date;
} {
  const start = new Date(referenceDate);
  const endExclusive = new Date(start.getTime() + HAPPENING_WINDOW_DAYS * DAY_IN_MS);

  return { start, endExclusive };
}

export function isInHappeningThisWeekWindow(
  eventDate: Date,
  referenceDate: Date = new Date(),
): boolean {
  const { start, endExclusive } = getHappeningThisWeekWindow(referenceDate);
  const value = eventDate.getTime();

  return value >= start.getTime() && value < endExclusive.getTime();
}
