# Desafío 1: Fundamento

**Obligatorio.** Unos 45 minutos.

Un filtro «Mostrar solo lecciones sin terminar» que mantiene el foco en un lugar lógico.

## Tarea

1. Agrega una casilla con etiqueta arriba del mapa: «Mostrar solo lecciones sin terminar».
2. Cuando esté activada, oculta las lecciones terminadas usando el atributo `hidden` en lugar de redibujar, para que nada más cambie. Primero agrega `[hidden] { display: none !important; }` a `styles.css`: de lo contrario, `.lesson { display: flex; }` gana, y las filas ocultas siguen visibles.
3. Ahora marca una lección mientras el filtro está activo: desaparece. ¿Dónde está el foco ahora? Muévelo a la siguiente casilla visible dentro de la misma fase, o al encabezado de la fase si no queda ninguna (dale a los encabezados `tabindex="-1"` para que puedan recibir el foco desde un script).
4. Anuncia cuántas lecciones quedan en `#status`.

## Por qué importa

Los filtros y el foco suelen entrar en conflicto: el elemento que acabas de usar desaparece. Decidir a dónde va el foco cuando algo desaparece es una de las habilidades más importantes al construir interfaces dinámicas.

## Se completa cuando

- [ ] El filtro oculta las lecciones terminadas sin redibujar la página.
- [ ] Marcar una lección mientras se filtra mueve el foco a un lugar lógico.
- [ ] Se anuncia cuántas lecciones quedan.
