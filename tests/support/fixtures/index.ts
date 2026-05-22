import { test as base } from '@playwright/test';

// Define custom fixtures here
type MyFixtures = {
  hello: string;
};

export const test = base.extend<MyFixtures>({
  hello: async ({}, applyHello) => {
    await applyHello('world');
    // Auto-cleanup here if needed
  },
});

export { expect } from '@playwright/test';
