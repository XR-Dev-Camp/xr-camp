// Builds one language's page. Plain template literals: no framework, so a
// learner can read every line of how this site is made.
//
// The page has two halves, like the curriculum:
//   1. A flat, image-led 2D site: home, mission, about, program, why.
//   2. A threshold where the page folds into space, then the 3D site:
//      the eight phases as worlds along a thread, which you can step into.

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const PROGRAM_IMAGES = ['web-dev', 'web3d-dev', 'xr-dev', 'community'];

export function page({ t, lang, all, phases, repo, root }) {
  const lessonOne = `${repo}/blob/main/preface/01-welcome-to-xr-camp/${t.readme}`;
  const img = (name) => `${root}assets/img/${name}.jpg`;

  const languageLinks = Object.entries(all).map(([code, s]) => code === lang
    ? `<li><a href="${root}${s.dir}index.html" aria-current="page" lang="${s.htmlLang}">${esc(s.languageName)}</a></li>`
    : `<li><a href="${root}${s.dir}index.html" lang="${s.htmlLang}" hreflang="${s.htmlLang}">${esc(s.languageName)}</a></li>`).join('\n            ');

  const alternates = Object.values(all).map((s) =>
    `<link rel="alternate" hreflang="${s.htmlLang}" href="https://xrcamp.dev/${s.dir}">`).join('\n  ');

  const nav = t.nav.map(([id, label]) => `<li><a href="#${id}">${esc(label)}</a></li>`).join('\n          ');

  const programCards = t.program.map(([title, text], i) => `
          <li class="card">
            <img src="${img(PROGRAM_IMAGES[i])}" alt="${esc(t.alt.program[i])}" width="720" height="${i === 2 ? 720 : 545}" loading="lazy" data-lift="${i}">
            <h3>${esc(title)}</h3>
            <p>${esc(text)}</p>${i === 3 ? `
            <p class="credit">${esc(t.communityCredit)}</p>` : ''}
          </li>`).join('');

  const phaseItems = phases.map((p, i) => `
        <li class="panel phase" data-station="${i}" id="phase-${i}">
          <p class="phase-number">${esc(t.phaseLabel)} ${i}</p>
          <h3>${esc(t.phases[i][0])}</h3>
          <p><strong>${esc(t.youBuild)}:</strong> ${esc(t.phases[i][1])}</p>
          <ul class="facts">
            <li>${esc(t.sessions(p.sessions, p.months))}</li>
            <li>${esc(t.ready(p.ready, p.total))}</li>
          </ul>
          <p><a href="${repo}/tree/main/${p.courseId}">${esc(t.openPhase)}</a></p>
        </li>`).join('');

  const how = t.how.map(([h, p]) => `
          <li><h3>${esc(h)}</h3><p>${esc(p)}</p></li>`).join('');

  // Only what the 3D scene needs, in this page's language.
  const sceneData = JSON.stringify({
    lang,
    labels: phases.map((_, i) => `${i} · ${t.phases[i][0]}`),
    xrHint: t.xrHint,
    liftImages: PROGRAM_IMAGES.map(img),
  }).replace(/</g, '\\u003c');

  return `<!DOCTYPE html>
<html lang="${t.htmlLang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(t.title)}</title>
  <meta name="description" content="${esc(t.description)}">
  <meta name="theme-color" content="#0d0820">
  <meta property="og:title" content="${esc(t.title)}">
  <meta property="og:description" content="${esc(t.description)}">
  <meta property="og:image" content="https://xrcamp.dev/assets/img/code_6.jpg">
  ${alternates}
  <link rel="icon" href="${root}assets/icon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${root}assets/site.css">
  <script type="module" src="${root}assets/scene.js"></script>
</head>
<body>
  <a class="skip-link" href="#main">${esc(t.skip)}</a>

  <!-- Behind the page: the 3D scene, and in front of it a daylight backdrop
       for the 2D half. As you scroll through the threshold, the daylight
       fades and the scene appears. The scene is decorative: every word it
       illustrates is also in the page, and it can be switched off. -->
  <div id="scene-layer" aria-hidden="true"></div>
  <div id="day" aria-hidden="true"></div>
  <script type="application/json" id="scene-data">${sceneData}</script>

  <header class="site-header">
    <a class="brand" href="#home">XR Camp</a>
    <nav aria-label="XR Camp" class="site-nav">
      <ul>
          ${nav}
      </ul>
    </nav>
    <div class="controls" role="group" aria-label="${esc(t.controls)}">
      <button type="button" id="toggle-3d" aria-pressed="true" hidden>${esc(t.toggle3d)}</button>
      <button type="button" id="toggle-motion" aria-pressed="false" hidden>${esc(t.pauseMotion)}</button>
      <details class="languages">
        <summary>${esc(t.languages)}</summary>
        <ul>
            ${languageLinks}
        </ul>
      </details>
    </div>
  </header>

  <main id="main">
    <!-- 2D ---------------------------------------------------------------->

    <section id="home" class="flat hero-2d" data-station="flat" aria-labelledby="hero-title">
      <div>
        <p class="eyebrow">${esc(t.heroEyebrow)}</p>
        <h1 id="hero-title">${esc(t.heroTitle)}</h1>
        <p class="lead">${esc(t.heroLead)}</p>
        <p class="actions">
          <a class="button primary" href="${lessonOne}">${esc(t.ctaStart)}</a>
          <a class="button" href="${repo}">${esc(t.ctaRepo)}</a>
        </p>
      </div>
      <img src="${img('code_6')}" alt="${esc(t.alt.hero)}" width="960" height="693">
    </section>

    <section id="mission" class="flat split" data-station="flat" aria-labelledby="mission-title">
      <img src="${img('code_1')}" alt="${esc(t.alt.mission)}" width="960" height="671" loading="lazy">
      <div>
        <h2 id="mission-title">${esc(t.missionTitle)}</h2>
        ${t.mission.map((p) => `<p>${esc(p)}</p>`).join('\n        ')}
      </div>
    </section>

    <section id="about" class="flat split reverse" data-station="flat" aria-labelledby="about-title">
      <img src="${img('code_7')}" alt="${esc(t.alt.about)}" width="960" height="533" loading="lazy">
      <div>
        <h2 id="about-title">${esc(t.aboutTitle)}</h2>
        ${t.about.map((p) => `<p>${esc(p)}</p>`).join('\n        ')}
      </div>
    </section>

    <section id="program" class="flat" data-station="flat" aria-labelledby="program-title">
      <h2 id="program-title">${esc(t.programTitle)}</h2>
      <p>${esc(t.programIntro)}</p>
      <ul class="cards">${programCards}
      </ul>
    </section>

    <section id="why" class="flat why-2d" data-station="flat" aria-labelledby="why-title">
      <h2 id="why-title">${esc(t.whyTitle)}</h2>
      <div class="why">
        <img src="${root}assets/damon.jpg" alt="${esc(t.photoAlt)}" width="239" height="360" loading="lazy">
        <div>
          <p class="name">Damon Hernandez</p>
          <p class="place">${esc(t.whyPlace)}</p>
          <blockquote>
            ${t.whyQuote.map((p) => `<p>${esc(p)}</p>`).join('\n            ')}
          </blockquote>
        </div>
      </div>
    </section>

    <!-- The threshold: scrolling through it folds the page into space. ----->

    <section id="threshold" data-station="fold" aria-labelledby="threshold-title">
      <div class="threshold-inner">
        <div class="panel">
          <h2 id="threshold-title">${esc(t.thresholdTitle)}</h2>
          <p>${esc(t.threshold)}</p>
          <p class="actions xr-actions">
            <button type="button" class="button xr" id="enter-vr" hidden>${esc(t.enterVR)}</button>
            <button type="button" class="button xr" id="enter-ar" hidden>${esc(t.enterAR)}</button>
          </p>
        </div>
      </div>
    </section>

    <!-- 3D ---------------------------------------------------------------->

    <section class="deep" data-station="0" aria-labelledby="first-hour-title">
      <div class="panel">
        <h2 id="first-hour-title">${esc(t.firstHourTitle)}</h2>
        <p>${esc(t.firstHour)}</p>
        <figure>
          <pre><code>&lt;a-box position="-1.5 0.5 -4" color="#5b2a86"&gt;&lt;/a-box&gt;</code></pre>
          <figcaption>${esc(t.firstHourCaption)}</figcaption>
        </figure>
      </div>
    </section>

    <section id="phases" class="deep" aria-labelledby="path-title">
      <div class="panel" data-station="0">
        <h2 id="path-title">${esc(t.pathTitle)}</h2>
        <p>${esc(t.pathIntro)}</p>
      </div>
      <ol class="phases">${phaseItems}
      </ol>
    </section>

    <section class="deep" data-station="end" aria-labelledby="how-title">
      <div class="panel">
        <h2 id="how-title">${esc(t.howTitle)}</h2>
        <ul class="how">${how}
        </ul>
      </div>
    </section>

    <section class="deep" data-station="end" aria-labelledby="access-title">
      <div class="panel">
        <h2 id="access-title">${esc(t.accessTitle)}</h2>
        <p>${esc(t.access)}</p>
      </div>
    </section>

    <section id="contact" class="deep" data-station="end" aria-labelledby="involved-title">
      <div class="panel">
        <h2 id="involved-title">${esc(t.involvedTitle)}</h2>
        <p>${esc(t.involved)}</p>
        <p class="actions">
          <a class="button primary" href="${repo}">${esc(t.contribute)}</a>
          <a class="button" href="mailto:hello@xrcamp.dev">hello@xrcamp.dev</a>
        </p>
      </div>
    </section>
  </main>

  <footer class="panel site-footer">
    <details>
      <summary>${esc(t.sceneTitle)}</summary>
      <p id="scene-description">${esc(t.scene)}</p>
    </details>
    <p>${esc(t.footer)}</p>
    <p><a href="${repo}">github.com/XR-Dev-Camp/xr-camp</a></p>
  </footer>
</body>
</html>
`;
}
