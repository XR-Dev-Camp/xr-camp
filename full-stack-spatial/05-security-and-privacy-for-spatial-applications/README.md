# Security and Privacy for Spatial Applications

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `full-stack-spatial` · **Lesson:** `security-and-privacy-for-spatial-applications-05` · **Time:** about 12 hours · 16 sessions of 45 minutes · about 4 weeks at 4 sessions a week

---

> Complete a security and privacy review and remediation sprint.

## Learning objectives

By the end of this project you will be able to:

1. Build a STRIDE-style threat model table for a small web application, naming a concrete example of each threat category in that application's own code.
2. Explain why a stored value being sanitised on the server and a client that renders it with `textContent` are two independent layers against the same stored-XSS bug, and why neither alone is enough to rely on forever.
3. Write a Content Security Policy header that removes `'unsafe-inline'` from `script-src`, and explain what that specific removal defends against that server-side sanitising does not.
4. Explain why a secret committed to source control is compromised the moment it is committed, even after a later commit removes it, and move one from hardcoded source into an environment variable.
5. Recognise an IDOR (Insecure Direct Object Reference) vulnerability, fix one by checking ownership or visibility on every request, and explain why a "not found" response for both a missing and a forbidden resource is a deliberate choice, not an accident.
6. Explain what a verbose error message leaks to an attacker, and replace one with a generic client-facing message plus server-side logging.
7. Apply data minimisation to a location field: store no more precision than a feature actually needs, and explain the privacy cost of a full-precision GPS coordinate kept "just in case".
8. Run `npm audit`, read its output, and explain what it can and cannot tell you about a project's real security.

## Prerequisites

- **Course 5.4: Real-Time and Multi-User Applications** — this lesson's starter reuses its account routes, session cookies, CSRF token, and WebSocket-upgrade authentication unchanged; the review targets are new code built on top of that foundation.
- **Course 5.2: Authentication and User Accounts** — password hashing, sessions, and CSRF, all carried over.
- Comfort reading server code you did not write and did not just watch break — this lesson's starter runs fine; the vulnerabilities are logical, not crashes.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| Node.js 22.5 or later (LTS "24 Krypton" recommended) | Runs the server | Free |
| npm (ships with Node.js) | Installs this lesson's one dependency, `ws`, and runs `npm audit` | Free |
| A text editor (e.g. VS Code) | Reading and fixing the server and client code | Free |
| A browser (Chrome, Firefox, Safari, or Edge) | Trying each vulnerability yourself before you fix it | Free |

Node.js can be downloaded from [nodejs.org](https://nodejs.org/); learners in mainland China can also use the [npmmirror Node.js mirror](https://registry.npmmirror.com/binary.html?path=node/). If `npm install` is slow, run `npm install --registry=https://registry.npmmirror.com` instead.

## What you will build

Course 5.2's README promised this moment: *"read Course 5.5, which comes back to find and fix planted vulnerabilities in a project just like this one."* This lesson delivers on that. The starter is a small spatial app — accounts, saved scenes with an optional rough location, short text annotations left on a scene, and a shared chat room — built on exactly the account, session, CSRF, and WebSocket-authentication code Course 5.4 already taught you to trust. Seven things in it are deliberately broken: stored XSS in annotations, stored XSS in chat, no Content Security Policy, a secret committed directly in `config.js`, an IDOR on the scene-by-id endpoint, error responses that leak a stack trace, and a scene location stored at full GPS precision for no reason. Every file with a bug repeats the same warning at its top: **DELIBERATELY VULNERABLE — for learning on localhost only; never deploy.** The server only ever binds to `127.0.0.1`.

Your work is not to add a feature. It is to find each of the seven numbered TODOs, understand *why* it is a real vulnerability (not just a style complaint), fix it, and watch a failing `node --test` suite turn green one test at a time. [`completed/`](completed/) is the fixed reference: a threat model, a strict CSP, an environment-loaded secret, a permission check on every request to the scene endpoint, generic error messages, minimised location data, an explained `npm audit` run, and a [`SECURITY.md`](completed/SECURITY.md) describing how this project's own maintainers would want a real vulnerability reported.

This is the fifth step of the ongoing **virtual cultural exhibit** that runs through Phase 5. It does not add a new feature to the exhibit; it makes the features Courses 5.1–5.4 already built safer to keep building on.

## Folder guide

```text
05-security-and-privacy-for-spatial-applications/
├── README.md
├── starter/                      # begin here -- deliberately vulnerable, runs fine
│   ├── index.html, styles.css, js/main.js, js/net.js, js/scene.js
│   └── server/
│       ├── migrations/                       # numbered .sql files, run in order
│       ├── cookies.js, sessions.js, auth.js, rateLimit.js, wsAuth.js, rooms.js   # carried over from 5.4, unchanged
│       ├── db.js, validation.js, sanitize.js, env.js  # new for this lesson
│       ├── config.js          # TODO 4: a secret, hardcoded
│       ├── routes.js          # TODO 1, 5, 6, 7
│       ├── realtime.js        # TODO 2
│       ├── server.js          # TODO 3, 6
│       └── server.test.js     # one test per TODO -- run `npm test` and watch it fail
├── completed/                    # reference solution, plus SECURITY.md
├── challenges/                   # Three challenges: Foundation is required
├── tests/                        # self-review checklist
├── assets/
└── screenshots/
```

## Setup

1. Open a terminal and run `node --version`. You need 22.5 or later; this course is written and tested against Node 24 (the current LTS).
2. `cd` into `starter/server` and run `npm install` — this installs exactly one package, `ws`, pinned to the exact version in [`package.json`](starter/server/package.json). `node_modules/` is created on disk but never committed (see `.gitignore`).
3. Copy `starter/server/.env.example` to `starter/server/.env`. You do not need to set `APP_SECRET` yet — the starter's `config.js` does not read it (that is TODO 4).
4. Serve the whole repository from its root with any static file server (for example `python3 -m http.server 8766`), so `starter/index.html` opens over `http://`, not `file://`.
5. In a second terminal, from `starter/server`, run `node server.js`. You should see `Security and privacy lab listening on http://127.0.0.1:8890` and, once, a one-line `ExperimentalWarning: SQLite is an experimental feature`. Both are expected.
6. Open the served `starter/index.html`, register an account, and sign in. Everything works — that is what makes this a review sprint and not a broken-starter lesson: you are looking for mistakes a working app can still have.
7. From `starter/server`, run `npm test` (this runs `node --test` with a 15-second per-test timeout, so a test left temporarily broken while you work cannot hang the whole suite). Every test should fail. Read each failure message -- it names exactly what is wrong and points at the TODO that fixes it.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Read the Threat model and "What went wrong" sections below; run the starter; run `npm test` and read every failure message. | A list of seven things to fix, in your own words. |
| 2 | TODO 1a: call `sanitizeText` in `routes.js`'s `createAnnotation`, before `insertAnnotation`. | Stored annotation text has no markup left in it, even before the client changes. |
| 3 | TODO 1b: change `js/main.js`'s `renderAnnotations` from `innerHTML` to `textContent`/`createElement`. | The annotation stored-XSS test passes. |
| 4 | TODO 2a: call `sanitizeText` in `realtime.js`'s chat handler, before relaying a message. | Relayed chat text has no markup left in it, even before the client changes. |
| 5 | TODO 2b: change `js/main.js`'s `appendChatMessage` from `innerHTML` to `createElement`/`textContent`. | The chat stored-XSS test passes. |
| 6 | TODO 3: add a `Content-Security-Policy` header in `server.js`, with no `'unsafe-inline'` in `script-src`. | The CSP test passes; the app still works (no inline scripts to break). |
| 7 | TODO 4a: rewrite `config.js` to read `APP_SECRET` from `process.env`, throwing if it is missing. | The server refuses to start without an `APP_SECRET`. |
| 8 | TODO 4b: set a real `APP_SECRET` in `starter/server/.env` (generate one; see `.env.example`). | The server starts again; the secrets test passes. |
| 9 | TODO 5: in `routes.js`'s `getScene`, check that the caller owns the scene or the scene is public, on every request, returning the same 404 either way. | Both IDOR tests pass. |
| 10 | TODO 6: replace `formatServerError`'s raw `error.message`/`error.stack` with a fixed, generic message; keep `console.error(error)` for yourself. | The verbose-errors test passes. |
| 11 | TODO 7: call `roundLocation` on a scene's location, in `routes.js`'s `createScene`, before it is ever stored. | The location-minimisation test passes. |
| 12 | Run `npm test` end to end. | A full, green suite: all eight tests passing. |
| 13 | Run `npm audit` from `server/`. Read its output (see "What went wrong: npm audit" below) and write, in your journal, what it found and what you would do about it. | A short written record of a real `npm audit` run, not a guess about what one might say. |
| 14 | Re-read the Threat model table. For each row, check whether your fixed code actually closes that row's threat, or only makes it harder. | Notes on which threats are fully closed and which are only reduced (see "Common mistakes"). |
| 15 | Work through [`tests/checklist.md`](tests/checklist.md), including its "3D and XR (manual)" section. Run the local `pa11y` check described there against `completed/index.html`. | Every item checked, or a note about what you could not test and why. |
| 16 | Complete the required [Foundation challenge](challenges/challenge-1.md), then **Submitting your work**. | Screenshots, your journal entries, and a project you understand end to end. |

### Step 1: Read before you fix (no TODO yet)

Open `starter/server/server.test.js`. Every test names the vulnerability it checks for in its title and its failure message. Read all eight before changing any code — they are your specification for what "fixed" means in this lesson, the same way a bug report is a specification in a real review.

### Step 2-3: Stored XSS in annotations (TODO 1a-b)

An annotation's text travels: browser → `POST /api/scenes/:id/annotations` → `insertAnnotation` → SQLite → `GET /api/scenes/:id` → browser again, for every later viewer. Two things must both be true for a `<script>` tag typed here to never run: the server must not store it as executable-looking markup (`sanitize.js`'s `sanitizeText`, called from `routes.js`), and the client must never hand a string to `innerHTML` (`js/main.js`'s `renderAnnotations`, which should build DOM nodes and set `textContent` instead). Fixing only one of the two still passes today's test, in this exact app — but see "Common mistakes" for why that is not the same as being safe.

### Step 4-5: Stored XSS in chat (TODO 2a-b)

The same pattern, over a WebSocket instead of a REST endpoint: `realtime.js`'s message handler must sanitise before broadcasting, and `js/main.js`'s `appendChatMessage` must never use `innerHTML`. Course 5.4's own chat already used `textContent`; this lesson's starter is a deliberate step backward from that, so you can see what changes when it is not there.

### Step 6: A Content Security Policy (TODO 3)

Open `server.js`. Add a `Content-Security-Policy` response header, on every response, with `script-src` limited to `'self'` and the one external script this page loads (`https://aframe.io`) — and no `'unsafe-inline'`. See "Content Security Policy" below for why this matters even after TODO 1 and TODO 2 are fixed, and why `style-src` here still allows `'unsafe-inline'`.

### Step 7-8: A secret committed in code (TODO 4a-b)

Open `config.js`. `APP_SECRET` gates `GET /api/admin/stats` (`routes.js`) and is hardcoded, in cleartext, in a file every learner in this course can read — and, in a real repository, in every clone and every commit that ever included it, forever, even after a later commit deletes it. Fix `config.js` to read `process.env.APP_SECRET` and throw if it is missing; then copy `.env.example` to `.env` and set a real value (`.env` is already in `.gitignore`).

### Step 9: An IDOR on the scene endpoint (TODO 5)

Open `routes.js`'s `getScene`. It currently returns any scene, to any signed-in caller, by id — no check that the caller owns it or that it is public. Fix it to check `scene.ownerId === auth.user.id || scene.isPublic` before returning anything, and to answer the same 404 whether the scene does not exist or simply is not this caller's to see. See "IDOR" below for why that specific choice (one status code for both cases) matters.

### Step 10: Verbose error messages (TODO 6)

Open `routes.js`'s `formatServerError`. It currently returns `error.message` and `error.stack` to the client on every unhandled exception. Replace its return value with a fixed, generic message. `server.js`'s `console.error(error)` already logs the real error for you — that line does not change.

### Step 11: Location stored without need (TODO 7)

Open `routes.js`'s `createScene`. It stores a scene's `locationLat`/`locationLng` exactly as submitted — full GPS precision, indefinitely. Call `sanitize.js`'s `roundLocation` on the value before it reaches `insertScene`. See "Data minimisation" below for why "we might need it later" is not, on its own, a reason to keep more precision than a feature currently uses.

## Threat model

A STRIDE-style pass over this app's own features, done the way a real review would do it: one row per thing that could go wrong, not one row per generic category.

| STRIDE category | Concrete threat in this app | Where it is addressed |
| --- | --- | --- |
| **S**poofing | An attacker signs in as someone else by guessing or stealing a session cookie. | Session ids are `crypto.randomBytes(32)` (Course 5.2's `sessions.js`, unchanged); cookies are `HttpOnly` so client-side script cannot read one, even a script that got past TODO 1/2. |
| **T**ampering | A WebSocket message claims a `username` it does not own. | `realtime.js` never reads identity fields from an incoming message; every relayed message is stamped from `member.username`, set once at connection time from the authenticated session. |
| **R**epudiation | No record of who created a scene or left an annotation exists after the fact. | `scenes.owner_id` and `annotations.author_id` are always the authenticated caller's own id, set server-side, never taken from the request body. |
| **I**nformation disclosure | A private scene is read by an account that does not own it (TODO 5); a stack trace tells an attacker which file and line an error came from (TODO 6); a full-precision location reveals exactly where someone was standing (TODO 7). | `getScene`'s ownership/visibility check; `formatServerError`'s generic message; `roundLocation`'s data minimisation. |
| **D**enial of service | A flood of chat messages or login attempts from one connection. | Carried over unchanged from Courses 5.2/5.4: `rateLimit.js` for login attempts, and this lesson's `realtime.js` inherits 5.4's per-connection design (a full rate limiter for chat/scene endpoints is this lesson's Explorer challenge, not required here). |
| **E**levation of privilege | Anyone who reads this repository's source (or its committed history) can call `GET /api/admin/stats`, an endpoint meant only for whoever runs the server. | TODO 4: `APP_SECRET` moves from hardcoded source to an environment variable that is never committed. |

## What went wrong, and how it was fixed

**Stored XSS (TODO 1, TODO 2).** [MDN's Cross-Site Scripting article](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS) and the [OWASP Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) both describe the same shape: untrusted text reaches a place that interprets it as markup. This app has two such places (`innerHTML` in the client) and one input that reaches both of them unsanitised (annotations, chat). The fix is two independent layers: `sanitize.js`'s `sanitizeText` strips anything that looks like an HTML tag before the text is ever stored, and the client renders with `textContent`/`createElement`, which never interprets its argument as markup no matter what it contains. Either layer alone would already stop today's test from failing — both together mean a future client, or a debugging tool, or an export feature that is less careful, is not the only thing standing between a stored message and a running script.

**Content Security Policy (TODO 3).** [MDN's Content-Security-Policy article](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) describes CSP as a second, independent layer against injected script: even if a stored-XSS bug like TODO 1/2 existed and was missed, a strict `script-src` (no `'unsafe-inline'`, no `'unsafe-eval'`) stops an injected inline `<script>` or `onerror` handler from running at all, because the browser refuses to execute inline script the policy does not explicitly allow. This project's own scripts are all external files, so removing `'unsafe-inline'` from `script-src` costs nothing here. `style-src` still allows `'unsafe-inline'`, because A-Frame sets element styles directly at runtime (a widely known limitation of most WebGL/3D libraries) — an accepted trade-off here, since a CSS-only injection cannot execute JavaScript or read a cookie, and this app never builds a style from user text.

**Secrets management (TODO 4).** A secret's confidentiality ends the moment it is committed — not when someone notices, and not undone by a later commit that deletes it, since it remains in the repository's history. The [OWASP Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html) recommends secrets live outside source control entirely (an environment variable, loaded from a file that is itself gitignored) and be rotated — not just relocated — once they have ever been exposed. This lesson's fix does the first; a real incident response would also need the second, which is why `completed/SECURITY.md` describes reporting a leak, not just fixing one.

**IDOR (TODO 5).** An Insecure Direct Object Reference is exactly this app's original `getScene`: an id the caller controls (or can be handed, or can guess, since these are UUIDs printed right back to their own owner) is used to fetch a record with no check that the caller is allowed to see it. The [OWASP Access Control Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Access_Control_Cheat_Sheet.html) is explicit that this check must run on every request that touches the object, not once at a point the caller could route around later. The fixed version answers the same 404 whether a scene does not exist or is simply not visible to this caller, on purpose: telling the two apart would let an attacker enumerate which private scene ids exist, one guess at a time, without ever reading one.

**Verbose error messages (TODO 6).** A stack trace tells a reader which files exist, which line failed, sometimes a package version or a fragment of a query — none of it useful to a learner who only needs "something went wrong," all of it useful to someone probing the app for weaknesses. The fix keeps the detail exactly where it is useful: `console.error(error)`, in the terminal of whoever is running the server, never in the response body a browser receives.

**Data minimisation (TODO 7).** A GPS coordinate accurate to six decimal places identifies a specific building, sometimes a specific room. This project's own scenes only ever need "roughly where" — nothing here reads a location back for driving directions or precise positioning. `roundLocation` rounds to one decimal degree (about 11 km) before a location is ever written to disk, so the unnecessary precision is never even captured, not merely hidden later. This is the same principle Course 5.2's account-deletion and data-export design pointed at: collect only what a feature actually needs.

**`npm audit`.** Run `npm audit` from `server/` (after `npm install`). It checks this project's one dependency, `ws`, and everything `ws` itself depends on, against a public database of known vulnerabilities, and reports any match by severity. Two things worth knowing before you read its output: a clean `npm audit` means no *known, published* vulnerability was found in this dependency tree today — not that the code is secure, and not that no vulnerability exists that has not yet been discovered and published. Read what it reports (a real run may show nothing at all, or may show something in a package `ws` itself depends on, depending on exactly when you run it) rather than trusting a fixed number written here, since the advisory database changes over time.

## Privacy laws where you live

Data minimisation is good engineering practice everywhere. In some places, it is also the law once an app collects location or other personal data from real people — not just "roughly where a scene is," but names, emails, and anything else this course's account system stores. **This is not legal advice, and laws differ by country and change over time** — the same framing Course 6.4 uses for its contract overview. Its job is to help you recognise that a real deployment needs this checked by a qualified person, not to replace one.

A few examples relevant to this course's audience:

- **Brazil: the LGPD** (*Lei Geral de Proteção de Dados Pessoais*, Brazil's General Data Protection Law). In plain words: before collecting location or other personal data, an app generally needs a lawful basis (often the person's clear consent), must say what the data is for, and must let people ask to see, correct, or delete what is held about them. Official text: [Lei nº 13.709/2018 (Planalto)](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm).
- **Mexico: the LFPDPPP** (*Ley Federal de Protección de Datos Personales en Posesión de los Particulares*, the Federal Law on the Protection of Personal Data Held by Private Parties). Mexico replaced its 2010 version of this law with a new one in 2025, which also changed which federal body oversees it. In plain words: a person must be told, in a privacy notice, what personal data (including location) is collected and why, before it is collected, and can withdraw consent later. Official text: [Diario Oficial de la Federación, 20 March 2025](https://www.dof.gob.mx/nota_detalle.php?codigo=5150631).
- **China: the PIPL** (Personal Information Protection Law of the People's Republic of China). In plain words: sensitive personal information — which explicitly includes precise location tracking — needs separate, specific consent (not bundled into one general "I agree"), a stated purpose, and extra care if it might ever leave the country. Official text (Chinese, with a National People's Congress reference translation available): [National People's Congress](http://www.npc.gov.cn/npc/c2/c30834/202108/t20210820_313088.html).

None of this replaces `roundLocation`'s data minimisation above — it is the reason a real product cannot treat that rounding as optional polish. If you ever ship an app like this one for real people to use, checking which of these (or other) laws apply to where your users are, not just where you are, is part of the job.

## Key code explained

- **Sanitising and rendering safely are two different layers, not one fix repeated twice.** `sanitize.js`'s `sanitizeText` changes what is stored; `js/main.js`'s `textContent` changes how a value already in memory is displayed. A bug in either one, alone, would still leave the other standing — which is the entire point of defense in depth (see "Common mistakes").
- **`findSceneById` versus a "for viewer" function.** `db.js` deliberately does not name its plain lookup `getSceneSafely` or similar — a name that only means "checked" if every future reader remembers what it implies. Naming it plainly, and putting the actual permission check in `routes.js`'s `getScene`, makes "who checked this was allowed?" a question with one obvious place to look.
- **The same 404 for "not found" and "not yours".** A different status code for each would let an attacker learn which private ids exist without ever reading one — see the OWASP Access Control Cheat Sheet's guidance on this exact pattern.
- **`formatServerError` is a pure function, tested directly.** Rather than trying to force a real HTTP request to crash the server (fragile, and a well-validated server should rarely do that by accident), this lesson pulls the error-formatting decision out into its own small function and tests it directly with a synthetic error — the same reason many codebases unit-test a formatter in isolation instead of only through the full stack.
- **`roundLocation` runs before `insertScene`, not after.** Rounding a value that has already been written to disk protects nothing that already leaked; the fix has to sit on the write path, before the precise value is ever persisted.

## 3D and XR accessibility

- **Scene description.** `#scene-description` states which scene is open, its visibility, and its annotation count, in plain text, built from the same data the 3D view reads.
- **A 2D twin of the 3D view.** `#scene-detail-list` holds the same scene facts as the 3D marker, always, whether or not WebGL is available.
- **Keyboard route for every interaction.** Opening a scene, creating one, and adding an annotation are all ordinary buttons and form fields — nothing here requires clicking or dragging inside the 3D canvas.
- **Reduced motion and a Pause control.** The scene marker's idle rotation starts paused when `prefers-reduced-motion: reduce` is set, and the **Pause animation** button (with `aria-pressed`) works regardless of that preference.
- **Comfort.** The camera is fixed for the whole lesson; nothing here ever moves the viewpoint itself.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| `#scene-description` is built from the same data as the 3D marker | 1.1.1, 1.3.1 | The words can never disagree with the picture. |
| `#chat-log` is `role="log"` with `aria-live="polite"` | 4.1.3 | A new chat message is announced without moving focus into the log. |
| Every form has a visible submit button | Good practice | Automated checkers (and keyboard users) can always find how to submit. |
| Animation respects `prefers-reduced-motion` and offers a Pause button | 2.2.2 | Self-starting motion the learner did not ask for must be stoppable. |
| `role="list"` on every `<ul>` styled with `list-style: none` | Good practice | Safari otherwise drops list semantics from a list-styled-away `<ul>`. |

## Performance considerations

- **`sanitizeText` runs once, at write time, not on every read.** Cleaning a value when it is stored means every later `GET` returns an already-safe string, instead of repeating the same regex work on every request that reads it.
- **`roundLocation` also shrinks what is stored and transmitted.** A value rounded to one decimal degree compresses slightly better and is one less reason to worry about a database backup or export leaking more precision than a feature needs.
- **The admin endpoint's three counts are simple `COUNT(*)` queries.** No join, no full table scan of user data — a debug endpoint should cost as little as the information it returns is worth.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Fixing only the client (`textContent`) or only the server (`sanitizeText`), and considering TODO 1/2 done | The one fix that remains is a single future change away from being the only thing stopping stored XSS — a new client, a debugging tool, or a template added later that is less careful | Fix both layers; treat each as complete on its own, not as redundant with the other |
| Checking a scene's ownership in the client (hiding a button) instead of in `routes.js` | Anyone with the browser's developer console open can call the API directly and skip the hidden button entirely | Enforce every permission check on the server, on every request — the client-side hiding is a courtesy, never a guarantee |
| Returning 403 for "not yours" and 404 for "does not exist" | An attacker can tell which private scene ids exist without ever reading one, by watching which status code comes back | Answer the same 404 for both, as the fixed `getScene` does |
| Treating a clean `npm audit` as proof the app is secure | `npm audit` only checks for *known, published* vulnerabilities in dependencies — it says nothing about this project's own code, including everything else this lesson reviews | Read what `npm audit` actually checks (see "What went wrong: npm audit") and keep reviewing your own code separately |
| Rounding a location for display only, after storing it precisely | The precise value is already on disk (and in any backup taken before the display-only rounding was added) — the exposure already happened | Round before the value is ever stored, as `createScene`'s fix does |

## Troubleshooting

**`ExperimentalWarning: SQLite is an experimental feature and might change at any time`.** Expected, every time `node:sqlite` is imported. A warning, not an error — the server keeps running.

**`Error: APP_SECRET is not set.` when starting the fixed server.** Expected until you copy `.env.example` to `.env` and set a real value (TODO 4b). This is the fix working: the server refuses to start with no secret rather than silently applying one.

**`npm test` still fails after a fix looks right.** Read the assertion message, not just the test's title — several tests check more than one thing (for example, the IDOR tests check both that a stranger is refused *and* that the owner and a public scene still work). Re-read the exact `assert` call that failed.

**`npm install` fails, or is very slow, in mainland China.** Run `npm install --registry=https://registry.npmmirror.com` instead of the default registry.

**Port 8890 is already in use.** Set a different `PORT` in `server/.env`, and update `ALLOWED_ORIGIN` to match.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: add an eighth review target — a missing rate limit on annotation and scene creation — and a `node:test` that proves it is fixed.
2. **[Creative](challenges/challenge-2.md)**: write your own STRIDE threat model for a small app from your own life, culture, or community.
3. **[Explorer](challenges/challenge-3.md)**: add a real per-connection rate limit to the chat and annotation endpoints, matching the shape Course 5.4's `realtime.js` already used for position updates.

## Submitting your work

1. Work through [`tests/checklist.md`](tests/checklist.md).
2. Take screenshots: your terminal showing `npm test`'s full pass (8/8), your `npm audit` output, and the app with a scene, an annotation, and a chat message all visible.
3. Keep them in your learner journal and portfolio. Share them with other developers: see [where to share your work and ask for help](../../docs/en/community.md).
4. Journal question: pick one of this lesson's seven fixes and describe, in your own words, what a real attacker would have been able to do with the unfixed version — not "it's insecure," but the specific action (read whose data, run what code, learn what fact) the bug allowed.

## Further reading

- [OWASP Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [OWASP Access Control Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Access_Control_Cheat_Sheet.html)
- [OWASP Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [MDN: Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)
- [MDN: Cross-Site Scripting (XSS)](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS)

## Women to Know

**Beatriz Busaniche** is an Argentine free-software and digital-rights activist and university lecturer (at UBA and FLACSO) who is president of Fundación Vía Libre, was a founding treasurer of the Free Software Foundation Latin America in 2005, and has campaigned publicly against facial-recognition mass surveillance in Buenos Aires.

Her work is a reminder that this lesson's fixes are not only a checklist: a precise location kept "just in case" (TODO 7), or a permission check quietly skipped (TODO 5), are exactly the kind of small technical decisions that, at the scale of a city's surveillance system, become the subject of the public campaigns she has spent her career on.

_Facts from public sources, checked 2026. Spotted an error? [Tell us](https://github.com/XR-Dev-Camp/xr-camp/issues)._

## Standards spotlight

The Content Security Policy this lesson adds is defined by the W3C Web Application Security Working Group's CSP Level 3 specification. The vulnerability-disclosure practice `completed/SECURITY.md` follows is informally modeled on IETF RFC 9116, "A File Format to Aid in Security Vulnerability Disclosure" (`security.txt`) — a standardised way for a project to say, in one predictable place, how it wants a security issue reported. OWASP itself is not a formal standards body; its Cheat Sheet Series is a widely-referenced community consensus on current best practice, which is why this lesson checks its claims against OWASP alongside MDN and RFCs rather than treating OWASP as the only source.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
