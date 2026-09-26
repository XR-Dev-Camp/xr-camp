# Authentication and User Accounts

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `full-stack-spatial` · **Lesson:** `authentication-and-user-accounts-02` · **Time:** about 19 hours · 25 sessions of 45 minutes · about 6 weeks at 4 sessions a week

---

> Build a secure learner account and profile prototype.

---

## Learning objectives

By the end of this project you will be able to:

1. Hash a password with **`node:crypto`'s `scrypt`**, using a random per-user salt and the parameters the OWASP Password Storage Cheat Sheet currently recommends, and check a password against that hash with **`timingSafeEqual`** instead of `===`.
2. Explain, in plain language, why a session id is a bearer token, generate one with **`randomBytes`**, and enforce both an idle and an absolute timeout for it, on the server.
3. Set a session cookie with **`HttpOnly`**, **`SameSite=Lax`**, and **`Secure`** (only when the request is actually over HTTPS), and explain what each attribute stops.
4. Add **CSRF protection** to every state-changing request with the synchronizer-token pattern, and explain why a cookie alone cannot prove a request came from your own page.
5. Add a simple, honest, in-memory **rate limit** to login and account recovery, and describe its real limits.
6. Separate **ownership** (whose row is this?) from a **role** (what is this account allowed to do?), and enforce each with a different check.
7. Design **account recovery**, **privacy controls**, **data export**, and **account deletion** without an email service, and explain the trade-offs each design accepts.
8. Explain what a **passkey** (WebAuthn) removes from this entire lesson, and know where to read the specification.

## Prerequisites

- **Course 5.1: Backend and API Foundations** (the exhibit settings API, `node:http`, routes, validation, environment variables, and CORS — this lesson adds accounts on top of it).
- **Course 2.1: Modern JavaScript** (`async`/`await`, modules, `try`/`catch`).
- Comfort running commands in a terminal, and reading a JSON response with `curl`.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| Node.js, an LTS version (22 or later) | Runs the server and its tests; nothing else to install | Free |
| A modern browser, with its developer tools | Testing the client, and reading cookies and network requests | Free |
| A terminal | Starting the server, running `curl` and `npm test` | Free |
| VS Code (or any editor) and a local server for the client-only view | Modules need `http://`, not `file://` | Free |

Node.js runs the same way on Windows, macOS, and Linux, and its installer works without a paid account anywhere, including mainland China (download it directly from [nodejs.org](https://nodejs.org/), or via a package manager such as `winget`, Homebrew, or `apt`).

## What you will build

Course 5.1's exhibit had one settings file, shared by everyone who opened the page. This lesson gives every learner their own **account**: a username and a password only they know, protecting their own saved exhibit settings from everyone else — including each other. Two **roles** exist: a **visitor** (the default) can only ever read or change their own settings, while a **curator** can additionally write a short note every visitor sees, and see which accounts chose to share their settings.

Almost everything you build here answers one question a real product has to answer honestly: *what happens when this goes wrong?* What happens when someone tries a thousand passwords? When a cookie leaks? When a tab is left signed in on a shared computer? When someone wants to leave and take their data with them? This lesson does not skip those questions to get to a demo faster — they are the lesson.

The reference solution is in [`completed/`](completed/): a `server/` folder (`server.js`, `routes.js`, `auth.js`, `sessions.js`, `rateLimit.js`, `validation.js`, `store.js`) and, next to it, the same kind of client Course 5.1 built (`index.html`, `styles.css`, `js/`), served as static files by that same server. The starter has **21 TODOs** across both.

**This is a learning prototype, not production security advice.** It follows current, specific guidance (cited throughout, and checked against Node's own documentation and the OWASP Cheat Sheet Series while this lesson was written) as closely as a one-process, one-machine, no-database course project can. Before any of this design protects a real account, have it reviewed by someone with security expertise — and read Course 5.5, which comes back to find and fix planted vulnerabilities in a project just like this one.

## Folder guide

```text
02-authentication-and-user-accounts/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html, styles.css   # The client page: finished
│   ├── js/main.js       # The account and settings panels: TODOs 17-20
│   ├── js/scene.js      # The 3D view: finished (Course 5.1's work)
│   └── server/
│       ├── server.js        # Routing, cookies, CORS, static files: TODO 16
│       ├── routes.js        # Route handlers: TODOs 8-15
│       ├── auth.js          # Password/recovery-code hashing: TODOs 1-2
│       ├── sessions.js      # The session store and CSRF tokens: TODOs 4-5
│       ├── rateLimit.js     # Failed-attempt counting: TODO 6
│       ├── validation.js    # validateCredentials(): TODO 3
│       ├── store.js         # Accounts and the curator's note on disk: TODO 7
│       ├── server.test.js   # node:test: TODO 21
│       ├── .env.example     # Copy to .env to change PORT, CURATOR_USERNAMES, etc.
│       └── package.json     # "type": "module", no dependencies
├── completed/            # Reference solution: open this last
├── challenges/            # Three challenges: Foundation is required
├── tests/checklist.md    # Self-review before you submit
├── assets/
└── screenshots/
```

This lesson's `package.json` still lists no dependencies: every server file uses only what Node ships with (`node:http`, `node:crypto`, `node:fs`, `node:test`, and so on). Course 5.4 is the first to add a real package (`ws`, for WebSockets), pinned to an exact version in this repository's `versions.json`.

## Setup

1. Make a new folder, `exhibit-accounts`, next to your other XR Camp projects, and copy the `starter/` folder's contents into it.
2. Open a terminal in its `server/` folder and check your Node version: `node --version`. You need 22 or later.
3. Copy `.env.example` to `.env` in that same folder. Set `CURATOR_USERNAMES` to a username you plan to register (for example `curator-jane`) before you reach Step 13, so you have a curator account to test with.
4. Start the server once you reach Step 16: `node server.js` (or `npm start`). Stop it any time with Ctrl+C.
5. To view the client on its own, without the API (as it will be tested), open `index.html` through any local server, such as `python3 -m http.server 8766`.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Setup; read `auth.js`, `sessions.js`, `rateLimit.js`, `store.js`, and `routes.js` to see what is already finished | A one-sentence job description for each server file |
| 2 | Step 1: hashing and checking a password (TODO 1) | Typing the same password twice into `hashSecret()` in the Node REPL produces two *different* strings, and `verifySecret()` says both are correct |
| 3 | Step 2: a one-time recovery code (TODO 2) | `generateRecoveryCode()` in the REPL returns a readable, hyphen-grouped string each time |
| 4 | Step 3: validating a username and password (TODO 3) | Typing a too-short password and a username with a capital letter into `validateCredentials()` shows which rule failed, and that the username came back lower-cased |
| 5 | Step 4: sessions, and two timeouts (TODO 4) | Calling `createSession()` then `getSession()` in the REPL returns the session; calling `getSession()` with a made-up id returns `null` |
| 6 | Step 5: comparing a CSRF token safely (TODO 5) | `verifyCsrfToken()` returns `true` only for the exact token a session was given |
| 7 | Step 6: a simple rate limit (TODO 6) | Calling `recordFailedAttempt()` five times, then `isRateLimited()`, returns `true`; a sixth call still returns `true` |
| 8 | Step 7: accounts on disk (TODO 7) | `insertAccount()` then `findAccountByUsername()` in the REPL returns the same account back |
| 9 | Step 8: cookies, `requireAuth`, and `requireCsrf` (TODO 8) | Reading through your own code, you can explain what each of the four cookie attributes does |
| 10 | Step 9: `POST /api/auth/register` (TODO 9) | A `curl` registration returns `201`, a public account object, and a recovery code |
| 11 | Step 10: `POST /api/auth/login` (TODO 10) | A correct login sets a cookie; a wrong password and an unknown username get the exact same `401` and message |
| 12 | Step 11: logout and `GET /api/auth/me` (TODO 11) | Logging out, then requesting `/api/settings` with the old cookie, returns `401` |
| 13 | Step 12: settings, owned per account (TODO 12) | Two accounts, tested with two different cookies, never see or change each other's settings |
| 14 | Step 13: the curator's note and dashboard (TODO 13) | A visitor account gets `403` trying to edit the note; your curator account can |
| 15 | Step 14: account recovery (TODO 14) | A recovery code from registration resets a password, issues a new code, and signs every device out |
| 16 | Step 15: privacy, export, and deletion (TODO 15) | `GET /api/account/export` downloads your data; `DELETE /api/account` needs your password |
| 17 | Step 16: wiring the server (TODO 16) | `node server.js` starts, and `http://127.0.0.1:8878/` shows the (still unfinished) page |
| 18 | Step 17: loading the session, settings, and note on open (TODO 17) | Reloading the page while signed in keeps you signed in |
| 19 | Step 18: the account forms (TODO 18) | You can register, save your recovery code, sign in, sign out, and reset a password with it, all from the page |
| 20 | Step 19: your settings and the curator's note (TODO 19) | Saving settings changes the 3D view; your curator account can edit the shared note |
| 21 | Step 20: privacy, export, and deletion, in the browser (TODO 20) | The privacy checkbox, the download button, and account deletion all work from the page |
| 22 | Step 21: testing with `node:test` (TODO 21) | `node --test` prints every test passing (the suite takes real time — see Step 21) |
| 23 | [`tests/checklist.md`](tests/checklist.md), and the 3D and XR accessibility checks below | A finished account and settings panel |
| 24 | One challenge extension | — |
| 25 | **Submitting your work** | Screenshots and a journal entry |

### Step 1: hashing and checking a password (TODO 1)

A password must never be stored as the learner typed it: anyone who ever reads the file (a bug, a backup, an attacker) would read every password in it. **`scrypt`** (built into `node:crypto`, checked against the [Node.js `crypto.scrypt` docs](https://nodejs.org/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback)) turns a password into a **hash** that is deliberately slow and memory-hungry to compute, so trying millions of guesses against a stolen file is slow too. The [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)'s current primary recommendation for scrypt is `N=2**17, r=8, p=1` — about 128 MiB of memory per hash, which is why `auth.js` raises scrypt's own `maxmem` option above its 32 MiB default:

```js
export const SCRYPT_PARAMS = { N: 2 ** 17, r: 8, p: 1 };
// r * 128 * N bytes ≈ 128 MiB
```

Every password also gets its own random **salt** (`randomBytes(16)`), so two accounts with the same password never produce the same hash — without a salt, an attacker could compare every stored hash against one pre-computed table of common passwords, once, for every account at the same time. The salt is not a secret: it is stored right next to the hash, in one string this lesson's format keeps together: `scrypt$N$r$p$saltHex$hashHex`.

Checking a password means recomputing the same hash and comparing it to what was stored — with **`crypto.timingSafeEqual`**, never `===`:

```js
return timingSafeEqual(actual, expected); // not `actual === expected`
```

`===` on two byte strings compares left to right and stops at the first mismatch, so how long it takes leaks how many leading bytes were already correct — a **timing side channel**. `timingSafeEqual` always takes the same time for two buffers of the same length (and throws if the lengths differ, which is why `verifySecret()` builds `actual` to `expected`'s own length before calling it).

### Step 2: a one-time recovery code (TODO 2)

The same `hashSecret()`/`verifySecret()` pair from Step 1 protects a second kind of secret: a **recovery code**, generated once at registration (`randomBytes(10)`, formatted into readable groups) and shown to the learner exactly once. Course 5.5's cheat sheet reading habit applies here too: nothing new to learn about *storing* this secret, because it is stored exactly like a password.

### Step 3: validating a username and password (TODO 3)

`validateCredentials()` follows [NIST SP 800-63B](https://pages.nist.gov/800-63-3/sp800-63b.html) (Digital Identity Guidelines, section 5.1.1.2): check a password's **length**, not its composition. No rule here demands a symbol, a number, or a capital letter — those rules push people toward predictable substitutions (`P@ssw0rd1`) without meaningfully slowing a real attacker down, and NIST's own guidance dropped them. This course's minimum (10 characters) is a deliberately conservative floor above NIST's own minimum of 8. Usernames are trimmed and lower-cased before every check and every lookup, so "Ana" and "ana" are always the same account.

### Step 4: sessions, and two timeouts (TODO 4)

A **session id** is a bearer token: whoever holds it is treated as that account, so `createSession()` generates one with `randomBytes(32)` — 256 bits, far above the 64-bit minimum the [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) asks for — never `Math.random()` or a counter, which an attacker could predict. `getSession()` enforces two timeouts, both checked on the server (never trusting a client's clock): an **idle timeout** (30 minutes of no requests) and an **absolute timeout** (8 hours, even in constant use). A session that has expired either way is deleted the next time anyone tries to use it.

### Step 5: comparing a CSRF token safely (TODO 5)

`verifyCsrfToken()` uses the same `timingSafeEqual` pattern as Step 1's password check, for the same reason: comparing a secret token with `===` would leak it one byte at a time. What a CSRF token actually protects against is explained fully in Step 8, once `requireCsrf()` exists to use it.

### Step 6: a simple rate limit (TODO 6)

`rateLimit.js` counts failed attempts per key (`login:<username>` or `recover:<username>`) in a plain `Map`, and blocks a sixth attempt within 15 minutes with `429 Too Many Requests`. This is a real, working limit — and also a real, documented one: it lives in one process's memory, so a restart clears it, and knowing a username is enough to lock its owner out for the window, on purpose, by failing its password a few times. A production service adds per-IP limits and often a CAPTCHA alongside this, and shares its counters across every server process (Course 5.8).

### Step 7: accounts on disk (TODO 7)

`store.js` is the only file that touches the disk, the same rule Course 5.1's `store.js` followed. Every account is one JSON object — `{ id, username, passwordHash, recoveryCodeHash, role, privacySharesSettings, settings, createdAt }` — inside one array, in `data/accounts.json`. `passwordHash` and `recoveryCodeHash` are always the self-describing strings Step 1 produces, never plain text.

### Step 8: cookies, `requireAuth`, and `requireCsrf` (TODO 8)

Four cookie attributes, and what each one stops:

| Attribute | Stops |
| --- | --- |
| `HttpOnly` | JavaScript (this page's own code, or an attacker's, if it ever ran here) from reading the cookie with `document.cookie`. |
| `SameSite=Lax` | Most cross-site requests from carrying the cookie at all — one layer of CSRF defence, not the whole defence. |
| `Secure` (only added when the request is over HTTPS) | The cookie from ever being sent over an unencrypted connection. See "Troubleshooting" for what this means on `http://127.0.0.1`. |
| `Max-Age` | The cookie outliving the session it names — the browser deletes it on its own once this many seconds pass. |

`requireAuth(req)` reads the `sid` cookie server.js will have parsed into `req.cookies`, looks up the session, and loads the account it belongs to — every protected route starts with this one check. `requireCsrf(req, session, res)` is a second, separate check, used only before something changes: it compares an `X-CSRF-Token` header against the token this session was given at login. **A cookie alone cannot prove a request came from your own page**, because a browser attaches cookies automatically to a request from *any* site — including one an attacker built specifically to make your browser do something you never asked for, using a session you happen to already be signed into. That is what "Cross-Site Request Forgery" means, and it is exactly what a custom header a cross-site `<form>` cannot add on its own prevents (the [OWASP CSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) calls this the synchronizer-token pattern).

### Step 9: `POST /api/auth/register` (TODO 9)

Creates an account with role `visitor` (or `curator`, if the username is in `CURATOR_USERNAMES`), hashes its password and a fresh recovery code, and returns the recovery code exactly once. Registering does **not** sign you in — Step 10's login is a separate, deliberate step, so a learner is never signed in without having proved a password once.

```sh
curl -i -X POST http://127.0.0.1:8878/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"ana","password":"a-very-good-password"}'
```

### Step 10: `POST /api/auth/login` (TODO 10)

The single most important line in this route is the one that treats "no such account" and "wrong password" identically:

```js
if (!account || !passwordOk) {
  recordFailedAttempt(rateLimitKey);
  return sendJson(res, 401, { error: 'Invalid username or password.' });
}
```

Telling them apart is exactly how an attacker builds a list of real usernames one guess at a time. A correct login creates a new session (never reusing one that existed before login — that is what protects against **session fixation**, an attacker handing a victim a session id in advance) and sets the cookie described in Step 8.

### Step 11: logout and `GET /api/auth/me` (TODO 11)

Logout is itself a state-changing request, so it needs the same CSRF check every other one does. `GET /api/auth/me` exists because a page reload loses the CSRF token this course keeps only in memory (never in a second, JavaScript-readable cookie): the client calls it once, on load, to recover its own token from the session that is still valid server-side.

### Step 12: settings, owned per account (TODO 12)

The whole idea of "ownership" fits in one line:

```js
const updated = await updateAccount(auth.account.id, { settings: value });
```

`auth.account.id` comes from the **session**, never from anything the client sent in the request body. A client could type any id it wanted into a JSON body; it is never asked to, and never trusted if it tried. Course 5.3 calls this same rule "permissions per row" once a real database is involved.

### Step 13: the curator's note and dashboard (TODO 13)

A role check answers a different question than `requireAuth`'s "are you signed in?" — it asks "are you allowed to do *this*, specifically?":

```js
if (auth.account.role !== 'curator') {
  return sendJson(res, 403, { error: 'Only a curator can edit this note.' });
}
```

`listSharedAccounts()` filters by `privacySharesSettings` *before* it ever builds a response — an account that never opted in never appears in the curator's dashboard, in any form, not even a hidden one.

### Step 14: account recovery (TODO 14)

This course has no mail server, so there is no "reset link sent to your email." Instead, the one-time recovery code from Step 9 stands in for it: whoever can prove they hold that code may set a new password. Losing both the password and the recovery code means the account cannot be recovered — a real, accepted trade-off for a project this size, and one worth naming out loud rather than hiding. A successful recovery revokes every existing session for the account (`destroyAllSessionsForUser`), because changing a password is a credential change, and OWASP's Session Management Cheat Sheet asks for exactly that.

### Step 15: privacy, export, and deletion (TODO 15)

Two small, deliberate design choices: `updatePrivacy()` is the only way `privacySharesSettings` changes, and it always applies to `auth.account.id`, never a body-supplied id. `removeAccount()` asks for the current password again, even though the session already proves who is asking — a stolen or shared session (a laptop left unlocked) can still read this page, but should not be able to silently delete the real owner's account with no further proof.

### Step 16: wiring the server (TODO 16)

Course 5.1's API used `Access-Control-Allow-Origin: '*'`, which is fine for a read-mostly, no-login API. This one sets a cookie, so it cannot use a wildcard: a browser refuses to expose a credentialed (cookie-carrying) response to a page whose origin was answered with `*`. `ALLOWED_ORIGIN` must name one exact origin instead, matched against `Access-Control-Allow-Credentials: true`.

### Step 17: loading the session, settings, and note on open (TODO 17)

`loadMe()` follows the same "must never reject" rule Course 5.1's `loadSettings()` did: a `401` means "the server is running, nobody is signed in" (not an error); any other failure — no server at all, or the plain static server this repository's own accessibility checks use — means "offline," and the page still has to render something sensible either way.

### Step 18: the account forms (TODO 18)

Registration, login, logout, and recovery, wired to the routes Steps 9-11 and 14 built. The recovery code is shown in the page, in an `<output>` element with `user-select: all` (see `styles.css`) so it is easy to select and copy — never in a browser `alert()`, which some screen readers announce poorly and which disappears the moment it is dismissed.

### Step 19: your settings and the curator's note (TODO 19)

The same settings form Course 5.1 built, now sent with `credentials: 'include'` and an `X-CSRF-Token` header on every `PUT` and `DELETE`. A curator's note form appears only for a signed-in curator; everyone else sees the note as read-only text.

### Step 20: privacy, export, and deletion, in the browser (TODO 20)

`export-button`'s handler is the whole pattern for a client-side file download without a server route dedicated to it: fetch the JSON, wrap it in a `Blob`, `URL.createObjectURL` it, click a temporary `<a download>`, then `URL.revokeObjectURL` it so the browser can free the memory.

### Step 21: testing with `node:test` (TODO 21)

`fetch()` (Node's own, built on undici) is not a browser: it does not store or resend cookies for you. Every test that needs to stay signed in reads the `Set-Cookie` header from a login response and sends it back as a `Cookie` header on later requests — `sessionCookieFrom()` in `server.test.js` does that once, for every test to reuse. **This test suite is slow on purpose**: several tests hash a password at Step 1's OWASP-recommended cost, and a few (recovery, deletion) do it more than once in a single request. Tens of seconds for the whole suite is expected, not a bug — the same slowness that protects a real stolen password file.

## Key code explained

**`scrypt$N$r$p$saltHex$hashHex`.** One self-describing string, not four separate database columns. The cost parameters travel with the hash, so raising `SCRYPT_PARAMS.N` later (a faster server, or new guidance) never breaks a password hashed under the old settings: `verifySecret()` always reads the parameters *out of* the stored string, never today's constant.

**`memoryFor({ N, r })`.** `r * 128 * N + 1024 * 1024` bytes: the memory formula scrypt's own documentation gives, plus a small safety margin. Skipping this and using the default `maxmem` throws `Invalid options: memory limit exceeded` the moment `N` is raised to a security-appropriate size.

**`destroyAllSessionsForUser(userId)`.** Used after a password change and after account deletion: a change to *who can act as this account* invalidates every session for it, not just the one that made the change — including a session an attacker might already be holding.

**`req.cookies` set once, in `server.js`.** Every route function receives `req` already carrying a parsed `cookies` object; no route file needs to know the "cookie" header's raw string format, the same separation of concerns Course 5.1 used for CORS and static files.

**`publicAccount(account)`.** Strips `passwordHash` and `recoveryCodeHash` before anything is sent to a client — called at the *end* of every route that returns an account, never relied on to be remembered later. A leaked hash can still be attacked offline, with no rate limit to stop it, so it is treated as a secret even though it is already hashed.

## 3D and XR accessibility

The exhibit itself is unchanged from Course 5.1: a fixed camera at one of four presets, with only the jade stone ever moving. What is new is that the settings controlling it now belong to a signed-in account, so the same checks apply, plus one more:

- **Scene description** (`#scene-description`): built from the same `EXHIBITS` list and the same settings object the 3D view reads — the signed-in account's own settings once signed in, or the shared defaults before that.
- **2D fallback**: the exhibit list below the 3D view names every exhibit and whether it is currently shown, signed in or not.
- **Keyboard route for every interaction**: every control is an ordinary checkbox, radio button, `<select>`, `<textarea>`, or `<button>` — including the "Forgotten your password?" disclosure button, which sets `aria-expanded` correctly in both states.
- **Reduced motion**: the shared, signed-out view checks `prefers-reduced-motion` on first load; once signed in, your own saved `reducedMotion` choice takes over, the same handoff Course 5.1's local-storage fallback used. **Pause animation** always works, and its label and `aria-pressed` state always match what is actually happening.
- **Comfort**: the camera only ever moves to a preset you chose; nothing about signing in, saving settings, or editing the curator's note moves the camera or changes the view on its own.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| Every form field (account forms, settings, curator's note, delete confirmation) has a visible `<label>` | 1.3.1, 3.3.2 | A password field with no label has no name a screen reader can announce. |
| Field errors from a 400 or 401 response appear as text next to the form | 3.3.1 | "Invalid username or password" stays readable and stays put, instead of vanishing like an `alert()`. |
| The status banner is a live region (`role="status"`) | 4.1.3 | "Account created," "Signed in," and the offline message reach screen-reader users without them going looking for it. |
| The visible word starts every button's accessible name | 2.5.3 | "Sign in," not an icon a speech user cannot say aloud. |
| "Forgotten your password?" uses `aria-expanded` on a real `<button>` | 4.1.2 | A screen reader announces whether the recovery form is currently shown, not just that something might happen on click. |
| The 3D scene can be paused, and respects reduced motion | 2.2.2 | Movement is never forced on anyone, signed in or not. |
| `role="list"` on every list styled with `list-style: none` | Good practice | Safari drops list semantics once the bullet is removed with CSS. |

## Performance considerations

`store.js` reads and rewrites the whole `accounts.json` array on every write — fine for a handful of learners testing locally, and a deliberate contrast with Course 5.3's real database, where a row updates without touching every other row. Scrypt at this lesson's cost is the one place this project is *deliberately* slow: budget half a second to a few seconds per password hash on an ordinary laptop, more on a shared classroom machine, and design any UI around it accordingly (a disabled submit button while a request is in flight is worth adding in your own projects, even though this lesson's reference solution keeps that detail out to stay focused on the security itself). The 3D scene is unchanged from Course 5.1: three simple meshes, no textures, animation limited to one object.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Comparing a password hash, session id, or CSRF token with `===` | The comparison leaks timing information one byte at a time | Use `crypto.timingSafeEqual` for every secret comparison |
| Telling a client "no such username" but "wrong password" as different messages | An attacker builds a list of real usernames for free | Return the exact same status and message for both |
| Trusting a user id from the request body to decide whose row to change | Any signed-in account could edit or delete any other account's data | Always read "who is this" from the session, never from the body |
| Setting `Access-Control-Allow-Origin: '*'` on an API that sets cookies | The browser silently drops the credentialed response; nothing appears to work | Name one exact origin, and pair it with `Access-Control-Allow-Credentials: true` |
| Checking only `requireAuth` before letting a curator-only action through | Any signed-in visitor could edit the curator's note | Add a separate role check for anything a role, not just an account, should gate |

## Troubleshooting

**The session cookie never gets set, even after a successful login.** Check `ALLOWED_ORIGIN` in `.env` matches the exact origin (scheme, host, *and* port) you opened the client from, and that your `fetch()` calls include `credentials: 'include'` — Firefox and Safari both drop a `Set-Cookie` header from a cross-origin response with no matching CORS credentials setup, usually with no console message at all.

**A cookie marked `Secure` never appears, even in DevTools' Application panel.** This is correct on `http://127.0.0.1`: `Secure` means "only ever send this over HTTPS," and a browser will not even store a `Secure` cookie set over plain HTTP. This lesson's server only adds `Secure` when the request actually arrived over HTTPS (see Step 8) — running everything over plain HTTP on localhost, as this course does, is the normal, accepted way to develop this kind of feature locally; production deployment needs HTTPS regardless, and then `Secure` is not optional.

**`403: Missing or invalid CSRF token`, even though you are signed in.** Signing in gives you a *new* CSRF token; a page left open from before a fresh sign-in (or after a server restart, which clears every session) is using a stale one. Call `GET /api/auth/me` again, or reload the page.

**`node --test` seems to hang.** It has not: several tests hash a password (or two, or three) at this lesson's scrypt cost. Give the whole suite at least a minute on a slow machine before assuming something is wrong.

**Two tabs, two different accounts, fighting over the same cookie.** One cookie, one session, per browser profile: signing in on one tab signs out whichever account the other tab thought it had (its next request uses the new cookie). Use a private/incognito window, or a second browser, to test two accounts side by side.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: add a password-strength hint that never blocks a long-enough password.
2. **[Creative](challenges/challenge-2.md)**: add a profile field of your own choosing, private by default.
3. **[Explorer](challenges/challenge-3.md)**: add an account-lockout notice, and an admin-free way to test it.

## Submitting your work

1. Complete every item in [`tests/checklist.md`](tests/checklist.md).
2. Take a screenshot of the account panel signed in, and one of your terminal showing every `node --test` check passing.
3. Keep them in your learner journal and portfolio. Share them with other developers: see [where to share your work and ask for help](../../docs/en/community.md).
4. In your journal, answer: which of this lesson's design decisions would you change first if you were building this for real users, and why?

## Further reading

- [Node.js docs: `crypto.scrypt`](https://nodejs.org/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback)
- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [OWASP Cross-Site Request Forgery Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- [W3C Web Authentication (WebAuthn) Level 3](https://www.w3.org/TR/webauthn-3/), and [passkeys.dev](https://passkeys.dev/) for an implementer's guide

## Women to Know

**Wang Xiaoyun** (王小云) is a Chinese cryptographer. In 2004 and 2005 she published practical collision attacks on the MD5 hash function and showed that SHA-1 was far weaker than its designers intended — work that pushed the entire industry to move away from both. She went on to lead the design of China's SM3 hash standard, which became an ISO/IEC standard in 2018, and was elected an academician of the Chinese Academy of Sciences in 2017.

This lesson leans on a hash function (scrypt) at almost every step: to store a password, a recovery code, and to compare secrets safely. Wang Xiaoyun's career is a reminder that hash functions are not fixed, timeless facts — they are designs, built by people, that sometimes turn out to have weaknesses only careful, patient cryptanalysis finds. The same care that broke MD5 and SHA-1 is what keeps today's recommendations, like the ones this lesson cites, worth re-checking as they change.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

This lesson's cookies, headers, and cross-origin rules are all part of the WHATWG's living **Fetch** and **HTML** standards and the IETF's **HTTP State Management Mechanism** (RFC 6265, which defines `Set-Cookie` and its attributes). The password-storage and CSRF guidance cited throughout comes from the **OWASP Cheat Sheet Series**, a community-maintained, practitioner-facing companion to formal standards — not a standards body itself, but the most current, specific guidance most working developers actually reach for. Passkeys are standardised separately, through the **W3C's WebAuthn** specification, developed jointly with the FIDO Alliance.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
