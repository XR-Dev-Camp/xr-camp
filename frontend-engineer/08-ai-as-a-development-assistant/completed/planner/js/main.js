// main.js: wires everything together. It is the only module that knows
// about this page's elements and events. It holds no data of its own.

import { getSessions, subscribe, addSession, toggleSession, removeSession } from './store.js';
import { renderSessionList } from './components/session-list.js';
import { weekSummary } from './components/week-summary.js';

const form = document.querySelector('#session-form');
const daySelect = document.querySelector('#day');
const timeInput = document.querySelector('#time');
const topicInput = document.querySelector('#topic');
const topicError = document.querySelector('#topic-error');
const lists = document.querySelector('#lists');
const todoList = document.querySelector('#todo-list');
const doneList = document.querySelector('#done-list');
const summary = document.querySelector('#summary');
const status = document.querySelector('#status');

// Draw the page from the state. Called once now, then after every change.
function render(sessions) {
  renderSessionList(todoList, sessions.filter((session) => !session.done));
  renderSessionList(doneList, sessions.filter((session) => session.done));
  summary.replaceChildren(...weekSummary(sessions));
}

function announce(message) {
  status.textContent = message;
}

function showTopicError(message) {
  topicError.textContent = message;
  topicError.hidden = !message;
  topicInput.setAttribute('aria-invalid', String(Boolean(message)));
}

// Adding: check the input, add to the store, and keep focus in the topic box
// so the learner can add another straight away.
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const topic = topicInput.value.trim();
  if (!topic) {
    showTopicError('Write what you will study.');
    topicInput.focus();
    // Review item 7: when Enter is pressed inside the topic box, focus is
    // already there, so focus() changes nothing and a screen reader said
    // nothing new. Announce the error through the page's one status region.
    announce('Write what you will study.');
    return;
  }
  showTopicError('');
  const session = addSession({ day: daySelect.value, time: timeInput.value, topic });
  topicInput.value = '';
  topicInput.focus();
  announce(`Added: ${session.topic}, ${session.day} at ${session.time}.`);
});

// One delegated listener for every Done, Not done, and Delete button.
lists.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const { id } = button.closest('[data-id]').dataset;

  if (button.dataset.action === 'toggle') {
    const session = toggleSession(id);
    // The list redrew, and the session moved list: follow it with focus.
    lists.querySelector(`[data-id="${id}"] .toggle`).focus();
    announce(`${session.topic} moved to ${session.done ? 'Done' : 'Still to do'}.`);
  }

  if (button.dataset.action === 'delete') {
    const list = button.closest('ul');
    const index = [...list.querySelectorAll('.delete')].indexOf(button);
    const session = removeSession(id);
    // Focus the next Delete button in the same list, or the previous one,
    // or go back to the form.
    const buttons = list.querySelectorAll('.delete');
    (buttons[index] ?? buttons[index - 1] ?? topicInput).focus();
    announce(`Deleted: ${session.topic}.`);
  }
});

subscribe(render);
render(getSessions());

// The form works now: show it (it is hidden until JavaScript has loaded).
form.hidden = false;
