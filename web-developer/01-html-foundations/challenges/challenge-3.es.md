# Reto 3: Explorador

**Opcional y avanzado.** Aproximadamente dos horas.

Agrega datos estructurados legibles por máquinas y una declaración de accesibilidad.

## Tarea

### Parte A — Datos estructurados

Los buscadores y las herramientas de asistencia entienden mejor tu página si la describes en un formato pensado para máquinas. Agrega un bloque `<script type="application/ld+json">` en tu `<head>` usando el vocabulario de [schema.org](https://schema.org/): `Organization` o `LocalBusiness` encajan bien en una página comunitaria.

Incluye el nombre, la dirección, el teléfono y el horario. Compruébalo con el [Schema Markup Validator](https://validator.schema.org/).

Fíjate en lo que estás haciendo: declarar los mismos datos dos veces, una para las personas y otra para las máquinas. Piensa qué ocurre cuando ambas versiones dejan de coincidir.

### Parte B — Declaración de accesibilidad

Agrega `accessibility.html` describiendo, con honestidad:

- Qué hiciste para que la página fuera accesible.
- Cómo la probaste y con qué herramientas.
- Qué sabes que todavía no está bien.
- Cómo puede alguien informarte de un problema.

## Por qué esto importa

La parte A es la razón por la que la web se volvió legible por máquinas, y es el antecedente directo del trabajo con datos espaciales y semánticos de las fases 4 y 5.

La parte B importa aún más. Muchos organismos públicos están legalmente obligados a publicar una declaración de accesibilidad, y la mayoría de esas declaraciones son deshonestas: afirman un cumplimiento total que no existe. Escribir una honesta, incluyendo lo que no lograste, es un hábito profesional que conviene adquirir ya. Nadie publica un sitio perfectamente accesible. Decirlo con claridad es lo que distingue a un profesional de alguien que solo vende.

## Se completa cuando

- [ ] Los datos estructurados pasan el Schema Markup Validator sin errores.
- [ ] Los datos estructurados coinciden exactamente con la página visible.
- [ ] Existe `accessibility.html`, está enlazado desde el pie de página y menciona al menos una limitación real.
- [ ] Probaste con un lector de pantalla real y describiste lo que encontraste.
