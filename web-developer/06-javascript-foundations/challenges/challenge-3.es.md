# Reto 3: Explorador

**Opcional.** Aproximadamente 45 minutos.

Ordena los resultados por día o por nombre.

## Tarea

1. Agrega a los filtros un `<select id="sort">` con su etiqueta, con las opciones «Name (A to Z)» (nombre, de la A a la Z) y «Day» (día).
2. Dale a cada programa un número `dayOrder` (el lunes es 1 y el domingo es 7; «Weekdays», entre semana, es 1).
3. Antes de dibujar las tarjetas, ordena el arreglo filtrado:

   ```js
   found.sort((a, b) => a.name.localeCompare(b.name));   // by name
   found.sort((a, b) => a.dayOrder - b.dayOrder);         // by day
   ```

   La primera línea ordena por nombre y la segunda, por día.

4. `localeCompare` ordena el texto según las reglas del idioma, así que las letras con acento se ordenan de forma lógica. El orden depende del idioma, así que indica uno: `a.name.localeCompare(b.name, 'es')`, o `'zh'` para chino.

## Por qué esto importa

Ordenar es una de las cosas que las personas quieren con más frecuencia de una lista, y `sort` con una función de comparación es una de las herramientas más útiles de JavaScript.

## Se completa cuando

- [ ] El control para ordenar tiene etiqueta y funciona con el teclado.
- [ ] Los dos órdenes son correctos, y los filtros siguen funcionando.
