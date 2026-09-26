// i18n.js: choosing a language, translating the page, and formatting
// numbers, dates, and times. The choosing-and-loading half (pickLocale,
// load, setLocale, startI18n) is copied from frontend-engineer/09's
// js/i18n.js, unchanged: you already built and tested that machinery in
// Course 2.9. This lesson's new work is the four formatting functions at
// the bottom, and pseudo-localization, which none of Course 2.9 needed.

import { LOCALES, DEFAULT_LOCALE, LANGUAGE_KEY, PSEUDO_KEY } from './config.js';
import { pseudoLocalize } from './pseudo.js';

const CODES = LOCALES.map((locale) => locale.code);
const loaded = new Map();

let current = DEFAULT_LOCALE;
let messages = {};
let fallback = {};
let pseudoOn = false;

// --- Choosing and loading a language (from Course 2.9) ----------------------

export function pickLocale(wanted, available = CODES) {
  for (const tag of wanted) {
    let want;
    try {
      want = new Intl.Locale(tag).maximize();
    } catch {
      continue;
    }
    const match = available.find((code) => {
      const have = new Intl.Locale(code).maximize();
      return have.language === want.language && have.script === want.script;
    });
    if (match) return match;
  }
  return DEFAULT_LOCALE;
}

async function load(code) {
  if (!CODES.includes(code)) throw new Error(`Unknown language: ${code}`);
  if (!loaded.has(code)) {
    const module = await import(`./locales/${code}.js`);
    loaded.set(code, { messages: module.default, draft: module.draft === true });
  }
  return loaded.get(code);
}

function savedChoice(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function saveChoice(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage switched off: the choice lasts until the page closes.
  }
}

export async function setLocale(code, { save = true } = {}) {
  const [chosen, english] = await Promise.all([load(code), load(DEFAULT_LOCALE)]);
  current = code;
  messages = chosen.messages;
  fallback = english.messages;

  // WCAG 3.1.1: the page's language must be right, so screen readers use the
  // right pronunciation and browsers choose the right fonts (this matters
  // most for Chinese: see "Chinese typography" in the README).
  document.documentElement.lang = code;

  if (save) saveChoice(LANGUAGE_KEY, code);
  document.dispatchEvent(new CustomEvent('localechange', { detail: { locale: code } }));
}

export async function startI18n() {
  const saved = savedChoice(LANGUAGE_KEY);
  const code = CODES.includes(saved) ? saved : pickLocale(navigator.languages ?? [navigator.language]);
  await setLocale(code, { save: false });
  pseudoOn = savedChoice(PSEUDO_KEY) === 'on';
}

export const currentLocale = () => current;
export const isDraft = () => loaded.get(current)?.draft === true;

// --- Pseudo-localization (new in this lesson) --------------------------------
// A pseudo-locale is not a real language: it is a stress test. It wraps every
// real string so you can see, before a single word is translated, whether
// your layout survives longer text, accented letters, and wide characters.
// See "Pseudo-localization" in the README, and pseudo.js for the transform.

export function setPseudo(on) {
  pseudoOn = on;
  saveChoice(PSEUDO_KEY, on ? 'on' : 'off');
  document.dispatchEvent(new CustomEvent('localechange', { detail: { locale: current } }));
}
export const isPseudo = () => pseudoOn;

// --- Strings ------------------------------------------------------------------

export function format(message, params = {}, locale = current) {
  let text = message;
  if (typeof message === 'object') {
    const form = new Intl.PluralRules(locale).select(params.count ?? 0);
    text = message[form] ?? message.other;
  }
  const filled = text.replace(/\{(\w+)\}/g, (whole, name) => {
    if (!(name in params)) return whole;
    const value = params[name];
    return typeof value === 'number' ? new Intl.NumberFormat(locale).format(value) : String(value);
  });
  return pseudoOn ? pseudoLocalize(filled) : filled;
}

export function t(key, params) {
  const message = messages[key] ?? fallback[key];
  if (message === undefined) {
    console.warn(`Missing string: ${key}`);
    return key;
  }
  return format(message, params);
}

export function translatePage(root = document) {
  for (const element of root.querySelectorAll('[data-i18n]')) {
    element.textContent = t(element.dataset.i18n);
  }
  for (const element of root.querySelectorAll('[data-i18n-label]')) {
    element.setAttribute('aria-label', t(element.dataset.i18nLabel));
  }
}

// --- Numbers, dates, and times, with Intl (new in this lesson) ---------------
// Each function takes the language as its last argument, so a caller can
// format for a language other than the current one if it ever needs to
// (useful in tests). None of these ever build or store a list of month or
// unit names: Intl already knows every language's own words and punctuation.

// 128430 → "128,430" (English), "128.430" (Spanish), "128,430" (Chinese: it
// also groups by thousands, unlike the "10,000 = 1万" grouping Chinese uses
// for very large numbers, which Intl.NumberFormat('zh-Hans') does not do by
// default — worth knowing, not worth working around in this lesson).
export function formatVisitorCount(count, locale = current) {
  // TODO 2: return count formatted with Intl.NumberFormat for `locale`, with
  // no options object needed — the default already groups thousands the way
  // each language expects.
}

// '2024-03-02' → "2 March 2024" / "2 de marzo de 2024" / "2024年3月2日".
// Noon is added so no time zone can move the date to the day before or after.
export function formatOpenedDate(isoDate, locale = current) {
  // TODO 3: build `new Date(`${isoDate}T12:00:00`)` and format it with
  // Intl.DateTimeFormat(locale, { dateStyle: 'long' }). Return the string.
}

// How long ago the exhibit opened, in whole days, weeks, months, or years —
// whichever reads best. '3 days ago' / 'hace 3 días' / '3天前'.
export function formatOpenedRelative(isoDate, locale = current) {
  const opened = new Date(`${isoDate}T12:00:00`).getTime();
  const days = Math.round((Date.now() - opened) / (1000 * 60 * 60 * 24));
  // TODO 4: pick a unit and count from `days` (days, or weeks/365-based
  // months/years once the number gets large — a simple set of thresholds is
  // fine, this is a teaching demo, not a calendar library), then return
  // `new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(-count, unit)`.
  // The negative sign means "that many units in the past".
  return '';
}
