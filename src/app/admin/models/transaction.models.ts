import { User } from "../../auth/models/user.model";
import { Coin } from "../../models/coin-user/interface/coin-user.models";
import { TransactionType } from "./enum/transaction.enum";
import { ITransaction } from "./transaction.interface";

export class Transaction implements ITransaction {

  id?: string;
  user: User;
  coin: Coin;
  coinAmount: number;
  type: TransactionType;
  date: string;


  constructor (transaction: Transaction) {

    // this.id = transaction == undefine d ? '' :transaction.id;
    this.user = transaction.user;
    this.coin = transaction.coin;
    this.coinAmount = transaction.coinAmount;
    this.type = transaction.type;
    this.date =  transaction.date;

  }

}
