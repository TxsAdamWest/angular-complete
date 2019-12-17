import { Ingredient } from "app/shared/ingredient.model";

import * as ShoppingListActions from './shopping-list.actions';


export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
};

export interface AppState {
  shoppingList: State;
};

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Onions', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1 // We need an invalid index, kind of like setting it a null value.
};

export function shoppingListReducer( // Reducers should only use synchronus code, no async calls , and take in data, and return data.
  state = initialState,  // note that if state input is not provided, it will default to initialState variable.
  action: ShoppingListActions.ShoppingListActions // Its important to use the correct type so that we have access to the payload ( or any other properties we define in the ShoppingListActions class. )
) { // Reducer will handle state updates by creating a copy of it then making changes to the copy, remember that STORE is IMMUTABLE.
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      }; // Add old state object to this object, effectively making a copy.
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      }; // Add old state object to this object, effectively making a copy.
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient, index) => {
          return index !== state.editedIngredientIndex; // payload is the index.
        }),
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] } // spread operator creates a copy here.
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default:
      return state;
  }

}

