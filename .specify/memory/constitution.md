# Constitución de Arquitectura Multivendor

## Principios fundamentales

### I. El diagrama es el producto

Arquitectura Multivendor es una aplicación local de presentación para explorar diagramas
interactivos de arquitectura y flujos de negocio. Toda funcionalidad DEBE servir
a la comprensión y presentación de esos diagramas; no debe convertirse en una
aplicación operativa.

### II. Sin operaciones ni captura de datos

La aplicación NO DEBE incorporar formularios, CRUD, autenticación, backend,
llamadas a ERP/CSP ni compras reales. Los botones y controles solo cambian la
navegación, selección, encuadre o énfasis visual del diagrama.

### III. Datos locales y comportamiento reproducible

Los diagramas y sus datos DEBEN permanecer estáticos y embebidos en el frontend.
La aplicación debe poder presentarse localmente sin servicios ni recursos
remotos en tiempo de ejecución. No se deben inventar reglas de negocio que no
estén documentadas.

### IV. Coherencia con React y Vite

Las funcionalidades nuevas DEBEN integrarse con React, Vite y la estructura
existente. Para diagramas interactivos se debe reutilizar `@xyflow/react` y los
componentes existentes antes de añadir dependencias.

### V. Accesibilidad y uso en presentación

Los controles y recorridos DEBEN seguir siendo comprensibles y utilizables con
teclado, ratón y tamaños de pantalla admitidos. Las interacciones deben ayudar
a explicar el flujo, no permitir editar sus datos o conexiones.

### VI. Cambios pequeños y verificables

Cada cambio DEBE limitarse a la funcionalidad especificada, preservar los flujos
existentes y documentar las reglas que representa. Ejecuta `npm run lint` y
`npm run build` para validar los cambios de la aplicación; no afirmes que hay
pruebas automatizadas, pues el proyecto no incluye infraestructura de tests.

### VII. Idioma de archivos markdown

Todos los archivos markdown (.md) creados DEBEN estar en español.

### VIII. Comunicación siempre en español

Toda interacción con Copilot, el CLI, el chat o cualquier otro modelo o agente
(respuestas, preguntas de aclaración, opciones, resúmenes, mensajes de progreso
y artefactos de Spec Kit) DEBE estar en español, sin importar el idioma de la
solicitud, salvo que el usuario pida expresamente otro idioma, y solo durante
esa sesión. Código, identificadores, comandos y salidas literales de
herramientas pueden conservar su idioma original, pero su explicación DEBE
darse en español.

## Restricciones del proyecto

- Aplicación frontend local con React, Vite y `@xyflow/react`.
- Datos mock estáticos dentro del frontend; sin almacenamiento ni backend.
- Solo navegación, presentación y exploración de diagramas.
- No agregar dependencias, servicios o infraestructura salvo que una futura
  especificación lo justifique explícitamente y actualice esta constitución.
- Mantener `architecture-viewer/` como ámbito de este Spec Kit. La configuración
  SDD de la raíz pertenece a otro proyecto y no debe modificarse desde aquí.

## Reglas de negocio de productos

- Un producto tiene costo fabricante, precio máximo sugerido, segmento
  (Comercial, Educación o Gobierno), código proveedor, términos de duración y
  ciclos de facturación.
- El código interno lo calcula el sistema concatenando código proveedor,
  segmento, término de facturación y duración (ej.
  `65324789CA13A12:0-Comercial-Anual-P3Y`); garantiza unicidad porque el
  proveedor repite su código con costos distintos por término y segmento.
- Tipos según proveedor: Trial (prueba, normalmente sin costo ni precio máximo
  sugerido), Costo Cero (complemento sin valor) e Introductorio (precio
  especial, fuera de la lista regular, solo ventas autorizadas).
- Estados: Activo (puede agregarse al pedido); Descontinuado (fuera de la lista
  de precios, sin ventas nuevas, solo renovación para clientes con suscripción
  activa); Inactivo (fuera de la lista actual o inactivado manualmente);
  Inconsistente (creado por la sincronización y pendiente de clasificación
  manual, tras lo cual pasa a Activo).
- Sincronización: servicio Windows diario (~2 a. m.) que consulta por API por
  proveedor y segmento, genera un CSV por lista de precios, actualiza o crea
  (como Inconsistente) línea por línea, borra cada archivo procesado y, al
  final, inactiva solo los productos Activos con fecha de actualización anterior
  a la ejecución. Si falla la actualización de precios se notifica al buzón de
  operaciones parametrizado en base de datos.
- Venta: solo productos Activos y del mismo segmento del CSP-Tenant. Los
  márgenes de utilidad se parametrizan por producto; sin ellos el sistema
  calcula el margen entre costo fabricante y precio máximo sugerido (fórmula no
  especificada). Un parámetro por proveedor puede impedir continuar el pedido si
  costo fabricante + margen parametrizado supera el precio máximo sugerido.

## Reglas de negocio de CSP-Tenant

- CSP y Tenant forman un conjunto inseparable (no existe uno sin el otro), con
  relación uno a uno y asociado a un cliente. El Tenant intermedia entre
  Controles Empresariales (razón social del distribuidor) y el proveedor.
- Segmentos: Comercial, Educación, Gobierno y Sin ánimo de lucro. Subsegmentos:
  Educación (Sin ánimo de lucro, Educación superior, Colegios) y Gobierno
  (Federal, Estatal); Comercial y Sin ánimo de lucro no tienen.
- Contactos (nombre, correo, teléfono) con un contacto principal que recibe las
  notificaciones del flujo.
- Traslado a otro cliente solo si el cliente destino está Activo, el CSP-Tenant
  está Activo y el cliente está en la plataforma Multivendor.
- Creación: «Nuevo» (no es un estado; inicia en Pendiente Creación mientras un
  servicio Windows lo procesa); «Existente bajo otro distribuidor» (Pendiente
  Invitación → invitación por Adobe Sign con webhook → Pendiente Validación
  Invitación); «Existente creado fuera de la plataforma» (Pendiente Aprobación,
  sin solicitud al cliente, con notificación a Operaciones). En los dos casos
  existentes, Operaciones consulta si el Tenant está asociado a Controles
  Empresariales: si lo está pasa a Activo; si no, se muestra un error y se
  gestiona manualmente.
- Estados: Activo, Inactivo (manual solo por Operaciones, o automático si deja
  de estar bajo el dominio de Controles Empresariales), Pendiente Creación,
  Pendiente Invitación, Pendiente Validación Invitación, Pendiente Aprobación y
  Pendiente Aceptación de términos y condiciones (deprecado).
- Las funcionalidades propias de cada proveedor (Compromisos y Recomendaciones,
  solo Adobe) se describen solo de forma global.

## Gobernanza

Esta constitución define el alcance del producto y prevalece sobre decisiones
técnicas contradictorias en una especificación, plan o tarea. Toda modificación
de sus principios debe actualizar su versión y justificar el cambio. Cada
especificación futura debe verificar explícitamente que no introduce formularios,
CRUD, backend ni efectos operativos.

**Versión**: 1.3.0 | **Ratificada**: 2026-10-08 | **Última enmienda**: 2026-10-09
(Enmienda 1.3.0: se documentan las reglas de negocio de CSP-Tenant; no cambia
el alcance del producto.)
(Enmienda 1.2.0: se documentan las reglas de negocio de productos; no cambia
el alcance del producto.)
(Enmienda 1.1.0: se añade el principio VIII, comunicación siempre en español,
y se corrige la redacción del principio VII; no cambia el alcance del producto.)
(Enmienda 1.0.1: se renombra el producto de "CSP Atlas" a "Arquitectura
Multivendor"; los principios no cambian.)
