# Starter — Phase 5 Capstone - Full-Stack Spatial Application

Begin here. Read [`brief.md`](brief.md) and [`rubric.md`](rubric.md) first — this capstone starts with a brief, like Course 3.7's.

This app **already runs correctly, end to end**, before you change anything: accounts, saved scenes, annotations, and real-time chat are Course 5.5's fixed server, carried over unchanged, including all seven of that lesson's security fixes. Six numbered TODOs (8-13, continuing after 5.5's 1-7, which are already fixed) add this capstone's own feature: an AI description draft for a scene, reviewed by a person before it is ever saved.

- `server/ai.js` (TODO 8), `server/routes.js` (TODO 9, TODO 10), and `server/server.js` (TODO 11) are the server-side TODOs.
- `js/ai.js` (TODO 12) and `js/main.js` (TODO 13) are the client-side TODOs.
- Every other file — `auth.js`, `cookies.js`, `sessions.js`, `rateLimit.js`, `wsAuth.js`, `rooms.js`, `realtime.js`, `db.js`, `validation.js`, `sanitize.js`, `config.js`, `env.js` — is carried over from Course 5.5, unchanged, and holds no TODO.

From `server/`, run `npm test` now, before changing anything: 8 of 10 tests should already pass. The last two, for this capstone's own feature, will pass once TODOs 8-13 are all done.

Open everything through a local server (`http://`, not `file://`).

Full instructions: [`../README.md`](../README.md).
