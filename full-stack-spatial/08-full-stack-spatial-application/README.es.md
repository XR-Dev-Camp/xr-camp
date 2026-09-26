# Proyecto final de la Fase 5 - Aplicación espacial full-stack

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `full-stack-spatial` · **Lección:** `full-stack-spatial-application-08` · **Tiempo:** unas 25 horas · 34 sesiones de 45 minutos · unas 9 semanas con 4 sesiones por semana

> **Esta es una lección más larga (34 sesiones).** Avanza paso a paso: cada sesión termina igual con algo que hiciste, y está bien tomar un descanso corto entre pasos.

---

> Combina cada lección de la Fase 5 en una sola aplicación espacial full-stack, revisada y con la seguridad corregida, con un borrador de descripción por IA opcional y notas de despliegue para localhost o un servidor pequeño.

## Objetivos de aprendizaje

Al terminar este proyecto podrás:

1. Combinar el código de servidor de varias lecciones (una API, cuentas, una base de datos, salas en tiempo real, y una revisión de seguridad) en una sola aplicación en funcionamiento, sin reescribir lo que ya funciona.
2. Leer un brief y una rúbrica antes de escribir código, y comprobar el trabajo terminado contra las filas de la rúbrica en lugar de una sensación general de "terminado".
3. Agregar una función nueva a una base de código ya asegurada sin reabrir ninguna de sus vulnerabilidades corregidas: reutilizar la misma verificación de propiedad, la misma función de saneamiento, y la misma regla CSRF que ya usa cada otra escritura.
4. Explicar por qué una función de IA que escribe a una base de datos necesita un paso de revisión humana, y construir uno donde un borrador nunca pueda llegar por sí solo al almacenamiento.
5. Escribir notas de despliegue para una pequeña aplicación que nombren qué cambia, y qué no debe cambiar, entre ejecutarla en tu propia computadora y ejecutarla en un servidor pequeño que controlas.
6. Explicar la diferencia entre una función que está terminada y una función que está terminada *y* todavía pasa cada prueba escrita previamente.
7. Escribir notas de versión que describan lo que en verdad ofrece una versión específica de un proyecto, para alguien que no estuvo presente mientras se construía.

## Requisitos previos

- **Curso 5.5: Seguridad y privacidad para aplicaciones espaciales**: este proyecto final parte del servidor corregido de esa lección, sin cambios: texto saneado, una Política de Seguridad de Contenido estricta, un secreto cargado desde el entorno, una verificación de IDOR, errores genéricos, y datos de ubicación minimizados.
- **Curso 5.3: Bases de datos y datos de aplicaciones espaciales** y **Curso 5.4: Aplicaciones en tiempo real y multiusuario**: el esquema de escenas guardadas y la sala de chat en tiempo real que sigue usando sin cambios el servidor de este proyecto final.
- **Curso 5.6: IA para computación espacial**: el diseño neutral respecto al proveedor (un proveedor "mock", y nunca guardar una respuesta de IA sin revisión) que sigue la propia función nueva de este proyecto final.
- Comodidad leyendo y extendiendo código de servidor que no acabas de escribir desde cero; la mayor parte de esta lección es integración, no arquitectura nueva.

## Herramientas necesarias

| Herramienta | Propósito | Costo |
| --- | --- | --- |
| Node.js 22.5 o posterior (se recomienda la LTS "24 Krypton") | Ejecuta el servidor, incluido `node:sqlite` | Gratis |
| npm (viene con Node.js) | Instala la única dependencia de esta lección, `ws` | Gratis |
| Un editor de texto (por ejemplo, VS Code) | Leer y completar el código del servidor y del cliente | Gratis |
| Un navegador (Chrome, Firefox, Safari o Edge) | Usar la aplicación que construyes | Gratis |

Node.js se puede descargar desde [nodejs.org](https://nodejs.org/); estudiantes en China continental también pueden usar el [espejo de Node.js de npmmirror](https://registry.npmmirror.com/binary.html?path=node/). Si `npm install` va lento, ejecuta en su lugar `npm install --registry=https://registry.npmmirror.com`.

## Lo que vas a construir

Este es el noveno y último paso de la **exhibición cultural virtual** que la Fase 5 ha construido una lección a la vez, y, a diferencia de cada lección anterior, esta te pide unir las piezas en lugar de agregar una nueva por su cuenta. Tanto `starter/` como `completed/` empiezan desde el servidor ya corregido del Curso 5.5: una API con validación y variables de entorno (5.1), cuentas con contraseñas con hash y sesiones (5.2), escenas y anotaciones guardadas en SQLite (5.3), una sala de chat compartida en tiempo real sobre WebSockets (5.4), y cada una de las siete correcciones de seguridad de 5.5, todas en su lugar, sin cambios, y ya probadas. Nada de eso es un TODO aquí.

Lo que agrega este proyecto final es una función propia, pequeña y opcional: un **borrador de descripción por IA** para una escena, siguiendo la regla del Curso 5.6 de que un borrador nunca se guarda por sí solo. Un proveedor "mock" determinista y sin conexión construye una descripción corta a partir del propio nombre y las anotaciones de una escena (sin llamada de red, sin costo, y nada inventado que no estuviera ya ahí), y una persona debe leerla, opcionalmente editarla, y elegir Save antes de que se escriba en la base de datos. Seis TODOs numerados (8-13, continuando después de los 1-7 de 5.5, que ya están corregidos) conectan esta función de principio a fin: [`server/ai.js`](starter/server/ai.js) construye el borrador, [`server/routes.js`](starter/server/routes.js) y [`server/server.js`](starter/server/server.js) lo exponen y enrutan, y [`js/ai.js`](starter/js/ai.js) y [`js/main.js`](starter/js/main.js) lo llaman desde el navegador. [`completed/`](completed/) es la referencia terminada. Lee [`starter/brief.md`](starter/brief.md) y [`starter/rubric.md`](starter/rubric.md) antes de empezar; este proyecto final, como el del Curso 3.7, empieza con un brief.

Más allá del código, este proyecto final también pide los dos documentos que necesita un proyecto pequeño real antes de que nadie más lo ejecute: [`deployment-notes.md`](deployment-notes.md), que explica cómo ejecutar esto en tu propia computadora o en un servidor pequeño que controlas, sin ningún servicio de pago requerido en ninguno de los dos casos, y `CHANGELOG.md`, que describe lo que en verdad ofrece esta versión.

## Guía de carpetas

```text
08-full-stack-spatial-application/
├── README.md
├── deployment-notes.md        # running this on localhost, or a small server you control
├── starter/                   # begin here: brief.md, rubric.md, and 6 numbered TODOs (8-13)
│   ├── brief.md
│   ├── rubric.md
│   ├── index.html, styles.css
│   ├── js/                    # main.js, net.js, scene.js (carried over from 5.5, unchanged); ai.js (TODO 12)
│   ├── SECURITY.md
│   ├── CHANGELOG.md
│   └── server/
│       ├── migrations/                                    # numbered .sql files, run in order; 004 is new
│       ├── auth.js, cookies.js, sessions.js, rateLimit.js, wsAuth.js, rooms.js, realtime.js  # carried over, unchanged
│       ├── db.js, validation.js, sanitize.js, config.js, env.js                              # carried over, unchanged
│       ├── ai.js                                          # this capstone's new module (TODO 8)
│       ├── routes.js                                      # carried over, plus TODO 9 and TODO 10
│       ├── server.js                                      # carried over, plus TODO 11
│       ├── server.test.js
│       ├── package.json, .env.example, .gitignore
│       └── data/                                          # created at runtime, never committed
├── completed/                 # reference solution
│   ├── index.html, styles.css, js/, server/
│   ├── SECURITY.md, CHANGELOG.md
├── challenges/                # Three challenges: Foundation is required
├── tests/                     # self-review checklist
├── assets/
└── screenshots/
```

## Configuración

1. Lee primero [`starter/brief.md`](starter/brief.md) y [`starter/rubric.md`](starter/rubric.md).
2. `cd starter/server`.
3. `npm install` (instala exactamente `ws@8.21.3`, fijado en el `versions.json` del repositorio; no se incluye ningún archivo de bloqueo en el repositorio).
4. Copia `.env.example` a `.env` y establece tu propio `APP_SECRET` (nunca reutilices el valor de ejemplo).
5. `npm start`, y luego abre la dirección que imprime en un navegador.
6. En una segunda terminal, `npm test` desde la misma carpeta. Ocho de las diez pruebas ya deberían pasar; esas son las del Curso 5.5, heredadas. Las últimas dos, para la propia función de borrador de descripción por IA de este proyecto final, pasarán una vez que termines los TODOs 8-13.
7. Abre `starter/index.html` en tu editor junto con el recorrido de abajo.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Lee `brief.md` y `rubric.md`; revisa por encima las carpetas terminadas de 5.1-5.7 para ver qué reutiliza este proyecto final. | Una nota breve sobre qué ya está hecho, y qué todavía necesitan los TODOs 8-13. |
| 2 | Configura `starter/server` (`npm install`, `.env`, `npm start`) y confirma que la aplicación heredada corre sin cambios. | La aplicación del starter corriendo en `http://127.0.0.1:8891`. |
| 3 | Lee por completo `server/routes.js` y `server/db.js`: cuentas, escenas, y anotaciones. | Notas sobre `canView`, y sobre qué función comprueba la propiedad frente a cuál solo lee. |
| 4 | Lee `server/realtime.js`, `server/rooms.js`, y la Política de Seguridad de Contenido de `server/server.js`. | Notas sobre cómo ya funcionan tanto la sala de chat en tiempo real como el encabezado CSP. |
| 5 | Ejecuta `npm test`; confirma que las ocho pruebas heredadas pasan antes de escribir cualquier código nuevo. | Un punto de partida conocido y bueno, por escrito (una corrida de pruebas exitosa). |
| 6 | Crea una cuenta, crea una escena, agrega una anotación, y envía un mensaje de chat. | Toda la aplicación heredada, usada una vez, de principio a fin, por ti. |
| 7 | Lee los comentarios de `server/ai.js` y la sección "Borradores de descripción por IA, con revisión" de este README. | Una idea clara de qué debe hacer `describeScene` antes de que la escribas. |
| 8 | Paso 3: implementa la ruta mock de `describeScene` en `server/ai.js` (TODO 8). | `describeScene` devuelve un borrador real para una escena sin anotaciones. |
| 9 | Confirma que `describeScene` también maneja una escena que tiene anotaciones, y rechaza un proveedor no soportado. | Una descripción que menciona el texto de la anotación, y un error claro lanzado en el otro caso. |
| 10 | Paso 4: implementa el manejador de ruta de `describeScene` en `server/routes.js` (TODO 9). | `POST /api/scenes/:id/describe` devuelve un borrador para la dueña de la escena. |
| 11 | Confirma que la misma ruta devuelve 404 para una escena que esta cuenta no puede ver, coincidiendo con `getScene`. | La ruta de borrador tan estricta como ya lo es cada otra ruta de escena. |
| 12 | Paso 5: implementa el manejador de ruta de `saveDescription` en `server/routes.js` (TODO 10). | `PUT /api/scenes/:id/description` guarda una descripción saneada para la dueña. |
| 13 | Confirma que la misma ruta rechaza a quien no es dueña, incluso en una escena pública. | Una ruta de guardado más estricta que la ruta de lectura junto a la que se encuentra. |
| 14 | Paso 6: conecta ambas rutas nuevas en `server/server.js` (TODO 11). | Ambas rutas alcanzables por HTTP, no solo llamables como funciones. |
| 15 | Ejecuta `npm test`; confirma que la prueba de borrador de descripción pasa. | 9 de 10 pruebas en verde. |
| 16 | Ejecuta `npm test` de nuevo; confirma que la prueba de guardar descripción pasa. | 10 de 10 pruebas en verde. |
| 17 | Lee la conexión existente de cuentas, escenas, y chat de `js/main.js`. | Notas sobre el patrón `api()` y `showFieldErrors()` que reutilizarán los TODO 12-13. |
| 18 | Paso 7: implementa `requestDescriptionDraft` en `js/ai.js` (TODO 12, parte 1). | Una llamada de red funcional que puedes probar desde la consola del navegador. |
| 19 | Paso 7, continuación: implementa `saveDescription` en `js/ai.js` (TODO 12, parte 2). | Ambas funciones del cliente completas. |
| 20 | Paso 8 (parte 1): implementa `renderSavedDescription` en `js/main.js` (TODO 13, parte 1). | Una descripción guardada mostrada en la página una vez que existe una. |
| 21 | Paso 8, continuación (parte 2): conecta los botones Draft y Save en `js/main.js` (TODO 13, parte 2). | Toda la función funcionando con clics, en tu navegador. |
| 22 | Prueba manual: redacta una descripción, edítala, guárdala, y vuelve a abrir la escena para confirmar que persiste. | Una descripción que sobrevive a una recarga de página. |
| 23 | Prueba manual: confirma que una cuenta que puede ver pero no es dueña de una escena pública puede redactar, pero no guardar, una descripción para ella. | La regla de guardado exclusiva para la dueña confirmada a mano, no solo por la suite de pruebas. |
| 24 | Una pasada solo con teclado por el nuevo panel de descripción: Tab hacia ambos botones y el área de texto. | Toda la función confirmada como usable sin un mouse. |
| 25 | Lee `deployment-notes.md` por completo. | Una respuesta clara, en tus propias palabras, a "¿dónde podría realmente ejecutar esto?" |
| 26 | Lee `SECURITY.md` y `CHANGELOG.md`; edita la entrada `1.0.0` de `CHANGELOG.md` si tu compilación difiere. | Ambos documentos describiendo tu compilación con precisión. |
| 27 | Pasada de accesibilidad: `#scene-description`, regiones dinámicas, y orden de encabezados en toda la página. | Texto relevante para lector de pantalla confirmado como preciso al leerlo en voz alta tú misma. |
| 28 | Una pasada de movimiento reducido: confirma que la animación del marcador de escena empieza pausada cuando el sistema operativo lo pide. | Movimiento reducido comportándose correctamente en la emulación de tu navegador. |
| 29 | Prueba a 390 px y 1280 px; corrige cualquier desbordamiento horizontal. | Una página que funciona en ambos anchos. |
| 30 | Vuelve a leer `server/validation.js` y `server/sanitize.js`; confirma que el campo de descripción sigue las mismas reglas que cada otro campo guardado. | Confianza en que ningún campo de esta aplicación se valida o sanea distinto "por accidente". |
| 31 | Trabaja `tests/checklist.md` de principio a fin. | Cada casilla marcada, o una corrección para cada una que no lo esté. |
| 32 | Haz el reto Fundamento (`challenges/challenge-1.es.md`). | El reto obligatorio completo. |
| 33 | Elige Creativo o Explorador, y empiézalo. | Una primera versión funcional de tu extensión elegida. |
| 34 | Termina tu reto elegido; entrega final: capturas de pantalla, la lista de verificación revisada de nuevo, y tu pregunta de diario respondida. | Un proyecto final listo para entregar. |

### Paso 1: lee el brief y la rúbrica

Abre [`starter/brief.md`](starter/brief.md) y [`starter/rubric.md`](starter/rubric.md). Como el proyecto final del Curso 3.7, este empieza con un brief y una rúbrica en lugar de solo una lista de TODOs; lee ambos antes de escribir cualquier código.

### Paso 2: recorre el starter

Antes de tocar `server/ai.js`, lee `server/routes.js`, `server/db.js`, `server/realtime.js`, y `server/server.js`. Cada uno de estos archivos es el código corregido del Curso 5.5, sin cambios. Ejecuta `npm test` y confirma que las ocho pruebas pasan; este es tu punto de partida conocido y bueno.

### Paso 3: el proveedor mock de `server/ai.js` (TODO 8)

`describeScene(scene, annotations)` debe devolver `{ description, provider }` cuando `AI_PROVIDER` es `"mock"` (el valor por defecto), usando la función auxiliar ya escrita `mockDescription()`, y lanzar un `AiConfigError` que nombre al proveedor en cualquier otro caso. Este es el único archivo de este proyecto final que necesitaría cambiar para alcanzar a un proveedor de IA real; ver el comentario en su parte superior, y el reto Explorador de esta lección.

### Paso 4: el manejador de ruta de `describeScene` (TODO 9)

En `server/routes.js`, maneja `POST /api/scenes/:id/describe`: busca la escena, devuelve 404 a menos que `canView(scene, auth.user.id)` (la misma comprobación que ya usa `getScene` dos funciones más arriba), y luego llama a `describeScene` de `server/ai.js` y devuelve su resultado. Nunca dejes que esta función escriba nada en la base de datos.

### Paso 5: el manejador de ruta de `saveDescription` (TODO 10)

Maneja `PUT /api/scenes/:id/description`: comprueba `requireCsrf`, y luego exige `scene.ownerId === auth.user.id`; más estricto que el Paso 4, a propósito, porque leer una escena pública y escribir en ella son permisos distintos. Valida el cuerpo, pásalo por `sanitizeText` exactamente igual que hace `createAnnotation`, y llama a `updateSceneDescription`.

### Paso 6: conectando las rutas nuevas (TODO 11)

En `server/server.js`, empareja las rutas nuevas y llama a `requireAuth`, y luego a las dos funciones de los Pasos 4-5, siguiendo exactamente el patrón que ya usa cada otra ruta autenticada de este archivo.

### Paso 7: las llamadas de red del cliente (TODO 12)

En `js/ai.js`, `requestDescriptionDraft` y `saveDescription` son dos llamadas `fetch()` con la misma forma que ya usa en otras partes de esta aplicación el propio auxiliar `api()` de `js/main.js`: una solicitud de borrador no necesita un token CSRF (solo lee), una solicitud de guardado sí (escribe).

### Paso 8: conectando el panel de descripción (TODO 13)

En `js/main.js`, `renderSavedDescription` muestra una descripción guardada con `textContent`, y dos escuchadores de clic llaman a las funciones del Paso 7 y manejan sus resultados de la misma forma que ya lo hace cada otro formulario de este archivo; construir o actualizar la descripción de una escena no es un caso especial, estructuralmente, respecto a crear una.

## Explicación del código clave

- **`canView` frente a verificaciones exclusivas de dueña**: la ruta de `describeScene` reutiliza la comprobación `canView` exacta de `getScene` (dueña o pública), porque leer un borrador es exactamente igual de sensible que leer la escena misma. `saveDescription` usa una comprobación más estricta (solo `scene.ownerId === auth.user.id`), porque escribir no lo es: una escena pública puede ser *leída* por cualquiera, pero solo su dueña puede cambiarla.
- **Un borrador que nunca guarda el archivo que lo construye**: el `describeScene` de `server/ai.js` solo devuelve un valor; nunca llama a una función de base de datos. La única función en toda esta aplicación que puede escribir una columna `description` es `updateSceneDescription` de `db.js`, llamada desde exactamente un lugar (`saveDescription` de `routes.js`), solo después de que una persona presiona Save.
- **El proveedor mock es determinista**: `mockDescription()` construye su frase solo a partir del propio `name` y `isPublic` de una escena, más el `text` ya saneado de sus anotaciones; la misma escena siempre produce el mismo borrador, y nada en el borrador dejaba de ser visible ya para quien lo solicitó.
- **Sanear una descripción guardada**: una descripción que una persona aprobó sigue siendo texto controlado por el usuario una vez que llega al servidor, así `saveDescription` la pasa por `sanitizeText` de `sanitize.js` (la misma función que ya usa `createAnnotation`) antes de que se guarde.
- **`ALTER TABLE`, no un ejecutor de migraciones nuevo**: `migrations/004_add_scene_description.sql` agrega una columna a la tabla `scenes` existente, ejecutada por el mismo ejecutor de migraciones que construyó el Curso 5.3; este proyecto final no necesitó código de base de datos nuevo para guardar un campo más.

## Accesibilidad 3D y XR

La vista 3D es la misma escena de A-Frame con cámara fija que introdujo el Curso 5.4: una caja y una etiqueta de texto que muestran cualquiera que sea la escena abierta, con un botón Pause/Resume para su rotación en reposo. Este proyecto final no agrega ningún elemento 3D nuevo; el panel de descripción es un formulario 2D, deliberadamente, porque una descripción es texto para leer, no algo que se beneficie de ser espacial. `#scene-description` sigue describiendo la escena abierta a partir de los mismos datos que usa la vista 3D; no repite una descripción de IA guardada, que tiene su propio texto visible en el panel de descripción en su lugar. Cada interacción (abrir una escena, agregar una anotación, redactar y guardar una descripción, enviar chat) tiene una ruta de teclado completa, y la lista 2D de detalle de escena junto a la vista 3D lleva cada dato que muestra la vista 3D.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| `#scene-description` se actualiza con la escena abierta | 1.1.1, 1.3.1 | Una persona que usa lector de pantalla obtiene los mismos datos que ve una persona vidente en la vista 3D. |
| El área de texto del panel de descripción tiene una etiqueta visible y programática | 1.3.1, 2.5.3 | Así una tecnología de asistencia, y una persona vidente escaneando rápido, saben ambas para qué es el campo. |
| Draft y Save son alcanzables y operables solo con teclado | 2.1.1 | Ninguno de los dos botones es una interacción 3D, pero ambos están dentro de un panel junto a una, y toda la ruta de teclado de esta aplicación debe permanecer intacta. |
| La rotación en reposo del marcador de escena empieza pausada bajo `prefers-reduced-motion: reduce` | 2.2.2 | El movimiento que se inicia solo debe poder pausarse o evitarse; esta aplicación evita iniciarlo en absoluto cuando el sistema operativo pide menos movimiento. |
| Los errores de campo están asociados con su campo y se anuncian | 4.1.3 (Buena práctica para la redacción exacta) | `showFieldErrors` escribe en un `role="list"` junto al control correspondiente, coincidiendo con cada otro formulario de esta aplicación. |

## Consideraciones de rendimiento

El proveedor mock de IA no hace ninguna llamada de red ni ningún cálculo significativo; construir un borrador es tan rápido como una concatenación de cadenas, así que este proyecto final no agrega ninguna preocupación de rendimiento propia. Cada consideración existente de 5.1-5.5 sigue aplicando sin cambios: sentencias preparadas para cada consulta, un límite de tasa en los intentos de inicio de sesión, y actualizaciones de posición (en la sala de chat) limitadas a una tasa razonable. Si completas el reto Explorador y alcanzas a un proveedor de IA real, presupuesta la latencia de red y, según el Curso 5.6, un pequeño límite de tasa sobre cuán seguido se puede hacer una llamada real.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Guardar un borrador directamente desde la ruta de `describeScene`, saltándose el paso de revisión | Una frase generada por IA llega a la base de datos sin que ninguna persona la haya leído nunca | Llama a `updateSceneDescription` solo desde `saveDescription`, después de que una persona presiona Save |
| Reutilizar la comprobación `canView` de `getScene` también para `saveDescription` | Cualquier cuenta que pueda ver una escena pública también podría sobrescribir su descripción | Usa solo `scene.ownerId === auth.user.id` para la ruta de guardado |
| Guardar la descripción con `innerHTML` en el cliente | Reabre exactamente el error de XSS almacenado que corrigió el Curso 5.5 en anotaciones y chat | Establécela con `textContent`, coincidiendo con `renderAnnotations` y `appendChatMessage` |
| Olvidar el token CSRF en la solicitud de guardado, pero no en la de borrador | La solicitud de guardado falla con 403 aunque el código por lo demás se vea correcto | Una solicitud de solo lectura no necesita token CSRF; una que escribe siempre lo necesita, según `requireCsrf` |

## Solución de problemas

**`describeScene is not a function` (o similar) en `server/routes.js`.** Esperado hasta que se complete el TODO 8: `describeScene` de `server/ai.js` debe existir y exportarse antes de que `routes.js` pueda importarla y llamarla.

**Las solicitudes de borrador y de guardado devuelven ambas 404, incluso para la dueña de la escena.** Comprueba primero el TODO 11: si las dos rutas nuevas no están emparejadas y conectadas en `server/server.js`, cada solicitud a ellas cae en el 404 genérico de `/api/`, sin importar lo que haga `routes.js`.

**Una descripción guardada se ve sin cambios después de editar el texto del borrador.** El botón Save guarda lo que esté actualmente en el área de texto, no el borrador original; confirma que tu edición en verdad se escribió en `#description-draft` antes de presionar Save.

**`npm test` sigue fallando después de que una corrección parece correcta.** Lee el mensaje de la aserción, no solo el título de la prueba; las dos pruebas nuevas comprueban cada una más de una cosa (por ejemplo, la prueba de guardado comprueba tanto que se rechace a una persona extraña *como* que el texto guardado de la dueña esté saneado).

**`npm install` falla, o es muy lento, en China continental.** Ejecuta `npm install --registry=https://registry.npmmirror.com` en lugar del registro por defecto.

**El puerto 8891 ya está en uso.** Establece un `PORT` distinto en `server/.env`, y actualiza `ALLOWED_ORIGIN` para que coincida.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: agrega un límite de tasa al endpoint de borrador de descripción, con la misma forma que ya usa `rateLimit.js` para los intentos de inicio de sesión, y una prueba de `node:test` que demuestre que está en su lugar.
2. **[Creativo](challenges/challenge-2.es.md)**: cambia la redacción de la descripción mock, en tu propio idioma o estilo, para que suene como algo que en verdad escribiría una curadora de tu propia comunidad o cultura.
3. **[Explorador](challenges/challenge-3.es.md)**: implementa la ruta de proveedor `openai-compatible` o `local` del Curso 5.6 en `server/ai.js`, alcanzando un endpoint real (una API alojada, o un modelo local mediante Ollama o LM Studio) en lugar del proveedor mock.

## Cómo entregar tu trabajo

1. Trabaja [`tests/checklist.md`](tests/checklist.md).
2. Toma capturas de pantalla: tu terminal mostrando el pase completo de `npm test` (10/10), y la aplicación con una escena, una anotación, un mensaje de chat, y una descripción de IA guardada, todos visibles.
3. Guárdalas en tu diario de aprendizaje y portafolio. Compártelas con otras personas que programan: consulta [dónde compartir tu trabajo y pedir ayuda](../../docs/en/community.md) (en inglés).
4. Pregunta de diario: describe, en tus propias palabras, qué podría salir mal si se eliminara el paso de "revisión humana" en la función de IA de este proyecto final; no "podría estar mal," sino una consecuencia específica y concreta para una usuaria real de una versión real de esta aplicación.

## Lecturas adicionales

- [MDN: Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) (en inglés)
- [OWASP Access Control Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Access_Control_Cheat_Sheet.html) (en inglés)
- [Node.js docs: SQLite](https://nodejs.org/api/sqlite.html) (en inglés)
- [MDN: WebSockets API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) (en inglés)
- [Keep a Changelog](https://keepachangelog.com/) (en inglés)

## Mujeres que conviene conocer

**Juliana Rotich** es una tecnóloga keniana que cofundó Ushahidi en 2008: un software de crowdsourcing y mapeo de crisis, libre y de código abierto, construido primero para mapear reportes de violencia después de las elecciones de Kenia de 2007-08, y desplegado desde entonces alrededor del mundo, y que más tarde cofundó BRCK.

Ushahidi empezó como exactamente el tipo de herramienta pequeña y urgente que practica construir este proyecto final: un servidor funcional, una base de datos de reportes ligados a lugares, y personas reales dependiendo de él bajo presión. La disciplina que pide esta lección (revisar lo que ya funciona antes de agregarle algo, y escribir con claridad cómo ejecutar y desplegar lo que construiste) es la misma disciplina que debe tener desde el principio una herramienta construida para ser confiable en una crisis.

> **Nota editorial: verificar antes de publicar.** Los datos biográficos de las secciones «Mujeres que conviene conocer» deben verificarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

La propia función nueva de este proyecto final sigue la semántica de `fetch()` del Fetch Standard del W3C/WHATWG tanto para sus solicitudes de lectura como de escritura, y mantiene sin cambios las protecciones de Content Security Policy Level 3 del W3C Web Application Security Working Group que ya puso en marcha el Curso 5.5. La forma de solicitud y respuesta del proveedor mock de IA refleja la convención de chat-completions compatible con OpenAI que introdujo el Curso 5.6: una forma de API ampliamente adoptada, pero no formalmente estandarizada, usada por varios servidores de modelos alojados y locales, por eso esta lección la trata como una convención común alrededor de la cual diseñar, en lugar de como un estándar emitido por un organismo.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
