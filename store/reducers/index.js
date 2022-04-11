import { combineReducers } from "redux";
import { RecipeReducer } from "./recipe-reducer";
import { AuthReducer } from "./auth-reducer";

export const rootReducer = combineReducers({
  recipe: RecipeReducer,
  auth: AuthReducer
});