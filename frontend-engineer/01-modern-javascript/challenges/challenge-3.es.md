# Reto 3: Explorador

**Opcional.** Unos 45 minutos.

Carga dos archivos a la vez con `Promise.all`.

## Tarea

1. Crea `data/notes.json`: un objeto cuyas claves sean ids de lecciones y cuyos valores sean tus propias notas, por ejemplo `{ "web-01-html-foundations": "Loved the alt text exercise." }`.
2. Carga los dos archivos al mismo tiempo:

   ```js
   const [catalog, notes] = await Promise.all([
     loadCatalog(),
     loadCatalog('data/notes.json'),
   ]);
   ```

3. Muestra la nota de cada lección debajo de su título, cuando exista.
4. ¿Qué pasa si falta `notes.json`? Haz que el mapa siga funcionando, sin notas.

## Por qué es importante

`await` uno tras otro espera cada archivo por turno; `Promise.all` espera a ambos a la vez, lo que es más rápido. Decidir qué datos son esenciales y cuáles son opcionales es una decisión de diseño real.

## Se completa cuando

- [ ] Los dos archivos se cargan juntos, y las notas aparecen debajo de sus lecciones.
- [ ] Sin `notes.json`, el mapa sigue funcionando.
