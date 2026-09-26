// session-list.js: fill one <ul> with sessions, or say it is empty (Course 2.3).

import { t } from '../i18n.js';
import { sessionItem } from './session-item.js';

export function renderSessionList(list, sessions) {
  if (sessions.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty';
    empty.textContent = t('planner.empty');
    list.replaceChildren(empty);
    return;
  }
  list.replaceChildren(...sessions.map(sessionItem));
}
