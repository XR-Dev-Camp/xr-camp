// state.js: what the learner has done, and their goals, kept in the browser.
//
// The rest of the app never touches localStorage directly: it asks this
// module. If storage ever changes (say, to a server in Phase 5), only this
// file changes.

const KEY = 'my-xr-camp-progress';

function read() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? '{}');
    return { done: new Set(saved.done ?? []), goals: saved.goals ?? [] };
  } catch {
    return { done: new Set(), goals: [] };
  }
}

// One object holds the whole state of the dashboard.
export const state = read();

export function save() {
  try {
    // A Set cannot be turned into JSON directly, so save it as an array.
    localStorage.setItem(KEY, JSON.stringify({ done: [...state.done], goals: state.goals }));
  } catch (error) {
    console.warn('Progress could not be saved in this browser:', error);
  }
}

export function setDone(lessonId, isDone) {
  if (isDone) state.done.add(lessonId);
  else state.done.delete(lessonId);
  save();
}

export function addGoal(text) {
  const goal = { id: crypto.randomUUID(), text };
  state.goals.push(goal);
  save();
  return goal;
}

export function removeGoal(id) {
  const index = state.goals.findIndex((goal) => goal.id === id);
  if (index !== -1) state.goals.splice(index, 1);
  save();
  return index;   // the caller uses this to decide where focus goes next
}
