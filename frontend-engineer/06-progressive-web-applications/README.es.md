# Aplicaciones web progresivas

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `frontend-engineer` · **Lección:** `progressive-web-applications-06` · **Tiempo:** unas 12 horas · 16 sesiones de 45 minutos · unas 4 semanas con 4 sesiones por semana

---

> Convierte una aplicación anterior en una PWA instalable que funciona sin conexión.

---

## Objetivos de aprendizaje

Al terminar este proyecto serás capaz de:

1. Explicar qué hace que un sitio web sea una **aplicación web progresiva** (PWA): un manifiesto, un service worker y un contexto seguro.
2. Escribir un **manifiesto de aplicación web** con nombre, colores, dirección de inicio e iconos, incluido un icono **maskable** (adaptable).
3. Registrar un **service worker** y seguir su ciclo de vida: instalación, espera, activación.
4. **Precachear** el esqueleto de la aplicación en una caché versionada, y responder desde ella con la estrategia **cache first** (primero la caché).
5. Elegir una estrategia de caché para datos en vivo (**network first con tiempo límite**, es decir, primero la red) y explicar por qué.
6. Mostrar una **página sin conexión** en lugar del error del navegador, y eliminar las cachés antiguas cuando se activa una versión nueva.
7. Ofrecer actualizaciones con cortesía: «Hay una versión nueva disponible», con un botón **Reload** (Recargar), y nunca recargar por sorpresa.
8. Respetar a las personas con conexiones lentas o costosas con un **modo de bajo consumo de datos**.
9. Explicar con honestidad dónde se puede **instalar** una PWA hoy, y dónde no.

## Requisitos previos

- **Curso 2.4: APIs, JSON y aplicaciones asíncronas** (el tablero del clima que convertirás en aplicación; `fetch`, `async` y caché).
- **Curso 2.3: Arquitectura de aplicaciones** (una responsabilidad por archivo).

## Herramientas necesarias

| Herramienta | Para qué sirve | Costo |
| --- | --- | --- |
| Un navegador basado en Chromium: Chrome o Microsoft Edge (ambos disponibles en China continental) | El panel **Application** muestra el manifiesto, el service worker y cada caché | Gratis |
| Firefox (opcional) | Una segunda opinión: su panel **Application** muestra el manifiesto y los service workers, y `about:debugging` lista cada worker | Gratis |
| VS Code y un servidor local | Los service workers solo funcionan en páginas `https://`, o en `http://localhost` y `http://127.0.0.1` | Gratis |
| Un celular (opcional) | Probar la instalación y el modo sin conexión en un dispositivo real | Gratis |
| [Open-Meteo](https://open-meteo.com/) | Pronósticos del clima: sin clave, sin cuenta | Gratis para uso no comercial |

**Si Open-Meteo es lento o está bloqueado donde vives**, marca **Use sample data** (Usar datos de ejemplo), como en el Curso 2.4. Todo lo de esta lección (el manifiesto, el service worker, las cachés, el flujo de actualización) funciona con los datos de ejemplo.

## Lo que vas a construir

La sexta parte de **My XR Camp**: el **tablero del clima de la semana de estudio** del Curso 2.4, ahora convertido en **aplicación**. Se abre sin internet, en un autobús, en una biblioteca con mal Wi-Fi, o sin datos móviles hasta fin de mes. Puede vivir en la pantalla de inicio de un celular con su propio icono. Dice la verdad sobre los datos antiguos, ofrece actualizaciones sin sorpresas, y tiene un **modo de bajo consumo de datos** que se salta la biblioteca 3D de 1.3 MB.

Nada del pronóstico cambia. Ese es el sentido de la palabra **progresiva**: la misma página web, mejorada en los navegadores que admiten más funciones, y funcionando igual en los que no.

La solución de referencia está en [`completed/`](completed/). El punto de partida es el tablero terminado del Curso 2.4, más iconos ya hechos, una página sin conexión, y archivos nuevos con quince TODO.

## Guía de carpetas

```text
06-progressive-web-applications/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html       # The dashboard: TODOs 1–2 are in its <head>
│   ├── manifest.webmanifest   # Almost empty: TODOs 1–2 fill it
│   ├── icons/           # Finished: SVG and PNG icons, one maskable
│   ├── sw.js            # The service worker: TODOs 4–8, 10–11, 15
│   ├── offline.html     # Finished: shown for pages that are not saved
│   ├── js/pwa.js        # TODOs 3, 12–13
│   ├── js/api.js        # TODO 9
│   ├── js/low-data.js   # TODO 14
│   ├── js/main.js, config.js, cache.js, forecast.js, view.js   # Finished
│   ├── data/sample-forecast.json, styles.css                   # Finished
│   └── 3d-moment.html   # The forecast as 3D bars, loaded only when wanted
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Configuración

1. Copia el punto de partida en una carpeta nueva, `weather-app`, y súbela a Git. (Es tu tablero del Curso 2.4 con algunos archivos nuevos. Si prefieres, copia solo los archivos nuevos dentro de tu propia carpeta `weather`.)
2. Inicia tu servidor local y abre `index.html` a través de `http://localhost` o `http://127.0.0.1`. **No** un archivo abierto haciendo doble clic, y no la dirección de red de tu computadora (como `http://192.168.1.20`): los service workers necesitan un **contexto seguro**, y esas direcciones no lo son.
3. Abre las herramientas de desarrollador y busca el panel **Application** (Chrome y Edge; en Firefox también se llama **Application**, y las cachés están en **Storage**). Vivirás en él durante esta lección.
4. El tablero funciona exactamente igual que en el Curso 2.4. Es lo esperado: todavía no es una aplicación.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; Paso 1: qué hace a una PWA | Encontraste el panel Application |
| 2 | Paso 2: el manifiesto (TODO 1) | El nombre y los colores de tu app en la sección Manifest |
| 3 | Paso 3: iconos, y el icono maskable (TODO 2) | Cuatro iconos en la sección Manifest, sin advertencias |
| 4 | Paso 4: registra un service worker (TODOs 3–4) | «activated and is running» en Service workers |
| 5 | Paso 5: precachea el esqueleto de la app (TODO 5) | Veinte archivos en Cache storage |
| 6 | Paso 6: cache first (TODO 6) | La página recarga con **Offline** marcado |
| 7 | Paso 7: la página sin conexión (TODO 7) | Tu página sin conexión, no el error del navegador |
| 8 | Paso 8: network first para el clima (TODO 8) | Un pronóstico que carga sin conexión, desde el service worker |
| 9 | Paso 9: di la verdad sobre la antigüedad (TODO 9) | «Guardado por esta app a las 14:05» sin conexión |
| 10 | Paso 10: versiones, y limpieza (TODO 10) | Una sola caché del esqueleto, después de cambiar `VERSION` |
| 11 | Paso 11: el flujo de actualización (TODOs 11–12) | «Hay una versión nueva disponible», y un **Reload** que funciona |
| 12 | Paso 12: instalación (TODO 13) | La app en tu computadora o celular, o pasos escritos para tu navegador |
| 13 | Paso 13: modo de bajo consumo de datos (TODO 14) | Un interruptor que oculta el momento 3D |
| 14 | El **Momento 3D** (TODO 15) | Las barras 3D se abren sin conexión |
| 15 | Paso 14: prueba en un celular, luego [`tests/checklist.md`](tests/checklist.md) | Una app probada |
| 16 | Un reto adicional, luego **Cómo entregar tu trabajo** | La primera app instalable de My XR Camp |

### Paso 1: qué hace a una PWA

Una **aplicación web progresiva** es un sitio web común con tres cosas adicionales:

| Parte | Qué hace |
| --- | --- |
| Un **manifiesto de aplicación web** | Un archivo JSON pequeño: el nombre de la app, sus iconos, colores, y cómo se abre. Es lo que permite que un navegador ofrezca instalarla. |
| Un **service worker** | Un script que se ejecuta aparte de tus páginas, y puede responder sus solicitudes: desde una caché, desde la red, o con una página que tú hiciste. Es lo que hace que funcione sin conexión. |
| Un **contexto seguro** | `https://`, o `localhost` y `127.0.0.1` mientras desarrollas. Los service workers son poderosos, así que los navegadores solo los permiten en páginas que nadie pudo modificar en el camino. |

No hay tienda de aplicaciones, ni descarga que aprobar, ni un segundo código base. La misma dirección funciona en una pestaña del navegador y como app instalada.

En el panel Application, mira **Manifest** («No manifest detected»), **Service workers** (ninguno) y **Cache storage** (vacío). Para la Sesión 14, los tres estarán llenos.

### Paso 2: el manifiesto (TODO 1)

Enlaza el manifiesto desde `index.html`, y complétalo:

```json
{
  "name": "Study-week weather - My XR Camp",
  "short_name": "Weather",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "theme_color": "#5b2a86",
  "background_color": "#fdfcf8"
}
```

- **`name`** aparece al instalar; **`short_name`** aparece debajo del icono en una pantalla de inicio, donde hay poco espacio.
- **`start_url`** es la página con la que abre la app. **`scope`** es la parte del sitio que pertenece a la app: abrir una página fuera de ese alcance hace que el navegador la muestre con su propia barra de herramientas. `"./"` significa «esta carpeta», contada desde la dirección del propio manifiesto.
- **`"display": "standalone"`** abre la app en su propia ventana, sin la barra de direcciones.
- **`theme_color`** colorea la barra de título; **`background_color`** llena la pantalla mientras la app arranca. Usa los colores de tu hoja de estilos, para que el inicio se sienta parte de la app.

Recarga, y abre **Application > Manifest**. Chrome lista lo que leyó, y cualquier problema.

### Paso 3: iconos, y el icono maskable (TODO 2)

Los iconos están en `icons/`, dibujados en SVG y convertidos a PNG (ver `ATTRIBUTION.md`). Los navegadores basados en Chromium piden al menos un icono de 192 píxeles y uno de 512 píxeles antes de ofrecer la instalación.

Android dibuja los iconos de pantalla de inicio con sus propias formas: círculos, «squircles», cuadrados redondeados. Un icono normal se encoge dentro de una forma blanca. Un icono **maskable** (adaptable) llena todo el cuadrado con color, y mantiene todo lo importante dentro de un círculo central cuyo radio es el 40% del ancho del icono: la **zona segura**. El teléfono recorta el resto.

```json
{ "src": "icons/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
```

Compara `icon.svg` y `icon-maskable.svg`: aparte de los comentarios, solo cambia el cuadrado de fondo. Prueba el tuyo en el editor gratuito [Maskable.app](https://maskable.app/editor) (en inglés).

iPhone y iPad usan `<link rel="apple-touch-icon">` en la página para **Add to Home Screen** (Agregar a pantalla de inicio), así que agrega eso también.

### Paso 4: registra un service worker (TODOs 3–4)

En `js/pwa.js`, primero verifica que la función exista, y luego regístrala:

```js
if (!('serviceWorker' in navigator)) return null;
const registration = await navigator.serviceWorker.register('sw.js');
```

`sw.js` está junto a `index.html`, así que controla esa carpeta y nada por encima de ella. Después, en `sw.js`, registra en consola los propios eventos del worker (TODO 4). Recarga, y observa **Application > Service workers**: el worker se **instala**, y luego se **activa**. Sus mensajes de `console.log` aparecen en su propia consola: haz clic en **inspect** junto a él (Firefox: `about:debugging`, luego **This Firefox**).

Un service worker no tiene página. No puede tocar el DOM ni `localStorage`. Se comunica con las páginas mediante **eventos**: `install`, `activate`, `fetch` y `message`.

### Paso 5: precachea el esqueleto de la app (TODO 5)

El **esqueleto de la app** (app shell) es cada archivo que la app necesita para abrir: páginas, estilos, scripts, datos de ejemplo, iconos. Durante `install`, guárdalos todos:

```js
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);   // "weather-shell-v1"
    await cache.addAll(SHELL);
  })());
});
```

`waitUntil` significa «no está instalado hasta que esto termine». Si un solo archivo falla, `addAll` falla, y también falla la instalación: nunca terminas con media app. Así que revisa la lista con cuidado, y mira en **Cache storage**.

### Paso 6: cache first (TODO 6)

Ahora responde solicitudes. Para el esqueleto, usa **cache first** (primero la caché): busca en la caché; si está ahí, úsala (al instante, sin red); si no, pídesela a la red.

```js
const saved = await caches.match(request);
return saved ?? fetch(request);
```

Pruébalo: marca **Offline** en **Application > Service workers** (o elige **Offline** en el panel Network), y recarga. El tablero se abre. El pronóstico viene de la caché de `localStorage` del Curso 2.4.

**Mientras desarrollas, marca Update on reload.** Cache first significa que tus cambios a `styles.css` no aparecen: estás viendo la copia guardada. «Update on reload» instala la versión más reciente de `sw.js` en cada recarga.

### Paso 7: la página sin conexión (TODO 7)

Sin conexión, abre una página que no está guardada, como `notes.html`. Sin ayuda, el navegador muestra su propio error, y la persona se queda atascada. Para las **navegaciones** (abrir una página), responde con la página guardada, o con la red, o con `offline.html`:

```js
if (request.mode === 'navigate') event.respondWith(pageOrOffline(request));
```

`offline.html` explica en palabras simples lo que pasó, y enlaza a las páginas que sí funcionan sin conexión. Está en el esqueleto, y no necesita nada de la red.

### Paso 8: network first para el clima (TODO 8)

Un pronóstico no es como `styles.css`: cambia cada hora. Así que las solicitudes a `api.open-meteo.com` reciben una estrategia distinta, **network first, con tiempo límite** (primero la red):

1. Pregúntale a la red. Cuando responda, guarda una copia en la caché `weather-data`, y úsala.
2. Si la red falla, o tarda más de 4 segundos, usa la copia guardada.
3. Si no hay copia guardada, espera a la red, o transmite su error, para que la página muestre su propio estado de error.

| Estrategia | Buena para | Por qué no aquí |
| --- | --- | --- |
| **Cache first** | Archivos que solo cambian con una versión nueva | El pronóstico nunca se actualizaría |
| **Stale-while-revalidate**: responder desde la caché, y actualizarla en segundo plano | Cosas que pueden estar un poco desactualizadas: avatares, una lista de noticias | La primera respuesta siempre es la antigua, incluso con conexión |
| **Network first, con tiempo límite** | Datos en vivo que deberían estar frescos, pero es mejor tenerlos viejos que no tenerlos | ✓ Frescos cuando es posible; guardados cuando no; nunca una espera infinita |

El tiempo límite importa en conexiones lentas: sin él, network first puede tardar mucho antes de darse por vencido. Cuatro segundos es menos que el tiempo límite de ocho segundos que la propia página ya tiene desde el Curso 2.4, así que el service worker siempre tiene oportunidad de ayudar.

**La primera visita no está controlada.** Una página cargada antes de que su service worker se active envía sus solicitudes directo a la red. `clients.claim()` (Paso 10) permite que el worker tome el control de inmediato, pero una solicitud que ya empezó ya se fue. Recarga una vez con conexión, y luego prueba sin ella.

### Paso 9: di la verdad sobre la antigüedad (TODO 9)

Un pronóstico guardado puede tener un día de antigüedad. Si el service worker lo entrega en silencio, el tablero dice «Datos en vivo… actualizado a las 14:05», lo cual no es cierto. Así que cuando guarda una respuesta, `stamp()` agrega un encabezado con la hora: `X-Saved-At`. En `api.js`, léelo:

```js
const savedAt = Number(response.headers.get('X-Saved-At')) || null;
```

`main.js` (ya terminado) dice entonces «No se pudo actualizar. Guardado por esta app a las 09:12». Pruébalo: borra **Local Storage** en el panel Application, desconéctate, y recarga. Los datos antiguos que dicen que son antiguos son útiles. Los datos antiguos que fingen ser nuevos no lo son.

### Paso 10: versiones, y limpieza (TODO 10)

Cuando cambies cualquier archivo del esqueleto, cambia `VERSION` en `sw.js` (de `'v1'` a `'v2'`). El navegador compara `sw.js` byte por byte cada vez que se abre una página; un archivo distinto es una **versión nueva**. Se instala junto a la anterior y llena `weather-shell-v2`.

Cuando la versión nueva se **activa**, elimina cualquier otra caché del esqueleto:

```js
for (const name of await caches.keys()) {
  if (name.startsWith('weather-shell-') && name !== SHELL_CACHE) await caches.delete(name);
}
```

Deja `weather-data` en paz: los pronósticos guardados siguen sirviendo después de una actualización. Sin este paso, cada versión se queda para siempre en el celular de la persona.

### Paso 11: el flujo de actualización (TODOs 11–12)

Cambia `VERSION` con **Update on reload** desmarcado, y recarga. El worker nuevo se instala, y luego **espera**: el anterior todavía controla la página abierta, y reemplazar archivos debajo de una página en ejecución podría romperla. Chrome muestra «waiting to activate» en la sección Service workers.

Una buena app avisa, y deja que *la persona* elija cuándo:

1. En `pwa.js`, detecta un worker que está `waiting`, o uno que llega a `installed` mientras ya existe un controlador (TODO 12).
2. Escribe «Hay una versión nueva de esta app disponible.» en el elemento `role="status"` que está arriba del pronóstico, y muestra un `<button>` de verdad: **Reload** (Recargar).
3. Al hacer clic, envíale un mensaje al worker en espera; este llama a `self.skipWaiting()` (TODO 11) y se activa.
4. La página escucha `controllerchange`, y recarga una sola vez, ahora con la versión nueva.

El mensaje lo anuncian los lectores de pantalla sin mover el foco (WCAG 4.1.3), y nada recarga hasta que la persona lo pide (3.2.5, un criterio de nivel AAA que vale la pena cumplir). Alguien a la mitad de leer la tabla nunca pierde su lugar.

### Paso 12: instalación (TODO 13)

Instalar coloca la app en la pantalla de inicio o en la lista de apps, en su propia ventana. Cómo funciona depende del navegador, y cambia con frecuencia, así que revisa tus propios navegadores y no prometas más que esto:

| Dónde | Cómo instalar |
| --- | --- |
| Navegadores Chromium en Android (Chrome, Edge, Samsung Internet, y otros) | El menú del navegador: **Install app** (Instalar app) o **Add to Home screen** (Agregar a pantalla de inicio). También puede ofrecerlo por su cuenta. |
| Chrome y Edge en computadora | El icono de instalación en la barra de direcciones, o **Install** en el menú del navegador |
| iPhone y iPad | **Share** (Compartir), luego **Add to Home Screen** (Agregar a pantalla de inicio). No hay aviso de instalación, ni `beforeinstallprompt`. |
| Firefox en computadora | No instala PWA desde su manifiesto. Versiones más nuevas en Windows pueden anclar un sitio a la barra de tareas como «app web», una función que todavía está cambiando. |

Solo los navegadores Chromium disparan `beforeinstallprompt`, y no forma parte de un estándar terminado. Así que el botón de instalación es un **extra**: aparece solo cuando llega ese evento. Los pasos escritos siempre están en la página, así que todos tienen una forma de hacerlo.

```js
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();       // keep it for our own button
  deferred = event;
  button.hidden = false;
});
```

**En China continental**, muchos celulares Android no tienen los servicios de Google, y algunos navegadores integrados tienen soporte limitado de PWA: puede que solo agreguen un acceso directo, o que no ofrezcan instalación en absoluto. Las funciones sin conexión siguen funcionando en cualquier navegador que admita service workers, y esa es la parte que más importa con una conexión débil.

### Paso 13: modo de bajo consumo de datos (TODO 14)

Todo el tablero, con sus iconos, pesa menos de 100 KB. La biblioteca A-Frame del momento 3D pesa cerca de 1.3 MB. Con un plan prepago, eso no es poca cosa.

1. **Respeta el dispositivo.** Algunos navegadores, sobre todo los basados en Chromium, avisan cuando la persona pidió ahorrar datos: `navigator.connection?.saveData`. Muchos navegadores no tienen `navigator.connection` en absoluto, así que el `?.` es esencial.
2. **Deja que la persona elija.** Una casilla, **Modo de bajo consumo de datos**, guardada en `localStorage`. Su elección siempre gana sobre la del dispositivo.

Cuando está activo, el enlace al momento 3D se reemplaza por una oración que explica por qué, y la página 3D muestra la descripción y la tabla sin descargar A-Frame, con un botón para cargarlo de todos modos.

### Paso 14: prueba en un celular

Un celular también necesita un contexto seguro, y `http://192.168.…` no lo es. Dos formas gratuitas:

- **Publícala** con GitHub Pages (Curso 1.8), que usa `https://`. GitHub puede ser lento o poco confiable en China continental; la siguiente opción no necesita ningún hospedaje.
- **Android y Chrome**: conecta el celular por USB, abre `chrome://inspect` en tu computadora, y usa **Port forwarding** (redirección de puertos) para que el `localhost:8080` del celular llegue a tu servidor. Edge tiene la misma página en `edge://inspect`.

En el celular: carga la app, luego activa el modo avión, y ábrela de nuevo. Instálala, y ábrela desde la pantalla de inicio.

## Explicación del código clave

**`event.waitUntil(promise)`** mantiene vivo al worker, y el paso sin terminar, hasta que la promesa se resuelve. Sin esto, el navegador puede detener al worker a la mitad de llenar una caché.

**`event.respondWith(promise)`** dice «yo mismo voy a responder esta solicitud». El `Response` que entregue la promesa se convierte en la respuesta de la página. Si nunca lo llamas, el navegador hace la solicitud normalmente.

**`response.clone()`**. El cuerpo de una respuesta solo se puede leer una vez. Para dárselo a la página *y* guardarlo en la caché, primero hay que clonarlo.

**`caches.match(request)`** busca en todas las cachés que tiene el origen. `cache.match` busca solo en una.

**`self`** dentro de un service worker es el propio worker (no existe `window`). `self.clients.claim()` toma control de las páginas abiertas; `self.skipWaiting()` deja de esperar.

**`Promise.race([network, timeout])`** se resuelve con lo que se resuelva primero. La promesa del tiempo límite se resuelve con `undefined`, así que `if (first)` distingue «la red respondió» de «se acabó el tiempo».

**`network.catch(() => {})`**. Si gana el tiempo límite y respondemos desde la caché, la promesa de la red puede fallar después sin que nadie la escuche. El `catch` vacío dice «está bien, ya lo resolvimos», así que no aparece ningún error en la consola.

**`script.crossOrigin = 'anonymous'`** convierte la solicitud de A-Frame en una solicitud CORS. `aframe.io` responde con `Access-Control-Allow-Origin: *`, así que el service worker recibe una respuesta normal que puede revisar y guardar. Sin eso, una solicitud `<script>` entre sitios distintos recibe una respuesta **opaca**: estado `0`, cuerpo ilegible, y sin forma de saber si falló. Las respuestas opacas se pueden cachear, pero podrías estar guardando una página de error, y Chromium cuenta cada una como mucho más grande que su tamaño real dentro de tu almacenamiento.

## Momento 3D

Abre [`completed/3d-moment.html`](completed/3d-moment.html), luego desconéctate y ábrelo de nuevo: las mismas siete barras 3D, sin internet.

Tres cosas hacen que eso funcione:

1. **La página** está en el esqueleto de la app, igual que `index.html`.
2. **La biblioteca**: `sw.js` precachea `https://aframe.io/releases/1.8.0/aframe.min.js` durante la instalación, salvo que el dispositivo pida ahorrar datos. Y `cacheFirst` la guarda la primera vez que la página la carga, así que abrir el momento 3D una sola vez, con conexión, siempre es suficiente (TODO 15). La dirección debe coincidir exactamente con `AFRAME_URL` en `config.js`: `1.8.0` y `1.8.1` son archivos distintos para una caché.
3. **Los datos**: el pronóstico llega mediante la regla network-first del service worker, y los datos de ejemplo están en el esqueleto, así que la escena siempre tiene algo que mostrar.

La página también carga A-Frame de forma distinta al Curso 2.4. No hay `<script src>` en el `<head>`: la escena espera dentro de un `<template>`, y el script agrega A-Frame solo cuando el modo de bajo consumo de datos está apagado, o cuando la persona presiona **Load the 3D scene** (Cargar la escena 3D). Después de eso, el foco se mueve a la descripción de la escena, así que nadie se queda en un botón que ya desapareció.

Todo lo demás se conserva del Curso 2.4: la descripción de la escena construida a partir de los mismos datos, la cámara fija, nada que se mueva, y la tabla como gemela 2D. En una lección posterior, un modelo 3D (un archivo `.glb`) se cachearía de la misma manera: una dirección más en la lista de precaché, descontada de tu presupuesto de tamaño.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| «Hay una versión nueva disponible» está escrito en un elemento `role="status"` | 4.1.3 | Los lectores de pantalla lo anuncian sin mover el foco. |
| La página solo recarga cuando la persona presiona **Reload** | 3.2.5 (AAA) | Ningún cambio de contexto por sorpresa. |
| **Reload**, **Install** y **Load the 3D scene** son botones de verdad | 2.1.1, 4.1.2 | El teclado y los lectores de pantalla pueden usarlos. |
| El mensaje de actualización está dentro de la página, nunca encima | 2.4.11 | No puede tapar el control que tiene el foco. |
| Después de **Load the 3D scene**, el foco se mueve a la descripción de la escena | 2.4.3 | El foco no se pierde cuando el botón desaparece. |
| Lo de estar sin conexión y los datos antiguos se dicen con palabras, y se anuncian | 4.1.3 | «No se pudo actualizar. Guardado por esta app a las 09:12». |
| Las barras 3D tienen una descripción de texto y una tabla gemela, también en el modo de bajo consumo de datos | 1.1.1 | La información nunca vive solo en la escena 3D. |

## Consideraciones de rendimiento

El service worker hace que una segunda visita sea casi gratuita: cada archivo del esqueleto viene de la caché, sin ninguna red de por medio. Solo viaja el pronóstico (menos de 1 KB).

Precachear también tiene un costo: la primera visita descarga todo el esqueleto, incluso páginas que la persona tal vez nunca abra. Mantén el esqueleto pequeño. Aquí pesa menos de 100 KB sin A-Frame, y por eso A-Frame se mantiene fuera de él cuando el dispositivo pide ahorrar datos. Mira **Application > Storage** para ver cuánto usa tu app.

Cache first solo es seguro con cachés versionadas. Cambia `VERSION` cada vez que cambies un archivo del esqueleto, o las personas se quedarán con el código antiguo para siempre.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Abrir la página como archivo, o por dirección de red | Falta `navigator.serviceWorker`, o el registro falla | `http://localhost` o `http://127.0.0.1`; `https://` en un celular |
| Olvidar cambiar `VERSION` | Tus cambios nunca llegan a las personas | Cámbialo con cada cambio del esqueleto |
| Un error de tipeo en la lista `SHELL` | `addAll` falla, y el worker nunca se instala | Revisa la consola del worker, y corrige la ruta |
| Cache first para datos en vivo | El pronóstico nunca se actualiza | Network first con tiempo límite |
| Sin tiempo límite en network first | «Loading…» durante mucho tiempo en una conexión débil | Enfrenta la red contra un temporizador |
| Llamar a `skipWaiting()` en cada instalación | Las páginas ejecutan una mezcla de archivos viejos y nuevos | Espera a que la persona presione **Reload** |
| Borrar todas las cachés en `activate` | Los pronósticos guardados desaparecen con cada actualización | Elimina solo las cachés antiguas del esqueleto |
| Cachear una respuesta `no-cors` sin pensarlo | Podrías guardar un error, y ocupa mucho espacio | Usa CORS (`crossOrigin`) donde el servidor lo permita |
| Prometer «instalación» en todos los celulares | Las personas en iPhone o Firefox sienten que algo está roto | Pasos escritos para cada navegador; el botón es un extra |

## Solución de problemas

**Mis cambios a `styles.css` o a un script no aparecen.** El service worker está respondiendo desde su caché. Marca **Update on reload** en **Application > Service workers** mientras trabajas, o cambia `VERSION`.

**El worker dice «waiting to activate» para siempre.** Una pestaña abierta todavía usa la versión anterior. Cierra las demás pestañas de la app, presiona **skipWaiting** en el panel Application, o termina los TODO 11–12 y presiona **Reload**.

**`Failed to register a ServiceWorker` / `SecurityError`.** La página no es un contexto seguro. Usa `localhost` o `127.0.0.1`.

**`Failed to execute 'addAll' on 'Cache'` / `Request failed`.** Un archivo en `SHELL` no existe. La ruta en el error es la que hay que corregir.

**Sin conexión, el pronóstico muestra un error.** La página no estaba controlada cuando cargó el pronóstico (ver Paso 8), y no hay nada guardado. Recarga una vez con conexión, e inténtalo de nuevo.

**No aparece el botón Install.** Solo aparece en navegadores Chromium, y no cuando la app ya está instalada. Chrome también revisa primero el manifiesto: abre **Application > Manifest** y lee sus mensajes de **Installability**.

**Nada funciona en una ventana privada.** Algunos navegadores limitan ahí los service workers o el almacenamiento. Usa una ventana normal.

**Quiero empezar de cero.** **Application > Storage** (Chrome) tiene **Clear site data**, que desregistra el worker y elimina cada caché.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: una insignia «Offline» y una línea de versión para saber siempre qué versión está corriendo.
2. **[Creativo](challenges/challenge-2.es.md)**: haz la app realmente tuya: tu propio icono, colores, nombre, y página sin conexión, en tu idioma.
3. **[Explorador](challenges/challenge-3.es.md)**: convierte otra app de My XR Camp (el mapa del curso, el tablero, o el planificador) en una PWA, y compara estrategias.

## Cómo entregar tu trabajo

1. Completa todos los puntos de [`tests/checklist.md`](tests/checklist.md).
2. Toma capturas de pantalla de: la sección Manifest con tus iconos, Cache storage, el tablero sin conexión diciendo qué tan antiguos son sus datos, el mensaje de actualización, y el momento 3D sin conexión. Si instalaste la app, también su icono en tu pantalla de inicio o lista de apps.
3. Guárdalas en tu diario de aprendizaje y en tu portafolio. Cuando abra la comunidad de XR Camp, compártelas también ahí.
4. En tu diario, responde: ¿a quién conoces que usaría esta app con una conexión débil o costosa, y qué necesitaría después?

## Lecturas adicionales

- [MDN: Aplicaciones web progresivas](https://developer.mozilla.org/es/docs/Web/Progressive_web_apps)
- [MDN: Using Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers) (en inglés)
- [MDN: Web app manifests](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest) (en inglés)
- [MDN: Making PWAs installable](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable) (en inglés)
- [web.dev: Adaptive icon support in PWAs with maskable icons](https://web.dev/articles/maskable-icon) (en inglés)
- [web.dev: The offline cookbook](https://web.dev/articles/offline-cookbook) (en inglés) (más estrategias de caché)
- [Chrome DevTools: Debug progressive web apps](https://developer.chrome.com/docs/devtools/progressive-web-apps) (en inglés)

## Mujeres que conviene conocer

**Frances Berriman** es diseñadora y desarrolladora front-end originaria de Cornualles, en el Reino Unido, radicada en San Francisco. En 2015, junto con Alex Russell, le puso nombre a las «progressive web apps»: ella propuso «Progressive Open Web Apps», que después acortaron a «Progressive Apps». Antes, fue una de las primeras colaboradoras en diseño de front-end y de servicios en GOV.UK, en el Servicio Digital del Gobierno del Reino Unido. Más adelante trabajó en Code for America, y fue jefa de producto de Netlify.

El nombre que has usado a lo largo de toda esta lección vino de una diseñadora. Ponerle buen nombre a una idea es lo que hace que se difunda: «progresiva» dice que un sitio web puede convertirse en aplicación paso a paso, sin dejar atrás a nadie por el navegador que usa.

> **Nota editorial — verificar antes de publicar.** Las afirmaciones biográficas de las secciones Mujeres que conviene conocer deben contrastarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

El manifiesto sigue la especificación **Web Application Manifest** del W3C. El service worker, y la **Cache API** que usa (`caches`, `cache.addAll`, `cache.match`), están definidos en la especificación **Service Workers** del W3C. No todo en esta lección es estándar todavía: `beforeinstallprompt` viene de *Manifest Incubations*, del WICG, y `navigator.connection.saveData` de la *Network Information API*, también del WICG: borradores de la comunidad que solo algunos navegadores han implementado. Por eso mismo esta app verifica cada función antes de usarla, y funciona sin ellas.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
