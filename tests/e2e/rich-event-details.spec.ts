import { expect, test } from "../support/fixtures";
import { PrismaClient } from "@prisma/client";

test("admin can create rich event details, review them, and publish a usable gallery", async ({
  page,
  browser,
  signInAs,
}) => {
  const database = new PrismaClient();
  const title = `Rich event browser check ${Date.now()}`;
  const origin = process.env.BASE_URL ?? "http://localhost:3000";
  const cover = new URL("/event-images/build-night-poster.svg", origin).href;
  const gallery = new URL("/event-images/build-night-guide.svg", origin).href;
  let eventId: number | undefined;
  const studentContext = await browser.newContext({ baseURL: origin });
  try {
    await signInAs(page, "admin");
    await page.goto("/dashboard/events/new");
    const community = page.getByLabel("Community", { exact: true });
    await expect(community).toBeEnabled();
    const firstClub = await community
      .locator("option")
      .nth(1)
      .getAttribute("value");
    await community.selectOption(firstClub!);
    await page.getByLabel("Event title", { exact: true }).fill(title);
    await page
      .getByLabel("Event description", { exact: true })
      .fill(
        "An evening for campus builders.\nMeet a team, build a prototype and share what you learned.",
      );
    await page.locator('input[type="date"]').nth(0).fill("2030-05-14");
    await page.locator('input[type="time"]').nth(0).fill("18:45");
    await page.locator('input[type="date"]').nth(1).fill("2030-05-13");
    await page.locator('input[type="time"]').nth(1).fill("16:30");
    await page
      .getByPlaceholder("Building 4, Room 101")
      .fill("Innovation Lab, accessible entrance on the ground floor");
    await page
      .getByLabel("Category", { exact: true })
      .selectOption("Technical");
    await page.locator("#domain").selectOption("Engineering");
    await page.locator("#tags").fill("workshop, building");
    await page.getByLabel("Hosted image URL", { exact: true }).fill(cover);
    await page
      .getByRole("textbox", { name: "Schedule / agenda", exact: true })
      .fill(
        "18:45 — Meet your team\n19:15 — Build with mentors\n20:30 — Share your project",
      );
    await page
      .getByRole("textbox", {
        name: "What to bring / requirements",
        exact: true,
      })
      .fill("Bring your laptop and charger. Beginners are welcome.");
    await page
      .getByRole("textbox", { name: "Organizer contact email", exact: true })
      .fill("events@students.example.edu");
    await page
      .getByRole("textbox", { name: "Venue / directions link", exact: true })
      .fill("https://maps.example.com/innovation-lab");
    await page
      .getByRole("button", { name: "Add gallery image", exact: true })
      .click();
    await page
      .getByRole("group", { name: "Gallery image 1", exact: true })
      .getByLabel("Hosted image URL", { exact: true })
      .fill(gallery);
    await page.getByRole("button", { name: "Save Draft", exact: true }).click();
    await expect(page).toHaveURL(/\/dashboard\/events$/);
    const record = await database.event.findFirstOrThrow({ where: { title } });
    eventId = record.id;
    expect(record.galleryImages).toEqual([gallery]);
    expect(record.contactEmail).toBe("events@students.example.edu");
    await page.goto(`/dashboard/events/${eventId}/edit`);
    await expect(
      page.getByRole("textbox", { name: "Schedule / agenda", exact: true }),
    ).toHaveValue(/Build with mentors/);
    await expect(
      page
        .getByRole("group", { name: "Gallery image 1", exact: true })
        .getByLabel("Hosted image URL", { exact: true }),
    ).toHaveValue(gallery);
    await page
      .getByRole("textbox", {
        name: "What to bring / requirements",
        exact: true,
      })
      .fill(
        "Bring your laptop, charger and student ID. Beginners are welcome.",
      );
    await page
      .getByRole("button", { name: "Submit for Approval", exact: true })
      .click();
    await expect(page).toHaveURL(/\/dashboard\/events$/);
    await page.goto(`/admin/events/${eventId}`);
    await expect(
      page.getByText(
        "Bring your laptop, charger and student ID. Beginners are welcome.",
        { exact: true },
      ),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "View image 2 of 2" }),
    ).toBeVisible();
    await page
      .getByRole("button", { name: "Approve Event", exact: true })
      .click();
    await expect(
      page.getByText(/This event is currently\s+APPROVED\./i),
    ).toBeVisible();
    await page.goto(`/dashboard/events/${eventId}/edit`);
    await page
      .getByRole("button", { name: "Publish Event", exact: true })
      .click();
    await expect(page).toHaveURL(/\/dashboard\/events$/);
    const studentPage = await studentContext.newPage();
    await signInAs(studentPage, "student");
    await studentPage.goto(`/events/${eventId}`);
    await expect(
      studentPage.getByRole("heading", { name: title, exact: true }),
    ).toBeVisible();
    await expect(
      studentPage.getByRole("heading", { name: "Before you arrive" }),
    ).toBeVisible();
    await expect(
      studentPage.getByRole("link", { name: "events@students.example.edu" }),
    ).toHaveAttribute("href", "mailto:events@students.example.edu");
    await studentPage
      .getByRole("button", { name: "View image 2 of 2" })
      .click();
    await expect(
      studentPage.getByRole("img", { name: title, exact: true }),
    ).toHaveAttribute("src", gallery);
    await expect(
      studentPage.getByRole("link", { name: "Open full-size image" }),
    ).toHaveAttribute("href", gallery);
    await studentPage
      .getByRole("button", { name: "View image 1 of 2" })
      .click();
    await studentPage.screenshot({
      path: "test-results/rich-event-desktop.png",
      fullPage: true,
    });
    await studentPage.setViewportSize({ width: 375, height: 812 });
    expect(
      await studentPage.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await studentPage.screenshot({
      path: "test-results/rich-event-mobile.png",
      fullPage: true,
    });
    await studentPage
      .getByRole("button", { name: "Reserve Spot", exact: true })
      .click();
    await expect(
      studentPage.getByRole("button", { name: "Registered", exact: true }),
    ).toBeVisible();
    await studentPage.goto(`/home#event-${eventId}`);
    const quickView = studentPage.getByRole("dialog");
    await expect(
      quickView.getByRole("link", { name: "Open full event page" }),
    ).toBeVisible();
    await quickView.getByRole("button", { name: "View image 2 of 2" }).click();
    await expect(
      quickView.getByRole("img", { name: title, exact: true }),
    ).toHaveAttribute("src", gallery);
    await quickView
      .getByRole("button", { name: "Close event details", exact: true })
      .click();
    await expect(quickView).not.toBeVisible();
  } finally {
    await studentContext.close();
    if (eventId) await database.event.delete({ where: { id: eventId } });
    else await database.event.deleteMany({ where: { title } });
    await database.$disconnect();
  }
});
