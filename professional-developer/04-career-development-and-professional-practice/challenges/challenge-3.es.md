# Reto 3: Explorador

**Reto opcional.** Aproximadamente 90 minutos.

Agrega datos estructurados de `schema.org` a tu página de CV, y comprueba que sean válidos.

## Tarea

1. Lee una vez, por completo, la referencia del tipo [schema.org `Person`](https://schema.org/Person) antes de escribir nada.
2. Agrega un bloque `<script type="application/ld+json">` al `<head>` de tu `index.html`, describiéndote como una `Person`: como mínimo `name`, `jobTitle`, `email`, y una lista `knowsAbout` tomada de tu tabla real de habilidades.
3. Mantén cada valor verdadero y consistente con la página visible; unos datos estructurados que contradicen lo que puede ver quien visita la página son peores que no tener ninguno.
4. Valida tu marcado con una comprobación de sintaxis JSON (cualquier validador de JSON, o la consola de tu navegador con `JSON.parse`) y, si tienes acceso a internet a un validador público, uno que entienda schema.org.
5. Escribe dos o tres oraciones en tu diario sobre qué podría hacer ahora un motor de búsqueda, u otra herramienta, con tu página que no podía hacer antes.

## Por qué importa

Un CV que solo pueden leer personas está bien para un mensaje directo, pero los datos estructurados le permiten a otro software (un motor de búsqueda, una herramienta de emparejamiento de empleo, o tus propios futuros scripts) entender los datos de una página sin adivinar. Es la misma idea detrás de los atributos `aria-*` y el HTML semántico que ha enseñado este curso todo el tiempo: hacer explícito el significado, para un tipo distinto de lector.

## Se completa cuando

- [ ] Existe un bloque `application/ld+json` válido en el `<head>` de `index.html`.
- [ ] Cada valor en él es verdadero y coincide con la página visible.
- [ ] El JSON es sintácticamente válido, comprobado con un validador real.
