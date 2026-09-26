# Translation review checklist

All 58 lessons now have Spanish (`es-419`) and Simplified Chinese (`zh-Hans`) drafts, written with AI assistance. A lesson can move from `review` to `published` only after a native speaker has reviewed it. This file lists the choices the translators were unsure of, so reviewers can start there.

When you have reviewed a lesson, tick it off below and delete the notes you resolved.

## House style decisions to confirm

- **Spanish variety.** Lessons use Latin American Spanish: *computadora*, *celular*, *video*, *mouse*, *presiona*, *agregar*, *costo*. HTML Foundations has been harmonised to match (*video*, *celular*, *costo*, *presiona*, *agregar*, *mouse*, **Shift**/**Enter** key names). Spanish quotation marks are «».
- **Gender in Spanish.** Translators mostly used neutral wording (*personas*, *quienes*), and the feminine where a lesson addresses the learner directly (*Tú eres la científica*, *desarrolladora web*). Role titles in Careers (0.9) use the feminine (*Desarrolladora frontend*, *Artista técnica*). Confirm this is the house style, or switch to neutral forms (*Desarrollo frontend*).
- **Chinese quotation marks.** Translations use 「」, following HTML Foundations. Switch to “” if preferred; it is a simple find-and-replace.
- **English interface labels.** Starter pages are in English, so on-screen labels (**Next step**, **View in VR**, **Pause animation**) stay in English with a gloss in the translation. Decide whether to localise the starter pages themselves.
- **Code blocks** are untranslated, including comments in folder trees. HTML Foundations translated those comments; decide on one rule.
- **"Standards spotlight"** is *Estándar destacado* everywhere (HTML Foundations now matches).
- **Code-comment glosses.** Where a comment inside a code block matters, some translators added a one-line paraphrase under the block (1.2 challenge 3, 1.3 step 4, 1.4 challenge 1, 1.6 steps 2–3, in both languages). Keep or remove them consistently.
- **Small additions.** 1.5 challenge 2 gives a `srclang` example in the reader's language (`es` / `zh-Hans`); 1.6 challenge 2 (Chinese) notes the example messages can be replaced with Chinese.

## Spanish: terms to check

| Lesson | Terms |
| --- | --- |
| 0.1 Welcome | *Formato → Convertir en texto normal* (TextEdit "Make Plain Text"); *las visitantes ciegas* |
| 0.2 Computer Fundamentals | Title *Fundamentos de computación* (or *de informática*); *página de configuración*; menu paths left in English with notes |
| 0.3 Internet and the Web | *hosting (alojamiento web)*, *rentar*, *resolvedor de DNS*, *registrador*; *región dinámica*; *mejora progresiva* |
| 0.4 History of the Web | *Ver código fuente de la página*; *navegador en modo línea*; *La madre de todas las demos*; *anuncio espectacular* vs *cartel publicitario*; *Pekín* vs *Beijing*; *estudiante en prácticas* vs *pasante* |
| 0.5 History of Web3D | *developer advocate* left in English; *copreside*; *renderizador*; *lienzo 3D* |
| 0.6 The Spatial Web | *Detección de funciones*; *título* for table caption; *SIG (GIS)*; *gemelo digital*; *lentes*, *visor*; *directora ejecutiva* (CEO) |
| 0.7 Organizations | *Grupo de Comunidad*; *explainer (explicación)*; *revisión amplia*; Xiaoqian Wu's job titles |
| 0.8 Ethics | Deceptive pattern names; POUR as *Perceptible / Operable / Comprensible / Robusto*; Challenge 3 keeps English prompts on purpose |
| 0.9 Careers | Feminine role titles; *Todavía no / Empecé / Con confianza*; *Historia de la Web3D* |
| 1.1 HTML Foundations | *Shift/Enter* key names; *plan de datos móviles que se paga por uso*; *incluida tú* and *dispuesta* (feminine by house rule) |
| 1.2 Accessible Forms | Title *entrada de datos*; *pista* (hint); *botones de opción*; *casilla del boletín*; *validación integrada*; *Entrada redundante* (3.3.7); *se traban*; *Grupo de Expertos en Accesibilidad Web del W3C Brasil* |
| 1.3 CSS Foundations | *hoja de estilos*; *lista de fuentes (font stack)*; *escala tipográfica*; *relleno* (padding); *tokens* untranslated; *largo de línea*; *se reacomoda* (reflow); *encuentro Talk.CSS* |
| 1.4 Responsive Web Design | *adaptable* vs *responsivo*; *mobile first*, *media queries*, *container queries* in English with glosses; *áreas táctiles*; *puntos de quiebre*; *modo de dispositivo*; *registro de pruebas*; *contraído/expandido* |
| 1.5 Web Accessibility Foundations | *criterio de conformidad*; *regiones* for landmarks (*puntos de referencia* in 1.1); *región dinámica*; *encimado*; *verificador de contraste*; *Herramienta Recortes*; "Community lunch, Places, Full" kept in English |
| 1.6 JavaScript Foundations | *arreglo* vs *array*; *plantillas literales*; *detector de eventos*; *botón de alternar*; *palomita* (Mexican; maybe *marca de verificación*); *debouncing (antirrebote)*; *explorador de programas* |
| 1.7 Developer Tools | Title *Herramientas para desarrolladores*; *punto de interrupción*; *reporte de error*; *esconder errores* (plant bugs); *grafo de escena*; *linter* in English; complaint quotes mix Spanish and English UI labels |
| 1.8 Git, GitHub, and Publishing | *commit*, *push*, *fork*, *pull request* kept in English with glosses (*confirmación*, *enviar*, *bifurcación*, *solicitud de cambios*); *hacer commit*; *verificación en dos pasos*; *buscar/traer cambios del origen*; *compilación e implementación*; *error de tipeo* |
| 1.9 Web Developer Portfolio | Title *Portafolio de desarrolladora web* (feminine; or *de desarrollo web*); *Proyecto final* (capstone); *estudio de caso*; *alternativa* (fallback); *arquitectura de la información*; *throttling (limitación de red)*; *verde azulado oscuro*; *mareo por movimiento*; *declaración de accesibilidad*; example sentences translated |
| 2.1 Modern JavaScript | *se difieren* vs *se posponen* (deferred scripts); *committer* glossed as «colaboradora»; *Comité Directivo Técnico (Technical Steering Committee)*; *solo listas* (ready only) |
| 2.2 DOM and Dynamic Interfaces | *se propaga (bubbling)*; *región dinámica* (as in 1.5) vs *región en vivo*; English UI strings kept with glosses; *marcador de posición*; *coalescencia nula*; the fuller editorial note could be backported to 1.1 |
| 2.3 Application Architecture | *code smell* kept, glossed once as *señales de mal código*; *store* untranslated; button labels (Done, Delete, Edit, Save, Undo) kept in English; *depuración con viaje en el tiempo*; *código muerto*; *conectando todo* (wiring it together) |
| 2.4 APIs, JSON, and Async | *datos de prueba (mock data)*, glossed each time; *primero caché, después red*; *condición de carrera*; *encadenamiento opcional*; *Chengdú* with an accent (confirm place-name convention) |
| 2.5 Web Components | *actualizada* (upgraded); *reasigna el objetivo* (retargeting); *contenido de respaldo* (slot fallback); *encapsulamiento* vs *encapsulación*; shadow root / light DOM untranslated; *información sobreimpresa (tooltip)*; *Encierra* (Wrap) |
| 2.6 Progressive Web Applications | *icono maskable/adaptable*; cache first, network first, stale-while-revalidate kept in English with glosses; *esqueleto de la app* (app shell); *insignia*; *zona segura*; *redirección de puertos* |
| 2.7 Git Collaboration | *issue* kept as a loanword (no gloss); *conflicto de fusión*; *revisión de código*; *quien mantiene el proyecto* (maintainer); *release* kept, feminine (*una release*); *aplastar y fusionar* / *rebasar y fusionar* (Squash / Rebase and merge) |
| 2.8 AI as a Development Assistant | *prompt* kept with gloss *instrucciones para la IA*; *alucinación*; *recuadro* vs *región*; *reacomodo (reflow)*; *firma* (API signature); example prompts left in English |
| 2.9 Production Frontend Application | Spanish course titles for 2.1–2.8 coined here (check them); *módulo de idioma* (locale module); service worker, router and app shell left in English; *Versionado semántico*; *Proyecto final de la Fase 2* |
| 3.1 Web3D Fundamentals | Mesh (traducido como "malla" entre paréntesis); Renderer ("renderizador"); "field of view/FOV" como "campo de visión"; "roughness/metalness" como "rugosidad/metalicidad" |
| 3.2 A-Frame Foundations | "vection" traducido como "vección" (poco usado en español, verificar); "entity-component system" como "sistema de entidades y componentes"; "look-controls"/"wasd-controls" se dejaron sin traducir por ser nombres de componentes |
| 3.3 Advanced A-Frame and Interaction | "gaze/fuse cursor" traducido como "cursor de mirada/fusión"; "region dinámica" para live region (ya en glosario, confirmar consistencia); "tick()"/"remove()" se dejaron como nombres de métodos sin traducir |
| 3.4 Three.js Foundations | "draw call" traducido como "llamada de dibujo"; "dispose/disposal" como "liberar/liberación (de memoria)"; "frame-rate independent" como "independiente de la velocidad de cuadros"; nombres de métodos (tick, setAnimationLoop, getDelta) sin traducir |
| 3.5 Three.js Interaction, Assets, and Animation | "bounding box" como "caja delimitadora"; "normalised device coordinates (NDC)" como "coordenadas de dispositivo normalizadas (NDC)"; "raycasting" se dejó sin traducir (uso técnico establecido); "cross-fade" como "mezclar de forma gradual" |
| 3.6 Performance Engineering for Web3D | "hysteresis" traducido como "histéresis"; "draw call" sigue como "llamada de dibujo" (consistente con 3.4); "level of detail (LOD)" se dejó como "nivel de detalle" con la sigla LOD sin traducir |
| 3.7 Phase 3 Capstone: Interactive Web3D Experience | "brief" y "rubric" se dejaron como "brief" y "rúbrica"; "release notes"/"CHANGELOG" como "notas de versión"/CHANGELOG sin traducir el nombre de archivo; "budget" (performance) como "límite" |
| 1.1 Fundamentos de WebXR | espacio de referencia (reference space); activación transitoria (transient activation); "Enter VR"/"Exit VR" mantenidos en inglés como etiquetas de UI |
| 1.2 Entrada e interacción en XR | targetRayMode: gaze/tracked-pointer/screen/transient-pointer sin traducir; "far"/"direct" interaction como "a distancia"/"directa"; "grip"/"hit-test"/"dwell-time" mantenidos en inglés como términos técnicos |
| 1.3 Diseño de UX espacial | world-locked/body-locked/view-locked traducidos como "anclado al mundo/al cuerpo/a la vista"; yaw/pitch/roll mantenidos en inglés entre paréntesis; "rig"/"dolly" sin traducir |
| 1.4 Accesibilidad y ética en experiencias inmersivas | "W3C Group Note"/"W3C Recommendation" sin traducir (nombres de estatus formal); XAUR sin traducir; "necesidad de usuario" para XAUR user need |
| 1.5 Audio espacial, medios y presencia | distance models linear/inverse/exponential sin traducir; "cue"/"cuechange" sin traducir (términos de la API TextTrack); PannerNode/AudioContext/AudioListener sin traducir |
| 1.6 Proyecto final de la Fase 4: Experiencia web inmersiva | "brief"/"rúbrica" (consistente con 3.7); "capstone" traducido como "proyecto final"; testing matrix como "matriz de pruebas" |
| 5.1 Backend and API Foundations | path traversal (dejado en inglés con gloss "recorrido de rutas"); preflight (gloss "verificación previa") |
| 5.2 Authentication and User Accounts | bearer token (dejado en inglés con gloss "token portador"); rate limit ("límite de intentos"); scrypt$N$r$p$saltHex$hashHex format kept verbatim |
| 5.3 Databases and Spatial Application Data | "prepared statements" como "sentencias preparadas"; "junction table" como "tabla de unión"; N+1 queries dejado en inglés/número |
| 5.4 Real-Time and Multi-User Applications | "exponential backoff with full jitter" traducido con gloss "retroceso exponencial con jitter completo"; "upgrade" (WebSocket) dejado en inglés con gloss "actualización"; sanitize/sanear |
| 5.5 Security and Privacy for Spatial Applications | STRIDE categories translated with Spanish gloss in parentheses per glossary instruction (Spoofing/suplantación, Tampering/manipulación, Repudiation/repudio, Information disclosure/divulgación de información, Denial of service/denegación de servicio, Elevation of privilege/elevación de privilegios); CSRF/XSS/IDOR/CSP/scrypt/HttpOnly/SameSite kept in English with gloss per task instructions |
| 5.6 AI for Spatial Computing | "hallucination"/"hallucination check" traducido como "alucinación"/"comprobación de alucinaciones" (término ya establecido en IA en español); "mock provider" como "proveedor simulado"; single-tenant dejado en inglés con gloss |
| 5.7 Advanced PWA and Offline Spatial Delivery | "scene bundle" como "paquete de escena"; OPFS/Cache API/Background Sync dejados en inglés con gloss; "regional mirror" como "espejo regional" |
| 5.8 Phase 5 Capstone: Full-Stack Spatial Application | "capstone" traducido como "proyecto final" (consistente con 3.7/1.6); brief/rúbrica sin traducir (consistente); canView dejado como nombre de función sin traducir |
| 6.1 Production Deployment and DevOps | pipeline (no traducido, de uso común); dry run; runner autoalojado (self-hosted); staging vs. producción |
| 6.2 Internationalization and Localization | i18n / l10n (no traducidos, siglas de uso común); billboarding; pseudolocalización; tofu boxes -> "cajas de tofu" |
| 6.3 Open Source, Standards, and Technical Leadership | Community Group / Working Group (no traducidos, nombres propios de W3C); explainer (no traducido); Recommendation Track; decision record -> "registro de decisión" |
| 6.4 Career Development and Professional Practice | trade-off -> "compromiso (trade-off)"; buffer -> "margen (buffer)"; "not legal advice" -> "esto no es asesoría legal" (mantenido exacto) |
| 6.5 Instructor and Mentor Preparation | worked example -> "ejemplo resuelto"; mentee (no traducido, de uso común); hub page -> "página central" |
| 7.1 Capstone Research and Definition | brief (no traducido, de uso común); elevator pitch (no traducido); stakeholder -> "parte interesada" |
| 7.2 Experience and System Design | wireframe (no traducido); user journey -> "recorrido de usuaria"; scene graph -> "grafo de escena" |
| 7.3 Capstone Prototype | draw call (no traducido); prototype -> "prototipo"; switch device -> "dispositivo de conmutador (switch)" |
| 7.4 Capstone Production | changelog -> "registro de cambios"; build checklist -> "lista de verificación de compilación"; build -> "compilación" |
| 7.5 Testing, Launch, and Presentation | case study -> "caso de estudio"; retrospective -> "retrospectiva"; release checklist -> "lista de verificación de lanzamiento" |

## Chinese: terms to check

| Lesson | Terms |
| --- | --- |
| 0.1 Welcome | 格式 → 转换成纯文本; 「文本编辑」 |
| 0.2 Computer Fundamentals | Windows, File Explorer, Finder, and Safari menu labels; Firefox "Help and Report" left in English; 显示窗口键 |
| 0.3 Internet and the Web | 网站托管; 域名注册商; 协议（scheme）; 渐进增强; 实时区域 |
| 0.4 History of the Web | 自适应网页设计 vs 响应式网页设计; era names; 万维网 vs 网页 vs 网络; the Yinghaiwei billboard slogan (usually quoted as 中国人离信息高速公路有多远: check a source before quoting) |
| 0.5 History of Web3D | 经久的标准; 共享、沉浸与性能; 对比实验室; 开发者布道师; 3D 界的 JPEG |
| 0.6 The Spatial Web | 空间网络 for "spatial web"; 故事 as the "The story" heading; 晕动症 |
| 0.7 Organizations | 社区组; 说明文档 (explainer); 广泛审查; organisation glosses; Xiaoqian Wu's titles; the ambiguous "that last group" |
| 0.8 Ethics | 欺骗性设计模式 and pattern names; POUR as 可感知 / 可操作 / 可理解 / 健壮; UNICAMP gloss 坎皮纳斯州立大学 |
| 0.9 Careers | 技术美术; 开发者布道师与教育者; 尚未开始 / 已经起步 / 有信心 |
| 1.2 Accessible Forms | 报名表单 / 报名参加项目; 新闻简报; 占位文字; 冗余输入 (3.3.7); 成功标准; 河畔社区中心 gloss; 自闭症人士; W3C Brasil 网页无障碍专家组 |
| 1.3 CSS Foundations | 优先级 (specificity); 设计变量（tokens）; 字号比例 / 间距比例; 页眉色带; 减少动态效果; Chen Hui Jing（陈慧晶）name order; Talk.CSS 聚会 |
| 1.4 Responsive Web Design | 响应式 (not 自适应); 移动优先; 流式标题; 容器查询; 触摸目标; 测试记录; grid and flexbox in English in running text |
| 1.5 Web Accessibility Foundations | 审查 (audit); 不无障碍的网站 in the summary (maybe 存在无障碍问题的网站); 减少动态效果; 转子 (VoiceOver rotor); 阅读控制 (TalkBack); "Full" glossed 已满 |
| 1.6 JavaScript Foundations | 项目浏览器 (maybe 项目查询器); 仪表板; 模板字面量; 空状态; 防抖; 实时区域; Loiane Groner's titles; 圣埃斯皮里图州 |
| 1.7 Developer Tools | 缺陷 vs Bug vs 错误; 缺陷报告; 单步跳过; 代码检查工具 (linter); 无障碍名称; DevTools panel names in English with glosses; Marian Villa's GDE titles |
| 1.8 Git, GitHub, and Publishing | 仓库 / 提交 / 克隆 / 推送 / 拉取 / 获取; 复刻（fork）; 拉取请求 vs "pull request" / PR; 许可协议; 署名 and **Credits**（致谢）; 知识共享; 开放源代码促进会; 双重身份验证; the added 「也不要用中文」 in step 3 (keep or remove) |
| 1.9 Web Developer Portfolio | Title 第一阶段结业项目 - Web 开发者作品集 (结业 vs 毕业; Web vs 网页); 案例研究; 3D 展厅 / 展板; 后备方案; 视觉风格; 网络节流; 深蓝绿色、赤陶色、暖沙色; HTML 现行标准; 网页无障碍倡议 (WAI) |
| 1.1 Modern JavaScript | 回调（callback，沿用英文括注）; live region 译为「实时区域」（与 glossary 一致，但请确认「实时区域」与后续课程一致使用）; committer 译为「提交者」 |
| 2.1 The Document Object Model and Dynamic Interfaces | 事件委托 (event delegation); 冒泡 (bubbling); 空值合并运算符 (nullish coalescing, ??) |
| 3.1 Application Architecture and Maintainable Code | 代码异味 (code smell); 重构 (refactor); 魔法数字 (magic number); 死代码 (dead code); 观察者模式；跨站脚本攻击 (cross-site scripting) |
| 4.1 APIs, JSON, and Asynchronous Applications | 竞态条件 (race condition); 模拟数据 (mock data); 并行数组 (parallel array); 可选链 (optional chaining); 半正矢公式 (haversine formula) |
| 5.1 Web Components | shadow DOM/shadow root（保留英文术语，未强行意译）; light DOM（保留英文）; part（保留英文，未译作「部件」）; 自定义元素 (custom element); 自定义事件 (custom event); 重新指向 (retarget) |
| 6.1 Progressive Web Applications | 应用外壳 (app shell); 可遮罩图标 (maskable icon); 过期重验证 (stale-while-revalidate); 安全上下文 (secure context); 不透明响应 (opaque response) |
| 7.1 Git Collaboration and Open Source | fork（保留英文，未译作「分叉仓库」以外的其他说法）; 上游 (upstream); 语义化版本号 (semantic versioning); 维护者/贡献者 (maintainer/contributor) |
| 8.1 AI as a Development Assistant | 幻觉 (hallucination); 提示词 (prompt，沿用 glossary 既定译法); 开放权重模型 (open-weight model); 本地模型 (local model) |
| 9.1 Phase 2 Capstone - Production Frontend Application | 性能预算 (performance budget); 评分标准 (rubric); 生产级 (production); 复数规则 (plural rules); 语义化版本号 (semantic versioning) |
| 1.0 Web3D Fundamentals | 组（Group，used for both scene-graph "children" grouping and A-Frame concept); 场景图列表 (scene graph list) rendered as UI name |
| 2.0 A-Frame Foundations | 基本元素标签 (primitive, chose descriptive translation over transliteration); 视动性眩晕 (vection); 字体图集 (font atlas) |
| 3.0 Advanced A-Frame and Interaction | 注视/凝视选择光标 (gaze/fuse cursor); 位置音频 (positional audio); 射线检测器 (raycaster) |
| 4.0 Three.js Foundations | 绘制调用 (draw call); 帧率无关 (frame-rate independent); 色调映射 (tone mapping); 释放/dispose 译作「释放（资源）」 |
| 5.0 Three.js Interaction, Assets, and Animation | 归一化设备坐标 (normalised device coordinates, NDC); 数据贴图 (data texture) vs 颜色贴图 (colour texture); 署名信息 (attribution, chose over "归属") |
| 6.0 Performance Engineering for Web3D | 滞后 (hysteresis); 细节层次 (level of detail, LOD); 懒加载 (lazy loading/lazy-load) |
| 7.0 Phase 3 Capstone - Interactive Web3D Experience | 项目说明 (brief); 评分标准 (rubric); 毕业项目 (capstone, consistent with frontend-engineer/09) |
| 4.1 WebXR Foundations | secure context; reference space; local-floor; transient activation; seated mode; Immersive Web Emulator |
| 4.2 XR Input and Interaction | target ray mode; grip pose; transient-pointer; hit-test; haptic actuator; dwell-time gaze selection |
| 4.3 Spatial UX Design | world-locked; body-locked; view-locked; angular size; teleport locomotion; smooth movement vignette; personal-space boundary; design rationale |
| 4.4 Immersive Accessibility and Ethics | W3C Group Note vs Recommendation; XAUR; forced camera movement; personal-space boundary; informed consent; camera personalization |
| 4.5 Spatial Audio, Media, and Presence | PositionalAudio; AudioListener; AudioContext suspended/resume; CanvasTexture vs VideoTexture; WebVTT; TextTrack cuechange |
| 4.6 Phase 4 Capstone: Immersive Web Experience | play-space boundary; testing matrix; release notes/CHANGELOG; camera personalization consent; caption anchored to visitor |
| 1.1 Backend and API Foundations | path traversal（路径穿越）; preflight（预检）; JSON Lines |
| 1.2 Authentication and User Accounts | bearer token（持有即生效令牌）; synchronizer-token pattern（同步器令牌模式）; session fixation（会话固定）; timing side channel（时序侧信道） |
| 1.3 Databases and Spatial Application Data | prepared statement（预处理语句）; junction table（关联表）; N+1 queries（N+1 查询问题） |
| 1.4 Real-Time and Multi-User Applications | WebSocket upgrade（WebSocket 升级）; exponential backoff with jitter（带抖动的指数退避）; defense in depth（深度防御） |
| 6.1 Production Deployment and DevOps | CI/CD pipeline 流水线; environment 环境; required reviewers 必需的审核人; release dashboard 发布仪表盘; dry run 演练; staging 预发布环境; rollback 回滚 |
| 1.5 Security and Privacy for Spatial Applications | STRIDE threat model（STRIDE 威胁模型）; CSRF, XSS, IDOR, CSP, scrypt, HttpOnly, SameSite kept in English with first-use Chinese gloss per instructions; data minimisation（数据最小化） |
| 6.2 Internationalization and Localization | i18n/l10n 国际化/本地化; script maximization 脚本最大化; pseudo-localization 伪本地化; draft translation 草稿翻译; billboarding 始终朝向相机; font stack 字体栈 |
| 1.6 AI for Spatial Computing | provider-neutral module（不依赖服务商的模块）; hallucination（AI 幻觉）; de jure/de facto standard（法定/事实标准） |
| 6.3 Open Source, Standards, and Technical Leadership | Community Group 社区组; Working Group 工作组; explainer 说明文档; CLA 贡献者许可协议; decision record 决策记录; SPDX identifier SPDX 标识符; code of conduct 行为准则 |
| 6.4 Career Development and Professional Practice | career package 职业材料包; case study 案例分析; not legal advice 这不是法律建议; range plus a buffer 区间加缓冲量; proposal 提案; schema.org structured data schema.org 结构化数据 |
| 1.7 Advanced PWA and Offline Spatial Delivery | Origin Private File System（源私有文件系统，OPFS）; Background Sync API（后台同步 API）; HTTP range requests（HTTP 范围请求） |
| 6.5 Instructor and Mentor Preparation | worked example 实例讲解; checkable objectives 可检验的目标; mentor plan 导师计划; cadence 节奏; code of conduct 行为准则; escalation step 升级处理步骤 |
| 1.8 Phase 5 Capstone - Full-Stack Spatial Application | brief and rubric（任务说明与评分标准，沿用课程惯例译法）; canView（所有权/可见性检查函数名，保留英文） |
| 7.1 Capstone Research and Definition | capstone brief 毕业设计简报; stakeholder map 利益相关方图谱; scope 范围; mentor approval 导师批准; partner project 合作方项目; elevator pitch 电梯演讲 |
| 7.2 Experience and System Design | user journey 用户旅程; wireframe 线框图; spatial layout 空间布局; scene graph 场景图; data model 数据模型; API sketch API 草图; security and privacy plan 安全与隐私计划; test plan 测试计划 |
| 7.3 Capstone Prototype | prototype 原型; test log 测试日志; design review 设计评审; draw call 绘制调用; performance budget 性能预算 |
| 7.4 Capstone Production | build checklist 构建检查清单; user guide 用户指南; changelog 变更日志; mid-build review 中期构建复查; scope cut 削减范围 |
| 7.5 Testing, Launch, and Presentation | release checklist 发布检查清单; case study 案例分析; presentation outline 展示大纲; retrospective 复盘; public repository 公开仓库 |

## Review status

| Lesson | Spanish reviewed | Chinese reviewed |
| --- | --- | --- |
| 0.1 Welcome to XR Camp | [ ] | [ ] |
| 0.2 Computer Fundamentals | [ ] | [ ] |
| 0.3 The Internet and the Web | [ ] | [ ] |
| 0.4 History of the Web | [ ] | [ ] |
| 0.5 History of Web3D | [ ] | [ ] |
| 0.6 The Spatial Web | [ ] | [ ] |
| 0.7 Organizations Building the Future | [ ] | [ ] |
| 0.8 Ethics, Accessibility, Privacy, and Responsible AI | [ ] | [ ] |
| 0.9 Careers in the Spatial Web | [ ] | [ ] |
| 1.1 HTML Foundations | [ ] | [ ] |
| 1.2 Accessible Forms | [ ] | [ ] |
| 1.3 CSS Foundations | [ ] | [ ] |
| 1.4 Responsive Web Design | [ ] | [ ] |
| 1.5 Web Accessibility Foundations | [ ] | [ ] |
| 1.6 JavaScript Foundations | [ ] | [ ] |
| 1.7 Developer Tools, Debugging, and Testing | [ ] | [ ] |
| 1.8 Git, GitHub, and Publishing | [ ] | [ ] |
| 1.9 Web Developer Portfolio | [ ] | [ ] |
| 2.1 Modern JavaScript | [ ] | [ ] |
| 2.2 The DOM and Dynamic Interfaces | [ ] | [ ] |
| 2.3 Application Architecture | [ ] | [ ] |
| 2.4 APIs, JSON, and Async | [ ] | [ ] |
| 2.5 Web Components | [ ] | [ ] |
| 2.6 Progressive Web Applications | [ ] | [ ] |
| 2.7 Git Collaboration and Open Source | [ ] | [ ] |
| 2.8 AI as a Development Assistant | [ ] | [ ] |
| 2.9 Production Frontend Application | [ ] | [ ] |
| 3.1 Web3D Fundamentals | [ ] | [ ] |
| 3.2 A-Frame Foundations | [ ] | [ ] |
| 3.3 Advanced A-Frame and Interaction | [ ] | [ ] |
| 3.4 Three.js Foundations | [ ] | [ ] |
| 3.5 Three.js Interaction, Assets, and Animation | [ ] | [ ] |
| 3.6 Performance Engineering for Web3D | [ ] | [ ] |
| 3.7 Phase 3 Capstone - Interactive Web3D Experience | [ ] | [ ] |
| 4.1 WebXR Foundations | [ ] | [ ] |
| 4.2 XR Input and Interaction | [ ] | [ ] |
| 4.3 Spatial UX Design | [ ] | [ ] |
| 4.4 Immersive Accessibility and Ethics | [ ] | [ ] |
| 4.5 Spatial Audio, Media, and Presence | [ ] | [ ] |
| 4.6 Phase 4 Capstone - Immersive Web Experience | [ ] | [ ] |
| 5.1 Backend and API Foundations | [ ] | [ ] |
| 5.2 Authentication and User Accounts | [ ] | [ ] |
| 5.3 Databases and Spatial Application Data | [ ] | [ ] |
| 5.4 Real-Time and Multi-User Applications | [ ] | [ ] |
| 5.5 Security and Privacy for Spatial Applications | [ ] | [ ] |
| 5.6 AI for Spatial Computing | [ ] | [ ] |
| 5.7 Advanced PWA and Offline Spatial Delivery | [ ] | [ ] |
| 5.8 Phase 5 Capstone - Full-Stack Spatial Application | [ ] | [ ] |
| 6.1 Production Deployment and DevOps | [ ] | [ ] |
| 6.2 Internationalization and Localization | [ ] | [ ] |
| 6.3 Open Source, Standards, and Technical Leadership | [ ] | [ ] |
| 6.4 Career Development and Professional Practice | [ ] | [ ] |
| 6.5 Instructor and Mentor Preparation | [ ] | [ ] |
| 7.1 Capstone Research and Definition | [ ] | [ ] |
| 7.2 Experience and System Design | [ ] | [ ] |
| 7.3 Capstone Prototype | [ ] | [ ] |
| 7.4 Capstone Production | [ ] | [ ] |
| 7.5 Testing, Launch, and Presentation | [ ] | [ ] |
