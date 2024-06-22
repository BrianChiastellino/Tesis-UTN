import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../core/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public user?: User;
  private baseUrl: string = environment.urlBaseJsonServer;


  constructor(private http: HttpClient) { }

  // CRUD

  public get allUsers(): Observable<User[]> {

    return this.http.get<User[]>(`${ this.baseUrl }/users`)

  }

  public addUser(user: User): Observable<User[] | null>{

    if( !user) return of(null);

    return this.http.post<User[]>(`${ this.baseUrl }/users`, user);

  }

  public updateUser(user: User): Observable<User | null> {

    if( !user) return of(null);
    return this.http.patch<User>(`${ this.baseUrl }/users/${ user.id }`, user);

  }

  public deleteUserById(id: string): Observable<boolean> {

    if( !id ) return of(false);

    return this.http.delete(`${ this.baseUrl }/users/${ id }`)
    .pipe(
      map( resp => true),                   /* Si todo salio bien, mapeamos un true */
      catchError( error => of(false) ),     /* Si algo salio mal, agarramos el error y con " of " lo transformamos a un false */
    );

  }

  // LOGIN

  public login (email: string, password: string): Observable<User[] | null> {

    if( !email || !password ) return of( null );

    return this.http.get<User[]>(`${ this.baseUrl }/users?email=${ email }&password=${ password }`)
    .pipe(
      tap( user => user[0].isLoged = true ),
      tap( user => this.user = user[0]),
      tap( user => localStorage.setItem('token', JSON.stringify(user[0]))),
      catchError( () => of( null )),          /* Si no se pudo loguard mandamos un null  */
    );

  }

  // REGISTER

  public registerUser (user: User): Observable<boolean> {

    if( !user ) return of(false);

    this.allUsers
    .pipe(
      tap( data => console.log(data))
    )
    .subscribe( data => of( ))

  }

}
