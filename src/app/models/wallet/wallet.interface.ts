import { ICoin } from "../coin-user/interface/coin-user.interface";

export interface IWallet {

  id?        :string;
  idUser    :string;
  funds     :number;
  coins?     :ICoin[];

}
