import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Wallet } from '../../../models/wallet/wallet.models';
import { Coin } from '../../../models/coin-user/interface/coin-user.models';

@Component({
  selector: 'app-list-coin-user',
  templateUrl: './list-coin-user.component.html',
  styleUrl: './list-coin-user.component.css'
})

//todo:

export class ListCoinUserComponent   {

  @Input() coins: Coin[] = [];
  






}
