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

## Gobernanza

Esta constitución define el alcance del producto y prevalece sobre decisiones
técnicas contradictorias en una especificación, plan o tarea. Toda modificación
de sus principios debe actualizar su versión y justificar el cambio. Cada
especificación futura debe verificar explícitamente que no introduce formularios,
CRUD, backend ni efectos operativos.

**Versión**: 1.1.0 | **Ratificada**: 2026-10-08 | **Última enmienda**: 2026-10-08
(Enmienda 1.1.0: se añade el principio VIII, comunicación siempre en español,
y se corrige la redacción del principio VII; no cambia el alcance del producto.)
(Enmienda 1.0.1: se renombra el producto de "CSP Atlas" a "Arquitectura
Multivendor"; los principios no cambian.)
