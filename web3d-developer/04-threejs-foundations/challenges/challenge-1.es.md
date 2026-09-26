# Reto 1: Fundamento

**Obligatorio.** Aproximadamente 45 minutos.

Agrega un cuarto objeto a la exhibición, en su propio pedestal.

## Tarea

1. En `exhibit.js`, agrega una cuarta entrada a `ITEMS`: un `id`, un `name`, de qué está `made`, una `note` estilo etiqueta de museo, y una posición `x` (prueba `2.6`, así queda después de la piedra de jade).
2. Escribe una función `build...()` para él, usando solo primitivas (`BoxGeometry`, `CylinderGeometry`, `SphereGeometry`, `ConeGeometry`, `TorusGeometry`), y agrégala a `BUILDERS`.
3. Elige su material como hiciste con los otros tres: ¿qué tan rugoso o brillante es el objeto real? ¿Es un metal (`metalness` cercano a 1) o no (`metalness` cercano a 0)?
4. Revisa `describeExhibit()` en `describe.js`: debería describir tu nuevo objeto automáticamente, porque lee de `data.made` y `data.note`, no de una lista escrita a mano. Si no lo hace, es una señal de que algo lee los tres objetos originales por nombre en lugar de recorrer `items` en un bucle.
5. Haz clic en **Reconstruir escena**. Tu cuarto objeto debería reaparecer, y los conteos de Geometries y Textures en el panel Stats deberían volver a los mismos números que antes.

## Por qué importa

Agregar un objeto toca todo lo que construyó esta lección: el arreglo `ITEMS` basado en datos, una geometría primitiva y una elección de material, la descripción que lee de los mismos datos, y la liberación de memoria. Si tu cuarto objeto aparece, se describe correctamente, y sobrevive a una reconstrucción sin filtrar memoria, entiendes cómo encajan los cuatro archivos.

## Se completa cuando

- [ ] El cuarto objeto está de pie en su propio pedestal, construido a partir de primitivas.
- [ ] Su material corresponde a lo que está hecho.
- [ ] La descripción de la escena lo menciona, sin un caso especial escrito para él.
- [ ] Reconstruir escena funciona, y los conteos de memoria del panel Stats no suben.
