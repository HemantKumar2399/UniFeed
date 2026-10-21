import { expect, test } from "../support/fixtures";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

test.describe("Epic 23 E2E Regression and UI Stabilization Tests", () => {
  let organizerId: string;
  let collegeId: string;
  let clubId: number;

  test.beforeAll(async () => {
    // 1. Fetch seed credentials and models
    const organizer = await prisma.user.findFirst({
      where: { email: { startsWith: "organizer.coding" } },
    });
    const club = await prisma.club.findFirst({
      where: { name: "JECRC Coding Club" },
    });

    if (!organizer || !club) {
      throw new Error(
        "Unable to retrieve seed organizer and club from database.",
      );
    }

    organizerId = organizer.id;
    collegeId = organizer.collegeId;
    clubId = club.id;
  });

  test.afterAll(async () => {
    await prisma.$disconnect();
  });

  test("student sees disabled CTA when registration deadline has passed", async ({
    page,
    signInAs,
  }) => {
    const uniqueSuffix = Math.random().toString(36).substring(7);
    const eventTitle = `E2E Expired Deadline Event - ${uniqueSuffix}`;
    const eventDate = new Date();
    eventDate.setDate(eventDate.getDate() + 3);

    const expiredDeadline = new Date();
    expiredDeadline.setMinutes(expiredDeadline.getMinutes() - 30); // 30 minutes in the past

    const event = await prisma.event.create({
      data: {
        title: eventTitle,
        description: "An event whose registration window is closed.",
        date: eventDate,
        registrationClosesAt: expiredDeadline,
        capacity: 50,
        location: "Room 101",
        imageUrl:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
        status: "PUBLISHED",
        collegeId,
        clubId,
        authorId: organizerId,
        category: "Technical",
        domain: "Engineering",
      },
    });

    try {
      // Sign in as student and verify
      await signInAs(page, "student");
      await page.goto(`/events/${event.id}`);

      // Wait for page load
      await expect(
        page.getByRole("heading", { name: eventTitle }),
      ).toBeVisible();

      // Verify registration availability badge (exact match)
      await expect(
        page.getByText("Registration closed", { exact: true }),
      ).toBeVisible();

      // Verify button is disabled (exact match on "Registration Closed")
      const registerButton = page.getByRole("button", {
        name: "Registration Closed",
        exact: true,
      });
      await expect(registerButton).toBeVisible();
      await expect(registerButton).toBeDisabled();
    } finally {
      // Cleanup inside test to avoid cross-worker pollution
      await prisma.rSVP
        .deleteMany({ where: { eventId: event.id } })
        .catch(() => undefined);
      await prisma.eventApprovalLog
        .deleteMany({ where: { eventId: event.id } })
        .catch(() => undefined);
      await prisma.event
        .delete({ where: { id: event.id } })
        .catch(() => undefined);
    }
  });

  test("organizer can extend/reopen registration deadline and student can register", async ({
    page,
    signInAs,
  }) => {
    const uniqueSuffix = Math.random().toString(36).substring(7);
    const eventTitle = `E2E Reopen Test Event - ${uniqueSuffix}`;
    const eventDate = new Date();
    eventDate.setDate(eventDate.getDate() + 5);

    const expiredDeadline = new Date();
    expiredDeadline.setMinutes(expiredDeadline.getMinutes() - 15); // 15 mins in the past

    const event = await prisma.event.create({
      data: {
        title: eventTitle,
        description: "Testing registration reopening.",
        date: eventDate,
        registrationClosesAt: expiredDeadline,
        capacity: 100,
        location: "Hall B",
        imageUrl:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
        status: "PUBLISHED",
        collegeId,
        clubId,
        authorId: organizerId,
        category: "Technical",
        domain: "Engineering",
      },
    });

    try {
      // 1. Log in as organizer and extend deadline
      await signInAs(page, "organizer");
      await page.goto("/dashboard/events?tab=published");

      // Find the card container containing the specific event title
      const eventCard = page.locator("article", { hasText: eventTitle });
      await expect(eventCard).toBeVisible();

      const reopenButton = eventCard.getByRole("button", {
        name: /Reopen \/ Extend Registration/i,
      });
      await expect(reopenButton).toBeVisible();
      await reopenButton.click();

      // Set future date and time in inputs
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 2);
      const dateString = futureDate.toISOString().split("T")[0] ?? ""; // YYYY-MM-DD

      await eventCard.locator('input[type="date"]').fill(dateString);
      await eventCard.locator('input[type="time"]').fill("18:00");
      await eventCard
        .getByRole("button", { name: "Extend Registration" })
        .click();

      // Verify success toast
      await expect(
        page.getByText(/Registration deadline updated/i),
      ).toBeVisible();

      // 2. Log in as student and verify registration is open
      const studentPage = await page.context().newPage();
      await signInAs(studentPage, "student");
      await studentPage.goto(`/events/${event.id}`);

      await expect(
        studentPage.getByRole("heading", { name: eventTitle }),
      ).toBeVisible();
      await expect(
        studentPage.getByText("Registration open", { exact: true }),
      ).toBeVisible();

      // Verify the Reserve Spot button is active and clickable
      const rsvpBtn = studentPage.getByRole("button", {
        name: "Reserve Spot",
        exact: true,
      });
      await expect(rsvpBtn).toBeVisible();
      await expect(rsvpBtn).toBeEnabled();
      await rsvpBtn.click();
      await expect(
        studentPage.getByRole("button", { name: "Registered", exact: true }),
      ).toBeVisible();
    } finally {
      // Cleanup inside test to avoid cross-worker pollution
      await prisma.rSVP
        .deleteMany({ where: { eventId: event.id } })
        .catch(() => undefined);
      await prisma.eventApprovalLog
        .deleteMany({ where: { eventId: event.id } })
        .catch(() => undefined);
      await prisma.event
        .delete({ where: { id: event.id } })
        .catch(() => undefined);
    }
  });

  test("admin control layout and status lanes are functional", async ({
    page,
    signInAs,
  }) => {
    await signInAs(page, "admin");
    await page.goto("/admin");

    // Verify layout focus panel is active
    await expect(page.getByText(/Admin Focus/i)).toBeVisible();
    await expect(
      page.getByText(/Approval is now a first-class workflow/i),
    ).toBeVisible();

    // Navigate to events tab and check lanes
    await page.goto("/admin/events");
    await expect(
      page.getByRole("heading", { name: /Pending event reviews/i }),
    ).toBeVisible();
  });
});
