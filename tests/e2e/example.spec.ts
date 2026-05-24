import { test, expect } from "../support/fixtures";
import { createEventData } from "../support/helpers/data-factories";

test.describe("Example UI Tests", () => {
  test("Given the homepage, when viewing, then it displays the title", async ({ page }) => {
    await page.goto("/");
    
    // Example test using data-testids if applicable
    // await expect(page.getByTestId('app-title')).toBeVisible();
    await expect(page).toHaveTitle(/UniFeed/i);
  });

  test("Using factory data", async ({ seedUsers }) => {
    const data = createEventData({ title: "Custom Hackathon" });
    expect(seedUsers.student.email).toMatch(/^student\.1@/i);
    expect(data.title).toBe("Custom Hackathon");
  });
});
