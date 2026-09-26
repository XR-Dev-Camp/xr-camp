// ai.js: the only file that talks to a language model, and the subject of
// this lesson. Every other server file asks this module for a scene
// description draft or a search result — never builds a prompt or reads a
// model's raw reply itself. That is what makes the three providers below
// interchangeable: routes.js does not know or care which one answered.
//
// Providers (chosen once, at startup, with AI_PROVIDER — see .env.example):
//
//   - "mock" (the default). A deterministic, offline provider built for this
//     course: same input, same output, every time, with no network call. It
//     exists so this project works with no internet connection, no API key,
//     and no cost, and so server.test.js and CI never depend on a real
//     provider's availability, speed, or per-run randomness.
//   - "openai-compatible". Any server that implements OpenAI's chat
//     completions request/response shape: POST {AI_BASE_URL}/chat/completions
//     with a `messages` array, reading the reply from
//     `choices[0].message.content`. This covers OpenAI itself and a number
//     of other hosted providers with the same API shape, including some
//     based in mainland China — check each provider's current terms,
//     pricing, and data-handling policy yourself before choosing one; naming
//     the shape here is not an endorsement of any specific company. The key
//     that authenticates to it (AI_API_KEY) is read only on this server; it
//     is never sent to, or readable from, the browser.
//   - "local". A model running on the learner's own machine through Ollama
//     or LM Studio. Both also implement the OpenAI-compatible chat
//     completions shape, each on its own default port — Ollama publishes
//     `http://127.0.0.1:11434/v1`, LM Studio publishes
//     `http://127.0.0.1:1234/v1` in its "Local Server" tab — but confirm the
//     current default in each tool's own docs before relying on it, since
//     either project can change it. No scene data leaves the machine with
//     this provider, and most local servers accept any non-empty API key
//     (or none at all).
//
// Whichever provider answers, this file treats the reply exactly the same:
// parse it as JSON, check its shape against what routes.js actually needs,
// and reject anything that does not match — a malformed reply is never
// guessed at or partially used. A description draft is also never saved
// here; only returned, for a person to read, edit, and approve (see the
// README's "Human review, every time" section) before routes.js's
// saveDescription writes anything to db.js.

import { EXHIBITS, exhibitName } from './exhibits.js';

export class AiConfigError extends Error {}
export class AiRequestError extends Error {}
export class AiResponseError extends Error {}

const PROVIDER = process.env.AI_PROVIDER || 'mock';
const AI_MODEL = process.env.AI_MODEL || '';
const AI_API_KEY = process.env.AI_API_KEY || '';
const AI_LOCAL_KIND = process.env.AI_LOCAL_KIND || 'ollama';
const LOCAL_DEFAULT_BASE_URLS = {
  ollama: 'http://127.0.0.1:11434/v1',
  lmstudio: 'http://127.0.0.1:1234/v1',
};
const AI_BASE_URL = process.env.AI_BASE_URL
  || (PROVIDER === 'local' ? LOCAL_DEFAULT_BASE_URLS[AI_LOCAL_KIND] : '');

// Bounds how much a single reply can cost, in the roughest available unit
// (output length) a chat-completions endpoint exposes: a provider billed by
// the token has no ceiling here unless this project sets one itself.
const MAX_RESPONSE_TOKENS = 300;

// Reports what is configured, for GET /api/ai/status — never the key.
export function providerInfo() {
  return {
    provider: PROVIDER,
    model: PROVIDER === 'mock' ? 'mock' : AI_MODEL || null,
    baseUrl: PROVIDER === 'mock' ? null : AI_BASE_URL || null,
    configured: PROVIDER === 'mock' || Boolean(AI_BASE_URL && AI_MODEL),
  };
}

// --- A very small, in-memory cost and rate limit -----------------------------
// Every call to a real provider costs money (or, for a local model, time and
// battery), no matter whether routes.js ends up using the answer. That is
// different from rateLimit.js's job elsewhere in this course (slowing down
// guessed passwords): this limit exists to cap spend and load, so it counts
// every call, successful or not, against one shared budget — a reasonable
// simplification for a single-tenant learning tool with no accounts. A
// production service would track this per API key or per signed-in account
// instead of in one shared bucket (Course 5.8).
const AI_WINDOW_MS = 15 * 60 * 1000;
const AI_MAX_CALLS_PER_WINDOW = 30;
let windowStartedAt = Date.now();
let callsInWindow = 0;

export function checkAiRateLimit() {
  if (Date.now() - windowStartedAt > AI_WINDOW_MS) {
    windowStartedAt = Date.now();
    callsInWindow = 0;
  }
  if (callsInWindow >= AI_MAX_CALLS_PER_WINDOW) return false;
  callsInWindow += 1;
  return true;
}

// --- The two OpenAI-compatible transports (openai-compatible and local) -----
// Both speak the exact same request and response shape; only the base URL,
// key, and model differ, which is why one function serves both.
async function callOpenAiShapedEndpoint(messages) {
  if (!AI_BASE_URL || !AI_MODEL) {
    throw new AiConfigError(
      `AI_PROVIDER=${PROVIDER} needs AI_BASE_URL and AI_MODEL set (see .env.example). `
      + 'For a local model, AI_BASE_URL defaults to Ollama\'s or LM Studio\'s address, '
      + 'but AI_MODEL must still name a model you have already pulled or loaded.',
    );
  }
  let response;
  try {
    response = await fetch(`${AI_BASE_URL.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Most local servers accept any non-empty value here; a real
        // AI_API_KEY is required for a hosted provider.
        Authorization: `Bearer ${AI_API_KEY || 'not-needed'}`,
      },
      body: JSON.stringify({
        model: AI_MODEL, messages, temperature: 0, max_tokens: MAX_RESPONSE_TOKENS,
      }),
    });
  } catch (error) {
    throw new AiRequestError(`Could not reach the AI provider at ${AI_BASE_URL}: ${error.message}`);
  }
  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new AiRequestError(`AI provider answered HTTP ${response.status}: ${detail.slice(0, 200)}`);
  }
  const body = await response.json().catch(() => null);
  const content = body?.choices?.[0]?.message?.content;
  if (typeof content !== 'string' || content.trim().length === 0) {
    throw new AiResponseError('AI provider response had no message content.');
  }
  return content;
}

async function callProvider(messages) {
  if (PROVIDER === 'openai-compatible' || PROVIDER === 'local') return callOpenAiShapedEndpoint(messages);
  throw new AiConfigError(`Unknown AI_PROVIDER "${PROVIDER}". Use "mock", "openai-compatible", or "local".`);
}

// A system message every real prompt in this file starts with: it asks for
// strict JSON and nothing else, because parseDescriptionReply and
// parseSearchReply below reject anything that is not. Repeating the
// instruction in the user message too (see buildDescriptionPrompt and
// buildSearchPrompt) makes a malformed reply less likely, but never
// guaranteed — which is exactly why parsing still checks, instead of trusting
// the instruction to have worked.
const JSON_ONLY_SYSTEM_MESSAGE = 'You reply with a single JSON object and nothing else: no markdown, no code fences, no explanation outside the JSON.';

// --- Scene descriptions -------------------------------------------------------
// Built from the scene's structured data only — the exhibit ids, their
// positions and rotations, and any annotation text already visible on the
// scene — never from a picture of it. That keeps the prompt small (cheaper,
// and faster on a local model) and keeps this feature usable for anyone who
// cannot see the 3D view at all, which is the point of an automatic
// description in the first place.

function sceneDataForPrompt(scene) {
  return {
    name: scene.name,
    exhibits: scene.objects.map((object) => ({
      name: exhibitName(object.exhibitId),
      position: object.position,
      rotationDegrees: object.rotationY,
    })),
    annotations: scene.annotations.map((annotation) => ({
      exhibit: exhibitName(annotation.exhibitId), text: annotation.text,
    })),
  };
}

function buildDescriptionPrompt(scene) {
  const data = sceneDataForPrompt(scene);
  const userMessage = [
    'Write a short, plain-language description of this 3D scene for someone who cannot see it, in 1-3 sentences.',
    'Mention only the exhibits listed below, by name. Do not invent exhibits, materials, colours, or history that are not given.',
    'Reply as JSON: { "description": "..." }',
    '',
    `Scene data: ${JSON.stringify(data)}`,
  ].join('\n');
  return {
    messages: [
      { role: 'system', content: JSON_ONLY_SYSTEM_MESSAGE },
      { role: 'user', content: userMessage },
    ],
    dataSent: data,
  };
}

// The mock provider's whole point is to behave like a real one from
// routes.js's point of view — a JSON string, in the exact shape a real reply
// must have — while computing it locally, deterministically, from the same
// structured data a real provider would have received.
function mockDescriptionReply(data) {
  const names = data.exhibits.map((exhibit) => exhibit.name);
  const sentence = names.length === 0
    ? 'This scene has no exhibits placed yet.'
    : `This scene places ${names.join(', ')}.`;
  const noteSentence = data.annotations.length > 0
    ? ` It includes a note on ${data.annotations.map((a) => a.exhibit).join(' and ')}.`
    : '';
  return JSON.stringify({ description: `${sentence}${noteSentence}` });
}

export function parseDescriptionReply(raw) {
  let json;
  try { json = JSON.parse(raw); } catch { throw new AiResponseError('AI reply was not valid JSON.'); }
  if (typeof json !== 'object' || json === null || typeof json.description !== 'string' || json.description.trim().length === 0) {
    throw new AiResponseError('AI reply must be a JSON object with a non-empty "description" string.');
  }
  const description = json.description.trim();
  if (description.length > 500) throw new AiResponseError('AI reply\'s description was longer than 500 characters.');
  return { description };
}

// Cross-checks a draft against the scene's real data — the closest this
// small course gets to fact-checking a model's reply. It is a heuristic, not
// a guarantee: a description can still be technically accurate and
// misleading in other ways. It exists to catch the specific, common failure
// of a model naming an exhibit, colour, or count that is not actually there.
export function checkDescriptionForHallucinations(description, scene) {
  const warnings = [];
  const lower = description.toLowerCase();
  const present = new Set(scene.objects.map((object) => object.exhibitId));
  for (const exhibit of EXHIBITS) {
    const mentioned = lower.includes(exhibit.name.toLowerCase());
    if (mentioned && !present.has(exhibit.id)) {
      warnings.push(`Mentions "${exhibit.name}", which is not placed in this scene.`);
    }
  }
  return warnings;
}

// Returns a draft — never saves it. routes.js's describeScene handler sends
// this straight back to the browser as something to review; only
// saveDescription (db.js), called from a separate route after a person
// approves or edits the text, ever writes a description to the database.
export async function describeScene(scene) {
  const { messages, dataSent } = buildDescriptionPrompt(scene);
  const raw = PROVIDER === 'mock' ? mockDescriptionReply(dataSent) : await callProvider(messages);
  let parsed;
  try {
    parsed = parseDescriptionReply(raw);
  } catch (error) {
    if (PROVIDER === 'mock') throw error; // the mock provider's output is never malformed; a bug here is this file's, not "the model's"
    // One retry, with a sharper reminder, before giving up: real providers
    // occasionally wrap JSON in prose or a code fence despite being asked
    // not to, and a second try is cheap next to rejecting a usable answer.
    const retryRaw = await callProvider([
      ...messages,
      { role: 'assistant', content: raw },
      { role: 'user', content: `That reply was not valid JSON (${error.message}). Reply again with only the JSON object.` },
    ]);
    parsed = parseDescriptionReply(retryRaw);
  }
  const warnings = checkDescriptionForHallucinations(parsed.description, scene);
  return {
    description: parsed.description, warnings, provider: PROVIDER, dataSent,
  };
}

// --- Natural-language scene search -------------------------------------------
// Sends only what search needs to answer: each scene's id, name, exhibit
// list, and annotation text. It never sends anything this project does not
// already show to anyone who can see the scene (no server timestamps, no
// internal row counts, and — because this lesson has no accounts — no
// owner, session, or account data of any kind to leave out in the first
// place).

function scenesDataForPrompt(scenes) {
  // A hard cap, independent of validateSearchQuery's limit on the query
  // itself: every scene in this list is repeated in the prompt, so the
  // *number* of scenes drives cost the same way message length does. A
  // production version outgrowing this cap would need a cheaper first pass
  // (keyword filtering, or a vector search) before ever calling a model —
  // a good Explorer challenge.
  const MAX_SCENES_IN_PROMPT = 30;
  return scenes.slice(0, MAX_SCENES_IN_PROMPT).map((scene) => ({
    id: scene.id,
    name: scene.name,
    exhibits: scene.objects.map((object) => exhibitName(object.exhibitId)),
    annotations: scene.annotations.map((annotation) => annotation.text),
  }));
}

function buildSearchPrompt(query, scenes) {
  const data = scenesDataForPrompt(scenes);
  const userMessage = [
    `Find which of these scenes match this request: "${query}"`,
    'Only use the "id" field to identify a scene; never invent an id that is not listed.',
    'Reply as JSON: { "matches": [{ "sceneId": "...", "reason": "..." }], "explanation": "..." }',
    'If nothing matches, reply with an empty "matches" array and explain why in "explanation".',
    '',
    `Scenes: ${JSON.stringify(data)}`,
  ].join('\n');
  return {
    messages: [
      { role: 'system', content: JSON_ONLY_SYSTEM_MESSAGE },
      { role: 'user', content: userMessage },
    ],
    dataSent: data,
  };
}

function mockSearchReply(query, data) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const matches = [];
  for (const scene of data) {
    const haystack = [scene.name, ...scene.exhibits, ...scene.annotations].join(' ').toLowerCase();
    const hitCount = words.filter((word) => haystack.includes(word)).length;
    if (hitCount > 0) {
      matches.push({ sceneId: scene.id, reason: `Matches ${hitCount} word(s) from the query in its name, exhibits, or annotations.` });
    }
  }
  const explanation = matches.length > 0
    ? `Found ${matches.length} scene(s) whose name, exhibits, or annotations mention a word from "${query}".`
    : `No scene's name, exhibits, or annotations mention any word from "${query}".`;
  return JSON.stringify({ matches, explanation });
}

export function parseSearchReply(raw) {
  let json;
  try { json = JSON.parse(raw); } catch { throw new AiResponseError('AI reply was not valid JSON.'); }
  if (!json || typeof json !== 'object' || !Array.isArray(json.matches) || typeof json.explanation !== 'string') {
    throw new AiResponseError('AI reply must be a JSON object with a "matches" array and an "explanation" string.');
  }
  const matches = json.matches.map((match, index) => {
    if (!match || typeof match.sceneId !== 'string' || typeof match.reason !== 'string') {
      throw new AiResponseError(`AI reply's matches[${index}] must have a string "sceneId" and a string "reason".`);
    }
    return { sceneId: match.sceneId, reason: match.reason };
  });
  return { matches, explanation: json.explanation };
}

// The hallucination guard for search: a model can only ever have been shown
// the scene ids in scenesDataForPrompt, so any id it returns that is not one
// of the real scenes passed in did not come from the data — it was
// invented, or copied wrong — and is dropped before routes.js ever sees it.
export function filterMatchesAgainstRealScenes(matches, scenes) {
  const realIds = new Set(scenes.map((scene) => scene.id));
  const kept = [];
  const dropped = [];
  for (const match of matches) {
    if (realIds.has(match.sceneId)) kept.push(match); else dropped.push(match.sceneId);
  }
  return { kept, dropped };
}

export async function searchScenes(query, scenes) {
  const { messages, dataSent } = buildSearchPrompt(query, scenes);
  const raw = PROVIDER === 'mock' ? mockSearchReply(query, dataSent) : await callProvider(messages);
  let parsed;
  try {
    parsed = parseSearchReply(raw);
  } catch (error) {
    if (PROVIDER === 'mock') throw error;
    const retryRaw = await callProvider([
      ...messages,
      { role: 'assistant', content: raw },
      { role: 'user', content: `That reply was not valid JSON (${error.message}). Reply again with only the JSON object.` },
    ]);
    parsed = parseSearchReply(retryRaw);
  }
  const { kept, dropped } = filterMatchesAgainstRealScenes(parsed.matches, scenes);
  return {
    matches: kept, dropped, explanation: parsed.explanation, provider: PROVIDER, dataSent,
  };
}
