import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WalletService } from '../../../wallet/services/wallet.service';
import { Wallet } from '../../../models/wallet/wallet.models';
import { BehaviorSubject, filter, tap } from 'rxjs';
import { User } from '../../../auth/models/user.model';
import { CoinGecko } from '../../../models/coin-gecko/interface/coin-gecko.models';
import { DialogSellComponent } from '../dialog/dialog-sell/dialog-sell.component';
import { Dialogdata } from '../../../models/dialog/dialog.interface';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-sell-coin-gecko',
  templateUrl: './sell-coin-gecko.component.html',
  styleUrl: './sell-coin-gecko.component.css'
})
export class SellCoinGeckoComponent implements OnInit{

  @Output() public onSellCoin: EventEmitter<Wallet> = new EventEmitter<Wallet>;
  @Input() public wallet: Wallet | null = null;
  @Input() public coin$: BehaviorSubject<CoinGecko | null> = new BehaviorSubject<CoinGecko | null>(null);


  constructor(
    private dialog: MatDialog,
    private toastService: ToastService,
  ) {}

  public ngOnInit(): void {

    this.coin$.subscribe(coin => {

    if(this.wallet && coin != null) {
      this.openDialog( this.wallet, coin);
    }

  });

}

private openDialog ( wallet: Wallet, coinGecko: CoinGecko ): void {

  const dialogData: Dialogdata = {
    wallet: wallet,
    coinGecko: coinGecko
  }

  const dialogRef = this.dialog.open( DialogSellComponent, { data: dialogData } );

  dialogRef.afterClosed()
  .pipe(
    filter( data => !!data),
    tap( data => console.log({ data })),
  )
  .subscribe( wallet => {
    this.toastService.showSuccess('Éxito', 'Operacion realizada con éxito!');
    this.onSellCoin.emit(wallet);
  });

}



}
