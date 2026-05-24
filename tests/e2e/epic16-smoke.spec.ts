import { expect, test } from "../support/fixtures";
import { getEventIdByTitle } from "../support/helpers/events";

const PUBLISHED_SMOKE_EVENT_TITLE = "E2E Smoke Realtime Event";
const PUBLISHED_SMOKE_EVENT_DESCRIPTION =
  "Deterministic published event used by the Epic 17 smoke test to validate realtime RSVP fan-out across open pages.";

test.describe("Epic 16 smoke coverage", () => {
  test("student can sign in and open a published event", async ({ page, signInAs }) => {
    await signInAs(page, "student");

    await expect(page.getByRole("heading", { name: "For You" })).toBeVisible();

    const eventId = await getEventIdByTitle(PUBLISHED_SMOKE_EVENT_TITLE);
    await page.goto(`/events/${eventId}`);

    await expect(page.getByRole("heading", { name: PUBLISHED_SMOKE_EVENT_TITLE })).toBeVisible();
    await expect(page.getByText(PUBLISHED_SMOKE_EVENT_DESCRIPTION)).toBeVisible();
  });

  test("admin can approve the deterministic submitted smoke event", async ({ page, signInAs }) => {
    await signInAs(page, "admin");
    await page.goto("/admin/events");

    await expect(page.getByRole("heading", { name: /Pending event reviews/i })).toBeVisible();

    const reviewCard = page.locator("article").filter({
      hasText: "E2E Smoke Submitted Event",
    });

    await expect(reviewCard).toBeVisible();
    await reviewCard.getByRole("link", { name: "Review Event" }).click();

    await expect(page.getByRole("heading", { name: /E2E Smoke Submitted Event/i })).toBeVisible();
    await page.getByRole("button", { name: "Approve Event" }).click();

    await expect(page.getByText(/This event is currently\s+APPROVED\./i)).toBeVisible();
  });
});
