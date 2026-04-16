import assert from "node:assert/strict";
import test from "node:test";

import { buildCreateEventPayload } from "./block-editor.utils";

void test("buildCreateEventPayload preserves local date and time intent", () => {
  const payload = buildCreateEventPayload({
    title: "Campus Meetup",
    description: "An event for student builders on campus.",
    date: "2030-05-14",
    time: "18:45",
    location: "Innovation Lab",
    capacity: "240",
  });

  assert.equal(payload.title, "Campus Meetup");
  assert.equal(payload.location, "Innovation Lab");
  assert.equal(payload.capacity, 240);
  assert.ok(payload.date instanceof Date);
  assert.equal(payload.date.getFullYear(), 2030);
  assert.equal(payload.date.getMonth(), 4);
  assert.equal(payload.date.getDate(), 14);
  assert.equal(payload.date.getHours(), 18);
  assert.equal(payload.date.getMinutes(), 45);
});

void test("buildCreateEventPayload trims strings and normalizes capacity", () => {
  const payload = buildCreateEventPayload({
    title: "  Design Sprint  ",
    description: "  Hands-on workshop for rapid prototyping.  ",
    date: "2031-01-01",
    time: "09:00",
    location: "  Student Union  ",
    capacity: "0010",
  });

  assert.equal(payload.title, "Design Sprint");
  assert.equal(payload.description, "Hands-on workshop for rapid prototyping.");
  assert.equal(payload.location, "Student Union");
  assert.equal(payload.capacity, 10);
});
