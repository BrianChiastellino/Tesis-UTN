import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CoinGeckoService } from '../../../coin-gecko/services/coin-gecko.service';
import { CoinGecko } from '../../../coin-gecko/interface/coin-gecko.models';
import { tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogBuyComponent } from '../../components/dialog/dialog-buy/dialog-buy.component';
import { DialogSellComponent } from '../../components/dialog/dialog-sell/dialog-sell.component';

@Component({
  selector: 'app-market-page',
  templateUrl: './market-page.component.html',
  styleUrl: './market-page.component.css'
})
export class MarketPageComponent implements OnInit, OnChanges {

  public coinsGecko: CoinGecko[] = [];
  public coinBuy: CoinGecko | null = null;

  constructor (private coinGeckoService: CoinGeckoService, private dialog: MatDialog) {}


  public ngOnChanges(changes: SimpleChanges): void {
    console.log({changes}, 'dialog abre aqui')
  }

  public ngOnInit(): void {
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
    .subscribe();

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
