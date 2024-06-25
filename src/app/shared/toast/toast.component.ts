import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'shared-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})

export class ToastComponent implements OnChanges {

  @Input() public typeToast: string | null = null;

  public typeToastValue: string | null = null;
  public openToast: boolean = false;

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

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {

    //todo: fix changes

    console.log( {changes} )

    if ( this.typeToast ) {
      this.openToast = true;
      this.typeToastValue = this.typeToast;
    }

    this.setToast(2000);

  }

  public get messageTitle (): string {
    return this.messages[ this.typeToastValue! ].title;
  }

  public get messageBody () : string {
    return this.messages[ this.typeToastValue! ].body;
  }

  public setToast ( time : number): void {

    setTimeout(() => {
      this.openToast = false;
      this.typeToast = null;
    }, time);

  }




}
