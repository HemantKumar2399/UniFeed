import { expect, test } from "../support/fixtures";
import { getEventIdByTitle } from "../support/helpers/events";

const REALTIME_SMOKE_EVENT_TITLE = "E2E Smoke Realtime Event";

test.describe("Epic 17 realtime smoke coverage", () => {
  test("student RSVP updates capacity and CTA state across open pages", async ({ page, signInAs }) => {
    await signInAs(page, "student");
    const eventId = await getEventIdByTitle(REALTIME_SMOKE_EVENT_TITLE);
    const eventPath = `/events/${eventId}`;

    const mirrorPage = await page.context().newPage();
    await page.goto(eventPath);
    await mirrorPage.goto(eventPath);

    await expect(page.getByRole("heading", { name: REALTIME_SMOKE_EVENT_TITLE })).toBeVisible();
    await expect(mirrorPage.getByRole("heading", { name: REALTIME_SMOKE_EVENT_TITLE })).toBeVisible();

    await expect(page.getByText(/0\s*\/\s*80/i)).toBeVisible();
    await expect(mirrorPage.getByText(/0\s*\/\s*80/i)).toBeVisible();

    await expect(page.getByRole("button", { name: "Reserve Spot" })).toBeVisible();
    await expect(mirrorPage.getByRole("button", { name: "Reserve Spot" })).toBeVisible();

    // Give SSE subscriptions on both pages a brief window to establish connections.
    await page.waitForTimeout(2000);

    await page.getByRole("button", { name: "Reserve Spot" }).click();
    await expect(page.getByText(/1\s*\/\s*80/i)).toBeVisible();
    await expect(page.getByRole("button", { name: "Registered" })).toBeVisible();

    await expect(mirrorPage.getByText(/1\s*\/\s*80/i)).toBeVisible();
    await expect(mirrorPage.getByRole("button", { name: "Registered" })).toBeVisible();
  });
});
