# Ingeniería de rendimiento para Web3D

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `web3d-developer` · **Lección:** `performance-engineering-for-web3d-06` · **Tiempo:** unas 12 horas · 16 sesiones de 45 minutos · unas 4 semanas con 4 sesiones por semana

---

> Optimiza una aplicación 3D deliberadamente lenta para uso en móviles.

---

## Objetivos de aprendizaje

Al terminar este proyecto podrás:

1. Leer `renderer.info` y el panel Performance de Chrome para medir una escena de three.js en lugar de adivinar qué es lento.
2. Reemplazar muchas mallas repetidas con un solo `THREE.InstancedMesh`, y explicar cuándo el instanciado ayuda y cuándo no.
3. Fusionar muchas geometrías estáticas en una con `BufferGeometryUtils.mergeGeometries`, y explicar en qué se diferencia esto del instanciado.
4. Fijar un límite de tamaño de textura para las texturas generadas, y compartir una textura entre cada objeto que se vea igual.
5. Decidir qué objetos necesitan sombras, y desactivar las sombras en todo lo demás.
6. Usar `THREE.LOD` para reemplazar un objeto detallado por un sustituto barato una vez que está lejos de la cámara.
7. Construir y liberar parte de una escena bajo demanda ("carga perezosa"), según la distancia de la cámara.
8. Explicar, en lenguaje simple, para qué sirve la compresión de texturas KTX2/Basis Universal, incluso sin convertir un archivo tú misma.
9. Reemplazar un bucle de renderizado siempre activo por un bucle de renderizado bajo demanda, y medir la diferencia.

## Requisitos previos

- **Curso 3.4: Fundamentos de three.js**: el renderer, la cámara, los controles, y el patrón de bucle de renderizado sobre los que se construye esta lección.
- **Curso 3.5: Interacción, recursos y animación en three.js**: raycasting, carga, y animación; esta lección asume que te sientes cómoda leyendo una pequeña aplicación de three.js con varios archivos.

## Herramientas necesarias

| Herramienta | Propósito | Costo |
| --- | --- | --- |
| Un navegador con WebGL 2 (Chrome, Firefox, Edge; los navegadores basados en Chromium como 360 o QQ Browser funcionan en China continental) | Ejecutar y probar la sala | Gratis |
| Chrome DevTools (o Edge DevTools, que comparte el mismo panel Performance) | Medir el tiempo de cuadro y grabar un trazado de rendimiento | Gratis, integrado |
| Un editor de código (por ejemplo, VS Code) | Editar los archivos del starter | Gratis |
| Un servidor web local | Cargar la página por `http://`, necesario para los módulos ES | Gratis, ya en ejecución para este curso |
| Opcional: herramientas de línea de comandos de [KTX-Software](https://github.com/KhronosGroup/KTX-Software) (`basisu`) | Convertir una imagen en una textura KTX2/Basis Universal, si quieres probar el paso opcional de verdad | Gratis, funciona sin conexión |

## Lo que vas a construir

La exhibición ha crecido hasta convertirse en una sala completa: la misma olla de barro, el aro de canasta tejida, y la piedra de jade de lecciones anteriores, repetidos en ochenta pedestales, además de cuatro piezas más grandes de "vitrina" en los puntos cardinales y tres alas pequeñas más alejadas. El **starter** construye esta sala de la forma en que es fácil construirla y difícil convivir con ella: cientos de mallas separadas, una textura de tamaño completo generada para casi cada una, sombras en todo, cada ala cargada la visite alguien o no, y un bucle de renderizado que vuelve a dibujar toda la escena sesenta veces por segundo para siempre. Funciona, pero es mucho más pesada de lo necesario: el tipo de escena que se traba en un teléfono de gama media.

La **solución de referencia** en [`completed/`](completed/) es la misma sala, los mismos ochenta pedestales en los mismos lugares, reconstruida para que se dibuje en cerca de una docena de llamadas en lugar de cientos: pedestales y objetos instanciados, un piso fusionado, texturas compartidas y reducidas, sombras solo donde valen su costo, vitrinas con nivel de detalle, alas que se construyen solas al acercarte y se liberan solas al alejarte, y un bucle de renderizado que solo vuelve a dibujar cuando algo cambió. Nueve TODOs numerados en `js/hall.js`, `js/textures.js`, y `js/app.js` del starter marcan exactamente dónde va cada cambio; el recorrido de abajo los trabaja uno a la vez, siempre con un número del panel Stats para observar que cambia.

## Guía de carpetas

```text
06-performance-engineering-for-web3d/
├── README.md
├── starter/          # begin here — nine numbered TODOs
│   ├── index.html
│   ├── styles.css
│   └── js/
│       ├── app.js        # renderer, camera, controls, render loop (TODO 9)
│       ├── hall.js        # the hall's layout (TODOs 1-4, 6-8)
│       ├── textures.js    # procedural swatch textures (TODO 5)
│       ├── describe.js    # the scene description text
│       └── main.js        # wires the page's buttons to the app
├── completed/        # reference solution — the optimised hall
├── challenges/       # Three challenges: Foundation is required
├── tests/            # self-review checklist
├── assets/
└── screenshots/
```

## Configuración

1. Asegúrate de que el servidor local del curso esté en ejecución, luego abre `starter/index.html` a través de él (por ejemplo `http://127.0.0.1:8766/web3d-developer/06-performance-engineering-for-web3d/starter/index.html`), nunca haciendo doble clic en el archivo, ya que los módulos ES necesitan `http://`.
2. Abre `starter/js/hall.js`, `starter/js/textures.js`, y `starter/js/app.js` en tu editor. Encuentra los nueve comentarios `TODO` numerados; échales un vistazo antes de empezar.
3. Abre la consola de DevTools del navegador y el panel Performance (F12, y luego la pestaña "Performance"); usarás ambos durante toda la lección.
4. Mantén [`completed/`](completed/) abierto en una segunda pestaña para comparar una vez que hayas avanzado, pero intenta cada paso tú misma primero.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Abre la sala del starter. Camina por ella, lee los nueve TODOs en `hall.js`, `textures.js`, y `app.js`. | Una breve lista escrita de qué se siente lento, y en qué parte del código vive cada problema. |
| 2 | Abre el panel Performance, graba unos segundos arrastrando la cámara, y lee los números del panel Stats al cargar. | Tus propios números de referencia anotados: llamadas de dibujo, triángulos, geometrías, texturas, tiempo de cuadro. |
| 3 | Paso 1: agrega liberación real de memoria (TODO 1). | Hacer clic en "Reconstruir sala" ya no aumenta los conteos de Geometries y Textures. |
| 4 | Paso 2: instancia los pedestales (TODO 2). | La capa de pedestales se dibuja en una llamada en lugar de ochenta. |
| 5 | Paso 3: instancia los objetos (TODO 3). | Toda la cuadrícula principal se dibuja en cuatro llamadas en total. |
| 6 | Paso 4: fusiona el piso (TODO 4). | El piso es una sola malla, una llamada de dibujo, y sigue teniendo un patrón de mosaico. |
| 7 | Paso 5: reduce y comparte texturas (TODO 5). | El conteo de Textures baja de docenas a un puñado. |
| 8 | Paso 6: sombras solo donde importan (TODO 6). | El tiempo del paso de sombras en el panel Performance baja, y la sala se ve casi igual. |
| 9 | Paso 7: agrega nivel de detalle a las vitrinas (TODO 7). | Cada vitrina se simplifica visiblemente a un bloque plano desde lejos. |
| 10 | Paso 8: carga perezosa de las alas (TODO 8). | Un ala aparece cuando viajas hacia ella y desaparece cuando te alejas. |
| 11 | Paso 9: renderizado bajo demanda (TODO 9). | "Renders por segundo" cae a casi 0 en cuanto dejas de moverte y pausas la animación. |
| 12 | Lee la sección de KTX2/Basis Universal en `textures.js` y "Explicación del código clave" abajo. Ningún archivo que convertir esta sesión, solo entender qué problema resuelve. | Una respuesta de una oración, en tus propias palabras, a "¿cuándo usaría esto?" |
| 13 | Vuelve a medir todo: panel Stats y una nueva grabación del panel Performance. Completa tu propia tabla de antes/después (consulta "Consideraciones de rendimiento"). | Una tabla de medición completa, en tus propias palabras, indicando tus números como "en mi máquina". |
| 14 | Revisión de accesibilidad: descripción de la escena, ruta por teclado a través de cada botón de viaje, movimiento reducido, la lista 2D. Repasa `tests/checklist.md`. | La mayor parte de la lista marcada. |
| 15 | El reto Fundamento. | `challenges/challenge-1.es.md` terminado. |
| 16 | Pulido, capturas de pantalla, y **Cómo entregar tu trabajo**. | Tu proyecto terminado, capturas, y entrada de diario, listos para compartir. |

### Paso 1: liberación real de memoria (TODO 1)

El botón "Reconstruir sala" del starter descarta el `Group` de la sala anterior y construye uno nuevo, pero la geometría y el material de una `Mesh` viven en buffers de la GPU que el recolector de basura de tu JavaScript no puede ver. Quitar un objeto de la escena no los libera; solo llamar a `.dispose()` lo hace.

```js
function disposeHall(group) {
  group.traverse((object) => {
    if (object.geometry) object.geometry.dispose();
    if (object.material) object.material.dispose();
  });
}
```

Llama a esto antes de construir la sala de reemplazo. Haz clic en "Reconstruir sala" varias veces: los conteos de Geometries y Textures en el panel Stats ahora deberían volver a los mismos números cada vez, en lugar de subir.

### Pasos 2 y 3: instancia los pedestales y los objetos (TODOs 2 y 3)

Cada pedestal del starter es su propia `Mesh`, con su propia geometría y material, aunque cada pedestal es idéntico salvo por dónde está parado. `THREE.InstancedMesh` dibuja muchas copias de una geometría y un material en una sola llamada de dibujo, usando una pequeña transformación (posición, rotación, escala) por copia en lugar de un objeto completo separado:

```js
const pedestals = new THREE.InstancedMesh(pedestalGeometry, pedestalMaterial, count);
const dummy = new THREE.Object3D();
positions.forEach(({ x, z }, i) => {
  dummy.position.set(x, PEDESTAL_HEIGHT / 2, z);
  dummy.updateMatrix();
  pedestals.setMatrixAt(i, dummy.matrix);
});
pedestals.instanceMatrix.needsUpdate = true; // fácil de olvidar, y nada se dibuja sin esto
```

Haz lo mismo con los objetos, pero necesitas tres objetos `InstancedMesh` separados, no uno: las ollas de barro, los aros de canasta, y las piedras de jade son tres geometrías distintas, y un `InstancedMesh` solo puede contener copias de una sola geometría y un solo material.

### Paso 4: fusiona el piso (TODO 4)

Los mosaicos del piso nunca se mueven de forma independiente una vez colocados, así que no necesitan las transformaciones por copia del instanciado: una sola geometría fusionada es el ajuste más simple y barato. `BufferGeometryUtils.mergeGeometries` (de `three/addons/utils/BufferGeometryUtils.js`) combina muchas geometrías, cada una ya colocada donde le corresponde, en una sola:

```js
const tileGeometries = positions.map(({ x, z }) => {
  const tile = new THREE.PlaneGeometry(SPACING * 0.95, SPACING * 0.95);
  tile.rotateX(-Math.PI / 2);
  tile.translate(x, 0, z); // fija la posición antes de fusionar
  return tile;
});
const floorGeometry = mergeGeometries(tileGeometries);
for (const tile of tileGeometries) tile.dispose(); // las originales ya no se necesitan una vez fusionadas
```

### Paso 5: reduce y comparte texturas (TODO 5)

En `textures.js` se esconden dos problemas separados: el canvas generado es más grande de lo que necesita una muestra de color plano, y cada malla genera su propia copia aunque el color sea idéntico a uno ya hecho. Corrige primero el compartir (guarda las texturas en caché por color y etiqueta), luego reduce el tamaño:

```js
const cache = new Map();
export function getSwatchTexture(color, label) {
  const key = `${color}:${label}`;
  if (cache.has(key)) return cache.get(key);
  // ...construye el canvas como antes, a un tamaño menor...
  cache.set(key, texture);
  return texture;
}
```

Compartir una textura por tipo de objeto también es lo que hace posible el instanciado: cada instancia en un lote de `InstancedMesh` debe usar el mismo material, y por lo tanto la misma textura.

### Paso 6: sombras solo donde importan (TODO 6)

Un mapa de sombras es un segundo renderizado de la escena desde el punto de vista de la luz, rehecho en cada cuadro. Ochenta pedestales casi idénticos con una luz uniforme aportan casi nada a lo que revela una sombra, a un costo real en cada cuadro. Desactiva `castShadow` en los pedestales y objetos de la cuadrícula principal (`receiveShadow` puede quedarse activo, así el piso sigue mostrando una sombra que cae sobre él), y mantén `castShadow` solo en el piso y en las cuatro vitrinas principales.

### Paso 7: nivel de detalle para las vitrinas (TODO 7)

`THREE.LOD` guarda varias versiones de un objeto y muestra solo la que corresponde a la distancia actual de la cámara; las demás simplemente no se dibujan, sin costo adicional de llamadas de dibujo:

```js
const lod = new THREE.LOD();
lod.addLevel(detailedMesh, 0);       // se usa desde 0 unidades de distancia
lod.addLevel(simpleStandIn, 9);      // se usa desde 9 unidades de distancia en adelante
scene.add(lod);
// una vez por cuadro, con la cámara:
lod.update(camera);
```

Dale a cada vitrina una malla detallada (su geometría habitual) y un sustituto barato (una versión con menos segmentos de la misma forma, o una caja simple) que comparta el mismo material.

### Paso 8: carga perezosa de las alas (TODO 8)

Las tres alas se construyen una vez, al inicio, camine alguien hacia ellas o no. En su lugar, revisa la distancia de la cámara al centro de cada ala de vez en cuando (unas pocas veces por segundo es suficiente, una cámara no puede cruzar todo el radio de activación de un ala en un solo cuadro) y construye o libera el grupo de esa ala al cruzar dos umbrales:

```js
function update(cameraPosition) {
  for (const wing of wings) {
    const distance = Math.hypot(cameraPosition.x - wing.x, cameraPosition.z - wing.z);
    if (!wing.group && distance < ACTIVATE_RADIUS) wing.group = buildWing(wing); // y agrégalo con scene.add
    else if (wing.group && distance > DEACTIVATE_RADIUS) { disposeWing(wing.group); /* y quítalo con scene.remove */ }
  }
}
```

Usa dos umbrales distintos (uno más pequeño para activar, uno más grande para desactivar), no uno solo. Un único umbral compartido significa que una cámara parada justo en el límite construye y libera la misma ala en cada revisión; este margen ("histéresis") lo evita.

### Paso 9: renderizado bajo demanda (TODO 9)

El bucle de renderizado del starter llama a `renderer.render()` en cada cuadro, para siempre, incluso cuando nada cambió. Mantén una bandera, actívala cada vez que algo realmente cambia (un arrastre de cámara dispara el evento `change` de OrbitControls; un redimensionamiento; un cuadro en el que algo se anima), y renderiza solo cuando está activa:

```js
let needsRender = true;
controls.addEventListener('change', () => { needsRender = true; });

function tick() {
  controls.update();
  // ...actualiza cualquier cosa que se anime, y fija needsRender = true si se movió...
  if (needsRender) {
    renderer.render(scene, camera);
    needsRender = false;
  }
}
renderer.setAnimationLoop(tick); // sigue ejecutándose en cada cuadro (necesario para WebXR), pero ahora la mayoría de los cuadros omiten render()
```

Deja de mover la cámara y pausa la animación: "Renders por segundo" debería caer a casi 0, porque ya no queda nada que volver a dibujar.

## Explicación del código clave

- **`THREE.InstancedMesh`** dibuja muchas copias de una geometría y un material en una sola llamada de dibujo, usando una matriz de transformación por copia. Es la herramienta correcta una vez que tienes docenas de objetos idénticos; por debajo de eso, la contabilidad suele costar más de lo que ahorra.
- **`BufferGeometryUtils.mergeGeometries`** combina varias geometrías ya posicionadas en una sola, para objetos que nunca necesitan una transformación independiente una vez colocados; un piso es el caso clásico. A diferencia del instanciado, una malla fusionada no puede mover un mosaico sin reconstruir todo.
- **`THREE.LOD`** guarda varias versiones de un objeto y muestra solo la que corresponde a la distancia actual de la cámara. `lod.update(camera)` debe ejecutarse en cada cuadro; los niveles que no estás mostrando no cuestan nada al dibujar, pero siguen existiendo en memoria.
- **`renderer.info`** informa qué dibujó realmente la última llamada a `render()`: `render.calls` (llamadas de dibujo), `render.triangles`, y `memory.geometries` / `memory.textures` (recursos actualmente cargados en la GPU). Es la diferencia entre medir y adivinar.
- **`.dispose()`** libera los buffers del lado de la GPU de una geometría, material, o textura. El recolector de basura de JavaScript no puede ver la memoria de la GPU, así que quitar un objeto del grafo de escena nunca es suficiente por sí solo: llama a `.dispose()` en todo lo que ya no uses.
- **El renderizado bajo demanda** (una bandera de `invalidate()`, activada en cualquier cambio real, revisada antes de cada llamada a `renderer.render()`) convierte "vuelve a dibujar sesenta veces por segundo, siempre" en "vuelve a dibujar solo cuando algo cambió", a menudo el ahorro individual más grande en una escena que se queda quieta la mayor parte del tiempo.

## Accesibilidad en 3D y XR

Esta lección es 3D de principio a fin, así que no hay un calentamiento 2D separado: cada optimización de arriba debe mantener la sala exactamente tan usable como era antes.

- **Descripción de la escena.** `#scene-description` se construye a partir de los mismos conteos (pedestales, vitrinas, alas, si la animación se está reproduciendo) con los que se construye la sala misma, tanto en el starter como en la solución de referencia, así que nunca puede desincronizarse de lo que hay en pantalla.
- **Ruta por teclado.** Cada botón de viaje "Ir a...", "Girar a la izquierda"/"Girar a la derecha", "Restablecer vista", "Pausar animación", y "Reconstruir" son elementos `<button>` normales, alcanzables y operables solo con el teclado. Arrastrar la vista se refleja con las flechas una vez que el canvas tiene el foco (a través de `controls.listenToKeyEvents`).
- **Movimiento reducido.** `prefers-reduced-motion: reduce` inicia el giro de las vitrinas en pausa, y los botones "Ir a..." saltan la cámara al instante en lugar de animar la transición: un clic es una solicitud, pero un desplazamiento suave sigue siendo movimiento que algunas estudiantes pidieron evitar.
- **Alternativa 2D.** La lista "Todo en la sala" siempre está presente, no solo cuando falla WebGL: nombra la cuadrícula principal, las cuatro vitrinas, y las tres alas, la misma información que lleva la vista 3D.
- **Comodidad.** La cámara nunca se mueve a menos que tú la muevas o hagas clic en un botón de viaje; los límites de distancia y ángulo polar de `OrbitControls` evitan que suba por encima de la sala o baje por debajo del piso.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| La sala tiene una descripción en texto que nombra todo lo que contiene | 1.1.1 | Alguien que usa lector de pantalla, o cualquiera que no pueda ver el canvas, igual necesita saber qué hay ahí. |
| Cada interacción 3D (mirar, viajar, pausar, reconstruir) tiene una ruta por teclado | 2.1.1 | Arrastrar un canvas es un gesto exclusivo de puntero a menos que exista una alternativa de teclado. |
| Girar y la animación se detienen con `prefers-reduced-motion` | 2.2.2 | El movimiento autoiniciado debe poder pausarse; esta lección lo inicia directamente en pausa para quien lo pidió. |
| El foco es visible en cada botón y en el canvas con foco | 2.4.7 | Para que quienes usan teclado siempre sepan dónde están. |
| Las listas con estilo `list-style: none` conservan `role="list"` | Buena práctica | Safari elimina la semántica de lista al quitar el estilo de viñeta. |
| La cámara nunca se mueve sin que quien aprende lo pida | Buena práctica | El movimiento de cámara no solicitado desorienta, y puede provocar mareo por movimiento en algunas personas. |

## Consideraciones de rendimiento

- **Mide antes de optimizar.** El propio campo de Nancy Hitschfeld Kahler es la geometría computacional y la computación en GPU: su trabajo es un recordatorio de que "esto se siente lento" es una pregunta inicial, no una respuesta. Usa `renderer.info` para llamadas de dibujo, triángulos, y memoria, y el panel Performance de Chrome (graba unos segundos de interacción, luego lee el tiempo de cuadro de la pista "Main") para saber a dónde van realmente los milisegundos.
- **Una regla general para el instanciado.** Por debajo de unas pocas docenas de objetos idénticos, las instancias `Mesh` normales suelen ser más simples y suficientemente rápidas; una vez que estás en las decenas o centenas, `InstancedMesh` casi siempre gana. La cuadrícula principal de ochenta pedestales de esta sala es un caso claro; sus cuatro vitrinas principales no lo son, por eso se quedan como mallas normales envueltas en `THREE.LOD` en su lugar.
- **Una regla general para el tamaño de textura.** Una muestra de color plano, vista desde unos metros, rara vez necesita más de 256px de lado; reserva más resolución para texturas con detalle fino al que alguien realmente se acercará.
- **Indica tus números como "en mi máquina".** El tiempo de cuadro depende del dispositivo que lo ejecuta. Anota lo que realmente mediste, con el navegador y la fecha aproximada, en lugar de un número que esperas que sea cierto en todas partes.

**Antes/después, medido en una MacBook, Chrome, sin interfaz (renderer por software vía SwiftShader), septiembre de 2026:**

| Medición | Starter (al cargar) | Completado (al cargar) |
| --- | --- | --- |
| Llamadas de dibujo (`renderer.info.render.calls`) | 397 | 12 |
| Triángulos (`renderer.info.render.triangles`) | 91,964 | 46,308 |
| Geometrías en memoria (`renderer.info.memory.geometries`) | 269 | 11 |
| Texturas en memoria (`renderer.info.memory.textures`) | 66 | 7 |
| Renders por segundo, cámara quieta, animación en pausa | unos 60 | cae a casi 0 |

Una GPU real mostrará números absolutos distintos a los de Chrome renderizado por software, y los números de tu propia máquina diferirán de estos: ese es justamente el punto de medir los tuyos, no de copiar esta tabla.

## Errores comunes

| Error | Qué pasa | En vez de eso |
| --- | --- | --- |
| Fijar la matriz de una instancia pero olvidar `instanceMatrix.needsUpdate = true` | Nada se mueve a su posición asignada; cada instancia se dibuja en el origen | Fija la bandera una vez, después de la última llamada a `setMatrixAt` |
| Liberar una textura compartida y en caché dentro de la limpieza de un solo material | Cualquier otro objeto que todavía use esa textura queda en blanco | Libera materiales y geometrías por objeto; libera una textura compartida solo cuando ya nada la referencia |
| Asumir que `InstancedMesh` recorta cada instancia contra el frustum de la cámara | Todo el lote se dibuja (o se omite) como un solo volumen delimitador, aunque solo una instancia sea visible | Mantén los lotes espacialmente juntos, o divide un lote muy disperso en varios más pequeños |
| Revisar la distancia de un ala en cada cuadro | Desperdicia CPU sin ningún beneficio; una cámara no puede cruzar el radio de activación de un ala en un solo cuadro | Revísalo unas pocas veces por segundo en su lugar |
| Reconstruir una escena sin liberar la anterior primero | `renderer.info.memory` sube un poco más en cada reconstrucción | Libera siempre antes de descartar una referencia |

## Solución de problemas

**El panel Stats muestra los mismos números en el starter y en la versión completada.** Probablemente estás comparando contra una copia en caché de una de las dos páginas; fuerza la recarga (Shift+Reload) en ambas pestañas.

**`mergeGeometries` lanza un error sobre atributos que no coinciden.** Cada geometría que pasas necesita los mismos atributos de vértice (position, normal, uv). Un `PlaneGeometry` construido con argumentos distintos en el constructor sigue coincidiendo; una geometría sin normales o UVs no lo hará.

**La vitrina nunca cambia a su sustituto de baja definición.** Revisa que `lod.update(camera)` realmente se ejecute en cada cuadro, y que las distancias que pasaste a `addLevel` estén en las mismas unidades que tu escena (las unidades de esta sala son metros).

**Un ala se carga y descarga rápidamente mientras estoy parada cerca de su borde.** Tus radios de activación y desactivación están demasiado cerca, o son iguales. Amplía la brecha entre ellos.

**Firefox o Safari muestra una velocidad de cuadros mucho más baja que Chrome para la misma escena.** Abre `about:support` de Firefox o "Timelines" del Web Inspector de Safari (no "Performance", que es el nombre de Chrome para el mismo panel) para revisar si la aceleración por hardware está disponible en ese navegador en tu máquina; el renderizado por software es más lento en todas partes, no solo en esta lección.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: agrega una cuarta ala a la sala, con carga perezosa como las otras tres.
2. **[Creativo](challenges/challenge-2.es.md)**: cambia la apariencia de la sala para tu propia cultura o comunidad.
3. **[Explorador](challenges/challenge-3.es.md)**: mide una conversión KTX2 real, o profundiza más en la decisión entre fusionar e instanciar.

## Cómo entregar tu trabajo

1. Repasa [`tests/checklist.md`](tests/checklist.md) y corrige lo que quede sin marcar.
2. Toma dos capturas: la sala del starter (mostrando los números de su panel Stats) y la sala completada (mostrando los números de su panel Stats) desde el mismo ángulo de cámara.
3. Guárdalas en tu diario de aprendizaje y tu portafolio. Cuando abra la comunidad de XR Camp, compártelas ahí.
4. Pregunta de diario: ¿qué cambio individual marcó la mayor diferencia en tu máquina, y el panel Performance de Chrome confirmó lo que esperabas, o te sorprendió?

## Lecturas adicionales

- [three.js manual: How to update things](https://threejs.org/manual/#en/how-to-update-things) (en inglés) — la explicación canónica de `InstancedMesh`, la liberación de memoria, y el renderizado bajo demanda.
- [MDN: `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) (en inglés)
- [Khronos Group: KTX File Format](https://www.khronos.org/ktx/) (en inglés) — el contenedor de texturas al que apunta el paso opcional de esta lección.
- [Chrome DevTools: Analyze runtime performance](https://developer.chrome.com/docs/devtools/performance/) (en inglés)
- [three.js documentation: `THREE.LOD`](https://threejs.org/docs/#api/en/objects/LOD) (en inglés)

## Mujeres que conviene conocer

Nancy Hitschfeld Kahler es profesora de ciencias de la computación en la Universidad de Chile, donde su investigación abarca la generación de mallas poligonales, la geometría computacional, y la computación en GPU: exactamente el terreno del que toma prestado esta lección cada vez que cuenta triángulos o decide qué pertenece a la GPU. Fue la primera mujer contratada como académica en el Departamento de Ciencias de la Computación (DCC) de la universidad, al que después llegó a dirigir.

Más allá de su propia investigación, Hitschfeld Kahler cofundó la Red Adelina Gutiérrez, una red que trabaja por la equidad de género en su campo. Una lección de rendimiento es un lugar apropiado para nombrarla: las preguntas que plantea su trabajo (cómo se construye una malla, y cómo se le pide a una GPU que haga menos trabajo para el mismo resultado) son las mismas preguntas que esta lección ha estado haciendo sobre una sala llena de pedestales.

> **Nota editorial: verificar antes de publicar.** Los datos biográficos de las secciones «Mujeres que conviene conocer» deben verificarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

El Khronos Group, el consorcio de la industria detrás del propio WebGL, también estandariza el formato de archivo KTX y dirige el compresor de texturas de código abierto Basis Universal al que apunta el paso opcional de esta lección: el mismo organismo que define la API con la que se dibuja una escena también define el formato en el que pueden viajar sus texturas. Por separado, la especificación Media Queries del W3C define `prefers-reduced-motion`, la función de CSS y JavaScript que esta sala (y cada lección 3D de este curso) revisa antes de activar nada por sí misma.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
