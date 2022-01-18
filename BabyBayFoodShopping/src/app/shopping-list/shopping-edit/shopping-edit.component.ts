import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import * as ShoppingListAction from '../store/shopping-list.actions'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('ingredientName', {static: false}) ingredientName: ElementRef;
  @ViewChild('ingredientAmount', {static: false}) ingredientAmount: ElementRef;

  @ViewChild('addIngForm', {static: false}) addIngForm: NgForm;

  subs: Subscription;

  constructor(private shoppingListService: ShoppingListService, private store: Store<fromApp.AppState>) {

  }


  ngOnInit(): void {
    this.subs = this.shoppingListService.toEditMode.subscribe(
      () => {
        let selIngIndex;
        let selIng: Ingredient = this.shoppingListService.getIngredients()[selIngIndex];
        //StoreCodeStars
        this.store.select('shoppingList').subscribe(data => {
          selIng = data.editedIngredient;
          selIngIndex = data.editedIngredientIndex;
        })
        //StoreCodeEnds
        this.addIngForm.setValue({
          name: selIng.name,
          amount: selIng.amount
        })
      }
    )
  }

  ngOnDestroy(): void {
    this.shoppingListService.editMode = {
      decider: false,
      index: -1
    }
    this.store.dispatch(new ShoppingListAction.StopEdit())
    this.subs.unsubscribe();
  }

  addIngredient() {
    const ingName = this.ingredientName.nativeElement.value;
    const ingAmount = this.ingredientAmount.nativeElement.value;
    this.shoppingListService.addNewIngredient(new Ingredient(ingName, ingAmount));
  }

  onSubmit() {
    const ingName = this.addIngForm.value.name;
    const ingAmount = this.addIngForm.value.amount;

    //storeCodeStarts
    if (this.isInEdit()) {
      this.store.dispatch(new ShoppingListAction.UpdateIngredients(
        new Ingredient(ingName, ingAmount)
      ))
      this.store.dispatch(new ShoppingListAction.StopEdit())
    } else
      this.store.dispatch(new ShoppingListAction.AddIngredient(new Ingredient(ingName, ingAmount)))
    //storeCodeEnds

    this.shoppingListService.addNewIngredient(new Ingredient(ingName, ingAmount));
    this.addIngForm.reset();
  }

  onReset() {
    this.addIngForm.resetForm();
    this.shoppingListService.editMode = {
      decider: false,
      index: -1
    }
    //StoreCodeStarts
    this.store.dispatch(new ShoppingListAction.StopEdit())
    //StoreCodeEnds
  }

  isInEdit() {
    return this.shoppingListService.editMode.decider;
  }

  onDelete() {
    //storeCodeStarts
    this.store.dispatch(new ShoppingListAction.DeleteIngredient());
    this.store.dispatch(new ShoppingListAction.StopEdit())
    //storeCodeStartEnds
    this.shoppingListService.deleteIngredient();
    this.onReset();
  }
}
