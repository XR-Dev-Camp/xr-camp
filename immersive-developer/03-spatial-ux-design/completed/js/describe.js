// describe.js: the room's text description, built fresh from the same state
// the 3D scene is built from, so it can never say something the picture does
// not show. See exhibit-style lessons in 3.4/4.1 for the same pattern.

const LOCK_MODE_WORDS = {
  world: 'fixed in the room, where you left it',
  body: "following you, staying in front of you as you turn (but not tipping when you look up or down)",
  view: 'pinned to the middle of your view, wherever you look',
};

// TODO 9: build one paragraph covering everything a screen-reader user needs:
// what is in the room, how far the kiosk currently is (in words, not just a
// number, since "far" only means something once you say what it is far
// from), how the goals panel is currently locked, and where the personal-space
// boundary is. Called again every time any of these change.
export function describeRoom({ waypointLabel, distanceMeters, angularSizeDegrees, lockMode, goalCount, presenting }) {
  const parts = [
    'A progress kiosk stands against the far wall, showing your overall progress and your next lesson. A floor ring around you marks your own space: nothing should be placed inside it.',
    `You are standing at the "${waypointLabel}" spot, ${distanceMeters.toFixed(1)} metres from the kiosk. At this distance its text spans about ${angularSizeDegrees.toFixed(1)} degrees of your view.`,
    `Your goals panel (${goalCount} goal${goalCount === 1 ? '' : 's'}) is ${LOCK_MODE_WORDS[lockMode]}.`,
  ];
  parts.push(presenting
    ? 'You are viewing this in VR. Turn your head to look around; the on-screen buttons are not visible while a headset is active, but every action they perform still works the same way underneath.'
    : 'Drag the view, or focus it and press the arrow keys, to look around. The camera only moves when you move it, by dragging, by the arrow keys, or by choosing a spot below.');
  return parts.join(' ');
}
