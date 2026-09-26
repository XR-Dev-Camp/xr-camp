// progress-store.js: which lessons are done. The ONLY module that changes it.
//
// Course 2.2 kept this in state.js, and Course 2.5 in progress.js: two pages,
// two copies of the same idea. Now one store serves the dashboard, the course
// map, and the 3D view, with the store pattern from Course 2.3: read with
// getDone(), change with setDone(), hear about changes with subscribe().
//
// Same key, same shape: { done: [...ids], goals: [...] }. The 2.2 goals are
// kept untouched, even though this app does not show them.

import { PROGRESS_KEY } from '../config.js';

const listeners = new Set();
let saved = read();

function read() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? '{}') ?? {};
  } catch {
    return {};                 // storage blocked, or the saved text is broken
  }
}

function notify() {
  const done = getDone();
  for (const listener of listeners) listener(done);
}

// A new Set each time: nobody outside can change the store's own copy.
export function getDone() {
  return new Set(saved.done ?? []);
}

export function setDone(lessonId, isDone) {
  const done = getDone();
  if (isDone) done.add(lessonId);
  else done.delete(lessonId);
  saved = { ...saved, done: [...done] };
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(saved));
  } catch (error) {
    console.warn('Progress could not be saved in this browser:', error);
  }
  notify();
}

// Call listener(doneSet) after every change. Returns a function that stops it.
export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// Another tab changed it (the 2.5 lesson cards, say, open at the same time):
// the "storage" event fires in every OTHER tab of the same origin.
window.addEventListener('storage', (event) => {
  if (event.key !== PROGRESS_KEY) return;
  saved = read();
  notify();
});
