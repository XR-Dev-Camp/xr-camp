# Diseño de experiencia y de sistema

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `capstone` · **Lección:** `experience-and-system-design-02` · **Tiempo:** unas 10.5 horas · 14 sesiones de 45 minutos · unas 4 semanas con 4 sesiones por semana

---

> Produce el diseño de producto y técnico completo.

---

## Objetivos de aprendizaje

Al terminar este proyecto podrás:

1. Convertir un brief aprobado en recorridos de usuaria concretos.
2. Esbozar wireframes para las pantallas o escenas que necesita tu proyecto final.
3. Diseñar el layout espacial de una escena 3D o XR, en papel, antes de construirla.
4. Dibujar un grafo de escena: las entidades, la jerarquía, y sus relaciones.
5. Diseñar un modelo de datos simple para el contenido de tu proyecto.
6. Esbozar la API que necesita tu front end, aunque sea una pequeña y local.
7. Escribir un plan de seguridad y privacidad apropiado para un proyecto pequeño de herramientas gratuitas.
8. Escribir un plan de pruebas que diga cómo vas a revisar accesibilidad, rendimiento, y localización más adelante.

## Requisitos previos

- **Etapa 7.1: Investigación y definición del proyecto final.** Necesitas un brief, mapa de partes interesadas, y aprobación de mentoría aprobados antes de que empiece esta etapa.
- **Curso 5.4: Aplicaciones en tiempo real y multiusuario**, y **Curso 5.5: Seguridad y privacidad para aplicaciones espaciales**, si tu proyecto final necesita alguno de los dos.

## Herramientas necesarias

| Herramienta | Propósito | Costo |
| --- | --- | --- |
| Un editor de texto | Completar las ocho plantillas de diseño | Gratis |
| Papel, o cualquier herramienta de dibujo que ya tengas | Esbozar wireframes y layouts espaciales antes de digitalizarlos | Gratis |
| Un servidor local, para el ejemplo completado | El mismo servidor que otras lecciones | Gratis |

No se necesitan herramientas de diseño de pago. Si prefieres una herramienta de diagramación, elige una con un nivel gratuito que funcione en China continental (por ejemplo, un programa de dibujo instalado localmente, o diagramas ASCII simples en Markdown, que es lo que usa cada plantilla aquí).

## Lo que vas a construir

Etapa 2 del Proyecto Final Profesional: el **diseño completo** de tu proyecto final aprobado, antes de escribir ningún código de producción. Vas a producir ocho documentos: recorridos de usuaria, guía de wireframes, un layout espacial, un grafo de escena, un modelo de datos, un esbozo de API, un plan de seguridad, y un plan de pruebas.

La solución de referencia en [`completed/`](completed/) continúa la exhibición del Museo Comunitario Aurora de Ana desde la Etapa 1: una sola sala de galería, un recorrido de visitante, y un modelo de datos pequeño y honesto para un puñado de objetos. [`completed/index.html`](completed/index.html) presenta los ocho documentos. El starter tiene las mismas ocho plantillas, con 10 TODOs repartidos entre ellas, más la rúbrica de esta etapa.

## Guía de carpetas

```text
02-experience-and-system-design/
├── README.md
├── project.json
├── starter/
│   ├── index.html            # Start page: links to every template below
│   ├── journeys.md            # TODOs 1–2: user journeys
│   ├── wireframes.md           # TODO 3: wireframe guidance and sketches
│   ├── spatial-layout.md       # TODO 4: the 3D/XR scene, on paper
│   ├── scene-graph.md          # TODO 5: entities and hierarchy
│   ├── data-model.md           # TODOs 6–7: your content's shape
│   ├── api.md                  # TODO 8: the API your front end calls
│   ├── security-plan.md        # TODO 9: security and privacy
│   ├── test-plan.md            # TODO 10: how you will test later stages
│   └── rubric.md               # How this stage is assessed
├── completed/                # Ana's filled-in design: open this last
├── challenges/                # Three challenges: Foundation is required
├── tests/checklist.md
├── assets/
└── screenshots/
```

## Configuración

1. Confirma que el `mentor-approval.md` de la Etapa 1 dice "Approved" o "Approved with changes" (con los cambios hechos) antes de empezar.
2. Copia `starter/` a tu espacio de trabajo de proyecto final, junto a tus documentos de la Etapa 1.
3. Abre `starter/index.html` a través de un servidor local, y lee primero [`starter/rubric.md`](starter/rubric.md).

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; vuelve a leer tu brief de la Etapa 1 | Una sesión de diseño que parte de tu alcance aprobado |
| 2 | Paso 1: recorridos de usuaria, parte 1 (TODO 1) | Un recorrido mapeado paso a paso |
| 3 | Paso 1, continuación (TODO 2) | Un segundo recorrido, para una parte interesada distinta |
| 4 | Paso 2: wireframes (TODO 3) | Un esbozo (en papel o digital) para cada pantalla o escena |
| 5 | Paso 3: layout espacial, parte 1 | Un plano aproximado de tu escena 3D/XR |
| 6 | Paso 3, continuación (TODO 4) | Un layout espacial con distancias y líneas de visión anotadas |
| 7 | Paso 4: grafo de escena (TODO 5) | Un árbol de cada entidad en tu escena y su padre |
| 8 | Paso 5: modelo de datos, parte 1 (TODO 6) | Una lista de cada tipo de contenido que necesita tu proyecto |
| 9 | Paso 5, continuación (TODO 7) | Campos y relaciones para cada tipo de contenido |
| 10 | Paso 6: esbozo de API (TODO 8) | Una lista corta de endpoints o funciones que llama tu front end |
| 11 | Paso 7: plan de seguridad y privacidad (TODO 9) | Un plan que nombra qué datos recolectas y cómo los proteges |
| 12 | Paso 8: plan de pruebas (TODO 10) | Un plan para pruebas de accesibilidad, rendimiento, y localización |
| 13 | [`tests/checklist.md`](tests/checklist.md); solicita aprobación de mentoría | Un diseño listo para su aprobación final |
| 14 | Un reto de extensión, y luego **Cómo entregar tu trabajo** | Un diseño de sistema aprobado |

### Paso 1: recorridos de usuaria (TODOs 1–2)

Abre [`starter/journeys.md`](starter/journeys.md). Un recorrido de usuaria es una secuencia numerada de pasos que da una persona real para alcanzar una meta: llegar, decidir qué hacer, actuar, e irse con algo que quería. Escribe un recorrido para tu audiencia primaria (TODO 1) y uno para una parte interesada distinta de tu mapa de la Etapa 1, como la persona que mantiene el proyecto (TODO 2).

### Paso 2: wireframes (TODO 3)

Abre [`starter/wireframes.md`](starter/wireframes.md). Un wireframe es un esbozo aproximado del layout de una pantalla o escena, sin colores ni pulido: cajas, etiquetas, y flechas. Esboza uno para cada pantalla o escena de tu alcance, en papel o en una herramienta simple, y luego describe cada esbozo con palabras en este archivo (una fotografía de un esbozo en papel, descrita con palabras, es perfectamente válida aquí; esta plantilla pide la descripción, no la imagen misma).

### Paso 3: layout espacial (TODO 4)

Abre [`starter/spatial-layout.md`](starter/spatial-layout.md). Para un proyecto final 3D o XR, planifica el espacio antes de construirlo: ¿dónde está la cámara o el punto de partida de quien visita, qué puede ver primero, qué tan separados están los objetos, y hacia dónde camina o mira después? Un plano ASCII simple, como los de `web3d-developer`, es suficiente.

### Paso 4: grafo de escena (TODO 5)

Abre [`starter/scene-graph.md`](starter/scene-graph.md). Un grafo de escena es un árbol: cada entidad en tu escena, y qué entidad es su padre. Dibujarlo antes de programar te dice, de antemano, qué se mueve junto (un hijo se mueve con su padre) y qué necesitará crear y actualizar tu código.

### Paso 5: modelo de datos (TODOs 6–7)

Abre [`starter/data-model.md`](starter/data-model.md). Lista cada tipo de contenido que necesita tu proyecto final (TODO 6); para Ana, esto es "objeto de exhibición," con campos como título, descripción, y material. Luego describe los campos y relaciones de cada tipo (TODO 7): qué es obligatorio, qué es opcional, y cómo se relacionan los tipos entre sí.

### Paso 6: esbozo de API (TODO 8)

Abre [`starter/api.md`](starter/api.md). Incluso un proyecto final sin servidor necesita saber qué datos pide su front end y cuándo. Esbózalo como una lista corta: un nombre de función o endpoint, qué necesita, y qué devuelve, ya sea un endpoint HTTP real o una función que lee un archivo JSON local.

### Paso 7: plan de seguridad y privacidad (TODO 9)

Abre [`starter/security-plan.md`](starter/security-plan.md). Nombra con claridad qué datos personales, si acaso, recolecta tu proyecto final, dónde se almacenan, y quién puede verlos. Un proyecto que no recolecta nada más allá de visitas anónimas debería decirlo explícitamente; esa es una respuesta válida, y a menudo la mejor, para un proyecto pequeño de herramientas gratuitas.

### Paso 8: plan de pruebas (TODO 10)

Abre [`starter/test-plan.md`](starter/test-plan.md). Anota, antes de que empiece la Etapa 3, cómo vas a probar el prototipo: qué comprobaciones de accesibilidad (lector de pantalla, teclado, movimiento reducido), qué presupuesto de rendimiento, y qué idiomas vas a revisar para la preparación de localización, aunque la traducción misma llegue después.

## Explicación del código clave

- **Recorrido de usuaria.** Una secuencia numerada de pasos que da una persona real, desde llegar con una meta hasta irse habiéndola alcanzado (o no, si también estás mapeando una ruta de fallo).
- **Grafo de escena.** Un árbol de entidades donde cada hijo hereda la posición y rotación de su padre, la misma estructura que usan A-Frame y three.js en tiempo de ejecución.
- **Modelo de datos.** La forma de tu contenido: qué tipos existen, qué campos tiene cada uno, y cómo se relacionan los tipos entre sí, independiente de cualquier base de datos o formato particular.
- **Esbozo de API.** La lista de solicitudes que hace tu front end, descritas por lo que necesitan y lo que devuelven, antes de decidir cómo se implementan.
- **Plan de seguridad y privacidad.** Una declaración corta y honesta de qué datos se recolectan, dónde viven, y quién puede acceder a ellos, incluso cuando la respuesta es "ninguno."

## Accesibilidad 3D y XR

Esta etapa planifica la accesibilidad en lugar de probarla, pero los planes importan: un layout espacial que asume solo entrada por puntero, o un grafo de escena sin una alternativa descrita para una escena visual, no puede volverse accesible después sin un rediseño. Mientras escribes `spatial-layout.md` y `scene-graph.md`, anota para cada interacción: ¿cómo se ve, y cuál es el equivalente de teclado o de botón? Tu `test-plan.md` debería listar las comprobaciones manuales específicas de 3D/XR (descripción de la escena, ruta de teclado, movimiento reducido, una alternativa 2D, comodidad) que vas a correr una vez que la Etapa 3 tenga un prototipo funcional.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| `completed/index.html` declara `lang="en"` | 3.1.1 Idioma de la página | La tecnología de asistencia necesita saber qué reglas de idioma aplicar |
| Los encabezados siguen un orden lógico en los ocho documentos enlazados | 1.3.1 Información y relaciones | Quienes usan lector de pantalla exploran los encabezados para navegar |
| Cada tabla tiene un `caption` y `<th scope>` | 1.3.1 Información y relaciones | La estructura de la tabla debe estar disponible programáticamente |
| Los enlaces describen su destino ("Lee el modelo de datos", no "click here") | 2.4.4 Propósito del enlace (en contexto) | El texto del enlace por sí solo debería decir qué es un documento |
| El contraste de color en todo el texto cumple 4.5:1 | 1.4.3 Contraste (mínimo) | El texto de bajo contraste es ilegible para muchas personas usuarias |

## Consideraciones de rendimiento

Los documentos de diseño no cuestan nada en tiempo de ejecución, pero las decisiones en `spatial-layout.md` y `scene-graph.md` definen el presupuesto de rendimiento de tu Etapa 3. Anota ahora una meta aproximada de triángulos y draw calls (como enseña `web3d-developer/06`), para que la Etapa 3 tenga un número contra el cual probar en lugar de adivinar después.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Diseñar pantallas antes de escribir el recorrido de usuaria | Las pantallas resuelven un problema que nadie pidió | Escribe primero el recorrido; deja que guíe qué debe mostrar cada pantalla |
| Saltarse el grafo de escena porque "es solo un objeto" | El código de la Etapa 3 no tiene ningún plan de cómo se relacionan los objetos, y crece enredado | Dibuja el árbol incluso para una escena pequeña; sigue siendo útil a medida que la escena crece |
| Un plan de seguridad que solo dice "nada de qué preocuparse" | Las prácticas reales de datos (analítica, almacenamiento local, formularios) quedan sin examinar | Lista cada lugar donde se recolectan o almacenan datos, aunque sea brevemente, antes de decidir que es de bajo riesgo |
| Escribir el plan de pruebas después de construir la Etapa 3 | Las pruebas se vuelven una ocurrencia tardía, y los problemas son caros de corregir | Escribe el plan de pruebas ahora, para que la Etapa 3 se construya teniéndolo en cuenta |
| Copiar un modelo de datos de un proyecto sin relación | Los campos que no encajan con tu contenido dificultan el trabajo posterior | Modela los campos reales de tu propio contenido, aunque la lista sea corta |

## Solución de problemas

**No sé cómo dibujar un grafo de escena.** Empieza desde arriba: tu `<a-scene>` o `Scene` de three.js. Agrega una línea por entidad, indentada bajo su padre. Si un objeto se mueve o rota junto con otro, es hijo de ese objeto.

**Mi modelo de datos sigue creciendo.** Vuelve a tu lista de "fuera de alcance" de la Etapa 1. Si un campo solo soporta algo que decidiste no construir, quítalo.

**No estoy segura de qué va en el esbozo de API si no tengo servidor.** Lista las funciones locales que cargan o guardan tu contenido (por ejemplo, "loadExhibits(): lee `data/exhibits.json`, devuelve un arreglo de objetos de exhibición"). La forma importa más que si es local o remota.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: Guía a una amiga o compañera de clase por tu recorrido de usuaria primario usando solo tus wireframes, y registra qué la confundió.
2. **[Creativo](challenges/challenge-2.es.md)**: Diseña una parte de tu layout espacial alrededor de una referencia cultural o comunitaria específica de tu propio contexto.
3. **[Explorador](challenges/challenge-3.es.md)**: Diseña tu modelo de datos para que pueda soportar un segundo idioma desde el primer día, y documenta cómo.

## Cómo entregar tu trabajo

1. Trabaja [`tests/checklist.md`](tests/checklist.md).
2. Toma una captura de pantalla de tu grafo de escena y tu layout espacial.
3. Guarda los ocho documentos en tu diario de aprendizaje y portafolio. Compártelos con otras personas que programan (consulta [dónde compartir tu trabajo](../../docs/en/community.md), en inglés).
4. Pregunta de diario: ¿cuál de tus ocho documentos cambió más entre tu primer borrador y tu versión aprobada por mentoría, y por qué?

## Lecturas adicionales

- [W3C WAI: Planning and Managing Web Accessibility](https://www.w3.org/WAI/planning-and-managing/) (en inglés)
- [OWASP: Threat Modeling](https://owasp.org/www-community/Threat_Modeling) (en inglés)
- [MDN: Heading hierarchy and semantic structure](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements) (en inglés)

## Mujeres que conviene conocer

Diana Trujillo es una ingeniera aeroespacial, nacida en Cali, Colombia, que emigró a Estados Unidos a los 17 años y pasó 14 años en el Laboratorio de Propulsión a Chorro (JPL) de la NASA trabajando en los róveres marcianos Curiosity y Perseverance, liderando el equipo que diseñó el brazo robótico de Perseverance. En febrero de 2021 condujo la primera transmisión en español de la NASA de un aterrizaje planetario, "Juntos perseveramos." En 2023 se convirtió en la primera latina certificada como directora de vuelo de la NASA en el Centro Espacial Johnson.

Un brazo robótico solo funciona porque todo su sistema (articulaciones, sensores, software, y las personas que lo operan) se diseñó en conjunto antes de construir una sola pieza. Esa es la disciplina que te pide esta etapa: recorridos, layout, datos, y seguridad, planificados como un solo sistema antes de escribir ningún código de producción.

_Datos de fuentes públicas, verificados en 2026. ¿Encontraste un error? [Avísanos](https://github.com/XR-Dev-Camp/xr-camp/issues)._

## Estándar destacado

La especificación **WAI-ARIA 1.2** del W3C y el **OWASP Top 10** (una lista mantenida por la comunidad de los riesgos de seguridad más comunes en aplicaciones web) vale la pena conocerlos en el momento del diseño. Los patrones ARIA te dicen, antes de programar, qué atributos de rol y estado va a necesitar un control personalizado; la lista de OWASP te dice contra qué planificar defensas en tu plan de seguridad, incluso para un proyecto pequeño de herramientas gratuitas.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
