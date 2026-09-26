// data.js: the same progress and goals data as Course 2.2's flat learning
// dashboard, read from the same place. This file has no TODOs: it is given
// finished, the same way 2.2's own state.js was, so the lesson's time goes
// into the spatial design questions, not into rebuilding localStorage code
// you have already written once.
//
// Because localStorage is shared by every page on the same origin, opening
// this lesson after finishing 2.2 in the same browser shows your real
// progress here too — the same "My XR Camp" data, redesigned in space.

const KEY = 'my-xr-camp-progress';

function readState() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? '{}');
    return { done: new Set(saved.done ?? []), goals: saved.goals ?? [] };
  } catch {
    return { done: new Set(), goals: [] };
  }
}

export const state = readState();

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify({ done: [...state.done], goals: state.goals }));
  } catch (error) {
    console.warn('Progress could not be saved in this browser:', error);
  }
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
  return index;
}

let catalogPromise;

// Builds the same numbers as 2.2's dashboard (overall progress, each phase's
// progress, and the next ready, unfinished lesson) from the same catalog
// snapshot, so the spatial kiosk panel can show them.
export function loadDashboardData() {
  catalogPromise ??= fetch(new URL('../data/catalog.json', import.meta.url)).then((r) => r.json());
  return catalogPromise.then((catalog) => {
    const readyLessons = catalog.lessons.filter((lesson) => lesson.status === 'ready');
    const overallDone = readyLessons.filter((lesson) => state.done.has(lesson.id)).length;

    const phases = catalog.phases
      .map((phase) => {
        const inPhase = readyLessons.filter((lesson) => lesson.phase === phase.phase);
        return { phase: phase.phase, title: phase.title, done: inPhase.filter((l) => state.done.has(l.id)).length, total: inPhase.length };
      })
      .filter((phase) => phase.total > 0);

    const nextUp = catalog.lessons.find((lesson) => lesson.status === 'ready' && !state.done.has(lesson.id));

    return { overallDone, overallTotal: readyLessons.length, phases, nextUp, goals: state.goals };
  });
}
