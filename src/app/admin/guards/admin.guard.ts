import { Injectable } from "@angular/core";
import { CanActivateFn, CanMatchFn, Router } from "@angular/router";
import { AuthService } from "../../auth/services/auth.service";
import { Observable, tap } from "rxjs";


@Injectable({ providedIn: 'root' })

export class AdminGuard {

constructor( private authService: AuthService, private router: Router) {}

private checkAuthentication(): Observable<boolean> {

  return this.authService.checkAuthenticationAdmin();

}

public canMatch: CanMatchFn = ( route, segments ) => {
  return this.checkAuthentication();
};

public canActivate: CanActivateFn = (route, state) => {
  return this.checkAuthentication();
};

}
