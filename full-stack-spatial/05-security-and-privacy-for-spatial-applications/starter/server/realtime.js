// DELIBERATELY VULNERABLE -- for learning on localhost only; never deploy.
//
// realtime.js: what happens to one already-authenticated WebSocket
// connection, from open to close. wsAuth.js has already proved who is
// holding the browser before handleConnection ever runs; this file still
// re-checks *content* on every message, because that identity check
// happened once, at the door, and every message after it still comes from
// a browser this server does not control.
import { randomUUID } from 'node:crypto';
import { broadcast, joinRoom, KNOWN_ROOMS, leaveRoom } from './rooms.js';
import { validateChatText } from './validation.js';
// TODO 2: sanitizeText from sanitize.js is never imported here. A chat
// message is validated (shape only -- see validation.js) and then relayed
// exactly as typed. js/main.js's stored-XSS partner bug (TODO 2 there)
// renders that text with innerHTML, so a message containing
// "<img src=x onerror=alert(1)>" runs script in every open tab the moment
// it arrives -- see MDN's Cross-Site Scripting article and the README's
// "What went wrong" table for the full chain.

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

    broadcast(roomId, { type: 'chat', username: member.username, text: value.text, serverTime: Date.now() });
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
