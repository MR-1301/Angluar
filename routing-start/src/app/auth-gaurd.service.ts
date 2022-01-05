import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGaurd implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {

  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //return of a promise is a promise
    return this.authService.isAuthenticated()
      .then((isLoggedIn) => {
        if (isLoggedIn)
          return true;
        else {
          this.router.navigate(['home']);
          return false;
        }
      })
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
