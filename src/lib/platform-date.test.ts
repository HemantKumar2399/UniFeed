import assert from "node:assert/strict";
import test from "node:test";
import {
  toLocalDateTime,
  toDateInputValue,
  toTimeInputValue,
  formatPlatformDate,
} from "./platform-date";

void test("wall time conversion supports fractional offsets and day boundaries", () => {
  const instant = toLocalDateTime("2030-01-01", "00:15", "Asia/Kathmandu");
  assert.equal(instant.toISOString(), "2029-12-31T18:30:00.000Z");
  assert.equal(toDateInputValue(instant, "Asia/Kathmandu"), "2030-01-01");
  assert.equal(toTimeInputValue(instant, "Asia/Kathmandu"), "00:15");
});

void test("DST gaps and repeated times require a different unambiguous time", () => {
  assert.ok(
    Number.isNaN(
      toLocalDateTime("2030-03-10", "02:30", "America/New_York").getTime(),
    ),
  );
  assert.ok(
    Number.isNaN(
      toLocalDateTime("2030-11-03", "01:30", "America/New_York").getTime(),
    ),
  );
  assert.equal(
    toLocalDateTime("2030-03-10", "03:30", "America/New_York").toISOString(),
    "2030-03-10T07:30:00.000Z",
  );
});

void test("malformed calendar/time input cannot roll over or accept trailing content", () => {
  for (const [date, time] of [
    ["2030-02-29", "12:00"],
    ["2030-01-01", "24:00"],
    ["2030-1-1", "12:00"],
    ["2030-01-01", "12:00junk"],
  ]) {
    assert.ok(Number.isNaN(toLocalDateTime(date!, time!).getTime()));
  }
});

void test("display dates use deployment UTC rather than host local day", () => {
  assert.equal(
    formatPlatformDate("2030-01-01T23:30:00Z", {
      month: "long",
      day: "numeric",
    }),
    "January 1",
  );
});
