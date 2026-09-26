# Project check

Work through this list before you submit.

## Journeys and wireframes
- [ ] At least two user journeys are mapped, for two different stakeholders.
- [ ] A wireframe (sketch or description) exists for every screen or scene in scope.
- [ ] At least one real person reviewed the wireframes (Challenge 1, or informally).

## Spatial design
- [ ] The spatial layout names the starting viewpoint and what is visible first.
- [ ] The scene graph lists every entity and its parent.
- [ ] Every planned interaction has a keyboard or button-based equivalent noted.

## Data, API, and security
- [ ] The data model lists every content type, its fields, and relationships.
- [ ] The API sketch lists what each request needs and returns.
- [ ] The security and privacy plan states plainly what data is collected, if any, and where it lives.

## Test plan
- [ ] The test plan names specific accessibility checks for Stage 3 (screen reader, keyboard, reduced motion).
- [ ] The test plan names a rough performance budget (draw calls or triangles).
- [ ] The test plan names which languages will eventually need localisation testing.

## Quality
- [ ] All documents use plain, specific language, with no invented facts.
- [ ] Mentor approval is recorded before Stage 3 begins.
- [ ] The browser console has no errors when `starter/index.html` or `completed/index.html` is opened.

## 3D and XR (manual)

Automated tools cannot see inside a 3D canvas, so these are checked by a person. See [`docs/en/xr-accessibility.md`](../../../docs/en/xr-accessibility.md).

- [ ] The spatial layout and scene graph together describe a 2D-equivalent way to receive the same information (a list or table), not only the 3D view.
- [ ] Nothing planned assumes a pointer is the only way to interact.
