// Programme explorer
// ------------------
// Lets visitors search and filter the centre's programmes, and save the ones
// they like. Their saved list is kept in the browser with localStorage.
//
// How it works, in one sentence: the data lives in an array; every time a
// control changes, we filter the array and draw the matching cards again.

// 1. The data --------------------------------------------------------------

// An array of objects: each object is one programme, with named properties.
const programmes = [
  { id: 'homework', name: 'Homework club', audience: 'children', day: 'Weekdays', time: '4pm', free: true, description: 'Quiet space and volunteers to help with school work.' },
  { id: 'youth', name: 'Youth group', audience: 'children', day: 'Friday', time: '6pm', free: true, description: 'Games, trips, and a place to hang out.' },
  { id: 'holiday', name: 'Holiday activity scheme', audience: 'children', day: 'School holidays', time: '10am', free: false, description: 'Sport, art, and outings during the holidays.' },
  { id: 'english', name: 'English conversation practice', audience: 'adults', day: 'Tuesday and Thursday', time: '10am', free: true, description: 'Practise speaking English with friendly volunteers.' },
  { id: 'jobs', name: 'Job search and CV support', audience: 'adults', day: 'Wednesday', time: '2pm', free: true, description: 'Help with applications, CVs, and interviews.' },
  { id: 'digital', name: 'Digital skills drop-in', audience: 'adults', day: 'Monday', time: '6pm', free: true, description: 'Help with phones, email, and staying safe online.' },
  { id: 'coding', name: 'Coding for beginners', audience: 'adults', day: 'Saturday', time: '10am', free: true, description: 'Build your first web page. No experience needed.' },
  { id: 'lunch', name: 'Community lunch', audience: 'everyone', day: 'Sunday', time: '1pm', free: false, description: 'A shared meal, cooked by volunteers. Pay what you can.' },
];

// Words for the audience values, used on the cards.
const audienceLabels = { children: 'Children and young people', adults: 'Adults', everyone: 'Everyone' };


// 2. Finding elements on the page ------------------------------------------

// document.querySelector finds the first element that matches a CSS selector.
const searchInput = document.querySelector('#search');
const audienceSelect = document.querySelector('#audience');
const freeCheckbox = document.querySelector('#free-only');
const results = document.querySelector('#results');
const count = document.querySelector('#count');
const savedList = document.querySelector('#saved');


// 3. Saving in the browser -------------------------------------------------

// localStorage keeps small pieces of text in this browser, even after the
// page closes. It can be switched off or full, so every use is in a
// try...catch: if it fails, the page still works, just without saving.
const STORAGE_KEY = 'riverside-saved-programmes';

function loadSaved() {
  try {
    const text = localStorage.getItem(STORAGE_KEY);
    return text ? JSON.parse(text) : [];
  } catch (error) {
    console.warn('Could not read saved programmes:', error);
    return [];
  }
}

function storeSaved(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch (error) {
    console.warn('Could not save programmes:', error);
  }
}

let savedIds = loadSaved();


// 4. Drawing cards ---------------------------------------------------------

// A function that turns one programme object into one card element.
function createCard(programme) {
  const card = document.createElement('li');
  card.className = 'card';

  const heading = document.createElement('h3');
  heading.textContent = programme.name;

  const when = document.createElement('p');
  when.textContent = `${programme.day}, ${programme.time}. ${programme.free ? 'Free.' : 'Small charge.'}`;

  const description = document.createElement('p');
  description.textContent = programme.description;

  const tag = document.createElement('p');
  tag.className = 'tag';
  tag.textContent = audienceLabels[programme.audience];

  // A toggle button: aria-pressed says whether this programme is saved.
  const isSaved = savedIds.includes(programme.id);
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = `Save ${programme.name}`;
  button.setAttribute('aria-pressed', String(isSaved));
  button.dataset.id = programme.id;   // data-id="homework": lets us find it again
  button.addEventListener('click', () => toggleSaved(programme.id));

  card.append(heading, when, description, tag, button);
  return card;
}


// 5. Filtering -------------------------------------------------------------

// Returns true if a programme matches every control on the page.
function matches(programme) {
  const words = searchInput.value.trim().toLowerCase();
  const text = `${programme.name} ${programme.description}`.toLowerCase();

  if (words !== '' && !text.includes(words)) return false;
  if (audienceSelect.value !== 'all' && programme.audience !== audienceSelect.value) return false;
  if (freeCheckbox.checked && !programme.free) return false;
  return true;
}

function showResults() {
  const found = programmes.filter(matches);

  results.replaceChildren();          // remove the old cards
  for (const programme of found) {
    results.append(createCard(programme));
  }

  // The count is in a live region, so screen readers announce it.
  if (found.length === 0) {
    count.textContent = 'No programmes match. Try fewer words, or a different audience.';
  } else {
    count.textContent = `Showing ${found.length} of ${programmes.length} programmes.`;
  }
}


// 6. The saved list ---------------------------------------------------------

function toggleSaved(id) {
  if (savedIds.includes(id)) {
    savedIds = savedIds.filter((saved) => saved !== id);
  } else {
    savedIds.push(id);
  }
  storeSaved(savedIds);

  // Update the pressed state of this programme's button, and the list.
  const button = results.querySelector(`button[data-id="${id}"]`);
  if (button) button.setAttribute('aria-pressed', String(savedIds.includes(id)));
  showSaved();
}

function showSaved() {
  savedList.replaceChildren();
  if (savedIds.length === 0) {
    const empty = document.createElement('li');
    empty.textContent = 'Nothing saved yet. Press "Save" on a programme to keep it here.';
    savedList.append(empty);
    return;
  }
  for (const id of savedIds) {
    const programme = programmes.find((p) => p.id === id);
    if (!programme) continue;        // a programme that no longer exists
    const item = document.createElement('li');
    item.textContent = `${programme.name}: ${programme.day}, ${programme.time}`;
    savedList.append(item);
  }
}


// 7. Listening for changes -------------------------------------------------

// "input" fires on every keystroke and change; the form never submits.
document.querySelector('#filters').addEventListener('input', showResults);
document.querySelector('#filters').addEventListener('submit', (event) => {
  event.preventDefault();             // stay on this page
  showResults();
  count.focus();                      // take keyboard users to the result count
});

showResults();
showSaved();
