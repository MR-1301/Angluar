import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  styles: [`.inThatSection {
    background: dimgrey;
  }`],
  encapsulation: ViewEncapsulation.None

})
export class HeaderComponent implements OnInit {
  @Input('isInRecipe') inRecipes: boolean = true;

  @Output() clickedOnOther = new EventEmitter<{}>()

  constructor() {
  }

  ngOnInit()
    :
    void {
  }

  collapsed = true;

  recipeClicked() {
    if (!this.inRecipes) {
      this.clickedOnOther.emit();
    }
  }

  shoppingClicked() {
    if (this.inRecipes) {
      this.clickedOnOther.emit();
    }
  }

  getColorRecipe() {
    if (this.inRecipes)
      return 'black';
  }

  getColorShop() {
    if (!this.inRecipes)
      return 'black';
  }
}
