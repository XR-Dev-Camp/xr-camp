# Autenticación y cuentas de usuario

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `full-stack-spatial` · **Lección:** `authentication-and-user-accounts-02` · **Tiempo:** unas 19 horas · 25 sesiones de 45 minutos · unas 6 semanas con 4 sesiones por semana

> **Esta es una lección más larga (25 sesiones).** Avanza paso a paso: cada sesión termina igual con algo que hiciste, y está bien tomar un descanso corto entre pasos.

---

> Construye un prototipo seguro de cuenta y perfil para quien aprende.

---

## Objetivos de aprendizaje

Al terminar este proyecto podrás:

1. Aplicar un hash a una contraseña con **`scrypt` de `node:crypto`**, usando una sal (salt) aleatoria por usuario y los parámetros que actualmente recomienda la OWASP Password Storage Cheat Sheet, y comprobar una contraseña contra ese hash con **`timingSafeEqual`** en lugar de `===`.
2. Explicar, en lenguaje simple, por qué un id de sesión es un token portador (bearer token), generar uno con **`randomBytes`**, y hacer cumplir tanto un tiempo de espera por inactividad como uno absoluto, en el servidor.
3. Establecer una cookie de sesión con **`HttpOnly`**, **`SameSite=Lax`**, y **`Secure`** (solo cuando la solicitud va realmente por HTTPS), y explicar qué detiene cada atributo.
4. Agregar **protección CSRF** (falsificación de solicitud entre sitios) a cada solicitud que cambie el estado con el patrón de token sincronizador, y explicar por qué una cookie sola no puede probar que una solicitud vino de tu propia página.
5. Agregar un **límite de intentos** (rate limit) simple y honesto, en memoria, al inicio de sesión y a la recuperación de cuenta, y describir sus límites reales.
6. Separar la **propiedad** (¿de quién es esta fila?) de un **rol** (¿qué puede hacer esta cuenta?), y hacer cumplir cada una con una verificación distinta.
7. Diseñar la **recuperación de cuenta**, **controles de privacidad**, **exportación de datos** y **eliminación de cuenta** sin un servicio de correo, y explicar las compensaciones que acepta cada diseño.
8. Explicar qué elimina una **passkey** (WebAuthn) de toda esta lección, y saber dónde leer la especificación.

## Requisitos previos

- **Curso 5.1: Fundamentos de backend y API** (la API de configuración de la exhibición, `node:http`, rutas, validación, variables de entorno y CORS; esta lección agrega cuentas encima de eso).
- **Curso 2.1: JavaScript moderno** (`async`/`await`, módulos, `try`/`catch`).
- Comodidad ejecutando comandos en una terminal, y leyendo una respuesta JSON con `curl`.

## Herramientas necesarias

| Herramienta | Propósito | Costo |
| --- | --- | --- |
| Node.js, una versión LTS (22 o posterior) | Ejecuta el servidor y sus pruebas; no hay nada más que instalar | Gratis |
| Un navegador moderno, con sus herramientas de desarrollo | Probar el cliente y leer cookies y solicitudes de red | Gratis |
| Una terminal | Iniciar el servidor, ejecutar `curl` y `npm test` | Gratis |
| VS Code (o cualquier editor) y un servidor local para la vista solo del cliente | Los módulos necesitan `http://`, no `file://` | Gratis |

Node.js funciona igual en Windows, macOS y Linux, y su instalador funciona sin cuenta de pago en cualquier lugar, incluida China continental (descárgalo directamente desde [nodejs.org](https://nodejs.org/), o mediante un gestor de paquetes como `winget`, Homebrew o `apt`).

## Lo que vas a construir

La exhibición del Curso 5.1 tenía un solo archivo de configuración, compartido por todas las personas que abrían la página. Esta lección le da a cada estudiante su propia **cuenta**: un nombre de usuario y una contraseña que solo ella conoce, protegiendo su propia configuración guardada de la exhibición de todas las demás personas, incluidas entre sí. Existen dos **roles**: una **visitante** (el valor por defecto) solo puede leer o cambiar su propia configuración, mientras que una **curadora** además puede escribir una nota breve que ve cada visitante, y ver qué cuentas eligieron compartir su configuración.

Casi todo lo que construyes aquí responde a una pregunta que un producto real tiene que responder con honestidad: *¿qué pasa cuando esto sale mal?* ¿Qué pasa cuando alguien prueba mil contraseñas? ¿Cuando una cookie se filtra? ¿Cuando una pestaña queda con sesión iniciada en una computadora compartida? ¿Cuando alguien quiere irse y llevarse sus datos consigo? Esta lección no se salta esas preguntas para llegar más rápido a una demo: son la lección.

La solución de referencia está en [`completed/`](completed/): una carpeta `server/` (`server.js`, `routes.js`, `auth.js`, `sessions.js`, `rateLimit.js`, `validation.js`, `store.js`) y, junto a ella, el mismo tipo de cliente que construyó el Curso 5.1 (`index.html`, `styles.css`, `js/`), servido como archivos estáticos por ese mismo servidor. El starter tiene **21 TODOs** repartidos entre ambos.

**Este es un prototipo de aprendizaje, no asesoría de seguridad para producción.** Sigue una guía actual y específica (citada a lo largo del texto, y verificada contra la propia documentación de Node y la OWASP Cheat Sheet Series mientras se escribía esta lección) tan de cerca como puede hacerlo un proyecto de curso de un solo proceso, una sola máquina y sin base de datos. Antes de que cualquiera de estos diseños proteja una cuenta real, haz que los revise alguien con experiencia en seguridad, y lee el Curso 5.5, que vuelve para encontrar y corregir vulnerabilidades plantadas en un proyecto igual a este.

## Guía de carpetas

```text
02-authentication-and-user-accounts/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html, styles.css   # The client page: finished
│   ├── js/main.js       # The account and settings panels: TODOs 17-20
│   ├── js/scene.js      # The 3D view: finished (Course 5.1's work)
│   └── server/
│       ├── server.js        # Routing, cookies, CORS, static files: TODO 16
│       ├── routes.js        # Route handlers: TODOs 8-15
│       ├── auth.js          # Password/recovery-code hashing: TODOs 1-2
│       ├── sessions.js      # The session store and CSRF tokens: TODOs 4-5
│       ├── rateLimit.js     # Failed-attempt counting: TODO 6
│       ├── validation.js    # validateCredentials(): TODO 3
│       ├── store.js         # Accounts and the curator's note on disk: TODO 7
│       ├── server.test.js   # node:test: TODO 21
│       ├── .env.example     # Copy to .env to change PORT, CURATOR_USERNAMES, etc.
│       └── package.json     # "type": "module", no dependencies
├── completed/            # Reference solution: open this last
├── challenges/            # Three challenges: Foundation is required
├── tests/checklist.md    # Self-review before you submit
├── assets/
└── screenshots/
```

El `package.json` de esta lección sigue sin listar ninguna dependencia: cada archivo del servidor usa solo lo que Node incluye de fábrica (`node:http`, `node:crypto`, `node:fs`, `node:test`, etc.). El Curso 5.4 es el primero en agregar un paquete real (`ws`, para WebSockets), fijado a una versión exacta en el `versions.json` de este repositorio.

## Configuración

1. Crea una carpeta nueva, `exhibit-accounts`, junto a tus otros proyectos de XR Camp, y copia el contenido de la carpeta `starter/` ahí dentro.
2. Abre una terminal en su carpeta `server/` y comprueba tu versión de Node: `node --version`. Necesitas la 22 o posterior.
3. Copia `.env.example` a `.env` en esa misma carpeta. Establece `CURATOR_USERNAMES` con un nombre de usuario que planees registrar (por ejemplo, `curator-jane`) antes de llegar al Paso 13, para tener una cuenta de curadora con la que probar.
4. Inicia el servidor cuando llegues al Paso 16: `node server.js` (o `npm start`). Detenlo en cualquier momento con Ctrl+C.
5. Para ver el cliente por sí solo, sin la API (como se probará), abre `index.html` mediante cualquier servidor local, como `python3 -m http.server 8766`.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; lee `auth.js`, `sessions.js`, `rateLimit.js`, `store.js` y `routes.js` para ver qué ya está terminado | Una descripción de una línea para el trabajo de cada archivo del servidor |
| 2 | Paso 1: aplicar hash a una contraseña y comprobarla (TODO 1) | Escribir la misma contraseña dos veces en `hashSecret()` desde el REPL de Node produce dos cadenas *distintas*, y `verifySecret()` dice que ambas son correctas |
| 3 | Paso 2: un código de recuperación de un solo uso (TODO 2) | `generateRecoveryCode()` en el REPL devuelve cada vez una cadena legible, agrupada con guiones |
| 4 | Paso 3: validar un nombre de usuario y una contraseña (TODO 3) | Escribir una contraseña demasiado corta y un nombre de usuario con mayúscula en `validateCredentials()` muestra qué regla falló, y que el nombre de usuario volvió en minúsculas |
| 5 | Paso 4: sesiones, y dos tiempos de espera (TODO 4) | Llamar a `createSession()` y luego a `getSession()` en el REPL devuelve la sesión; llamar a `getSession()` con un id inventado devuelve `null` |
| 6 | Paso 5: comparar un token CSRF de forma segura (TODO 5) | `verifyCsrfToken()` devuelve `true` solo para el token exacto que se le dio a una sesión |
| 7 | Paso 6: un límite de intentos simple (TODO 6) | Llamar a `recordFailedAttempt()` cinco veces, y luego a `isRateLimited()`, devuelve `true`; un sexto llamado sigue devolviendo `true` |
| 8 | Paso 7: cuentas en disco (TODO 7) | `insertAccount()` y luego `findAccountByUsername()` en el REPL devuelve la misma cuenta de vuelta |
| 9 | Paso 8: cookies, `requireAuth` y `requireCsrf` (TODO 8) | Leyendo tu propio código, puedes explicar qué hace cada uno de los cuatro atributos de la cookie |
| 10 | Paso 9: `POST /api/auth/register` (TODO 9) | Un registro con `curl` devuelve `201`, un objeto de cuenta pública, y un código de recuperación |
| 11 | Paso 10: `POST /api/auth/login` (TODO 10) | Un inicio de sesión correcto establece una cookie; una contraseña incorrecta y un nombre de usuario desconocido reciben exactamente el mismo `401` y mensaje |
| 12 | Paso 11: cerrar sesión y `GET /api/auth/me` (TODO 11) | Cerrar sesión, y luego solicitar `/api/settings` con la cookie vieja, devuelve `401` |
| 13 | Paso 12: configuración, propiedad de cada cuenta (TODO 12) | Dos cuentas, probadas con dos cookies distintas, nunca ven ni cambian la configuración de la otra |
| 14 | Paso 13: la nota de la curadora y el panel (TODO 13) | Una cuenta visitante recibe `403` al intentar editar la nota; tu cuenta de curadora puede |
| 15 | Paso 14: recuperación de cuenta (TODO 14) | Un código de recuperación del registro restablece una contraseña, emite un código nuevo, y cierra la sesión en todos los dispositivos |
| 16 | Paso 15: privacidad, exportación y eliminación (TODO 15) | `GET /api/account/export` descarga tus datos; `DELETE /api/account` necesita tu contraseña |
| 17 | Paso 16: conectando el servidor (TODO 16) | `node server.js` inicia, y `http://127.0.0.1:8878/` muestra la página (aún sin terminar) |
| 18 | Paso 17: cargar la sesión, la configuración y la nota al abrir (TODO 17) | Recargar la página con la sesión iniciada te mantiene con la sesión iniciada |
| 19 | Paso 18: los formularios de cuenta (TODO 18) | Puedes registrarte, guardar tu código de recuperación, iniciar sesión, cerrar sesión, y restablecer una contraseña con él, todo desde la página |
| 20 | Paso 19: tu configuración y la nota de la curadora (TODO 19) | Guardar la configuración cambia la vista 3D; tu cuenta de curadora puede editar la nota compartida |
| 21 | Paso 20: privacidad, exportación y eliminación, en el navegador (TODO 20) | La casilla de privacidad, el botón de descarga y la eliminación de cuenta funcionan todos desde la página |
| 22 | Paso 21: probar con `node:test` (TODO 21) | `node --test` imprime todas las pruebas pasando (la suite toma tiempo real; ver Paso 21) |
| 23 | [`tests/checklist.md`](tests/checklist.md), y las verificaciones de accesibilidad 3D y XR de abajo | Un panel de cuenta y configuración terminado |
| 24 | Un reto de extensión | — |
| 25 | **Entregando tu trabajo** | Capturas de pantalla y una entrada de diario |

### Paso 1: aplicar hash a una contraseña y comprobarla (TODO 1)

Una contraseña nunca debe guardarse tal como la escribió quien aprende: cualquiera que alguna vez lea el archivo (un error, un respaldo, un atacante) leería cada contraseña en él. **`scrypt`** (integrado en `node:crypto`, verificado contra la [documentación de `crypto.scrypt` de Node.js](https://nodejs.org/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback)) convierte una contraseña en un **hash** deliberadamente lento y hambriento de memoria de calcular, así que probar millones de intentos contra un archivo robado también es lento. La recomendación primaria actual de la [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) para scrypt es `N=2**17, r=8, p=1`, unos 128 MiB de memoria por hash, por lo que `auth.js` sube la propia opción `maxmem` de scrypt por encima de su valor por defecto de 32 MiB:

```js
export const SCRYPT_PARAMS = { N: 2 ** 17, r: 8, p: 1 };
// r * 128 * N bytes ≈ 128 MiB
```

Cada contraseña también recibe su propia **sal** (salt) aleatoria (`randomBytes(16)`), así que dos cuentas con la misma contraseña nunca producen el mismo hash; sin una sal, un atacante podría comparar cada hash guardado contra una sola tabla precalculada de contraseñas comunes, una vez, para todas las cuentas a la vez. La sal no es un secreto: se guarda justo junto al hash, en una sola cadena que el formato de esta lección mantiene junta: `scrypt$N$r$p$saltHex$hashHex`.

Comprobar una contraseña significa recalcular el mismo hash y compararlo con lo que se guardó, con **`crypto.timingSafeEqual`**, nunca `===`:

```js
return timingSafeEqual(actual, expected); // not `actual === expected`
```

`===` en dos cadenas de bytes compara de izquierda a derecha y se detiene en la primera diferencia, así que cuánto tarda revela cuántos bytes iniciales ya eran correctos: un **canal lateral de temporización** (timing side channel). `timingSafeEqual` siempre tarda el mismo tiempo para dos buffers de la misma longitud (y lanza un error si las longitudes difieren, por eso `verifySecret()` construye `actual` con la misma longitud que `expected` antes de llamarla).

### Paso 2: un código de recuperación de un solo uso (TODO 2)

El mismo par `hashSecret()`/`verifySecret()` del Paso 1 protege un segundo tipo de secreto: un **código de recuperación**, generado una vez al registrarse (`randomBytes(10)`, formateado en grupos legibles) y mostrado a quien aprende exactamente una vez. El hábito de leer hojas de referencia (cheat sheets) del Curso 5.5 también aplica aquí: no hay nada nuevo que aprender sobre *guardar* este secreto, porque se guarda exactamente igual que una contraseña.

### Paso 3: validar un nombre de usuario y una contraseña (TODO 3)

`validateCredentials()` sigue el [NIST SP 800-63B](https://pages.nist.gov/800-63-3/sp800-63b.html) (Digital Identity Guidelines, sección 5.1.1.2): comprueba la **longitud** de una contraseña, no su composición. Ninguna regla aquí exige un símbolo, un número o una mayúscula; esas reglas empujan a las personas hacia sustituciones predecibles (`P@ssw0rd1`) sin frenar de forma significativa a un atacante real, y la propia guía del NIST las eliminó. El mínimo de este curso (10 caracteres) es un piso deliberadamente conservador por encima del propio mínimo del NIST de 8. Los nombres de usuario se recortan (trim) y se pasan a minúsculas antes de cada comprobación y cada búsqueda, así "Ana" y "ana" son siempre la misma cuenta.

### Paso 4: sesiones, y dos tiempos de espera (TODO 4)

Un **id de sesión** es un token portador (bearer token): quien lo posea es tratado como esa cuenta, así que `createSession()` genera uno con `randomBytes(32)`, 256 bits, muy por encima del mínimo de 64 bits que pide la [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html), nunca `Math.random()` ni un contador, que un atacante podría predecir. `getSession()` hace cumplir dos tiempos de espera, ambos verificados en el servidor (nunca confiando en el reloj de un cliente): un **tiempo de espera por inactividad** (idle timeout, 30 minutos sin solicitudes) y un **tiempo de espera absoluto** (absolute timeout, 8 horas, incluso en uso constante). Una sesión que expiró por cualquiera de las dos razones se elimina la próxima vez que alguien intenta usarla.

### Paso 5: comparar un token CSRF de forma segura (TODO 5)

`verifyCsrfToken()` usa el mismo patrón `timingSafeEqual` que la comprobación de contraseña del Paso 1, por la misma razón: comparar un token secreto con `===` lo filtraría un byte a la vez. Lo que un token CSRF protege realmente se explica por completo en el Paso 8, una vez que existe `requireCsrf()` para usarlo.

### Paso 6: un límite de intentos simple (TODO 6)

`rateLimit.js` cuenta los intentos fallidos por clave (`login:<username>` o `recover:<username>`) en un `Map` simple, y bloquea un sexto intento dentro de 15 minutos con `429 Too Many Requests`. Este es un límite real, que funciona, y también uno real y documentado: vive en la memoria de un solo proceso, así que un reinicio lo borra, y saber un nombre de usuario basta para bloquear a su dueña, a propósito, fallando su contraseña unas cuantas veces. Un servicio en producción agrega límites por IP y a menudo un CAPTCHA junto a esto, y comparte sus contadores entre cada proceso de servidor (Curso 5.8).

### Paso 7: cuentas en disco (TODO 7)

`store.js` es el único archivo que toca el disco, la misma regla que siguió el `store.js` del Curso 5.1. Cada cuenta es un objeto JSON —`{ id, username, passwordHash, recoveryCodeHash, role, privacySharesSettings, settings, createdAt }`— dentro de un arreglo, en `data/accounts.json`. `passwordHash` y `recoveryCodeHash` son siempre las cadenas autodescriptivas que produce el Paso 1, nunca texto plano.

### Paso 8: cookies, `requireAuth`, y `requireCsrf` (TODO 8)

Cuatro atributos de cookie, y qué detiene cada uno:

| Atributo | Detiene |
| --- | --- |
| `HttpOnly` | Que JavaScript (el código de esta propia página, o el de un atacante, si alguna vez corriera aquí) lea la cookie con `document.cookie`. |
| `SameSite=Lax` | Que la mayoría de las solicitudes entre sitios lleven la cookie siquiera: una capa de defensa contra CSRF, no toda la defensa. |
| `Secure` (agregado solo cuando la solicitud va por HTTPS) | Que la cookie se envíe alguna vez por una conexión sin cifrar. Ver "Solución de problemas" para lo que esto significa en `http://127.0.0.1`. |
| `Max-Age` | Que la cookie sobreviva a la sesión que nombra: el navegador la elimina por su cuenta una vez que pasan estos segundos. |

`requireAuth(req)` lee la cookie `sid` que `server.js` habrá analizado hacia `req.cookies`, busca la sesión, y carga la cuenta a la que pertenece; cada ruta protegida empieza con esta comprobación. `requireCsrf(req, session, res)` es una segunda comprobación, separada, usada solo antes de que algo cambie: compara un encabezado `X-CSRF-Token` contra el token que se le dio a esta sesión al iniciar sesión. **Una cookie sola no puede probar que una solicitud vino de tu propia página**, porque un navegador adjunta cookies automáticamente a una solicitud de *cualquier* sitio, incluido uno que un atacante construyó específicamente para hacer que tu navegador haga algo que nunca pediste, usando una sesión en la que ya casualmente tienes la sesión iniciada. Eso es lo que significa "Cross-Site Request Forgery" (falsificación de solicitud entre sitios, CSRF), y es exactamente lo que previene un encabezado personalizado que un `<form>` entre sitios no puede agregar por sí solo (la [OWASP CSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) llama a esto el patrón de token sincronizador).

### Paso 9: `POST /api/auth/register` (TODO 9)

Crea una cuenta con rol `visitor` (o `curator`, si el nombre de usuario está en `CURATOR_USERNAMES`), aplica hash a su contraseña y a un código de recuperación nuevo, y devuelve el código de recuperación exactamente una vez. Registrarse **no** inicia sesión automáticamente: el inicio de sesión del Paso 10 es un paso separado y deliberado, así quien aprende nunca tiene la sesión iniciada sin haber probado una contraseña primero.

```sh
curl -i -X POST http://127.0.0.1:8878/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"ana","password":"a-very-good-password"}'
```

### Paso 10: `POST /api/auth/login` (TODO 10)

La línea más importante de esta ruta es la que trata "no existe esa cuenta" y "contraseña incorrecta" de forma idéntica:

```js
if (!account || !passwordOk) {
  recordFailedAttempt(rateLimitKey);
  return sendJson(res, 401, { error: 'Invalid username or password.' });
}
```

Distinguirlos es exactamente cómo un atacante construye una lista de nombres de usuario reales, una conjetura a la vez. Un inicio de sesión correcto crea una sesión nueva (nunca reutilizando una que existiera antes del inicio de sesión; eso es lo que protege contra la **fijación de sesión** (session fixation), un atacante entregándole a una víctima un id de sesión de antemano) y establece la cookie descrita en el Paso 8.

### Paso 11: cerrar sesión y `GET /api/auth/me` (TODO 11)

Cerrar sesión es en sí misma una solicitud que cambia el estado, así que necesita la misma comprobación CSRF que cualquier otra. `GET /api/auth/me` existe porque una recarga de página pierde el token CSRF que este curso guarda solo en memoria (nunca en una segunda cookie legible por JavaScript): el cliente lo llama una vez, al cargar, para recuperar su propio token desde la sesión que sigue siendo válida en el servidor.

### Paso 12: configuración, propiedad de cada cuenta (TODO 12)

Toda la idea de "propiedad" cabe en una línea:

```js
const updated = await updateAccount(auth.account.id, { settings: value });
```

`auth.account.id` viene de la **sesión**, nunca de nada que el cliente haya enviado en el cuerpo de la solicitud. Un cliente podría escribir cualquier id que quisiera en un cuerpo JSON; nunca se le pide, y nunca se confía en él si lo intentara. El Curso 5.3 llama a esta misma regla "permisos por fila" una vez que hay una base de datos real involucrada.

### Paso 13: la nota de la curadora y el panel (TODO 13)

Una comprobación de rol responde una pregunta distinta a la de "¿tienes la sesión iniciada?" de `requireAuth`; pregunta "¿tienes permiso para hacer *esto*, específicamente?":

```js
if (auth.account.role !== 'curator') {
  return sendJson(res, 403, { error: 'Only a curator can edit this note.' });
}
```

`listSharedAccounts()` filtra por `privacySharesSettings` *antes* de construir siquiera una respuesta: una cuenta que nunca optó por compartir nunca aparece en el panel de la curadora, de ninguna forma, ni siquiera oculta.

### Paso 14: recuperación de cuenta (TODO 14)

Este curso no tiene servidor de correo, así que no hay un "enlace de restablecimiento enviado a tu correo." En su lugar, el código de recuperación de un solo uso del Paso 9 lo reemplaza: quien pueda probar que tiene ese código puede establecer una contraseña nueva. Perder tanto la contraseña como el código de recuperación significa que la cuenta no puede recuperarse; una compensación real y aceptada para un proyecto de este tamaño, y una que vale la pena nombrar en voz alta en lugar de esconder. Una recuperación exitosa revoca cada sesión existente de la cuenta (`destroyAllSessionsForUser`), porque cambiar una contraseña es un cambio de credencial, y la OWASP Session Management Cheat Sheet pide exactamente eso.

### Paso 15: privacidad, exportación y eliminación (TODO 15)

Dos decisiones de diseño pequeñas y deliberadas: `updatePrivacy()` es la única forma en que cambia `privacySharesSettings`, y siempre aplica a `auth.account.id`, nunca a un id enviado en el cuerpo. `removeAccount()` pide la contraseña actual de nuevo, aunque la sesión ya pruebe quién está preguntando: una sesión robada o compartida (una laptop dejada sin bloquear) todavía puede leer esta página, pero no debería poder eliminar en silencio la cuenta de la verdadera dueña sin más prueba.

### Paso 16: conectando el servidor (TODO 16)

La API del Curso 5.1 usaba `Access-Control-Allow-Origin: '*'`, lo cual está bien para una API mayormente de lectura y sin inicio de sesión. Esta establece una cookie, así que no puede usar un comodín: un navegador se niega a exponer una respuesta con credenciales (que lleva cookies) a una página cuyo origen fue respondido con `*`. `ALLOWED_ORIGIN` debe nombrar exactamente un origen en su lugar, emparejado con `Access-Control-Allow-Credentials: true`.

### Paso 17: cargar la sesión, la configuración y la nota al abrir (TODO 17)

`loadMe()` sigue la misma regla de "nunca debe rechazar" que seguía `loadSettings()` del Curso 5.1: un `401` significa "el servidor está corriendo, nadie tiene la sesión iniciada" (no un error); cualquier otro fallo (sin servidor en absoluto, o el servidor estático simple que usan las propias verificaciones de accesibilidad de este repositorio) significa "sin conexión," y la página igual tiene que mostrar algo sensato en cualquier caso.

### Paso 18: los formularios de cuenta (TODO 18)

Registro, inicio de sesión, cierre de sesión y recuperación, conectados a las rutas que construyeron los Pasos 9-11 y 14. El código de recuperación se muestra en la página, en un elemento `<output>` con `user-select: all` (ver `styles.css`) para que sea fácil de seleccionar y copiar; nunca en un `alert()` del navegador, que algunos lectores de pantalla anuncian mal y que desaparece en el instante en que se descarta.

### Paso 19: tu configuración y la nota de la curadora (TODO 19)

El mismo formulario de configuración que construyó el Curso 5.1, ahora enviado con `credentials: 'include'` y un encabezado `X-CSRF-Token` en cada `PUT` y `DELETE`. Un formulario para la nota de la curadora aparece solo para una curadora con la sesión iniciada; todas las demás personas ven la nota como texto de solo lectura.

### Paso 20: privacidad, exportación y eliminación, en el navegador (TODO 20)

El manejador de `export-button` es todo el patrón para una descarga de archivo del lado del cliente sin una ruta de servidor dedicada a ella: obtiene el JSON con fetch, lo envuelve en un `Blob`, lo pasa por `URL.createObjectURL`, hace clic en un `<a download>` temporal, y luego lo pasa por `URL.revokeObjectURL` para que el navegador pueda liberar la memoria.

### Paso 21: probar con `node:test` (TODO 21)

`fetch()` (el propio de Node, construido sobre undici) no es un navegador: no guarda ni reenvía cookies por ti. Cada prueba que necesita mantener la sesión iniciada lee el encabezado `Set-Cookie` de una respuesta de inicio de sesión y lo reenvía como encabezado `Cookie` en solicitudes posteriores; `sessionCookieFrom()` en `server.test.js` hace eso una vez, para que cada prueba lo reutilice. **Esta suite de pruebas es lenta a propósito**: varias pruebas aplican hash a una contraseña al costo recomendado por OWASP del Paso 1, y algunas (recuperación, eliminación) lo hacen más de una vez en una sola solicitud. Decenas de segundos para toda la suite es lo esperado, no un error: la misma lentitud que protege un archivo de contraseñas robado real.

## Explicación del código clave

**`scrypt$N$r$p$saltHex$hashHex`.** Una sola cadena autodescriptiva, no cuatro columnas de base de datos separadas. Los parámetros de costo viajan con el hash, así que subir `SCRYPT_PARAMS.N` más adelante (un servidor más rápido, o una guía nueva) nunca rompe una contraseña con hash aplicado bajo los ajustes anteriores: `verifySecret()` siempre lee los parámetros *desde* la cadena guardada, nunca desde la constante de hoy.

**`memoryFor({ N, r })`.** `r * 128 * N + 1024 * 1024` bytes: la fórmula de memoria que da la propia documentación de scrypt, más un pequeño margen de seguridad. Saltarse esto y usar el `maxmem` por defecto lanza `Invalid options: memory limit exceeded` en el instante en que `N` se sube a un tamaño apropiado para seguridad.

**`destroyAllSessionsForUser(userId)`.** Se usa después de un cambio de contraseña y después de eliminar una cuenta: un cambio en *quién puede actuar como esta cuenta* invalida cada sesión de la cuenta, no solo la que hizo el cambio, incluida una sesión que un atacante ya podría estar sosteniendo.

**`req.cookies` establecido una vez, en `server.js`.** Cada función de ruta recibe `req` ya con un objeto `cookies` analizado; ningún archivo de rutas necesita conocer el formato de cadena cruda del encabezado "cookie", la misma separación de responsabilidades que usó el Curso 5.1 para CORS y archivos estáticos.

**`publicAccount(account)`.** Elimina `passwordHash` y `recoveryCodeHash` antes de que se envíe cualquier cosa a un cliente; se llama al *final* de cada ruta que devuelve una cuenta, nunca se confía en que se recuerde esto más adelante. Un hash filtrado igual puede atacarse fuera de línea, sin límite de intentos que lo detenga, así que se trata como un secreto aunque ya tenga hash aplicado.

## Accesibilidad 3D y XR

La exhibición en sí no cambia respecto al Curso 5.1: una cámara fija en uno de cuatro presets, con solo la piedra de jade moviéndose. Lo nuevo es que la configuración que la controla ahora pertenece a una cuenta con la sesión iniciada, así que aplican las mismas verificaciones, más una más:

- **Descripción de la escena** (`#scene-description`): construida a partir de la misma lista `EXHIBITS` y el mismo objeto de configuración que lee la vista 3D: la propia configuración de la cuenta con sesión iniciada una vez conectada, o los valores compartidos por defecto antes de eso.
- **Alternativa 2D**: la lista de exhibiciones bajo la vista 3D nombra cada una y si se muestra en este momento, con o sin sesión iniciada.
- **Ruta de teclado para cada interacción**: cada control es una casilla, botón de radio, `<select>`, `<textarea>` o `<button>` ordinario, incluido el botón de revelar "Forgotten your password?" (¿Olvidaste tu contraseña?), que establece `aria-expanded` correctamente en ambos estados.
- **Movimiento reducido**: la vista compartida y sin sesión iniciada revisa `prefers-reduced-motion` en la primera carga; una vez con la sesión iniciada, tu propia elección guardada de `reducedMotion` toma el control, el mismo relevo que usaba el respaldo de almacenamiento local del Curso 5.1. **Pause animation** siempre funciona, y su etiqueta y su estado `aria-pressed` siempre coinciden con lo que realmente está pasando.
- **Comodidad**: la cámara solo se mueve a un preset que elegiste; nada relacionado con iniciar sesión, guardar la configuración o editar la nota de la curadora mueve la cámara ni cambia la vista por sí solo.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| Cada campo de formulario (formularios de cuenta, configuración, nota de la curadora, confirmación de eliminación) tiene un `<label>` visible | 1.3.1, 3.3.2 | Un campo de contraseña sin etiqueta no tiene nombre que un lector de pantalla pueda anunciar. |
| Los errores de campo de una respuesta 400 o 401 aparecen como texto junto al formulario | 3.3.1 | "Invalid username or password" permanece legible y permanece en su lugar, en lugar de desaparecer como un `alert()`. |
| El banner de estado es una región dinámica (`role="status"`) | 4.1.3 | "Account created," "Signed in," y el mensaje sin conexión llegan a quienes usan lector de pantalla sin que tengan que ir a buscarlos. |
| La palabra visible inicia el nombre accesible de cada botón | 2.5.3 | "Sign in," no un ícono que una persona que usa voz no puede pronunciar. |
| "Forgotten your password?" usa `aria-expanded` en un `<button>` real | 4.1.2 | Un lector de pantalla anuncia si el formulario de recuperación está mostrándose en este momento, no solo que algo podría pasar al hacer clic. |
| La escena 3D se puede pausar, y respeta el movimiento reducido | 2.2.2 | El movimiento nunca se impone a nadie, con o sin sesión iniciada. |
| `role="list"` en cada lista con `list-style: none` | Buena práctica | Safari elimina la semántica de lista en cuanto se quita la viñeta con CSS. |

## Consideraciones de rendimiento

`store.js` lee y reescribe todo el arreglo `accounts.json` en cada escritura: suficiente para un puñado de estudiantes probando localmente, y un contraste deliberado con la base de datos real del Curso 5.3, donde una fila se actualiza sin tocar todas las demás. Scrypt, al costo de esta lección, es el único lugar donde este proyecto es *deliberadamente* lento: presupuesta medio segundo a unos pocos segundos por hash de contraseña en una laptop común, más en una máquina compartida de salón de clases, y diseña cualquier interfaz alrededor de eso (un botón de envío deshabilitado mientras una solicitud está en curso vale la pena agregarlo en tus propios proyectos, aunque la solución de referencia de esta lección deja ese detalle fuera para mantener el foco en la seguridad misma). La escena 3D no cambia respecto al Curso 5.1: tres mallas simples, sin texturas, animación limitada a un solo objeto.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Comparar un hash de contraseña, un id de sesión o un token CSRF con `===` | La comparación filtra información de temporización un byte a la vez | Usa `crypto.timingSafeEqual` para cada comparación de un secreto |
| Decirle a un cliente "no existe ese usuario" pero "contraseña incorrecta" como mensajes distintos | Un atacante construye gratis una lista de nombres de usuario reales | Devuelve exactamente el mismo estado y mensaje para ambos casos |
| Confiar en un id de usuario del cuerpo de la solicitud para decidir la fila de quién cambiar | Cualquier cuenta con sesión iniciada podría editar o eliminar los datos de cualquier otra cuenta | Siempre lee "quién es esta persona" desde la sesión, nunca desde el cuerpo |
| Establecer `Access-Control-Allow-Origin: '*'` en una API que establece cookies | El navegador descarta en silencio la respuesta con credenciales; nada parece funcionar | Nombra exactamente un origen, y empárejalo con `Access-Control-Allow-Credentials: true` |
| Comprobar solo `requireAuth` antes de dejar pasar una acción solo para curadoras | Cualquier visitante con sesión iniciada podría editar la nota de la curadora | Agrega una comprobación de rol separada para todo lo que deba restringir un rol, no solo una cuenta |

## Solución de problemas

**La cookie de sesión nunca se establece, incluso después de un inicio de sesión exitoso.** Revisa que `ALLOWED_ORIGIN` en `.env` coincida con el origen exacto (esquema, host, *y* puerto) desde el que abriste el cliente, y que tus llamadas `fetch()` incluyan `credentials: 'include'`. Firefox y Safari descartan un encabezado `Set-Cookie` de una respuesta entre orígenes sin la configuración de credenciales de CORS correspondiente, usualmente sin ningún mensaje en la consola.

**Una cookie marcada `Secure` nunca aparece, ni siquiera en el panel de Application de DevTools.** Esto es correcto en `http://127.0.0.1`: `Secure` significa "enviar esto solo por HTTPS," y un navegador ni siquiera guardará una cookie `Secure` establecida por HTTP simple. El servidor de esta lección solo agrega `Secure` cuando la solicitud llegó realmente por HTTPS (ver Paso 8); correr todo por HTTP simple en localhost, como hace este curso, es la forma normal y aceptada de desarrollar este tipo de función localmente; el despliegue en producción necesita HTTPS de todos modos, y ahí `Secure` no es opcional.

**`403: Missing or invalid CSRF token`, aunque tengas la sesión iniciada.** Iniciar sesión te da un token CSRF *nuevo*; una página dejada abierta desde antes de un inicio de sesión reciente (o después de un reinicio del servidor, que borra cada sesión) está usando uno desactualizado. Llama a `GET /api/auth/me` de nuevo, o recarga la página.

**`node --test` parece colgarse.** No lo está: varias pruebas aplican hash a una contraseña (o dos, o tres) al costo de scrypt de esta lección. Dale a toda la suite al menos un minuto en una máquina lenta antes de suponer que algo está mal.

**Dos pestañas, dos cuentas distintas, peleando por la misma cookie.** Una cookie, una sesión, por perfil de navegador: iniciar sesión en una pestaña cierra la sesión de la cuenta que la otra pestaña creía tener (su próxima solicitud usa la cookie nueva). Usa una ventana privada/de incógnito, o un segundo navegador, para probar dos cuentas al mismo tiempo.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: agrega una sugerencia de fortaleza de contraseña que nunca bloquee una contraseña lo bastante larga.
2. **[Creativo](challenges/challenge-2.es.md)**: agrega un campo de perfil propio, privado por defecto.
3. **[Explorador](challenges/challenge-3.es.md)**: agrega un aviso de bloqueo de cuenta, y una forma de probarlo sin herramientas de administración.

## Cómo entregar tu trabajo

1. Completa cada elemento de [`tests/checklist.md`](tests/checklist.md).
2. Toma una captura de pantalla del panel de cuenta con la sesión iniciada, y otra de tu terminal mostrando cada verificación de `node --test` pasando.
3. Guárdalas en tu diario de aprendizaje y portafolio. Compártelas con otras personas que programan: consulta [dónde compartir tu trabajo y pedir ayuda](../../docs/en/community.md) (en inglés).
4. En tu diario, responde: ¿cuál de las decisiones de diseño de esta lección cambiarías primero si estuvieras construyendo esto para usuarios reales, y por qué?

## Lecturas adicionales

- [Node.js docs: `crypto.scrypt`](https://nodejs.org/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback) (en inglés)
- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) (en inglés)
- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) (en inglés)
- [OWASP Cross-Site Request Forgery Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) (en inglés)
- [W3C Web Authentication (WebAuthn) Level 3](https://www.w3.org/TR/webauthn-3/) (en inglés), y [passkeys.dev](https://passkeys.dev/) para una guía de implementación (en inglés)

## Mujeres que conviene conocer

**Wang Xiaoyun** (王小云) es una criptógrafa china. En 2004 y 2005 publicó ataques prácticos de colisión sobre la función hash MD5 y demostró que SHA-1 era mucho más débil de lo que sus diseñadores pretendían: un trabajo que empujó a toda la industria a alejarse de ambas. Más adelante lideró el diseño del estándar hash SM3 de China, que se convirtió en un estándar ISO/IEC en 2018, y fue elegida académica de la Academia China de Ciencias en 2017.

Esta lección se apoya en una función hash (scrypt) en casi cada paso: para guardar una contraseña, un código de recuperación, y para comparar secretos de forma segura. La carrera de Wang Xiaoyun es un recordatorio de que las funciones hash no son hechos fijos e inmutables: son diseños, construidos por personas, que a veces resultan tener debilidades que solo un criptoanálisis cuidadoso y paciente encuentra. El mismo cuidado que rompió MD5 y SHA-1 es lo que mantiene que valga la pena revisar las recomendaciones actuales, como las que cita esta lección, a medida que cambian.

> **Nota editorial: verificar antes de publicar.** Los datos biográficos de las secciones «Mujeres que conviene conocer» deben verificarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

Las cookies, encabezados y reglas entre orígenes de esta lección son todos parte de los estándares vivos **Fetch** y **HTML** del WHATWG y el **HTTP State Management Mechanism** del IETF (RFC 6265, que define `Set-Cookie` y sus atributos). La guía sobre almacenamiento de contraseñas y CSRF citada a lo largo del texto viene de la **OWASP Cheat Sheet Series**, un compañero mantenido por la comunidad y orientado a quien practica, no un organismo de estandarización en sí mismo, pero la guía actual y específica más consultada por la mayoría de desarrolladoras y desarrolladores en activo. Las passkeys se estandarizan por separado, mediante la especificación **WebAuthn del W3C**, desarrollada conjuntamente con la FIDO Alliance.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
