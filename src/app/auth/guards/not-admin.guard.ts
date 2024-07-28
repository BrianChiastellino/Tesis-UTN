import { Injectable } from "@angular/core";
import { CanActivateFn, CanMatchFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable, map, tap } from "rxjs";


@Injectable({ providedIn: 'root' })

export class NotAdminGuard{

constructor( private authService: AuthService, private router: Router) {}

private checkAuthentication(): Observable<boolean> {

  return this.authService.checkAuthenticationAdmin().pipe(
    map(isAdmin => !isAdmin),
    tap(isNotAdmin => {
      if (!isNotAdmin) {
        this.router.navigate(['/admin/landing']);
      }
    })
  );
}

public canMatch: CanMatchFn = ( route, segments ) => {
  return this.checkAuthentication();
};

public canActivate: CanActivateFn = (route, state) => {
  return this.checkAuthentication();
};

}
