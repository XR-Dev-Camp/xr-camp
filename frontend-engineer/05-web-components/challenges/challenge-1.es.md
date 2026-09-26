# Reto 1: Fundamento

**Obligatorio.** Aproximadamente 45 minutos.

Haz crecer la tarjeta sin romperle nada a quien ya la esté usando.

## Tarea

1. Agrega un atributo `lesson-number`, por ejemplo `lesson-number="2.5"`. Cuando esté presente, muéstralo antes del título, dentro del encabezado: "2.5 Web Components". Cuando falte, muestra solo el título.
2. Agrégalo a `observedAttributes`, y comprueba que cambiarlo en el panel Elements actualiza la tarjeta al instante.
3. Muestra el número en su propio `<span part="number">`, para que las páginas puedan darle estilo con `lesson-card::part(number)`. Dale estilo en tu página.
4. ¿Debería cambiar también el nombre del botón? Decide, y anota por qué. ("Done: 2.5 Web Components", o "Done: Web Components"?)
5. En `main.js`, define `lesson-number` para cada tarjeta del catálogo, y elimina la frase "Course 2.5 of XR Camp." si ahora repite el número.
6. Actualiza `components.md`: la tabla de atributos, la tabla de partes, y el ejemplo.

## Por qué esto importa

Una vez que otras páginas usan tu componente, sus atributos, eventos, y partes son una promesa. Un atributo nuevo y opcional mantiene la promesa: cada tarjeta escrita antes sigue funcionando exactamente igual que antes. Quitar o renombrar algo la rompe.

## Se completa cuando

- [ ] Las tarjetas con y sin `lesson-number` se ven bien.
- [ ] El número cambia en vivo cuando cambia el atributo.
- [ ] La página da estilo al número con `::part(number)`.
- [ ] El encabezado se sigue leyendo bien en la lista de encabezados de un lector de pantalla.
- [ ] `components.md` documenta el nuevo atributo y la nueva parte.
