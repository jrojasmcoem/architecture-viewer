# Plan de implementación: Arquitectura de productos

**Rama**: `003-arquitectura-productos` | **Fecha**: 2026-10-09 | **Spec**: `specs/003-arquitectura-productos/spec.md`

## Resumen

Añadir al visor un diagrama estático «Productos» (recorrido horizontal con filas
superior e inferior, como «Pedido» y «Aprovisionamiento») y enlazarlo desde la
Visión general. Todo el contenido son datos locales en `src/diagrams.js`; se
reutilizan `node()`, `edge()`, el panel de detalle y el botón `related` ya
existentes en `App.jsx`. Solo se agrega un rol visual «Administrador».

## Contexto técnico

**Language/Version**: JavaScript (ES modules), versión de Node compatible con Vite  
**Primary Dependencies**: React, Vite, @xyflow/react (sin dependencias nuevas)  
**Storage**: N/A — datos estáticos embebidos en el frontend  
**Pruebas**: `npm run lint` y `npm run build`; no hay framework de pruebas automatizadas  
**Plataforma objetivo**: Navegador web, servido localmente  
**Project Type**: web  
**Objetivos de rendimiento**: Navegación fluida, igual que los diagramas existentes (≈15 nodos)  
**Restricciones**: Sin formularios, CRUD, backend, servicios ni datos remotos  
**Escala/Alcance**: Un diagrama nuevo, un rol nuevo y un enlace en la Visión general

## Verificación de la constitución

- [x] La propuesta solo presenta o permite explorar diagramas; nada simula la sincronización ni edita estados.
- [x] Usa datos estáticos locales y no introduce operaciones reales.
- [x] Es coherente con React/Vite y reutiliza `diagrams.js`, `node()`, `edge()` y `App.jsx` sin cambios de lógica.
- [x] Mantiene accesibilidad: nodos con `ariaLabel` generado por `node()`, navegación por teclado existente.
- [x] Textos en español (principios VII y VIII); reglas coherentes con la constitución v1.2.0.

## Diseño

### Archivos afectados

- `src/diagrams.js`
  - Añadir al objeto `roles` la entrada `admin: { label: 'Administrador', color: '#c2577f' }` (color distinto de los cinco existentes).
  - Añadir el diagrama `products` (`navTitle: 'Productos'`, `navSubtitle: 'Catálogo, estados y reglas de venta'`) entre `lifecycle` y `orders`, porque los productos se explican antes de venderlos.
  - Nodos (coordenadas con separación de 350 en x, filas y = -210, 0, 430):
    - Fila superior: `product` Producto (0,-210; sistema; costo fabricante, precio máximo sugerido, segmentos, código proveedor, términos de duración y ciclos de facturación, sin valores), `code` Código interno (350,-210; sistema; composición y ejemplo `65324789CA13A12:0-Comercial-Anual-P3Y`, sin explicar `P3Y`), `types` Tipos de producto (700,-210; externo; Trial, Costo Cero, Introductorio según proveedor).
    - Fila principal (y=0): `provider` Listas de precios del proveedor (0; externo), `service` Servicio diario (350; sistema; ~2 a. m., consulta por API por proveedor y segmento), `csv` Archivos CSV (700; sistema; uno por lista, varias por proveedor, se borra al procesar), `verify` Verificar línea por línea (1050; sistema; existe → actualiza), `active` Producto Activo (1400; sistema; listo para el pedido), `sale` Reglas de venta (1750; comercial; Activo, mismo segmento del CSP-Tenant, márgenes por producto, margen calculado sin fórmula, parámetro por proveedor) con `related: 'orders'`.
    - Fila inferior (y=430): `inconsistent` Inconsistente (1050; sistema; creado por la sincronización), `classify` Clasificar producto (1400; rol `admin`; ayuda humana, queda Activo), `inactivate` Inactivar no vistos (350; sistema; solo Activos con fecha de actualización anterior a la ejecución), `inactive` Inactivo (700; sistema; fuera de la lista o inactivado manualmente; reaparece → Activo), `discontinued` Descontinuado (1750; sistema; asignado manualmente; solo renovación de suscripciones activas; reaparece → Activo), `failure` Fallo de actualización (0; operaciones; notificación al buzón de operaciones parametrizado en base de datos).
  - Aristas con `edge()`: `provider→service`, `service→csv`, `csv→verify`, `verify→active` («Existe · actualiza»), `verify→inconsistent` («No existe», handles `bottom`/`top`), `inconsistent→classify`, `classify→active` («Clasificado», handles `top`/`bottom`), `csv→inactivate` («Al terminar», `bottom`/`top`), `inactivate→inactive` (handles `left`/`right` explícitos para evitar cruces), `active→inactive` («Inactivación manual», punteada), `active→discontinued` («Asignación manual», `bottom`/`top`), `inactive→active` y `discontinued→active` («Reaparece en la lista», punteadas), `discontinued→sale` («Solo renovación»), `active→sale`, `service→failure` («Si falla», `bottom`/`top`); `types→product` y `product→code` como relaciones informativas.
  - En `overview`: ampliar los detalles del nodo `catalog` (segmentos, estados, enlace a productos) y añadirle `{ related: 'products' }`.
  - En `highlights`/`takeaway` del nuevo diagrama: «Solo lo Activo se vende» como mensaje clave; reglas descritas sin inventar valores ni fórmulas.
- `src/App.css`: añadir `.role-admin { --role-color: #c2577f; --role-bg: #fdeef4; }` junto a los demás roles.
- `src/App.jsx`: sin cambios previstos; la navegación, el panel, el botón `related` y la leyenda de roles ya se alimentan de `diagrams` y `roles`. Verificar que la barra lateral admite seis ítems sin desbordar.
- `specs/README.md`, `package.json` y configuración de Vite: sin cambios.

### Decisiones y riesgos

- El rol «Administrador» es solo una etiqueta visual de responsabilidad; no implica permisos ni autenticación.
- Los enlaces cruzados usan la propiedad `related` existente (un solo destino por nodo): `catalog → products` y `sale → orders`.
- Mantener la inactivación como regla de lectura: ningún nodo muestra controles que cambien estados.

### Verificación

- Revisión manual en el visor (`npm run dev`): ver el diagrama «Productos» en la navegación, seleccionar cada nodo con ratón y teclado y comprobar los textos de las historias 1–4 (SC-002).
- Desde la Visión general, seleccionar «Catálogo sincronizado» y entrar a «Productos» en dos interacciones (SC-001); desde «Reglas de venta» llegar a «Pedido & aprobaciones».
- Revisar el encuadre en ancho reducido, la leyenda con el rol Administrador y que los diagramas existentes no cambian.
- `npm run lint` y `npm run build` sin errores (SC-003).
