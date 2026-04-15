import { test as base } from '@playwright/test';

// Define custom fixtures here
type MyFixtures = {
  hello: string;
};

export const test = base.extend<MyFixtures>({
  hello: async ({}, use) => {
    // Setup 
    await use('world');
    // Auto-cleanup here if needed
  },
});

export { expect } from '@playwright/test';
