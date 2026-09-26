// three-progress.js: the 3D moment. "See my progress in 3D" turns the same
// rows the dashboard's table already shows into a bar chart, one column per
// phase, height = lessons done. Nothing on this page needs it: it is an
// extra view of data you can already read as text.
//
// Rules this file follows:
//   - A-Frame (AFRAME_URL, pinned in config.js) is requested only once,
//     only after the learner presses the button. Never on page load.
//   - The camera is fixed. There is no drag-to-orbit and no WASD scheme, so
//     there is no 3D-only interaction that would need its own keyboard
//     route: everything the scene shows is also the 2D table right below it.
//   - No column grows or spins on its own. A chart that never moves needs no
//     Pause button, and nothing to disable for prefers-reduced-motion.
//   - id="scene-description" is built from the exact rows passed in, so the
//     3D view and its text description can never disagree.

import { t, formatPercent } from '../i18n.js';
import { fraction } from '../utils.js';
import { AFRAME_URL } from '../config.js';
import { phaseTable } from './progress-view.js';

let loading = null;

// Request the library once. A second call while it is loading, or after it
// has loaded, returns the same promise: AFRAME is only ever requested once.
function loadAframe() {
  if (window.AFRAME) return Promise.resolve();
  if (loading) return loading;
  loading = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = AFRAME_URL;
    script.addEventListener('load', () => resolve());
    script.addEventListener('error', () => reject(new Error('aframe failed to load')));
    document.head.append(script);
  });
  return loading;
}

function el(tag, text, className) {
  const element = document.createElement(tag);
  if (text !== undefined) element.textContent = text;
  if (className) element.className = className;
  return element;
}

// The colour of a bar is decoration; its height and the description text
// carry the meaning (WCAG 1.4.1), and both come from the same "rows".
const COLORS = ['#5b2a86', '#8a4fc9', '#1d6b4f', '#b5862e', '#3f1d5e', '#d62f6b', '#2e6f8e', '#7a5230'];

function buildScene(rows) {
  const scene = document.createElement('a-scene');
  scene.setAttribute('embedded', '');
  scene.setAttribute('vr-mode-ui', 'enabled: false');
  scene.setAttribute('render', 'colorManagement: true');

  // Fixed camera: no drag-to-look, no orbit control component. The whole
  // chart fits in one framing, chosen for the widest expected row count.
  const rig = document.createElement('a-entity');
  rig.setAttribute('camera', '');
  rig.setAttribute('position', `${(rows.length - 1) / 2} 2.4 4.5`);
  rig.setAttribute('rotation', '-24 0 0');
  scene.append(rig);

  scene.append(document.createElement('a-light').cloneNode());
  const ambient = document.createElement('a-light');
  ambient.setAttribute('type', 'ambient');
  ambient.setAttribute('color', '#ffffff');
  ambient.setAttribute('intensity', '0.7');
  const directional = document.createElement('a-light');
  directional.setAttribute('type', 'directional');
  directional.setAttribute('position', '1 4 2');
  directional.setAttribute('intensity', '0.6');
  scene.append(ambient, directional);

  const floor = document.createElement('a-plane');
  floor.setAttribute('position', `${(rows.length - 1) / 2} 0 0`);
  floor.setAttribute('rotation', '-90 0 0');
  floor.setAttribute('width', String(rows.length + 1));
  floor.setAttribute('height', '3');
  floor.setAttribute('color', '#e5e1ec');
  scene.append(floor);

  rows.forEach((row, index) => {
    const height = Math.max(0.05, fraction(row.done, row.total) * 3);
    const bar = document.createElement('a-box');
    bar.setAttribute('position', `${index} ${height / 2} 0`);
    bar.setAttribute('width', '0.7');
    bar.setAttribute('height', String(height));
    bar.setAttribute('depth', '0.7');
    bar.setAttribute('color', COLORS[index % COLORS.length]);
    scene.append(bar);

    const label = document.createElement('a-entity');
    label.setAttribute('position', `${index} ${height + 0.35} 0`);
    label.setAttribute('text', `value: ${row.done}/${row.total}; align: center; width: 3; color: #241635`);
    scene.append(label);
  });

  return scene;
}

// container: an element already in the page (hidden until the button is
// pressed). rows: the same phaseProgress() rows the dashboard's table uses.
export async function mountThreeProgress(container, rows) {
  container.replaceChildren(el('p', t('three.loading'), 'state'));

  try {
    await loadAframe();
  } catch {
    const box = el('div', undefined, 'state error');
    box.append(el('p', t('three.error')));
    const retry = el('button', t('three.errorRetry'));
    retry.type = 'button';
    retry.addEventListener('click', () => mountThreeProgress(container, rows));
    box.append(retry);
    container.replaceChildren(box, buildTwin(rows));
    return;
  }

  const wrap = el('div', undefined, 'three-wrap');
  const scene = buildScene(rows);
  scene.setAttribute('aria-hidden', 'true'); // the description text carries the meaning, not the canvas
  wrap.append(scene);

  const description = el('p', describeRows(rows));
  description.id = 'scene-description';
  description.className = 'sr-only';

  container.replaceChildren(wrap, description, buildTwin(rows));
}

function describeRows(rows) {
  const parts = [t('three.descriptionIntro', { count: rows.length })];
  for (const row of rows) {
    parts.push(t('three.descriptionBar', { title: t('dashboard.phaseName', { phase: row.phase, title: row.title }), done: row.done, total: row.total }));
  }
  return parts.join(' ');
}

function buildTwin(rows) {
  const wrap = el('div');
  wrap.append(el('h4', t('three.caption')), phaseTable(rows));
  return wrap;
}

export { loadAframe };
