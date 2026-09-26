# Reto 1: Fundamento

**Obligatorio.** Aproximadamente 45 minutos.

Agrega un cuarto objeto al laboratorio de conceptos, y dale control sobre él a quien aprende.

## Tarea

1. Agrega un tazón pequeño o un libro a la mesa (cualquier geometría: una `SphereGeometry` cortada a la mitad, una `BoxGeometry` plana, una `TorusGeometry`). Dale un `name`, para que aparezca en la lista del grafo de escena.
2. Hazlo hijo de la mesa, para que gire con ella.
3. Agrega un control deslizante con etiqueta, en un nuevo fieldset, que cambie la luminosidad de su color de oscuro a claro. Usa `material.color.setHSL(hue, saturation, lightness)`, con números de 0 a 1.
4. Actualiza la descripción de la escena para que mencione el nuevo objeto, su posición, y qué tan claro u oscuro es en palabras ("oscuro", "medio", "claro"), no solo con números.
5. Verifica que **Restablecer todo** también lo reinicie a él.

## Por qué importa

Agregar un objeto toca cada idea de la lección: geometría, material, el grafo de escena, un control, y la descripción. Si puedes hacer esto sin romper nada, entiendes cómo encaja el laboratorio completo.

## Se completa cuando

- [ ] El nuevo objeto está sobre la mesa y gira con ella.
- [ ] Su control deslizante tiene una etiqueta visible y muestra su valor.
- [ ] La descripción y la lista del grafo de escena lo incluyen.
- [ ] Restablecer lo devuelve a su estado original.
