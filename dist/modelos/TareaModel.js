export class TareaModel {
    constructor(id, titulo, descripcion, completada = false, prioridad = 'media', fechaLimite = '') {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.completada = completada;
        this.prioridad = prioridad;
        this.fechaLimite = fechaLimite;
    }
    updateTarea(titulo, descripcion, prioridad, fechaLimite) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.prioridad = prioridad;
        this.fechaLimite = fechaLimite;
    }
    static searchTareas(tareas, texto) {
        return tareas.filter(t => t.titulo.toLowerCase().includes(texto.trim().toLowerCase()));
    }
    static filterTareas(tareas, estado, prioridad) {
        return tareas.filter(t => {
            const coincideEstado = estado === 'todas' ||
                (estado === 'pendientes' && !t.completada) ||
                (estado === 'completadas' && t.completada);
            const coincidePrioridad = prioridad === 'todas' || t.prioridad === prioridad;
            return coincideEstado && coincidePrioridad;
        });
    }
}
