import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree, CanLoad, UrlSegment, Route
} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, tap, take} from 'rxjs/operators';

import {AuthService} from './auth.service';
import {Store} from "@ngrx/store";
import * as fromApp from '../store/app.reducer'

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {

    //ChangesStoreStarts
    // return this.authService.user.pipe(
    //   take(1),
    //   map(user => {
    //     const isAuth = !!user;
    //     if (isAuth) {
    //       return true;
    //     }
    //     return this.router.createUrlTree(['/auth']);
    //   })
    // );
    //ChangesStoreEnds

    //StoreCodeStarts
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => {
        return authState.user;
      }),
      map(user => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
    );
    //StoreCodeEnds
  }
}
