import { User } from "../../auth/models/user.model";
import { Coin } from "../../models/coin-user/interface/coin-user.models";
import { TransactionType } from "./enum/transaction.enum";

export interface ITransaction {

  id?:          string;
  user:         User;
  coin:         Coin;
  coinAmount:   number;
  type:         TransactionType;
  date:         string;

}
