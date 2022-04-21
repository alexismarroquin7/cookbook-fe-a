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
  item: {
    recipe_id: null,
    recipe_likes: []
  }
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
            message: action.payload.error.message
          }
        }
      }
      
    case ACTION.FIND.BY.RECIPE.ID.START:
      return {
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
    case ACTION.FIND.BY.RECIPE.ID.SUCCESS:
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
        item: action.payload.recipe
      }
    case ACTION.FIND.BY.RECIPE.ID.FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.error,
            message: action.payload.error.message
          }
        }
      }
    
    case ACTION.LIKE.START:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
          error: {
            ...state.status.message,
            message: ''
          }
        }
      }
    case ACTION.LIKE.SUCCESS:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.message,
            message: ''
          }
        },
        list: state.list.map(recipe => {
          if(recipe.recipe_id === action.payload.recipe_like.recipe_id){
            recipe.recipe_likes = [...recipe.recipe_likes, action.payload.recipe_like];
          }
          return recipe;
        }),
        item: {
          ...state.item,
          recipe_likes: [
            ...state.item.recipe_likes,
            action.payload.recipe_like
          ]
        }

      }
    case ACTION.LIKE.FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.message,
            message: action.payload.error.message
          }
        }
      }
    
    case ACTION.LIKE.REMOVE.START:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
          error: {
            ...state.status.message,
            message: ''
          }
        }
      }
    case ACTION.LIKE.REMOVE.SUCCESS:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.message,
            message: ''
          }
        },
        list: state.list.map(recipe => {
          recipe.recipe_likes = recipe.recipe_likes.filter(rp_like => rp_like.recipe_like_id !== action.payload.recipe_like_id);
          return recipe;
        }),
        item: {
          ...state.item,
          recipe_likes: state.item.recipe_likes.filter(rp_like => rp_like.recipe_like_id !== action.payload.recipe_like_id)
        }
      }
    case ACTION.LIKE.REMOVE.FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.message,
            message: action.payload.error.message
          }
        }
      }
    
    case ACTION.FIND.BY.USER.USERNAME.START:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
          error: {
            ...state.status.message,
            message: ''
          }
        }
      }
    case ACTION.FIND.BY.USER.USERNAME.SUCCESS:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.message,
            message: ''
          }
        },
        list: action.payload.recipes
      }
    case ACTION.FIND.BY.USER.USERNAME.FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.message,
            message: action.payload.error.message
          }
        }
      }

    case ACTION.DELETE.BY.RECIPE.ID.START:
      return {
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
    case ACTION.DELETE.BY.RECIPE.ID.SUCCESS:
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
        list: state.list.filter(it => it.recipe_id !== action.payload.recipe_id),
        item: initialState.item
      }
    case ACTION.DELETE.BY.RECIPE.ID.FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.error,
            message: action.payload.error.message
          }
        }
      }

    case ACTION.UPDATE.BY.RECIPE.ID.START:
      return {
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
    case ACTION.UPDATE.BY.RECIPE.ID.SUCCESS:
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
        list: state.list.map(r => {
          
          if(r.recipe_id === action.payload.recipe.recipe_id){
            return action.payload.recipe;
          } else {
            return r;
          }
          
        }),
        item: action.payload.recipe
      }
    case ACTION.UPDATE.BY.RECIPE.ID.FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.error,
            message: action.payload.error.message
          }
        }
      }

    default:
      return state;
  }
}