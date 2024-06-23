import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CoinGecko } from '../../../coin-gecko/interface/coin-gecko.models';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-coin-gecko',
  templateUrl: './list-coin-gecko.component.html',
  styleUrl: './list-coin-gecko.component.css'
})
export class ListCoinGeckoComponent implements OnChanges {

  @Input()
  public coinsGecko: CoinGecko[] = [];

  public displayedColumns: string[] = ['index', 'id', 'name', 'symbol', 'image', 'current_price', 'last_updated', 'buy', 'sell'];
  public coinsTableData = new MatTableDataSource<CoinGecko>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log({ changes })
    this.coinsTableData.data = this.coinsGecko;
  }

  public searchCoin(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.coinsTableData.filter = filterValue.trim().toLowerCase();
  }

  public buy ( coin: CoinGecko ): void {
    console.log('Buy', coin);
  }

  public sell ( coin: CoinGecko ): void {
    console.log('Sell', coin);
  }


}
