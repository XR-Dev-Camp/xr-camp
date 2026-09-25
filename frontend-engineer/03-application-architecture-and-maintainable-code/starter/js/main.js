// main.js: wires everything together. The only module that knows this
// page's elements and events. It holds no data of its own.

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

// TODO 12: Write render(sessions): fill #todo-list with the sessions not
// done, #done-list with the done ones, and #summary with weekSummary().
// At the bottom of this file: subscribe(render), call render(getSessions())
// once, and show the form (form.hidden = false).
//
// Then handle the form's submit event: prevent the reload; if the trimmed
// topic is empty, show the message in #topic-error (remove its hidden
// attribute, set aria-invalid="true" on the input) and focus the input.
// Otherwise clear any error, addSession(), empty the input, keep focus in
// it, and announce "Added: <topic>, <day> at <time>." in #status.
// No alert() anywhere.

// TODO 13: ONE click listener on #lists for every button (event delegation).
// Find the button with closest('button[data-action]') and the session id
// with closest('[data-id]').dataset.id.
// - toggle: toggleSession(id); the lists redraw, so find the moved session's
//   .toggle button by its data-id and focus it; announce where it went.
// - delete: before removing, note the button's list and its position among
//   that list's .delete buttons; removeSession(id); then focus the next
//   .delete button in the same list, or the previous one, or the topic
//   input. Announce "Deleted: <topic>."
