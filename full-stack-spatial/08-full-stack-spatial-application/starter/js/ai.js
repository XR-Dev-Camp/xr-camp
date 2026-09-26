// ai.js: the two network calls behind the "Description" panel -- ask the
// server for a draft, and save one a person has reviewed. Both are plain
// fetch() calls, the same api() shape js/main.js already uses for every
// other endpoint; this file exists only so js/main.js does not need to know
// these two URLs itself.

// TODO 12: implement both functions below.
//
// requestDescriptionDraft(sceneId): POST, credentials: 'include', to
// `/api/scenes/${encodeURIComponent(sceneId)}/description/draft`. No body
// and no CSRF token are needed -- this route only reads data, it writes
// nothing (see server/routes.js's describeScene).
//
// saveDescription(sceneId, description, csrfToken): PUT, credentials:
// 'include', to `/api/scenes/${encodeURIComponent(sceneId)}/description`,
// with headers { 'Content-Type': 'application/json', 'X-CSRF-Token':
// csrfToken } and body JSON.stringify({ description }) -- this route
// writes to the database, so, like createScene and the annotation and chat
// forms elsewhere in this app, it needs the CSRF token.
//
// Both should return { ok: res.ok, body } where body is the parsed JSON
// response (res.json().catch(() => ({}))), matching js/main.js's api()
// helper so main.js can call showFieldErrors(errors, body) the same way it
// does for every other request.

export async function requestDescriptionDraft(sceneId) {
  throw new Error('TODO 12: implement requestDescriptionDraft in js/ai.js');
}

export async function saveDescription(sceneId, description, csrfToken) {
  throw new Error('TODO 12: implement saveDescription in js/ai.js');
}
