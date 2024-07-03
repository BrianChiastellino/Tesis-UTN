import { TransactionType } from "./enum/transaction.enum";
import { ITransaction } from "./transaction.interface";

export class Transaction implements ITransaction {

  id?: string;
  idUser: string;
  idCoin: string;
  coinAmount: number;
  type: TransactionType | null;
  fecha: string;


  constructor (transaction: Transaction) {

    this.id = transaction == undefined ? '' :transaction.id;
    this.idUser = transaction == undefined ? '' : transaction.idUser;
    this.idCoin = transaction== undefined ? '' : transaction.idCoin;
    this.coinAmount = transaction == undefined ? 0 :transaction.coinAmount;
    this.type = transaction == undefined ? null : transaction.type;
    this.fecha = transaction == undefined ? '' : transaction.fecha;

  }

}
