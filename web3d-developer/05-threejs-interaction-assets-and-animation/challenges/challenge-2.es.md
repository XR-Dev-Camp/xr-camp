# Reto 2: Creativo

**Opcional.** Aproximadamente 60 minutos.

Escribe tu propia descripción de un modelo, en tu propio idioma, y muéstrala cuando ese modelo esté seleccionado.

## Tarea

1. Elige uno de los modelos de la exhibición (el zorro, el camión de leche, o el tuyo propio del Reto 1).
2. Escribe dos o tres oraciones sobre él, en tu propio idioma, como si estuvieras escribiendo una etiqueta de museo: qué podría representar, qué destaca de cómo se ve o se mueve, o qué te recuerda de tu propia cultura o comunidad. Deja un gloss en inglés en un comentario arriba, para que la estructura de la solución de referencia siga ayudando a futuras lectoras.
3. Agrega este texto como un campo nuevo en la entrada de ese objeto en `ITEMS` (por ejemplo, `personalNote`).
4. En `selectItem()` de `main.js`, muestra este texto en `#selection-info` junto a (no en lugar de) la `note` y el `credit` existentes del modelo, solo cuando ese objeto específico esté seleccionado.
5. Todo lo demás (la carga, el raycasting, los botones Seleccionar, el panel de atribución) debería seguir funcionando sin cambios, porque lee de `ITEMS`, no de un caso escrito a mano para un modelo.

## Por qué importa

Un panel de atribución declara hechos que exige una licencia; tu propia nota es un tipo distinto de escritura, más cercano a lo que hace la etiqueta de una exhibición de museo real: conectar un objeto con la persona que lo está mirando. Ambos pertenecen a la misma página, y este reto te pide agregar el segundo tipo sin alterar el primero.

## Se completa cuando

- [ ] Al menos un modelo tiene una nota personal, en tu propio idioma, que se muestra solo cuando está seleccionado.
- [ ] La nota aparece junto al crédito existente del modelo, no en su lugar.
- [ ] La carga, la selección, y la atribución siguen funcionando sin cambios para cada objeto.
