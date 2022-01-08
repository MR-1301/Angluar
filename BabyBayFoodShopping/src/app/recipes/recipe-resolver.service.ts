import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "./recipe.model";
import {DataHandlingService} from "../shared/data-handling.service";
import {Observable} from "rxjs";
import {RecipeService} from "./recipe.service";

@Injectable({providedIn: 'root'})

export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(private dataHandlingService: DataHandlingService, private recipeService: RecipeService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    let currRecipe = this.recipeService.getRecipes();
    if (currRecipe.length == 0)
      return this.dataHandlingService.fetchRecipe();
    return currRecipe;
  }
}
