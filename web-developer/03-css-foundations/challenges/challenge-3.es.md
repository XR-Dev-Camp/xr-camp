# Reto 3: Explorador

**Opcional.** Aproximadamente 45 minutos.

Sigue la configuración del sistema de quien lee: modo oscuro y movimiento reducido.

## Tarea

1. Agrega una media query (consulta de medios) que cambie tus tokens a valores oscuros cuando el dispositivo de quien lee está en modo oscuro:

   ```css
   @media (prefers-color-scheme: dark) {
     :root {
       --color-text: #f1edf7;
       --color-bg: #16121f;
       /* ...your other dark values... */
     }
   }
   ```

2. Agrega una transición al pasar el mouse sobre tus botones y luego desactívala para las personas que piden menos movimiento:

   ```css
   button { transition: background-color 0.2s; }

   @media (prefers-reduced-motion: reduce) {
     * { transition: none !important; animation: none !important; }
   }
   ```

3. Cambia tu dispositivo entre el modo claro y el oscuro, y activa «reducir movimiento» en su configuración, para probar las dos cosas.

## Por qué esto importa

Las personas eligen estas configuraciones por buenas razones: sensibilidad a la luz, migrañas, trastornos vestibulares, ahorrar batería. Respetarlas cuesta una línea de CSS cada una, y es la misma configuración `prefers-reduced-motion` que respetan tus escenas 3D.

## Se completa cuando

- [ ] Tu sitio cambia a colores oscuros cuando el dispositivo está en modo oscuro, y pasa el contraste.
- [ ] Las transiciones se detienen cuando el movimiento reducido está activado.
