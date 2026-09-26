// server.test.js: node:test (built into Node) plus the `ws` package this
// lesson installs — this file is why it is a dependency at all: a real
// browser sends cookies with a same-origin `ws://` upgrade automatically,
// but Node's `ws` client does not, so every socket() call below sets the
// Cookie header by hand, exactly the way a browser would have done it
// invisibly. That is also a good way to see, in code, exactly what the
// browser is trusting the server to check.
//
// Run with `npm test` (or `node --test`) from this folder. Everything
// below except the four tests marked TODO 11 is finished for you.

import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { WebSocket } from 'ws';

const tempDir = await mkdtemp(join(tmpdir(), 'xrcamp-fss-04-'));
process.env.DB_FILE = join(tempDir, 'room.test.sqlite');

const { server } = await import('./server.js');
const { db } = await import('./db.js');

let baseUrl;
let wsUrl;
let nextUsername = 0;

before(async () => {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
  wsUrl = `ws://127.0.0.1:${port}/ws`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  await rm(tempDir, { recursive: true, force: true });
});

function freshUsername(prefix = 'learner') {
  nextUsername += 1;
  return `${prefix}-${nextUsername}`;
}

// Registers and logs in over plain HTTP (Courses 5.1-5.2's flow), returning
// the session cookie a real browser would now be holding.
async function registerAndLogIn(username, password = 'a-very-good-password') {
  await fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const res = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const setCookie = res.headers.get('set-cookie');
  const cookie = setCookie ? setCookie.split(';')[0] : null;
  const body = await res.json();
  return { cookie, account: body.account };
}

// Opens a WebSocket the way a browser would, except a browser attaches its
// cookies invisibly and this has to do it by hand (see the file comment).
function connectWs(cookie, room = 'main-hall') {
  return new WebSocket(`${wsUrl}?room=${room}`, { headers: { Cookie: cookie } });
}

function waitForOpen(ws) {
  return new Promise((resolve, reject) => {
    ws.once('open', resolve);
    ws.once('error', reject);
  });
}

// Collects every message a socket receives into an array, resolving once
// `count` have arrived (or after a short timeout, so a missing message
// fails the assertion below instead of hanging the test suite forever).
function collectMessages(ws, count) {
  const messages = [];
  return new Promise((resolve) => {
    function onMessage(raw) {
      messages.push(JSON.parse(raw.toString()));
      if (messages.length >= count) finish();
    }
    function finish() {
      clearTimeout(timer);
      ws.off('message', onMessage);
      resolve(messages);
    }
    const timer = setTimeout(finish, 2000);
    ws.on('message', onMessage);
  });
}

// --- Authentication of the upgrade itself (finished for you) -----------------

test('a WebSocket upgrade with no session cookie is rejected before it ever opens', async () => {
  const ws = new WebSocket(wsUrl); // no Cookie header at all
  await assert.rejects(waitForOpen(ws));
});

test('a WebSocket upgrade for an unknown room is closed by the server', async () => {
  const { cookie } = await registerAndLogIn(freshUsername());
  const ws = connectWs(cookie, 'no-such-room');
  await waitForOpen(ws);
  const [closeCode] = await new Promise((resolve) => ws.once('close', (code) => resolve([code])));
  assert.equal(closeCode, 1008);
});

// --- Two clients: presence, position, and chat (TODO 11a) --------------------
//
// Register and log in two accounts (call them alice and bob, using
// freshUsername('alice') / freshUsername('bob') so re-runs never collide).
// Connect alice's socket first and drain her own (empty) roster message.
// Connect bob's socket, attach collectMessages(bobWs, 3) *before* awaiting
// bob's 'open' event (see the completed lesson's comment on why this order
// matters — the server can answer before your next line of code would
// otherwise run). Have alice send a 'position' message and a 'chat'
// message. Assert that bob received, among his three messages: a roster
// that already lists alice, a position update naming alice with the exact
// x/y/z you sent, and a chat message from alice with the exact text you
// sent. Close both sockets at the end of every test in this file — an
// open WebSocket left behind can keep `node --test` from exiting cleanly.

test('a second member sees presence, position, and chat from the first', async () => {
  throw new Error('This test is not implemented yet — see TODO 11a');
});

// --- Sanitizing (TODO 11b) ----------------------------------------------------
//
// Connect two accounts. Have one send a chat message containing something
// that looks like markup (e.g. '<script>alert(1)</script>') mixed with
// extra whitespace. Assert the text the other socket receives has had the
// markup preserved as plain text (never executed, never stripped into
// nothing) and the whitespace collapsed — this is exactly what
// sanitizeChatText (TODO 3) is supposed to do.

test('chat text is sanitised: an HTML-looking message survives as plain text, never executable markup', async () => {
  throw new Error('This test is not implemented yet — see TODO 11b');
});

// --- Reports (TODO 11c) -------------------------------------------------------
//
// Connect two accounts. Have one send a 'report' message naming the other
// as targetUserId, with a valid reason. Assert a 'report-ack' comes back,
// then query the database directly — db.prepare('SELECT * FROM reports
// WHERE reporter_id = ?').get(reporterAccountId) — and assert the row's
// reported_username matches the target account's username and its reason
// matches what you sent. This is the one piece of this lesson's state that
// is not just in memory, so it is worth checking it actually reached SQLite.

test('a report writes a row to the database, naming the reporter from their own session, not the message', async () => {
  throw new Error('This test is not implemented yet — see TODO 11c');
});

// --- Blocking (TODO 11d) -------------------------------------------------------
//
// Connect two accounts. Have one send a 'block' message naming the other,
// and assert a 'blocked' acknowledgement comes back. Then have the blocked
// account send a 'position' update, and assert the blocking account
// receives *nothing* within collectMessages's timeout (an empty array) —
// proof that server/rooms.js's broadcast() is actually filtering, not just
// that the acknowledgement worked.

test('blocking a user stops their position and chat from being relayed to the blocker', async () => {
  throw new Error('This test is not implemented yet — see TODO 11d');
});
