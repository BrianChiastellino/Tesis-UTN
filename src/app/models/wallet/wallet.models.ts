import { Coin } from "../coin-user/interface/coin-user.models";
import { IWallet } from "./wallet.interface";

export class Wallet implements IWallet {

  id?       :string;
  idUser   :string;
  funds    :number;
  coins?    :Coin[];

  constructor(wallet: Wallet) {

    this.id = wallet == undefined ? '' : wallet.id;
    this.idUser = wallet == undefined ? '' : wallet.idUser;
    this.funds = wallet == undefined ? 0 : wallet.funds;
    this.coins = wallet == undefined ? [] : wallet.coins;

  }

}
