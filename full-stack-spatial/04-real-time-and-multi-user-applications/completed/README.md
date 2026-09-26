# Completed - Real-Time and Multi-User Applications

Reference solution. Compare against your own work only after you have attempted the project.

This page (`index.html`) works as a static file on its own — including for the automated accessibility check this course runs — but signing in, joining the room, and everything after that needs the Node.js server running:

1. `cd server`, then `npm install` (installs `ws`, this lesson's one dependency), then copy `.env.example` to `.env`.
2. `node server.js` — you should see `Real-time room server listening on http://127.0.0.1:8880` and, once, a one-line `ExperimentalWarning: SQLite is an experimental feature` (both expected).
3. Serve this whole repository from its root (for example `python3 -m http.server 8766`) and open this page over `http://`, not `file://`.
4. Register two accounts, in two browser windows or tabs, and sign in as each, to see the room work with more than one member.

`npm test` (or `node --test`, from `server/`) runs the automated test suite, including two real `ws` clients joining the same room.
