# Reto 3: Explorador

**Reto opcional.** Aproximadamente 90 minutos.

Renderiza bajo demanda, en lugar de en cada cuadro.

## Tarea

Esta exhibición usa `renderer.setAnimationLoop()`, que dibuja continuamente, porque la piedra de jade se anima y la amortiguación de `OrbitControls` necesita un cuadro para detenerse suavemente después de cada arrastre. Pero cuando la animación está en pausa y la cámara se ha asentado, nada está cambiando, y cada uno de esos cuadros es trabajo de GPU desperdiciado, el mismo punto que planteó el laboratorio de conceptos de 3.1 sobre el renderizado bajo demanda.

1. Agrega una bandera `needsRender` (o similar) a `app.js`.
2. Dale a `OrbitControls` un escucha del evento `'change'` que la fije en `true` cada vez que la cámara se mueve.
3. Cambia `tick()` para que, cuando la animación esté en pausa *y* nada haya solicitado un render, omita llamar a `render()`, pero siga llamando a `controls.update()`, para que la amortiguación siga funcionando en el momento en que un arrastre empiece de nuevo.
4. Reinicia `needsRender` a `false` justo después de un cuadro que sí se renderizó.
5. Agrega una línea al panel Stats que muestre si el cuadro actual se dibujó u omitió, y observa cómo se asienta en "omitido" uno o dos segundos después de dejar de arrastrar con la animación en pausa.

## Por qué importa

Las aplicaciones reales de three.js rara vez tienen todo moviéndose todo el tiempo. Saber cómo renderizar solo cuando algo realmente cambió es una ganancia significativa de batería y rendimiento, especialmente en teléfonos, y es la misma decisión que volverás a encontrar en 3.6.

## Se completa cuando

- [ ] Con la animación en pausa y la cámara quieta, la exhibición renderiza muchos menos de 60 cuadros por segundo.
- [ ] Arrastrar, usar las flechas, o los botones "Girar a la izquierda" / "Girar a la derecha" siguen funcionando de inmediato.
- [ ] Reanudar la animación vuelve a dibujar cada cuadro, porque algo se está moviendo de nuevo.
