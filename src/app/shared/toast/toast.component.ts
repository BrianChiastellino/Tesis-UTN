import { Component } from '@angular/core';

@Component({
  selector: 'shared-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})

export class ToastComponent {

  //todo: terminar toast, hacer eficiente, crear mensajes en ts y pasarlos al html

  // idea : crear un enum para ponerlo como key es decir, Toast.error, emitir un valor mediante el padre, 

  private messages: { [key: string]: { title: string, body: string } } = {
    success: {
      title: 'Éxito!',
      body: '¡Operación realizada con éxito!'
    },
    error: {
      title: 'Error',
      body: 'Ha ocurrido un error. Por favor, inténtelo de nuevo.'
    },
    warning: {
      title: 'Advertencia',
      body: 'Algo no está del todo bien. Tenga precaución.'
    }
  };

  constructor() {
    console.log( this.messages['error'].body )
  }


}
