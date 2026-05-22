import assert from "node:assert/strict";
import test from "node:test";

import {
  HAPPENING_WINDOW_DAYS,
  getHappeningThisWeekWindow,
  isInHappeningThisWeekWindow,
} from "./happening-this-week.js";

void test("getHappeningThisWeekWindow returns a 7-day exclusive window", () => {
  const now = new Date("2026-04-17T12:00:00.000Z");
  const { start, endExclusive } = getHappeningThisWeekWindow(now);

  assert.equal(start.toISOString(), now.toISOString());
  assert.equal(
    endExclusive.toISOString(),
    new Date("2026-04-24T12:00:00.000Z").toISOString(),
  );
  assert.equal(HAPPENING_WINDOW_DAYS, 7);
});

void test("isInHappeningThisWeekWindow includes now and excludes exactly 7 days out", () => {
  const now = new Date("2026-04-17T12:00:00.000Z");

  assert.equal(
    isInHappeningThisWeekWindow(new Date("2026-04-17T12:00:00.000Z"), now),
    true,
  );
  assert.equal(
    isInHappeningThisWeekWindow(new Date("2026-04-24T11:59:59.999Z"), now),
    true,
  );
  assert.equal(
    isInHappeningThisWeekWindow(new Date("2026-04-24T12:00:00.000Z"), now),
    false,
  );
  assert.equal(
    isInHappeningThisWeekWindow(new Date("2026-04-16T12:00:00.000Z"), now),
    false,
  );
});
