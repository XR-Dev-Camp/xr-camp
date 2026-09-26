# Challenge 3: Explorer

**Optional stretch.** Roughly 90 minutes.

Implement Course 5.6's `openai-compatible` or `local` provider path in `server/ai.js`, reaching a real endpoint instead of the mock provider.

## Task

1. Re-read Course 5.6's `server/ai.js` (`full-stack-spatial/06-ai-for-spatial-computing/completed/server/ai.js`) for its `callOpenAiShapedEndpoint` function and its `AI_PROVIDER`, `AI_BASE_URL`, `AI_MODEL`, and `AI_API_KEY` environment variables.
2. Add the same environment variables and the same `callOpenAiShapedEndpoint` function to this capstone's `server/ai.js`, adapted to call this project's own `describeScene(scene, annotations)` shape instead of 5.6's `describeScene(scene)`.
3. Build a prompt from the scene's name and annotation text (see `sceneDataForPrompt` in 5.6's `ai.js` for the pattern), asking for a strict-JSON reply shaped `{ "description": "..." }`, and parse it the same defensive way 5.6 does — reject anything that is not that exact shape.
4. Choose one real target to test against: a hosted OpenAI-compatible endpoint you already have a key for, or a local model through [Ollama](https://ollama.com/) or [LM Studio](https://lmstudio.ai/) (both free, and both keep your data on your own machine).
5. Confirm the mock provider still works with no configuration at all — this capstone's own tests must keep passing with `AI_PROVIDER` unset.
6. Update `.env.example` to document the new variables, and add a short paragraph to this folder's README describing how you tested the real provider (name it, and say cautiously how well it worked — see this repository's house style on Chinese-market provider options if you tried one).

## Why this matters

Course 5.6 built this feature provider-neutral specifically so a learner could reach a real model later without rewriting anything else in the app. This challenge proves that design works: everything outside `server/ai.js` — validation, sanitising, the ownership checks, the client — should need no changes at all.

## Done when

- [ ] `server/ai.js` supports at least one of `openai-compatible` or `local`, alongside the still-working `mock` default.
- [ ] A malformed reply from the real provider is rejected with a clear error, never guessed at.
- [ ] `.env.example` documents every new variable.
- [ ] `npm test` still passes with no environment variables set (the mock path, unaffected by your changes).
- [ ] A short paragraph in this folder's README says which real provider you tried and how it went.
