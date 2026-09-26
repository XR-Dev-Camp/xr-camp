# Reto 2: Creativo

**Opcional.** Aproximadamente 45-60 minutos.

Agrega un campo de perfil propio, privado por defecto.

## Tarea

1. Elige un campo pequeño y opcional que signifique algo para ti: un nombre para mostrar en tu propio idioma, un breve "acerca de mí," un pronombre, o un enlace a algo que hayas hecho. Agrégalo al objeto de cuenta en `store.js` (una clave nueva junto a `privacySharesSettings`), con un valor por defecto de cadena vacía o `false` cuando se crea una cuenta.
2. Agrega una ruta (o extiende `updatePrivacy` hacia un `updateProfile` más general) que permita a la cuenta con sesión iniciada cambiar solo *su propio* campo; reutiliza el patrón de propiedad del Paso 12 (`auth.account.id`, nunca un id enviado en el cuerpo) y la comprobación CSRF del Paso 8.
3. Decide, y escríbelo en un comentario, si tu nuevo campo es privado por defecto (como `privacySharesSettings`) o público por defecto (como el nombre de usuario), y asegúrate de que `exportAccount()` y, si es privado, `listSharedAccounts()` lo traten en consecuencia.
4. Agrégalo al formulario de cuenta o a la sección de privacidad en `index.html`, con una etiqueta visible, y conéctalo en `js/main.js`.

## Por qué importa

Todo sistema de cuentas eventualmente crece con campos más allá de "nombre de usuario y contraseña", y cada uno de esos campos necesita que se haga y se responda a propósito la misma pregunta: ¿quién puede ver esto, por defecto? Decidirlo deliberadamente, para un campo que signifique algo para ti, se queda más grabado que leer la regla en abstracto.

## Terminado cuando

- [ ] Tu nuevo campo va y vuelve correctamente al guardar y recargar, solo para tu propia cuenta.
- [ ] Puedes decir, en una frase, por qué elegiste que fuera público o privado por defecto.
- [ ] `node --test` sigue pasando, con al menos una prueba nueva para el campo.
