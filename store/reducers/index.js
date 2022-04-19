import { combineReducers } from "redux";
import { RecipeReducer } from "./recipe-reducer";
import { AuthReducer } from "./auth-reducer";
import { UserReducer } from "./user-reducer";

export const rootReducer = combineReducers({
  recipe: RecipeReducer,
  auth: AuthReducer,
  user: UserReducer
});