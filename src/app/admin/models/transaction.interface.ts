
import { TransactionType } from "./enum/transaction.enum";

export interface ITransaction {

  id?:          string;
  userId:       string;
  coinId:       string;
  coinAmount:   number;
  type:         TransactionType;
  date:         string;

}
