Confirmación al eliminar una tarea
<img width="1897" height="983" alt="image" src="https://github.com/user-attachments/assets/cfc70954-7502-47a9-a7a0-a8be6884755c" />

Contador de tareas
<img width="1837" height="758" alt="image" src="https://github.com/user-attachments/assets/e009efa8-d56d-49c1-b70c-02faecc768fe" />
<img width="1848" height="447" alt="image" src="https://github.com/user-attachments/assets/aa99aece-cde8-4e55-bd78-52636f1c3cb3" />

Validaciones y notificaciones
<img width="1826" height="565" alt="image" src="https://github.com/user-attachments/assets/abd92383-3435-48da-a8b9-691075972f5f" />
<img width="1833" height="556" alt="image" src="https://github.com/user-attachments/assets/020e531d-1935-44c6-97d6-50ac2a17cdfb" />

Podemos buscar las tareas por " Titulo,Estado,Prioridad,Fecha limite"
<img width="1842" height="763" alt="image" src="https://github.com/user-attachments/assets/8c16cc79-c7f3-4c25-a820-cfd95a369acf" />

Se puede actualizar o editar las tareas
<img width="1875" height="952" alt="image" src="https://github.com/user-attachments/assets/e591a19a-e08e-4293-8999-05f42f0eb0d4" />

# Gestión de Tareas MVC

## Descripción del proyecto

La aplicación web de Gestión de Tareas fue desarrollada en TypeScript como parte del segundo parcial, con el objetivo de facilitar el registro y la organización de tareas. Para cumplir con los requisitos solicitados, se agregaron diferentes funciones que permiten administrar las tareas de forma sencilla.

## Mejoras realizadas

Se incorporaron opciones para crear, editar y eliminar tareas, asignarles una fecha límite y establecer una prioridad alta, media o baja. También se pueden marcar como pendientes o completadas, buscar por título, filtrar por estado y prioridad al mismo tiempo, y ordenar por fecha límite o prioridad.

Además, el sistema muestra un contador de tareas pendientes y del total registrado, resalta en rojo las tareas vencidas y presenta notificaciones para informar sobre las acciones realizadas. También valida los campos obligatorios, evita títulos duplicados y solicita confirmación antes de eliminar una tarea.

## Decisiones técnicas

Para desarrollar el proyecto se mantuvo la estructura MVC, separando el código en modelos, vistas, controladores y utilidades. Esto permite tener una mejor organización y facilita el mantenimiento del sistema.

Se utilizaron HTML5 para la estructura de la página, CSS3 para el diseño y TypeScript para la lógica de la aplicación. Para la interfaz se eligieron los colores azul marino, dorado y blanco, tomando como referencia los colores de la UNIVO.

## Almacenamiento de datos

Para conservar la información se implementó `localStorage`, que permite guardar las tareas en el navegador y mantenerlas después de recargar la página, sin necesidad de utilizar una base de datos. Los datos permanecen guardados en el mismo navegador y origen donde se utiliza la aplicación.

## Estructura del proyecto

El proyecto se organizó en varios archivos para separar las responsabilidades de cada parte:

- `src/modelos/TareaModel.ts`: contiene el modelo de las tareas.
- `src/vistas/TareaUI.ts`: se encarga de mostrar el formulario, la lista y los mensajes.
- `src/controladores/AppController.ts`: controla la lógica y los eventos de la aplicación.
- `src/utilidades/StorageHelper.ts`: administra el almacenamiento en `localStorage`.
- `src/App.ts`: funciona como punto de entrada del proyecto.
- `index.html`: contiene la estructura de la página.
- `style.css`: define los estilos de la interfaz.

## Tecnologías utilizadas

- HTML5
- CSS3
- TypeScript
- JavaScript
- Node.js
- npm
- Git y GitHub

## Requisitos previos

Para instalar y ejecutar el proyecto se necesita tener instalado:

- [Node.js y npm](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
- La extensión Live Server de Visual Studio Code.

## Clonar el repositorio

Para obtener una copia del proyecto, abre una terminal en la carpeta donde deseas guardarlo y ejecuta el siguiente comando:

```bash
git clone https://github.com/Randal-Lopez/Parcial-2-POE.git
```

Después, ingresa a la carpeta del proyecto:

```bash
cd Parcial-2-POE
```

Si el nombre del repositorio es diferente, utiliza el nombre de la carpeta que se creó al clonarlo.

## Instalación y ejecución

Una vez dentro de la carpeta del proyecto, instala las dependencias necesarias:

```bash
npm install
```

Después, compila el código TypeScript:

```bash
npm run build
```

Cuando termine la compilación, abre la carpeta del proyecto en Visual Studio Code y ejecuta el archivo `index.html` utilizando la extensión Live Server.

La aplicación se abrirá en el navegador y podrás comenzar a registrar y administrar tus tareas.

## Validaciones

El sistema incorpora validaciones para evitar errores al registrar tareas:

- El título y la descripción son obligatorios.
- La fecha límite es obligatoria y no puede estar en el pasado.
- No se permiten dos tareas con el mismo título, sin distinguir mayúsculas y minúsculas.
- La prioridad debe ser alta, media o baja.
- Antes de eliminar una tarea, se solicita confirmación.


Para comprobar el funcionamiento del sistema, se recomienda realizar las siguientes pruebas:

1. Registrar una tarea y recargar la página para comprobar que los datos se conservan.
2. Intentar registrar otra tarea con el mismo título.
3. Editar el título, la descripción, la fecha límite y la prioridad.
4. Combinar la búsqueda por título con los filtros de estado y prioridad.
5. Ordenar las tareas por fecha límite y prioridad.
6. Marcar una tarea como completada y comprobar que el contador se actualiza.
7. Comprobar que las tareas vencidas se identifican visualmente.
8. Intentar eliminar una tarea y probar las opciones de aceptar y cancelar la confirmación.
