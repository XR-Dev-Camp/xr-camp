# Reto 1: Fundamento

**Obligatorio.** Aproximadamente 30 minutos.

Cambia la caja por una esfera en las tres herramientas.

## Tarea

1. En `examples/x3dom.html`, reemplaza `<box size="1.5 1.5 1.5"></box>` por `<sphere radius="0.9"></sphere>`.
2. En `examples/aframe.html`, cambia `a-box` por `a-sphere` tanto en la etiqueta de apertura como en la de cierre, y agrega `radius="0.8"`.
3. En `examples/three.html`, reemplaza `new THREE.BoxGeometry(1, 1, 1)` por `new THREE.SphereGeometry(0.7, 32, 16)`.
4. Actualiza la `scene-description` de las tres páginas: ahora es una esfera.
5. Recarga el laboratorio. En tu diario, anota cuántas cosas tuviste que cambiar en cada herramienta.

## Por qué esto importa

El mismo cambio, tres cantidades de trabajo distintas. Darte cuenta de eso es como empiezas a elegir herramientas por buenas razones y no por costumbre.

## Se completa cuando

- [ ] Los tres ejemplos muestran una esfera.
- [ ] Las tres descripciones dicen «esfera».
- [ ] Tu diario compara el esfuerzo en cada herramienta.
