import { AfterContentInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { BehaviorSubject, filter, tap } from 'rxjs';
import { CoinGeckoService } from '../../../models/coin-gecko/services/coin-gecko.service';
import { CoinGecko } from '../../../models/coin-gecko/interface/coin-gecko.models';
import { WalletService } from '../../../wallet/services/wallet.service';
import { User } from '../../../auth/models/user.model';
import { environment } from '../../../../environments/environment';
import { Wallet } from '../../../models/wallet/wallet.models';
import { TransactionsService } from '../../../shared/services/transactions.service';

@Component({
  selector: 'app-market-page',
  templateUrl: './market-page.component.html',
  styleUrl: './market-page.component.css'
})
export class MarketPageComponent implements OnInit {


  private token: string = environment.userToken;

  public coinsGecko: CoinGecko[] = [];
  public user: User | null = null;
  public wallet: Wallet | null = null;
  public coin: CoinGecko | null = null;
  public coinBuy$: BehaviorSubject<CoinGecko | null> = new BehaviorSubject<CoinGecko | null>(null);
  public coinSell$: BehaviorSubject<CoinGecko | null> = new BehaviorSubject<CoinGecko | null>(null);


  constructor(
    private coinGeckoService: CoinGeckoService,
    private walletService: WalletService,
    private transactionService: TransactionsService
  ) { }

  public ngOnInit(): void {
    this.getUserFromLocalStorage();
    this.getWallet();
  }

  public sendCoinBuy(coin: CoinGecko): void {
    this.coinBuy$.next(coin);
  }

  public sendCoinSell(coin: CoinGecko): void {
    this.coinSell$.next(coin);
  }
  private getUserFromLocalStorage(): void {
    this.user = new User(JSON.parse(localStorage.getItem(this.token)!));
  }

  private getWallet(): void {

    if (!this.user) return;

    this.walletService.getWalletByIdUser(this.user.id)
      .pipe(
        filter(wallet => !!wallet),
      )
      .subscribe(wallet => this.wallet = wallet)

  }

  public updateWallet (wallet : Wallet ) : void {
    this.walletService.updateWallet( wallet )
    .pipe(
      filter( data => !!data),
      tap( wallet => this.wallet = wallet),
    )
    .subscribe();
  }

}
