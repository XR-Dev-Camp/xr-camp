# Rubric: My XR Camp 1.0

Check your own work against every row before you submit. `completed/rubric.md`
shows how Ana filled this in for the reference solution.

## Works

- [ ] The dashboard, course map, planner, and weather views all show real
      data, and switching between them keeps each view's own state.
- [ ] Progress and planned sessions are saved, and are still there after a
      reload.
- [ ] The weather view shows a real forecast when online, and the sample
      forecast (never a blank page) when it cannot reach the network.

## Accessible

- [ ] Every view has exactly one visible `<h1>`, and moving between views
      moves focus to it.
- [ ] Every control has a visible label, reachable and operable by keyboard
      alone, with a visible focus outline.
- [ ] Status changes (an update is ready, a session was added, weather
      loaded) are announced without moving focus.
- [ ] Colour is never the only way a status is shown.

## Maintainable

- [ ] The app is organised as config, utils, stores, services, and
      components, the same shape as Course 2.3.
- [ ] `check.html` runs, and every pure function it checks passes.
- [ ] No module writes to another module's `localStorage` key directly.

## Offline / installable

- [ ] The app can be installed, and opens in its own window once installed.
- [ ] With the network switched off in DevTools, every view still works
      from previously loaded data, and an unsaved page shows `offline.html`.
- [ ] Publishing a new `APP_VERSION` shows the update prompt on the next
      visit, and pressing its button updates without losing saved data.

## Multilingual-ready

- [ ] Every user-facing string in the UI comes from a locale file, not a
      hard-coded string.
- [ ] Switching languages sets `<html lang>` and updates every visible view
      immediately.
- [ ] Numbers, dates, and percentages are formatted with `Intl`, not
      hand-written.
- [ ] Any translation that is a first draft says so, in the app and in the
      README.

## Documented

- [ ] The README's "Plan your sessions" table matches `project.json`'s
      session count.
- [ ] `CHANGELOG.md` has a `1.0.0` entry that a non-programmer could read.
- [ ] `ai-log.md` is filled in honestly, including anything you tried and
      did not keep.

## Released

- [ ] `project.json`'s `status` is `"review"`, and the version shown in the
      app and manifest match `CHANGELOG.md`.
- [ ] `node scripts/validate-projects.mjs` passes with no errors.
