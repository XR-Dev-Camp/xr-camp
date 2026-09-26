# Project check

Work through this list before you submit.

## Structure
- [ ] The page has a valid document structure and one clear main heading.
- [ ] The page language is identified (`<html lang="en">`).
- [ ] `node scripts/validate-projects.mjs` passes from the repository root.

## Bundles, storage, and downloads
- [ ] The bundle list shows the real file count and total size for "History exhibit," read from its manifest before any download starts.
- [ ] Clicking "Download for offline" shows real, moving progress (not stuck at 0% or jumping straight to 100%).
- [ ] Clicking "Cancel download" partway through actually stops the network request (check the Network panel) and leaves the bundle as "Not downloaded yet."
- [ ] After a full download, the storage panel's usage number increases by roughly the bundle's total size.
- [ ] "Ask the browser to keep this storage" reports a clear result either way (granted, not granted, or not supported).
- [ ] "Delete bundle" removes the files: the storage panel's usage drops back down, and downloading again re-fetches every file.
- [ ] With low-data mode on, downloading a bundle over 300 KB asks for confirmation first.
- [ ] Setting an asset base URL and reloading changes where a fresh download's files are fetched from (check the Network panel's request URLs); resetting it returns to this project's own `assets/` folder.

## Offline behaviour
- [ ] After downloading a bundle, going offline (DevTools > Network > Offline) and opening its scene still shows every model.
- [ ] Interrupting a download by going offline mid-file, then coming back online, resumes and finishes it without re-downloading files that already saved.
- [ ] `index.html` and an already-visited `scene.html` both still load with the browser fully offline, after at least one earlier online visit.

## Accessibility
- [ ] Every download, cancel, delete, and settings action can be done with the keyboard alone.
- [ ] The scene description and the always-present item list always match what the 3D view shows, including "still loading" and "failed to load" states.
- [ ] A download's progress and status text are readable as real text, not only shown by a moving bar.
- [ ] Focus is visible at all times.
- [ ] Colour contrast meets WCAG 2.2 AA.
- [ ] The scene respects `prefers-reduced-motion`, and the Pause button works regardless of that preference.

## Responsiveness
- [ ] The page works at mobile width (390px) and no wider layout (1280px) overflows horizontally.

## Quality
- [ ] The browser console has no errors on either completed page.
- [ ] Every API this project uses (OPFS, the Cache API, Background Sync, `navigator.storage`) is feature-detected before use, with a working fallback or a clear message where it is not supported.
- [ ] Code is formatted consistently and meaningfully named.
- [ ] Comments explain intent, not syntax.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] Every model in the scene loads in its correct place on its pedestal, whether it came from the network or from an offline-downloaded file.
- [ ] With `prefers-reduced-motion: reduce` set at the operating-system level, the jade stone does not turn on page load.
- [ ] The Pause/Resume animation button's label and `aria-pressed` state always match what the scene is actually doing.
- [ ] "Turn left" and "Turn right" move the view by a sensible, consistent amount, matching what dragging the view does.
