import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CoinGecko } from '../../../models/coin-gecko/interface/coin-gecko.models';
import { WalletService } from '../../../wallet/services/wallet.service';
import { Wallet } from '../../../models/wallet/wallet.models';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CoinGeckoService } from '../../../models/coin-gecko/services/coin-gecko.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-list-coin-gecko',
  templateUrl: './list-coin-gecko.component.html',
  styleUrl: './list-coin-gecko.component.css'
})
export class ListCoinGeckoComponent implements OnInit, AfterViewInit {

  @Input() public wallet: Wallet | null = null;

  @Output() public onBuyCoin: EventEmitter<CoinGecko> = new EventEmitter();

  @Output() public onSellCoin: EventEmitter<CoinGecko> = new EventEmitter();

  @ViewChild (MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild (MatSort) sort: MatSort | null = null;

  public displayedColumns: string[] = ['index', 'id', 'name', 'symbol', 'image', 'current_price', 'last_updated', 'buy', 'sell'];
  public dataSource: MatTableDataSource<CoinGecko> = new MatTableDataSource<CoinGecko>();

  constructor(
    private walletService: WalletService,
    private coinGeckoService: CoinGeckoService,
  ) { }

  public ngOnInit(): void {
    this.getCoinGeckoTest();
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  private getCoinGeckoTest(): void {

    this.coinGeckoService.coinGeckoTest()
      .pipe(
        tap(() => console.log('Coins cargadas con exito')),
      )
      .subscribe(coins => this.dataSource.data = coins);

  }

  private getCoinGecko(): void {

    this.coinGeckoService.coinsGecko()
      .pipe(
        tap(data => console.log({ data })),
      )
      .subscribe(coins => this.dataSource.data = coins);

  }



}
