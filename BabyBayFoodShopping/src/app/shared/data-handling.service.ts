import {Injectable} from "@angular/core";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import {User} from "../auth/user.model";
import {Store} from "@ngrx/store";
import * as RecipeActions from '../recipes/store/recipe.actions'
import * as fromApp from '../store/app.reducer'

@Injectable({providedIn: 'root'})
export class DataHandlingService {
  private baseUrl = 'https://babybay-foodshopping-app-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json';

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private store: Store<fromApp.AppState>) {

  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.baseUrl, recipes).subscribe((response) => {
      console.log(response);
    })
  }

  fetchRecipe() {
    return this.http.get<Recipe[]>(this.baseUrl).pipe(map(
        data => {
          return data.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
          });
        }
      ),
      tap(
        (recipes: Recipe[]) => {
          this.recipeService.updateAllRecipes(recipes)
        }
      ));

  }


}
