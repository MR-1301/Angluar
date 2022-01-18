import {Recipe} from "../recipe.model";
import * as RecipeAction from "./recipe.actions";

export interface State {
  recipes: Recipe[]
}

const initialState: State = {
  recipes: []
}

export function RecipeReducer(state = initialState, action: RecipeAction.RecipeActions) {
  switch (action.type) {
    case RecipeAction.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      }

    case RecipeAction.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      }

    case RecipeAction.UPDATE_RECIPE:
      let newRecipes = state.recipes.slice();
      newRecipes[action.payload.id] = action.payload.recipe;
      return {
        ...state,
        recipes: newRecipes
      }

    case RecipeAction.DELETE_RECIPE:
      let newRecipe = state.recipes.slice();
      newRecipe = newRecipe.filter((x, i) => i !== action.payload)
      return {
        ...state,
        recipes: newRecipe
      }

    default:
      return state;
  }
}
