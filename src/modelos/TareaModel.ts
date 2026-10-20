export interface ITarea {
    id: string;
    titulo: string;
    descripcion: string;
    completada: boolean;
    prioridad: string;
    fechaLimite: string;
}

export class TareaModel implements ITarea {
    constructor(
        public id: string,
        public titulo: string,
        public descripcion: string,
        public completada: boolean = false,
        public prioridad: string = 'media',
        public fechaLimite: string = ''
    ) {}

    updateTarea(titulo: string, descripcion: string, prioridad: string, fechaLimite: string): void {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.prioridad = prioridad;
        this.fechaLimite = fechaLimite;
    }

    static searchTareas(tareas: ITarea[], texto: string): ITarea[] {
        return tareas.filter(t =>
            t.titulo.toLowerCase().includes(texto.trim().toLowerCase())
        );
    }

    static filterTareas(tareas: ITarea[], estado: string, prioridad: string): ITarea[] {
        return tareas.filter(t => {
            const coincideEstado =
                estado === 'todas' ||
                (estado === 'pendientes' && !t.completada) ||
                (estado === 'completadas' && t.completada);

            const coincidePrioridad =
                prioridad === 'todas' || t.prioridad === prioridad;

            return coincideEstado && coincidePrioridad;
        });
    }
}