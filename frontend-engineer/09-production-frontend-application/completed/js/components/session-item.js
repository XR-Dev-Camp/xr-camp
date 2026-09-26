// session-item.js: build the <li> for one planner session (Course 2.3).
// Changed for 2.9: the words come from t(), and the day and time are shown
// the local way with Intl. The stored session is not changed: it still says
// "Tuesday" and "19:00", so sorting and old saved data keep working.

import { DAYS } from '../config.js';
import { t, weekdayName, formatTimeOfDay } from '../i18n.js';

// "Tuesday at 7:00 PM: CSS grid" / "martes a las 19:00: CSS grid"
export function sessionLabel(session) {
  return t('planner.sessionLabel', {
    day: weekdayName(DAYS.indexOf(session.day)),
    time: formatTimeOfDay(session.time),
    topic: session.topic,
  });
}

function button(key, action, topic) {
  const el = document.createElement('button');
  el.type = 'button';
  el.textContent = t(key);
  el.dataset.action = action;
  el.className = action;
  // The visible word, then which session: "Done: CSS grid" (WCAG 2.5.3).
  el.setAttribute('aria-label', t('planner.buttonLabel', { action: t(key), topic }));
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
    button(session.done ? 'planner.notDone' : 'planner.done', 'toggle', session.topic),
    button('planner.delete', 'delete', session.topic),
  );
  return li;
}
