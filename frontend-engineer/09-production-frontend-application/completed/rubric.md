# Rubric: My XR Camp 1.0 — filled in by Ana

The same rubric as [`../starter/rubric.md`](../starter/rubric.md), checked
against this reference solution, with a short note on anything that was not
a simple yes.

## Works

- [x] The dashboard, course map, planner, and weather views all show real
      data, and switching between them keeps each view's own state.
- [x] Progress and planned sessions are saved, and are still there after a
      reload.
- [x] The weather view shows a real forecast when online, and the sample
      forecast (never a blank page) when it cannot reach the network.

## Accessible

- [x] Every view has exactly one visible `<h1>`, and moving between views
      moves focus to it.
- [x] Every control has a visible label, reachable and operable by keyboard
      alone, with a visible focus outline.
- [x] Status changes (an update is ready, a session was added, weather
      loaded) are announced without moving focus.
- [x] Colour is never the only way a status is shown.

## Maintainable

- [x] The app is organised as config, utils, stores, services, and
      components, the same shape as Course 2.3.
- [x] `check.html` runs, and every pure function it checks passes.
- [x] No module writes to another module's `localStorage` key directly.
      (Note: `services/pwa.js` reads `t()` from `i18n.js`, but no module
      outside `stores/` ever calls `localStorage.setItem` itself.)

## Offline / installable

- [x] The app can be installed, and opens in its own window once installed.
- [x] With the network switched off in DevTools, every view still works
      from previously loaded data, and an unsaved page shows `offline.html`.
- [x] Publishing a new `APP_VERSION` shows the update prompt on the next
      visit, and pressing its button updates without losing saved data.
      (Tested by editing `sw.js`'s `VERSION` and reloading twice.)

## Multilingual-ready

- [x] Every user-facing string in the UI comes from a locale file, not a
      hard-coded string.
- [x] Switching languages sets `<html lang>` and updates every visible view
      immediately.
- [x] Numbers, dates, and percentages are formatted with `Intl`, not
      hand-written.
- [x] Any translation that is a first draft says so, in the app and in the
      README. (Spanish and Simplified Chinese are both flagged as drafts
      that need a native reviewer; see the README's "Multilingual-ready"
      section.)

## Documented

- [x] The README's "Plan your sessions" table matches `project.json`'s
      session count. (24 rows, 24 sessions.)
- [x] `CHANGELOG.md` has a `1.0.0` entry that a non-programmer could read.
- [x] `ai-log.md` is filled in honestly, including anything you tried and
      did not keep.

## Released

- [x] `project.json`'s `status` is `"review"`, and the version shown in the
      app and manifest match `CHANGELOG.md`.
- [x] `node scripts/validate-projects.mjs` passes with no errors.
