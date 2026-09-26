import { defineConfig } from '@playwright/test';

// Assumes the course's local server is already running at the repo root
// (see the lesson README's "Setup"): `python3 -m http.server 8766 --bind
// 127.0.0.1`. This config does not start it, so the same server can be
// shared with every other lesson's manual testing.
export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://127.0.0.1:8766/frontend-engineer/09-production-frontend-application/completed/',
  },
});
