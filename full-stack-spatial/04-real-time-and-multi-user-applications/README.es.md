# Aplicaciones en tiempo real y multiusuario

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `full-stack-spatial` · **Lección:** `real-time-and-multi-user-applications-04` · **Tiempo:** unas 17 horas · 23 sesiones de 45 minutos · unas 6 semanas con 4 sesiones por semana

> **Esta es una lección más larga (23 sesiones).** Avanza paso a paso: cada sesión termina igual con algo que hiciste, y está bien tomar un descanso corto entre pasos.

---

> Construye un pequeño mundo 3D colaborativo.

## Objetivos de aprendizaje

Al terminar este proyecto podrás:

1. Explicar qué es una actualización (upgrade) de WebSocket, y por qué autenticarla necesita la misma cookie de sesión que ya lleva una solicitud HTTP, en lugar de un token que la página inventa por sí misma.
2. Construir un pequeño registro de salas en memoria: unirse a una sala, salir de ella, y transmitir un mensaje a cada miembro excepto uno.
3. Enviar actualizaciones de posición a una tasa máxima fija, e interpolar entre las actualizaciones que recibe un navegador para que el movimiento de un avatar remoto se vea fluido a pesar de llegar por pasos.
4. Validar, sanear (sanitize) y limitar la tasa del texto del chat en el servidor, independientemente de lo que el cliente que envía ya afirme haber hecho.
5. Explicar la diferencia entre una acción de moderación local del cliente (silenciar) y una aplicada por el servidor (bloquear), e implementar ambas.
6. Escribir un reporte de moderación a una base de datos desde un mensaje de WebSocket, nombrando siempre a quien reporta desde su propia sesión autenticada, nunca desde el cuerpo del mensaje.
7. Reconectar un WebSocket caído automáticamente, con retroceso exponencial (exponential backoff) y aleatoriedad (jitter), sin saturar al servidor en el instante en que vuelve.
8. Enumerar, de memoria, qué es lo que un servidor en tiempo real nunca debe aceptar solo porque un cliente lo dice: identidad, tasa, posición, y pertenencia a una sala, entre otros.

## Requisitos previos

- **Curso 5.3: Bases de datos y datos de aplicaciones espaciales**: esta lección reutiliza sus cuentas, sesiones, y configuración de SQLite, y agrega una tabla nueva (`reports`) a la misma base de datos.
- **Curso 5.2: Autenticación y cuentas de usuario**: sesiones, CSRF, y la cookie que reutiliza la actualización de WebSocket de esta lección.
- **Curso 5.1: Fundamentos de backend y API**: rutas, cuerpos JSON, y códigos de estado.
- Comodidad ejecutando dos cosas a la vez: dos terminales, y, para probar de verdad, dos ventanas de navegador.

## Herramientas necesarias

| Herramienta | Propósito | Costo |
| --- | --- | --- |
| Node.js 22.5 o posterior (se recomienda la LTS "24 Krypton") | Ejecuta el servidor | Gratis |
| npm (viene con Node.js) | Instala la única dependencia de esta lección, `ws` | Gratis |
| Un editor de texto (por ejemplo, VS Code) | Escribir el código del servidor y del cliente | Gratis |
| Dos ventanas o pestañas de navegador (Chrome, Firefox, Safari o Edge) | Probar la sala con más de un miembro a la vez; esta lección no se puede probar por completo sola | Gratis |

Node.js se puede descargar desde [nodejs.org](https://nodejs.org/); estudiantes en China continental también pueden usar el [espejo de Node.js de npmmirror](https://registry.npmmirror.com/binary.html?path=node/). Esta lección instala un paquete de npm, `ws`: la primera dependencia en todo XR Camp (los Cursos 5.1-5.3 usaron solo los propios módulos integrados de Node). `npm install` necesita internet una vez; si npmjs.com va lento, ejecuta en su lugar `npm install --registry=https://registry.npmmirror.com`. Después de eso, `node_modules/` queda en disco y el servidor corre sin conexión como cualquier otra lección.

## Lo que vas a construir

El Curso 5.3 le dio a cada cuenta una base de datos propia de escenas. Esta lección conecta a varias cuentas con sesión iniciada *entre sí*, al mismo tiempo: una pequeña sala compartida donde cada persona que tiene la página abierta ve moverse a todas las demás, en algo cercano al tiempo real, sobre una conexión WebSocket en lugar de una API de solicitud-respuesta. Vas a autenticar la propia actualización de WebSocket con la cookie de sesión que construyó el Curso 5.2, mantener un pequeño registro en memoria de quién está en la sala, retransmitir actualizaciones de posición a una tasa limitada con interpolación del lado del cliente para que el movimiento se vea fluido, agregar chat saneado y con límite de tasa, y darle a quien aprende una forma de bloquear, silenciar, y reportar a alguien, con el reporte realmente escrito en la base de datos, porque esa es la única pieza de la historia de moderación de esta lección que tiene que sobrevivir a un reinicio y llegar a una persona más adelante.

Este es el cuarto paso de la **exhibición cultural virtual** en curso que atraviesa la Fase 5: 5.1 le dio una API, 5.2 le dio cuentas, 5.3 le dio una base de datos real, y esta lección le da otras personas, al mismo tiempo, en la misma sala. El Curso 5.5 vuelve a este mismo servidor para encontrar y corregir los errores de seguridad a los que es propensa una función en tiempo real como esta.

La solución de referencia está en [`completed/`](completed/); el starter tiene **16 TODOs numerados** repartidos entre `server/` y `js/`, con `db.js`, `auth.js`, `sessions.js`, `rateLimit.js`, `cookies.js`, y `routes.js` heredados y terminados (esta lección no vuelve a enseñar cuentas ni SQLite), así puedes enfocarte en lo nuevo: la actualización de WebSocket, las salas, los límites de tasa, el saneamiento, la moderación, la interpolación, y la reconexión.

## Guía de carpetas

```text
04-real-time-and-multi-user-applications/
├── README.md
├── starter/                      # begin here
│   ├── index.html, styles.css
│   ├── js/
│   │   ├── net.js                # TODO 12, 13: reconnect, throttled sends
│   │   ├── scene.js              # TODO 14: interpolation
│   │   └── main.js               # TODO 15, 16: chat, block/mute/report UI
│   └── server/
│       ├── migrations/           # numbered .sql files, run in order
│       ├── db.js, auth.js, sessions.js, rateLimit.js, cookies.js, routes.js   # carried over
│       ├── validation.js         # TODO 2: position, chat, and report checks
│       ├── sanitize.js           # TODO 3: chat text cleanup
│       ├── wsAuth.js             # TODO 4: authenticate the upgrade
│       ├── rooms.js              # TODO 5: join, leave, broadcast, presence
│       ├── realtime.js           # TODO 6-9: position, chat, block, report
│       ├── server.js             # TODO 10: the `upgrade` event
│       └── server.test.js        # TODO 11: two-client assertions
├── completed/                    # reference solution
├── challenges/                   # Three challenges: Foundation is required
├── tests/                        # self-review checklist
├── assets/
└── screenshots/
```

## Configuración

1. Abre una terminal y ejecuta `node --version`. Necesitas la 22.5 o posterior; este curso está escrito y probado contra Node 24 (la LTS actual).
2. Haz `cd` a `starter/server` y ejecuta `npm install`: esta es la primera lección en XR Camp que instala algo, e instala exactamente un paquete, `ws`, fijado a la versión exacta en [`package.json`](starter/server/package.json). `node_modules/` se crea en disco pero nunca se incluye en el repositorio (commit) (ver `.gitignore`).
3. Copia `starter/server/.env.example` a `starter/server/.env` (ajusta `PORT` solo si otra cosa ya usa el 8880).
4. Sirve todo el repositorio desde su raíz con cualquier servidor de archivos estático (por ejemplo `python3 -m http.server 8766`, o el que ya ejecutan las propias herramientas de este curso), así `starter/index.html` abre sobre `http://`, no `file://`.
5. En una segunda terminal, desde `starter/server`, ejecuta `node server.js`. Deberías ver `Real-time room server listening on http://127.0.0.1:8880` y, una vez, una advertencia de una línea `ExperimentalWarning: SQLite is an experimental feature`. Ambas cosas son esperadas; ver Solución de problemas.
6. Abre el `starter/index.html` servido, registra una cuenta, e inicia sesión. Hasta que el TODO 10 (la actualización de WebSocket) esté terminado, el panel de la sala aparecerá pero nada se conectará; eso es esperado tan pronto en el proceso.
7. Para cada prueba desde el Paso 15 en adelante, abre la página en **dos** ventanas de navegador (o una ventana normal y una privada/de incógnito), inicia sesión con dos cuentas distintas, y observa cómo una afecta a la otra.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Lee este Recorrido y los archivos del starter; ejecuta el servidor y confirma que `node --version`, `npm install`, y `node server.js` funcionan todos. | El starter corriendo, y un plan para los 16 TODOs por delante. |
| 2 | TODO 1: escribe `migrations/002_create_reports.sql`. | `node --test` pasa las migraciones sin error (las aserciones sobre `reports` en sí llegan después). |
| 3 | TODO 2a-b: `validatePosition` y `validateChatText` en `validation.js`. | Un script rápido de prueba (o el depurador) muestra a ambos rechazando un valor fuera de rango o vacío. |
| 4 | TODO 2c: `validateReport`. | La misma comprobación rápida, para un reporte con una razón faltante. |
| 5 | TODO 3: `sanitizeChatText` en `sanitize.js`. | `node --test` (una vez escrito, Paso 16) lo revisará, pero por ahora confirma a mano que se eliminan los caracteres de control y los espacios extra. |
| 6 | TODO 4: `authenticateUpgrade` en `wsAuth.js`. | Una función lista para llamarse, aún sin conectar a `server.js` (eso es el Paso 15). |
| 7 | TODO 5a-b: `joinRoom`, `leaveRoom`, y `presenceList` en `rooms.js`. | Un registro de sala que puedes ejercitar desde un script de prueba. |
| 8 | TODO 5c: `broadcast` en `rooms.js`, incluyendo el filtro de oyentes bloqueados. | Todo `rooms.js` terminado. |
| 9 | TODO 6: `handlePosition` en `realtime.js`. | Los mensajes de posición tienen límite de tasa, se validan, y se retransmiten; probable una vez que se termine el Paso 15. |
| 10 | TODO 7: `isChatRateLimited` y `handleChat`. | El chat se valida, sanea, limita en tasa, y retransmite. |
| 11 | TODO 8: `handleBlock`. | Bloquear activa o desactiva `blockedUserIds` y lo confirma. |
| 12 | TODO 9: `handleReport`. | Un reporte resuelve el nombre de usuario actual del objetivo desde el propio registro del servidor y llama a `insertReport`. |
| 13 | Vuelve a leer `realtime.js` de principio a fin ahora que los TODOs 6-9 están todos terminados, revisando cada lugar donde usa el propio registro del servidor sobre quién es una conexión, nunca el mensaje que acaba de recibir. | Notas sobre la respuesta al Objetivo de aprendizaje 8, en tus propias palabras. |
| 14 | TODO 10: el evento `upgrade` en `server.js`. | El primer momento real de extremo a extremo: abre dos pestañas de navegador, inicia sesión como dos cuentas, y observa aparecer el avatar y la fila del registro de la otra persona. |
| 15 | TODO 11a-b: termina la prueba de presencia/posición/chat de dos clientes de `server.test.js` y su prueba de saneamiento. | Dos pruebas más en verde. |
| 16 | TODO 11c-d: termina las pruebas de reporte y bloqueo; ejecuta `node --test` hasta que pase todo. | Una suite de pruebas en verde para todo el servidor. |
| 17 | TODO 12a-b: `backoffDelay` y `scheduleReconnect` en `js/net.js`. | Detén el servidor, observa cómo el banner de estado anuncia los intentos de reconexión, reinicia el servidor, y observa cómo se recupera solo. |
| 18 | TODO 13: `sendPosition` con límite de tasa en `js/net.js`. | Mantener presionado un botón de movimiento ya no envía más de 10 mensajes de posición por segundo (revisa los frames WS en la pestaña de Red). |
| 19 | TODO 14a-b: `setRemoteTarget` y `currentInterpolated` en `js/scene.js`. | Con dos pestañas abiertas, el avatar de la otra persona se desliza entre posiciones en lugar de saltar. |
| 20 | TODO 15: el manejador de envío del formulario de chat en `js/main.js`. | El chat funciona, en ambas pestañas, en orden. |
| 21 | TODO 16a-c: `toggleMute`, `toggleBlock`, `openReport`/`closeReport` en `js/main.js`. | Silenciar, bloquear, y reportar funcionan todos desde la tabla del registro; un reporte aparece si inspeccionas la base de datos (ver Solución de problemas). |
| 22 | Trabaja [`tests/checklist.md`](tests/checklist.md), incluyendo su sección "3D and XR (manual)", con un teclado real y, si tienes uno, un lector de pantalla. | Cada elemento marcado, o una nota sobre qué no pudiste probar y por qué. |
| 23 | Completa el [reto Fundamento](challenges/challenge-1.es.md) obligatorio, luego uno de los retos Creativo o Explorador, y luego **Entregando tu trabajo**. | Capturas de pantalla, tu entrada de diario, y un proyecto listo para mostrar. |

### Paso 1: lee la forma de una conexión WebSocket (sin TODO todavía)

Una solicitud HTTP responde una vez y termina. Un WebSocket también empieza como una solicitud HTTP, con un encabezado `Upgrade: websocket`, pero en lugar de un cuerpo de respuesta, el servidor entrega la conexión TCP subyacente a un protocolo distinto, y cualquiera de los dos lados puede entonces enviar un mensaje en cualquier momento, mientras la conexión siga abierta. `server.js` escucha esto en el propio evento `upgrade` de Node, en el mismo `http.Server` que ya responde a las rutas `/api/...`. Nada en ese evento prueba quién está preguntando; `wsAuth.js` (Paso 6) es lo que lo verifica.

### Paso 2: la única tabla nueva (TODO 1)

Abre `server/migrations/002_create_reports.sql`. El comentario dentro describe cada columna, en el mismo estilo que usa `001_create_users.sql` (ya terminado, heredado del Curso 5.3): una sentencia por archivo, tipos de columna simples, `REFERENCES` para la única clave foránea.

```sql
-- from 001_create_users.sql, already finished:
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL
);
```

`db.js` (heredado, terminado) ya exporta `insertReport` y `listReportsForRoom`; una vez que existe esta migración, esas funciones tienen una tabla en la que escribir y de la que leer.

### Paso 3: validar una posición y un mensaje de chat (TODO 2a-b)

Abre `server/validation.js`. `validateCredentials` (ya terminada, del Curso 5.2) muestra el patrón que sigue cada validador de este proyecto: comprobar la forma, reunir cada problema en lugar de detenerse en el primero, y devolver `{ valid, errors, value }`, donde `value` contiene *solo* los campos que este servidor decidió que son seguros de usar a continuación, nunca nada extra que el input haya incluido de paso.

```js
// The shape every validator in this file follows:
export function validateSomething(input) {
  const errors = [];
  // ...checks that push to `errors`...
  if (errors.length > 0) return { valid: false, errors, value: null };
  return { valid: true, errors: [], value: { /* only the checked fields */ } };
}
```

`validatePosition` comprueba cuatro números; `validateChatText` comprueba la longitud de una cadena. Ninguno de los dos cambia el texto; ese es el trabajo de `sanitizeChatText` (Paso 5), mantenido separado a propósito (ver Explicación del código clave).

### Paso 4: validar un reporte (TODO 2c)

`validateReport` comprueba que `reason` sea uno de una lista fija (`REPORT_REASONS`) en lugar de cualquier cadena: una moderadora que revise reportes más adelante necesita un conjunto pequeño y conocido de categorías, no texto libre que quien reporta podría redactar de cien formas distintas.

### Paso 5: sanear el texto del chat (TODO 3)

Abre `server/sanitize.js`. `js/main.js` ya renderiza cada línea de chat con `textContent`, que no puede ejecutar una etiqueta `<script>` sin importar lo que contenga; entonces, ¿por qué sanear también en el servidor? Porque `textContent` es una propiedad *de esta lección en concreto*, y nada impide que un cliente futuro, una herramienta de depuración, o una integración con otro sistema de chat use `innerHTML` en su lugar, sin saber que este texto nunca se revisó para eso. La defensa en profundidad significa que ninguna de las dos capas confía en que la otra ya haya hecho el trabajo.

### Paso 6: autenticar la actualización (TODO 4)

Abre `server/wsAuth.js`. Reutiliza dos funciones que ya escribió el Curso 5.2: `parseCookies` y `getSession`, exactamente igual que `requireAuth` en `routes.js` lo hace para una solicitud HTTP ordinaria. Lo único nuevo aquí es *cuándo* se ejecuta: antes de que se permita que exista siquiera una conexión WebSocket, no después.

### Paso 7-8: el registro de salas (TODO 5a-c)

Abre `server/rooms.js`. Una sala es un `Map<connectionId, member>`, mantenido en la propia memoria de este módulo. `joinRoom` y `leaveRoom` son los dos lados de la pertenencia; `presenceList` convierte a los miembros de la sala en la instantánea plana, construida por el servidor, que recibe alguien recién unido como "quién ya está aquí." `broadcast` es la única función que llama cada manejador de mensajes en `realtime.js` para difundir un mensaje, que es también el único lugar donde se hace cumplir el bloqueo (TODO 8), así ningún manejador individual puede olvidarse de comprobarlo.

### Paso 9: actualizaciones de posición (TODO 6)

Abre `server/realtime.js`. `handlePosition` tiene límite de tasa *antes* de validar: un cliente que envía actualizaciones más rápido que `POSITION_MIN_INTERVAL_MS` no recibe nada de vuelta, ni siquiera un error, porque en una conexión saludable esto pasa constantemente (ver Paso 18) y no es un error que valga la pena reportar. Cada posición retransmitida nombra a quien la envía desde `member.userId` y `member.username`, el propio registro del servidor sobre quién es esta conexión, nunca desde el mensaje entrante, que podría afirmar ser cualquier persona.

### Paso 10: chat (TODO 7)

`isChatRateLimited` mantiene una ventana deslizante de los envíos recientes propios de esta conexión; `handleChat` la comprueba, valida, sanea, y, a diferencia de las actualizaciones de posición, retransmite el mensaje también a quien lo envió, así el registro de chat de todas las personas (incluida quien lo envió) muestra los mensajes en el mismo orden.

### Paso 11: bloqueo (TODO 8)

`handleBlock` es corta: agrega o elimina un userId de `member.blockedUserIds`. Toda la aplicación real ya existe, en el `broadcast` de `rooms.js` (Paso 8); esta función solo tiene que mantener correcto el Set.

### Paso 12: reportes (TODO 9)

`handleReport` resuelve el nombre de usuario *actual* de la cuenta reportada desde el propio registro de la sala (`presenceList`), no desde nada que el cliente haya enviado; de lo contrario, un cliente podría presentar un reporte contra un nombre de usuario de su elección que no tenga nada que ver con `targetUserId`. El id de quien reporta siempre viene de `member.userId`, por la misma razón por la que los inicios de sesión nunca toman un id de cuenta del cuerpo de una solicitud.

### Paso 14: conectando la actualización (TODO 10)

Abre `server/server.js`. El evento `upgrade` es el único lugar donde toda la autenticación y la lógica de salas de esta lección realmente se conecta a un socket de red real: comprueba la ruta, llama a `authenticateUpgrade`, rechaza con una respuesta HTTP simple si falla, y si no, entrega el socket a `wss.handleUpgrade` y llama a `handleConnection`. Este es también el primer momento en que puedes probar de verdad cualquiera de esto: abre dos pestañas de navegador una vez que esté hecho.

### Paso 15-16: terminando las pruebas (TODO 11a-d)

Abre `server/server.test.js`. Las dos pruebas de autenticación ya pasan (la lógica de sesión del Curso 5.2 nunca cambió); las cuatro pruebas TODO ejercitan todo lo construido desde entonces. Lee con cuidado el comentario encima de cada una; en particular, observa que `collectMessages` se adjunta a un socket *antes* de esperar (await) a su evento `'open'` en las pruebas terminadas, no después: el servidor puede responder en el instante en que su handshake se completa, lo cual puede ser antes de que la siguiente línea de tu función de prueba se ejecutara de otro modo. Adjuntar el oyente un instante demasiado tarde pierde el mensaje en silencio.

### Paso 17: reconectando (TODO 12a-b)

Abre `js/net.js`. `backoffDelay` es "retroceso exponencial con jitter completo" (exponential backoff with full jitter): cada reintento espera una cantidad *aleatoria* de tiempo hasta un techo que se duplica en cada intento, limitado a `MAX_DELAY_MS`. La aleatoriedad no es decoración: sin ella, cada estudiante cuyo Wi-Fi se cae en el mismo momento reintentaría al unísono, en los mismos instantes, lo cual es casi el peor patrón posible para un servidor que intenta recuperarse.

### Paso 18: limitar la tasa de envíos de posición (TODO 13)

`sendPosition` descarta cualquier llamada hecha menos de `POSITION_SEND_INTERVAL_MS` después de la última que realmente envió. `js/main.js` puede llamarla en cada cuadro de animación sin saber ni preocuparse por este límite, que es también exactamente por qué el propio límite de tasa de `server/realtime.js` (Paso 9) no se puede eliminar: este límite del lado del cliente es una cortesía, no una garantía, ya que nada impide que un cliente distinto lo ignore.

### Paso 19: interpolar posiciones remotas (TODO 14a-b)

Abre `js/scene.js`. Un mensaje de posición llega como máximo 10 veces por segundo; esta escena renderiza mucho más seguido que eso. `setRemoteTarget` registra dónde *estaba* un avatar (`from`) y hacia dónde *va* (`to`); `currentInterpolated` (llamada en cada cuadro por el bucle de renderizado, ya terminado) suaviza el movimiento entre ambos a lo largo de `INTERPOLATION_MS`. El detalle que vale la pena releer dos veces: `from` se establece a la posición *actualmente renderizada* del avatar, no a su objetivo anterior; así una actualización que llega a mitad de una transición empieza la siguiente desde donde el ojo realmente está, sin ningún salto visible.

### Paso 20: enviar chat (TODO 15)

Abre `js/main.js`. El manejador de envío es corto porque el trabajo interesante ya pasó en el servidor (Paso 10): esto solo tiene que leer el input, protegerse contra un mensaje vacío o una conexión faltante, y llamar a `net.sendChat`.

### Paso 21: bloquear, silenciar, y reportar desde la interfaz (TODO 16a-c)

`toggleMute` nunca habla con el servidor; ver Explicación del código clave para saber por qué esa es la decisión correcta aquí, no un atajo. `toggleBlock` sí lo hace, a través de `net.sendBlock`. `openReport`/`closeReport` manejan la visibilidad y el foco de un formulario pequeño; el reporte en sí lo envía el manejador de envío (ya terminado) del formulario una vez que hayas escrito estas dos funciones.

## Explicación del código clave

- **Autenticar un evento `upgrade`, no una llamada al constructor `WebSocket`.** El `WebSocket` de un navegador no puede establecer encabezados personalizados, así que no puede llevar un token portador (bearer token) de la forma en que puede hacerlo un `fetch()`. Lo que sí puede hacer, para una URL del mismo origen, es enviar las cookies ordinarias de la página, de la misma forma que lo hace un `fetch()` del mismo origen con `credentials: 'include'`. `wsAuth.js` lee esa cookie en la solicitud HTTP simple que precede al cambio de protocolo, antes de que `ws` siquiera vea el socket.
- **Validar y sanear son dos funciones distintas.** `validateChatText` responde sí o no; `sanitizeChatText` cambia el valor. Mantenerlas separadas hace que cada una sea fácil de probar por sí sola, y significa que un cambio futuro de regla (un nuevo carácter prohibido, por ejemplo) toca exactamente una función en lugar de un validador que también resulta que muta su entrada.
- **Límites de tasa del lado del servidor, aunque el cliente ya se limite a sí mismo.** El `sendPosition` de `js/net.js` y el formulario de chat frenan ambos los envíos más rápidos, pero un cliente modificado o escrito a mano no lo haría. Los propios límites de `server/realtime.js` (`POSITION_MIN_INTERVAL_MS`, `CHAT_MAX_MESSAGES`) son los que en verdad hacen cumplir la regla; las versiones del lado del cliente existen solo para ser buenas ciudadanas y evitar viajes de ida y vuelta desperdiciados.
- **Silenciar es local; bloquear lo aplica el servidor.** Silenciar cambia lo que muestra tu propio navegador, al instante, sin viaje de ida y vuelta; apropiado para "yo personalmente no quiero ver esto," una preferencia sobre la que solo tu navegador necesita actuar. Bloquear le pide al servidor que deje de retransmitirte a esa persona por completo, así que sigue funcionando incluso si su cliente intenta ignorarlo; apropiado para "que esta persona deje de llegar a mí," una garantía que solo puede dar el servidor, que controla lo que realmente se envía.
- **La interpolación convierte pasos en movimiento.** Diez actualizaciones por segundo no son fluidas por sí solas; suavizar entre las últimas dos posiciones conocidas a lo largo del tiempo que se espera que tome una actualización es lo que hace que se lea como movimiento continuo, la misma técnica que usan los juegos en tiempo real y las herramientas colaborativas exactamente por esta razón.
- **Retroceso exponencial con jitter completo.** Duplicar la espera después de cada intento fallido, hasta un techo, evita que un servidor que ya está luchando reciba más carga mientras más lucha. Agregar aleatoriedad encima de eso (en lugar de esperar siempre el techo completo) distribuye los intentos de reconexión de muchos clientes que se desconectaron juntos, en lugar de que todos reintenten en el mismo instante.

## Accesibilidad 3D y XR

- **Descripción de la escena.** `#scene-description` indica tu propia posición aproximada, orientación, y quién más está en la sala, en texto plano, construido a partir de los mismos datos que renderiza la vista 3D (WCAG 1.1.1, 1.3.1).
- **Movimiento solo con teclado.** Cada movimiento y giro es un botón, no un gesto de arrastre; este proyecto nunca le pide a quien aprende que haga clic y arrastre dentro del lienzo 3D para participar en la sala.
- **Un gemelo 2D de la vista 3D.** La tabla del registro contiene la posición y orientación exactas de cada miembro, siempre, haya o no WebGL disponible o la vista 3D se haya renderizado ya.
- **El chat como región dinámica, no solo píxeles.** `#chat-log` tiene `role="log"` con `aria-live="polite"`, así un mensaje nuevo se anuncia sin necesidad de que el foco se mueva ahí.
- **Movimiento reducido y un control de Pausa.** El balanceo en reposo de los avatares empieza pausado cuando `prefers-reduced-motion: reduce` está activado, y el botón **Pause animation** (con `aria-pressed`) funciona sin importar esa preferencia. El propio avatar de quien aprende nunca se balancea en absoluto; ver el comentario de `js/scene.js` sobre por qué, y Errores comunes más abajo.
- **Comodidad.** La cámara está fija durante toda la lección; nada relacionado con unirse a una sala, moverse, o chatear mueve nunca el punto de vista en sí.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| Cada botón de acción del registro tiene un `aria-label` distintivo ("Mute: alice", no solo "Mute") | 2.5.3, 4.1.2 | Varias filas pueden tener un botón etiquetado de forma idéntica; el nombre accesible debe decir sobre qué miembro actúa. |
| `#chat-log` tiene `role="log"` con `aria-live="polite"` | 4.1.3 | Un mensaje de chat nuevo se anuncia sin mover el foco hacia el registro. |
| La tabla del registro tiene un `<caption>` y `<th scope="col">`/`<th scope="row">` | 1.3.1 | Un lector de pantalla anuncia a qué miembro y a qué eje pertenece cada número. |
| El movimiento es mediante botones operables con teclado, nunca un arrastre en el lienzo | 2.1.1 | Unirse y moverse en la sala funciona por completo con `Tab` y `Enter`/`Espacio`. |
| La animación respeta `prefers-reduced-motion` y ofrece un botón de Pausa | 2.2.2 | El movimiento que se inicia solo, sin que quien aprende lo pida, debe poder detenerse. |
| `role="list"` en cada `<ul>` con `list-style: none` | Buena práctica | Safari elimina la semántica de lista de un `<ul>` al que se le quitó el estilo de lista. |

## Consideraciones de rendimiento

- **Un límite de tasa también es un presupuesto de ancho de banda.** Diez actualizaciones de posición por segundo, por conexión, es el techo que eligió esta lección porque una sala pequeña (una docena de estudiantes, más o menos) queda cómodamente por debajo de lo que puede soportar una conexión doméstica o una red universitaria compartida; una sala mucho más grande necesitaría bajarlo, agrupar actualizaciones, o retransmitir solo a los miembros cercanos.
- **`broadcast` se salta los sockets cerrados.** Comprobar `member.ws.readyState === member.ws.OPEN` antes de cada `send` evita el costo (y el error lanzado) de escribir a un socket que ya se está yendo.
- **La interpolación es barata; más historial no lo es.** Esta lección solo mantiene una posición `from` y una `to` por cada avatar remoto: suficiente para un movimiento fluido a esta tasa de actualización. Un sistema que también intentara *predecir* el movimiento entre actualizaciones necesitaría más historial y más matemática, por una ganancia que la mayoría de las salas pequeñas no necesitan.
- **El intervalo del latido (heartbeat) tiene `unref()`.** `setInterval(...).unref()` le dice a Node que este temporizador por sí solo nunca debería mantener el proceso corriendo; importante para `server.test.js`, que necesita que el servidor pueda apagarse por completo entre archivos de prueba.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Confiar en un campo `userId` o `username` dentro de un mensaje entrante de WebSocket | Cualquier cliente puede afirmar ser cualquier persona; un reporte, un mensaje de chat, o una actualización de posición podrían falsificarse como otra persona | Usa siempre el propio registro del servidor en `member` (establecido una vez, al momento de la conexión, desde la sesión autenticada) |
| Limitar la tasa de los envíos de posición solo en el cliente | Un cliente modificado o escrito a mano puede enviar tan rápido como quiera | Aplica el mismo límite de nuevo en `server/realtime.js`, independientemente del cliente |
| Comprobar `if (Date.now() - member.lastPositionAt < ...)` *después* de ya haber transmitido | El límite de tasa no hace nada; la parte costosa (difundir a cada otro miembro) ya pasó | Comprueba el límite de tasa primero, antes de validar o transmitir cualquier cosa |
| Hacer que el propio avatar de quien aprende se balancee igual que los remotos | La posición mostrada en 3D se aleja de los números exactos en la tabla del registro y de los números realmente enviados al servidor | Solo anima en reposo a los avatares remotos; el propio avatar de quien aprende siempre está exactamente donde lo dejó el último movimiento |
| Reconectar con un retraso fijo (`setTimeout(open, 1000)`) | Cada cliente cuya conexión cae a la vez, un tropiezo de Wi-Fi compartido, reintenta al unísono, en el mismo instante, repetidamente | Retroceso exponencial con jitter (TODO 12), así los reintentos se distribuyen en el tiempo |

## Solución de problemas

**`ExperimentalWarning: SQLite is an experimental feature and might change at any time`.** Esperado, cada vez que se importa `node:sqlite`. Una advertencia, no un error: el servidor sigue corriendo.

**El panel de la sala aparece después de iniciar sesión, pero nada se conecta nunca.** Antes de que el TODO 10 esté terminado, `server.js` no tiene ningún manejador de `upgrade` en absoluto, así que cada intento de conexión de `js/net.js` simplemente se cuelga hasta que el navegador se rinde. Esto es esperado hasta el Paso 14.

**`Error: This test is not implemented yet — see TODO 11a` (o 11b/11c/11d).** Esperado hasta que termines ese TODO; son marcadores de posición deliberados, no un error en el starter.

**Un WebSocket se conecta, y luego se cierra de inmediato con el código `1008`.** El parámetro de consulta `room` no coincidió con `KNOWN_ROOMS` en `rooms.js`. `js/net.js` siempre solicita `main-hall`; comprueba que no hayas editado esa cadena en solo uno de los dos archivos.

**Dos pestañas con sesión iniciada como la *misma* cuenta se comportan de forma extraña.** El modelo de esta lección da una conexión por inicio de sesión, no una por cuenta; iniciar sesión con la misma cuenta dos veces crea dos miembros de sala independientes que casualmente comparten un nombre de usuario. Usa dos cuentas distintas para probar correctamente.

**`npm install` falla, o es muy lento, en China continental.** Ejecuta `npm install --registry=https://registry.npmmirror.com` en lugar del registro por defecto.

**Un reporte no parece haberse guardado.** No hay interfaz para leer reportes de vuelta en esta lección (una herramienta de revisión para moderadoras está fuera del alcance); revisa con `node -e "const {db}=await import('./db.js'); console.log(db.prepare('SELECT * FROM reports').all())"` desde `server/` (con `DB_FILE` sin establecer, para que lea el mismo archivo que usa el servidor corriendo), o escribe un script de prueba corto.

**El puerto 8880 ya está en uso.** Establece un `PORT` distinto en `server/.env`, y actualiza `ALLOWED_ORIGIN` para que coincida.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: agrega un tipo de mensaje de gesto de "saludo" y retransmítelo de la misma forma que se retransmiten las actualizaciones de posición.
2. **[Creativo](challenges/challenge-2.es.md)**: haz que la sala refleje tu propio idioma, cultura, o comunidad.
3. **[Explorador](challenges/challenge-3.es.md)**: una segunda sala, y una forma de moverse entre ellas.

## Cómo entregar tu trabajo

1. Trabaja [`tests/checklist.md`](tests/checklist.md).
2. Toma capturas de pantalla: dos pestañas de navegador mostrando el avatar y la fila del registro de la otra, el registro de chat con mensajes de ambas, y la salida de terminal de `node --test` mostrando todo aprobado.
3. Guárdalas en tu diario de aprendizaje y portafolio. Compártelas con otras personas que programan: consulta [dónde compartir tu trabajo y pedir ayuda](../../docs/en/community.md) (en inglés).
4. Pregunta de diario: esta lección hace cumplir la misma regla (límites de tasa, validación, "quién es esta conexión") tanto en el cliente como en el servidor, y explícitamente no confía en la copia del cliente. Encuentra un lugar en tu propio proyecto, esta lección o una anterior, donde solo hayas comprobado algo en la interfaz, y explica qué podría hacer al respecto una persona que aprende con la consola de desarrollador del navegador abierta.

## Lecturas adicionales

- [MDN: The WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) (en inglés)
- [MDN: Writing WebSocket servers](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers) (en inglés)
- [`ws` package documentation](https://github.com/websockets/ws) (en inglés)
- [AWS Architecture Blog: Exponential Backoff And Jitter](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/) (en inglés)
- [OWASP Cheat Sheet Series: WebSocket Security](https://cheatsheetseries.owasp.org/cheatsheets/WebSocket_Security_Cheat_Sheet.html) (en inglés)

## Mujeres que conviene conocer

**Sylvia Xueni Pan** es profesora de Realidad Virtual en Goldsmiths, University of London, donde co-dirige la maestría MA/MSc en Realidad Virtual y Aumentada y el SeeVR Lab, investigando la interacción social, la presencia, y los avatares en espacios virtuales compartidos. Co-enseña una Especialización en Realidad Virtual de Coursera que, según su propio conteo, tiene más de 100,000 estudiantes registrados.

Su investigación (cómo las personas perciben e interactúan con los avatares de las demás en un espacio virtual compartido) es el tema más profundo detrás de la pequeña sala de esta lección: las actualizaciones de posición, la lista de presencia, y la sensación de "hay alguien más aquí conmigo" que la conexión WebSocket de esta lección existe para crear.

> **Nota editorial: verificar antes de publicar.** Los datos biográficos de las secciones «Mujeres que conviene conocer» deben verificarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

El propio protocolo WebSocket es el RFC 6455 del IETF, y la API orientada al navegador que llama el código del cliente de esta lección (`new WebSocket(...)`, sus eventos, sus métodos) está definida por el estándar vivo HTML del WHATWG, en coordinación con el W3C. El paquete `ws` de Node (la única dependencia de esta lección) implementa el lado del protocolo del RFC 6455 para un servidor; el navegador implementa el lado del cliente de forma nativa, por eso `js/net.js` nunca necesita una biblioteca para hablarlo.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
