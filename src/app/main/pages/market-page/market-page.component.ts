import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import {  BehaviorSubject, filter, tap } from 'rxjs';
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
  public typeToast$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  private token: string = environment.userToken;
  private user: User | null = null;
  private wallet: Wallet | null = null;

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
    this.getWallet();
    // this.getCoinGecko();
  }

  private getUserFromLocalStorage (): void{
    this.user = new User(JSON.parse(localStorage.getItem(this.token)!));
  }

  private getWallet () : void {
    if( !this.user ) return;

    this.walletService.getWalletByIdUser( this.user.id )
    .pipe(
      tap( wallet => console.log({ wallet }) ),
      filter ( wallet => !!wallet![0].id ),
    )
    .subscribe( wallet => this.wallet = wallet![0])
  }

  public onBuyCoinGecko (coin: CoinGecko): void {

    if( !coin || !this.wallet ) {
      this.typeToast$.next('info');
      return;
    }

    const dialogRef = this.dialog.open(DialogBuyComponent, { data: coin });

    dialogRef.afterClosed()
    .pipe(
      filter( data => !!data ),
      tap( data =>  console.log({data})),
      tap( () => this.typeToast$.next('success')),
    )
    .subscribe( data => {
      const [coin, amountTobuy ] = data as [Coin, number];
      // this.updateWallet(coin, amountTobuy);
    });

  }


  public onSellCoinGecko (coin: CoinGecko): void {

    if ( !coin ) return;

    const dialogRef = this.dialog.open(DialogSellComponent, { data: coin });

    dialogRef.afterClosed()
    .pipe(
      tap( data =>  console.log(data[0], data[1])),
    )
    .subscribe();
  }

  private updateWallet (coin: Coin, amountToBuy: number): void{



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
