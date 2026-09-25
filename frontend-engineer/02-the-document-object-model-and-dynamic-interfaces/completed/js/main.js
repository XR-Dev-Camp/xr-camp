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

function drawAll() {
  map.replaceChildren(...catalog.phases.map((phase) => renderPhase(phase, groups[phase.phase] ?? [])));
  renderOverall(overall, catalog.lessons);
  renderNextUp(nextUp, catalog.lessons);
  goalList.replaceChildren(...state.goals.map(goalItem));
}

// EVENT DELEGATION: one listener on the whole map, instead of 58 listeners on
// 58 checkboxes. Events "bubble" up from the checkbox to its ancestors, so
// the map hears every change, and event.target says which checkbox it was.
map.addEventListener('change', (event) => {
  const box = event.target;
  if (box.type !== 'checkbox') return;
  const row = box.closest('[data-lesson-id]');
  setDone(row.dataset.lessonId, box.checked);

  // Update only what changed. The checkbox itself is not rebuilt, so the
  // keyboard focus stays exactly where the learner left it.
  const section = box.closest('.phase');
  updatePhaseProgress(section, groups[section.dataset.phase]);
  renderOverall(overall, catalog.lessons);
  renderNextUp(nextUp, catalog.lessons);
  status.textContent = `${row.querySelector('.lesson-title').textContent} marked as ${box.checked ? 'done' : 'not done'}.`;
});

goalForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = goalInput.value.trim();
  if (text === '') {
    status.textContent = 'Type a goal first.';
    goalInput.focus();
    return;
  }
  goalList.append(goalItem(addGoal(text)));
  goalInput.value = '';
  goalInput.focus();                       // ready for the next goal
  status.textContent = `Goal added: ${text}.`;
});

// Delegation again, for every Remove button, including ones added later.
goalList.addEventListener('click', (event) => {
  const button = event.target.closest('.remove');
  if (!button) return;
  const item = button.closest('[data-goal-id]');
  const text = item.querySelector('span').textContent;
  const index = removeGoal(item.dataset.goalId);
  item.remove();

  // FOCUS MANAGEMENT: the focused button no longer exists. Move focus
  // somewhere sensible: the next goal's Remove button, or the previous one,
  // or the input if the list is now empty.
  const buttons = goalList.querySelectorAll('.remove');
  const target = buttons[index] ?? buttons[index - 1] ?? goalInput;
  target.focus();
  status.textContent = `Goal removed: ${text}.`;
});

try {
  catalog = await loadCatalog();
  groups = groupByPhase(catalog.lessons);
  drawAll();
} catch (error) {
  map.textContent = `The course data could not be loaded: ${error.message}`;
}
