# Desafío 1: Fundamento

**Obligatorio.** Aproximadamente 45 minutos.

Recuerda las elecciones de quien aprende y di qué tan reciente son los datos, en palabras humanas.

## Tarea

1. Guarda la ciudad elegida y la opción «Use sample data» (Usar datos de ejemplo) en `localStorage` (en un módulo pequeño propio, no en `cache.js`: una responsabilidad por archivo). Restáuralas cuando se cargue la página.
2. Reemplaza "Guardado en este navegador a las 14:05" por un tiempo relativo: "actualizado hace 5 minutos", "actualizado hace 2 horas". Usa `Intl.RelativeTimeFormat`, que habla todos los idiomas:

   ```js
   new Intl.RelativeTimeFormat('es', { numeric: 'auto' }).format(-5, 'minute')   // "hace 5 minutos"
   ```

3. Escríbelo como una función pura, `describeAge(savedAt, now)`, para poder probarla con horas fijas (pasa `now` como parámetro, en lugar de llamar a `Date.now()` dentro de la función).
4. Compruébala con: hace 30 segundos, hace 5 minutos, hace 3 horas, hace 2 días.

## Por qué importa

"14:05" obliga a quien aprende a hacer una resta; "hace 5 minutos" no. Y recordar la ciudad de alguien, para que nunca tenga que volver a elegirla, es el tipo de pequeño detalle que hace que la gente regrese a una app.

## Terminado cuando

- [ ] Al recargar se conservan la ciudad y la opción de datos de ejemplo.
- [ ] La línea de origen dice hace cuánto se guardaron los datos.
- [ ] `describeAge` es pura, y la comprobaste con cuatro horas fijas.
