import assert from "node:assert/strict";
import test from "node:test";

import {
  HAPPENING_THIS_WEEK_LIMIT,
  buildHappeningThisWeekQuery,
  selectHappeningThisWeekEvents,
} from "./happening-this-week-query";

void test("buildHappeningThisWeekQuery uses a strict less-than seven-day upper bound", () => {
  const reference = new Date("2026-04-17T12:00:00.000Z");
  const query = buildHappeningThisWeekQuery("college-1", reference);

  assert.equal(query.where.collegeId, "college-1");
  assert.equal(query.where.status, "PUBLISHED");
  assert.equal(query.where.date.gte.toISOString(), "2026-04-17T12:00:00.000Z");
  assert.equal(query.where.date.lt.toISOString(), "2026-04-24T12:00:00.000Z");
  assert.equal(query.take, HAPPENING_THIS_WEEK_LIMIT);
});

void test("selectHappeningThisWeekEvents excludes items exactly at the seven-day boundary", () => {
  const reference = new Date("2026-04-17T12:00:00.000Z");
  const events = [
    { id: 1, date: new Date("2026-04-17T12:00:00.000Z") },
    { id: 2, date: new Date("2026-04-22T12:00:00.000Z") },
    { id: 3, date: new Date("2026-04-24T11:59:59.999Z") },
    { id: 4, date: new Date("2026-04-24T12:00:00.000Z") },
  ];

  const selected = selectHappeningThisWeekEvents(events, reference);

  assert.deepEqual(
    selected.map((event) => event.id),
    [1, 2, 3],
  );
});
