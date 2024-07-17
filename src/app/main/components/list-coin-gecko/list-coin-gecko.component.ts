import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CoinGecko } from '../../../models/coin-gecko/interface/coin-gecko.models';
import { WalletService } from '../../../wallet/services/wallet.service';
import { Wallet } from '../../../models/wallet/wallet.models';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list-coin-gecko',
  templateUrl: './list-coin-gecko.component.html',
  styleUrl: './list-coin-gecko.component.css'
})
export class ListCoinGeckoComponent implements OnChanges {

  @Input()  public coinsGecko: CoinGecko[] = [];

  @Input() public wallet: Wallet | null = null;

  @Output() public onBuyCoin: EventEmitter<CoinGecko> = new EventEmitter();

  @Output() public onSellCoin: EventEmitter<CoinGecko> = new EventEmitter();

  @ViewChild (MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild (MatSort) sort: MatSort | null = null;

  public displayedColumns: string[] = ['index', 'id', 'name', 'symbol', 'image', 'current_price', 'last_updated', 'buy', 'sell'];
  public dataSource = new MatTableDataSource<CoinGecko>();

  constructor(
    private walletService: WalletService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = this.coinsGecko;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public searchCoin(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public buy ( coin: CoinGecko ): void {
    this.onBuyCoin.emit(coin);
  }

  public sell ( coin: CoinGecko ): void {
    this.onSellCoin.emit(coin);
  }

  public filterButtonSell(id: string): boolean {
    return this.wallet?.coins?.some(c => c.id === id) ?? false;
  }



}
