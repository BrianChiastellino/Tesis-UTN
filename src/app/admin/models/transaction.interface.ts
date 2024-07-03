import { TransactionType } from "./enum/transaction.enum";

export interface ITransaction {

  id?:           string;
  idUser:       string;
  idCoin:       string;
  coinAmount:   number;
  type:  TransactionType | null;
  fecha:        string;

}
