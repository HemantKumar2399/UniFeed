import assert from "node:assert/strict";
import test from "node:test";

import { normalizeHubBlocksForSave } from "./hub-blocks.utils.js";

void test("normalizeHubBlocksForSave trims text and resets positions by array order", () => {
  const normalized = normalizeHubBlocksForSave([
    {
      type: "TEXT",
      title: "  About Us  ",
      content: "  Community-led workshops every week.  ",
      linkUrl: "https://example.com/ignored",
      position: 99,
    },
    {
      type: "FAQ",
      title: "  Who can join? ",
      content: "  Any student at the university. ",
      position: 100,
    },
  ]);

  assert.equal(normalized[0]?.title, "About Us");
  assert.equal(normalized[0]?.content, "Community-led workshops every week.");
  assert.equal(normalized[0]?.position, 0);
  assert.equal(normalized[0]?.linkUrl, null);

  assert.equal(normalized[1]?.position, 1);
});

void test("normalizeHubBlocksForSave keeps resource links and nulls empty values", () => {
  const normalized = normalizeHubBlocksForSave([
    {
      type: "RESOURCE",
      title: "",
      content: "Open-source starter kit",
      linkUrl: "  https://example.edu/club-kit  ",
      position: 2,
    },
  ]);

  assert.equal(normalized[0]?.title, null);
  assert.equal(normalized[0]?.linkUrl, "https://example.edu/club-kit");
});