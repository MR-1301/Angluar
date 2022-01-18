import {Actions, Effect, ofType} from "@ngrx/effects";
import * as AuthActions from "./auth.action";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {of} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {User} from "../user.model";
import {AuthService} from "../auth.service";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuth = (resData) => {
  const expDate = new Date(new Date().getTime() + (+resData.expiresIn) * 1000);
  const newUser = new User(resData.email, resData.localId, resData.idToken, expDate)
  localStorage.setItem('userData', JSON.stringify(newUser))

  return new AuthActions.Login({
    email: resData.email,
    userId: resData.localId,
    token: resData.idToken,
    expirationDate: expDate,
    redirect: true
  });
}

const handleErrorRes = (errorResponse) => {
  console.log(errorResponse.error.error.message)
  let errorMessage = "An Unknown Error Occurred!"
  if (!errorResponse.error || !errorResponse.error.error) {
    return of(new AuthActions.LoginFail(errorMessage));
  }

  switch (errorResponse.error.error.message) {
    case "EMAIL_EXISTS":
      errorMessage = 'This Email Already Exits!';
      break;
    case "EMAIL_NOT_FOUND":
      errorMessage = "This email is not Signed Up!!"
      break;
    case "INVALID_PASSWORD":
      errorMessage = "Password is Incorrect!!"
      break;
    default:
      errorMessage = "An Unknown Error Occurred!";
      break;
  }
  return of(new AuthActions.LoginFail(errorMessage));
}

@Injectable()

export class AuthEffects {

  signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.apiKey;
  loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.apiKey


  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((authSignupAction: AuthActions.SignupStart) => {
      return this.http.post<AuthResponseData>(this.signUpUrl, {
        email: authSignupAction.payload.email,
        password: authSignupAction.payload.password,
        returnSecureToken: true
      })
        .pipe(
          tap(resData => {
            this.authService.autoLogout((+resData.expiresIn) * 1000);
          }),
          map(handleAuth),
          catchError(handleErrorRes)
        )
    })
  )

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authLoginAction: AuthActions.LoginStart) => {
        return this.http.post<AuthResponseData>(this.loginUrl, {
            email: authLoginAction.payload.email,
            password: authLoginAction.payload.password,
            returnSecureToken: true
          }
        )
          .pipe(
            tap(resData => {
              this.authService.autoLogout((+resData.expiresIn) * 1000);
            }),
            map(handleAuth),
            catchError(handleErrorRes)
          )
      }
    )
  )

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string,
        id: string,
        _token: string,
        _tokenExpirationDate: Date
      } = JSON.parse(localStorage.getItem('userData'));

      if (!userData)
        return {type: "DUMMY"};

      const expDate = new Date(userData._tokenExpirationDate);
      const newUserData = new User(userData.email, userData.id, userData._token, expDate);

      if (newUserData.token) {
        const dur = expDate.getTime() - (new Date()).getTime();
        this.authService.autoLogout(dur);

        return new AuthActions.Login({
            email: newUserData.email,
            userId: newUserData.id,
            token: newUserData.token,
            expirationDate: expDate,
            redirect: false
          }
        )
      }
      return {type: "DUMMY"};
    })
  )

  //NgRx effects fire after all reducers for that action have executed
  @Effect({dispatch: false})
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap((AuthLoginAction: AuthActions.Login) => {
      if (AuthLoginAction.payload.redirect)
        this.router.navigate(['/'])
    })
  )

  @Effect({dispatch: false})
  logoutSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLoTimer();
      localStorage.removeItem('userData')
      this.router.navigate(['/auth'])
    })
  )

  constructor(private actions$: Actions,
              private http: HttpClient,
              private router: Router,
              private authService: AuthService) {
  }


}
