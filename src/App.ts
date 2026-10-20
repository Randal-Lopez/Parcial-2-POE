import { AppController } from './controladores/AppController.js';
import { ITarea } from './modelos/TareaModel.js';
import { StorageHelper } from './utilidades/StorageHelper.js';
import { TareaUI } from './vistas/TareaUI.js';

const ui = new TareaUI();
const storage = new StorageHelper<ITarea>('tareas-parcial2');

new AppController(ui, storage);