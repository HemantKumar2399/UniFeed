import assert from "node:assert/strict";
import test from "node:test";

import { formatHappeningDay, formatHappeningTime } from "./happening-this-week.utils.js";

void test("formatHappeningDay outputs a readable weekday+date label", () => {
  const value = formatHappeningDay(new Date("2026-04-19T18:45:00.000Z"));

  assert.equal(typeof value, "string");
  assert.notEqual(value.length, 0);
});

void test("formatHappeningTime outputs a readable time label", () => {
  const value = formatHappeningTime(new Date("2026-04-19T18:45:00.000Z"));

  assert.equal(typeof value, "string");
  assert.notEqual(value.length, 0);
});
