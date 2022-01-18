import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";
import {Store} from "@ngrx/store";
import * as fromApp from '../store/app.reducer'
import * as AuthActions from "./store/auth.action";

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
  private storeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    //StoreStarts
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);

      }
    })
    //StoreEnds

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
    this.store.dispatch(new AuthActions.ClearError())

    let authObs: Observable<AuthResponseData>;

    if (this.isLogin) {
      //login

      //ChangesStoreStarts
      // authObs = this.authService.login(email, password);
      //ChangesStoreEnds

      //StoreCodeStart
      this.store.dispatch(new AuthActions.LoginStart({email, password}))
      //  StoreCodeEnds
    } else {
      //register
      //ChangesStoreStarts
      // authObs = this.authService.signup(email, password);
      //ChangesStoreEnds

      //StoreCodeStart
      this.store.dispatch(new AuthActions.SignupStart({email, password}))
      //StoreCodeEnds
    }

    //ChangesStoreStarts
    // authObs.subscribe((responseData) => {
    //   this.isLoading = false;
    //   this.router.navigate(['/recipes']);
    // }, errorRes => {
    //   this.isLoading = false
    //   this.showErrorAlert(errorRes);
    //   this.error = errorRes;
    // })
    //ChangesStoreEnds

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

    this.storeSub.unsubscribe();
  }
}
