# Reto 2: Creativo

**Opcional.** Aproximadamente 45–60 minutos.

Haz tuyo el planificador, cambiando solo `config.js`, y una cosa más.

## Tarea

1. En `config.js`, define tu meta semanal real y la duración de sesión. ¿Todo lo demás lo sigue automáticamente, incluida la frase del resumen y el total de tiempo?
2. ¿Tu semana empieza el lunes o el domingo? Cambia `DAYS` para que coincida, y actualiza las `<option>` en `index.html`.
3. Muestra los nombres de los días y las horas en tu idioma, usando la API `Intl` integrada del navegador, para que no haga falta ninguna lista de traducción:

   ```js
   new Intl.DateTimeFormat('es', { weekday: 'long' }).format(someDate)
   new Intl.DateTimeFormat('zh-Hans', { hour: 'numeric', minute: '2-digit' }).format(someDate)
   ```

   Mantén los nombres de los días en inglés como los valores almacenados (así el ordenamiento sigue funcionando), y traduce solo lo que se muestra. ¿Qué archivo es el lugar correcto para eso: `utils.js`, un componente, o `main.js`? Escribe por qué.
4. Ajusta `<html lang>` para que coincida con el idioma que muestras.

## Por qué importa

Tener los ajustes en un solo lugar, y mantener el formato separado de los datos, es lo que hace que una app sea fácil de traducir. El Curso 6.2 se construye exactamente sobre esta idea.

## Se completa cuando

- [ ] Tu propia meta, duración de sesión y primer día de la semana, todo desde `config.js`.
- [ ] Los días y las horas se muestran en tu idioma, con los datos almacenados sin cambios.
- [ ] Las sesiones viejas guardadas siguen cargando y ordenándose correctamente.
