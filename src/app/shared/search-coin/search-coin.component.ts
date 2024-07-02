import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-coin',
  templateUrl: './search-coin.component.html',
  styleUrl: './search-coin.component.css'
})
export class SearchCoinComponent {

  @Output() coinSearch: EventEmitter<string> = new EventEmitter<string>();

  public searchCoin(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.coinSearch.emit( filterValue.trim().toLowerCase() );
  }

}
