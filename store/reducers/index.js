import { combineReducers } from "redux";
import { RecipeReducer } from "./recipe-reducer";

export const rootReducer = combineReducers({
  recipe: RecipeReducer
});