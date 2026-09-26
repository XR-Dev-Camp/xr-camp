# Challenge 1: Foundation

**Required.** Roughly 45 minutes.

Show which of a bundle's individual files are already saved, before a download finishes or even starts.

## Task

1. In `js/bundles-ui.js`, add a small `<ul>` of file names to each card (inside `renderBundleCard`, using `manifest.files`), with one `<li>` per file.
2. Write a new function, `updateFileList(li, bundleId, manifest)`, that calls `readFileUrl(bundleId, file.path)` (from `bundle-store.js`) for every file in the manifest, and marks each `<li>` as "saved" or "not saved yet" depending on whether a URL comes back.
3. Call `updateFileList` once when a card is first rendered, and again every time `updateBundleCard` is called with `status: 'downloaded'` — a download that resumed a partly-saved bundle should show every file as saved once it finishes, not only the ones downloaded in this particular attempt.
4. Confirm it works: start a download, then cancel it partway through. Reload the page. The card should show at least one file already saved, and the rest not.

## Why this matters

This lesson's whole download system is built around skipping files that are already saved (see `download-manager.js`'s `downloadBundle`), so a learner using this page has a right to see that happening, not just trust that it does. A visible per-file list also makes debugging much easier: if a bundle looks "stuck," you can see exactly which file did not save.

## Done when

- [ ] Each bundle card lists its files, each marked saved or not.
- [ ] The list updates after a resumed or repeated download finishes.
- [ ] No console errors, and the page still passes `tests/checklist.md`.
