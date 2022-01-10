import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: [
    `input.ng-invalid.ng-touched {
      border: 1px solid red;
    }`
  ]
})
export class AuthComponent implements OnInit, OnDestroy {
  isLogin = true;
  isLoading = false;
  @ViewChild('authData', {static: false}) authData: NgForm;
  error = null;
  closeSub: Subscription;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost;

  constructor(private authService: AuthService, private router: Router, route: ActivatedRoute, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit() {
    if (this.authData.invalid)
      return;

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
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorRes => {
      this.isLoading = false
      this.showErrorAlert(errorRes);
      this.error = errorRes;
    })
    this.authData.reset();
  }

  private showErrorAlert(message: string) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
    const hostViewContainer = this.alertHost.viewContainerRef;
    hostViewContainer.clear();
    let alertCompRef = hostViewContainer.createComponent(alertComponentFactory);
    alertCompRef.instance.message = message;
    this.closeSub = alertCompRef.instance.closeEvent.subscribe(() => {
      hostViewContainer.clear();
      this.closeSub.unsubscribe();
    })
  }

  ngOnDestroy() {
    if (this.closeSub)
      this.closeSub.unsubscribe();
  }
}
