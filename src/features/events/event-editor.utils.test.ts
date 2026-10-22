import assert from "node:assert/strict";
import test from "node:test";

import {
  buildEventEditorDraft,
  buildEventPayload,
  createEmptyEventEditorDraft,
} from "./event-editor.utils.js";

void test("buildEventPayload preserves configured date and metadata intent", () => {
  const payload = buildEventPayload({
    clubId: "12",
    title: "Campus Meetup",
    description: "An event for student builders on campus.",
    date: "2030-05-14",
    time: "18:45",
    registrationCloseDate: "2030-05-13",
    registrationCloseTime: "16:30",
    location: "Innovation Lab",
    imageUrl: "https://example.com/poster.png",
    capacity: "240",
    category: "Technical",
    tags: "coding, workshop, coding",
    domain: "Engineering",
    isFreeFood: true,
    hasCertificate: false,
    isPaid: false,
    targetBranches:
      "Computer Science, Information Technology, Computer Science",
  });

  assert.equal(payload.clubId, 12);
  assert.equal(payload.title, "Campus Meetup");
  assert.equal(payload.capacity, 240);
  assert.deepEqual(payload.tags, ["coding", "workshop"]);
  assert.deepEqual(payload.targetBranches, [
    "Computer Science",
    "Information Technology",
  ]);
  assert.equal(payload.date.getUTCFullYear(), 2030);
  assert.equal(payload.date.getUTCMonth(), 4);
  assert.equal(payload.date.getUTCDate(), 14);
  assert.equal(payload.date.getUTCHours(), 18);
  assert.equal(payload.date.getUTCMinutes(), 45);
  assert.equal(payload.registrationClosesAt.getUTCDate(), 13);
  assert.equal(payload.registrationClosesAt.getUTCHours(), 16);
  assert.equal(payload.registrationClosesAt.getUTCMinutes(), 30);
});

void test("buildEventEditorDraft converts persisted event values back into field strings", () => {
  const draft = buildEventEditorDraft({
    clubId: 7,
    title: "Design Sprint",
    description: "Hands-on workshop for rapid prototyping.",
    date: new Date("2031-01-01T09:00:00Z"),
    registrationClosesAt: new Date("2030-12-31T17:00:00Z"),
    location: "Student Union",
    imageUrl: "https://example.com/banner.jpg",
    capacity: 10,
    category: "Academic",
    tags: ["workshop", "design"],
    domain: "Campus Life",
    isFreeFood: false,
    hasCertificate: true,
    isPaid: true,
    targetBranches: ["Computer Science"],
  });

  assert.equal(draft.clubId, "7");
  assert.equal(draft.tags, "workshop, design");
  assert.equal(draft.domain, "Campus Life");
  assert.equal(draft.targetBranches, "Computer Science");
  assert.equal(draft.registrationCloseDate, "2030-12-31");
  assert.equal(draft.registrationCloseTime, "17:00");
});

void test("createEmptyEventEditorDraft starts with required empty fields", () => {
  const draft = createEmptyEventEditorDraft();

  assert.equal(draft.clubId, "");
  assert.equal(draft.title, "");
  assert.equal(draft.category, "");
  assert.equal(draft.domain, "");
  assert.equal(draft.tags, "");
  assert.equal(draft.targetBranches, "");
  assert.equal(draft.capacity, "100");
  assert.equal(draft.registrationCloseDate, "");
  assert.equal(draft.registrationCloseTime, "");
});

void test("event input is interpreted in the deployment zone rather than the host zone", () => {
  const draft = {
    ...createEmptyEventEditorDraft(),
    date: "2030-05-14",
    time: "18:45",
  };
  assert.equal(
    buildEventPayload(draft).date.toISOString(),
    "2030-05-14T18:45:00.000Z",
  );
});

void test("event input rejects impossible calendar dates rather than rolling into another month", () => {
  const draft = {
    ...createEmptyEventEditorDraft(),
    date: "2030-02-30",
    time: "18:45",
  };
  assert.ok(Number.isNaN(buildEventPayload(draft).date.getTime()));
});
