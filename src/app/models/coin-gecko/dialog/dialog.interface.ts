import { Wallet } from "../../wallet/wallet.models";
import { CoinGecko } from "../interface/coin-gecko.models";

export interface Dialogdata {
  coinGecko: CoinGecko;
  wallet: Wallet;
}
