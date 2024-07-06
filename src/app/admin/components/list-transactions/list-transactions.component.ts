import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Transaction } from '../../models/transaction.models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-transactions',
  templateUrl: './list-transactions.component.html',
  styleUrl: './list-transactions.component.css'
})
export class ListTransactionsComponent implements OnInit, OnChanges {

  @Input() public transactions: Transaction[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  public dataSource!: MatTableDataSource<Transaction>


  public displayedColumns: string[] = ['index', 'id', 'user', 'coin', 'cantidad', 'tipo', 'fecha'];

  public ngOnInit(): void {
    this.dataSource = new MatTableDataSource( this.transactions) ;
    this.dataSource.paginator = this.paginator;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if(this.dataSource) { this.dataSource.data = this.transactions }
  }






}
