// All words on the site, in every language. The page template and the 3D
// scene read from here, so a translator only ever edits this file.
// Spanish and Chinese are drafts: they need review by native speakers.

export const STRINGS = {
  en: {
    htmlLang: 'en',
    dir: '',
    languageName: 'English',
    readme: 'README.md',
    title: 'XR Camp: build the web you can step into',
    description: 'A free school for the immersive web. Learn to build websites, 3D worlds, and VR and AR experiences that run in a browser. Built for women in Latin America and China, free for everyone.',
    skip: 'Skip to content',
    controls: 'Site settings',
    toggle3d: '3D scene',
    pauseMotion: 'Pause motion',
    languages: 'Language',

    heroEyebrow: 'XR Camp · A free school for the immersive web',
    heroTitle: 'Build the web you can step into.',
    heroLead: 'Learn to build websites, 3D worlds, and virtual and augmented reality experiences that run in a browser. Free for everyone, starting from your very first line of code.',
    ctaStart: 'Start lesson one',
    ctaRepo: 'All lessons on GitHub',
    enterVR: 'Step inside in VR',
    enterAR: 'Step inside in AR',

    nav: [['mission', 'Mission'], ['about', 'About'], ['program', 'Program'], ['why', 'Why'], ['phases', 'Phases'], ['contact', 'Contact']],

    missionTitle: 'Our mission',
    mission: [
      'XR Camp is an online school that gives women the opportunity to become web designers and developers, with a focus on the immersive web: 3D, virtual reality, and augmented reality.',
      'It is built first for women in Latin America and China, including women who have never written code. Lessons are written in English, Spanish, and Simplified Chinese.',
    ],

    aboutTitle: 'Free, for everyone',
    about: [
      'XR Camp is completely free. There are no fees, no paywalls, and no accounts. Every lesson, starter file, and solution is in one public repository on GitHub.',
      'It is created by women experts and by male allies committed to women’s empowerment.',
    ],

    programTitle: 'Program',
    programIntro: 'Learn from women experts and male allies from around the world, one 45-minute session at a time.',
    program: [
      ['Web', 'Frontend design and development: HTML, CSS, and JavaScript.'],
      ['Web 3D', 'Design and development in 3D: A-Frame, three.js, and X3D.'],
      ['XR: VR and AR', 'Virtual and augmented reality in the browser, with WebXR.'],
      ['Community', 'Community will blossom soon.'],
    ],
    alt: {
      hero: 'Illustration of a woman wearing a VR headset, reaching into floating screens.',
      mission: 'Illustration of a woman working at a laptop at her desk.',
      about: 'A graduate raising her diploma and cap at sunset.',
      program: [
        'Illustration of a computer screen reading “Web Design & Development”, surrounded by icons.',
        'Illustration of people building a large 3D web page.',
        'Diagram of XR as the overlap of VR, AR, and MR.',
        'Illustration of a row of women in profile among flowers.',
      ],
    },
    communityCredit: 'Illustration: “Women’s Day” by Iryna Korshak',

    thresholdTitle: 'Now, step into the web you will build.',
    threshold: 'Keep scrolling. Everything below is built in 3D, with the tools you will learn here: HTML, A-Frame, and WebXR.',

    firstHourTitle: 'A 3D world in your first hour',
    firstHour: 'You do not start with theory. In your first lesson you open a file, change a few words, and a 3D garden appears in your browser with your name on it. The garden at the start of the thread behind this text is a grown-up version of that first world.',
    firstHourCaption: 'One line. One purple box. Your first step into 3D.',

    pathTitle: 'Eight phases, from your first click to professional',
    pathIntro: 'Every phase ends with a real project you publish. Lessons are planned in 45-minute sessions that fit around work, study, and family, and every phase stands on its own.',
    phaseLabel: 'Phase',
    youBuild: 'You will build',
    sessions: (n, months) => `${n} sessions of 45 minutes · about ${months} months at 4 sessions a week`,
    ready: (r, t) => r === 0 ? `${t} lessons, being written now` : `${r} of ${t} lessons ready in English`,
    openPhase: 'Open this phase on GitHub',

    howTitle: 'How it works',
    how: [
      ['Everything is on GitHub', 'Every lesson, starter file, and solution is in one public repository. Download it, or fork it and make it yours.'],
      ['Learn in 45-minute sessions', 'Every lesson tells you how many sessions it takes and what you will have built by the end of each one.'],
      ['Use AI as a tutor, not a crutch', 'AI can explain almost anything. XR Camp teaches you to understand your code before you ask AI to change it.'],
      ['Learn together', 'Community will blossom soon.'],
    ],

    accessTitle: 'Accessible by design',
    access: 'This site works with a keyboard and a screen reader, and it respects your device’s motion settings. You can turn the 3D scene off at any time with the switch at the top of the page. Everything you build at XR Camp will meet the same standard.',

    whyTitle: 'Why',
    whyPlace: 'San Francisco, USA & Helsinki, Finland',
    whyQuote: [
      '“Be the change you want to see.” Taking this to heart, with over 20 years in the immersive and web technology domains, I have dedicated my career to growing the use of these technologies around the world through presentations, workshops, events, meetups, hackathons, and other community initiatives.',
      'In my continued pursuit to be a great ally to those in the community, this program’s goal is to enable any woman who is interested in web and immersive technologies to get her tech superpowers.',
      'And for Sherine.',
    ],
    photoAlt: 'Damon Hernandez',

    involvedTitle: 'Get involved',
    involved: 'Want to teach, mentor, translate, or write a lesson? XR Camp is built by women experts and male allies, and there is a place for you.',
    contribute: 'Contribute on GitHub',

    sceneTitle: 'About the 3D scene',
    scene: 'The page begins flat, in daylight. As you scroll past the Why section, it turns to night, and the four program images lift off the page and fly into a 3D scene. Behind the text is a night sky with a glowing thread running through it. Along the thread float eight small worlds, one for each phase: a garden of simple shapes, a floating web page, a cluster of connected blocks, a polished knot, a glowing portal, orbs circling each other, a tower, and a golden star. As you scroll, the view travels along the thread from one world to the next. In a VR or AR headset, you can stand among them and travel from world to world.',
    xrHint: 'Pinch or pull the trigger to travel to the next world',
    footer: 'XR Camp. Lessons are free under CC BY-NC-SA 4.0. This site is built with HTML, CSS, JavaScript, A-Frame, and WebXR: all things you will learn here.',

    phases: [
      ['Welcome to the Future', 'Your first 3D world, a timeline of the web, and a lab comparing three ways to build in 3D.'],
      ['Become a Web Developer', 'Accessible, responsive websites, published for anyone in the world to visit.'],
      ['Become a Frontend Engineer', 'Web apps that install on a phone, work offline, and use live data.'],
      ['Become a Web3D Developer', 'Interactive 3D experiences with A-Frame and three.js.'],
      ['Become an Immersive Developer', 'Virtual and augmented reality experiences that open in a headset from a link.'],
      ['Become a Full-Stack Spatial Developer', 'Multi-user 3D applications with accounts, data, and real-time connections.'],
      ['Become a Professional Developer', 'Production deployments, multilingual sites, and your own place in open source.'],
      ['Professional Capstone', 'A complete immersive project: researched, designed, built, tested, and launched.'],
    ],
  },

  es: {
    htmlLang: 'es-419',
    dir: 'es-419/',
    languageName: 'Español',
    readme: 'README.es.md',
    title: 'XR Camp: construye la web en la que puedes entrar',
    description: 'Una escuela gratuita para la web inmersiva. Aprende a crear sitios web, mundos 3D y experiencias de realidad virtual y aumentada que funcionan en el navegador. Pensada para mujeres de América Latina y China, gratuita para todo el mundo.',
    skip: 'Saltar al contenido',
    controls: 'Ajustes del sitio',
    toggle3d: 'Escena 3D',
    pauseMotion: 'Pausar movimiento',
    languages: 'Idioma',

    heroEyebrow: 'XR Camp · Una escuela gratuita para la web inmersiva',
    heroTitle: 'Construye la web en la que puedes entrar.',
    heroLead: 'Aprende a crear sitios web, mundos 3D y experiencias de realidad virtual y aumentada que funcionan en el navegador. Gratis para todo el mundo, desde tu primera línea de código.',
    ctaStart: 'Empieza la primera lección',
    ctaRepo: 'Todas las lecciones en GitHub',
    enterVR: 'Entra en VR',
    enterAR: 'Entra en AR',

    nav: [['mission', 'Misión'], ['about', 'Acerca de'], ['program', 'Programa'], ['why', 'Por qué'], ['phases', 'Fases'], ['contact', 'Contacto']],

    missionTitle: 'Nuestra misión',
    mission: [
      'XR Camp es una escuela en línea que da a las mujeres la oportunidad de ser diseñadoras y desarrolladoras web, con un enfoque en la web inmersiva: 3D, realidad virtual y realidad aumentada.',
      'Está pensada ante todo para mujeres de América Latina y China, incluidas las que nunca han escrito código. Las lecciones están en inglés, español y chino simplificado.',
    ],

    aboutTitle: 'Gratis, para todo el mundo',
    about: [
      'XR Camp es completamente gratuita. No hay cuotas, ni muros de pago, ni cuentas. Cada lección, archivo inicial y solución está en un repositorio público en GitHub.',
      'La crean mujeres expertas y hombres aliados comprometidos con el empoderamiento de las mujeres.',
    ],

    programTitle: 'Programa',
    programIntro: 'Aprende con mujeres expertas y hombres aliados de todo el mundo, una sesión de 45 minutos a la vez.',
    program: [
      ['Web', 'Diseño y desarrollo frontend: HTML, CSS y JavaScript.'],
      ['Web 3D', 'Diseño y desarrollo en 3D: A-Frame, three.js y X3D.'],
      ['XR: VR y AR', 'Realidad virtual y aumentada en el navegador, con WebXR.'],
      ['Comunidad', 'La comunidad florecerá pronto.'],
    ],
    alt: {
      hero: 'Ilustración de una mujer con un visor de realidad virtual, alcanzando pantallas flotantes.',
      mission: 'Ilustración de una mujer trabajando con su portátil en su escritorio.',
      about: 'Una graduada levanta su diploma y su birrete al atardecer.',
      program: [
        'Ilustración de una pantalla con el texto «Web Design & Development», rodeada de iconos.',
        'Ilustración de personas construyendo una gran página web en 3D.',
        'Diagrama de XR como la intersección de VR, AR y MR.',
        'Ilustración de una fila de mujeres de perfil entre flores.',
      ],
    },
    communityCredit: 'Ilustración: «Women’s Day», de Iryna Korshak',

    thresholdTitle: 'Ahora, entra en la web que vas a construir.',
    threshold: 'Sigue desplazándote. Todo lo que viene está hecho en 3D, con las herramientas que aprenderás aquí: HTML, A-Frame y WebXR.',

    firstHourTitle: 'Un mundo 3D en tu primera hora',
    firstHour: 'No empiezas con teoría. En tu primera lección abres un archivo, cambias unas palabras y aparece en tu navegador un jardín 3D con tu nombre. El jardín al comienzo del hilo, detrás de este texto, es una versión más grande de ese primer mundo.',
    firstHourCaption: 'Una línea. Una caja morada. Tu primer paso en 3D.',

    pathTitle: 'Ocho fases, de tu primer clic a profesional',
    pathIntro: 'Cada fase termina con un proyecto real que publicas. Las lecciones se planifican en sesiones de 45 minutos que encajan con el trabajo, los estudios y la familia, y cada fase tiene valor por sí misma.',
    phaseLabel: 'Fase',
    youBuild: 'Construirás',
    sessions: (n, months) => `${n} sesiones de 45 minutos · unos ${months} meses con 4 sesiones por semana`,
    ready: (r, t) => r === 0 ? `${t} lecciones, en preparación` : `${r} de ${t} lecciones listas en inglés`,
    openPhase: 'Abrir esta fase en GitHub',

    howTitle: 'Cómo funciona',
    how: [
      ['Todo está en GitHub', 'Cada lección, archivo inicial y solución está en un repositorio público. Descárgalo, o haz un fork y hazlo tuyo.'],
      ['Aprende en sesiones de 45 minutos', 'Cada lección indica cuántas sesiones lleva y qué habrás construido al final de cada una.'],
      ['Usa la IA como tutora, no como muleta', 'La IA puede explicar casi cualquier cosa. XR Camp te enseña a entender tu código antes de pedirle a la IA que lo cambie.'],
      ['Aprende en compañía', 'La comunidad florecerá pronto.'],
    ],

    accessTitle: 'Accesible desde el diseño',
    access: 'Este sitio funciona con teclado y lector de pantalla, y respeta los ajustes de movimiento de tu dispositivo. Puedes apagar la escena 3D cuando quieras con el interruptor de la parte superior. Todo lo que construyas en XR Camp cumplirá el mismo estándar.',

    whyTitle: 'Por qué',
    whyPlace: 'San Francisco, EE. UU. y Helsinki, Finlandia',
    whyQuote: [
      '«Sé el cambio que quieres ver». Con eso en mente, y con más de 20 años en las tecnologías web e inmersivas, he dedicado mi carrera a extender su uso por todo el mundo mediante charlas, talleres, eventos, encuentros, hackatones y otras iniciativas comunitarias.',
      'En mi empeño por ser un buen aliado de la comunidad, el objetivo de este programa es que cualquier mujer interesada en las tecnologías web e inmersivas consiga sus superpoderes tecnológicos.',
      'Y por Sherine.',
    ],
    photoAlt: 'Damon Hernandez',

    involvedTitle: 'Participa',
    involved: '¿Quieres enseñar, ser mentora o mentor, traducir o escribir una lección? XR Camp la construyen mujeres expertas y hombres aliados, y hay un lugar para ti.',
    contribute: 'Contribuye en GitHub',

    sceneTitle: 'Sobre la escena 3D',
    scene: 'La página empieza plana, a la luz del día. Al pasar la sección Por qué, se hace de noche y las cuatro imágenes del programa se despegan de la página y vuelan hacia una escena 3D. Detrás del texto hay un cielo nocturno atravesado por un hilo luminoso. A lo largo del hilo flotan ocho pequeños mundos, uno por fase: un jardín de figuras sencillas, una página web flotante, un grupo de bloques conectados, un nudo pulido, un portal brillante, esferas que giran unas alrededor de otras, una torre y una estrella dorada. Al desplazarte, la vista recorre el hilo de un mundo al siguiente. Con un visor de VR o AR, puedes estar entre ellos y viajar de mundo en mundo.',
    xrHint: 'Pellizca o pulsa el gatillo para viajar al siguiente mundo',
    footer: 'XR Camp. Las lecciones son gratuitas bajo CC BY-NC-SA 4.0. Este sitio está hecho con HTML, CSS, JavaScript, A-Frame y WebXR: todo lo que aprenderás aquí.',

    phases: [
      ['Bienvenida al futuro', 'Tu primer mundo 3D, una línea de tiempo de la web y un laboratorio que compara tres formas de construir en 3D.'],
      ['Conviértete en desarrolladora web', 'Sitios web accesibles y adaptables, publicados para que cualquiera en el mundo los visite.'],
      ['Conviértete en ingeniera frontend', 'Aplicaciones web que se instalan en el teléfono, funcionan sin conexión y usan datos en vivo.'],
      ['Conviértete en desarrolladora Web3D', 'Experiencias 3D interactivas con A-Frame y three.js.'],
      ['Conviértete en desarrolladora inmersiva', 'Experiencias de realidad virtual y aumentada que se abren en un visor desde un enlace.'],
      ['Conviértete en desarrolladora espacial full-stack', 'Aplicaciones 3D multiusuario con cuentas, datos y conexiones en tiempo real.'],
      ['Conviértete en desarrolladora profesional', 'Despliegues en producción, sitios multilingües y tu propio lugar en el código abierto.'],
      ['Proyecto final profesional', 'Un proyecto inmersivo completo: investigado, diseñado, construido, probado y lanzado.'],
    ],
  },

  zh: {
    htmlLang: 'zh-Hans',
    dir: 'zh-hans/',
    languageName: '简体中文',
    readme: 'README.zh-Hans.md',
    title: 'XR Camp：构建你可以走进去的网络',
    description: '一所面向沉浸式网络的免费学校。学习构建在浏览器中运行的网站、3D 世界以及虚拟现实和增强现实体验。为拉丁美洲和中国的女性而建，对所有人免费。',
    skip: '跳到正文',
    controls: '网站设置',
    toggle3d: '3D 场景',
    pauseMotion: '暂停动画',
    languages: '语言',

    heroEyebrow: 'XR Camp · 一所面向沉浸式网络的免费学校',
    heroTitle: '构建你可以走进去的网络。',
    heroLead: '学习构建在浏览器中运行的网站、3D 世界以及虚拟现实和增强现实体验。对所有人免费，从你写下的第一行代码开始。',
    ctaStart: '开始第一课',
    ctaRepo: '在 GitHub 上查看全部课程',
    enterVR: '进入 VR',
    enterAR: '进入 AR',

    nav: [['mission', '使命'], ['about', '关于'], ['program', '课程'], ['why', '初心'], ['phases', '阶段'], ['contact', '联系']],

    missionTitle: '我们的使命',
    mission: [
      'XR Camp 是一所在线学校，让女性有机会成为网页设计师和开发者，并专注于沉浸式网络：3D、虚拟现实和增强现实。',
      '它首先为拉丁美洲和中国的女性而建，包括从未写过代码的女性。课程提供英语、西班牙语和简体中文版本。',
    ],

    aboutTitle: '免费，面向所有人',
    about: [
      'XR Camp 完全免费。没有费用，没有付费墙，也不需要注册账户。所有课程、起始文件和参考答案都在 GitHub 上的一个公开仓库里。',
      '课程由女性专家以及致力于女性赋权的男性支持者共同创作。',
    ],

    programTitle: '课程',
    programIntro: '跟随来自世界各地的女性专家和男性支持者学习，每次 45 分钟。',
    program: [
      ['网页', '前端设计与开发：HTML、CSS 和 JavaScript。'],
      ['Web 3D', '3D 设计与开发：A-Frame、three.js 和 X3D。'],
      ['XR：VR 与 AR', '在浏览器中使用 WebXR 实现虚拟现实和增强现实。'],
      ['社区', '社区即将绽放。'],
    ],
    alt: {
      hero: '插画：一位戴着 VR 头显的女性，伸手触碰漂浮的屏幕。',
      mission: '插画：一位女性在书桌前用笔记本电脑工作。',
      about: '一位毕业生在夕阳下举起毕业证书和学位帽。',
      program: [
        '插画：一块写着 “Web Design & Development” 的屏幕，周围环绕着图标。',
        '插画：一群人正在搭建一个巨大的 3D 网页。',
        '示意图：XR 是 VR、AR 和 MR 的交集。',
        '插画：一排侧身站在花丛中的女性。',
      ],
    },
    communityCredit: '插画：Iryna Korshak 的《Women’s Day》',

    thresholdTitle: '现在，走进你将构建的网络。',
    threshold: '继续向下滚动。接下来的一切都是用 3D 构建的，使用的正是你将在这里学到的工具：HTML、A-Frame 和 WebXR。',

    firstHourTitle: '第一个小时，就有一个 3D 世界',
    firstHour: '你不会从理论开始。在第一课中，你打开一个文件，改几个字，浏览器里就会出现一座写着你名字的 3D 花园。这段文字背后那条光线起点的花园，就是那个第一个世界的“长大版”。',
    firstHourCaption: '一行代码。一个紫色方块。你迈入 3D 的第一步。',

    pathTitle: '八个阶段，从第一次点击到专业开发者',
    pathIntro: '每个阶段都以一个你亲手发布的真实项目结束。课程按每次 45 分钟来安排，可以配合工作、学习和家庭生活，而且每个阶段本身都有价值。',
    phaseLabel: '阶段',
    youBuild: '你将构建',
    sessions: (n, months) => `${n} 次学习，每次 45 分钟 · 每周 4 次，约 ${months} 个月`,
    ready: (r, t) => r === 0 ? `共 ${t} 课，正在编写中` : `${t} 课中已有 ${r} 课提供英文版`,
    openPhase: '在 GitHub 上打开这个阶段',

    howTitle: '学习方式',
    how: [
      ['一切都在 GitHub 上', '所有课程、起始文件和参考答案都在一个公开仓库里。你可以直接下载，也可以 fork 一份，变成你自己的。'],
      ['每次学习 45 分钟', '每节课都会告诉你需要几次学习，以及每次结束时你会完成什么。'],
      ['把 AI 当老师，而不是拐杖', 'AI 几乎什么都能解释。XR Camp 教你先理解自己的代码，再请 AI 修改它。'],
      ['一起学习', '社区即将绽放。'],
    ],

    accessTitle: '从设计开始就无障碍',
    access: '本网站支持键盘和屏幕阅读器操作，并遵循你设备的动画设置。你可以随时用页面顶部的开关关闭 3D 场景。你在 XR Camp 构建的一切，也都将达到同样的标准。',

    whyTitle: '初心',
    whyPlace: '美国旧金山 & 芬兰赫尔辛基',
    whyQuote: [
      '“成为你希望在世界上看到的改变。”我把这句话放在心上。在沉浸式技术和网络技术领域工作的 20 多年里，我通过演讲、工作坊、活动、聚会、黑客松和其他社区活动，致力于在全球推广这些技术。',
      '我一直努力成为社区的好伙伴。这个项目的目标，是让每一位对网络和沉浸式技术感兴趣的女性，都能获得属于她的技术超能力。',
      '也献给 Sherine。',
    ],
    photoAlt: 'Damon Hernandez',

    involvedTitle: '加入我们',
    involved: '想教课、做导师、翻译或编写课程吗？XR Camp 由女性专家和男性支持者共同建设，这里有你的位置。',
    contribute: '在 GitHub 上参与贡献',

    sceneTitle: '关于 3D 场景',
    scene: '页面一开始是平面的，处于白天。当你滚动经过“初心”部分时，页面变成夜晚，四张课程图片从页面上飞起，飞进一个 3D 场景。文字背后是一片夜空，一条发光的线贯穿其中。沿着这条线漂浮着八个小世界，每个阶段一个：一座由简单形状组成的花园、一张漂浮的网页、一组相互连接的方块、一个光滑的绳结、一道发光的传送门、彼此环绕的球体、一座塔和一颗金色的星星。当你滚动页面时，视角会沿着这条线从一个世界移动到下一个世界。戴上 VR 或 AR 头显，你可以站在它们之间，从一个世界前往另一个世界。',
    xrHint: '捏合手指或扣动扳机，前往下一个世界',
    footer: 'XR Camp。课程依据 CC BY-NC-SA 4.0 免费提供。本网站使用 HTML、CSS、JavaScript、A-Frame 和 WebXR 构建——这些你都会在这里学到。',

    phases: [
      ['欢迎来到未来', '你的第一个 3D 世界、一条网络发展时间线，以及一个比较三种 3D 构建方式的实验室。'],
      ['成为网页开发者', '无障碍、响应式的网站，发布到网上，让世界各地的人都能访问。'],
      ['成为前端工程师', '可以安装到手机、离线运行并使用实时数据的网页应用。'],
      ['成为 Web3D 开发者', '使用 A-Frame 和 three.js 构建的交互式 3D 体验。'],
      ['成为沉浸式开发者', '通过一个链接就能在头显中打开的虚拟现实和增强现实体验。'],
      ['成为全栈空间开发者', '带有账户、数据和实时连接的多用户 3D 应用。'],
      ['成为专业开发者', '生产环境部署、多语言网站，以及你在开源世界中的一席之地。'],
      ['专业毕业项目', '一个完整的沉浸式项目：调研、设计、构建、测试并发布。'],
    ],
  },
};
