import { ICoin } from "./coin-user.interface";

export class Coin implements ICoin {

  id            :string;
  coinAmount    :number;
  image         :string;
  symbol        :string;
  date          :string;

  constructor(coin?: any) {
    this.id = coin == undefined ? '' : coin.id;
    this.coinAmount = coin == undefined ? 0 : coin.coinAmount;
    this.image = coin == undefined ? '' : coin.image;
    this.symbol = coin == undefined ? '' : coin.symbol;
    this.date = coin == undefined ? '' : coin.date;
  }

}
