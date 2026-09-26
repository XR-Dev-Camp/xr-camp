// main.js: wires the page's own controls to the engine (app.js) and the
// dashboard data (data.js). No three.js API and no WebXR API appears
// directly here, the same rule 4.1's main.js followed.

import { createApp } from './app.js';
import { describeRoom } from './describe.js';
import { loadDashboardData, addGoal, removeGoal } from './data.js';
import { WAYPOINTS } from './locomotion.js';
import { supportsImmersiveVR, initXR, describeUnsupported } from './xr.js';

const $ = (id) => document.getElementById(id);
const container = $('canvas-box');

function supportsWebGL2() {
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
}

function renderFallbackLists(data) {
  $('phase-list').replaceChildren(...data.phases.map((phase) => {
    const li = document.createElement('li');
    li.textContent = `Phase ${phase.phase}: ${phase.title} — ${phase.done} of ${phase.total} done`;
    return li;
  }));
  renderGoalsList(data);
}

function renderGoalsList(data) {
  const list = $('goal-list');
  list.replaceChildren(...data.goals.map((goal) => {
    const li = document.createElement('li');
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.textContent = 'Remove';
    remove.setAttribute('aria-label', `Remove goal: ${goal.text}`);
    remove.addEventListener('click', () => {
      removeGoal(goal.id);
      renderFallbackLists(data);
      redrawGoalsPanel(data);
    });
    li.append(document.createTextNode(goal.text + ' '), remove);
    return li;
  }));
  if (data.goals.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No goals yet.';
    list.append(li);
  }
}

let app;
let currentData;

function kioskLines(data) {
  return [
    `Overall: ${data.overallDone} of ${data.overallTotal} ready lessons done`,
    ...data.phases.slice(0, 4).map((p) => `Phase ${p.phase}: ${p.done}/${p.total}`),
    data.nextUp ? `Next up: ${data.nextUp.title}` : 'Every ready lesson is done.',
  ];
}

function goalsLines(data) {
  return data.goals.length
    ? data.goals.slice(0, 5).map((g) => `• ${g.text}`)
    : ['Add a goal below.'];
}

function redrawGoalsPanel(data) {
  app.setGoalsText('My goals', goalsLines(data));
}

function updateDescription() {
  const status = app.getStatus();
  $('scene-description').textContent = describeRoom({
    waypointLabel: status.waypoint.label,
    distanceMeters: status.distanceMeters,
    angularSizeDegrees: status.angularSizeDegrees,
    lockMode: status.lockMode,
    goalCount: currentData.goals.length,
    presenting: status.presenting,
  });
}

function updateMoveStatus() {
  const status = app.getStatus();
  $('move-status').textContent = `Now at "${status.waypoint.label}", ${status.distanceMeters.toFixed(1)} m from the kiosk (about ${status.angularSizeDegrees.toFixed(1)}° of your view).`;
}

if (!supportsWebGL2()) {
  container.hidden = true;
  $('no-webgl-message').hidden = false;
  $('scene-description').textContent = 'This browser cannot show the 3D room: WebGL 2 is unavailable. The lists above have the same information.';
} else {
  app = createApp(container, {
    onWaypointChange: () => { updateDescription(); updateMoveStatus(); },
    onLockModeChange: () => updateDescription(),
  });
  app.resize();
  app.start();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) app.stop();
    else app.start();
  });

  for (const waypoint of WAYPOINTS) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = `${waypoint.label} (${waypoint.distance} m)`;
    button.addEventListener('click', () => app.teleportTo(waypoint.id));
    $('waypoint-buttons').append(button);
  }

  $('smooth-toggle').addEventListener('change', (event) => app.setSmooth(event.target.checked));

  for (const radio of document.querySelectorAll('input[name="lock-mode"]')) {
    radio.addEventListener('change', (event) => {
      if (event.target.checked) app.setGoalsLockMode(event.target.value);
    });
  }

  $('goal-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const input = $('goal-input');
    const text = input.value.trim();
    if (!text) return;
    addGoal(text);
    input.value = '';
    renderFallbackLists(currentData);
    redrawGoalsPanel(currentData);
  });

  const xrButton = $('xr-button');
  const xrStatus = $('xr-status');
  supportsImmersiveVR().then((supported) => {
    if (supported) {
      xrButton.hidden = false;
      xrStatus.textContent = 'VR is available. The dashboard still works fully without it.';
      initXR({ renderer: app.renderer, app, button: xrButton, status: xrStatus });
      xrButton.addEventListener('click', updateDescription);
      app.renderer.xr.addEventListener('sessionstart', updateDescription);
      app.renderer.xr.addEventListener('sessionend', updateDescription);
    } else {
      xrButton.hidden = true;
      xrStatus.textContent = describeUnsupported();
    }
  });

  loadDashboardData().then((data) => {
    currentData = data;
    renderFallbackLists(data);
    app.setKioskText('Progress kiosk', kioskLines(data));
    redrawGoalsPanel(data);
    updateDescription();
    updateMoveStatus();
  });
}
