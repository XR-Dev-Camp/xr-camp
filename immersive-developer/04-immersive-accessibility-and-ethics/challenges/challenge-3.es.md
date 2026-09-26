# Reto 3: Explorador

**Reto opcional.** Aproximadamente 90 minutos.

Ve más allá de una transcripción fija: prueba subtítulos reales en vivo, o una segunda participante real.

## Tarea

Elige una opción:

- **Subtítulos en vivo.** Usa el `SpeechRecognition` de la Web Speech API (donde tu navegador lo permita -no es universal, así que detéctalo con detección de funciones y conserva la transcripción fija como alternativa) para subtitular la propia "pregunta" hablada de una estudiante, en lugar de solo las líneas fijas de la presentadora. Muestra el texto reconocido en el mismo elemento `#captions` que ya construyó esta lección.
- **Una segunda participante real.** Usando solo herramientas gratuitas (por ejemplo, un canal de datos de WebRTC mediante un enfoque de señalización gratuito, o una pestaña de navegador compartida mediante la [API BroadcastChannel](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel) entre dos pestañas en el mismo dispositivo, para pruebas), reemplaza a la visitante simulada por una segunda conexión real, manteniendo el radio de espacio personal, y los controles de silenciar y bloquear que ya construyó esta lección.

## Por qué importa

La visitante y los subtítulos de esta lección son sustitutos deliberadamente simplificados, explicados con claridad como tales en `audit.md`, porque XR Camp no tiene un backend de multijugador de pago sobre el cual construir. Las experiencias XR compartidas reales necesitan todo lo que construyó esta lección -espacio personal, silenciar, bloquear, consentimiento informado- para funcionar frente a otra persona real, posiblemente impredecible. Este reto es un primer paso pequeño hacia ese problema más difícil.

## Se completa cuando

- [ ] Una de las dos opciones anteriores funciona, de principio a fin, usando solo herramientas gratuitas.
- [ ] El radio de espacio personal, y los controles de silenciar y bloquear (si elegiste la segunda opción) siguen funcionando contra la conexión real.
- [ ] Un comentario en tu código explica qué herramienta gratuita usaste y cualquier límite que tenga (por ejemplo, que `BroadcastChannel` solo funciona entre pestañas del mismo dispositivo, no a través de internet).
