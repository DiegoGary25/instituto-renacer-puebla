# Instituto Renacer Puebla

Homepage de la residencia, creada con React y Vite.

## Desarrollo

```bash
npm install
npm run dev
```

Para generar la versión de producción: `npm run build`.

## Contenido pendiente

- Los datos de teléfono, WhatsApp, correo, dirección e Instagram se completan en `src/siteContent.js`. Mientras estén vacíos, la página muestra marcadores claros; «Agenda una visita» lleva al contacto.
- Las fotografías de instalaciones y actividades se sustituyen en la sección «Vida en Renacer» cuando estén disponibles. El recuadro actual indica que son pendientes.
- Los retratos del equipo se detectan desde `assets/MIEMBROS RENACER`. El nombre del archivo debe comenzar con el nombre de la persona; puede seguir `_` y una descripción. Para Aline Vivanco, Joshua Delgado y Erika Muñoz se muestran marcadores hasta que se agreguen sus PNG.
- El archivo de Diego dice «Morales», mientras que la lista entregada dice «Molares». El retrato está asociado provisionalmente a la entrada de la lista.
- Existe un retrato de Paulina Fernández en `assets`, pero no está en la lista de integrantes entregada; por ahora no aparece en el carrusel.
- La imagen de la sección «Nuestro enfoque» usa una copia WebP optimizada de `IMAGEN PROMOCIONAL 3.png`. Si se reemplaza el PNG original, ejecuta `npm run assets:optimize` para regenerar la copia web.

## Revisión visual

Inicia el servidor con `npm run dev -- --port 4173` y ejecuta `npm run qa:visual`. Abre Chrome local y guarda capturas de escritorio, tableta y móvil en la carpeta temporal `renacer-visual-qa` del sistema.
