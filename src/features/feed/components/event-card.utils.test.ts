import assert from "node:assert/strict";
import test from "node:test";

import {
  EXPAND_ANIMATION_DURATION_MS,
  formatEventDateMeta,
  getDescriptionRevealClasses,
} from "./event-card.utils";

void test("formatEventDateMeta returns a readable string", () => {
  const value = formatEventDateMeta(new Date("2026-04-10T17:30:00.000Z"));

  assert.equal(typeof value, "string");
  assert.notEqual(value.length, 0);
});

void test("description animation remains within NFR timing threshold", () => {
  assert.ok(EXPAND_ANIMATION_DURATION_MS < 500);
});

void test("getDescriptionRevealClasses includes motion-safe and state classes", () => {
  const expandedClasses = getDescriptionRevealClasses(true);
  const collapsedClasses = getDescriptionRevealClasses(false);

  assert.match(expandedClasses, /grid-rows-\[1fr\]/);
  assert.match(collapsedClasses, /grid-rows-\[0fr\]/);
  assert.match(expandedClasses, /motion-safe:duration-300/);
  assert.match(collapsedClasses, /motion-safe:transition-\[grid-template-rows,opacity\]/);
});