# Translation review checklist

The Spanish (`es-419`) and Simplified Chinese (`zh-Hans`) lessons are drafts written with AI assistance. A lesson can move from `review` to `published` only after a native speaker has reviewed it. This file lists the choices the translators were unsure of, so reviewers can start there.

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
