# Challenge 1: Foundation

**Required.** Roughly 45 minutes.

Add a fourth Intl-formatted fact to the stats panel, in all three languages.

## Task

1. In `js/config.js`, add a new constant, `OPENING_HOUR = 9` (the exhibit
   "opens" at 9 a.m. local time).
2. In `js/i18n.js`, write `formatOpeningTime(hour, locale)`: build
   `new Date(2024, 0, 1, hour)` and format it with
   `new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' })`.
3. Add a new key, `stats.opensAt`, to all three locale files: `'Opens daily
   at {time}.'` in English, and its Spanish and Simplified Chinese
   equivalents (mark them as drafts, same as the rest of `es.js` and
   `zh-Hans.js`).
4. In `main.js`'s `renderStats()`, add a line using `t('stats.opensAt', {
   time: formatOpeningTime(OPENING_HOUR) })` to the `lines` array.
5. Check all three languages: the time should read "9:00 AM" in English and
   a locale-correct 24-hour or 12-hour form in Spanish and Chinese, without
   you writing either format yourself.

## Why this matters

Every real app eventually needs a format `Intl` did not already give you a
named option for. Building it from `Intl.DateTimeFormat`'s hour/minute
options, instead of writing `"${hour}:00"` by hand, is what keeps it correct
in every language this app will ever ship in, including ones you have not
added yet.

## Done when

- [ ] `formatOpeningTime` exists and uses `Intl.DateTimeFormat`.
- [ ] All three languages show a correctly formatted opening time.
- [ ] No language shows `stats.opensAt` (a missing-key fallback) instead of real text.
