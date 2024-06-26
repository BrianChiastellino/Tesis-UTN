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

  private messages: { [key: string]: { type: string, title: string, body: string } } = {
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
      title: 'Informacion!',
      body: '¡Deposite fondos en su billetera para continuar!'
    },
    warning: {
      type: 'warm',
      title: 'Advertencia',
      body: 'Algo no está del todo bien. Tenga precaución'
    },
    'funds-success':{
      type: 'success',
      title: 'Exito!',
      body: '¡Fondos depositados exitosamente!'
    },
    'funds-negative': {
      type: 'info',
      title: 'Informacion!',
      body: '¡No posee los fondos suficientes para retirar!'
    },
  };

  constructor(private messageService: MessageService) { }

  public showMessage(type: string) {
    this.messageService.add({
      severity: this.messages[type].type,
      summary: this.messages[type].title,
      detail: this.messages[type].body,
    })
  }

  public ngOnInit(): void {

    this.typeToast$
      .pipe(
        filter(data => !!data),
        tap(data => console.log({ data })),
      )
      .subscribe(type => {
        this.showMessage(type!)
      });

  }

}
