import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, catchError, filter, map, of, switchMap, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({  providedIn: 'root' })

export class AuthService {

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
    if (!user) return of(null);

    return this.validateUser(user, user.id).pipe(
      switchMap(isValid => {
        if (!isValid) {
          return of(null); // Retorna null si el usuario ya existe con el mismo email, username o documento
        }

        return this.http.patch<User>(`${this.baseUrl}/users/${user.id}`, user);
      })
    );
  }

  public deleteUserById(id: string): Observable<boolean> {

    if ( !id ) return of ( false );

    return this.getUserById(id)
      .pipe(
        switchMap( user => {
          if ( user?.admin ) {
            return of ( false )
          }

          return this.http.delete(`${this.baseUrl}/users/${id}`)
            .pipe(
              map( resp => true )
            )
        })
      )
  }

  public getUserById ( id: string ) : Observable<User | null> {

    if ( !id ) return of(null);

    return this.http.get<User[]>( `${ this.baseUrl }/users/?id=${id}` )
    .pipe(
      map ( user => { return user[0] })
    );

  }

  // LOGUEO USUARIO

  public login (email: string, password: string): Observable<User | null> {

    if( !email || !password ) return of( null );

    return this.http.get<User[]>(`${ this.baseUrl }/users?email=${ email }&password=${ password }`)
    .pipe(
      filter( user => !!user[0]),
      map( user => { return user[0] }),
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

  public registerUser(user: User): Observable<User | null> {

    if (!user) return of(null);

    return this.getAllUsers.pipe(
      switchMap( users => {
        if ( users.length === 0 ) {
          user.admin = true;
        }
        return this.validateUser(user);
      }),
        filter(isValid => isValid),
        switchMap(() => this.addUser(user).pipe(
            map(() => user),
        ))
    );
}

public validateUser(user: User, userId?: string): Observable<boolean> {
  return this.getAllUsers.pipe(
    map(users => {
      // Excluir al usuario actual de la validación si se proporciona userId
      const isValid = users.find(u =>
        (u.username === user.username || u.email === user.email || u.document === user.document) &&
        u.id !== userId
      );
      return !isValid; // Retorna true si no se encuentra un usuario existente, es decir, es válido
    })
  );
}



}
