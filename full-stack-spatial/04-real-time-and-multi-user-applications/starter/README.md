# Starter - Real-Time and Multi-User Applications

Begin here.

- `server/db.js`, `auth.js`, `sessions.js`, `rateLimit.js`, `cookies.js`, and `routes.js` are finished, carried over from Courses 5.2 and 5.3 — this lesson is not re-teaching accounts or SQLite.
- 16 numbered TODOs are spread across `server/validation.js`, `server/sanitize.js`, `server/wsAuth.js`, `server/rooms.js`, `server/realtime.js`, `server/server.js`, `server/server.test.js`, `js/net.js`, `js/scene.js`, and `js/main.js`.
- Until TODO 10 (`server.js`'s `upgrade` handler) is finished, signing in works but nothing ever connects to the room — that is expected, not a bug.
- `npm install` (from `server/`) is required before the server will start — this lesson installs its first dependency, `ws`.

Open everything through a local server (`http://`), never `file://` — the account and room panels need to reach the Node.js server's `/api/...` and `/ws` endpoints.

Full instructions: [`../README.md`](../README.md).
