import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Wallet } from '../../../models/wallet/wallet.models';
import { MatTableDataSource } from '@angular/material/table';
import { Coin } from '../../../models/coin-user/interface/coin-user.models';

@Component({
  selector: 'app-show-wallet-dialog',
  templateUrl: './show-wallet-dialog.component.html',
  styleUrl: './show-wallet-dialog.component.css'
})
export class ShowWalletDialogComponent implements OnInit {


  public displayedColumns: string[] = ['id', 'coinAmount', 'date'];
  public dataSource: MatTableDataSource<Coin> = new MatTableDataSource<Coin>();


  constructor(@Inject(MAT_DIALOG_DATA) public wallet: Wallet) {}

  public ngOnInit(): void {
    this.dataSource.data = this.wallet.coins ?? [];
  }




}
