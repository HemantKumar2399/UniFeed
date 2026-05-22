import assert from "node:assert/strict";
import test from "node:test";

import { deriveFeedPreferenceSignals } from "./feed-preferences.js";

void test("deriveFeedPreferenceSignals reads independent course and domain headers", () => {
  const headers = new Headers();
  headers.set("x-campus-course-keywords", "Computer Science, AI, systems");
  headers.set("x-campus-selected-domains", "robotics, machine learning");

  const signals = deriveFeedPreferenceSignals(headers);

  assert.deepEqual(signals.courseKeywords, ["computer", "science", "systems"]);
  assert.deepEqual(signals.selectedDomains, ["robotics", "machine", "learning"]);
});

void test("deriveFeedPreferenceSignals returns empty arrays when headers are missing", () => {
  const signals = deriveFeedPreferenceSignals(new Headers());

  assert.deepEqual(signals.courseKeywords, []);
  assert.deepEqual(signals.selectedDomains, []);
});
