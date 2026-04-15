# Testing Architecture

## Overview
This directory contains end-to-end tests utilizing Playwright for the UniFeed App.

### Structure
- `e2e/`: Core Playwright E2E tests
- `support/fixtures/`: Custom Playwright fixtures for state and setup
- `support/helpers/`: Utility functions, including robust Data Factories
- `support/page-objects/`: POM classes for abstraction of DOM interaction

## Running Tests
Ensure your `.env` variables have `BASE_URL` mapped.
- Local run test: `npm run test:e2e`
- Run headed: `npx playwright test --headed`
- Run debug: `npx playwright test --debug`

## Best Practices
1. Isolate tests from each other using data factories.
2. Use resilient locators (preferably aria-role or data-testid).
3. Do not couple UI logic with test structure. Use POMs for heavy abstraction.
