export class StorageHelper<T> {
    private clave: string;

    constructor(clave: string) {
        this.clave = clave;
    }

    guardarDatos(datos: T[]): void {
        localStorage.setItem(this.clave, JSON.stringify(datos));
    }

    obtenerDatos(): T[] {
        const datos = localStorage.getItem(this.clave);
        return datos ? JSON.parse(datos) as T[] : [];
    }
}