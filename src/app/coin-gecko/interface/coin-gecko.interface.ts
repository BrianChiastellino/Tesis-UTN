export interface ICoinGecko {
  id:                               string;
  symbol:                           string;
  name:                             string;
  image:                            string;
  current_price:                    number;
  price_change_percentage_24h:      number;
  last_updated:                     Date;
}

export interface Roi {
  times:      number;
  currency:   Currency;
  percentage: number;
}

export enum Currency {
  Btc = "btc",
  Eth = "eth",
  Usd = "usd",
}
