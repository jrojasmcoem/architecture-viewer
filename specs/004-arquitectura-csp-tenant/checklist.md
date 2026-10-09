# Lista de verificación: Arquitectura CSP-Tenant

**Propósito**: Validar que la especificación y el plan del diagrama «CSP-Tenant» son completos, verificables y respetan la constitución  
**Funcionalidad**: `specs/004-arquitectura-csp-tenant/spec.md`

## Cobertura

- [ ] Los requisitos FR-001 a FR-011 describen resultados observables en el diagrama.
- [ ] Los escenarios cubren definición, segmentos, contactos, tres orígenes de creación, estados, traslado, funcionalidades por proveedor y enlaces.
- [ ] «Nuevo» se presenta como origen y no como estado.
- [ ] «Pendiente Aprobación» aparece solo en el origen «fuera de la plataforma» y «Pendiente Creación» solo en «Nuevo».
- [ ] Los siete estados están descritos, incluido el deprecado.
- [ ] La validación de Operaciones muestra ambos resultados (Activo o error con gestión manual).
- [ ] El rechazo o silencio del cliente mantiene «Pendiente Invitación» y el seguimiento de Comercial.
- [ ] El paso de «Pendiente Creación» a «Activo» del origen «Nuevo» se muestra como no especificado.
- [ ] Compromisos y Recomendaciones se describen solo de forma global.
- [ ] Los límites, supuestos y exclusiones están documentados y no quedan marcadores `[NEEDS CLARIFICATION]`.

## Coherencia con el contenido existente

- [ ] Se retira el detalle contradictorio del nodo «Crear CSP-Tenant» en «Cliente & CSP-Tenant».
- [ ] Los enlaces `related` desde la Visión general y «Cliente & CSP-Tenant» llevan al nuevo diagrama.
- [ ] Los demás diagramas se conservan sin cambios.

## Alineación con el producto

- [ ] La propuesta se limita a diagramas interactivos y presentación.
- [ ] No agrega formularios, CRUD, backend ni operaciones reales (Adobe Sign, webhooks y consultas solo se representan).
- [ ] Los datos siguen siendo estáticos y locales, sin recursos externos.
- [ ] No se agregan dependencias, roles ni estilos nuevos.
- [ ] Las interacciones son accesibles (teclado y ratón, `ariaLabel`) y no editan el diagrama.
- [ ] El diagrama se puede encuadrar y recorrer en pantallas pequeñas.
- [ ] Todo el contenido está en español, coherente con la constitución v1.3.0.
- [ ] `npm run lint` y `npm run build` terminan sin errores.
