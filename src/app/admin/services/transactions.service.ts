import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.models';
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
  
}
