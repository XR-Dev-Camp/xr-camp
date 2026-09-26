# La IA como asistente de desarrollo

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `frontend-engineer` · **Lección:** `ai-as-a-development-assistant-08` · **Tiempo:** unas 10 horas · 14 sesiones de 45 minutos · unas 4 semanas con 4 sesiones por semana

---

> Completa y documenta una revisión de código asistida por IA sin renunciar a tu propia comprensión.

---

## Objetivos de aprendizaje

Al terminar este proyecto serás capaz de:

1. Elegir un asistente de IA que funcione donde vives: uno alojado en la nube, uno chino, o un **modelo local** en tu propia computadora.
2. Decidir qué puedes **compartir** con un asistente y qué nunca debes pegar: secretos, datos personales y código que no tienes derecho a compartir.
3. Mantener tu **comprensión primero**: explicar el código con tus propias palabras antes de preguntar, predecir antes de ejecutar, y pedir explicaciones, no solo soluciones.
4. **Verificar** cada afirmación de un asistente contra una fuente primaria (MDN, una especificación o la documentación oficial de una librería), y detectar APIs que no existen.
5. Dar a cada sugerencia un **veredicto** (aceptada, modificada o rechazada), con la evidencia, y llevar un registro honesto de cómo usaste la IA.
6. Probar la accesibilidad **tú misma**, con el teclado y un lector de pantalla, porque un asistente que lee código no puede escuchar lo que dice un lector de pantalla.
7. Comparar qué tan bien responde un asistente en inglés, español y chino.

## Requisitos previos

- **Curso 2.3: Arquitectura de aplicaciones y código mantenible.** El código que revisas es el planificador de sesiones que refactorizaste ahí.
- **Curso 0.8: Ética, accesibilidad, privacidad e IA responsable**, con las reglas que esta lección pone en práctica.
- **Curso 1.8: Git, GitHub y publicación**, para poder confirmar cada cambio por separado.

## Herramientas necesarias

| Herramienta | Para qué sirve | Costo |
| --- | --- | --- |
| Un navegador moderno, con sus herramientas de desarrollo | Ejecutar el planificador y probar afirmaciones en la consola | Gratis |
| VS Code y un servidor local | Los módulos necesitan `http://` | Gratis |
| Git | Un commit por cada cambio aceptado, para poder deshacerlo | Gratis |
| Un asistente de IA: alojado, o un modelo local | El asistente con el que harás la revisión (ver Paso 2) | Muchos ofrecen un nivel gratuito; revisa los términos vigentes |
| Un lector de pantalla: NVDA (Windows), VoiceOver (macOS, iOS) o TalkBack (Android) | Paso 7: probar lo que el asistente no puede | Gratis |

La lección en sí no exige ninguna cuenta. Si no puedes, o no quieres, usar un asistente, un modelo local funciona sin cuenta, y una compañera o mentora puede hacer de asistente (ver **Solución de problemas**).

## Lo que vas a construir

No es una parte nueva de **My XR Camp**: es una **revisión de código asistida por IA**, documentada, que retoma la tercera parte, tu planificador de sesiones del Curso 2.3.

Le pedirás a un asistente de IA que explique y revise una pequeña parte de tu código, y verificarás cada respuesta. Anotas qué preguntaste, qué respondió, qué verificaste, tu fuente, tu veredicto y qué aprendiste. Al final, publicas la revisión como una página web pequeña y accesible, y llevas un **registro de uso de IA** de cada vez que usaste un asistente.

Lo importante no son las respuestas del asistente. Es lo que puedes demostrar sobre ellas.

La solución de referencia en [`completed/`](completed/) es la revisión de Ana, con siete elementos (dos aceptados, dos modificados y tres rechazados), y el planificador con sus dos cambios. El punto de partida trae el planificador, plantillas para la revisión y el registro, un ejercicio práctico sobre APIs inventadas, y la página de revisión, con catorce TODO.

## Guía de carpetas

```text
08-ai-as-a-development-assistant/
├── README.md            # Esta guía
├── README.es.md         # Español
├── README.zh-Hans.md    # Chino simplificado
├── project.json         # Metadatos de la lección
├── starter/
│   ├── planner/         # El código bajo revisión: el planificador de 2.3
│   ├── ai-log.md        # Tus reglas y tu registro de uso de IA: TODO 1–2
│   ├── review.md        # La revisión en sí: TODO 3–5, 8–10, 13
│   ├── invented-apis.md # Una respuesta de IA inventada para verificar: TODO 6–7
│   ├── index.html       # La revisión, como página web: TODO 11–12
│   ├── styles.css       # Terminado
│   └── 3d-moment.html   # Una escena de three.js y una explicación de IA para verificar: TODO 14
├── completed/           # La revisión de Ana: ábrela al final
├── challenges/          # Tres extensiones
├── tests/checklist.md   # Autorrevisión antes de entregar
├── assets/
└── screenshots/
```

## Configuración

1. Crea una carpeta nueva, `ai-review`, junto a tu carpeta `my-xr-camp`, y copia ahí los archivos del punto de partida.
2. Si terminaste tu propio planificador en el Curso 2.3, reemplaza `planner/` con una copia del tuyo. Es tu código: tienes derecho a compartirlo, y sabes qué debería hacer.
3. Convirtela en un repositorio Git y confirma el punto de partida sin tocar: `git init`, luego `git add .` y `git commit -m "Starter"`.
4. Inicia tu servidor local. Abre `planner/index.html` y `planner/check.html`, y comprueba que cada línea de `check.html` diga PASS antes de empezar.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; Paso 1: las reglas primero (TODO 1) | Tus reglas de IA, en `ai-log.md` |
| 2 | Paso 2: elige un asistente (TODO 2) | Un asistente que funcione donde vives, y tu primera entrada de registro |
| 3 | Paso 3: lee el código tú misma (TODO 3–4) | Tu propia explicación de `store.js`, escrita antes de cualquier IA |
| 4 | Paso 4: pide explicaciones (TODO 5) | Dos elementos de revisión, cada uno con veredicto |
| 5 | Paso 5: APIs inventadas (TODO 6) | Cuatro afirmaciones verificadas contra MDN |
| 6 | Paso 5, continuación (TODO 7) | Cada afirmación probada en la consola |
| 7 | Paso 6: pide una revisión (TODO 8) | Tres elementos de revisión más |
| 8 | Paso 6, continuación: aplica lo que aceptaste | Un commit por cambio, y `check.html` sigue pasando |
| 9 | Paso 7: accesibilidad con IA, y sin ella (TODO 9) | Notas de teclado y lector de pantalla, y un elemento más |
| 10 | Paso 8: otros idiomas (TODO 10) | La misma pregunta en dos idiomas, comparada |
| 11 | Paso 9: publica la revisión (TODO 11–12) | La revisión como página web |
| 12 | Paso 9, continuación (TODO 13) | Lo que aprendiste, y una página que pasa la lista de verificación |
| 13 | El **Momento 3D** (TODO 14) | Cada afirmación de three.js verificada contra la documentación |
| 14 | [`tests/checklist.md`](tests/checklist.md), el desafío Fundamento, y luego **Cómo entregar tu trabajo** | Una tercera parte de My XR Camp revisada y mejorada |

### Paso 1: las reglas primero (TODO 1)

Un **asistente de IA** es un programa entrenado con enormes cantidades de texto y código. Predice una respuesta probable a lo que escribes. Suele ser útil, y suele equivocarse, con la misma voz segura. No busca nada por su cuenta a menos que la herramienta diga que lo hace, e incluso entonces puede malinterpretar lo que encontró.

Antes de pegar algo en uno, decide tus reglas. Escríbelas al principio de `ai-log.md`:

- **Nunca pegues secretos**: contraseñas, claves de API, tokens, archivos `.env`, claves privadas. Asume que todo lo que pegas se almacena, puede ser leído por personas de la empresa, y puede usarse para entrenar futuros modelos, a menos que los términos digan claramente lo contrario.
- **Nunca pegues datos personales**: nombres, correos, números de teléfono, direcciones, o los datos guardados de cualquier persona. Las sesiones guardadas de tu planificador también son datos personales.
- **Solo pega código que tienes derecho a compartir**: el tuyo propio, o código cuya licencia lo permita. No el código de una compañera, ni el de un empleador o cliente, sin permiso.
- **Sigue las reglas de tu escuela o tu empleador.** Muchas tienen una política de IA. Donde sea más estricta que la tuya, gana ella. Si no estás segura, pregunta.
- **Di dónde te ayudó la IA.** En esta lección, eso lo hace el registro. En tu portafolio, basta una frase: «Usé un asistente de IA para revisar este código, y verifiqué cada sugerencia».

**¿A quién pertenece el código que escribe una IA?** Depende del país, y la ley todavía está cambiando. Los términos de uso de cada asistente dicen qué permiten. El código generado a veces puede parecerse mucho a código existente que tiene su propia licencia. Los hábitos seguros: mantén los fragmentos generados pequeños, entiende cada línea, y di dónde te ayudó la IA.

### Paso 2: elige un asistente (TODO 2)

Hay tres tipos. Cualquiera de ellos funciona para esta lección.

| Tipo | Ejemplos | Bueno saber |
| --- | --- | --- |
| **Alojados, de empresas occidentales** | ChatGPT, Claude, Gemini, Microsoft Copilot | Se ejecutan en las computadoras de la empresa. Muchos no son accesibles desde China continental. |
| **Alojados, de empresas chinas** | Qwen (千问, antes 通义), DeepSeek, Kimi, Doubao (豆包) | Generalmente accesibles desde China continental, y a menudo buenos en chino. Algunos pueden ser más difíciles de usar desde otros lugares. |
| **Modelos locales**, en tu propia computadora | Ollama o LM Studio, ejecutando un modelo de pesos abiertos | Nada de lo que escribes sale de tu computadora, y funciona sin conexión una vez descargado. Necesita una computadora reciente con bastante memoria; los modelos suelen pesar varios gigabytes. Los modelos más pequeños se equivocan más. |

Muchos ofrecen un nivel gratuito; revisa los términos vigentes, incluida cualquier edad mínima. Qué servicios son accesibles, y cuánto cuestan, cambia seguido y varía según el país, así que revisa qué funciona donde estás, hoy. Algunos asistentes también funcionan dentro de tu editor de código; para esta lección, basta una ventana de chat, porque quieres ver y registrar cada pregunta.

Ningún asistente tiene siempre la razón, y ninguno es el «seguro». El método de esta lección es el mismo para todos.

En `ai-log.md`, escribe qué asistente elegiste y por qué, y agrega tu primera entrada de registro. A partir de ahora, registra cada conversación: la fecha, el asistente, qué pediste, qué compartiste y qué conservaste.

### Paso 3: lee el código tú misma (TODO 3–4)

**La comprensión primero.** Si preguntas antes de leer, no puedes distinguir una buena respuesta de una mala.

Elige una parte **pequeña**: uno o dos archivos, de menos de unas 200 líneas. Ana eligió `store.js` y `main.js`. Escribe tu alcance al principio de `review.md` (TODO 3).

Luego lee tus archivos sin ningún asistente abierto, y explícalos con tus propias palabras (TODO 4). Para `store.js`: ¿qué guarda? ¿Quién puede modificarlo? ¿Qué pasa, en orden, cuando alguien presiona **Done**? Anota como pregunta todo lo que no entiendas. Esas preguntas se convierten en tus primeros prompts (instrucciones para la IA).

### Paso 4: pide explicaciones (TODO 5)

Ahora abre el asistente. Cuatro hábitos te mantienen a cargo:

1. **Prompts pequeños.** Una pregunta, un fragmento de código. «Explica esta función» es mejor que «revisa mi app».
2. **Pide explicaciones, no solo soluciones.** «¿Por qué funciona esto?» te enseña. «Arréglalo» solo te da código que tú no escribiste.
3. **Explícalo de vuelta.** Después de una respuesta, escríbela con tus propias palabras, sin mirarla. Si no puedes, pregunta otra vez, de otra manera.
4. **Predice antes de ejecutar.** Antes de probar una afirmación, escribe qué esperas que pase. Luego ejecútalo. Una predicción equivocada es donde ocurre el aprendizaje.

Un buen primer prompt se ve así:

```text
I am learning JavaScript. Here is one function from my own project.
Explain what the line with || does, step by step, with an example.
Do not rewrite the code.

export function bySchedule(a, b) {
  return DAYS.indexOf(a.day) - DAYS.indexOf(b.day) || a.time.localeCompare(b.time);
}
```

Puedes probar código de la página real en la **consola** del navegador. En la página del planificador, esto carga el mismo store que usa la página:

```js
const store = await import('./js/store.js');
const stop = store.subscribe((sessions) => console.log('Now', sessions.length));
```

Agrega una sesión, y observa el mensaje. Luego llama a `stop()`, agrega otra, y observa que no pasa nada.

Completa dos elementos de revisión (TODO 5), uno por pregunta. Cada uno tiene seis partes: **qué pregunté**, **qué respondió**, **qué verifiqué**, **fuente**, **veredicto**, y **qué aprendí**.

| Veredicto | Significa |
| --- | --- |
| **Aceptada** | Verificada, correcta, y usada tal cual. |
| **Modificada** | Parcialmente correcta: la usaste después de corregirla o adaptarla. |
| **Rechazada** | Equivocada, inventada, o no adecuada para este código, y puedes demostrar por qué. |

«Verificado» significa algo que puedes señalar: una página de documentación, una especificación, una prueba que hiciste, o una predicción que comparaste. «Sonaba bien» no es una verificación.

### Paso 5: APIs inventadas (TODO 6–7)

A veces los asistentes **inventan** cosas: un método que no existe, una opción que ninguna función acepta, o una regla sobre cómo se comporta el navegador que no es cierta. Casi siempre se ve exactamente como código real, con un nombre plausible. A esto se le suele llamar **alucinación** (hallucination).

Abre [`starter/invented-apis.md`](starter/invented-apis.md). Es una «respuesta de IA» sobre el planificador, **inventada por XR Camp como ejemplo de práctica**, con cuatro afirmaciones. Algunas son incorrectas. Para cada una (TODO 6):

1. Busca el método o comportamiento en **MDN** (developer.mozilla.org). MDN documenta los estándares web, en varios idiomas, incluidos español y chino.
2. Escribe qué dice MDN, con tus propias palabras, y enlaza a la página.
3. Da tu veredicto.

Luego prueba cada afirmación en la consola (TODO 7). Tres pruebas rápidas:

```js
'focusNext' in HTMLElement.prototype   // Does the method exist at all?
localStorage.getItem('no-such-key')    // What do you get for a missing key?
[3, 1, 2].sort((a, b) => a - b, { copy: true })   // Does an extra argument do anything?
```

Fíjate en la tercera. JavaScript ignora silenciosamente los argumentos adicionales, así que una opción inventada no causa **ningún error**. El código se ejecuta, y en silencio hace lo incorrecto. Por eso «se ejecutó» no es lo mismo que «es correcto».

### Paso 6: pide una revisión (TODO 8)

Ahora pídele al asistente que revise tu código, un archivo a la vez:

```text
Review this JavaScript module from my own learning project.
List possible bugs, security problems, and unclear code.
For each one, say how confident you are, and why.
Explain; do not rewrite the whole file.
```

Por cada hallazgo, escribe un elemento de revisión (TODO 8): al menos tres más. Algunos hallazgos serán ciertos en general, pero no en tu código. El asistente de Ana advirtió que `toggleSession` fallaría si un id no existiera. Cierto, pero en su planificador, cada id proviene de un botón dibujado desde el store un momento antes. Conocer tu código es lo que te permite decir «aquí no, y esta es la razón».

Luego aplica lo que aceptaste o modificaste, **un cambio por commit**, y ejecuta `check.html` después de cada uno. Si una verificación falla, sabes exactamente qué cambio la causó: haz `git restore` del archivo, o `git revert` del commit.

### Paso 7: accesibilidad con IA, y sin ella (TODO 9)

Pregúntale al asistente: «¿Este formulario es accesible? ¿Qué escucharía una persona que usa lector de pantalla?». Registra la respuesta. Puede ser útil. También puede estar equivocada, porque un asistente lee código, y la accesibilidad se trata de lo que la gente realmente experimenta.

Luego pruébalo tú misma:

1. **Solo con teclado.** Desconecta el mouse, o no lo toques. Agrega una sesión, márcala como hecha, elimínala. ¿Siempre puedes ver dónde está el foco?
2. **Lector de pantalla.** Activa NVDA, VoiceOver o TalkBack. Haz las mismas tres cosas. Luego presiona **Enter** en la casilla de tema vacía. ¿Qué escuchas?

Escribe lo que dijo el asistente y lo que encontraste, uno junto al otro (TODO 9). El asistente de Ana dijo que el formulario «parece accesible». Su lector de pantalla no dijo absolutamente nada cuando presionó Enter en la casilla de tema vacía, porque el foco ya estaba ahí. Ver el elemento 7 de su revisión.

### Paso 8: otros idiomas (TODO 10)

Los asistentes suelen estar entrenados con más inglés que cualquier otro idioma, así que sus respuestas en otros idiomas pueden ser más débiles, o simplemente distintas. Haz de nuevo una de tus preguntas anteriores, en español, en chino, o en tu propio idioma. Compara:

- ¿La explicación sigue siendo **correcta**?
- ¿Los términos técnicos están traducidos, en inglés, o mezclados? Verifícalos contra MDN en ese idioma.
- ¿El código es el mismo? ¿Los comentarios están traducidos?
- ¿Con cuál respuesta preferirías aprender?

Escribe tu comparación en `review.md` (TODO 10). No hay un resultado correcto: estás reuniendo evidencia.

### Paso 9: publica la revisión (TODO 11–13)

`index.html` convierte tu revisión en una página que otra persona puede leer. Tiene:

- Una **tabla resumen**: una fila por elemento de revisión, con su veredicto. En una pantalla angosta, la tabla se desplaza hacia los lados dentro de su propio recuadro, y la página no. El recuadro puede recibir el foco del teclado, así que se puede desplazar sin usar el mouse.
- **Una sección por elemento**, con las seis partes en una lista de descripción (`<dl>`).
- Veredictos en **palabras**, con un borde. El color solo ayuda.
- Cualquier cita en otro idioma marcada con `lang`, por ejemplo `<span lang="es">`, para que un lector de pantalla la pronuncie correctamente.

Completa la tabla (TODO 11) y las secciones (TODO 12). Luego termina `review.md` con lo que aprendiste (TODO 13): ¿qué hizo bien el asistente, dónde se equivocó, y usarías la IA de la misma manera la próxima vez?

## Explicación del código clave

**`await import('./js/store.js')` en la consola.** Una importación dinámica carga un módulo desde la consola. Como la página ya cargó el mismo archivo, obtienes el **mismo** módulo, con el mismo estado, así que puedes probar el store real.

**`'focusNext' in HTMLElement.prototype`.** Los métodos de cada elemento viven en su prototipo. `in` pregunta «¿existe este nombre en algún lugar de él?». `false` significa que el navegador que estás usando no tiene este método, diga lo que diga un asistente. Consulta MDN para ver si algún navegador lo tiene.

**`<div class="table-scroll" role="region" aria-labelledby="summary-caption" tabindex="0">`.** `tabindex="0"` permite que las personas que usan teclado enfoquen el recuadro y lo desplacen con las flechas. `role="region"` con un nombre le dice a quienes usan lector de pantalla en qué han aterrizado.

**`<th scope="col">` y `<th scope="row">`.** Encabezados de columnas y filas, para que un lector de pantalla pueda decir «Veredicto: Rechazada» a medida que recorres la tabla.

**`THREE.MathUtils.degToRad(30)`** en el Momento 3D. three.js mide la rotación en radianes; un giro completo es `2 * Math.PI`. `degToRad` te permite escribir el ángulo tal como lo piensas.

## Momento 3D

Abre [`starter/3d-moment.html`](starter/3d-moment.html): un nudo tórico morado, iluminado desde arriba a la derecha, girando lentamente. Debajo está el código, y una «explicación de IA» del código, **inventada por XR Camp** para practicar. Algunas de sus siete afirmaciones son incorrectas.

Verifica cada afirmación contra la documentación oficial de three.js en [threejs.org/docs](https://threejs.org/docs/) (en inglés) (TODO 14). Busca el nombre de la clase, como `DirectionalLight`, y lee su descripción. Donde puedas, también prueba la afirmación: cambia un valor, recarga, mira, y vuelve a cambiarlo. Prueba reemplazar `MeshStandardMaterial` por `MeshBasicMaterial`, o quitar `degToRad`. ¿Te habrías sentido cómoda viendo el resultado?

three.js es una librería, no un estándar web, así que MDN no la documenta: su propia documentación es la fuente primaria. Luego compara con [`completed/3d-moment.html`](completed/3d-moment.html), donde Ana verificó cada afirmación.

Por último, hazlo de verdad: pídele a tu propio asistente que explique el mismo código, registra la conversación, y verifica su respuesta de la misma manera.

La escena se describe a sí misma en texto, empieza quieta si tu dispositivo pidió reducir el movimiento, y tiene un botón **Pause animation** (pausar animación) que detiene por completo el bucle de animación.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| La tabla resumen tiene un título (`caption`) y encabezados de columna y fila | 1.3.1 | La estructura está disponible para los lectores de pantalla, no solo visible. |
| El recuadro de desplazamiento de la tabla puede recibir el foco y tiene nombre | 2.1.1, 4.1.2 | Las personas que usan teclado pueden desplazarlo, y saben qué es. |
| La página nunca se desplaza hacia los lados a 320 píxeles CSS; solo el recuadro de la tabla puede hacerlo | 1.4.10 | Las tablas de datos son una de las excepciones que permite el reacomodo (reflow). |
| Los veredictos son palabras, con el color como segunda señal | 1.4.1 | Nadie tiene que distinguir el verde del rojo. |
| Las citas en otros idiomas tienen `lang` | 3.1.2 | Los lectores de pantalla cambian de pronunciación. |
| Encabezados en orden: un `h1`, secciones `h2`, elementos `h3` | 1.3.1 | Las personas pueden recorrer la revisión por encabezado. |
| Los errores del planificador se anuncian | 3.3.1, 4.1.3 | El elemento 7 de Ana: el mensaje también debe llegar a quienes usan lector de pantalla. |
| La escena 3D tiene una descripción en texto, se puede pausar, y respeta la reducción de movimiento | 1.1.1, 2.2.2 | La información y el movimiento nunca se le imponen a nadie. |

## Consideraciones de rendimiento

Un **modelo local** usa tu propio procesador y memoria. En una laptop más antigua, las respuestas pueden ser lentas, y tus otros programas más lentos aún. Cierra lo que no necesites, y elige un modelo más pequeño si le cuesta. Un asistente alojado usa casi nada de tu computadora, pero necesita conexión.

Las sugerencias de los asistentes tampoco son gratis. Revisa qué agregan a tu página: una librería nueva «solo para esto», una segunda copia de la misma función, o un listener agregado en cada render. Pregunta «¿cuánto cuesta esto?» tanto como «¿funciona?».

El Momento 3D gira según `velocidad × segundos` desde el último fotograma, así que gira a la misma velocidad en una pantalla de 60 Hz y una de 120 Hz. **Pause** pasa `null` a `setAnimationLoop`, así que no se dibuja ningún fotograma mientras está quieta.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Pegar un proyecto entero | Respuestas largas y vagas, y quizás secretos que no notaste | Un fragmento pequeño a la vez |
| Pedir «arréglalo» | Obtienes código que no puedes explicar | Pregunta por qué, y arréglalo tú misma |
| «Se ejecutó, así que está bien» | Las opciones inventadas fallan en silencio | Verifica la documentación, y prueba lo que debería hacer |
| Confiar en una respuesta segura de sí misma | Las respuestas incorrectas suenan igual de seguras | Cada afirmación necesita una fuente |
| Aceptar varios cambios en un solo commit | Cuando algo se rompe, no puedes saber cuál fue | Un cambio por commit |
| Rechazar sin evidencia | Tu veredicto es solo una opinión | Enlaza la página, o muestra la prueba |
| Saltarse el lector de pantalla porque la IA dijo «accesible» | Las barreras reales siguen ahí | Pruébalo con las herramientas reales de las personas |
| Registrar solo las buenas respuestas | El registro deja de ser honesto | Registra cada uso, incluidos los inútiles |

## Solución de problemas

**El asistente que quería no está disponible donde vivo.** Prueba uno del otro grupo del Paso 2, o un modelo local. Si ninguno funciona, una compañera, mentora o grupo de estudio puede hacer de asistente: responden tus preguntas, y las verificas exactamente de la misma manera.

**El modelo local es muy lento, o no arranca.** Elige un modelo más pequeño en Ollama o LM Studio, cierra otros programas, y revisa tu espacio libre en disco.

**El asistente se niega, o da una respuesta muy corta.** Haz el prompt más pequeño, di que estás aprendiendo, y pega solo el código sobre el que preguntas.

**MDN no menciona el método en absoluto.** Eso también es evidencia. Busca en MDN, y luego pruébalo con `in` en la consola. Si ambos salen en blanco, casi seguro el método no existe.

**`await import(...)` falla en la consola.** Ejecútalo en la propia página del planificador, servida por `http://`, y revisa la ruta: `./js/store.js` es relativa a la página.

**`check.html` falla después de un cambio.** Restaura el archivo (`git restore planner/js/utils.js`), y vuelve a mirar qué hizo el cambio.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)** (obligatorio): revisa un archivo pequeño más, de principio a fin, incluyendo al menos un rechazo con evidencia.
2. **[Creativo](challenges/challenge-2.es.md)**: haz una revisión completa en tu propio idioma, y arma un glosario de los términos que usó el asistente, verificado contra MDN en ese idioma.
3. **[Explorador](challenges/challenge-3.es.md)**: pon una trampa. Pregúntale a varios asistentes, incluido un modelo local, sobre una API que no existe, y compara cuáles te lo dicen.

## Cómo entregar tu trabajo

1. Completa todos los puntos de [`tests/checklist.md`](tests/checklist.md).
2. Toma una captura de pantalla de tu página de revisión, y otra de `check.html` con todas las verificaciones en verde.
3. Guarda esas capturas, tu `review.md`, tu `ai-log.md`, y tu Momento 3D verificado en tu diario de aprendizaje y tu portafolio. Compártelos con otras personas que programan (consulta [dónde compartir tu trabajo](../../docs/en/community.md), en inglés).
4. En tu diario, responde: ¿qué afirmación incorrecta habrías creído sin verificarla, y qué harás diferente la próxima vez que le pidas ayuda a un asistente?

## Lecturas adicionales

- [MDN Web Docs](https://developer.mozilla.org/): la referencia que usas para verificar, también disponible en español y chino
- [MDN: Storage.getItem()](https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem) (en inglés)
- [MDN: HTMLElement.focus()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) (en inglés)
- [MDN: regiones dinámicas de ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions) (en inglés)
- [Documentación de three.js](https://threejs.org/docs/) (en inglés)
- [W3C: la IA y la web](https://www.w3.org/reports/ai-web-impact/) (en inglés)
- [W3C WAI: verificaciones rápidas, una primera revisión de accesibilidad web](https://www.w3.org/WAI/test-evaluate/preliminary/) (en inglés)

## Mujeres que conviene conocer

**Danqi Chen 陈丹琦** es profesora asociada de ciencias de la computación en Princeton, donde codirige el Princeton NLP Group y es directora asociada de Princeton Language and Intelligence. Es de Changsha, en Hunan, y cuando era estudiante de secundaria ahí ganó una medalla de oro en la Olimpiada Internacional de Informática (IOI) de 2008.

Su doctorado en Stanford, sobre comprensión lectora neuronal, ayudó a dar forma a la investigación en respuesta de preguntas, y ahora trabaja con grandes modelos de lenguaje (LLM), el tipo de tecnología detrás de los asistentes de esta lección. Cuando le haces una pregunta a un asistente y verificas su respuesta, estás trabajando en el mismo problema desde el otro lado.

_Datos de fuentes públicas, verificados en 2026. ¿Encontraste un error? [Avísanos](https://github.com/XR-Dev-Camp/xr-camp/issues)._

## Estándar destacado

Cuando verificas a un asistente, necesitas algo contra qué verificarlo. Para la web, eso son los estándares: los estándares **HTML** y **DOM** de WHATWG (`focus()`, `localStorage`), **ECMAScript** de Ecma International (`Array.prototype.sort`), y las **WCAG** y **WAI-ARIA** del W3C. MDN los documenta, con notas sobre qué navegadores admiten cada función. Si un método no está en los estándares ni en MDN, ningún navegador está obligado a tenerlo.

El W3C también está observando a la IA misma. Su informe de 2024, **AI & the Web** (la IA y la web), analiza cómo los modelos de aprendizaje automático afectan a la web, y posibles áreas de trabajo para estándares futuros. Es un informe, no un estándar. El **Web Machine Learning Working Group** del W3C desarrolla APIs para ejecutar modelos de aprendizaje automático en el navegador.

## Licencia

Código: [`LICENSE-CODE`](../../LICENSE-CODE) · Contenido: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
