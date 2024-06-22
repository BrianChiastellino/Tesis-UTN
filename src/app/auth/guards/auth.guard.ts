import { Injectable } from "@angular/core";
import { CanActivateFn, CanMatchFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable, tap } from "rxjs";


@Injectable({ providedIn: 'root' })

export class AuthGuard{

constructor( private authService: AuthService, private router: Router) {}

private checkAuthentication(): Observable<boolean> {

  return this.authService.checkAuthentication()
  .pipe(
    tap( isAuthenticated => {
      if( !isAuthenticated ) this.router.navigateByUrl('/auth/login');
    })
  )
}

public canMatch: CanMatchFn = ( route, segments ) => {
  return this.checkAuthentication();
};

public canActivate: CanActivateFn = (route, state) => {
  return this.checkAuthentication();
};

}
