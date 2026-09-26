// Builds the scene description from the same state every other part of the
// page reads: which exhibit is selected, whether it is being held, whether
// a marker has been placed, and whether a VR session (and its boundary) is
// active. One function, one source of truth, so the description can never
// say something the scene itself does not.
import { findExhibit } from './exhibit.js';

export function buildSceneDescription(app, state) {
  const parts = [
    'Three pedestals stand in a shallow arc: a clay pot, a woven basket ring, and a jade stone. A second visitor, a still avatar, stands to one side.',
  ];

  const selected = findExhibit(app.selectedId);
  parts.push(selected
    ? `${selected.name} is selected (made of ${selected.material}).`
    : 'Nothing is selected yet.');

  if (app.grabbedId) parts.push(`${findExhibit(app.grabbedId)?.name} is being held and turning slowly.`);
  if (app.markerPlaced) parts.push('A marker has been placed on the floor in front of the entrance.');

  if (state.xrActive) {
    parts.push(state.boundary
      ? `A VR session is active, inside a reported play-space boundary of ${state.boundary} point${state.boundary === 1 ? '' : 's'}.`
      : 'A VR session is active. No play-space boundary was reported by this device; stay seated or keep a hand free for support.');
  }

  return parts.join(' ');
}
