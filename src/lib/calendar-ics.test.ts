import assert from "node:assert/strict";
import test from "node:test";

import {
  buildEventCalendarIcs,
  createCalendarFilename,
  escapeIcsText,
  formatIcsUtcDate,
} from "./calendar-ics";

void test("escapeIcsText escapes calendar-sensitive characters", () => {
  assert.equal(
    escapeIcsText("Line 1\nLine 2, with; slash\\"),
    "Line 1\\nLine 2\\, with\\; slash\\\\",
  );
});

void test("buildEventCalendarIcs emits required event fields in UTC", () => {
  const ics = buildEventCalendarIcs({
    id: 88,
    title: "Campus Fest, Day 1",
    description: "Meet builders;\nbring laptops.",
    location: "Hall A, North Campus",
    startAt: new Date("2030-05-14T18:45:00.000Z"),
    generatedAt: new Date("2030-05-01T08:00:00.000Z"),
    uidHost: "example.edu",
    url: "https://example.edu/events/88",
  });

  assert.match(ics, /^BEGIN:VCALENDAR\r\nVERSION:2.0\r\n/m);
  assert.match(ics, /UID:unifeed-event-88@example.edu\r\n/);
  assert.match(ics, /DTSTAMP:20300501T080000Z\r\n/);
  assert.match(ics, /DTSTART:20300514T184500Z\r\n/);
  assert.match(ics, /DTEND:20300514T194500Z\r\n/);
  assert.match(ics, /SUMMARY:Campus Fest\\, Day 1\r\n/);
  assert.match(ics, /DESCRIPTION:Meet builders\\;\\nbring laptops\.\r\n/);
  assert.match(ics, /LOCATION:Hall A\\, North Campus\r\n/);
  assert.match(ics, /URL:https:\/\/example.edu\/events\/88\r\n/);
  assert.match(ics, /END:VCALENDAR\r\n$/);
});

void test("formatIcsUtcDate and createCalendarFilename are deterministic", () => {
  assert.equal(formatIcsUtcDate(new Date("2030-05-14T18:45:00.000Z")), "20300514T184500Z");
  assert.equal(createCalendarFilename("= Campus Fest / Day 1", 88), "campus-fest-day-1.ics");
  assert.equal(createCalendarFilename("!!!", 88), "event-88.ics");
});
