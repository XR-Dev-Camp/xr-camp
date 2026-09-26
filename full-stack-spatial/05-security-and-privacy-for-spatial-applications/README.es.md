# Seguridad y privacidad para aplicaciones espaciales

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `full-stack-spatial` · **Lección:** `security-and-privacy-for-spatial-applications-05` · **Tiempo:** unas 12 horas · 16 sesiones de 45 minutos · unas 4 semanas con 4 sesiones por semana

---

> Completa una revisión de seguridad y privacidad y un sprint de remediación.

## Objetivos de aprendizaje

Al terminar este proyecto podrás:

1. Construir una tabla de modelado de amenazas estilo STRIDE para una pequeña aplicación web, nombrando un ejemplo concreto de cada categoría de amenaza en el propio código de esa aplicación.
2. Explicar por qué un valor guardado que se sanea (sanitize) en el servidor y un cliente que lo renderiza con `textContent` son dos capas independientes contra el mismo error de XSS almacenado (stored XSS, secuencias de comandos entre sitios), y por qué ninguna de las dos por sí sola basta para confiar en ella para siempre.
3. Escribir un encabezado de Política de Seguridad de Contenido (Content Security Policy, CSP) que elimine `'unsafe-inline'` de `script-src`, y explicar contra qué defiende específicamente esa eliminación que el saneamiento del lado del servidor no cubre.
4. Explicar por qué un secreto incluido en el control de versiones (commit) queda comprometido en el instante en que se hace el commit, incluso después de que un commit posterior lo elimine, y mover uno de código fuente escrito directamente a una variable de entorno.
5. Reconocer una vulnerabilidad IDOR (Insecure Direct Object Reference, referencia directa insegura a un objeto), corregir una comprobando la propiedad o la visibilidad en cada solicitud, y explicar por qué una respuesta "no encontrado" tanto para un recurso faltante como para uno prohibido es una elección deliberada, no un accidente.
6. Explicar qué le revela a un atacante un mensaje de error detallado, y reemplazarlo con un mensaje genérico de cara al cliente más registro (logging) del lado del servidor.
7. Aplicar minimización de datos a un campo de ubicación: guardar no más precisión de la que una función realmente necesita, y explicar el costo de privacidad de una coordenada GPS de precisión completa guardada "por si acaso".
8. Ejecutar `npm audit`, leer su salida, y explicar qué puede y qué no puede decirte sobre la seguridad real de un proyecto.

## Requisitos previos

- **Curso 5.4: Aplicaciones en tiempo real y multiusuario**: el starter de esta lección reutiliza sin cambios sus rutas de cuenta, cookies de sesión, token CSRF, y autenticación de la actualización de WebSocket; los objetivos de la revisión son código nuevo construido sobre esa base.
- **Curso 5.2: Autenticación y cuentas de usuario**: hash de contraseñas, sesiones, y CSRF, todo heredado.
- Comodidad leyendo código de servidor que no escribiste ni acabas de ver fallar; el starter de esta lección corre bien, las vulnerabilidades son lógicas, no fallos.

## Herramientas necesarias

| Herramienta | Propósito | Costo |
| --- | --- | --- |
| Node.js 22.5 o posterior (se recomienda la LTS "24 Krypton") | Ejecuta el servidor | Gratis |
| npm (viene con Node.js) | Instala la única dependencia de esta lección, `ws`, y ejecuta `npm audit` | Gratis |
| Un editor de texto (por ejemplo, VS Code) | Leer y corregir el código del servidor y del cliente | Gratis |
| Un navegador (Chrome, Firefox, Safari o Edge) | Probar cada vulnerabilidad tú misma antes de corregirla | Gratis |

Node.js se puede descargar desde [nodejs.org](https://nodejs.org/); estudiantes en China continental también pueden usar el [espejo de Node.js de npmmirror](https://registry.npmmirror.com/binary.html?path=node/). Si `npm install` va lento, ejecuta en su lugar `npm install --registry=https://registry.npmmirror.com`.

## Lo que vas a construir

El README del Curso 5.2 prometió este momento: *"lee el Curso 5.5, que vuelve para encontrar y corregir vulnerabilidades plantadas en un proyecto igual a este."* Esta lección cumple esa promesa. El starter es una pequeña aplicación espacial (cuentas, escenas guardadas con una ubicación aproximada opcional, anotaciones cortas de texto dejadas en una escena, y una sala de chat compartida) construida exactamente sobre el código de cuentas, sesiones, CSRF, y autenticación de WebSocket que ya te enseñó a confiar el Curso 5.4. Siete cosas en ella están deliberadamente rotas: XSS almacenado en anotaciones, XSS almacenado en el chat, sin Política de Seguridad de Contenido, un secreto incluido directamente en `config.js`, un IDOR en el endpoint de escena por id, respuestas de error que filtran un stack trace, y una ubicación de escena guardada con precisión GPS completa sin razón. Cada archivo con un error repite la misma advertencia en su parte superior: **DELIBERADAMENTE VULNERABLE — solo para aprender en localhost; nunca desplegar.** El servidor solo se vincula a `127.0.0.1`.

Tu trabajo no es agregar una función. Es encontrar cada uno de los siete TODOs numerados, entender *por qué* es una vulnerabilidad real (no solo una queja de estilo), corregirla, y ver una suite de `node --test` que falla ponerse en verde una prueba a la vez. [`completed/`](completed/) es la referencia corregida: un modelo de amenazas, una CSP estricta, un secreto cargado desde el entorno, una verificación de permisos en cada solicitud al endpoint de escena, mensajes de error genéricos, datos de ubicación minimizados, una corrida explicada de `npm audit`, y un [`SECURITY.md`](completed/SECURITY.md) que describe cómo querrían quienes mantienen este proyecto que se reportara una vulnerabilidad real.

Este es el quinto paso de la **exhibición cultural virtual** en curso que atraviesa la Fase 5. No agrega una función nueva a la exhibición; hace más seguro seguir construyendo sobre las funciones que ya construyeron los Cursos 5.1–5.4.

## Guía de carpetas

```text
05-security-and-privacy-for-spatial-applications/
├── README.md
├── starter/                      # begin here -- deliberately vulnerable, runs fine
│   ├── index.html, styles.css, js/main.js, js/net.js, js/scene.js
│   └── server/
│       ├── migrations/                       # numbered .sql files, run in order
│       ├── cookies.js, sessions.js, auth.js, rateLimit.js, wsAuth.js, rooms.js   # carried over from 5.4, unchanged
│       ├── db.js, validation.js, sanitize.js, env.js  # new for this lesson
│       ├── config.js          # TODO 4: a secret, hardcoded
│       ├── routes.js          # TODO 1, 5, 6, 7
│       ├── realtime.js        # TODO 2
│       ├── server.js          # TODO 3, 6
│       └── server.test.js     # one test per TODO -- run `npm test` and watch it fail
├── completed/                    # reference solution, plus SECURITY.md
├── challenges/                   # Three challenges: Foundation is required
├── tests/                        # self-review checklist
├── assets/
└── screenshots/
```

## Configuración

1. Abre una terminal y ejecuta `node --version`. Necesitas la 22.5 o posterior; este curso está escrito y probado contra Node 24 (la LTS actual).
2. Haz `cd` a `starter/server` y ejecuta `npm install`: esto instala exactamente un paquete, `ws`, fijado a la versión exacta en [`package.json`](starter/server/package.json). `node_modules/` se crea en disco pero nunca se incluye en el repositorio (ver `.gitignore`).
3. Copia `starter/server/.env.example` a `starter/server/.env`. Todavía no necesitas establecer `APP_SECRET`; el `config.js` del starter aún no lo lee (eso es el TODO 4).
4. Sirve todo el repositorio desde su raíz con cualquier servidor de archivos estático (por ejemplo `python3 -m http.server 8766`), así `starter/index.html` abre sobre `http://`, no `file://`.
5. En una segunda terminal, desde `starter/server`, ejecuta `node server.js`. Deberías ver `Security and privacy lab listening on http://127.0.0.1:8890` y, una vez, una advertencia de una línea `ExperimentalWarning: SQLite is an experimental feature`. Ambas cosas son esperadas.
6. Abre el `starter/index.html` servido, registra una cuenta, e inicia sesión. Todo funciona: eso es lo que hace de esto un sprint de revisión y no una lección de starter roto: estás buscando errores que una aplicación que funciona todavía puede tener.
7. Desde `starter/server`, ejecuta `npm test` (esto corre `node --test` con un tiempo límite de 15 segundos por prueba, para que una prueba dejada temporalmente rota mientras trabajas no cuelgue toda la suite). Cada prueba debería fallar. Lee cada mensaje de fallo: nombra exactamente qué está mal y apunta al TODO que lo corrige.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Lee las secciones Modelo de amenazas y "Qué salió mal" de abajo; ejecuta el starter; ejecuta `npm test` y lee cada mensaje de fallo. | Una lista de siete cosas por corregir, en tus propias palabras. |
| 2 | TODO 1a: llama a `sanitizeText` en `createAnnotation` de `routes.js`, antes de `insertAnnotation`. | El texto de anotación guardado no tiene marcado (markup) restante, incluso antes de los cambios del cliente. |
| 3 | TODO 1b: cambia `renderAnnotations` de `js/main.js` de `innerHTML` a `textContent`/`createElement`. | La prueba de XSS almacenado en anotaciones pasa. |
| 4 | TODO 2a: llama a `sanitizeText` en el manejador de chat de `realtime.js`, antes de retransmitir un mensaje. | El texto de chat retransmitido no tiene marcado restante, incluso antes de los cambios del cliente. |
| 5 | TODO 2b: cambia `appendChatMessage` de `js/main.js` de `innerHTML` a `createElement`/`textContent`. | La prueba de XSS almacenado en el chat pasa. |
| 6 | TODO 3: agrega un encabezado `Content-Security-Policy` en `server.js`, sin `'unsafe-inline'` en `script-src`. | La prueba de CSP pasa; la aplicación sigue funcionando (no hay scripts en línea que romper). |
| 7 | TODO 4a: reescribe `config.js` para leer `APP_SECRET` desde `process.env`, lanzando un error si falta. | El servidor se niega a arrancar sin un `APP_SECRET`. |
| 8 | TODO 4b: establece un `APP_SECRET` real en `starter/server/.env` (genera uno; ver `.env.example`). | El servidor arranca de nuevo; la prueba de secretos pasa. |
| 9 | TODO 5: en `getScene` de `routes.js`, comprueba que quien llama es dueña de la escena o que la escena es pública, en cada solicitud, devolviendo el mismo 404 en cualquier caso. | Ambas pruebas de IDOR pasan. |
| 10 | TODO 6: reemplaza el `error.message`/`error.stack` crudo de `formatServerError` con un mensaje fijo y genérico; conserva `console.error(error)` para ti misma. | La prueba de errores detallados pasa. |
| 11 | TODO 7: llama a `roundLocation` sobre la ubicación de una escena, en `createScene` de `routes.js`, antes de que se guarde en absoluto. | La prueba de minimización de ubicación pasa. |
| 12 | Ejecuta `npm test` de principio a fin. | Una suite completa y en verde: las ocho pruebas pasando. |
| 13 | Ejecuta `npm audit` desde `server/`. Lee su salida (ver "Qué salió mal: npm audit" abajo) y escribe, en tu diario, qué encontró y qué harías al respecto. | Un registro escrito breve de una corrida real de `npm audit`, no una suposición sobre lo que podría decir. |
| 14 | Vuelve a leer la tabla del Modelo de amenazas. Para cada fila, comprueba si tu código corregido en verdad cierra la amenaza de esa fila, o solo la hace más difícil. | Notas sobre qué amenazas están completamente cerradas y cuáles solo reducidas (ver "Errores comunes"). |
| 15 | Trabaja [`tests/checklist.md`](tests/checklist.md), incluyendo su sección "3D and XR (manual)". Ejecuta la verificación local de `pa11y` descrita ahí contra `completed/index.html`. | Cada elemento marcado, o una nota sobre qué no pudiste probar y por qué. |
| 16 | Completa el [reto Fundamento](challenges/challenge-1.es.md) obligatorio, y luego **Entregando tu trabajo**. | Capturas de pantalla, tus entradas de diario, y un proyecto que entiendes de principio a fin. |

### Paso 1: lee antes de corregir (sin TODO todavía)

Abre `starter/server/server.test.js`. Cada prueba nombra la vulnerabilidad que comprueba en su título y su mensaje de fallo. Lee las ocho antes de cambiar cualquier código; son tu especificación de lo que significa "corregido" en esta lección, de la misma forma que un reporte de error es una especificación en una revisión real.

### Paso 2-3: XSS almacenado en anotaciones (TODO 1a-b)

El texto de una anotación viaja: navegador → `POST /api/scenes/:id/annotations` → `insertAnnotation` → SQLite → `GET /api/scenes/:id` → navegador otra vez, para cada persona que la vea después. Dos cosas deben ser ciertas a la vez para que una etiqueta `<script>` escrita aquí nunca se ejecute: el servidor no debe guardarla como marcado con apariencia ejecutable (`sanitizeText` de `sanitize.js`, llamado desde `routes.js`), y el cliente nunca debe entregarle una cadena a `innerHTML` (`renderAnnotations` de `js/main.js`, que debería construir nodos DOM y establecer `textContent` en su lugar). Corregir solo una de las dos sigue pasando la prueba de hoy, en esta aplicación exacta, pero ver "Errores comunes" para saber por qué eso no es lo mismo que estar a salvo.

### Paso 4-5: XSS almacenado en el chat (TODO 2a-b)

El mismo patrón, sobre un WebSocket en lugar de un endpoint REST: el manejador de mensajes de `realtime.js` debe sanear antes de transmitir, y `appendChatMessage` de `js/main.js` nunca debe usar `innerHTML`. El propio chat del Curso 5.4 ya usaba `textContent`; el starter de esta lección es un paso deliberado hacia atrás desde eso, para que puedas ver qué cambia cuando no está ahí.

### Paso 6: una Política de Seguridad de Contenido (TODO 3)

Abre `server.js`. Agrega un encabezado de respuesta `Content-Security-Policy`, en cada respuesta, con `script-src` limitado a `'self'` y al único script externo que carga esta página (`https://aframe.io`), y sin `'unsafe-inline'`. Ver "Política de Seguridad de Contenido" abajo para saber por qué esto importa incluso después de corregir el TODO 1 y el TODO 2, y por qué `style-src` aquí todavía permite `'unsafe-inline'`.

### Paso 7-8: un secreto incluido en el código (TODO 4a-b)

Abre `config.js`. `APP_SECRET` protege `GET /api/admin/stats` (`routes.js`) y está escrito directamente, en texto plano, en un archivo que cualquier estudiante de este curso puede leer, y, en un repositorio real, en cada clon y cada commit que alguna vez lo incluyó, para siempre, incluso después de que un commit posterior lo elimine. Corrige `config.js` para leer `process.env.APP_SECRET` y lanzar un error si falta; luego copia `.env.example` a `.env` y establece un valor real (`.env` ya está en `.gitignore`).

### Paso 9: un IDOR en el endpoint de escena (TODO 5)

Abre `getScene` de `routes.js`. Actualmente devuelve cualquier escena, a cualquier quien llame con sesión iniciada, por id, sin ninguna comprobación de que quien llama sea dueña de ella o de que sea pública. Corrígela para comprobar `scene.ownerId === auth.user.id || scene.isPublic` antes de devolver cualquier cosa, y para responder el mismo 404 tanto si la escena no existe como si simplemente no es de quien la ve. Ver "IDOR" abajo para saber por qué esa elección específica (un código de estado para ambos casos) importa.

### Paso 10: mensajes de error detallados (TODO 6)

Abre `formatServerError` de `routes.js`. Actualmente devuelve `error.message` y `error.stack` al cliente en cada excepción no manejada. Reemplaza su valor de retorno con un mensaje fijo y genérico. El `console.error(error)` de `server.js` ya registra el error real por ti; esa línea no cambia.

### Paso 11: ubicación guardada sin necesidad (TODO 7)

Abre `createScene` de `routes.js`. Guarda `locationLat`/`locationLng` de una escena exactamente como se enviaron: precisión GPS completa, indefinidamente. Llama a `roundLocation` de `sanitize.js` sobre el valor antes de que llegue a `insertScene`. Ver "Minimización de datos" abajo para saber por qué "podríamos necesitarlo después" no es, por sí sola, una razón para guardar más precisión de la que una función usa actualmente.

## Modelo de amenazas

Una pasada estilo STRIDE sobre las propias funciones de esta aplicación, hecha de la forma en que la haría una revisión real: una fila por cada cosa que podría salir mal, no una fila por categoría genérica.

| Categoría STRIDE | Amenaza concreta en esta aplicación | Dónde se aborda |
| --- | --- | --- |
| **S**uplantación (Spoofing) | Un atacante inicia sesión como otra persona adivinando o robando una cookie de sesión. | Los ids de sesión son `crypto.randomBytes(32)` (`sessions.js` del Curso 5.2, sin cambios); las cookies son `HttpOnly` para que un script del lado del cliente no pueda leer una, ni siquiera un script que haya pasado el TODO 1/2. |
| **T**ampering (manipulación) | Un mensaje de WebSocket afirma un `username` que no le pertenece. | `realtime.js` nunca lee campos de identidad de un mensaje entrante; cada mensaje retransmitido se sella desde `member.username`, establecido una vez al momento de la conexión desde la sesión autenticada. |
| **R**epudiation (repudio) | No existe ningún registro de quién creó una escena o dejó una anotación después del hecho. | `scenes.owner_id` y `annotations.author_id` son siempre el propio id de quien llama, autenticada, establecido del lado del servidor, nunca tomado del cuerpo de la solicitud. |
| **I**nformation disclosure (divulgación de información) | Una escena privada es leída por una cuenta que no es su dueña (TODO 5); un stack trace le dice a un atacante de qué archivo y línea vino un error (TODO 6); una ubicación de precisión completa revela exactamente dónde estaba parada una persona (TODO 7). | La verificación de propiedad/visibilidad de `getScene`; el mensaje genérico de `formatServerError`; la minimización de datos de `roundLocation`. |
| **D**enial of service (denegación de servicio) | Una inundación de mensajes de chat o intentos de inicio de sesión desde una conexión. | Heredado sin cambios de los Cursos 5.2/5.4: `rateLimit.js` para intentos de inicio de sesión, y el `realtime.js` de esta lección hereda el diseño por conexión de 5.4 (un limitador de tasa completo para los endpoints de chat/escena es el reto Explorador de esta lección, no obligatorio aquí). |
| **E**levation of privilege (elevación de privilegios) | Cualquiera que lea el código fuente de este repositorio (o su historial de commits) puede llamar a `GET /api/admin/stats`, un endpoint pensado solo para quien ejecuta el servidor. | TODO 4: `APP_SECRET` pasa de código fuente escrito directamente a una variable de entorno que nunca se incluye en el repositorio. |

## Qué salió mal, y cómo se corrigió

**XSS almacenado (TODO 1, TODO 2).** El [artículo de MDN sobre Cross-Site Scripting](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS) y la [OWASP Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) describen ambos la misma forma: texto no confiable llega a un lugar que lo interpreta como marcado. Esta aplicación tiene dos lugares así (`innerHTML` en el cliente) y una entrada que llega a ambos sin sanear (anotaciones, chat). La corrección son dos capas independientes: `sanitizeText` de `sanitize.js` elimina cualquier cosa que parezca una etiqueta HTML antes de que el texto se guarde, y el cliente renderiza con `textContent`/`createElement`, que nunca interpreta su argumento como marcado sin importar lo que contenga. Cualquiera de las dos capas por sí sola ya evitaría que la prueba de hoy falle; ambas juntas significan que un cliente futuro, o una herramienta de depuración, o una función de exportación menos cuidadosa, no son lo único que se interpone entre un mensaje guardado y un script en ejecución.

**Política de Seguridad de Contenido (TODO 3).** El [artículo de MDN sobre Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) describe la CSP como una segunda capa independiente contra el script inyectado: incluso si un error de XSS almacenado como el del TODO 1/2 existiera y se pasara por alto, un `script-src` estricto (sin `'unsafe-inline'`, sin `'unsafe-eval'`) evita por completo que se ejecute un `<script>` en línea inyectado o un manejador `onerror`, porque el navegador se niega a ejecutar script en línea que la política no permite explícitamente. Los propios scripts de este proyecto son todos archivos externos, así que eliminar `'unsafe-inline'` de `script-src` no cuesta nada aquí. `style-src` todavía permite `'unsafe-inline'`, porque A-Frame establece estilos de elementos directamente en tiempo de ejecución (una limitación ampliamente conocida de la mayoría de las bibliotecas WebGL/3D); una compensación aceptada aquí, ya que una inyección de solo CSS no puede ejecutar JavaScript ni leer una cookie, y esta aplicación nunca construye un estilo a partir de texto de usuario.

**Gestión de secretos (TODO 4).** La confidencialidad de un secreto termina en el instante en que se hace commit de él, no cuando alguien lo nota, y no se deshace con un commit posterior que lo elimina, ya que permanece en el historial del repositorio. La [OWASP Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html) recomienda que los secretos vivan por completo fuera del control de versiones (una variable de entorno, cargada desde un archivo que a su vez está en gitignore) y que se roten, no solo se reubiquen, una vez que alguna vez hayan estado expuestos. La corrección de esta lección hace lo primero; una respuesta real a un incidente también necesitaría lo segundo, por eso `completed/SECURITY.md` describe cómo reportar una filtración, no solo cómo corregir una.

**IDOR (TODO 5).** Una Insecure Direct Object Reference (referencia directa insegura a un objeto) es exactamente el `getScene` original de esta aplicación: un id que controla quien llama (o que se le puede entregar, o que puede adivinar, ya que son UUIDs impresos de vuelta a su propia dueña) se usa para obtener un registro sin ninguna comprobación de que quien llama tenga permiso de verlo. La [OWASP Access Control Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Access_Control_Cheat_Sheet.html) es explícita en que esta comprobación debe ejecutarse en cada solicitud que toca el objeto, no una vez en un punto que quien llama podría rodear después. La versión corregida responde el mismo 404 tanto si una escena no existe como si simplemente no es visible para quien llama, a propósito: distinguir los dos casos le permitiría a un atacante enumerar qué ids de escena privada existen, una conjetura a la vez, sin leer ninguna.

**Mensajes de error detallados (TODO 6).** Un stack trace le dice a quien lo lee qué archivos existen, qué línea falló, a veces una versión de paquete o un fragmento de una consulta: nada de eso es útil para quien aprende y solo necesita saber "algo salió mal," todo eso es útil para alguien que sondea la aplicación en busca de debilidades. La corrección mantiene el detalle exactamente donde es útil: `console.error(error)`, en la terminal de quien ejecuta el servidor, nunca en el cuerpo de respuesta que recibe un navegador.

**Minimización de datos (TODO 7).** Una coordenada GPS precisa a seis decimales identifica un edificio específico, a veces una habitación específica. Las propias escenas de este proyecto solo necesitan "aproximadamente dónde"; nada aquí vuelve a leer una ubicación para indicaciones de manejo o posicionamiento preciso. `roundLocation` redondea a un decimal de grado (unos 11 km) antes de que una ubicación siquiera se escriba en disco, así la precisión innecesaria nunca se captura, no solo se oculta después. Este es el mismo principio al que apuntaba el diseño de eliminación de cuenta y exportación de datos del Curso 5.2: recolectar solo lo que una función realmente necesita.

**`npm audit`.** Ejecuta `npm audit` desde `server/` (después de `npm install`). Comprueba la única dependencia de este proyecto, `ws`, y todo aquello de lo que depende `ws` mismo, contra una base de datos pública de vulnerabilidades conocidas, y reporta cualquier coincidencia por gravedad. Dos cosas que vale la pena saber antes de leer su salida: un `npm audit` limpio significa que no se encontró ninguna vulnerabilidad *conocida y publicada* en este árbol de dependencias hoy, no que el código sea seguro, ni que no exista ninguna vulnerabilidad que aún no se haya descubierto y publicado. Lee lo que reporta (una corrida real puede no mostrar nada en absoluto, o puede mostrar algo en un paquete del que depende el propio `ws`, según exactamente cuándo la ejecutes) en lugar de confiar en un número fijo escrito aquí, ya que la base de datos de avisos cambia con el tiempo.

## Explicación del código clave

- **Sanear y renderizar de forma segura son dos capas distintas, no una corrección repetida dos veces.** `sanitizeText` de `sanitize.js` cambia lo que se guarda; `textContent` de `js/main.js` cambia cómo se muestra un valor que ya está en memoria. Un error en cualquiera de las dos, por sí sola, dejaría a la otra en pie de todos modos: ese es todo el sentido de la defensa en profundidad (ver "Errores comunes").
- **`findSceneById` frente a una función "para quien mira".** `db.js` deliberadamente no nombra su búsqueda simple `getSceneSafely` ni algo similar: un nombre que solo significa "verificado" si cada persona que lo lea en el futuro recuerda lo que implica. Nombrarla de forma simple, y poner la verificación de permisos real en `getScene` de `routes.js`, hace de "¿quién verificó que esto estaba permitido?" una pregunta con un único lugar obvio donde mirar.
- **El mismo 404 para "no encontrado" y "no es tuyo".** Un código de estado distinto para cada caso le permitiría a un atacante aprender qué ids privados existen sin leer ninguno; ver la guía de la OWASP Access Control Cheat Sheet sobre exactamente este patrón.
- **`formatServerError` es una función pura, probada directamente.** En lugar de intentar forzar que una solicitud HTTP real haga fallar al servidor (frágil, y un servidor bien validado rara vez debería hacer eso por accidente), esta lección extrae la decisión de formateo de errores a su propia función pequeña y la prueba directamente con un error sintético: la misma razón por la que muchas bases de código prueban un formateador de forma aislada en lugar de solo a través de toda la pila.
- **`roundLocation` se ejecuta antes de `insertScene`, no después.** Redondear un valor que ya se escribió en disco no protege nada que ya se haya filtrado; la corrección tiene que estar en la ruta de escritura, antes de que el valor preciso se persista siquiera.

## Accesibilidad 3D y XR

- **Descripción de la escena.** `#scene-description` indica qué escena está abierta, su visibilidad, y su número de anotaciones, en texto plano, construido a partir de los mismos datos que lee la vista 3D.
- **Un gemelo 2D de la vista 3D.** `#scene-detail-list` contiene los mismos datos de escena que el marcador 3D, siempre, haya o no WebGL disponible.
- **Ruta de teclado para cada interacción.** Abrir una escena, crear una, y agregar una anotación son todos botones y campos de formulario ordinarios; nada aquí requiere hacer clic o arrastrar dentro del lienzo 3D.
- **Movimiento reducido y un control de Pausa.** La rotación en reposo del marcador de escena empieza pausada cuando `prefers-reduced-motion: reduce` está activado, y el botón **Pause animation** (con `aria-pressed`) funciona sin importar esa preferencia.
- **Comodidad.** La cámara está fija durante toda la lección; nada aquí mueve nunca el punto de vista en sí.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| `#scene-description` se construye a partir de los mismos datos que el marcador 3D | 1.1.1, 1.3.1 | Las palabras nunca pueden contradecir la imagen. |
| `#chat-log` tiene `role="log"` con `aria-live="polite"` | 4.1.3 | Un mensaje de chat nuevo se anuncia sin mover el foco hacia el registro. |
| Cada formulario tiene un botón de envío visible | Buena práctica | Los verificadores automatizados (y quienes usan teclado) siempre pueden encontrar cómo enviarlo. |
| La animación respeta `prefers-reduced-motion` y ofrece un botón de Pausa | 2.2.2 | El movimiento que se inicia solo, sin que quien aprende lo pida, debe poder detenerse. |
| `role="list"` en cada `<ul>` con `list-style: none` | Buena práctica | Safari elimina la semántica de lista de un `<ul>` al que se le quitó el estilo de lista. |

## Consideraciones de rendimiento

- **`sanitizeText` se ejecuta una vez, al escribir, no en cada lectura.** Limpiar un valor cuando se guarda significa que cada `GET` posterior devuelve una cadena ya segura, en lugar de repetir el mismo trabajo de expresión regular en cada solicitud que lo lee.
- **`roundLocation` también reduce lo que se guarda y se transmite.** Un valor redondeado a un decimal de grado se comprime ligeramente mejor y es una razón menos para preocuparse por que un respaldo o una exportación de base de datos filtren más precisión de la que necesita una función.
- **Los tres conteos del endpoint de administración son consultas `COUNT(*)` simples.** Sin join, sin escaneo completo de tabla de datos de usuarias; un endpoint de depuración debería costar tan poco como valga la información que devuelve.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Corregir solo el cliente (`textContent`) o solo el servidor (`sanitizeText`), y considerar terminados el TODO 1/2 | La única corrección que queda está a un solo cambio futuro de ser lo único que detiene el XSS almacenado: un cliente nuevo, una herramienta de depuración, o una plantilla agregada después que sea menos cuidadosa | Corrige ambas capas; trata cada una como completa por sí sola, no como redundante con la otra |
| Comprobar la propiedad de una escena en el cliente (ocultando un botón) en lugar de en `routes.js` | Cualquiera con la consola de desarrollador del navegador abierta puede llamar a la API directamente y saltarse el botón oculto por completo | Aplica cada verificación de permisos en el servidor, en cada solicitud; ocultarlo del lado del cliente es una cortesía, nunca una garantía |
| Devolver 403 para "no es tuyo" y 404 para "no existe" | Un atacante puede saber qué ids de escena privada existen sin leer ninguno, observando qué código de estado vuelve | Responde el mismo 404 para ambos, como hace el `getScene` corregido |
| Tratar un `npm audit` limpio como prueba de que la aplicación es segura | `npm audit` solo comprueba vulnerabilidades *conocidas y publicadas* en las dependencias; no dice nada sobre el propio código de este proyecto, incluido todo lo demás que revisa esta lección | Lee qué comprueba en verdad `npm audit` (ver "Qué salió mal: npm audit") y sigue revisando tu propio código por separado |
| Redondear una ubicación solo para mostrarla, después de guardarla con precisión | El valor preciso ya está en disco (y en cualquier respaldo tomado antes de que se agregara el redondeo solo para mostrar); la exposición ya ocurrió | Redondea antes de que el valor se guarde siquiera, como hace la corrección de `createScene` |

## Solución de problemas

**`ExperimentalWarning: SQLite is an experimental feature and might change at any time`.** Esperado, cada vez que se importa `node:sqlite`. Una advertencia, no un error: el servidor sigue corriendo.

**`Error: APP_SECRET is not set.` al iniciar el servidor corregido.** Esperado hasta que copies `.env.example` a `.env` y establezcas un valor real (TODO 4b). Esto es la corrección funcionando: el servidor se niega a arrancar sin un secreto en lugar de aplicar uno en silencio.

**`npm test` todavía falla después de que una corrección parece correcta.** Lee el mensaje de la aserción, no solo el título de la prueba; varias pruebas comprueban más de una cosa (por ejemplo, las pruebas de IDOR comprueban tanto que se rechace a una persona extraña *como* que la dueña y una escena pública sigan funcionando). Vuelve a leer la llamada `assert` exacta que falló.

**`npm install` falla, o es muy lento, en China continental.** Ejecuta `npm install --registry=https://registry.npmmirror.com` en lugar del registro por defecto.

**El puerto 8890 ya está en uso.** Establece un `PORT` distinto en `server/.env`, y actualiza `ALLOWED_ORIGIN` para que coincida.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: agrega un octavo objetivo de revisión: un límite de tasa faltante en la creación de anotaciones y escenas, y una prueba de `node:test` que demuestre que está corregido.
2. **[Creativo](challenges/challenge-2.es.md)**: escribe tu propio modelo de amenazas STRIDE para una pequeña aplicación de tu propia vida, cultura, o comunidad.
3. **[Explorador](challenges/challenge-3.es.md)**: agrega un límite de tasa real por conexión a los endpoints de chat y anotaciones, con la misma forma que ya usó el `realtime.js` del Curso 5.4 para las actualizaciones de posición.

## Cómo entregar tu trabajo

1. Trabaja [`tests/checklist.md`](tests/checklist.md).
2. Toma capturas de pantalla: tu terminal mostrando el pase completo de `npm test` (8/8), la salida de tu `npm audit`, y la aplicación con una escena, una anotación, y un mensaje de chat, todos visibles.
3. Guárdalas en tu diario de aprendizaje y portafolio. Cuando abra la comunidad de XR Camp, compártelas ahí.
4. Pregunta de diario: elige una de las siete correcciones de esta lección y describe, en tus propias palabras, qué habría podido hacer un atacante real con la versión sin corregir; no "es inseguro", sino la acción específica (leer los datos de quién, ejecutar qué código, descubrir qué hecho) que permitía el error.

## Lecturas adicionales

- [OWASP Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) (en inglés)
- [OWASP Access Control Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Access_Control_Cheat_Sheet.html) (en inglés)
- [OWASP Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html) (en inglés)
- [MDN: Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) (en inglés)
- [MDN: Cross-Site Scripting (XSS)](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS) (en inglés)

## Mujeres que conviene conocer

**Beatriz Busaniche** es una activista argentina de software libre y derechos digitales y docente universitaria (en la UBA y FLACSO) que es presidenta de la Fundación Vía Libre, fue tesorera fundadora de la Free Software Foundation Latin America en 2005, y ha hecho campaña pública contra la vigilancia masiva por reconocimiento facial en Buenos Aires.

Su trabajo es un recordatorio de que las correcciones de esta lección no son solo una lista de verificación: una ubicación precisa guardada "por si acaso" (TODO 7), o una verificación de permisos silenciosamente omitida (TODO 5), son exactamente el tipo de decisiones técnicas pequeñas que, a la escala del sistema de vigilancia de una ciudad, se convierten en el tema de las campañas públicas a las que ha dedicado su carrera.

> **Nota editorial: verificar antes de publicar.** Los datos biográficos de las secciones «Mujeres que conviene conocer» deben verificarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

La Política de Seguridad de Contenido que agrega esta lección está definida por la especificación CSP Level 3 del W3C Web Application Security Working Group. La práctica de divulgación de vulnerabilidades que sigue `completed/SECURITY.md` está modelada de forma informal en el RFC 9116 del IETF, "A File Format to Aid in Security Vulnerability Disclosure" (`security.txt`): una forma estandarizada de que un proyecto diga, en un lugar predecible, cómo quiere que se reporte un problema de seguridad. OWASP en sí no es un organismo formal de estandarización; su Cheat Sheet Series es un consenso comunitario ampliamente referenciado sobre la mejor práctica actual, por eso esta lección verifica sus afirmaciones contra OWASP junto con MDN y los RFC en lugar de tratar a OWASP como la única fuente.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
