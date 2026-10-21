# Instituto Renacer Puebla

Homepage de la residencia, creada con React y Vite.

## Desarrollo

```bash
npm install
npm run dev
```

Para generar la versión de producción: `npm run build`.

## Contenido pendiente

- El teléfono y WhatsApp están configurados en `src/siteContent.js`: +52 222 653 5528. Los enlaces para agendar abren WhatsApp con un mensaje preparado; el envío lo confirma la persona. La ubicación muestra Puebla y el correo se omite mientras esté vacío.
- La sección «Vida en Renacer» presenta convivencia, movimiento y actividades recreativas. Se pueden añadir fotografías auténticas de instalaciones y actividades cuando estén disponibles.
- Los retratos del equipo se detectan desde `assets/MIEMBROS RENACER`. El nombre del archivo debe comenzar con el nombre de la persona; puede seguir `_` y una descripción. Solo aparecen integrantes con fotografía; Aline Vivanco, Joshua Delgado y Erika Muñoz se mantienen ocultos hasta que se agreguen sus PNG.
- El archivo de Diego dice «Morales», mientras que la lista entregada dice «Molares». El retrato está asociado provisionalmente a la entrada de la lista.
- Existe un retrato de Paulina Fernández en `assets`, pero no está en la lista de integrantes entregada; por ahora no aparece en el carrusel.
- La imagen de la sección «Nuestro enfoque» usa una copia WebP optimizada de `IMAGEN PROMOCIONAL 3.png`. Si se reemplaza el PNG original, ejecuta `npm run assets:optimize` para regenerar la copia web.

## Revisión visual

Inicia el servidor con `npm run dev -- --port 4173` y ejecuta `npm run qa:visual`. Usa Chrome local y guarda capturas por sección a 1440, 820, 390 y 320 px en la carpeta temporal `renacer-visual-qa/current` del sistema. `RENACER_QA_PHASE` permite guardar revisiones separadas, como `before` y `after`. También verifica los enlaces de contacto, la navegación móvil, el carrusel y la ausencia de desbordamientos e imágenes rotas.
