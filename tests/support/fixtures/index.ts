import type { Page } from "@playwright/test";
import { test as base } from "@playwright/test";

import type { SeedRole } from "../helpers/auth";
import { getSeedUsers, signInAsSeedUser } from "../helpers/auth";

type TestFixtures = {
  seedUsers: ReturnType<typeof getSeedUsers>;
  signInAs: (page: Page, role: SeedRole) => Promise<void>;
};

export const test = base.extend<TestFixtures>({
  seedUsers: async ({}, use) => {
    await use(getSeedUsers());
  },
  signInAs: async ({}, use) => {
    await use(async (page, role) => {
      await signInAsSeedUser(page, role);
    });
  },
});

export { expect } from "@playwright/test";
