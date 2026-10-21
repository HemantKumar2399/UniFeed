import { test, expect } from "../support/fixtures";

test("public landing opens a usable email sign-in form on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page).toHaveTitle(/UniFeed/i);
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Get Started", exact: true })
    .click();
  await expect(
    page.getByLabel("University Email", { exact: true }),
  ).toBeVisible();
  await expect(page.getByLabel("Password", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Sign In", exact: true }),
  ).toBeVisible();
});
