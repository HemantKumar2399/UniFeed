import { test, expect } from "../support/fixtures";
import { PrismaClient } from "@prisma/client";
import { getSeedUsers } from "../support/helpers/auth";

test("submitted searches remain usable through browser history", async ({
  page,
  signInAs,
}) => {
  await signInAs(page, "student");
  await page.goto("/search?q=workshop");
  const input = page.getByRole("searchbox", {
    name: "Search events and communities",
  });
  await input.fill("cultural");
  await input.press("Enter");
  await expect(page).toHaveURL(/q=cultural/);
  await page.goBack();
  await expect(input).toHaveValue("workshop");
  await expect(page).toHaveURL(/q=workshop/);
  await page.setViewportSize({ width: 375, height: 812 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "test-results/ux-search-mobile.png",
    fullPage: false,
  });
});

test("upload failure permits selecting the exact same file again", async ({
  page,
  signInAs,
}) => {
  await signInAs(page, "organizer");
  await page.goto("/dashboard/events/new");
  let attempts = 0;
  await page.route("**/api/trpc/upload.getPresignedUrl**", (route) => {
    attempts++;
    return route.fulfill({
      status: 500,
      contentType: "application/json",
      body: "{}",
    });
  });
  const input = page.locator('input[type="file"]');
  const file = {
    name: "retry.png",
    mimeType: "image/png",
    buffer: Buffer.from("test upload"),
  };
  await input.setInputFiles(file);
  await expect.poll(() => attempts).toBe(1);
  await expect(input).toBeEnabled();
  await expect(input).toHaveValue("");
  await input.setInputFiles(file);
  await expect.poll(() => attempts).toBe(2);
});

test("unsupported image types are rejected before an upload request", async ({
  page,
  signInAs,
}) => {
  await signInAs(page, "organizer");
  await page.goto("/dashboard/events/new");
  let attempts = 0;
  await page.route("**/api/trpc/upload.getPresignedUrl**", (route) => {
    attempts++;
    return route.fulfill({
      status: 500,
      contentType: "application/json",
      body: "{}",
    });
  });
  await page.locator('input[type="file"]').setInputFiles({
    name: "vector.svg",
    mimeType: "image/svg+xml",
    buffer: Buffer.from("<svg/>"),
  });
  await expect(page.locator("main").getByRole("alert")).toContainText(
    "Choose a JPG, PNG, WebP, or GIF image.",
  );
  expect(attempts).toBe(0);
});

test("externally hosted event covers render without breaking the event page", async ({
  page,
  signInAs,
}) => {
  const database = new PrismaClient();
  const organizer = await database.user.findUniqueOrThrow({
    where: { email: getSeedUsers().organizer.email },
  });
  const membership = await database.clubMembership.findFirstOrThrow({
    where: { userId: organizer.id, role: "OWNER" },
  });
  const event = await database.event.create({
    data: {
      title: "External hosted cover regression",
      description: "Disposable cover fixture",
      location: "Hall",
      date: new Date(Date.now() + 86400000),
      registrationClosesAt: new Date(Date.now() + 3600000),
      capacity: 10,
      status: "PUBLISHED",
      clubId: membership.clubId,
      authorId: organizer.id,
      collegeId: organizer.collegeId,
      imageUrl: "https://cdn.other-campus.example/poster.png",
    },
  });
  try {
    await page.route("https://cdn.other-campus.example/poster.png", (route) =>
      route.fulfill({
        contentType: "image/png",
        body: Buffer.from(
          "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=",
          "base64",
        ),
      }),
    );
    await signInAs(page, "student");
    await page.goto(`/events/${event.id}`);
    await expect(
      page.getByRole("heading", { name: event.title, exact: true }),
    ).toBeVisible();
    const image = page.getByRole("img", { name: event.title, exact: true });
    await expect(image).toHaveAttribute("src", event.imageUrl);
    await expect
      .poll(() =>
        image.evaluate((element) => (element as HTMLImageElement).naturalWidth),
      )
      .toBe(1);
  } finally {
    await database.event.delete({ where: { id: event.id } });
    await database.$disconnect();
  }
});
