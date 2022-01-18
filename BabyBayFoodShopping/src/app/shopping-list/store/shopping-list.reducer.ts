import {Ingredient} from "../../shared/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions'
import {START_EDIT} from './shopping-list.actions'

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
}

export function ShoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.ShoppingListActionType
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state, ingredients: [...state.ingredients, action.payload]
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state, ingredients: [...state.ingredients, ...action.payload]
      }

    case ShoppingListActions.UPDATE_INGREDIENT:
      const SelIng = state.ingredients[state.editedIngredientIndex]
      const updatedIng = {
        ...SelIng,
        ...action.payload
      }
      let updatedIngs = [...state.ingredients];
      updatedIngs[state.editedIngredientIndex] = updatedIng;

      return {
        ...state,
        ingredients: updatedIngs,
        editedIngredientIndex: -1,
        editedIngredient: null
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((x, y) => y !== state.editedIngredientIndex),
        editedIngredientIndex: -1,
        editedIngredient: null
      };

    case ShoppingListActions.START_EDIT:
      console.log("START_EDIT");
      return {
        ...state,
        editedIngredient: {...state.ingredients[action.payload]},
        editedIngredientIndex: action.payload
      };


    case ShoppingListActions.STOP_EDIT:
      console.log("STOP_EDIT");
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };


    default:
      return state;
  }
}
