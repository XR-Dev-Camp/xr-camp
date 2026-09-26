# Reto 3: Explorador

**Reto opcional.** Aproximadamente 90 minutos.

Da soporte a entrada solo por mirada, y compara los modelos de mano de marcador de posición de three.js contra sus modelos reales.

## Tarea

1. Agrega selección por tiempo de permanencia para fuentes de entrada con `targetRayMode === 'gaze'` (visores tipo cardboard, sin ningún botón): en `controllers.js`, registra cuánto tiempo un rayo de mirada ha estado impactando continuamente el mismo botón del menú (usando las propias actualizaciones por cuadro de `renderer.xr`, o `app.onXRFrame`), y después de aproximadamente 1.5 segundos continuos, activa automáticamente la acción de ese botón, de la misma forma en que `onSelectStart` lo hace para un evento select real. Muestra un resaltado que se va llenando en el botón conforme avanza la permanencia, para que las personas con entrada por mirada reciban la misma retroalimentación visual que da el destello de un control.
2. En `buildHandModel()`, prueba pasar `'boxes'` o `'spheres'` en lugar de `'mesh'` a `handModelFactory.createHandModel()`. Compara: qué carga más rápido, qué se ve mejor, y si alguno cambia qué tan fácil es apuntar al menú.
3. Lee el código fuente de `XRHandModelFactory.js` de three.js (en `node_modules` si lo instalaste, o en GitHub, fijado en r186) lo suficiente como para explicar, con tus propias palabras, qué hace `'mesh'` de forma distinta a `'boxes'`.

## Por qué importa

Los visores solo de mirada existen, y suelen ser los más económicos disponibles: diseñar solo para controles y manos deja fuera a estudiantes reales. Leer el código fuente real de una biblioteca, en lugar de adivinar por su nombre, también es una habilidad a la que este curso vuelve una y otra vez (ver el reto Explorador de 4.1).

## Se completa cuando

- [ ] Una fuente de entrada de mirada (`targetRayMode === 'gaze'`) puede seleccionar un botón del menú permaneciendo sobre él, con un resaltado visible que se va llenando mientras dura la permanencia.
- [ ] El modelo de mano se puede cambiar a `'boxes'` o `'spheres'`, y puedes decir qué cambió.
- [ ] Puedes explicar, en una o dos oraciones, qué hace la opción `'mesh'` de `XRHandModelFactory` que `'boxes'` no hace.
