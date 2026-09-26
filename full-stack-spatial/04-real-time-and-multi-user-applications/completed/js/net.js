// net.js: the one file that owns the WebSocket connection. scene.js and
// main.js never touch `WebSocket` directly — they call connectRoom() and
// listen for the small set of events it re-emits — so the reconnect logic
// below lives in exactly one place.
//
// Two responsibilities that both matter for a connection expected to stay
// open for a whole session, on real networks (a laptop moving between
// Wi-Fi and mobile data, a phone screen locking):
//   1. Reconnect automatically when the connection drops, without hammering
//      the server the instant it comes back up.
//   2. Never send position updates faster than the server will accept them
//      (see server/realtime.js's POSITION_MIN_INTERVAL_MS) — this file
//      throttles to the same rate, but the server enforces it independently,
//      because this client's own throttle is not something the server can
//      verify or trust (see the README's "What never to trust").

const POSITION_SEND_INTERVAL_MS = 100; // 10 Hz, matching the server's limit

const BASE_DELAY_MS = 500;
const MAX_DELAY_MS = 15_000;

// Exponential backoff with "full jitter" (AWS's Architecture Blog term for
// this exact formula): each retry waits a random amount of time between 0
// and the exponentially growing ceiling, rather than the ceiling itself.
// Without the randomness, every learner whose connection drops at the same
// moment (a shared campus Wi-Fi hiccup) would reconnect in lockstep and
// hit the server with a burst of attempts at exactly the same instants.
function backoffDelay(attempt) {
  const ceiling = Math.min(MAX_DELAY_MS, BASE_DELAY_MS * 2 ** attempt);
  return Math.random() * ceiling;
}

// connectRoom(room, handlers) opens the connection and manages reconnecting
// forever (until stop() is called). `handlers` is a plain object of
// functions: onOpen(), onRoster(members), onPresence(event), onPosition(msg),
// onChat(msg), onBlocked(msg), onReportAck(), onError(message), onStatus(text).
// Every handler is optional.
export function connectRoom(room, handlers = {}) {
  let ws = null;
  let attempt = 0;
  let stopped = false;
  let reconnectTimer = null;
  let lastPositionSentAt = 0;

  function emit(name, ...args) {
    handlers[name]?.(...args);
  }

  function scheduleReconnect() {
    if (stopped) return;
    const delay = backoffDelay(attempt);
    attempt += 1;
    emit('onStatus', `Connection lost. Reconnecting in about ${Math.round(delay / 1000)}s...`);
    reconnectTimer = setTimeout(open, delay);
  }

  function open() {
    if (stopped) return;
    // No token or header is attached here: this is a same-origin `ws://`
    // (or `wss://`) URL, so the browser attaches the session cookie the
    // login response set, automatically — the same way a same-origin
    // fetch() with credentials: 'include' does. See server/wsAuth.js.
    ws = new WebSocket(`${location.origin.replace(/^http/, 'ws')}/ws?room=${encodeURIComponent(room)}`);

    ws.addEventListener('open', () => {
      attempt = 0;
      emit('onStatus', 'Connected.');
      emit('onOpen');
    });

    ws.addEventListener('message', (event) => {
      let message;
      try {
        message = JSON.parse(event.data);
      } catch {
        return;
      }
      if (message.type === 'roster') return emit('onRoster', message.members);
      if (message.type === 'presence') return emit('onPresence', message);
      if (message.type === 'position') return emit('onPosition', message);
      if (message.type === 'chat') return emit('onChat', message);
      if (message.type === 'blocked' || message.type === 'unblocked') return emit('onBlocked', message);
      if (message.type === 'report-ack') return emit('onReportAck');
      if (message.type === 'error') return emit('onError', message.error);
    });

    ws.addEventListener('close', (event) => {
      // Code 1008 (Policy Violation) is what server.js sends for an unknown
      // room — not a dropped connection, so retrying it would only fail the
      // same way forever.
      if (event.code === 1008) {
        emit('onStatus', `Could not join this room: ${event.reason || 'rejected by the server.'}`);
        return;
      }
      scheduleReconnect();
    });

    ws.addEventListener('error', () => {
      // The 'close' event always follows 'error' for a WebSocket, so
      // reconnecting is scheduled there, not here, to avoid doing it twice.
    });
  }

  open();

  function send(data) {
    if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(data));
  }

  return {
    // Throttled to the same 10 Hz the server enforces: a caller may call
    // this on every animation frame (60 times a second) without flooding
    // the connection — extra calls in between are simply dropped, since a
    // position update, unlike a chat message, is only ever interesting for
    // its most recent value.
    sendPosition(x, y, z, rotationY) {
      const now = performance.now();
      if (now - lastPositionSentAt < POSITION_SEND_INTERVAL_MS) return;
      lastPositionSentAt = now;
      send({
        type: 'position', x, y, z, rotationY,
      });
    },
    sendChat(text) {
      send({ type: 'chat', text });
    },
    sendBlock(targetUserId, blocked) {
      send({ type: blocked ? 'block' : 'unblock', targetUserId });
    },
    sendReport(targetUserId, reason, messageExcerpt) {
      send({
        type: 'report', targetUserId, reason, messageExcerpt,
      });
    },
    stop() {
      stopped = true;
      clearTimeout(reconnectTimer);
      ws?.close(1000, 'Learner left the page');
    },
  };
}
