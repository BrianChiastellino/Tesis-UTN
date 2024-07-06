import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import { Transaction } from '../../models/transaction.models';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrl: './transactions-page.component.css'
})
export class TransactionsPageComponent implements OnInit {

  public transactions: Transaction[] = [];

  constructor (
    private transactionService: TransactionsService,
  ) {}

  public ngOnInit(): void {
    this.getTransactions();
  }

  private getTransactions () : void {
    this.transactionService.getTransactions()
    .subscribe(transactions => this.transactions = transactions);
  }







}
