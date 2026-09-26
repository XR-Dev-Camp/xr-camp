# Reto 3: Explorador

**Reto opcional.** Aproximadamente 90 minutos.

Profundiza más en la compresión de texturas o en la decisión entre fusionar e instanciar, midiendo, no adivinando.

## Tarea

Elige una opción:

**A. Una conversión KTX2 real.** Trabajando localmente (esto no necesita formar parte del proyecto calificado, ya que agregaría un archivo binario de recurso que este repositorio no necesita), instala las herramientas gratuitas de [KTX-Software](https://github.com/KhronosGroup/KTX-Software), exporta uno de tus canvas de muestra generados como PNG, y conviértelo con `basisu` en un archivo `.ktx2`. Cárgalo con `KTX2Loader` (el ejemplo comentado en `js/textures.js` es tu punto de partida) en una copia de prueba de la página, y compara el tamaño que informa `renderer.info.memory.textures`, y el tamaño del archivo en disco, contra el PNG original. Escribe lo que mediste.

**B. Profundiza en la decisión entre fusionar e instanciar.** Construye una segunda versión de los objetos de la cuadrícula principal usando una geometría fusionada (como el piso) en lugar de tres lotes `InstancedMesh`, y mide `renderer.info.render.calls` y el tiempo que toma hacer clic en "Reconstruir" para ambas versiones. Luego haz que un tipo de pedestal cambie de color al hacer clic, en ambas versiones, y observa cuál lo hace fácil y cuál lo hace difícil. Anota qué enfoque elegirías, y por qué, para una sala donde cada pedestal necesita poder cambiar de color de forma independiente.

## Por qué importa

El README plantea reglas generales ("instancia una vez que tengas docenas", "fusiona cuando una transformación nunca necesita cambiar de forma independiente") como orientación, no como ley. Poner a prueba una de ellas contra tus propias mediciones, en tu propia máquina, es cómo una regla general se convierte en algo que realmente entiendes en lugar de algo que memorizaste.

## Se completa cuando

- [ ] Elegiste un camino (A o B) y realmente mediste algo, en lugar de razonarlo en abstracto.
- [ ] Puedes decir, en una o dos oraciones, qué mediste y qué significa para cuándo elegirías una técnica sobre la otra.
- [ ] Nada de lo que cambiaste para este reto rompió el proyecto obligatorio: vive en una copia de prueba o en un experimento claramente separado, no en `completed/`.
