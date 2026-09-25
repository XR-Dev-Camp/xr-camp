// store.js: the planner's state, and the ONLY module that changes it.
// Other modules read it with getSessions(), change it with the three
// actions, and hear about changes with subscribe(). Only this module
// touches localStorage.

import { STORAGE_KEY } from './config.js';
import { bySchedule } from './utils.js';

let sessions = load();
const listeners = new Set();

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
    return saved.map(upgrade);
  } catch {
    // Storage blocked, or the saved text is broken: start empty.
    return [];
  }
}

// Sessions saved by the old app had one-letter names ({ d, t, w }) and no id.
// Data lives longer than code: read both shapes, save only the new one.
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch {
    // Storage switched off, or full: the planner still works until reload.
  }
}

// Save, then tell every listener. Every action ends here.
function commit() {
  save();
  const snapshot = getSessions();
  for (const listener of listeners) listener(snapshot);
}

function find(id) {
  return sessions.find((session) => session.id === id);
}

// A sorted copy: sorting never changes the stored array.
export function getSessions() {
  return [...sessions].sort(bySchedule);
}

// Call listener(sessions) after every change. Returns a function that stops it.
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
