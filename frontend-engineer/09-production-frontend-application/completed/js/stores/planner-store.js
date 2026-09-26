// planner-store.js: the planner's sessions, and the ONLY module that changes
// them. Copied from Course 2.3 (store.js) with one change: the storage key's
// name is PLANNER_KEY, because the app now has five keys. Its value, 'xrc_s',
// is the same, so saved sessions carry over.

import { PLANNER_KEY } from '../config.js';
import { bySchedule } from '../utils.js';

let sessions = load();
const listeners = new Set();

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(PLANNER_KEY)) ?? [];
    return saved.map(upgrade);
  } catch {
    return [];
  }
}

// Sessions saved by the old app had one-letter names ({ d, t, w }) and no id.
function upgrade(saved) {
  return {
    id: saved.id ?? crypto.randomUUID(),
    day: saved.day ?? saved.d,
    time: saved.time ?? saved.t,
    topic: saved.topic ?? saved.w,
    done: Boolean(saved.done),
  };
}

function save() {
  try {
    localStorage.setItem(PLANNER_KEY, JSON.stringify(sessions));
  } catch {
    // Storage switched off, or full: the planner still works until reload.
  }
}

function commit() {
  save();
  const snapshot = getSessions();
  for (const listener of listeners) listener(snapshot);
}

function find(id) {
  return sessions.find((session) => session.id === id);
}

export function getSessions() {
  return [...sessions].sort(bySchedule);
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function addSession({ day, time, topic }) {
  const session = { id: crypto.randomUUID(), day, time, topic, done: false };
  sessions.push(session);
  commit();
  return session;
}

export function toggleSession(id) {
  const session = find(id);
  session.done = !session.done;
  commit();
  return session;
}

export function removeSession(id) {
  const session = find(id);
  sessions = sessions.filter((s) => s.id !== id);
  commit();
  return session;
}
