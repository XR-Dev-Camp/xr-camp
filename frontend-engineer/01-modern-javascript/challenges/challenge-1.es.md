# Reto 1: Fundamento

**Obligatorio.** Unos 45 minutos.

Una caja de búsqueda que filtra lecciones por título.

## Tarea

1. Agrega una caja de búsqueda con etiqueta arriba del mapa: `<label for="search">Search lessons</label>` e `<input id="search" type="search">`.
2. En `main.js`, cuando cambie (evento `input`), vuelve a renderizar solo con las lecciones cuyo título incluya las palabras buscadas. Primero convierte todo a minúsculas.
3. Debe funcionar junto con «solo listas»: ambos filtros a la vez.
4. Actualiza `#summary` para decir cuántas lecciones coinciden, de modo que los lectores de pantalla lo escuchen.

## Por qué es importante

Combinar filtros es donde muchas aplicaciones se vuelven confusas. Si cada filtro es una función pequeña, y `draw` los aplica todos, agregar uno nuevo es fácil y seguro.

## Se completa cuando

- [ ] Escribir filtra las lecciones, sin importar mayúsculas o minúsculas.
- [ ] La búsqueda y «solo listas» funcionan juntas.
- [ ] El resumen anuncia cuántas coinciden.
