# Internet y la web

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `preface` · **Lección:** `the-internet-and-the-web-03` · **Tiempo:** unas 5 horas · 7 sesiones de 45 minutos · unas 2 semanas con 4 sesiones por semana

---

> Crea un diagrama interactivo que explica qué pasa cuando una persona visita un sitio web.

---

## Objetivos de aprendizaje

Al terminar este proyecto serás capaz de:

1. Explicar la diferencia entre internet y la web.
2. Describir qué hace cada uno: los clientes, los servidores y los navegadores.
3. Separar una dirección web en sus partes: esquema, dominio, ruta y consulta.
4. Explicar con palabras sencillas qué son el DNS y el hosting.
5. Describir una solicitud y una respuesta HTTP, y leer los códigos de estado más comunes.
6. Explicar la diferencia entre los sitios estáticos y los dinámicos, y entre el frontend y el backend.

## Requisitos previos

- **Curso 0.1: Bienvenida a XR Camp** y **Curso 0.2: Fundamentos de computación.**

## Herramientas necesarias

| Herramienta | Para qué sirve | Costo |
| --- | --- | --- |
| Un navegador moderno | Ver tu diagrama y usar sus herramientas para desarrolladores | Gratis |
| Un editor de texto sin formato | Escribir tus explicaciones | Gratis |

## Lo que vas a construir

Un diagrama interactivo de los nueve pasos que hay entre escribir una dirección web y ver la página, explicados con tus propias palabras. Funciona como una lista simple; con JavaScript, los botones **Next** (siguiente) y **Previous** (anterior) lo recorren un paso a la vez.

La solución de referencia en [`completed/`](completed/) es el diagrama de Ana. La estructura y los estilos ya vienen hechos en el punto de partida: tu trabajo es entender.

## Guía de carpetas

```text
03-the-internet-and-the-web/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/             # Begin here: a diagram with 9 TODOs
├── completed/           # Reference solution: open this last
├── challenges/          # Three optional extensions
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Configuración

1. Copia la carpeta `starter` de esta lección dentro de tu carpeta `xr-camp` y cambia su nombre a `how-the-web-works`.
2. Abre `how-the-web-works/index.html` en tu navegador y en tu editor de texto.
3. Presiona **Next step** (siguiente paso) unas cuantas veces. Cada paso tiene un encabezado y un `?` que espera tu explicación.

## La historia

### Internet y la web no son lo mismo

**Internet** es una red mundial de redes: cables bajo el mar, fibra óptica bajo las calles, enlaces de radio hasta tu celular y las reglas acordadas (llamadas protocolos) que permiten que cualquier computadora le envíe un mensaje a cualquier otra.

La **web** es una de las cosas que funcionan sobre internet: páginas unidas por enlaces que lees en un navegador. El correo electrónico, las videollamadas y los juegos en línea también usan internet sin formar parte de la web. En el Curso 0.4 viste cuándo se inventó cada una: internet creció a partir de la década de 1960; la web llegó en 1989–1990.

### Clientes, servidores y navegadores

Cada visita a un sitio web es una conversación entre dos computadoras:

- El **cliente** pregunta. Cuando navegas, el cliente es tu **navegador**: Chrome, Firefox, Edge, Safari.
- El **servidor** responde. Es una computadora, muchas veces en un centro de datos, cuyo trabajo es enviar páginas a cualquiera que las pida.

«Servidor» describe un trabajo, no un tipo especial de máquina. En la Fase 5 vas a convertir tu propia computadora en uno.

### Direcciones, nombres y números

Cada computadora conectada a internet tiene una **dirección IP** numérica, como `203.0.113.25`. Las personas recordamos mejor los nombres que los números, así que usamos **nombres de dominio** como `example.org`. Puedes rentar tu propio nombre de dominio a una empresa llamada registrador.

El **Sistema de Nombres de Dominio (DNS)** es la libreta de direcciones de internet: convierte nombres en números. Tu navegador le pregunta a un resolvedor de DNS, que normalmente administra tu proveedor de internet, «¿cuál es el número de `example.org`?», y recuerda la respuesta por un tiempo.

El **hosting** (alojamiento web) consiste en rentar espacio en un servidor para guardar los archivos de tu sitio web, de modo que esté en línea todo el tiempo. En el Curso 1.8 vas a publicar tu propio sitio gratis.

### Solicitudes y respuestas

El navegador y el servidor hablan usando **HTTP**, el Protocolo de Transferencia de Hipertexto (Hypertext Transfer Protocol). El navegador envía una **solicitud** («GET me this page», es decir, «tráeme esta página») y el servidor devuelve una **respuesta**: un código de estado y el contenido. La `s` de `https` significa que la conversación está cifrada, así que nadie entre tú y el servidor puede leerla ni cambiarla.

| Código de estado | Significado |
| --- | --- |
| `200` | OK: aquí está tu página |
| `301` | Movida: la página está en una dirección nueva |
| `404` | No encontrada |
| `500` | El servidor tuvo un problema |

### Estáticos y dinámicos, frontend y backend

Un sitio **estático** es un conjunto de archivos que se envían exactamente como están: las páginas que has construido hasta ahora son estáticas. Un sitio **dinámico** arma cada página en el momento en que la pides, muchas veces a partir de una base de datos: una red social le muestra a cada persona una página de inicio distinta en la misma dirección.

El **frontend** es todo lo que funciona en el navegador: HTML, CSS, JavaScript. El **backend** es todo lo que funciona en el servidor: bases de datos, cuentas, guardar tus datos. XR Camp enseña primero el frontend (Fases 1–4) y luego el backend (Fase 5). Una **aplicación web** combina los dos.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; lee **Internet y la web no son lo mismo** y **Clientes, servidores y navegadores**; TODO 1 | Tu diagrama abierto, con tu nombre |
| 2 | Lee **Direcciones, nombres y números**; TODO 2–3 | Tu propia dirección, separada en partes |
| 3 | TODO 4: pasos 1–2 | El nombre se convierte en un número |
| 4 | Lee **Solicitudes y respuestas**; TODO 5–6: pasos 3–6 | La conversación entre el navegador y el servidor |
| 5 | Lee **Estáticos y dinámicos**; TODO 7–8: pasos 7–9 | El recorrido completo |
| 6 | TODO 9 y luego [`tests/checklist.md`](tests/checklist.md) | Un diagrama terminado |
| 7 | Un reto adicional y luego **Cómo entregar tu trabajo** | Tu diagrama en tu portafolio |

### Cómo escribir cada paso

Para cada paso, escribe una o dos oraciones **con tus propias palabras**. Imagina que se lo explicas a una amiga que nunca ha pensado en eso. Si puedes explicarlo de forma sencilla, lo entiendes.

Luego presiona **Next step** (siguiente paso) y **Previous step** (paso anterior) para leer tu diagrama como lo va a leer quien lo visite.

## Explicación del código clave

**Los botones empiezan ocultos.** El elemento `controls` tiene el atributo `hidden`. El script lo quita solo después de haberse ejecutado. Si JavaScript falla o está desactivado, quienes visitan la página ven los nueve pasos como una lista normal, y nunca ven botones que no hacen nada. Esto se llama **mejora progresiva** (progressive enhancement): empieza con algo que funcione y luego mejóralo.

**`tabindex="-1"` y `focus()`.** Cuando presionas **Next step**, el script mueve el foco del teclado al paso nuevo. Así, un lector de pantalla lo lee de inmediato. `tabindex="-1"` permite que un elemento de la lista reciba el foco desde un script sin agregarlo al orden de la tecla Tab.

**`aria-live="polite"`.** El mensaje «Step 3 of 9» (paso 3 de 9) está en una región dinámica (live region), así que los lectores de pantalla lo anuncian cuando cambia.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| Funciona sin JavaScript | Buena práctica (no es una regla de WCAG) | Todas las personas que visitan la página reciben el contenido completo. |
| El foco se mueve al paso nuevo | 2.4.3 | Quienes usan el teclado o un lector de pantalla llegan a lo que cambió. |
| Los colores no son la única forma de distinguir las partes de la URL | 1.4.1 | Cada parte también se nombra en la lista que está debajo. |
| Los botones desactivados se ven claramente desactivados | 4.1.2 | Se ven distintos y están marcados con `disabled`, así que los lectores de pantalla lo dicen. |

## Consideraciones de rendimiento

La página no tiene imágenes, y su CSS y su script están dentro del archivo HTML, así que carga con una sola solicitud: solo el HTML. Cuenta las solicitudes de tu propia página en el Reto 3 y luego compáralas con las de un sitio de noticias grande.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Decir «internet» cuando quieres decir «la web» | Confusión más adelante, con el correo, los juegos y las aplicaciones | La web funciona sobre internet |
| Creer que un servidor es un tipo especial de computadora | Parece más difícil de lo que es | Un servidor es cualquier computadora que responde solicitudes |
| Copiar las oraciones de la guía | Terminas sin entender | Escribe cada paso con tus propias palabras |

## Solución de problemas

**Los botones no aparecen.** Revisa que no hayas borrado el `<script>` del final y que cada `<li>` siga teniendo su `</li>` de cierre.

**Next step muestra un recuadro vacío.** Borraste el texto de un paso. Deshaz el cambio, o vuelve a copiar el paso desde el punto de partida.

## Retos adicionales

Tres extensiones opcionales, en [`challenges/`](challenges/):

1. **[Fundamento](challenges/challenge-1.es.md)**: separa en partes cinco direcciones web reales.
2. **[Creativo](challenges/challenge-2.es.md)**: sigue el recorrido de los cables submarinos que llevan internet a tu país.
3. **[Explorador](challenges/challenge-3.es.md)**: cuenta las solicitudes de una página real en las herramientas para desarrolladores de tu navegador.

## Cómo entregar tu trabajo

1. Completa todos los puntos de [`tests/checklist.md`](tests/checklist.md).
2. Toma una captura de pantalla de tu diagrama en un solo paso, y otra con todos los pasos a la vista.
3. Guarda las dos en tu diario de aprendizaje. Cuando abra la comunidad de XR Camp, compártelas también allí.
4. En tu diario, responde: ¿qué paso te sorprendió más?

## Lecturas adicionales

- [MDN: How the web works](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works) (en inglés): cómo funciona la web.
- [MDN: An overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview) (en inglés): una introducción a HTTP.
- [MDN: What is a domain name?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_domain_name) (en inglés): qué es un nombre de dominio.

## Mujeres que conviene conocer

**Hu Qiheng (胡启恒)** dirigió el proyecto que le dio a China su primera conexión completa a internet, el 20 de abril de 1994. Como vicepresidenta de la Academia China de Ciencias, convenció a la Fundación Nacional de Ciencias de Estados Unidos (US National Science Foundation) de permitirlo. En 1997 fundó el Centro de Información de la Red de Internet de China (China Internet Network Information Center, CNNIC), que administra los nombres de dominio `.cn` de China: el mismo tipo de libreta de direcciones que conociste en esta lección. En 2013 entró al Internet Hall of Fame (Salón de la Fama de Internet).

Cada paso de tu diagrama depende de que las redes estén conectadas entre sí. Para cientos de millones de personas, esa conexión empezó con el trabajo de Hu Qiheng.

> **Nota editorial — verificar antes de publicar.** Las afirmaciones biográficas de las secciones Mujeres que conviene conocer deben contrastarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

HTTP lo mantiene el **IETF** (Internet Engineering Task Force, el Grupo de Trabajo de Ingeniería de Internet) y está descrito en documentos llamados RFC, que cualquier persona puede leer. El DNS también es un estándar del IETF, y la **ICANN** coordina los nombres de dominio y las direcciones IP en todo el mundo. Vas a volver a encontrarte con estas organizaciones en el Curso 0.7.

## Licencia

Código: [`LICENSE-CODE`](../../LICENSE-CODE) · Contenido: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
