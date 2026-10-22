import { expect, test } from "../support/fixtures";
import { PrismaClient } from "@prisma/client";

test("event details use their image area and keep registration accessible", async ({
  page,
  signInAs,
}) => {
  const database = new PrismaClient();
  let eventId: number;
  let imageUrl: string;
  try {
    const event = await database.event.findFirstOrThrow({
      where: {
        title: { startsWith: "HackSprint:" },
        status: "PUBLISHED",
        deletedAt: null,
      },
    });
    eventId = event.id;
    imageUrl = event.imageUrl;
  } finally {
    await database.$disconnect();
  }
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  // A local landscape image makes layout screenshots independent of external image latency.
  await page.route(imageUrl, (route) =>
    route.fulfill({
      path: "public/event-images/build-night-guide.svg",
      contentType: "image/svg+xml",
    }),
  );
  await signInAs(page, "student");
  await page.goto("/home");
  await page.locator(`#event-${eventId}`).getByRole("button").first().click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("button", { name: "Overview", exact: true }),
  ).toHaveCount(0);
  await expect(
    dialog.getByRole("button", { name: "Discussions", exact: true }),
  ).toHaveCount(0);
  const primary = dialog.getByRole("link", { name: "View full event" });
  await expect(primary).toBeInViewport({ ratio: 1 });
  await expect
    .poll(async () => {
      const bounds = await dialog.boundingBox();
      return bounds ? bounds.y + bounds.height : Infinity;
    })
    .toBeLessThanOrEqual(768);
  await expect
    .poll(() =>
      dialog
        .locator("img")
        .first()
        .evaluate((element) => (element as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0);
  await page.screenshot({
    path: "test-results/quick-view-desktop.png",
    fullPage: false,
  });
  await page.setViewportSize({ width: 375, height: 812 });
  await dialog.getByRole("button", { name: "Close event details" }).click();
  await page.locator(`#event-${eventId}`).getByRole("button").first().click();
  await expect(dialog).toBeVisible();
  await expect(primary).toBeInViewport({ ratio: 1 });
  for (const size of [
    { width: 375, height: 812 },
    { width: 320, height: 568 },
    { width: 844, height: 390 },
  ]) {
    await page.setViewportSize(size);
    await expect(primary).toBeInViewport({ ratio: 1 });
    expect(
      await dialog.evaluate((element) =>
        [element, ...element.querySelectorAll<HTMLElement>("*")].every(
          (node) =>
            node.scrollHeight <= node.clientHeight + 1 ||
            !["auto", "scroll"].includes(getComputedStyle(node).overflowY),
        ),
      ),
    ).toBe(true);
    await expect(
      dialog.getByRole("button", { name: "Close event details" }),
    ).toBeInViewport({ ratio: 1 });
  }
  await page.setViewportSize({ width: 375, height: 812 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "test-results/quick-view-mobile.png",
    fullPage: false,
  });
  await primary.click();
  await expect(page).toHaveURL(`/events/${eventId}`);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "HackSprint",
  );
  await expect(
    page.getByRole("heading", { name: "About this event" }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "test-results/event-page-mobile.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 1366, height: 900 });
  await page.screenshot({
    path: "test-results/event-page-light.png",
    fullPage: true,
  });
  await page
    .getByRole("button", { name: "Toggle theme" })
    .filter({ visible: true })
    .click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page
    .getByRole("region", { name: "Event images" })
    .locator("img")
    .first()
    .evaluate(async (element) => {
      await (element as HTMLImageElement).decode();
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      );
    });
  await page.screenshot({
    path: "test-results/event-page-dark.png",
    fullPage: true,
  });
});
