// realtime.js: what happens to one already-authenticated WebSocket
// connection, from open to close. wsAuth.js has already proved who is
// holding the browser before handleConnection ever runs; this file still
// re-checks *content* on every message, because that identity check
// happened once, at the door, and every message after it still comes from
// a browser this server does not control.
import { randomUUID } from 'node:crypto';
import { broadcast, joinRoom, KNOWN_ROOMS, leaveRoom } from './rooms.js';
import { validateChatText } from './validation.js';
// FIXED (TODO 2): sanitizeText is applied here, once, at the point every
// chat message is about to be stored in every recipient's chat log --
// removing control characters and collapsing whitespace before the text
// ever leaves this server. js/main.js's matching fix renders the result
// with textContent, never innerHTML, so the two fixes are independent
// layers: either one alone would already stop a `<script>` from running
// (defense in depth -- see the README's "Key code explained").
import { sanitizeText } from './sanitize.js';

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
    connectionId: randomUUID(), userId: user.id, username: user.username, ws, isAlive: true,
  };
  joinRoom(roomId, member);
  send(ws, { type: 'joined', room: roomId });
  broadcast(roomId, { type: 'presence', event: 'join', username: user.username }, { exceptConnectionId: member.connectionId });

  ws.on('pong', () => { member.isAlive = true; });

  ws.on('message', (raw) => {
    let message;
    try {
      message = JSON.parse(raw.toString());
    } catch {
      return send(ws, { type: 'error', error: 'Message must be valid JSON.' });
    }
    if (typeof message !== 'object' || message === null || message.type !== 'chat') {
      return send(ws, { type: 'error', error: 'Unknown message type.' });
    }

    const { valid, errors, value } = validateChatText(message);
    if (!valid) return send(ws, { type: 'error', error: errors[0] });

    const text = sanitizeText(value.text);
    if (text.length === 0) return; // nothing left after sanitizing

    broadcast(roomId, {
      type: 'chat', username: member.username, text, serverTime: Date.now(),
    });
  });

  ws.on('close', () => {
    leaveRoom(roomId, member.connectionId);
    broadcast(roomId, { type: 'presence', event: 'leave', username: user.username });
  });
}

export function heartbeat(member) {
  if (!member.isAlive) {
    member.ws.terminate();
    return false;
  }
  member.isAlive = false;
  member.ws.ping();
  return true;
}
