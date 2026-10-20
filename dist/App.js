import { AppController } from './controladores/AppController.js';
import { StorageHelper } from './utilidades/StorageHelper.js';
import { TareaUI } from './vistas/TareaUI.js';
const ui = new TareaUI();
const storage = new StorageHelper('tareas-parcial2');
new AppController(ui, storage);
