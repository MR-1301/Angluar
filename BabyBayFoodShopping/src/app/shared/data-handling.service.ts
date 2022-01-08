import {Injectable} from "@angular/core";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {User} from "../auth/user.model";


@Injectable({providedIn: 'root'})
export class DataHandlingService {
  private baseUrl = 'https://babybay-foodshopping-app-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json';

  constructor(private authService: AuthService, private http: HttpClient, private recipeService: RecipeService) {

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
