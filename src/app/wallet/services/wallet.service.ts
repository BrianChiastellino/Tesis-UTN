import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Wallet } from '../../models/wallet/wallet.models';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({providedIn: 'root'})

export class WalletService {

  private baseUrl: string = environment.urlBaseJsonServer;

  constructor(private http: HttpClient) { }

  public get wallets () : Observable<Wallet[]>{
    return this.http.get<Wallet[]>(`${this.baseUrl}/wallets`);
  }

  public addWallet (wallet: Wallet) : Observable<Wallet | null>{

     if( !wallet ) return of(null)

    return this.http.post<Wallet>(`${ this.baseUrl }/wallets`, wallet);
  }

  public updateWallet(wallet: Wallet) : Observable<Wallet | null>{

    if( !wallet.id ) return of(null)

    return this.http.patch<Wallet>(`${this.baseUrl}/wallets/${wallet.id}`, wallet);
  }

  public getWalletByIdUser(idUser: string): Observable<Wallet | null> {

    if( !idUser) return of(null);

    return this.http.get<Wallet[]>(`${this.baseUrl}/wallets/?idUser=${idUser}`)
    .pipe(
      map( wallet => {return wallet[0] } )
    )

  }



}
