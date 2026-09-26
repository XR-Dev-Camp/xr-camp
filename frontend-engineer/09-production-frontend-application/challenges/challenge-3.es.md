# Reto 3: Explorador

Una extensión avanzada opcional para quienes quieran ir más lejos. Entre 60 y 90 minutos.

## Tarea

El momento 3D actualmente codifica un número (lecciones completadas) en una propiedad de forma (altura de la columna). Agrega una **segunda** codificación de información que ya está en las filas de `phaseProgress()`, usando una segunda propiedad visual — por ejemplo, la intensidad del color según qué tan cerca está una fase de terminarse, o un pequeño marcador sobre cualquier fase que esté al 100 %.

Reglas:

- No agregues ni un solo dato nuevo que no esté ya en las filas que devuelve `phaseProgress()`.
- `#scene-description` también debe describir la nueva codificación, en palabras, construida a partir de los mismos datos.
- La tabla gemela en 2D debe mostrar la misma información que muestra la nueva codificación.
- La cámara se mantiene fija, y nada se anima, por las mismas razones que antes.

Luego, en un párrafo breve de tu diario, explica el equilibrio: ¿qué facilita ver de un vistazo la segunda codificación, y qué le cuesta (más que describir, más que mantener sincronizado, más que probar)?

## Por qué importa

Esto es lo que hay detrás de patrones como el «un solo store, muchas vistas» de Redux y las bibliotecas de visualización de datos observables: las aplicaciones reales tienden a sumar más vistas de los mismos datos con el tiempo, no más copias de los datos en sí. Agregar una segunda vista sin tocar los datos, y manteniendo cada vista honesta sobre lo que muestran las otras, es un pequeño ensayo de esa disciplina.

## Se completa cuando

- [ ] Existe una segunda codificación, construida solo con datos que ya devuelve `phaseProgress()`.
- [ ] `#scene-description` y la tabla gemela reflejan ambos la nueva codificación.
- [ ] La sección «3D y XR (manual)» de `tests/checklist.md` sigue pasando.
- [ ] Tu diario tiene el párrafo sobre el equilibrio (trade-off).
