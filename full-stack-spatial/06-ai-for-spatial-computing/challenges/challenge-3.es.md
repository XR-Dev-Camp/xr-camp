# Reto 3: Explorador

**Reto opcional.** Aproximadamente 90 minutos.

Conecta un modelo local real mediante Ollama o LM Studio, y compara su salida con la del proveedor simulado.

## Tarea

1. Instala [Ollama](https://ollama.com/) o [LM Studio](https://lmstudio.ai/) (ambos son gratis) y sigue su propia documentación para descargar y ejecutar un modelo de chat pequeño y de propósito general. Confirma que el servidor local de la herramienta está corriendo y anota su puerto real; revisa la documentación actual propia de la herramienta en lugar de asumirlo; el `.env.example` de este curso lista el valor por defecto habitual de cada herramienta, pero cualquiera de los dos proyectos puede cambiarlo.
2. En `server/.env`, establece `AI_PROVIDER=local`, `AI_LOCAL_KIND` en `ollama` o `lmstudio` según corresponda, y `AI_MODEL` con el nombre exacto del modelo que descargaste o cargaste. Reinicia el servidor y comprueba que `GET /api/ai/status` reporte tu proveedor y modelo, no `mock`.
3. Genera una descripción para dos o tres escenas sembradas distintas, e intenta dos o tres búsquedas. Para cada una, registra:
   - ¿La respuesta se analizó como JSON válido en el primer intento, o tuvo que ejecutarse el reintento único de este proyecto (Paso 7 y Paso 10 del Recorrido)?
   - ¿Alguna vez `checkDescriptionForHallucinations` o `filterMatchesAgainstRealScenes` tuvieron que advertir sobre, o descartar, algo que dijo el modelo?
   - ¿Cómo se comparó la redacción con las frases más simples y basadas en plantilla del proveedor simulado: más natural, pero también, alguna afirmación en ella que no estuviera realmente en el "Data sent" que puedes ver en la interfaz?
4. Escribe lo que encontraste en una nota breve (unas cuantas frases bastan); en tu diario de aprendizaje, o como un archivo nuevo bajo `screenshots/` si prefieres mantenerlo con tu otra evidencia entregada. Incluye al menos un ejemplo donde la respuesta del modelo local difiriera de lo que habría dicho el proveedor simulado para la misma escena.
5. Vuelve a poner `AI_PROVIDER` en `mock` antes de entregar, para que el proyecto siga funcionando para cualquiera que lo revise sin tu modelo local instalado.

## Por qué importa

Cada salvaguarda que construyó esta lección (la instrucción de solo JSON, el analizador que rechaza una respuesta mal formada, las comprobaciones de alucinaciones, el límite de tasa) se diseñó y probó contra un proveedor que nunca se comporta mal (el simulado). Un modelo real, incluso uno local y pequeño, es donde descubres cuáles de esas salvaguardas en verdad estaban haciendo trabajo, y cuáles modos de fallo esta lección solo describió en un comentario hasta ahora.

## Terminado cuando

- [ ] `AI_PROVIDER=local` generó exitosamente al menos una descripción real y un resultado de búsqueda real.
- [ ] Registraste si la ruta de reintento, la comprobación de alucinaciones, o la protección de alucinaciones de búsqueda alguna vez se dispararon de verdad contra una respuesta real.
- [ ] Existe una comparación breve por escrito entre la salida del modelo local y la del proveedor simulado, para al menos una escena.
- [ ] `.env` está de vuelta en `AI_PROVIDER=mock` antes de entregar, y no se incluye en el repositorio ninguna clave real ni secreto específico de un modelo.
