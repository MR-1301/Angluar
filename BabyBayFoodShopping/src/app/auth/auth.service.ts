import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {User} from "./user.model";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Store} from "@ngrx/store";
import * as fromApp from '../store/app.reducer'
import * as AuthActions from "./store/auth.action";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})

export class AuthService {
  signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.apiKey;
  loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.apiKey

  user = new BehaviorSubject<User>(null);
  loTimer: any = null;

  constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) {

  }

  private handleError(errorResponse: HttpErrorResponse) {
    console.log(errorResponse.error.error.message)
    let errorMessage = "An Unknown Error Occurred!"
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
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

    return throwError(errorMessage);

  }

  private handelLoginResponse(resData) {
    const expDate = new Date(new Date().getTime() + (+resData.expiresIn) * 1000);
    const newUser: User = new User(resData.email, resData.localId, resData.idToken, expDate);

    this.user.next(newUser);

    this.autoLogout((+resData.expiresIn) * 1000)
    localStorage.setItem('userData', JSON.stringify(newUser))
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: Date
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData)
      return;

    const expDate = new Date(userData._tokenExpirationDate);
    const newUserData = new User(userData.email, userData.id, userData._token, expDate);

    if (newUserData.token) {
      const dur = expDate.getTime() - (new Date()).getTime();
      this.autoLogout(dur);


      this.user.next(newUserData);


    }
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.signUpUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    })
      .pipe(catchError(this.handleError), tap(resData => {
        this.handelLoginResponse(resData)
      }))
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.loginUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap((response) => this.handelLoginResponse(response)))
  }

  logout() {
    this.user.next(null);

    this.router.navigate(['/auth']);

    localStorage.removeItem('userData')
    if (this.loTimer) {
      clearTimeout(this.loTimer);
    }
    this.loTimer = null;
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration)
    this.loTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration)
  }

  clearLoTimer() {
    if (this.loTimer) {
      clearTimeout(this.loTimer);
    }
    this.loTimer = null;
  }
}
