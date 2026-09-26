// main.js: the only file with work left in it. Config, utils, i18n, the
// locale files, the stores, the services, and the components are already
// written for you (see the README's "What to copy from which lesson" — most
// of this app is exactly what you already built in Courses 2.1 to 2.8).
//
// Eight numbered TODOs wire this markup to those modules: navigation,
// starting the chosen language, the language switcher, the low-data toggle,
// loading the 3D view only when asked, registering the service worker and
// showing its update prompt, offering installation, and the startup order
// that ties all of it together. Everything else below — the dashboard,
// course map, planner, and weather views — is already working, the same way
// it worked in its own lesson, so you can see the shape you are wiring into.
import './components/lesson-card.js';   // registers <lesson-card>; side-effect import

import {
  VIEWS, DEFAULT_VIEW, CITIES, AFRAME_SIZE_MB, APP_VERSION, WEEKLY_GOAL, SESSION_MINUTES,
} from './config.js';
import { startI18n, t, translatePage, currentLocale, setLocale, isDraft } from './i18n.js';
import { phaseProgress, nextLesson, isSemver } from './utils.js';
import * as progressStore from './stores/progress-store.js';
import * as plannerStore from './stores/planner-store.js';
import * as lowData from './stores/low-data.js';
import { loadCatalog } from './services/catalog.js';
import { fetchForecast, fetchSample } from './services/api.js';
import { readCache, writeCache } from './services/cache.js';
import { registerServiceWorker, showUpdateBanner, offerInstall, isInstalled } from './services/pwa.js';
import { progressBar, nextUp, phaseTable } from './components/progress-view.js';
import * as forecastView from './components/forecast-view.js';
import { renderSessionList } from './components/session-list.js';
import { weekSummary } from './components/week-summary.js';
import { mountThreeProgress } from './components/three-progress.js';

let catalog = null;

// --- TODO 1: SIMPLE IN-PAGE NAVIGATION ---------------------------------------
// Five views, one page (VIEWS in config.js: dashboard, course, planner,
// weather, app). Each is a <section id="..."> in index.html, already marked
// `hidden` except "dashboard". Read "Simple in-page navigation" in the
// README before you start: it explains why this app uses the URL's hash
// instead of a router library.

function currentView() {
  // Return the view named in location.hash (without its "#"), if it is one
  // of VIEWS; otherwise return DEFAULT_VIEW. location.hash is "#planner" or
  // "" — strip the "#" before comparing.
  return DEFAULT_VIEW;
}

function showView(view) {
  // 1. For every id in VIEWS: find the <section>, and set its `hidden`
  //    property to true unless its id is `view`.
  // 2. For every element with a `data-view` attribute (the nav links): set
  //    aria-current to "page" when its data-view matches `view`, or "false"
  //    otherwise.
  // 3. Move focus to the new view's <h1> (it already has tabindex="-1" in
  //    the HTML: `document.getElementById(view)?.querySelector('h1')?.focus()`),
  //    so keyboard and screen-reader users know where they landed — the same
  //    thing a full page navigation would do for you.
}

// TODO 1, continued: call showView(currentView()) whenever the URL's hash
// changes (a "hashchange" event on window), so the Back and Forward buttons,
// and typing a link like "index.html#planner" directly, both work.

// --- Dashboard (already built; nothing to do here) --------------------------

function renderDashboard() {
  if (!catalog) return;
  const done = progressStore.getDone();
  const rows = phaseProgress(catalog, done);
  const target = document.getElementById('dashboard-progress');

  const totalDone = rows.reduce((sum, row) => sum + row.done, 0);
  const totalLessons = rows.reduce((sum, row) => sum + row.total, 0);
  target.replaceChildren(
    progressBar(totalDone, totalLessons, t('dashboard.tableCaption')),
    nextUp(nextLesson(catalog.lessons, done)),
    phaseTable(rows),
  );

  renderThreeDGate(rows);
}

// --- TODO 5: LAZY 3D --------------------------------------------------------
// The 3D bar chart itself (js/components/three-progress.js) is already
// built and imported above as mountThreeProgress(container, rows). Your job
// is only the gate in front of it.
function renderThreeDGate(rows) {
  const button = document.getElementById('three-button');
  const hint = document.getElementById('three-hint');
  const skip = document.getElementById('three-skip-notice');
  const container = document.getElementById('three-container');

  hint.textContent = t('dashboard.threeDHint', { size: AFRAME_SIZE_MB });

  // 1. Read the learner's low-data preference (lowData.lowDataPreferred()).
  //    If it is on: hide the button, show `skip`'s notice, empty the
  //    container, and stop — the 3D library must never load in this case.
  // 2. Otherwise: show the button, hide the notice, and set the button's
  //    click handler to call mountThreeProgress(container, rows). Nothing
  //    3D-related should load before this click. Verify this with
  //    Playwright: no request to aframe.io before the button is pressed.
}

// --- Course map (already built; nothing to do here) --------------------------

function renderCourse() {
  if (!catalog) return;
  const done = progressStore.getDone();
  const list = document.getElementById('course-list');
  list.replaceChildren(...catalog.lessons.map((lesson) => {
    const li = document.createElement('div');
    li.setAttribute('role', 'listitem');
    const card = document.createElement('lesson-card');
    card.setAttribute('lesson-id', lesson.id);
    card.setAttribute('lesson-title', lesson.title);
    card.setAttribute('minutes', String(lesson.minutes));
    card.setAttribute('status', lesson.status);
    card.setAttribute('heading-level', '3');
    card.toggleAttribute('done', done.has(lesson.id));
    li.append(card);
    return li;
  }));
}

document.addEventListener('lesson-toggle', (event) => {
  const { lessonId, done } = event.detail;
  progressStore.setDone(lessonId, done);
});

progressStore.subscribe(() => {
  renderDashboard();
  renderCourse();
});

// --- Planner (already built; nothing to do here) -----------------------------

function renderPlanner() {
  const sessions = plannerStore.getSessions();
  renderSessionList(document.getElementById('planner-list'), sessions);
  document.getElementById('planner-summary').replaceChildren(...weekSummary(sessions));
}

plannerStore.subscribe(renderPlanner);

document.getElementById('planner-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.target;
  const day = form.day.value;
  const time = form.time.value;
  const topic = form.topic.value.trim();
  const error = document.getElementById('planner-error');

  if (!topic) {
    error.textContent = t('planner.topicLabel');
    form.topic.focus();
    return;
  }
  error.textContent = '';
  plannerStore.addSession({ day, time, topic });
  form.reset();
  form.day.value = day;
  form.topic.focus();
});

document.getElementById('planner-list').addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const id = button.closest('li').dataset.id;
  if (button.dataset.action === 'toggle') plannerStore.toggleSession(id);
  else if (button.dataset.action === 'delete') plannerStore.removeSession(id);
});

// --- Weather (already built; nothing to do here) -----------------------------

let weatherRequest = 0;

function cityLabel(city) {
  return t(`city.${city.id}`);
}

async function loadWeather(city) {
  const target = document.getElementById('weather-view');
  const place = cityLabel(city);
  const requestId = ++weatherRequest;
  const cached = readCache(city.id, 30);

  if (cached) forecastView.renderForecast(target, toDaysSafe(cached.data), place, sourceLine(cached.savedAt));
  else forecastView.renderLoading(target, place);

  try {
    const { json, savedAt } = await fetchForecast(city);
    if (requestId !== weatherRequest) return;
    writeCache(city.id, json);
    forecastView.renderForecast(target, toDaysSafe(json), place, sourceLine(savedAt));
  } catch {
    if (requestId !== weatherRequest) return;
    if (cached) return;
    try {
      const { json } = await fetchSample();
      if (requestId !== weatherRequest) return;
      forecastView.renderForecast(target, toDaysSafe(json), place, t('weather.sampleSource'));
    } catch {
      forecastView.renderEmpty(target, place);
    }
  }
}

function toDaysSafe(json) {
  const daily = json?.daily;
  if (!daily?.time) return [];
  return daily.time.map((date, i) => ({
    date, max: daily.temperature_2m_max[i], min: daily.temperature_2m_min[i], rain: daily.precipitation_probability_max[i],
  }));
}

function sourceLine(savedAt) {
  return savedAt ? `${t('weather.source')} ` : t('weather.source');
}

function populateCitySelect() {
  const select = document.getElementById('weather-city');
  const previous = select.value;
  select.replaceChildren(...CITIES.map((city) => {
    const option = document.createElement('option');
    option.value = city.id;
    option.textContent = cityLabel(city);
    return option;
  }));
  select.value = CITIES.some((c) => c.id === previous) ? previous : CITIES[0].id;
}

document.getElementById('weather-city').addEventListener('change', (event) => {
  const city = CITIES.find((c) => c.id === event.target.value);
  if (city) loadWeather(city);
});

// --- TODO 3: LANGUAGE SWITCHER ------------------------------------------------

function renderLanguageControls() {
  document.getElementById('language-select').value = currentLocale();
  document.getElementById('language-draft-notice').hidden = !isDraft();
}

// 1. Listen for "change" on #language-select, and call setLocale() with the
//    chosen value.
// 2. Listen for the document's "localechange" event (dispatched by
//    setLocale() in i18n.js every time the language changes) and, in that
//    handler: call translatePage(), renderLanguageControls(), and re-render
//    every view (renderDashboard, renderCourse, renderPlanner,
//    populateCitySelect, then loadWeather() for the currently selected
//    city) so nothing is left showing the old language.
// Register that "localechange" listener at the end of start() (TODO 8), not
// here, so the very first, unsaved locale pick made by startI18n() does not
// trigger a second, redundant render of a page that has not shown anything
// yet.

// --- TODO 4: LOW-DATA TOGGLE --------------------------------------------------

function renderLowDataControls() {
  document.getElementById('low-data-toggle').checked = lowData.lowDataPreferred();
}

// 1. Listen for "change" on #low-data-toggle, and call
//    lowData.setLowData(event.target.checked).
// 2. Subscribe to the low-data store (lowData.subscribe()) so that when the
//    preference changes — from this toggle, or from another open tab —
//    renderLowDataControls() runs again, and (if the catalog has loaded)
//    renderThreeDGate() runs again too, to hide or show the 3D button.

// --- Startup -------------------------------------------------------------

async function start() {
  // TODO 2: START THE CHOSEN LANGUAGE. Call `await startI18n()`, then
  // `translatePage()`, then renderLanguageControls() and
  // renderLowDataControls(), so the page's static text is correct before
  // anything else renders.

  document.getElementById('app-version').textContent = t('app.version', { version: APP_VERSION });
  console.assert(isSemver(APP_VERSION), 'APP_VERSION in config.js is not a valid semantic version');

  try {
    catalog = await loadCatalog();
  } catch (error) {
    console.warn('Could not load the course catalog:', error);
    catalog = { phases: [], lessons: [] };
  }
  renderDashboard();
  renderCourse();
  renderPlanner();

  populateCitySelect();
  await loadWeather(CITIES[0]);

  // TODO 1, continued: call showView(currentView()) here, so the page opens
  // on the view named in the URL (or the dashboard, if there is none).

  // TODO 6: SERVICE WORKER + UPDATE PROMPT. Call registerServiceWorker(),
  // passing an `onUpdateReady(worker)` callback that: adds the "visible"
  // class to #update-message, then calls showUpdateBanner(worker, { message,
  // button }) with #update-text and #update-button. showUpdateBanner and
  // registerServiceWorker are already written for you, in
  // js/services/pwa.js — read them before you wire this up.

  // TODO 7: OFFER INSTALLATION. Call offerInstall(), passing
  // #install-button and #install-status. If isInstalled() is already true,
  // set #install-status's text to t('install.done').

  // TODO 8: FINISH STARTUP. Add the "localechange" listener from TODO 3
  // here, at the very end of start() — after the first full render above —
  // so switching languages later re-renders everything, without doubling
  // the very first render.
}

start();
