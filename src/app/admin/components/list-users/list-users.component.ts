import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { User } from '../../../auth/models/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WalletService } from '../../../wallet/services/wallet.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../../../shared/edit-user-dialog/edit-user-dialog.component';
import { filter, switchMap, tap } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})

export class ListUsersComponent implements OnInit, OnChanges {

  public users: User[] = [];
  @ViewChild (MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild (MatSort) sort: MatSort | null = null;

  public displayedColumns: string[] = ['index', 'id', 'name', 'email', 'username', 'password', 'document', 'admin', 'edit' ];
  public dataSource!: MatTableDataSource<User>;

  constructor (
    private walletService: WalletService,
    private authService: AuthService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {

    this.authService.getAllUsers.subscribe( users => {
      // this.users = users;
      this.dataSource = new MatTableDataSource(users);
    });

  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public showWallet ( id: string ) : void {

    if ( !id ) return;

    this.walletService.getWalletByIdUser( id )
    .subscribe( wallet => console.log({wallet}));


  }

  public editUser (user: User) : void {

    const dialogRef = this.dialog.open( EditUserDialogComponent, { data: user } );

    dialogRef.afterClosed()
    .pipe(
      filter( data => !!data),
      switchMap ( users => this.authService.getAllUsers),
    )
    .subscribe( users => {
      this.dataSource.data = users;
    })

  }

}
