import { TransactionType } from "./enum/transaction.enum";
import { ITransaction } from "./transaction.interface";

export class Transaction implements ITransaction {

  id?: string;
  userId: string;
  coinId: string;
  coinAmount: number;
  type: TransactionType;
  date: string;


  constructor (transaction: Transaction) {

    // this.id = transaction == undefine d ? '' :transaction.id;
    this.userId = transaction.userId;
    this.coinId = transaction.coinId;
    this.coinAmount = transaction.coinAmount;
    this.type = transaction.type;
    this.date =  transaction.date;

  }

}
