import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {Subscription} from 'rxjs';
import {Store} from "@ngrx/store";
import * as fromApp from '../../store/app.reducer'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  recipeSub: Subscription;

  constructor(private recipeService: RecipeService, private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {

    //ChangeStoreStarts
    // this.recipes = this.recipeService.getRecipes();
    // this.subscription = this.recipeService.recipesChanged.subscribe(
    //   (newRecipes) => {
    //     this.recipes = newRecipes;
    //   }
    // );
    //ChangeStoreEnds

    //  StoreCodeStarts
    this.recipeSub = this.store.select('recipe').subscribe((recipeState) => {
      this.recipes = recipeState.recipes;
    })
    //  StoreCodeEnds
  }

  ngOnDestroy() {
    //ChangesStoreStarts
    // this.subscription.unsubscribe();
    //ChangesStoreEnds

    //StoreCodeStarts
    this.recipeSub.unsubscribe();
    //StoreCodeEnds
  }
}
