// ai.js: this capstone's one optional addition on top of Course 5.5's fixed
// server -- a scene-description draft, built the way Course 5.6 taught:
// provider-neutral in shape, but with only the "mock" provider implemented
// here, to keep this capstone compact and runnable with no internet
// connection, no API key, and no cost. Trying AI_PROVIDER=openai-compatible
// or AI_PROVIDER=local (5.6's other two providers, reaching a real
// OpenAI-compatible endpoint) is this lesson's Explorer challenge.
//
// A draft is never saved by this file -- describeScene only returns text
// for a person to read and, if they choose, edit, before routes.js's
// saveDescription (TODO 10) ever writes anything to the database. See the
// README's "AI description drafts, with review" section. This lesson's own
// new TODOs are numbered 8-13, continuing after Course 5.5's TODOs 1-7
// (already fixed, unchanged, below and in every other server file).

export class AiConfigError extends Error {}

const PROVIDER = process.env.AI_PROVIDER || 'mock';

// Reports what is configured, for the client's status line -- never a key,
// because this capstone never has one to report: the mock provider makes no
// network call at all.
export function providerInfo() {
  return { provider: PROVIDER, configured: PROVIDER === 'mock' };
}

// A deterministic, offline "model": same scene, same draft, every time.
// Built only from this scene's own name and its already-sanitised
// annotation text (see sanitize.js) -- never invented, and never anything
// this caller could not already see by opening the scene themselves.
function mockDescription(scene, annotations) {
  const base = `A scene named "${scene.name}", ${scene.isPublic ? 'shared publicly' : 'kept private'}.`;
  if (annotations.length === 0) return `${base} It has no annotations yet.`;
  const notes = annotations.map((a) => a.text).join(' ');
  return `${base} Its annotations say: ${notes}`;
}

// TODO 8: build and return a description draft for this scene. Use
// mockDescription (above) when the configured provider is "mock" -- this
// capstone's only implemented path -- and throw an AiConfigError naming the
// unsupported provider otherwise. Return a plain object shaped
// { description, provider }, and never write anything to the database from
// here: routes.js's saveDescription is the only function allowed to do that
// (see the README's "AI description drafts, with review" section).
export async function describeScene(scene, annotations) {
  throw new Error('TODO 8: implement describeScene in server/ai.js');
}
