import { TareaModel } from '../modelos/TareaModel.js';
export class AppController {
    constructor(ui, storage) {
        this.ui = ui;
        this.storage = storage;
        this.textoBusqueda = '';
        this.estadoFiltro = 'todas';
        this.prioridadFiltro = 'todas';
        this.orden = 'fecha';
        // También conserva tareas guardadas de versiones anteriores.
        this.arregloTareas = this.storage.obtenerDatos().map(t => ({
            ...t,
            prioridad: t.prioridad || 'media',
            fechaLimite: t.fechaLimite || ''
        }));
        this.ui.vincularAgregar(this.guardarTarea.bind(this));
        this.ui.vincularEliminar(this.handleDelete.bind(this));
        this.ui.vincularCompletar(this.cambiarEstado.bind(this));
        this.ui.vincularEditar(this.cargarEdicion.bind(this));
        this.ui.vincularCancelar(this.cancelarEdicion.bind(this));
        this.ui.vincularBuscar(this.handleSearch.bind(this));
        this.ui.vincularFiltrar(this.aplicarFiltros.bind(this));
        this.storage.guardarDatos(this.arregloTareas);
        this.mostrarTareas();
    }
    guardarTarea(datos) {
        const titulo = datos.titulo.trim();
        const descripcion = datos.descripcion.trim();
        if (!titulo || !descripcion || !datos.fechaLimite) {
            this.ui.mostrarMensaje('Completa el título, la descripción y la fecha límite.', 'error');
            return;
        }
        if (!['alta', 'media', 'baja'].includes(datos.prioridad)) {
            this.ui.mostrarMensaje('Selecciona una prioridad válida.', 'error');
            return;
        }
        if (datos.fechaLimite < this.fechaHoy()) {
            this.ui.mostrarMensaje('La fecha límite no puede estar en el pasado.', 'error');
            return;
        }
        const duplicada = this.arregloTareas.some(t => t.titulo.toLowerCase() === titulo.toLowerCase() && t.id !== datos.id);
        if (duplicada) {
            this.ui.mostrarMensaje('Ya existe una tarea con ese título. Usa un título diferente.', 'error');
            return;
        }
        if (datos.id) {
            this.handleUpdate(datos);
        }
        else {
            const nuevaTarea = new TareaModel(Date.now().toString() + Math.random().toString(16).slice(2, 6), titulo, descripcion, false, datos.prioridad, datos.fechaLimite);
            this.arregloTareas.push(nuevaTarea);
            this.storage.guardarDatos(this.arregloTareas);
            this.ui.cancelarEdicion();
            this.ui.mostrarMensaje('Tarea agregada correctamente.');
            this.mostrarTareas();
        }
    }
    handleUpdate(datos) {
        const tarea = this.arregloTareas.find(t => t.id === datos.id);
        if (!tarea) {
            this.ui.mostrarMensaje('No se encontró la tarea que deseas editar.', 'error');
            return;
        }
        tarea.titulo = datos.titulo.trim();
        tarea.descripcion = datos.descripcion.trim();
        tarea.prioridad = datos.prioridad;
        tarea.fechaLimite = datos.fechaLimite;
        this.storage.guardarDatos(this.arregloTareas);
        this.ui.cancelarEdicion();
        this.ui.mostrarMensaje('Tarea actualizada correctamente.');
        this.mostrarTareas();
    }
    cargarEdicion(id) {
        const tarea = this.arregloTareas.find(t => t.id === id);
        if (tarea)
            this.ui.renderEditForm(tarea);
    }
    cancelarEdicion() {
        this.ui.cancelarEdicion();
    }
    handleDelete(id) {
        this.arregloTareas = this.arregloTareas.filter(t => t.id !== id);
        this.storage.guardarDatos(this.arregloTareas);
        this.ui.mostrarMensaje('Tarea eliminada.');
        this.mostrarTareas();
    }
    cambiarEstado(id) {
        const tarea = this.arregloTareas.find(t => t.id === id);
        if (tarea) {
            tarea.completada = !tarea.completada;
            this.storage.guardarDatos(this.arregloTareas);
            this.mostrarTareas();
        }
    }
    handleSearch(texto) {
        this.textoBusqueda = texto;
        this.mostrarTareas();
    }
    aplicarFiltros(estado, prioridad, orden) {
        this.estadoFiltro = estado;
        this.prioridadFiltro = prioridad;
        this.orden = orden;
        this.mostrarTareas();
    }
    mostrarTareas() {
        let resultado = TareaModel.filterTareas(this.arregloTareas, this.estadoFiltro, this.prioridadFiltro);
        resultado = TareaModel.searchTareas(resultado, this.textoBusqueda);
        if (this.orden === 'prioridad') {
            const niveles = { alta: 1, media: 2, baja: 3 };
            resultado = [...resultado].sort((a, b) => niveles[a.prioridad] - niveles[b.prioridad]);
        }
        else {
            resultado = [...resultado].sort((a, b) => a.fechaLimite.localeCompare(b.fechaLimite));
        }
        this.ui.mostrarTareas(resultado);
        this.ui.renderCounter(this.arregloTareas.filter(t => !t.completada).length, this.arregloTareas.length);
    }
    fechaHoy() {
        const fecha = new Date();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const dia = String(fecha.getDate()).padStart(2, '0');
        return `${fecha.getFullYear()}-${mes}-${dia}`;
    }
}
