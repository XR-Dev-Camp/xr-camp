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

// --- Position ------------------------------------------------------------

function handlePosition(roomId, member, message) {
  const now = Date.now();
  if (now - member.lastPositionAt < POSITION_MIN_INTERVAL_MS) return; // silently dropped: see POSITION_MIN_INTERVAL_MS

  const { valid, value } = validatePosition(message);
  if (!valid) return send(member.ws, { type: 'error', error: 'Invalid position.' });

  member.lastPositionAt = now;
  member.position = { x: value.x, y: value.y, z: value.z };
  member.rotationY = value.rotationY;

  // The relayed message names the sender by the server's own record of who
  // this connection is (userId, username) — never anything the incoming
  // message carried — and stamps the server's own clock, not the client's,
  // since a client's clock cannot be trusted to agree with anyone else's.
  broadcast(roomId, {
    type: 'position', userId: member.userId, username: member.username, serverTime: now, ...value,
  }, { exceptConnectionId: member.connectionId, fromUserId: member.userId });
}

// --- Chat ------------------------------------------------------------------

function isChatRateLimited(member, now) {
  member.chatTimestamps = member.chatTimestamps.filter((t) => now - t < CHAT_WINDOW_MS);
  return member.chatTimestamps.length >= CHAT_MAX_MESSAGES;
}

function handleChat(roomId, member, message) {
  const now = Date.now();
  if (isChatRateLimited(member, now)) {
    return send(member.ws, { type: 'error', error: 'You are sending messages too quickly. Wait a moment.' });
  }

  const { valid, errors, value } = validateChatText(message);
  if (!valid) return send(member.ws, { type: 'error', error: errors[0] });

  member.chatTimestamps.push(now);
  const text = sanitizeChatText(value.text);
  if (text.length === 0) return; // nothing left after sanitizing (e.g. only control characters)

  broadcast(roomId, {
    type: 'chat', userId: member.userId, username: member.username, text, serverTime: now,
  }, { fromUserId: member.userId }); // included for the sender too, so their own message appears in order
}

// --- Block / unblock ---------------------------------------------------------
// Enforced here, server-side, so it survives even if the blocked person's
// own client ignores it: once blocked, rooms.js's broadcast() stops
// delivering that userId's position and chat to this connection, until
// unblocked. (Muting, in contrast, is a purely local choice the blocking
// person's own browser makes without telling the server — see js/main.js —
// which is enough when the goal is simply "stop showing me this", and one
// fewer round trip for something that does not need one.)

function handleBlock(member, message, blocked) {
  const targetUserId = typeof message.targetUserId === 'string' ? message.targetUserId : '';
  if (!targetUserId) return send(member.ws, { type: 'error', error: 'targetUserId is required.' });
  if (blocked) member.blockedUserIds.add(targetUserId);
  else member.blockedUserIds.delete(targetUserId);
  send(member.ws, { type: blocked ? 'blocked' : 'unblocked', targetUserId });
}

// --- Reports -----------------------------------------------------------------

function handleReport(roomId, member, message) {
  const { valid, errors, value } = validateReport(message);
  if (!valid) return send(member.ws, { type: 'error', error: errors[0] });

  // The reported username is resolved from the server's own roster, from
  // the userId the client named — never taken as a string the client sent
  // directly — so a report always names a real member of this room, even
  // one who has since left (falling back to a neutral note in that case).
  const targetMember = presenceList(roomId).find((m) => m.userId === value.targetUserId);
  const reportedUsername = targetMember?.username ?? 'a member who has since left';

  insertReport({
    roomId,
    reporterId: member.userId, // always the reporting connection's own identity
    reportedUsername,
    reason: value.reason,
    messageExcerpt: value.messageExcerpt,
  });

  send(member.ws, { type: 'report-ack' });
}
