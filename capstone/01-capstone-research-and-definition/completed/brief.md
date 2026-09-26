# Capstone brief

**Project:** Aurora Community Museum — a virtual exhibit
**Learner:** Ana (fictional XR Camp learner, for illustration only)

## Problem statement

The Aurora Community Museum (a fictional small museum, modelled on the kind of local heritage museum found in many cities) has one paid room and limited opening hours. Visitors who cannot travel there — because of distance, cost, mobility, or opening times — have no way to see its textile and pottery collection. A free, accessible virtual exhibit would let them explore the collection online, in their own time, on a low-cost device.

## What you will build (in scope)

1. A researched, mentor-approved plan (this stage).
2. A full experience and system design: user journeys, a spatial layout, a data model for the collection, and a security and test plan (Stage 2).
3. A working, accessible 3D prototype of one gallery room, tested for performance and localisation (Stage 3).
4. The production build of the full exhibit, with documentation (Stage 4).
5. A tested, launched, publicly documented exhibit with a case study and presentation (Stage 5).

## What you will not build (out of scope)

1. A live booking system for in-person museum visits — out of scope because it needs a real payments and calendar integration this capstone's budget cannot support.
2. User accounts or saved progress — out of scope for the first launch; visiting the exhibit should not require creating an account.
3. A native mobile app — out of scope; the exhibit is a website that works well on a phone, so no app store review or native code is needed.

## Partner

**Partner type:** A small community museum (realistic, not a real named organisation).

**Why this partner needs this project:** Its physical space is small and its opening hours are limited, so most of its collection is never seen by most of the community it serves. A free web exhibit removes that barrier without needing new physical space.

## Audience notes for accessibility

Many likely visitors will be on shared or older phones, on limited mobile data, and some will use screen readers. Content should work in Spanish and Simplified Chinese eventually (this capstone is written in English first, per XR Camp's translation process), and nothing should assume a fast, always-on connection.

## Risks and open questions

| Risk or open question | Why it matters | What would resolve it |
| --- | --- | --- |
| Photographs of the real collection may not be available or licensed for reuse | The exhibit currently uses only self-made SVG illustrations, never real museum photos, to avoid this risk entirely | Confirmed: this capstone illustrates objects with simple CC0 SVG shapes, credited in `ATTRIBUTION.md`, not photography |
| I have not yet built a multi-room 3D scene | Stage 3's prototype may take longer than planned | Practise with a single room first, and treat additional rooms as a Stage 4 stretch goal |
| A real museum partner may want more languages or features than five stages allow | Scope could grow past what is achievable | The "out of scope" list above is reviewed again at the start of every stage |
