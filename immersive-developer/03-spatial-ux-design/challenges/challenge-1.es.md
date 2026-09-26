# Reto 1: Fundamento

**Obligatorio.** Aproximadamente 45 minutos.

Agrega un cuarto punto de referencia, y úsalo para probar una distancia que esta lección no prueba.

## Tarea

1. En `js/locomotion.js`, agrega una cuarta entrada a `WAYPOINTS`: dale un `id`, una `label`, y una `distance` en metros de tu elección (prueba algo fuera de 0.6-2.5 m, como 0.3 m o 4 m).
2. En `js/app.js`, dale a tu nuevo punto de referencia un color de marcador en `MARKER_COLORS` (cualquier color hexadecimal que no esté ya en uso).
3. Recarga la página. Tu nuevo punto de referencia debería aparecer como un cuarto botón y un cuarto marcador en el piso, y hacer clic o tocar cualquiera de los dos debería teletransportarte ahí.
4. Lee el número de tamaño angular que reporta la descripción de la escena en tu nueva distancia. ¿El quiosco sigue siendo cómodamente legible ahí?
5. Agrega una oración a tu `design-rationale.md` sobre lo que encontraste.

## Por qué importa

Un conjunto fijo de tres distancias enseña la idea, pero el contenido real nunca se lee solo a tres distancias. Agregar una más, y leer el número resultante en lugar de adivinar, es todo el método que esta lección intenta enseñar: probar una distancia, leer el resultado, decidir.

## Se completa cuando

- [ ] Un cuarto botón de punto de referencia y un cuarto marcador en el piso funcionan ambos, y ambos teletransportan correctamente.
- [ ] La descripción de la escena reporta correctamente la etiqueta y la distancia de tu nuevo punto de referencia.
- [ ] `design-rationale.md` menciona lo que encontraste en la nueva distancia.
