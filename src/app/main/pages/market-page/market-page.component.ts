import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { filter, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogBuyComponent } from '../../components/dialog/dialog-buy/dialog-buy.component';
import { DialogSellComponent } from '../../components/dialog/dialog-sell/dialog-sell.component';
import { CoinGeckoService } from '../../../models/coin-gecko/services/coin-gecko.service';
import { CoinGecko } from '../../../models/coin-gecko/interface/coin-gecko.models';
import { WalletService } from '../../../wallet/services/wallet.service';
import { User } from '../../../auth/models/user.model';
import { environment } from '../../../../environments/environment';
import { Wallet } from '../../../models/wallet/wallet.models';
import { Coin } from '../../../models/coin-user/interface/coin-user.models';

@Component({
  selector: 'app-market-page',
  templateUrl: './market-page.component.html',
  styleUrl: './market-page.component.css'
})
export class MarketPageComponent implements OnInit, OnChanges {

  public coinsGecko: CoinGecko[] = [];
  private token: string = environment.userToken;
  private user: User | null = null;

  constructor (
    private coinGeckoService: CoinGeckoService,
    private dialog: MatDialog,
    private walletService: WalletService,
  ) {}


  public ngOnChanges(changes: SimpleChanges): void {
    console.log({changes}, 'dialog abre aqui')
  }

  public ngOnInit(): void {
    this.getUserFromLocalStorage();
    this.getCoinGeckoTest();
    // this.getCoinGecko();
  }

  public onBuyCoinGecko (coin: CoinGecko): void {

    if( !coin ) return;

    const dialogRef = this.dialog.open(DialogBuyComponent, { data: coin });

    dialogRef.afterClosed()
    .pipe(
      tap( data =>  console.log({data})),
    )
    .subscribe( coin => this.createWallet( coin ));

  }

  public onSellCoinGecko (coin: CoinGecko): void {

    if ( !coin ) return;

    const dialogRef = this.dialog.open(DialogSellComponent, { data: coin });

    dialogRef.afterClosed()
    .pipe(
      tap( data =>  console.log({data})),
    )
    .subscribe();
  }

  private createWallet (coin: Coin): void{

    const wallet = new Wallet({
      idUser: this.user!.id,
      funds: 100,
      coins: [coin]
    });

    this.walletService.addWallet(wallet)
    .pipe(
      tap( wallet => console.log('Create wallet: ',{wallet}))
    )
    .subscribe();

  }

  private getUserFromLocalStorage (): void{
    this.user = new User(JSON.parse(localStorage.getItem(this.token)!));
  }

  private getCoinGeckoTest (): void {

    this.coinGeckoService.coinGeckoTest()
    .pipe(
      tap( coins  => console.log( { coins } )),
    )
    .subscribe( coins => this.coinsGecko = coins );

  }

  private getCoinGecko (): void {

    this.coinGeckoService.coinsGecko()
    .pipe(
      tap( data  => console.log( { data } )),
    )
    .subscribe( coins => this.coinsGecko = coins );

  }



}
