// server.test.js: node:test (built into Node) plus the `ws` package this
// lesson installs — this file is why it is a dependency at all: a real
// browser sends cookies with a same-origin `ws://` upgrade automatically,
// but Node's `ws` client does not, so every socket() call below sets the
// Cookie header by hand, exactly the way a browser would have done it
// invisibly. That is also a good way to see, in code, exactly what the
// browser is trusting the server to check.
//
// Run with `npm test` (or `node --test`) from this folder.

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

// --- Authentication of the upgrade itself -----------------------------------

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

// --- Two clients: presence, position, and chat ------------------------------

test('a second member sees presence, position, and chat from the first', async () => {
  const alice = await registerAndLogIn(freshUsername('alice'));
  const bob = await registerAndLogIn(freshUsername('bob'));

  const aliceWs = connectWs(alice.cookie);
  await waitForOpen(aliceWs);
  await collectMessages(aliceWs, 1); // alice's own roster (empty room so far)

  const bobWs = connectWs(bob.cookie);
  // Attached synchronously, before awaiting the socket's own 'open' event:
  // the server can send the roster the instant its handshake completes,
  // which can be before this async function's next line would otherwise
  // run (a real, if narrow, race — see the README's Troubleshooting).
  const bobMessages = collectMessages(bobWs, 3);
  await waitForOpen(bobWs);
  // bob should see, in order: his own roster (which already lists alice),
  // then alice's position update, then alice's chat message.

  aliceWs.send(JSON.stringify({
    type: 'position', x: 1, y: 0, z: 2, rotationY: 90,
  }));
  aliceWs.send(JSON.stringify({ type: 'chat', text: 'Hello, room!' }));

  const messages = await bobMessages;
  const roster = messages.find((m) => m.type === 'roster');
  const position = messages.find((m) => m.type === 'position');
  const chat = messages.find((m) => m.type === 'chat');

  assert.ok(roster.members.some((m) => m.username === alice.account.username));
  assert.equal(position.username, alice.account.username);
  assert.deepEqual({ x: position.x, y: position.y, z: position.z }, { x: 1, y: 0, z: 2 });
  assert.equal(chat.username, alice.account.username);
  assert.equal(chat.text, 'Hello, room!');

  aliceWs.close();
  bobWs.close();
});

test('chat text is sanitised: an HTML-looking message survives as plain text, never executable markup', async () => {
  const alice = await registerAndLogIn(freshUsername('alice'));
  const bob = await registerAndLogIn(freshUsername('bob'));
  const aliceWs = connectWs(alice.cookie);
  const bobWs = connectWs(bob.cookie);
  const bobRoster = collectMessages(bobWs, 1); // attached before 'open' — see the earlier test's comment
  await Promise.all([waitForOpen(aliceWs), waitForOpen(bobWs)]);
  await bobRoster;

  const chatPromise = collectMessages(bobWs, 1);
  aliceWs.send(JSON.stringify({ type: 'chat', text: '  <script>alert(1)</script>   with   extra   spaces  ' }));
  const [chat] = await chatPromise;

  assert.equal(chat.text, '<script>alert(1)</script> with extra spaces');
  aliceWs.close();
  bobWs.close();
});

test('a report writes a row to the database, naming the reporter from their own session, not the message', async () => {
  const alice = await registerAndLogIn(freshUsername('alice'));
  const bob = await registerAndLogIn(freshUsername('bob'));
  const aliceWs = connectWs(alice.cookie);
  const bobWs = connectWs(bob.cookie);
  const rosters = Promise.all([collectMessages(aliceWs, 1), collectMessages(bobWs, 1)]);
  await Promise.all([waitForOpen(aliceWs), waitForOpen(bobWs)]);
  await rosters;

  const ackPromise = collectMessages(bobWs, 1);
  bobWs.send(JSON.stringify({
    type: 'report', targetUserId: alice.account.id, reason: 'harassment', messageExcerpt: 'unwanted messages',
  }));
  const [ack] = await ackPromise;
  assert.equal(ack.type, 'report-ack');

  const row = db.prepare('SELECT * FROM reports WHERE reporter_id = ?').get(bob.account.id);
  assert.equal(row.reported_username, alice.account.username);
  assert.equal(row.reason, 'harassment');

  aliceWs.close();
  bobWs.close();
});

test('blocking a user stops their position and chat from being relayed to the blocker', async () => {
  const alice = await registerAndLogIn(freshUsername('alice'));
  const bob = await registerAndLogIn(freshUsername('bob'));
  const aliceWs = connectWs(alice.cookie);
  const bobWs = connectWs(bob.cookie);
  const rosters = Promise.all([collectMessages(aliceWs, 1), collectMessages(bobWs, 1)]);
  await Promise.all([waitForOpen(aliceWs), waitForOpen(bobWs)]);
  await rosters;

  const blockAckPromise = collectMessages(bobWs, 1);
  bobWs.send(JSON.stringify({ type: 'block', targetUserId: alice.account.id }));
  const [blockAck] = await blockAckPromise;
  assert.equal(blockAck.type, 'blocked');

  // Bob should receive nothing further from Alice: collectMessages resolves
  // on its timeout, with an empty array, if nothing arrives.
  const afterBlock = collectMessages(bobWs, 1);
  aliceWs.send(JSON.stringify({
    type: 'position', x: 5, y: 0, z: 5, rotationY: 0,
  }));
  const messages = await afterBlock;
  assert.equal(messages.length, 0);

  aliceWs.close();
  bobWs.close();
});
