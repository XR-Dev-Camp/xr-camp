# Challenge 2: Creative

**Optional.** Roughly 45-60 minutes.

Customize the project so it reflects your own interests, community, or language.

## Task

1. Rewrite `server/ai.js`'s `mockDescription` so its sentences sound like something a curator or guide from your own community would actually say — keep it built only from the scene's real name and annotation text (never invent facts about a specific scene), but change the wording, tone, or structure to feel like yours.
2. If your language uses a script not fully supported by A-Frame's default text font (see this repository's house style on A-Frame text and accents), test that any of your own new UI text still displays correctly — the description panel is plain HTML, not A-Frame text, so this should work without extra effort, but confirm it.
3. Update the `<meta name="description">` and the description panel's hint text in `index.html` to match your new voice, in English (translations come later).
4. Add a short note to `CHANGELOG.md`'s `1.0.0` entry describing what you changed and why.

## Why this matters

A description is meant to help someone picture a scene they cannot see directly — the words that do that well are different in every language and culture. Course 5.6 built this feature provider-neutral on purpose so its output is not locked to one voice; this challenge asks you to prove that by giving it yours.

## Done when

- [ ] `mockDescription` produces text in your own voice, still built only from real scene data.
- [ ] The description panel's own text (hint, labels) matches that voice.
- [ ] `npm test` still passes — your test data's exact wording does not need to match the original test's assertions unless you changed them deliberately and consistently.
- [ ] `CHANGELOG.md` names your change.
