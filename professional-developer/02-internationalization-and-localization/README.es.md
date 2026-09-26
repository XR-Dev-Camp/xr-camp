# Internacionalización y localización

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `professional-developer` · **Lección:** `internationalization-and-localization-02` · **Tiempo:** unas 10 horas · 14 sesiones de 45 minutos · unas 4 semanas con 4 sesiones por semana

---

> Publica una aplicación en inglés, español y chino simplificado.

## Objetivos de aprendizaje

Al terminar este proyecto podrás:

1. Explicar la diferencia entre internacionalización (i18n: hacer que una app *pueda* cambiar de idioma) y localización (l10n: hacer el trabajo real de traducción para un idioma).
2. Elegir el mejor idioma disponible para quien aprende a partir de una lista de etiquetas BCP 47, usando `Intl.Locale` y maximización de script (script maximization).
3. Formatear números, fechas y tiempos relativos correctamente para un idioma con `Intl.NumberFormat`, `Intl.DateTimeFormat` e `Intl.RelativeTimeFormat`, en lugar de escribir tus propias reglas de formato.
4. Elegir la forma plural correcta para un idioma con `Intl.PluralRules`, incluso para un idioma, como el chino simplificado, que solo tiene una.
5. Dibujar una etiqueta de texto 3D en un `<canvas>` para que pueda mostrar cualquier script que un navegador pueda renderizar, y explicar por qué el texto integrado de A-Frame y de three.js no puede.
6. Configurar una pila de fuentes (font stack), atributos `lang` y reglas de salto de línea que le den al texto chino la tipografía correcta y los puntos de corte correctos, sin fingir una cursiva que no existe.
7. Construir un layout que sobreviva a la expansión de texto, y probarlo con un modo de pseudolocalización antes de que una sola cadena se traduzca de forma profesional.
8. Trabajar con una lista de verificación de QA de traducción, y marcar correctamente una traducción de primera pasada, no nativa, como borrador.

## Requisitos previos

- **Curso 2.9: Aplicación frontend en producción**, que construyó la maquinaria de selección de idioma (`pickLocale`, `setLocale`, `t()`) que esta lección retoma y extiende.
- **Curso 3.7: Experiencia interactiva Web3D**, cuya exhibición cultural virtual es la base de la versión compacta de tres objetos de esta lección.
- Comodidad con módulos ES, `async`/`await`, y los fundamentos de three.js de la Fase 3 (escena, cámara, renderer).

## Herramientas necesarias

| Herramienta | Propósito | Costo |
| --- | --- | --- |
| Un navegador moderno (Chrome, Firefox, Safari o Edge) | Ejecuta la exhibición y sus llamadas a `Intl` | Gratis |
| Un editor de código (por ejemplo, VS Code) | Escribir el JavaScript, el CSS y los archivos de idioma | Gratis |
| Un servidor estático local (por ejemplo, `python3 -m http.server`) | Servir páginas por `http://`, necesario para los módulos ES | Gratis |
| Google Chrome DevTools, o el equivalente de Firefox/Safari | Revisar las fuentes renderizadas y las advertencias de consola por idioma | Gratis, incluido |

No necesitas cuentas de pago, claves de API ni paquetes de idioma instalados: cada pila de fuentes de abajo recurre a una fuente del sistema, y Chrome, Firefox, y las versiones de Microsoft Edge y UC Browser disponibles en China continental soportan todas las APIs de `Intl` que usa esta lección.

## Lo que vas a construir

Una versión compacta, de tres objetos, de la exhibición final de la Fase 3 (la vasija de barro, el aro de canasta tejida y la piedra de jade de `web3d-developer/07`), reconstruida para que cada palabra en ella — etiquetas 3D, el panel de información, la descripción de la escena y un pequeño panel de estadísticas — pueda cambiar entre inglés, español (latinoamericano) y chino simplificado sin tocar ningún código 3D. La solución de referencia está en [`completed/`](completed/), y el starter tiene 12 TODOs numerados repartidos en siete archivos.

En el camino, vas a extender el enfoque de cambio de idioma del Curso 2.9 con las partes que una app de un solo idioma nunca necesitó: `Intl.NumberFormat`, `Intl.DateTimeFormat` e `Intl.RelativeTimeFormat`; etiquetas 3D dibujadas en canvas que renderizan caracteres chinos y español acentuado; una pila de fuentes y reglas de salto de línea para la tipografía china; y un modo de pseudolocalización que somete tu layout a estrés antes de que un traductor abra el proyecto.

Las cadenas en español y chino simplificado que escribes en esta lección son borradores de primera pasada, marcados `draft: true`, en cada archivo de idioma, incluida la solución de referencia. Consulta "Lista de verificación de QA de traducción" más abajo antes de tratar cualquiera de ellas como lista para publicar.

## Guía de carpetas

```text
02-internationalization-and-localization/
├── README.md
├── starter/        # begin here
├── completed/      # reference solution
├── challenges/     # Three challenges: Foundation is required
├── tests/          # self-review checklist
├── assets/
└── screenshots/
```

## Configuración

1. Clona o descarga este repositorio.
2. Sirve la raíz del repositorio con un servidor local, por ejemplo `python3 -m http.server 8766`.
3. Abre `starter/index.html` a través de ese servidor (una dirección `http://`, no `file://`: los módulos ES necesitan una).
4. Abre la consola de DevTools del navegador. Hasta que termines los TODOs, muestra advertencias de "Missing string" (cadena faltante) y los pedestales no muestran etiquetas; eso es lo esperado.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Lee el starter, agrega la entrada de chino simplificado a `LOCALES` (TODO 1) | Tres botones de idioma en la página |
| 2 | Lee `pickLocale`/`setLocale` de `i18n.js` del Curso 2.9; escribe `formatVisitorCount` (TODO 2) | Un número de visitantes correctamente agrupado |
| 3 | Escribe `formatOpenedDate` (TODO 3) | Una fecha de apertura localizada y escrita en palabras |
| 4 | Escribe `formatOpenedRelative` con `Intl.RelativeTimeFormat` (TODO 4) | Una frase en vivo tipo "hace X años" |
| 5 | Traduce las dos claves faltantes en `es.js` y `zh-Hans.js` (TODO 5) | Cada cadena de la interfaz completa en los tres idiomas |
| 6 | Escribe `buildJadeStone()` en `exhibit.js` (TODO 6) | El objeto del tercer pedestal aparece en 3D |
| 7 | Escribe el código de dibujo en canvas en `labels.js` (TODO 7) | Una etiqueta de nombre legible sobre cada pedestal |
| 8 | Lee y confirma la nota sobre billboarding en `app.js` (TODO 8), prueba orbitando | Las etiquetas siguen siendo legibles desde cualquier ángulo |
| 9 | Conecta la selección y el panel de información en `main.js` (TODO 9) | Hacer clic en un pedestal llena el panel de información |
| 10 | Marca el botón de idioma activo en `main.js` (TODO 10) | Un botón de idioma actual, visible y programáticamente marcado |
| 11 | Escribe `pseudoLocalize()` en `pseudo.js` (TODO 11) | Texto entre corchetes y alargado, a demanda |
| 12 | Conecta la casilla de pseudolocalización (TODO 12) | Activar la casilla somete el layout a estrés de forma visible |
| 13 | Trabaja [`tests/checklist.md`](tests/checklist.md) en los tres idiomas, con la pseudolocalización activada y desactivada | Una consola limpia y una lista marcada |
| 14 | Un reto de extensión (Fundamento es obligatorio), y luego **Cómo entregar tu trabajo** | Un cuarto dato localizado, y tu entrega |

### Paso 1: agrega el tercer idioma (TODO 1)

`config.js` lista cada idioma que ofrece la app. Cada entrada necesita un código BCP 47 (el mismo tipo de etiqueta que usan `<html lang>` y el encabezado `Accept-Language`) y un nombre escrito en ese mismo idioma, para que una persona lectora pueda encontrar su propio idioma sin tener que leer inglés primero.

```js
{ code: 'zh-Hans', name: '简体中文' },
```

El subtag `Hans` es un subtag de *script*: dice "Han simplificado", en contraste con `Hant` (Han tradicional). `pickLocale()` (copiado del Curso 2.9) usa `Intl.Locale(...).maximize()` para completar esto incluso para alguien cuyo navegador solo reporta `zh-CN`, de modo que llegue al script correcto sin que tengas que listar cada variante regional.

### Paso 2: formatea el conteo de visitantes (TODO 2)

```js
export function formatVisitorCount(count, locale = current) {
  return new Intl.NumberFormat(locale).format(count);
}
```

`Intl.NumberFormat` ya sabe que el inglés agrupa los miles con una coma, el español con un punto, y que el chino también agrupa de tres en tres dígitos en el modo por defecto de `Intl.NumberFormat` (su agrupación tradicional por 万, decenas de mil, es una opción `notation` que esta lección no necesita). No se escribe ninguna lista de separadores en ningún lado.

### Paso 3: formatea la fecha de apertura (TODO 3)

```js
export function formatOpenedDate(isoDate, locale = current) {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'long' })
    .format(new Date(`${isoDate}T12:00:00`));
}
```

Agregar `T12:00:00` antes de convertir a fecha evita que la fecha se desplace un día antes o después en una zona horaria al oeste o al este de UTC, un error real que solo aparece para algunas personas lectoras, en algunas épocas del año, si se omite.

### Paso 4: formatea "cuánto tiempo hace" (TODO 4)

```js
const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
rtf.format(-days, 'day');
```

`Intl.RelativeTimeFormat` convierte un número con signo y una unidad en las palabras correctas: `-3, 'day'` se convierte en "3 days ago" en inglés, "hace 3 días" en español, y "3天前" en chino. `numeric: 'auto'` también le permite decir "yesterday" (ayer) en lugar de "1 day ago" cuando un idioma tiene una palabra especial para eso.

### Paso 5: completa las dos traducciones faltantes (TODO 5)

`es.js` y `zh-Hans.js` no tienen a propósito `motion.hint` ni `stats.openedRelative`. Tradúcelas de `en.js`. Hasta que lo hagas, `t()` recurre correctamente al texto en inglés solo para esas dos claves; ese respaldo, y no un fallo o texto en blanco, es lo que hace seguro publicar un idioma `draft: true` incompleto.

### Paso 6: construye la piedra de jade (TODO 6)

```js
function buildJadeStone() {
  const geometry = new THREE.IcosahedronGeometry(0.22, 0);
  const material = new THREE.MeshStandardMaterial({ color: '#2f7d5b', roughness: 0.35, metalness: 0 });
  return new THREE.Mesh(geometry, material);
}
```

Una rugosidad baja y un metalness de cero es lo que le da a una piedra pulida y no metálica su brillo al girar, la misma decisión de material físicamente correcto (physically-based) que el proyecto final de la Fase 3 del que se copió esta exhibición.

### Paso 7: dibuja una etiqueta 3D en un canvas (TODO 7)

El texto por defecto de A-Frame y el `TextGeometry` de three.js dibujan a partir de un atlas de fuente prehorneado (pre-baked) que solo trae un puñado de glifos latinos: sin acentos, y sin nada de chino. Un `<canvas>` no tiene ese límite: el propio renderizador de texto del navegador dibuja lo que la fuente actual soporte, exactamente como lo haría en cualquier página web.

```js
const ctx = canvas.getContext('2d');
ctx.font = `600 56px ${fontFamily}`;
ctx.fillText(text, canvas.width / 2, canvas.height / 2);
const texture = new THREE.CanvasTexture(canvas);
texture.colorSpace = THREE.SRGBColorSpace;
```

Dimensionar el canvas según el ancho *medido* del texto (no un tamaño fijo) es lo que evita que una palabra corta en inglés desperdicie memoria de textura y que una oración larga en chino se recorte.

### Paso 8: mantén las etiquetas mirando a la cámara (TODO 8)

Un `THREE.Sprite` siempre se renderiza mirando a la cámara, en cualquier dirección en la que orbites; ese billboarding es gratuito, y por eso esta lección envuelve el `CanvasTexture` de cada etiqueta en un `Sprite` en lugar de un `Mesh` plano, que necesitaría que su rotación se copiara de la cámara a mano, cuadro a cuadro.

### Paso 9: conecta la selección y el panel de información (TODO 9)

```js
infoPanel.textContent = `${t(`item.${id}.name`)} — ${t('info.made', { made: t(`item.${id}.made`) })} ${t(`item.${id}.note`)}`;
```

Cada palabra visible aquí para la persona usuaria viene de `t()`, con clave según el `id`, solo datos, de la exhibición; nunca una oración en inglés escrita a mano con una palabra traducida insertada. Insertar palabras rompe el orden en idiomas que colocan adjetivos, verbos o números en un lugar distinto al inglés.

### Paso 10: marca el idioma actual (TODO 10)

```js
button.setAttribute('aria-pressed', String(button.dataset.locale === currentLocale()));
```

`aria-pressed` en cada botón del grupo, no solo un resaltado visual en el activo, es lo que hace que un lector de pantalla pueda anunciar correctamente este grupo de botones de alternancia.

### Paso 11: escribe la transformación de pseudolocalización (TODO 11)

```js
export function pseudoLocalize(text) {
  // accent vowels, stretch words, wrap the result in brackets
}
```

Consulta "Pseudolocalización" más abajo para ver qué prueba esto y por qué. La transformación de la solución de referencia acentúa las vocales, agrega alrededor de un 30% más de longitud repitiendo el final de cada palabra larga, y envuelve todo en `[⟦…⟧]` para que una cadena pseudolocalizada sea inconfundible, igual que una cadena real que quedó olvidada.

### Paso 12: conecta el interruptor de pseudolocalización (TODO 12)

```js
pseudoToggle.addEventListener('change', () => setPseudo(pseudoToggle.checked));
```

`setPseudo()` (ya escrito, en `i18n.js`) guarda la elección y dispara el mismo evento `'localechange'` que usa el selector de idioma, así que el único listener `renderAll()` ya redibuja todo; sin evento nuevo, sin ruta de render nueva.

## Explicación del código clave

- **`Intl.Locale(...).maximize()`**: convierte una etiqueta corta como `'zh-CN'` en su forma completa, `'zh-Hans-CN'`, completando el script que una persona lectora asume pero que una etiqueta corta no declara. `pickLocale()` usa esto para comparar el idioma del navegador de quien aprende contra los idiomas disponibles de la app por idioma y script, ignorando la región.
- **`Intl.PluralRules`**: elige cuál de las formas plurales de un mensaje (`{ one: '…', other: '…' }`) corresponde a un número dado, por idioma. Inglés y español necesitan `one`/`other`; el chino simplificado no tiene plural gramatical, así que sus mensajes solo necesitan `other`; escribir un objeto solo con `other` para el chino, en lugar de inventar una forma `one` que no existe, es lo correcto, no algo incompleto.
- **Etiquetas dibujadas en canvas (`labels.js`)**: un `CanvasTexture` pintado por el propio renderizador de texto del navegador, envuelto en un `THREE.Sprite`. Es el único enfoque de renderizado de texto en el kit de esta lección (texto de A-Frame, `TextGeometry` de three.js, o canvas) que puede mostrar tanto español acentuado como chino sin un atlas de fuente personalizado.
- **`pseudoLocalize()`**: una prueba de estrés reversible, que preserva el significado, no una traducción. Pasar cada cadena real por ella antes de que un traductor vea el proyecto detecta gratis errores de expansión de texto y llamadas a `t()` olvidadas.
- **`:lang(zh-Hans)` en `styles.css`**: un selector CSS que coincide con cualquier elemento cuyo idioma (heredado de `<html lang>` o de su propio atributo `lang`) sea chino simplificado, usado aquí para aplicar una pila de fuentes con prioridad CJK, desactivar la cursiva falsa, y activar el salto de línea estricto chino, las tres cosas explicadas en "Accesibilidad 3D y XR" más abajo.
- **`draft: true`**: una bandera en un módulo de idioma, leída por `isDraft()`, que muestra un aviso visible y que `scripts/validate-projects.mjs` comprueba antes de que una lección se pueda marcar como `published`. Existe para que una traducción de primera pasada, no nativa, pueda publicarse para quienes aprenden, etiquetada con honestidad, en lugar de ocultarse o presentarse como terminada.

## Accesibilidad 3D y XR

La etiqueta de cada objeto de la exhibición se dibuja en un canvas (ver Paso 7), porque tanto la fuente incluida de A-Frame como el `TextGeometry` de three.js se renderizan desde un atlas de glifos MSDF (campo de distancia con signo multicanal) fijo. El atlas que XR Camp ha usado durante la Fase 3 solo incluye letras latinas sin acentos: `á` y `ñ` se renderizan como cajas en blanco, y el chino, decenas de miles de caracteres posibles, no se puede prehornear en un solo atlas pequeño en absoluto. Construir un atlas MSDF personalizado que incluya caracteres CJK específicos es posible, pero significa elegir cada carácter de antemano y publicar un archivo de fuente más grande; una etiqueta dibujada en canvas no necesita ninguna de las dos cosas, al costo de ser un sprite plano orientado a la cámara en lugar de un glifo 3D extruido real.

`id="scene-description"` contiene una descripción en lenguaje sencillo construida a partir de los mismos datos y las mismas llamadas a `t()` que todo lo demás, así que nunca es una traducción separada, fácil de olvidar. El giro de la piedra de jade respeta `prefers-reduced-motion` al cargar y se puede pausar en cualquier momento con un botón etiquetado y con `aria-pressed` (WCAG 2.2.2): nada más en la escena se mueve por sí solo, y la cámara nunca se mueve a menos que quien aprende la mueva. La lista de alternativa 2D y el panel de información repiten cada dato que muestra la vista 3D, en cada idioma, así que WebGL o una carga de modelo lenta nunca son la única forma de llegar al contenido (WCAG 1.3.1). Cada interacción 3D (seleccionar un objeto, pausar la animación, orbitar la vista) tiene una ruta de teclado completa: elementos `<button>` reales para seleccionar y pausar, y órbita nativa con las flechas del teclado desde `OrbitControls.listenToKeyEvents()`.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| `<html lang>` coincide con el idioma elegido | 3.1.1 Idioma de la página | Los lectores de pantalla eligen pronunciación y voz, y los navegadores eligen fuentes de respaldo, a partir de este atributo |
| Cada etiqueta 3D, entrada del panel de información y descripción se actualiza al cambiar de idioma | 1.1.1 Contenido no textual | Una etiqueta 3D no es texto que un lector de pantalla pueda leer; el panel de información y la descripción son su alternativa textual siempre presente |
| La lista de alternativa 2D repite todo lo que muestra la vista 3D | 1.3.1 Información y relaciones | La misma información no debe depender de que WebGL renderice con éxito |
| El texto visible del botón inicia el nombre accesible (por ejemplo, "Select: Jade stone") | 2.5.3 Etiqueta en el nombre | Importa aún más con etiquetas traducidas, donde un `aria-label` desalineado es fácil de introducir por accidente |
| La autorrotación de la piedra de jade se puede pausar, y empieza pausada bajo `prefers-reduced-motion` | 2.2.2 Pausar, detener, ocultar | Es movimiento que empieza por sí solo, no en respuesta a una acción de la persona usuaria |
| Cada control es alcanzable y operable solo con teclado | 2.1.1 Teclado | La selección, la pausa y el selector de idioma son todos elementos reales y enfocables |
| El foco siempre es visible | 2.4.7 Foco visible | Se mantiene desde la regla `:focus-visible` de la hoja de estilos compartida, en cada idioma |
| El contraste de color cumple AA en cada idioma | 1.4.3 Contraste (mínimo) | Un texto más largo en español o más pequeño en chino no debe forzar un peso de fuente más claro y de menor contraste para caber |
| El aviso de traducción borrador se anuncia | 4.1.3 Mensajes de estado | `role="status"` en el aviso de borrador para que cambiar a un idioma en borrador se anuncie sin mover el foco |

## Consideraciones de rendimiento

Las etiquetas dibujadas en canvas son económicas comparadas con cargar una fuente personalizada: tres canvases pequeños (uno por pedestal), cada uno redibujado solo cuando cambia el idioma, no en cada cuadro. Descartar el `CanvasTexture` y el `SpriteMaterial` anteriores antes de crear los siguientes (en `setLabel()`) evita que cambiar de idioma repetidamente filtre memoria de GPU, la misma disciplina de descarte que el intercambio de modelos en `web3d-developer/06`. Formatear con objetos `Intl` no es gratis: `i18n.js` crea un `Intl.NumberFormat`/`Intl.DateTimeFormat`/`Intl.RelativeTimeFormat` nuevo por cada llamada en lugar de guardar uno por idioma en caché, lo cual está bien a la escala de esta app (los redibujados solo ocurren al cambiar de idioma o al seleccionar, no en cada cuadro), pero vale la pena guardarlo en caché en una app que formatea cientos de valores por segundo.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Construir una oración concatenando palabras traducidas (`t('the') + ' ' + t('item')`) | El orden de las palabras se rompe en cualquier idioma que ordene las palabras distinto al inglés | Traduce la oración completa, con `{marcadores}` para las partes que cambian |
| Escribir `if (count === 1)` en lugar de usar `Intl.PluralRules` | Incorrecto para idiomas con más categorías plurales que el inglés, e incorrecto en silencio (sin verse roto) para el chino, que no tiene ninguna | Usa `Intl.PluralRules(locale).select(count)` y un objeto de mensaje con las formas que un idioma realmente necesita |
| Un botón o etiqueta de ancho fijo para texto traducido | El texto en español o en alemán, más largo, se recorta o se superpone | Anchos flexibles, `flex-wrap`, sin `white-space: nowrap` en texto traducido |
| Suponer que una pila de fuentes latinas cubre el chino | El chino se renderiza en una fuente de respaldo, o como cajas de tofu, y puede tomar una inclinación cursiva falsa | Una pila con prioridad CJK bajo `:lang(zh-Hans)`, con `font-style: normal !important` |
| Marcar una traducción automática o de primera pasada como terminada | Un tono incorrecto, una formalidad incorrecta, o errores directos llegan a quienes aprenden de verdad | Mantén `draft: true` y el aviso visible hasta que una persona hablante nativa lo haya revisado en contexto |

## Solución de problemas

**El texto en chino muestra cajas o la fuente equivocada.** Tu sistema operativo puede no tener instalada una fuente china. Windows incluye Microsoft YaHei por defecto; en Linux, instala `fonts-noto-cjk` (gratis) o agrega Noto Sans SC de Google como fuente web si esto debe funcionar sin ninguna fuente del sistema instalada.

**Cambiar de idioma no persiste después de recargar.** Algunos navegadores bloquean `localStorage` en una ventana privada/de incógnito; `i18n.js` ya captura eso y recurre a detectar el idioma del navegador cada vez, lo cual es esperado, no un error.

**Firefox muestra una fuente de respaldo monoespaciada/serif distinta a Chrome para `:lang(zh-Hans)`.** Esta lección solo configura una pila sans-serif, así que no debería importar; si tú misma agregas texto chino con serif, pruébalo en el panel de ajustes de fuentes de Firefox (`about:preferences#general` → Fonts), ya que su elección de fuente por script vive en un lugar distinto al de Chrome.

**La salida de `Intl.RelativeTimeFormat` de Safari se lee raro para conteos de días muy grandes.** Esto es esperado: la solución de referencia cambia de días a meses a años a partir de umbrales fijos específicamente para evitar decir "hace 412 días"; revisa los umbrales de `formatOpenedRelative` si tus propios números se ven extraños.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: agrega un cuarto dato formateado con `Intl` (una hora de apertura) al panel de estadísticas, en los tres idiomas.
2. **[Creativo](challenges/challenge-2.es.md)**: reemplaza un objeto de la exhibición por uno de tu propia cultura, o agrega un cuarto idioma propio.
3. **[Explorador](challenges/challenge-3.es.md)**: escribe una comprobación automática de desbordamiento (overflow) que detecte los problemas de expansión de texto que expone la pseudolocalización.

## Cómo entregar tu trabajo

1. Trabaja [`tests/checklist.md`](tests/checklist.md) en los tres idiomas, con la pseudolocalización activada y desactivada.
2. Toma una captura de pantalla de la exhibición en cada uno de los tres idiomas, y una con la pseudolocalización activada.
3. Guárdalas en tu diario de aprendizaje y portafolio. Cuando abra la comunidad de XR Camp, compártelas ahí.
4. Pregunta de diario: ¿cuál cadena, objeto o decisión de layout se rompió primero al activar la pseudolocalización, y qué te dice eso sobre escribir texto de interfaz antes de haber pensado en la traducción?

## Lecturas adicionales

- [MDN: Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) (en inglés) — la referencia completa de `NumberFormat`, `DateTimeFormat`, `RelativeTimeFormat`, `PluralRules` y `Locale`.
- [W3C Internationalization: Localization vs. Internationalization](https://www.w3.org/International/questions/qa-i18n) (en inglés) — las definiciones sobre las que se construye el primer objetivo de esta lección.
- [Unicode CLDR](https://cldr.unicode.org/) (en inglés) — los datos de idioma (formatos de número, reglas de plural, patrones de fecha) sobre los que se construyen las implementaciones de `Intl`.
- [MDN: CSS :lang() pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:lang) (en inglés) — cómo funcionan los selectores CSS que dependen del idioma.
- [IETF BCP 47 / RFC 5646](https://www.rfc-editor.org/info/bcp47) (en inglés) — la especificación detrás de las etiquetas de idioma (`en`, `es`, `zh-Hans`) usadas en toda esta lección.

## Mujeres que conviene conocer

Irma Alvarez Ccoscco es una poeta quechua, educadora y activista del idioma digital, de Haquira, en la región de Apurímac, Perú, cuyo trabajo se centra en llevar software a su idioma materno. En 2010 tradujo la interfaz de casi 35.000 palabras de la plataforma de e-learning Chamilo al quechua cuzqueño, y luego localizó los juegos educativos infantiles TuxMath y TuxType, dibujando arte andino original para sus versiones KunturMat y KunturQillqa. En 2013 organizó un equipo de ocho voluntarios, trabajando con Mozilla Perú, para empezar a traducir Firefox al quechua cuzqueño.

Su trabajo es un recordatorio de que la localización no se trata solo de los grandes idiomas mundiales con los que empieza un proyecto. Las mismas APIs de `Intl`, el mismo pensamiento sobre pilas de fuentes, y la misma disciplina de QA de traducción que esta lección practica con español y chino aplican igual de bien a un idioma hablado por unos pocos millones de personas que a uno hablado por mil millones, y un idioma con mucho menos software ya localizado lo necesita todavía más.

> **Nota editorial: verificar antes de publicar.** Los datos biográficos de las secciones «Mujeres que conviene conocer» deben verificarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

Tres organismos distintos sustentan todo en esta lección: el BCP 47 del IETF (RFC 5646) define la sintaxis de las etiquetas de idioma (`en`, `es-419`, `zh-Hans`) que usan `<html lang>`, `Intl`, y la propia lista `LOCALES` de esta lección; el Consorcio Unicode publica tanto el propio Estándar Unicode (el conjunto de caracteres que le permite a un navegador renderizar quechua, acentos del español, y caracteres chinos en un mismo documento) como CLDR, los datos de idioma (reglas de plural, formatos de fecha, agrupación de números) sobre los que se construyen las implementaciones de `Intl` de los navegadores; y la Actividad de Internacionalización del W3C publica buenas prácticas específicas para la web, incluyendo la guía sobre `:lang()`, salto de línea, y tipografía CJK que sigue el CSS de esta lección.

## Licencia

Code: [`LICENSE-CODE`](../../LICENSE-CODE) · Content: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
