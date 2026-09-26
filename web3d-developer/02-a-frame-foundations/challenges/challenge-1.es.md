# Reto 1: Fundamento

**Obligatorio.** Aproximadamente 45 minutos.

Agrega un cuarto punto "Mirar", construido a partir de una primitiva.

## Tarea

1. Agrega una nueva primitiva a la sala (un cilindro, un cono, una esfera, u otra caja), con su propio `id`, ubicada en algún lugar de la sala que no esté ya ocupado.
2. Agrega una entrada a `exhibitData` en `main.js` para ella: un `id` que coincida con el de la entidad, una `label` breve, y una `description`.
3. Confirma que, sin ningún otro cambio, ahora aparece en la lista 2D **y** obtiene su propio botón "Mirar". Si no aparece, revisa que su `id` coincida exactamente.
4. Haz clic (o navega con Tab y presiona Enter) en su nuevo botón, y confirma que la cámara gira para mirarlo.
5. Actualiza el texto inicial de `#scene-description` para mencionarlo.

## Por qué importa

Como la lista, los botones y el comportamiento de "Mirar" se construyen a partir de un solo arreglo, agregar un punto debería requerir solo una entidad nueva y un objeto nuevo en `exhibitData`, nada más. Si te encontraste editando la lista o los botones a mano, algo anterior en la lección sigue codificado a mano en lugar de basarse en datos, y vale la pena revisarlo.

## Se completa cuando

- [ ] Una cuarta primitiva está en la sala, con su propio `id`.
- [ ] Tiene una entrada en `exhibitData`, y aparece automáticamente en la lista y en los botones.
- [ ] Su botón "Mirar" gira la cámara para mirarlo.
- [ ] El texto inicial de `#scene-description` lo menciona.
