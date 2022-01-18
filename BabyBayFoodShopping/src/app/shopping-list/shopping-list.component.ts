import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as ShoppingListAction from "./store/shopping-list.actions";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private ingChangeSub: Subscription;

  constructor(private shoppingListService: ShoppingListService, private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    //StoreCodeStarts
    this.ingredients = this.store.select('shoppingList')
    //StoreCodeEnds

    //ChangesDueToStoreCodeStarts
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.ingChangeSub = this.shoppingListService.ingredientsChanged.subscribe((newIngArr) => {
    //   this.ingredients = newIngArr;
    // })
    //ChangesDueToStoreCodeEnds
  }

  ngOnDestroy() {
    // this.ingChangeSub.unsubscribe();
  }

  editIndex() {
    return this.shoppingListService.editMode.index;
  }

  editIngredient(selIngredientIndex) {
    //StoreCodeStarts
    this.store.dispatch(new ShoppingListAction.StartEdit(selIngredientIndex))
    //StoreCodeEnds
    this.shoppingListService.editIng(selIngredientIndex);
  }
}
