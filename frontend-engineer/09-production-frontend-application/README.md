# Phase 2 Capstone - Production Frontend Application

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `frontend-engineer` · **Lesson:** `production-frontend-application-09` · **Time:** about 18 hours · 24 sessions of 45 minutes · about 6 weeks at 4 sessions a week

> **This is a longer lesson (24 sessions).** Take it one step at a time: each session still ends with something you made, and it is fine to take a short break between steps.

---

> Release a maintainable, installable, multilingual-ready frontend application.

---

## Learning objectives

By the end of this project you will be able to:

1. Combine several small applications into one, without losing the shape (config, utils, stores, services, components) that made each of them easy to change.
2. Choose, and explain, a **simple in-page navigation** pattern for a small, multi-view app, instead of reaching for a router library.
3. Split a locale's words into their own module, and switch languages at runtime with `<html lang>`, `Intl`, and a live-updating page.
4. Draft a short, honest, first-pass translation, and flag it clearly as needing native review, instead of pretending it is finished.
5. Ship a **3D feature that loads only when needed**, with a text description and a table as its 2D twin, and prove it never loads early.
6. Make an application **installable and offline**, with a versioned service worker and an accessible update prompt.
7. Read and check pure functions with `check.html`, with no test framework.
8. Measure a **performance budget** in the Network panel, and explain what each number is spent on.
9. Release version **1.0.0**: a `CHANGELOG.md` a non-programmer could read, a version shown in the app itself, and an honest AI-use log.
10. Run a project against a written **rubric**, and explain, in your own words, where it meets each row.

## Prerequisites

- **Course 2.1: The Document Object Model and Dynamic Interfaces** (the course map, built from `data/catalog.json`).
- **Course 2.2: The Document Object Model and Dynamic Interfaces** (the dashboard, and its `localStorage` progress key).
- **Course 2.3: Application Architecture and Maintainable Code** (the session planner, and the config/utils/store/component shape this whole app follows).
- **Course 2.4: APIs, JSON, and Asynchronous Applications** (study-week weather: `fetch`, caching, a sample-data fallback).
- **Course 2.5: Web Components** (`<lesson-card>`).
- **Course 2.6: Progressive Web Applications** (the manifest, the service worker, low-data mode).
- **Course 2.7: Git Collaboration and Open Source** (Semantic Versioning, `CHANGELOG.md`).
- **Course 2.8: AI as a Development Assistant** (the AI-use log).

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| A Chromium browser: Chrome or Microsoft Edge (both available in mainland China) | The **Application** panel (manifest, service worker, caches) and the **Network** panel (the performance budget) | Free |
| VS Code and a local server | The whole app needs `http://localhost` or `http://127.0.0.1`: a secure context, for the service worker | Free |
| A phone (optional) | Test installing, offline, and narrow layouts, on a real device | Free |
| [Open-Meteo](https://open-meteo.com/) | Weather forecasts: no key, no account | Free for non-commercial use |
| A-Frame 1.8.0, from `aframe.io` | The 3D moment, loaded only when pressed | Free |

**If Open-Meteo is slow or blocked where you are**, the weather view falls back to `data/sample-forecast.json` automatically, as it has since Course 2.4.

## What you will build

**My XR Camp 1.0**: one small application that combines every Phase 2 part you have built so far.

- **Dashboard**: your progress by phase, as a table, with an optional 3D view (Courses 2.1, 2.2).
- **Course map**: every lesson, as `<lesson-card>` elements, built from `data/catalog.json` (Courses 2.1, 2.5).
- **Session planner**: add, complete, and delete 45-minute sessions (Course 2.3).
- **Study-week weather**: a 7-day forecast for cities where XR Camp learners study (Courses 2.4, 2.6).
- **App**: language, data saving, install, and update, in one place.

It installs, works offline, and speaks three languages: English complete, and short first-draft Spanish and Simplified Chinese, both flagged as needing a native reviewer (see "Multilingual-ready", below). Its **3D moment** is a "See my progress in 3D" button that loads a small library only when pressed, and never before.

The reference solution is in [`completed/`](completed/): readable, not huge, at just over a thousand lines of JavaScript across seventeen small files. The starter has every module already written — config, utils, `i18n.js`, the locale files, the stores, the services, and the components — and one file left to finish: `js/main.js`, with eight numbered TODOs that wire the given modules together. See "What to copy from which lesson" in [`starter/README.md`](starter/README.md) for exactly where each finished module came from.

## Multilingual-ready

Every user-facing string in the app's chrome (not the course catalog's own titles) lives in a locale module: [`js/locales/en.js`](completed/js/locales/en.js), [`es.js`](completed/js/locales/es.js), and [`zh-Hans.js`](completed/js/locales/zh-Hans.js). English is complete. **Spanish and Simplified Chinese are short first-draft translations, made for this lesson without a review by a native speaker of either language.** They are marked `draft: true` in their own files, and the app shows a visible notice ("This translation is a short first draft…") whenever one is active. Before using either translation with real learners, have it reviewed by a native speaker, and remove the `draft` flag once it has been. Full internationalisation — plural rules for every language family, right-to-left layout, and a translation workflow — is Course 6.2; this lesson only prepares the ground for it.

## Folder guide

```text
09-production-frontend-application/
├── README.md, README.es.md, README.zh-Hans.md
├── project.json
├── starter/
│   ├── brief.md, rubric.md          # The task, and how it is graded
│   ├── ai-log.md, CHANGELOG.md      # Templates: fill these in as you work
│   ├── index.html                   # Every view is already here
│   ├── manifest.webmanifest, sw.js, offline.html, check.html   # Finished
│   ├── styles.css, icons/, data/    # Finished
│   └── js/
│       ├── main.js                  # The only file with TODOs (eight of them)
│       ├── config.js, utils.js, i18n.js   # Finished
│       ├── locales/en.js, es.js, zh-Hans.js   # Finished
│       ├── stores/                  # progress, planner, low-data — finished
│       ├── services/                # api, cache, catalog, pwa — finished
│       └── components/              # lesson-card, views, three-progress — finished
├── completed/                       # Reference solution: open this last
│   ├── rubric.md, ai-log.md, CHANGELOG.md   # Filled in, by Ana
│   └── (the same shape as starter/, with main.js finished)
├── challenges/                      # Three challenges: Foundation is required
├── tests/checklist.md               # Self-review before you submit
├── assets/
└── screenshots/
```

## Setup

1. Copy `starter/` into a new folder, `my-xr-camp`, and commit it with Git.
2. Start your local server, and open `index.html` through `http://localhost` or `http://127.0.0.1`. The service worker needs a secure context, the same as in Course 2.6.
3. Open the developer tools. You will use the **Console**, the **Application** panel, and the **Network** panel across this lesson.
4. Read [`starter/brief.md`](starter/brief.md) and [`starter/rubric.md`](starter/rubric.md) once, in full, before writing anything.
5. Open `js/main.js`. Its eight TODOs, in order, are this lesson's walkthrough.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; read `brief.md`, `rubric.md`, and `starter/README.md` side by side with `js/main.js` | You can see every TODO you will fill in, and why |
| 2 | Step 1: the shape of My XR Camp — tour `config.js`, `utils.js`, and the stores (Course 2.3's architecture, reused) | A map of where every piece of state lives |
| 3 | Step 2: simple in-page navigation (TODO 1) | Five views, one URL hash, focus moving on every switch |
| 4 | Step 3: read the dashboard and course map (Courses 2.1, 2.2, 2.5) | Progress rows and `<lesson-card>` rendering understood |
| 5 | Step 4: read the session planner (Course 2.3) | The same store pattern, applied a second time without copying its bugs |
| 6 | Step 5: read study-week weather (Courses 2.4, 2.6) | Cache-then-network, and the sample-data fallback, understood |
| 7 | Step 6: start the learner's chosen language (TODO 2) | The page opens already in the right language, before first paint |
| 8 | Step 7: the language switcher (TODO 3) | Switching language updates every visible view at once |
| 9 | Step 8: locale files, plural forms, and `Intl` | Numbers, dates, and percentages read naturally in three languages |
| 10 | Step 9: low-data mode (TODO 4) | A toggle that changes what the app is willing to load |
| 11 | Step 10: read the 3D moment's code, `three-progress.js` | A bar chart built from the same rows as the dashboard's table |
| 12 | Step 11: load it lazily (TODO 5) | No request to `aframe.io` until the button is pressed |
| 13 | Step 12: read the service worker and its cache (`sw.js`) | Every cached file's role, in one versioned cache |
| 14 | Step 13: register it, and offer updates (TODO 6) | "A new version is ready" appears after a version change |
| 15 | Step 14: offer installation (TODO 7) | An Install button, or written steps where none is possible |
| 16 | Step 15: finish startup, in order (TODO 8) | The whole app: offline, installable, in three languages |
| 17 | Step 16: `check.html` and pure functions | Every pure function checked, with no framework, no network |
| 18 | Step 17: an accessibility pass, by keyboard and by ear | Focus order, labels, and announcements checked by hand |
| 19 | Step 18: a performance budget, in the Network panel | Your shell's size measured, and A-Frame proven lazy |
| 20 | Step 19: test at 390 px and 1280 px, and offline | No horizontal scroll, and no broken layout, at either width |
| 21 | Step 20: the 3D moment's accessibility (scene description, reduced motion, comfort) | `tests/checklist.md`'s "3D and XR" section, ticked |
| 22 | Step 21: release — write `CHANGELOG.md`'s `1.0.0` entry (Course 2.7) | A changelog a non-programmer could read |
| 23 | Step 22: your AI-use log, reviewed and finished (Course 2.8) | An honest record, kept as you worked, not invented after |
| 24 | One challenge extension, then [`tests/checklist.md`](tests/checklist.md) and **Submitting your work** | My XR Camp 1.0 |

### Step 1: the shape of My XR Camp

Open `js/config.js` first. It is every setting for the whole app, grouped by the part that uses it: the release version, the three locale codes, the five view ids, and the five `localStorage` keys, three of them named exactly as they were in Courses 2.2 to 2.6, so a learner's saved progress carries over into this app. Then skim `js/utils.js`: nothing in it touches the DOM, storage, or a language, so `check.html` (Step 16) can test every line of it directly. This is Course 2.3's architecture, applied to five views instead of one: config, utils, stores, services, components, and one `main.js` that is the only file allowed to touch the page.

### Step 2: simple in-page navigation (TODO 1)

My XR Camp has five views (`VIEWS` in `config.js`): dashboard, course map, planner, weather, and app. Each is a `<section id="…">` in `index.html`, already marked `hidden` except the dashboard. Write `currentView()` (read `location.hash`, fall back to `DEFAULT_VIEW`) and `showView(view)` (toggle every section's `hidden`, set `aria-current="page"` on the matching nav link, and move focus to the view's `<h1>`, which already has `tabindex="-1"`). Listen for `hashchange` to call `showView(currentView())` again.

This is a **router**, in miniature, and it is worth naming why a full one is not here: five sections is not enough to need one, this course avoids build steps that most routers assume, and the hash is already a bookmarkable, offline-safe URL with no server route to configure. If My XR Camp grew to twenty views, that trade-off would flip; Course 6 is where it is revisited.

### Step 3: read the dashboard and course map

`renderDashboard()` and `renderCourse()` are already written, and worth reading closely: `phaseProgress()` (from `utils.js`) turns the catalog and the set of done lessons into one row per phase, and both the table (`phaseTable()`) and the 3D view (Step 10) are built from those exact rows, so they can never disagree. `renderCourse()` builds one `<lesson-card>` per lesson, the same custom element from Course 2.5, now speaking every language the app does (its own `localechange` listener re-renders it).

### Step 4: read the session planner

`plannerStore` is Course 2.3's `store.js`, copied with one change: the storage key is named `PLANNER_KEY` in `config.js` (its value, `'xrc_s'`, is unchanged, so old saved sessions still load, through the same `upgrade()` migration). Notice the planner never touches `localStorage` directly from `main.js`: only the store does, and every other module reads it through `getSessions()` and hears about changes through `subscribe()`.

### Step 5: read study-week weather

`loadWeather()` shows the cached forecast first, if there is one, then asks the network. On failure, it falls back to `data/sample-forecast.json`, so the view is never empty. `toDaysSafe()` and `driestDay()` (from `utils.js`) are the same pure functions from Course 2.4, and `forecast-view.js` renders the same table, now with every word from `i18n.js` and every number from `Intl`.

### Step 6: start the learner's chosen language (TODO 2)

At the top of `start()`, `await startI18n()`, then `translatePage()`. `startI18n()` (in `i18n.js`, already written) checks `localStorage` for a saved choice, then `navigator.languages`, then falls back to English, and sets `document.documentElement.lang` before anything else runs — the same document-language requirement as every earlier lesson (WCAG 3.1.1), now decided by the learner instead of hard-coded.

### Step 7: the language switcher (TODO 3)

Listen for `change` on `#language-select`, and call `setLocale(event.target.value)`. Then write `onLocaleChange()`: `translatePage()`, `renderLanguageControls()`, and a full re-render of every view, so nothing is left showing the old language. Register it as a `"localechange"` listener at the very end of `start()` (Step 15/TODO 8), after the first render, not before: `setLocale()` fires the same event on startup, and registering the listener too early would render the whole app twice for no reason.

### Step 8: locale files, plural forms, and `Intl`

Open `js/locales/en.js`. A message is a plain string, or an object with plural forms (`{ one: '…', other: '…' }`): `i18n.js`'s `format()` picks the right one with `Intl.PluralRules`, because which count needs "one" depends on the language — Chinese has no separate plural form at all, which is why `zh-Hans.js` only ever writes `other`. Every date, time, temperature, and percentage in this app goes through `Intl.DateTimeFormat`, `Intl.NumberFormat`, or a thin wrapper around them in `i18n.js`: no list of month names, or a rounding function, is written by hand anywhere.

### Step 9: low-data mode (TODO 4)

`lowData.lowDataPreferred()` and `lowData.setLowData()` are unchanged from Course 2.6. Wire `#low-data-toggle`'s `change` event to `setLowData()`, and subscribe to the store so `renderLowDataControls()` and `renderThreeDGate()` (Step 11) both run again whenever the preference changes, including from another open tab.

### Step 10: read the 3D moment's code

Open `js/components/three-progress.js`. `mountThreeProgress()` builds an `<a-scene>` with one `<a-box>` per phase, height proportional to lessons done, from the exact same rows the dashboard's table uses. The camera is fixed — no drag-to-orbit, no WASD scheme — so there is no 3D-only interaction that would need its own keyboard route: everything the scene shows, the 2D table right below it also shows, in words. Nothing in the scene moves on its own, so nothing needs a Pause button; a chart that never animates needs nothing to disable for `prefers-reduced-motion` either, though the choice to keep it static *is* how this feature respects that preference.

### Step 11: load it lazily (TODO 5)

In `renderThreeDGate()`: if `lowData.lowDataPreferred()` is true, hide the button, show the skip notice, empty the container, and stop — the library must never load in that case. Otherwise, show the button, and set its click handler to call `mountThreeProgress(container, rows)`. `loadAframe()` (inside `three-progress.js`) injects `<script src="https://aframe.io/releases/1.8.0/aframe.min.js">` into `<head>` the first time it is called, and never again. **Prove it**: open the Network panel, reload the app, and confirm there is no request to `aframe.io` anywhere on the list — then press the button, and watch one appear.

### Step 12: read the service worker and its cache

`sw.js` is Course 2.6's service worker, with one cache per app. `SHELL` lists every file the app needs to open with no internet; `THREE_D` lists the A-Frame URL, cached separately and skipped at install time when the device asks to save data. Weather requests use **network first, with a timeout**; everything else in `SHELL` uses **cache first**; navigations fall back to `offline.html`.

### Step 13: register it, and offer updates (TODO 6)

Call `registerServiceWorker()`, passing an `onUpdateReady(worker)` callback that adds the `visible` class to `#update-message`, then calls `showUpdateBanner(worker, { message, button })` with `#update-text` and `#update-button`. Both functions are already written, in `js/services/pwa.js`; read them before you wire this up. To test it, change `sw.js`'s `VERSION`, reload once (the new worker installs and waits), and reload again — the banner should appear, and pressing its button should update without losing your saved progress or sessions.

### Step 14: offer installation (TODO 7)

Call `offerInstall()`, passing `#install-button` and `#install-status`. If `isInstalled()` is already true, set `#install-status`'s text yourself. As in Course 2.6, only Chromium browsers fire `beforeinstallprompt`; everywhere else, the written instructions in the App view are the way to install, so the button staying hidden there is correct, not broken.

### Step 15: finish startup, in order (TODO 8)

Add the `"localechange"` listener from Step 7 at the very end of `start()`. The order inside `start()` matters: language first, so every string that follows is correct from the first frame; then the catalog and the first render of every view; then navigation, so the page opens on the right view; then the service worker, install offer, and finally the language-change listener. Getting this order right is most of what "production" means in this lesson's title: not new features, but the same features, arriving in an order a real learner's first visit can rely on.

### Step 16: `check.html` and pure functions

Open `check.html`. It runs `utils.js`'s and `i18n.js`'s pure functions against known inputs, with plain `assert`-style checks and no framework: open it after any change to either file. It also checks that `sw.js`'s `VERSION` and `config.js`'s `APP_VERSION` agree — a mismatch there is exactly the kind of mistake that is invisible until a learner's browser is stuck on an old version.

### Step 17: an accessibility pass

Unplug your mouse for ten minutes. Tab through every view: is focus always visible? Does every control have a name a screen reader would read out loud, that starts with the visible label (WCAG 2.5.3)? Turn on a screen reader (VoiceOver, NVDA, or Chrome's own) and add a session, switch language, and press **See my progress in 3D**: does something get announced each time, without your focus jumping away from what you were doing?

### Step 18: a performance budget, in the Network panel

Open the Network panel, clear it, and reload with the cache disabled. Note the shell's total transfer size: this app's budget is **under 150 KB, not counting A-Frame**. Then press **See my progress in 3D**, and confirm the ~1.3 MB A-Frame request appears only now, not before. A performance budget is a number you decide in advance and then defend, not one you discover afterwards and excuse.

### Step 19: test at 390 px and 1280 px, and offline

Resize DevTools to 390 px wide, then 1280 px: nothing should scroll sideways, and every label should stay attached to its control. Then tick **Offline** in the Network panel, reload every view, and open a page the service worker has not saved: it should show `offline.html`, never the browser's own error.

### Step 20: the 3D moment's accessibility

Confirm, by hand: `#scene-description` exists and is built from the same rows as the table beneath it; the whole feature is reachable and dismissible by keyboard (there is nothing 3D-only to reach, by design — see Step 10); and with **prefers-reduced-motion: reduce** set in your OS or DevTools' Rendering panel, nothing about the app's behaviour changes, because nothing in it ever animated. Tick every box in `tests/checklist.md`'s "3D and XR (manual)" section.

### Step 21: release — write `CHANGELOG.md`'s `1.0.0` entry

Fill in `starter/CHANGELOG.md`'s `1.0.0` heading with today's date, and list what My XR Camp does, grouped under `### Added`, in words a non-programmer could read. Compare with [`completed/CHANGELOG.md`](completed/CHANGELOG.md) only after you have written your own.

### Step 22: your AI-use log, reviewed and finished

If you used an AI assistant anywhere in this lesson — including for the Spanish or Chinese draft strings, if you wrote your own — finish `ai-log.md`: every conversation, what you shared, what you kept, and how long it took, including the times you did not keep the answer. [`completed/ai-log.md`](completed/ai-log.md) is a filled-in example, not a template to copy word for word.

## Key code explained

**`Intl.PluralRules(locale).select(count)`** returns a category — `'one'`, `'other'`, and others some languages use — not a number. `format()` in `i18n.js` uses it to choose between a message's plural forms, so the same key works correctly in a language with two forms and one with none.

**`import(`./locales/${code}.js`)`**. A dynamic import with a variable, checked first against the fixed list of known codes (`CODES.includes(code)`), so only this app's own locale files can ever load this way, and each one loads only once it is needed.

**`window.matchMedia('(display-mode: standalone)').matches`** is how `isInstalled()` tells an installed app from a browser tab, without any special permission.

**`AbortSignal.timeout(TIMEOUT_MS)`** cancels a `fetch` after a fixed time, so a slow network fails fast instead of leaving the weather view saying "Loading…" forever.

**`document.dispatchEvent(new CustomEvent('localechange', …))`**. Every module that shows words listens for this one event, instead of importing each other directly: the language switcher and the dashboard, the planner, the weather view, and even `<lesson-card>` (across a shadow boundary) all react to it without knowing the others exist.

## 3D moment

Ship a 3D feature that loads only when needed and never blocks the 2D experience.

Press **See my progress in 3D**, on the dashboard. A bar chart appears: one column per phase, its height the fraction of that phase's lessons you have marked done — the same numbers as the table right above it, because both come from `phaseProgress()`. Nothing about it loaded before you pressed the button: check the Network panel, and there is no request to `aframe.io` on first load, only after.

The camera never moves, and neither does anything in the scene: there is no drag-to-orbit, no click-to-rotate, and no continuous animation. That single choice is what removes two whole classes of accessibility work at once — there is no 3D-only interaction that needs its own keyboard route, and there is nothing that needs a Pause button or a `prefers-reduced-motion` check, because nothing ever moves for `prefers-reduced-motion` to interrupt. `#scene-description` is built, in words, from the identical rows the 3D bars and the 2D table both use, so a screen reader user gets exactly the same information as someone looking at the bars.

If loading A-Frame fails — a blocked CDN, no connection — the view shows a short error message and the table twin anyway: the information was never only in the 3D scene to begin with.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| `<html lang>` is set correctly by `startI18n()` and updated by every language switch | 3.1.1 | Screen readers pronounce the page correctly, in every language |
| Each view has one visible `<h1>`, and switching views moves focus to it | 2.4.3, 1.3.1 | Keyboard and screen-reader users know where they landed |
| Every button and field has a visible label, and its accessible name starts with it | 2.5.3 | "Done: CSS grid", not "CSS grid: Done" |
| "A new version is ready" and weather/planner status changes sit in `role="status"` elements | 4.1.3 | Announced without moving focus |
| The page reloads to update only when the learner presses **Reload** | 3.2.5 (AAA) | No change of context by surprise |
| `#scene-description` describes the 3D bars from the same data as the table | 1.1.1 | The information never lives only inside the 3D scene |
| Status (ready, coming soon, done) is shown in words and a border, not colour alone | 1.4.1 | Colour-blind and low-vision learners see it too |

## Performance considerations

The app shell (everything except A-Frame) is under 150 KB, most of it JavaScript modules the browser can cache individually. A-Frame is about 1.3 MB and is requested exactly once, only after the 3D button is pressed, and is cached by the service worker afterwards, so a learner who tries the 3D view once can use it offline from then on.

Locale files are also loaded lazily, one at a time, with `import()`: a learner who never switches away from English never downloads the Spanish or Chinese strings.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Hard-coding an English string in a component | It never translates, and stays wrong in every other language | Every string comes from `t()` or a locale file |
| Loading A-Frame in `<head>` | The 3D moment is no longer "lazy"; it blocks the first paint | Inject the `<script>` tag only inside `loadAframe()`, on click |
| Registering the `"localechange"` listener before the first render | The app renders itself twice on every load, for nothing | Register it at the very end of `start()` |
| Writing to a store's `localStorage` key from `main.js` directly | Two places can disagree about the saved state | Only the store itself calls `localStorage.setItem` |
| Skipping the sample-forecast fallback | A blocked or slow weather API leaves a blank view | Always fall back to `data/sample-forecast.json` |
| Treating a first-draft translation as finished | Learners get confident, wrong Spanish or Chinese | Keep the `draft` flag, and say so in the app and the README |

## Troubleshooting

**My language choice does not stick after a reload.** Check that `setLocale()` was called with `save: true` (the default), and that `LANGUAGE_KEY` in `config.js` matches what `startI18n()` reads.

**Switching language changes some text but not all of it.** A string was hard-coded instead of routed through `t()` or `data-i18n`, or a component was not re-rendered on `"localechange"`.

**The 3D button does nothing.** Check that TODO 5's click handler is actually attached — a common mistake is writing `renderThreeDGate()` correctly but calling it only once, before the catalog has loaded any rows.

**A-Frame loads immediately, before I press the button.** Search `main.js` and `index.html` for a literal `<script src="…aframe…">`: it must only ever be created inside `loadAframe()`.

**The update banner never appears.** You likely still have **Update on reload** ticked in the Application panel from testing Course 2.6; untick it, change `sw.js`'s `VERSION`, and reload twice.

**`Failed to register a ServiceWorker`.** The page is not a secure context: use `localhost` or `127.0.0.1`, not a raw IP address or a file opened by double-clicking.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: add a fourth locale-ready string the app is currently missing, to all three locale files, and prove it updates live.
2. **[Creative](challenges/challenge-2.md)**: make My XR Camp yours: your own icon, a fourth view, or a language none of the drafts cover yet.
3. **[Explorer](challenges/challenge-3.md)**: add a second 3D encoding of the same progress data (colour, or a second axis) without adding a single new fact to `#scene-description`.

A further optional bonus, beyond the three challenges above and not required for submission: **[automated tests](challenges/bonus-testing.md)** (see ["Going further: automated tests"](#going-further-automated-tests)).

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md), including its "3D and XR (manual)" section.
2. Check your project against every row of [`starter/rubric.md`](starter/rubric.md).
3. Take screenshots of: the dashboard in each of your three languages, the 3D view, the Application panel with your service worker activated, and the app installed (or the written install steps, if your browser has none).
4. Keep them in your learner journal and portfolio. Share them with other developers: see [where to share your work and ask for help](../../docs/en/community.md).
5. In your journal, answer: which of the five views would you keep if you could only ship one, and why?

## Further reading

- [MDN: Internationalization](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
- [MDN: Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules)
- [MDN: Progressive web apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [W3C: Web App Manifest](https://www.w3.org/TR/appmanifest/)
- [Semantic Versioning](https://semver.org/)
- [A-Frame documentation](https://aframe.io/docs/1.8.0/introduction/)

## Going further: automated tests

Optional, not required for this lesson. `check.html` (Step 16) checks `js/utils.js`'s pure functions with plain `assert`-style code and no framework — the right choice for a lesson that must run with nothing installed. A production app usually adds a real test runner once the team, and the number of things that could quietly break, both grow. Two free, widely used tools cover the two kinds of test that matter most:

- **[Vitest](https://vitest.dev/)** runs fast, framework-free unit tests against plain JavaScript modules — a natural fit for `utils.js`, since every function in it is already pure (see the comment at the top of that file).
- **[Playwright](https://playwright.dev/)** drives a real browser to test a whole user flow end to end: click here, type there, check what appears — the same kind of check Step 17's manual keyboard pass does by hand, made repeatable.

Both are pinned in [`versions.json`](../../versions.json): `vitest@5.0.2` and `@playwright/test@1.63.0`, exactly, no `^` or `~` range.

[`completed/tests/unit/utils.test.js`](completed/tests/unit/utils.test.js) is a Vitest unit test covering `totals()`, `fraction()`, `nextLesson()`, `bySchedule()`, `toDays()`, `driestDay()`, and `isSemver()` — the same functions `check.html` already exercises, now with a real assertion library and a clear pass/fail report:

```js
import { describe, expect, it } from 'vitest';
import { fraction } from '../../js/utils.js';

describe('fraction', () => {
  it('returns 0 instead of dividing by zero', () => {
    expect(fraction(3, 0)).toBe(0);
  });
});
```

[`completed/tests/e2e/main-flow.spec.js`](completed/tests/e2e/main-flow.spec.js) is a Playwright end-to-end test of the main flow: it focuses the "Planner" navigation link, presses <kbd>Enter</kbd> (never a mouse click) to confirm the view switch works by keyboard, checks that focus lands on `#planner-heading` exactly as TODO 1's `showView()` promises (WCAG 2.4.3), then fills in and submits the planner form and checks the new session appears in the list. Testing the keyboard route, not only the visible result, is what would have caught a regression in Step 1's focus-management code that a mouse-only test would miss entirely.

To try both yourself: `cd completed`, then `npm install`. Run the unit tests with `npm run test:unit` — they need nothing else running. Run the end-to-end test with `npm run test:e2e`, with the course's local server already serving the repository root (see "Setup" above); [`completed/playwright.config.js`](completed/playwright.config.js) points it at `http://127.0.0.1:8766/frontend-engineer/09-production-frontend-application/completed/`. Neither `node_modules/` nor a lockfile is committed to this repository — [`completed/.gitignore`](completed/.gitignore) excludes both, and `npm install` recreates them from `completed/package.json` any time you need them. Delete `node_modules` again once you are done, the same way you would before committing your own project. See the [bonus challenge](challenges/bonus-testing.md) to try extending both suites yourself.

## Women to Know

**Wenli Zhang**, known as **Ovilia**, is a data-visualization developer from Shanghai, China. She wrote 《Three.js 入门指南》, a free Chinese-language beginner's guide to three.js, first published on the Turing Community and made free to read in December 2014, with all of its example code published on GitHub. She went on to become a full-time maintainer of Apache ECharts — the charting library Baidu open-sourced — and is listed on its Project Management Committee.

The 3D bar chart you just built is a small cousin of the charting work she has spent years on: turning numbers into shapes people can read at a glance, in a browser, for free. Her guide did the same for a generation of Chinese-speaking developers learning three.js, the library XR Camp's Web3D courses are built on.

_Facts from public sources, checked 2026. Spotted an error? [Tell us](https://github.com/XR-Dev-Camp/xr-camp/issues)._

## Standards spotlight

Number, date, and percentage formatting in this app use `Intl`, standardised as **ECMA-402**, alongside the core JavaScript language (**ECMA-262**), both from Ecma International's TC39 committee. The manifest follows the W3C's **Web Application Manifest** specification, a community specification unrelated to it in name only: Semantic Versioning, the `MAJOR.MINOR.PATCH` scheme this project's `1.0.0` follows, is documented at [semver.org](https://semver.org/), maintained as an open community specification rather than by a standards body like the W3C or Ecma. Three specifications, three kinds of governance — a standards body, a working group, and a community project — and this one small app depends on all three.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
