# Changelog

All notable changes to this capstone app are recorded here, newest first. Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## 1.0.0

First release of the Phase 5 capstone app.

### Added
- Accounts, hashed passwords, and sessions, carried over from Course 5.2.
- Saved scenes and annotations in SQLite, carried over from Course 5.3.
- A real-time shared chat room over WebSockets, with reconnect-with-backoff, carried over from Course 5.4.
- Every one of Course 5.5's review-sprint fixes: sanitised annotations and chat, a strict Content Security Policy, a secret read from the environment, an IDOR check on the scene endpoint, generic error messages, and location data minimised to about 11 km before it is ever stored.
- New in this capstone: an optional AI description draft for a scene, built by Course 5.6's deterministic, offline "mock" provider, with no network call and no cost -- a draft is reviewed and, if needed, edited by a person before "Save description" ever writes it to the database.
- Deployment notes for running on your own computer or a small server you control, with no paid service required.

### Known limitations
- Only the "mock" AI provider is implemented; Course 5.6's other two providers (`openai-compatible`, `local`) are this lesson's Explorer challenge.
- No independent security audit has been done; see `SECURITY.md`.
- The SQLite database has no encryption at rest and no automated backup beyond Course 5.3's own material.

### Accessibility
- `id="scene-description"` describes the open scene from the same data the 3D view is built from.
- Reduced motion is respected: the scene's animation starts paused when the operating system asks for less motion, and the Pause button always says what it will do next.
- The camera never moves unless the learner moves it.
