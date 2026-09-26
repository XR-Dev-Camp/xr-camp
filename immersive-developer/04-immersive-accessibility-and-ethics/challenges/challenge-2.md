# Challenge 2: Creative

**Optional.** Roughly 45-60 minutes.

Give the talk your own voice: your language, your community, or a subject you actually care about.

## Task

1. Replace `TALK_SCRIPT` in `js/talk.js` with three to five lines about something from your own culture, community, or field of study - three objects, three places, or three ideas, following the same one-sentence-per-line shape as the original.
2. If you write it in a language other than English, check whether `SpeechSynthesisUtterance`'s `lang` property has a matching voice available in your browser (`speechSynthesis.getVoices()`); if not, say so in a comment and keep the transcript as the reliable fallback, since it never depends on a voice being installed.
3. Update `#scene-description` and the answer text in "Ask a question" to match your new subject.
4. Keep every accessibility fix from the main lesson working: run through `tests/checklist.md` again with your new content.

## Why this matters

An accessible design that only works for one specific script and one specific subject is not fully accessible - it just has not been tested against anything else yet. Swapping the content is a quick, real test of whether your fixes (the transcript, the captions, the keyboard routes) were built from the data, or hard-coded to this one talk.

## Done when

- [ ] The talk covers a subject of your choosing, in your own words.
- [ ] The transcript, captions, and scene description all match the new content.
- [ ] Every item in `tests/checklist.md` still passes with the new content in place.
