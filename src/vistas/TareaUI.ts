import { ITarea } from '../modelos/TareaModel.js';

export class TareaUI {
    private contenedorLista: HTMLElement;
    private formulario: HTMLFormElement;
    private notificaciones: HTMLElement;

    constructor() {
        this.contenedorLista = document.getElementById('lista-tareas')!;
        this.formulario = document.getElementById('form-tarea') as HTMLFormElement;
        this.notificaciones = document.getElementById('notificaciones')!;
    }

    vincularAgregar(manejador: (datos: { id: string; titulo: string; descripcion: string; prioridad: string; fechaLimite: string }) => void) {
        this.formulario.addEventListener('submit', (evento) => {
            evento.preventDefault();

            manejador({
                id: (document.getElementById('tarea-id') as HTMLInputElement).value,
                titulo: (document.getElementById('titulo') as HTMLInputElement).value.trim(),
                descripcion: (document.getElementById('descripcion') as HTMLTextAreaElement).value.trim(),
                prioridad: (document.getElementById('prioridad') as HTMLSelectElement).value,
                fechaLimite: (document.getElementById('fecha-limite') as HTMLInputElement).value
            });
        });
    }

    vincularCancelar(manejador: () => void) {
        document.getElementById('btn-cancelar')!.addEventListener('click', manejador);
    }

    vincularEliminar(manejador: (id: string) => void) {
        this.contenedorLista.addEventListener('click', (evento) => {
            const elemento = evento.target as HTMLElement;
            const tarea = elemento.closest('li') as HTMLElement | null;
            if (!tarea) return;

            const id = tarea.dataset.id!;
            if (elemento.classList.contains('btn-eliminar')) {
                if (confirm('¿Eliminar esta tarea definitivamente?')) manejador(id);
            }

            if (elemento.classList.contains('btn-editar')) {
                this.eventoEditar?.(id);
            }
        });
    }

    private eventoEditar?: (id: string) => void;

    vincularEditar(manejador: (id: string) => void) {
        this.eventoEditar = manejador;
    }

    vincularCompletar(manejador: (id: string) => void) {
        this.contenedorLista.addEventListener('change', (evento) => {
            const elemento = evento.target as HTMLInputElement;
            if (elemento.classList.contains('check-completada')) {
                const tarea = elemento.closest('li') as HTMLElement;
                manejador(tarea.dataset.id!);
            }
        });
    }

    vincularBuscar(manejador: (texto: string) => void) {
        document.getElementById('buscar')!.addEventListener('input', () => {
            manejador((document.getElementById('buscar') as HTMLInputElement).value);
        });
    }

    vincularFiltrar(manejador: (estado: string, prioridad: string, orden: string) => void) {
        const actualizar = () => {
            manejador(
                (document.getElementById('filtro-estado') as HTMLSelectElement).value,
                (document.getElementById('filtro-prioridad') as HTMLSelectElement).value,
                (document.getElementById('ordenar') as HTMLSelectElement).value
            );
        };

        document.getElementById('filtro-estado')!.addEventListener('change', actualizar);
        document.getElementById('filtro-prioridad')!.addEventListener('change', actualizar);
        document.getElementById('ordenar')!.addEventListener('change', actualizar);
    }

    renderEditForm(tarea: ITarea) {
        (document.getElementById('tarea-id') as HTMLInputElement).value = tarea.id;
        (document.getElementById('titulo') as HTMLInputElement).value = tarea.titulo;
        (document.getElementById('descripcion') as HTMLTextAreaElement).value = tarea.descripcion;
        (document.getElementById('prioridad') as HTMLSelectElement).value = tarea.prioridad;
        (document.getElementById('fecha-limite') as HTMLInputElement).value = tarea.fechaLimite;

        document.getElementById('titulo-formulario')!.textContent = 'Editar tarea';
        document.getElementById('btn-guardar')!.textContent = 'Actualizar tarea';
        document.getElementById('btn-cancelar')!.classList.remove('oculto');
        document.getElementById('titulo')!.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    cancelarEdicion() {
        this.formulario.reset();
        (document.getElementById('tarea-id') as HTMLInputElement).value = '';
        document.getElementById('titulo-formulario')!.textContent = 'Agregar tarea';
        document.getElementById('btn-guardar')!.textContent = 'Agregar tarea';
        document.getElementById('btn-cancelar')!.classList.add('oculto');
    }

    renderCounter(pendientes: number, total: number) {
        document.getElementById('contador-tareas')!.textContent =
            `Pendientes: ${pendientes} · Total: ${total}`;
    }

    mostrarMensaje(mensaje: string, tipo: 'exito' | 'error' = 'exito') {
        this.notificaciones.innerHTML = '';
        const div = document.createElement('div');
        div.className = `mensaje ${tipo}`;
        div.textContent = mensaje;
        this.notificaciones.appendChild(div);

        window.setTimeout(() => {
            if (div.parentElement) div.remove();
        }, 3500);
    }

    mostrarTareas(tareas: ITarea[]) {
        this.contenedorLista.innerHTML = '';
        document.getElementById('sin-tareas')!.classList.toggle('oculto', tareas.length > 0);

        tareas.forEach(tarea => {
            const li = document.createElement('li');
            const vencida = !tarea.completada && tarea.fechaLimite < this.fechaHoy();
            li.dataset.id = tarea.id;
            li.className = `tarea prioridad-${tarea.prioridad} ${tarea.completada ? 'completada' : ''} ${vencida ? 'vencida' : ''}`;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'check-completada';
            checkbox.checked = tarea.completada;
            checkbox.setAttribute('aria-label', 'Marcar tarea como completada');

            const contenido = document.createElement('div');
            contenido.className = 'tarea-contenido';

            const titulo = document.createElement('div');
            titulo.className = 'tarea-titulo';
            titulo.textContent = tarea.titulo;

            const descripcion = document.createElement('div');
            descripcion.className = 'tarea-descripcion';
            descripcion.textContent = tarea.descripcion;

            const detalles = document.createElement('div');
            detalles.className = 'detalles';

            const prioridad = document.createElement('span');
            prioridad.className = 'etiqueta';
            prioridad.textContent = `Prioridad: ${tarea.prioridad}`;

            const fecha = document.createElement('span');
            fecha.className = `etiqueta ${vencida ? 'vencimiento' : ''}`;
            fecha.textContent = vencida ? `VENCIDA · ${tarea.fechaLimite}` : `Fecha límite: ${tarea.fechaLimite}`;

            const estado = document.createElement('span');
            estado.className = 'etiqueta';
            estado.textContent = tarea.completada ? 'Completada' : 'Pendiente';

            detalles.append(prioridad, fecha, estado);
            contenido.append(titulo, descripcion, detalles);

            const acciones = document.createElement('div');
            acciones.className = 'tarea-acciones';

            const editar = document.createElement('button');
            editar.type = 'button';
            editar.className = 'btn-editar';
            editar.textContent = 'Editar';

            const eliminar = document.createElement('button');
            eliminar.type = 'button';
            eliminar.className = 'btn-eliminar';
            eliminar.textContent = 'Eliminar';

            acciones.append(editar, eliminar);
            li.append(checkbox, contenido, acciones);
            this.contenedorLista.appendChild(li);
        });
    }

    private fechaHoy(): string {
        const fecha = new Date();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const dia = String(fecha.getDate()).padStart(2, '0');
        return `${fecha.getFullYear()}-${mes}-${dia}`;
    }
}