# Completed — Authentication and User Accounts

The reference solution. Open it after you have tried the starter.

- `server/`: a finished Node.js account API (`server.js`, `routes.js`, `auth.js`, `sessions.js`, `rateLimit.js`, `validation.js`, `store.js`), its tests (`server.test.js`), and its own `package.json` (no dependencies) and `.env.example`.
- The client (`index.html`, `styles.css`, `js/`) is served by that same server as static files, so `http://127.0.0.1:8878/` shows the whole thing together.
- Run it: `cd server && node server.js`, then open `http://127.0.0.1:8878/`.
- Test it: `cd server && node --test` (or `npm test`). Some tests hash a password at the OWASP-recommended scrypt cost, so the suite takes real time (tens of seconds) — that slowness is the point, not a bug.
- Try `CURATOR_USERNAMES=curator-jane` in `.env` before registering an account with that username, to see the curator-only note editor and dashboard.
- This page also works with no server at all — open `index.html` through any plain static server, or the way this repository's own accessibility checks load it. Accounts and saved settings need the server; the exhibit itself still renders with its defaults.

**This is a learning prototype.** Read "This is a learning prototype" at the bottom of the page, and the README's own warnings, before reusing any of this design for a project with real users.

Full instructions: [`../README.md`](../README.md).
