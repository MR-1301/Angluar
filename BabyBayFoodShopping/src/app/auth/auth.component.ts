import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: [
    `input.ng-invalid.ng-touched {
      border: 1px solid red;
    }`
  ]
})
export class AuthComponent implements OnInit {
  isLogin = true;
  isLoading = false;
  @ViewChild('authData') authData: NgForm;
  error = null;

  constructor(private authService: AuthService, private router: Router, route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit() {
    if (this.authData.invalid)
      return;

    console.log(this.authData)
    const email = this.authData.value.email;
    const password = this.authData.value.password;

    this.isLoading = true;
    this.error = null;

    let authObs: Observable<AuthResponseData>;

    if (this.isLogin) {
      //login
      authObs = this.authService.login(email, password);

    } else {
      //register
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe((responseData) => {
      console.log(responseData)
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorRes => {
      this.isLoading = false
      console.log(errorRes)
      this.error = errorRes;
    })
    this.authData.reset();
  }
}
