import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingChangeSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingChangeSub = this.shoppingListService.ingredientsChanged.subscribe((newIngArr) => {
      this.ingredients = newIngArr;
    })
  }

  ngOnDestroy() {
    this.ingChangeSub.unsubscribe();
  }

  editIndex() {
    return this.shoppingListService.editMode.index;
  }

  editIngredient(selIngredientIndex) {
    this.shoppingListService.editIng(selIngredientIndex);
  }
}
