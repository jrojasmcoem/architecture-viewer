# Tareas: Arquitectura CSP-Tenant

**Entrada**: Documentos de diseño en `specs/004-arquitectura-csp-tenant/`  
**Prerrequisitos**: `spec.md` y `plan.md` (lista de apoyo: `checklist.md`)

## Convenciones

- Formato: `[ID] [P?] [US?] Descripción con rutas concretas`.
- `[P]` indica que la tarea puede hacerse en paralelo (archivo distinto).
- Omite trabajo de backend, base de datos, formularios y CRUD.
- No hay framework de pruebas: la validación es manual más `npm run lint` y `npm run build`.
- Las tareas sobre `src/diagrams.js` se aplican en secuencia (mismo archivo).

## Fase 1: Preparación

- [ ] T001 Revisar `.specify/memory/constitution.md` (v1.3.0), `prompts/AjusteCsp.md` y el patrón de `node()`/`edge()` en `src/diagrams.js`.
- [ ] T002 Insertar el diagrama `csptenant` (`navTitle: 'CSP-Tenant'`, `navSubtitle: 'Creación, estados y traslado'`) justo después de `lifecycle` en `src/diagrams.js`, con título, descripción, `takeaway` y `highlights` en español, y `nodes`/`edges` vacíos para completar en las historias.

## Fase 2: Historias de usuario

### Historia de usuario 1 - Qué es un CSP-Tenant (Prioridad: P1)

- [ ] T003 [US1] Añadir en `src/diagrams.js` los nodos `entity` (0,-210), `segments` (350,-210) y `contacts` (700,-210) del diagrama `csptenant`: conjunto inseparable CSP+Tenant, uno a uno, cliente asociado, razón social, segmentos y subsegmentos, contactos con contacto principal.

### Historia de usuario 2 - Formas de creación (Prioridad: P1)

- [ ] T004 [US2] Añadir el nodo `create` (0,210, rol `commercial`) y el camino «Nuevo»: `pending-create` (350,0) y `windows` (700,0), con el paso a Activo indicado como no especificado y la descripción del estado Pendiente Creación (inicial, servicio Windows registra y procesa), en `src/diagrams.js`.
- [ ] T005 [US2] Añadir el camino «Existente bajo otro distribuidor»: `pending-invite` (350,210, descripción del estado Pendiente Invitación), `adobe` (700,210, rol `external`), `webhook` (1050,210), `pending-validate` (1400,210, descripción del estado Pendiente Validación Invitación) y `followup` de Comercial (1050,430; rechazo o silencio), en `src/diagrams.js`.
- [ ] T006 [US2] Añadir el camino «Existente fuera de la plataforma»: `pending-approval` (350,430, descripción del estado Pendiente Aprobación) y `notify-ops` (700,430) en `src/diagrams.js`.
- [ ] T007 [US2] Añadir la validación común: `validate` (1750,210, rol `operations`), `active` (2100,210, `related: 'orders'`) y `error` (1750,430, rol `operations`, gestión manual) en `src/diagrams.js`.
- [ ] T008 [US2] Añadir las aristas con `edge()` de creación y validación en `src/diagrams.js` (`create→pending-create`, `create→pending-invite`, `create→pending-approval`, `pending-create→windows`, `windows→active` punteada, `pending-invite→adobe`, `adobe→webhook`, `webhook→pending-validate`, `adobe→followup` punteada, `pending-validate→validate`, `pending-approval→notify-ops`, `notify-ops→validate`, `validate→active`, `validate→error`), usando handles `bottom`/`top` para evitar cruces.

### Historia de usuario 3 - Estados (Prioridad: P1)

- [ ] T009 [US3] Añadir los nodos `inactive` (2100,430) y `deprecated` (1750,640, `deprecated: true`, sin aristas por ser un estado deprecado, intencionalmente) en `src/diagrams.js`, con las descripciones (inactivación manual solo por Operaciones o automática al salir del dominio de Controles Empresariales) y la arista `active→inactive` punteada.
- [ ] T010 [US3] Verificar que los siete estados quedan descritos en el diagrama según el spec (US3, escenario 1) y que cada descripción de `Activo` indica que pasó por creación y activación, en `src/diagrams.js`.

### Historia de usuario 4 - Traslado entre clientes (Prioridad: P2)

- [ ] T011 [US4] Añadir el nodo `transfer` (2100,640) con las tres condiciones de traslado y la arista `active→transfer` punteada en `src/diagrams.js`.

### Historia de usuario 5 - Funcionalidades por proveedor y notas (Prioridad: P2)

- [ ] T012 [US5] Añadir los nodos `vendor` (1050,-210, rol `external`) y `notes` (1400,-210) en `src/diagrams.js`: Compromisos y Recomendaciones solo Adobe en descripción global, entidades redundantes y campos sin uso importante.

### Historia de usuario 6 - Integración con el flujo actual (Prioridad: P2)

- [ ] T013 [US6] En el diagrama `overview` de `src/diagrams.js`, cambiar `related` del nodo `tenant` a `'csptenant'` y actualizar su detalle «Comercial lo crea desde el sistema.» con segmentos, estados y tres orígenes.
- [ ] T014 [US6] En el diagrama `lifecycle` de `src/diagrams.js`, añadir `related: 'csptenant'` al nodo `tenant`, actualizar su subtítulo y detalles (tres orígenes, creado por Comercial) y retirar el detalle «No se especifican identificadores únicos ni mecanismos de integración adicionales.».
- [ ] T015 [US6] Confirmar en `src/App.jsx` que navegación, panel y botón `related` funcionan con el diagrama nuevo sin cambios de lógica; ajustar `src/App.css` solo si la barra lateral desborda con siete ítems.

## Fase 3: Validación

- [ ] T016 Verificar manualmente con `npm run dev`: selección por teclado y ratón de los nodos nuevos, ausencia de cruces confusos en las aristas, encuadre en pantalla reducida y botones anterior/siguiente.
- [ ] T017 Comprobar que desde la Visión general se llega a «CSP-Tenant» en dos interacciones, que `lifecycle` también enlaza y que «Activo» lleva a «Pedido & aprobaciones».
- [ ] T018 Ejecutar `npm run lint` desde `architecture-viewer/`.
- [ ] T019 Ejecutar `npm run build` desde `architecture-viewer/`.
- [ ] T020 Recorrer `specs/004-arquitectura-csp-tenant/checklist.md` y los escenarios de aceptación de `spec.md`, comprobar que cada regla de `prompts/AjusteCsp.md` es consultable en algún nodo (SC-002) y marcar lo cumplido.

## Dependencias

- T001 → T002; T002 antes de T003–T014.
- T004–T007 antes de T008; T007 antes de T009 y T011.
- T013 y T014 después de T002 (el destino `csptenant` debe existir).
- T016–T020 al final.
