# Fundamentos de accesibilidad web

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `web-developer` · **Lección:** `web-accessibility-foundations-05` · **Tiempo:** unas 10 horas · 14 sesiones de 45 minutos · unas 4 semanas con 4 sesiones por semana

---

> Audita y repara un sitio web inaccesible.

---

## Objetivos de aprendizaje

Al terminar este proyecto serás capaz de:

1. Auditar una página web con el teclado, un lector de pantalla, el zoom y herramientas automáticas.
2. Explicar cada problema que encuentres: qué es, a quién afecta y qué criterio de conformidad de las WCAG 2.2 no cumple.
3. Corregir problemas de estructura, imágenes, enlaces, formularios, color, foco y movimiento.
4. Usar un lector de pantalla para moverte por encabezados, enlaces, regiones y campos de formulario.
5. Explicar qué pueden encontrar las herramientas automáticas y qué no.
6. Escribir un reporte de auditoría que ayude a las personas a arreglar las cosas.

## Requisitos previos

- **Curso 0.8: Ética, accesibilidad, privacidad e IA responsable.** Conoces POUR y la idea de una auditoría.
- **Cursos 1.1–1.4.** Ya construiste estructura accesible, formularios, estilos y diseños adaptables.

## Herramientas necesarias

| Herramienta | Para qué sirve | Costo |
| --- | --- | --- |
| Tu teclado | La prueba más importante | Gratis |
| Un lector de pantalla: [NVDA](https://www.nvaccess.org/) (Windows), VoiceOver (macOS y iPhone, ya incluido) o TalkBack (Android, ya incluido) | Escuchar la página | Gratis |
| La extensión de navegador [axe DevTools](https://www.deque.com/axe/devtools/) o [WAVE](https://wave.webaim.org/extension/) | Revisiones automáticas | Versiones gratuitas |
| [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) | Contraste de color | Gratis |

## Lo que vas a construir

Dos cosas:

1. **Una página reparada.** El punto de partida es la **página de eventos** de Riverside, construida a propósito con al menos quince problemas de accesibilidad. Tú encuentras cada uno y lo corriges.
2. **Un reporte de auditoría**, `audit.html`: una tabla con cada problema, el criterio de las WCAG que no cumple, a quién afecta y cómo lo corregiste.

La solución de referencia está en [`completed/`](completed/): la página reparada y la auditoría de Ana.

## Guía de carpetas

```text
05-web-accessibility-foundations/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html       # The inaccessible events page: audit and fix it
│   ├── centre-960.jpg, divider.svg
│   └── 3d-moment.html   # An inaccessible 3D scene, for the 3D moment
├── completed/
│   ├── index.html       # The repaired page
│   ├── audit.html       # Ana's audit report
│   └── 3d-moment.html   # The repaired 3D scene
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Configuración

1. Copia la carpeta `starter` de esta lección dentro de tu carpeta `xr-camp` y cámbiale el nombre a `accessibility-audit`.
2. Haz una copia de `index.html` llamada `original.html` y no la cambies nunca: al final vas a comparar con ella.
3. Crea un archivo `audit.html` vacío, con un encabezado y una tabla para tus hallazgos (copia la estructura del reporte del Curso 0.8).
4. Instala axe DevTools o WAVE, y enciende tu lector de pantalla una vez para comprobar que funciona.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; lee **Para quién es esto** | Tu carpeta de auditoría lista |
| 2 | Paso 1: prueba con el teclado | Hallazgos con el teclado |
| 3 | Paso 2: aprende a usar tu lector de pantalla | Puedes moverte por encabezados y enlaces |
| 4 | Paso 2: prueba con el lector de pantalla | Hallazgos con el lector de pantalla |
| 5 | Paso 3: zoom, color y movimiento | Hallazgos visuales |
| 6 | Paso 4: herramientas automáticas | Hallazgos de las herramientas, y lo que se les escapó |
| 7 | Paso 5: escribe el reporte | Una tabla de auditoría completa |
| 8 | Paso 6: corrige la estructura: idioma, título, encabezados, regiones | Una página con un esquema claro |
| 9 | Paso 6: corrige imágenes, enlaces y color | Texto alternativo y enlaces con sentido |
| 10 | Paso 6: corrige la tabla y el formulario | Una tabla que se puede leer y un formulario que se puede usar |
| 11 | Paso 6: corrige el foco, el movimiento y el contraste | Una página que puedes usar y leer |
| 12 | Paso 7: vuelve a probar y compara con `original.html` | Todos los hallazgos corregidos |
| 13 | El **Momento 3D** | Una escena 3D auditada y reparada |
| 14 | [`tests/checklist.md`](tests/checklist.md), un reto y **Cómo entregar tu trabajo** | Una página reparada y un reporte |

### Para quién es esto

Alrededor de una de cada seis personas en el mundo vive con una discapacidad importante, y muchas más tienen limitaciones temporales o de situación: un brazo roto, sol muy fuerte, un lugar con mucho ruido, una conexión lenta. Una auditoría de accesibilidad hace una sola pregunta una y otra vez: **¿quién no puede usar esto, y por qué?**

Los cuatro principios de las WCAG del Curso 0.8 ordenan las respuestas: **perceptible**, **operable**, **comprensible** y **robusto**.

### Paso 1: la prueba con el teclado

Aparta el mouse. En `index.html`:

1. Presiona **Tab** desde el principio. ¿Hay un enlace de salto? ¿Puedes **ver** dónde está el foco en todo momento?
2. ¿Puedes llegar a **todo** aquello en lo que podrías hacer clic? ¿Puedes usarlo con **Enter** o con la **barra espaciadora**?
3. ¿El foco se mueve en un **orden lógico**, de arriba abajo?

Anota cada problema y dónde ocurrió.

### Paso 2: la prueba con el lector de pantalla

Primero aprende los comandos básicos de tu lector de pantalla:

| Acción | NVDA (Windows) | VoiceOver (Mac) | TalkBack (Android) |
| --- | --- | --- | --- |
| Encender o apagar | **Ctrl + Alt + N** para iniciar, **Insert + Q** para salir | **⌘ + F5** | Configuración → Accesibilidad → TalkBack |
| Leer el siguiente elemento | **↓** | **Control + Option + →** | Desliza hacia la derecha |
| Siguiente encabezado | **H** | **Control + Option + ⌘ + H** | Elige «Encabezados» en los controles de lectura y luego desliza hacia abajo |
| Mostrar todos los encabezados o enlaces | **Insert + F7** | **Control + Option + U** (el rotor) | Controles de lectura |
| Activar | **Enter** | **Control + Option + Espacio** | Toca dos veces |

Después escucha la página. Pregúntate: ¿hay un título de página y un encabezado principal? ¿Puedo moverme por encabezados? ¿Cada imagen dice algo útil, o nada en absoluto si es decorativa? ¿Cada enlace tiene sentido por sí solo? ¿Cada campo del formulario dice qué es?

La primera vez con un lector de pantalla te va a parecer extraña y rápida. Baja la velocidad de la voz en su configuración y ten paciencia: así es como muchas de las personas que usan tus páginas leen cada página.

### Paso 3: zoom, color y movimiento

1. **Haz zoom al 200 %** y luego al 400 %. ¿Algo queda cortado o encimado?
2. **Revisa cada color de texto** con el verificador de contraste: 4.5:1 para el texto normal.
3. **¿Alguna información se da solo con el color?** Imagina la página en blanco y negro.
4. **¿Algo se mueve** durante más de cinco segundos? ¿Puedes pausarlo? ¿Se detiene cuando la opción de «reducir movimiento» está activada en la configuración de tu sistema?

### Paso 4: herramientas automáticas

Ejecuta axe DevTools o WAVE en la página. Encuentran algunos problemas rápido y de forma confiable, como texto alternativo que falta, etiquetas que faltan, contraste bajo o un idioma de página que falta, y vale la pena usarlas en cada página que construyas.

Pero fíjate en lo que **no pueden** encontrar: si el texto alternativo **tiene sentido**, si las palabras de un enlace se entienden, si el color es la única pista, si el orden del foco es **lógico**. Las herramientas automáticas solo encuentran una parte de los problemas de accesibilidad. El resto requiere a una persona.

### Paso 5: escribe el reporte

Para cada problema, escribe una fila:

| # | Problema | WCAG 2.2 | A quién afecta | Corrección |
| --- | --- | --- | --- | --- |
| 5 | La foto no tiene texto alternativo | 1.1.1 | Personas ciegas y con baja visión | Un texto alternativo que diga lo importante: la rampa |

Describe el efecto en las **personas**, no solo la regla. Un reporte que dice «no cumple 1.1.1» es correcto; uno que dice «las personas ciegas que visitan la página no pueden saber que hay una entrada sin escalones» es el que se corrige.

Busca cada criterio en [WCAG 2.2 at a glance](https://www.w3.org/WAI/standards-guidelines/wcag/glance/) (las WCAG 2.2 de un vistazo) y en las páginas «Understanding» (Comprender) del W3C, que explican cada criterio en lenguaje sencillo.

### Paso 6: corrígelo todo

Corrige la página, un hallazgo a la vez, en el orden de tu reporte. Numera cada corrección en un comentario HTML para que coincida con tu reporte, como hace la solución de referencia. Ya sabes hacer casi todo gracias a los Cursos 1.1 a 1.4.

Dos correcciones que pueden ser nuevas:

- **Contenido en movimiento:** la corrección más simple para un banner que se desplaza es dejarlo quieto. Si el movimiento es esencial, agrega un botón de pausa y respeta `prefers-reduced-motion`.
- **`tabindex` positivo:** bórralo. `tabindex="0"` (se alcanza en el orden natural) y `tabindex="-1"` (solo se alcanza con un script) son útiles; cualquier número mayor que cero rompe el orden para todo el mundo.

### Paso 7: vuelve a probar

Repite los Pasos 1 a 4 en tu página reparada. Luego abre `original.html` y tu `index.html` reparado uno al lado del otro, con tu lector de pantalla encendido. Escuchar la diferencia es la mejor forma de entender lo que hiciste.

## Explicación del código clave

**`alt=""`.** Un alt vacío les dice a los lectores de pantalla que la imagen es decorativa, así que la saltan. No poner `alt` en absoluto es distinto: muchos lectores de pantalla leen entonces el nombre del archivo.

**`role="status"`.** Una región dinámica, como `aria-live="polite"`: el mensaje de agradecimiento se anuncia cuando aparece, sin mover el foco.

**`<th scope="row">`.** La primera celda de cada fila también es un encabezado, así que un lector de pantalla dice «Community lunch, Places, Full» (almuerzo comunitario, lugares, lleno).

**La primera regla de ARIA:** si un elemento HTML nativo hace el trabajo, úsalo. `<button>` siempre es mejor que `<span role="button" tabindex="0">`, porque ya funciona con el teclado y con todas las tecnologías de asistencia.

## Momento 3D

Abre [`starter/3d-moment.html`](starter/3d-moment.html) y audítalo como la página de eventos. Es un logotipo 3D que gira sin parar, no tiene descripción y solo cambia de color cuando le haces clic con el mouse. Encuentra al menos tres problemas. Luego compara con [`completed/3d-moment.html`](completed/3d-moment.html), donde:

1. una **descripción en texto** dice qué hay en la escena, y se actualiza cuando cambia;
2. un **botón** real hace lo mismo que hacer clic en el cubo, así que se puede alcanzar con el teclado;
3. el giro es **más lento**, se puede **pausar** y empieza en pausa para las personas que piden movimiento reducido.

Las herramientas automáticas no pueden ver nada dentro de una escena 3D, así que toda auditoría 3D es una auditoría manual. Vas a volver a usar esta lista de verificación en las Fases 3 y 4: [`docs/en/xr-accessibility.md`](../../docs/en/xr-accessibility.md).

## Requisitos de accesibilidad

Tu página reparada debe cumplir cada punto de [`tests/checklist.md`](tests/checklist.md), incluidos estos criterios de conformidad de las WCAG 2.2:

| Requisito | WCAG 2.2 |
| --- | --- |
| Las imágenes tienen alternativas en texto adecuadas | 1.1.1 |
| La estructura está en el HTML: encabezados, tablas, etiquetas, regiones | 1.3.1 |
| El color no es la única forma de distinguir algo | 1.4.1 |
| El contraste del texto es de al menos 4.5:1 | 1.4.3 |
| Todo funciona con el teclado | 2.1.1 |
| El contenido en movimiento se puede pausar | 2.2.2 |
| Un enlace de salto permite saltar el contenido repetido | 2.4.1 |
| La página tiene un título descriptivo | 2.4.2 |
| El orden del foco es lógico | 2.4.3 |
| El propósito de cada enlace es claro | 2.4.4 |
| El foco es visible | 2.4.7 |
| El idioma de la página está indicado | 3.1.1 |
| Los campos del formulario tienen etiquetas | 3.3.2 |
| Los controles exponen su nombre y su rol | 4.1.2 |

## Consideraciones de rendimiento

Las correcciones de accesibilidad casi no cuestan nada en rendimiento: los elementos HTML reales son más ligeros que los `div` con scripts, y quitar la animación infinita ahorra batería y procesamiento en todos los dispositivos.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Confiar en una puntuación automática | Muchos problemas quedan sin encontrar | Prueba siempre con el teclado y con el lector de pantalla |
| `alt="image"` o un nombre de archivo | Ruido, no información | Di lo que importa, o usa `alt=""` |
| Agregar ARIA para arreglar un botón hecho con `div` | Frágil, y todavía incompleto | Usa un `<button>` real |
| Corregir el aspecto pero no el código | «Full» (lleno) en rojo y negritas: sigue siendo solo color | Dilo con palabras |
| Reportar solo el número de la regla | Nadie entiende el impacto | Di a quién afecta, y cómo |

## Solución de problemas

**Mi lector de pantalla habla encima de todo.** Presiona **Ctrl** para que NVDA o VoiceOver dejen de hablar. Baja la velocidad de la voz en su configuración.

**Los comandos de teclado de VoiceOver no hacen nada.** Revisa que VoiceOver esté encendido (**⌘ + F5**) y mantén presionadas **Control + Option** junto con las otras teclas.

**La herramienta automática dice que la página está bien, pero no lo está.** Esa es la lección. Confía en tu teclado y en tus oídos.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: graba un recorrido de tu página reparada usando solo el teclado.
2. **[Creativo](challenges/challenge-2.es.md)**: agrega subtítulos y una transcripción a un video corto sobre tu comunidad.
3. **[Explorador](challenges/challenge-3.es.md)**: escribe una declaración de accesibilidad para tu sitio.

## Cómo entregar tu trabajo

1. Completa todos los puntos de [`tests/checklist.md`](tests/checklist.md).
2. Toma una captura de pantalla de tu tabla de auditoría, y otra del resultado de la herramienta automática en tu página reparada.
3. Guárdalas en tu diario de aprendizaje y en tu portafolio: un reporte de auditoría es una pieza fuerte para un portafolio. Compártelas con otras personas que programan: consulta [dónde compartir tu trabajo y pedir ayuda](../../docs/en/community.md) (en inglés).
4. En tu diario, responde: ¿qué escuchaste con el lector de pantalla que te sorprendió?

## Lecturas adicionales

- [W3C: Easy checks, a first review of web accessibility](https://www.w3.org/WAI/test-evaluate/preliminary/) (en inglés): revisiones fáciles, un primer repaso de la accesibilidad web.
- [W3C: WCAG 2 at a glance](https://www.w3.org/WAI/standards-guidelines/wcag/glance/) (en inglés): las WCAG 2 de un vistazo.
- [WebAIM: Using NVDA to evaluate web accessibility](https://webaim.org/articles/nvda/) (en inglés): cómo usar NVDA para evaluar la accesibilidad web.
- [WebAIM: Using VoiceOver to evaluate web accessibility](https://webaim.org/articles/voiceover/) (en inglés): cómo usar VoiceOver para evaluar la accesibilidad web.
- [W3C: Stories of web users](https://www.w3.org/WAI/people-use-web/user-stories/) (en inglés): historias de personas que usan la web.

## Mujeres que conviene conocer

**Shaomei Wu** fue científica investigadora en Facebook e Instagram, donde fue la autora principal de la investigación que diseñó y puso en marcha el texto alternativo automático de Facebook: descripciones de fotos generadas para las personas ciegas que usan lectores de pantalla. Más tarde fundó **AImpower.org**, que dirige: una organización sin fines de lucro de Estados Unidos que construye tecnología junto con comunidades marginadas, como las personas que tartamudean.

El texto alternativo automático es justo el tipo de ayuda del que trata esta lección, y también un recordatorio de su límite: una máquina puede decir «dos personas sonriendo al aire libre», pero solo una persona que conoce el contexto puede escribir «la entrada sin escalones del centro».

> **Nota editorial — verificar antes de publicar.** Las afirmaciones biográficas de las secciones Mujeres que conviene conocer deben contrastarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

Las WCAG 2.2 se organizan en **criterios de conformidad** con tres niveles: A, AA y AAA. La mayoría de las leyes y políticas exigen el **nivel AA**, que es el que busca XR Camp. El W3C también publica **WAI-ARIA**, los atributos como `aria-describedby` y `aria-pressed` que ya usaste, y su guía para usarlos bien.

## Licencia

Código: [`LICENSE-CODE`](../../LICENSE-CODE) · Contenido: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
