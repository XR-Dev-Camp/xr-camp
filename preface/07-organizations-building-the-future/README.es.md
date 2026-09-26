# Organizaciones que construyen el futuro

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `preface` · **Lección:** `organizations-building-the-future-07` · **Tiempo:** unas 6 horas · 8 sesiones de 45 minutos · unas 2 semanas con 4 sesiones por semana

---

> Crea un mapa interactivo del ecosistema que conecta las organizaciones de estándares con las tecnologías.

---

## Objetivos de aprendizaje

Al terminar este proyecto serás capaz de:

1. Explicar qué es un estándar web y por qué la web los necesita.
2. Nombrar las organizaciones que están detrás de las tecnologías que vas a usar en XR Camp, y qué hace cada una.
3. Describir cómo una idea se convierte en un estándar.
4. Encontrar una forma real y gratuita de participar tú misma.

## Requisitos previos

- **Curso 0.4: Historia de la web** y **Curso 0.5: Historia de la Web3D.** Ya conoces al W3C, el WHATWG, Khronos y el Web3D Consortium.

## Herramientas necesarias

| Herramienta | Para qué sirve | Costo |
| --- | --- | --- |
| Un navegador moderno | Tu mapa, y el sitio web de cada organización | Gratis |
| Un editor de texto sin formato | Escribir tu mapa | Gratis |

## Lo que vas a construir

Un mapa interactivo de diez organizaciones: qué hace cada una, de qué tecnologías se encarga y cómo pueden participar las personas. Quienes lo visiten pueden filtrarlo por tecnología («muéstrame quién está detrás de la XR»). Debajo del mapa explicas cómo se hace un estándar y eliges una forma en la que vas a participar.

La solución de referencia en [`completed/`](completed/) es el mapa de Ana.

## Guía de carpetas

```text
07-organizations-building-the-future/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/             # Begin here: the map, with 5 TODOs
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Configuración

1. Copia la carpeta `starter` de esta lección dentro de tu carpeta `xr-camp` y cambia el nombre de la copia a `who-builds-the-web`.
2. Abre `who-builds-the-web/index.html` en tu navegador y en tu editor de texto.
3. Prueba los botones de filtro. La tarjeta del W3C está completa; las demás te están esperando.

## La historia

### Por qué la web necesita estándares

Una página que escribes hoy funciona en Chrome, Firefox, Safari y Edge, en Windows, Android y iPhone, en Lima y en Chengdu. Eso no es casualidad. Funciona porque las empresas que hacen navegadores se pusieron de acuerdo en reglas compartidas, llamadas **estándares**, y las escribieron donde cualquier persona puede leerlas.

Sin estándares, cada navegador se comportaría de forma distinta y tendrías que construir cada página varias veces. Con ellos, construyes una sola vez, para todo el mundo.

### Las organizaciones

| Organización | Qué hace | Tecnologías que vas a usar |
| --- | --- | --- |
| **W3C**, el World Wide Web Consortium | Fundado por Tim Berners-Lee en 1994. Redacta la mayoría de los estándares web. | CSS, WCAG, SVG, WebXR, WebGPU |
| **WHATWG** | Formado por las empresas que hacen navegadores en 2004. Mantiene el HTML Living Standard, que el W3C también respalda. | HTML, DOM, Fetch, URL |
| **Ecma International** | Su comité TC39 mantiene ECMAScript, el estándar que está detrás de JavaScript. | JavaScript |
| **IETF**, el Internet Engineering Task Force | Redacta los protocolos de internet en documentos llamados RFC. | HTTP, TLS, DNS |
| **Khronos Group** | Un consorcio de empresas que redacta estándares de gráficos y 3D. | WebGL, glTF, OpenXR, KTX |
| **Web3D Consortium** | Se encarga de X3D, que nació de VRML. | X3D |
| **Open Geospatial Consortium (OGC)** | Redacta estándares para mapas y datos de ubicación. | Servicios de mapas web, CityGML, 3D Tiles |
| **Metaverse Standards Forum** | Fundado en 2022. Reúne a organismos de estándares y empresas; no redacta estándares por su cuenta. | Coordinación entre estándares |
| **Open Source Initiative (OSI)** | Mantiene la Definición de Código Abierto (Open Source Definition) y aprueba las licencias de código abierto. | Licencias de código abierto |
| **XR Guild** | Una asociación profesional para quienes trabajan en XR, centrada en la ética. | Principios éticos para la XR |

Fíjate en que algunas tecnologías que esperarías encontrar juntas no lo están: **WebGL** viene de Khronos, pero **WebGPU**, su sucesora, viene del W3C. Saber quién se encarga de qué te dice dónde buscar respuestas y dónde reportar problemas.

### Cómo se hace un estándar

Los detalles cambian de una organización a otra, pero el camino es parecido:

1. **Una idea.** Alguien tiene un problema que la web todavía no puede resolver.
2. **Incubación.** Las personas describen en público el problema y las posibles soluciones, a menudo en un **Grupo de Comunidad** (Community Group) del W3C o en un documento breve llamado **explainer** (explicación).
3. **Un grupo de trabajo** acepta redactar una **especificación**: una descripción precisa de cómo debe comportarse la tecnología.
4. **Borradores y revisión amplia.** Personas expertas revisan el borrador en cuanto a accesibilidad, privacidad, seguridad e internacionalización.
5. **Implementaciones y pruebas.** Los navegadores la construyen, y un conjunto de pruebas compartido comprueba que todos se comporten igual.
6. **Un estándar.** Cuando funciona de forma interoperable, es decir, en más de un navegador, se convierte en una Recomendación del W3C (W3C Recommendation).

Esto lleva años, a propósito: una vez que millones de sitios web dependen de un estándar, casi nunca se puede cambiar.

### Tú puedes participar

Los estándares no los escriben solo las grandes empresas. Muchas organizaciones tienen puertas de entrada abiertas y gratuitas:

- **Los Grupos de Comunidad del W3C** son gratuitos y cualquier persona puede unirse, incluido el Immersive Web Community Group, donde nacen las ideas de WebXR.
- **El WHATWG y el TC39** discuten su trabajo en público en GitHub, donde cualquier persona puede leer y comentar.
- **El IETF** no tiene membresía: cualquier persona puede unirse a sus listas de correo.
- **Reportar un error** en un navegador, o una equivocación en documentación como MDN, es una contribución real.

Otras, como Khronos y el Web3D Consortium, son organizaciones con membresía, pero publican sus especificaciones para que todo el mundo las use.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración; lee **Por qué la web necesita estándares**; TODO 1 | Tu mapa abierto, con tu nombre |
| 2 | Lee **Las organizaciones**; TODO 2 para las primeras cuatro tarjetas | La mitad del mapa |
| 3 | TODO 2 para las tarjetas restantes, visitando el sitio web de cada organización | Todas las tarjetas explicadas |
| 4 | TODO 3: agrega OSI y XR Guild | Un mapa de diez organizaciones |
| 5 | Lee **Cómo se hace un estándar**; TODO 4 | El camino de la idea al estándar |
| 6 | Lee **Tú puedes participar**; TODO 5 | Tu propio plan para participar |
| 7 | [`tests/checklist.md`](tests/checklist.md) | Un mapa terminado |
| 8 | Un reto adicional y luego **Cómo entregar tu trabajo** | Tu mapa en tu portafolio |

### Cómo agregar una tarjeta (TODO 3)

Copia una tarjeta completa, desde `<li class="org"` hasta su `</li>`, y pégala al final de la lista. Cambia el nombre, la oración, las tecnologías y la información sobre cómo unirse.

Luego define su `data-tags` para que los filtros la encuentren: `open` para código abierto y ética, y además `xr` para el XR Guild. Los botones de filtro leen estas etiquetas.

## Explicación del código clave

**`data-tags`.** Los atributos que empiezan con `data-` los inventas tú. Aquí guardan a qué filtros pertenece cada tarjeta. El script los lee y, fuera de eso, los navegadores los ignoran.

**`aria-pressed` en los botones de filtro.** Un filtro es un botón que se queda activado. `aria-pressed="true"` les indica a los lectores de pantalla que está seleccionado, y el CSS usa ese mismo atributo para darle color: una sola fuente de verdad para las dos cosas.

**El conteo en una región activa (live region).** «Showing 3 of 10 organisations» (mostrando 3 de 10 organizaciones) se anuncia cuando cambia, para que quienes usan lector de pantalla sepan que el filtro funcionó.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| Funciona sin JavaScript | Buena práctica (no es una regla de WCAG) | Todas las personas que visitan la página ven todas las organizaciones. |
| El estado del filtro se expone con `aria-pressed` | 4.1.2 | Los lectores de pantalla dicen qué filtro está activado. |
| Los resultados del filtro se anuncian | 4.1.3 | Los mensajes de estado llegan a todo el mundo. |
| Los filtros seleccionados se distinguen por algo más que el color | 1.4.1 | El botón seleccionado se ve relleno, no solo de otro color. |

## Consideraciones de rendimiento

Diez tarjetas, un script pequeño y ninguna imagen: la página carga al instante. Filtrar oculta tarjetas en vez de volver a cargar algo, así que también es instantáneo.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Suponer que una sola organización es dueña de «la web» | Buscas respuestas en el lugar equivocado | Averigua quién mantiene cada tecnología |
| Olvidar `data-tags` en una tarjeta nueva | La tarjeta nunca aparece al filtrar | Dale a cada tarjeta al menos una etiqueta |
| Copiar las descripciones de cada sitio web | No las recuerdas | Una oración, con tus propias palabras |

## Solución de problemas

**Mi tarjeta nueva no aparece con ningún filtro.** Revisa su `data-tags`: las palabras deben coincidir exactamente con los valores `data-filter` de los botones, en minúsculas.

**Los botones de filtro no aparecen.** Revisa que no hayas borrado el `<script>` del final.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: encuentra tres estándares que usaste hoy sin saberlo.
2. **[Creativo](challenges/challenge-2.es.md)**: agrega una organización de tu propia región.
3. **[Explorador](challenges/challenge-3.es.md)**: únete a un Grupo de Comunidad del W3C.

## Cómo entregar tu trabajo

1. Completa todos los puntos de [`tests/checklist.md`](tests/checklist.md).
2. Toma una captura de pantalla de tu mapa con el filtro **XR** activado.
3. Guárdala en tu diario de aprendizaje. Compártelas con otras personas que programan: consulta [dónde compartir tu trabajo y pedir ayuda](../../docs/en/community.md) (en inglés).
4. En tu diario, responde: ¿con qué organización te gustaría más trabajar algún día, y por qué?

## Lecturas adicionales

- [W3C: Los estándares y el proceso](https://www.w3.org/standards/) (en inglés)
- [WHATWG: Preguntas frecuentes](https://whatwg.org/faq) (en inglés)
- [TC39: Cómo evoluciona JavaScript](https://tc39.es/) (en inglés)
- [Grupos de Comunidad del W3C](https://www.w3.org/community/) (en inglés)

## Mujeres que conviene conocer

**Xiaoqian Wu (吴小倩)** se unió al W3C en 2013 y desde 2018 es la responsable de la oficina del W3C en China (W3C China), además de Directora de Relaciones con los Miembros de China del W3C. Es la persona de contacto del equipo del W3C para los grupos de trabajo Web Applications y Web Editing y para el Chinese Web Interest Group, y fue la persona de contacto del MiniApps Working Group hasta que este cerró en 2026.

Ese último grupo es importante para quienes están aprendiendo: los estándares web deben funcionar para todos los idiomas y sistemas de escritura, y personas como Wu se aseguran de que las necesidades del idioma chino formen parte de la conversación desde el principio.

> **Nota editorial — verificar antes de publicar.** Las afirmaciones biográficas de las secciones Mujeres que conviene conocer deben contrastarse con fuentes primarias y, cuando sea posible, confirmarse con la persona antes de publicar la lección. Consulta [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md).

## Estándar destacado

Toda esta lección es un estándar destacado. Un detalle más que vale la pena conocer: el proceso del W3C exige una **revisión amplia** (wide review) de cada especificación, incluida la de grupos dedicados a la accesibilidad y la internacionalización, antes de que pueda convertirse en estándar. La web está construida para incluir a las personas desde el diseño, no como algo que se agrega al final.

## Licencia

Código: [`LICENSE-CODE`](../../LICENSE-CODE) · Contenido: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
