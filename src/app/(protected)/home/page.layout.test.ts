import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

void test("home page places Happening This Week carousel above the main header", async () => {
  const pageUrl = new URL("./page.tsx", import.meta.url);
  const source = await readFile(pageUrl, "utf8");

  const carouselPosition = source.indexOf("<HappeningThisWeekCarousel />");
  const headerPosition = source.indexOf("<header");

  assert.ok(carouselPosition !== -1);
  assert.ok(headerPosition !== -1);
  assert.ok(carouselPosition < headerPosition);
});
