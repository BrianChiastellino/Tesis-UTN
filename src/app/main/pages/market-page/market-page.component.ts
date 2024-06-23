import { Component, OnInit } from '@angular/core';
import { CoinGeckoService } from '../../../coin-gecko/services/coin-gecko.service';
import { CoinGecko } from '../../../coin-gecko/interface/coin-gecko.models';
import { tap } from 'rxjs';

@Component({
  selector: 'app-market-page',
  templateUrl: './market-page.component.html',
  styleUrl: './market-page.component.css'
})
export class MarketPageComponent implements OnInit {

  public coinsGecko: CoinGecko[] = [];

  constructor (private coinGeckoService: CoinGeckoService) {}

  ngOnInit(): void {
    this.getCoinGeckoTest();
    // this.getCoinGecko();
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
