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

// TODO 5a: joinRoom(roomId, member) and leaveRoom(roomId, connectionId).
// joinRoom adds `member` (an object realtime.js already built, keyed by its
// own connectionId) to roomMap(roomId). leaveRoom removes connectionId from
// that room's Map, and — since an empty room serves no purpose sitting in
// memory — deletes the room from `rooms` entirely once its Map is empty.
export function joinRoom(roomId, member) {
  throw new Error('joinRoom is not implemented yet — see TODO 5a');
}

export function leaveRoom(roomId, connectionId) {
  throw new Error('leaveRoom is not implemented yet — see TODO 5a');
}

export function getMember(roomId, connectionId) {
  return rooms.get(roomId)?.get(connectionId) ?? null;
}

export function membersOf(roomId) {
  return [...(rooms.get(roomId)?.values() ?? [])];
}

// TODO 5b: presenceList(roomId). Return an array built from membersOf(),
// with exactly these fields per member: userId, username, x, y, z (from
// member.position), and rotationY. This is what a newly joined learner
// receives as "who is already here" — every field must come from the
// server's own record of that member, never from a value re-read out of a
// message, because this snapshot is itself sent to other clients as ground
// truth.
export function presenceList(roomId) {
  throw new Error('presenceList is not implemented yet — see TODO 5b');
}

// TODO 5c: broadcast(roomId, data, { exceptConnectionId, fromUserId } = {}).
// Send JSON.stringify(data) to every member of roomId, except:
//   - the member whose connectionId === exceptConnectionId (if given —
//     usually the sender, which normally hears its own position/chat
//     through its own UI update instead of a round trip)
//   - any member whose blockedUserIds (a Set) contains fromUserId (if
//     given) — see server/realtime.js's comment on why blocking is
//     enforced here, in one place, rather than in every message handler
// Only send to a socket whose readyState is OPEN (member.ws.OPEN) — a
// socket that is in the middle of closing should not be written to.
export function broadcast(roomId, data, { exceptConnectionId, fromUserId } = {}) {
  throw new Error('broadcast is not implemented yet — see TODO 5c');
}
