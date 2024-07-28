import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Wallet } from '../../../models/wallet/wallet.models';
import { MatTableDataSource } from '@angular/material/table';
import { Coin } from '../../../models/coin-user/interface/coin-user.models';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/models/user.model';

@Component({
  selector: 'app-show-wallet-dialog',
  templateUrl: './show-wallet-dialog.component.html',
  styleUrl: './show-wallet-dialog.component.css'
})
export class ShowWalletDialogComponent implements OnInit {


  public displayedColumns: string[] = ['id', 'coinAmount', 'date'];
  public dataSource: MatTableDataSource<Coin> = new MatTableDataSource<Coin>();
  public user: User | null = null;


  constructor(
    @Inject(MAT_DIALOG_DATA) public wallet: Wallet,
    private authService: AuthService,
) {}

  public ngOnInit(): void {
    this.dataSource.data = this.wallet.coins ?? [];
    this.getUser();
  }

  private getUser () : void {
    this.authService.getUserById( this.wallet.idUser )
    .subscribe( user => this.user = user);
  }




}
