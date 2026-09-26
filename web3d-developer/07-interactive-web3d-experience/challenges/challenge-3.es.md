# Reto 3: Explorador

**Reto opcional.** Aproximadamente 90 minutos.

Agrega una sexta exhibición que use una técnica de three.js que este proyecto final no cubre de otra forma, y mide su costo.

## Tarea

1. Agrega una exhibición más usando una técnica de una parte anterior de la Fase 3 que la solución de referencia no usa en sus propias exhibiciones; por ejemplo, `THREE.LOD` de 3.6 para reemplazar por una forma más simple a distancia, o una segunda pista de animación reproducida con un peso de mezcla distinto de `AnimationAction`.
2. Dale un pedestal, una entrada en el panel de información, y un lugar en la descripción de la escena y en el gemelo 2D, exactamente como a las otras cinco.
3. Mide su costo con `renderer.info` antes y después de agregarla (el método de 3.6), y agrega una fila a la tabla de rendimiento del README mostrando la diferencia "en mi máquina".
4. Si la nueva exhibición cambia el conteo de llamadas de dibujo o de triángulos lo suficiente como para poner en riesgo el límite de 20 llamadas / 25,000 triángulos, optimízala (reutilizando una técnica de 3.6) o escribe, en `CHANGELOG.md`, una nota clara subiendo el límite y explicando por qué.

## Por qué importa

Publicar un proyecto final también es tomar una decisión sobre rendimiento: no toda función nueva es gratis, y un proyecto profesional declara su costo en lugar de ocultarlo. Este reto es la misma disciplina que enseñó 3.6, aplicada a algo que construiste tú misma.

## Se completa cuando

- [ ] Existe una sexta exhibición, completamente conectada al panel de información, la descripción, y el gemelo 2D.
- [ ] Su costo medido está documentado en el README, expresado como números, "en mi máquina".
- [ ] La verificación del límite de rendimiento sigue informando correctamente, ya sea que la exhibición esté dentro del límite o que el límite se haya subido deliberadamente y se haya explicado.
