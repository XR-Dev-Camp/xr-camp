# Reto 3: Explorador

**Reto opcional.** Aproximadamente 90 minutos.

Reemplaza el sustituto 2D "Place marker" por una sesión real `immersive-ar` con hit-test, en un teléfono o visor compatible.

## Tarea

1. Lee el explicador de hit-test de la WebXR Device API (enlazado en Lecturas adicionales del README).
2. En un nuevo `js/ar.js`, solicita una sesión `immersive-ar` con `requiredFeatures: ['hit-test']`, siguiendo la misma regla de "solicitar solo desde un clic real" que ya sigue `js/xr.js` para VR.
3. Crea un `XRHitTestSource` a partir del espacio de referencia del visor, y en cada cuadro, usa su resultado para mover una malla de mira a través de cualquier superficie real que vea la cámara.
4. Al tocar la pantalla (o un evento `select` de XR), coloca el mismo marcador que ya crea `js/interact.js`, en la posición reportada por la mira, en lugar de en el punto fijo.
5. Mantén el botón "Place marker" existente como el equivalente 2D/teclado para cualquiera sin hardware AR -no lo elimines.
6. Pruébalo en un dispositivo real compatible con AR si tienes acceso a uno; si no, dilo con honestidad en `CHANGELOG.md`, exactamente como lo hace la propia entrada `1.0.0` de este proyecto final para sus propias rutas de hardware no probadas.

## Por qué importa

El AR con hit-test es la única pieza de 4.2 que la solución de referencia de este proyecto final reemplazó con un sustituto 2D, porque necesita hardware que la mayoría de las estudiantes no tiene. Construir la versión real, y ser honesta sobre lo que pudiste y no pudiste probar, es para lo que sirve el hábito de la matriz de pruebas de 4.6.

## Se completa cuando

- [ ] `js/ar.js` solicita una sesión real `immersive-ar` con hit-test en hardware compatible.
- [ ] El botón "Place marker" existente sigue funcionando como el equivalente 2D/teclado.
- [ ] `CHANGELOG.md` indica con claridad qué se probó, y qué no, en hardware real.
