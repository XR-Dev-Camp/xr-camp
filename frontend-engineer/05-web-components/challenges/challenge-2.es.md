# Reto 2: Creativo

**Opcional.** Aproximadamente 45–60 minutos.

Haz una tarjeta que hable tu idioma, sobre algo de tu comunidad.

## Tarea

1. Escribe una tarjeta nueva, directamente en `index.html`, sobre algo que te gustaría aprender o enseñar: un taller en tu pueblo, un oficio de tu familia, un proyecto con amigas. Usa los slots: una descripción, y cualquier otra cosa que quieras en el slot por defecto (una lista, un enlace, una nota).
2. Haz que las palabras propias de la tarjeta sigan el idioma de la página. Busca el `lang` más cercano con `this.closest('[lang]')?.lang`, y guarda las palabras en una pequeña tabla:

   ```js
   const WORDS = {
     en: { ready: 'Ready', 'coming-soon': 'Coming soon', done: 'Done' },
     es: { ready: 'Disponible', 'coming-soon': 'Próximamente', done: 'Hecho' },
   };
   ```

   Agrega tu propio idioma si no está ahí. Recurre al inglés para cualquier idioma que no hayas escrito.

3. Muestra el tiempo con la API `Intl` del navegador, para que los números también sigan tu idioma: `new Intl.NumberFormat('es').format(10)`.
4. Define `lang` en una sola tarjeta (`<lesson-card lang="es">`), y comprueba que solo esa tarjeta cambia. ¿Cambia también de idioma el nombre accesible del botón?

## Por qué esto importa

Un componente se usa en muchos lugares, por muchas personas. Cuando sus palabras vienen del idioma de la página, un solo componente sirve a cada comunidad, y las lecciones de XR Camp están escritas en inglés, español, y chino exactamente por esa razón.

## Se completa cuando

- [ ] Una tarjeta sobre algo de tu propia comunidad, con ambos slots en uso.
- [ ] La insignia, el botón, y el tiempo aparecen en el idioma de la página.
- [ ] Un idioma desconocido recurre al inglés, sin errores.
- [ ] El nombre del botón sigue empezando con su palabra visible.
