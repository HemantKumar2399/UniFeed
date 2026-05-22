import assert from "node:assert/strict";
import test from "node:test";

import {
  canManageDiscussionThread,
  resolveDiscussionDisplayName,
  sortDiscussionThreads,
} from "./discussion.js";

void test("canManageDiscussionThread requires organizer role and event ownership", () => {
  assert.equal(
    canManageDiscussionThread({
      viewerRole: "ORGANIZER",
      viewerId: "user-1",
      eventAuthorId: "user-1",
    }),
    true,
  );

  assert.equal(
    canManageDiscussionThread({
      viewerRole: "USER",
      viewerId: "user-1",
      eventAuthorId: "user-1",
    }),
    false,
  );

  assert.equal(
    canManageDiscussionThread({
      viewerRole: "ORGANIZER",
      viewerId: "user-2",
      eventAuthorId: "user-1",
    }),
    false,
  );
});

void test("resolveDiscussionDisplayName applies fallback precedence", () => {
  assert.equal(resolveDiscussionDisplayName("Alex", "alex@example.com"), "Alex");
  assert.equal(resolveDiscussionDisplayName(null, "alex@example.com"), "alex@example.com");
  assert.equal(resolveDiscussionDisplayName(null, null), "Community member");
});

void test("sortDiscussionThreads keeps invalid timestamps deterministic", () => {
  const ordered = sortDiscussionThreads([
    { id: 1, pinned: false, createdAt: "invalid" },
    { id: 2, pinned: false, createdAt: "2026-04-01T08:00:00.000Z" },
  ]);

  assert.deepEqual(
    ordered.map((thread) => thread.id),
    [2, 1],
  );
});
