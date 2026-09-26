# Phase 5 Capstone - Full-Stack Spatial Application

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `full-stack-spatial` · **Lesson:** `full-stack-spatial-application-08` · **Time:** about 25 hours · 34 sessions of 45 minutes · about 9 weeks at 4 sessions a week

> **This is a longer lesson (34 sessions).** Take it one step at a time: each session still ends with something you made, and it is fine to take a short break between steps.

---

> Combine every Phase 5 lesson into one reviewed, security-fixed full-stack spatial app, with an optional AI description draft and deployment notes for localhost or a small server.

## Learning objectives

By the end of this project you will be able to:

1. Combine several lessons' worth of server code — an API, accounts, a database, real-time rooms, and a security review — into one running application, without rewriting what already works.
2. Read a brief and a rubric before writing code, and check finished work against the rubric's rows rather than a general sense of "done".
3. Add a new feature to an already-secured codebase without reopening any of its fixed vulnerabilities: reuse the same ownership check, the same sanitising function, and the same CSRF rule every other write already uses.
4. Explain why an AI feature that writes to a database needs a human-review step, and build one where a draft can never reach storage on its own.
5. Write deployment notes for a small application that name what changes, and what must not change, between running it on your own computer and running it on a small server you control.
6. Explain the difference between a feature that is finished and a feature that is finished *and* still passes every previously-written test.
7. Write release notes that describe what a specific version of a project actually ships, for someone who was not there while it was built.

## Prerequisites

- **Course 5.5: Security and Privacy for Spatial Applications** — this capstone starts from that lesson's fixed server, unchanged: sanitised text, a strict Content Security Policy, an environment-loaded secret, an IDOR check, generic errors, and minimised location data.
- **Course 5.3: Databases and Spatial Application Data** and **Course 5.4: Real-Time and Multi-User Applications** — the saved-scenes schema and the real-time chat room this capstone's server still uses, carried over unchanged.
- **Course 5.6: AI for Spatial Computing** — the provider-neutral design (a "mock" provider, and never saving an AI reply without review) this capstone's own new feature follows.
- Comfort reading and extending server code you did not just write from scratch — most of this lesson is integration, not new architecture.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| Node.js 22.5 or later (LTS "24 Krypton" recommended) | Runs the server, including `node:sqlite` | Free |
| npm (ships with Node.js) | Installs this lesson's one dependency, `ws` | Free |
| A text editor (e.g. VS Code) | Reading and completing the server and client code | Free |
| A browser (Chrome, Firefox, Safari, or Edge) | Using the app you build | Free |

Node.js can be downloaded from [nodejs.org](https://nodejs.org/); learners in mainland China can also use the [npmmirror Node.js mirror](https://registry.npmmirror.com/binary.html?path=node/). If `npm install` is slow, run `npm install --registry=https://registry.npmmirror.com` instead.

## What you will build

This is the ninth and final step of the **virtual cultural exhibit** Phase 5 has built one lesson at a time — and, unlike every lesson before it, this one asks you to bring the pieces together rather than add a new one on its own. `starter/` and `completed/` both begin from Course 5.5's already-fixed server: an API with validation and environment variables (5.1), accounts with hashed passwords and sessions (5.2), saved scenes and annotations in SQLite (5.3), a real-time shared chat room over WebSockets (5.4), and every one of 5.5's seven security fixes, all in place, unchanged, and already tested. None of that is a TODO here.

What this capstone adds is one small, optional feature of its own: an **AI description draft** for a scene, following Course 5.6's rule that a draft is never saved on its own. A deterministic, offline "mock" provider builds a short description from a scene's own name and annotations — no network call, no cost, and nothing invented that was not already there — and a person must read it, optionally edit it, and choose Save before it is ever written to the database. Six numbered TODOs (8-13, continuing after 5.5's 1-7, which are already fixed) wire this feature end to end: [`server/ai.js`](starter/server/ai.js) builds the draft, [`server/routes.js`](starter/server/routes.js) and [`server/server.js`](starter/server/server.js) expose and route it, and [`js/ai.js`](starter/js/ai.js) and [`js/main.js`](starter/js/main.js) call it from the browser. [`completed/`](completed/) is the finished reference. Read [`starter/brief.md`](starter/brief.md) and [`starter/rubric.md`](starter/rubric.md) before you start — this capstone, like Course 3.7's, begins with a brief.

Beyond the code, this capstone also asks for the two documents a real small project needs before anyone else runs it: [`deployment-notes.md`](deployment-notes.md), explaining how to run this on your own computer or a small server you control, with no paid service required either way, and `CHANGELOG.md`, describing what this version actually ships.

## Folder guide

```text
08-full-stack-spatial-application/
├── README.md
├── deployment-notes.md        # running this on localhost, or a small server you control
├── starter/                   # begin here: brief.md, rubric.md, and 6 numbered TODOs (8-13)
│   ├── brief.md
│   ├── rubric.md
│   ├── index.html, styles.css
│   ├── js/                    # main.js, net.js, scene.js (carried over from 5.5, unchanged); ai.js (TODO 12)
│   ├── SECURITY.md
│   ├── CHANGELOG.md
│   └── server/
│       ├── migrations/                                    # numbered .sql files, run in order; 004 is new
│       ├── auth.js, cookies.js, sessions.js, rateLimit.js, wsAuth.js, rooms.js, realtime.js  # carried over, unchanged
│       ├── db.js, validation.js, sanitize.js, config.js, env.js                              # carried over, unchanged
│       ├── ai.js                                          # this capstone's new module (TODO 8)
│       ├── routes.js                                      # carried over, plus TODO 9 and TODO 10
│       ├── server.js                                      # carried over, plus TODO 11
│       ├── server.test.js
│       ├── package.json, .env.example, .gitignore
│       └── data/                                          # created at runtime, never committed
├── completed/                 # reference solution
│   ├── index.html, styles.css, js/, server/
│   ├── SECURITY.md, CHANGELOG.md
├── challenges/                # Three challenges: Foundation is required
├── tests/                     # self-review checklist
├── assets/
└── screenshots/
```

## Setup

1. Read [`starter/brief.md`](starter/brief.md) and [`starter/rubric.md`](starter/rubric.md) first.
2. `cd starter/server`.
3. `npm install` (installs exactly `ws@8.21.3`, pinned in the repository's `versions.json`; no lockfile is committed).
4. Copy `.env.example` to `.env` and set your own `APP_SECRET` (never reuse the example value).
5. `npm start`, then open the address it prints in a browser.
6. In a second terminal, `npm test` from the same folder. Eight of the ten tests should already pass — those are Course 5.5's, carried over. The last two, for this capstone's own AI description feature, will pass once you finish TODOs 8-13.
7. Open `starter/index.html` in your editor alongside the walkthrough below.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Read `brief.md` and `rubric.md`; skim 5.1-5.7's completed folders for what this capstone reuses. | A short note on what is already done, and what TODOs 8-13 still need. |
| 2 | Set up `starter/server` (`npm install`, `.env`, `npm start`) and confirm the inherited app runs unchanged. | The starter app running at `http://127.0.0.1:8891`. |
| 3 | Read `server/routes.js` and `server/db.js` in full: accounts, scenes, and annotations. | Notes on `canView`, and on which function checks ownership versus which just reads. |
| 4 | Read `server/realtime.js`, `server/rooms.js`, and `server/server.js`'s Content Security Policy. | Notes on how the real-time chat room and the CSP header both already work. |
| 5 | Run `npm test`; confirm all eight inherited tests pass before you write any new code. | A known-good starting point, in writing (a passing test run). |
| 6 | Create an account, create a scene, add an annotation, and send a chat message. | The whole inherited app, used once, end to end, by you. |
| 7 | Read `server/ai.js`'s comments and this README's "AI description drafts, with review" section. | A clear idea of what `describeScene` must do before you write it. |
| 8 | Step 3: implement `describeScene`'s mock path in `server/ai.js` (TODO 8). | `describeScene` returns a real draft for a scene with no annotations. |
| 9 | Confirm `describeScene` also handles a scene that has annotations, and rejects an unsupported provider. | A description that mentions annotation text, and a clear thrown error otherwise. |
| 10 | Step 4: implement the `describeScene` route handler in `server/routes.js` (TODO 9). | `POST /api/scenes/:id/describe` returns a draft for the scene's owner. |
| 11 | Confirm the same route returns 404 for a scene this account cannot view, matching `getScene`. | The draft route as strict as every other scene route already is. |
| 12 | Step 5: implement the `saveDescription` route handler in `server/routes.js` (TODO 10). | `PUT /api/scenes/:id/description` saves a sanitised description for the owner. |
| 13 | Confirm the same route refuses a non-owner, even on a public scene. | A save route stricter than the read route it sits next to. |
| 14 | Step 6: wire both new routes in `server/server.js` (TODO 11). | Both routes reachable over HTTP, not just callable as functions. |
| 15 | Run `npm test`; confirm the description-draft test passes. | 9 of 10 tests green. |
| 16 | Run `npm test` again; confirm the save-description test passes. | 10 of 10 tests green. |
| 17 | Read `js/main.js`'s existing account, scene, and chat wiring. | Notes on the `api()` and `showFieldErrors()` pattern TODO 12-13 will reuse. |
| 18 | Step 7: implement `requestDescriptionDraft` in `js/ai.js` (TODO 12, part 1). | A working network call you can test from the browser console. |
| 19 | Step 7, continued: implement `saveDescription` in `js/ai.js` (TODO 12, part 2). | Both client functions complete. |
| 20 | Step 8 (part 1): implement `renderSavedDescription` in `js/main.js` (TODO 13, part 1). | A saved description shown in the page once one exists. |
| 21 | Step 8, continued (part 2): wire the Draft and Save buttons in `js/main.js` (TODO 13, part 2). | The whole feature working by clicking, in your browser. |
| 22 | Manual test: draft a description, edit it, save it, and reopen the scene to confirm it persists. | A description that survives a page reload. |
| 23 | Manual test: confirm an account that can view but does not own a public scene can draft, but not save, a description for it. | The owner-only save rule confirmed by hand, not only by the test suite. |
| 24 | A keyboard-only pass across the new description panel: Tab to both buttons and the textarea. | The whole feature confirmed usable without a mouse. |
| 25 | Read `deployment-notes.md` in full. | A clear answer, in your own words, to "where could I actually run this?" |
| 26 | Read `SECURITY.md` and `CHANGELOG.md`; edit `CHANGELOG.md`'s `1.0.0` entry if your build differs. | Both documents describing your build accurately. |
| 27 | Accessibility pass: `#scene-description`, live regions, and heading order across the whole page. | Screen-reader-relevant text confirmed accurate by reading it aloud yourself. |
| 28 | A reduced-motion pass: confirm the scene marker's animation starts paused when the OS asks for it. | Reduced motion behaving correctly in your browser's emulation. |
| 29 | Test at 390 px and 1280 px; fix any horizontal overflow. | A page that works at both widths. |
| 30 | Re-read `server/validation.js` and `server/sanitize.js`; confirm the description field follows the same rules as every other stored field. | Confidence that no field in this app is validated or sanitised differently "by accident". |
| 31 | Work through `tests/checklist.md` end to end. | Every box checked, or a fix for each one that is not. |
| 32 | Do the Foundation challenge (`challenges/challenge-1.md`). | The required challenge complete. |
| 33 | Choose Creative or Explorer, and start it. | A first working version of your chosen extension. |
| 34 | Finish your chosen challenge; final submission: screenshots, the checklist re-checked, and your journal question answered. | A capstone ready to submit. |

### Step 1: read the brief and the rubric

Open [`starter/brief.md`](starter/brief.md) and [`starter/rubric.md`](starter/rubric.md). Like Course 3.7's capstone, this one begins with a brief and a rubric rather than a list of TODOs alone — read both before writing any code.

### Step 2: tour the starter

Before touching `server/ai.js`, read `server/routes.js`, `server/db.js`, `server/realtime.js`, and `server/server.js`. Every one of these files is Course 5.5's fixed code, unchanged. Run `npm test` and confirm all eight of its tests pass — this is your known-good starting point.

### Step 3: `server/ai.js`'s mock provider (TODO 8)

`describeScene(scene, annotations)` must return `{ description, provider }` when `AI_PROVIDER` is `"mock"` (the default), using the already-written `mockDescription()` helper, and throw an `AiConfigError` naming the provider otherwise. This is the only file in this capstone that would need to change to reach a real AI provider — see the comment at its top, and this lesson's Explorer challenge.

### Step 4: `describeScene`'s route handler (TODO 9)

In `server/routes.js`, handle `POST /api/scenes/:id/describe`: look the scene up, return 404 unless `canView(scene, auth.user.id)` — the same check `getScene` already uses two functions above it — then call `server/ai.js`'s `describeScene` and return its result. Never let this function write anything to the database.

### Step 5: `saveDescription`'s route handler (TODO 10)

Handle `PUT /api/scenes/:id/description`: check `requireCsrf`, then require `scene.ownerId === auth.user.id` — stricter than Step 4, on purpose, because reading a public scene and writing to it are different permissions. Validate the body, run it through `sanitizeText` exactly like `createAnnotation` does, and call `updateSceneDescription`.

### Step 6: wiring the new routes (TODO 11)

In `server/server.js`, match the new paths and call `requireAuth`, then the two functions from Steps 4-5, following the exact pattern every other authenticated route in this file already uses.

### Step 7: the client's network calls (TODO 12)

In `js/ai.js`, `requestDescriptionDraft` and `saveDescription` are two `fetch()` calls in the same shape `js/main.js`'s own `api()` helper already uses elsewhere in this app — a draft request needs no CSRF token (it only reads), a save request does (it writes).

### Step 8: wiring the description panel (TODO 13)

In `js/main.js`, `renderSavedDescription` shows a saved description with `textContent`, and two click listeners call Step 7's functions and handle their results the same way every other form in this file already does — building or updating a scene's description is not a special case, structurally, from creating one.

## Key code explained

- **`canView` vs. owner-only checks**: `describeScene`'s route reuses `getScene`'s exact `canView` check (owner or public), because reading a draft is exactly as sensitive as reading the scene itself. `saveDescription` uses a stricter check (`scene.ownerId === auth.user.id` alone), because writing is not: a public scene can be *read* by anyone, but only its owner may change it.
- **A draft that is never saved by the file that builds it**: `server/ai.js`'s `describeScene` only ever returns a value — it never calls a database function. The only function anywhere in this app that can write a `description` column is `db.js`'s `updateSceneDescription`, called from exactly one place (`routes.js`'s `saveDescription`), only after a person has pressed Save.
- **The mock provider is deterministic**: `mockDescription()` builds its sentence only from a scene's own `name` and `isPublic`, plus its annotations' already-sanitised `text` — the same scene always produces the same draft, and nothing in the draft was not already visible to whoever requested it.
- **Sanitising a saved description**: a description a person approved is still user-controlled text once it reaches the server, so `saveDescription` runs it through `sanitize.js`'s `sanitizeText` — the same function `createAnnotation` already uses — before it is ever stored.
- **`ALTER TABLE`, not a new migration runner**: `migrations/004_add_scene_description.sql` adds one column to the existing `scenes` table, run by the same migration runner Course 5.3 built; this capstone needed no new database code to store one more field.

## 3D and XR accessibility

The 3D view is the same fixed-camera A-Frame scene Course 5.4 introduced: a box and a text label showing whichever scene is open, with a Pause/Resume button for its idle rotation. This capstone adds no new 3D element — the description panel is a 2D form, deliberately, because a description is text to be read, not something that benefits from being spatial. `#scene-description` continues to describe the open scene from the same data the 3D view uses; it does not repeat a saved AI description, which has its own visible text in the description panel instead. Every interaction — opening a scene, adding an annotation, drafting and saving a description, sending chat — has a full keyboard route, and the 2D scene-detail list next to the 3D view carries every fact the 3D view shows.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| `#scene-description` updates with the open scene | 1.1.1, 1.3.1 | A screen-reader user gets the same facts a sighted user sees in the 3D view. |
| The description panel's textarea has a visible, programmatic label | 1.3.1, 2.5.3 | So an assistive technology, and a sighted user scanning quickly, both know what the field is for. |
| Draft and Save are reachable and operable by keyboard alone | 2.1.1 | Neither button is a 3D interaction, but both sit inside a panel next to one, and this app's whole keyboard route must stay unbroken. |
| The scene marker's idle rotation starts paused under `prefers-reduced-motion: reduce` | 2.2.2 | Self-starting motion must be pausable or avoidable; this app avoids starting it at all when the operating system asks for less motion. |
| Field errors are associated with their field and announced | 4.1.3 (Good practice for the exact wording) | `showFieldErrors` writes into a `role="list"` next to the relevant control, matching every other form in this app. |

## Performance considerations

The mock AI provider makes no network call and does no meaningful computation — building a draft is as fast as string concatenation, so this capstone adds no new performance concern of its own. Every existing consideration from 5.1-5.5 still applies unchanged: prepared statements for every query, a rate limit on login attempts, and position updates (in the chat room) throttled to a sensible rate. If you complete the Explorer challenge and reach a real AI provider, budget for network latency and, per Course 5.6, a small rate limit on how often a real call can be made.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Saving a draft directly from `describeScene`'s route, skipping the review step | An AI-generated sentence reaches the database with no person ever having read it | Only ever call `updateSceneDescription` from `saveDescription`, after a person presses Save |
| Reusing `getScene`'s `canView` check for `saveDescription` too | Any account that can view a public scene could also overwrite its description | Use `scene.ownerId === auth.user.id` alone for the save route |
| Storing the description with `innerHTML` on the client | Reopens exactly the stored-XSS bug Course 5.5 fixed in annotations and chat | Set it with `textContent`, matching `renderAnnotations` and `appendChatMessage` |
| Forgetting the CSRF token on the save request, but not the draft request | The save request fails with 403 even though the code otherwise looks correct | A read-only request needs no CSRF token; a request that writes always does, per `requireCsrf` |

## Troubleshooting

**`describeScene is not a function` (or similar) in `server/routes.js`.** Expected until TODO 8 is complete — `server/ai.js`'s `describeScene` must exist and be exported before `routes.js` can import and call it.

**The draft and save requests both return 404, even for the scene's owner.** Check TODO 11 first: if the two new routes are not matched and wired in `server/server.js`, every request to them falls through to the generic `/api/` 404, regardless of what `routes.js` does.

**A saved description looks unchanged after editing the draft text.** The Save button saves whatever is currently in the textarea, not the original draft — confirm your edit was actually typed into `#description-draft` before pressing Save.

**`npm test` still fails after a fix looks right.** Read the assertion message, not just the test's title — the two new tests each check more than one thing (for example, the save test checks both that a stranger is refused *and* that the owner's saved text is sanitised).

**`npm install` fails, or is very slow, in mainland China.** Run `npm install --registry=https://registry.npmmirror.com` instead of the default registry.

**Port 8891 is already in use.** Set a different `PORT` in `server/.env`, and update `ALLOWED_ORIGIN` to match.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: add a rate limit to the description-draft endpoint, matching the shape `rateLimit.js` already uses for login attempts, and a `node:test` that proves it is in place.
2. **[Creative](challenges/challenge-2.md)**: change the mock description's wording, in your own language or style, to sound like something a curator from your own community or culture would actually write.
3. **[Explorer](challenges/challenge-3.md)**: implement Course 5.6's `openai-compatible` or `local` provider path in `server/ai.js`, reaching a real endpoint (a hosted API, or a local model through Ollama or LM Studio) instead of the mock provider.

## Submitting your work

1. Work through [`tests/checklist.md`](tests/checklist.md).
2. Take screenshots: your terminal showing `npm test`'s full pass (10/10), and the app with a scene, an annotation, a chat message, and a saved AI description all visible.
3. Keep them in your learner journal and portfolio. Share them with other developers: see [where to share your work and ask for help](../../docs/en/community.md).
4. Journal question: describe, in your own words, what could go wrong if the "human review" step in this capstone's AI feature were removed — not "it might be wrong," but a specific, concrete consequence for a real user of a real version of this app.

## Further reading

- [MDN: Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)
- [OWASP Access Control Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Access_Control_Cheat_Sheet.html)
- [Node.js docs: SQLite](https://nodejs.org/api/sqlite.html)
- [MDN: WebSockets API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [Keep a Changelog](https://keepachangelog.com/)

## Women to Know

**Juliana Rotich** is a Kenyan technologist who co-founded Ushahidi in 2008 — free and open-source crowdsourcing and crisis-mapping software first built to map reports of violence after Kenya's 2007-08 election, and since deployed around the world — and who later co-founded BRCK.

Ushahidi began as exactly the kind of small, urgent tool this capstone practices building: a working server, a database of reports tied to places, and real people relying on it under pressure. The discipline this lesson asks for — reviewing what already works before adding to it, and writing down plainly how to run and deploy what you built — is the same discipline a tool built to be trusted in a crisis has to have from the start.

_Facts from public sources, checked 2026. Spotted an error? [Tell us](https://github.com/XR-Dev-Camp/xr-camp/issues)._

## Standards spotlight

This capstone's own new feature follows the W3C/WHATWG Fetch Standard's `fetch()` semantics for both its read and write requests, and keeps the W3C Web Application Security Working Group's Content Security Policy Level 3 protections Course 5.5 already put in place, unchanged. The mock AI provider's request-and-reply shape mirrors the OpenAI-compatible chat-completions convention Course 5.6 introduced — a widely adopted, but not formally standardised, API shape used by several hosted and local model servers, which is why this lesson treats it as a common convention to design around rather than as a body-issued standard.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
