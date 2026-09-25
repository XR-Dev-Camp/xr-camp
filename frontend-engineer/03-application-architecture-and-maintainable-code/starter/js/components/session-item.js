// session-item.js: build the <li> for one session. Read-only: it never
// changes the state.

import { sessionLabel } from '../utils.js';

// TODO 9: Export sessionItem(session): an <li class="session"> with
// data-id set to the session's id, containing:
//   - a <span class="session-text"> with sessionLabel(session), set with
//     textContent (NEVER innerHTML: try adding the topic <b>hi</b> in the
//     old app to see why)
//   - a "Done" or "Not done" button with data-action="toggle"
//   - a "Delete" button with data-action="delete"
// Each button gets aria-label="<visible text>: <topic>", for example
// "Delete: CSS grid", and type="button".
