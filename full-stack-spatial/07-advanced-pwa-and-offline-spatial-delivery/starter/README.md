# Starter - Advanced PWA and Offline Spatial Delivery

Begin here. This is a client-only PWA: a page that lists downloadable scene bundles, downloads them with real progress and a Cancel button, and stores them with OPFS or the Cache API.

- `index.html`, `scene.html`, `offline.html`, `styles.css`, `manifest.webmanifest`, `icons/`, and `data/` are finished.
- `js/mirror.js` has **TODO 1** (the asset base URL).
- `js/manifest-loader.js` has **TODO 2** (loading the catalogue and a bundle's manifest).
- `js/bundle-store.js` has **TODO 3** (OPFS detection and saving a file), **TODO 4** (reading a saved file back), and **TODO 5** (deleting a bundle).
- `js/storage-panel.js` has **TODO 6** (the storage estimate) and **TODO 7** (requesting persistent storage).
- `js/download-manager.js` has **TODO 8** (downloading with progress, skipping already-saved files) and **TODO 9** (the resume queue).
- `js/low-data.js` has **TODO 10**.
- `js/background-sync.js` has **TODO 11** (feature detection and registering) and **TODO 12** (watching for the resume signal).
- `js/bundles-ui.js` has **TODO 13** (`updateBundleCard`; `renderBundleCard` is finished).
- `js/main.js` has **TODO 14** (`startDownload`), **TODO 15** (the storage panel), and **TODO 16** (the mirror settings buttons).
- `sw.js` has **TODO 17** (the Background Sync `sync` handler; everything else in it is finished).
- `js/scene-main.js` has **TODO 18** (`resolveModelUrl`, offline-first).
- `js/scene-loader.js`, `js/scene-exhibit.js`, `js/scene-describe.js`, and `js/scene-app.js` are finished, carried over from Course 3.5's exhibit.

Until TODO 1 is done, the asset base URL and every download will not resolve to a real file, so a scene's models will show "failed to load" — that is expected. Open everything through `http://localhost` or `http://127.0.0.1`: service workers, and some storage features, need a secure context.

Full instructions: [`../README.md`](../README.md).
