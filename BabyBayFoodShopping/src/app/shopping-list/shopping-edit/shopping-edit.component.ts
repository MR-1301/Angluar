import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('ingredientAmount', {static: false}) ingredientAmount: ElementRef;

  @Output() addNewIngredient = new EventEmitter<Ingredient>()

  constructor() {
  }

  ngOnInit(): void {
  }

  addIngredient(ingredientName: HTMLInputElement) {
    this.addNewIngredient.emit(new Ingredient(
      ingredientName.value,
      this.ingredientAmount.nativeElement.value
    ))
  }
}
