import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions'
import * as fromApp from '../../store/app.reducer'
import * as RecipeAction from "../store/recipe.actions";
import {map, switchMap} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipeDetailShowed: Recipe = {
    name: '',
    description: '',
    ingredients: [],
    imagePath: ''
  };
  recipeId: number;
  sub: Subscription;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    //CSS
    this.recipeId = +this.route.snapshot.params['id'];
    // this.recipeDetailShowed = this.recipeService.getRecipe(this.recipeId);
    // this.route.params.subscribe((params) => {
    //   this.recipeId = +params['id'];
    //   this.recipeDetailShowed = this.recipeService.getRecipe(this.recipeId);
    // })
    //  CSE

    //  SCS
    this.sub = this.route.params.pipe(
      map(params => {
        return +params['id'];
      }),
      switchMap((id) => {
        this.recipeId = id;
        return this.store.select('recipe');
      }),
      map((recipeState) => {
        return recipeState.recipes.find((recipe, index) => this.recipeId === index);
      })
    )
      .subscribe((recipe) => {
        if (!recipe) {
          this.router.navigate(['/']);
        } else
          this.recipeDetailShowed = recipe;
      })
    //  SCE
  }

  toShoppingList() {
    //CSS
    // this.recipeService.addIngToShopList(this.recipeDetailShowed.ingredients.slice());
    // CSE

    //SCS
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipeDetailShowed.ingredients.slice()))
    //SCE
  }

  toDeleteRecipe() {
    //CSS
    // this.recipeService.deleteRecipe(this.recipeId)
    //CSE

    //SCS
    this.store.dispatch(new RecipeAction.DeleteRecipe(this.recipeId))
    //SCE
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
