// main.js: wires the page's DOM to i18n.js and the 3D app. No 3D code and no
// translated strings live in this file — it only reads t() and the config
// data, and writes the results into the page. That separation is what lets
// every piece above be tested and changed on its own (Course 2.2's lesson,
// applied to language instead of app state).

import { LOCALES, ITEMS, OPENED_DATE, VISITOR_COUNT } from './config.js';
import {
  startI18n, setLocale, currentLocale, isDraft, translatePage, t,
  formatVisitorCount, formatOpenedDate, formatOpenedRelative,
  setPseudo, isPseudo,
} from './i18n.js';
import { createApp } from './app.js';
import { setLabel } from './labels.js';

const canvasBox = document.getElementById('canvas-box');
const app = createApp(canvasBox);
app.start();

let selectedId = null;

// --- 1. Language switcher -----------------------------------------------------

const langButtons = document.getElementById('lang-buttons');
for (const locale of LOCALES) {
  const li = document.createElement('li');
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = locale.name;
  button.dataset.locale = locale.code;
  button.addEventListener('click', () => setLocale(locale.code));
  li.append(button);
  langButtons.append(li);
}

function updateLangButtons() {
  for (const button of langButtons.querySelectorAll('button')) {
    const isCurrent = button.dataset.locale === currentLocale();
    button.setAttribute('aria-pressed', String(isCurrent));
    button.classList.toggle('current', isCurrent);
  }
}

// --- 2. Select buttons and info panel -----------------------------------------

const selectButtons = document.getElementById('select-buttons');
const infoPanel = document.getElementById('info-panel');

for (const data of ITEMS) {
  const li = document.createElement('li');
  const button = document.createElement('button');
  button.type = 'button';
  button.dataset.itemId = data.id;
  li.append(button);
  selectButtons.append(li);
}

function select(id) {
  selectedId = id;
  infoPanel.textContent = id
    ? `${t(`item.${id}.name`)} — ${t('info.made', { made: t(`item.${id}.made`) })} ${t(`item.${id}.note`)}`
    : t('info.empty');
  renderSceneDescription();
}

function renderSelectButtons() {
  for (const button of selectButtons.querySelectorAll('button')) {
    const name = t(`item.${button.dataset.itemId}.name`);
    button.textContent = name;
    button.setAttribute('aria-label', t('select.buttonLabel', { name }));
  }
}

for (const button of selectButtons.querySelectorAll('button')) {
  button.addEventListener('click', () => select(button.dataset.itemId));
}

// --- 3. Scene description and 2D twin ------------------------------------------

const sceneDescription = document.getElementById('scene-description');
const twinList = document.getElementById('twin-list');

function renderSceneDescription() {
  const parts = [t('desc.intro')];
  const selected = ITEMS.find((data) => data.id === selectedId);
  parts.push(selected ? t('desc.selected', { name: t(`item.${selected.id}.name`) }) : t('desc.noneSelected'));
  parts.push(app.isAnimating() ? t('desc.animating') : t('desc.paused'));
  parts.push(t('desc.orbitHint'));
  sceneDescription.textContent = parts.join(' ');
}

function renderTwinList() {
  twinList.replaceChildren();
  for (const data of ITEMS) {
    const li = document.createElement('li');
    li.textContent = `${t(`item.${data.id}.name`)} — ${t(`item.${data.id}.note`)}`;
    twinList.append(li);
  }
}

// --- 4. Animation pause --------------------------------------------------------

const pauseButton = document.getElementById('pause-toggle');
pauseButton.setAttribute('aria-pressed', String(!app.isAnimating()));
pauseButton.addEventListener('click', () => {
  app.setAnimating(!app.isAnimating());
  pauseButton.setAttribute('aria-pressed', String(!app.isAnimating()));
  renderSceneDescription();
});

// --- 5. Pseudo-localization toggle ---------------------------------------------

const pseudoToggle = document.getElementById('pseudo-toggle');
pseudoToggle.checked = isPseudo();
pseudoToggle.addEventListener('change', () => setPseudo(pseudoToggle.checked));

// --- Labels: one per pedestal, redrawn in the current language ----------------
// Chinese needs a font that ships Chinese glyphs; Spanish's accented Latin
// letters need any normal system font. Both are covered by the same
// canvas-drawn label (see labels.js) — this just picks which font family to
// ask the canvas for, based on the current language.
const FONT_STACKS = {
  en: '"Segoe UI", system-ui, sans-serif',
  es: '"Segoe UI", system-ui, sans-serif',
  'zh-Hans': '"PingFang SC", "Microsoft YaHei", "Noto Sans SC", system-ui, sans-serif',
};

function renderLabels() {
  const fontFamily = FONT_STACKS[currentLocale()] ?? FONT_STACKS.en;
  for (const item of app.items) {
    setLabel(app.scene, item, t(`item.${item.data.id}.name`), { fontFamily, pedestalTopY: 1.02 });
  }
}

// --- Draft notice and Intl demo panel -------------------------------------------

const draftNotice = document.getElementById('draft-notice');
const statsPanel = document.getElementById('stats-panel');

function renderStats() {
  statsPanel.replaceChildren();
  const lines = [
    t('stats.visitors', { count: formatVisitorCount(VISITOR_COUNT) }),
    t('stats.opened', { date: formatOpenedDate(OPENED_DATE) }),
    t('stats.openedRelative', { relative: formatOpenedRelative(OPENED_DATE) }),
    t('stats.count', { count: ITEMS.length }),
  ];
  for (const line of lines) {
    const p = document.createElement('p');
    p.textContent = line;
    statsPanel.append(p);
  }
}

// --- Bring it all together ------------------------------------------------------

function renderAll() {
  translatePage();
  renderSelectButtons();
  renderSceneDescription();
  renderTwinList();
  renderStats();
  renderLabels();
  updateLangButtons();
  draftNotice.hidden = !isDraft();
  draftNotice.textContent = isDraft() ? t('lang.draftNotice') : '';
}

document.addEventListener('localechange', renderAll);

await startI18n();
renderAll();
