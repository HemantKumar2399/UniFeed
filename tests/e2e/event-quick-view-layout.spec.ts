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
  const gallery = dialog.getByRole("region", { name: "Event images" });
  const stage = gallery.locator(":scope > div").first();
  const galleryBox = await gallery.boundingBox();
  const stageBox = await stage.boundingBox();
  console.log(
    JSON.stringify({
      galleryWidth: galleryBox?.width,
      imageStageWidth: stageBox?.width,
    }),
  );
  expect(stageBox!.width).toBeGreaterThan(galleryBox!.width - 4);
  const primary = dialog.getByRole("button", {
    name: /^(Reserve Spot|Registered|Waitlisted|Attended|Join Waitlist)$/,
  });
  await expect(primary).toBeInViewport({ ratio: 1 });
  await expect
    .poll(async () => {
      const bounds = await dialog.boundingBox();
      return bounds ? bounds.y + bounds.height : Infinity;
    })
    .toBeLessThanOrEqual(768);
  await expect
    .poll(() =>
      gallery
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
  await primary.scrollIntoViewIfNeeded();
  await expect(primary).toBeInViewport({ ratio: 1 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "test-results/quick-view-mobile.png",
    fullPage: false,
  });
  await dialog.getByRole("button", { name: "Close event details" }).click();
  await page.goto(`/events/${eventId}`);
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
