# A-Frame avanzado e interacción

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `web3d-developer` · **Lección:** `advanced-a-frame-and-interaction-03` · **Tiempo:** unas 14 horas · 19 sesiones de 45 minutos · unas 5 semanas con 4 sesiones por semana

---

> Construye un museo virtual interactivo, una exhibición cultural o una experiencia de aprendizaje.

---

## Objetivos de aprendizaje

Al terminar este proyecto podrás:

1. Escribir un **componente de A-Frame** personalizado, con su propio `schema`, y los métodos de ciclo de vida `init()`, `update()`, `tick()` y `remove()`.
2. Comunicarte entre un componente y el resto de la página con **`el.emit()`** y **`el.addEventListener()`**, incluidos eventos personalizados que burbujean.
3. Configurar el componente **`cursor`** para entrada de mouse y de toque (`rayOrigin: mouse`), y explicar cuándo un **cursor de mirada/fusión (gaze/fuse)** es la mejor opción, y su costo de accesibilidad.
4. Configurar un **`raycaster`** para que solo pruebe un conjunto elegido de entidades, con `objects: .interactive`.
5. Agregar **`laser-controls`** para que un control de VR pueda seleccionar las mismas exhibiciones, sin código adicional, y probarlo con el Immersive Web Emulator.
6. Activar el componente **`animation`** desde un evento, para que una exhibición gire o se levante solo cuando se selecciona, nunca por sí sola.
7. Construir un **panel de información** en HTML que se mantenga sincronizado con la escena 3D, usando una sola función compartida para cada método de entrada.
8. Agregar **audio posicional** con el componente `sound` (`positional: true`), iniciado solo por un botón, nunca automáticamente.
9. Explicar las reglas de **comodidad** que sigue esta lección: sin movimiento forzado de cámara, y transiciones instantáneas con movimiento reducido.

## Requisitos previos

- **Fundamentos de A-Frame (3.2)**: el sistema de entidades y componentes, las primitivas, `<a-assets>`, los componentes `sound` y `text`, y tu `completed/` funcional, que esta lección continúa directamente.
- **Mi XR Camp**, la pequeña aplicación propia de la Fase 2 (mapa del curso, panel principal, planificador de sesiones): aquí continúa el mismo patrón de construir una sola cosa a lo largo de varias lecciones, con la exhibición virtual.

## Herramientas necesarias

| Herramienta | Propósito | Costo |
| --- | --- | --- |
| Un navegador moderno con WebGL | La sala, y sus controles 2D | Gratis |
| VS Code y un servidor local | Los recursos de A-Frame necesitan `http://`, no `file://` | Gratis |
| Extensión de navegador [Immersive Web Emulator](https://chromewebstore.google.com/detail/immersive-web-emulator/cgffilbpcibhmcfbgggfhfolhkfbhmik) | Probar `laser-controls` y el modo VR sin tener un visor | Gratis |

## Lo que vas a construir

La primera sala de tu exhibición (3.2) gana un segundo punto y, más importante, una razón para hacer clic en algo dentro de ella. Escribirás un componente de A-Frame personalizado, `interactive-exhibit`, y lo conectarás a cada punto de la exhibición; escribirás una función compartida, `selectExhibit()`, que un clic de mouse, un toque con el dedo, el gatillo de un control de VR, y un botón de teclado llaman por igual; y construirás un panel de información que reacciona a cualquiera de ellos que se dispare.

La solución de referencia está en [`completed/`](completed/). `starter/main.js` tiene 18 TODOs numerados; tres de ellos (TODOs 4, 10 y 15) son pequeños cambios de HTML en `starter/index.html`, marcados ahí con comentarios equivalentes.

## Guía de carpetas

```text
03-advanced-a-frame-and-interaction/
├── README.md
├── starter/        # begin here
├── completed/      # reference solution
├── challenges/          # Three challenges: Foundation is required
├── tests/          # self-review checklist
├── assets/
└── screenshots/
```

## Configuración

1. Abre esta carpeta en VS Code.
2. Inicia un servidor local en la raíz del repositorio (por ejemplo, la extensión Live Server, o `python3 -m http.server 8766`), ya que tanto `<a-assets>` de A-Frame como los módulos ES necesitan `http://`.
3. Abre `starter/index.html` a través de ese servidor. Deberías ver la sala de 3.2, con los botones "Seleccionar", la animación en reposo, y los controles de modo de entrada ya visibles, pero sin hacer nada todavía.
4. Mantén `completed/index.html` abierto en una segunda pestaña como referencia funcional, y la consola del navegador abierta para detectar errores a tiempo.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; Paso 1: de la sala de 3.2 a la sala de esta lección (concepto) | Puedes señalar qué es nuevo en el HTML de esta lección |
| 2 | Paso 2: tu primer componente personalizado: el schema (TODO 2) | Un componente `interactive-exhibit` que acepta atributos |
| 3 | Paso 3: `init()`, y eventos con `el.addEventListener` (TODO 3) | Pasar el cursor sobre una exhibición la resalta |
| 4 | Paso 4: los componentes `cursor` y `raycaster` (TODO 4) | Hacer clic en una exhibición dispara el `onClick` del componente |
| 5 | Paso 5: `update()`, y reaccionar a una propiedad que cambió (TODO 5) | Seleccionar una exhibición alterna su estado `selected` |
| 6 | Paso 6: una función para cada tipo de entrada: `selectExhibit()` (TODO 6) | Una única ruta de código compartida para "elegir esta exhibición" |
| 7 | Paso 6, continuación: la ruta por teclado (TODO 7) | Cada exhibición alcanzable con un botón real, con etiqueta |
| 8 | Paso 7: eventos con `el.emit`, y el listener a nivel de escena (TODO 8) | El panel de información empieza a reaccionar a una selección |
| 9 | Paso 8: el componente `animation`, activado por un evento (TODO 9) | El pedestal gira cuando se selecciona |
| 10 | Paso 8, continuación: una segunda exhibición y una segunda acción (TODOs 10–11) | Un farol de historias que se levanta cuando se selecciona |
| 11 | Paso 9: comodidad y movimiento reducido (concepto, revisado dentro del TODO 9) | Puedes explicar por qué el movimiento reducido omite por completo el componente `animation` |
| 12 | Paso 10: el panel de información y la región de estado (TODO 12) | `#scene-description` y `#status` se actualizan al seleccionar |
| 13 | Paso 11: audio posicional con `sound` (TODO 13) | Una campanilla que suena desde la posición de la campana, solo si se pide |
| 14 | Paso 12: el cursor de mirada/fusión, y su compensación (TODO 14) | Un interruptor de modo de entrada funcional, y una frase que explica su costo |
| 15 | Paso 13: `laser-controls` para VR (TODO 15) | Probado con el Immersive Web Emulator |
| 16 | Paso 14: `tick()`, un método de ciclo de vida autoejecutado (TODO 16) | Un sutil pulso en reposo sobre la exhibición seleccionada |
| 17 | Paso 15: `remove()`, y limpiar después de ti misma (TODO 17) | Quitar el componente de una exhibición no deja nada ejecutándose |
| 18 | Paso 16: el botón de Pausa (TODO 18) | Una forma funcional y accesible de detener el pulso en reposo a mano |
| 19 | [`tests/checklist.md`](tests/checklist.md); el reto Fundamento; **Cómo entregar tu trabajo** | Una exhibición interactiva, terminada |

### Paso 1: de la sala de 3.2 a la sala de esta lección

Abre `starter/index.html` junto a tu propio `completed/index.html` de 3.2. El cielo, las luces, el piso, el pedestal con el patrón tejido, y el panel de bienvenida en inglés no cambian. Lo nuevo: una campana, construida a partir del marcador de sonido de 3.2, un lugar para una segunda exhibición, un panel de información, y controles para el modo de entrada y la animación en reposo. Nada de esto hace algo todavía: eso es exactamente lo que agrega esta lección.

### Paso 2: tu primer componente personalizado: el schema (TODO 2)

```js
AFRAME.registerComponent('interactive-exhibit', {
  schema: {
    exhibitId: { type: 'string' },
    action: { type: 'string', default: 'turn', oneOf: ['turn', 'lift', 'none'] },
    selected: { type: 'boolean', default: false },
  },
  // ...
});
```

`AFRAME.registerComponent(name, definition)` le enseña a A-Frame un nuevo atributo: después de esta llamada, cualquier entidad puede escribir `interactive-exhibit="exhibitId: woven-panel; action: turn"`, y A-Frame convierte esa cadena en `this.data` dentro del componente, usando los tipos y valores predeterminados que declara el `schema`. Es el mismo mecanismo que usan los componentes integrados `sound` y `light`; estás escribiendo uno del mismo tipo, no algo separado de ellos.

### Paso 3: `init()`, y eventos con `el.addEventListener` (TODO 3)

```js
init() {
  this.onClick = this.onClick.bind(this);
  this.el.addEventListener('click', this.onClick);
},
onClick() {
  selectExhibit(this.data.exhibitId);
},
```

`init()` se ejecuta exactamente una vez, cuando el componente se conecta por primera vez a una entidad: es donde configuras cosas que deben existir durante toda la vida de la entidad, como los escuchas de eventos. `this.el` es la entidad a la que está conectado el componente, un elemento del DOM real con `addEventListener` como cualquier otro. `'click'` aquí no es un evento exclusivo de mouse: el siguiente paso explica de dónde viene en realidad.

### Paso 4: los componentes `cursor` y `raycaster` (TODO 4)

```html
<a-camera id="camera" cursor="rayOrigin: mouse; fuse: false"
          raycaster="objects: .interactive; far: 20"></a-camera>
```

`raycaster` lanza una línea invisible desde la cámara e informa qué entidades cruza; `objects: .interactive` le indica que solo pruebe las entidades que llevan esa clase CSS, así que el cielo, el piso y los paneles de texto nunca son candidatos, lo que además mantiene el raycast económico. `cursor`, conectado a la misma entidad, convierte esos impactos del raycaster en eventos familiares de estilo DOM: `mouseenter`, `mouseleave`, y `click`, sobre la entidad intersectada. `rayOrigin: mouse` significa que el rayo sigue al puntero del mouse (o a un dedo, en pantalla táctil); `fuse: false` significa que seleccionar requiere un clic o toque explícito, no una espera cronometrada. Por eso el escucha de `'click'` del TODO 3 funciona tanto para un mouse como para una pantalla táctil sin código adicional: `cursor` ya los unificó.

### Paso 5: `update()`, y reaccionar a una propiedad que cambió (TODO 5)

```js
update(oldData) {
  if (this.data.selected === oldData.selected) return;
  this.el.classList.toggle('is-selected', this.data.selected);
  if (this.data.selected) {
    this.el.emit('exhibit-selected', { id: this.data.exhibitId }, true);
    this.playAction();
  }
},
```

`update(oldData)` se ejecuta una vez justo después de `init()`, y de nuevo cada vez que cambia cualquier propiedad del schema, sin importar si ese cambio vino de un clic, un botón de teclado, o las herramientas de desarrollo del navegador. `oldData` es el `this.data` anterior, así que comparar ambos te dice exactamente qué cambió, en lugar de volver a ejecutar cada efecto en cada llamada. Verificar `this.data.selected === oldData.selected` hace que el giro o el levantamiento solo se reproduzcan en el cuadro en que la exhibición realmente se selecciona, no cada vez que `update()` se ejecuta por una razón no relacionada.

### Paso 6: una función para cada tipo de entrada: `selectExhibit()` (TODO 6)

```js
function selectExhibit(id) {
  for (const item of exhibitData) {
    const el = document.querySelector(`#${item.id}`);
    if (el) el.setAttribute('interactive-exhibit', 'selected', item.id === id);
  }
}
```

Esta es toda la idea de la lección, en cinco líneas. `setAttribute('interactive-exhibit', 'selected', true)` fija una sola propiedad de un componente ya conectado sin tocar las demás (`exhibitId` y `action` siguen siendo lo que eran), y es lo que realmente dispara el `update()` del TODO 5. No importa si `selectExhibit()` se llama desde un clic del raycaster, el gatillo de un control de VR, o una tecla del teclado: ejecuta exactamente el mismo código; no son dos implementaciones que coinciden por casualidad, sino una sola implementación con varias puertas de entrada.

### Paso 6, continuación: la ruta por teclado (TODO 7)

```js
button.addEventListener('click', () => selectExhibit(item.id));
```

El botón "Seleccionar" de cada exhibición llama a `selectExhibit()` directamente. Esto es lo que significa, en concreto, que "cada interacción 3D también funciona desde el panel 2D con el teclado, la misma ruta de código de `select-exhibit`": no es una segunda función que produce un resultado parecido, es la misma función, llamada desde un `<button>` en lugar de un evento del cursor.

### Paso 7: eventos con `el.emit`, y el listener a nivel de escena (TODO 8)

```js
this.el.emit('exhibit-selected', { id: this.data.exhibitId }, true);
```

```js
scene.addEventListener('exhibit-selected', (evt) => {
  const item = exhibitData.find((entry) => entry.id === evt.detail.id);
  if (item) updateInfoPanel(item);
});
```

`el.emit(name, detail, bubbles)` dispara un evento personalizado del DOM sobre esa entidad, llevando `detail` como su contenido. El tercer argumento, `true`, hace que burbujee: el evento viaja hacia arriba por el árbol de entidades hasta `<a-scene>`, exactamente igual que un clic en un `<span>` anidado burbujea hasta `document`. Como burbujea, `main.js` solo necesita un escucha, en la escena, para enterarse de "se seleccionó alguna exhibición" desde cualquiera de ellas, en vez de un escucha por exhibición.

### Paso 8: el componente `animation`, activado por un evento (TODOs 9, 11)

```js
this.el.setAttribute('animation__turn', {
  property: 'rotation',
  to: `${x} ${y + 180} ${z}`,
  dur: 700,
  easing: 'easeOutQuad',
});
```

El componente `animation` de A-Frame interpola una propiedad desde su valor actual hasta `to` a lo largo de `dur` milisegundos. Fijarlo desde JavaScript, dentro de `playAction()`, justo cuando una exhibición se selecciona, es lo que significa aquí "activado por eventos": la animación no se declara una vez para repetirse por siempre, se crea en reacción a `exhibit-selected`, se reproduce una vez, y termina. `animation__turn` y `animation__lift` (uno segundo, para el farol de historias) son dos instancias con nombre independiente del mismo componente en la misma entidad, por eso ambos pueden existir sin entrar en conflicto.

**Comodidad y movimiento reducido:** cuando `window.__reducedMotion` es `true`, `playAction()` omite por completo el componente `animation` y escribe la rotación o posición final directamente en `this.el.object3D` en un solo cuadro. No hay nada decorativo en este giro o levantamiento: existe para confirmar una selección, y el movimiento reducido obtiene esa confirmación sin el movimiento en sí.

### Paso 9: el panel de información y la región de estado (TODO 12)

```html
<p id="scene-description">…</p>
<p id="status" role="status"></p>
```

`updateInfoPanel(item)` escribe en ambos. `#scene-description` es la descripción siempre presente y legible de lo que está seleccionado en este momento, la misma información que ve una persona vidente en la sala. `#status`, con `role="status"`, es una **región dinámica**: un lector de pantalla anuncia su nuevo texto automáticamente, sin que quien aprende necesite mover el foco hasta ahí. Escribir en ambos desde el único lugar donde se maneja `exhibit-selected` evita que alguna vez difieran.

### Paso 10: audio posicional con `sound` (TODO 13)

```html
<a-sphere id="chime-bell"
          sound="src: #chime-sound; positional: true; autoplay: false; loop: false; volume: 0.9; maxDistance: 6"></a-sphere>
```

`positional: true` conecta la dirección y el volumen percibidos del sonido con la posición de esta entidad en la sala, a través del panner espacial de la Web Audio API: se vuelve más silencioso al alejarse la cámara y (con salida estéreo) parece venir del lado de la sala donde está la campana en lugar de venir de todas partes a la vez. `autoplay` se mantiene en `false`, exactamente como en 3.2: el botón "Reproducir campanilla" del TODO 13, que solo aparece una vez seleccionada la campana, es la única forma de iniciarlo.

### Paso 11: el cursor de mirada/fusión, y su compensación (TODO 14)

```js
camera.setAttribute('cursor', {
  rayOrigin: gazeOn ? 'entity' : 'mouse',
  fuse: gazeOn,
  fuseTimeout: 1200,
});
```

`rayOrigin: 'entity'` lanza el rayo desde la dirección hacia adelante de la propia cámara, así que simplemente mirar una exhibición apunta hacia ella: un **cursor de mirada**. `fuse: true` hace que la selección ocurra automáticamente después de `fuseTimeout` milisegundos de mantener esa mirada, sin necesidad de ningún clic: esto es un **cursor de fusión**, llamado así porque "fusiona" una selección después de una espera. Esto importa para visores sin control de mano, o para estudiantes que no pueden operar un gatillo o un botón de mouse. **La compensación:** un tiempo de espera forzado es una espera fija, no negociable, para todas, lo que puede ser difícil para alguien con control motor fino limitado (mantener una mirada perfectamente firme) o para cualquiera que simplemente quiera más tiempo para decidir antes de actuar. Esta lección mantiene la selección por clic/toque como predeterminada, y la mirada como una opción explícita y visible, nunca la única forma de entrar.

### Paso 12: `laser-controls` para VR (TODO 15)

```html
<a-entity laser-controls="hand: right" raycaster="objects: .interactive; far: 20"></a-entity>
```

`laser-controls` combina el `tracked-controls` de A-Frame (leer la posición y los botones de un control de VR), una línea láser visible, y la misma maquinaria de cursor/raycaster del Paso 4, apuntada desde el control en lugar de la cámara. Apretar el gatillo emite el mismo evento `'click'` que un clic de mouse o un toque, sobre cualquier entidad hacia la que apunte el láser, por eso el escucha del TODO 3, escrito para el mouse, ya funciona con un control de VR sin cambios. Prueba esto con el [Immersive Web Emulator](https://chromewebstore.google.com/detail/immersive-web-emulator/cgffilbpcibhmcfbgggfhfolhkfbhmik): agrega un visor virtual y dos controles virtuales a cualquier página WebXR, así puedes probar `laser-controls` sin tener hardware real.

### Paso 13: `tick()`, un método de ciclo de vida autoejecutado (TODO 16)

```js
tick(time) {
  if (!this.data.selected || window.__reducedMotion) return;
  const scale = 1 + Math.sin(time / 260) * 0.04;
  this.el.object3D.scale.set(scale, scale, scale);
},
```

`tick(time)` se ejecuta en cada cuadro renderizado, unas 60 veces por segundo, y es cómo los componentes de A-Frame animan cosas para las que el componente `animation` no fue diseñado, como una oscilación continua ligada al tiempo transcurrido en lugar de un valor de inicio y fin. La cláusula de guarda importa doblemente: no cuesta nada para las dos exhibiciones que no están seleccionadas, y el movimiento reducido la desactiva por completo, ya que un pulso suave es exactamente el tipo de movimiento autoejecutado que esa configuración existe para detener.

### Paso 14: `remove()`, y limpiar después de ti misma (TODO 17)

```js
remove() {
  this.el.removeEventListener('click', this.onClick);
  this.el.removeAttribute('animation__turn');
},
```

`remove()` se ejecuta cuando el componente (o toda su entidad) se retira de la escena. Cada escucha que agregó `init()` debe quitarse aquí, usando exactamente la misma referencia de función vinculada, o la entidad sigue respondiendo a clics después de supuestamente haber desaparecido, y cada atributo `animation` que este componente inició debe limpiarse, o sigue ejecutándose contra un objeto desconectado. Esta es la razón por la que `init()` guardó `this.onClick = this.onClick.bind(this)` en lugar de pasar una función flecha en línea a `addEventListener`: no puedes quitar un escucha del que nunca guardaste una referencia.

### Paso 15: el botón de Pausa (TODO 18)

El pulso en reposo del Paso 13 es lo único en esta sala que alguna vez se mueve sin que quien aprende lo pida. `wirePauseButton()` le da un interruptor explícito, con etiqueta, y con `aria-pressed`, independiente de la verificación automática de movimiento reducido: alguien que no haya configurado una preferencia de movimiento reducido a nivel del sistema aún puede elegir detenerlo a mano, en cualquier momento.

## Explicación del código clave

**`this.el.setAttribute(componentName, property, value)`** actualiza una sola propiedad de un componente ya presente en una entidad, disparando el `update(oldData)` de ese componente sin tocar sus otras propiedades.

**`el.emit(name, detail, bubbles)`** dispara un evento personalizado en una entidad; `bubbles: true` permite que un escucha, más arriba en el árbol (aquí, en `<a-scene>`), lo escuche desde cualquier entidad que lo dispare.

**`raycaster="objects: .interactive"`** restringe qué entidades prueba un raycaster, tanto por corrección (el cielo nunca se "hace clic") como por rendimiento.

**`cursor="rayOrigin: mouse"` frente a `rayOrigin: 'entity'`** elige si el rayo sigue al puntero/dedo o a la propia dirección de mirada de la cámara; `fuse` agrega una selección cronometrada y sin manos sobre cualquiera de los dos.

**`laser-controls="hand: left"`** es un paquete ya armado de `tracked-controls`, un raycaster, una línea láser, y eventos de clic estilo cursor, apuntado desde un control de VR en lugar de la cámara.

**`animation__turn` / `animation__lift`** son dos instancias con nombre independiente del componente integrado `animation` en una sola entidad: el sufijo después del doble guion bajo es arbitrario, elegido para que ambos puedan coexistir.

## Accesibilidad en 3D y XR

Toda esta lección es una lección de 3D, así que su accesibilidad está integrada en lugar de ser un momento aparte:

- La información de cada exhibición vive en `exhibitData`, una sola vez, e impulsa la lista 2D, los botones "Seleccionar", y el panel de información, así que ninguno puede desincronizarse (WCAG 1.3.1).
- **Cada interacción 3D tiene un `<button>` real, con etiqueta**, que llama a la misma función `selectExhibit()` que un clic, un toque, o el gatillo de un control de VR.
- **`#status` es una región dinámica** que anuncia la exhibición recién seleccionada sin mover el foco.
- **Nada se mueve a menos que quien aprende lo pida.** La cámara nunca camina; girar y levantar ocurren solo en respuesta a una selección; el movimiento reducido los reemplaza por un cambio instantáneo; el pulso en reposo tiene su propio botón de Pausa.
- **La campanilla nunca suena sola**, y su botón siempre muestra si está sonando, mediante `aria-pressed`.
- **La selección por mirada/fusión es opcional**, con su costo de tiempo de espera explicado donde quien aprende la activa, no oculto como el único método de entrada.
- **Un mensaje de sin WebGL** mantiene disponible la información de la sala incluso cuando la vista 3D no puede funcionar.
- **Cada exhibición funciona sentada.** Las tres están a la altura de los ojos de pie o por debajo, y al alcance del brazo desde la posición inicial de la cámara, así que nada requiere ponerse de pie o caminar para alcanzarlas, en VR o de otra forma.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| La información de cada exhibición está en la lista 2D y en el panel de información, no solo en la escena 3D | 1.1.1, 1.3.1 | La información de la imagen también está en palabras, siempre. |
| Cada interacción 3D tiene un botón real, con etiqueta, que llega a la misma función | 2.1.1, 4.1.2 | El teclado alcanza todo lo que alcanza un mouse, un toque, o un gatillo de VR. |
| `#status` anuncia la exhibición seleccionada | 4.1.3 | Una persona que usa lector de pantalla sabe qué cambió sin tener que buscarlo. |
| Girar y levantar son instantáneos con movimiento reducido; el pulso en reposo tiene un botón de Pausa y se detiene con movimiento reducido | 2.2.2, 2.3.3 | Ningún movimiento autoejecutado que quien aprende no pueda detener, y nada que provoque mareo por movimiento. |
| La campanilla nunca se reproduce sola; su botón muestra su estado | 1.4.2, 4.1.2 | Nada empieza a sonar sobre un lector de pantalla sin haberlo pedido. |
| La cámara nunca se mueve a menos que quien aprende la mueva | Buena práctica | Comodidad: sin vección, sin cambio forzado del punto de vista. |
| La página nunca se desplaza hacia los lados en un teléfono | 1.4.10 | La sala queda sobre los controles en pantallas angostas. |

## Consideraciones de rendimiento

Tres componentes `interactive-exhibit`, cada uno con un `tick()`, suena más costoso de lo que es: la cláusula de guarda al inicio de `tick()` retorna de inmediato para cualquier exhibición que no esté seleccionada en ese momento, así que como máximo una de las tres hace el trabajo de `Math.sin()` y de fijar la escala en un cuadro dado. `raycaster="objects: .interactive"` mantiene cada raycast limitado a tres entidades en lugar de todo el grafo de escena, incluidos el piso y el cielo. El recurso de campanilla reutilizado (unos 345 KB) no agrega nada nuevo a la descarga de la sala más allá de lo de 3.2.

## Errores comunes

| Error | Qué pasa | En vez de eso |
| --- | --- | --- |
| Pasar una función flecha en línea a `addEventListener` en `init()` | `remove()` no puede quitarla (no hay referencia que coincida) | Vincula y guarda la función en `this` dentro de `init()`, y pasa esa misma referencia en ambas llamadas |
| Olvidar el tercer argumento de `el.emit()` | El evento nunca llega a un escucha a nivel de escena | Pasa `true` para que burbujee |
| Escribir directamente en `this.el.object3D.rotation` para un giro sin movimiento reducido | Sin easing, sin duración, y el TODO 17 no tiene nada que limpiar | Usa `setAttribute('animation__turn', {...})` para que el componente `animation` lo controle |
| Hacer raycasting sobre toda la escena (sin filtro `objects`) | El cielo, el piso y los paneles de texto se vuelven clicables, y el raycasting cuesta más | `raycaster="objects: .interactive"` |
| `sound="positional: true"` sin pensar en `maxDistance` | La campanilla se escucha desde cualquier parte de la sala, anulando el propósito del audio posicional | Fija un `maxDistance` que coincida con la escala real de la sala |
| Hacer que la mirada/fusión sea el único método de entrada | Cualquiera que no pueda sostener una mirada firme durante el tiempo de fusión queda excluido | Mantén el clic/toque como predeterminado; haz de la mirada un interruptor explícito y reversible |

## Solución de problemas

**Hacer clic en una exhibición no hace nada, pero pasar el cursor la resalta.** `onMouseEnter`/`onMouseLeave` (desde `mouseenter`/`mouseleave` de `cursor`) están conectados, pero el escucha de `'click'`, o `selectExhibit()` en sí, sigue siendo un marcador de posición.

**Los botones "Seleccionar" del teclado funcionan, pero hacer clic en la exhibición 3D no (o al revés).** Confirma que ambas rutas llaman exactamente a la misma `selectExhibit(id)`; si alguna tiene su propia lógica separada, con el tiempo se irán desviando.

**La campanilla suena de inmediato al cargar la página.** Revisa que `autoplay` sea `false` en el atributo `sound`; un `autoplay: true` copiado por error se saltará el botón por completo.

**El cursor de mirada selecciona las cosas al instante, sin espera.** `fuse` quedó en `false` al cambiar `rayOrigin` a `'entity'`; ambos deben cambiar juntos.

**`laser-controls` no muestra ningún láser en el emulador.** Confirma que `xr-mode-ui="enabled: true"` esté en `<a-scene>` (Firefox y Safari actualmente tienen soporte limitado o nulo del emulador de WebXR; usa Chrome para este paso) y que hayas presionado "Enter VR" primero: el láser solo se dibuja dentro de una sesión XR activa.

**Una exhibición sigue reaccionando a los clics después de que creíste haberla quitado.** A `remove()` le faltan sus llamadas a `removeEventListener`, o las está llamando con una referencia de función distinta a la que agregó `init()`.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: agrega una cuarta exhibición interactiva, usando el mismo componente y la misma ruta de código compartida.
2. **[Creativo](challenges/challenge-2.es.md)**: reemplaza una exhibición con algo de tu propia cultura, comunidad o idioma.
3. **[Explorador](challenges/challenge-3.es.md)**: agrega un segundo tipo de interacción ("examinar") a `interactive-exhibit`, con su propia ruta por teclado.

## Cómo entregar tu trabajo

1. Completa cada punto de [`tests/checklist.md`](tests/checklist.md).
2. Toma una captura de la sala con una exhibición seleccionada, una del panel de información mostrando la descripción de esa exhibición, y una del interruptor de cursor de mirada activado.
3. Guárdalas en tu diario de aprendizaje y tu portafolio. Cuando abra la comunidad de XR Camp, compártelas ahí.
4. En tu diario, responde: ¿en qué método de entrada te apoyarías si no pudieras usar un mouse o una pantalla táctil, y el cursor de mirada y `laser-controls` de esta lección realmente te dieron esa opción?

## Lecturas adicionales

- [A-Frame: Component](https://aframe.io/docs/1.8.0/core/component.html) (en inglés)
- [A-Frame: cursor component](https://aframe.io/docs/1.8.0/components/cursor.html) (en inglés)
- [A-Frame: laser-controls component](https://aframe.io/docs/1.8.0/components/laser-controls.html) (en inglés)
- [A-Frame: animation component](https://aframe.io/docs/1.8.0/components/animation.html) (en inglés)
- [W3C: WebXR Device API, Input](https://www.w3.org/TR/webxr/#input) (en inglés)

## Mujeres que conviene conocer

**Karina Acuña** es una diseñadora digital y creadora de XR radicada en Bogotá, que cofundó y dirige, como CEO, el estudio de tecnología creativa Shift Active. Ella describe haber creado "Mujer Aumentada," una iniciativa que enseña a mujeres y jóvenes a construir filtros de realidad aumentada, que se lanzó en el primer evento Women in Games en Barranquilla, Colombia, en 2020.

La exhibición de esta lección es pequeña, pero la idea detrás de ella, que más personas puedan construir y dar forma a experiencias inmersivas en lugar de solo verlas, es la misma que la iniciativa de Acuña ha estado enseñando en Colombia desde 2020: el diseño y la creación de interacciones como una habilidad que cualquiera puede aprender, no el dominio de una especialista.

> **Nota editorial: verificar antes de publicar.** Los datos biográficos de las secciones «Mujeres que conviene conocer» deben verificarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

La **WebXR Device API**, publicada por el **Immersive Web Working Group del W3C**, define el modelo de entrada en el que se apoya esta lección. Cada control conectado, mano, o entrada solo de mirada se expone a la página como un `XRInputSource`, que informa un `targetRayMode` (`tracked-pointer` para un control de mano, `gaze` para un visor sin control, o `screen` para una sesión basada en teléfono), una `handedness`, y, cuando corresponde, un `gamepad` para sus botones. La API define los eventos `selectstart`, `select`, y `selectend` en la `XRSession` para representar una sola acción principal, ya sea que venga de apretar un gatillo, tocar una pantalla táctil, o una mirada cronometrada; los componentes `laser-controls` y `cursor` de A-Frame, que esta lección usa directamente, están construidos exactamente sobre este modelo, por eso el mismo evento `'click'` funciona en todos ellos.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
