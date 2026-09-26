// main.js: the settings panel. It loads settings (from the API if the
// server is running, from this browser's storage if not), fills the form,
// and keeps the 3D scene in sync.

import { createScene, EXHIBITS } from './scene.js';

const $ = (id) => document.getElementById(id);
const API_URL = '/api/settings';
const LOCAL_KEY = 'xrc_fss01_settings';

// The same defaults and known values as starter/server/validation.js. Two
// small lists like this, kept in sync by hand across a client and a server
// with no shared build step, are a normal trade-off at this stage.
const DEFAULT_SETTINGS = {
  visibleExhibits: ['clay-pot', 'basket-ring', 'jade-stone'],
  cameraStart: 'front',
  language: 'en',
  reducedMotion: false,
};
const LANGUAGE_LABELS = { en: 'English', 'es-419': 'Español', 'zh-Hans': '简体中文' };

let serverAvailable = true; // optimistic until a request fails

function setStatus(message, kind) {
  const banner = $('status');
  banner.textContent = message;
  banner.classList.toggle('is-offline', kind === 'offline');
  banner.classList.toggle('is-error', kind === 'error');
}

function readLocalSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(LOCAL_KEY));
    if (saved && Array.isArray(saved.visibleExhibits)) return saved;
  } catch {
    // Corrupt or missing: fall through to defaults.
  }
  // No saved choice yet: default to the device's own reduced-motion
  // request (checked once, in the page's head — see the inline script in
  // index.html), rather than always starting animated.
  return { ...structuredClone(DEFAULT_SETTINGS), reducedMotion: window.__reducedMotion === true };
}

function writeLocalSettings(settings) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(settings));
  } catch {
    // Private browsing or a full quota: the page still works for this
    // visit, it just will not remember next time.
  }
}

// TODO 10: finish loadSettings(). It should:
//   1. Try `await fetch(API_URL)`.
//   2. If the response is not ok (res.ok is false), throw, so the catch
//      block below runs.
//   3. On success, set serverAvailable = true and return await res.json().
//   4. In the catch block (any thrown error, including a network error
//      when there is no server at all): set serverAvailable = false, call
//      setStatus('Server not running: settings are saved in this browser
//      only.', 'offline'), and return readLocalSettings().
// This function must never reject: a page with no server behind it (the
// static-only server this course's checks use, or a plain double-clicked
// file) still has to show something.
async function loadSettings() {
  return structuredClone(DEFAULT_SETTINGS); // replace with the real logic above
}

// TODO 11: finish saveSettings(settings) and resetSettings(). saveSettings
// should:
//   1. If !serverAvailable, call writeLocalSettings(settings), call
//      setStatus with the same offline message as TODO 10, and return
//      { ok: true, settings }.
//   2. Otherwise, PUT settings as JSON to API_URL (Content-Type:
//      application/json). If the response status is 400, return
//      { ok: false, details: (the body's `details` array, or [body.error]) }
//      without throwing. If the response is not ok for another reason,
//      throw (falls into the catch below). On success, return
//      { ok: true, settings: await res.json() }.
//   3. In a catch block, treat it the same as "no server": set
//      serverAvailable = false, writeLocalSettings(settings), setStatus
//      with the offline message, and return { ok: true, settings }.
//
// resetSettings should mirror it: DELETE API_URL when serverAvailable, or
// reset localStorage to DEFAULT_SETTINGS when it is not, then return the
// settings now in effect (calling loadSettings() again is the simplest way).
async function saveSettings(settings) {
  writeLocalSettings(settings); // replace with the real logic above
  return { ok: true, settings };
}

async function resetSettings() {
  writeLocalSettings(DEFAULT_SETTINGS); // replace with the real logic above
  return structuredClone(DEFAULT_SETTINGS);
}

// --- Form <-> settings object -----------------------------------------------

function applyToForm(settings) {
  for (const item of EXHIBITS) {
    $(`exhibit-${item.id}`).checked = settings.visibleExhibits.includes(item.id);
  }
  const cameraInput = document.querySelector(`input[name="cameraStart"][value="${settings.cameraStart}"]`);
  if (cameraInput) cameraInput.checked = true;
  $('language').value = settings.language;
  $('reduced-motion').checked = settings.reducedMotion;
}

function readForm() {
  return {
    visibleExhibits: EXHIBITS.filter((item) => $(`exhibit-${item.id}`).checked).map((item) => item.id),
    cameraStart: document.querySelector('input[name="cameraStart"]:checked')?.value ?? 'front',
    language: $('language').value,
    reducedMotion: $('reduced-motion').checked,
  };
}

// --- The always-present 2D description --------------------------------------
// Built from the same EXHIBITS list the scene is built from (WCAG 1.3.1).
// This part is finished, so you can check TODO 12 (the 3D view) against it.

function renderExhibitList(settings) {
  const list = $('exhibit-list');
  list.replaceChildren(...EXHIBITS.map((item) => {
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = item.name;
    const shown = settings.visibleExhibits.includes(item.id);
    li.append(strong, document.createTextNode(` — ${item.made}. ${shown ? 'Shown in the exhibit.' : 'Hidden by your settings.'}`));
    return li;
  }));
}

function updateDescription(settings, animating) {
  const shown = EXHIBITS.filter((item) => settings.visibleExhibits.includes(item.id)).map((item) => item.name.toLowerCase());
  const parts = [];
  parts.push(shown.length > 0
    ? `The exhibit shows: ${shown.join(', ')}.`
    : 'No exhibits are shown: every exhibit is hidden in your settings.');
  parts.push(`The camera starts at the ${settings.cameraStart} view.`);
  parts.push(animating ? 'The jade stone turns slowly, when it is shown.' : 'Animation is paused: nothing is turning right now.');
  parts.push(`Language preference: ${LANGUAGE_LABELS[settings.language] ?? settings.language}.`);
  $('scene-description').textContent = parts.join(' ');
}

// --- Wiring ------------------------------------------------------------------
// Finished: nothing to do here. It calls the functions above, so once
// TODOs 10-12 are done, the whole page works together.

async function init() {
  const settings = await loadSettings();
  applyToForm(settings);
  renderExhibitList(settings);

  const scene = createScene($('canvas-box'));
  scene.applySettings(settings);

  // The pause button's label and aria-pressed must agree with whatever
  // applySettings just decided (reducedMotion may have started it paused),
  // not with the "Pause animation" text index.html happens to start with.
  const pauseButton = $('pause-toggle');
  function setAnimating(on) {
    scene.setAnimating(on);
    pauseButton.setAttribute('aria-pressed', String(!on));
    pauseButton.textContent = on ? 'Pause animation' : 'Resume animation';
    updateDescription(readForm(), on);
  }
  setAnimating(scene.isAnimating());
  pauseButton.addEventListener('click', () => setAnimating(!scene.isAnimating()));

  $('settings-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const errorList = $('field-errors');
    errorList.replaceChildren();

    const next = readForm();
    if (next.visibleExhibits.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'Show at least one exhibit.';
      errorList.append(li);
      $('exhibit-clay-pot').focus();
      return;
    }

    const result = await saveSettings(next);
    if (!result.ok) {
      errorList.replaceChildren(...result.details.map((message) => {
        const li = document.createElement('li');
        li.textContent = message;
        return li;
      }));
      return;
    }

    scene.applySettings(result.settings);
    renderExhibitList(result.settings);
    updateDescription(result.settings, scene.isAnimating());
    if (serverAvailable) setStatus('Settings saved.');
  });

  $('reset-button').addEventListener('click', async () => {
    const restored = await resetSettings();
    applyToForm(restored);
    scene.applySettings(restored);
    renderExhibitList(restored);
    updateDescription(restored, scene.isAnimating());
    $('field-errors').replaceChildren();
    if (serverAvailable) setStatus('Settings reset to defaults.');
  });
}

init();
