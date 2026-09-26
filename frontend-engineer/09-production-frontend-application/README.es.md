# Proyecto final de la Fase 2 - Aplicación frontend de producción

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `frontend-engineer` · **Lección:** `production-frontend-application-09` · **Tiempo:** unas 18 horas · 24 sesiones de 45 minutos · unas 6 semanas con 4 sesiones por semana

---

> Publica una aplicación frontend mantenible, instalable y lista para varios idiomas.

---

## Objetivos de aprendizaje

Al terminar este proyecto serás capaz de:

1. Combinar varias aplicaciones pequeñas en una sola, sin perder la forma (config, utils, stores, services, components) que hacía fácil modificar cada una.
2. Elegir, y explicar, un patrón de **navegación simple dentro de la página** para una aplicación pequeña de varias vistas, en lugar de recurrir a una librería de enrutamiento.
3. Separar las palabras de un idioma en su propio módulo, y cambiar de idioma en tiempo de ejecución con `<html lang>`, `Intl` y una página que se actualiza en vivo.
4. Redactar una traducción breve, honesta y de primera versión, y marcarla claramente como pendiente de revisión nativa, en lugar de aparentar que ya está terminada.
5. Publicar una **función 3D que se carga solo cuando se necesita**, con una descripción en texto y una tabla como su gemela en 2D, y demostrar que nunca se carga antes de tiempo.
6. Hacer que una aplicación sea **instalable y funcione sin conexión**, con un service worker versionado y un aviso de actualización accesible.
7. Leer y verificar funciones puras con `check.html`, sin ningún framework de pruebas.
8. Medir un **presupuesto de rendimiento** en el panel Network, y explicar en qué se gasta cada número.
9. Publicar la versión **1.0.0**: un `CHANGELOG.md` que una persona sin conocimientos de programación pueda leer, una versión visible dentro de la propia aplicación, y un registro honesto de uso de IA.
10. Evaluar un proyecto con una **rúbrica** escrita, y explicar, con tus propias palabras, dónde cumple cada fila.

## Requisitos previos

- **Curso 2.1: El modelo de objetos del documento e interfaces dinámicas** (el mapa de cursos, construido a partir de `data/catalog.json`).
- **Curso 2.2: El modelo de objetos del documento e interfaces dinámicas** (el panel de progreso, y su clave de progreso en `localStorage`).
- **Curso 2.3: Arquitectura de aplicaciones y código mantenible** (el planificador de sesiones, y la forma config/utils/store/component que sigue toda esta aplicación).
- **Curso 2.4: APIs, JSON y aplicaciones asíncronas** (el clima de la semana de estudio: `fetch`, caché, y datos de muestra como alternativa).
- **Curso 2.5: Componentes web** (`<lesson-card>`).
- **Curso 2.6: Aplicaciones web progresivas** (el manifest, el service worker, el modo de bajo consumo de datos).
- **Curso 2.7: Colaboración con Git y código abierto** (Versionado semántico, `CHANGELOG.md`).
- **Curso 2.8: La IA como asistente de desarrollo** (el registro de uso de IA).

## Herramientas necesarias

| Herramienta | Para qué sirve | Costo |
| --- | --- | --- |
| Un navegador Chromium: Chrome o Microsoft Edge (ambos disponibles en China continental) | El panel **Application** (manifest, service worker, cachés) y el panel **Network** (el presupuesto de rendimiento) | Gratis |
| VS Code y un servidor local | Toda la aplicación necesita `http://localhost` o `http://127.0.0.1`: un contexto seguro, para el service worker | Gratis |
| Un celular (opcional) | Probar la instalación, el modo sin conexión y los diseños angostos, en un dispositivo real | Gratis |
| [Open-Meteo](https://open-meteo.com/) (en inglés) | Pronósticos del clima: sin clave, sin cuenta | Gratis para uso no comercial |
| A-Frame 1.8.0, desde `aframe.io` | El momento 3D, que se carga solo al presionarlo | Gratis |

**Si Open-Meteo va lento o está bloqueado donde vives**, la vista del clima recurre automáticamente a `data/sample-forecast.json`, como lo ha hecho desde el Curso 2.4.

## Lo que vas a construir

**My XR Camp 1.0**: una pequeña aplicación que combina cada parte de la Fase 2 que has construido hasta ahora.

- **Panel de progreso (Dashboard)**: tu progreso por fase, como tabla, con una vista 3D opcional (Cursos 2.1, 2.2).
- **Mapa de cursos**: cada lección, como elementos `<lesson-card>`, construidos a partir de `data/catalog.json` (Cursos 2.1, 2.5).
- **Planificador de sesiones**: agrega, completa y elimina sesiones de 45 minutos (Curso 2.3).
- **Clima de la semana de estudio**: un pronóstico de 7 días para ciudades donde estudian quienes aprenden en XR Camp (Cursos 2.4, 2.6).
- **App**: idioma, guardado de datos, instalación y actualización, en un solo lugar.

Se instala, funciona sin conexión y habla tres idiomas: inglés completo, y borradores cortos en español y en chino simplificado, ambos marcados como pendientes de revisión por una persona nativa (ver «Lista para varios idiomas», más abajo). Su **momento 3D** es un botón **See my progress in 3D** (ver mi progreso en 3D) que carga una pequeña librería solo al presionarlo, y nunca antes.

La solución de referencia está en [`completed/`](completed/): legible, no muy extensa, con poco más de mil líneas de JavaScript repartidas en diecisiete archivos pequeños. El starter ya tiene escrito cada módulo — config, utils, `i18n.js`, los archivos de idioma, los stores, los services y los components — y deja un solo archivo por terminar: `js/main.js`, con ocho TODOs numerados que conectan entre sí los módulos ya dados. Consulta «What to copy from which lesson» (qué copiar de cada lección) en [`starter/README.md`](starter/README.md) para ver exactamente de dónde viene cada módulo terminado.

## Lista para varios idiomas

Cada cadena de texto visible en la interfaz de la aplicación (no los títulos propios del catálogo de cursos) vive en un módulo de idioma: [`js/locales/en.js`](completed/js/locales/en.js), [`es.js`](completed/js/locales/es.js) y [`zh-Hans.js`](completed/js/locales/zh-Hans.js). El inglés está completo. **El español y el chino simplificado son borradores breves de primera versión, hechos para esta lección sin revisión de una persona nativa de ninguno de los dos idiomas.** Están marcados como `draft: true` en sus propios archivos, y la aplicación muestra un aviso visible («This translation is a short first draft…», esta traducción es un borrador breve de primera versión) cada vez que uno de ellos está activo. Antes de usar cualquiera de las dos traducciones con estudiantes reales, pide que las revise una persona nativa, y quita la marca `draft` una vez hecho. La internacionalización completa — reglas de plural para cada familia de idiomas, diseño de derecha a izquierda y un flujo de trabajo de traducción — es el Curso 6.2; esta lección solo prepara el terreno para eso.

## Guía de carpetas

```text
09-production-frontend-application/
├── README.md, README.es.md, README.zh-Hans.md
├── project.json
├── starter/
│   ├── brief.md, rubric.md          # The task, and how it is graded
│   ├── ai-log.md, CHANGELOG.md      # Templates: fill these in as you work
│   ├── index.html                   # Every view is already here
│   ├── manifest.webmanifest, sw.js, offline.html, check.html   # Finished
│   ├── styles.css, icons/, data/    # Finished
│   └── js/
│       ├── main.js                  # The only file with TODOs (eight of them)
│       ├── config.js, utils.js, i18n.js   # Finished
│       ├── locales/en.js, es.js, zh-Hans.js   # Finished
│       ├── stores/                  # progress, planner, low-data — finished
│       ├── services/                # api, cache, catalog, pwa — finished
│       └── components/              # lesson-card, views, three-progress — finished
├── completed/                       # Reference solution: open this last
│   ├── rubric.md, ai-log.md, CHANGELOG.md   # Filled in, by Ana
│   └── (the same shape as starter/, with main.js finished)
├── challenges/                      # Three challenges: Foundation is required
├── tests/checklist.md               # Self-review before you submit
├── assets/
└── screenshots/
```

## Configuración

1. Copia `starter/` en una carpeta nueva, `my-xr-camp`, y súbela a un repositorio con Git (commit).
2. Inicia tu servidor local, y abre `index.html` a través de `http://localhost` o `http://127.0.0.1`. El service worker necesita un contexto seguro, igual que en el Curso 2.6.
3. Abre las herramientas de desarrollador. Vas a usar la **Console**, el panel **Application** y el panel **Network** a lo largo de esta lección.
4. Lee [`starter/brief.md`](starter/brief.md) y [`starter/rubric.md`](starter/rubric.md) una vez, completos, antes de escribir nada.
5. Abre `js/main.js`. Sus ocho TODOs, en orden, son el recorrido de esta lección.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; lee `brief.md`, `rubric.md` y `starter/README.md` junto con `js/main.js` | Puedes ver cada TODO que vas a completar, y por qué |
| 2 | Paso 1: la forma de My XR Camp — recorre `config.js`, `utils.js` y los stores (la arquitectura del Curso 2.3, reutilizada) | Un mapa de dónde vive cada parte del estado |
| 3 | Paso 2: navegación simple dentro de la página (TODO 1) | Cinco vistas, un solo hash de URL, el foco se mueve en cada cambio |
| 4 | Paso 3: lee el panel de progreso y el mapa de cursos (Cursos 2.1, 2.2, 2.5) | Entiendes las filas de progreso y cómo se renderizan las `<lesson-card>` |
| 5 | Paso 4: lee el planificador de sesiones (Curso 2.3) | El mismo patrón de store, aplicado por segunda vez sin copiar sus errores |
| 6 | Paso 5: lee el clima de la semana de estudio (Cursos 2.4, 2.6) | Entiendes la caché-y-luego-red, y la alternativa con datos de muestra |
| 7 | Paso 6: inicia en el idioma elegido por quien aprende (TODO 2) | La página se abre ya en el idioma correcto, antes del primer render |
| 8 | Paso 7: el selector de idioma (TODO 3) | Cambiar de idioma actualiza todas las vistas visibles a la vez |
| 9 | Paso 8: archivos de idioma, formas de plural e `Intl` | Números, fechas y porcentajes se leen con naturalidad en los tres idiomas |
| 10 | Paso 9: modo de bajo consumo de datos (TODO 4) | Un interruptor que cambia lo que la aplicación está dispuesta a cargar |
| 11 | Paso 10: lee el código del momento 3D, `three-progress.js` | Un gráfico de barras construido a partir de las mismas filas que la tabla del panel de progreso |
| 12 | Paso 11: cárgalo de forma diferida (TODO 5) | Ninguna solicitud a `aframe.io` hasta que se presiona el botón |
| 13 | Paso 12: lee el service worker y su caché (`sw.js`) | El papel de cada archivo en caché, en una sola caché versionada |
| 14 | Paso 13: regístralo, y ofrece actualizaciones (TODO 6) | Aparece «A new version is ready» (hay una nueva versión disponible) tras un cambio de versión |
| 15 | Paso 14: ofrece la instalación (TODO 7) | Un botón Install, o pasos escritos donde no es posible instalar |
| 16 | Paso 15: termina el arranque, en orden (TODO 8) | Toda la aplicación: sin conexión, instalable, en tres idiomas |
| 17 | Paso 16: `check.html` y funciones puras | Cada función pura verificada, sin framework, sin red |
| 18 | Paso 17: una revisión de accesibilidad, con teclado y de oído | Orden del foco, etiquetas y anuncios revisados a mano |
| 19 | Paso 18: un presupuesto de rendimiento, en el panel Network | El tamaño de tu shell medido, y A-Frame comprobado como diferido |
| 20 | Paso 19: prueba a 390 px y 1280 px, y sin conexión | Sin desplazamiento horizontal, y sin diseño roto, en ningún ancho |
| 21 | Paso 20: la accesibilidad del momento 3D (descripción de la escena, movimiento reducido, comodidad) | La sección «3D y XR» de `tests/checklist.md`, marcada |
| 22 | Paso 21: publicación — escribe la entrada `1.0.0` de `CHANGELOG.md` (Curso 2.7) | Un changelog que una persona sin conocimientos de programación pueda leer |
| 23 | Paso 22: tu registro de uso de IA, revisado y terminado (Curso 2.8) | Un registro honesto, llevado mientras trabajabas, no inventado después |
| 24 | Un reto de extensión, y luego [`tests/checklist.md`](tests/checklist.md) y **Cómo entregar tu trabajo** | My XR Camp 1.0 |

### Paso 1: la forma de My XR Camp

Abre primero `js/config.js`. Ahí está cada configuración de toda la aplicación, agrupada según la parte que la usa: la versión de lanzamiento, los tres códigos de idioma, los cinco ids de vista y las cinco claves de `localStorage`, tres de ellas con exactamente el mismo nombre que en los Cursos 2.2 a 2.6, para que el progreso guardado de quien aprende se mantenga en esta aplicación. Luego revisa por encima `js/utils.js`: nada en él toca el DOM, el almacenamiento ni un idioma, así que `check.html` (Paso 16) puede probar cada línea directamente. Esta es la arquitectura del Curso 2.3, aplicada a cinco vistas en lugar de una: config, utils, stores, services, components, y un único `main.js` que es el único archivo con permiso para tocar la página.

### Paso 2: navegación simple dentro de la página (TODO 1)

My XR Camp tiene cinco vistas (`VIEWS` en `config.js`): panel de progreso, mapa de cursos, planificador, clima y app. Cada una es un `<section id="…">` en `index.html`, ya marcada `hidden` excepto el panel de progreso. Escribe `currentView()` (lee `location.hash`, y usa `DEFAULT_VIEW` como alternativa) y `showView(view)` (alterna el `hidden` de cada sección, pone `aria-current="page"` en el enlace de navegación correspondiente, y mueve el foco al `<h1>` de la vista, que ya tiene `tabindex="-1"`). Escucha `hashchange` para volver a llamar a `showView(currentView())`.

Esto es un **router**, en miniatura, y vale la pena explicar por qué no hay uno completo aquí: cinco secciones no son suficientes para necesitarlo, este curso evita los pasos de compilación que la mayoría de los routers dan por hecho, y el hash ya es una URL que se puede guardar en marcadores, funciona sin conexión, y no necesita configurar ninguna ruta en el servidor. Si My XR Camp creciera a veinte vistas, esa relación costo-beneficio cambiaría; el Curso 6 vuelve sobre esto.

### Paso 3: lee el panel de progreso y el mapa de cursos

`renderDashboard()` y `renderCourse()` ya están escritas, y vale la pena leerlas con atención: `phaseProgress()` (de `utils.js`) convierte el catálogo y el conjunto de lecciones completadas en una fila por fase, y tanto la tabla (`phaseTable()`) como la vista 3D (Paso 10) se construyen a partir de esas mismas filas, así que nunca pueden contradecirse. `renderCourse()` construye una `<lesson-card>` por lección, el mismo elemento personalizado del Curso 2.5, que ahora habla en cada idioma de la aplicación (su propio escucha de `localechange` la vuelve a renderizar).

### Paso 4: lee el planificador de sesiones

`plannerStore` es el `store.js` del Curso 2.3, copiado con un solo cambio: la clave de almacenamiento se llama `PLANNER_KEY` en `config.js` (su valor, `'xrc_s'`, no cambió, así que las sesiones guardadas anteriormente se siguen cargando, a través de la misma migración `upgrade()`). Fíjate en que el planificador nunca toca `localStorage` directamente desde `main.js`: solo el store lo hace, y cada otro módulo lo lee a través de `getSessions()` y se entera de los cambios a través de `subscribe()`.

### Paso 5: lee el clima de la semana de estudio

`loadWeather()` muestra primero el pronóstico en caché, si existe, y luego consulta la red. Si falla, recurre a `data/sample-forecast.json`, así que la vista nunca queda vacía. `toDaysSafe()` y `driestDay()` (de `utils.js`) son las mismas funciones puras del Curso 2.4, y `forecast-view.js` renderiza la misma tabla, ahora con cada palabra proveniente de `i18n.js` y cada número de `Intl`.

### Paso 6: inicia en el idioma elegido por quien aprende (TODO 2)

Al principio de `start()`, ejecuta `await startI18n()`, y luego `translatePage()`. `startI18n()` (en `i18n.js`, ya escrita) revisa `localStorage` por si hay una elección guardada, luego `navigator.languages`, y por último recurre al inglés, y establece `document.documentElement.lang` antes de que corra cualquier otra cosa — el mismo requisito del idioma del documento que en cada lección anterior (WCAG 3.1.1), ahora decidido por quien aprende en lugar de estar fijo en el código.

### Paso 7: el selector de idioma (TODO 3)

Escucha el evento `change` en `#language-select`, y llama a `setLocale(event.target.value)`. Luego escribe `onLocaleChange()`: `translatePage()`, `renderLanguageControls()`, y un re-render completo de cada vista, para que nada quede mostrando el idioma anterior. Regístralo como escucha de `"localechange"` al final de `start()` (Paso 15/TODO 8), después del primer render, no antes: `setLocale()` dispara el mismo evento al iniciar, y registrar el escucha demasiado pronto haría que toda la aplicación se renderizara dos veces sin necesidad.

### Paso 8: archivos de idioma, formas de plural e `Intl`

Abre `js/locales/en.js`. Un mensaje es una cadena de texto simple, o un objeto con formas de plural (`{ one: '…', other: '…' }`): `format()`, en `i18n.js`, elige la forma correcta con `Intl.PluralRules`, porque qué cantidad necesita «one» depende del idioma — el chino no tiene ninguna forma de plural separada, por eso `zh-Hans.js` solo escribe `other`. Cada fecha, hora, temperatura y porcentaje de esta aplicación pasa por `Intl.DateTimeFormat`, `Intl.NumberFormat`, o por un envoltorio delgado alrededor de ellos en `i18n.js`: en ningún lugar hay escrita a mano una lista de nombres de mes, ni una función de redondeo.

### Paso 9: modo de bajo consumo de datos (TODO 4)

`lowData.lowDataPreferred()` y `lowData.setLowData()` no cambiaron desde el Curso 2.6. Conecta el evento `change` de `#low-data-toggle` a `setLowData()`, y suscríbete al store para que `renderLowDataControls()` y `renderThreeDGate()` (Paso 11) se vuelvan a ejecutar cada vez que cambia la preferencia, incluso desde otra pestaña abierta.

### Paso 10: lee el código del momento 3D

Abre `js/components/three-progress.js`. `mountThreeProgress()` construye una `<a-scene>` con una `<a-box>` por fase, con una altura proporcional a las lecciones completadas, a partir de las mismas filas que usa la tabla del panel de progreso. La cámara está fija — sin arrastrar para orbitar, sin esquema WASD — así que no hay ninguna interacción exclusiva del 3D que necesite su propio camino con el teclado: todo lo que muestra la escena, la tabla 2D de abajo también lo muestra, en palabras. Nada en la escena se mueve por sí solo, así que no hace falta un botón de pausa; un gráfico que nunca se anima no necesita nada que desactivar para `prefers-reduced-motion`, aunque la decisión de mantenerlo estático *es* precisamente la forma en que esta función respeta esa preferencia.

### Paso 11: cárgalo de forma diferida (TODO 5)

En `renderThreeDGate()`: si `lowData.lowDataPreferred()` es verdadero, oculta el botón, muestra el aviso de omisión, vacía el contenedor, y detente ahí — la librería no debe cargarse nunca en ese caso. Si no, muestra el botón, y haz que su clic llame a `mountThreeProgress(container, rows)`. `loadAframe()` (dentro de `three-progress.js`) inserta `<script src="https://aframe.io/releases/1.8.0/aframe.min.js">` en `<head>` la primera vez que se llama, y nunca más. **Compruébalo**: abre el panel Network, recarga la aplicación, y confirma que no hay ninguna solicitud a `aframe.io` en toda la lista — luego presiona el botón, y observa cómo aparece una.

### Paso 12: lee el service worker y su caché

`sw.js` es el service worker del Curso 2.6, con una caché por aplicación. `SHELL` enumera cada archivo que la aplicación necesita para abrirse sin internet; `THREE_D` enumera la URL de A-Frame, en caché por separado y omitida al instalar cuando el dispositivo pide ahorrar datos. Las solicitudes de clima usan **red primero, con un tiempo límite**; todo lo demás en `SHELL` usa **caché primero**; las navegaciones recurren a `offline.html`.

### Paso 13: regístralo, y ofrece actualizaciones (TODO 6)

Llama a `registerServiceWorker()`, con un callback `onUpdateReady(worker)` que agrega la clase `visible` a `#update-message`, y luego llama a `showUpdateBanner(worker, { message, button })` con `#update-text` y `#update-button`. Ambas funciones ya están escritas, en `js/services/pwa.js`; léelas antes de conectar esto. Para probarlo, cambia el `VERSION` de `sw.js`, recarga una vez (el nuevo worker se instala y espera), y recarga otra vez — debería aparecer el aviso, y presionar su botón debería actualizar sin perder el progreso ni las sesiones guardadas.

### Paso 14: ofrece la instalación (TODO 7)

Llama a `offerInstall()`, con `#install-button` y `#install-status`. Si `isInstalled()` ya es verdadero, establece tú misma el texto de `#install-status`. Igual que en el Curso 2.6, solo los navegadores Chromium disparan `beforeinstallprompt`; en cualquier otro lugar, las instrucciones escritas en la vista App son la forma de instalar, así que el botón se mantiene oculto ahí correctamente, no por error.

### Paso 15: termina el arranque, en orden (TODO 8)

Agrega el escucha de `"localechange"` del Paso 7 al final de `start()`. El orden dentro de `start()` importa: primero el idioma, para que cada texto que sigue sea correcto desde el primer cuadro; luego el catálogo y el primer render de cada vista; luego la navegación, para que la página se abra en la vista correcta; luego el service worker, la oferta de instalación, y por último el escucha de cambio de idioma. Lograr este orden es la mayor parte de lo que significa «producción» en el título de esta lección: no son funciones nuevas, sino las mismas funciones, llegando en un orden con el que la primera visita de una estudiante real puede contar.

### Paso 16: `check.html` y funciones puras

Abre `check.html`. Ejecuta las funciones puras de `utils.js` y de `i18n.js` contra entradas conocidas, con verificaciones simples de tipo `assert` y sin ningún framework: ábrelo después de cualquier cambio en cualquiera de los dos archivos. También comprueba que el `VERSION` de `sw.js` y el `APP_VERSION` de `config.js` coincidan — un desajuste ahí es exactamente el tipo de error que resulta invisible hasta que el navegador de una estudiante queda atascado en una versión vieja.

### Paso 17: una revisión de accesibilidad

Desconecta tu mouse durante diez minutos. Recorre cada vista con Tab: ¿el foco siempre se ve? ¿Cada control tiene un nombre que un lector de pantalla pueda leer en voz alta, que empiece por la etiqueta visible (WCAG 2.5.3)? Activa un lector de pantalla (VoiceOver, NVDA, o el propio de Chrome) y agrega una sesión, cambia de idioma, y presiona **See my progress in 3D** (ver mi progreso en 3D): ¿se anuncia algo cada vez, sin que tu foco salte de lo que estabas haciendo?

### Paso 18: un presupuesto de rendimiento, en el panel Network

Abre el panel Network, límpialo, y recarga con la caché deshabilitada. Anota el tamaño total transferido del shell: el presupuesto de esta aplicación es de **menos de 150 KB, sin contar A-Frame**. Luego presiona **See my progress in 3D**, y confirma que la solicitud de ~1.3 MB de A-Frame aparece solo ahora, no antes. Un presupuesto de rendimiento es un número que decides de antemano y luego defiendes, no uno que descubres después y justificas.

### Paso 19: prueba a 390 px y 1280 px, y sin conexión

Cambia el ancho de DevTools a 390 px, y luego a 1280 px: nada debería desplazarse hacia los lados, y cada etiqueta debería seguir junto a su control. Luego marca **Offline** en el panel Network, recarga cada vista, y abre una página que el service worker no haya guardado: debería mostrar `offline.html`, nunca el error propio del navegador.

### Paso 20: la accesibilidad del momento 3D

Confirma, a mano: `#scene-description` existe y se construye a partir de las mismas filas que la tabla de abajo; toda la función se puede alcanzar y descartar con el teclado (no hay nada exclusivo del 3D que alcanzar, por diseño — ver Paso 10); y con **prefers-reduced-motion: reduce** activado en tu sistema operativo o en el panel Rendering de DevTools, nada en el comportamiento de la aplicación cambia, porque nada en ella se animó nunca. Marca cada casilla de la sección «3D y XR (manual)» en `tests/checklist.md`.

### Paso 21: publicación — escribe la entrada `1.0.0` de `CHANGELOG.md`

Completa el encabezado `1.0.0` de `starter/CHANGELOG.md` con la fecha de hoy, y enumera lo que hace My XR Camp, agrupado bajo `### Added`, con palabras que una persona sin conocimientos de programación pueda leer. Compara con [`completed/CHANGELOG.md`](completed/CHANGELOG.md) solo después de haber escrito el tuyo.

### Paso 22: tu registro de uso de IA, revisado y terminado

Si usaste un asistente de IA en algún momento de esta lección — incluso para las cadenas de borrador en español o en chino, si escribiste las tuyas — termina `ai-log.md`: cada conversación, qué compartiste, qué conservaste, y cuánto tiempo tomó, incluidas las veces que no usaste la respuesta. [`completed/ai-log.md`](completed/ai-log.md) es un ejemplo ya completado, no una plantilla para copiar palabra por palabra.

## Explicación del código clave

**`Intl.PluralRules(locale).select(count)`** devuelve una categoría — `'one'`, `'other'`, y otras que usan algunos idiomas — no un número. `format()`, en `i18n.js`, la usa para elegir entre las formas de plural de un mensaje, así la misma clave funciona correctamente en un idioma con dos formas y en uno sin ninguna.

**`import(`./locales/${code}.js`)`**. Una importación dinámica con una variable, verificada primero contra la lista fija de códigos conocidos (`CODES.includes(code)`), así que solo los propios archivos de idioma de esta aplicación pueden cargarse de esta forma, y cada uno se carga solo cuando se necesita.

**`window.matchMedia('(display-mode: standalone)').matches`** es cómo `isInstalled()` distingue una aplicación instalada de una pestaña del navegador, sin ningún permiso especial.

**`AbortSignal.timeout(TIMEOUT_MS)`** cancela un `fetch` después de un tiempo fijo, así que una red lenta falla rápido en lugar de dejar la vista del clima diciendo «Loading…» (cargando) para siempre.

**`document.dispatchEvent(new CustomEvent('localechange', …))`**. Cada módulo que muestra texto escucha este mismo evento, en lugar de importarse entre sí directamente: el selector de idioma y el panel de progreso, el planificador, la vista del clima, e incluso `<lesson-card>` (a través de un límite de shadow DOM) reaccionan a él sin saber que los otros existen.

## Momento 3D

Publica una función 3D que se carga solo cuando se necesita y que nunca bloquea la experiencia 2D.

Presiona **See my progress in 3D** (ver mi progreso en 3D), en el panel de progreso. Aparece un gráfico de barras: una columna por fase, con una altura igual a la fracción de lecciones de esa fase que marcaste como completadas — los mismos números que la tabla justo arriba, porque ambos vienen de `phaseProgress()`. Nada de esto se cargó antes de presionar el botón: revisa el panel Network, y no hay ninguna solicitud a `aframe.io` en la primera carga, solo después.

La cámara nunca se mueve, y tampoco nada en la escena: no hay arrastrar para orbitar, ni clic para rotar, ni animación continua. Esa única decisión elimina de un golpe dos categorías completas de trabajo de accesibilidad: no hay ninguna interacción exclusiva del 3D que necesite su propio camino con el teclado, y no hay nada que necesite un botón de pausa ni una verificación de `prefers-reduced-motion`, porque nada se mueve nunca como para que `prefers-reduced-motion` tenga que interrumpirlo. `#scene-description` se construye, en palabras, a partir de las mismas filas exactas que usan tanto las barras 3D como la tabla 2D, así que una persona que usa lector de pantalla recibe exactamente la misma información que alguien que mira las barras.

Si la carga de A-Frame falla — un CDN bloqueado, sin conexión — la vista muestra un mensaje de error breve y de todas formas muestra la tabla gemela: la información nunca vivió solamente en la escena 3D.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| `<html lang>` se establece correctamente con `startI18n()` y se actualiza en cada cambio de idioma | 3.1.1 | Los lectores de pantalla pronuncian la página correctamente, en cada idioma |
| Cada vista tiene un `<h1>` visible, y cambiar de vista mueve el foco hacia él | 2.4.3, 1.3.1 | Quienes usan teclado o lector de pantalla saben dónde llegaron |
| Cada botón y campo tiene una etiqueta visible, y su nombre accesible empieza por ella | 2.5.3 | «Done: CSS grid» (completado: CSS grid), no «CSS grid: Done» |
| «A new version is ready» (hay una nueva versión disponible) y los cambios de estado del clima o del planificador están en elementos `role="status"` | 4.1.3 | Se anuncian sin mover el foco |
| La página se recarga para actualizar solo cuando quien aprende presiona **Reload** (recargar) | 3.2.5 (AAA) | Ningún cambio de contexto por sorpresa |
| `#scene-description` describe las barras 3D a partir de los mismos datos que la tabla | 1.1.1 | La información nunca vive solamente dentro de la escena 3D |
| El estado (listo, próximamente, completado) se muestra con palabras y un borde, no solo con color | 1.4.1 | Las personas con daltonismo o baja visión también lo ven |

## Consideraciones de rendimiento

El shell de la aplicación (todo excepto A-Frame) pesa menos de 150 KB, la mayor parte módulos de JavaScript que el navegador puede guardar en caché por separado. A-Frame pesa cerca de 1.3 MB y se solicita exactamente una vez, solo después de presionar el botón 3D, y luego el service worker lo guarda en caché, así que una estudiante que prueba la vista 3D una sola vez puede usarla sin conexión de ahí en adelante.

Los archivos de idioma también se cargan de forma diferida, uno a la vez, con `import()`: una estudiante que nunca cambia del inglés nunca descarga las cadenas en español o en chino.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Escribir una cadena en inglés directamente en un componente | Nunca se traduce, y queda mal en cualquier otro idioma | Cada cadena viene de `t()` o de un archivo de idioma |
| Cargar A-Frame en `<head>` | El momento 3D deja de ser «diferido»; bloquea el primer render | Inserta la etiqueta `<script>` solo dentro de `loadAframe()`, al hacer clic |
| Registrar el escucha de `"localechange"` antes del primer render | La aplicación se renderiza dos veces en cada carga, sin necesidad | Regístralo al final de `start()` |
| Escribir en la clave de `localStorage` de un store directamente desde `main.js` | Dos lugares pueden quedar en desacuerdo sobre el estado guardado | Solo el propio store llama a `localStorage.setItem` |
| Omitir la alternativa de datos de muestra del clima | Una API de clima bloqueada o lenta deja una vista en blanco | Recurre siempre a `data/sample-forecast.json` |
| Tratar una traducción de primera versión como si estuviera terminada | Las personas confían en un español o un chino que está mal | Conserva la marca `draft`, y dilo en la aplicación y en el README |

## Solución de problemas

**Mi elección de idioma no se guarda después de recargar.** Revisa que `setLocale()` se haya llamado con `save: true` (el valor por defecto), y que `LANGUAGE_KEY` en `config.js` coincida con lo que lee `startI18n()`.

**Cambiar de idioma cambia parte del texto, pero no todo.** Una cadena quedó escrita directamente en el código en lugar de pasar por `t()` o `data-i18n`, o un componente no se volvió a renderizar con `"localechange"`.

**El botón 3D no hace nada.** Revisa que el manejador de clic del TODO 5 realmente esté conectado — un error común es escribir `renderThreeDGate()` correctamente pero llamarla solo una vez, antes de que el catálogo haya cargado ninguna fila.

**A-Frame se carga de inmediato, antes de presionar el botón.** Busca en `main.js` e `index.html` un `<script src="…aframe…">` escrito directamente: solo debe crearse dentro de `loadAframe()`.

**El aviso de actualización nunca aparece.** Es probable que todavía tengas marcado **Update on reload** (actualizar al recargar) en el panel Application, de cuando probaste el Curso 2.6; desmárcalo, cambia el `VERSION` de `sw.js`, y recarga dos veces.

**`Failed to register a ServiceWorker`.** La página no es un contexto seguro: usa `localhost` o `127.0.0.1`, no una IP directa ni un archivo abierto con doble clic.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: agrega una cuarta cadena lista para idiomas que la aplicación todavía no muestra, a los tres archivos de idioma, y demuestra que se actualiza en vivo.
2. **[Creativo](challenges/challenge-2.es.md)**: haz que My XR Camp sea tuyo: tu propio ícono, una cuarta vista, o un idioma que ninguno de los borradores cubre todavía.
3. **[Explorador](challenges/challenge-3.es.md)**: agrega una segunda codificación 3D de los mismos datos de progreso (color, o un segundo eje) sin agregar un solo dato nuevo a `#scene-description`.

## Cómo entregar tu trabajo

1. Completa cada punto de [`tests/checklist.md`](tests/checklist.md), incluida su sección «3D y XR (manual)».
2. Revisa tu proyecto contra cada fila de [`starter/rubric.md`](starter/rubric.md).
3. Toma capturas de pantalla de: el panel de progreso en tus tres idiomas, la vista 3D, el panel Application con tu service worker activado, y la aplicación instalada (o los pasos de instalación escritos, si tu navegador no tiene ninguno).
4. Guárdalas en tu diario de aprendizaje y en tu portafolio. Compártelas con otras personas que programan: consulta [dónde compartir tu trabajo y pedir ayuda](../../docs/en/community.md) (en inglés).
5. En tu diario, responde: ¿cuál de las cinco vistas conservarías si solo pudieras publicar una, y por qué?

## Lecturas adicionales

- [MDN: Internacionalización](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) (en inglés)
- [MDN: Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules) (en inglés)
- [MDN: Aplicaciones web progresivas](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) (en inglés)
- [W3C: Web App Manifest](https://www.w3.org/TR/appmanifest/) (en inglés)
- [Versionado semántico](https://semver.org/) (en inglés)
- [Documentación de A-Frame](https://aframe.io/docs/1.8.0/introduction/) (en inglés)

## Mujeres que conviene conocer

**Wenli Zhang**, conocida como **Ovilia**, es desarrolladora de visualización de datos, de Shanghái, China. Escribió 《Three.js 入门指南》, una guía gratuita para principiantes sobre three.js, escrita en chino, publicada por primera vez en Turing Community y disponible de forma gratuita desde diciembre de 2014, con todo su código de ejemplo publicado en GitHub. Más adelante se convirtió en mantenedora de tiempo completo de Apache ECharts — la librería de gráficos que Baidu liberó como código abierto — y aparece en su Comité de Gestión del Proyecto (Project Management Committee).

El gráfico de barras 3D que acabas de construir es un pariente pequeño del trabajo de visualización al que ella le ha dedicado años: convertir números en formas que las personas puedan leer de un vistazo, en un navegador, de forma gratuita. Su guía hizo lo mismo por toda una generación de desarrolladoras y desarrolladores de habla china que aprendían three.js, la librería sobre la que están construidos los cursos de Web3D de XR Camp.

> **Nota editorial — verificar antes de publicar.** Las afirmaciones biográficas de las secciones Mujeres que conviene conocer deben contrastarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

El formato de números, fechas y porcentajes en esta aplicación usa `Intl`, estandarizado como **ECMA-402**, junto con el núcleo del lenguaje JavaScript (**ECMA-262**), ambos del comité TC39 de Ecma International. El manifest sigue la especificación **Web Application Manifest** del W3C, una especificación comunitaria distinta solo en el nombre: el Versionado semántico, el esquema `MAJOR.MINOR.PATCH` que sigue el `1.0.0` de este proyecto, está documentado en [semver.org](https://semver.org/) (en inglés), mantenido como una especificación comunitaria abierta en lugar de por un organismo de estándares como el W3C o Ecma. Tres especificaciones, tres tipos de gobernanza — un organismo de estándares, un grupo de trabajo y un proyecto comunitario — y esta pequeña aplicación depende de los tres.

## Licencia

Código: [`LICENSE-CODE`](../../LICENSE-CODE) · Contenido: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
