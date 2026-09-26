# Reto 1: Fundamento

**Obligatorio.** Aproximadamente 45 minutos.

Termina los seis TODOs numerados para que el panel de información y la verificación del límite de rendimiento funcionen ambos.

## Tarea

1. En `starter/index.html`, completa el TODO 1: agrega el contenedor `#info-panel` dentro de "3. Info panel".
2. En `starter/index.html`, completa el TODO 2: agrega los elementos `#budget-calls`, `#budget-triangles`, y `#budget-result` dentro de "5. Performance budget".
3. En `starter/js/main.js`, completa el TODO 3: escribe `renderInfoPanel(item)`.
4. Completa el TODO 4: llámala desde `selectItem()`.
5. Completa el TODO 5: agrega la constante `BUDGET` y la comparación en vivo dentro de `updateStats()`.
6. Completa el TODO 6: limpia el panel de información cuando la exhibición se recarga.
7. Repasa [`../tests/checklist.md`](../tests/checklist.md), incluida la sección "3D and XR (manual)".

## Por qué importa

Una exhibición que solo alguien con mouse y puntero puede explorar, o que nunca dice si es lo bastante rápida para publicarse, no está lista para publicar. El panel de información y la verificación del límite son la propia contribución de este proyecto final sobre el motor de 3.1-3.6: pequeñas, pero son lo que convierte una demo funcional en un proyecto que alguien más podría leer, confiar, y reutilizar.

## Se completa cuando

- [ ] Seleccionar cualquier exhibición abre su panel de información con los detalles correctos.
- [ ] Los números del límite de rendimiento se actualizan en vivo y dicen si la exhibición está dentro del límite.
- [ ] Cada punto de [`../tests/checklist.md`](../tests/checklist.md) está marcado.
- [ ] La consola del navegador no muestra errores.
