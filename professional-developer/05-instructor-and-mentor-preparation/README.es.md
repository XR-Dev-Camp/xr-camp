# Preparación para instructoría y mentoría

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `professional-developer` · **Lección:** `instructor-and-mentor-preparation-05` · **Tiempo:** unas 8 horas · 11 sesiones de 45 minutos · unas 3 semanas con 4 sesiones por semana

---

> Escribe una lección corta en el formato de XR Camp, o un plan de mentoría, y prepárate para contribuirlo de vuelta.

---

## Objetivos de aprendizaje

Al terminar este proyecto podrás:

1. Escribir objetivos de aprendizaje lo bastante específicos para comprobarse, no solo para sentirse ciertos.
2. Planificar sesiones de 45 minutos que cada una termine en algo que quien aprende pueda ver, hacer clic, o volver a leer, nunca una sesión que solo termine en "lee sobre X."
3. Escribir un ejemplo resuelto (worked example) que enseñe mostrando una pieza real y funcional de lo terminado, con el razonamiento incluido.
4. Adaptar material de enseñanza para aprendizaje accesible y de bajo ancho de banda: subtítulos, lenguaje sencillo, y materiales que funcionen sin conexión una vez descargados.
5. Describir qué requiere un espacio de aprendizaje inclusivo y seguro, incluyendo un código de conducta real y una forma real de manejar el daño cuando ocurre.
6. Dar retroalimentación específica y amable, sobre el trabajo y no sobre la persona, de una forma que alguien principiante pueda realmente aplicar.
7. Diseñar una estructura de mentoría simple: cadencia, forma de la sesión, y límites claros.
8. Explicar cómo una lección o un plan de mentoría terminados se convierten en una contribución real de vuelta a XR Camp.

## Requisitos previos

- **Curso 6.4: Desarrollo profesional y práctica profesional** — esta lección asume que ya sabes escribir con claridad sobre tu propio trabajo real.
- Haber completado al menos una fase anterior de XR Camp, para tener experiencia de primera mano de haber sido enseñada en este formato antes de escribirlo tú misma.
- Aquí no se introduce ningún lenguaje de programación nuevo; las herramientas son la escritura, HTML simple, y, para el ejemplo que estudia esta lección, A-Frame, que ya usaste en fases anteriores.

## Herramientas necesarias

| Herramienta | Propósito | Costo |
| --- | --- | --- |
| Un editor de texto (por ejemplo, VS Code) | Escribir tu lección o plan de mentoría | Gratis |
| Un navegador moderno | Ver cualquier página HTML que construyas, y probar impresión/exportación | Gratis |
| Un servidor local (el mismo usado en todo este curso) | Ver páginas por `http://`, no por `file://` | Gratis |

Esta lección no requiere ninguna cuenta de pago, registro ni suscripción en ningún momento.

## Lo que vas a construir

Un entregable de enseñanza real, a tu elección: una lección corta, escrita por completo en el formato de XR Camp que este curso ha usado desde la Fase 1, o un plan de mentoría para guiar a una persona real o realistamente imaginada que aprende. En cualquier caso, la meta no es un ejercicio de simulación: una lección que escribas aquí podría convertirse genuinamente en una lección real de XR Camp algún día, y un plan de mentoría debería describir una mentoría que realmente podrías dar.

La solución de referencia está en [`completed/`](completed/): Ana escribió ambas, para mostrar cómo se ve cada una terminada. Su lección de ejemplo, "Shapes and Colour," es una lección diminuta y completamente accesible de A-Frame que pasa cada comprobación del propio pipeline de este curso, incluido `pa11y`. Tu proyecto starter tiene **12 TODOs numerados** repartidos entre las dos plantillas y la página central (hub).

## Guía de carpetas

```text
05-instructor-and-mentor-preparation/
├── README.md
├── starter/                        # begin here
│   ├── lesson-template/            # TODOs 1-9: choose this to write a lesson
│   ├── mentor-plan-template.md     # TODOs 10-11: choose this to write a mentor plan
│   └── index.html                  # TODO 12: your hub page
├── completed/                      # reference solution (Ana wrote both)
│   ├── example-lesson/             # Ana's finished tiny lesson
│   └── mentor-plan.md              # Ana's finished mentor plan
├── challenges/                     # Three challenges: Foundation is required
├── tests/                          # self-review checklist
├── assets/
└── screenshots/
```

## Configuración

1. Abre `starter/index.html` a través del servidor local que usa este curso.
2. Lee una vez, por completo, [`.github/CODE_OF_CONDUCT.md`](../../.github/CODE_OF_CONDUCT.md) y [`.github/CONTRIBUTING.md`](../../.github/CONTRIBUTING.md) antes de empezar; ambos son cortos, y esta lección vuelve a partes específicas de cada uno.
3. Decide cuál de los dos entregables vas a escribir. El Reto 3 es el único lugar donde se te pide intentar también el otro.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Paso 1: qué hace que una lección o plan de mentoría realmente funcione: objetivos, y sesiones que terminan en algo visible | Objetivos de aprendizaje en borrador para tu propio tema, y una descripción de una línea de en qué terminará cada sesión de tu lección |
| 2 | Paso 2: elige tu camino, y copia la plantilla correspondiente (TODO 6, o inicio del TODO 10) | Una carpeta `lesson-template/` copiada o `mentor-plan-template.md`, con sus metadatos completados |
| 3 | Paso 3: enseñanza accesible y de bajo ancho de banda (TODOs 1, 4) | Una revisión en lenguaje sencillo de tus objetivos, y una nota de bajo ancho de banda para tu material |
| 4 | Paso 4: escribe tu ejemplo resuelto y, si escribes una lección, tus TODOs de starter (TODOs 2-3, 7) | Un archivo starter o documento con TODOs reales y numerados para tus propias futuras personas que aprenden |
| 5 | Paso 4, continuación: construye tu referencia completada | Un `completed/index.html` funcional, o un documento de plan completado |
| 6 | Paso 5: espacios de aprendizaje inclusivos y seguros (TODO 5) | Una referencia al código de conducta y un paso de escalamiento escrito, específico para tu entregable |
| 7 | Paso 6: dar retroalimentación (TODO 11) | Una sección de retroalimentación específica y accionable, probada dando retroalimentación real sobre la lección de ejemplo de Ana |
| 8 | Paso 7: estructuras de mentoría (TODOs 10-11) | Un plan de cadencia de sesiones, incluso si tu entregable principal es una lección, no un plan de mentoría |
| 9 | Paso 8: retos y lista de verificación (TODO 9) | Tus propios `challenges/challenge-1.md` a `challenge-3.md`, y `tests/checklist.md` |
| 10 | Paso 9: revisión de accesibilidad y `pa11y` (TODO 8, si tu entregable tiene una página completada) | Una página que pasa una comprobación local WCAG 2.2 AA |
| 11 | [`tests/checklist.md`](tests/checklist.md), un reto de extensión, y luego **Cómo entregar tu trabajo** | Una lección o plan de mentoría terminados y verificados, y tu página central `index.html` actualizada (TODO 12) |

### Paso 1: qué hace que una lección o plan de mentoría realmente funcione

Cada lección de XR Camp que has tomado hasta ahora comparte dos hábitos que vale la pena nombrar explícitamente ahora que estás por escribir una. Primero, sus objetivos de aprendizaje son comprobables: "coloca una forma y define su color" se puede confirmar mirando el trabajo terminado; "entender el 3D" no se puede. Segundo, cada sesión de 45 minutos termina en algo visible (una funcionalidad que funciona, una tabla completada, un elemento de lista de verificación aprobado), nunca solo en "lee sobre X," porque alguien principiante que no puede ver progreso al final de 45 minutos no tiene forma de saber si la sesión funcionó.

### Paso 2: elige tu camino, y empieza tu plantilla

`starter/lesson-template/` es una copia completa y vacía de la anatomía exacta de carpetas que usa cada lección real de XR Camp: `README.md`, `project.json`, `starter/`, `completed/`, `challenges/`, `tests/checklist.md`. `starter/mentor-plan-template.md` es un solo documento con las secciones que necesita un plan de mentoría: mentee y objetivo, estructura de sesiones, ejemplos resueltos, retroalimentación, mentoría accesible y de bajo ancho de banda, mentoría inclusiva y segura, y graduación. Copia el que corresponda a tu elección, y completa primero sus metadatos: un título, una estimación aproximada de tiempo, y, para una lección, un `project.json` con un `estimatedMinutes` preciso y un `schedule.sessions` que concuerden entre sí, la misma regla que [`.github/CONTRIBUTING.md`](../../.github/CONTRIBUTING.md) hace cumplir en cada lección real de este repositorio.

### Paso 3: enseñanza accesible, en lenguaje sencillo y bajo ancho de banda

Escribe para alguien principiante en su segundo o tercer idioma, con una conexión demasiado lenta para una videollamada grande: oraciones cortas, una idea por oración, y ningún tecnicismo introducido sin una explicación sencilla al lado la primera vez. Los subtítulos importan por la misma razón que los ejemplos resueltos: quien aprende nunca debería necesitar audio funcional para seguir el hilo, así que si tu lección o plan usa alguna explicación grabada, su forma escrita debe llevar el mismo contenido, no un resumen de él. Cada material al que apuntes debe funcionar sin conexión una vez descargado, la misma regla que todo este repositorio sigue para sus propias bibliotecas fijadas.

### Paso 4: un ejemplo resuelto, y, para una lección, TODOs de starter (TODOs 1-3, 7)

Un ejemplo resuelto enseña mostrando código real y funcional o un documento real y completado, con el razonamiento incluido, no algo terminado sin ninguna explicación, ni una explicación sin nada que señalar. Si estás escribiendo una lección, tu archivo starter necesita comentarios numerados `// TODO n: <qué y por qué>`, en el orden en que una persona que aprende los va a encontrar, la misma convención que usa cada lección modelo de este repositorio; tu archivo completado es el mismo archivo, terminado, más, si tiene algún contenido 3D, `id="scene-description"`, una ruta de teclado para cada interacción, y una comprobación de `prefers-reduced-motion` con un botón de pausa. El `completed/example-lesson/` de Ana muestra este patrón funcionando de principio a fin, en la escala más pequeña posible.

### Paso 5: espacios de aprendizaje inclusivos y seguros

Cada espacio de XR Camp, incluido el que estás por crear, está cubierto por [`.github/CODE_OF_CONDUCT.md`](../../.github/CODE_OF_CONDUCT.md): un entorno libre de acoso, comportamiento esperado e inaceptable, una dirección real de reporte, y notas específicas para espacios 3D y XR compartidos (respetar el espacio personal, no usar audio espacial para acosar, honrar los ajustes de comodidad de otra persona participante). Tu propia lección o plan de mentoría debe nombrar este documento, no reescribir una versión más corta de él, y debe decir en tus propias palabras qué pasa si alguien reporta daño: tú no lo investigas ni lo resuelves tú misma, y nombras un lugar real a donde debe ir el reporte.

### Paso 6: dar retroalimentación

La retroalimentación específica y amable nombra qué pasó y por qué importa, sin nombrar a la persona como el problema: "este encabezado se desborda de su contenedor a 320 píxeles de ancho" enseña algo; "tu layout está roto" no. La retroalimentación sobre trabajo correcto importa igual, y necesita la misma especificidad, para que quien aprende pueda repetir a propósito lo que funcionó. Practica esto directamente: escribe un párrafo de retroalimentación real sobre el `completed/example-lesson/` de Ana, nombrando una cosa que funciona y por qué, y una que cambiarías si fuera tu propia lección.

### Paso 7: estructuras de mentoría

Una relación de mentoría necesita una forma predecible: una cadencia acordada (el plan de ejemplo de Ana usa una sesión de 45 minutos cada dos semanas), una estructura de sesión que revise trabajo real en lugar de una descripción de él, y límites claros sobre contacto, horarios, y qué es y qué no es trabajo de la mentora arreglar. Escribe esta sección incluso si tu entregable principal es una lección, no un plan de mentoría: nombra, en dos o tres oraciones, cómo una mentora podría usar tu lección como un ejemplo resuelto dentro de una relación de mentoría más larga.

### Paso 8: retos, lista de verificación, y una comprobación local de accesibilidad (TODOs 8-9)

Escribe tus propios tres retos de extensión (Fundamento obligatorio, Creativo y Explorador opcionales) y tu propio `tests/checklist.md`, terminando con una sección "3D and XR (manual)" si tu lección tiene algún contenido 3D. Si tu entregable tiene un `completed/index.html`, pásalo por una comprobación local de `pa11y` antes de entregarlo, exactamente como lo requiere el propio estilo de casa de este curso para cada lección.

## Explicación del código clave

- **Objetivos comprobables.** Un objetivo expresado como una acción que quien aprende realiza sobre un artefacto real ("coloca una forma y define su color") se puede verificar mirando el trabajo terminado; un objetivo basado en sentimientos ("entender el 3D") no, y pertenece a una oración de resumen en su lugar.
- **`// TODO n: <qué y por qué>`.** Una convención de comentario numerado, compartida en cada archivo starter de este repositorio, para que quien aprende siempre sepa tanto qué construir como por qué importa, en el orden exacto en que va a encontrar cada paso.
- **`prefers-reduced-motion` más un botón de pausa.** El emparejamiento que este curso siempre requiere para cualquier cosa que se anime: la preferencia del sistema define el valor por defecto, y un control visible y etiquetado le permite a quien aprende anularlo en cualquier dirección (WCAG 2.2.2, 2.3.3).
- **Una referencia al código de conducta, no una reescritura.** Enlazar a `.github/CODE_OF_CONDUCT.md` mantiene una versión autoritativa de las reglas; una lección o plan de mentoría que en silencio escribe su propia versión más corta corre el riesgo de desalinearse de ella con el tiempo.
- **Un registro de decisión para tu propia elección de plantilla.** Nombrar, en una oración, por qué elegiste una lección o un plan de mentoría es una pequeña instancia del mismo hábito de "explica tu razonamiento, brevemente, por escrito" que enseñó el Curso 6.3 con sus registros de decisión.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| `starter/index.html` y `completed/index.html` declaran cada uno un idioma de documento y tienen un `<h1>` claro | 3.1.1, 2.4.6 | Las propias páginas centrales deben modelar el estándar que enseñan |
| Cualquier lista con estilo `list-style: none` conserva `role="list"` | 1.3.1 | Safari elimina la semántica implícita de lista en cuanto no tiene viñetas, a diferencia de otros navegadores |
| El propósito de cada enlace es claro por su propio texto | 2.4.4 | "El plan de mentoría de Ana" le dice a quien usa lector de pantalla qué va a obtener; "click here" no |
| El foco es visible en cada enlace y botón | 2.4.7 | Quienes usan teclado siempre deben ver dónde están |
| El contraste de color cumple AA en todas partes, incluida cualquier escena de ejemplo | 1.4.3 | Aplica igual a una página central y al ejemplo 3D de Ana |
| Cualquier página 3D que agregues tú o el ejemplo de tu lección tiene `id="scene-description"`, una ruta de teclado, una comprobación de `prefers-reduced-motion`, una alternativa 2D, y una cámara fija | Buena práctica; ver [`docs/en/xr-accessibility.md`](../../docs/en/xr-accessibility.md) | Las herramientas automatizadas no pueden ver dentro de un `<canvas>`, así que el contenido 3D necesita las mismas comprobaciones manuales que declara cada lección 3D de este repositorio |

## Consideraciones de rendimiento

El propio entregable de esta lección es texto, una pequeña página central, y un ejemplo diminuto anidado; nada de eso es pesado. Si el tema de tu propia lección incluye una escena 3D, aplica lo que ya enseñó el Curso 3.6: mide antes de optimizar, y declara cualquier número como "en mi máquina."

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Escribir un objetivo como un sentimiento ("entender la accesibilidad") | Nadie, incluida tú, puede comprobar si se cumplió | Exprésalo como una acción comprobable ("agrega una ruta de teclado funcional a una interacción 3D") |
| Una sesión que termina en "lee sobre X" | Alguien principiante no tiene forma de saber si la sesión funcionó | Termina cada sesión en algo visible: una funcionalidad, una tabla completada, una comprobación aprobada |
| Reescribir el código de conducta con tus propias palabras más cortas | La reescritura se desalinea de la real con el tiempo | Enlaza directamente a `.github/CODE_OF_CONDUCT.md`, y agrega solo lo que tu lección o plan específicos necesiten además de eso |
| Retroalimentación que nombra a la persona, no al trabajo | Quien aprende se pone a la defensiva en lugar de informarse | Nombra la línea, comportamiento, o decisión específica, y por qué importa |
| Omitir una referencia real al código de conducta en un plan de mentoría porque "es solo uno a uno" | La persona mentee no tiene ningún camino nombrado si algo sale mal específicamente con la mentora | Nombra la dirección de reporte y el paso de escalamiento explícitamente, incluso en un plan uno a uno |
| Construir un ejemplo resuelto 3D sin `#scene-description` ni ruta de teclado | Falla exactamente el estándar de accesibilidad que este repositorio entero exige a cada otra lección | Sigue `completed/example-lesson/` como un patrón mínimo y funcional |

## Solución de problemas

**El `schedule.sessions` de mi `project.json` no coincide con mi `estimatedMinutes`.** `sessions` debe ser igual a `estimatedMinutes / sessionMinutes`, redondeado hacia arriba, la misma regla que [`.github/CONTRIBUTING.md`](../../.github/CONTRIBUTING.md) hace cumplir en cada lección de este repositorio. Recalcula uno a partir del otro, y actualiza también la línea de tiempo al inicio de tu README.

**Mi comprobación de `pa11y` falla en un `<form>`.** Un elemento `<form>` necesita un botón de envío (regla H32 de pa11y); si tus controles solo están agrupados visualmente sin ningún envío real, usa un `<div>` o `<fieldset>` en lugar de `<form>`.

**Safari anuncia mi lista como texto plano, sin viñetas, sin rol "list".** Cualquier `<ul>` u `<ol>` con estilo `list-style: none` necesita un `role="list"` explícito; Chrome y Firefox mantienen la semántica implícita de lista de todas formas, que es exactamente por qué esta brecha es fácil de pasar por alto al probar en un solo navegador.

**El texto de mi A-Frame se ve mal para una etiqueta que no está en inglés.** La fuente de texto por defecto de A-Frame pierde los caracteres latinos acentuados y todos los caracteres chinos. Usa una superposición HTML o una etiqueta dibujada en canvas en lugar de `<a-text>` para cualquier cosa más allá de ASCII simple, la misma solución alternativa que usan los ejemplos resueltos de `docs/en/xr-accessibility.md`.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: consigue que una persona real pruebe tu lección o plan de mentoría, y registra su retroalimentación honesta.
2. **[Creativo](challenges/challenge-2.es.md)**: enraíza el tema de tu lección, tus ejemplos, o tu enfoque de mentoría en tu propio idioma, cultura o comunidad.
3. **[Explorador](challenges/challenge-3.es.md)**: escribe también el otro entregable, y haz referencia cruzada entre los dos.

## Cómo entregar tu trabajo

1. Trabaja [`tests/checklist.md`](tests/checklist.md) por completo.
2. Toma una captura de pantalla de la página completada de tu lección terminada, o de tu plan de mentoría.
3. Guárdalas en tu diario de aprendizaje y portafolio. Compártelas con otras personas que programan: consulta [dónde compartir tu trabajo y pedir ayuda](../../docs/en/community.md) (en inglés).
4. Pregunta de diario: ¿qué parte de escribir esto (los objetivos, el trabajo de accesibilidad, la sección de seguridad, o el lenguaje de retroalimentación) requirió más reescritura, y por qué?

## Lecturas adicionales

- [`.github/CONTRIBUTING.md`](../../.github/CONTRIBUTING.md) (en inglés) — las reglas exactas de anatomía y los diez requisitos de pull request que debe cumplir una contribución real
- [`.github/CODE_OF_CONDUCT.md`](../../.github/CODE_OF_CONDUCT.md) (en inglés) — el código de conducta que sigue cada espacio de XR Camp, incluido el tuyo
- [`docs/en/xr-accessibility.md`](../../docs/en/xr-accessibility.md) (en inglés) — las comprobaciones manuales de accesibilidad 3D y XR referenciadas en toda esta lección
- [W3C: Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/) (en inglés) — las explicaciones de criterios de conformidad que cita esta lección

## Mujeres que conviene conocer

**Camila Achutti**, una científica de la computación brasileña, empezó el blog "Mulheres na Computação" ("Mujeres en Computación") en 2010 mientras aún era estudiante de pregrado en el Instituto de Matemática y Estadística de la Universidad de São Paulo. Más tarde cofundó la empresa de educación tecnológica Mastertech en 2015, y fundó la organización sin fines de lucro de educación SOMA en 2019.

Empezar un proyecto de enseñanza siendo estudiante, antes de sentirse completamente calificada, y luego construir dos organizaciones separadas alrededor de la educación en la década siguiente, es cercano al arco exacto que esta lección te pide empezar: escribir ahora una pieza de material de enseñanza pequeña y honesta, con la expectativa de que el hábito de enseñar y mentorizar pueda crecer hasta algo mucho más grande.

> **Nota editorial: verificar antes de publicar.** Los datos biográficos de las secciones «Mujeres que conviene conocer» deben verificarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

Esta lección no introduce un estándar web nuevo; en cambio, te pide trabajar dentro de uno que este repositorio ya sigue de cerca: las Web Content Accessibility Guidelines (WCAG) 2.2 del W3C, mantenidas por el W3C Accessibility Guidelines Working Group. Cada requisito de accesibilidad que declaren tu propia lección o plan de mentoría debería citar un número real de criterio de conformidad de esa especificación, la misma disciplina que han usado los propios archivos README de este curso desde la Fase 1, un hábito que vale la pena llevar a cualquier material de enseñanza que contribuyas en cualquier lugar, no solo aquí.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
