# Tareas: Arquitectura de productos

**Entrada**: Documentos de diseño en `specs/003-arquitectura-productos/`  
**Prerrequisitos**: `spec.md` y `plan.md` (lista de apoyo: `checklist.md`)

## Convenciones

- Formato: `[ID] [P?] [US?] Descripción con rutas concretas`.
- `[P]` indica que la tarea puede hacerse en paralelo (archivo distinto).
- Omite trabajo de backend, base de datos, formularios y CRUD.
- No hay framework de pruebas: la validación es manual más `npm run lint` y `npm run build`.

## Fase 1: Preparación

- [ ] T001 Revisar `.specify/memory/constitution.md` (v1.2.0), `prompts/ArquitecturaProductos.md` y el patrón de `node()`/`edge()` en `src/diagrams.js`.
- [ ] T002 [P] Añadir el rol `admin` (`Administrador`, `#c2577f`) al objeto `roles` en `src/diagrams.js`.
- [ ] T003 [P] Añadir `.role-admin { --role-color: #c2577f; --role-bg: #fdeef4; }` en `src/App.css`.
- [ ] T004 Insertar el diagrama `products` (`navTitle: 'Productos'`, `navSubtitle: 'Catálogo, estados y reglas de venta'`) entre `lifecycle` y `orders` en `src/diagrams.js`, con título, descripción, `takeaway` y `highlights` en español, y arreglos `nodes`/`edges` vacíos para completar en las historias.

## Fase 2: Historias de usuario

### Historia de usuario 1 - Qué es un producto (Prioridad: P1)

- [ ] T005 [US1] Añadir en `src/diagrams.js` los nodos `product` (0,-210) y `code` (350,-210) del diagrama `products`: características, términos y ciclos sin valores, composición del código interno y ejemplo `65324789CA13A12:0-Comercial-Anual-P3Y` sin explicar `P3Y`.
- [ ] T006 [US1] Añadir la arista `product→code` y el nodo `types` (700,-210) con la arista `types→product` en `src/diagrams.js`.

### Historia de usuario 2 - Tipos y estados (Prioridad: P1)

- [ ] T007 [US2] Completar el detalle de `types` en `src/diagrams.js`: Trial, Costo Cero e Introductorio según el proveedor.
- [ ] T008 [US2] Añadir los nodos de estado `active` (1400,0), `inactive` (700,430), `discontinued` (1750,430) e `inconsistent` (1050,430) en `src/diagrams.js`, con sus reglas de venta, asignación manual de Descontinuado y reactivación a Activo al reaparecer en la lista.
- [ ] T009 [US2] Añadir en `src/diagrams.js` las aristas de estados manuales y de reactivación: `active→inactive` («Inactivación manual»), `active→discontinued` («Asignación manual»), `discontinued→active` y `inactive→active` («Reaparece en la lista», punteadas).

### Historia de usuario 3 - Sincronización diaria (Prioridad: P1)

- [ ] T010 [US3] Añadir los nodos `provider` (0,0), `service` (350,0), `csv` (700,0) y `verify` (1050,0) en `src/diagrams.js`, con sus detalles de la sincronización.
- [ ] T011 [US3] Añadir los nodos `classify` (1400,430, rol `admin`), `inactivate` (350,430) y `failure` (0,430, rol `operations`) en `src/diagrams.js`.
- [ ] T012 [US3] Añadir las aristas del flujo con `edge()` en `src/diagrams.js`: `provider→service`, `service→csv`, `csv→verify`, `verify→active`, `verify→inconsistent`, `inconsistent→classify`, `classify→active`, `csv→inactivate`, `inactivate→inactive` (handles `left`/`right` explícitos), `service→failure`, usando handles `bottom`/`top` en las excepciones.

### Historia de usuario 4 - Reglas de venta (Prioridad: P2)

- [ ] T013 [US4] Añadir el nodo `sale` (1750,0, rol `commercial`, `related: 'orders'`) en `src/diagrams.js`: producto Activo, mismo segmento del CSP-Tenant, márgenes por producto, margen calculado con fórmula no especificada y parámetro por proveedor sobre el precio máximo sugerido.
- [ ] T014 [US4] Añadir las aristas `active→sale` y `discontinued→sale` (solo renovación) en `src/diagrams.js`.

### Historia de usuario 5 - Integración con el flujo actual (Prioridad: P2)

- [ ] T015 [US5] Ampliar el nodo `catalog` del diagrama `overview` en `src/diagrams.js`: segmentos y estados de los productos, más `{ related: 'products' }`.
- [ ] T016 [US5] Confirmar en `src/App.jsx` que la navegación, la leyenda y el botón `related` funcionan con el diagrama y rol nuevos sin cambios de lógica; ajustar `src/App.css` solo si la barra lateral desborda con seis ítems.

## Fase 3: Validación

- [ ] T017 Verificar manualmente con `npm run dev`: selección por teclado y ratón de los nodos nuevos, leyenda con Administrador, encuadre en pantalla reducida y botones anterior/siguiente.
- [ ] T018 Comprobar que desde la Visión general se llega a «Productos» en dos interacciones y que «Reglas de venta» lleva a «Pedido & aprobaciones».
- [ ] T019 Ejecutar `npm run lint` desde `architecture-viewer/`.
- [ ] T020 Ejecutar `npm run build` desde `architecture-viewer/`.
- [ ] T021 Recorrer `specs/003-arquitectura-productos/checklist.md` y los escenarios de aceptación de `spec.md`, y marcar lo cumplido.

## Dependencias

- T001 → T002–T004; T002 y T003 antes de T011.
- T004 antes de T005–T014 (comparten `src/diagrams.js`, por lo que se aplican en secuencia).
- T008, T009 y T010 antes de T012; T008 y T013 antes de T014.
- T017–T021 al final.
