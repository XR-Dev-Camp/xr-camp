# Reto 3: Explorador

**Reto opcional.** Aproximadamente 90 minutos.

Agrega una quinta columna a tu comparación.

## Tarea

Elige una opción:

- **Babylon.js**: construye la exhibición con Babylon.js, cargado desde una versión fija en un CDN (escribe la versión exacta en la página).
- **PlayCanvas**: construye la exhibición con el motor de código abierto PlayCanvas (no el editor), desde una versión fija.
- **WebGPU**: renderiza tu exhibición de three.js con el `WebGPURenderer` de three.js (impórtalo desde `three/webgpu`, en la misma versión 0.186.1). Primero verifica si tu navegador soporta WebGPU: `'gpu' in navigator`. Si WebGPU no está disponible, usa WebGL como alternativa.

Luego, para tu elección:

1. Dale a la página una descripción de escena y una cámara fija, como las demás.
2. Mide su descarga en el panel Network, y cuenta sus líneas de código de escena.
3. Agrégala como una quinta columna en tu `analysis.md`, y di si cambia tu elección para la exhibición virtual.

## Por qué importa

Leer la documentación de un motor que no conoces, y lograr que la misma escena funcione, es exactamente lo que hacen las desarrolladoras cuando un proyecto necesita una herramienta nueva. Esta habilidad se aplica a cualquier motor que encuentres en el futuro.

## Se completa cuando

- [ ] La exhibición funciona con una quinta tecnología, con una versión fija.
- [ ] Tiene una descripción de escena y una cámara fija.
- [ ] Tu análisis tiene una quinta columna, medida.
