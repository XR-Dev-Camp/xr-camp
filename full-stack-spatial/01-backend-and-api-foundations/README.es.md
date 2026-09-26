# Fundamentos de backend y API

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `full-stack-spatial` · **Lección:** `backend-and-api-foundations-01` · **Tiempo:** unas 14 horas · 19 sesiones de 45 minutos · unas 5 semanas con 4 sesiones por semana

---

> Construye una aplicación respaldada por una API que guarde contenido o configuraciones espaciales.

---

## Objetivos de aprendizaje

Al terminar este proyecto podrás:

1. Construir un servidor HTTP con el módulo integrado de Node **`node:http`**, sin framework y sin dependencias.
2. Diseñar una pequeña **API JSON**: rutas, métodos, y un cuerpo de solicitud que debe cumplir con una forma determinada.
3. Elegir el **código de estado** correcto (200, 204, 400, 404, 405, 413, 415, 500) y explicar qué promete cada uno a un cliente.
4. **Validar** un cuerpo de solicitud a mano, y convertir un fallo en una lista clara de errores por campo, nunca en un fallo del programa (crash).
5. Leer la configuración desde **variables de entorno**, con un archivo `.env.example` y sin secretos incluidos en el repositorio (commit).
6. Agregar encabezados de **CORS** para que una página en un origen local pueda llamar a una API en otro, y explicar por qué un origen comodín es razonable aquí y una mala idea más adelante.
7. Servir un **cliente y una API JSON desde el mismo servidor**, y hacer que el cliente siga funcionando (de forma reducida) cuando ese servidor no está corriendo.
8. Escribir y ejecutar pruebas automatizadas con **`node:test`**, el ejecutor de pruebas integrado de Node.

## Requisitos previos

- **Curso 2.1: JavaScript moderno** (`async`/`await`, módulos, `try`/`catch`).
- **Curso 3.4: Fundamentos de three.js** (la exhibición a la que pertenecen las configuraciones de esta lección; no necesitas recordar su código, solo saber que existe).
- Comodidad ejecutando comandos en una terminal (Curso 1.7 o equivalente).

## Herramientas necesarias

| Herramienta | Propósito | Costo |
| --- | --- | --- |
| Node.js, una versión LTS (20 o posterior) | Ejecuta el servidor y sus pruebas; no hay nada más que instalar | Gratis |
| Un navegador moderno, con sus herramientas de desarrollo | Probar el cliente y leer las solicitudes de red | Gratis |
| Una terminal | Iniciar el servidor, ejecutar `curl` y `npm test` | Gratis |
| VS Code (o cualquier editor) y un servidor local para la vista solo del cliente | Los módulos necesitan `http://`, no `file://` | Gratis |

Node.js funciona igual en Windows, macOS y Linux, y su instalador funciona sin cuenta de pago en cualquier lugar, incluida China continental (descárgalo directamente desde [nodejs.org](https://nodejs.org/), o mediante un gestor de paquetes como `winget`, Homebrew o `apt`).

## Lo que vas a construir

La exhibición de **Desarrolladora Web3D** (Curso 3.4) recibe un **panel de configuración**: una pequeña página web donde eliges qué exhibiciones se muestran, dónde empieza la cámara, tu idioma, y si se permite que las cosas se muevan. Detrás hay una pequeña **API de Node.js** que escribes desde cero: valida lo que le envías, lo guarda en un archivo, y te lo devuelve cuando lo pides.

Esta es también la primera lección que dice con claridad lo que una buena API no debería esconder: qué pasa cuando falla la red, cuando el cuerpo de la solicitud está mal formado, o cuando el servidor simplemente no está corriendo. El cliente que construyes aquí no se cae en ninguno de esos casos: en su lugar, recurre a guardar tu configuración en este navegador, y te lo dice.

La solución de referencia está en [`completed/`](completed/): una carpeta `server/` (la API, en `server.js`, `routes.js`, `validation.js` y `store.js`) y, junto a ella, el cliente (`index.html`, `styles.css`, `js/`) que ese mismo servidor sirve como archivos estáticos. El starter tiene **13 TODOs** repartidos entre ambos.

## Guía de carpetas

```text
01-backend-and-api-foundations/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html, styles.css   # The client page: finished
│   ├── js/main.js       # The settings form and API/localStorage logic: TODOs 10-11
│   ├── js/scene.js      # The 3D view: TODO 12
│   └── server/
│       ├── server.js        # The HTTP server, routing, CORS, static files: TODOs 1, 7-9
│       ├── routes.js        # Route handlers: TODOs 3, 5-6
│       ├── validation.js    # validateSettings(): TODO 2
│       ├── store.js         # Reads and writes the settings file: TODO 4
│       ├── server.test.js   # node:test: TODO 13
│       ├── .env.example     # Copy to .env to change PORT etc.
│       └── package.json     # "type": "module", no dependencies
├── completed/            # Reference solution: open this last
├── challenges/            # Three challenges: Foundation is required
├── tests/checklist.md    # Self-review before you submit
├── assets/
└── screenshots/
```

El `package.json` de esta lección no lista ninguna dependencia: cada archivo del servidor usa solo lo que Node incluye de fábrica (`node:http`, `node:fs`, `node:test`, etc.). El Curso 5.4 es el primero en agregar un paquete real (`ws`, para WebSockets), fijado a una versión exacta en el `versions.json` de este repositorio, tal como `versions.json` ya fija three.js y A-Frame para cada lección 3D.

## Configuración

1. Crea una carpeta nueva, `exhibit-api`, junto a tus otros proyectos de XR Camp, y copia el contenido de la carpeta `starter/` ahí dentro.
2. Abre una terminal en su carpeta `server/` y comprueba tu versión de Node: `node --version`. Necesitas la 20 o posterior.
3. Copia `.env.example` a `.env` en esa misma carpeta. Los valores por defecto funcionan tal cual; volverás a esto en el Paso 1.
4. Inicia el servidor cuando llegues al Paso 1: `node server.js` (o `npm start`, que hace lo mismo). Detenlo en cualquier momento con Ctrl+C.
5. Para ver el cliente por sí solo, sin la API (como se probará), abre `index.html` mediante cualquier servidor local, como `python3 -m http.server 8766`, o Live Server de VS Code.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; lee `validation.js`, `store.js` y `routes.js` para ver qué ya está terminado | Una descripción de una línea para el trabajo de cada archivo del servidor |
| 2 | Paso 1: un primer servidor HTTP (TODO 1, parte 1) | `node server.js` imprime "Exhibit settings server listening on..." |
| 3 | Paso 1, continuación: leer el puerto desde `.env` (TODO 1, parte 2) | Cambiar `PORT` en `.env` cambia el puerto donde escucha el servidor |
| 4 | Paso 2: validar un objeto de configuración (TODO 2) | Escribir un objeto de configuración bueno y uno malo en `validateSettings()` desde el REPL de Node muestra qué campos fallan, y por qué |
| 5 | Paso 3: `GET /api/settings` (TODO 3) | Visitar `http://127.0.0.1:8877/api/settings` en el navegador muestra la configuración por defecto como JSON |
| 6 | Paso 4: guardar en un archivo (TODO 4) | Reiniciar el servidor conserva la misma configuración; aparece un archivo `data/settings.json` |
| 7 | Paso 5: `PUT /api/settings` (TODO 5) | Un comando `curl -X PUT` cambia las exhibiciones guardadas; un cuerpo inválido devuelve 400 con errores por campo |
| 8 | Paso 6: `DELETE /api/settings` (TODO 6) | `curl -X DELETE` restablece el archivo, y `GET` vuelve a mostrar los valores por defecto |
| 9 | Paso 7: uniendo todo el enrutamiento, y un 404 en JSON (TODO 7) | Una solicitud a una ruta inventada devuelve un error JSON claro, no un fallo |
| 10 | Paso 8: CORS para localhost (TODO 8) | Abrir el cliente desde un puerto distinto ya no muestra un error de CORS en la consola |
| 11 | Paso 9: servir el cliente desde el mismo servidor (TODO 9) | `http://127.0.0.1:8877/` muestra el panel de configuración (aún sin terminar) |
| 12 | Paso 10: el panel de configuración carga al iniciar (TODO 10) | El panel muestra las exhibiciones guardadas, la vista de cámara y el idioma cuando la página abre |
| 13 | Paso 10, continuación: guardar y restablecer (TODO 11) | Marcar una casilla y presionar **Save settings** actualiza el archivo en disco; **Reset to defaults** restaura los valores por defecto |
| 14 | Paso 11: la exhibición lee la configuración, parte 1 (TODO 12) | Desmarcar "Jade stone" la elimina de la vista 3D y de la descripción, sin recargar |
| 15 | Paso 11, continuación: presets de cámara y movimiento reducido (TODO 12) | Elegir "Close-up" mueve la cámara; el botón Pause y el ajuste de movimiento reducido del dispositivo detienen ambos el giro |
| 16 | Paso 12: probar con `node:test` (TODO 13) | `node --test` imprime todas las pruebas pasando |
| 17 | [`tests/checklist.md`](tests/checklist.md), y las verificaciones de accesibilidad 3D y XR de abajo | Un panel de configuración terminado |
| 18 | Un reto de extensión | — |
| 19 | **Entregando tu trabajo** | Capturas de pantalla y una entrada de diario |

### Paso 1: un primer servidor HTTP, y variables de entorno (TODO 1)

`createServer()` de `node:http` recibe una función: se ejecuta una vez por cada solicitud, con un objeto `req` (request, solicitud) y uno `res` (response, respuesta). No hay nada más que instalar:

```js
const server = createServer(async (req, res) => {
  sendJson(res, 200, { ok: true }); // a placeholder, until Step 7
});
server.listen(PORT);
```

Una **variable de entorno** es un ajuste que vive fuera de tu código, en el entorno donde corre el proceso, así el mismo código se comporta distinto en máquinas distintas (o para desarrolladoras distintas) sin que nadie edite un archivo. `process.loadEnvFile()` (integrado en Node moderno, sin paquete necesario) lee `.env` hacia `process.env`; `.env` mismo nunca se incluye en el repositorio (commit), por eso existe `.env.example`, para mostrar qué pertenece ahí. Lee el puerto con un valor de respaldo, para que el servidor arranque aunque falte `.env` o esté incompleto:

```js
const PORT = Number(process.env.PORT) || 8877;
```

### Paso 2: validar un objeto de configuración (TODO 2)

Un cliente puede enviar cualquier cosa. La **validación** es el código que decide si "cualquier cosa" se acerca lo suficiente a lo que pediste, antes de confiársela a `save()`, a una fila de base de datos, o a la pantalla de otra persona. El objeto de configuración de esta lección tiene exactamente cuatro campos:

```js
{
  visibleExhibits: ['clay-pot', 'jade-stone'], // a non-empty subset of KNOWN_EXHIBITS
  cameraStart: 'front',                        // one of CAMERA_PRESETS
  language: 'en',                              // one of LANGUAGES
  reducedMotion: false,                        // a boolean
}
```

`validateSettings()` revisa cada campo y reúne todos los problemas que encuentra en un solo arreglo `errors`, en lugar de detenerse en el primero: alguien que aprende y está corrigiendo un formulario quiere ver todos sus errores a la vez, no uno por uno. Devuelve un objeto **nuevo** cuando tiene éxito, copiando solo los cuatro campos conocidos, nunca el cuerpo original de la solicitud, que podría traer propiedades extra que nunca pediste.

### Paso 3: `GET /api/settings` (TODO 3)

La ruta más simple de esta API: carga la configuración (o los valores por defecto, la primera vez) y devuélvela como JSON, con estado 200. Aquí casi nada puede fallar de verdad: un archivo faltante no es un error, solo significa que nadie ha guardado nada todavía.

### Paso 4: guardar la configuración en un archivo (TODO 4)

`store.js` es el único archivo de este proyecto que toca el disco. Por ahora, ese disco es un solo archivo JSON: `writeFile(DATA_FILE, JSON.stringify(settings, null, 2), 'utf8')`, y `readFile` más `JSON.parse` para volver a cargarlo. El Curso 5.3 reemplaza este archivo con una base de datos real en cuanto necesites guardar más de un tipo de dato; mantener cada llamada al sistema de archivos dentro de `store.js` significa que ese cambio solo tocará este archivo.

### Paso 5: `PUT /api/settings` (TODO 5)

`PUT` significa "reemplaza este recurso con lo que te estoy enviando." El manejador:

1. Rechaza una solicitud cuyo `Content-Type` no sea `application/json`, con estado **415 Unsupported Media Type**.
2. Lee el cuerpo, y rechaza uno demasiado grande (**413**) o que no es JSON válido (**400**).
3. Lo valida. Una configuración inválida recibe **400 Bad Request**, con la lista de problemas en `details`.
4. Guarda una configuración válida, y la devuelve con **200 OK**.

```sh
curl -X PUT http://127.0.0.1:8877/api/settings \
  -H "Content-Type: application/json" \
  -d '{"visibleExhibits":["jade-stone"],"cameraStart":"close","language":"en","reducedMotion":true}'
```

### Paso 6: `DELETE /api/settings` (TODO 6)

Restablece la configuración guardada a los valores por defecto, y responde **204 No Content**: la solicitud funcionó, y no hay nada más útil que decir que un cuerpo vacío. Un cuerpo de respuesta con `204` va en realidad contra la especificación de HTTP: dejar `res.end()` sin argumento es lo correcto aquí, no un descuido.

### Paso 7: enrutamiento, y errores que no bloquean el programa (TODO 7)

El listener de solicitudes que se le pasa a `createServer()` es el único lugar que lee `req.method` y el `pathname` de la URL, y decide qué función de `routes.js` debe atenderla. Dos tipos de solicitud que no coinciden con nada reciben una respuesta JSON clara en vez de nada: un método desconocido en una ruta conocida (**405 Method Not Allowed**), y cualquier ruta que empiece con `/api/` y no sea `/api/settings` (**404 Not Found**). Un `try`/`catch` alrededor de todo esto es una red de seguridad, no un sustituto de esas comprobaciones específicas: nada que un cliente envíe debería poder detener el proceso por completo, así que un error inesperado se convierte igual en una respuesta **500**, registrada en el servidor, en lugar de una conexión colgada.

### Paso 8: CORS para localhost (TODO 8)

Un navegador bloquea que una página lea una respuesta de un **origen** distinto (un esquema, host o puerto distinto) a menos que el servidor lo permita explícitamente: Cross-Origin Resource Sharing (uso compartido de recursos entre orígenes, CORS). Probar el cliente de esta lección desde `http://127.0.0.1:8766` (un servidor estático simple) contra una API en `http://127.0.0.1:8877` cruza ese límite, aunque ambos sean "localhost". Tres encabezados de respuesta dicen quién puede preguntar, y cómo:

```js
res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
```

Antes de una solicitud `PUT` o `DELETE` con un cuerpo JSON, el navegador primero envía una solicitud `OPTIONS` de **preflight** (verificación previa), para pedir permiso: no lleva cuerpo propio, así que siempre recibe una respuesta corta y vacía con `204`.

### Paso 9: servir el cliente desde el mismo servidor (TODO 9)

Cualquier solicitud `GET` que no sea `/api/...` se trata como una solicitud de un archivo: `/` se convierte en `/index.html`, y el archivo se lee de la carpeta junto a `server/` y se devuelve con el `Content-Type` correcto. Una comprobación importa más de lo que parece: `normalize()` colapsa una ruta como `/../server/store.js` antes de compararla con la carpeta del cliente, para que una solicitud no pueda leer archivos a los que no tiene por qué acceder. El Curso 5.5 estudia a fondo este tipo de error, llamado **path traversal** (recorrido de rutas).

### Paso 10: el panel de configuración (TODOs 10-11)

`js/main.js` carga la configuración cuando la página abre, intentando primero `fetch('/api/settings')`. Si eso falla por cualquier motivo (sin servidor, un error de red, o, como en las propias verificaciones de accesibilidad de este repositorio, un servidor estático simple que responde `/api/settings` con su propio 404), la página recurre a `localStorage`, y lo dice:

```js
setStatus('Server not running: settings are saved in this browser only.', 'offline');
```

Una vez que ese respaldo entra en acción, cada Save y Reset posterior también va directo a `localStorage`, en lugar de intentar (y fallar) la API otra vez en cada clic. Esto es lo que hace que `completed/index.html` funcione como un archivo simple en un servidor estático simple, que es exactamente como las propias verificaciones de accesibilidad de este repositorio lo cargan.

### Paso 11: la exhibición lee la configuración (TODO 12)

`applySettings(settings)` de `js/scene.js` es la única función que convierte un objeto de configuración en lo que three.js muestra de verdad: qué exhibiciones son visibles, cuál de cuatro posiciones fijas de cámara elegir, y si se permite que la piedra de jade gire. Se llama una vez cuando la página carga, y otra vez cada vez que Save cambia la configuración, así que la vista 3D nunca está a más de un objeto de configuración de distancia de ser correcta, la misma regla que `describeExhibit()` del Curso 3.4 usaba para su descripción de texto.

### Paso 12: probar con `node:test` (TODO 13)

`node:test` y `node:assert` vienen incluidos con Node: no hay paquete que instalar, y `npm test` (o `node --test`) los ejecuta. `server.test.js` arranca el servidor real en un puerto libre (`listen(0)`) y un archivo de configuración desechable, y luego llama a sus rutas con `fetch()`, de la misma forma que lo haría `curl` o el navegador. Una prueba que falla señala la línea exacta y los valores exactos que esperaba frente a los que obtuvo, mucho más rápido que hacer clic en el formulario cada vez que cambias una línea de `routes.js`.

## Explicación del código clave

**`process.loadEnvFile()`.** Se agregó a Node sin ningún paquete: lee un archivo `.env` hacia `process.env`. Está envuelto en `try`/`catch` aquí porque un checkout recién clonado todavía no tiene `.env`, y eso no debe ser un error.

**`readJsonBody(req)` devuelve una Promise.** `req` es un stream: los datos llegan en fragmentos con el tiempo, no todos a la vez, así que leer un cuerpo completo significa escuchar eventos `'data'`, reunirlos, y resolver una vez que se dispara `'end'`. Es la misma forma en que se resuelven las llamadas `fetch()` del Curso 2.1, solo que corriendo en el servidor en lugar del navegador.

**`structuredClone(DEFAULT_SETTINGS)`.** Copia un objeto en profundidad, integrado en el JavaScript moderno. Sin esto, `resetSettings()` entregaría la misma referencia de arreglo cada vez, y un cambio posterior a la copia de quien llama podría reescribir en silencio los valores por defecto compartidos.

**`import.meta.url === pathToFileURL(process.argv[1]).href`.** Una comprobación a nivel de módulo de "¿se está ejecutando este archivo directamente?". Permite que `server.test.js` haga `import` del servidor (para obtener el objeto `server`) sin que ese import empiece a escuchar por sí mismo en un puerto de red real.

**`normalize(join(CLIENT_DIR, requestedPath))`.** `join` por sí solo construiría con gusto una ruta que contenga `..`; `normalize` colapsa esos segmentos para que la comprobación de recorrido que sigue pueda de verdad detectarlos.

## Accesibilidad 3D y XR

La vista de la exhibición es deliberadamente pequeña: una cámara fija en uno de cuatro presets, sin arrastre en el que perderse, y la piedra de jade es lo único que se mueve. Esa superficie más pequeña igual necesita las mismas verificaciones que cualquier escena 3D de este curso:

- **Descripción de la escena** (`#scene-description`): construida a partir de la misma lista `EXHIBITS` y el mismo objeto de configuración que lee la vista 3D, así las palabras nunca pueden contradecir a la imagen.
- **Alternativa 2D**: la lista de exhibiciones bajo la vista 3D nombra cada una y si se muestra en este momento, funcione o no WebGL.
- **Ruta de teclado para cada interacción**: cada control aquí es una casilla, botón de radio, `<select>` o `<button>` ordinario; no hay arrastre, ni control que solo responda al hover, ni interacción que solo un mouse pueda alcanzar.
- **Movimiento reducido**: una primera visita revisa `prefers-reduced-motion` y empieza pausada si está activado; **Pause animation** siempre funciona también, y su etiqueta y su estado `aria-pressed` siempre coinciden con lo que realmente está pasando, no con lo que el botón decía cuando la página cargó.
- **Comodidad**: la cámara solo se mueve a una posición que elegiste (uno de los cuatro presets); nunca se mueve por sí sola, y nada hace zoom, se inclina o tiembla sin que lo pidas.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| Cada campo del formulario tiene una etiqueta visible, en HTML | 1.3.1, 3.3.2 | Una casilla o botón de radio sin `<label>` no tiene nombre que un lector de pantalla pueda anunciar. |
| Los errores de campo de una respuesta 400 aparecen como texto junto al formulario | 3.3.1 | El mensaje permanece legible, y permanece en su lugar, en lugar de desaparecer como un `alert()`. |
| El banner de estado es una región dinámica (`role="status"`) | 4.1.3 | "Settings saved" y el mensaje sin conexión llegan a quienes usan lector de pantalla sin que tengan que ir a buscarlos. |
| La palabra visible inicia el nombre accesible de cada botón | 2.5.3 | "Save settings", no un ícono que una persona que usa voz no puede pronunciar. |
| La escena 3D se puede pausar, y respeta el movimiento reducido | 2.2.2 | El movimiento nunca se impone a nadie; el ajuste persiste, y es una elección real y permanente, no algo que se descarta una sola vez. |
| `role="list"` en cada lista con `list-style: none` | Buena práctica | Safari elimina la semántica de lista en cuanto se quita la viñeta con CSS. |

## Consideraciones de rendimiento

Este servidor lee y escribe un pequeño archivo JSON por cada solicitud que lo necesita: suficiente para la configuración de una sola persona que aprende, y un contraste deliberado con un servicio multiusuario real, donde cada solicitud que toca el disco no escalaría. La escena 3D se mantiene intencionalmente ligera: tres mallas simples, sin texturas, y la animación limitada a un solo objeto, así el peso de esta lección está en la API, no en el renderizado. `renderer.setAnimationLoop(null)` mientras la pestaña está oculta (`visibilitychange`) hace que una pestaña inactiva con el panel de configuración abierto no cueste nada.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Confiar en el cuerpo de la solicitud sin validarlo | Alguien que aprende (o un error) envía `{}` y tu archivo guardado queda inservible | Llama a `validateSettings()` antes de guardar cualquier cosa, siempre |
| Devolver `200` en cada respuesta, incluso en errores | El cliente no puede distinguir éxito de fallo sin leer el cuerpo | Usa el código de estado que corresponde a lo que pasó (ver la tabla del Paso 5) |
| Olvidar los encabezados de CORS en el preflight `OPTIONS`, y agregarlos solo a la solicitud real | El navegador bloquea la solicitud real antes de que se envíe siquiera | Llama a `setCorsHeaders(res)` en cada solicitud, incluyendo `OPTIONS` |
| Leer `process.env.PORT` sin valor de respaldo | El servidor falla de inmediato en una máquina sin archivo `.env` | `Number(process.env.PORT) \|\| 8877` |
| Suponer que la API siempre está disponible | El cliente falla en un servidor estático simple, o sin red en absoluto | Intenta la API, recurre a `localStorage`, y dilo |

## Solución de problemas

**`curl: (7) Failed to connect`.** El servidor no está corriendo, o está en un puerto distinto al que esperas. Revisa el `PORT` de `.env`, y el mensaje que imprimió `node server.js`.

**`EADDRINUSE`.** Algo más ya está escuchando en ese puerto (quizás un servidor que iniciaste antes y olvidaste detener). Detenlo, o cambia `PORT` en `.env`.

**El panel de configuración dice "Server not running", aunque `node server.js` esté corriendo.** Abriste `index.html` a través de un servidor *distinto* (o directamente como archivo), no a través del servidor de Node en el puerto 8877. Abre en su lugar `http://127.0.0.1:8877/`: el servidor del Curso 5.1 sirve al propio cliente.

**`fetch` falla en la consola con un error de CORS** (Firefox: "Cross-Origin Request Blocked"; Safari: "Origin ... is not allowed by Access-Control-Allow-Origin"). Termina el TODO 8, y asegúrate de que `ALLOWED_ORIGIN` en `.env` coincida (o sea `*`).

**`node --test` se cuelga, o una corrida posterior reutiliza datos viejos.** Asegúrate de que `server.test.js` establezca `process.env.DATA_FILE` con una ruta temporal *antes* de importar `server.js`: una vez que un módulo se carga, sus constantes de nivel superior (como `DATA_FILE`) ya no vuelven a leer el entorno.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: agrega una ruta `GET /api/health`, y un quinto ajuste.
2. **[Creativo](challenges/challenge-2.es.md)**: agrega exhibiciones y presets de cámara propios, en tu propio idioma.
3. **[Explorador](challenges/challenge-3.es.md)**: agrega un historial de configuraciones que el servidor conserve, y una ruta para "deshacer".

## Cómo entregar tu trabajo

1. Completa cada elemento de [`tests/checklist.md`](tests/checklist.md).
2. Toma una captura de pantalla del panel de configuración, y otra de tu terminal mostrando cada verificación de `node --test` pasando.
3. Guárdalas en tu diario de aprendizaje y portafolio. Compártelas con otras personas que programan: consulta [dónde compartir tu trabajo y pedir ayuda](../../docs/en/community.md) (en inglés).
4. En tu diario, responde: ¿qué código de estado te sorprendió más una vez que entendiste lo que realmente promete a un cliente, y por qué?

## Lecturas adicionales

- [MDN: An overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview) (en inglés)
- [MDN: HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) (en inglés)
- [Node.js docs: node:http](https://nodejs.org/api/http.html) (en inglés)
- [Node.js docs: node:test](https://nodejs.org/api/test.html) (en inglés)
- [MDN: Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) (en inglés)

## Mujeres que conviene conocer

**Marcia Villalba** es una ingeniera de software uruguaya radicada en Helsinki. Pasó unos siete años, de 2019 a 2026, como Principal Developer Advocate en el equipo serverless de AWS y es AWS Serverless Hero, y fundó Desplegando.cloud, una comunidad, canal de YouTube y plataforma de cursos en español que enseña AWS, computación serverless e IA agentic.

Explicar cómo encajan un servidor, una API y un cliente, con claridad y en tu propio idioma, es exactamente la destreza que esta lección te pide practicar por primera vez. Marcia lleva años haciendo precisamente eso para la comunidad de desarrolladoras y desarrolladores de habla hispana, desde el propio escenario de AWS hasta una plataforma que construyó ella misma.

_Datos de fuentes públicas, verificados en 2026. ¿Encontraste un error? [Avísanos](https://github.com/XR-Dev-Camp/xr-camp/issues)._

## Estándar destacado

Este servidor habla **HTTP**, estandarizado por el IETF (más recientemente la semántica de HTTP en el RFC 9110), incluyendo los códigos de estado en los que se apoya esta lección. `fetch()`, los objetos de solicitud y respuesta que intercambia, y CORS son parte del **Fetch Standard** del WHATWG; el JSON que tu API envía y recibe sigue **ECMA-404**, el formato de intercambio de datos JSON. Ninguno de estos necesita un framework para usarse correctamente, solo entender qué promete cada uno.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
