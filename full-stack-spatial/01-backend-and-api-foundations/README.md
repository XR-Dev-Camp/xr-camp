# Backend and API Foundations

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `full-stack-spatial` · **Lesson:** `backend-and-api-foundations-01` · **Time:** about 14 hours · 19 sessions of 45 minutes · about 5 weeks at 4 sessions a week

---

> Build an API-backed application that saves spatial content or settings.

---

## Learning objectives

By the end of this project you will be able to:

1. Build an HTTP server with Node's built-in **`node:http`** module, with no framework and no dependencies.
2. Design a small **JSON API**: routes, methods, and a request body that must match a shape.
3. Choose correct **status codes** (200, 204, 400, 404, 405, 413, 415, 500) and explain what each one promises a client.
4. **Validate** a request body by hand, and turn a failure into a clear list of field errors, never a crash.
5. Read configuration from **environment variables**, with a `.env.example` file and no secrets committed.
6. Add **CORS** headers so a page on one local origin can call an API on another, and explain why a wildcard origin is a reasonable choice here and a bad one later.
7. Serve a **client and a JSON API from the same server**, and make the client keep working (in a reduced form) when that server is not running.
8. Write and run automated tests with **`node:test`**, Node's built-in test runner.

## Prerequisites

- **Course 2.1: Modern JavaScript** (`async`/`await`, modules, `try`/`catch`).
- **Course 3.4: Three.js Foundations** (the exhibit this lesson's settings belong to; you do not need to remember its code, only that it exists).
- Comfort running commands in a terminal (Course 1.7 or equivalent).

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| Node.js, an LTS version (20 or later) | Runs the server and its tests; nothing else to install | Free |
| A modern browser, with its developer tools | Testing the client, and reading network requests | Free |
| A terminal | Starting the server, running `curl` and `npm test` | Free |
| VS Code (or any editor) and a local server for the client-only view | Modules need `http://`, not `file://` | Free |

Node.js runs the same way on Windows, macOS, and Linux, and its installer works without a paid account anywhere, including mainland China (download it directly from [nodejs.org](https://nodejs.org/), or via a package manager such as `winget`, Homebrew, or `apt`).

## What you will build

The exhibit from **Web3D Developer** (Course 3.4) gets a **settings panel**: a small web page where you choose which exhibits are shown, where the camera starts, your language, and whether things are allowed to move. Behind it sits a small **Node.js API** you write from scratch: it validates what you send it, saves it to a file, and hands it back on request.

This is also the first lesson to say plainly what a good API refuses to hide: what happens when the network fails, when the body is malformed, or when the server simply is not running. The client you build here does not fall over in any of those cases — it falls back to saving your settings in this browser instead, and tells you so.

The reference solution is in [`completed/`](completed/): a `server/` folder (the API, in `server.js`, `routes.js`, `validation.js`, and `store.js`) and, next to it, the client (`index.html`, `styles.css`, `js/`) that the same server serves as static files. The starter has **13 TODOs** across both.

## Folder guide

```text
01-backend-and-api-foundations/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html, styles.css   # The client page: finished
│   ├── js/main.js       # The settings form and API/localStorage logic: TODOs 10-11
│   ├── js/scene.js      # The 3D view: TODO 12
│   └── server/
│       ├── server.js        # The HTTP server, routing, CORS, static files: TODOs 1, 7-9
│       ├── routes.js        # Route handlers: TODOs 3, 5-6
│       ├── validation.js    # validateSettings(): TODO 2
│       ├── store.js         # Reads and writes the settings file: TODO 4
│       ├── server.test.js   # node:test: TODO 13
│       ├── .env.example     # Copy to .env to change PORT etc.
│       └── package.json     # "type": "module", no dependencies
├── completed/            # Reference solution: open this last
├── challenges/            # Three challenges: Foundation is required
├── tests/checklist.md    # Self-review before you submit
├── assets/
└── screenshots/
```

This lesson's `package.json` lists no dependencies at all: every server file uses only what Node ships with (`node:http`, `node:fs`, `node:test`, and so on). Course 5.4 is the first to add a real package (`ws`, for WebSockets), pinned to an exact version in this repository's `versions.json`, the same way `versions.json` already pins three.js and A-Frame for every 3D lesson.

## Setup

1. Make a new folder, `exhibit-api`, next to your other XR Camp projects, and copy the `starter/` folder's contents into it.
2. Open a terminal in its `server/` folder and check your Node version: `node --version`. You need 20 or later.
3. Copy `.env.example` to `.env` in that same folder. The defaults work as they are; you will come back to it in Step 1.
4. Start the server once you reach Step 1: `node server.js` (or `npm start`, which does the same thing). Stop it any time with Ctrl+C.
5. To view the client on its own, without the API (as it will be tested), open `index.html` through any local server, such as `python3 -m http.server 8766`, or VS Code's Live Server.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; read `validation.js`, `store.js`, and `routes.js` to see what is already finished | A one-sentence job description for each server file |
| 2 | Step 1: a first HTTP server (TODO 1, part 1) | `node server.js` prints "Exhibit settings server listening on..." |
| 3 | Step 1, continued: reading the port from `.env` (TODO 1, part 2) | Changing `PORT` in `.env` changes which port the server listens on |
| 4 | Step 2: validating a settings object (TODO 2) | Typing a good and a bad settings object into `validateSettings()` in the Node REPL shows which fields fail, and why |
| 5 | Step 3: `GET /api/settings` (TODO 3) | Visiting `http://127.0.0.1:8877/api/settings` in the browser shows the default settings as JSON |
| 6 | Step 4: saving to a file (TODO 4) | Restarting the server keeps the same settings; a `data/settings.json` file appears |
| 7 | Step 5: `PUT /api/settings` (TODO 5) | A `curl -X PUT` command changes the saved exhibits; an invalid body returns 400 with field errors |
| 8 | Step 6: `DELETE /api/settings` (TODO 6) | `curl -X DELETE` resets the file, and `GET` shows the defaults again |
| 9 | Step 7: routing everything together, and a JSON 404 (TODO 7) | A request to a made-up path returns a clear JSON error, not a crash |
| 10 | Step 8: CORS for localhost (TODO 8) | Opening the client from a different port no longer shows a CORS error in the console |
| 11 | Step 9: serving the client from the same server (TODO 9) | `http://127.0.0.1:8877/` shows the (still unfinished) settings panel |
| 12 | Step 10: the settings panel loads on start (TODO 10) | The panel shows the saved exhibits, camera view, and language when the page opens |
| 13 | Step 10, continued: saving and resetting (TODO 11) | Ticking a box and pressing **Save settings** updates the file on disk; **Reset to defaults** brings back the defaults |
| 14 | Step 11: the exhibit reads the settings, part 1 (TODO 12) | Unticking "Jade stone" removes it from the 3D view and the description, without a reload |
| 15 | Step 11, continued: camera presets and reduced motion (TODO 12) | Choosing "Close-up" moves the camera; the Pause button and your device's reduced-motion setting both stop the turning |
| 16 | Step 12: testing with `node:test` (TODO 13) | `node --test` prints every test passing |
| 17 | [`tests/checklist.md`](tests/checklist.md), and the 3D and XR accessibility checks below | A finished settings panel |
| 18 | One challenge extension | — |
| 19 | **Submitting your work** | Screenshots and a journal entry |

### Step 1: a first HTTP server, and environment variables (TODO 1)

`node:http`'s `createServer()` takes one function: it runs once for every request, with a `req` (request) and a `res` (response) object. Nothing else needs installing:

```js
const server = createServer(async (req, res) => {
  sendJson(res, 200, { ok: true }); // a placeholder, until Step 7
});
server.listen(PORT);
```

An **environment variable** is a setting that lives outside your code, in the environment the process runs in, so the same code behaves differently on different machines (or for different developers) without anyone editing a file. `process.loadEnvFile()` (built into modern Node, no package needed) reads `.env` into `process.env`; `.env` itself is never committed, which is why `.env.example` exists to show what belongs in it. Read the port with a fallback, so the server still starts if `.env` is missing or incomplete:

```js
const PORT = Number(process.env.PORT) || 8877;
```

### Step 2: validating a settings object (TODO 2)

A client can send anything. **Validation** is the code that decides whether "anything" is close enough to what you asked for, before you trust it with `save()`, a database row, or another user's screen. This lesson's settings object has exactly four fields:

```js
{
  visibleExhibits: ['clay-pot', 'jade-stone'], // a non-empty subset of KNOWN_EXHIBITS
  cameraStart: 'front',                        // one of CAMERA_PRESETS
  language: 'en',                              // one of LANGUAGES
  reducedMotion: false,                        // a boolean
}
```

`validateSettings()` checks each field and collects every problem it finds into one `errors` array, rather than stopping at the first one: a learner fixing a form wants to see every mistake at once, not one at a time. It returns a **new** object on success, copying only the four known fields — never the original request body, which could carry extra properties you never asked for.

### Step 3: `GET /api/settings` (TODO 3)

The simplest route in this API: load the settings (or the defaults, the first time), and send them back as JSON, with status 200. Nothing here can really fail — a missing file is not an error, it just means nobody has saved anything yet.

### Step 4: saving settings to a file (TODO 4)

`store.js` is the only file in this project that touches the disk. For now, that disk is a single JSON file: `writeFile(DATA_FILE, JSON.stringify(settings, null, 2), 'utf8')`, and `readFile` plus `JSON.parse` to load it back. Course 5.3 replaces this file with a real database once you need more than one kind of saved data; keeping every file-system call inside `store.js` means that swap will only touch this one file.

### Step 5: `PUT /api/settings` (TODO 5)

`PUT` means "replace this resource with what I am sending you." The handler:

1. Rejects a request whose `Content-Type` is not `application/json` — with status **415 Unsupported Media Type**.
2. Reads the body, and rejects one that is too large (**413**) or not valid JSON (**400**).
3. Validates it. Invalid settings get **400 Bad Request**, with the list of problems in `details`.
4. Saves valid settings, and returns them with **200 OK**.

```sh
curl -X PUT http://127.0.0.1:8877/api/settings \
  -H "Content-Type: application/json" \
  -d '{"visibleExhibits":["jade-stone"],"cameraStart":"close","language":"en","reducedMotion":true}'
```

### Step 6: `DELETE /api/settings` (TODO 6)

Resets the saved settings to the defaults, and answers **204 No Content**: the request worked, and there is nothing more useful to say than an empty body. A response body with `204` is actually against the HTTP specification — leaving `res.end()` with no argument is correct here, not an oversight.

### Step 7: routing, and errors that do not crash (TODO 7)

The request listener passed to `createServer()` is the only place that reads `req.method` and the URL's `pathname`, and decides which function in `routes.js` should handle it. Two kinds of request that match nothing get a clear JSON answer instead of nothing at all: an unknown method on a known route (**405 Method Not Allowed**), and any path starting with `/api/` that is not `/api/settings` (**404 Not Found**). A `try`/`catch` around the whole thing is a safety net, not a substitute for those specific checks: nothing a client sends should ever be able to stop the process outright, so an unexpected error still becomes a **500** response, logged on the server, rather than a hung connection.

### Step 8: CORS for localhost (TODO 8)

A browser blocks a page from reading a response from a different **origin** (a different scheme, host, or port) unless the server explicitly allows it — Cross-Origin Resource Sharing (CORS). Testing this lesson's client from `http://127.0.0.1:8766` (a plain static server) against an API on `http://127.0.0.1:8877` crosses that boundary, even though both are "localhost". Three response headers say who may ask, and how:

```js
res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
```

Before a `PUT` or `DELETE` request with a JSON body, the browser first sends an `OPTIONS` **preflight** request, to ask permission — it carries no body of its own, so it always gets a short, empty `204` answer.

### Step 9: serving the client from the same server (TODO 9)

Any `GET` request that is not `/api/...` is treated as a request for a file: `/` becomes `/index.html`, and the file is read from the folder next to `server/` and sent back with the right `Content-Type`. One check matters more than it looks: `normalize()` collapses a path like `/../server/store.js` before it is compared against the client folder, so a request cannot read files it has no business reading. Course 5.5 studies this class of bug, called **path traversal**, in depth.

### Step 10: the settings panel (TODOs 10-11)

`js/main.js` loads settings when the page opens, by trying `fetch('/api/settings')` first. If that fails for any reason — no server at all, a network error, or (as in this repository's own accessibility checks) a plain static file server that answers `/api/settings` with its own 404 — the page falls back to `localStorage`, and says so:

```js
setStatus('Server not running: settings are saved in this browser only.', 'offline');
```

Once that fallback engages, every later Save and Reset also goes straight to `localStorage`, rather than trying (and failing) the API again on every click. This is what makes `completed/index.html` work as a plain file on a plain static server, which is exactly how this repository's own accessibility checks load it.

### Step 11: the exhibit reads the settings (TODO 12)

`js/scene.js`'s `applySettings(settings)` is the one function that turns a settings object into what three.js actually shows: which exhibits are visible, which of four fixed camera positions to jump to, and whether the jade stone is allowed to turn. It is called once when the page loads, and again every time Save changes the settings — so the 3D view is never more than one settings object away from correct, the same rule Course 3.4's `describeExhibit()` used for its text description.

### Step 12: testing with `node:test` (TODO 13)

`node:test` and `node:assert` ship with Node itself: no package to install, and `npm test` (or `node --test`) runs them. `server.test.js` starts the real server on a free port (`listen(0)`) and a throwaway settings file, then calls its routes with `fetch()`, the same way `curl` or the browser does. A test that fails names the exact line and the exact values it expected versus what it got — much faster than clicking through the form every time you change a line of `routes.js`.

## Key code explained

**`process.loadEnvFile()`.** Added to Node without any package: it reads a `.env` file into `process.env`. Wrapped in `try`/`catch` here because a fresh checkout has no `.env` yet, and that must not be an error.

**`readJsonBody(req)` returns a Promise.** `req` is a stream: data arrives in chunks over time, not all at once, so reading a full body means listening for `'data'` events, collecting them, and resolving once `'end'` fires. This is the same shape Course 2.1's `fetch()` calls resolve in, just running on the server instead of in the browser.

**`structuredClone(DEFAULT_SETTINGS)`.** Copies an object deeply, built into modern JavaScript. Without it, `resetSettings()` would hand out the same array reference every time, and a later change to a caller's copy could silently rewrite the shared defaults.

**`import.meta.url === pathToFileURL(process.argv[1]).href`.** A module-level "is this file being run directly?" check. It lets `server.test.js` `import` the server (to get the `server` object) without that import itself starting to listen on a real network port.

**`normalize(join(CLIENT_DIR, requestedPath))`.** `join` alone would happily build a path containing `..`; `normalize` collapses those segments so the traversal check that follows can actually catch them.

## 3D and XR accessibility

The exhibit's view is deliberately small: a fixed camera at one of four presets, with no dragging to get lost in, and the jade stone the only thing that ever moves. That smaller surface still needs the same checks every 3D scene in this course does:

- **Scene description** (`#scene-description`): built from the same `EXHIBITS` list and the same settings object the 3D view reads, so the words can never disagree with the picture.
- **2D fallback**: the exhibit list below the 3D view names every exhibit and whether it is currently shown, whether or not WebGL works at all.
- **Keyboard route for every interaction**: every control here is an ordinary checkbox, radio button, `<select>`, or `<button>` — there is no dragging, no hover-only control, and no interaction that only a mouse can reach.
- **Reduced motion**: a first-time visit checks `prefers-reduced-motion` and starts paused if it is set; **Pause animation** always works too, and its label and `aria-pressed` state always match what is actually happening, not what the button said when the page loaded.
- **Comfort**: the camera only ever moves to a position you chose (one of the four presets); it never moves on its own, and nothing zooms, tilts, or shakes without you asking for it.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| Every form field has a visible label, in HTML | 1.3.1, 3.3.2 | A checkbox or radio with no `<label>` has no name a screen reader can announce. |
| Field errors from a 400 response appear as text next to the form | 3.3.1 | The message stays readable, and stays put, instead of vanishing like an `alert()`. |
| The status banner is a live region (`role="status"`) | 4.1.3 | "Settings saved" and the offline message reach screen-reader users without them having to go looking for it. |
| The visible word starts each button's accessible name | 2.5.3 | "Save settings", not an icon a speech user cannot say aloud. |
| The 3D scene can be paused, and respects reduced motion | 2.2.2 | Movement is never forced on anyone; the setting persists, and is a real, standing choice, not a one-off dismissal. |
| `role="list"` on every list styled with `list-style: none` | Good practice | Safari drops list semantics once the bullet is removed with CSS. |

## Performance considerations

This server reads and writes one small JSON file per request that needs it — fine for one learner's settings, and a deliberate contrast with a real multi-user service, where every request touching disk would not scale. The 3D scene stays intentionally light: three simple meshes, no textures, and animation limited to one object, so the lesson's weight sits in the API, not the rendering. `renderer.setAnimationLoop(null)` while the tab is hidden (`visibilitychange`) means an idle tab with the settings panel open costs nothing.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Trusting the request body without validating it | A learner (or a bug) sends `{}` and your saved file becomes useless | Call `validateSettings()` before anything is saved, every time |
| Returning `200` for every response, even errors | The client cannot tell success from failure without reading the body | Use the status code that matches what happened (see the table in Step 5) |
| Forgetting the CORS headers on the `OPTIONS` preflight, only adding them to the real request | The browser blocks the real request before it is ever sent | Call `setCorsHeaders(res)` for every request, `OPTIONS` included |
| Reading `process.env.PORT` with no fallback | The server crashes immediately on a machine with no `.env` file | `Number(process.env.PORT) \|\| 8877` |
| Assuming the API is always there | The client throws on a plain static server, or with no network at all | Try the API, fall back to `localStorage`, and say so |

## Troubleshooting

**`curl: (7) Failed to connect`.** The server is not running, or is on a different port than you expect. Check `.env`'s `PORT`, and the message `node server.js` printed.

**`EADDRINUSE`.** Something else is already listening on that port (perhaps a server you started earlier and forgot to stop). Stop it, or change `PORT` in `.env`.

**The settings panel says "Server not running", even though `node server.js` is running.** You opened `index.html` through a *different* server (or directly as a file), not through the Node server on port 8877. Open `http://127.0.0.1:8877/` instead — Course 5.1's server serves the client itself.

**`fetch` fails in the console with a CORS error** (Firefox: "Cross-Origin Request Blocked"; Safari: "Origin ... is not allowed by Access-Control-Allow-Origin"). Finish TODO 8, and make sure `ALLOWED_ORIGIN` in `.env` matches (or is `*`).

**`node --test` hangs, or a later run reuses old data.** Make sure `server.test.js` sets `process.env.DATA_FILE` to a temporary path *before* `server.js` is imported — once a module is loaded, its top-level constants (like `DATA_FILE`) do not re-read the environment.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: add a `GET /api/health` route, and a fifth setting.
2. **[Creative](challenges/challenge-2.md)**: add exhibits and camera presets of your own, in your own language.
3. **[Explorer](challenges/challenge-3.md)**: add a settings history the server keeps, and an "undo" route.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take a screenshot of the settings panel, and one of your terminal showing every `node --test` check passing.
3. Keep them in your learner journal and portfolio. When the XR Camp community opens, share them there.
4. In your journal, answer: which status code surprised you most once you understood what it actually promises a client, and why?

## Further reading

- [MDN: An overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
- [MDN: HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [Node.js docs: node:http](https://nodejs.org/api/http.html)
- [Node.js docs: node:test](https://nodejs.org/api/test.html)
- [MDN: Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

## Women to Know

**Marcia Villalba** is a Uruguayan software engineer based in Helsinki. She spent about seven years, from 2019 to 2026, as a Principal Developer Advocate on AWS's serverless team and is an AWS Serverless Hero, and she founded Desplegando.cloud, a Spanish-language community, YouTube channel, and course platform teaching AWS, serverless computing, and AI agents.

Explaining how a server, an API, and a client fit together — clearly, and in your own language — is exactly the skill this lesson asks you to practise for the first time. Marcia has spent years doing precisely that for the Spanish-speaking developer community, from AWS's own stage to a platform she built herself.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

This server speaks **HTTP**, standardised by the IETF (most recently HTTP semantics in RFC 9110), including the status codes this lesson leans on. `fetch()`, the request and response objects it exchanges, and CORS are all part of the WHATWG's **Fetch Standard**; the JSON your API sends and receives follows **ECMA-404**, the JSON data-interchange format. None of these need a framework to use correctly, only an understanding of what each one promises.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
