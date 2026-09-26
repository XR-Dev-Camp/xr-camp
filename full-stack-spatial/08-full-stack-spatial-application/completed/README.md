# Completed — Phase 5 Capstone - Full-Stack Spatial Application

The reference solution. Open it after you have tried the starter — ideally after `npm test` is fully green there on your own.

This is Course 5.5's fixed server (accounts, scenes, annotations, real-time chat, and all seven security fixes), plus this capstone's own AI description draft: `server/ai.js` builds a draft with a deterministic, offline "mock" provider; `server/routes.js` and `server/server.js` expose it as `POST /api/scenes/:id/describe` (any viewer) and `PUT /api/scenes/:id/description` (owner only); and `js/ai.js` and `js/main.js` let a person read, edit, and save one from the browser. A draft is never saved automatically.

Also here: [`SECURITY.md`](SECURITY.md), this project's responsible-disclosure policy, and [`CHANGELOG.md`](CHANGELOG.md), this version's release notes.

From `server/`, run `npm install` then `npm test`: all ten tests pass.

Open everything through a local server (`http://`, not `file://`).

Full instructions: [`../README.md`](../README.md). Deployment notes: [`../deployment-notes.md`](../deployment-notes.md).
