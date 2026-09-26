# Starter — Security and Privacy for Spatial Applications

Begin here. This app **runs correctly as-is** — signing in, saving scenes, leaving annotations, and chatting all work. That is the point: this is a review sprint, not a fill-in-the-blanks lesson. Seven numbered TODOs, in `server/routes.js`, `server/realtime.js`, `server/server.js`, and `server/config.js`, mark real, working vulnerabilities.

- `server/cookies.js`, `sessions.js`, `auth.js`, `rateLimit.js`, `wsAuth.js`, `rooms.js` are carried over unchanged from Course 5.4 — no bug, no TODO.
- `server/db.js`, `validation.js`, `sanitize.js` are new for this lesson and are not themselves the bug — they exist and work; TODO 1, 2, and 7 are about code that fails to *call* them.
- `server/config.js` (TODO 4), `server/routes.js` (TODO 1, 5, 6, 7), `server/realtime.js` (TODO 2), and `server/server.js` (TODO 3, 6) hold the seven review targets. Every file with a bug repeats **DELIBERATELY VULNERABLE — for learning on localhost only; never deploy** at its top.
- `js/main.js` has two of its own TODOs (1b, 2b) — the client-side half of the two stored-XSS bugs.

From `server/`, run `npm test` now, before changing anything: every one of the eight tests should fail. Each failure names the vulnerability it checks for.

Open everything through a local server (`http://`, not `file://`).

Full instructions: [`../README.md`](../README.md).
