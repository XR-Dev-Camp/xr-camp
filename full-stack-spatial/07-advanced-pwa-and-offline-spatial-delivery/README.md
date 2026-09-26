# Advanced PWA and Offline Spatial Delivery

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `full-stack-spatial` · **Lesson:** `advanced-pwa-and-offline-spatial-delivery-07` · **Time:** about 10 hours · 14 sessions of 45 minutes · about 4 weeks at 4 sessions a week

---

> Make a spatial application installable and functional with intermittent connectivity.

---

## Learning objectives

By the end of this project you will be able to:

1. Build a downloadable "scene bundle" as a manifest JSON file that lists every file it needs and its size, and use that manifest to show real progress before, during, and after a download.
2. Store large binary files with the Origin Private File System (OPFS) where it is supported, and fall back to the Cache API where it is not, without changing how the rest of the app reads a saved file back.
3. Read a page's own storage usage and quota with `navigator.storage.estimate()`, and ask the browser to protect that storage from automatic eviction with `navigator.storage.persist()`.
4. Cancel an in-progress download cleanly with `AbortController`, and resume an interrupted one without re-downloading files that already saved.
5. Use the Background Sync API where it is supported, and fall back to the window's `online` event everywhere else, so a paused download finishes once the connection returns.
6. Add a low-data mode that asks for confirmation before a large download, and a configurable asset base URL so a school or community can host its own regional mirror of a project's files.
7. Explain, for each storage or networking API this lesson uses, which current browsers support it (per MDN) and what the app does instead where one is missing.

## Prerequisites

- **Course 4.6: Progressive Web Applications** — this lesson reuses its service-worker install/activate pattern and its low-data-mode idea.
- **Course 3.5: Three.js Interaction, Assets, and Animation** — this lesson reuses its exhibit, its two glTF models, and their attribution directly.
- Comfort with `async`/`await`, `fetch`, and `Promise.allSettled`, from Course 4.4.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A modern browser (Chrome or Edge recommended, to see every feature working; Firefox and Safari also work, with documented fallbacks) | Testing downloads, storage, and offline behaviour | Free |
| A text editor (e.g. VS Code) | Writing the code | Free |
| A local static file server (for example Python's built-in `python3 -m http.server`, already used elsewhere in this course) | Service workers, OPFS, and Background Sync all require a secure context; `http://localhost` and `http://127.0.0.1` count as one | Free |

This project calls no external service and needs no account, API key, or npm package: every file it downloads is served by the same static server as the page itself, unless you configure a different asset base URL yourself (see "What you will build"). Nothing here is affected by network conditions in mainland China, since nothing leaves your own machine.

## What you will build

Course 4.6 gave the study-week weather dashboard a service worker and a low-data mode. Course 3.5 gave the exhibit two real glTF models, loaded with `GLTFLoader`. This lesson combines both ideas into something neither one needed on its own: a small library of **offline scene bundles** — a manifest naming a scene's files and their sizes, a **Download for offline** button with real progress and a working **Cancel**, and a **storage panel** that shows how much space this project is using and lets you ask the browser to keep it. Once a bundle has downloaded, its scene page (`scene.html`) works with no network connection at all, by reading its models back from the Origin Private File System (OPFS) — or, on a browser without OPFS, from the Cache API instead.

Two smaller, related features round the lesson out: a **low-data mode** that asks before a large download starts, and a **configurable asset base URL**, so a school or community with a slow or blocked connection to the wider internet can host its own copy of this project's `assets/` folder (a "regional mirror") and point this page at it, with no other change to the code.

The reference solution is in [`completed/`](completed/); the starter has **18 numbered TODOs**, spread across ten small, single-purpose modules (`js/mirror.js`, `js/manifest-loader.js`, `js/bundle-store.js`, `js/storage-panel.js`, `js/download-manager.js`, `js/low-data.js`, `js/background-sync.js`, `js/bundles-ui.js`, `js/main.js`, `sw.js`), plus one in `js/scene-main.js` where the offline story comes together. `js/scene-loader.js`, `js/scene-exhibit.js`, `js/scene-describe.js`, and `js/scene-app.js` are carried over from Course 3.5, finished, so this lesson can focus on delivery, not on the 3D view itself.

## Folder guide

```text
07-advanced-pwa-and-offline-spatial-delivery/
├── README.md
├── starter/                  # begin here
│   ├── index.html, scene.html, offline.html, styles.css, manifest.webmanifest
│   ├── sw.js                  # TODO 17
│   ├── data/
│   │   ├── bundles.json        # the bundle catalogue — finished
│   │   └── bundles/history-exhibit.manifest.json  # finished
│   └── js/
│       ├── mirror.js            # TODO 1
│       ├── manifest-loader.js    # TODO 2
│       ├── bundle-store.js        # TODO 3, 4, 5
│       ├── storage-panel.js        # TODO 6, 7
│       ├── download-manager.js      # TODO 8, 9
│       ├── low-data.js               # TODO 10
│       ├── background-sync.js         # TODO 11, 12
│       ├── bundles-ui.js               # TODO 13
│       ├── main.js                      # TODO 14, 15, 16
│       ├── scene-loader.js, scene-exhibit.js, scene-describe.js, scene-app.js  # finished, from 3.5
│       └── scene-main.js                 # TODO 18
├── completed/                # reference solution
├── assets/                    # Fox.glb, CesiumMilkTruck.glb — copied from 3.5
├── challenges/                # Three challenges: Foundation is required
├── tests/                     # self-review checklist
└── screenshots/
```

## Setup

1. From the repository root, start a static server if one is not already running: `python3 -m http.server 8766 --bind 127.0.0.1`.
2. Open `http://127.0.0.1:8766/full-stack-spatial/07-advanced-pwa-and-offline-spatial-delivery/starter/index.html`.
3. Open DevTools > Application > Service Workers and tick **Update on reload** while you work, so an old service worker never hides your changes.
4. The bundle list, storage panel, and settings all appear immediately; before TODO 1 is done, downloading a bundle will fail (its files resolve to the wrong address) — that is expected, and is your map of where to start.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Read this Walkthrough; run the Setup steps above; open every starter file once. | A running page whose bundle list and storage panel already show something, and a list of every TODO ahead. |
| 2 | TODO 1: `js/mirror.js`'s `getAssetBaseUrl`, `setAssetBaseUrl`, and `resolveAssetUrl`. | Typing a URL into "Asset base URL" and clicking Save, then reloading, shows the same value back. |
| 3 | TODO 2: `js/manifest-loader.js`'s `fetchCatalog` and `fetchBundleManifest`. | The "History exhibit" card appears with its real file count and total size. |
| 4 | TODO 3: `js/bundle-store.js`'s `supportsOPFS` and `saveFile`. | Clicking Download saves real files; DevTools > Application > Storage (or Cache Storage) shows them appear. |
| 5 | TODO 4: `js/bundle-store.js`'s `readFileUrl`; TODO 5: `deleteBundle`. | "Delete bundle" removes the saved files, and downloading again re-fetches them from nothing. |
| 6 | TODO 6: `js/storage-panel.js`'s `readStorageEstimate`; TODO 7: `requestPersistence`. | The storage panel shows a real usage number that grows after a download, and the persist button reports a real result. |
| 7 | TODO 8: `js/download-manager.js`'s `readWithProgress` and `downloadBundle`. | The progress bar moves smoothly as a model downloads, instead of jumping from 0% to 100%. |
| 8 | TODO 9: `js/download-manager.js`'s resume queue (`queueForResume`, `readQueue`, `clearFromQueue`). | Going offline mid-download (DevTools > Network > Offline) and back online resumes the download without restarting finished files. |
| 9 | TODO 10: `js/low-data.js`. | With the low-data toggle on, downloading the (over 300 KB) history exhibit bundle asks for confirmation first. |
| 10 | TODO 11: `js/background-sync.js`'s `supportsBackgroundSync` and `registerResume`; TODO 12: `watchForResume`. | The "How offline downloads keep going" section correctly names whether your browser supports Background Sync. |
| 11 | TODO 13: `js/bundles-ui.js`'s `updateBundleCard`. | Every state (not downloaded, downloading, downloaded, paused) shows its own correct text and buttons. |
| 12 | TODO 14: `js/main.js`'s `startDownload`. | A full download, a cancel, and a resume after going offline all work end to end from the button click. |
| 13 | TODO 15 and TODO 16: `js/main.js`'s storage panel and mirror settings wiring; TODO 17: `sw.js`'s `sync` handler; TODO 18: `js/scene-main.js`'s `resolveModelUrl`. | `scene.html` loads its models from your offline-downloaded bundle first, with no network request at all — confirm this with DevTools > Network > Offline. |
| 14 | Work through [`tests/checklist.md`](tests/checklist.md); complete the required [Foundation challenge](challenges/challenge-1.md); one more challenge extension, then **Submitting your work**. | Every checklist item checked, your own small extension, and a project you are ready to show. |

### Step 1: Read the manifest shape (no TODO yet)

Before writing anything, open `data/bundles/history-exhibit.manifest.json`. Notice it lists only two files, each with a `path` and a real `bytes` count — no URLs, no origin. That is deliberate: a manifest describes *what* a bundle contains, never *where* to get it from. "Where" is `js/mirror.js`'s one job (Step 2), which is exactly what makes a regional mirror possible later without touching a single manifest.

### Step 2: The asset base URL (TODO 1)

`js/mirror.js` resolves a bare file name like `"Fox.glb"` against whichever base URL is currently configured: the project's own `../assets/` folder by default, or a saved URL from `localStorage` if a mirror has been set. Finish `getAssetBaseUrl`, `setAssetBaseUrl`, and `resolveAssetUrl` following the comments in the file. A mirror is a different origin, so it must send CORS headers for `fetch()` to read its response — the same cross-origin rule Course 5.1 covered for any API.

### Step 3: Load the catalogue (TODO 2)

`js/manifest-loader.js`'s `fetchCatalog` reads `data/bundles.json` (always from this project's own server, never through a mirror — only a bundle's own *files* are mirrorable); `fetchBundleManifest` reads one bundle's own manifest. Both are ordinary `fetch()` calls with one job each: fetch, check `.ok`, parse JSON, return it.

### Step 4: Save a file, in OPFS or the Cache API (TODO 3)

`js/bundle-store.js`'s `supportsOPFS()` checks for `navigator.storage.getDirectory` before anything tries to use it — never assume a browser has a feature because of its name or version. `saveFile` then picks a store: OPFS's `createWritable()` stream when it is available, or a `Request`/`Response` pair in a named `Cache` when it is not. Everything above this function — the download logic, the UI — never needs to know which one actually happened.

### Step 5: Read a file back, and delete a bundle (TODO 4, TODO 5)

`readFileUrl` is the reverse of `saveFile`: given a bundle id and a path, it returns a `blob:` URL ready to hand to anything that wants the file (a `fetch`, an `<img>`, or — in `scene-main.js` — `GLTFLoader`), trying OPFS first and the cache second. `deleteBundle` removes a bundle's files from both stores unconditionally, since a bundle downloaded before a browser update changed OPFS support could have ended up split across both.

### Step 6: The storage panel (TODO 6, TODO 7)

`js/storage-panel.js` wraps two methods on `navigator.storage`: `estimate()`, which reports how many bytes this origin is using and its rough quota, and `persist()`, which asks the browser not to clear this storage automatically under disk pressure. Both are feature-checked first — `estimate()` is broadly supported, Safari supports persist() since version 15.2 (Dec 2021), and the browser can refuse the request either way, so `requestPersistence()` always reports what actually happened rather than assuming success.

### Step 7: Download with progress (TODO 8)

`readWithProgress` reads a `fetch` response's body with `getReader()` instead of calling `.blob()` directly, so it can report real bytes-as-they-arrive; `downloadBundle` calls it once per file, adds each file's bytes to a running total, and calls `saveFile` (Step 4) once a file finishes. The one detail worth reading twice: **before** fetching each file, it checks whether `readFileUrl` (Step 5) already has a copy saved, and skips straight past it if so.

### Step 8: The resume queue (TODO 9)

That skip-if-saved check in Step 7 is also the entire mechanism behind resuming an interrupted download: `queueForResume` just remembers a bundle's id in `localStorage` when a download fails for a reason other than a deliberate Cancel, and resuming it later (Step 12, and `background-sync.js`) is nothing more than calling `downloadBundle` again — every already-saved file is skipped automatically, and only the missing ones are fetched.

### Step 9: Low-data mode (TODO 10)

Carried over conceptually from Course 4.6, where it hid the 3D moment entirely. Here, the 3D content *is* the download, so `lowDataPreferred()` instead gates a confirmation in `main.js` (Step 12): a learner who has chosen to save data can still decide, file by file, that a particular download is worth it.

### Step 10: Background Sync, with a fallback (TODO 11, TODO 12)

`supportsBackgroundSync()` checks for `'serviceWorker' in navigator && 'SyncManager' in window` — per MDN's current browser-support table, this ships only in Chromium-based browsers. `registerResume()` asks the service worker to fire a `sync` event once the browser judges the connection is back, even if every tab of this app is closed by then; `watchForResume()` listens for the message that event sends (see Step 13), and — on every browser, including ones without Background Sync at all — also listens directly for the window's `online` event, which only needs a tab to be open.

### Step 11: Show the bundle's real state (TODO 13)

`updateBundleCard` is pure DOM: given a state object (`idle`, `downloading`, `downloaded`, or `error`), it shows the right buttons and writes the right words, including the moving progress bar's value and an accurate byte count. It never calls `fetch`, storage, or the service worker itself — that separation is what lets Step 12's `startDownload` change *what* happened without this function ever needing to change *how it is shown*.

### Step 12: Wire the download button (TODO 14)

`main.js`'s `startDownload` ties Steps 2–11 together: check low-data mode, create an `AbortController`, call `downloadBundle` with `onProgress` wired to `updateBundleCard`, and handle the two different outcomes of a failure — `error.name === 'AbortError'` (a deliberate Cancel: reset the card, do not queue anything) versus any other error (a real failure: queue the bundle for resume, and ask Background Sync to help if it can).

### Step 13: Finish the settings, the wake-up call, and the offline scene (TODO 15, TODO 16, TODO 17, TODO 18)

Four small, independent pieces close this lesson out: `main.js`'s `renderStoragePanel` and its mirror-settings button handlers (Steps 6 and 2, now shown on screen); `sw.js`'s `sync` event listener, which tells every open page to try `resumeQueuedDownloads()` again; and `scene-main.js`'s `resolveModelUrl`, which tries `readFileUrl` (Step 5) before ever falling back to `resolveAssetUrl` (Step 2). That last function is where every earlier step actually pays off: it is the one line standing between "downloaded" and "works with no network at all."

## Key code explained

- **A manifest describes files; `mirror.js` decides where they live.** Nothing in `data/bundles/*.manifest.json` names a server. That split is what lets a regional mirror exist at all: change one saved URL, and every bundle's files resolve to a different origin, with no manifest, download code, or storage code touched.
- **Skip-if-saved is the whole resume mechanism.** `downloadBundle` checks `readFileUrl` before fetching every file. There is no separate "resume" code path anywhere in this project — a fresh download call and a resumed one are the same function call, and the only difference is how many files it finds already saved.
- **Two stores, one interface.** `bundle-store.js` is the only file that knows whether a given browser has OPFS. Everything else — the download logic, the UI, `scene-main.js` — calls `saveFile` and `readFileUrl` and never asks which store answered.
- **Feature detection, not browser detection.** Every optional API in this lesson (`navigator.storage.getDirectory`, `navigator.storage.persist`, `'SyncManager' in window`) is checked for directly, with a working fallback, rather than guessed at from a browser name or version — the only approach that keeps working correctly as browsers add support over time.
- **Progress needs the response body, not `.blob()`.** `readWithProgress` reads a fetch response's stream chunk by chunk specifically so `onProgress` can report real numbers while a big file is still arriving; a plain `.blob()` call gives no progress at all until the whole file is already in memory.
- **A `blob:` URL is indistinguishable from a network one, to `GLTFLoader`.** `resolveModelUrl` in `scene-main.js` can return either kind, and `GLTFLoader.load()` never needs to know which — the entire "does this work offline" question comes down to which URL that one function returns.

## 3D and XR accessibility

- **Scene description.** `#scene-description` (`scene-describe.js`'s `describeExhibit`) is built from the same `items` array the 3D view renders, and is updated every time a model finishes loading, fails, or the connection state changes (WCAG 1.1.1, 1.3.1).
- **Keyboard routes for every interaction.** "Turn left," "Turn right," and "Reset view" reach every camera movement this scene offers without a mouse; dragging the canvas is one way to look around, never the only one.
- **A 2D twin of the 3D view.** `#exhibit-list` names every item and its current status (loading, loaded, or failed) in ordinary text, always present, not only when WebGL is unavailable.
- **Reduced motion and a Pause control.** The jade stone's turn, and every loaded model's own animation, start paused when `prefers-reduced-motion: reduce` is set; the **Pause animation** button (with `aria-pressed`) works regardless of that preference.
- **Comfort.** The camera only ever moves in response to a drag, a keypress, or the Turn/Reset buttons — never on its own, and never because a download finished or failed.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| Every download's status and progress are announced as text, in a `role="status"` element | 1.4.1, 4.1.3 | A learner who cannot see a moving progress bar still needs to know a download is happening, and how far along it is. |
| A paused-and-queued download says so in words, not only by hiding its progress bar | 1.4.1 | "Paused: will resume automatically" and "Not downloaded yet" must never be told apart by colour or shape alone. |
| `role="list"` on every `<ul>` styled with `list-style: none` | Good practice | Safari otherwise drops list semantics from a list-styled-away `<ul>`. |
| Every repeated button ("Download," "Cancel," "Delete" per bundle) has a visible label starting its accessible name | 2.5.3 | `aria-label`-free `textContent` like "Download for offline: History exhibit" means the visible word and the announced word are the same word. |
| Animation respects `prefers-reduced-motion` and offers a Pause button | 2.2.2 | Self-starting motion the learner did not ask for must be stoppable. |
| Every interaction (settings, download, cancel, delete, look around) has a keyboard route | 2.1.1 | Nothing in this lesson depends on a mouse or touch. |

## Performance considerations

- **Report the manifest's own sizes before fetching anything.** The bundle card shows a real total size the moment its manifest loads — a learner decides whether to download *before* any byte of the actual files has moved.
- **Skip-if-saved avoids wasted transfer, not just wasted time.** Every resumed or repeated download call re-checks `readFileUrl` per file, so a slow or metered connection is never asked to fetch a file twice.
- **`Content-Length` drives the progress bar, but downloads still work without it.** If a server (or a mirror) does not send it, `readWithProgress`'s `total` is `0` and the bar simply stays hidden — a missing header degrades the display, never the download itself.
- **OPFS avoids a second, in-memory copy of a large file for its own sake.** `createWritable()` streams a file to disk; nothing in this lesson holds two full copies of a 370 KB model in memory at once, and a much larger real-world model would matter far more here.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Checking `navigator.userAgent` (or a browser's name) to decide whether OPFS or Background Sync is available | Breaks the moment a browser adds or removes support, or on a browser you did not think to test | Feature-detect the actual method or interface (`navigator.storage?.getDirectory`, `'SyncManager' in window`) every time |
| Calling `response.blob()` to download a file with a progress bar | The bar cannot move until the entire file has already arrived, defeating the point of showing progress at all | Read the response body with `getReader()` and report bytes as each chunk arrives |
| Treating `AbortError` (a deliberate Cancel) the same as a network failure | A learner who clicks Cancel sees their download "paused" and silently retried later, instead of stopped | Check `error.name === 'AbortError'` and skip the resume queue for that case |
| Building a bundle's file URL by hand, mixing the mirror's origin into manifest or download code | Changing the asset base URL later means finding and fixing every place a URL was built | Route every file URL through `mirror.js`'s `resolveAssetUrl`, and nowhere else |
| Assuming a browser without OPFS has no offline storage at all | An entire feature is disabled unnecessarily on Firefox versions before 111, or on Safari | Fall back to the Cache API, which is supported everywhere a service worker is |

## Troubleshooting

**A bundle's models show "failed to load" immediately.** Before TODO 1 is finished, `resolveAssetUrl` has not been implemented yet, so files resolve to the wrong address. This is expected until Step 2.

**Downloads show 0% the whole time, then jump to 100%.** `readWithProgress` (TODO 8) has not been finished yet, or the server response is missing a `Content-Length` header — check the Network panel's response headers for the file in question.

**"This browser does not support requesting persistent storage."** Safari implements persist() since version 15.2; the browser may decline the request based on its own heuristics. Nothing is broken; the storage is simply not protected from automatic eviction the way it would be elsewhere.

**A cancelled download still shows up in the resume queue.** Check that `startDownload`'s `catch` block distinguishes `error.name === 'AbortError'` from every other error — only a real failure should call `queueForResume`.

**Going offline and reopening `scene.html` still tries the network.** Confirm `resolveModelUrl` (TODO 18) checks `readFileUrl` *before* `resolveAssetUrl`, not after, and that the bundle actually finished downloading (check the storage panel's usage number, or DevTools > Application).

**Service worker changes do not seem to apply.** Tick **Update on reload** in DevTools > Application > Service Workers (Firefox: `about:debugging#/runtime/this-firefox`; Safari: the Develop menu's Service Workers submenu), or unregister the old worker by hand.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: show which of a bundle's individual files are already saved, before its download finishes or even starts.
2. **[Creative](challenges/challenge-2.md)**: build your own small scene bundle around something from your own community, in your own language.
3. **[Explorer](challenges/challenge-3.md)**: resume a single interrupted file with HTTP range requests, instead of only skipping whole files that already finished.

## Submitting your work

1. Work through [`tests/checklist.md`](tests/checklist.md).
2. Take screenshots: the bundle list mid-download with its progress bar visible, the storage panel after a successful download, and the history exhibit scene running with DevTools set to Offline.
3. Keep them in your learner journal and portfolio. Share them with other developers: see [where to share your work and ask for help](../../docs/en/community.md).
4. Journal question: this lesson always tries an offline-saved file before the network (`resolveModelUrl`). Find one other place in a real app you use often — a map, a messaging app, a music player — where you think the same "saved copy first, network second" order would make it noticeably more usable on a bad connection. What would that app have to store, and how would it know when its saved copy is out of date?

## Further reading

- [MDN: Origin private file system](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system)
- [MDN: Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache)
- [MDN: Background Synchronization API](https://developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API)
- [MDN: StorageManager](https://developer.mozilla.org/en-US/docs/Web/API/StorageManager)
- [MDN: Using readable streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams)

## Women to Know

**Africa Flores-Anderson** (África Flores) is a Guatemalan remote-sensing scientist. She worked for SERVIR, the joint NASA–USAID Earth-observation program, and led a project funded by Microsoft and National Geographic's AI for Earth that used satellite data and machine learning to monitor and forecast algae blooms in Lake Atitlán. In 2020 she was named Geospatial World's Geospatial Woman Champion of the Year.

Satellite data only helps a community if it reaches the people who need it, often over slow or unreliable connections. Packaging large spatial data so it can be downloaded once and used offline, as you did in this lesson, is part of that same work.

_Facts from public sources, checked 2026. Spotted an error? [Tell us](https://github.com/XR-Dev-Camp/xr-camp/issues)._

## Standards spotlight

The Cache API and the Service Workers specification that depends on it are maintained by the W3C Web Applications Working Group, following the W3C's usual Recommendation process. The Origin Private File System (the part of the File System API this lesson uses) and the Background Sync API took a different path: both began as proposals inside the WICG (Web Incubator Community Group), a lighter-weight venue browser vendors use to develop and test a feature before — if ever — it moves to a formal standards track. That difference in process is a real, practical reason (not the only one) why this lesson's support notes are so much more cautious about OPFS and Background Sync than about the Cache API: a feature's standards status and its cross-browser support tend to move together, which is exactly why this lesson checks MDN's current compatibility tables, rather than trusting how established an API's name sounds.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
