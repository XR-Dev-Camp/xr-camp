# Reto 3: Explorador

**Reto opcional.** Aproximadamente 90 minutos.

Reanuda un solo archivo interrumpido a mitad de camino, en lugar de solo saltar archivos que ya terminaron.

## Tarea

1. Lee [MDN: HTTP range requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests) (en inglés). Un servidor que las soporta responde a una solicitud con un encabezado `Range: bytes=1000-` con una respuesta `206 Partial Content` que contiene solo los bytes restantes, y anuncia el soporte con un encabezado de respuesta `Accept-Ranges: bytes` en solicitudes ordinarias.
2. En `download-manager.js`, antes de iniciar un fetch nuevo para un archivo, comprueba si ya existe una copia *parcial* (necesitarás un registro nuevo y pequeño de OPFS o de la Cache API de "bytes guardados hasta ahora" por archivo; el `saveFile` actual de `bundle-store.js` solo guarda un archivo completo y terminado, así que esto significa agregar una segunda ruta de guardado, más pequeña, para archivos en curso).
3. Si existe una copia parcial, primero envía una solicitud ligera (o revisa los encabezados de una respuesta en caché) para confirmar que el servidor todavía soporta rangos y que el archivo no ha cambiado, luego obtén solo el rango faltante con un encabezado `Range`, y agrega los bytes nuevos a la copia parcial antes de finalmente guardar el archivo completo de la forma normal.
4. Si el servidor no envía `Accept-Ranges: bytes` (el `http.server` de Python, usado para probar este proyecto, no lo hace), recurre al comportamiento existente de esta lección: vuelve a descargar el archivo completo.
5. Pruébalo: inicia una descarga, corta la conexión después de que el archivo más grande (`CesiumMilkTruck.glb`) esté a mitad de camino, reconéctate, y confirma (con el panel de Red) que la solicitud reanudada solo pide los bytes faltantes cuando el servidor lo soporta.

## Por qué importa

La propia lógica de reanudación de esta lección funciona a nivel de archivos completos: un modelo de 370 KB que estaba 90% descargado cuando se cayó la conexión reinicia desde cero. Las solicitudes de rango son la técnica real que usan las herramientas de entrega sin conexión de producción (incluidos la mayoría de los gestores de descarga y reproductores de video) para evitar exactamente ese desperdicio; genuinamente útil en una conexión lenta o medida, y un buen ejemplo de una función de navegador que solo rinde frutos una vez que la compruebas, ya que no todos los servidores la soportan.

## Terminado cuando

- [ ] Un archivo interrumpido a mitad de camino se reanuda desde donde se quedó, cuando el servidor soporta solicitudes de rango.
- [ ] La alternativa (volver a descargar el archivo completo) sigue funcionando contra un servidor que no las soporta.
- [ ] El panel de Red muestra una respuesta real `206 Partial Content` para la solicitud reanudada, con un encabezado `Content-Range` que coincide con lo que realmente faltaba.
