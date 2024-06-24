import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CoinGecko } from '../../../models/coin-gecko/interface/coin-gecko.models';

@Component({
  selector: 'app-list-coin-gecko',
  templateUrl: './list-coin-gecko.component.html',
  styleUrl: './list-coin-gecko.component.css'
})
export class ListCoinGeckoComponent implements OnChanges {

  @Input()
  public coinsGecko: CoinGecko[] = [];

  @Output()
  public onBuyCoin: EventEmitter<CoinGecko> = new EventEmitter();

  @Output() onSellCoin: EventEmitter<CoinGecko> = new EventEmitter();

  public coinsTableData = new MatTableDataSource<CoinGecko>();
  public displayedColumns: string[] = ['index', 'id', 'name', 'symbol', 'image', 'current_price', 'last_updated', 'buy', 'sell'];

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
    this.onBuyCoin.emit(coin);
  }

  public sell ( coin: CoinGecko ): void {
    this.onSellCoin.emit(coin);
  }


}
