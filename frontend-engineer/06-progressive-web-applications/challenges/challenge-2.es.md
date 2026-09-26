# Reto 2: Creativo

**Opcional.** Aproximadamente 60 minutos.

Haz la app realmente tuya: su icono, sus colores, su nombre, y su página sin conexión, en tu idioma.

## Tarea

1. Dibuja tu propio icono en SVG: algo de tu pueblo, tu cultura, o el clima de tu comunidad (una montaña, un volcán, un río, un farol). Mantenlo simple: pocas formas se leen mejor en tamaños pequeños.
2. Haz una versión maskable: llena todo el cuadrado con color, y mantén las formas importantes dentro del círculo central (radio del 40% del ancho). Revísala en el editor gratuito [Maskable.app](https://maskable.app/editor) (en inglés).
3. Genera los PNG: abre el SVG en tu navegador, toma una captura de pantalla a 192 y 512 píxeles (o usa cualquier editor de imágenes gratuito), y reemplaza los archivos en `icons/`. Da crédito a tu icono en `ATTRIBUTION.md`.
4. Cambia `name`, `short_name`, `theme_color` y `background_color`. Pon `lang` en `es` o `zh-Hans` si tu app está en español o chino, y traduce `offline.html` y el mensaje de actualización.
5. Cambia `VERSION` para que las personas que ya tienen la app reciban los cambios.

## Por qué esto importa

Un icono en la pantalla de inicio es una promesa: esto está hecho para ti. Cuando el nombre, el icono y la página sin conexión hablan el idioma de tu comunidad, la app se siente como algo que le pertenece.

## Se completa cuando

- [ ] Tu propio icono aparece en **Application > Manifest**, y el maskable sobrevive dentro de un círculo.
- [ ] El nombre y los colores son tuyos, y el texto sigue cumpliendo el contraste (4.5:1) en la página sin conexión.
- [ ] `offline.html` y el mensaje de actualización están en tu idioma, con `lang` bien configurado.
- [ ] Tu icono está acreditado en `ATTRIBUTION.md`.
