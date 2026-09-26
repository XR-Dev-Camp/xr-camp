// i18n.js: the app's languages. "i18n" is short for "internationalisation":
// an i, 18 letters, and an n.
//
// Three jobs, and nothing else:
//   1. Choose a language, and load its strings (one module per language).
//   2. t('key', { count: 3 }): the string for a key, in the current language.
//   3. Format numbers, dates, and times with Intl, the browser's built-in
//      internationalisation API, so no list of month names is ever needed.
//
// Every other module asks this one for words. None of them contains any.

import { LOCALES, DEFAULT_LOCALE, LANGUAGE_KEY } from './config.js';

const CODES = LOCALES.map((locale) => locale.code);
const loaded = new Map();      // code → { messages, draft }

let current = DEFAULT_LOCALE;
let messages = {};
let fallback = {};             // English: used for any key a draft is missing

// --- 1. Choosing and loading a language -------------------------------------

// Pick the best available language for a list of wanted ones, in order of
// preference, like navigator.languages: ['es-MX', 'es', 'en'].
// maximize() fills in the likely script: zh-CN → zh-Hans-CN, zh-TW →
// zh-Hant-TW. So a Simplified Chinese reader gets zh-Hans, and a reader of
// Traditional Chinese is not given a script she did not ask for: she gets her
// next choice. A zh-Hant locale is a Course 6.2 job.
export function pickLocale(wanted, available = CODES) {
  for (const tag of wanted) {
    let want;
    try {
      want = new Intl.Locale(tag).maximize();
    } catch {
      continue;                // not a valid language tag: skip it
    }
    const match = available.find((code) => {
      const have = new Intl.Locale(code).maximize();
      return have.language === want.language && have.script === want.script;
    });
    if (match) return match;
  }
  return DEFAULT_LOCALE;
}

// Each language is a module, loaded only when it is needed. import() with a
// variable works for any file; the check against CODES means only our own
// locale files can ever be loaded.
async function load(code) {
  if (!CODES.includes(code)) throw new Error(`Unknown language: ${code}`);
  if (!loaded.has(code)) {
    const module = await import(`./locales/${code}.js`);
    loaded.set(code, { messages: module.default, draft: module.draft === true });
  }
  return loaded.get(code);
}

function savedChoice() {
  try {
    return localStorage.getItem(LANGUAGE_KEY);
  } catch {
    return null;
  }
}

// Switch language: load it, then tell the page. Every view listens for
// "localechange", and draws itself again.
export async function setLocale(code, { save = true } = {}) {
  const [chosen, english] = await Promise.all([load(code), load(DEFAULT_LOCALE)]);
  current = code;
  messages = chosen.messages;
  fallback = english.messages;

  // WCAG 3.1.1: the page's language must be right, so screen readers
  // pronounce it correctly, and browsers choose the right fonts.
  document.documentElement.lang = code;

  if (save) {
    try {
      localStorage.setItem(LANGUAGE_KEY, code);
    } catch {
      // Storage switched off: the choice lasts until the page closes.
    }
  }
  translatePage();
  document.dispatchEvent(new CustomEvent('localechange', { detail: { locale: code } }));
}

// On start: the learner's saved choice, or the browser's languages, or English.
export async function startI18n() {
  const saved = savedChoice();
  const code = CODES.includes(saved) ? saved : pickLocale(navigator.languages ?? [navigator.language]);
  await setLocale(code, { save: false });
}

export const currentLocale = () => current;
export const isDraft = () => loaded.get(current)?.draft === true;

// --- 2. Strings -------------------------------------------------------------

// Fill {placeholders}: format('Hello, {name}', { name: 'Ana' }) → "Hello, Ana".
// Numbers are formatted for the language: 1234 → "1,234" or "1.234".
// A message can also have plural forms: { one: '…', other: '…' }. Which form
// a number needs depends on the language, so Intl.PluralRules chooses.
export function format(message, params = {}, locale = current) {
  let text = message;
  if (typeof message === 'object') {
    const form = new Intl.PluralRules(locale).select(params.count ?? 0);
    text = message[form] ?? message.other;
  }
  return text.replace(/\{(\w+)\}/g, (whole, name) => {
    if (!(name in params)) return whole;
    const value = params[name];
    return typeof value === 'number' ? new Intl.NumberFormat(locale).format(value) : String(value);
  });
}

// The string for a key, in the current language; English if a draft does not
// have it yet; and the key itself if nobody has it, so a missing string is
// easy to spot on the page, and never crashes it.
export function t(key, params) {
  const message = messages[key] ?? fallback[key];
  if (message === undefined) {
    console.warn(`Missing string: ${key}`);
    return key;
  }
  return format(message, params);
}

// Static text in the HTML carries its key: <h2 data-i18n="nav.planner">.
// The English in the file is what shows before (or without) JavaScript.
export function translatePage(root = document) {
  for (const element of root.querySelectorAll('[data-i18n]')) {
    element.textContent = t(element.dataset.i18n);
  }
  for (const element of root.querySelectorAll('[data-i18n-label]')) {
    element.setAttribute('aria-label', t(element.dataset.i18nLabel));
  }
}

// --- 3. Numbers, dates, and times, with Intl --------------------------------
// Each takes the language as its last argument, so check.html can test any
// language without switching the page.

export function formatNumber(value, options, locale = current) {
  return new Intl.NumberFormat(locale, options).format(value);
}

// 0.25 → "25%" (English), "25 %" (Spanish), "25%" (Chinese)
export function formatPercent(fraction, locale = current) {
  return formatNumber(fraction, { style: 'percent', maximumFractionDigits: 0 }, locale);
}

// 26.8 → "27°C" or "27 °C": Intl knows each language's way.
export function formatTemperature(celsius, locale = current) {
  return formatNumber(Math.round(celsius), { style: 'unit', unit: 'celsius' }, locale);
}

// "2026-09-28" → "Monday, 28 September" / "lunes, 28 de septiembre" / "9月28日星期一".
// The date has no time, so add noon to stop time zones moving it a day.
export function formatDay(isoDate, locale = current) {
  return new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long' })
    .format(new Date(`${isoDate}T12:00:00`));
}

// A moment in time → "14:05", "2:05 p. m.", or "14:05", as each language prefers.
export function formatClock(timestamp, locale = current) {
  return new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' }).format(timestamp);
}

// The planner stores "19:00". Show it the local way: "7:00 PM" in English.
// UTC in and UTC out, so the time zone can never change it.
export function formatTimeOfDay(time, locale = current) {
  const [hours, minutes] = time.split(':').map(Number);
  return new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' })
    .format(Date.UTC(2024, 0, 1, hours, minutes));
}

// 0 → "Monday", "lunes", "星期一". 1 January 2024 was a Monday, so day
// number i is 1 + i January 2024. No list of day names in any language.
export function weekdayName(index, locale = current) {
  return new Intl.DateTimeFormat(locale, { weekday: 'long', timeZone: 'UTC' })
    .format(Date.UTC(2024, 0, 1 + index));
}
