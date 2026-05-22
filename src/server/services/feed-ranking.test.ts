import assert from "node:assert/strict";
import test from "node:test";

import {
  FOLLOWED_CLUB_FEED_BOOST_MS,
  RELEVANCE_WEIGHTS,
  buildStudentRelevanceProfile,
  rankEventsByRelevance,
  rankEventsWithFollowBoost,
} from "./feed-ranking";

void test("rankEventsWithFollowBoost slightly promotes followed clubs", () => {
  const base = new Date("2026-04-17T10:00:00.000Z");

  const events = [
    { id: 1, clubId: 10, date: new Date(base.getTime() + 2 * 60 * 60 * 1000) },
    { id: 2, clubId: 20, date: new Date(base.getTime() + 60 * 60 * 1000) },
  ];

  const ranked = rankEventsWithFollowBoost(events, new Set([10]));

  assert.equal(ranked[0]?.id, 1);
  assert.equal(ranked[1]?.id, 2);
});

void test("rankEventsWithFollowBoost keeps chronological order when no follows", () => {
  const base = new Date("2026-04-17T10:00:00.000Z");

  const events = [
    { id: 3, clubId: 10, date: new Date(base.getTime() + 3 * 60 * 60 * 1000) },
    { id: 4, clubId: 20, date: new Date(base.getTime() + 60 * 60 * 1000) },
  ];

  const ranked = rankEventsWithFollowBoost(events, new Set<number>());

  assert.equal(ranked[0]?.id, 4);
  assert.equal(ranked[1]?.id, 3);
});

void test("feed boost constant stays subtle for feed ordering", () => {
  assert.ok(FOLLOWED_CLUB_FEED_BOOST_MS <= 12 * 60 * 60 * 1000);
});

void test("rankEventsByRelevance prioritizes course + domain matches above followed-club-only matches", () => {
  const base = new Date("2026-04-17T10:00:00.000Z");
  const events = [
    {
      id: 11,
      clubId: 4,
      date: new Date(base.getTime() + 6 * 60 * 60 * 1000),
      title: "AI Systems Bootcamp",
      description: "Machine learning and systems design fundamentals",
      club: { name: "Computing Society" },
    },
    {
      id: 12,
      clubId: 7,
      date: new Date(base.getTime() + 2 * 60 * 60 * 1000),
      title: "General Club Meetup",
      description: "Weekly social gathering",
      club: { name: "Robotics Hub" },
    },
    {
      id: 13,
      clubId: 9,
      date: new Date(base.getTime() + 60 * 60 * 1000),
      title: "Cinema Night",
      description: "Open screening",
      club: { name: "Film Club" },
    },
  ];

  const profile = buildStudentRelevanceProfile({
    courseKeywords: ["ai", "systems"],
    selectedDomains: ["machine learning", "computing"],
    followedClubIds: [7],
  });

  const ranked = rankEventsByRelevance(events, profile);

  assert.equal(ranked[0]?.id, 11);
  assert.equal(ranked[1]?.id, 12);
  assert.equal(ranked[2]?.id, 13);
});

void test("rankEventsByRelevance uses medium followed-club weight when no high signals exist", () => {
  const base = new Date("2026-04-17T10:00:00.000Z");
  const events = [
    {
      id: 21,
      clubId: 2,
      date: new Date(base.getTime() + 4 * 60 * 60 * 1000),
      title: "Open Jam",
      description: "Bring instruments",
      club: { name: "Music Circle" },
    },
    {
      id: 22,
      clubId: 3,
      date: new Date(base.getTime() + 2 * 60 * 60 * 1000),
      title: "Chess Blitz",
      description: "Speed rounds",
      club: { name: "Chess Club" },
    },
  ];

  const profile = buildStudentRelevanceProfile({
    courseKeywords: [],
    selectedDomains: [],
    followedClubIds: [2],
  });

  const ranked = rankEventsByRelevance(events, profile);

  assert.equal(ranked[0]?.id, 21);
  assert.equal(ranked[1]?.id, 22);
  assert.ok(RELEVANCE_WEIGHTS.FOLLOWED_CLUB_MATCH < RELEVANCE_WEIGHTS.COURSE_MATCH);
  assert.ok(RELEVANCE_WEIGHTS.FOLLOWED_CLUB_MATCH < RELEVANCE_WEIGHTS.DOMAIN_MATCH);
});

void test("rankEventsByRelevance avoids substring false positives by token boundary matching", () => {
  const base = new Date("2026-04-17T10:00:00.000Z");
  const events = [
    {
      id: 31,
      clubId: 11,
      date: new Date(base.getTime() + 2 * 60 * 60 * 1000),
      title: "Party Planning Forum",
      description: "General collaboration session",
      club: { name: "Open Circle" },
    },
    {
      id: 32,
      clubId: 12,
      date: new Date(base.getTime() + 60 * 60 * 1000),
      title: "Weekly Debrief",
      description: "Open notes",
      club: { name: "General Club" },
    },
  ];

  const profile = buildStudentRelevanceProfile({
    courseKeywords: ["art"],
    selectedDomains: [],
    followedClubIds: [],
  });

  const ranked = rankEventsByRelevance(events, profile);

  assert.equal(ranked[0]?.id, 32);
  assert.equal(ranked[1]?.id, 31);
});