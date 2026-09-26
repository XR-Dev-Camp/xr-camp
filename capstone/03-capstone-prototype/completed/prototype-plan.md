# Prototype plan

## What this prototype must prove

1. That a single primitive-built exhibit object can be shown, described, and fully controlled by keyboard, without a mouse.
2. That the accessible-3D-page pattern from `web3d-developer/07` (scene description, 2D twin, keyboard controls, reduced-motion Pause button) still holds up when trimmed down to a much smaller scene.

## What "proved" looks like

1. A full keyboard-only walkthrough completes every interaction (Challenge 1).
2. Draw calls and triangles stay within the Stage 2 budget (15 draw calls, 8,000 triangles) with the object rendered and animating.

## Scope for this prototype

One cylindrical "exhibit stand" primitive, one light rig, camera turning by fixed steps, and a slow self-rotation that respects `prefers-reduced-motion` and a Pause button.

## Left out on purpose (for Stage 4)

- Loading real glTF models (the pot, basket, and jade stone) — the primitive stand proves the pattern first.
- Multiple rooms or exhibits — Stage 4 builds the full room from Stage 2's scene graph.
- The information panel with full object text — this prototype's 2D twin is enough to prove the description-matches-scene requirement.
