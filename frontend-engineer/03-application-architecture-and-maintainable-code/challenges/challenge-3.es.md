# Reto 3: Explorador

**Extensión avanzada opcional.** Aproximadamente 60–90 minutos.

Agrega **Undo** (deshacer) al store.

## Tarea

1. Como cada cambio pasa por tres acciones, el store puede recordar cuál era el estado antes de cada una. Lleva un historial: antes de que una acción cambie algo, agrega una copia de `sessions` a un arreglo (`structuredClone(sessions)` hace una copia profunda).
2. Exporta `undo()`, que restaura la última copia y llama a `commit()`. Limita el historial a los últimos 20 cambios.
3. Agrega un botón **Undo** a la página, desactivado cuando no hay nada que deshacer. Anuncia qué se deshizo: «Undid: Deleted CSS grid.».
4. Agrega soporte de teclado: **Ctrl + Z** (**⌘ + Z** en Mac), pero no mientras el foco esté en una casilla de texto, donde ya deshace lo escrito.
5. Después de un Undo, ¿a dónde debería ir el foco? Decide, y escribe por qué.

## Por qué importa

Deshacer es casi imposible en el planificador viejo, porque cualquier cosa podía cambiar `a` en cualquier momento. En el nuevo es un agregado pequeño, porque hay exactamente una puerta de entrada al estado. Eso es lo que te da «un solo lugar para el estado», y es cómo frameworks como Redux hacen posible el undo y la depuración con viaje en el tiempo (time-travel debugging).

## Se completa cuando

- [ ] Add, Done y Delete se pueden deshacer, cada uno, en orden.
- [ ] El botón Undo se desactiva cuando no hay nada que deshacer.
- [ ] Ctrl + Z / ⌘ + Z funciona, excepto dentro de casillas de texto.
- [ ] Cada undo se anuncia.
