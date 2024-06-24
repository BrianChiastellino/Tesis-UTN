import { ICoinGecko } from './coin-gecko.interface';


export class CoinGecko implements ICoinGecko {

  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  last_updated: Date;

  constructor(coinApi?: any) {

    this.id = coinApi == undefined ? '' : coinApi.id;
    this.symbol = coinApi == undefined ? '' : coinApi.symbol;
    this.name = coinApi == undefined ? '' : coinApi.name;
    this.image = coinApi == undefined ? '' : coinApi.image;
    this.current_price = coinApi == undefined ? 0 : coinApi.current_price;
    this.last_updated = coinApi == undefined ? '' : coinApi.last_updated;

  }





}
