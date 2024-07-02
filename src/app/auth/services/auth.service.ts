import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, catchError, filter, map, of, switchMap, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({  providedIn: 'root' })

export class AuthService {

  public user?: User;
  private baseUrl: string = environment.urlBaseJsonServer;
  private token: string = environment.userToken

  constructor(private http: HttpClient) { }

  // CRUD

  public get getAllUsers(): Observable<User[]> {

    return this.http.get<User[]>(`${ this.baseUrl }/users`)

  }

  public addUser(user: User): Observable<User | null>{

    if( !user) return of(null);

    return this.http.post<User>(`${ this.baseUrl }/users`, user);

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

  // LOGUEO USUARIO

  public login (email: string, password: string): Observable<User[] | null> {

    if( !email || !password ) return of( null );

    return this.http.get<User[]>(`${ this.baseUrl }/users?email=${ email }&password=${ password }`)
    .pipe(
      tap( user => this.user = user[0]),
      tap( user => localStorage.setItem(`${this.token}`, JSON.stringify(user[0]))),
      tap( () => console.log(`Usuario ${this.user?.username} logueado con exito`)),
      catchError( () => of( null )),        /* Si no se pudo loguear mandamos un null  */
    );

  }

  // AUTENTICACION

  public checkAuthentication(): Observable<boolean> {

    if( !localStorage.getItem( `${this.token}` ) ) return of(false);

    return localStorage.getItem( `${ this.token }` ) ? of(true) : of(false)

  }

  public checkAuthenticationAdmin() : Observable<boolean> {

    const user: User = JSON.parse( localStorage.getItem( `${this.token}` )!)

    if ( !user ) return of(false);

    return user.admin == true ? of(true) : of(false);

  }

  // REGISTRO USUARIO

  public registerUser(user: User): Observable<boolean> {

    if (!user) return of(false);

    return this.getAllUsers.pipe(
      switchMap( users => {
        if ( users.length === 0 ) {
          user.admin = true;
        } else {
          user.admin = false
        }
        return this.validateUser(user);
      }),
        filter(isValid => isValid),
        switchMap(() => this.addUser(user).pipe(
            tap(user => localStorage.setItem(`${this.token}`, JSON.stringify(user))),
            map(() => true),
        ))
    );
}

  public validateUser(user : User ): Observable<boolean> {

    return this.getAllUsers.pipe(
      map( users => {
        const isValid = users.find( u => u.username === user.username || u.email === user.email || u.document === user.document);
        return !isValid;        /* No es una negacion - quiere decir que nunca va a ser undefinded */
      })
    )

  }


}
