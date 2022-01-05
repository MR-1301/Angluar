import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

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

  constructor(private shoppingListService: ShoppingListService) {

  }


  ngOnInit(): void {
    this.subs = this.shoppingListService.toEditMode.subscribe(
      () => {
        let selIngIndex = this.shoppingListService.editMode.index;
        let selIng = this.shoppingListService.getIngredient(selIngIndex);
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
    this.shoppingListService.addNewIngredient(new Ingredient(ingName, ingAmount));
    this.addIngForm.reset();
  }

  onReset() {
    this.addIngForm.resetForm();
    this.shoppingListService.editMode = {
      decider: false,
      index: -1
    }
  }

  isInEdit() {
    return this.shoppingListService.editMode.decider;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient();
    this.onReset();
  }
}
