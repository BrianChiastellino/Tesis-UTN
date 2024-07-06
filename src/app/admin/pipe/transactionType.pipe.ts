import { Pipe, type PipeTransform } from '@angular/core';
import { TransactionType } from '../models/enum/transaction.enum';

@Pipe({
  name: 'transactionType',
})
export class TransactionTypePipe implements PipeTransform {

  transform(value: string): string {
    return value == TransactionType.BUY ? 'COMPRA' : 'VENTA';
  }

}
