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

// TODO 10: Build one card for one lesson, and return it inside an <li>.
// - document.createElement('lesson-card'), then setAttribute for
//   lesson-id, lesson-title, minutes, status, and heading-level '3'
//   (the cards sit under this section's <h2>).
// - card.done = done.has(lesson.id)
// - A <p> with p.slot = 'description' and the text
//   `Course ${lesson.phase}.${number} of XR Camp.`, appended to the card.
// Build it exactly as you would write it in HTML: attributes and children.
// For now, it returns a plain list item with the title.
function lessonCard(lesson, number, done) {
  const item = document.createElement('li');
  item.textContent = lesson.title;
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

// TODO 11: ONE listener on <main> for the 'lesson-toggle' event of every
// card, including the cards added later.
// - Read { lessonId, title, done } from event.detail.
// - If there is a lessonId, setDone(lessonId, done).
// - Announce in #status: "Marked as done: <title>." or
//   "Marked as not done: <title>."
// Log event.target too. Which element is it: the button, or the card? Why?

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
