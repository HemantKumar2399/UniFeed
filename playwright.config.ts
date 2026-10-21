import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

const testDatabase = new URL(
  process.env.TEST_DATABASE_URL ?? "postgresql://invalid/",
);
if (
  !["localhost", "127.0.0.1", "[::1]"].includes(testDatabase.hostname) ||
  !/test/i.test(testDatabase.pathname)
) {
  throw new Error(
    "Browser tests require TEST_DATABASE_URL pointing to a dedicated local test database.",
  );
}
process.env.DATABASE_URL = testDatabase.href;
const baseURL = process.env.BASE_URL ?? "http://localhost:3000";
const serverPort = Number(new URL(baseURL).port || 3000);

export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: "./test-results/browser",
  timeout: 60000,
  expect: {
    timeout: 15000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["html"],
    ["junit", { outputFile: "test-results/results.xml" }],
    ["list"],
  ],
  use: {
    actionTimeout: 15000,
    navigationTimeout: 30000,
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  webServer:
    process.env.REUSE_TEST_SERVER === "1"
      ? undefined
      : {
          command: `npm run dev -- --port ${serverPort}`,
          url: baseURL,
          reuseExistingServer: false,
          timeout: 120000,
        },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],
});
