export class StorageHelper {
    constructor(clave) {
        this.clave = clave;
    }
    guardarDatos(datos) {
        localStorage.setItem(this.clave, JSON.stringify(datos));
    }
    obtenerDatos() {
        const datos = localStorage.getItem(this.clave);
        return datos ? JSON.parse(datos) : [];
    }
}
