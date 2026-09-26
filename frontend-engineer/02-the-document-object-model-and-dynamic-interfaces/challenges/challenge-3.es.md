# Desafío 3: Explorador

**Opcional.** Unos 60 minutos.

Reordena metas con botones Move up y Move down.

## Tarea

1. Dale a cada meta dos botones más: **Move up** (Subir) y **Move down** (Bajar), cada uno con un `aria-label` que nombre la meta.
2. Al presionarlos, intercambia la meta con su vecina en `state.goals`, guarda, y mueve el elemento en la página. Mueve a su **vecina**, no al elemento en sí: para Move up, `item.after(item.previousElementSibling)`; para Move down, `item.before(item.nextElementSibling)`.
3. Comprueba que el foco permanezca en el botón que se presionó. (Si mueves el propio elemento con foco, este sale de la página por un instante, y el navegador pierde el foco. Entonces tendrías que volver a llamar a `button.focus()`).
4. Oculta o desactiva Move up en la primera meta y Move down en la última.
5. Anuncia la nueva posición: «Finish Phase 1 moved to position 1 of 3» (Terminar Fase 1 se movió a la posición 1 de 3).

## Por qué importa

Arrastrar y soltar es común, pero es imposible para muchas personas que usan teclado o lector de pantalla. Los botones que mueven elementos son la alternativa accesible, y muchos sistemas de diseño ofrecen ambos.

## Se completa cuando

- [ ] Las metas se pueden reordenar con el teclado, y el orden sobrevive a una recarga.
- [ ] El foco permanece en el botón presionado, y se anuncia la nueva posición.
