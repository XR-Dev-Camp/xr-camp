# Challenge 3: Explorer

**Optional stretch.** Roughly 90 minutes.

Connect a real local model through Ollama or LM Studio, and compare its output to the mock provider's.

## Task

1. Install [Ollama](https://ollama.com/) or [LM Studio](https://lmstudio.ai/) (both are free) and follow its own docs to download and run one small, general-purpose chat model. Confirm the tool's local server is running and note its actual port — check the tool's own current docs rather than assuming; this course's `.env.example` lists each tool's usual default, but either project can change it.
2. In `server/.env`, set `AI_PROVIDER=local`, `AI_LOCAL_KIND` to `ollama` or `lmstudio` to match, and `AI_MODEL` to the exact model name you pulled or loaded. Restart the server and check `GET /api/ai/status` reports your provider and model, not `mock`.
3. Generate a description for two or three different seeded scenes, and try two or three searches. For each one, record:
   - Did the reply parse as valid JSON on the first try, or did this project's one retry (Step 7 and Step 10 of the Walkthrough) have to run?
   - Did `checkDescriptionForHallucinations` or `filterMatchesAgainstRealScenes` ever have to warn about, or drop, something the model said?
   - How did the wording compare to the mock provider's plainer, template-based sentences — more natural, but also: any claim in it that was not actually in the "Data sent" you can see in the UI?
4. Write up what you found in a short note (a few sentences is enough) — in your learner journal, or as a new file under `screenshots/` if you would rather keep it with your other submitted evidence. Include at least one example where the local model's reply differed from what the mock provider would have said for the same scene.
5. Switch `AI_PROVIDER` back to `mock` before you submit, so the project keeps working for anyone reviewing it without your local model installed.

## Why this matters

Every safeguard this lesson built — the JSON-only instruction, the parser that rejects a malformed reply, the hallucination checks, the rate limit — was designed and tested against a provider that never misbehaves (the mock). A real model, even a small local one, is where you find out which of those safeguards were actually doing work, and which failure modes this lesson only described in a comment until now.

## Done when

- [ ] `AI_PROVIDER=local` successfully generated at least one real description and one real search result.
- [ ] You recorded whether the retry path, the hallucination check, or the search hallucination guard ever actually triggered against a real reply.
- [ ] A short written comparison exists between the local model's output and the mock provider's, for at least one scene.
- [ ] `.env` is set back to `AI_PROVIDER=mock` before submitting, and no real key or model-specific secret is committed anywhere.
