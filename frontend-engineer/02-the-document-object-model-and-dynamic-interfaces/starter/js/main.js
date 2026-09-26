// main.js: loads the data, draws the dashboard, and listens for changes.

import { loadCatalog, groupByPhase } from './data.js';
import { state, setDone, addGoal, removeGoal } from './state.js';
import { renderPhase, updatePhaseProgress, renderOverall, renderNextUp, goalItem } from './dashboard.js';

const map = document.querySelector('#map');
const overall = document.querySelector('#overall');
const nextUp = document.querySelector('#next-up');
const status = document.querySelector('#status');
const goalForm = document.querySelector('#goal-form');
const goalInput = document.querySelector('#goal-text');
const goalList = document.querySelector('#goals');

let catalog;
let groups;

// TODO 2: Read drawAll: it draws everything once, when the page loads.
function drawAll() {
  map.replaceChildren(...catalog.phases.map((phase) => renderPhase(phase, groups[phase.phase] ?? [])));
  renderOverall(overall, catalog.lessons);
  renderNextUp(nextUp, catalog.lessons);
  goalList.replaceChildren(...state.goals.map(goalItem));
}

// TODO 1: Before writing code, open the Elements panel (Inspector in Firefox) and explore the DOM
// tree of this page: find #map, #goals, and #status.

// TODO 7: EVENT DELEGATION. Add ONE "change" listener to #map. In it, ignore
// anything that is not a checkbox; find the lesson row with
// closest('[data-lesson-id]'); call setDone; update only this phase's progress
// (updatePhaseProgress), the overall progress, and Next up; and announce the
// change in #status. Tick a box with the keyboard: focus must stay on it.

// TODO 9: When #goal-form is submitted: prevent the reload; if the text is
// empty, say so in #status and focus the input; otherwise append a goalItem
// for addGoal(text), empty the input, keep focus in it, and announce it.

// TODO 10: ONE "click" listener on #goals for every Remove button (use
// closest('.remove')). Remove the goal from the state and the page, then MOVE
// FOCUS: to the next goal's Remove button, or the previous one, or the input
// if the list is empty. Announce what was removed.

try {
  catalog = await loadCatalog();
  groups = groupByPhase(catalog.lessons);
  drawAll();
} catch (error) {
  map.textContent = `The course data could not be loaded: ${error.message}`;
}
