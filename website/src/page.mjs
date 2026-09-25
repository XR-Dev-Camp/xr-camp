// Builds one language's page. Plain template literals: no framework, so a
// learner can read every line of how this site is made.

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function page({ t, lang, all, phases, repo, root }) {
  const lessonOne = `${repo}/blob/main/preface/01-welcome-to-xr-camp/${t.readme}`;

  const languageLinks = Object.entries(all).map(([code, s]) => code === lang
    ? `<li><a href="${root}${s.dir}index.html" aria-current="page" lang="${s.htmlLang}">${esc(s.languageName)}</a></li>`
    : `<li><a href="${root}${s.dir}index.html" lang="${s.htmlLang}" hreflang="${s.htmlLang}">${esc(s.languageName)}</a></li>`).join('\n          ');

  const alternates = Object.values(all).map((s) =>
    `<link rel="alternate" hreflang="${s.htmlLang}" href="https://xrcamp.dev/${s.dir}">`).join('\n  ');

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
  ${alternates}
  <link rel="icon" href="${root}assets/icon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${root}assets/site.css">
  <script type="module" src="${root}assets/scene.js"></script>
</head>
<body>
  <a class="skip-link" href="#main">${esc(t.skip)}</a>

  <!-- The 3D scene is drawn here, behind the page. It is decorative: every
       word it illustrates is also in the page, and it can be switched off. -->
  <div id="scene-layer" aria-hidden="true"></div>
  <script type="application/json" id="scene-data">${sceneData}</script>

  <header class="site-header">
    <a class="brand" href="${root}${t.dir}index.html">XR Camp</a>
    <nav aria-label="${esc(t.controls)}" class="controls">
      <button type="button" id="toggle-3d" aria-pressed="true" hidden>${esc(t.toggle3d)}</button>
      <button type="button" id="toggle-motion" aria-pressed="false" hidden>${esc(t.pauseMotion)}</button>
      <details class="languages">
        <summary>${esc(t.languages)}</summary>
        <ul>
          ${languageLinks}
        </ul>
      </details>
    </nav>
  </header>

  <main id="main">
    <section class="hero" data-station="overview" aria-labelledby="hero-title">
      <div class="panel panel-hero">
        <p class="eyebrow">${esc(t.heroEyebrow)}</p>
        <h1 id="hero-title">${esc(t.heroTitle)}</h1>
        <p class="lead">${esc(t.heroLead)}</p>
        <p class="actions">
          <a class="button primary" href="${lessonOne}">${esc(t.ctaStart)}</a>
          <a class="button" href="${repo}">${esc(t.ctaRepo)}</a>
        </p>
        <p class="actions xr-actions">
          <button type="button" class="button xr" id="enter-vr" hidden>${esc(t.enterVR)}</button>
          <button type="button" class="button xr" id="enter-ar" hidden>${esc(t.enterAR)}</button>
        </p>
        <p class="note">${esc(t.heroNote)}</p>
      </div>
    </section>

    <section data-station="overview" aria-labelledby="mission-title">
      <div class="panel">
        <h2 id="mission-title">${esc(t.missionTitle)}</h2>
        ${t.mission.map((p) => `<p>${esc(p)}</p>`).join('\n        ')}
      </div>
    </section>

    <section data-station="0" aria-labelledby="first-hour-title">
      <div class="panel">
        <h2 id="first-hour-title">${esc(t.firstHourTitle)}</h2>
        <p>${esc(t.firstHour)}</p>
        <figure>
          <pre><code>&lt;a-box position="-1.5 0.5 -4" color="#5b2a86"&gt;&lt;/a-box&gt;</code></pre>
          <figcaption>${esc(t.firstHourCaption)}</figcaption>
        </figure>
      </div>
    </section>

    <section aria-labelledby="path-title">
      <div class="panel" data-station="0">
        <h2 id="path-title">${esc(t.pathTitle)}</h2>
        <p>${esc(t.pathIntro)}</p>
      </div>
      <ol class="phases">${phaseItems}
      </ol>
    </section>

    <section data-station="end" aria-labelledby="how-title">
      <div class="panel">
        <h2 id="how-title">${esc(t.howTitle)}</h2>
        <ul class="how">${how}
        </ul>
      </div>
    </section>

    <section data-station="end" aria-labelledby="access-title">
      <div class="panel">
        <h2 id="access-title">${esc(t.accessTitle)}</h2>
        <p>${esc(t.access)}</p>
      </div>
    </section>

    <section data-station="end" aria-labelledby="why-title">
      <div class="panel why">
        <h2 id="why-title">${esc(t.whyTitle)}</h2>
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

    <section data-station="end" aria-labelledby="involved-title">
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
