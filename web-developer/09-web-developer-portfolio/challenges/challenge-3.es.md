# Reto 3: Explorador

**Opcional.** Aproximadamente 45 minutos.

Un modo ligero sin imágenes, o una hoja de estilos para imprimir. Elige uno.

## Opción A: un modo ligero

Para personas con datos móviles lentos o caros.

1. Haz una copia de tu página de inicio llamada `light.html`. Quita cada `<img>`, y la etiqueta `<script>`.
2. Conserva todo lo demás: los textos, los enlaces, los encabezados y la hoja de estilos.
3. Al principio de `index.html`, agrega un enlace: «Using slow or expensive data? Read the lightweight version.» (¿Usas datos lentos o caros? Lee la versión ligera). Agrega un enlace desde `light.html` de vuelta a la versión completa.
4. En el panel Network, compara cuánto descarga cada página, y escribe los dos números en tu diario.

## Opción B: una hoja de estilos para imprimir

Para personas que imprimen tu portafolio, o que lo guardan como PDF para enviárselo a alguien.

1. Al final de `styles.css`, agrega un bloque `@media print { }`.
2. Dentro de él: oculta la navegación, el enlace para saltar al contenido, el filtro y el botón «See my projects» (ver mis proyectos); pon el texto en negro y el fondo en blanco; y evita que las tarjetas se partan entre dos páginas con `break-inside: avoid;`.
3. Los enlaces no funcionan en papel, así que muestra la dirección de cada enlace después de él:

   ```css
   .links a::after {
     content: " (" attr(href) ")";
   }
   ```

4. Revísalo con la vista previa de impresión de tu navegador.

## Por qué esto importa

No todas las personas leen tu portafolio como tú. Algunas pagan cada megabyte; otras imprimen las cosas para leerlas con calma. Diseñar para la forma en que las personas leen de verdad es la misma habilidad que la accesibilidad.

## Se completa cuando

- [ ] **Opción A:** `light.html` tiene todos los textos y enlaces y ninguna imagen, las dos versiones se enlazan entre sí, y anotaste el tamaño de las dos páginas.
- [ ] **Opción B:** la vista previa de impresión no muestra la navegación ni los botones, muestra texto negro sobre blanco, ninguna tarjeta partida entre páginas, y la dirección de cada enlace a un proyecto.
