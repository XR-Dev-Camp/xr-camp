// ai.js: the two network calls behind the "Description" panel -- ask the
// server for a draft, and save one a person has reviewed. Both are plain
// fetch() calls, the same api() shape js/main.js already uses for every
// other endpoint; this file exists only so js/main.js does not need to know
// these two URLs itself.

export async function requestDescriptionDraft(sceneId) {
  const res = await fetch(`/api/scenes/${encodeURIComponent(sceneId)}/description/draft`, {
    method: 'POST',
    credentials: 'include',
  });
  const body = await res.json().catch(() => ({}));
  return { ok: res.ok, body };
}

export async function saveDescription(sceneId, description, csrfToken) {
  const res = await fetch(`/api/scenes/${encodeURIComponent(sceneId)}/description`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
    body: JSON.stringify({ description }),
  });
  const body = await res.json().catch(() => ({}));
  return { ok: res.ok, body };
}
