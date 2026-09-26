// A Playwright end-to-end test for My XR Camp's main flow: switch view by
// keyboard (TODO 1's showView/currentView pair), then add a planner session
// (Course 2.3's store, reused — see "Step 4" in the README) and see it
// appear in the list.
//
// This needs the course's local server running (see the lesson README's
// "Setup"), serving the whole repository at http://127.0.0.1:8766/, and
// baseURL in playwright.config.js pointing at this lesson's completed/
// folder under it.
//
// Run: npx playwright test (from this folder, with devDependencies
// installed and the local server already running).
import { expect, test } from '@playwright/test';

test('switching to the planner view by keyboard, then adding a session', async ({ page }) => {
  await page.goto('index.html');

  // The dashboard is the default view.
  await expect(page.locator('#dashboard')).toBeVisible();
  await expect(page.locator('#planner')).toBeHidden();

  // Keyboard check: focus the "Planner" nav link directly (the way a
  // keyboard user who has already tabbed there would find it) and activate
  // it with Enter, the same as a mouse click would. No pointer is used
  // anywhere in this test.
  const plannerLink = page.locator('[data-view="planner"]');
  await plannerLink.focus();
  await expect(plannerLink).toBeFocused();
  await page.keyboard.press('Enter');

  // showView() must both reveal the section and move focus to its
  // tabindex="-1" heading (WCAG 2.4.3), not leave focus behind on the link.
  await expect(page.locator('#planner')).toBeVisible();
  await expect(page.locator('#dashboard')).toBeHidden();
  await expect(page.locator('#planner-heading')).toBeFocused();
  await expect(page).toHaveURL(/#planner$/);

  // Add a session through the form, entirely with the keyboard.
  await page.selectOption('#planner-day', 'Tuesday');
  await page.fill('#planner-time', '18:30');
  await page.locator('#planner-topic').fill('WebGPU bonus');
  await page.keyboard.press('Enter');

  // The new session appears in the list without a page reload.
  const list = page.locator('#planner-list');
  await expect(list).toContainText('WebGPU bonus');
  await expect(list).toContainText('Tuesday');
});
