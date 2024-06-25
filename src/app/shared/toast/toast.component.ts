import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, filter, tap } from 'rxjs';

@Component({
  selector: 'shared-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})

export class ToastComponent implements OnInit {

  @Input() public typeToast$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  public typeToast: string | null = null;
  public typeToastValue: string | null = null;
  public toggleToast: boolean = false;

  //todo: terminar toast, hacer eficiente, crear mensajes en ts y pasarlos al html

  // idea : crear un enum para ponerlo como key es decir, Toast.error, emitir un valor mediante el padre,

  private messages: { [key: string]: { type: string,  title: string, body: string } } = {
    success: {
      type: 'success',
      title: 'Éxito!',
      body: '¡Operación realizada con éxito!'
    },
    error: {
      type: 'error',
      title: 'Error!',
      body: '¡Ha ocurrido un error. Por favor, inténtelo de nuevo!'
    },
    info: {
      type: 'info',
      title: 'TItulo de la info',
      body: 'Body de la info'
    },
    warning: {
      type: 'warm',
      title: 'Advertencia',
      body: 'Algo no está del todo bien. Tenga precaución'
    }
  };

  constructor(private messageService: MessageService) { }

  public showMessage ( type: string) {
    this.messageService.add({
      severity: this.messages[type].type,
      summary:  this.messages[type].title,
      detail: this.messages[type].body
    })
  }

  public ngOnInit (): void {

    this.typeToast$
    .pipe(
      filter( data => !!data),
      tap( data => console.log({data})),
    )
    .subscribe( type => {
      this.showMessage( type! )
    });

  }

  private openToast ( type: string): void {
    this.typeToastValue = type;
    this.toggleToast = true;
  }

  public closeToast(time: number): void {

    setTimeout(() => {
      this.typeToastValue = null;
      this.typeToast = null;
      this.toggleToast = false;
    }, time);

  }

  public get messageTitle(): string {
    return this.messages[this.typeToastValue!].title;
  }

  public get messageBody(): string {
    return this.messages[this.typeToastValue!].body;
  }






}
