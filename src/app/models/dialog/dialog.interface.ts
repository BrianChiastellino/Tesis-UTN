import { Coin } from "../coin-user/interface/coin-user.models";
import { Wallet } from "../wallet/wallet.models";
import { CoinGecko } from "../coin-gecko/interface/coin-gecko.models";
import { Operation } from "../enum/dialog.enum";

export interface Dialogdata {
  coinGecko: CoinGecko;
  wallet: Wallet;
}

export interface DialogConfirmData {
  funds: number;
  coin: Coin;
  operation: Operation;
}
