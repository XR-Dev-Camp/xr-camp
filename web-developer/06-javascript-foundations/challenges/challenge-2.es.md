# Reto 2: Creativo

**Opcional.** Aproximadamente 45 minutos.

Etiquetas y mensajes en tu propio idioma.

## Tarea

1. Haz una copia del explorador en tu idioma: traduce las etiquetas, las opciones y los encabezados del HTML, y ajusta `lang`.
2. En `explorer.js`, pon todos los mensajes que ven las personas en un solo objeto al principio:

   ```js
   const text = {
     showing: (found, total) => `Mostrando ${found} de ${total} programas.`,
     none: 'Ningún programa coincide. Prueba con menos palabras.',
     save: (name) => `Guardar ${name}`,
   };
   ```

   y úsalo en todas partes, en lugar de escribir los mensajes dentro de las funciones.
3. Traduce también los datos de tus programas.

## Por qué esto importa

Cuando todos los mensajes están en un solo lugar, traducir todo el explorador significa editar un solo objeto. Esa es la idea detrás de la internacionalización que vas a construir en el Curso 6.2.

## Se completa cuando

- [ ] Todas las palabras visibles, incluidos los mensajes que se anuncian, están en tu idioma.
- [ ] Todos los mensajes salen del objeto `text`.
