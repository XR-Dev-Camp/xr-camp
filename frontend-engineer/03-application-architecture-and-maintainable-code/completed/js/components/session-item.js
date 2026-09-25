// session-item.js: one component, one job: build the <li> for one session.
// It only reads the session; it never changes the state. Buttons say what
// they do with data-action, and the <li> says which session with data-id,
// so one delegated listener in main.js can handle them all.

import { sessionLabel } from '../utils.js';

function button(text, action, label) {
  const el = document.createElement('button');
  el.type = 'button';
  el.textContent = text;
  el.dataset.action = action;
  el.className = action;
  // The visible word, then which session: "Done: CSS grid".
  el.setAttribute('aria-label', `${text}: ${label}`);
  return el;
}

export function sessionItem(session) {
  const li = document.createElement('li');
  li.className = 'session';
  li.dataset.id = session.id;

  // textContent, never innerHTML: a topic like <img onerror=…> stays text.
  const text = document.createElement('span');
  text.className = 'session-text';
  text.textContent = sessionLabel(session);

  li.append(
    text,
    button(session.done ? 'Not done' : 'Done', 'toggle', session.topic),
    button('Delete', 'delete', session.topic),
  );
  return li;
}
