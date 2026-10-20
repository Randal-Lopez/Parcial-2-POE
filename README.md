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

Descripción del proyecto

La aplicación web de Gestión de Tareas fue desarrollada en TypeScript como parte del segundo parcial, con el objetivo de facilitar el registro y la organización de tareas. Para cumplir con los requisitos solicitados, se agregaron diferentes funciones que permiten administrar las tareas de forma sencilla.

Mejoras realizadas

Se incorporaron opciones para crear, editar y eliminar tareas, asignarles una fecha límite y establecer una prioridad alta, media o baja. También se pueden marcar como pendientes o completadas, buscar por título, filtrar por estado y prioridad al mismo tiempo, y ordenar por fecha límite o prioridad.

Además, el sistema muestra un contador de tareas pendientes y del total registrado, resalta en rojo las tareas vencidas y presenta notificaciones para informar sobre las acciones realizadas. También valida los campos obligatorios, evita títulos duplicados y solicita confirmación antes de eliminar una tarea.

Decisiones técnicas

Para desarrollar el proyecto se mantuvo la estructura MVC, separando el código en modelos, vistas, controladores y utilidades. Esto permite tener una mejor organización y facilita el mantenimiento del sistema.

Se utilizaron HTML5 para la estructura de la página, CSS3 para el diseño y TypeScript para la lógica de la aplicación. Para la interfaz se eligieron los colores azul marino, dorado y blanco, tomando como referencia los colores de la UNIVO.

Almacenamiento de datos

Para conservar la información se implementó localStorage, que permite guardar las tareas en el navegador y mantenerlas después de recargar la página, sin necesidad de utilizar una base de datos. Los datos permanecen guardados en el mismo navegador y origen donde se utiliza la aplicación.

Estructura del proyecto

El proyecto se organizó en varios archivos para separar las responsabilidades de cada parte:

TareaModel.ts: contiene el modelo de las tareas.
TareaUI.ts: se encarga de mostrar el formulario, la lista y los mensajes.
AppController.ts: controla la lógica y los eventos de la aplicación.
StorageHelper.ts: administra el almacenamiento en localStorage.
App.ts: funciona como punto de entrada del proyecto.
index.html: contiene la estructura de la página.
style.css: define los estilos de la interfaz.
Instalación y ejecución

Para ejecutar el proyecto se necesita Node.js, npm, Visual Studio Code y la extensión Live Server. Primero se abre la carpeta del proyecto en Visual Studio Code y se ejecuta el siguiente comando para instalar las dependencias:

npm install

Después, se compila el código TypeScript con:

npm run build

Finalmente, se abre el archivo index.html utilizando Live Server. Cada vez que se realicen cambios en los archivos .ts, es necesario volver a ejecutar npm run build antes de actualizar la página.

Pruebas recomendadas

Para comprobar el funcionamiento del sistema, se recomienda registrar tareas, editarlas y eliminarlas, probar las validaciones y verificar que no se permitan títulos duplicados. También se debe comprobar la búsqueda por título, la combinación de filtros, el ordenamiento por fecha y prioridad, el contador de tareas y la identificación visual de las tareas vencidas.

Por último, se puede recargar la página para verificar que las tareas continúen guardadas en el navegador.
