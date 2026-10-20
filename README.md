# Gestión de Tareas MVC — Parcial 2

## Descripción
Aplicación web desarrollada en TypeScript para registrar y organizar tareas. Utiliza una estructura basada en MVC y guarda los datos en el almacenamiento local del navegador.

## Funcionalidades
- Registrar tareas con título, descripción, fecha límite y prioridad.
- Marcar tareas como completadas o pendientes.
- Editar tareas existentes desde el formulario.
- Eliminar tareas con confirmación.
- Buscar por título.
- Filtrar por estado y prioridad; los filtros y la búsqueda se combinan.
- Ordenar por fecha límite o prioridad (alta, media y baja).
- Guardar y cargar datos desde `localStorage`.
- Mostrar el contador de tareas pendientes y el total.
- Resaltar en rojo las tareas pendientes cuya fecha límite ya venció.
- Validar campos vacíos, fecha límite, prioridad y títulos duplicados.
- Mostrar notificaciones que se cierran automáticamente.

## Tecnologías
HTML5, CSS3, TypeScript, JavaScript, Node.js y npm.

## Estructura
- `src/modelos/TareaModel.ts`: interfaz y modelo de las tareas, búsqueda y filtros.
- `src/vistas/TareaUI.ts`: formulario, lista, edición, mensajes y contador.
- `src/controladores/AppController.ts`: lógica de la aplicación y eventos.
- `src/utilidades/StorageHelper.ts`: persistencia en `localStorage`.
- `src/App.ts`: punto de entrada.
- `index.html`: estructura de la página.
- `style.css`: estilos.

## Requisitos
- Node.js y npm.
- Visual Studio Code.
- Extensión Live Server.

## Instalación y ejecución
1. Abre esta carpeta en Visual Studio Code.
2. Instala TypeScript y las dependencias:

   ```bash
   npm install
   ```

3. Compila el proyecto:

   ```bash
   npm run build
   ```

4. Abre `index.html` con Live Server.

Cada vez que modifiques archivos `.ts`, vuelve a ejecutar `npm run build` antes de recargar el navegador.

## Validaciones
- El título y la descripción son obligatorios.
- La fecha límite es obligatoria y no puede estar en el pasado.
- No se permiten dos tareas con el mismo título, sin distinguir mayúsculas y minúsculas.
- La prioridad debe ser alta, media o baja.

## Persistencia
Los datos se guardan en `localStorage` con la clave `tareas-parcial2`. Permanecen en el mismo navegador y origen después de recargar la página.

## Pruebas recomendadas
1. Agregar una tarea y recargar la página.
2. Intentar agregar otra tarea con el mismo título.
3. Editar título, descripción, fecha y prioridad.
4. Combinar una búsqueda con estado y prioridad.
5. Ordenar por fecha y por prioridad.
6. Marcar una tarea completada y comprobar el contador.
7. Probar una tarea vencida (para probarlo, puedes cambiar temporalmente la fecha del sistema o quitar la validación de fecha pasada).
8. Eliminar una tarea y cancelar/aceptar la confirmación.

## Capturas
Agrega aquí capturas de pantalla de la aplicación funcionando antes de entregar el repositorio.