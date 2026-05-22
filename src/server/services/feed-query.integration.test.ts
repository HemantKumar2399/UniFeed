import assert from "node:assert/strict";
import test from "node:test";

import { buildStudentRelevanceProfile } from "./feed-ranking.js";
import {
  FEED_RESULT_LIMIT,
  buildPublishedFeedQuery,
  selectTopPersonalizedFeedEvents,
} from "./feed-query.js";

void test("buildPublishedFeedQuery keeps full candidate set before ranking", () => {
  const query = buildPublishedFeedQuery() as { take?: number; orderBy?: unknown };

  assert.equal(query.take, undefined);
  assert.deepEqual(query.orderBy, [{ date: "asc" }, { id: "asc" }]);
});

void test("selectTopPersonalizedFeedEvents can surface relevant events beyond the first 30 chronological slots", () => {
  const base = new Date("2026-04-17T08:00:00.000Z");
  const events = Array.from({ length: 35 }, (_, index) => ({
    id: index + 1,
    clubId: 100 + index,
    date: new Date(base.getTime() + index * 60 * 60 * 1000),
    title: index === 34 ? "Advanced Robotics Seminar" : `General Event ${index + 1}`,
    description: index === 34 ? "Robotics systems deep dive" : "Community session",
    club: { name: index === 34 ? "Robotics Guild" : "General Club" },
  }));

  const profile = buildStudentRelevanceProfile({
    courseKeywords: ["robotics"],
    selectedDomains: ["systems"],
    followedClubIds: [],
  });

  const ranked = selectTopPersonalizedFeedEvents(events, profile);

  assert.equal(ranked.length, FEED_RESULT_LIMIT);
  assert.equal(ranked[0]?.id, 35);
});
