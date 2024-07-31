import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { User } from '../../../auth/models/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WalletService } from '../../../wallet/services/wallet.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../../../shared/edit-user-dialog/edit-user-dialog.component';
import { filter, Observable, switchMap, tap } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { ConfirmOperationDialogComponent } from '../../../shared/dialog/confirm-operation-dialog/confirm-operation-dialog.component';
import { ToastService } from '../../../shared/services/toast.service';
import { Wallet } from '../../../models/wallet/wallet.models';
import { ShowWalletDialogComponent } from '../show-wallet-dialog/show-wallet-dialog.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})

export class ListUsersComponent implements OnInit, AfterViewInit {


  @ViewChild (MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild (MatSort) sort: MatSort | null = null;

  public displayedColumns: string[] = ['index', 'id', 'name', 'email', 'username', 'password', 'document', 'admin', 'edit', 'delete', 'wallet' ];
  public dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  public passwordVisibility: Map<string, boolean> = new Map();

  constructor (
    private walletService: WalletService,
    private authService: AuthService,
    private dialog: MatDialog,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.sort!.active = 'username';
    this.sort!.direction = 'desc';
  }

  togglePasswordVisibility(userId: string): void {
    const isVisible = this.passwordVisibility.get(userId) || false;
    this.passwordVisibility.set(userId, !isVisible);
  }

  public showWallet ( user: User ) : void {

    if ( user.admin ) return this.toastService.showError('Error', 'Los administradores no poseen billetera');

    this.walletService.getWalletByIdUser( user.id )
    .pipe(
      tap( data => { if (!data) return this.toastService.showInfo('Info', 'El usuario no contiene billetera') }),
    )
    .subscribe( wallet => {

      if( wallet ) this.openDialogWallet(wallet).subscribe();

    });

  }

  private openDialogWallet ( wallet: Wallet) : Observable<boolean> {


    const dialogRef = this.dialog.open( ShowWalletDialogComponent, { data: wallet });

    return dialogRef.afterClosed();

  }

  private getUsers () : void {

    this.authService.getAllUsers.subscribe( users => {
      users.forEach( user => this.passwordVisibility.set(user.id, false));
      this.dataSource.data = users;

    });

  }

  public editUser(user: User): void {
    this.openUserDialog(user.id);
  }

  public registerUser(): void {
    this.openUserDialog(null);
  }

  private openUserDialog(userId: string | null): void {
    const dialogRef = this.dialog.open( EditUserDialogComponent, { data: userId });

    dialogRef.afterClosed()
      .pipe(
        filter(data => !!data),
        switchMap( users => this.authService.getAllUsers)
      )
      .subscribe(users => {
        this.dataSource.data = users;
      });
  }

  public deleteUser (user : User) : void {

    if( user.admin ) return this.toastService.showError('Error','No es posible eliminar administradores');

    const dialogRef = this.dialog.open( ConfirmOperationDialogComponent );

    dialogRef.afterClosed()
    .pipe(
      filter(confirm => !!confirm),
      switchMap(() => this.walletService.deleteWalletByIdUser(user.id)),
      switchMap(() => this.authService.deleteUserById(user.id)),
      tap( () =>  this.toastService.showSuccess('Éxito', 'Operación realizada con éxito!')),
      switchMap(() => this.authService.getAllUsers)
    )
    .subscribe(users => this.dataSource.data = users);

  }





}
