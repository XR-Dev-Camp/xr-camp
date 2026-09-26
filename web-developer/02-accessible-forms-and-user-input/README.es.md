# Formularios accesibles y entrada de datos

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `web-developer` · **Lección:** `accessible-forms-and-user-input-02` · **Tiempo:** unas 7 horas · 10 sesiones de 45 minutos · unas 3 semanas con 4 sesiones por semana

---

> Crea un formulario accesible de inscripción y de comentarios.

---

## Objetivos de aprendizaje

Al terminar este proyecto serás capaz de:

1. Crear un formulario en el que cada campo tenga una etiqueta visible y vinculada en el código.
2. Elegir el tipo de campo y el valor de `autocomplete` correctos para cada dato.
3. Agrupar opciones relacionadas con `<fieldset>` y `<legend>`, y usar correctamente botones de opción, casillas de verificación y menús desplegables.
4. Marcar con claridad los campos obligatorios, con palabras y también en el código.
5. Usar la validación que ya trae el navegador y explicar sus límites.
6. Pedir solo los datos que necesitas y explicar cómo los vas a usar.
7. Llenar y enviar un formulario usando solo el teclado.

## Requisitos previos

- **Curso 1.1: Fundamentos de HTML.** Construiste el sitio del Riverside Community Centre (o el tuyo), y este formulario se suma a él.
- **Curso 0.8: Ética, accesibilidad, privacidad e IA responsable.** Sabes qué significan la minimización de datos y el consentimiento real.

## Herramientas necesarias

| Herramienta | Para qué sirve | Costo |
| --- | --- | --- |
| Un navegador moderno | Probar tu formulario | Gratis |
| Un editor de texto | Escribir HTML | Gratis |
| Un lector de pantalla: NVDA (Windows), VoiceOver (macOS, iOS) o TalkBack (Android) | Escuchar tu formulario | Gratis |

## Lo que vas a construir

Una página **Join a programme** (inscríbete en un programa) para tu sitio comunitario, con dos formularios:

1. Un **formulario de inscripción**: nombre, correo electrónico, un número de teléfono opcional, la elección de un programa, un día preferido, necesidades de accesibilidad y una casilla del boletín sin marcar, con una nota en lenguaje sencillo sobre cómo se usa la información.
2. Un **formulario de comentarios**: una calificación con palabras y un comentario opcional.

Como en el Curso 1.1, la página todavía no tiene CSS: le darás estilo en el Curso 1.3.

La solución de referencia está en [`completed/`](completed/). En tu propio sitio, guarda la página como `join.html`, junto a tu página de inicio, y enlázala desde tu navegación.

## Guía de carpetas

```text
02-accessible-forms-and-user-input/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html       # Begin here: a page with 9 TODOs
│   ├── thanks.html      # The page your forms send people to
│   └── 3d-moment.html   # This lesson's 3D moment
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Configuración

1. Copia `starter/index.html` en la carpeta de tu sitio del Curso 1.1 y cambia su nombre a `join.html`. Copia también `starter/thanks.html` ahí.
2. Agrega un enlace «Join a programme» a la navegación de tu página de inicio.
3. Abre `join.html` en tu navegador y en tu editor de texto.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; Paso 1 (TODO 1–2) | Un formulario con un campo etiquetado |
| 2 | Paso 2 (TODO 3) | Correo y teléfono, con pistas |
| 3 | Paso 3 (TODO 4) | La elección de un programa con botones de opción |
| 4 | Paso 4 (TODO 5) | Un menú desplegable y un área de texto |
| 5 | Paso 5 (TODO 6) | Campos obligatorios y validación integrada |
| 6 | Paso 6 (TODO 7) | Tu nota de privacidad y el botón de enviar |
| 7 | Paso 7 (TODO 8) | Un formulario de comentarios |
| 8 | Paso 8 (TODO 9), prueba con teclado y con lector de pantalla | Una página probada que funciona |
| 9 | El **Momento 3D** | Controles de formulario que cambian un objeto 3D |
| 10 | [`tests/checklist.md`](tests/checklist.md), un reto y **Cómo entregar tu trabajo** | Una página terminada |

### Paso 1: etiquetas (TODO 1–2)

```html
<form action="thanks.html" method="get">
  <fieldset>
    <legend>About you</legend>
    <p>
      <label for="name">Full name (required)</label><br>
      <input id="name" name="name" type="text" autocomplete="name" required>
    </p>
  </fieldset>
</form>
```

El `for` de la etiqueta debe coincidir con el `id` del campo. Ese vínculo hace tres cosas: un lector de pantalla anuncia «Full name, required, edit text» (nombre completo, obligatorio, editar texto); hacer clic en la etiqueta pone el cursor en el campo, lo que da un área más grande a las personas a quienes les tiemblan las manos; y quienes usan control por voz pueden decir «clic en Full name».

**El texto de marcador de posición (placeholder) no es una etiqueta.** Desaparece cuando escribes, suele ser demasiado pálido para leerlo y los lectores de pantalla no lo tratan como etiqueta. Usa siempre un `<label>` de verdad.

### Paso 2: el tipo correcto para cada campo (TODO 3)

| Dato | `type` | `autocomplete` | Qué le da a las personas |
| --- | --- | --- | --- |
| Nombre | `text` | `name` | El navegador puede llenarlo |
| Correo | `email` | `email` | Un teclado con `@` en el celular; una revisión del formato |
| Teléfono | `tel` | `tel` | Un teclado numérico en el celular |

`autocomplete` permite que el navegador llene lo que la persona ya escribió antes. Eso le ahorra tiempo a todo el mundo, y es especialmente importante para las personas con dificultades de memoria o motrices.

Agrega una breve **pista** que explique por qué lo pides y vincúlala con `aria-describedby`, para que los lectores de pantalla la lean después de la etiqueta:

```html
<span id="phone-hint">Only if you would like a text reminder before each session.</span>
<input id="phone" name="phone" type="tel" autocomplete="tel" aria-describedby="phone-hint">
```

### Paso 3: opciones (TODO 4)

Un grupo de opciones relacionadas necesita un `<fieldset>` y un `<legend>` que haga la pregunta. Los lectores de pantalla anuncian la leyenda cuando entras al grupo, y algunos la repiten con cada opción: «Which programme would you like to join? Homework club, radio button, 1 of 5» (¿En qué programa te gustaría inscribirte? Club de tareas, botón de opción, 1 de 5).

Los botones de opción que comparten un `name` forman un solo grupo: solo se puede elegir uno, y las flechas del teclado se mueven entre ellos.

### Paso 4: menús y respuestas más largas (TODO 5)

- Usa un **`<select>`** cuando hay muchas opciones y las personas eligen una. Pon primero una opción neutral («No preference», sin preferencia), para no obligar a nadie a una elección que no hizo.
- Usa un **`<textarea>`** para respuestas de más de una línea.

### Paso 5: campos obligatorios y validación (TODO 6)

Agrega `required` a los campos que se deben llenar, y dilo **con palabras** en la etiqueta: «(required)» (obligatorio). El color o un asterisco por sí solos no bastan.

Ahora presiona el botón de enviar con el formulario vacío. El navegador detiene el formulario, mueve el foco al primer problema y muestra un mensaje. Con `type="email"`, también revisa que el correo parezca un correo. Esta es la **validación integrada**: gratuita, rápida y accesible.

Tiene límites: los mensajes son del navegador, en el idioma del navegador, y desaparecen rápido. En el Reto 3 vas a construir un resumen de errores que se queda en la página.

### Paso 6: privacidad y consentimiento (TODO 7)

Pregúntate, para cada campo: **¿de verdad lo necesita el centro?** Necesita un nombre y una forma de contactarte. No necesita una fecha de nacimiento ni un número de identificación.

- El número de teléfono es opcional, y la pista dice por qué se pide.
- Las necesidades de accesibilidad son opcionales, y la pista dice «only share what you are comfortable sharing» (comparte solo lo que te haga sentir cómoda).
- La casilla del boletín está **sin marcar**. Marcada por defecto no es consentimiento.
- El elemento `<details>` contiene una nota breve y honesta: qué se recopila, para qué, cuánto tiempo se guarda, quién puede verlo y cómo pedir que se borre.

### Paso 7: un formulario de comentarios (TODO 8)

Construye el segundo formulario. Dale a la calificación **palabras** (de «Excellent», excelente, a «Very poor», muy mala), no solo números o estrellas, para que el significado sea claro para todo el mundo. Usa `maxlength` en la caja de comentarios y di el límite en la pista.

### Paso 8: envíalo y observa (TODO 9)

Llena y envía el formulario de inscripción. Mira la dirección web de la página de agradecimiento: tus respuestas están ahí, después del `?`. Eso es lo que hace `method="get"`. Está bien para este formulario de práctica, y nunca es aceptable para información personal real: los formularios reales usan `method="post"` y un servidor, que vas a construir en la Fase 5.

Después, prueba como una profesional:

1. **Solo con el teclado:** llena y envía los dos formularios sin mouse. **Tab** se mueve entre campos; la **barra espaciadora** marca las casillas; las flechas se mueven entre los botones de opción.
2. **Lector de pantalla:** activa uno y escucha cada campo. ¿Cada uno dice qué es y qué necesita?
3. **Zoom al 200 %:** ¿todo sigue cabiendo?

## Explicación del código clave

**`for` e `id`.** Dos atributos, un vínculo: la línea de código más importante de cualquier formulario.

**`fieldset` y `legend`.** Una pregunta y sus respuestas, juntas para todo el mundo.

**`aria-describedby`.** Vincula ayuda adicional a un campo, para que se lea después de la etiqueta. Apunta a un `id`, igual que `for`.

**`autocomplete`.** Usa valores estándar (`name`, `email`, `tel`, `street-address` y más), que aparecen en el estándar HTML. Están en inglés incluso en una página en otro idioma.

**`<button type="submit">`.** Un botón de verdad: se alcanza con **Tab** y se presiona con **Enter** o con la **barra espaciadora**. Nunca un `div` que finge ser botón, como el del Curso 0.8.

## Momento 3D

Abre [`starter/3d-moment.html`](starter/3d-moment.html). Los mismos controles de formulario que acabas de construir (un menú desplegable, un selector de color y un control deslizante) ahora cambian un objeto 3D: su forma, su color y su tamaño. Cuando cambian, la descripción de la escena también se actualiza y se anuncia.

Mira el script al final: cada control dispara un evento `input` cuando cambia. Tú misma vas a escribir código así en el Curso 1.6. Por ahora, fíjate en la idea: **los formularios son la forma en que las personas le hablan al software**, ya sea una lista de inscripción o un mundo 3D.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| Cada campo tiene una etiqueta visible y vinculada | 1.3.1, 3.3.2, 4.1.2 | Las personas saben para qué sirve cada campo. |
| Las opciones relacionadas usan `fieldset` y `legend` | 1.3.1 | La pregunta se lee con cada respuesta. |
| Los campos obligatorios se marcan con palabras | 3.3.2 | No solo con color o con un símbolo. |
| Los campos personales usan `autocomplete` | 1.3.5 | Los navegadores y las tecnologías de asistencia pueden llenarlos. |
| Los errores se identifican con un mensaje | 3.3.1 | Las personas saben qué salió mal. |
| No hay que volver a escribir nada que ya se ingresó | 3.3.7 | La entrada redundante es un criterio de WCAG 2.2. |
| Todo funciona con el teclado | 2.1.1 | Muchas personas nunca usan un mouse. |

## Consideraciones de rendimiento

Los formularios hechos con HTML simple son rápidos, funcionan en los celulares más viejos y siguen funcionando cuando JavaScript falla. La validación integrada que usaste no necesita nada de código. Agrega JavaScript a un formulario solo cuando HTML no puede hacer el trabajo.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Usar texto de marcador de posición en lugar de una etiqueta | La etiqueta desaparece mientras la persona escribe | Siempre un `<label>` visible |
| `for` e `id` no coinciden | El campo no tiene nombre para los lectores de pantalla | Revisa cómo escribiste los dos |
| Botones de opción con `name` distintos | Se puede elegir más de uno | Un solo `name` compartido por grupo |
| Marcar los campos obligatorios solo en rojo o con `*` | Quienes no pueden ver el color no lo notan | Escribe «(required)» |
| Pedir datos «por si acaso» | Riesgo, y menos confianza | Pide solo lo que necesitas |
| Marcar la casilla del boletín por las personas | No es consentimiento real | Déjala sin marcar |

## Solución de problemas

**Hacer clic en la etiqueta no pone el cursor en el campo.** El `for` de la etiqueta no coincide con el `id` del campo.

**El formulario se envía aunque un campo esté vacío.** Revisa que `required` esté en el propio campo, y que el campo esté dentro del `<form>`.

**El mensaje de error del navegador está en otro idioma.** Los mensajes integrados usan el idioma del navegador, no el de tu página. El Reto 3 muestra cómo escribir los tuyos.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: agrega un campo de fecha y un segundo menú, bien etiquetados.
2. **[Creativo](challenges/challenge-2.es.md)**: traduce tu formulario, incluidas sus pistas y su nota de privacidad.
3. **[Explorador](challenges/challenge-3.es.md)**: construye un resumen de errores que se queda en la página.

## Cómo entregar tu trabajo

1. Completa todos los puntos de [`tests/checklist.md`](tests/checklist.md).
2. Toma una captura de pantalla de tu formulario, y otra del navegador deteniendo un formulario vacío.
3. Guárdalas en tu diario de aprendizaje y en tu portafolio. Cuando abra la comunidad de XR Camp, compártelas también allí.
4. En tu diario, responde: ¿qué campo decidiste *no* pedir, y por qué?

## Lecturas adicionales

- [W3C: Tutorial de formularios](https://www.w3.org/WAI/tutorials/forms/) (en inglés)
- [MDN: Formularios web](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms) (en inglés)
- [MDN: El atributo `autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete) (en inglés)
- [GOV.UK Design System: Páginas de preguntas](https://design-system.service.gov.uk/patterns/question-pages/) (en inglés)

## Mujeres que conviene conocer

**Talita Pagani** es una especialista brasileña en UX y accesibilidad web. Durante su maestría en ciencias de la computación, creó **GAIA**, un conjunto abierto de 28 recomendaciones para diseñar interfaces web accesibles para personas autistas. Ha sido integrante del Grupo de Expertos en Accesibilidad Web del W3C Brasil.

Los formularios son el lugar donde muchas personas se traban: preguntas poco claras, errores inesperados y demasiadas cosas a la vez. Las recomendaciones de GAIA sobre lenguaje claro y comportamiento predecible son las mismas decisiones que tomaste en esta lección.

> **Nota editorial — verificar antes de publicar.** Las afirmaciones biográficas de las secciones Mujeres que conviene conocer deben contrastarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

Los formularios están definidos en el **HTML Living Standard** (WHATWG), incluidos todos los valores de `type` y de `autocomplete`. WCAG 2.2 agregó un criterio llamado **Entrada redundante** (Redundant Entry, 3.3.7): no hagas que las personas escriban la misma información dos veces en un mismo proceso.

## Licencia

Código: [`LICENSE-CODE`](../../LICENSE-CODE) · Contenido: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
