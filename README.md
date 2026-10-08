# CSP Atlas

Visor local de arquitectura y flujo de negocio para presentaciones ante socios.
Aplicación independiente con React, Vite y React Flow; no requiere Blazor, base de
datos, credenciales, backend ni servicios externos. Los diagramas están embebidos
en `src/diagrams.js`. Tras instalar las dependencias, puede ejecutarse sin internet:
no carga fuentes, imágenes, datos ni scripts de terceros en tiempo de ejecución.

## Ejecución local

Requisitos: Node.js 22.12+ o Node.js 24 LTS y npm.

```sh
git clone https://github.com/jrojasmcoem/SSDSpecKit.git
cd SSDSpecKit/architecture-viewer
npm ci
npm run dev
```

Abre la URL que indica Vite, normalmente `http://localhost:5173`.

```sh
npm run lint       # oxlint, incluido por el scaffold oficial
npm run build      # genera dist/
npm run preview    # sirve la compilación local, normalmente puerto 4173
```

`node_modules/` y `dist/` están excluidos de Git. `package-lock.json` permite
instalaciones reproducibles. El servidor es local por defecto; no es un servidor
de producción. Para publicar, sirve el contenido estático de `dist/`.

## Desarrollo guiado por especificaciones

`architecture-viewer/` tiene su propia configuración de GitHub Spec Kit en
`.specify/`, habilidades de Copilot en `.github/skills/` y especificaciones en
`specs/`. Este setup describe únicamente el visor React/Vite. Es independiente
del setup Spec Kit que permanece en la raíz del repositorio para ContosoDashboard;
abre `architecture-viewer/` como carpeta del proyecto en VS Code para que Copilot
use las habilidades locales.

La inicialización del proyecto ya está incluida en el repositorio. Para usar las
habilidades solo se requiere VS Code con GitHub Copilot Chat. No vuelvas a
ejecutar `specify init` al clonar: esta configuración equivale a
`specify init --here --integration copilot`, ya aplicado en esta carpeta. Si
quieres crear un proyecto nuevo con el CLI, se requiere Python 3.11+ y `uv`:

```sh
uv tool install specify-cli
specify init my-project --integration copilot
```

Desde Copilot Chat, usa las habilidades en este orden para una funcionalidad
nueva:

1. `/speckit-constitution` para crear o actualizar principios del proyecto.
2. `/speckit-specify` para definir una funcionalidad en `specs/`.
3. `/speckit-plan` para preparar su diseño técnico.
4. `/speckit-tasks` para generar tareas accionables.
5. `/speckit-implement` para implementar las tareas aprobadas.
6. `/speckit-converge` para revisar el resultado frente a la especificación.

`/speckit-clarify`, `/speckit-checklist` y `/speckit-analyze` están disponibles
para revisión y calidad. Las especificaciones futuras deben mantener el alcance
del visor: diagramas interactivos con datos estáticos locales, sin formularios,
CRUD, backend ni operaciones reales. `specs/README.md` describe la organización
de esos artefactos.

## Presentar y explorar

- Usa la navegación lateral o las flechas para recorrer las cinco vistas.
- Selecciona un nodo para ver sus reglas y responsabilidad en el panel derecho.
- Algunos nodos incluyen un botón para saltar al diagrama relacionado.
- Arrastra el fondo para desplazarte; usa la rueda, los controles de zoom,
  el minimapa o **Ajustar vista** para encuadrar el diagrama.
- Los botones y nodos son accesibles mediante Tab; Enter selecciona un nodo.
- **Modo presentación** oculta navegación y panel de detalles para ampliar el
  lienzo. Las flechas siguen disponibles y el botón permite salir del modo.
- En pantallas pequeñas la navegación es horizontal y los detalles aparecen
  bajo el diagrama.
- La leyenda identifica Comercial, Gerencia, Operaciones, Sistema y Externo.
  Los nodos y enlaces discontinuos identifican el flujo legado deprecado.

## Vistas y reglas representadas

1. **Visión general**: ERP, clientes, proveedores, catálogo automático,
   CSP-Tenants, pedidos, controles, aprovisionamiento, suscripciones y contactos.
2. **Cliente & CSP-Tenant**: reutilización por NIT, alta únicamente con respuesta
   válida del ERP, errores bloqueantes y origen legado desde oportunidades
   estudiadas y aprobadas. Comercial crea los CSP-Tenants desde el sistema;
   cada uno pertenece exclusivamente a un cliente y proveedor y debe estar
   Activo para comprar. Un cliente puede tener varios por segmento o corte.
3. **Pedido & aprobaciones**: un cliente, un proveedor, varios CSP-Tenants
   activos y exactamente un CSP-Tenant por línea. No mezcla productos nuevos
   y productos sobre suscripciones activas en todo el pedido. Nuevo significa
   que el CSP no tiene suscripción asociada al producto. Servicios se parametriza
   por CSP y utilidad por producto; ambos son porcentajes sobre costo:
   `precio = costo + costo × servicios / 100 + costo × utilidad / 100`.
   USD, máximo dos decimales, sin impuestos. Gerencia aprueba dentro del sistema
   solo cuando algún margen ponderado/global queda por debajo del mínimo
   configurable del proveedor; igualdad no requiere aprobación.
   Los documentos obligatorios son comunes a los proveedores y su ausencia
   bloquea con error. Operaciones valida documentos, productos, cantidades,
   costos y precios finales; no aprueba márgenes.
4. **Aprovisionamiento**: desde Por Aplicar, el servicio background divide por
   CSP-Tenant y compra al único proveedor. Todos los intentos exitosos:
   Aprovisionado; todos fallidos: Error Envio; mixtos: Aplicado Parcial.
   En parcial, Comercial revisa y ajusta solo productos fallidos y reintenta
   únicamente los no aprovisionados. Los éxitos previos se conservan.
5. **Suscripciones**: sincronización bajo demanda al entrar al detalle del
   CSP-Tenant, consulta de cantidades y fechas, contactos meramente informativos
   del CSP. Los pedidos sobre suscripciones permiten, entre otras operaciones
   mencionadas, modificar cantidades o cancelar.

Estados mostrados: **Alistamiento**, **Verificación de márgenes**,
**Pendiente Validar Operaciones**, **Devuelto**, **Por Aplicar**,
**Aprovisionado**, **Error Envio**, **Aplicado Parcial**.
El rechazo de Gerencia conserva el estado y exige ajustes de Comercial;
no se inventa un estado de rechazo. Operaciones no puede aprobar si falta una
aprobación de márgenes requerida o fue rechazada.

### Límites intencionales

Este es un visor, no una aplicación operativa ni una simulación de compras.
No incorpora formularios CRUD, consultas al ERP, autenticación ni solicitudes
reales. No se especificaron la fórmula/pesos exactos del ponderado global,
los tipos de documentos, la política de reintento para fallo total ni reglas
para suscripciones vencidas/suspendidas. No se inventan esos comportamientos
ni se incluyen calculadoras que aparenten validar márgenes.

## Verificación manual

No existía infraestructura de pruebas automatizadas en el repositorio.
Además de lint y compilación, verificar:

1. Recorrer las cinco vistas mediante navegación y flechas, también en móvil.
2. Seleccionar nodos con ratón y teclado, comprobar sus detalles y enlaces.
3. Acercar, alejar, desplazar y ajustar cada diagrama.
4. Activar y salir del modo presentación sin perder la vista seleccionada.
5. Seguir las ramas de ERP inválido, margen igual/inferior al mínimo, documentos
   faltantes, devolución y tres resultados de aprovisionamiento.
6. Comprobar que el reintento parcial excluye lo ya aprovisionado y que el rechazo
   de Gerencia no crea estados nuevos.
