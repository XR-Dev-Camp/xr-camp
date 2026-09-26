# Deployment notes

This capstone is built to run on `127.0.0.1` and stay there. These notes explain what "deploying" it responsibly can mean, at two scales, with no paid service required at either.

## Option 1: your own computer (recommended, and what this lesson tests)

This is the only setup the completed reference and its tests assume.

1. Install [Node.js](https://nodejs.org/) LTS (22.5 or later, for `node:sqlite`).
2. `cd completed/server` (or `starter/server` while you work through the TODOs).
3. `npm install` -- installs exactly `ws@8.21.3` (see the repository's `versions.json`), pinned, with no lockfile committed.
4. Copy `.env.example` to `.env` and set your own `APP_SECRET` (see that file's own comment; never reuse the example value).
5. `npm start`. The server prints the address it is listening on -- open it in a browser.
6. `npm test` runs the test suite in a temporary SQLite file, never your real `server/data/spatial.sqlite`.

Nothing here ever binds to `0.0.0.0`: `server.js` hardcodes `127.0.0.1` on purpose (see its own comment), so this server is never reachable from another device on your network by accident.

## Option 2: a small server you control (a low-cost VPS, or a spare machine)

If you want classmates, a mentor, or family to try your build without them installing Node.js themselves, you can run it on a small server you already have access to -- for example a low-cost VPS, a Raspberry Pi on your own network, or a spare laptop. This still needs no paid service beyond whatever you already pay for that machine (many student and open-source plans offer a free small VPS; check current terms yourself, as offers change).

Changes from Option 1, in order:

1. Set `PORT` and `ALLOWED_ORIGIN` in `.env` to match how you will reach the server (for example, `ALLOWED_ORIGIN=http://your-server-address:8891`).
2. **Put a reverse proxy in front of it** (for example [Caddy](https://caddyserver.com/) or nginx) so the public-facing connection uses HTTPS -- this server itself speaks plain HTTP only, and the session cookie's `Secure` attribute (see `routes.js`'s `setSessionCookie`) is only set when the connection in front of it is already HTTPS.
3. Keep the server process itself bound to `127.0.0.1` and have the reverse proxy forward to it -- do not change `HOST` in `server.js` to `0.0.0.0` unless you understand exactly who else that exposes the port to.
4. Back up `server/data/spatial.sqlite` before you experiment further (see Course 5.3's "backups" material) -- this project has no automatic backup of its own.
5. Tell anyone using it plainly that this is a course project, not an audited service (see `SECURITY.md` and `completed/index.html`'s "Before you reuse this" notice) -- do not store anyone's real personal data in it.

## What this project is not built for

Running it reachable from the open internet with no reverse proxy, no HTTPS, and no one reviewing its code beyond this course. If you want to go further than either option above, treat that as its own project: a real security review, real backups, and real monitoring, none of which this capstone provides.
