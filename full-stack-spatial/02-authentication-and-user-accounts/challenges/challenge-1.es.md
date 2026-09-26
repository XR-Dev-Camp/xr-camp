# Reto 1: Fundamento

**Obligatorio.** Aproximadamente 45 minutos.

Agrega una sugerencia de fortaleza de contraseña que nunca bloquee una contraseña lo bastante larga.

## Tarea

1. En `js/main.js`, agrega un `<p>` (con un `id`, y `aria-live="polite"`) bajo el campo de contraseña del formulario de registro, y actualiza su texto en cada evento `input`: algo como "Faltan 9 caracteres" mientras la contraseña sea demasiado corta, y "Suficientemente larga" una vez que alcance `MIN_PASSWORD_LENGTH` (10). Lee la longitud del lado del cliente; no llames al servidor para esto.
2. La sugerencia nunca debe deshabilitar ni bloquear el botón de envío, y nunca debe afirmar que una contraseña es "débil" por no tener un símbolo o un número: la regla de este curso (Paso 3 del README) es solo la longitud, siguiendo NIST SP 800-63B. Una frase de contraseña de 24 caracteres sin ningún símbolo debe mostrar "Suficientemente larga."
3. Mantén la comprobación existente del lado del servidor en `validateCredentials()` exactamente como está: esta sugerencia es una cortesía para quien llena el formulario, nunca un reemplazo de la comprobación que en verdad decide si una contraseña se acepta.
4. Asegúrate de que la redacción de la sugerencia siga teniendo sentido para alguien que usa un lector de pantalla: no debe depender solo del color para decir "todavía no es suficientemente larga" frente a "suficientemente larga."

## Por qué importa

Una regla de contraseña que quien aprende no puede ver hasta que envía el formulario es una regla que desperdicia su tiempo, un intento a la vez. Una regla que *finge* exigir más de lo que en realidad exige (o de lo que respalda la investigación) entrena a las personas a escribir contraseñas predecibles y difíciles de recordar sin ninguna ganancia real de seguridad. Este reto es la versión más pequeña de una decisión real y común de producto: decir la verdad sobre el requisito, lo antes posible, con la menor cantidad de palabras posible.

## Terminado cuando

- [ ] La sugerencia se actualiza mientras escribes, sin enviar el formulario.
- [ ] Una frase de contraseña de 24 caracteres sin símbolos muestra "Suficientemente larga."
- [ ] El botón de envío nunca queda deshabilitado por esta sugerencia.
- [ ] `node --test` sigue pasando sin cambios.
