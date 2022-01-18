import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "./recipe.model";
import {DataHandlingService} from "../shared/data-handling.service";
import {Observable, of} from "rxjs";
import {RecipeService} from "./recipe.service";
import {Store} from "@ngrx/store";
import * as fromApp from '../store/app.reducer'
import * as RecipeActions from "./store/recipe.actions";
import {Actions, ofType} from "@ngrx/effects";
import {map, switchMap, take} from "rxjs/operators";

@Injectable({providedIn: 'root'})

export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(private dataHandlingService: DataHandlingService,
              private recipeService: RecipeService,
              private store: Store<fromApp.AppState>,
              private action$: Actions) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    //CSS
    // let currRecipe = this.recipeService.getRecipes();
    // if (currRecipe.length == 0)
    //   return this.dataHandlingService.fetchRecipe();
    // return currRecipe;
    //  CSE

    //  SCS
    return this.store.select('recipe').pipe(
      take(1),
      map(recipeState => recipeState.recipes),
      switchMap(recipes => {
        if (recipes.length === 0) {
          this.store.dispatch(new RecipeActions.FetchRecipe());
          return this.action$.pipe(
            ofType(RecipeActions.SET_RECIPES),
            take(1)
          )
        } else {
          return of(recipes);
        }
      }))
    //  SCE
  }
}
