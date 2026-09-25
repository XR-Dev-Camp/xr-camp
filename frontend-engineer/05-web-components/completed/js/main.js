// main.js: the page. It uses <lesson-card> like any other HTML element:
// it creates cards, sets their attributes, and listens for their events.
// It never reaches inside a card's shadow root.

import './lesson-card.js';                 // defines <lesson-card>
import { loadCatalog } from './data.js';
import { doneLessons, setDone } from './progress.js';

const main = document.querySelector('main');
const picker = document.querySelector('#phase-picker');
const phaseSelect = document.querySelector('#phase');
const cards = document.querySelector('#cards');
const status = document.querySelector('#status');

let catalog;

// One card per lesson. The card is built with attributes and a slotted
// paragraph, exactly as you would write it in HTML.
function lessonCard(lesson, number, done) {
  const card = document.createElement('lesson-card');
  card.setAttribute('lesson-id', lesson.id);
  card.setAttribute('lesson-title', lesson.title);
  card.setAttribute('minutes', lesson.minutes);
  card.setAttribute('status', lesson.status);
  card.setAttribute('heading-level', '3');   // under this section's <h2>
  card.done = done.has(lesson.id);

  const description = document.createElement('p');
  description.slot = 'description';
  description.textContent = `Course ${lesson.phase}.${number} of XR Camp.`;
  card.append(description);

  const item = document.createElement('li');
  item.append(card);
  return item;
}

function showPhase(phaseNumber) {
  const done = doneLessons();
  const lessons = catalog.lessons.filter((lesson) => lesson.phase === phaseNumber);
  cards.replaceChildren(...lessons.map((lesson, index) => lessonCard(lesson, index + 1, done)));
  return lessons.length;
}

// Cards written in the HTML file get their saved state too.
function restoreWrittenCards() {
  const done = doneLessons();
  for (const card of document.querySelectorAll('lesson-card[lesson-id]')) {
    card.done = done.has(card.getAttribute('lesson-id'));
  }
}

// One listener for every card on the page, including cards added later.
// lesson-toggle is composed, so it crosses out of each card's shadow root,
// and it bubbles, so it reaches <main>. event.target is the <lesson-card>.
main.addEventListener('lesson-toggle', (event) => {
  const { lessonId, title, done } = event.detail;
  if (lessonId) setDone(lessonId, done);
  status.textContent = done ? `Marked as done: ${title}.` : `Marked as not done: ${title}.`;
});

phaseSelect.addEventListener('change', () => {
  const count = showPhase(Number(phaseSelect.value));
  const phase = phaseSelect.selectedOptions[0].textContent;
  status.textContent = `Showing ${count} lessons: ${phase}.`;
});

try {
  catalog = await loadCatalog();
  phaseSelect.replaceChildren(...catalog.phases.map(({ phase, title }) => {
    const option = document.createElement('option');
    option.value = phase;
    option.textContent = `Phase ${phase}: ${title}`;
    return option;
  }));
  phaseSelect.value = '2';
  showPhase(2);
  picker.hidden = false;
} catch (error) {
  const message = document.createElement('p');
  message.className = 'error';
  message.textContent = `${error.message} Check that the page is opened through a local server.`;
  cards.replaceWith(message);
}

restoreWrittenCards();
