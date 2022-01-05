import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeDetailShowed: Recipe;
  recipeId: number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.recipeId = +this.route.snapshot.params['id'];
    this.recipeDetailShowed = this.recipeService.getRecipe(this.recipeId);
    this.route.params.subscribe((params) => {
      this.recipeId = +params['id'];
      this.recipeDetailShowed = this.recipeService.getRecipe(this.recipeId);
    })
  }

  toShoppingList() {
    this.recipeService.addIngToShopList(this.recipeDetailShowed.ingredients.slice());
  }

  toDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeId)
    this.router.navigate(['..'], {relativeTo: this.route});
  }
}
