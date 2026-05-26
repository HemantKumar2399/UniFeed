export const DEFAULT_EVENT_DURATION_MINUTES = 60;

export type CalendarEventInput = {
  id: number;
  title: string;
  description: string;
  location: string;
  startAt: Date;
  generatedAt?: Date;
  durationMinutes?: number;
  uidHost?: string;
  url?: string;
};

export function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r\n|\r|\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}

export function formatIcsUtcDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

export function createCalendarFilename(title: string, eventId: number): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);

  return `${slug || `event-${eventId}`}.ics`;
}

export function buildEventCalendarIcs(input: CalendarEventInput): string {
  const durationMinutes = input.durationMinutes ?? DEFAULT_EVENT_DURATION_MINUTES;
  const endAt = new Date(input.startAt.getTime() + durationMinutes * 60 * 1000);
  const generatedAt = input.generatedAt ?? new Date();
  const uidHost = input.uidHost ?? "unifeed";
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//UniFeed//Campus Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:unifeed-event-${input.id}@${escapeIcsText(uidHost)}`,
    `DTSTAMP:${formatIcsUtcDate(generatedAt)}`,
    `DTSTART:${formatIcsUtcDate(input.startAt)}`,
    `DTEND:${formatIcsUtcDate(endAt)}`,
    `SUMMARY:${escapeIcsText(input.title)}`,
    `DESCRIPTION:${escapeIcsText(input.description)}`,
    `LOCATION:${escapeIcsText(input.location)}`,
  ];

  if (input.url) {
    lines.push(`URL:${escapeIcsText(input.url)}`);
  }

  lines.push("END:VEVENT", "END:VCALENDAR");

  return `${lines.join("\r\n")}\r\n`;
}
