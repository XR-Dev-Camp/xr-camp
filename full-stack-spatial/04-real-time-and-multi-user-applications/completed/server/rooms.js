// rooms.js: who is connected, and to which room. A room is nothing more
// than a Map of connectionId -> member, kept in this module's memory — the
// same "one process, in memory, gone on restart" trade-off Course 5.2 made
// for sessions, and honest about it for the same reason: it does not scale
// past one server process, and Course 5.8 revisits that.
//
// Everything a member "is", as far as this module and realtime.js are
// concerned, comes from the server's own bookkeeping — never from a message
// the client sent. A member's userId and username are fixed at join time
// from the authenticated session (see wsAuth.js) and never change again for
// that connection.

// A small, fixed allow-list rather than an arbitrary client-chosen string:
// this lesson's exhibit only ever has one room, but keeping the concept of
// a roomId (checked against a list, not accepted blindly) is what makes
// adding a second room later a one-line change instead of a rewrite.
export const KNOWN_ROOMS = ['main-hall'];

const rooms = new Map(); // roomId -> Map<connectionId, member>

function roomMap(roomId) {
  if (!rooms.has(roomId)) rooms.set(roomId, new Map());
  return rooms.get(roomId);
}

// Adds a member to a room. `member` already carries everything realtime.js
// needs: connectionId, userId, username, ws, its last known position, and
// the Set of userIds it has blocked.
export function joinRoom(roomId, member) {
  roomMap(roomId).set(member.connectionId, member);
}

export function leaveRoom(roomId, connectionId) {
  const room = rooms.get(roomId);
  if (!room) return;
  room.delete(connectionId);
  if (room.size === 0) rooms.delete(roomId);
}

export function getMember(roomId, connectionId) {
  return rooms.get(roomId)?.get(connectionId) ?? null;
}

export function membersOf(roomId) {
  return [...(rooms.get(roomId)?.values() ?? [])];
}

// A plain, server-built snapshot — every field here is something the
// server itself recorded, never a value read back out of a client message —
// safe to send to a newly joined member as "who else is here right now".
export function presenceList(roomId) {
  return membersOf(roomId).map((member) => ({
    userId: member.userId,
    username: member.username,
    x: member.position.x,
    y: member.position.y,
    z: member.position.z,
    rotationY: member.rotationY,
  }));
}

// Sends `data` (already a JSON-ready object) to every member of a room
// except the one connection named by `exceptConnectionId`, skipping anyone
// who cannot currently receive it (a closing socket) or who has blocked the
// sender named by `fromUserId`. Blocking is enforced here, in one place,
// so no message type can accidentally forget to check it.
export function broadcast(roomId, data, { exceptConnectionId, fromUserId } = {}) {
  const json = JSON.stringify(data);
  for (const member of membersOf(roomId)) {
    if (member.connectionId === exceptConnectionId) continue;
    if (fromUserId && member.blockedUserIds.has(fromUserId)) continue;
    if (member.ws.readyState === member.ws.OPEN) member.ws.send(json);
  }
}
