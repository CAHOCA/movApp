import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class GuardarLocalService {

  constructor(private storage: Storage) { 
    this.cargarData();
  }

 async cargarData() {
  return this.storage.get('nombre');
  }

  guardarData(texto: string) {
  this.storage.set('nombre', texto);
  console.log('datos almacendos correctamente');
  }
}
