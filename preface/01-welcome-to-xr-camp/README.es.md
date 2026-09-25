# Bienvenida a XR Camp

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `preface` · **Lección:** `welcome-to-xr-camp-01` · **Tiempo:** unas 2 horas · 3 sesiones de 45 minutos · 1 semana con 4 sesiones por semana

---

> Construye tu primer mundo 3D en tu primera hora y luego haz un plan de estudio que encaje en tu vida.

---

## Bienvenida

XR Camp es una escuela gratuita para personas que quieren construir la web del futuro: sitios web que puedes recorrer, mundos 3D que funcionan en un navegador y experiencias en las que puedes entrar con un visor. Está pensada ante todo para mujeres de América Latina y China, y es gratuita para todo el mundo.

No necesitas experiencia. Muchas de las personas que empiezan hoy nunca han escrito código. Aun así, al terminar esta primera sesión habrás construido un mundo 3D.

## Objetivos de aprendizaje

Al terminar este proyecto serás capaz de:

1. Abrir en un navegador una página web guardada en tu propia computadora.
2. Cambiar una escena 3D editando su código y ver el resultado.
3. Explicar por qué un mundo 3D necesita una descripción en texto, y escribir una.
4. Hacer un plan realista de cuándo y cómo vas a estudiar.

## Requisitos previos

Ninguno. Aquí es donde empieza todo el mundo.

## Herramientas necesarias

| Herramienta | Para qué sirve | Costo |
| --- | --- | --- |
| Una computadora con un navegador moderno (Firefox, Chrome, Edge o Safari) | Ver tu mundo | Gratis |
| Un editor de texto sin formato: Bloc de notas (Windows), TextEdit (Mac) o [VS Code](https://code.visualstudio.com/) | Cambiar tu mundo | Gratis |
| Una conexión a internet, la primera vez que abras la página | Descargar A-Frame, la herramienta 3D | Gratis |
| Tu diario de aprendizaje: un cuaderno, o la plantilla del Diario de aprendizaje de XR Camp | Tu plan y tus reflexiones | Gratis |

**¿Usas TextEdit en una Mac?** Abre **Formato → Convertir en texto normal** antes de guardar. Si no, TextEdit guarda sin avisar códigos de formato dentro de tu archivo y la página deja de funcionar.

## Lo que vas a construir

Un pequeño jardín 3D que puedes mirar y recorrer, con tu nombre: tus colores, tus figuras y una descripción escrita para que las personas que no pueden verlo puedan imaginarlo de todos modos.

La solución de referencia en [`completed/`](completed/) es la versión de Ana: un cielo rosa de atardecer, tres figuras sobre el césped y una luna que sube y baja suavemente.

Después, en la sesión 3, vas a construir algo igual de importante: un plan para que XR Camp quepa en tu semana real.

## Guía de carpetas

```text
01-welcome-to-xr-camp/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/             # Begin here: a 3D world with 6 TODOs
├── completed/           # Reference solution: open this last
├── challenges/          # Three optional extensions
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Configuración

1. Descarga esta carpeta de proyecto, o descarga todo el repositorio como ZIP.
2. Crea una carpeta llamada `xr-camp` en un lugar donde puedas volver a encontrarla: tu carpeta Documentos es una buena opción; tu carpeta Descargas, no.
3. Copia dentro la carpeta `starter` y cambia el nombre de la copia a `my-first-world`.
4. Abre `my-first-world/index.html` en tu **navegador**: haz doble clic en el archivo o usa **Archivo → Abrir archivo**. Al cabo de un momento aparece un jardín 3D.
5. Abre el mismo archivo en tu **editor de texto**: haz clic derecho sobre él y elige **Abrir con**.

Pon las dos ventanas una al lado de la otra. Cada vez que guardes en el editor, recarga el navegador. Ese ciclo (editar, guardar, recargar) es la forma en que trabaja cualquier persona que desarrolla para la web, y tú acabas de empezar a hacerlo.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Configuración y luego los TODO 1–4 | Un mundo 3D con tu nombre, tu cielo y tus colores |
| 2 | TODO 5–6 y luego la lista de comprobación | Tu propia figura y una descripción que coincide con ella |
| 3 | **Haz tu plan** | Un plan de estudio semanal en tu diario de aprendizaje |

El punto de partida tiene seis comentarios `TODO` numerados. Busca cada uno en tu editor y haz lo que dice.

### Paso 1: Ponle tu nombre (TODO 1–2)

Cambia el texto dentro de `<title>` y dentro de `<h1>` por tu propio nombre, por ejemplo `Ana's first 3D world`.

Guarda y recarga. La pestaña del navegador y el encabezado muestran ahora tu nombre. El título es también lo primero que dice un lector de pantalla cuando se abre la página.

### Paso 2: Cambia el cielo (TODO 3)

```html
<a-sky color="#f6d6e0"></a-sky>
```

`#f6d6e0` es un color escrito como código. Prueba algunos: `#1b1b3a` es de noche, `#ffd8a8` es un amanecer. Busca en internet «selector de color» para encontrar el código de cualquier color que te guste.

### Paso 3: Mueve una figura (TODO 4)

```html
<a-box position="-1.5 0.5 -4" color="#5b2a86"></a-box>
```

Los tres números de `position` son **izquierda/derecha**, **arriba/abajo** y **cerca/lejos**. Cambia un número a la vez, guarda y recarga para ver qué hace. Los números negativos de cerca/lejos quedan delante de ti.

Esta es la idea detrás de todo el 3D: cada objeto tiene una posición en el espacio, descrita con tres números. La vas a usar durante el resto del programa.

### Paso 4: Agrega tu propia figura (TODO 5)

Copia la línea completa `<a-box ...></a-box>`, pégala donde indica el TODO 5 y cambia `a-box` por `a-cone` en **los dos** lugares. Dale un color nuevo y una posición nueva.

¿No aparece nada? Revisa que hayas cambiado tanto la etiqueta de apertura `<a-cone` como la de cierre `</a-cone>`, y que la posición no quede dentro de otra figura.

### Paso 5: Describe tu mundo (TODO 6)

Lee el párrafo con `id="scene-description"`. Todavía describe el mundo anterior. Vuelve a escribirlo para que coincida con el tuyo.

Cierra los ojos y pídele a alguien que lea tu descripción en voz alta. ¿Puedes imaginar la escena? Esa es la prueba. Una visitante ciega, o alguien cuyo celular no puede mostrar 3D, recibe solo estas palabras, así que importan tanto como las figuras.

### Paso 6: Recorre tu mundo

Arrastra con el mouse o con el dedo para mirar alrededor. Presiona **W A S D** o las **flechas** del teclado para caminar. Si tienes un visor de realidad virtual, abre la página en su navegador y presiona el botón **VR** de la esquina.

### Paso 7: Haz tu plan (sesión 3)

La mayoría de las personas que dejan de aprender a programar no lo dejan porque sea demasiado difícil. Lo dejan porque la vida se complica y no tienen un plan de cuándo estudiar. Haz el tuyo ahora, en tu diario de aprendizaje:

1. **¿Por qué estás aquí?** Una o dos oraciones. Vas a releerlas en un día difícil.
2. **¿Qué quieres construir?** Un sitio web para tu comunidad, un museo 3D, una nueva carrera profesional. Lo que sea.
3. **¿Cuándo vas a estudiar?** Elige cuatro sesiones de 45 minutos por semana: qué días, a qué hora y dónde. Sé realista. Dos sesiones por semana también funcionan; simplemente todo tarda el doble.
4. **¿Qué se va a interponer?** Hijos, turnos de trabajo, internet lento, cansancio. Escribe una cosa que vas a hacer frente a cada uno.
5. **¿A quién se lo vas a contar?** Aprender con otra persona hace mucho más probable que sigas adelante. La comunidad de XR Camp va a florecer pronto; mientras tanto, cuéntaselo a una amiga o a un amigo.

**¿Cuánto tiempo lleva?** XR Camp es largo, porque te lleva hasta el nivel profesional. Por eso cada fase termina con su propio certificado: no tienes que terminarlo todo para obtener algo real. Con cuatro sesiones por semana, la Fase 1 (Conviértete en desarrolladora web) dura unos ocho meses, y al final de ella sabrás construir y publicar sitios web accesibles.

## Explicación del código clave

**¿Por qué el 3D se parece a HTML?** A-Frame, la herramienta que carga la línea `<script>`, le agrega al navegador etiquetas nuevas como `<a-box>` y `<a-sky>`. Las etiquetas son el lenguaje de la web, así que puedes construir en 3D con las mismas habilidades que vas a aprender para las páginas web comunes. En la Fase 3 aprenderás cómo funciona por dentro.

**¿Por qué el número de versión (`1.8.0`) está en la dirección?** Para que tu mundo siga funcionando exactamente como lo dejaste, aunque A-Frame publique versiones nuevas.

**¿Qué es el script del final?** Hace que funcione el botón **Pause animation** (pausar animación) y detiene la animación automáticamente para las personas que le han pedido a su dispositivo que reduzca el movimiento. Las imágenes en movimiento pueden marear o hacer sentir mal a algunas personas. En la Fase 1 vas a escribir código como este por tu cuenta.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| Una descripción de la escena que coincida con ella | 1.1.1 | Es la única forma en que alguien que no puede ver el mundo 3D puede vivirlo. |
| Una forma de pausar la animación | 2.2.2 | Todo lo que se mueva durante más de cinco segundos debe poder detenerse. |
| La animación se detiene cuando está activado el movimiento reducido | 2.3.3 | El movimiento puede causar mareos y náuseas. |
| Moverse por el mundo funciona con el teclado | 2.1.1 | No todo el mundo puede usar un mouse o una pantalla táctil. |
| `<html lang="en">` (o tu idioma) | 3.1.1 | Le indica a un lector de pantalla cómo pronunciar tus palabras. |

## Consideraciones de rendimiento

A-Frame es una descarga grande, de alrededor de 1.3 MB, la primera vez que se abre la página. Después, tu navegador la recuerda. Si tu conexión es lenta o tiene datos limitados, abre la página una vez con una buena conexión y luego cargará rápido.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Guardar desde un procesador de textos (Word, TextEdit en texto enriquecido) | La página queda en blanco o muestra código | Usa un editor de texto sin formato |
| Cambiar `<a-box` pero no `</a-box>` | La figura desaparece | Cambia juntas las etiquetas de apertura y de cierre |
| Borrar unas comillas `"` | Las figuras siguientes desaparecen | Cada valor de atributo va dentro de un par de comillas |
| Olvidarte de actualizar la descripción | Las visitantes ciegas reciben una imagen equivocada | Actualiza las palabras cada vez que cambies el mundo |

## Solución de problemas

**La página está en blanco y no aparece nada.** A-Frame se descarga de internet la primera vez. Revisa tu conexión, espera un momento y recarga.

**Cambié el código pero no cambió nada.** ¿Guardaste? ¿Recargaste el navegador? ¿Estás editando el mismo archivo que abriste en el navegador?

**Falta una figura.** Puede que esté detrás de ti o dentro de otra figura. Mira alrededor, o cambia su posición a `0 1 -3`: justo enfrente y cerca.

**Las teclas no me mueven.** Haz clic o toca una vez el mundo 3D y vuelve a intentarlo.

## Retos adicionales

Tres extensiones opcionales, en [`challenges/`](challenges/):

1. **[Fundamento](challenges/challenge-1.es.md)**: agrega dos figuras más y descríbelas.
2. **[Creativo](challenges/challenge-2.es.md)**: construye un lugar de tu propia vida.
3. **[Explorador](challenges/challenge-3.es.md)**: usa el Inspector de A-Frame para construir de forma visual.

## Cómo entregar tu trabajo

1. Completa todos los puntos de [`tests/checklist.md`](tests/checklist.md).
2. Toma una captura de pantalla de tu mundo. (Si no sabes cómo, busca en internet «cómo tomar una captura de pantalla» junto con el nombre de tu dispositivo).
3. Guarda tu captura de pantalla y la descripción de tu escena en tu diario de aprendizaje. Cuando abra la comunidad de XR Camp, compártelas también allí.
4. En tu diario de aprendizaje, escribe una oración: ¿cómo te sentiste al construir un mundo 3D en tu primera hora?

## Lecturas adicionales

- [Documentación de A-Frame: Introduction](https://aframe.io/docs/1.8.0/introduction/) (en inglés): la herramienta que usaste hoy.
- [W3C: Historias de personas usuarias de la web](https://www.w3.org/WAI/people-use-web/user-stories/) (en inglés): cómo usan la web las personas con discapacidad.

## Mujeres que conviene conocer

_Se elegirá de la lista en [`docs/en/women-to-know.md`](../../docs/en/women-to-know.md). Cada biografía debe contrastarse con fuentes primarias antes de publicarse._

## Licencia

Código: [`LICENSE-CODE`](../../LICENSE-CODE) · Contenido: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
