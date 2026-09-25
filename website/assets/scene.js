/*
  XR Camp: the 3D and WebXR layer of the site.

  Progressive enhancement, in the order the curriculum teaches it:
  1. The page is complete, accessible HTML. Nothing here is required to read it.
  2. If the device can draw 3D, has not asked to save data, and the visitor has
     not switched 3D off, A-Frame loads after the page is already usable.
  3. If the device has a headset, "Step inside" buttons appear.

  Comfort and access rules (docs/en/xr-accessibility.md in the lessons repo):
  - The camera moves only when the visitor scrolls. It never moves on its own.
  - With reduced motion (system setting or the "Pause motion" button), nothing
    animates and the camera cuts between views instead of gliding.
  - In a headset, travel is an instant jump, never smooth movement, and the
    view is only ever turned around the vertical axis.
*/

const AFRAME_URL = 'https://aframe.io/releases/1.8.0/aframe.min.js'; // pinned, like every lesson
const PREF_KEY = 'xrcamp-3d';

const layer = document.getElementById('scene-layer');
const data = JSON.parse(document.getElementById('scene-data').textContent);
const toggle3d = document.getElementById('toggle-3d');
const toggleMotion = document.getElementById('toggle-motion');
const enterVR = document.getElementById('enter-vr');
const enterAR = document.getElementById('enter-ar');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const wide = matchMedia('(min-width: 60rem)');

const state = {
  paused: reducedMotion.matches,
  target: 'overview',
  xrWorld: 0,
};

const COLORS = {
  night: '#0d0820', lilac: '#c9a7ff', pink: '#ff8fc3', gold: '#ffd166',
  teal: '#5fd4c4', purple: '#5b2a86', green: '#7cbf6e', white: '#f5f2ff',
};

// ---------------------------------------------------------------------------
// Preferences. Storage can be unavailable (private windows), so every access
// is guarded and the site works the same without it.

const readPref = () => { try { return localStorage.getItem(PREF_KEY); } catch { return null; } };
const writePref = (v) => { try { localStorage.setItem(PREF_KEY, v); } catch { /* not needed */ } };

function canDraw3D() {
  if (navigator.connection && navigator.connection.saveData) return false;
  const canvas = document.createElement('canvas');
  return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
}

// ---------------------------------------------------------------------------
// Scroll: whichever section is in the middle of the screen chooses the view.

function watchSections() {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) state.target = entry.target.dataset.station;
    }
  }, { rootMargin: '-45% 0px -45% 0px' });
  document.querySelectorAll('[data-station]').forEach((el) => observer.observe(el));
}

// ---------------------------------------------------------------------------
// Loading A-Frame only when it will be used.

let aframeLoading = null;
function loadAFrame() {
  if (window.AFRAME) return Promise.resolve();
  aframeLoading ??= new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = AFRAME_URL;
    script.onload = resolve;
    script.onerror = reject;
    document.head.append(script);
  });
  return aframeLoading;
}

// ---------------------------------------------------------------------------
// The world. One A-Frame component builds everything with three.js directly:
// A-Frame gives us the renderer, the camera, and WebXR; three.js gives us
// full control over a few hundred cheap, flat-shaded shapes.

function registerWorld() {
  if (AFRAME.components['xrcamp-world']) return;
  const THREE = AFRAME.THREE;

  const mat = (color, extra = {}) => new THREE.MeshStandardMaterial({ color, flatShading: true, roughness: 0.6, ...extra });
  const glow = (color, extra = {}) => new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.8, ...extra });

  const worldPosition = (i) => new THREE.Vector3(Math.sin(i * 0.9) * 3, 1.5 + Math.cos(i * 0.7) * 0.8, -i * 10);

  // Each world is built from what its phase teaches.
  const builders = [
    // 0 Welcome: the garden from the first lesson, grown up.
    (g, anim) => {
      const island = new THREE.Mesh(new THREE.CylinderGeometry(2, 1.4, 0.4, 7), mat(COLORS.green));
      island.position.y = -0.8;
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), mat(COLORS.purple));
      box.position.set(-0.9, -0.25, 0.3);
      box.rotation.y = 0.5;
      const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 1.1, 12), mat(COLORS.gold));
      cyl.position.set(0, -0.05, -0.5);
      const cone = new THREE.Mesh(new THREE.ConeGeometry(0.4, 0.9, 12), mat(COLORS.teal));
      cone.position.set(0.9, -0.15, 0.2);
      const moon = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 12), glow(COLORS.white, { emissiveIntensity: 0.5 }));
      moon.position.set(0, 1.2, 0);
      g.add(island, box, cyl, cone, moon);
      anim.push((t) => { moon.position.y = 1.2 + Math.sin(t * 1.2) * 0.2; });
    },
    // 1 Web developer: a web page, floating in space.
    (g, anim) => {
      const page = new THREE.Group();
      page.add(new THREE.Mesh(new THREE.PlaneGeometry(2.2, 2.9), mat(COLORS.white, { side: THREE.DoubleSide })));
      const bar = (w, y, color, x = 0) => {
        const m = new THREE.Mesh(new THREE.PlaneGeometry(w, 0.16), mat(color));
        m.position.set(x, y, 0.01);
        page.add(m);
      };
      bar(1.8, 1.15, COLORS.purple);
      bar(1.2, 0.8, COLORS.pink, -0.3);
      const image = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.8), mat(COLORS.teal));
      image.position.set(0, 0.1, 0.01);
      page.add(image);
      [-0.55, -0.8, -1.05].forEach((y, k) => bar(k === 2 ? 1.1 : 1.8, y, '#b8b0cf', k === 2 ? -0.35 : 0));
      g.add(page);
      anim.push((t) => { page.rotation.y = Math.sin(t * 0.4) * 0.35; });
    },
    // 2 Frontend engineer: components, connected.
    (g, anim) => {
      const colors = [COLORS.lilac, COLORS.pink, COLORS.teal, COLORS.gold];
      const cubes = [];
      const points = [];
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          const c = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.45, 0.45), mat(colors[(x + y + 4) % 4]));
          c.position.set(x * 0.9, y * 0.9, (x * y) * 0.3);
          cubes.push(c);
          points.push(c.position);
        }
      }
      const lineGeo = new THREE.BufferGeometry().setFromPoints([0, 1, 1, 2, 3, 4, 4, 5, 6, 7, 7, 8, 0, 3, 3, 6, 1, 4, 4, 7, 2, 5, 5, 8].map((k) => points[k]));
      g.add(...cubes, new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: COLORS.lilac })));
      anim.push((t) => cubes.forEach((c, k) => c.scale.setScalar(1 + Math.sin(t * 2 + k) * 0.12)));
    },
    // 3 Web3D developer: a polished 3D object.
    (g, anim) => {
      const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.8, 0.26, 160, 20), new THREE.MeshStandardMaterial({ color: COLORS.lilac, metalness: 0.3, roughness: 0.25 }));
      g.add(knot);
      anim.push((t) => { knot.rotation.set(t * 0.3, t * 0.45, 0); });
    },
    // 4 Immersive developer: a portal.
    (g, anim) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.12, 16, 64), glow(COLORS.teal));
      const inside = new THREE.Mesh(new THREE.CircleGeometry(1.3, 48), new THREE.MeshBasicMaterial({ color: COLORS.teal, transparent: true, opacity: 0.3, side: THREE.DoubleSide }));
      g.add(ring, inside);
      anim.push((t) => { ring.rotation.z = t * 0.5; inside.material.opacity = 0.25 + Math.sin(t * 1.5) * 0.1; });
    },
    // 5 Full-stack spatial: people, connected in real time.
    (g, anim) => {
      const hub = new THREE.Mesh(new THREE.IcosahedronGeometry(0.35, 0), glow(COLORS.gold, { emissiveIntensity: 0.5 }));
      const colors = [COLORS.pink, COLORS.teal, COLORS.lilac, COLORS.white, COLORS.green];
      const orbs = colors.map((c) => new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 12), mat(c)));
      const lineGeo = new THREE.BufferGeometry().setFromPoints(orbs.flatMap(() => [new THREE.Vector3(), new THREE.Vector3()]));
      const lines = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: COLORS.gold, transparent: true, opacity: 0.6 }));
      g.add(hub, ...orbs, lines);
      const place = (t) => {
        const pos = lineGeo.attributes.position;
        orbs.forEach((o, k) => {
          const a = t * 0.6 + (k / orbs.length) * Math.PI * 2;
          o.position.set(Math.cos(a) * 1.4, Math.sin(a * 2) * 0.35, Math.sin(a) * 1.4);
          pos.setXYZ(k * 2, 0, 0, 0);
          pos.setXYZ(k * 2 + 1, o.position.x, o.position.y, o.position.z);
        });
        pos.needsUpdate = true;
      };
      place(0);
      anim.push(place);
    },
    // 6 Professional developer: a tower, built level by level.
    (g, anim) => {
      const colors = [COLORS.purple, COLORS.lilac, COLORS.pink, COLORS.teal, COLORS.lilac];
      colors.forEach((c, k) => {
        const level = new THREE.Mesh(new THREE.CylinderGeometry(0.9 - k * 0.14, 1 - k * 0.14, 0.45, 6), mat(c));
        level.position.y = -1 + k * 0.47;
        g.add(level);
      });
      const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 12), glow(COLORS.gold));
      beacon.position.y = 1.45;
      g.add(beacon);
      anim.push((t) => { beacon.material.emissiveIntensity = 0.6 + Math.sin(t * 2) * 0.4; });
    },
    // 7 Capstone: your own star.
    (g, anim) => {
      const star = new THREE.Mesh(new THREE.IcosahedronGeometry(0.9, 0), glow(COLORS.gold, { emissiveIntensity: 0.55, flatShading: true }));
      const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5, 1), new THREE.MeshBasicMaterial({ color: COLORS.lilac, wireframe: true, transparent: true, opacity: 0.35 }));
      g.add(star, shell);
      anim.push((t) => { star.rotation.y = t * 0.4; shell.rotation.y = -t * 0.15; shell.rotation.x = t * 0.1; });
    },
  ];

  // Text drawn on a canvas, so labels work in every language, including
  // Chinese, without downloading a font.
  function label(text, width = 1024) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = 160;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(20, 12, 44, 0.9)';
    ctx.beginPath();
    ctx.roundRect(4, 4, width - 8, 152, 40);
    ctx.fill();
    ctx.fillStyle = COLORS.white;
    ctx.font = `600 56px system-ui, -apple-system, "PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, 82, width - 60);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true }));
    sprite.scale.set(width / 256, 0.625, 1);
    return sprite;
  }

  AFRAME.registerComponent('xrcamp-world', {
    init() {
      const scene = this.el.object3D;
      const renderer = this.el.renderer;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

      this.anim = [];
      this.time = 0;
      this.rig = document.getElementById('rig').object3D;
      this.worlds = [];
      this.labels = [];

      this.background = new THREE.Color(COLORS.night);
      scene.background = this.background;
      scene.fog = new THREE.FogExp2(COLORS.night, 0.018);

      scene.add(new THREE.HemisphereLight(COLORS.lilac, '#1f3a4a', 1.4));
      const sun = new THREE.DirectionalLight('#ffffff', 1.6);
      sun.position.set(4, 8, 6);
      scene.add(sun);

      // Stars.
      const starPositions = new Float32Array(1200 * 3);
      for (let k = 0; k < 1200; k++) {
        const v = new THREE.Vector3().randomDirection().multiplyScalar(70 + Math.random() * 60);
        starPositions.set([v.x, Math.abs(v.y) * 0.8 + 2, v.z - 30], k * 3);
      }
      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      this.stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: '#ffffff', size: 0.35, transparent: true, opacity: 0.85, fog: false }));
      scene.add(this.stars);

      // The worlds and their labels.
      builders.forEach((build, i) => {
        const group = new THREE.Group();
        group.position.copy(worldPosition(i));
        build(group, this.anim);
        scene.add(group);
        this.worlds.push(group);

        const tag = label(data.labels[i]);
        tag.position.copy(group.position).add(new THREE.Vector3(0, 2.3, 0));
        tag.visible = false; // Labels are for headsets: on screen, the page says it.
        scene.add(tag);
        this.labels.push(tag);
      });

      // The thread that joins them, like the timeline in the history lessons.
      // It runs just beneath each world, so it never crosses the camera's view of one.
      const below = new THREE.Vector3(0, -1.5, 0);
      const threadPoints = [new THREE.Vector3(-4, -1, 14), ...this.worlds.map((w) => w.position.clone().add(below)), new THREE.Vector3(0, 0, -90)];
      this.curve = new THREE.CatmullRomCurve3(threadPoints);
      scene.add(new THREE.Mesh(new THREE.TubeGeometry(this.curve, 400, 0.022, 6), new THREE.MeshBasicMaterial({ color: COLORS.lilac })));

      // Light travelling along the thread.
      this.beads = Array.from({ length: 24 }, (_, k) => {
        const bead = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), new THREE.MeshBasicMaterial({ color: k % 3 ? COLORS.pink : COLORS.gold }));
        bead.userData.offset = k / 24;
        scene.add(bead);
        return bead;
      });
      this.placeBeads(0);

      this.hint = label(data.xrHint, 1600);
      this.hint.visible = false;
      scene.add(this.hint);

      this.anim.forEach((f) => f(0));

      this.targetPos = new THREE.Vector3();
      this.targetQuat = new THREE.Quaternion();
      // A camera, not a plain Object3D: only cameras point -z at what they lookAt.
      this.lookHelper = new THREE.PerspectiveCamera();
      this.snapToTarget = true;

      this.el.addEventListener('enter-vr', () => this.enterXR());
      this.el.addEventListener('exit-vr', () => this.exitXR());
    },

    placeBeads(t) {
      this.beads.forEach((b) => b.position.copy(this.curve.getPointAt((b.userData.offset + t * 0.02) % 1)));
    },

    // Where the camera should be for a named view.
    view(name) {
      const pos = new THREE.Vector3();
      const look = new THREE.Vector3();
      if (name === 'overview') {
        // The garden close by, the thread and the other worlds receding behind it.
        pos.set(wide.matches ? -3.5 : 0.5, 2.8, wide.matches ? 8 : 10);
        look.set(wide.matches ? -6.5 : 0.5, wide.matches ? 0.8 : -2.5, -12);
      } else if (name === 'end') {
        pos.set(-16, 18, -10);
        look.set(0, -2, -45);
      } else {
        const i = Number(name);
        const w = this.worlds[i].position;
        // Keep the world beside its panel: panels alternate sides on wide screens.
        const side = wide.matches ? (i % 2 === 0 ? -2.2 : 2.2) : 0;
        // On a phone the panel fills the middle of the screen, so aim below the
        // world: that lifts it into the space above the panel.
        pos.copy(w).add(new THREE.Vector3(side * 0.4, wide.matches ? 1.2 : 0.2, wide.matches ? 6.5 : 10));
        look.copy(w).add(new THREE.Vector3(side, wide.matches ? 0 : -5.2, 0));
      }
      return { pos, look };
    },

    tick(_, delta) {
      const dt = Math.min(delta / 1000, 0.1);
      if (!state.paused) {
        this.time += dt;
        this.anim.forEach((f) => f(this.time));
        this.placeBeads(this.time);
      }
      if (this.el.is('vr-mode') || this.el.is('ar-mode')) return;

      const { pos, look } = this.view(state.target);
      this.lookHelper.position.copy(pos);
      this.lookHelper.lookAt(look);
      this.targetPos.copy(pos);
      this.targetQuat.copy(this.lookHelper.quaternion);

      if (state.paused || this.snapToTarget) {
        this.rig.position.copy(this.targetPos);
        this.rig.quaternion.copy(this.targetQuat);
        this.snapToTarget = false;
      } else {
        const k = 1 - Math.exp(-dt * 2.5);
        this.rig.position.lerp(this.targetPos, k);
        this.rig.quaternion.slerp(this.targetQuat, k);
      }
    },

    // In a headset: stand among the worlds, and jump from one to the next.
    enterXR() {
      const ar = this.el.is('ar-mode');
      this.el.object3D.background = ar ? null : this.background;
      this.el.object3D.fog = ar ? null : this.el.object3D.fog;
      this.stars.visible = !ar;
      this.labels.forEach((l) => { l.visible = true; });
      this.goToWorld(0);
      this.hint.visible = true;
      const session = this.el.renderer.xr.getSession();
      this.onSelect = () => this.goToWorld((state.xrWorld + 1) % this.worlds.length);
      session?.addEventListener('select', this.onSelect);
    },

    goToWorld(i) {
      state.xrWorld = i;
      const w = this.worlds[i].position;
      // Stand 4.5 m in front of the world, with it at about eye height.
      this.rig.position.set(w.x, w.y - 1.4, w.z + 4.5);
      this.rig.quaternion.identity(); // turn only around the vertical axis: here, not at all
      this.hint.position.set(w.x, w.y - 0.6, w.z + 2.5);
      this.hint.visible = i === 0;
    },

    exitXR() {
      this.el.object3D.background = this.background;
      this.el.object3D.fog = new THREE.FogExp2(COLORS.night, 0.018);
      this.stars.visible = true;
      this.labels.forEach((l) => { l.visible = false; });
      this.hint.visible = false;
      this.snapToTarget = true;
    },
  });
}

// ---------------------------------------------------------------------------
// Building and removing the scene.

let sceneEl = null;

async function start3D() {
  await loadAFrame();
  registerWorld();
  sceneEl = document.createElement('a-scene');
  sceneEl.setAttribute('embedded', '');
  sceneEl.setAttribute('renderer', 'antialias: auto; colorManagement: true; highRefreshRate: false; maxCanvasWidth: 1920; maxCanvasHeight: 1920');
  sceneEl.setAttribute('xr-mode-ui', 'enabled: false');
  sceneEl.setAttribute('loading-screen', 'enabled: false');
  sceneEl.setAttribute('device-orientation-permission-ui', 'enabled: false');
  sceneEl.setAttribute('keyboard-shortcuts', 'enterVR: false');
  sceneEl.setAttribute('webxr', 'optionalFeatures: local-floor, hand-tracking');
  sceneEl.innerHTML = `
    <a-entity id="rig">
      <a-entity camera="userHeight: 0" look-controls="enabled: false" wasd-controls="enabled: false"></a-entity>
    </a-entity>`;
  sceneEl.setAttribute('xrcamp-world', '');
  layer.append(sceneEl);
  offerXR();
}

function stop3D() {
  sceneEl?.remove();
  sceneEl = null;
  enterVR.hidden = true;
  enterAR.hidden = true;
}

async function offerXR() {
  if (!navigator.xr) return;
  const [vr, ar] = await Promise.all([
    navigator.xr.isSessionSupported('immersive-vr').catch(() => false),
    navigator.xr.isSessionSupported('immersive-ar').catch(() => false),
  ]);
  enterVR.hidden = !vr;
  enterAR.hidden = !ar;
}

enterVR.addEventListener('click', () => sceneEl?.enterVR());
enterAR.addEventListener('click', () => sceneEl?.enterAR());

// ---------------------------------------------------------------------------
// The two switches at the top of the page.

function setPaused(paused) {
  state.paused = paused;
  toggleMotion.setAttribute('aria-pressed', String(paused));
}

toggleMotion.addEventListener('click', () => setPaused(!state.paused));
reducedMotion.addEventListener('change', (e) => setPaused(e.matches));

toggle3d.addEventListener('click', () => {
  const on = toggle3d.getAttribute('aria-pressed') !== 'true';
  toggle3d.setAttribute('aria-pressed', String(on));
  toggleMotion.hidden = !on;
  writePref(on ? 'on' : 'off');
  if (on) start3D(); else stop3D();
});

// ---------------------------------------------------------------------------

if (canDraw3D()) {
  const on = readPref() !== 'off';
  toggle3d.hidden = false;
  toggle3d.setAttribute('aria-pressed', String(on));
  toggleMotion.hidden = !on;
  setPaused(state.paused);
  watchSections();
  if (on) {
    // Let the page finish first: reading comes before decoration.
    const go = () => start3D().catch(() => stop3D());
    if ('requestIdleCallback' in window) requestIdleCallback(go, { timeout: 2000 });
    else setTimeout(go, 500);
  }
}
