import { ITarea, TareaModel } from '../modelos/TareaModel.js';
import { TareaUI } from '../vistas/TareaUI.js';
import { StorageHelper } from '../utilidades/StorageHelper.js';

type DatosTarea = {
    id: string;
    titulo: string;
    descripcion: string;
    prioridad: string;
    fechaLimite: string;
};

export class AppController {
    private arregloTareas: ITarea[];
    private textoBusqueda = '';
    private estadoFiltro = 'todas';
    private prioridadFiltro = 'todas';
    private orden = 'fecha';

    constructor(
        private ui: TareaUI,
        private storage: StorageHelper<ITarea>
    ) {
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

    private guardarTarea(datos: DatosTarea) {
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

        const duplicada = this.arregloTareas.some(t =>
            t.titulo.toLowerCase() === titulo.toLowerCase() && t.id !== datos.id
        );

        if (duplicada) {
            this.ui.mostrarMensaje('Ya existe una tarea con ese título. Usa un título diferente.', 'error');
            return;
        }

        if (datos.id) {
            this.handleUpdate(datos);
        } else {
            const nuevaTarea = new TareaModel(
                Date.now().toString() + Math.random().toString(16).slice(2, 6),
                titulo,
                descripcion,
                false,
                datos.prioridad,
                datos.fechaLimite
            );

            this.arregloTareas.push(nuevaTarea);
            this.storage.guardarDatos(this.arregloTareas);
            this.ui.cancelarEdicion();
            this.ui.mostrarMensaje('Tarea agregada correctamente.');
            this.mostrarTareas();
        }
    }

    private handleUpdate(datos: DatosTarea) {
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

    private cargarEdicion(id: string) {
        const tarea = this.arregloTareas.find(t => t.id === id);
        if (tarea) this.ui.renderEditForm(tarea);
    }

    private cancelarEdicion() {
        this.ui.cancelarEdicion();
    }

    private handleDelete(id: string) {
        this.arregloTareas = this.arregloTareas.filter(t => t.id !== id);
        this.storage.guardarDatos(this.arregloTareas);
        this.ui.mostrarMensaje('Tarea eliminada.');
        this.mostrarTareas();
    }

    private cambiarEstado(id: string) {
        const tarea = this.arregloTareas.find(t => t.id === id);
        if (tarea) {
            tarea.completada = !tarea.completada;
            this.storage.guardarDatos(this.arregloTareas);
            this.mostrarTareas();
        }
    }

    private handleSearch(texto: string) {
        this.textoBusqueda = texto;
        this.mostrarTareas();
    }

    private aplicarFiltros(estado: string, prioridad: string, orden: string) {
        this.estadoFiltro = estado;
        this.prioridadFiltro = prioridad;
        this.orden = orden;
        this.mostrarTareas();
    }

    private mostrarTareas() {
        let resultado = TareaModel.filterTareas(
            this.arregloTareas,
            this.estadoFiltro,
            this.prioridadFiltro
        );

        resultado = TareaModel.searchTareas(resultado, this.textoBusqueda);

        if (this.orden === 'prioridad') {
            const niveles: Record<string, number> = { alta: 1, media: 2, baja: 3 };
            resultado = [...resultado].sort((a, b) => niveles[a.prioridad] - niveles[b.prioridad]);
        } else {
            resultado = [...resultado].sort((a, b) => a.fechaLimite.localeCompare(b.fechaLimite));
        }

        this.ui.mostrarTareas(resultado);
        this.ui.renderCounter(
            this.arregloTareas.filter(t => !t.completada).length,
            this.arregloTareas.length
        );
    }

    private fechaHoy(): string {
        const fecha = new Date();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const dia = String(fecha.getDate()).padStart(2, '0');
        return `${fecha.getFullYear()}-${mes}-${dia}`;
    }
}