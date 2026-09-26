import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Only the unit tests: Playwright's own .spec.js files under tests/e2e
    // import '@playwright/test', not Vitest, and must not be collected here.
    include: ['tests/unit/**/*.test.js'],
  },
});
