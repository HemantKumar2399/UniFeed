import assert from "node:assert/strict";
import test from "node:test";

import {
  formatDiscussionAuthorName,
  sortDiscussionThreads,
} from "./discussion-board.utils.js";

void test("sortDiscussionThreads prioritizes pinned threads then newest first", () => {
  const ordered = sortDiscussionThreads([
    { id: 1, pinned: false, createdAt: "2026-04-01T10:00:00.000Z" },
    { id: 2, pinned: true, createdAt: "2026-04-01T09:00:00.000Z" },
    { id: 3, pinned: false, createdAt: "2026-04-01T12:00:00.000Z" },
    { id: 4, pinned: true, createdAt: "2026-04-01T11:00:00.000Z" },
  ]);

  assert.deepEqual(
    ordered.map((thread) => thread.id),
    [4, 2, 3, 1],
  );
});

void test("sortDiscussionThreads handles invalid createdAt values safely", () => {
  const ordered = sortDiscussionThreads([
    { id: 1, pinned: false, createdAt: "not-a-date" },
    { id: 2, pinned: false, createdAt: "2026-04-01T12:00:00.000Z" },
  ]);

  assert.deepEqual(
    ordered.map((thread) => thread.id),
    [2, 1],
  );
});

void test("formatDiscussionAuthorName falls back safely", () => {
  assert.equal(formatDiscussionAuthorName("Alex", "alex@example.com"), "Alex");
  assert.equal(formatDiscussionAuthorName(null, "alex@example.com"), "alex@example.com");
  assert.equal(formatDiscussionAuthorName(null, null), "Community member");
});
