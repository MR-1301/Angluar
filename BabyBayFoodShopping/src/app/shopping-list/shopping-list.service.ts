import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";
import {Output} from "@angular/core";

export class ShoppingListService {
  private ingredients: Ingredient[] = [];
  ingredientsChanged = new Subject<Ingredient[]>();
  toEditMode = new Subject<void>();

  editMode = {
    decider: false,
    index: -1
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  addNewIngredient(ing: Ingredient) {
    if (this.editMode.decider) {
      this.ingredients[this.editMode.index] = ing;
      this.editMode = {
        decider: false,
        index: -1
      }
    } else {
      let foundIndex = this.ingredients.findIndex(x => x.name === ing.name)
      if (foundIndex === -1)
        this.ingredients.push(ing);
      else
        this.ingredients[foundIndex].amount += ing.amount;
    }
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addNewIngredients(ings: Ingredient[]) {
    for (let ing of ings) {
      let foundIndex = this.ingredients.findIndex(x => x.name === ing.name)
      if (foundIndex === -1)
        this.ingredients.push(JSON.parse(JSON.stringify(ing)))
      else
        this.ingredients[foundIndex].amount += ing.amount;
    }
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  editIng(selIngIndex: number) {
    console.log(selIngIndex)
    this.editMode = {
      decider: true,
      index: selIngIndex
    }
    this.toEditMode.next();
  }


  getIngredient(index: number) {
    return this.ingredients.slice()[index];
  }

  deleteIngredient() {
    console.log(this.editMode.index);
    this.ingredients.splice(this.editMode.index, 1);
    this.editMode = {
      decider: false,
      index: -1
    }
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
