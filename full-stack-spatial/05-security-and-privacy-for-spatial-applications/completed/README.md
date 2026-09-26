# Completed — Security and Privacy for Spatial Applications

The reference solution. Open it after you have tried the starter — ideally after `npm test` is fully green there on your own.

Every one of the starter's seven vulnerabilities is fixed here: sanitised annotations and chat (rendered with `textContent`, never `innerHTML`), a strict `Content-Security-Policy` header, `APP_SECRET` loaded from the environment (`config.js`, `.env.example`), `getScene` checking ownership or public visibility on every request, generic error messages (`formatServerError`) with the real error still logged server-side, and a scene's location rounded before it is ever stored (`roundLocation`).

Also here: [`SECURITY.md`](SECURITY.md), this project's own responsible-disclosure policy — read it as a worked example, not only as documentation.

From `server/`, run `npm install` then `npm test`: all eight tests pass. Run `npm audit` to see what it checks (and does not check) about this project's one dependency.

Open everything through a local server (`http://`, not `file://`).

Full instructions: [`../README.md`](../README.md).
