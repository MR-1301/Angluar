import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromApp from '../../store/app.reducer'
import * as RecipeAction from "../store/recipe.actions";
import {map} from "rxjs/operators";

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
  private storeSub: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private recipeService: RecipeService,
              private store: Store<fromApp.AppState>) {

  }


  ngOnInit(): void {
    this.subs = this.route.params.subscribe((params) => {
      this.recipeId = +params['id'];

      if (this.recipeId >= 0)
        this.editMode = true;
      else
        this.recipeId = -1;
      this.initForm();
    })
  }

  private initForm() {
    let recipeName = null;
    let imagePath = null;
    let description = null;
    let recipeIngredients = new FormArray([]);

    this.storeSub = this.store.select('recipe')
      .pipe(
        map(recipeState => {
          return recipeState.recipes.find((recipe, index) => this.recipeId === index)
        })
      )
      .subscribe(recipe => {
        let recipeCurr = recipe;
        if (recipeCurr) {
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
      })

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
      //CSS
      // this.recipeService.updateRecipe(this.recipeId, this.reForm.value)
      //CSE

      //SCS
      this.store.dispatch(new RecipeAction.UpdateRecipe({id: this.recipeId, recipe: this.reForm.value}))
      //SCE

      this.router.navigate(['..'], {relativeTo: this.route});
    } else {
      //CSS
      // this.recipeService.newRecipe(this.reForm.value)
      //CSE

      //SCS
      this.store.dispatch(new RecipeAction.AddRecipe(this.reForm.value))
      //SCE

      this.router.navigate(['..'], {relativeTo: this.route});
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
    this.storeSub.unsubscribe();
  }
}
