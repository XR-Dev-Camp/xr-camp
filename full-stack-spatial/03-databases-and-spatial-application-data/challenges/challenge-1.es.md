# Reto 1: Fundamento

**Obligatorio.** Aproximadamente 45 minutos.

Agrega una cuarta columna a `scenes` con una nueva migración, y ponla a trabajar: un contador de vistas que sube cada vez que alguien que no es la dueña carga una escena pública.

## Tarea

1. Escribe una migración nueva, `server/migrations/005_add_view_count.sql`:
   ```sql
   ALTER TABLE scenes ADD COLUMN view_count INTEGER NOT NULL DEFAULT 0;
   ```
   Agregar una columna a una tabla existente sigue siendo una migración, ejecutada una vez, en orden, exactamente igual que crear una tabla; por eso el ejecutor de migraciones numera archivos en lugar de solo listar nombres de tablas.
2. En `db.js`, agrega `incrementViewCount(id)` (un `UPDATE scenes SET view_count = view_count + 1 WHERE id = ?` preparado), e incluye `view_count` (como `viewCount`, convertido de la misma forma que ya se convierte cada otra columna) en `rowToScene`.
3. En `getScene` de `routes.js`, llama a `incrementViewCount(sceneId)` solo cuando quien mira **no** es la dueña; una dueña que abre su propia escena mientras la edita no debería inflar el contador.
4. Muestra el contador en el cliente: agrega una línea "Viewed N times" cerca de `#current-scene-owner` en `js/main.js`, usando el campo `viewCount` que ahora devuelve la API.
5. Ejecuta `node --test` y agrega una aserción: ver una escena pública como una cuenta distinta aumenta `view_count` en exactamente uno, y verla de nuevo como la dueña no lo cambia en absoluto.

## Por qué importa

Las aplicaciones reales agregan columnas a tablas que ya tienen datos mucho más a menudo de lo que crean tablas completamente nuevas. Una migración que solo ejecuta `CREATE TABLE` es una trampa fácil en la que caer; este reto obliga al caso más común: un `ALTER TABLE` contra un esquema (y, si has estado probando a mano, filas reales) que ya existe.

## Terminado cuando

- [ ] `005_add_view_count.sql` se ejecuta sin problemas contra una base de datos que ya tiene escenas en ella (pruébalo ejecutando el servidor una vez antes de agregar esta migración, y otra vez después).
- [ ] Ver una escena pública como alguien distinto a su dueña aumenta `view_count`; verla como la dueña nunca lo hace.
- [ ] El contador es visible en la interfaz de la exhibición.
- [ ] `node --test` pasa, incluyendo tu nueva aserción.
