import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe.model";
import {Ingredient} from "../../shared/ingredient.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeId: number;
  editMode = false;
  subs: Subscription;
  reForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipeService) {

  }


  ngOnInit(): void {
    this.subs = this.route.params.subscribe((params) => {
      this.recipeId = +params['id'];

      if (this.recipeId >= 0)
        this.editMode = true;
      this.initForm();
    })
  }

  private initForm() {
    let recipeName = null;
    let imagePath = null;
    let description = null;
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      let recipeCurr = this.recipeService.getRecipe(this.recipeId);
      recipeName = recipeCurr.name;
      imagePath = recipeCurr.imagePath;
      description = recipeCurr.description;
      for (let ing of recipeCurr.ingredients) {
        recipeIngredients.push(new FormGroup({
          'name': new FormControl(ing.name, Validators.required),
          'amount': new FormControl(ing.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        }))
      }
    }

    this.reForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  get_controls() { // a getter!
    return (<FormArray>this.reForm.get('ingredients')).controls;
  }


  addRecipeIng() {
    (<FormArray>this.reForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }))
  }

  onDeleteIng(index: number) {
    (<FormArray>this.reForm.get('ingredients')).removeAt(index);
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.recipeId, this.reForm.value)
      this.router.navigate(['..'], {relativeTo: this.route});
    } else {
      this.recipeService.newRecipe(this.reForm.value)
      this.router.navigate(['..', this.recipeService.getRecipes().length - 1], {relativeTo: this.route});
    }

  }

  onClear() {
    if (this.editMode) {
      this.router.navigate(['..'], {relativeTo: this.route});
    } else {
      this.router.navigate(['..'], {relativeTo: this.route});
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
