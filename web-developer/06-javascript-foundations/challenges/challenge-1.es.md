# Reto 1: Fundamento

**Obligatorio.** Aproximadamente 30 minutos.

Un botón «Clear filters» (borrar filtros).

## Tarea

1. Agrega un segundo botón al formulario de filtros: `<button type="button" id="clear">Clear filters</button>`. Es `type="button"`, así que no envía el formulario.
2. Cuando se haga clic en él, vacía el cuadro de búsqueda, vuelve a poner el público en «all» (todos), desmarca «Free only» (solo gratuitos), llama a `showResults()` y devuelve el foco al cuadro de búsqueda.
3. Pruébalo con el teclado y con un lector de pantalla.

## Por qué esto importa

Los filtros difíciles de deshacer dejan a las personas atascadas, sin resultados. Restablecer todo y poner el foco en un lugar lógico es un pequeño detalle amable que hace que una interfaz inspire confianza.

## Se completa cuando

- [ ] Una sola pulsación restablece todos los controles y muestra todos los programas.
- [ ] El foco pasa al cuadro de búsqueda.
