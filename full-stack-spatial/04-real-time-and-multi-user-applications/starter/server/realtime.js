// realtime.js: what happens to one already-authenticated WebSocket
// connection, from the moment it opens to the moment it closes. server.js
// calls handleConnection(ws, { user, roomId }) once per connection, after
// wsAuth.js has already proved who is holding the browser — nothing in this
// file re-checks identity, but everything in it re-checks *content*, because
// the identity check happened once, at the door, and every message after
// that still comes from a browser this server does not control.
//
// See the README's "What never to trust from a client" table for the full
// list this file enforces: identity, timestamps, rate, length, and room
// membership are never taken on the client's word.
//
// The connection lifecycle below (join, message routing, close, heartbeat)
// is finished for you. The four message handlers — handlePosition,
// handleChat, handleBlock, handleReport — are TODOs 6-9.

import { randomUUID } from 'node:crypto';
import {
  broadcast, joinRoom, KNOWN_ROOMS, leaveRoom, presenceList,
} from './rooms.js';
import { validateChatText, validatePosition, validateReport } from './validation.js';
import { sanitizeChatText } from './sanitize.js';
import { insertReport } from './db.js';

// Position sync: never faster than this many updates per second per
// connection, no matter how fast the client sends. 10 Hz is fast enough
// that motion in a small room reads as smooth once the receiving client
// interpolates between updates (see js/net.js and js/scene.js) and slow
// enough that a room of a dozen learners does not flood every browser with
// messages. The client throttles its own sends to the same rate (js/net.js)
// purely to be a good citizen; this check is what actually enforces it,
// because a modified or malicious client could ignore its own throttle.
const POSITION_MIN_INTERVAL_MS = 100; // 10 Hz

// Chat: a short sliding window, deliberately much faster than
// rateLimit.js's 15-minute login window (see that file's comment) — a real
// conversation needs to allow a burst of a few messages, not one every
// three minutes, while still stopping a script from flooding the room.
const CHAT_WINDOW_MS = 10_000;
const CHAT_MAX_MESSAGES = 5;

function send(ws, data) {
  if (ws.readyState === ws.OPEN) ws.send(JSON.stringify(data));
}

export function handleConnection(ws, { user, roomId }) {
  if (!KNOWN_ROOMS.includes(roomId)) {
    send(ws, { type: 'error', error: `Unknown room "${roomId}".` });
    ws.close(1008, 'Unknown room');
    return;
  }

  const member = {
    connectionId: randomUUID(),
    userId: user.id,
    username: user.username,
    ws,
    position: { x: 0, y: 0, z: 0 },
    rotationY: 0,
    blockedUserIds: new Set(), // userIds THIS connection has blocked
    lastPositionAt: 0,
    chatTimestamps: [], // for this connection's own sliding-window chat limit
    isAlive: true,
  };

  // A newly joined member first learns who is already here — a server-built
  // snapshot (rooms.js's presenceList), never anything the new connection
  // itself asserts.
  joinRoom(roomId, member);
  send(ws, { type: 'roster', room: roomId, members: presenceList(roomId).filter((m) => m.userId !== user.id) });
  broadcast(roomId, { type: 'presence', event: 'join', userId: user.id, username: user.username }, {
    exceptConnectionId: member.connectionId,
  });

  // Liveness: a client whose network died without a clean close (a laptop
  // put to sleep, a phone losing signal) leaves a socket that looks open
  // but never answers. Node's ws sends a ping every interval and expects a
  // pong back; a connection that misses one round trip is terminated, which
  // triggers the same 'close' handling as any other disconnect below.
  ws.on('pong', () => { member.isAlive = true; });

  ws.on('message', (raw) => {
    let message;
    try {
      message = JSON.parse(raw.toString());
    } catch {
      return send(ws, { type: 'error', error: 'Message must be valid JSON.' });
    }
    if (typeof message !== 'object' || message === null || typeof message.type !== 'string') {
      return send(ws, { type: 'error', error: 'Message must have a string "type".' });
    }

    if (message.type === 'position') return handlePosition(roomId, member, message);
    if (message.type === 'chat') return handleChat(roomId, member, message);
    if (message.type === 'block') return handleBlock(member, message, true);
    if (message.type === 'unblock') return handleBlock(member, message, false);
    if (message.type === 'report') return handleReport(roomId, member, message);

    send(ws, { type: 'error', error: `Unknown message type "${message.type}".` });
  });

  ws.on('close', () => {
    leaveRoom(roomId, member.connectionId);
    broadcast(roomId, { type: 'presence', event: 'leave', userId: user.id, username: user.username });
  });
}

// Called by server.js's heartbeat interval, once per room member, every
// interval: sends a ping and marks the member "not yet answered". If the
// next interval finds isAlive still false, the connection is terminated.
export function heartbeat(member) {
  if (!member.isAlive) {
    member.ws.terminate();
    return false;
  }
  member.isAlive = false;
  member.ws.ping();
  return true;
}

// --- Position (TODO 6) -------------------------------------------------------
//
// Write handlePosition(roomId, member, message):
//   1. Rate-limit first, before validating: if
//      Date.now() - member.lastPositionAt < POSITION_MIN_INTERVAL_MS,
//      return immediately (drop the message silently — see the comment on
//      POSITION_MIN_INTERVAL_MS above for why this is enforced here, not
//      just trusted from the client).
//   2. Validate with validatePosition(message) (TODO 2a). If invalid, send
//      an { type: 'error', error: ... } back to `ws` and return.
//   3. Update member.lastPositionAt = Date.now(), member.position, and
//      member.rotationY from the validated value.
//   4. broadcast() the update to the rest of the room, as
//      { type: 'position', userId: member.userId, username: member.username,
//      serverTime: <now>, x, y, z, rotationY } — note that userId, username,
//      and serverTime come from the server's own records, never from
//      `message` — with { exceptConnectionId: member.connectionId,
//      fromUserId: member.userId } so the sender does not hear its own echo
//      and a blocking listener is skipped.

function handlePosition(roomId, member, message) {
  throw new Error('handlePosition is not implemented yet — see TODO 6');
}

// --- Chat (TODO 7) -----------------------------------------------------------
//
// Write isChatRateLimited(member, now) and handleChat(roomId, member, message):
//   - isChatRateLimited: filter member.chatTimestamps down to only the
//     timestamps within the last CHAT_WINDOW_MS, then return whether there
//     are already CHAT_MAX_MESSAGES or more.
//   - handleChat: check the rate limit first (send an error and return if
//     limited); validate with validateChatText(message) (TODO 2b); if
//     invalid, send an error and return; push `now` onto
//     member.chatTimestamps; sanitize the trimmed text with
//     sanitizeChatText() (TODO 3); if nothing is left after sanitizing,
//     return without broadcasting; otherwise broadcast()
//     { type: 'chat', userId: member.userId, username: member.username,
//     text, serverTime: now } with { fromUserId: member.userId } — no
//     exceptConnectionId this time, so the sender's own message also comes
//     back, keeping everyone's chat log in the same order.

function isChatRateLimited(member, now) {
  throw new Error('isChatRateLimited is not implemented yet — see TODO 7');
}

function handleChat(roomId, member, message) {
  throw new Error('handleChat is not implemented yet — see TODO 7');
}

// --- Block / unblock (TODO 8) ------------------------------------------------
// Enforced here, server-side, so it survives even if the blocked person's
// own client ignores it: once blocked, rooms.js's broadcast() stops
// delivering that userId's position and chat to this connection, until
// unblocked. (Muting, in contrast, is a purely local choice the blocking
// person's own browser makes without telling the server — see js/main.js —
// which is enough when the goal is simply "stop showing me this", and one
// fewer round trip for something that does not need one.)
//
// Write handleBlock(member, message, blocked): read message.targetUserId
// (a non-empty string, or send an error and return); add it to
// member.blockedUserIds if `blocked` is true, delete it if false; send back
// { type: blocked ? 'blocked' : 'unblocked', targetUserId }.

function handleBlock(member, message, blocked) {
  throw new Error('handleBlock is not implemented yet — see TODO 8');
}

// --- Reports (TODO 9) ---------------------------------------------------------
//
// Write handleReport(roomId, member, message):
//   1. Validate with validateReport(message) (TODO 2c); on failure, send an
//      error and return.
//   2. Resolve the reported account's *current* username from the server's
//      own roster — presenceList(roomId).find((m) => m.userId ===
//      value.targetUserId) — never from a username string the client might
//      have sent; fall back to a neutral note ("a member who has since
//      left") if nobody in the room has that userId any more.
//   3. Call insertReport({ roomId, reporterId: member.userId, ... }) — the
//      reporter is always this connection's own authenticated identity,
//      never anything from `message`.
//   4. Send back { type: 'report-ack' }.

function handleReport(roomId, member, message) {
  throw new Error('handleReport is not implemented yet — see TODO 9');
}
