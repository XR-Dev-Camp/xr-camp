# Reto 1: Fundamento

**Obligatorio.** Aproximadamente 45 minutos.

Agrega un tercer modelo glTF real a la exhibición, en su propio pedestal.

## Tarea

1. Explora el repositorio [Khronos glTF-Sample-Assets](https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models) y elige un modelo de menos de 1 MB (revisa el tamaño de archivo de su carpeta `glTF-Binary` en GitHub antes de descargarlo).
2. Abre su archivo `LICENSE.md` y léelo completo. Anota la licencia exacta (CC0, CC BY, u otra) y el nombre de la artista.
3. Descarga su archivo `.glb` en `assets/`, y revisa que `assets/` se mantenga muy por debajo de los límites de este proyecto (consulta [`docs/en/3d-assets-and-versions.md`](../../../docs/en/3d-assets-and-versions.md), en inglés).
4. Agrega una sexta entrada a `ITEMS` en `exhibit.js`: un `id`, un `name`, `kind: 'model'`, su ruta `file`, una posición `x` después del camión de leche (prueba `5.2`), una `note`, y `credit`, `licenseUrl`, `licenseLabel`, y `sourceUrl` construidos a partir de lo que realmente dice su `LICENSE.md`; no copies el texto de crédito del zorro o el camión de leche de este proyecto cambiando solo el nombre.
5. Agrega su línea de crédito a `ATTRIBUTION.md`.
6. Recarga la página. Tu tercer modelo debería aparecer en su propio pedestal, cargar correctamente, ser seleccionable por clic y por su propio botón Seleccionar, y aparecer en el panel de atribución, todo sin un caso especial escrito para él en ninguna parte del código.

## Por qué importa

Cada otro objeto de este proyecto está basado en datos: `describeExhibit()`, `renderItemList()`, `renderAttribution()`, y los botones Seleccionar leen todos de `ITEMS`, no de una lista escrita a mano de "el zorro y el camión". Agregar correctamente un sexto objeto, sin nada más escrito a mano, es la prueba de que la separación de datos y código de este proyecto realmente funciona, no solo para los dos objetos con los que se entregó.

## Se completa cuando

- [ ] Un tercer modelo está de pie en su propio pedestal, carga correctamente, y es seleccionable.
- [ ] Su licencia y crédito, leídos de su `LICENSE.md` real, aparecen en la página y en `ATTRIBUTION.md`.
- [ ] Ninguna función en ningún lugar se modificó para agregar un caso especial para este modelo por su nombre.
