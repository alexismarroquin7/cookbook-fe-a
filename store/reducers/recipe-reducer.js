import { RecipeAction } from "../actions";

const { ACTION } = RecipeAction;

const initialState = {
  status: {
    loading: false,
    error: {
      message: ''
    }
  },
  list: [],
  item: {}
}

export const RecipeReducer = (state = initialState, action) => {
  switch(action.type){
    
    case ACTION.FIND.ALL.START:
      return {
        ...state,
        ...state,
        status: {
          ...state.status,
          loading: true,
          error: {
            ...state.status.error,
            message: ''
          }
        }
      }
    case ACTION.FIND.ALL.SUCCESS:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.error,
            message: ''
          }
        },
        list: action.payload.recipes
      }
    case ACTION.FIND.ALL.FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.error,
            message: ''
          }
        }
      }
    
    default:
      
      return state;
  }
}