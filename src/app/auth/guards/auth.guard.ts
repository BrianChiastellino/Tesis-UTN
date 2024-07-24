import { Injectable } from "@angular/core";
import { CanActivateFn, CanMatchFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { filter, map, Observable, switchMap, tap } from "rxjs";


@Injectable({ providedIn: 'root' })

export class AuthGuard{

constructor( private authService: AuthService, private router: Router) {}

  private checkAuthentication(): Observable<boolean> {

    return this.authService.checkAuthentication()
      .pipe(
        filter( data => !!data),
        switchMap( isAdmin => this.authService.checkAuthenticationAdmin()),
        map( isAdmin => !isAdmin),
    )
  }

public canMatch: CanMatchFn = ( route, segments ) => {
  return this.checkAuthentication();
};

public canActivate: CanActivateFn = (route, state) => {
  return this.checkAuthentication();
};

}
