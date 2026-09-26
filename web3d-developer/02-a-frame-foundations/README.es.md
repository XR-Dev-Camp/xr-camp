# Fundamentos de A-Frame

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `web3d-developer` · **Lección:** `a-frame-foundations-02` · **Tiempo:** unas 12 horas · 16 sesiones de 45 minutos · unas 4 semanas con 4 sesiones por semana

---

> Construye un entorno 3D de "Hola mundo" que funcione en el navegador.

---

## Objetivos de aprendizaje

Al terminar este proyecto podrás:

1. Explicar el **sistema de entidades y componentes** de A-Frame: cada objeto es una **entidad** (un `<a-entity>`), y todo lo que puede hacer o mostrar viene de los **componentes** conectados a ella, cada uno con sus propias **propiedades**.
2. Usar **primitivas** (`<a-box>`, `<a-plane>`, `<a-sky>`, `<a-text>`, y otras) como atajos que configuran varios componentes por ti.
3. **Precargar** imágenes y audio con `<a-assets>`, y elegir un `timeout` razonable.
4. Aplicar una **textura de imagen** a una primitiva con el componente `material`.
5. Mostrar **texto** con el componente `text`, y decir exactamente qué caracteres puede y no puede mostrar su fuente predeterminada.
6. Dibujar una **textura de texto basada en canvas** para idiomas que la fuente predeterminada no puede mostrar, y explicar cuándo usar una.
7. Agregar **audio** que nunca se reproduce solo, con un control visible y con etiqueta para iniciarlo y detenerlo.
8. Explicar cómo funciona **`<a-video>`**, sin necesitar un archivo de video para demostrarlo.
9. Iluminar una escena, y agregar un **cielo** y un **piso**.
10. Configurar una **cámara** con `look-controls`, desactivar `wasd-controls` a propósito, y explicar por qué, en términos de comodidad.
11. Explicar cuándo aparece un **botón "Enter VR" de WebXR**, y probarlo con un emulador gratuito.
12. Construir una **alternativa 2D** siempre presente y un **mensaje de "sin WebGL"**, para que la información de la sala nunca viva solo en la imagen.

## Requisitos previos

- **Fundamentos de Web3D (3.1)**, en especial el grafo de escena, las cámaras, las luces y los materiales, y tu elección de A-Frame en `analysis.md` para la exhibición virtual.
- **Mi XR Camp**, la pequeña aplicación propia de la Fase 2 (mapa del curso, panel principal, planificador de sesiones): aquí continúa el mismo patrón de construir una sola cosa a lo largo de varias lecciones, ahora con la exhibición virtual.

## Herramientas necesarias

| Herramienta | Propósito | Costo |
| --- | --- | --- |
| Un navegador moderno con WebGL | La sala, y sus controles 2D | Gratis |
| VS Code y un servidor local | Los recursos de A-Frame necesitan `http://`, no `file://` | Gratis |
| [Immersive Web Emulator](https://chromewebstore.google.com/detail/immersive-web-emulator/cgffilbpcibhmcfbgggfhfolhkfbhmik) (una extensión gratuita del navegador) | Probar el modo VR sin tener un visor | Gratis |

A-Frame se carga desde `aframe.io`, y su fuente predeterminada se carga por separado desde `cdn.aframe.io` **en tiempo de ejecución, cada vez que la escena inicia**. Si alguno de los dos es lento o está bloqueado donde vives (esto ocurre en China continental), la sala misma igual se carga, pero sus paneles de texto en inglés y español no aparecerán hasta que llegue la fuente, o nunca si no llega. El panel en chino de esta lección no tiene este problema, porque se dibuja en un `<canvas>` en su lugar: una razón más para aprender a dibujar texto con canvas.

## Lo que vas a construir

La **primera sala** de la exhibición virtual: un entorno 3D de "Hola mundo", construido completamente con primitivas de A-Frame. Ana, la estudiante del `analysis.md` de la lección 3.1, eligió "primero A-Frame, luego three.js" exactamente por esta razón: A-Frame le permite construir una sala como esta rápidamente, en HTML que ya conoce.

La sala tiene un cielo, un piso, un pedestal, tres paneles de bienvenida en inglés, español y chino, y un marcador de sonido con un bucle tranquilo que solo se reproduce si se lo pide. Un panel 2D al lado enumera todo en palabras y da un botón "Mirar" para cada punto, así que se puede recorrer toda la sala sin tocar nunca la vista 3D.

La solución de referencia está en [`completed/`](completed/). El starter tiene la página, los estilos y los controles; tú escribes la sala en sí y la lógica que la conecta: quince TODOs, divididos entre `index.html` (las entidades) y `main.js` (la interacción).

## Guía de carpetas

```text
02-a-frame-foundations/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html        # The room: TODOs 1–9
│   ├── main.js            # The interaction: TODOs 10–15
│   └── styles.css         # Finished
├── completed/            # Reference solution: open this last
├── challenges/            # Three challenges: Foundation is required
├── tests/checklist.md     # Self-review before you submit
├── assets/                # The woven-pattern texture and the calm-loop audio
└── screenshots/
```

## Configuración

1. En tu carpeta `virtual-exhibit` (iniciada en la lección 3.1), agrega los archivos starter de esta lección: `index.html`, `main.js` y `styles.css`, en su propia subcarpeta `02-a-frame-foundations`, junto con una copia de `assets/` de este proyecto.
2. Inicia tu servidor local, y abre `index.html`. Al cielo y al piso de la sala les faltará algo hasta que escribas los TODOs 1–3: eso es normal.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; Paso 1: entidades, componentes y primitivas (concepto) | Puedes nombrar las tres ideas detrás de cada etiqueta de A-Frame |
| 2 | Paso 2: precarga con `<a-assets>` (TODO 1) | Recursos listos antes de que la escena los necesite |
| 3 | Paso 3: cielo, luces y el piso (TODO 2) | Una sala con piso y luz |
| 4 | Paso 4: la textura del piso, y una primitiva con textura (TODOs 3–4) | Tu primera textura de imagen, en una sola etiqueta |
| 5 | Paso 5: paneles de texto en inglés y español (TODOs 5–6) | Dos paneles de bienvenida, en dos idiomas |
| 6 | Paso 6: texto multilingüe, qué no puede mostrar la fuente predeterminada | Sabes exactamente qué caracteres descarta la fuente predeterminada |
| 7 | Paso 6, continuación: una textura de texto dibujada en canvas (TODOs 7, 11) | Un panel de bienvenida en chino que realmente se muestra |
| 8 | Paso 7: audio que nunca se reproduce solo (TODO 8) | Un marcador de sonido, silencioso hasta que se lo pide |
| 9 | Paso 7, continuación: el botón de reproducir sonido (TODO 14) | Un control de sonido funcional y accesible |
| 10 | Paso 8: video, el paso opcional | Sabes cómo agregarías tu propio clip más adelante |
| 11 | Paso 9: la cámara, y una nota de comodidad (TODO 9) | Puedes mirar alrededor de la sala |
| 12 | Paso 10: la sala como datos (TODO 10) | `exhibitData` impulsa la lista y los botones |
| 13 | Paso 10, continuación: la lista y los botones (TODO 12) | Un gemelo 2D accesible de la sala |
| 14 | Paso 11: una ruta por teclado hacia el 3D (TODO 13) | Cada punto es alcanzable por teclado, instantáneo con movimiento reducido |
| 15 | Paso 12: modo XR, y sin WebGL (TODO 15) | Probado con el Immersive Web Emulator; un mensaje si falta WebGL |
| 16 | [`tests/checklist.md`](tests/checklist.md); un reto de extensión; **Cómo entregar tu trabajo** | La primera sala de la exhibición, terminada |

### Paso 1: entidades, componentes y primitivas

Todo en una escena de A-Frame es una **entidad**: un `<a-entity>`, que por sí solo no es nada. Lo que una entidad hace o muestra viene por completo de sus **componentes**, cada uno con sus propias **propiedades**, escritas como `component="property: value; property: value"`:

```html
<a-entity geometry="primitive: box; width: 1; height: 1; depth: 1"
          material="color: #5b2a86"
          position="0 0.5 -2"></a-entity>
```

Esto es exactamente la misma entidad que:

```html
<a-box color="#5b2a86" position="0 0.5 -2"></a-box>
```

`<a-box>` es una **primitiva**: una etiqueta atajo que configura los componentes `geometry` y `material` por ti, con valores predeterminados razonables. `<a-sky>`, `<a-plane>`, `<a-text>`, `<a-camera>` y `<a-sound>` siguen la misma idea. Las primitivas no son una tecnología distinta de las entidades y los componentes: son el mismo sistema, escrito de forma más breve. Usarás ambos en esta lección: primitivas para las formas simples de la sala, y `<a-entity>` con componentes explícitos para los dos paneles que necesitan un componente para el que A-Frame no tiene primitiva (el marcador de sonido, y el panel en chino con textura de canvas).

### Paso 2: precarga con `<a-assets>` (TODO 1)

`<a-assets>` también es una primitiva: un lugar para declarar imágenes, audio y video una sola vez, por `id`, para que A-Frame pueda cargarlos **antes** de que la escena los necesite, en lugar de que una textura aparezca a medio dibujar o un sonido empiece tarde:

```html
<a-assets timeout="10000">
  <img id="woven" src="../assets/woven-pattern.png">
  <audio id="calm-loop" src="../assets/calm-loop.wav"></audio>
</a-assets>
```

Cualquier otra cosa en la escena puede entonces referirse a `#woven` o `#calm-loop` en lugar de repetir la ruta del archivo. `timeout` es cuánto tiempo espera A-Frame por cada recurso antes de rendirse y mostrar la escena de todos modos (el valor predeterminado es 3 segundos): en una conexión lenta, 3 segundos suelen no ser suficientes, así que esta lección lo fija en 10.

### Paso 3: cielo, luces y el piso (TODO 2)

`<a-sky>` es una esfera gigante alrededor de toda la escena, coloreada (o con textura) por dentro. Un color plano y claro basta para una primera sala. Ilumínala con los mismos dos tipos de luz de la lección 3.1: una luz **ambiental** para que los lados en sombra no queden totalmente negros, y una luz **direccional** para que las superficies muestren su forma.

### Paso 4: una textura en el piso y el pedestal (TODOs 3–4)

La propiedad `src` del componente `material` toma una referencia a un recurso y la usa como textura, la misma idea que el color de un material, pero a partir de una imagen en lugar de un solo valor plano:

```html
<a-plane rotation="-90 0 0" width="6" height="6" material="src: #woven; repeat: 4 4"></a-plane>
```

`repeat: 4 4` repite la imagen cuatro veces a lo ancho y cuatro veces a lo largo, así una textura pequeña y simple (la de esta lección mide 512 × 512 píxeles, unos pocos kilobytes) puede cubrir un piso grande sin verse estirada. El pedestal del TODO 4 usa la misma textura en un `<a-box>`, sin necesitar `repeat` a ese tamaño.

La textura en sí, `assets/woven-pattern.png`, es un patrón SVG simple hecho para XR Camp, convertido a PNG con una captura de pantalla desde un navegador sin interfaz (consulta [`ATTRIBUTION.md`](ATTRIBUTION.md)). Cualquier imagen que uses como textura debe mantenerse bajo el límite de 1 MB de [`docs/en/3d-assets-and-versions.md`](../../docs/en/3d-assets-and-versions.md) (en inglés): esta pesa unos 2.5 KB.

### Paso 5: paneles de texto en inglés y español (TODOs 5–6)

`<a-text>` es una primitiva construida sobre el componente `text`:

```html
<a-text value="Welcome to the exhibit" align="center" width="2.4" color="#3f1d5e"></a-text>
```

`width` controla qué tan grande se dibuja el texto (y dónde salta de línea), no una caja alrededor de él. Escribe el panel en inglés, y luego uno en español solo con letras simples, por ahora: el siguiente paso explica por qué.

### Paso 6: texto multilingüe: qué puede y qué no puede mostrar la fuente predeterminada

**El componente `text` de A-Frame dibuja con un solo atlas de fuente integrado** (Roboto, en formato MSDF, cargado desde `cdn.aframe.io` en tiempo de ejecución): una textura que contiene un conjunto fijo y pequeño de glifos, elegido para mantener esa textura pequeña. Esta lección lo probó directamente, renderizando cadenas de texto en una escena real de A-Frame y leyendo el resultado píxel por píxel:

| Caracteres | ¿Se muestran? |
| --- | --- |
| Letras latinas simples (`a`–`z`, `A`–`Z`), dígitos, puntuación básica | Sí |
| Vocales acentuadas del español: `á é í ó ú Á É Í Ó Ú` | **No.** Cada una se descarta en silencio: la letra simplemente desaparece, sin caja ni marcador. |
| `ñ Ñ ü Ü ¿ ¡` | **No,** se descartan de la misma manera. |
| Caracteres chinos (por ejemplo `你好`) | **No.** Toda la secuencia de caracteres CJK se descarta. |

Esto significa que una palabra en español como "sesión" se dibuja como "sesin", y "diseño" como "diseo": peor que simplemente no aparecer, porque parece un error de escritura y no una función faltante. **Nunca escribas texto en español con acentos o "ñ" dentro de un `<a-text value="...">`.** Evita el carácter (como hace a propósito el panel en español de esta lección) o dibújalo como textura, de la misma forma que el chino, en el siguiente paso.

### Paso 6, continuación: una textura de texto dibujada en canvas (TODOs 7, 11)

Un `<canvas>` no tiene ese límite: `CanvasRenderingContext2D.fillText()` usa el motor de fuentes del propio navegador, el mismo que dibuja cada página web, así que puede dibujar cualquier idioma para el que el sistema operativo tenga una fuente, incluido el chino, y el español con todos sus acentos. El TODO 11 dibuja la etiqueta en chino de esta manera:

```js
const canvas = document.createElement('canvas');
canvas.width = 512;
canvas.height = 256;
const ctx = canvas.getContext('2d');
ctx.font = '600 72px "PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif';
ctx.fillText('欢迎光临', canvas.width / 2, canvas.height / 2);
```

Luego se convierte en textura, aplicada al material de una entidad simple, de la misma forma que lo haría una imagen:

```js
const texture = new AFRAME.THREE.CanvasTexture(canvas);
entity.getObject3D('mesh').material.map = texture;
```

Esta lección verificó el resultado de la misma forma en que probó la fuente predeterminada: renderizando el panel terminado en un navegador real y leyéndolo de vuelta. Se muestra correctamente. Una textura de canvas también evita por completo la dependencia de `cdn.aframe.io`, porque usa fuentes ya instaladas en el dispositivo en lugar de descargar una: una razón más para que sea la herramienta correcta aquí, no solo por los caracteres que puede dibujar.

### Paso 7: audio que nunca se reproduce solo (TODO 8), y el botón de reproducir sonido (TODO 14)

El componente `sound` reproduce audio conectado a una entidad:

```html
<a-entity sound="src: #calm-loop; autoplay: false; loop: true; volume: 0.7"></a-entity>
```

**`autoplay` debe quedarse en `false`.** Un sonido que empieza sin que se lo pidan es una falla de WCAG (1.4.2, Control de audio) y puede sobresaltar, especialmente a alguien que usa un lector de pantalla, con cuyo propio habla competiría. El TODO 14 da la única forma de iniciarlo: un `<button>` real, con `aria-pressed` reflejando si se está reproduciendo, para que un lector de pantalla anuncie "presionado" o "no presionado" y la etiqueta siempre coincida con la realidad.

El bucle en sí (`assets/calm-loop.wav`) fue generado, no grabado: un pad de dos tonos, corto y suave, hecho en Python con `wave` y `numpy`, con un fundido de entrada y salida para que se repita sin un chasquido, en mono a 22 050 Hz para mantener el archivo pequeño (unos 345 KB, muy por debajo del límite de 2 MB para audio).

### Paso 8: video, el paso opcional

La primitiva de video de A-Frame es `<a-video>`, y funciona exactamente igual que la textura de imagen del Paso 4, salvo que la fuente es un elemento `<video>` dentro de `<a-assets>`:

```html
<a-assets>
  <video id="my-clip" src="my-clip.mp4" muted playsinline></video>
</a-assets>
<a-video src="#my-clip" width="1.6" height="0.9" position="0 1.2 -2"></a-video>
```

Esta sala se entrega **sin ningún archivo de video**, así que no hay nada aquí que pueda llegar roto a tu máquina. Cuando tengas un clip corto propio, el [Reto 3](challenges/challenge-3.es.md) explica cómo agregarlo, incluidos subtítulos en la alternativa 2D con `<track kind="captions">` en un elemento `<video>` simple, ya que `<a-video>` en sí no admite subtítulos: la versión 2D del clip es donde deben ir los subtítulos.

### Paso 9: la cámara, y una nota de comodidad (TODO 9)

```html
<a-camera position="0 1.6 1.6" look-controls wasd-controls="enabled: false"></a-camera>
```

`look-controls` permite que quien aprende mire alrededor con el mouse, un dedo, o el propio seguimiento de un visor. `wasd-controls` es el componente integrado de A-Frame para caminar con el teclado, y esta sala lo desactiva a propósito.

**Nota de comodidad:** cuando un punto de vista se mueve por una escena mientras el cuerpo permanece quieto, puede causar **vección**, un desajuste entre lo que ven los ojos y lo que siente el oído interno, una causa común de mareo por movimiento en VR. Una sala en la que quien aprende solo gira para mirar alrededor, nunca camina, no tiene nada que pueda causarlo. Las lecciones posteriores de la Fase 3 introducen el movimiento con cuidado, cuando hay una razón para hacerlo; esta primera sala no lo necesita.

### Paso 10: la sala como datos (TODO 10), la lista, y los botones (TODO 12)

Un solo arreglo, `exhibitData`, describe cada punto de la sala: su `id`, una `label` (etiqueta) breve, y una `description`. La lista 2D y los botones "Mirar" se construyen a partir de este mismo arreglo, así que nunca pueden desincronizarse entre sí, como sí podría pasar con HTML escrito a mano por separado.

### Paso 11: una ruta por teclado hacia el 3D (TODO 13)

Una vista 3D que solo responde a arrastrar el mouse no tiene ninguna ruta por teclado. La ruta de esta sala son los botones "Mirar": elementos `<button>` reales, alcanzables con Tab y activados con Enter o Espacio, exactamente como cualquier otro botón de la web.

Girar la cámara desde el código es la única parte realmente delicada de esta lección: fijar directamente el atributo `rotation` de una entidad no funciona, porque `look-controls` recalcula la rotación de la cámara en cada cuadro a partir de sus propios objetos internos `yawObject` y `pitchObject`, para seguir al mouse o a un visor. El TODO 13 escribe en esos dos objetos en su lugar, calculado con `THREE.Matrix4().lookAt()` y `THREE.Euler().setFromRotationMatrix(matrix, 'YXZ')`, exactamente el mismo trabajo que `look-controls` ya hace para el movimiento del mouse, apuntado hacia un objetivo en cambio.

**Cuando quien aprende ha pedido movimiento reducido**, el giro ocurre en un solo cuadro, al instante: nada aquí es decorativo, así que nada aquí necesita animarse. De lo contrario, gira suavemente durante alrededor de un tercio de segundo, para que el diseño de la sala siga siendo comprensible en vez de dar un salto.

### Paso 12: modo XR, y sin WebGL (TODO 15)

A-Frame agrega un botón "Enter VR" a la escena automáticamente, pero **solo cuando el navegador informa que WebXR está disponible**: en un teléfono o laptop sin un visor conectado, simplemente no aparece, y nada más en la página necesita cambiar por eso. Pruébalo con la extensión gratuita del navegador [Immersive Web Emulator](https://chromewebstore.google.com/detail/immersive-web-emulator/cgffilbpcibhmcfbgggfhfolhkfbhmik), que agrega un visor y controles virtuales a cualquier página WebXR sin necesitar hardware real.

En el otro extremo, algunos navegadores no tienen WebGL en absoluto. El TODO 15 lo verifica directamente y, si falta, oculta la caja 3D y muestra un mensaje simple, mientras la lista 2D de arriba sigue funcionando exactamente igual: nada de la información de esta sala depende de que el 3D funcione.

## Explicación del código clave

**`<a-assets timeout="10000">`** espera hasta 10 segundos por cada recurso declarado antes de mostrar la escena de todos modos; el valor predeterminado es 3 segundos.

**`material="src: #woven; repeat: 4 4"`** aplica un recurso como textura y la repite 4 veces en cada dirección.

**`AFRAME.THREE`** es cómo un `<script>` simple (no un módulo) llega exactamente al mismo build de three.js que trae A-Frame, sin agregar un segundo mapa de importación.

**`entity.getObject3D('mesh')`** devuelve el `Mesh` de three.js subyacente de una primitiva o de una entidad con `geometry` + `material`, que es a lo que se conecta una textura de canvas.

**`lookControls.yawObject.rotation.y` y `.pitchObject.rotation.x`** son las dos rotaciones que `look-controls` realmente lee en cada cuadro; fijar directamente el atributo `rotation` de una entidad se sobrescribe en el siguiente cuadro.

**`marker.components.sound.playSound()` / `.stopSound()`** inician y detienen un componente `sound` desde el código, exactamente como lo hace el botón de reproducir.

## Accesibilidad en 3D y XR

Toda esta lección es una lección de 3D, así que su accesibilidad está integrada en lugar de ser un momento aparte:

- La sala tiene una **descripción de la escena**, y una lista 2D siempre presente, construida a partir de los mismos datos que los botones "Mirar".
- Cada interacción 3D (mirar un punto, reproducir el sonido) también tiene un `<button>` real, con etiqueta.
- **Nada se mueve a menos que quien aprende lo pida.** La cámara nunca camina, y "Mirar" gira al instante con movimiento reducido.
- **El sonido nunca se reproduce solo**, y su botón siempre muestra su estado actual con `aria-pressed`.
- **Un mensaje de sin WebGL** mantiene disponible la información de la sala incluso cuando la vista 3D no puede funcionar.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| Una descripción en texto de la sala, y una lista 2D completa de su contenido | 1.1.1, 1.3.1 | La información de la imagen también está en palabras, siempre, no solo cuando el 3D falla. |
| Cada interacción 3D tiene un botón real, con etiqueta | 2.1.1, 4.1.2 | El teclado alcanza todo lo que alcanza un mouse. |
| Los botones "Mirar" muestran cuál punto está activo con `aria-pressed` | 4.1.2 | Un lector de pantalla anuncia el estado actual, no solo la etiqueta. |
| El sonido nunca se reproduce solo, y su botón muestra su estado | 1.4.2, 4.1.2 | Nada empieza a sonar sobre un lector de pantalla sin haberlo pedido. |
| La cámara nunca se mueve a menos que quien aprende la mueva; "Mirar" es instantáneo con movimiento reducido | 2.2.2, 2.3.3 | No hay movimiento que detener, ni mareo por movimiento. |
| La página nunca se desplaza hacia los lados en un teléfono | 1.4.10 | La sala queda sobre los controles en pantallas angostas. |

## Consideraciones de rendimiento

La textura del patrón tejido pesa unos 2.5 KB y el audio del bucle tranquilo unos 345 KB: ambos son lo bastante pequeños como para que la lección sobre "costo de descarga" de 3.1 casi no aplique aquí, que es justo el punto de usar recursos pequeños y hechos por ti misma en lugar de fotografías encontradas o audio grabado. `<a-assets>` sigue siendo importante incluso para archivos pequeños: sin él, la textura del piso podría aparecer un cuadro o dos después del piso mismo.

La etiqueta en chino dibujada en canvas cuesta un `<canvas>` pequeño y una carga de textura, creados una sola vez, cuando la escena termina de cargar, no en cada cuadro: dibújala una vez y reutiliza la textura, exactamente como hace el código de esta lección.

## Errores comunes

| Error | Qué pasa | En vez de eso |
| --- | --- | --- |
| Texto en español con acentos o en chino dentro de `<a-text value="...">` | Los caracteres desaparecen en silencio | Dibújalos en una textura de canvas |
| `sound="autoplay: true"` | El sonido empieza sin que se lo pidan (falla WCAG 1.4.2) | Usa siempre `autoplay: false`, con un botón |
| Fijar el `rotation` de una entidad para "mirar hacia" algo | Vuelve a su posición en el siguiente cuadro | Escribe en `yawObject`/`pitchObject` de `look-controls` en su lugar |
| Olvidar `wasd-controls="enabled: false"` | El teclado camina la cámara por la sala sin avisar | Desactívalo cuando la sala no tenga razón para caminarse |
| Una textura sin entrada en `<a-assets>` | Puede aparecer después de que la forma ya se muestre | Precárgala, y dale un id |
| Asumir que `cdn.aframe.io` siempre carga | Los paneles de texto quedan en blanco donde ese CDN es lento o está bloqueado | Prefiere texturas de canvas para texto que siempre debe aparecer |

## Solución de problemas

**La sala está en blanco, pero el cielo se ve.** Probablemente faltan los TODOs 3–4 (el piso y el pedestal), o su `material="src: ..."` se refiere a un id de recurso que no coincide con el de `<a-assets>`.

**El texto en inglés o español nunca aparece, solo en algunas redes.** `cdn.aframe.io`, donde vive la fuente predeterminada, es lenta o está bloqueada ahí. Esto es esperado en algunas conexiones; consulta "Herramientas necesarias" más arriba.

**El panel en chino es un rectángulo blanco o gris liso.** `applyLabelTexture` se ejecutó antes de que existieran las entidades de la escena. Espera al evento `loaded` de la escena, como ya lo hace `init()` en el starter.

**"Mirar" gira la vista una vez, y luego se desvía o vuelve a su lugar.** Algo sigue escribiendo directamente en el atributo `rotation` de la entidad (quizás de un intento anterior) en lugar de en los objetos internos de `look-controls`.

**El botón de VR nunca aparece.** Eso es correcto en un navegador o dispositivo sin soporte de WebXR. Instala el Immersive Web Emulator para probarlo sin un visor.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: agrega un cuarto punto "Mirar" propio, construido a partir de una primitiva.
2. **[Creativo](challenges/challenge-2.es.md)**: reemplaza el patrón tejido con un patrón de textura de tu propia cultura, y un idioma propio para un panel de bienvenida.
3. **[Explorador](challenges/challenge-3.es.md)**: agrega un breve clip de video propio con `<a-video>`, con subtítulos en su alternativa 2D.

## Cómo entregar tu trabajo

1. Completa cada punto de [`tests/checklist.md`](tests/checklist.md).
2. Toma una captura de la sala, una de los botones "Mirar" con uno presionado, y una del mensaje de sin WebGL (puedes provocarlo desactivando temporalmente la aceleración por hardware).
3. Guárdalas en tu diario de aprendizaje y tu portafolio, junto a las capturas de la lección 3.1: esta sala es la siguiente página de la misma exhibición.
4. En tu diario, responde: ¿qué punto de la exhibición reemplazarías por algo de tu propia cultura o idioma, y por qué?

## Lecturas adicionales

- [A-Frame: Introduction](https://aframe.io/docs/1.8.0/introduction/) (en inglés)
- [A-Frame: text component](https://aframe.io/docs/1.8.0/components/text.html) (en inglés)
- [A-Frame: sound component](https://aframe.io/docs/1.8.0/components/sound.html) (en inglés)
- [A-Frame: a-assets](https://aframe.io/docs/1.8.0/core/asset-management-system.html) (en inglés)
- [MDN: WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API) (en inglés)
- [W3C: XR Accessibility User Requirements](https://www.w3.org/TR/xaur/) (en inglés)

## Mujeres que conviene conocer

**Liv Erickson** fue la gerenta de producto de **Mozilla Hubs**, una plataforma social de VR de código abierto, basada en el navegador, construida con A-Frame y three.js sobre WebGL, que funcionaba en visores VR, teléfonos y computadoras de escritorio. (Mozilla ya cerró Hubs.) Ahora es la líder de Desarrollo de Ecosistema de Mozilla.

La sala que acabas de construir usa las mismas dos tecnologías sobre las que se construyó Hubs: A-Frame, escrito como HTML, sobre three.js. Hubs tomó esa misma idea, una sala hecha de primitivas y componentes, y dejó que las personas entraran juntas a ella, desde un navegador, sin necesitar un visor para unirse.

> **Nota editorial: verificar antes de publicar.** Los datos biográficos de las secciones «Mujeres que conviene conocer» deben verificarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

La **WebXR Device API** es lo que le permite a un navegador ofrecer esta sala en VR: la desarrolla el **Immersive Web Working Group del W3C**, y es sobre lo que se construye el botón automático "Enter VR" de A-Frame. Define cómo una página web pide una sesión XR, obtiene las posiciones de un visor y sus controles, y renderiza una vista estereoscópica, de la misma forma sin importar qué visor o navegador use quien aprende. Como WebGL y WebGPU en la lección 3.1, es un estándar, no una biblioteca: A-Frame es el proyecto de código abierto construido sobre ella, por eso XR Camp fija la versión de A-Frame, pero no la de la API misma.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
