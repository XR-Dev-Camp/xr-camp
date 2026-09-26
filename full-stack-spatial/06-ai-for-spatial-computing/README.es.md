# IA para computación espacial

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `full-stack-spatial` · **Lección:** `ai-for-spatial-computing-06` · **Tiempo:** unas 14 horas · 19 sesiones de 45 minutos · unas 5 semanas con 4 sesiones por semana

---

> Construye una herramienta espacial asistida por IA documentando la revisión humana y las salvaguardas.

---

## Objetivos de aprendizaje

Al terminar este proyecto podrás:

1. Construir una función de IA como un único módulo neutral respecto al proveedor, y cambiar entre una simulación (mock) determinista sin conexión, cualquier endpoint alojado compatible con OpenAI, y un modelo local (Ollama o LM Studio) cambiando solo variables de entorno.
2. Construir un prompt a partir de los propios datos estructurados de una escena, nunca de una imagen de ella, y explicar por qué eso mantiene una función pequeña, económica, y usable para alguien que no puede ver la escena en absoluto.
3. Pedirle a un modelo que responda como JSON estricto, analizar esa respuesta de forma defensiva, y rechazar una respuesta mal formada en lugar de adivinar qué pudo haber querido decir.
4. Contrastar la respuesta de un modelo contra los datos reales que se le dieron, para detectar el fallo específico y común de que un modelo nombre algo que en realidad no está ahí.
5. Explicar la diferencia entre un borrador generado por IA y datos guardados de la aplicación, y exigir que una persona lea y apruebe un borrador antes de que llegue a la base de datos.
6. Aplicar minimización de datos a un prompt: enviar solo los campos que una función necesita, y explicar que este proyecto no tiene datos personales que filtrar, para empezar.
7. Agregar un control de costo y límite de tasa frente a cualquier función que pueda llamar a una API de pago, separado del trabajo de un límite de tasa de inicio de sesión.
8. Escribir una divulgación de uso de IA que una persona pueda leer antes de decidir usar una función.

## Requisitos previos

- **Curso 5.3: Bases de datos y datos de aplicaciones espaciales**: esta lección reutiliza su esquema de escenas, objetos de escena, y anotaciones, y su enfoque con `node:sqlite`, para los datos que lee aquí cada función de IA.
- **Curso 5.1: Fundamentos de backend y API**: rutas, cuerpos JSON, validación, y códigos de estado.
- Comodidad con `async`/`await` y leer un stack trace, del **Curso 4 (Desarrolladora Frontend)**.

## Herramientas necesarias

| Herramienta | Propósito | Costo |
| --- | --- | --- |
| Node.js 22.5 o posterior (se recomienda la LTS "24 Krypton") | Ejecuta el servidor, incluido el módulo integrado `node:sqlite` | Gratis |
| Un editor de texto (por ejemplo, VS Code) | Escribir el código del servidor y del cliente | Gratis |
| Un navegador moderno (Chrome, Firefox, Safari o Edge) | Ejecutar la herramienta y probar tu trabajo | Gratis |
| Ollama o LM Studio (opcional) | Ejecutar un modelo local en tu propia máquina, para el reto Explorador | Gratis |

Node.js se puede descargar desde [nodejs.org](https://nodejs.org/); estudiantes en China continental también pueden usar el [espejo de Node.js de npmmirror](https://registry.npmmirror.com/binary.html?path=node/) si el sitio oficial va lento. Nada en esta lección necesita un paquete de npm: `node:sqlite`, `node:http`, `node:crypto`, y `node:test` vienen todos incluidos en el propio Node, y el proveedor de IA (real o simulado) se llama con el propio `fetch()` integrado del navegador y de Node. Si pruebas el reto opcional Explorador con un proveedor alojado y compatible con OpenAI en lugar de un modelo local, revisa tú misma los precios y términos actuales de ese proveedor; este curso no nombra ningún proveedor específico.

## Lo que vas a construir

El Curso 5.3 le dio a la exhibición una base de datos real de escenas guardadas, hechas de exhibiciones con posiciones y rotaciones, más anotaciones cortas. Esta lección agrega dos pequeñas herramientas asistidas por IA sobre esos mismos datos: un botón que **redacta una descripción en lenguaje simple** de una escena a partir de sus propios datos guardados (para accesibilidad, y para cualquiera que no pueda ver la vista 3D), y una caja donde puedes **buscar escenas en lenguaje simple** en lugar de desplazarte por una lista. Ambas funciones se construyen sobre un archivo nuevo, `server/ai.js`, que no sabe nada sobre HTTP o SQLite, solo cómo convertir una escena (o una lista de escenas) en un prompt, llamar al proveedor que esté configurado, y convertir su respuesta de vuelta en algo en lo que el resto del servidor pueda confiar o rechazar de forma segura.

Esta lección no tiene cuentas: el Curso 5.2 ya enseña eso, y el Curso 5.5 lo refuerza, así que cada escena aquí son datos compartidos, locales, de un solo inquilino (single-tenant): el alcance más pequeño que todavía permite que ambas funciones de IA hagan algo real. La solución de referencia está en [`completed/`](completed/); el starter tiene **18 TODOs numerados**, casi todos en `server/ai.js`, `server/db.js`, `server/routes.js`, `server/server.js`, y `js/main.js`, con `js/scene.js` (la propia vista 3D), `server/exhibits.js`, y el resto del CRUD de escenas y anotaciones de `server/routes.js` heredados y terminados, así esta lección puede enfocarse en el módulo de IA.

## Guía de carpetas

```text
06-ai-for-spatial-computing/
├── README.md
├── starter/                 # begin here
│   ├── index.html, styles.css, js/
│   │   ├── scene.js          # the 3D view — finished, carried over from 5.3
│   │   └── main.js           # TODO 17, TODO 18
│   └── server/
│       ├── exhibits.js       # the shared exhibit list — finished
│       ├── db.js              # TODO 1, TODO 2
│       ├── validation.js      # TODO 3
│       ├── ai.js               # TODO 4-13 — this lesson's real subject
│       ├── routes.js           # TODO 14, TODO 15
│       ├── server.js           # TODO 16
│       ├── server.test.js      # node:test, using the mock provider
│       └── .env.example
├── completed/                # reference solution
├── challenges/                # Three challenges: Foundation is required
├── tests/                     # self-review checklist
├── assets/
└── screenshots/
```

## Configuración

1. Abre una terminal y ejecuta `node --version`. Necesitas la 22.5 o posterior; este curso está escrito y probado contra Node 24 (la LTS actual).
2. Haz `cd` a `starter/server` y copia `.env.example` a `.env`. Deja `AI_PROVIDER` establecido en `mock` por ahora; eso es contra lo que se prueba cada TODO hasta el reto Explorador.
3. Desde `starter/server`, ejecuta `node server.js`. Deberías ver `AI-assisted scene tool listening on http://127.0.0.1:8886` y una línea sobre que los datos semilla aún no se crearon; ambas cosas son esperadas antes del TODO 1; ver Solución de problemas.
4. Abre `http://127.0.0.1:8886/` en tu navegador. La exhibición muestra su arreglo por defecto; nada más funciona todavía.
5. En una segunda terminal, desde `starter/server`, ejecuta `node --test`. Cada prueba debería fallar con un mensaje claro `TODO n: ... is not implemented yet`; ese es tu mapa de la lección, en orden.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Lee este Recorrido; ejecuta los pasos de Configuración de arriba. | Un servidor que arranca, y una suite de pruebas completa y fallando que nombra cada TODO por delante. |
| 2 | TODO 1: `insertScene` e `insertObjects` de `db.js`, en una transacción. | `curl -X POST http://127.0.0.1:8886/api/scenes -d '...'` devuelve `201` con un `id` real. |
| 3 | TODO 2: `updateScene` y `saveDescription` de `db.js`. | Reiniciar el servidor ahora siembra tres escenas de ejemplo (`seedIfEmpty` por fin puede insertar); `GET /api/scenes` las lista. |
| 4 | TODO 3: `validateSearchQuery` y `validateDescriptionSave` de `validation.js`. | Una consulta de 500 caracteres, enviada a mano con `curl`, se rechaza con un `400` antes de que `ai.js` siquiera se involucre. |
| 5 | TODO 4: `buildDescriptionPrompt` de `ai.js`. | Registrar su valor de retorno muestra un prompt de dos mensajes que contiene solo el nombre, las exhibiciones, y las anotaciones propias de una escena; nada más. |
| 6 | TODO 5: `parseDescriptionReply` de `ai.js`. | Darle `'{"description": "ok"}'` y `'not json'` a mano en un script de prueba devuelve lo correcto y lanza lo correcto. |
| 7 | TODO 6: `checkDescriptionForHallucinations` de `ai.js`. | Una descripción falsa escrita a mano que menciona una exhibición que no está en la escena vuelve con una advertencia que la nombra. |
| 8 | TODO 7: `describeScene` de `ai.js`, uniendo los TODOs 4-6. | Las dos pruebas de descripción de `node --test` se ponen en verde. |
| 9 | TODO 8: `buildSearchPrompt` de `ai.js`, y TODO 9: `parseSearchReply`. | Los "datos enviados" del prompt de búsqueda contienen solo ids de escena, nombres, exhibiciones, y texto de anotaciones. |
| 10 | TODO 10: `filterMatchesAgainstRealScenes` de `ai.js`. | La prueba de la protección contra alucinaciones (un id de escena inventado que se descarta) pasa. |
| 11 | TODO 11: `searchScenes` de `ai.js`, uniendo los TODOs 8-10. | Las pruebas de búsqueda de `node --test` se ponen en verde. |
| 12 | TODO 12: `callOpenAiShapedEndpoint` de `ai.js`. | El archivo ahora tiene todo lo que necesita para alcanzar a un proveedor real más adelante; nada que probar todavía con `AI_PROVIDER=mock`, pero vuelve a leer los TODOs 4-11 y confirma que ninguno asumió nada específico del mock. |
| 13 | TODO 13: `checkAiRateLimit` de `ai.js`. | Llamarla más de `AI_MAX_CALLS_PER_WINDOW` veces en un script de prueba devuelve `false` desde las llamadas extra. |
| 14 | TODO 14: `generateDescription` y `saveDescriptionRoute` de `routes.js`. | `curl -X POST .../describe` devuelve un borrador; `curl -X PUT .../description` lo guarda; `GET` sobre la escena ahora lo muestra. |
| 15 | TODO 15: `searchScenesRoute` de `routes.js`. | `curl -X POST /api/search -d '{"query":"jade"}'` devuelve una escena real que coincide. |
| 16 | TODO 16: las dos rutas nuevas de `server.js`. | Cada ruta del proyecto es alcanzable por HTTP por primera vez; vuelve a ejecutar todo `node --test`. |
| 17 | TODO 17: `generateDescription` y `saveDescription` de `js/main.js`. | En el navegador: guarda una escena, genera un borrador, edítalo, guárdalo, recarga la página, y velo persistido bajo "Saved description". |
| 18 | TODO 18: `searchScenes` de `js/main.js`. | Escribir "jade" en la caja de búsqueda y presionarla (o Enter) abre una escena que coincide. |
| 19 | Trabaja [`tests/checklist.md`](tests/checklist.md); completa el [reto Fundamento](challenges/challenge-1.es.md) obligatorio; un reto de extensión más, y luego **Entregando tu trabajo**. | Cada elemento de la lista marcado, tu propia extensión pequeña, y un proyecto listo para mostrar. |

### Paso 1: lee el esquema y la forma de un "borrador" (sin TODO todavía)

Antes de escribir nada, observa la única regla que cada TODO de esta lección tiene que respetar: **un borrador no son datos guardados.** `server/ai.js` nunca llama a `db.js`. La ruta `generateDescription` de `server/routes.js` solo devuelve lo que le dio `ai.js`; `saveDescriptionRoute` es una ruta *separada*, llamada solo cuando una persona hace clic en "Save this description" en el navegador, después de leer (y, si elige, editar) el borrador. Si te encuentras escribiendo código en `ai.js` que importa `db.js`, detente; ese es el único límite que esta lección te pide que no cruces.

### Paso 2: almacenamiento de escenas (TODO 1, TODO 2)

El esquema de `db.js` son dos tablas: `scenes` (con una columna `description` y `description_reviewed_at`, nuevas para esta lección) y `scene_objects`, más `annotations`: las mismas formas que usó el Curso 5.3, menos el `owner_id` que no necesita el alcance sin cuentas de esta lección. Termina `insertScene` y su función auxiliar `insertObjects` (TODO 1), luego `updateScene` y `saveDescription` (TODO 2), siguiendo las instrucciones en el comentario de cada función. `saveDescription` es corta (un `UPDATE`, una marca de tiempo nueva) y es la *única* función de todo el proyecto con permiso de escribir una descripción.

### Paso 3: protege los cuerpos de solicitud de IA (TODO 3)

`validateSearchQuery` y `validateDescriptionSave` de `validation.js` siguen la misma forma `{ valid, errors, value }` que usa cada otro validador de este curso. La razón por la que existen es el costo, no solo la corrección: cada carácter que envía quien aprende es un carácter que `ai.js` podría tener que pagarle a un proveedor real por leer, así que rechazar una solicitud demasiado grande aquí es más barato que rechazarla después de un viaje de ida y vuelta por la red.

### Paso 4: construye el prompt de descripción (TODO 4)

`sceneDataForPrompt` de `ai.js` (terminada para ti) convierte una escena en `{ name, exhibits: [...], annotations: [...] }`: solo lo que necesita la función de descripción, construido a partir de los ids de exhibición y los números que ya están en la base de datos, nunca de una imagen. Termina `buildDescriptionPrompt`, que envuelve esos datos en un prompt de dos mensajes:

```js
{
  messages: [
    { role: 'system', content: JSON_ONLY_SYSTEM_MESSAGE },
    { role: 'user', content: '...instructions... Scene data: {"name":"...","exhibits":[...]}' },
  ],
  dataSent: { name: '...', exhibits: [...], annotations: [...] },
}
```

`dataSent` se devuelve hasta el navegador (ver TODO 14 y TODO 17), así quien aprende puede abrir "Data sent to the AI provider" en la interfaz y ver, en su propio proyecto, exactamente qué salió de ahí: una forma directa y práctica de comprobar por ti misma la regla de "envía solo lo necesario", en lugar de confiar en la palabra de este README.

### Paso 5: analiza y valida la respuesta (TODO 5)

A un modelo se le pide que responda como JSON; nada en este proyecto confía en que en verdad lo haga. Termina `parseDescriptionReply`: haz `JSON.parse` del texto crudo (lanzando un `AiResponseError` si falla), comprueba que el valor analizado tenga una `description` de cadena no vacía, y lanza el mismo tipo de error si no la tiene. Esta función se ejecuta en *cada* respuesta, incluida la del proveedor simulado (mock); `mockDescriptionReply` (terminada para ti) ya devuelve exactamente la forma que esta función espera, que es lo que permite que el proveedor simulado sustituya a uno real en todas partes de esta lección, incluido en `server.test.js`.

### Paso 6: comprueba la respuesta contra los datos reales (TODO 6)

`checkDescriptionForHallucinations` es el verificador de hechos más pequeño de este curso: para cada exhibición de la lista compartida `EXHIBITS`, si su nombre se menciona en la descripción pero su id en realidad no está en `scene.objects`, eso es una advertencia que merece la atención de una persona antes de guardar el texto. Es una heurística, no una garantía; una descripción todavía puede engañar de otras formas, pero detecta el fallo específico y común de que un modelo invente una exhibición, y es barato de calcular porque los "datos reales" contra los que compara ya están en memoria.

### Paso 7: únelo todo (TODO 7)

`describeScene` es la única función que llama `routes.js`. Termínala para: construir el prompt (TODO 4), obtener una respuesta cruda (el proveedor simulado directamente, para `AI_PROVIDER=mock`, o `callProvider` para uno real), analizarla (TODO 5) con **un reintento** si la respuesta de un proveedor real falla al analizarse (una segunda solicitud más precisa que nombra qué estuvo mal con la primera), y luego ejecutar la comprobación de alucinaciones (TODO 6) y devolver todo (descripción, advertencias, nombre del proveedor, y los datos que se enviaron) sin guardar nada de eso.

### Paso 8: el prompt de búsqueda y su respuesta (TODO 8, TODO 9)

Se repite la misma forma de tres pasos para la búsqueda: `buildSearchPrompt` (TODO 8) envía solo el id, nombre, lista de exhibiciones, y texto de anotaciones de cada escena, limitado a `MAX_SCENES_IN_PROMPT` escenas, ya que el *número* de escenas impulsa el tamaño y el costo del prompt de la misma forma que lo hace la longitud del mensaje. `parseSearchReply` (TODO 9) comprueba que la respuesta tenga un arreglo `matches` (cada entrada con un `sceneId` y `reason` de cadena) y una `explanation` de cadena.

### Paso 9: la protección contra alucinaciones para la búsqueda (TODO 10)

A un modelo solo se le pudieron haber mostrado los ids de escena que incluyó `scenesDataForPrompt`, así que cualquier `sceneId` que devuelva que no sea uno de los ids reales que se le pasaron no vino de los datos. Termina `filterMatchesAgainstRealScenes` para dividir las coincidencias de una respuesta en `kept` (un id real) y `dropped` (todo lo demás), y mira "Explicación del código clave" del README para saber por qué esto, no el buen comportamiento del modelo, es en lo que realmente confía `routes.js`.

### Paso 10: une la búsqueda (TODO 11)

`searchScenes` refleja a `describeScene` del Paso 7: construye el prompt, obtén una respuesta cruda, analízala (con el mismo patrón de un reintento para proveedores reales), fíltrala contra la lista real de escenas, y devuelve las sobrevivientes más la explicación.

### Paso 11: alcanza a un proveedor real (TODO 12)

`callOpenAiShapedEndpoint` es la única función de este proyecto que llama a `fetch()` contra algo fuera de este proceso. Termínala para hacer `POST` a `{AI_BASE_URL}/chat/completions` con la forma descrita en su comentario, y para convertir una configuración faltante, una solicitud fallida, y una respuesta mal formada en los tres tipos de error distintos (`AiConfigError`, `AiRequestError`, `AiResponseError`) que `routes.js` ya sabe convertir en el código de estado HTTP correcto. `AI_PROVIDER=openai-compatible` y `AI_PROVIDER=local` llaman ambos a esta misma función; solo difieren entre ellos `AI_BASE_URL`, `AI_MODEL`, y si hay una clave establecida.

### Paso 12: un presupuesto para llamadas reales (TODO 13)

`checkAiRateLimit` limita cuántas llamadas de IA hará este proyecto en una ventana de 15 minutos, sin importar si alguna resulta útil; un proveedor real cobra por llamada (o, para un modelo local, gasta tiempo y batería) sin importar si `routes.js` termina usando la respuesta. Termínala como un contador pequeño y compartido; el comentario encima explica por qué este es un trabajo distinto al de un límite de tasa de inicio de sesión.

### Paso 13: conecta las rutas (TODO 14, TODO 15)

`generateDescription`, `saveDescriptionRoute`, y `searchScenesRoute` de `routes.js` tienen la forma habitual de este curso: cargar la escena (o la lista de escenas), comprobar el límite de tasa donde aplique, validar el cuerpo, llamar a `ai.js`, y convertir su resultado, o uno de sus tres tipos de error, mediante `sendAiError` (ya terminada), en una respuesta. Ninguna es larga; el trabajo ya está hecho en `db.js`, `validation.js`, y `ai.js`.

### Paso 14: enruta las dos rutas nuevas (TODO 16)

`server.js` empareja cada ruta con una expresión regular pequeña, la misma elección de no usar paquete de enrutamiento que ha hecho cada lección de este curso. Agrega `DESCRIBE_PATH` y `DESCRIPTION_PATH`, que coincidan con `/api/scenes/<id>/describe` y `/api/scenes/<id>/description`, y conéctalas *encima* del emparejamiento más general de id de escena más abajo, de la misma forma en que están ordenadas las rutas de anotación existentes.

### Paso 15: conecta el cliente (TODO 17, TODO 18)

`generateDescription`, `saveDescription`, y `searchScenes` de `js/main.js` hacen cada una una llamada `fetch()` y actualizan un puñado de elementos que ya están en `index.html`: la caja de borrador, sus advertencias y los detalles de "data sent", la línea de descripción guardada, y la lista de resultados de búsqueda. Cada valor mostrado es exactamente lo que devolvió el servidor; nada de eso se reformula ni se resume más en el navegador.

## Explicación del código clave

- **Un módulo posee al modelo.** `ai.js` es el único archivo que construye un prompt o lee una respuesta cruda. `routes.js` llama a `describeScene(scene)` o `searchScenes(query, scenes)` y recibe datos planos de vuelta; no tiene idea de si `AI_PROVIDER` es `mock`, `openai-compatible`, o `local`. Eso es lo que hace que cambiar de proveedor sea un cambio de una línea en `.env` en lugar de una reescritura.
- **"Responde como JSON, y aun así compruébalo."** Cada prompt de este proyecto termina con una instrucción de responder como un solo objeto JSON. Cada respuesta igual se analiza de forma defensiva (`parseDescriptionReply`, `parseSearchReply`) y se rechaza, nunca se adivina, si no coincide con la forma esperada. La instrucción baja la probabilidad de una respuesta mal formada; el analizador es lo que en verdad protege al resto del servidor de una.
- **La protección contra alucinaciones es un contraste con datos reales, no la palabra del modelo.** `checkDescriptionForHallucinations` compara un borrador con `scene.objects`; `filterMatchesAgainstRealScenes` compara los ids de escena de una respuesta de búsqueda con la lista real que se envió. Ninguna confía en que el modelo se haya mantenido preciso; ambas lo verifican de forma independiente, en código que controla este proyecto.
- **Un borrador y un guardado son dos rutas distintas.** `POST /api/scenes/:id/describe` devuelve texto; solo `PUT /api/scenes/:id/description` (una solicitud separada, enviada solo cuando una persona hace clic en "Save this description") llama alguna vez a `saveDescription` de `db.js`. Este es todo el mecanismo detrás de "una persona lo revisa primero": no hay ninguna ruta de código donde un borrador generado llegue a la base de datos por sí solo.
- **La minimización de datos es una función, no un documento de política.** `sceneDataForPrompt` y `scenesDataForPrompt` son los dos únicos lugares que deciden qué contiene un prompt, y ambos lo construyen campo por campo a partir de los datos visibles propios de la escena; nunca un volcado completo de una fila de base de datos, y (como esta lección no tiene cuentas) nada que pudiera identificar a una persona, para empezar.
- **Un límite de tasa por costo, no solo por seguridad.** `checkAiRateLimit` cuenta cada llamada de IA, exitosa o no, contra un solo presupuesto compartido; distinto de un límite de tasa de inicio de sesión, que solo cuenta los intentos *fallidos*. Una versión de producción rastrearía esto por clave de API o por cuenta (Curso 5.8); el único bucket compartido de este proyecto es una simplificación deliberada para una herramienta sin cuentas.

## Accesibilidad 3D y XR

- **Descripción de la escena.** `#scene-description` se construye a partir del mismo arreglo `objects` que renderiza la vista 3D, cada vez que una escena carga o cambia (WCAG 1.1.1, 1.3.1); esto es independiente de, y siempre está presente sin importar, la descripción redactada por IA que agrega esta lección, que solo llena la línea "Saved description" después de que una persona la aprueba.
- **Edición solo con teclado.** Cada posición y rotación es un `<input type="number">`; este proyecto nunca le pide a quien aprende que arrastre algo en 3D.
- **Un gemelo 2D de la vista 3D.** La tabla de posición/rotación bajo el lienzo contiene los mismos números que muestra la vista 3D, haya o no WebGL disponible.
- **Las anotaciones existen como texto real.** Los marcadores flotantes que dibuja `scene.js` sobre el lienzo son decorativos; `#annotation-list` es la copia accesible y siempre presente.
- **Movimiento reducido y un control de Pausa.** El giro de la piedra de jade empieza pausado cuando `prefers-reduced-motion: reduce` está activado, y el botón **Pause animation** (con `aria-pressed`) funciona sin importar esa preferencia.
- **Comodidad.** La cámara nunca se mueve salvo una vez, a su posición inicial fija.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| Un borrador generado por IA es visual y textualmente distinguible del contenido guardado | 1.4.1 | La línea "Saved description" y la caja de borrador de borde punteado nunca dependen solo del color para decir cuál es cuál; las palabras alrededor también lo dicen. |
| Las advertencias y errores de cada respuesta de IA aparecen como texto, en una lista | 1.4.1, 3.3.1 | Una respuesta rechazada o marcada no debe señalarse solo con color. |
| `role="list"` en cada `<ul>` con `list-style: none` | Buena práctica | Safari elimina la semántica de lista de un `<ul>` al que se le quitó el estilo de lista. |
| La tabla de posición/rotación tiene un `<caption>` y `<th scope>` | 1.3.1 | Un lector de pantalla anuncia a qué exhibición y a qué eje pertenece cada número. |
| La animación respeta `prefers-reduced-motion` y ofrece un botón de Pausa | 2.2.2 | El movimiento que se inicia solo, sin que quien aprende lo pida, debe poder detenerse. |
| Cada interacción (arreglar una escena, generar un borrador, buscar) tiene una ruta de teclado | 2.1.1 | Nada en ninguna de las dos funciones de IA depende de un mouse. |

## Consideraciones de rendimiento

- **Limita el prompt, no solo la respuesta.** `MAX_SCENES_IN_PROMPT` limita cuántas escenas envía alguna vez `buildSearchPrompt`, independientemente del límite de `validateSearchQuery` sobre el propio texto de la consulta; ambos impulsan juntos el costo y la latencia.
- **`max_tokens` también limita la respuesta.** `MAX_RESPONSE_TOKENS` limita cuán larga puede ser la respuesta de un proveedor real, así una sola solicitud tiene un costo máximo predecible incluso antes de considerar el propio límite de tasa de este proyecto.
- **El proveedor simulado no cuesta nada y responde al instante.** Cada prueba automatizada, y el `.env` por defecto de esta lección, lo usan; un proveedor real es opcional, para el reto Explorador o más allá.
- **Un límite de tasa compartido, no uno por solicitud.** El contador en memoria de `checkAiRateLimit` se comprueba antes de que siquiera se construya un prompt, así una solicitud fuera de presupuesto nunca llega a `ai.js` en absoluto.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Enviar una fila completa de base de datos (o toda la tabla de escenas) al modelo | Cuesta más, es más lento, y arriesga enviar un campo que nadie pretendía compartir | Construye un objeto pequeño y explícito de "datos para el prompt", campo por campo, de la forma en que lo hace `sceneDataForPrompt` |
| Confiar en `JSON.parse(reply).description` sin comprobar que existe y es una cadena | Un modelo que responde con prosa, un mensaje de error, o un objeto con otra forma bloquea la ruta, o guarda en silencio `"undefined"` | Analiza y valida la forma antes de usar cualquier campo, y lanza un error tipado ante cualquier otra cosa |
| Guardar una descripción generada directamente, sin un paso de revisión | Una descripción alucinada o inexacta llega a usuarias reales sin que ninguna persona la haya leído | Devuelve un borrador desde una ruta; guarda solo desde una ruta separada que dispare una persona misma |
| Suponer que un modelo que nombró un id con apariencia real usó uno real | Una respuesta de búsqueda puede nombrar un id de escena que nunca estuvo en los datos que se le dieron | Filtra cada id sugerido por el modelo contra la lista real antes de usarlo para cualquier cosa |
| Incluir una clave de API real en `.env` (o en cualquier otro lugar) en el repositorio | La clave queda expuesta a cualquiera con acceso al repositorio, y al abuso de un proveedor de pago | Mantén las claves reales solo en un `.env` que nunca se incluya en el repositorio; incluye `.env.example` solo con marcadores de posición |

## Solución de problemas

**`ExperimentalWarning: SQLite is an experimental feature and might change at any time`.** Esperado, cada vez que se importa `node:sqlite`. Es una advertencia, no un error.

**`Seed data was not created (expected until TODO 1 is done)`.** Exactamente lo que dice: `seedIfEmpty()` necesita que `insertScene` (TODO 1) funcione. Sembrará la próxima vez que el servidor arranque una vez que el TODO 1 esté terminado.

**`AI provider not configured: AI_PROVIDER=openai-compatible needs AI_BASE_URL and AI_MODEL set`.** Establece ambos en `.env` (ver `.env.example`), o vuelve a `AI_PROVIDER=mock`.

**`AI provider request failed: Could not reach the AI provider at http://127.0.0.1:11434/v1`.** Para `AI_PROVIDER=local`: Ollama o LM Studio no está corriendo, o está corriendo en un puerto distinto al que asume por defecto `AI_LOCAL_KIND`. Confirma el puerto en la propia documentación de esa herramienta y establece `AI_BASE_URL` tú misma si difiere.

**`429 Too many AI requests`.** Tú (o tus pruebas) alcanzaron `AI_MAX_CALLS_PER_WINDOW` llamadas dentro de la ventana de 15 minutos que rastrea `ai.js`. Espera, o baja tu propia frecuencia de pruebas; esto es deliberado, no un error.

**`AI reply was invalid and was rejected`.** Un proveedor real respondió con algo que no era la forma exacta de JSON que pedía este proyecto, incluso después de un reintento. Esta es la ruta de respuesta mal formada funcionando como está diseñada: no se guardó nada, y el error nombra qué estuvo mal.

**El puerto 8886 ya está en uso.** Establece un `PORT` distinto en `server/.env`, y actualiza `ALLOWED_ORIGIN` para que coincida.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: extiende la comprobación de alucinaciones para también marcar una descripción que omite una exhibición que *sí* está en la escena.
2. **[Creativo](challenges/challenge-2.es.md)**: agrega una cuarta exhibición propia, de tu propio idioma, cultura, o comunidad, y confirma que ambas funciones de IA la manejan correctamente.
3. **[Explorador](challenges/challenge-3.es.md)**: conecta un modelo local real mediante Ollama o LM Studio, y compara su salida con la del proveedor simulado.

## Cómo entregar tu trabajo

1. Trabaja [`tests/checklist.md`](tests/checklist.md).
2. Toma capturas de pantalla: una descripción de borrador generada antes de guardar, la misma escena con su descripción guardada, y un resultado de búsqueda con su explicación.
3. Guárdalas en tu diario de aprendizaje y portafolio. Cuando abra la comunidad de XR Camp, compártelas ahí.
4. Pregunta de diario: este proyecto muestra cada borrador de IA antes de guardarlo, y muestra exactamente qué datos se enviaron. Encuentra un lugar en la interfaz donde una persona todavía podría hacer clic en "Save" sin realmente leer el borrador primero. ¿Cuál es un cambio pequeño y de baja fricción que haría eso un poco más difícil, sin convertir una revisión genuinamente rápida y segura en una tarea molesta?

## Lecturas adicionales

- [MDN: Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) (en inglés)
- [Ollama documentation: OpenAI compatibility](https://docs.ollama.com/api/openai-compatibility) (en inglés)
- [LM Studio documentation: Local Server](https://lmstudio.ai/docs/app/api) (en inglés)
- [OWASP Top 10 for Large Language Model Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) (en inglés)
- [Node.js docs: `node:sqlite`](https://nodejs.org/api/sqlite.html) (en inglés)

## Mujeres que conviene conocer

**Xin Luna Dong (董欣)** nació y se educó en China (Universidad de Nankai, luego una maestría en la Universidad de Pekín, antes de un doctorado en Estados Unidos) y ahora trabaja en Estados Unidos como Principal Scientist en Meta Reality Labs, donde lidera el trabajo de aprendizaje automático en agentes de IA para los lentes inteligentes Ray-Ban Meta. Antes de Meta, pasó casi una década construyendo grafos de conocimiento en Google (Knowledge Vault y el Knowledge Graph) y Amazon (el Product Graph). Es tanto ACM Fellow como IEEE Fellow, reconocida por su trabajo en construcción de grafos de conocimiento e integración de datos.

Su carrera está directamente detrás de las dos funciones de esta lección: un grafo de conocimiento es exactamente una estructura construida para responder "qué sabemos realmente, y cuánta confianza tenemos en ello": la misma pregunta que hacen `checkDescriptionForHallucinations` y `filterMatchesAgainstRealScenes` sobre la respuesta de un modelo mucho más pequeño, y la misma disciplina que mantiene a una función de IA anclada en datos reales y verificados en lugar de en lo que un modelo simplemente suena seguro de decir.

> **Nota editorial: verificar antes de publicar.** Los datos biográficos de las secciones «Mujeres que conviene conocer» deben verificarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

Cada respuesta que lee este proyecto es JSON, un formato de datos estandarizado dos veces: como [ECMA-404](https://ecma-international.org/publications-and-standards/standards/ecma-404/) (Ecma International) y, en un texto equivalente, como [RFC 8259](https://www.rfc-editor.org/rfc/rfc8259) (el IETF), que es también por qué `JSON.parse` se comporta igual en cada navegador y en Node. La *forma* que sigue el arreglo `messages` de esta lección y la respuesta `choices[0].message.content` (el formato de solicitud y respuesta de "chat completions") es distinta: no la administra ISO, el W3C, ni el IETF. Empezó como la API de una empresa y desde entonces se ha copiado ampliamente (incluso por Ollama y LM Studio, que es exactamente lo que significa "compatible con OpenAI" en esta lección) porque suficiente parte del ecosistema la adoptó, no porque un organismo de estandarización la ratificara: una distinción útil, común, y que vale la pena conocer entre un estándar de jure y uno de facto.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
