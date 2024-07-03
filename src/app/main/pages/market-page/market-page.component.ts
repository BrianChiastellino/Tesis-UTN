import { AfterContentInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { BehaviorSubject, filter, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CoinGeckoService } from '../../../models/coin-gecko/services/coin-gecko.service';
import { CoinGecko } from '../../../models/coin-gecko/interface/coin-gecko.models';
import { WalletService } from '../../../wallet/services/wallet.service';
import { User } from '../../../auth/models/user.model';
import { environment } from '../../../../environments/environment';
import { Wallet } from '../../../models/wallet/wallet.models';
import { TransactionsService } from '../../../admin/services/transactions.service';
import { Transaction } from '../../../admin/models/transaction.models';

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
    this.getCoinGeckoTest();
    this.getWallet();
    // this.getCoinGecko();

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

  public updateWalletByEmiter (wallet: Wallet) : void {
    this.updateWallet(wallet);
  }

  private getWallet(): void {
    if (!this.user) return;

    this.walletService.getWalletByIdUser(this.user.id)
      .pipe(
        filter(wallet => wallet?.length != 0),
      )
      .subscribe(wallet => this.wallet = wallet![0])
  }

  private updateWallet (wallet : Wallet ) : void {
    this.walletService.updateWallet( wallet )
    .pipe(
      filter( data => !!data),
      tap( wallet => this.wallet = wallet),
    )
    .subscribe();
  }

  private createTransaction () : void {

    const transaction = new Transaction({
      fecha: new Date().toLocaleString(),
    })

  }

  private getCoinGeckoTest(): void {

    this.coinGeckoService.coinGeckoTest()
      .pipe(
        tap(() => console.log('Coins cargadas con exito')),
      )
      .subscribe(coins => this.coinsGecko = coins);

  }

  private getCoinGecko(): void {

    this.coinGeckoService.coinsGecko()
      .pipe(
        tap(data => console.log({ data })),
      )
      .subscribe(coins => this.coinsGecko = coins);

  }



}
