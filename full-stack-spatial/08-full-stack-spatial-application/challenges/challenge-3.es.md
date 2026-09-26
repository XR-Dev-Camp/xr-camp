# Reto 3: Explorador

**Reto opcional.** Aproximadamente 90 minutos.

Implementa la ruta de proveedor `openai-compatible` o `local` del Curso 5.6 en `server/ai.js`, alcanzando un endpoint real en lugar del proveedor mock.

## Tarea

1. Vuelve a leer el `server/ai.js` del Curso 5.6 (`full-stack-spatial/06-ai-for-spatial-computing/completed/server/ai.js`) para su función `callOpenAiShapedEndpoint` y sus variables de entorno `AI_PROVIDER`, `AI_BASE_URL`, `AI_MODEL`, y `AI_API_KEY`.
2. Agrega las mismas variables de entorno y la misma función `callOpenAiShapedEndpoint` al `server/ai.js` de este proyecto final, adaptada para llamar a la propia forma `describeScene(scene, annotations)` de este proyecto en lugar del `describeScene(scene)` de 5.6.
3. Construye un prompt a partir del nombre de la escena y el texto de anotación (ver `sceneDataForPrompt` en el `ai.js` de 5.6 para el patrón), pidiendo una respuesta en JSON estricto con la forma `{ "description": "..." }`, y analízala de la misma forma defensiva que hace 5.6: rechaza cualquier cosa que no sea exactamente esa forma.
4. Elige un objetivo real contra el cual probar: un endpoint alojado compatible con OpenAI para el que ya tengas una clave, o un modelo local mediante [Ollama](https://ollama.com/) o [LM Studio](https://lmstudio.ai/) (ambos gratis, y ambos mantienen tus datos en tu propia máquina).
5. Confirma que el proveedor mock todavía funciona sin ninguna configuración en absoluto; las propias pruebas de este proyecto final deben seguir pasando con `AI_PROVIDER` sin establecer.
6. Actualiza `.env.example` para documentar las variables nuevas, y agrega un párrafo breve al README de esta carpeta describiendo cómo probaste el proveedor real (nómbralo, y di con cautela qué tan bien funcionó; ver el estilo de la casa de este repositorio sobre opciones de proveedores para el mercado chino si probaste uno).

## Por qué importa

El Curso 5.6 construyó esta función neutral respecto al proveedor específicamente para que quien aprende pudiera alcanzar a un modelo real más adelante sin reescribir nada más en la aplicación. Este reto demuestra que ese diseño funciona: todo fuera de `server/ai.js` (validación, saneamiento, las verificaciones de propiedad, el cliente) no debería necesitar ningún cambio en absoluto.

## Terminado cuando

- [ ] `server/ai.js` soporta al menos una de `openai-compatible` o `local`, junto al valor por defecto `mock` que sigue funcionando.
- [ ] Una respuesta mal formada del proveedor real se rechaza con un error claro, nunca se adivina.
- [ ] `.env.example` documenta cada variable nueva.
- [ ] `npm test` sigue pasando sin ninguna variable de entorno establecida (la ruta mock, sin afectar por tus cambios).
- [ ] Un párrafo breve en el README de esta carpeta dice qué proveedor real probaste y cómo te fue.
