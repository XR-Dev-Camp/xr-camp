# Ética, accesibilidad, privacidad e IA responsable

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `preface` · **Lección:** `ethics-accessibility-privacy-and-responsible-ai-08` · **Tiempo:** unas 7 horas · 10 sesiones de 45 minutos · unas 3 semanas con 4 sesiones por semana

---

> Audita una experiencia digital y publica tu compromiso personal de desarrollo ético.

---

## Objetivos de aprendizaje

Al terminar este proyecto serás capaz de:

1. Explicar por qué las decisiones de quienes desarrollan pueden ayudar o hacer daño a personas reales.
2. Describir qué son la discapacidad y la accesibilidad, y los cuatro principios de WCAG.
3. Aplicar la minimización de datos y reconocer cuándo el consentimiento no es real.
4. Nombrar y reconocer patrones de diseño engañosos comunes.
5. Describir los riesgos particulares de las experiencias inmersivas y cómo reducirlos.
6. Explicar cómo los sistemas de IA pueden tener sesgos y por qué las personas deben saber cuándo están hablando con una IA.
7. Respetar los derechos de autor, dar crédito al trabajo de otras personas y comprobar de dónde viene el contenido.
8. Escribir un compromiso personal sobre cómo vas a construir.

## Requisitos previos

- **Cursos 0.1–0.7.** En particular, conociste WCAG en el Curso 0.4.

## Herramientas necesarias

| Herramienta | Para qué sirve | Costo |
| --- | --- | --- |
| Un navegador moderno | El sitio que auditas y tu reporte | Gratis |
| Un editor de texto sin formato | Escribir tu reporte y tu compromiso | Gratis |
| Tu teclado | Hacer pruebas sin mouse | Gratis |

## Lo que vas a construir

Un reporte de auditoría ética de **MegaDeals**, una tienda en línea ficticia hecha para esta lección con problemas puestos a propósito, y tu propio **compromiso**: las promesas que haces sobre todo lo que vas a construir.

La solución de referencia en [`completed/`](completed/) es el reporte y el compromiso de Ana. La tienda está en [`starter/shop-demo.html`](starter/shop-demo.html). Está mal hecha a propósito: no copies nada de ella.

## Guía de carpetas

```text
08-ethics-accessibility-privacy-and-responsible-ai/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/
│   ├── index.html       # Begin here: your report, with 7 TODOs
│   └── shop-demo.html   # The fictional shop you audit
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Configuración

1. Copia la carpeta `starter` de esta lección dentro de tu carpeta `xr-camp` y cambia el nombre de la copia a `ethics-audit`.
2. Abre `ethics-audit/shop-demo.html` en tu navegador: esto es lo que vas a auditar.
3. Abre `ethics-audit/index.html` en tu navegador y en tu editor de texto: este es tu reporte.

## La historia

### La tecnología no es neutral

Cada decisión que toma quien desarrolla define quién puede usar un producto, qué hace ese producto con la información de las personas y cómo las trata. Un botón construido como un `div` deja fuera a quienes usan el teclado. Una casilla ya marcada comparte los datos de alguien sin que esa persona lo haya elegido de verdad. Un sistema de reconocimiento facial entrenado sobre todo con rostros de piel clara falla más a menudo con los de piel oscura. Nada de esto necesita malas intenciones: basta con alguien que no se hizo las preguntas correctas. Esta lección trata de hacerse esas preguntas.

### Accesibilidad y discapacidad

La Organización Mundial de la Salud calcula que unos 1300 millones de personas, alrededor de una de cada seis, viven con una discapacidad importante. Algunas son ciegas o tienen baja visión; algunas son sordas o tienen dificultades para oír; algunas no pueden usar un mouse ni una pantalla táctil; a algunas les cuesta seguir páginas complejas. Muchas personas adquieren una discapacidad en algún momento de su vida, por la edad, una enfermedad o una lesión, y cualquier persona puede tener una limitación temporal: un brazo roto, el sol fuerte sobre la pantalla, un autobús ruidoso.

Las **Pautas de Accesibilidad para el Contenido Web (WCAG)** describen cómo construir para todas ellas, organizadas en torno a cuatro principios que a menudo se recuerdan con la sigla en inglés **POUR**:

- **Perceptible:** las personas pueden ver, oír o sentir el contenido. Las imágenes tienen alternativas en texto; los videos tienen subtítulos.
- **Operable:** las personas pueden usarlo: con un teclado, con tiempo suficiente, sin destellos que puedan provocar convulsiones.
- **Comprensible:** el contenido y los controles son claros y predecibles, y los errores se explican.
- **Robusto:** funciona con los navegadores y con las tecnologías de apoyo, hoy y en el futuro.

Has seguido estos principios desde tu primera lección. De aquí en adelante, también vas a hacer pruebas para comprobarlos.

### Privacidad y minimización de datos

Cada dato personal que recopilas es una responsabilidad: hay que guardarlo de forma segura, y puede ser robado, filtrado o mal usado. La regla más sencilla es la **minimización de datos**: recopila solo lo que necesitas, guárdalo solo el tiempo que lo necesites y nunca recopiles nada «por si acaso».

**Consentimiento** significa una elección real: dada libremente, con información y fácil de retirar. Una casilla que ya está marcada, un botón de «sí» más grande que el de «no» o un proceso de cancelación escondido detrás de llamadas telefónicas no son consentimiento real. Hoy muchos países tienen leyes de protección de datos, también en América Latina y en China, y cada vez más dicen lo mismo.

### Patrones de diseño engañosos

Los **patrones engañosos** (deceptive patterns, también llamados dark patterns, un nombre que acuñó el diseñador Harry Brignull en 2010) son diseños que engañan a las personas para que hagan cosas que no querían hacer. Algunos comunes:

| Patrón | Qué hace |
| --- | --- |
| **Urgencia y escasez falsas** (fake urgency and scarcity) | Cuentas regresivas y mensajes como «¡solo quedan 2!» que no son ciertos |
| **Costos ocultos** (hidden costs) | Cargos que aparecen solo en el último paso |
| **Avergonzar para que aceptes** (confirmshaming) | Hacerte sentir tonta por decir que no |
| **Casillas premarcadas** (pre-ticked boxes) | Aceptar en tu nombre, a menos que te des cuenta |
| **Difícil de cancelar** (hard to cancel) | Fácil de entrar, casi imposible de salir |
| **Insistencia** (nagging) | Preguntar una y otra vez hasta que cedes |

### Seguridad en entornos inmersivos

El 3D y la XR traen nuevas responsabilidades:

- **Comodidad.** El movimiento que no controlas puede causar mareo por movimiento. Nunca muevas la cámara por tu cuenta; ofrece modos para estar sentada y teletransporte.
- **Seguridad física.** Quien lleva puesto un visor no puede ver la habitación real. Mantén las experiencias al alcance de la mano y avisa antes de cualquier cosa que requiera moverse.
- **Espacio personal y acoso.** En los espacios compartidos, las personas necesitan formas de bloquear, silenciar, reportar y mantener a otras personas a distancia.
- **Datos sensibles.** Los visores pueden registrar el movimiento de la cabeza y las manos, la dirección de la mirada y la forma de las habitaciones, y eso puede revelar mucho sobre una persona. Trátalos como datos personales.

### Representación cultural

¿Quién aparece en tus imágenes, tus avatares y tus historias, y cómo? Muestra a las personas y las culturas, incluida la tuya, como ellas querrían que se las mostrara: no como estereotipos, disfraces ni decoración. Cuando cuentes la historia de otra persona o uses su herencia cultural, pídele permiso y dale crédito.

### Sesgos e IA responsable

Los sistemas de IA aprenden de datos, y los datos reflejan el mundo, incluidas sus injusticias. Un sistema entrenado sobre todo con un idioma, un acento o un tono de piel a menudo funciona peor para todas las demás personas. La IA responsable significa:

- **Hacer pruebas** con las personas que la van a usar, también en sus propios idiomas.
- **Avisar** cuando las personas están hablando con una IA, y para qué se usa.
- **Mantener a una persona responsable** de las decisiones importantes.
- **Revisar** lo que produce la IA antes de confiar en ello o publicarlo.

En el Curso 2.8 vas a usar la IA como asistente de desarrollo, exactamente con estas reglas.

### Derechos de autor y procedencia

Las imágenes, la música, los modelos 3D, las fuentes tipográficas y el código le pertenecen a alguien. Antes de usar algo, revisa su **licencia**: las licencias Creative Commons, por ejemplo, a menudo te piden dar crédito a quien lo creó, y algunas prohíben el uso comercial. Cada proyecto de XR Camp tiene un archivo `ATTRIBUTION.md` justo para esto.

**Procedencia** significa saber de dónde vino el contenido, y eso importa más ahora que la IA puede generar imágenes, voces y videos realistas. Di cuándo algo fue generado con IA, y ten cuidado con el contenido cuyo origen no puedes comprobar.

### El XR Guild

El **XR Guild** es una asociación profesional para quienes trabajan en XR, construida en torno a la práctica ética. Lee sus principios en su sitio web y compáralos con tu propio compromiso.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; lee **La tecnología no es neutral**; TODO 1–2 | Tu reporte abierto, con tu nombre |
| 2 | Lee **Accesibilidad y discapacidad**; prueba MegaDeals con tu teclado | Notas sobre lo que no pudiste hacer |
| 3 | TODO 3 | La tabla de accesibilidad |
| 4 | Lee **Privacidad y minimización de datos**; TODO 4 | La tabla de privacidad |
| 5 | Lee **Patrones de diseño engañosos**; TODO 5 | La tabla de patrones engañosos |
| 6 | Lee **Sesgos e IA responsable**; TODO 6 | La sección de IA |
| 7 | Lee **Seguridad**, **Representación**, **Derechos de autor** y **El XR Guild** | Notas para tu compromiso |
| 8 | TODO 7: tu compromiso | Un compromiso con tus propias palabras |
| 9 | [`tests/checklist.md`](tests/checklist.md) y luego el Reto 1: un sitio real | Una segunda auditoría |
| 10 | Otro reto y luego **Cómo entregar tu trabajo** | Tu reporte y tu compromiso en tu portafolio |

### Cómo hacer una auditoría

1. **Guarda el mouse.** Presiona **Tab** para recorrer toda la página. ¿Puedes llegar a todo y activarlo?
2. **Lee todo**, incluida la letra pequeña y el texto gris.
3. **Llena el formulario** (sin enviarlo). Para cada campo, pregúntate: ¿de verdad esta tienda necesita esto?
4. **Espera y recarga.** ¿Cambia algo que no debería cambiar?
5. **Pregúntate a quién se podría hacer daño**, y cómo lo arreglarías.

## Explicación del código clave

Esta lección trata sobre todo de criterio, no de código. Dos cosas para notar en `shop-demo.html`:

- **`<div class="buy" onclick="...">`** parece un botón, pero no lo es: no se puede alcanzar con Tab ni activar con Enter. Un `<button>` real trae todo eso gratis.
- **El script de la cuenta regresiva** pone el temporizador en 5:00 cada vez que se carga la página. Leer código como este es la forma de demostrar que la urgencia es falsa.

## Requisitos de accesibilidad

Para tu propio reporte:

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| Las tablas tienen título y encabezados | 1.3.1 | Los hallazgos mantienen su significado para quienes usan lector de pantalla. |
| Encabezados en orden | 1.3.1, 2.4.6 | Tu reporte es fácil de recorrer. |
| Los enlaces dicen adónde llevan | 2.4.4 | «MegaDeals», no «haz clic aquí». |
| `lang` coincide con tu idioma | 3.1.1 | Pronunciación correcta. |

## Consideraciones de rendimiento

La ética también incluye el costo: una página que descarga megabytes de rastreadores e imágenes les cuesta dinero real a las personas con datos limitados. Cuando audites un sitio real en el Reto 1, cuenta sus solicitudes en la pestaña Red (Network), como hiciste en el Curso 0.3.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Solo hacer una lista de problemas | El reporte no le sirve a nadie | Da una solución para cada problema |
| Culpar a las personas que lo hicieron | Se ponen a la defensiva y nada cambia | Describe el efecto en las personas y la solución |
| Auditar solo con el mouse | Se te escapa la barrera más común | Empieza siempre con el teclado |
| Escribir un compromiso que no puedes cumplir | No significa nada | Cinco promesas reales valen más que veinte vagas |

## Solución de problemas

**No encuentro los patrones engañosos.** Lee el texto gris, espera cinco minutos y recarga la página. Luego lee el script de la cuenta regresiva al final del archivo.

**Mis tablas se ven rotas.** Cada fila necesita `<tr>` y `</tr>`, y cada fila necesita la misma cantidad de celdas que el encabezado.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: audita un sitio web real que uses.
2. **[Creativo](challenges/challenge-2.es.md)**: escribe tu compromiso en tu propio idioma y compártelo con alguien.
3. **[Explorador](challenges/challenge-3.es.md)**: prueba si una herramienta de IA tiene sesgos en tu idioma.

## Cómo entregar tu trabajo

1. Completa todos los puntos de [`tests/checklist.md`](tests/checklist.md).
2. Toma una captura de pantalla de tu compromiso.
3. Guarda tu reporte en tu diario de aprendizaje. Cuando abra la comunidad de XR Camp, comparte allí tu compromiso.
4. En tu diario, responde: ¿qué hallazgo te gustaría más arreglar, y por qué?

## Lecturas adicionales

- [W3C: Introducción a la accesibilidad web](https://www.w3.org/WAI/fundamentals/accessibility-intro/) (en inglés)
- [W3C: WCAG 2 de un vistazo](https://www.w3.org/WAI/standards-guidelines/wcag/glance/) (en inglés)
- [Deceptive Design](https://www.deceptive.design/) (en inglés): ejemplos de patrones engañosos
- [Creative Commons: Acerca de las licencias](https://creativecommons.org/cc-licenses/) (en inglés)
- [XR Guild](https://xrguild.org/) (en inglés)

## Mujeres que conviene conocer

**Nina da Hora** es una científica de la computación brasileña, muy conocida como hacker antirracista («hacker antirracista»). Su investigación de maestría en la UNICAMP, terminada en 2026, estudió por qué los sistemas de reconocimiento facial y de visión por computadora fallan con los rostros de personas negras, y en 2020 fundó el Instituto da Hora, una organización sin fines de lucro que trabaja por los derechos digitales.

Su trabajo nos recuerda la primera idea de esta lección: la tecnología no es neutral. Preguntarse a quién le falla un sistema, y por qué, es parte del trabajo de quien desarrolla.

> **Nota editorial — verificar antes de publicar.** Las afirmaciones biográficas de las secciones Mujeres que conviene conocer deben contrastarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

**WCAG** lo redacta el Accessibility Guidelines Working Group del W3C, y es la base de las leyes de accesibilidad en muchos países. La versión actual, **WCAG 2.2**, se publicó en octubre de 2023. La siguiente generación, **WCAG 3**, se está redactando en público, y cualquier persona puede leer los borradores y enviar comentarios.

## Licencia

Código: [`LICENSE-CODE`](../../LICENSE-CODE) · Contenido: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
