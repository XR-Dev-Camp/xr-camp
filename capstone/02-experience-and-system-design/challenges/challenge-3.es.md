# Reto 3: Explorador

**Reto opcional.** Aproximadamente 90 minutos.

Diseña tu modelo de datos para soportar un segundo idioma desde el inicio.

## Tarea

1. En `data-model.md`, revisa tu tipo de contenido primario para que cada campo de texto (títulos, descripciones, etiquetas) pueda contener valores en más de un idioma; por ejemplo, un objeto con `title.en` y `title.es` en lugar de una sola cadena `title`.
2. Anota, en el mismo documento, cómo elegiría tu esbozo de API (`api.md`) qué idioma devolver, y qué pasa si falta una traducción.
3. Agrega una entrada a tu plan de pruebas (`test-plan.md`) que compruebe este comportamiento una vez que la Etapa 3 tenga código que probar.

## Por qué importa

XR Camp está escrito primero en inglés y traducido después, y sus propios archivos de catálogo y contenido usan exactamente este patrón. Diseñar para más de un idioma desde el inicio, incluso antes de tener traducciones, evita un rediseño costoso más adelante; esta es práctica real de cómo está construido el propio curso que estás tomando.

## Se completa cuando

- [ ] Al menos un tipo de contenido soporta múltiples idiomas por campo, no duplicando registros completos.
- [ ] El esbozo de API explica cómo se elige un idioma, incluyendo un respaldo (fallback).
- [ ] El plan de pruebas incluye una comprobación para el comportamiento cuando falta una traducción.
