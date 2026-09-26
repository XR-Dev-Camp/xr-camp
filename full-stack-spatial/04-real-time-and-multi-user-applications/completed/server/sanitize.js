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

// Strips C0 control characters except the ones that cannot appear anyway
// (validateChatText already collapses this to a single trimmed line), then
// collapses runs of whitespace so a message cannot be padded into a wall of
// blank space.
export function sanitizeChatText(text) {
  const withoutControlChars = text.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
  return withoutControlChars.replace(/\s+/g, ' ').trim();
}

// A conventional HTML-escaper, used nowhere in this lesson's own rendering
// (which uses textContent) but exported and unit-tested anyway: it is the
// function anything that ever does build an HTML string from this text —
// an email digest of reports, say — must call first.
export function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
