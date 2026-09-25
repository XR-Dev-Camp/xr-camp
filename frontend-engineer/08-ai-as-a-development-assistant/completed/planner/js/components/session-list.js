// session-list.js: fill one <ul> with sessions, or say it is empty.

import { sessionItem } from './session-item.js';

export function renderSessionList(list, sessions) {
  if (sessions.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty';
    empty.textContent = 'Nothing here yet.';
    list.replaceChildren(empty);
    return;
  }
  list.replaceChildren(...sessions.map(sessionItem));
}
