import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataHandlingService} from "../shared/data-handling.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromApp from '../store/app.reducer'
import {map} from "rxjs/operators";
import * as AuthActions from "../auth/store/auth.action";
import * as RecipeActions from "../recipes/store/recipe.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  userSub: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private dataHandlingService: DataHandlingService,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    //ChangesStoreStarts
    // this.userSub = this.authService.user.subscribe((user) => {
    //   this.isAuthenticated = !!user;
    // })
    //  ChangesStoreEnds

    //  StoreCodeStarts
    this.store.select('auth')
      .pipe(map(authState => authState.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      })
    //  StoreCodeEnds
  }

  collapsed = true;

  recipeClicked() {
    this.router.navigate(['recipes'], {relativeTo: this.route})
  }

  onSaveData() {
    //CSS
    // this.dataHandlingService.storeRecipes();
    //  CSE

    //  SCS
    this.store.dispatch(new RecipeActions.StoreRecipe())
    //  SCE

  }

  onFetchData() {
    //CSS
    // this.dataHandlingService.fetchRecipe().subscribe();
    //  CSE

    //  SCS
    this.store.dispatch(new RecipeActions.FetchRecipe())
    //  SCE
  }

  onLogout() {
    //ChangesStoreStarts
    // this.authService.logout();
    //ChangesStoreEnds
    this.store.dispatch(new AuthActions.Logout())
  }
}
