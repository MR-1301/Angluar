import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {map, switchMap, tap, withLatestFrom} from "rxjs/operators";
import {Recipe} from "../recipe.model";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import * as fromApp from '../../store/app.reducer'
import * as RecipeActions from "./recipe.actions";
import {StoreRecipe} from "./recipe.actions";

const baseUrl = 'https://babybay-foodshopping-app-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json';

@Injectable()

export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(recipeFetchAction => {
      return this.http.get<Recipe[]>(baseUrl);
    }),
    map(
      data => {
        return data.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
        });
      }
    ),
    map(
      (recipes: Recipe[]) => {
        return new RecipeActions.SetRecipes(recipes);
      }
    )
  )

  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPE),
    withLatestFrom(this.store.select('recipe')),
    switchMap(([actionData, recipeState]) => {
      return this.http.put(baseUrl, recipeState.recipes);
    })
  )

  constructor(private actions$: Actions,
              private http: HttpClient,
              private store: Store<fromApp.AppState>) {
  }
}
