# Fundamentos de computación

**Language / Idioma / 语言:** [English](README.md) · [Español](README.es.md) · [简体中文](README.zh-Hans.md)

**Curso:** `preface` · **Lección:** `computer-fundamentals-02` · **Tiempo:** unas 6 horas · 8 sesiones de 45 minutos · unas 2 semanas con 4 sesiones por semana

---

> Crea una carpeta de aprendizaje completa para XR Camp y configura de forma segura un navegador y un espacio de trabajo para desarrollar.

---

## Objetivos de aprendizaje

Al terminar este proyecto serás capaz de:

1. Nombrar el sistema operativo de tu dispositivo y encontrar su versión.
2. Usar los atajos de teclado que cualquier persona que desarrolla usa decenas de veces al día.
3. Crear, nombrar y encontrar archivos y carpetas, y leer la extensión de un archivo.
4. Explicar la diferencia entre un archivo en tu computadora y un archivo en la nube.
5. Mantener tu navegador actualizado y usar pestañas, marcadores y capturas de pantalla.
6. Proteger tus cuentas con contraseñas seguras, un administrador de contraseñas y el inicio de sesión en dos pasos, y reconocer una estafa.
7. Seguir una rutina tranquila y repetible cuando algo sale mal.

## Requisitos previos

- **Curso 0.1: Bienvenida a XR Camp.** Ya abriste un archivo en un navegador y en un editor de texto.

## Herramientas necesarias

| Herramienta | Para qué sirve | Costo |
| --- | --- | --- |
| Tu computadora: Windows, macOS, ChromeOS o Linux | Todo | Gratis |
| Un navegador moderno | La web | Gratis |
| Un editor de texto sin formato | Tu página de configuración | Gratis |

**¿Solo tienes un celular?** Puedes seguir la mayor parte de esta lección en un celular Android con una aplicación gratuita para editar código, aunque el resto de XR Camp es más fácil en una computadora. Muchas bibliotecas públicas y centros comunitarios tienen computadoras que puedes usar; esta lección también te enseña a mantener tu trabajo seguro en una computadora compartida.

## Lo que vas a construir

Dos cosas que vas a usar durante el resto de XR Camp:

1. **Tu carpeta de XR Camp**: un solo lugar ordenado para cada lección, proyecto y nota.
2. **Tu página de configuración**: una pequeña página web que registra cómo está configurada tu computadora, los atajos que conoces y qué hacer cuando algo se rompe. Es tu primer documento de referencia, escrito por ti y para ti.

La solución de referencia en [`completed/`](completed/) es la página de configuración de Ana.

## Guía de carpetas

```text
02-computer-fundamentals/
├── README.md            # This guide
├── README.es.md         # Spanish
├── README.zh-Hans.md    # Simplified Chinese
├── project.json         # Lesson metadata
├── starter/             # Begin here: a setup page with 8 TODOs
├── completed/           # Reference solution: open this last
├── challenges/          # Three challenges: Foundation is required
├── tests/checklist.md   # Self-review before you submit
├── assets/
└── screenshots/
```

## Configuración

1. Abre tu carpeta `xr-camp` del Curso 0.1.
2. Copia dentro la carpeta `starter` de esta lección y cambia el nombre de la copia a `my-setup`.
3. Abre `my-setup/index.html` en tu navegador y en tu editor de texto, uno al lado del otro, como hiciste en el Curso 0.1.

## Recorrido paso a paso

### Planifica tus sesiones

| Sesión | Qué haces | Terminas con |
| --- | --- | --- |
| 1 | Paso 1: tu dispositivo y tu sistema operativo (TODO 1–2) | Tu dispositivo descrito en tu página |
| 2 | Paso 2: teclado, mouse, pantalla táctil y trackpad (TODO 3) | Una tabla de atajos que ya practicaste |
| 3 | Paso 3: archivos, carpetas y extensiones (TODO 4) | Tu carpeta de XR Camp, ordenada |
| 4 | Paso 4: descargas, subidas y la nube (TODO 5) | Un plan de copias de seguridad para tu trabajo |
| 5 | Paso 5: tu navegador (TODO 6) | Un navegador actualizado y preparado para aprender |
| 6 | Paso 6: contraseñas, inicio de sesión en dos pasos y estafas (TODO 7) | Cuentas más seguras |
| 7 | Paso 7: cuando algo sale mal (TODO 8) | Tu propia rutina para resolver problemas |
| 8 | [`tests/checklist.md`](tests/checklist.md), un reto adicional y **Cómo entregar tu trabajo** | Una página de configuración terminada |

### Paso 1: tu dispositivo (TODO 1–2)

Una computadora, una tableta y un celular funcionan con un **sistema operativo**: el programa que hace funcionar a todos los demás programas. Los principales son Windows, macOS, ChromeOS y Linux en las computadoras, y Android e iOS en los celulares.

Encuentra el tuyo. Los nombres de los menús aparecen aquí en inglés; si tu dispositivo está en español, los nombres cambian, pero el camino es el mismo (por ejemplo, *Settings* suele llamarse Configuración o Ajustes, y *About*, Acerca de o Información):

| Sistema | Dónde buscar |
| --- | --- |
| Windows | **Start → Settings → System → About** |
| macOS | **Apple menu → About This Mac** (menú Apple → Acerca de esta Mac) |
| ChromeOS | **Settings → About ChromeOS** |
| Android | **Settings → About phone** |
| iPhone | **Settings → General → About** |

Escribe tu dispositivo y tu sistema en tu página. Vas a necesitar esta información cada vez que pidas ayuda: «no funciona» es difícil de responder; «no funciona en Firefox en Windows 11», no.

### Paso 2: teclado, mouse, pantalla táctil y trackpad (TODO 3)

Quienes desarrollan usan el teclado mucho más que el mouse. Estos atajos funcionan en casi todos los programas. En una Mac, usa **Command (⌘)** donde esta tabla dice **Ctrl**.

| Acción | Windows, ChromeOS, Linux | macOS |
| --- | --- | --- |
| Copiar | Ctrl + C | ⌘ + C |
| Pegar | Ctrl + V | ⌘ + V |
| Cortar | Ctrl + X | ⌘ + X |
| Deshacer | Ctrl + Z | ⌘ + Z |
| Guardar | Ctrl + S | ⌘ + S |
| Buscar en la página | Ctrl + F | ⌘ + F |
| Seleccionar todo | Ctrl + A | ⌘ + A |
| Recargar la página | Ctrl + R (o F5 en Windows y Linux) | ⌘ + R |
| Nueva pestaña | Ctrl + T | ⌘ + T |
| Cambiar de un programa a otro | Alt + Tab | ⌘ + Tab |

Practica cada uno y luego pon los que aprendiste en la tabla de tu página. **Deshacer** es el más importante: nada de lo que haces en un editor de texto es permanente si puedes deshacerlo.

La tecla **Tab** te lleva de un enlace o botón a otro en una página web. Muchas personas recorren toda la web de esta forma, y por eso cada página que construyas en XR Camp tiene que funcionar solo con el teclado.

### Paso 3: archivos, carpetas y extensiones (TODO 4)

El nombre de un archivo termina con una **extensión** que le dice a la computadora qué tipo de archivo es: `index.html` es una página web, `photo.jpg` es una imagen, `notes.txt` es texto sin formato.

Muchas computadoras ocultan las extensiones, y eso provoca errores confusos como `index.html.txt`. Actívalas (los nombres de los menús están en inglés; en español verás sus equivalentes):

- **Windows 11:** File Explorer (el Explorador de archivos) → **View → Show → File name extensions**.
- **macOS:** Finder → **Settings → Advanced → Show all filename extensions**.

Ahora organiza tu carpeta de XR Camp así:

```text
xr-camp/
├── my-first-world/     # from Course 0.1
├── my-setup/           # this lesson
├── journal/            # your learner journal and notes
└── downloads/          # lessons you have downloaded
```

**Reglas para nombrar que te van a ahorrar horas:** usa letras minúsculas, números y guiones. Sin espacios, sin acentos, sin mayúsculas: `my-first-world`, no `My First World!`. La mayoría de los servidores web tratan `Photo.jpg` y `photo.jpg` como archivos distintos, y los espacios en los nombres pueden romper los enlaces.

### Paso 4: descargas, subidas y la nube (TODO 5)

- **Descargar** copia un archivo de internet a tu dispositivo. Normalmente llega a tu carpeta **Descargas**: muévelo a `xr-camp/` enseguida.
- **Subir** copia un archivo de tu dispositivo a internet.
- **La nube** significa archivos guardados en la computadora de alguien más, como Google Drive, OneDrive, iCloud o Baidu Netdisk, y sincronizados con la tuya.

El almacenamiento en la nube es útil como copia de seguridad, pero puede dar sorpresas: un archivo puede aparecer en tu carpeta sin estar realmente en tu computadora hasta que se descarga. Mantén tu carpeta de trabajo en tu dispositivo y usa la nube o una memoria USB para guardar una copia.

Escribe tu plan de copias de seguridad en tu página: dónde está tu copia y cada cuánto la haces.

### Paso 5: tu navegador (TODO 6)

Usa un navegador moderno y mantenlo actualizado: las actualizaciones corrigen fallas de seguridad y agregan las funciones de la web que vas a aprender.

Los menús aparecen con sus nombres en inglés; en un navegador en español, *Help* es Ayuda y *About*, Acerca de o Información.

| Navegador | Buscar actualizaciones |
| --- | --- |
| Chrome | **⋮ menu → Help → About Google Chrome** |
| Firefox | **☰ menu → Help → About Firefox** (en las versiones más nuevas, *Help* se llama *Help and Report*) |
| Edge | **… menu → Help and feedback → About Microsoft Edge** |
| Safari | Se actualiza con macOS: **System Settings → General → Software Update** (Ajustes del Sistema → General → Actualización de software) |

Luego practica:

- **Marcadores:** guarda como marcador esta lección y el repositorio de XR Camp.
- **Pestañas:** ten tu lección en una pestaña y tu trabajo en otra.
- **Capturas de pantalla**, que vas a usar para entregar tu trabajo:
  - Windows: **tecla Windows + Shift + S**
  - macOS: **⌘ + Shift + 4** y luego arrastra
  - ChromeOS: **Ctrl + Shift + Show windows** (la tecla que muestra todas las ventanas)
  - Android: **botón de encendido + bajar volumen**
  - iPhone: **botón lateral + subir volumen** (en un iPhone con botón de inicio: **botón lateral + botón de inicio**)

### Paso 6: contraseñas, inicio de sesión en dos pasos y estafas (TODO 7)

Pronto tus cuentas van a guardar tu código, tu portafolio y tu reputación profesional. Protégelas desde ahora.

1. **Usa un administrador de contraseñas.** Recuerda una contraseña segura distinta para cada sitio, así que tú solo tienes que recordar una. Tu navegador trae uno incorporado, y hay otros gratuitos, como Bitwarden, que funcionan en todos tus dispositivos.
2. **Activa el inicio de sesión en dos pasos** (también llamado autenticación de dos factores, o 2FA), empezando por tu correo electrónico. Aunque alguien robe tu contraseña, no podrá entrar sin tu celular.
3. **Reconoce las estafas.** Desconfía de cualquier mensaje urgente, que te pida una contraseña o un código, o que tenga un enlace que no esperabas. XR Camp nunca te va a pedir tu contraseña y es completamente gratis: quien te pida dinero por él está mintiendo.

**Nunca escribas una contraseña real en tu página de configuración.** Escribe solo *que* hiciste cada paso.

En una computadora compartida o pública: usa una ventana privada o de incógnito, nunca dejes que el navegador guarde tu contraseña y siempre cierra sesión.

### Paso 7: cuando algo sale mal (TODO 8)

En el día de cualquier persona que desarrolla hay cosas que no funcionan. La diferencia entre una principiante y una profesional no es tener menos problemas: es tener una rutina tranquila para resolverlos.

1. **Lee el mensaje.** Los mensajes de error suelen decir qué está mal.
2. **Guarda y recarga.** Muchos problemas son un archivo sin guardar o una página desactualizada.
3. **Deshaz tu último cambio.** Si antes funcionaba, el problema está en lo que acabas de hacer.
4. **Reinicia el programa**, y luego la computadora.
5. **Busca el mensaje de error exacto**, entre comillas.
6. **Pide ayuda**, indicando tu dispositivo, tu sistema, tu navegador, qué esperabas, qué pasó, y con una captura de pantalla.

Escribe tu propia versión de esta rutina en tu página, con tus propias palabras.

## Explicación del código clave

**`<dl>`, `<dt>` y `<dd>`: una lista de descripciones.** La sección de tu dispositivo junta nombres con valores («Sistema: Windows 11»). Justo para eso sirve una lista de descripciones, y permite que los lectores de pantalla sepan que la página contiene una lista de nombres y valores.

**`<kbd>`: entrada de teclado.** Poner una tecla dentro de `<kbd>` (`<kbd>Ctrl</kbd> + <kbd>C</kbd>`) la marca en tu código como algo que se presiona, no algo que se lee. Los navegadores la muestran con otro estilo; la mayoría de los lectores de pantalla la leen como texto normal, así que las palabras que la rodean siguen siendo importantes.

**`<ol>` para la rutina de solución de problemas.** Los pasos tienen un orden, así que es una lista ordenada.

## Requisitos de accesibilidad

| Requisito | WCAG 2.2 | Por qué |
| --- | --- | --- |
| Un solo `<h1>` y las secciones como `<h2>` | 1.3.1 | Los encabezados son la forma en que quienes usan lector de pantalla recorren una página. |
| La tabla de atajos tiene `<th scope>` y un `<caption>` | 1.3.1 | Cada tecla queda vinculada a su acción. |
| Las teclas están marcadas con `<kbd>` | 1.3.1 | El código indica qué texto es una tecla que se presiona. |
| `lang` coincide con tu idioma | 3.1.1 | Pronunciación correcta. |

## Consideraciones de rendimiento

La página es solo HTML y un poco de CSS: se abre al instante, incluso desde una memoria USB y sin internet. Una página de referencia que necesitas cuando las cosas se rompen tiene que funcionar cuando las cosas se rompen.

## Errores comunes

| Error | Qué pasa | En su lugar |
| --- | --- | --- |
| Extensiones de archivo ocultas | Guardas `index.html.txt` sin darte cuenta | Activa las extensiones (Paso 3) |
| Espacios o mayúsculas en los nombres | Los enlaces se rompen en un servidor web | Minúsculas, números y guiones |
| Trabajar desde la carpeta Descargas | Los archivos se pierden o se borran | Mueve todo a `xr-camp/` |
| Anotar contraseñas reales | Cualquiera que vea la página las tiene | Registra el paso, nunca el secreto |

## Solución de problemas

**Mi archivo se abre como texto, no como página web.** Revisa que la extensión sea `.html` y no `.html.txt`.

**No encuentro mi carpeta Descargas.** Abre la lista de descargas de tu navegador (**Ctrl + J** en Windows y ChromeOS; en una Mac, **⌘ + Shift + J** en Chrome, **⌘ + J** en Firefox, o el botón de descargas cerca de la esquina superior derecha en Safari) y elige **Show in folder** (mostrar en carpeta; en una Mac, **Show in Finder**, mostrar en Finder).

**El atajo de captura de pantalla no hace nada.** Algunos teclados también necesitan la tecla **Fn**. Busca «captura de pantalla» junto con el modelo de tu dispositivo.

## Retos adicionales

Tres desafíos de extensión, en [`challenges/`](challenges/). El desafío Fundamento es obligatorio; los otros dos son opcionales:

1. **[Fundamento](challenges/challenge-1.es.md)**: un ejercicio de dos minutos solo con el teclado.
2. **[Creativo](challenges/challenge-2.es.md)**: tu página de configuración y tus carpetas en tu propio idioma.
3. **[Explorador](challenges/challenge-3.es.md)**: instala VS Code y abre en él tu carpeta de XR Camp.

## Cómo entregar tu trabajo

1. Completa todos los puntos de [`tests/checklist.md`](tests/checklist.md).
2. Toma una captura de pantalla de tu página de configuración y otra de tu carpeta de XR Camp.
3. Guarda las dos en tu diario de aprendizaje. Compártelas con otras personas que programan: consulta [dónde compartir tu trabajo y pedir ayuda](../../docs/en/community.md) (en inglés).
4. En tu diario, responde: ¿qué atajo te va a ahorrar más tiempo?

## Lecturas adicionales

- [MDN: Dealing with files](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Dealing_with_files) (en inglés): cómo trabajar con archivos.
- [W3C: Keyboard accessibility](https://www.w3.org/WAI/perspective-videos/keyboard/) (en inglés): accesibilidad con el teclado.

## Mujeres que conviene conocer

**Cecilia Berdichevsky** es conocida como la primera programadora de Argentina. En 1961 escribió y ejecutó el primer programa en Clementina, la computadora Ferranti Mercury de la Universidad de Buenos Aires, la primera computadora de Argentina para investigación científica.

Clementina ocupaba una habitación entera y se programaba con cinta de papel perforada. El celular que llevas en el bolsillo es millones de veces más potente. Pero los hábitos que necesitaba Berdichevsky, como organizar el trabajo con cuidado, revisar cada paso y saber exactamente qué está haciendo la máquina, son los mismos que practicaste en esta lección.

_Datos de fuentes públicas, verificados en 2026. ¿Encontraste un error? [Avísanos](https://github.com/XR-Dev-Camp/xr-camp/issues)._

## Estándar destacado

Los nombres y las extensiones de los archivos funcionan en todos los sistemas gracias a convenciones y estándares compartidos. Los tipos de medios que le dicen a un navegador «esto es HTML» o «esto es una imagen JPEG» (`text/html`, `image/jpeg`) están registrados ante la IANA, la misma organización que coordina las direcciones de internet. Los vas a volver a ver cuando publiques tu primer sitio.

## Licencia

Código: [`LICENSE-CODE`](../../LICENSE-CODE) · Contenido: [`LICENSE-CONTENT`](../../LICENSE-CONTENT) · [`ATTRIBUTION.md`](./ATTRIBUTION.md)
