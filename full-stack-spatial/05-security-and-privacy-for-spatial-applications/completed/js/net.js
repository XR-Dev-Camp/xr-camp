// net.js: the one file that owns the chat WebSocket connection, trimmed
// from Course 5.4's net.js to chat only (no position sync, block, mute, or
// report -- 5.4 already taught those). Reconnects automatically, with
// exponential backoff and full jitter, so one dropped connection during a
// review session does not need a page reload.

const BASE_DELAY_MS = 500;
const MAX_DELAY_MS = 15_000;

function backoffDelay(attempt) {
  const ceiling = Math.min(MAX_DELAY_MS, BASE_DELAY_MS * 2 ** attempt);
  return Math.random() * ceiling;
}

// connectRoom(room, handlers): handlers is a plain object of optional
// functions -- onOpen(), onChat(msg), onPresence(msg), onError(message),
// onStatus(text).
export function connectRoom(room, handlers = {}) {
  let ws = null;
  let attempt = 0;
  let stopped = false;
  let reconnectTimer = null;

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
    // No token or header is attached: this is a same-origin ws:// URL, so
    // the browser attaches the session cookie automatically, the same way
    // a same-origin fetch() with credentials: 'include' does.
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
      if (message.type === 'chat') return emit('onChat', message);
      if (message.type === 'presence') return emit('onPresence', message);
      if (message.type === 'error') return emit('onError', message.error);
    });

    ws.addEventListener('close', (event) => {
      if (event.code === 1008) {
        emit('onStatus', `Could not join this room: ${event.reason || 'rejected by the server.'}`);
        return;
      }
      scheduleReconnect();
    });
  }

  open();

  function send(data) {
    if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(data));
  }

  return {
    sendChat(text) {
      send({ type: 'chat', text });
    },
    stop() {
      stopped = true;
      clearTimeout(reconnectTimer);
      ws?.close(1000, 'Learner left the page');
    },
  };
}
