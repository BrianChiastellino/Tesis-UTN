import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})

export class ToastService {

  constructor(private messageService: MessageService) { console.log("hola")}

  showSuccess(summary: string, detail: string): void {
    this.messageService.add({severity:'success', summary, detail});
  }

  showInfo(summary: string, detail: string): void {
    this.messageService.add({severity:'info', summary, detail});
  }

  showWarn(summary: string, detail: string): void {
    this.messageService.add({severity:'warn', summary, detail});
  }

  showError(summary: string, detail: string): void {
    this.messageService.add({severity:'error', summary, detail});
  }
}
