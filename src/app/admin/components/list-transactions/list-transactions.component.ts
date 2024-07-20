import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Transaction } from '../../models/transaction.models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ShowUserDialogComponent } from '../show-user-dialog/show-user-dialog.component';
import { AuthService } from '../../../auth/services/auth.service';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-list-transactions',
  templateUrl: './list-transactions.component.html',
  styleUrls: ['./list-transactions.component.css']
})
export class ListTransactionsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns: string[] = ['index', 'id', 'user', 'coin', 'cantidad', 'tipo', 'fecha'];
  public dataSource = new MatTableDataSource<Transaction>();

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private transactionService: TransactionsService,
  ) {}

  public ngOnInit(): void {
    this.getTransactions();
  }

  public ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  private getTransactions(): void {
    this.transactionService.getTransactions()
      .subscribe(transactions => {
        this.dataSource.data = transactions;
      });
  }

  public showUser(id: string): void {
    if (!id) return;

    this.authService.getUserById(id)
      .subscribe(user => {
        this.dialog.open(ShowUserDialogComponent, {
          data: user,
          width: '50vh'
        });
      });
  }
}
