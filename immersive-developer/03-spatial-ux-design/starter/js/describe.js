// describe.js: the room's text description, built fresh from the same state
// the 3D scene is built from, so it can never say something the picture does
// not show.

const LOCK_MODE_WORDS = {
  world: 'fixed in the room, where you left it',
  body: "following you, staying in front of you as you turn (but not tipping when you look up or down)",
  view: 'pinned to the middle of your view, wherever you look',
};

// TODO 9: build one paragraph covering everything a screen-reader user
// needs: what is in the room (a progress kiosk, a personal-space ring on the
// floor), the current waypoint's label and `distanceMeters` in words, the
// `angularSizeDegrees` the kiosk's text spans from here, how the goals panel
// is currently locked (`LOCK_MODE_WORDS[lockMode]`), `goalCount`, and whether
// `presenting` (in VR) changes how "looking around" works. See the
// completed version for the shape to aim for.
export function describeRoom({ waypointLabel, distanceMeters, angularSizeDegrees, lockMode, goalCount, presenting }) {
  return 'Scene description coming soon.';
}
