# APIs, JSON y aplicaciones asíncronas

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `frontend-engineer` · **Lección:** `apis-json-and-asynchronous-applications-04` · **Tiempo:** unas 12 horas · 16 sesiones de 45 minutos · unas 4 semanas con 4 sesiones por semana

---

> Crea un panel de datos públicos, cultural, educativo o comunitario.

---

## Objetivos de aprendizaje

Al terminar este proyecto serás capaz de:

1. Explicar qué es una **API** y leer su respuesta en JSON en el navegador antes de escribir código.
2. Construir una URL de solicitud de forma segura con `URLSearchParams`.
3. Usar `fetch` con `async` y `await`, verificar `response.ok`, y establecer un **tiempo límite**.
4. Diseñar los cuatro estados de una solicitud: **cargando**, **error**, **vacío** y **listo**.
5. **Guardar en caché** las respuestas junto con la hora en que se guardaron, para que la app sea rápida y siga siendo útil sin conexión.
6. Evitar **condiciones de carrera**, en las que una respuesta lenta y antigua sobrescribe a una más reciente.
7. Trabajar con **datos de prueba (mock data)** que tienen la misma forma que la API real, para poder construir y probar sin internet.

## Requisitos previos

- **Curso 2.1: JavaScript moderno** (`async`/`await`, módulos, manejo de errores).
- **Curso 2.3: Arquitectura de aplicaciones** (configuración, funciones puras, una responsabilidad por archivo).

## Herramientas necesarias

| Herramienta | Para qué sirve | Costo |
| --- | --- | --- |
| Un navegador moderno, con sus herramientas de desarrollo | El panel **Network** (Red) muestra cada solicitud y respuesta | Gratis |
| VS Code y un servidor local | Los módulos y `fetch` necesitan `http://` | Gratis |
| [Open-Meteo](https://open-meteo.com/) | Pronósticos del clima: sin clave, sin cuenta | Gratis para uso no comercial |

**Si Open-Meteo va lento o está bloqueado donde vives**, marca **Use sample data** (Usar datos de ejemplo): toda la lección funciona sin conexión con `data/sample-forecast.json`. Así es exactamente como trabajan los equipos profesionales cuando una API todavía no está lista.

## Lo que vas a construir

La cuarta parte de **My XR Camp**: un **panel del clima para la semana de estudio**. Elige tu ciudad y observa los próximos siete días: máximas, mínimas y la probabilidad de lluvia, con el día más seco destacado, para que puedas planear en qué días caminar a tus sesiones (una biblioteca, un grupo de estudio, un centro comunitario) sin mojarte.

Es pequeño, pero se comporta como una app profesional: muestra un pronóstico guardado al instante, lo actualiza en segundo plano, explica los fallos en palabras claras, ofrece **Try again** (Intentar de nuevo), sigue funcionando sin conexión y nunca muestra la ciudad equivocada.

La solución de referencia está en [`completed/`](completed/). El punto de partida ya tiene terminados la página, los estilos, la configuración y los datos de ejemplo; los archivos de JavaScript tienen trece TODO.

## Guía de carpetas

```text
04-apis-json-and-asynchronous-applications/
├── README.md            # Esta guía (en inglés)
├── README.es.md         # Español
├── README.zh-Hans.md    # Chino simplificado
├── project.json         # Metadatos de la lección
├── starter/
│   ├── index.html, styles.css        # Terminados
│   ├── data/sample-forecast.json     # Datos de ejemplo, con la forma exacta de la API
│   ├── js/config.js     # Terminado; el TODO 1 está al principio
│   ├── js/api.js        # TODO 2 y 5
│   ├── js/forecast.js   # TODO 3–4
│   ├── js/view.js       # TODO 6–8
│   ├── js/cache.js      # TODO 9
│   ├── js/main.js       # TODO 10–13
│   └── 3d-moment.html   # El pronóstico como barras 3D
├── completed/           # Solución de referencia: ábrela al final
├── challenges/          # Tres desafíos: Fundamento es obligatorio
├── tests/checklist.md   # Autorrevisión antes de entregar
├── assets/
└── screenshots/
```

## Configuración

1. Copia el punto de partida en una carpeta nueva, `weather`, y confírmala con Git.
2. Inicia tu servidor local. Abre `index.html` con los paneles **Network** y **Console** abiertos.
3. Hasta el TODO 10, la página dirá "Loading…" (Cargando…) para siempre. Eso es lo esperado.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; Paso 1: qué es una API (TODO 1) | Has leído el JSON de la API |
| 2 | Paso 2: construir la URL (TODO 2) | Una URL de solicitud funcional |
| 3 | Paso 3: convertir el JSON en días (TODO 3–4) | Funciones puras para los datos |
| 4 | Paso 4: `fetch`, `async` y `await` (TODO 5) | `fetchJson` con tiempo límite |
| 5 | Paso 5: el estado listo (TODO 6) | Una tabla de pronóstico |
| 6 | Paso 6: carga y errores (TODO 7, 10) | Cada fallo explicado |
| 7 | Paso 6, continuación: prueba los fallos | Sin conexión, bloqueado y lento, todo manejado |
| 8 | Paso 7: el estado vacío (TODO 8) | Nada queda nunca simplemente en blanco |
| 9 | Paso 8: caché (TODO 9) | Respuestas guardadas con una hora |
| 10 | Paso 8, continuación (TODO 11) | Cargas instantáneas y uso sin conexión |
| 11 | Paso 9: condiciones de carrera (TODO 12) | Nunca la ciudad equivocada |
| 12 | Paso 10: datos de prueba y trabajo sin conexión (TODO 13) | Funciona sin internet |
| 13 | Paso 11: prueba con teclado y lector de pantalla | Un panel probado |
| 14 | El **Momento 3D** | El pronóstico como barras 3D |
| 15 | [`tests/checklist.md`](tests/checklist.md) | Un panel terminado |
| 16 | Un desafío de extensión, después **Cómo entregar tu trabajo** | La cuarta parte de My XR Camp |

### Paso 1: qué es una API (TODO 1)

Una **API** (Interfaz de Programación de Aplicaciones) es una forma en que un programa le pide algo a otro. Una **API web** es una dirección web que responde con datos en lugar de una página. Normalmente los datos vienen en **JSON**: los mismos objetos y arreglos que ya conoces de JavaScript, escritos como texto.

Antes de escribir código, abre la dirección del TODO 1 en tu navegador. Lee la respuesta. Firefox la muestra como un árbol; en Chrome y Edge, marca **Pretty-print**. En Safari, ábrela en el panel Network del Web Inspector para verla con formato. Vas a encontrar:

```json
"daily": {
  "time": ["2026-09-28", "2026-09-29", …],
  "temperature_2m_max": [26.8, 25.4, …],
  "precipitation_probability_max": [94, 59, …]
}
```

Tres **arreglos paralelos**: la posición 0 de cada uno pertenece al primer día. Lee siempre primero la respuesta real de una API. Su documentación te dice lo que *debería* enviar; la respuesta te dice lo que *en verdad* envía.

### Paso 2: construir la URL (TODO 2)

La parte después de `?` es la **cadena de consulta (query string)**: pares `nombre=valor` unidos por `&`. No la armes a mano, pegando texto. `URLSearchParams` la construye y codifica correctamente cualquier cosa fuera de lo común (espacios, acentos, comas):

```js
const params = new URLSearchParams({ latitude: 19.43, longitude: -99.13, forecast_days: 7 });
`${API_URL}?${params}`   // …/forecast?latitude=19.43&longitude=-99.13&forecast_days=7
```

### Paso 3: convertir el JSON en días (TODO 3–4)

La forma de la API es buena para la API. Tu página necesita algo distinto: un objeto por día. Conviértelo una sola vez, en una función pura, y el resto de tu código nunca necesitará saber nada sobre arreglos paralelos:

```js
return daily.time.map((date, i) => ({ date, max: daily.temperature_2m_max[i], … }));
```

Si algún día la API cambia su forma, esta es la única función que hay que arreglar.

### Paso 4: `fetch`, `async` y `await` (TODO 5)

Una solicitud toma tiempo: unos milisegundos en un Wi-Fi rápido, varios segundos en una conexión móvil saturada. JavaScript no se detiene a esperar. `fetch` devuelve una **promesa (promise)**, y `await` pausa solo tu función `async` hasta que llega la respuesta, mientras la página sigue respondiendo.

Dos cosas sorprenden a casi todo el mundo:

- **`fetch` no falla ante un "404" o un "500".** Esas son respuestas, solo que poco felices. `fetch` únicamente rechaza cuando no hay respuesta alguna: sin conexión, bloqueado o cancelado. Por eso siempre hay que verificar `response.ok`.
- **Una solicitud puede quedarse colgada mucho tiempo.** `AbortSignal.timeout(8000)` la cancela después de ocho segundos, para que quien aprende vea un error en lugar de "Loading…" para siempre.

Abre `3d-moment.html` con el panel **Network** abierto: ya llama a `fetchForecast`, así que puedes observar la solicitud, su estado (200), su tamaño y su tiempo. El panel en sí empieza a pedir datos en cuanto se completa el TODO 10.

### Paso 5: el estado listo (TODO 6)

Un pronóstico es una tabla: los días en un lado, las mediciones cruzadas. Usa una `<table>` de verdad, con `<caption>`, `<th scope="col">` para los encabezados de columna, y `<th scope="row">` para el nombre de cada día. Así un lector de pantalla puede decir "martes, máxima, 25 °C" mientras la persona la recorre.

El día más seco se marca con negrita, un color *y* la palabra "(más seco)", para que el significado nunca dependa solo del color.

### Paso 6: carga y errores (TODO 7 y 10)

Toda solicitud está en uno de cuatro estados. La mayoría de quienes empiezan construyen solo el estado feliz. Constrúyelos todos:

| Estado | Qué ve quien aprende |
| --- | --- |
| **Cargando** | "Loading the forecast for Lima…" (Cargando el pronóstico de Lima…), y `aria-busy="true"` en la región |
| **Error** | Qué salió mal, en palabras claras, y un botón **Try again** (Intentar de nuevo) |
| **Vacío** | El servicio respondió, pero sin nada que mostrar: dilo con calma |
| **Listo** | El pronóstico |

`explain(error)` convierte errores técnicos en frases sobre las que quien aprende puede actuar. Un `TypeError` de `fetch` significa que falló la red; un `TimeoutError`, que tardó demasiado.

**Prueba cada fallo a propósito.** En el panel Network, elige **Offline** (Sin conexión) en el menú de limitación de velocidad, o haz clic derecho en la solicitud y elige **Block request URL** (Bloquear URL de solicitud). Elige **Slow 4G** (Chrome) para observar el estado de carga. No puedes confiar en un mensaje de error que nunca has visto.

### Paso 7: el estado vacío (TODO 8)

`toDays` devuelve `[]` cuando la respuesta no tiene días. Eso no es un error (la solicitud funcionó) ni está listo (no hay nada que mostrar). Pruébalo editando una copia del archivo de ejemplo para quitarle `daily`.

### Paso 8: caché (TODO 9 y 11)

Un pronóstico no cambia cada segundo. Pedirle de nuevo a la API cada vez que quien aprende cambia de ciudad desperdicia sus datos móviles y su tiempo. Por eso guarda cada respuesta junto con la hora en que la guardaste:

```js
{ "savedAt": 1790000000000, "data": { …la respuesta de la API… } }
```

La estrategia en `load()` se llama **primero caché, después red (cache first, then network)**:

1. Si hay una copia guardada, **muéstrala de inmediato**. Si tiene menos de 30 minutos, detente ahí.
2. Si no, pide a la red. Cuando llegue la respuesta, guárdala y muéstrala.
3. Si la red falla, pero tenías una copia guardada, **sigue mostrándola**, y di que no se pudo actualizar.

Di siempre de dónde vienen los datos y cuándo: "Guardado en este navegador a las 14:05". Los datos antiguos que dicen que son antiguos son útiles. Los datos antiguos que fingen ser nuevos no lo son.

### Paso 9: condiciones de carrera (TODO 12)

Elige Bogotá y después, rápido, Chengdú. Ahora viajan dos solicitudes. Si la respuesta de Bogotá es más lenta, llega al final y reemplaza la de Chengdú, y la página muestra el pronóstico de Bogotá mientras la lista de ciudades dice Chengdú. Esto es una **condición de carrera (race condition)**, y es uno de los errores más comunes en apps reales.

La solución: numera cada solicitud y, después de cada `await`, comprueba que sigues siendo la más reciente:

```js
const request = ++latestRequest;
const json = await fetchForecast(city);
if (request !== latestRequest) return;   // ya empezó una solicitud más nueva
```

Para ver el error, en el panel Network limita la velocidad a **Slow 4G** y cambia de ciudad rápido, antes y después de tu corrección.

### Paso 10: datos de prueba y trabajo sin conexión (TODO 13)

`data/sample-forecast.json` tiene **exactamente la misma forma** que la respuesta real. Por eso todo tu código (toDays, la tabla, las barras 3D) funciona con ella sin cambios. Los equipos usan **datos de prueba (mock data)** así para construir antes de que exista una API, para probar sin internet y para crear casos incómodos a propósito (una respuesta vacía, un 100 % de probabilidad de lluvia).

Cuando vuelve la conexión, el navegador dispara un evento `online`: escúchalo y actualiza.

### Paso 11: prueba con teclado y lector de pantalla

- Cambia de ciudad con el teclado. ¿Se anuncia el nuevo pronóstico?
- Ponte sin conexión y actualiza. ¿Se anuncia el error? ¿Puedes llegar a **Try again**?
- En una pantalla del ancho de un celular, ¿puedes desplazar la tabla horizontalmente con el teclado (es enfocable)?

## Explicación del código clave

**`json?.daily`** (encadenamiento opcional, optional chaining). Si `json` es `null` o `undefined`, el resultado es `undefined` en lugar de un error.

**`AbortSignal.timeout(ms)`** le da a `fetch` una señal que lo cancela después de `ms` milisegundos. El nombre del error rechazado es `"TimeoutError"`.

**`new Option(text, value)`** crea un elemento `<option>`: una forma breve de llenar un `<select>` con datos.

**`finally`** se ejecuta después de `try`, haya tenido éxito o haya fallado: el lugar correcto para quitar `aria-busy`.

**`new Date(\`${date}T12:00:00\`)`**. Una fecha sin hora, como `2026-09-28`, se interpreta como medianoche UTC, que en las Américas sigue siendo el día anterior. Agregar el mediodía local mantiene el día correcto en cualquier lugar.

## Momento 3D

Abre [`completed/3d-moment.html`](completed/3d-moment.html): el mismo pronóstico como siete barras 3D. La altura muestra la temperatura máxima (25 °C se convierte en 2.5 metros); el color va de arena (seco) a azul profundo (lluvia).

La página sigue una regla que usarás en cada visualización de datos en 3D: **un solo arreglo de datos, varias vistas de él**. El mismo arreglo `days` genera las barras, la descripción de la escena ("La barra más alta es el viernes, con 27 °C") y la tabla debajo de la escena. La tabla es la gemela en 2D: todo lo que muestran las barras, en una forma que cualquier persona pueda usar.

La cámara está fija (`look-controls` y `wasd-controls` desactivados) y nada se mueve, así que no hay nada que pausar. En el punto de partida, prueba cambiar la escala de altura, o agrega una segunda fila de barras para las mínimas.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| El pronóstico es una tabla de verdad, con un `caption` y celdas de encabezado | 1.3.1 | Los lectores de pantalla anuncian cada valor junto con su día y su columna. |
| La carga, los errores y las actualizaciones se anuncian | 4.1.3 | Los mensajes de estado llegan a quienes usan lector de pantalla. |
| Los errores dicen qué pasó y qué hacer | Buena práctica | "Puede que estés sin conexión" y **Try again**, no "Error". |
| El día más seco se marca con palabras, no solo con color | 1.4.1 | El color por sí solo no basta. |
| La tabla se desplaza dentro de su propia región en pantallas angostas | 1.4.10 | La página nunca se desplaza de lado. |
| La región desplazable se puede alcanzar con el teclado | 2.1.1 | Quienes usan teclado también pueden desplazarla. |
| Las barras 3D tienen una descripción en texto y una tabla gemela | 1.1.1 | La información nunca vive solo en la escena 3D. |

## Consideraciones de rendimiento

La caché es la ganancia más grande: volver a una ciudad que ya viste es instantáneo y no consume datos. La solicitud pide tres valores diarios, no todo lo que ofrece la API: respuestas más pequeñas, páginas más rápidas. Cuenta los bytes en el panel Network: el pronóstico completo pesa menos de 1 KB, menos que un solo ícono.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| No verificar `response.ok` | Una página 404 se interpreta como JSON y falla con un error confuso | Lanza tu propio error claro |
| Sin tiempo límite | "Loading…" para siempre en una conexión mala | `AbortSignal.timeout` |
| Construir solo el estado feliz | Una página en blanco cuando algo sale mal | Diseña carga, error, vacío y listo |
| Olvidar `await` | Obtienes un objeto `Promise` en lugar de datos | `await` dentro de una función `async` |
| Mostrar datos antiguos sin decirlo | Quien aprende confía en un pronóstico de ayer | Muestra siempre cuándo se guardó |
| Ignorar respuestas tardías | Aparece el pronóstico de la ciudad equivocada | Numera las solicitudes; ignora las antiguas |
| Poner una clave de API en el código de frontend | Cualquiera puede leerla y usarla mal | Usa APIs sin clave, o un servidor (Fase 5) |

## Solución de problemas

**`Failed to fetch` (Chrome), `NetworkError when attempting to fetch resource.` (Firefox), o `Load failed` (Safari).** Estás sin conexión, o el servicio está bloqueado en tu red. Prueba **Use sample data** (Usar datos de ejemplo).

**Blocked by CORS policy (Bloqueado por la política de CORS).** La API no permite solicitudes desde otros sitios web. Open-Meteo sí las permite; si cambias a otra API, revisa su documentación buscando "CORS". Si la página está en blanco y la consola dice que algo fue bloqueado por la política de CORS para `main.js`, abriste la página como archivo: usa tu servidor local en su lugar.

**Las fechas están corridas un día.** Creaste un `Date` a partir de `"2026-09-28"` sin hora. Consulta **Explicación del código clave**.

**`fetchJson is not defined`** en el momento 3D del punto de partida: termina los TODO 2 a 6.

**Nada cambia después de editar el archivo de ejemplo.** Estás viendo la caché. Bórrala en el panel **Application** (Firefox: **Storage**) bajo Local Storage, o presiona **Refresh** (Actualizar).

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: recuerda la ciudad de quien aprende y muestra "actualizado hace 5 minutos".
2. **[Creativo](challenges/challenge-2.es.md)**: un panel de datos públicos para tu propia comunidad.
3. **[Explorador](challenges/challenge-3.es.md)**: terremotos cerca de ti, de una segunda API, con los mismos cuatro estados.

## Cómo entregar tu trabajo

1. Completa todos los puntos de [`tests/checklist.md`](tests/checklist.md).
2. Toma capturas de pantalla de tres estados: listo, error (ponte sin conexión) y datos de ejemplo. Y una de las barras 3D.
3. Guárdalas en tu diario de aprendizaje y en tu portafolio. Compártelas con otras personas que programan: consulta [dónde compartir tu trabajo y pedir ayuda](../../docs/en/community.md) (en inglés).
4. En tu diario, responde: ¿qué fallo no esperabas, y cómo lo explica ahora tu app?

## Lecturas adicionales

- [MDN: Uso de la API Fetch](https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch)
- [MDN: función async](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN: URLSearchParams](https://developer.mozilla.org/es/docs/Web/API/URLSearchParams)
- [MDN: AbortSignal.timeout()](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static) (en inglés)
- [Open-Meteo: documentación de la API de pronóstico del clima](https://open-meteo.com/en/docs) (en inglés)

## Mujeres que conviene conocer

**Paola Villarreal** es una programadora y científica de datos mexicana, autodidacta, de la Ciudad de México. Fue directora de tecnología en el laboratorio de innovación de la ciudad, el Laboratorio para la Ciudad. Después, como becaria del programa Open Web Fellows de Mozilla y Ford con la ACLU de Massachusetts, produjo el análisis de datos para «Data for Justice», que respaldó la anulación de más de 21,000 condenas por drogas manchadas por un escándalo en un laboratorio estatal de análisis de drogas.

Los datos públicos cambian vidas cuando alguien los obtiene, los limpia y los muestra con claridad: los mismos pasos que este panel, a una escala mucho mayor. Ella aprendió por su cuenta, como muchas de ustedes están haciendo ahora.

> **Nota editorial — verificar antes de publicar.** Las afirmaciones biográficas de las secciones Mujeres que conviene conocer deben contrastarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

`fetch`, `Response` y `response.ok` están definidos por el **Fetch Standard** del WHATWG, que también define **CORS**: las reglas que deciden si una página de un sitio web puede leer una respuesta de otro. La sintaxis de JSON está estandarizada como **ECMA-404** y en el **RFC 8259** del IETF. `AbortSignal` viene del **DOM Standard** del WHATWG. Como son estándares abiertos, el mismo panel funciona en todos los navegadores modernos.

## Licencia

Código: [`LICENSE-CODE`](../../LICENSE-CODE) · Contenido: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
