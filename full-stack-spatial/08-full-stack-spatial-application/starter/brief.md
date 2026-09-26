# Brief: the Phase 5 capstone

You have spent Phase 5 building one small full-stack spatial app, one lesson at a time: an API for saved settings (5.1), accounts with hashed passwords and sessions (5.2), scenes and annotations in SQLite (5.3), a real-time shared room over WebSockets (5.4), a review-and-fix security sprint (5.5), an optional AI-assisted feature (5.6), and offline delivery (5.7, built separately). This capstone asks you to bring the server side of that work together into one small, honestly-documented app.

## What you will find already done for you

Both `starter/` and `completed/` in this folder begin from Course 5.5's already-fixed server: accounts, saved scenes with an optional rounded location, annotations, a real-time chat room, and every one of that lesson's seven security fixes (sanitised text, a strict Content Security Policy, a secret read from the environment, an IDOR check on the scene endpoint, generic error messages, and location data minimisation). None of that is a TODO here -- it is the working foundation this capstone builds one small feature on top of.

## What you will add

An optional **AI description draft** for a scene, following Course 5.6's own rule: provider-neutral in shape, a "mock" (deterministic, offline) provider that always works with no key and no cost, and -- the part that matters most -- a draft is never saved on its own. A person must read it, edit it if they choose, and press Save before it ever reaches the database. Six numbered TODOs, across `server/ai.js`, `server/routes.js`, `server/server.js`, `js/ai.js`, and `js/main.js` (TODOs 8-13; TODOs 1-7 are Course 5.5's, already fixed), wire this feature end to end. See [`../README.md`](../README.md) for the full walkthrough.

## What is checked, beyond the TODOs

1. **Every inherited 5.5 fix still holds** -- `server/server.test.js`'s first eight tests prove this on both `starter/` and `completed/`.
2. **No new vulnerability**: the description feature reuses the same ownership check as `getScene` for reading a draft, and a stricter owner-only check for saving one, and runs saved text through the same `sanitizeText` every other stored field uses.
3. **A working demo page**: `completed/index.html` (and `starter/index.html`, before you finish the TODOs) is a static page that keeps working, and stays accessible, even with the server not running -- the CI accessibility check never starts a server.
4. **Deployment notes**: [`../deployment-notes.md`](../deployment-notes.md) explains how to run this on your own computer, or on a small server you control, with no paid service required.
5. **Release notes**: `CHANGELOG.md`'s `1.0.0` entry, describing what this capstone shipped.

## How you will be assessed

See [`rubric.md`](rubric.md).
