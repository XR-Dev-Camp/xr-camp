#!/usr/bin/env node
/**
 * build-readmes.mjs
 *
 * Purpose
 *   Writes the student-facing guides from catalog.json, so they always match
 *   the lessons:
 *   - README.md, README.es.md, README.zh-Hans.md: "start here", the path,
 *     and every lesson with its time and status.
 *   - <course>/README*.md: one guide per phase.
 *   - A "being written" notice at the top of every lesson still in draft,
 *     removed automatically once the lesson is ready.
 *
 * Inputs   catalog.json, website/src/strings.mjs (phase names and summaries,
 *          shared with the website so the two never disagree).
 * Outputs  The files above.
 * Deps     Node 18+ only.
 *
 * Run      node scripts/build-readmes.mjs           write the files
 *          node scripts/build-readmes.mjs --check   fail if any are out of date (CI)
 */

import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { STRINGS } from '../website/src/strings.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const CHECK = process.argv.includes('--check');
const REPO = 'https://github.com/XR-Dev-Camp/xr-camp';
const SITE = 'https://xrcamp.dev';

// Where the policy files live, in one place so a later move is one edit.
const FILES = {
  contributing: 'CONTRIBUTING.md',
  conduct: 'CODE_OF_CONDUCT.md',
  security: 'SECURITY.md',
  commercial: 'COMMERCIAL_USE.md',
  notices: 'THIRD_PARTY_NOTICES.md',
  attribution: 'ATTRIBUTION.md',
};

const LANGS = {
  en: { site: STRINGS.en, readme: 'README.md', loc: 'en' },
  es: { site: STRINGS.es, readme: 'README.es.md', loc: 'es-419' },
  zh: { site: STRINGS.zh, readme: 'README.zh-Hans.md', loc: 'zh-Hans' },
};

const T = {
  en: {
    languages: '**Language / Idioma / 语言:** English · [Español](README.es.md) · [简体中文](README.zh-Hans.md)',
    tagline: 'A free school for the immersive web. Learn to build websites, 3D worlds, and virtual and augmented reality experiences that run in a browser, starting from your very first line of code.',
    who: 'XR Camp is **completely free, for everyone**. It is built first for **women in Latin America and China**, including women who have never written code, and it is created by women experts and by male allies committed to women’s empowerment.',
    startTitle: 'Start here',
    start: (first) => [
      `**Open your first lesson:** [${first.title}](${first.path}/${first.readme}). In your first hour you will build a 3D world.`,
      '**Download the lessons:** click the green **Code** button at the top of this page, then **Download ZIP**. Unzip it somewhere you will find again, such as your Documents folder. You do not need a GitHub account.',
      '**Plan your week:** every lesson is split into 45-minute sessions. Four sessions a week is a good pace; two is fine too.',
      `**Visit the website:** [xrcamp.dev](${SITE}).`,
    ],
    pathTitle: 'The path',
    pathIntro: 'Eight phases, from your first click to professional. Every phase ends with a project you publish, and every phase is worth doing on its own.',
    pathHead: '| Phase | You will build | Time | Lessons ready |',
    time: (sessions, months) => `${sessions} sessions · about ${months} months`,
    readyCount: (r, t) => `${r} of ${t}`,
    lessonsTitle: 'All lessons',
    lessonsIntro: '✅ Ready means the lesson is complete in English (Spanish and Chinese translations are on the way). 🚧 means the lesson is being written.',
    lessonHead: '| # | Lesson | Time | Status |',
    lessonTime: (h, s) => `${h} h · ${s} sessions`,
    ready: '✅ Ready',
    coming: '🚧 Coming soon',
    phase: 'Phase',
    anatomyTitle: 'How every lesson works',
    anatomy: [
      '`README` — the lesson guide, in English, Spanish, and Simplified Chinese.',
      '`starter/` — where you begin. Copy it and build.',
      '`completed/` — the reference solution. Open it only after a real attempt.',
      '`challenges/` — three optional extensions: Foundation, Creative, Explorer.',
      '`tests/checklist.md` — check your work before you share it.',
    ],
    accessTitle: 'Accessible by design',
    access: 'Every project must work with a keyboard and a screen reader, meet WCAG 2.2 AA contrast, and respect reduced-motion settings. 3D and XR must never block access to the core content.',
    helpTitle: 'Teach, mentor, translate, or contribute',
    help: (f) => `XR Camp is built by its community. Read the [contributing guide](${f.contributing}) and the [code of conduct](${f.conduct}). Found a security or privacy problem? Please report it privately: see [${f.security}](${f.security}). The website’s source is in [\`website/\`](website/).`,
    licenseTitle: 'License',
    license: (f) => `Code: [LICENSE-CODE](LICENSE-CODE). Lessons, documentation, and images: [LICENSE-CONTENT](LICENSE-CONTENT) (CC BY-NC-SA 4.0). Commercial and institutional use: [${f.commercial}](${f.commercial}). Third-party material: [${f.notices}](${f.notices}) and [${f.attribution}](${f.attribution}).`,
    generated: 'This file is generated by scripts/build-readmes.mjs from catalog.json. Edit the script, not this file.',

    courseBack: '← All phases',
    courseBuild: 'You will build',
    courseTime: (s, m, h) => `**Time:** about ${h} hours · ${s} sessions of 45 minutes · about ${m} months at 4 sessions a week`,
    courseStart: (l) => `**Start with:** [${l.title}](${l.dir}/${l.readme})`,
    courseLessons: 'Lessons',

    draftNotice: (home) => `> 🚧 **This lesson is being written.** What you see below is its outline. See [every lesson and what is ready now](${home}#all-lessons).`,
  },
  es: {
    languages: '**Language / Idioma / 语言:** [English](README.md) · Español · [简体中文](README.zh-Hans.md)',
    tagline: 'Una escuela gratuita para la web inmersiva. Aprende a crear sitios web, mundos 3D y experiencias de realidad virtual y aumentada que funcionan en el navegador, desde tu primera línea de código.',
    who: 'XR Camp es **completamente gratuita, para todo el mundo**. Está pensada ante todo para **mujeres de América Latina y China**, incluidas las que nunca han escrito código, y la crean mujeres expertas y hombres aliados comprometidos con el empoderamiento de las mujeres.',
    startTitle: 'Empieza aquí',
    start: (first) => [
      `**Abre tu primera lección:** [${first.title}](${first.path}/${first.readme}). En tu primera hora construirás un mundo 3D.`,
      '**Descarga las lecciones:** pulsa el botón verde **Code** en la parte superior de esta página y luego **Download ZIP**. Descomprímelo en un lugar donde lo vuelvas a encontrar, como tu carpeta Documentos. No necesitas una cuenta de GitHub.',
      '**Planifica tu semana:** cada lección se divide en sesiones de 45 minutos. Cuatro sesiones por semana es un buen ritmo; dos también está bien.',
      `**Visita el sitio web:** [xrcamp.dev](${SITE}/es-419/).`,
    ],
    pathTitle: 'El camino',
    pathIntro: 'Ocho fases, de tu primer clic a profesional. Cada fase termina con un proyecto que publicas, y cada fase tiene valor por sí misma.',
    pathHead: '| Fase | Construirás | Tiempo | Lecciones listas |',
    time: (sessions, months) => `${sessions} sesiones · unos ${months} meses`,
    readyCount: (r, t) => `${r} de ${t}`,
    lessonsTitle: 'Todas las lecciones',
    lessonsIntro: '✅ Lista significa que la lección está completa en inglés (las traducciones al español y al chino están en camino). 🚧 significa que la lección se está escribiendo.',
    lessonHead: '| # | Lección | Tiempo | Estado |',
    lessonTime: (h, s) => `${h} h · ${s} sesiones`,
    ready: '✅ Lista',
    coming: '🚧 Próximamente',
    phase: 'Fase',
    anatomyTitle: 'Cómo funciona cada lección',
    anatomy: [
      '`README` — la guía de la lección, en inglés, español y chino simplificado.',
      '`starter/` — donde empiezas. Cópialo y construye.',
      '`completed/` — la solución de referencia. Ábrela solo después de intentarlo de verdad.',
      '`challenges/` — tres retos opcionales: Fundamento, Creativo, Explorador.',
      '`tests/checklist.md` — revisa tu trabajo antes de compartirlo.',
    ],
    accessTitle: 'Accesible desde el diseño',
    access: 'Cada proyecto debe funcionar con teclado y lector de pantalla, cumplir el contraste WCAG 2.2 AA y respetar la preferencia de movimiento reducido. El 3D y la XR nunca deben impedir el acceso al contenido principal.',
    helpTitle: 'Enseña, sé mentora o mentor, traduce o contribuye',
    help: (f) => `XR Camp la construye su comunidad. Lee la [guía para contribuir](${f.contributing}) y el [código de conducta](${f.conduct}). ¿Has encontrado un problema de seguridad o privacidad? Infórmalo en privado: consulta [${f.security}](${f.security}). El código del sitio web está en [\`website/\`](website/).`,
    licenseTitle: 'Licencia',
    license: (f) => `Código: [LICENSE-CODE](LICENSE-CODE). Lecciones, documentación e imágenes: [LICENSE-CONTENT](LICENSE-CONTENT) (CC BY-NC-SA 4.0). Uso comercial e institucional: [${f.commercial}](${f.commercial}). Material de terceros: [${f.notices}](${f.notices}) y [${f.attribution}](${f.attribution}).`,
    generated: 'Este archivo lo genera scripts/build-readmes.mjs a partir de catalog.json. Edita el script, no este archivo.',

    courseBack: '← Todas las fases',
    courseBuild: 'Construirás',
    courseTime: (s, m, h) => `**Tiempo:** unas ${h} horas · ${s} sesiones de 45 minutos · unos ${m} meses con 4 sesiones por semana`,
    courseStart: (l) => `**Empieza por:** [${l.title}](${l.dir}/${l.readme})`,
    courseLessons: 'Lecciones',

    draftNotice: (home) => `> 🚧 **Esta lección se está escribiendo.** Lo que ves abajo es su esquema. Consulta [todas las lecciones y cuáles están listas](${home}#todas-las-lecciones).`,
  },
  zh: {
    languages: '**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · 简体中文',
    tagline: '一所面向沉浸式网络的免费学校。从你写下的第一行代码开始，学习构建在浏览器中运行的网站、3D 世界以及虚拟现实和增强现实体验。',
    who: 'XR Camp **完全免费，面向所有人**。它首先为**拉丁美洲和中国的女性**而建，包括从未写过代码的女性；课程由女性专家以及致力于女性赋权的男性支持者共同创作。',
    startTitle: '从这里开始',
    start: (first) => [
      `**打开第一课：**[${first.title}](${first.path}/${first.readme})。在第一个小时里，你就会构建一个 3D 世界。`,
      '**下载课程：**点击本页顶部绿色的 **Code** 按钮，然后选择 **Download ZIP**。把它解压到你能再次找到的地方，比如“文稿”文件夹。你不需要 GitHub 账户。',
      '**规划你的每一周：**每节课都分成若干次 45 分钟的学习。每周 4 次是不错的节奏，每周 2 次也可以。',
      `**访问网站：**[xrcamp.dev](${SITE}/zh-hans/)。`,
    ],
    pathTitle: '学习路径',
    pathIntro: '八个阶段，从第一次点击到专业开发者。每个阶段都以一个你亲手发布的项目结束，而且每个阶段本身都有价值。',
    pathHead: '| 阶段 | 你将构建 | 时长 | 已完成课程 |',
    time: (sessions, months) => `${sessions} 次学习 · 约 ${months} 个月`,
    readyCount: (r, t) => `${t} 课中 ${r} 课`,
    lessonsTitle: '全部课程',
    lessonsIntro: '✅ 已完成表示该课程的英文版已经完成（西班牙语和中文翻译正在进行中）。🚧 表示课程正在编写。',
    lessonHead: '| # | 课程 | 时长 | 状态 |',
    lessonTime: (h, s) => `${h} 小时 · ${s} 次学习`,
    ready: '✅ 已完成',
    coming: '🚧 即将推出',
    phase: '阶段',
    anatomyTitle: '每节课的结构',
    anatomy: [
      '`README` — 课程指南，提供英语、西班牙语和简体中文版本。',
      '`starter/` — 起点。复制一份，开始构建。',
      '`completed/` — 参考答案。请在认真尝试之后再打开。',
      '`challenges/` — 三个可选挑战：基础、创意、探索。',
      '`tests/checklist.md` — 分享作品前的自查清单。',
    ],
    accessTitle: '从设计开始就无障碍',
    access: '每个项目都必须支持键盘和屏幕阅读器操作，满足 WCAG 2.2 AA 对比度要求，并遵循“减少动态效果”设置。3D 和 XR 绝不能妨碍用户访问核心内容。',
    helpTitle: '教课、做导师、翻译或参与贡献',
    help: (f) => `XR Camp 由社区共同建设。请阅读[贡献指南](${f.contributing})和[行为准则](${f.conduct})。发现安全或隐私问题？请私下报告：参见 [${f.security}](${f.security})。网站源代码位于 [\`website/\`](website/)。`,
    licenseTitle: '许可协议',
    license: (f) => `代码：[LICENSE-CODE](LICENSE-CODE)。课程、文档和图片：[LICENSE-CONTENT](LICENSE-CONTENT)（CC BY-NC-SA 4.0）。商业和机构使用：[${f.commercial}](${f.commercial})。第三方素材：[${f.notices}](${f.notices}) 和 [${f.attribution}](${f.attribution})。`,
    generated: '本文件由 scripts/build-readmes.mjs 根据 catalog.json 生成。请修改脚本，而不是本文件。',

    courseBack: '← 全部阶段',
    courseBuild: '你将构建',
    courseTime: (s, m, h) => `**时长：**约 ${h} 小时 · ${s} 次学习，每次 45 分钟 · 每周 4 次，约 ${m} 个月`,
    courseStart: (l) => `**从这里开始：**[${l.title}](${l.dir}/${l.readme})`,
    courseLessons: '课程列表',

    draftNotice: (home) => `> 🚧 **本课程正在编写中。**下面是课程大纲。查看[全部课程以及已完成的课程](${home}#全部课程)。`,
  },
};

const NOTICE_START = '<!-- status:start -->';
const NOTICE_END = '<!-- status:end -->';

const SESSIONS_PER_WEEK = 4;
const WEEKS_PER_MONTH = 4.345;
const months = (sessions) => Math.max(1, Math.round(sessions / SESSIONS_PER_WEEK / WEEKS_PER_MONTH));
const hours = (minutes) => Math.round(minutes / 60);
const isReady = (p) => p.status === 'review' || p.status === 'published';
const title = (p, loc) => p.title[loc] || p.title.en;

const catalog = JSON.parse(await readFile(join(ROOT, 'catalog.json'), 'utf8'));
const courses = catalog.courses.map((c) => {
  const lessons = catalog.projects.filter((p) => p.courseId === c.id);
  const sessions = lessons.reduce((n, p) => n + p.schedule.sessions, 0);
  const minutes = lessons.reduce((n, p) => n + p.estimatedMinutes, 0);
  return { ...c, lessons, sessions, minutes, ready: lessons.filter(isReady).length };
});

const outputs = new Map(); // path -> content

function rootReadme(lang) {
  const t = T[lang];
  const { site, readme, loc } = LANGS[lang];
  const firstProject = catalog.projects[0];
  const first = { title: title(firstProject, loc), path: firstProject.path, readme };
  const out = [];
  out.push(`<!-- ${t.generated} -->`, '', '# XR Camp', '', t.languages, '', `> ${t.tagline}`, '', t.who, '');
  out.push(`## ${t.startTitle}`, '', ...t.start(first).map((s, i) => `${i + 1}. ${s}`), '');
  out.push(`## ${t.pathTitle}`, '', t.pathIntro, '', t.pathHead, '| --- | --- | --- | --- |');
  courses.forEach((c, i) => {
    out.push(`| [${i} · ${site.phases[i][0]}](${c.id}/${readme}) | ${site.phases[i][1]} | ${t.time(c.sessions, months(c.sessions))} | ${t.readyCount(c.ready, c.lessons.length)} |`);
  });
  out.push('', `## ${t.lessonsTitle}`, '', t.lessonsIntro, '');
  courses.forEach((c, i) => {
    out.push(`### ${t.phase} ${i} · ${site.phases[i][0]}`, '', t.lessonHead, '| --- | --- | --- | --- |');
    c.lessons.forEach((p, k) => {
      out.push(`| ${k + 1} | [${title(p, loc)}](${p.path}/${readme}) | ${t.lessonTime(hours(p.estimatedMinutes), p.schedule.sessions)} | ${isReady(p) ? t.ready : t.coming} |`);
    });
    out.push('');
  });
  out.push(`## ${t.anatomyTitle}`, '', ...t.anatomy.map((s) => `- ${s}`), '');
  out.push(`## ${t.accessTitle}`, '', t.access, '');
  out.push(`## ${t.helpTitle}`, '', t.help(FILES), '');
  out.push(`## ${t.licenseTitle}`, '', t.license(FILES), '');
  return out.join('\n');
}

function courseReadme(c, i, lang) {
  const t = T[lang];
  const { site, readme, loc } = LANGS[lang];
  const langLinks = Object.entries(LANGS).map(([k, l]) => (k === lang ? l.site.languageName : `[${l.site.languageName}](${l.readme})`)).join(' · ');
  const first = c.lessons[0];
  const out = [
    `<!-- ${t.generated} -->`, '',
    `# ${t.phase} ${i} · ${site.phases[i][0]}`, '',
    `**Language / Idioma / 语言:** ${langLinks}`, '',
    `[${t.courseBack}](../${readme}#${lang === 'en' ? 'the-path' : lang === 'es' ? 'el-camino' : '学习路径'})`, '',
    `**${t.courseBuild}:** ${site.phases[i][1]}`, '',
    t.courseTime(c.sessions, months(c.sessions), hours(c.minutes)), '',
    t.courseStart({ title: title(first, loc), dir: first.path.split('/')[1], readme }), '',
    `## ${t.courseLessons}`, '', t.lessonHead, '| --- | --- | --- | --- |',
    ...c.lessons.map((p, k) => `| ${k + 1} | [${title(p, loc)}](${p.path.split('/')[1]}/${readme}) | ${t.lessonTime(hours(p.estimatedMinutes), p.schedule.sessions)} | ${isReady(p) ? t.ready : t.coming} |`),
    '',
  ];
  return out.join('\n');
}

// A draft lesson gets a notice after its first heading block; a ready one loses it.
async function lessonWithNotice(p, lang) {
  const { readme } = LANGS[lang];
  const file = join(ROOT, p.path, readme);
  let md = await readFile(file, 'utf8');
  const re = new RegExp(`${NOTICE_START}[\\s\\S]*?${NOTICE_END}\\n\\n`);
  md = md.replace(re, '');
  if (!isReady(p)) {
    const notice = `${NOTICE_START}\n${T[lang].draftNotice(`../../${readme}`)}\n${NOTICE_END}\n\n`;
    // After the title and the language line: before the first "**Course" / "**Curso" / "**课程" line.
    const at = md.search(/^\*\*(Course|Curso|课程)/m);
    if (at === -1) throw new Error(`${p.path}/${readme}: no course line to place the notice before`);
    md = md.slice(0, at) + notice + md.slice(at);
  }
  return { file, md };
}

for (const lang of Object.keys(LANGS)) {
  outputs.set(join(ROOT, LANGS[lang].readme), rootReadme(lang));
  courses.forEach((c, i) => outputs.set(join(ROOT, c.id, LANGS[lang].readme), courseReadme(c, i, lang)));
  for (const p of catalog.projects) {
    const { file, md } = await lessonWithNotice(p, lang);
    outputs.set(file, md);
  }
}

let stale = 0;
for (const [file, content] of outputs) {
  const current = await readFile(file, 'utf8').catch(() => null);
  if (current === content) continue;
  if (CHECK) { console.log(`out of date: ${file.slice(ROOT.length)}`); stale++; continue; }
  await writeFile(file, content, 'utf8');
}

if (CHECK && stale) {
  console.log(`\n${stale} file(s) out of date. Run: node scripts/build-readmes.mjs`);
  process.exit(1);
}
console.log(CHECK ? 'all generated READMEs are up to date' : `wrote ${outputs.size} files (unchanged files skipped)`);
