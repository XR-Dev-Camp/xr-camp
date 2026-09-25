# Progressive Web Applications

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `frontend-engineer` · **Lesson:** `progressive-web-applications-06` · **Time:** about 12 hours · 16 sessions of 45 minutes · about 4 weeks at 4 sessions a week

---

> Turn a previous application into an installable offline-capable PWA.

---

## Learning objectives

By the end of this project you will be able to:

1. Explain what makes a website a **progressive web app** (PWA): a manifest, a service worker, and a secure context.
2. Write a **web app manifest** with a name, colours, a start address, and icons, including a **maskable** icon.
3. Register a **service worker**, and follow its lifecycle: install, waiting, activate.
4. **Precache** an app shell in a versioned cache, and answer from it **cache first**.
5. Choose a caching strategy for live data (**network first with a timeout**), and explain why.
6. Show an **offline page** instead of the browser's error, and delete old caches when a new version activates.
7. Offer updates politely: "A new version is ready", with a **Reload** button, and never reload by surprise.
8. Respect people on slow or expensive connections with a **low-data mode**.
9. Explain honestly where a PWA can be **installed** today, and where it cannot.

## Prerequisites

- **Course 2.4: APIs, JSON, and Asynchronous Applications** (the weather dashboard you will turn into an app; `fetch`, `async`, and caching).
- **Course 2.3: Application Architecture** (one job per file).

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A Chromium browser: Chrome or Microsoft Edge (both available in mainland China) | The **Application** panel shows the manifest, the service worker, and every cache | Free |
| Firefox (optional) | A second opinion: its **Application** panel shows the manifest and service workers, and `about:debugging` lists every worker | Free |
| VS Code and a local server | Service workers only run on `https://` pages, or on `http://localhost` and `http://127.0.0.1` | Free |
| A phone (optional) | Test installing, and offline, on a real device | Free |
| [Open-Meteo](https://open-meteo.com/) | Weather forecasts: no key, no account | Free for non-commercial use |

**If Open-Meteo is slow or blocked where you are**, tick **Use sample data**, as in Course 2.4. Everything in this lesson (the manifest, the service worker, the caches, the update flow) works with the sample data.

## What you will build

The fourth part of **My XR Camp**, again: the **study-week weather dashboard** from Course 2.4, now an **app**. It opens with no internet, on a bus, in a library with bad Wi-Fi, or with no data left this month. It can live on a phone's home screen with its own icon. It tells the truth about old data, offers updates without surprises, and has a **low-data mode** that skips the 1.3 MB 3D library.

Nothing about the forecast changes. That is the point of the word **progressive**: the same web page, made better in browsers that support more, and still working in browsers that do not.

The reference solution is in [`completed/`](completed/). The starter is the finished Course 2.4 dashboard, plus finished icons, an offline page, and new files with fifteen TODOs.

## Folder guide

```text
06-progressive-web-applications/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html       # The dashboard: TODOs 1–2 are in its <head>
│   ├── manifest.webmanifest   # Almost empty: TODOs 1–2 fill it
│   ├── icons/           # Finished: SVG and PNG icons, one maskable
│   ├── sw.js            # The service worker: TODOs 4–8, 10–11, 15
│   ├── offline.html     # Finished: shown for pages that are not saved
│   ├── js/pwa.js        # TODOs 3, 12–13
│   ├── js/api.js        # TODO 9
│   ├── js/low-data.js   # TODO 14
│   ├── js/main.js, config.js, cache.js, forecast.js, view.js   # Finished
│   ├── data/sample-forecast.json, styles.css                   # Finished
│   └── 3d-moment.html   # The forecast as 3D bars, loaded only when wanted
├── completed/           # Reference solution: open this last
├── challenges/          # Three optional extensions
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. Copy the starter into a new folder, `weather-app`, and commit it with Git. (It is your Course 2.4 dashboard with a few new files. If you prefer, copy the new files into your own `weather` folder instead.)
2. Start your local server, and open `index.html` through `http://localhost` or `http://127.0.0.1`. **Not** a file opened by double-clicking, and not your computer's network address (like `http://192.168.1.20`): service workers need a **secure context**, and those are not.
3. Open the developer tools, and find the **Application** panel (Chrome and Edge; in Firefox, **Application** too, and caches are in **Storage**). You will live in it for this lesson.
4. The dashboard works exactly as in Course 2.4. That is expected: nothing is an app yet.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; Step 1: what makes a PWA | You have found the Application panel |
| 2 | Step 2: the manifest (TODO 1) | Your app's name and colours in the Manifest section |
| 3 | Step 3: icons, and the maskable icon (TODO 2) | Four icons in the Manifest section, no warnings |
| 4 | Step 4: register a service worker (TODOs 3–4) | "activated and is running" in Service workers |
| 5 | Step 5: precache the app shell (TODO 5) | Twenty files in Cache storage |
| 6 | Step 6: cache first (TODO 6) | The page reloads with **Offline** ticked |
| 7 | Step 7: the offline page (TODO 7) | Your offline page, not the browser's error |
| 8 | Step 8: network first for the weather (TODO 8) | A forecast that loads offline, from the service worker |
| 9 | Step 9: tell the truth about age (TODO 9) | "Saved by this app at 14:05" when offline |
| 10 | Step 10: versions, and cleaning up (TODO 10) | Only one shell cache, after changing `VERSION` |
| 11 | Step 11: the update flow (TODOs 11–12) | "A new version is ready", and a working **Reload** |
| 12 | Step 12: install (TODO 13) | The app on your computer or phone, or written steps for your browser |
| 13 | Step 13: low-data mode (TODO 14) | A toggle that hides the 3D moment |
| 14 | The **3D moment** (TODO 15) | The 3D bars open offline |
| 15 | Step 14: test on a phone, then [`tests/checklist.md`](tests/checklist.md) | A tested app |
| 16 | One challenge extension, then **Submitting your work** | My XR Camp's first installable app |

### Step 1: what makes a PWA

A **progressive web app** is an ordinary website with three extra things:

| Part | What it does |
| --- | --- |
| A **web app manifest** | A small JSON file: the app's name, icons, colours, and how it opens. It is what lets a browser offer to install it. |
| A **service worker** | A script that runs separately from your pages, and can answer their requests: from a cache, from the network, or with a page you made. It is what makes it work offline. |
| A **secure context** | `https://`, or `localhost` and `127.0.0.1` while you develop. Service workers are powerful, so browsers only allow them on pages that cannot be changed on the way. |

There is no app store, no download to approve, and no second codebase. The same address works in a browser tab and as an installed app.

In the Application panel, look at **Manifest** ("No manifest detected"), **Service workers** (none), and **Cache storage** (empty). By Session 14, all three will be full.

### Step 2: the manifest (TODO 1)

Link the manifest from `index.html`, and fill it in:

```json
{
  "name": "Study-week weather - My XR Camp",
  "short_name": "Weather",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "theme_color": "#5b2a86",
  "background_color": "#fdfcf8"
}
```

- **`name`** appears when installing; **`short_name`** under the icon on a home screen, where there is little room.
- **`start_url`** is the page the app opens on. **`scope`** is the part of the site that belongs to the app: open a page outside it, and the browser shows it with its own toolbar. `"./"` means "this folder", counted from the manifest's own address.
- **`"display": "standalone"`** opens the app in its own window, without the address bar.
- **`theme_color`** colours the title bar; **`background_color`** fills the screen while the app starts. Use your stylesheet's colours, so the start feels like part of the app.

Reload, and open **Application > Manifest**. Chrome lists what it read, and any problems.

### Step 3: icons, and the maskable icon (TODO 2)

The icons are in `icons/`, drawn in SVG and made into PNGs (see `ATTRIBUTION.md`). Chromium browsers ask for at least a 192-pixel and a 512-pixel icon before they offer to install.

Android draws home-screen icons in its own shapes: circles, squircles, rounded squares. A normal icon gets shrunk into a white shape. A **maskable** icon fills the whole square with colour, and keeps everything important inside a central circle whose radius is 40% of the icon's width: the **safe zone**. The phone cuts away the rest.

```json
{ "src": "icons/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
```

Compare `icon.svg` and `icon-maskable.svg`: apart from the comments, only the background square is different. Try yours in the free [Maskable.app editor](https://maskable.app/editor).

iPhone and iPad use `<link rel="apple-touch-icon">` in the page for Add to Home Screen, so add that too.

### Step 4: register a service worker (TODOs 3–4)

In `js/pwa.js`, check the feature first, then register:

```js
if (!('serviceWorker' in navigator)) return null;
const registration = await navigator.serviceWorker.register('sw.js');
```

`sw.js` sits next to `index.html`, so it controls that folder and nothing above it. Then, in `sw.js`, log the worker's own events (TODO 4). Reload, and watch **Application > Service workers**: the worker **installs**, then **activates**. Its `console.log` messages appear in its own console: click **inspect** next to it (Firefox: `about:debugging`, then **This Firefox**).

A service worker has no page. It cannot touch the DOM or `localStorage`. It talks to pages through **events**: `install`, `activate`, `fetch`, and `message`.

### Step 5: precache the app shell (TODO 5)

The **app shell** is every file the app needs to open: pages, styles, scripts, sample data, icons. During `install`, save them all:

```js
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);   // "weather-shell-v1"
    await cache.addAll(SHELL);
  })());
});
```

`waitUntil` means "not installed until this finishes". If even one file fails, `addAll` fails, and so does the install: you never get half an app. So check the list carefully, and look in **Cache storage**.

### Step 6: cache first (TODO 6)

Now answer requests. For the shell, use **cache first**: look in the cache; if it is there, use it (instantly, with no network); if not, ask the network.

```js
const saved = await caches.match(request);
return saved ?? fetch(request);
```

Test it: tick **Offline** in **Application > Service workers** (or choose **Offline** in the Network panel), and reload. The dashboard opens. The forecast comes from Course 2.4's `localStorage` cache.

**While you develop, tick Update on reload.** Cache first means your edits to `styles.css` do not appear: you are seeing the saved copy. "Update on reload" installs the newest `sw.js` on every reload.

### Step 7: the offline page (TODO 7)

Offline, open a page that is not saved, like `notes.html`. Without help, the browser shows its own error, and the learner is stuck. For **navigations** (opening a page), answer with the saved page, or the network, or `offline.html`:

```js
if (request.mode === 'navigate') event.respondWith(pageOrOffline(request));
```

`offline.html` says what happened in plain words, and links to the pages that do work offline. It is in the shell, and needs nothing from the network.

### Step 8: network first for the weather (TODO 8)

A forecast is not like `styles.css`: it changes every hour. So requests to `api.open-meteo.com` get a different strategy, **network first, with a timeout**:

1. Ask the network. When it answers, save a copy in the `weather-data` cache, and use it.
2. If the network fails, or takes longer than 4 seconds, use the saved copy.
3. If there is no saved copy, wait for the network, or pass on its error, so the page shows its own error state.

| Strategy | Good for | Why not here |
| --- | --- | --- |
| **Cache first** | Files that only change with a new version | The forecast would never update |
| **Stale-while-revalidate**: answer from the cache, then update it in the background | Things that can be a little old: avatars, a news list | The first answer is always the old one, even online |
| **Network first, with a timeout** | Live data that should be fresh, but is better old than missing | ✓ Fresh when possible; saved when not; never waiting forever |

The timeout matters on slow connections: without it, network first can wait a long time before giving up. Four seconds is shorter than the page's own eight-second timeout from Course 2.4, so the service worker always gets a chance to help.

**The first visit is not controlled.** A page loaded before its service worker activated sends its requests straight to the network. `clients.claim()` (Step 10) lets the worker take over at once, but a request that already started is gone. Reload once online, then test offline.

### Step 9: tell the truth about age (TODO 9)

A saved forecast can be a day old. If the service worker hands it over silently, the dashboard says "Live data… updated at 14:05", which is not true. So when it saves an answer, `stamp()` adds a header with the time: `X-Saved-At`. In `api.js`, read it:

```js
const savedAt = Number(response.headers.get('X-Saved-At')) || null;
```

`main.js` (finished) then says "Could not update. Saved by this app at 09:12." Test it: clear **Local Storage** in the Application panel, go offline, and reload. Old data that says it is old is useful. Old data pretending to be new is not.

### Step 10: versions, and cleaning up (TODO 10)

When you change any file in the shell, change `VERSION` in `sw.js` (`'v1'` to `'v2'`). The browser compares `sw.js` byte by byte whenever a page opens; a different file is a **new version**. It installs beside the old one and fills `weather-shell-v2`.

When the new version **activates**, delete every other shell cache:

```js
for (const name of await caches.keys()) {
  if (name.startsWith('weather-shell-') && name !== SHELL_CACHE) await caches.delete(name);
}
```

Leave `weather-data` alone: the saved forecasts are still good after an update. Without this step, every version stays on the learner's phone forever.

### Step 11: the update flow (TODOs 11–12)

Change `VERSION` with **Update on reload** unticked, and reload. The new worker installs, then **waits**: the old one still controls the open page, and swapping files under a running page could break it. Chrome shows "waiting to activate" in the Service workers section.

A good app tells the learner, and lets *them* choose when:

1. In `pwa.js`, notice a worker that is `waiting`, or one that reaches `installed` while a controller exists (TODO 12).
2. Write "A new version of this app is ready." into the `role="status"` element above the forecast, and show a real `<button>`: **Reload**.
3. On click, send the waiting worker a message; it calls `self.skipWaiting()` (TODO 11) and activates.
4. The page hears `controllerchange`, and reloads once, now matching the new version.

The message is announced by screen readers without moving focus (WCAG 4.1.3), and nothing reloads until the learner asks (3.2.5, a AAA criterion worth meeting). A learner halfway through reading the table never loses her place.

### Step 12: install (TODO 13)

Installing puts the app on the home screen or in the app list, in its own window. How it works depends on the browser, and it changes often, so check your own browsers and do not promise more than this:

| Where | How to install |
| --- | --- |
| Chromium browsers on Android (Chrome, Edge, Samsung Internet, and others) | The browser menu: **Install app** or **Add to Home screen**. It may also offer it itself. |
| Chrome and Edge on a computer | The install icon in the address bar, or **Install** in the browser menu |
| iPhone and iPad | **Share**, then **Add to Home Screen**. There is no install prompt, and no `beforeinstallprompt`. |
| Firefox on a computer | It does not install PWAs from their manifest. Newer versions on Windows can pin a site to the taskbar as a "web app", a feature that is still changing. |

Only Chromium browsers fire `beforeinstallprompt`, and it is not part of a finished standard. So the Install button is an **extra**: it appears only when that event arrives. The written steps are always on the page, so everyone has a way.

```js
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();       // keep it for our own button
  deferred = event;
  button.hidden = false;
});
```

**In mainland China**, many Android phones do not have Google's services, and some built-in browsers have limited PWA support: they may add only a shortcut, or not offer install at all. The offline features still work in any browser that supports service workers, and that is the part that matters most on a weak connection.

### Step 13: low-data mode (TODO 14)

The whole dashboard, with its icons, is under 100 KB. The 3D moment's A-Frame library is about 1.3 MB. On a prepaid plan, that is not nothing.

1. **Respect the device.** Some browsers, mostly Chromium ones, tell you when the learner has asked to save data: `navigator.connection?.saveData`. Many browsers have no `navigator.connection` at all, so the `?.` is essential.
2. **Let the learner choose.** A checkbox, **Low-data mode**, saved in `localStorage`. Her choice always wins over the device's.

When it is on, the link to the 3D moment is replaced by a sentence saying why, and the 3D page shows the description and the table without downloading A-Frame, with a button to load it anyway.

### Step 14: test on a phone

A phone needs a secure context too, and `http://192.168.…` is not one. Two free ways:

- **Publish it** with GitHub Pages (Course 1.8), which uses `https://`. GitHub can be slow or unreliable in mainland China; the next option needs no hosting at all.
- **Android and Chrome**: connect the phone by USB, open `chrome://inspect` on your computer, and use **Port forwarding** so the phone's `localhost:8080` reaches your server. Edge has the same page at `edge://inspect`.

On the phone: load the app, then switch on flight mode, and open it again. Install it, and open it from the home screen.

## Key code explained

**`event.waitUntil(promise)`** keeps the worker alive, and the step unfinished, until the promise settles. Without it, the browser may stop the worker halfway through filling a cache.

**`event.respondWith(promise)`** says "I will answer this request myself". Whatever `Response` the promise gives becomes the page's answer. If you never call it, the browser does the request normally.

**`response.clone()`**. A response's body can be read only once. To give it to the page *and* save it in the cache, clone it first.

**`caches.match(request)`** searches every cache the origin has. `cache.match` searches one.

**`self`** in a service worker is the worker itself (there is no `window`). `self.clients.claim()` takes control of open pages; `self.skipWaiting()` stops waiting.

**`Promise.race([network, timeout])`** settles with whichever settles first. The timeout promise resolves with `undefined`, so `if (first)` tells "the network answered" from "time ran out".

**`network.catch(() => {})`**. If the timeout wins and we answer from the cache, the network promise may fail later with nobody listening. The empty `catch` says "that is fine, we already handled it", so no error appears in the console.

**`script.crossOrigin = 'anonymous'`** makes the request for A-Frame a CORS request. `aframe.io` answers with `Access-Control-Allow-Origin: *`, so the service worker gets a normal response it can check and save. Without it, a cross-site `<script>` request gets an **opaque** response: status `0`, an unreadable body, and no way to know if it failed. Opaque responses can be cached, but you might be saving an error page, and Chromium counts each one as much larger than its real size against your storage.

## 3D moment

Open [`completed/3d-moment.html`](completed/3d-moment.html), then go offline and open it again: the same seven 3D bars, with no internet.

Three things make that work:

1. **The page** is in the app shell, like `index.html`.
2. **The library**: `sw.js` precaches `https://aframe.io/releases/1.8.0/aframe.min.js` during install, unless the device asks to save data. And `cacheFirst` saves it the first time the page loads it, so opening the 3D moment once, online, is always enough (TODO 15). The address must match `AFRAME_URL` in `config.js` exactly: `1.8.0` and `1.8.1` are different files to a cache.
3. **The data**: the forecast comes through the service worker's network-first rule, and the sample data is in the shell, so the scene always has something to show.

The page also loads A-Frame differently from Course 2.4. There is no `<script src>` in the `<head>`: the scene waits in a `<template>`, and the script adds A-Frame only when low-data mode is off, or when the learner presses **Load the 3D scene**. After that, focus moves to the scene description, so nobody is left on a button that has disappeared.

Everything else is kept from Course 2.4: the scene description built from the same data, the fixed camera, nothing that moves, and the table as the 2D twin. In a later lesson, a 3D model (a `.glb` file) would be cached the same way: one more address in the precache list, counted against your size budget.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| "A new version is ready" is written into a `role="status"` element | 4.1.3 | Screen readers announce it without moving focus. |
| The page reloads only when the learner presses **Reload** | 3.2.5 (AAA) | No change of context by surprise. |
| **Reload**, **Install**, and **Load the 3D scene** are real buttons | 2.1.1, 4.1.2 | Keyboards and screen readers can use them. |
| The update message sits in the page, never over it | 2.4.11 | It cannot hide the control that has focus. |
| After **Load the 3D scene**, focus moves to the scene description | 2.4.3 | Focus is not lost when the button disappears. |
| Offline and old data are said in words, and announced | 4.1.3 | "Could not update. Saved by this app at 09:12." |
| The 3D bars have a text description and a table twin, also in low-data mode | 1.1.1 | The information never lives only in the 3D scene. |

## Performance considerations

The service worker makes a second visit almost free: every shell file comes from the cache, with no network at all. Only the forecast (under 1 KB) travels.

Precaching has a cost too: the first visit downloads the whole shell, even pages the learner may never open. Keep the shell small. Here it is under 100 KB without A-Frame, which is why A-Frame is kept out of it when the device asks to save data. Look at **Application > Storage** to see how much your app uses.

Cache first is only safe with versioned caches. Change `VERSION` whenever you change a shell file, or learners will run old code forever.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Opening the page as a file, or by network address | `navigator.serviceWorker` is missing, or registration fails | `http://localhost` or `http://127.0.0.1`; `https://` on a phone |
| Forgetting to change `VERSION` | Your changes never reach learners | Change it with every shell change |
| A typo in the `SHELL` list | `addAll` fails, and the worker never installs | Check the Console of the worker, and fix the path |
| Cache first for live data | The forecast never updates | Network first with a timeout |
| No timeout on network first | "Loading…" for a long time on a weak connection | Race the network against a timer |
| Calling `skipWaiting()` on every install | Pages run a mix of old and new files | Wait for the learner to press **Reload** |
| Deleting every cache in `activate` | Saved forecasts vanish with each update | Delete only old shell caches |
| Caching a `no-cors` response without thinking | You may save an error, and it takes a lot of space | Use CORS (`crossOrigin`) where the server allows it |
| Promising "install" on every phone | Learners on iPhone or Firefox feel something is broken | Written steps for each browser; the button is an extra |

## Troubleshooting

**My changes to `styles.css` or a script do not appear.** The service worker is answering from its cache. Tick **Update on reload** in **Application > Service workers** while you work, or change `VERSION`.

**The worker says "waiting to activate" forever.** An open tab still uses the old version. Close the other tabs of the app, press **skipWaiting** in the Application panel, or finish TODOs 11–12 and press **Reload**.

**`Failed to register a ServiceWorker` / `SecurityError`.** The page is not a secure context. Use `localhost` or `127.0.0.1`.

**`Failed to execute 'addAll' on 'Cache'` / `Request failed`.** A file in `SHELL` does not exist. The path in the error is the one to fix.

**Offline, the forecast shows an error.** The page was not controlled when the forecast loaded (see Step 8), and there is nothing saved. Reload once online, then try again.

**No Install button.** It only appears in Chromium browsers, and not when the app is already installed. Chrome also checks the manifest first: open **Application > Manifest** and read its **Installability** messages.

**Nothing works in a private window.** Some browsers limit service workers or storage there. Use a normal window.

**I want to start again from nothing.** **Application > Storage** (Chrome) has **Clear site data**, which unregisters the worker and deletes every cache.

## Challenge extensions

Three optional extensions, in [`challenges/`](challenges/):

1. **[Foundation](challenges/challenge-1.md)**: an "Offline" badge, and a version line so you always know which version is running.
2. **[Creative](challenges/challenge-2.md)**: make the app yours: your own icon, colours, name, and offline page, in your language.
3. **[Explorer](challenges/challenge-3.md)**: turn another My XR Camp app (the course map, the dashboard, or the planner) into a PWA, and compare strategies.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take screenshots of: the Manifest section with your icons, Cache storage, the dashboard offline saying how old its data is, the update message, and the 3D moment offline. If you installed the app, one of its icon on your home screen or app list.
3. Keep them in your learner journal and portfolio. When the XR Camp community opens, share them there.
4. In your journal, answer: who do you know who would use this app on a weak or expensive connection, and what would they need next?

## Further reading

- [MDN: Progressive web apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [MDN: Using Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)
- [MDN: Web app manifests](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest)
- [MDN: Making PWAs installable](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable)
- [web.dev: Adaptive icon support in PWAs with maskable icons](https://web.dev/articles/maskable-icon)
- [web.dev: The offline cookbook](https://web.dev/articles/offline-cookbook) (more caching strategies)
- [Chrome DevTools: Debug progressive web apps](https://developer.chrome.com/docs/devtools/progressive-web-apps)

## Women to Know

**Frances Berriman** is a designer and front-end developer from Cornwall, in the UK, based in San Francisco. In 2015, she and Alex Russell named "progressive web apps": she proposed "Progressive Open Web Apps", which they shortened to "Progressive Apps". Earlier, she was a very early front-end and service-design collaborator on GOV.UK at the UK Government Digital Service. She later worked at Code for America, and was Netlify's Head of Product.

The name you have used all through this lesson came from a designer. Naming an idea well is how it spreads: "progressive" says that a website can become an app step by step, without leaving anyone's browser behind.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

The manifest follows the W3C's **Web Application Manifest** specification. The service worker, and the **Cache API** it uses (`caches`, `cache.addAll`, `cache.match`), are both defined in the W3C's **Service Workers** specification. Not everything in this lesson is standard yet: `beforeinstallprompt` comes from the WICG's *Manifest Incubations*, and `navigator.connection.saveData` from the WICG's *Network Information API*, community drafts that only some browsers have built. That is exactly why this app checks for every feature before using it, and works without them.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
