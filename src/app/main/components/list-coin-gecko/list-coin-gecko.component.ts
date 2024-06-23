import { Component, Input } from '@angular/core';
import { CoinGecko } from '../../../coin-gecko/interface/coin-gecko.models';

@Component({
  selector: 'app-list-coin-gecko',
  templateUrl: './list-coin-gecko.component.html',
  styleUrl: './list-coin-gecko.component.css'
})
export class ListCoinGeckoComponent {

  @Input()
  public coinsGecko: CoinGecko[] = [];

  public displayedColumns: string[] = ['index', 'id', 'name', 'symbol','image','current_price','last_updated'];


}
