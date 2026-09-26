// sanitize.js: what happens to chat text between "shaped like a valid
// message" (validation.js) and "safe to store and relay to every other
// browser in the room". Two separate concerns, on purpose: validation
// answers yes/no; sanitizing changes the value.
//
// js/main.js renders every chat line with `textContent`, never
// `innerHTML`, so a `<script>` in a message can never run there. This file
// exists anyway, for two reasons the README's "What never to trust from a
// client" section explains further: (1) never trust one layer alone — a
// future client, a debugging tool, or a bridge into another chat system
// might use innerHTML without knowing why that would be unsafe here, and
// (2) control characters (stray U+0000-U+001F bytes, for example) are not
// an XSS risk but can still break terminals, logs, and some renderers.

// TODO 3: sanitizeChatText(text). Strip C0 control characters (the Unicode
// range U+0000-U+001F, plus U+007F) — a regular expression character class
// like /[\u0000-\u001F\u007F]/g removes them in one pass — then collapse
// any run of whitespace into a single space (/\s+/g), then trim() the
// result. Return the cleaned string. (validateChatText, from TODO 2b,
// already trims and length-checks the *raw* text before this function ever
// sees it, so this function only needs to handle content, not length.)
export function sanitizeChatText(text) {
  throw new Error('sanitizeChatText is not implemented yet — see TODO 3');
}

// A conventional HTML-escaper, used nowhere in this lesson's own rendering
// (which uses textContent) but exported and unit-tested anyway: it is the
// function anything that ever does build an HTML string from this text —
// an email digest of reports, say — must call first. Finished for you,
// since it is not this lesson's teaching point.
export function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
