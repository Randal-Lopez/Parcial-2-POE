export class TareaUI {
    constructor() {
        this.contenedorLista = document.getElementById('lista-tareas');
        this.formulario = document.getElementById('form-tarea');
        this.notificaciones = document.getElementById('notificaciones');
    }
    vincularAgregar(manejador) {
        this.formulario.addEventListener('submit', (evento) => {
            evento.preventDefault();
            manejador({
                id: document.getElementById('tarea-id').value,
                titulo: document.getElementById('titulo').value.trim(),
                descripcion: document.getElementById('descripcion').value.trim(),
                prioridad: document.getElementById('prioridad').value,
                fechaLimite: document.getElementById('fecha-limite').value
            });
        });
    }
    vincularCancelar(manejador) {
        document.getElementById('btn-cancelar').addEventListener('click', manejador);
    }
    vincularEliminar(manejador) {
        this.contenedorLista.addEventListener('click', (evento) => {
            const elemento = evento.target;
            const tarea = elemento.closest('li');
            if (!tarea)
                return;
            const id = tarea.dataset.id;
            if (elemento.classList.contains('btn-eliminar')) {
                if (confirm('¿Eliminar esta tarea definitivamente?'))
                    manejador(id);
            }
            if (elemento.classList.contains('btn-editar')) {
                this.eventoEditar?.(id);
            }
        });
    }
    vincularEditar(manejador) {
        this.eventoEditar = manejador;
    }
    vincularCompletar(manejador) {
        this.contenedorLista.addEventListener('change', (evento) => {
            const elemento = evento.target;
            if (elemento.classList.contains('check-completada')) {
                const tarea = elemento.closest('li');
                manejador(tarea.dataset.id);
            }
        });
    }
    vincularBuscar(manejador) {
        document.getElementById('buscar').addEventListener('input', () => {
            manejador(document.getElementById('buscar').value);
        });
    }
    vincularFiltrar(manejador) {
        const actualizar = () => {
            manejador(document.getElementById('filtro-estado').value, document.getElementById('filtro-prioridad').value, document.getElementById('ordenar').value);
        };
        document.getElementById('filtro-estado').addEventListener('change', actualizar);
        document.getElementById('filtro-prioridad').addEventListener('change', actualizar);
        document.getElementById('ordenar').addEventListener('change', actualizar);
    }
    renderEditForm(tarea) {
        document.getElementById('tarea-id').value = tarea.id;
        document.getElementById('titulo').value = tarea.titulo;
        document.getElementById('descripcion').value = tarea.descripcion;
        document.getElementById('prioridad').value = tarea.prioridad;
        document.getElementById('fecha-limite').value = tarea.fechaLimite;
        document.getElementById('titulo-formulario').textContent = 'Editar tarea';
        document.getElementById('btn-guardar').textContent = 'Actualizar tarea';
        document.getElementById('btn-cancelar').classList.remove('oculto');
        document.getElementById('titulo').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    cancelarEdicion() {
        this.formulario.reset();
        document.getElementById('tarea-id').value = '';
        document.getElementById('titulo-formulario').textContent = 'Agregar tarea';
        document.getElementById('btn-guardar').textContent = 'Agregar tarea';
        document.getElementById('btn-cancelar').classList.add('oculto');
    }
    renderCounter(pendientes, total) {
        document.getElementById('contador-tareas').textContent =
            `Pendientes: ${pendientes} · Total: ${total}`;
    }
    mostrarMensaje(mensaje, tipo = 'exito') {
        this.notificaciones.innerHTML = '';
        const div = document.createElement('div');
        div.className = `mensaje ${tipo}`;
        div.textContent = mensaje;
        this.notificaciones.appendChild(div);
        window.setTimeout(() => {
            if (div.parentElement)
                div.remove();
        }, 3500);
    }
    mostrarTareas(tareas) {
        this.contenedorLista.innerHTML = '';
        document.getElementById('sin-tareas').classList.toggle('oculto', tareas.length > 0);
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
    fechaHoy() {
        const fecha = new Date();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const dia = String(fecha.getDate()).padStart(2, '0');
        return `${fecha.getFullYear()}-${mes}-${dia}`;
    }
}
