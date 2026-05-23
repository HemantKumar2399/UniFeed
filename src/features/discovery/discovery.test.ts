import assert from "node:assert/strict";
import test from "node:test";

import {
  buildDiscoverHref,
  buildSearchHref,
  getDiscoveryMatchScore,
  normalizeDiscoveryFilters,
  normalizeDiscoveryQuery,
  tokenizeDiscoveryQuery,
} from "./discovery";

void test("normalizeDiscoveryFilters applies defaults for invalid params", () => {
  assert.deepEqual(
    normalizeDiscoveryFilters({
      category: "Unknown",
      collection: "not-real",
    }),
    {
      category: "ALL",
      collection: "all",
    },
  );
});

void test("buildDiscoverHref omits default filters and keeps non-default filters", () => {
  assert.equal(buildDiscoverHref({}), "/discover");
  assert.equal(
    buildDiscoverHref({
      category: "Academic",
      collection: "free_food",
    }),
    "/discover?category=Academic&collection=free_food",
  );
});

void test("buildSearchHref trims whitespace and encodes query params", () => {
  assert.equal(buildSearchHref("   "), "/search");
  assert.equal(buildSearchHref("free food"), "/search?q=free+food");
});

void test("tokenizeDiscoveryQuery keeps meaningful search tokens", () => {
  assert.deepEqual(tokenizeDiscoveryQuery(" Arts & Culture Workshop "), [
    "arts",
    "&",
    "culture",
    "workshop",
  ]);
  assert.equal(normalizeDiscoveryQuery("  robotics  "), "robotics");
});

void test("getDiscoveryMatchScore prioritizes title matches over secondary text", () => {
  const titleScore = getDiscoveryMatchScore({
    query: "robotics",
    primaryText: "Robotics Sprint",
    secondaryText: ["Engineering Club"],
  });
  const secondaryScore = getDiscoveryMatchScore({
    query: "robotics",
    primaryText: "Engineering Club",
    secondaryText: ["Robotics Sprint"],
  });

  assert.ok(titleScore > secondaryScore);
});
