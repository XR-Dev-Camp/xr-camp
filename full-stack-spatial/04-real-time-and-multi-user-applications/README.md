# Real-Time and Multi-User Applications

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Course:** `full-stack-spatial` · **Lesson:** `real-time-and-multi-user-applications-04` · **Time:** about 17 hours · 23 sessions of 45 minutes · about 6 weeks at 4 sessions a week

---

> Build a small collaborative 3D world.

## Learning objectives

By the end of this project you will be able to:

1. Explain what a WebSocket upgrade is, and why authenticating it needs the same session cookie an HTTP request already carries, rather than a token the page invents for itself.
2. Build a small in-memory room registry: join a room, leave it, and broadcast a message to every member except one.
3. Send position updates at a fixed maximum rate, and interpolate between the updates a browser receives so a remote avatar's motion looks smooth despite arriving in steps.
4. Validate, sanitize, and rate-limit chat text on the server, independently of anything the sending client already claims to have done.
5. Explain the difference between a client-local moderation action (muting) and a server-enforced one (blocking), and implement both.
6. Write a moderation report to a database from a WebSocket message, always naming the reporter from their own authenticated session, never from the message body.
7. Reconnect a dropped WebSocket automatically, with exponential backoff and jitter, without hammering the server the instant it comes back.
8. List, from memory, what a real-time server must never take on a client's word — identity, rate, position, and room membership among them.

## Prerequisites

- **Course 5.3: Databases and Spatial Application Data** — this lesson reuses its accounts, sessions, and SQLite setup, and adds one new table (`reports`) to the same database.
- **Course 5.2: Authentication and User Accounts** — sessions, CSRF, and the cookie this lesson's WebSocket upgrade reuses.
- **Course 5.1: Backend and API Foundations** — routes, JSON bodies, and status codes.
- Comfort running two things at once: two terminals, and — for real testing — two browser windows.

## Required tools

| Tool | Purpose | Cost |
| --- | --- | --- |
| Node.js 22.5 or later (LTS "24 Krypton" recommended) | Runs the server | Free |
| npm (ships with Node.js) | Installs this lesson's one dependency, `ws` | Free |
| A text editor (e.g. VS Code) | Writing the server and client code | Free |
| Two browser windows or tabs (Chrome, Firefox, Safari, or Edge) | Testing the room with more than one member at once — this lesson is not fully testable alone | Free |

Node.js can be downloaded from [nodejs.org](https://nodejs.org/); learners in mainland China can also use the [npmmirror Node.js mirror](https://registry.npmmirror.com/binary.html?path=node/). This lesson installs one npm package, `ws` — the first dependency anywhere in XR Camp (Courses 5.1-5.3 used only Node's own built-in modules). `npm install` needs the internet once; if npmjs.com is slow, run `npm install --registry=https://registry.npmmirror.com` instead. After that, `node_modules/` is on disk and the server runs offline like every other lesson.

## What you will build

Course 5.3 gave every account a database of its own scenes. This lesson connects several signed-in accounts *to each other*, at the same time: a small shared room where everyone who has the page open sees everyone else move, in something close to real time, over a WebSocket connection instead of a request-response API. You will authenticate the WebSocket upgrade itself with the session cookie Course 5.2 built, keep a small in-memory registry of who is in the room, relay position updates at a limited rate with client-side interpolation so motion looks smooth, add sanitised and rate-limited chat, and give learners a way to block, mute, and report someone — with the report actually written to the database, because that is the one piece of this lesson's moderation story that has to survive a restart and reach a human later.

This is the fourth step of the ongoing **virtual cultural exhibit** that runs through Phase 5: 5.1 gave it an API, 5.2 gave it accounts, 5.3 gave it a real database, and this lesson gives it other people, at the same time, in the same room. Course 5.5 comes back to this exact server to find and fix the security mistakes a real-time feature like this one is prone to.

The reference solution is in [`completed/`](completed/); the starter has **16 numbered TODOs** across `server/` and `js/`, with `db.js`, `auth.js`, `sessions.js`, `rateLimit.js`, `cookies.js`, and `routes.js` carried over finished (this lesson is not re-teaching accounts or SQLite) so you can focus on what is new: the WebSocket upgrade, rooms, rate limits, sanitizing, moderation, interpolation, and reconnection.

## Folder guide

```text
04-real-time-and-multi-user-applications/
├── README.md
├── starter/                      # begin here
│   ├── index.html, styles.css
│   ├── js/
│   │   ├── net.js                # TODO 12, 13: reconnect, throttled sends
│   │   ├── scene.js              # TODO 14: interpolation
│   │   └── main.js               # TODO 15, 16: chat, block/mute/report UI
│   └── server/
│       ├── migrations/           # numbered .sql files, run in order
│       ├── db.js, auth.js, sessions.js, rateLimit.js, cookies.js, routes.js   # carried over
│       ├── validation.js         # TODO 2: position, chat, and report checks
│       ├── sanitize.js           # TODO 3: chat text cleanup
│       ├── wsAuth.js             # TODO 4: authenticate the upgrade
│       ├── rooms.js              # TODO 5: join, leave, broadcast, presence
│       ├── realtime.js           # TODO 6-9: position, chat, block, report
│       ├── server.js             # TODO 10: the `upgrade` event
│       └── server.test.js        # TODO 11: two-client assertions
├── completed/                    # reference solution
├── challenges/                   # Three challenges: Foundation is required
├── tests/                        # self-review checklist
├── assets/
└── screenshots/
```

## Setup

1. Open a terminal and run `node --version`. You need 22.5 or later; this course is written and tested against Node 24 (the current LTS).
2. `cd` into `starter/server` and run `npm install` — this is the first lesson in XR Camp to install anything, and it installs exactly one package, `ws`, pinned to the exact version in [`package.json`](starter/server/package.json). `node_modules/` is created on disk but never committed (see `.gitignore`).
3. Copy `starter/server/.env.example` to `starter/server/.env` (adjust `PORT` only if 8880 is already used by something else).
4. Serve the whole repository from its root with any static file server (for example `python3 -m http.server 8766`, or the one this course's own tooling already runs), so `starter/index.html` opens over `http://`, not `file://`.
5. In a second terminal, from `starter/server`, run `node server.js`. You should see `Real-time room server listening on http://127.0.0.1:8880` and, once, a one-line `ExperimentalWarning: SQLite is an experimental feature`. Both are expected; see Troubleshooting.
6. Open the served `starter/index.html`, register an account, and sign in. Until TODO 10 (the WebSocket upgrade) is finished, the room panel will appear but nothing will connect — that is expected this early.
7. For every test from Step 15 onward, open the page in **two** browser windows (or one normal window and one private/incognito one), sign in with two different accounts, and watch one affect the other.

## Walkthrough

### Plan your sessions

| Session | What you do | You finish with |
| --- | --- | --- |
| 1 | Read this Walkthrough and the starter files; run the server and confirm `node --version`, `npm install`, and `node server.js` all work. | The starter running, and a plan for the 16 TODOs ahead. |
| 2 | TODO 1: write `migrations/002_create_reports.sql`. | `node --test` gets past the migrations without error (assertions on `reports` itself come later). |
| 3 | TODO 2a-b: `validatePosition` and `validateChatText` in `validation.js`. | A quick scratch script (or the debugger) shows both rejecting an out-of-range or empty value. |
| 4 | TODO 2c: `validateReport`. | The same scratch check, for a report with a missing reason. |
| 5 | TODO 3: `sanitizeChatText` in `sanitize.js`. | `node --test` (once written, Step 16) will check this, but for now confirm by hand that control characters and extra whitespace are removed. |
| 6 | TODO 4: `authenticateUpgrade` in `wsAuth.js`. | A function ready to call, not yet wired into `server.js` (that is Step 15). |
| 7 | TODO 5a-b: `joinRoom`, `leaveRoom`, and `presenceList` in `rooms.js`. | A room registry you can exercise from a scratch script. |
| 8 | TODO 5c: `broadcast` in `rooms.js`, including the blocked-listener filter. | The whole of `rooms.js` finished. |
| 9 | TODO 6: `handlePosition` in `realtime.js`. | Position messages are rate-limited, validated, and relayed — testable once Step 15 is done. |
| 10 | TODO 7: `isChatRateLimited` and `handleChat`. | Chat is validated, sanitised, rate-limited, and relayed. |
| 11 | TODO 8: `handleBlock`. | Blocking toggles `blockedUserIds` and acknowledges it. |
| 12 | TODO 9: `handleReport`. | A report resolves the target's current username from the server's own roster and calls `insertReport`. |
| 13 | Re-read `realtime.js` end to end now that TODOs 6-9 are all finished, checking every place it uses the server's own record of who a connection is, never the message it just received. | Notes on the answer to Learning objective 8, in your own words. |
| 14 | TODO 10: the `upgrade` event in `server.js`. | The first real end-to-end moment: open two browser tabs, sign in as two accounts, and see each other's avatar and roster row appear. |
| 15 | TODO 11a-b: finish `server.test.js`'s two-client presence/position/chat test and its sanitizing test. | Two more green tests. |
| 16 | TODO 11c-d: finish the report and blocking tests; run `node --test` to a full pass. | A green test suite for the whole server. |
| 17 | TODO 12a-b: `backoffDelay` and `scheduleReconnect` in `js/net.js`. | Stop the server, watch the status banner announce reconnect attempts, restart the server, and watch it recover on its own. |
| 18 | TODO 13: throttled `sendPosition` in `js/net.js`. | Holding a movement button no longer sends more than 10 position messages a second (check the Network tab's WS frames). |
| 19 | TODO 14a-b: `setRemoteTarget` and `currentInterpolated` in `js/scene.js`. | With two tabs open, the other learner's avatar glides between positions instead of jumping. |
| 20 | TODO 15: the chat form's submit handler in `js/main.js`. | Chat works, in both tabs, in order. |
| 21 | TODO 16a-c: `toggleMute`, `toggleBlock`, `openReport`/`closeReport` in `js/main.js`. | Mute, block, and report all work from the roster table; a report shows up if you inspect the database (see Troubleshooting). |
| 22 | Work through [`tests/checklist.md`](tests/checklist.md), including its "3D and XR (manual)" section, on a real keyboard and, if you have one, a screen reader. | Every item checked, or a note about what you could not test and why. |
| 23 | Complete the required [Foundation challenge](challenges/challenge-1.md), then one of the Creative or Explorer challenges, then **Submitting your work**. | Screenshots, your journal entry, and a project you are ready to show. |

### Step 1: Read the shape of a WebSocket connection (no TODO yet)

An HTTP request answers once and ends. A WebSocket starts as an HTTP request too — with an `Upgrade: websocket` header — but instead of a response body, the server hands the underlying TCP connection over to a different protocol, and either side can then send a message at any time, for as long as the connection stays open. `server.js` listens for this on node's own `upgrade` event, on the same `http.Server` that already answers `/api/...` routes. Nothing about that event proves who is asking; `wsAuth.js` (Step 6) is what checks.

### Step 2: The one new table (TODO 1)

Open `server/migrations/002_create_reports.sql`. The comment inside it describes every column, the same style `001_create_users.sql` (already finished, carried over from Course 5.3) uses: one statement per file, plain column types, `REFERENCES` for the one foreign key.

```sql
-- from 001_create_users.sql, already finished:
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL
);
```

`db.js` (carried over, finished) already exports `insertReport` and `listReportsForRoom` — once this migration exists, those functions have a table to write to and read from.

### Step 3: Validating a position and a chat message (TODO 2a-b)

Open `server/validation.js`. `validateCredentials` (already finished, from Course 5.2) shows the pattern every validator in this project follows: check the shape, collect every problem instead of stopping at the first one, and return `{ valid, errors, value }` where `value` holds *only* the fields this server itself decided are safe to use next — never anything extra the input happened to include.

```js
// The shape every validator in this file follows:
export function validateSomething(input) {
  const errors = [];
  // ...checks that push to `errors`...
  if (errors.length > 0) return { valid: false, errors, value: null };
  return { valid: true, errors: [], value: { /* only the checked fields */ } };
}
```

`validatePosition` checks four numbers; `validateChatText` checks one string's length. Neither of them changes the text — that is `sanitizeChatText`'s job (Step 5), kept separate on purpose (see Key code explained).

### Step 4: Validating a report (TODO 2c)

`validateReport` checks that `reason` is one of a fixed list (`REPORT_REASONS`) rather than any string at all — a moderator reviewing reports later needs a small, known set of categories, not free text a reporter could phrase a hundred different ways.

### Step 5: Sanitizing chat text (TODO 3)

Open `server/sanitize.js`. `js/main.js` already renders every chat line with `textContent`, which cannot execute a `<script>` tag no matter what it contains — so why sanitize on the server too? Because `textContent` is a property of *this* lesson's client, and nothing stops a future client, a debugging tool, or an integration into another chat system from using `innerHTML` instead, without knowing this text was never checked for that. Defense in depth means neither layer trusts the other to have already done the job.

### Step 6: Authenticating the upgrade (TODO 4)

Open `server/wsAuth.js`. It reuses two functions Course 5.2 already wrote — `parseCookies` and `getSession` — exactly the way `requireAuth` in `routes.js` does for an ordinary HTTP request. The only thing new here is *when* it runs: before a WebSocket connection is allowed to exist at all, not after.

The same file also exports `checkOrigin`, which the `upgrade` handler (Step 14) calls *before* the cookie check. A cookie proves who a request is signed in as, but not which page sent it: a browser attaches cookies to a cross-site WebSocket handshake too, so the cookie alone cannot stop another site's page from opening a connection and riding a visitor's session (cross-site WebSocket hijacking, or CSWSH). `checkOrigin` rejects any upgrade whose `Origin` header is missing or is not in an explicit allow-list — the same defence a same-origin `fetch()` gets for free from the browser, applied by hand here because the WebSocket handshake does not enforce it itself.

### Step 7-8: The room registry (TODO 5a-c)

Open `server/rooms.js`. A room is a `Map<connectionId, member>`, held in this module's own memory. `joinRoom` and `leaveRoom` are the two sides of membership; `presenceList` turns the room's members into the plain, server-built snapshot a newly joined learner receives as "who is already here." `broadcast` is the one function every message handler in `realtime.js` calls to fan a message out — which is also the one place blocking (TODO 8) is enforced, so no individual handler can forget to check it.

### Step 9: Position updates (TODO 6)

Open `server/realtime.js`. `handlePosition` is rate-limited *before* it validates — a client sending updates faster than `POSITION_MIN_INTERVAL_MS` gets nothing back at all, not even an error, because in a healthy connection this happens constantly (see Step 18) and is not a mistake worth reporting. Every relayed position names its sender from `member.userId` and `member.username` — the server's own record of who this connection is — never from the incoming message, which could claim to be anyone.

### Step 10: Chat (TODO 7)

`isChatRateLimited` keeps a sliding window of this connection's own recent send times; `handleChat` checks it, validates, sanitizes, and — unlike position updates — relays the message back to its own sender too, so everyone's chat log (including the person who sent it) shows messages in the same order.

### Step 11: Blocking (TODO 8)

`handleBlock` is short: add or remove one userId from `member.blockedUserIds`. All the actual enforcement already exists, in `rooms.js`'s `broadcast` (Step 8) — this function only has to keep the Set correct.

### Step 12: Reports (TODO 9)

`handleReport` resolves the reported account's *current* username from the room's own roster (`presenceList`), not from anything the client sent — a client could otherwise file a report against a username of its choosing that has nothing to do with `targetUserId`. The reporter's id always comes from `member.userId`, for the same reason logins never take an account id from a request body.

### Step 14: Wiring the upgrade (TODO 10)

Open `server/server.js`. The `upgrade` event is the one place this whole lesson's authentication and room logic actually connects to a real network socket: check the path, call `checkOrigin` and refuse the upgrade if it fails, then call `authenticateUpgrade` and refuse with a plain HTTP response if that fails too, otherwise hand the socket to `wss.handleUpgrade` and call `handleConnection`. Origin is checked before the cookie, on purpose: reject the request that could not have come from a trusted page before spending any effort deciding who it claims to be. This is also the first moment you can genuinely test any of it — open two browser tabs once this is done.

### Step 15-16: Finishing the tests (TODO 11a-d)

Open `server/server.test.js`. The two authentication tests already pass (Course 5.2's session logic never changed); the four TODO tests exercise everything built since. Read the comment above each one carefully — in particular, notice that `collectMessages` is attached to a socket *before* awaiting its `'open'` event in the finished tests, not after: the server can answer the instant its handshake completes, which can be before your test function's next line would otherwise run. Attaching the listener a beat too late silently loses the message.

### Step 17: Reconnecting (TODO 12a-b)

Open `js/net.js`. `backoffDelay` is "exponential backoff with full jitter": each retry waits a *random* amount of time up to a ceiling that doubles every attempt, capped at `MAX_DELAY_MS`. The randomness is not decoration — without it, every learner whose Wi-Fi drops at the same moment would retry in lockstep, at the same instants, which is close to the worst possible pattern for a server trying to recover.

### Step 18: Throttling position sends (TODO 13)

`sendPosition` drops any call made less than `POSITION_SEND_INTERVAL_MS` after the last one it actually sent. `js/main.js` can call it on every animation frame without knowing or caring about this limit — which is also exactly why `server/realtime.js`'s own rate limit (Step 9) cannot be removed: this client-side throttle is a courtesy, not a guarantee, since nothing stops a different client from ignoring it.

### Step 19: Interpolating remote positions (TODO 14a-b)

Open `js/scene.js`. A position message arrives at most 10 times a second; this scene renders far more often than that. `setRemoteTarget` records where an avatar *was* (`from`) and where it is *going* (`to`); `currentInterpolated` (called every frame by the render loop, already finished) eases between them over `INTERPOLATION_MS`. The one detail worth re-reading twice: `from` is set to the avatar's *currently rendered* position, not its previous target — so an update that arrives mid-tween starts the next one from where the eye actually is, with no visible snap.

### Step 20: Sending chat (TODO 15)

Open `js/main.js`. The submit handler is short because the interesting work already happened on the server (Step 10): this only has to read the input, guard against an empty message or a missing connection, and call `net.sendChat`.

### Step 21: Block, mute, and report from the UI (TODO 16a-c)

`toggleMute` never talks to the server — see Key code explained for why that is the right call here, not a shortcut. `toggleBlock` does, through `net.sendBlock`. `openReport`/`closeReport` manage one small form's visibility and focus; the actual report is sent by the form's (already finished) submit handler once you have written these two.

## Key code explained

- **Authenticating an `upgrade` event, not a `WebSocket` constructor call.** A browser's `WebSocket` cannot set custom headers, so it cannot carry a bearer token the way a `fetch()` can. What it *can* do, for a same-origin URL, is send the page's ordinary cookies — the same way a same-origin `fetch()` with `credentials: 'include'` does. `wsAuth.js` reads that cookie on the plain HTTP request that precedes the protocol switch, before `ws` ever sees the socket.
- **Checking `Origin`, not just the cookie.** Cookies travel with a cross-site WebSocket handshake, so a cookie check alone cannot tell a request opened by this app's own page apart from one opened by a hostile page in another tab (CSWSH). `checkOrigin` in `wsAuth.js` rejects any upgrade whose `Origin` header is missing or absent from an explicit allow-list, read from the `ALLOWED_ORIGIN` environment variable and defaulting to the server's own origin.
- **Validation and sanitizing are two different functions.** `validateChatText` answers yes or no; `sanitizeChatText` changes the value. Keeping them separate means each one is easy to unit-test on its own, and means a future rule change (a new banned character, say) touches exactly one function instead of a validator that also happens to mutate its input.
- **Server-side rate limits, even though the client already throttles itself.** `js/net.js`'s `sendPosition` and the chat form both hold back faster sends — but a modified or hand-written client would not. `server/realtime.js`'s own limits (`POSITION_MIN_INTERVAL_MS`, `CHAT_MAX_MESSAGES`) are what actually enforce the rule; the client-side versions exist only to be a good citizen and to avoid wasted round trips.
- **Mute is local; block is server-enforced.** Muting changes what your own browser shows, instantly, with no round trip — appropriate for "I personally don't want to see this," a preference only your browser needs to act on. Blocking asks the server to stop relaying that person to you at all, so it keeps working even if their client tries to ignore it — appropriate for "stop this person from reaching me," a guarantee only the server, which controls what actually gets sent, can make.
- **Interpolation turns steps into motion.** Ten updates a second is not smooth on its own; easing between the last two known positions over the time one update is expected to take is what makes it read as continuous movement, the same technique real-time games and collaborative tools use for exactly this reason.
- **Exponential backoff with full jitter.** Doubling the wait after each failed attempt, up to a ceiling, keeps a struggling server from being hit harder the more it struggles. Adding randomness on top of that (rather than waiting the full ceiling every time) spreads out reconnection attempts from many clients that dropped together, instead of having them all retry in the same instant.

## 3D and XR accessibility

- **Scene description.** `#scene-description` states your own approximate position, facing, and who else is in the room, in plain text, built from the same data the 3D view renders (WCAG 1.1.1, 1.3.1).
- **Keyboard-only movement.** Every move and turn is a button, not a drag gesture — this project never asks a learner to click-and-drag inside the 3D canvas to take part in the room.
- **A 2D twin of the 3D view.** The roster table holds every member's exact position and facing, always, whether or not WebGL is available or the 3D view has rendered yet.
- **Chat as a live region, not only pixels.** `#chat-log` is `role="log"` with `aria-live="polite"`, so a new message is announced without needing focus to move there.
- **Reduced motion and a Pause control.** Avatars' idle bob starts paused when `prefers-reduced-motion: reduce` is set, and the **Pause animation** button (with `aria-pressed`) works regardless of that preference. A learner's own avatar never bobs at all — see `js/scene.js`'s comment on why, and Common mistakes below.
- **Comfort.** The camera is fixed for the whole lesson; nothing about joining a room, moving, or chatting ever moves the viewpoint itself.

## Accessibility requirements

| Requirement | WCAG 2.2 | Why |
| --- | --- | --- |
| Every roster action button has a distinguishing `aria-label` ("Mute: alice", not just "Mute") | 2.5.3, 4.1.2 | Several rows can have an identically labelled button; the accessible name must say which member it acts on. |
| `#chat-log` is `role="log"` with `aria-live="polite"` | 4.1.3 | A new chat message is announced without moving focus into the log. |
| The roster table has a `<caption>` and `<th scope="col">`/`<th scope="row">` | 1.3.1 | A screen reader announces which member and which axis each number belongs to. |
| Movement is keyboard-operable buttons, never a canvas drag | 2.1.1 | Joining and moving in the room works entirely with `Tab` and `Enter`/`Space`. |
| Animation respects `prefers-reduced-motion` and offers a Pause button | 2.2.2 | Self-starting motion the learner did not ask for must be stoppable. |
| `role="list"` on every `<ul>` styled with `list-style: none` | Good practice | Safari otherwise drops list semantics from a list-styled-away `<ul>`. |

## Performance considerations

- **A rate limit is also a bandwidth budget.** Ten position updates a second, per connection, is the ceiling this lesson chose because a small room (a dozen or so learners) stays comfortably under what a home connection or a shared campus network can carry; a much larger room would need to lower it, batch updates, or only relay nearby members.
- **`broadcast` skips closed sockets.** Checking `member.ws.readyState === member.ws.OPEN` before every `send` avoids the cost (and the thrown error) of writing to a socket that is already on its way out.
- **Interpolation is cheap; more history is not.** This lesson only ever keeps one `from` and one `to` position per remote avatar — enough for smooth motion at this update rate. A system trying to also *predict* motion between updates would need more history and more math, for a gain most small rooms do not need.
- **The heartbeat interval is `unref()`'d.** `setInterval(...).unref()` tells Node this timer alone should never keep the process running — important for `server.test.js`, which needs the server to be able to fully shut down between test files.

## Common mistakes

| Mistake | What happens | Instead |
| --- | --- | --- |
| Trusting a `userId` or `username` field inside an incoming WebSocket message | Any client can claim to be anyone; a report, a chat message, or a position update could be forged as someone else | Always use the server's own record on `member` (set once, at connection time, from the authenticated session) |
| Only throttling position sends on the client | A modified or hand-written client can send as fast as it likes | Enforce the same limit again in `server/realtime.js`, independent of the client |
| Checking `if (Date.now() - member.lastPositionAt < ...)` *after* already broadcasting | The rate limit does nothing — the expensive part (fanning out to every other member) already happened | Check the rate limit first, before validating or broadcasting anything |
| Bobbing the learner's own avatar the same way remote ones bob | The position shown in 3D drifts away from the exact numbers in the roster table and the numbers actually sent to the server | Only idle-animate remote avatars; a learner's own avatar always sits exactly where the last move put it |
| Reconnecting with a fixed delay (`setTimeout(open, 1000)`) | Every client whose connection drops at once — a shared Wi-Fi hiccup — retries in lockstep, at the same instant, repeatedly | Exponential backoff with jitter (TODO 12), so retries spread out over time |

## Troubleshooting

**`ExperimentalWarning: SQLite is an experimental feature and might change at any time`.** Expected, every time `node:sqlite` is imported. A warning, not an error — the server keeps running.

**The room panel appears after signing in, but nothing ever connects.** Before TODO 10 is finished, `server.js` has no `upgrade` handler at all, so every connection attempt from `js/net.js` simply hangs until the browser gives up. This is expected until Step 14.

**`Error: This test is not implemented yet — see TODO 11a` (or 11b/11c/11d).** Expected until you finish that TODO — these are deliberate placeholders, not a bug in the starter.

**A WebSocket connects, then closes immediately with code `1008`.** The `room` query parameter did not match `KNOWN_ROOMS` in `rooms.js`. `js/net.js` always requests `main-hall`; check you have not edited that string in only one of the two files.

**Two tabs signed in as the *same* account behave oddly.** This lesson's model gives one connection per login, not one per account; signing in as the same account twice creates two independent room members that happen to share a username. Use two different accounts to test properly.

**`npm install` fails, or is very slow, in mainland China.** Run `npm install --registry=https://registry.npmmirror.com` instead of the default registry.

**A report does not seem to have been saved.** There is no UI for reading reports back in this lesson (a moderator's review tool is out of scope) — check with `node -e "const {db}=await import('./db.js'); console.log(db.prepare('SELECT * FROM reports').all())"` from `server/` (with `DB_FILE` unset, so it reads the same file the running server uses), or write a short scratch script.

**Port 8880 is already in use.** Set a different `PORT` in `server/.env`, and update `ALLOWED_ORIGIN` to match.

## Challenge extensions

Three challenge extensions, in [`challenges/`](challenges/). The Foundation challenge is required; the other two are optional:

1. **[Foundation](challenges/challenge-1.md)**: add a "wave" gesture message type and relay it the same way position updates are relayed.
2. **[Creative](challenges/challenge-2.md)**: make the room reflect your own language, culture, or community.
3. **[Explorer](challenges/challenge-3.md)**: a second room, and a way to move between them.

## Submitting your work

1. Work through [`tests/checklist.md`](tests/checklist.md).
2. Take screenshots: two browser tabs showing each other's avatars and roster rows, the chat log with messages from both, and `node --test`'s terminal output showing a full pass.
3. Keep them in your learner journal and portfolio. When the XR Camp community opens, share them there.
4. Journal question: this lesson enforces the same rule (rate limits, validation, "who is this connection") on both the client and the server, and explicitly does not trust the client's copy. Find one place in your own project — this lesson or an earlier one — where you only checked something in the UI, and explain what a learner with the browser's developer console open could do about it.

## Further reading

- [MDN: The WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [MDN: Writing WebSocket servers](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers)
- [`ws` package documentation](https://github.com/websockets/ws)
- [AWS Architecture Blog: Exponential Backoff And Jitter](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/)
- [OWASP Cheat Sheet Series: WebSocket Security](https://cheatsheetseries.owasp.org/cheatsheets/WebSocket_Security_Cheat_Sheet.html)

## Women to Know

**Sylvia Xueni Pan** is a Professor of Virtual Reality at Goldsmiths, University of London, where she co-leads the MA/MSc in Virtual and Augmented Reality and the SeeVR Lab, researching social interaction, presence, and avatars in shared virtual spaces. She co-teaches a Coursera Virtual Reality Specialization that, by her own count, has over 100,000 registered learners.

Her research — how people perceive and interact with each other's avatars in a shared virtual space — is the deeper subject behind this lesson's small room: the position updates, the presence list, and the sense of "someone else is here with me" that this lesson's WebSocket connection exists to create.

> **Editorial note: verify before publication.** Biographical claims in Women to Know spotlights must be checked against primary sources and, where practical, confirmed with the subject before the lesson goes live. See [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Standards spotlight

The WebSocket protocol itself is IETF RFC 6455, and the browser-facing API this lesson's client code calls (`new WebSocket(...)`, its events, its methods) is defined by the WHATWG's living HTML Standard, in coordination with the W3C. Node's `ws` package (this lesson's one dependency) implements the protocol side of RFC 6455 for a server; the browser implements the client side natively, which is why `js/net.js` never needs a library to speak it.

## License

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
