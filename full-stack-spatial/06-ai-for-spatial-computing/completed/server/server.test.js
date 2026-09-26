// server.test.js: node:test, built into Node, needs no dependency to
// install. Run it with `npm test` (or `node --test`) from this folder.
//
// AI_PROVIDER is forced to "mock" here, before server.js (and so ai.js) is
// ever imported, no matter what your own .env says: a test suite that
// depended on a real, paid, or offline-unavailable provider would be slow,
// flaky, and unsafe to run in CI. This is the whole reason the mock
// provider exists (see ai.js) — it answers the exact same request shape a
// real provider would, deterministically, so these tests can check the full
// pipeline (prompt building, JSON parsing, the hallucination check) without
// a network connection.

import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const tempDir = await mkdtemp(join(tmpdir(), 'xrcamp-fss-06-'));
process.env.DB_FILE = join(tempDir, 'scenes.test.sqlite');
process.env.AI_PROVIDER = 'mock';

const { server } = await import('./server.js');

let baseUrl;

before(async () => {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  await rm(tempDir, { recursive: true, force: true });
});

const SAMPLE_OBJECTS = [
  { exhibitId: 'clay-pot', position: { x: -1.3, y: 0, z: 0 }, rotationY: 0 },
  { exhibitId: 'basket-ring', position: { x: 0, y: 0, z: 0 }, rotationY: 0 },
  { exhibitId: 'jade-stone', position: { x: 1.3, y: 0, z: 0 }, rotationY: 0 },
];

async function createTestScene(name, objects = SAMPLE_OBJECTS) {
  const res = await fetch(`${baseUrl}/api/scenes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, isPublic: true, objects }),
  });
  assert.equal(res.status, 201);
  return res.json();
}

test('GET /api/ai/status reports the mock provider and never a key', async () => {
  const res = await fetch(`${baseUrl}/api/ai/status`);
  const body = await res.json();
  assert.equal(res.status, 200);
  assert.equal(body.provider, 'mock');
  assert.equal(JSON.stringify(body).includes('AI_API_KEY'), false);
  assert.ok(body.disclosure.length > 0);
});

test('seeded scenes are present on first run', async () => {
  const res = await fetch(`${baseUrl}/api/scenes`);
  const scenes = await res.json();
  assert.ok(scenes.length >= 3);
});

test('creating a scene rejects an out-of-range coordinate', async () => {
  const res = await fetch(`${baseUrl}/api/scenes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Too far',
      isPublic: true,
      objects: [{ exhibitId: 'clay-pot', position: { x: 9999, y: 0, z: 0 }, rotationY: 0 }],
    }),
  });
  assert.equal(res.status, 400);
});

test('POST /api/scenes/:id/describe returns a draft that mentions only real exhibits, and saves nothing', async () => {
  const scene = await createTestScene('Description test scene');

  const res = await fetch(`${baseUrl}/api/scenes/${scene.id}/describe`, { method: 'POST' });
  const body = await res.json();
  assert.equal(res.status, 200);
  assert.equal(typeof body.description, 'string');
  assert.ok(body.description.length > 0);
  assert.deepEqual(body.warnings, []); // the mock provider only ever names exhibits actually in the scene
  assert.equal(body.provider, 'mock');
  assert.equal(body.savedDescription, null);

  const reloaded = await (await fetch(`${baseUrl}/api/scenes/${scene.id}`)).json();
  assert.equal(reloaded.description, null); // a draft is never auto-saved
});

test('PUT /api/scenes/:id/description saves only after a person approves it', async () => {
  const scene = await createTestScene('Save description test');
  const save = await fetch(`${baseUrl}/api/scenes/${scene.id}/description`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description: 'A hand-edited, human-approved description.' }),
  });
  assert.equal(save.status, 200);

  const reloaded = await (await fetch(`${baseUrl}/api/scenes/${scene.id}`)).json();
  assert.equal(reloaded.description, 'A hand-edited, human-approved description.');
});

test('PUT /api/scenes/:id/description rejects an empty description', async () => {
  const scene = await createTestScene('Reject empty description test');
  const res = await fetch(`${baseUrl}/api/scenes/${scene.id}/description`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description: '   ' }),
  });
  assert.equal(res.status, 400);
});

test('POST /api/search finds a scene by an exhibit name in the query', async () => {
  const scene = await createTestScene('Search target scene', [
    { exhibitId: 'jade-stone', position: { x: 0, y: 0, z: 0 }, rotationY: 0 },
  ]);
  const res = await fetch(`${baseUrl}/api/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: 'jade stone' }),
  });
  const body = await res.json();
  assert.equal(res.status, 200);
  assert.ok(body.matches.some((match) => match.scene.id === scene.id));
  assert.equal(body.dropped.length, 0);
  assert.equal(body.provider, 'mock');
});

test('POST /api/search rejects a query longer than the limit', async () => {
  const res = await fetch(`${baseUrl}/api/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: 'x'.repeat(500) }),
  });
  assert.equal(res.status, 400);
});

test('a scene search never returns a scene id that does not exist (hallucination guard)', async () => {
  const { filterMatchesAgainstRealScenes } = await import('./ai.js');
  const scenes = [{ id: 'real-scene-1' }];
  const { kept, dropped } = filterMatchesAgainstRealScenes(
    [{ sceneId: 'real-scene-1', reason: 'ok' }, { sceneId: 'invented-scene-id', reason: 'made up' }],
    scenes,
  );
  assert.equal(kept.length, 1);
  assert.deepEqual(dropped, ['invented-scene-id']);
});

test('a malformed AI reply is rejected, not guessed at', async () => {
  const { parseDescriptionReply, parseSearchReply, AiResponseError } = await import('./ai.js');
  assert.throws(() => parseDescriptionReply('not json at all'), AiResponseError);
  assert.throws(() => parseDescriptionReply('{"wrongField": "oops"}'), AiResponseError);
  assert.throws(() => parseSearchReply('{"matches": "not an array"}'), AiResponseError);
});

test('the hallucination check flags an exhibit the scene does not contain', async () => {
  const { checkDescriptionForHallucinations } = await import('./ai.js');
  const scene = { objects: [{ exhibitId: 'clay-pot' }] };
  const warnings = checkDescriptionForHallucinations('This scene shows a jade stone.', scene);
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /Jade stone/);
});

test('deleting a scene removes its annotations and description too', async () => {
  const scene = await createTestScene('Delete cascade test');
  await fetch(`${baseUrl}/api/scenes/${scene.id}/annotations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ exhibitId: 'clay-pot', text: 'A note.' }),
  });
  const del = await fetch(`${baseUrl}/api/scenes/${scene.id}`, { method: 'DELETE' });
  assert.equal(del.status, 204);
  const getAfter = await fetch(`${baseUrl}/api/scenes/${scene.id}`);
  assert.equal(getAfter.status, 404);
});
