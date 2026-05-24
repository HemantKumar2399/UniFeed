import type { Page } from "@playwright/test";

export type SeedRole = "student" | "organizer" | "admin";

type SeedUser = {
  email: string;
  password: string;
  expectedPath: "/home" | "/dashboard";
};

const DEFAULT_SEED_DOMAIN = "students.college.edu";
const DEFAULT_PASSWORD = "Test@1234";

function getPrimarySeedDomain() {
  return (
    process.env.ALLOWED_DOMAINS
      ?.split(",")
      .map((domain) => domain.trim().toLowerCase())
      .find(Boolean) ?? DEFAULT_SEED_DOMAIN
  );
}

function buildSeedEmail(localPart: string) {
  return `${localPart}@${getPrimarySeedDomain()}`;
}

export function getSeedUsers(): Record<SeedRole, SeedUser> {
  return {
    student: {
      email: buildSeedEmail("student.1"),
      password: DEFAULT_PASSWORD,
      expectedPath: "/home",
    },
    organizer: {
      email: buildSeedEmail("organizer.coding"),
      password: DEFAULT_PASSWORD,
      expectedPath: "/dashboard",
    },
    admin: {
      email: buildSeedEmail("admin.jecrc"),
      password: DEFAULT_PASSWORD,
      expectedPath: "/dashboard",
    },
  };
}

export async function signInAsSeedUser(page: Page, role: SeedRole) {
  const seedUser = getSeedUsers()[role];

  await page.goto("/login");
  await page.getByPlaceholder("you@college.edu").fill(seedUser.email);
  await page.getByPlaceholder("********").fill(seedUser.password);
  await page.getByRole("button", { name: "Sign In", exact: true }).click();
  await page.waitForURL(new RegExp(`${seedUser.expectedPath}(?:\\?|$)`));
}
