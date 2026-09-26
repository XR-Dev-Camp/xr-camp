// rooms.js: trimmed from Course 5.4's rooms.js to what this lesson needs --
// one chat room, no position sync, no block/mute/report (5.4 already
// taught those; this lesson reuses only the shape of a room registry to
// carry chat, this lesson's second stored-XSS target).
export const KNOWN_ROOMS = ['review-room'];

const rooms = new Map(); // roomId -> Map<connectionId, member>

function roomMap(roomId) {
  if (!rooms.has(roomId)) rooms.set(roomId, new Map());
  return rooms.get(roomId);
}

export function joinRoom(roomId, member) {
  roomMap(roomId).set(member.connectionId, member);
}

export function leaveRoom(roomId, connectionId) {
  const room = rooms.get(roomId);
  if (!room) return;
  room.delete(connectionId);
  if (room.size === 0) rooms.delete(roomId);
}

export function membersOf(roomId) {
  return [...(rooms.get(roomId)?.values() ?? [])];
}

// Sends `data` to every member of a room except the one connection named by
// `exceptConnectionId`, skipping any socket that is already on its way out.
export function broadcast(roomId, data, { exceptConnectionId } = {}) {
  const json = JSON.stringify(data);
  for (const member of membersOf(roomId)) {
    if (member.connectionId === exceptConnectionId) continue;
    if (member.ws.readyState === member.ws.OPEN) member.ws.send(json);
  }
}
