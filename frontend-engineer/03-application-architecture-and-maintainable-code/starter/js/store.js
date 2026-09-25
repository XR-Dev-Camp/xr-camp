// store.js: the planner's state, and the ONLY module that changes it.
// Only this module touches localStorage.

import { STORAGE_KEY } from './config.js';
import { bySchedule } from './utils.js';

let sessions = load();
const listeners = new Set();

// TODO 6: Write load(), upgrade(saved), and save().
// - load(): read STORAGE_KEY, parse it (null means []), and map every item
//   through upgrade(). Wrap it in try/catch and return [] if anything fails.
// - upgrade(saved): the old app saved { d, t, w, done } with no id. Return
//   { id, day, time, topic, done }, reading either shape:
//   day: saved.day ?? saved.d, and an id from crypto.randomUUID() if missing.
// - save(): write the sessions as JSON, inside try/catch (storage can be
//   switched off, or full).
function load() {
  return [];
}

// TODO 7: Write commit(): save(), then call every listener with getSessions().
// Then export:
//   getSessions()      a sorted COPY: [...sessions].sort(bySchedule)
//   subscribe(listener) add it to listeners; return a function that removes it
// Why a copy? The old app sorted the real array inside its render function.

// TODO 8: Export the three actions. Each changes sessions, calls commit(),
// and returns the session it changed:
//   addSession({ day, time, topic })  (new id, done: false)
//   toggleSession(id)
//   removeSession(id)
// Work with ids, never array positions: positions change when you sort.
