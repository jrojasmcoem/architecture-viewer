# Plan de implementación: Arquitectura CSP-Tenant

**Rama**: `004-arquitectura-csp-tenant` | **Fecha**: 2026-10-09 | **Spec**: `specs/004-arquitectura-csp-tenant/spec.md`

## Resumen

Añadir al visor un diagrama estático «CSP-Tenant» (recorrido horizontal con
filas superior, principal e inferiores, como «Productos» y «Pedido») y enlazarlo
desde la Visión general y desde «Cliente & CSP-Tenant». Todo el contenido son
datos locales en `src/diagrams.js`; se reutilizan `node()`, `edge()`, el panel de
detalle y la propiedad `related` ya existentes. No se agregan roles, estilos ni
dependencias nuevas (Comercial, Operaciones, Sistema y Externo ya existen).

## Contexto técnico

**Language/Version**: JavaScript (ES modules), versión de Node compatible con Vite  
**Primary Dependencies**: React, Vite, @xyflow/react (sin dependencias nuevas)  
**Storage**: N/A — datos estáticos embebidos en el frontend  
**Pruebas**: `npm run lint` y `npm run build`; no hay framework de pruebas automatizadas  
**Plataforma objetivo**: Navegador web, servido localmente  
**Project Type**: web  
**Objetivos de rendimiento**: Navegación fluida, igual que los diagramas existentes (≈20 nodos)  
**Restricciones**: Sin formularios, CRUD, backend, servicios ni datos remotos  
**Escala/Alcance**: Un diagrama nuevo y ajustes de texto/enlace en dos diagramas existentes

## Verificación de la constitución

- [x] Solo presenta o permite explorar diagramas; nada simula Adobe Sign, webhooks, consultas ni cambios de estado.
- [x] Usa datos estáticos locales y no introduce operaciones reales.
- [x] Es coherente con React/Vite y reutiliza `diagrams.js`, `node()`, `edge()` y `App.jsx` sin cambios de lógica.
- [x] Mantiene accesibilidad: nodos con `ariaLabel` generado por `node()`, navegación por teclado existente.
- [x] Textos en español (principios VII y VIII); reglas coherentes con la constitución v1.3.0.

## Diseño

### Archivos afectados

- `src/diagrams.js`
  - Añadir el diagrama `csptenant` (`navTitle: 'CSP-Tenant'`, `navSubtitle: 'Creación, estados y traslado'`) justo después de `lifecycle`. Título y mensaje clave: «Cada CSP-Tenant nace de un origen y solo se usa Activo».
  - Nodos (separación de 350 en x; filas y = -210, 0, 210, 430, 640):
    - Fila superior (y=-210), solo detalle: `entity` CSP-Tenant (0; sistema; conjunto inseparable CSP+Tenant, uno a uno, asociado a un cliente, intermediario con el proveedor, «Controles Empresariales» = razón social), `segments` Segmentos y subsegmentos (350; sistema), `contacts` Contactos (700; comercial; nombre, correo, teléfono y contacto principal que recibe notificaciones), `vendor` Funcionalidades por proveedor (1050; externo; Compromisos y Recomendaciones solo Adobe, descripción global sin más detalle), `notes` Notas (1400; sistema; CSP y Tenant redundantes con mejora posible de unificarlos; Tipo TRM, Plazo de pago y Prefactura sin uso importante).
    - Origen: `create` Crear CSP-Tenant (0,210; comercial; tres orígenes, «Nuevo» no es un estado).
    - Camino «Nuevo» (y=0): `pending-create` Pendiente Creación (350), `windows` Servicio Windows (700; sistema; registra y procesa; el paso a Activo se indica como no especificado).
    - Camino «Existente bajo otro distribuidor» (y=210): `pending-invite` Pendiente Invitación (350), `adobe` Invitación por Adobe Sign (700; externo), `webhook` Webhook · el cliente acepta (1050; sistema), `pending-validate` Pendiente Validación Invitación (1400; sistema).
    - Camino «Existente fuera de la plataforma» (y=430): `pending-approval` Pendiente Aprobación (350; sistema; sin solicitud al cliente), `notify-ops` Notificar a Operaciones (700; sistema).
    - Seguimiento: `followup` Seguimiento de Comercial (1050,430; comercial; si el cliente rechaza o no responde, permanece en Pendiente Invitación y Comercial lo contacta).
    - Validación común: `validate` Validar asociación (1750,210; operaciones; consulta desde Multivendor si el Tenant está asociado a Controles Empresariales; un mismo paso deja Activo), `active` Activo (2100,210; sistema; con `related: 'orders'`), `error` Error · no relacionado (1750,430; operaciones; se gestiona manualmente).
    - Estados y reglas inferiores: `inactive` Inactivo (2100,430; sistema; manual solo por Operaciones, automático si deja de estar bajo el dominio de Controles Empresariales), `transfer` Traslado entre clientes (2100,640; comercial; cliente destino Activo, CSP-Tenant Activo, cliente en Multivendor), `deprecated` Pendiente Aceptación de términos y condiciones (1750,640; sistema; `deprecated: true`, estado deprecado).
  - Aristas con `edge()`: `create→pending-create` («Nuevo»), `create→pending-invite` («Otro distribuidor»), `create→pending-approval` («Fuera de la plataforma», `bottom`/`top`), `pending-create→windows`, `windows→active` («Activación no especificada», punteada), `pending-invite→adobe`, `adobe→webhook` («Respuesta»), `webhook→pending-validate` («Acepta»), `adobe→followup` («Sin respuesta o rechazo», punteada), `pending-validate→validate`, `pending-approval→notify-ops`, `notify-ops→validate`, `validate→active` («Asociado»), `validate→error` («No asociado», `bottom`/`top`), `active→inactive` («Operaciones o automático», punteada), `active→transfer` («Traslado», punteada).
  - Enlaces `related`: `active → 'orders'`; ningún otro nodo requiere destino.
  - En `overview`: cambiar `related` del nodo `tenant` a `'csptenant'`, y sustituir «Comercial lo crea desde el sistema.» por un texto que mencione segmentos, estados y tres orígenes.
  - En `lifecycle`: quitar de `tenant` el detalle «No se especifican identificadores únicos ni mecanismos de integración adicionales.» (FR-010), añadir `related: 'csptenant'` al nodo `tenant` y actualizar su subtítulo/detalles para mencionar los tres orígenes; el nodo `active` mantiene `related: 'orders'`.
- `src/App.jsx`, `src/App.css`, `package.json` y configuración de Vite: sin cambios previstos; verificar que la barra lateral admite siete ítems sin desbordar.

### Decisiones y riesgos

- La propiedad `related` admite un solo destino por nodo: `tenant (overview y lifecycle) → csptenant` y `active (csptenant) → orders`.
- El estado «Nuevo» no se dibuja como nodo de estado: solo como origen de creación.
- «Pendiente Aprobación» se reserva al existente fuera de la plataforma; «Pendiente Creación» al origen Nuevo.
- Se mantiene el diagrama con coordenadas fijas; las curvas de aristas (p. ej. `adobe→followup`) se ajustarán al implementar para evitar cruces, como en «Productos».
- Ningún nodo muestra controles que cambien estados; todo es lectura.

### Verificación

- Revisión manual en el visor (`npm run dev`): ver «CSP-Tenant» en la navegación, seleccionar cada nodo con ratón y teclado y comprobar los textos de las historias 1–5 (SC-002).
- Desde la Visión general, seleccionar «CSP-Tenant» y entrar al diagrama nuevo en dos interacciones (SC-001); desde «Cliente & CSP-Tenant» y desde «Activo» llegar a «Pedido & aprobaciones».
- Revisar el encuadre en ancho reducido y que los diagramas existentes no cambian salvo el texto del nodo `tenant`.
- `npm run lint` y `npm run build` sin errores (SC-003).
