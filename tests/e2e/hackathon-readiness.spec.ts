import { expect, test } from "../support/fixtures";
import { PrismaClient } from "@prisma/client";
import { getSeedUsers } from "../support/helpers/auth";

test("student navigation stays usable on desktop and narrow mobile", async ({
  page,
  signInAs,
}) => {
  await page.emulateMedia({ colorScheme: "light" });
  await signInAs(page, "student");
  await expect(
    page.getByRole("heading", { name: "For You", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Explore events" }),
  ).toBeVisible();
  await expect(page.locator("article[id^=event-]").first()).toBeVisible();
  await page.screenshot({
    path: "test-results/ux-home-desktop.png",
    fullPage: false,
  });
  await page.setViewportSize({ width: 375, height: 812 });
  const navigation = page.getByRole("navigation", {
    name: "Mobile navigation",
  });
  await expect(navigation.getByRole("link")).toHaveCount(5);
  for (const name of ["Home", "Discover", "Passport", "Hubs", "Profile"]) {
    await expect(
      navigation.getByRole("link", { name, exact: true }),
    ).toBeVisible();
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "test-results/ux-home-mobile.png",
    fullPage: false,
  });
  await navigation.getByRole("link", { name: "Passport", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Student Passport", exact: true }),
  ).toBeVisible();
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.screenshot({
    path: "test-results/ux-passport-mobile.png",
    fullPage: false,
  });
});

test("notifications show a recoverable failure rather than an empty inbox", async ({
  page,
  signInAs,
}) => {
  await signInAs(page, "student");
  await page.route("**/api/trpc/notification.getAll**", (route) =>
    route.fulfill({ status: 500, contentType: "application/json", body: "{}" }),
  );
  await page.goto("/notifications");
  await expect(page.getByText("Unable to load notifications.")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Retry", exact: true }),
  ).toBeVisible();
  await expect(page.getByText("All caught up!")).not.toBeVisible();
});

test("organizer workspace provides working management actions on mobile", async ({
  page,
  signInAs,
}) => {
  await signInAs(page, "organizer");
  await page.setViewportSize({ width: 375, height: 812 });
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Settings", exact: true })
    .click();
  await page.getByRole("link", { name: "Open hub management" }).click();
  await expect(
    page.getByRole("heading", { name: "Static Resources & FAQ Blocks" }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "test-results/ux-organizer-mobile.png",
    fullPage: false,
  });
});

test("organizer can complete a manual check-in and the attendee record persists", async ({
  page,
  signInAs,
}) => {
  const database = new PrismaClient();
  const users = getSeedUsers();
  const organizer = await database.user.findUniqueOrThrow({
    where: { email: users.organizer.email },
  });
  const student = await database.user.findUniqueOrThrow({
    where: { email: users.student.email },
  });
  const membership = await database.clubMembership.findFirstOrThrow({
    where: { userId: organizer.id, role: "OWNER" },
  });
  const event = await database.event.create({
    data: {
      title: "Browser check-in verification",
      description: "Disposable browser fixture",
      date: new Date(Date.now() + 86400000),
      registrationClosesAt: new Date(Date.now() + 3600000),
      capacity: 2,
      location: "Demo room",
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      collegeId: organizer.collegeId,
      clubId: membership.clubId,
      authorId: organizer.id,
      status: "PUBLISHED",
      attendeeCount: 1,
    },
  });
  try {
    await database.rSVP.create({
      data: { eventId: event.id, userId: student.id, status: "GOING" },
    });
    await signInAs(page, "organizer");
    await page.goto(`/dashboard/events/${event.id}/scan`);
    await page
      .getByPlaceholder("Search name, email, or PRN")
      .fill(users.student.email);
    await page
      .getByRole("button", { name: "Force Check-In", exact: true })
      .click();
    await page.getByRole("button", { name: "Confirm", exact: true }).click();
    await expect(
      page.getByRole("button", { name: "Checked-In", exact: true }),
    ).toBeVisible();
    const ticket = await database.rSVP.findUniqueOrThrow({
      where: { userId_eventId: { userId: student.id, eventId: event.id } },
    });
    expect(ticket.status).toBe("ATTENDED");
    expect(ticket.checkedInAt).not.toBeNull();
  } finally {
    await database.event.delete({ where: { id: event.id } });
    await database.$disconnect();
  }
});
