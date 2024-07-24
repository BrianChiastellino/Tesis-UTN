import { Injectable } from "@angular/core";
import { CanActivateFn, CanMatchFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable, map, tap } from "rxjs";


@Injectable({ providedIn: 'root' })

export class PublicGuard{

constructor( private authService: AuthService, private router: Router) {}

private checkAuthentication(): Observable<boolean> {

  return this.authService.checkAuthentication()
    .pipe(
      map( isAuthenticated => !isAuthenticated ),
    )
}

public canMatch: CanMatchFn = ( route, segments ) => {
  return this.checkAuthentication();
};

public canActivate: CanActivateFn = (route, state) => {
  return this.checkAuthentication();
};

}
