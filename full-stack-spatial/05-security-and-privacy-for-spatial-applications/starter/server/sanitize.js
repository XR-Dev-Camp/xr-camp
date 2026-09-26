// sanitize.js: what a stored piece of user text or a stored location must
// pass through before it is safe to keep and safe to show to someone else.
// Kept separate from validation.js on purpose (see that file's comment):
// validation answers yes/no; this file changes the value.
//
// A helper existing in the codebase is not the same as it being *used*
// everywhere it needs to be -- see the README's "What went wrong" table for
// which of this lesson's TODOs is exactly that gap, not a missing function.

// Strips C0 control characters, removes anything that looks like an HTML
// tag, then collapses runs of whitespace so a message cannot be padded
// into a wall of blank space. Removing tag-like substrings outright
// (rather than HTML-escaping them) keeps this a plain-text field in every
// sense: the stored value can never contain markup, so it is safe to
// display with either textContent (this project's own client) or, later,
// a template that is less careful -- see the README's "Key code
// explained" for why that second guarantee is worth the extra step, and
// OWASP's Cross Site Scripting Prevention Cheat Sheet's guidance to reject
// markup entirely from fields that were never meant to hold any.
function collapseWhitespace(text) {
  const withoutControlChars = text.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
  const withoutTags = withoutControlChars.replace(/<[^>]*>?/g, '');
  return withoutTags.replace(/\s+/g, ' ').trim();
}

// A conventional HTML-escaper. Even though this lesson's own client never
// builds HTML from user text (it uses textContent -- see js/main.js), this
// is exported and unit-tested anyway: it is the function anything that
// ever *does* build an HTML string from this text -- an email digest, a
// server-rendered page added later -- must call first. See MDN's guidance
// on escaping user input before inserting it into HTML.
export function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// Applied to every annotation and chat message before it is stored (see
// routes.js and realtime.js). Removing control characters and excess
// whitespace here, once, at the point of storage, means every later reader
// of this text -- this lesson's client, a future client, an export tool --
// gets the same already-cleaned value, instead of everyone needing to
// remember to clean it again.
export function sanitizeText(text) {
  return collapseWhitespace(text);
}

// Data minimisation for location: rounds to 1 decimal degree, about 11 km
// at the equator -- enough to place a scene "near a city", never precise
// enough to identify a specific building or a person's home. Called before
// insertScene ever sees a location (see routes.js), so a precise value is
// never even written to disk, not just hidden later. See the README's
// "Data minimisation" section for why this project has no legitimate use
// for anything more precise than this.
export function roundLocation({ lat, lng }) {
  const ROUND_TO = 0.1;
  return {
    lat: Math.round(lat / ROUND_TO) * ROUND_TO,
    lng: Math.round(lng / ROUND_TO) * ROUND_TO,
  };
}
