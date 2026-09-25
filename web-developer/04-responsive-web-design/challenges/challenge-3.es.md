# Reto 3: Explorador

**Opcional.** Aproximadamente 45 minutos.

Dos columnas para el formulario de inscripción en pantallas anchas, sin cambiar su orden de lectura.

## Tarea

1. Solo en pantallas anchas, muestra el `fieldset` «About you» (sobre ti) y la elección de programa lado a lado, con el resto del formulario abajo.
2. Usa CSS grid en el `<form>` dentro de una consulta `@media (min-width: 60rem)`.
3. **No** muevas nada en el HTML.
4. Recorre el formulario con **Tab**: el foco se tiene que seguir moviendo en un orden lógico, de arriba abajo y de izquierda a derecha.

## Por qué esto importa

CSS grid puede colocar las cosas en cualquier lugar de la pantalla, y eso hace fácil mostrarlas en un orden y leerlas en otro. Quienes usan el teclado o un lector de pantalla siguen el orden del HTML, así que el orden visual y el orden de lectura tienen que coincidir.

## Se completa cuando

- [ ] En pantallas anchas, los dos grupos están lado a lado.
- [ ] El orden del HTML no cambió.
- [ ] **Tab** recorre el formulario en el orden en que se ve.
