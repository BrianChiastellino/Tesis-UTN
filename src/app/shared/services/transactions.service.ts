import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { Transaction } from '../../admin/models/transaction.models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TransactionsService {

  private baseUrl: string = environment.urlBaseJsonServer;

  constructor( private http: HttpClient ) { }

  public getTransactions () : Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/transactions`);
  }

  public addTransaction (transaction: Transaction) : Observable<Transaction | null> {
    return this.http.post<Transaction>(`${ this.baseUrl }/transactions`, transaction);
  }

  public getTransactionsByUserId(userId: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/transactions?userId=${userId}`).pipe(
      map(transactions => transactions.filter(transaction => transaction.userId !== null))
    );
  }

}
