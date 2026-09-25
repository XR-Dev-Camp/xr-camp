# Reto 3: Explorador

**Opcional.** Aproximadamente 30 minutos.

Carga un modelo glTF real en A-Frame.

## Tarea

1. Copia `examples/aframe.html` y ponle a la copia el nombre `examples/gltf.html`.
2. Reemplaza la línea `<a-box ...></a-box>` por:

   ```html
   <a-gltf-model src="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Duck/glTF-Binary/Duck.glb"
                 position="0 1 -3" scale="1 1 1"></a-gltf-model>
   ```

   Este pato es un modelo de muestra que el Khronos Group publica para hacer pruebas con glTF. Es © Sony Computer Entertainment Inc., y se comparte bajo la SCEA Shared Source License 1.0. Dale el crédito en tu página si la publicas.
3. Abre `examples/gltf.html` en tu navegador. Si el pato es demasiado grande o demasiado pequeño, cambia `scale`.
4. Vuelve a escribir su `scene-description`.
5. Agrégalo a tu laboratorio como un cuarto `<figure>`.

## Por qué esto importa

Casi todos los proyectos 3D reales cargan modelos que alguien hizo en otro programa, como Blender. glTF es la forma en que esos modelos llegan a la web, en todos los motores que vas a usar.

## Se completa cuando

- [ ] El pato aparece, con un tamaño razonable.
- [ ] La descripción coincide con lo que ves.
- [ ] Anotaste en tu diario el tamaño del archivo del modelo: unos 120 KB. Compáralo con una foto de tu celular.
