import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Transaction } from '../../models/transaction.models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { User } from '../../../auth/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ShowUserDialogComponent } from '../show-user-dialog/show-user-dialog.component';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-list-transactions',
  templateUrl: './list-transactions.component.html',
  styleUrl: './list-transactions.component.css'
})
export class ListTransactionsComponent implements OnChanges {


  @Input() public transactions: Transaction[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns: string[] = ['index', 'id', 'user', 'coin', 'cantidad', 'tipo', 'fecha'];
  public dataSource!: MatTableDataSource<Transaction>;

  constructor (
    private dialog: MatDialog,
    private authSerivce: AuthService
  ) {}


  public ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.transactions);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public showUser ( id: string) : void {
    
    if (!id) return;

    this.authSerivce.getUserById( id )
    .subscribe( user =>  {

      this.dialog.open( ShowUserDialogComponent, {
        data: user,
        width: '50vh'

      });

    });

  }

}
