# Reto 3: Explorador

**Reto opcional.** Aproximadamente 90 minutos.

Agrega una segunda interacción, distinta, al componente `interactive-exhibit`: una acción dedicada de "examinar", separada de seleccionar.

## Tarea

1. Agrega una nueva propiedad al schema de `interactive-exhibit`: algo como `examinable` (booleano, predeterminado `false`).
2. Para las exhibiciones con `examinable: true`, escucha un segundo evento distinto de `click`, por ejemplo el propio `raycaster-intersected-cleared` del raycaster, o una pulsación larga que implementes tú misma con el tiempo de `mousedown`/`mouseup` (al menos 600 ms cuenta como pulsación larga).
3. En esa segunda interacción, haz algo que seleccionar no hace: por ejemplo, duplicar temporalmente la escala de la exhibición, o cambiar su material a una variante resaltada, durante dos segundos, y luego revertirlo. Usa `tick()` o `setTimeout` (limpiado de forma segura en `remove()`) para cronometrar el retorno.
4. Dale a esta nueva interacción su propia ruta por teclado: un segundo botón por cada exhibición examinable ("Examinar: <etiqueta>"), para que nada aquí dependa de un gesto de mouse que un teclado no pueda reproducir.
5. Documenta la nueva interacción en el panel de información o en `#scene-description`, para que sea descubrible, no una función oculta.

## Por qué importa

Las exhibiciones reales suelen necesitar más de un tipo de interacción (seleccionar, y luego mirar más de cerca). Este reto pone a prueba si el diseño de tu componente se generaliza: agregar una segunda interacción debería extender `interactive-exhibit`, no requerir un segundo componente paralelo con su propia copia de la lógica de selección.

## Se completa cuando

- [ ] Al menos una exhibición admite tanto seleccionar como examinar, como dos interacciones distintas y documentadas.
- [ ] La interacción de examinar tiene una ruta por teclado funcional.
- [ ] Cualquier temporizador que inicie la interacción de examinar se limpia en `remove()`, así que quitar la exhibición a mitad de la animación no deja nada ejecutándose.
