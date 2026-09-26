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
// (output length) a chat-completions endpoint exposes.
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

// --- TODO 13: a very small, in-memory cost and rate limit --------------------
// Every call to a real provider costs money (or, for a local model, time and
// battery), no matter whether routes.js ends up using the answer. That is
// different from a login rate limit (slowing down guessed passwords): this
// one exists to cap spend and load, so it should count *every* call,
// successful or not, against one shared budget — a reasonable
// simplification for a single-tenant learning tool with no accounts. A
// production service would track this per API key or per signed-in account
// instead of in one shared bucket (Course 5.8).
//
// checkAiRateLimit() should:
//   1. If more than AI_WINDOW_MS has passed since windowStartedAt, reset
//      windowStartedAt to Date.now() and callsInWindow to 0.
//   2. If callsInWindow >= AI_MAX_CALLS_PER_WINDOW, return false (do not
//      increment anything — the caller is over budget).
//   3. Otherwise, increment callsInWindow and return true.
const AI_WINDOW_MS = 15 * 60 * 1000;
const AI_MAX_CALLS_PER_WINDOW = 30;
let windowStartedAt = Date.now();
let callsInWindow = 0;

export function checkAiRateLimit() {
  throw new Error('TODO 13: checkAiRateLimit is not implemented yet');
}

// --- TODO 12: the two OpenAI-compatible transports (openai-compatible and
// local) ----------------------------------------------------------------------
// Both providers speak the exact same request and response shape; only the
// base URL, key, and model differ, which is why one function serves both.
//
// callOpenAiShapedEndpoint(messages) should:
//   1. Throw an AiConfigError (with a message naming what is missing) if
//      AI_BASE_URL or AI_MODEL is not set.
//   2. POST to `${AI_BASE_URL}/chat/completions` (strip a trailing slash
//      from AI_BASE_URL first) with:
//        headers: { 'Content-Type': 'application/json',
//                   Authorization: `Bearer ${AI_API_KEY || 'not-needed'}` }
//        body: JSON.stringify({ model: AI_MODEL, messages, temperature: 0,
//                                max_tokens: MAX_RESPONSE_TOKENS })
//      Wrap the fetch() itself in a try/catch and rethrow a network failure
//      as an AiRequestError (fetch throws on a connection failure; it does
//      not reject on a 4xx/5xx response).
//   3. If response.ok is false, throw an AiRequestError naming the status
//      code (and, if you like, the response body, truncated).
//   4. Parse the JSON body and read `body.choices?.[0]?.message?.content`.
//      If it is not a non-empty string, throw an AiResponseError.
//   5. Return that content string.
async function callOpenAiShapedEndpoint(messages) {
  throw new Error('TODO 12: callOpenAiShapedEndpoint is not implemented yet');
}

async function callProvider(messages) {
  if (PROVIDER === 'openai-compatible' || PROVIDER === 'local') return callOpenAiShapedEndpoint(messages);
  throw new AiConfigError(`Unknown AI_PROVIDER "${PROVIDER}". Use "mock", "openai-compatible", or "local".`);
}

// A system message every real prompt in this file starts with: it asks for
// strict JSON and nothing else, because the parse functions below reject
// anything that is not. Repeating the instruction in the user message too
// (see the prompt builders below) makes a malformed reply less likely, but
// never guaranteed — which is exactly why parsing still checks, instead of
// trusting the instruction to have worked.
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

// --- TODO 4: buildDescriptionPrompt ------------------------------------------
// Should return { messages, dataSent }, where:
//   - dataSent is sceneDataForPrompt(scene) (already written above for you).
//   - messages is a two-message array:
//       [{ role: 'system', content: JSON_ONLY_SYSTEM_MESSAGE },
//        { role: 'user', content: <the instruction below, with dataSent
//                                    appended as JSON> }]
//     The user message should: ask for a short (1-3 sentence), plain-language
//     description for someone who cannot see the scene; say to mention only
//     the exhibits listed, by name, and not invent exhibits, materials,
//     colours, or history that are not given; ask for the reply as JSON in
//     the exact shape { "description": "..." }; then include
//     `Scene data: ${JSON.stringify(dataSent)}`.
// dataSent is also returned to the browser (see routes.js) so a learner can
// see, in the UI, exactly what was sent — a small, direct way to check the
// "send only what is needed" privacy rule for themselves.
function buildDescriptionPrompt(scene) {
  throw new Error('TODO 4: buildDescriptionPrompt is not implemented yet');
}

// The mock provider's whole point is to behave like a real one from
// routes.js's point of view — a JSON string, in the exact shape a real reply
// must have — while computing it locally, deterministically, from the same
// structured data a real provider would have received. Already finished:
// once TODO 4 exists, describeScene (TODO 7) can call this for PROVIDER ===
// 'mock' instead of callProvider().
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

// --- TODO 5: parseDescriptionReply -------------------------------------------
// Should:
//   1. Try JSON.parse(raw); if it throws, throw an AiResponseError('AI reply
//      was not valid JSON.') — never guess at a malformed reply.
//   2. Check that the parsed value is an object with a non-empty string
//      `description` field; if not, throw an AiResponseError describing the
//      expected shape.
//   3. Check description.trim().length is not over 500; if it is, throw an
//      AiResponseError.
//   4. Return { description: <the trimmed string> }.
// This runs on every reply, mock or real (see describeScene, TODO 7) — the
// mock provider's replies should always pass it, since mockDescriptionReply
// already returns exactly this shape.
export function parseDescriptionReply(raw) {
  throw new Error('TODO 5: parseDescriptionReply is not implemented yet');
}

// --- TODO 6: checkDescriptionForHallucinations -------------------------------
// Cross-checks a draft against the scene's real data — the closest this
// small course gets to fact-checking a model's reply. It is a heuristic, not
// a guarantee: a description can still be technically accurate and
// misleading in other ways. It exists to catch the specific, common failure
// of a model naming an exhibit that is not actually there.
//
// Should:
//   1. Build a Set of exhibit ids actually present in scene.objects.
//   2. For every exhibit in the shared EXHIBITS list, check (case-
//      insensitively) whether its name appears in `description`.
//   3. If an exhibit's name is mentioned but that exhibit's id is not in the
//      present-ids Set, push a warning string naming the exhibit.
//   4. Return the array of warnings (empty if none).
export function checkDescriptionForHallucinations(description, scene) {
  throw new Error('TODO 6: checkDescriptionForHallucinations is not implemented yet');
}

// --- TODO 7: describeScene ---------------------------------------------------
// Ties TODOs 4-6 together. Should:
//   1. const { messages, dataSent } = buildDescriptionPrompt(scene);
//   2. const raw = PROVIDER === 'mock' ? mockDescriptionReply(dataSent) : await callProvider(messages);
//   3. Try parseDescriptionReply(raw). If it throws and PROVIDER is not
//      'mock', retry once: call callProvider again with the original
//      messages plus the bad reply (role: 'assistant') and a follow-up
//      user message asking it to reply again with only the JSON object
//      (include the error's message so the model knows what was wrong),
//      then parse that. If PROVIDER is 'mock' and parsing still fails,
//      rethrow immediately — the mock provider's output is never malformed,
//      so a failure there is a bug in this file, not "the model's fault".
//   4. const warnings = checkDescriptionForHallucinations(parsed.description, scene);
//   5. Return { description: parsed.description, warnings, provider: PROVIDER, dataSent }.
// Returns a draft — never saves it. routes.js's generateDescription handler
// sends this straight back to the browser as something to review; only
// saveDescription (db.js), called from a separate route after a person
// approves or edits the text, ever writes a description to the database.
export async function describeScene(scene) {
  throw new Error('TODO 7: describeScene is not implemented yet');
}

// --- Natural-language scene search -------------------------------------------
// Sends only what search needs to answer: each scene's id, name, exhibit
// list, and annotation text. It never sends anything this project does not
// already show to anyone who can see the scene (no server timestamps, no
// internal row counts, and — because this lesson has no accounts — no
// owner, session, or account data of any kind to leave out in the first
// place).

// A hard cap, independent of validateSearchQuery's limit on the query
// itself: every scene in this list is repeated in the prompt, so the
// *number* of scenes drives cost the same way message length does. A
// production version outgrowing this cap would need a cheaper first pass
// (keyword filtering, or a vector search) before ever calling a model — a
// good Explorer challenge.
const MAX_SCENES_IN_PROMPT = 30;

function scenesDataForPrompt(scenes) {
  return scenes.slice(0, MAX_SCENES_IN_PROMPT).map((scene) => ({
    id: scene.id,
    name: scene.name,
    exhibits: scene.objects.map((object) => exhibitName(object.exhibitId)),
    annotations: scene.annotations.map((annotation) => annotation.text),
  }));
}

// --- TODO 8: buildSearchPrompt ------------------------------------------------
// Same shape as TODO 4, for search instead of a description. Should return
// { messages, dataSent }, where dataSent is scenesDataForPrompt(scenes), and
// messages is [system message, user message]. The user message should: ask
// which of the listed scenes match `query`; say to identify a scene only by
// its "id" field, and never invent an id that is not listed; ask for the
// reply as JSON in the exact shape
// { "matches": [{ "sceneId": "...", "reason": "..." }], "explanation": "..." };
// say that if nothing matches, "matches" should be an empty array with the
// reason explained in "explanation"; then include
// `Scenes: ${JSON.stringify(dataSent)}`.
function buildSearchPrompt(query, scenes) {
  throw new Error('TODO 8: buildSearchPrompt is not implemented yet');
}

// Finished for you, for the same reason mockDescriptionReply is: it answers
// the same request shape a real provider would, deterministically, with no
// network call, by matching words from `query` against each scene's own
// name, exhibits, and annotation text.
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

// --- TODO 9: parseSearchReply -------------------------------------------------
// Same shape as TODO 5. Should:
//   1. JSON.parse(raw), throwing an AiResponseError on failure.
//   2. Check the parsed value has an array `matches` and a string
//      `explanation`; throw an AiResponseError if not.
//   3. Map each entry of `matches` to { sceneId, reason }, throwing an
//      AiResponseError (naming the index) if an entry is missing a string
//      sceneId or a string reason.
//   4. Return { matches, explanation }.
export function parseSearchReply(raw) {
  throw new Error('TODO 9: parseSearchReply is not implemented yet');
}

// --- TODO 10: filterMatchesAgainstRealScenes ---------------------------------
// The hallucination guard for search: a model can only ever have been shown
// the scene ids in scenesDataForPrompt, so any id it returns that is not one
// of the real scenes passed in did not come from the data — it was
// invented, or copied wrong — and must be dropped before routes.js ever sees
// it.
//
// Should:
//   1. Build a Set of real scene ids from `scenes`.
//   2. Split `matches` into `kept` (sceneId is in the Set) and `dropped`
//      (the sceneId strings that are not).
//   3. Return { kept, dropped }.
export function filterMatchesAgainstRealScenes(matches, scenes) {
  throw new Error('TODO 10: filterMatchesAgainstRealScenes is not implemented yet');
}

// --- TODO 11: searchScenes ----------------------------------------------------
// Ties TODOs 8-10 together, the same way TODO 7 tied 4-6 together for
// descriptions:
//   1. const { messages, dataSent } = buildSearchPrompt(query, scenes);
//   2. const raw = PROVIDER === 'mock' ? mockSearchReply(query, dataSent) : await callProvider(messages);
//   3. Parse with parseSearchReply, with the same one-retry-on-real-providers
//      pattern TODO 7 used (skip the retry, and rethrow immediately, when
//      PROVIDER === 'mock').
//   4. const { kept, dropped } = filterMatchesAgainstRealScenes(parsed.matches, scenes);
//   5. Return { matches: kept, dropped, explanation: parsed.explanation, provider: PROVIDER, dataSent }.
export async function searchScenes(query, scenes) {
  throw new Error('TODO 11: searchScenes is not implemented yet');
}
