import { axiosInstance as axios } from "../../utils";

const ACTION = {
  FIND: {
    ALL: {
      START: "RECIPE__FIND__ALL--START",
      SUCCESS: "RECIPE__FIND__ALL--SUCCESS",
      FAIL: "RECIPE__FIND__ALL--FAIL"
    },
    BY: {
      RECIPE: {
        ID: {
          START: "RECIPE__FIND__BY__RECIPE__ID--START",
          SUCCESS: "RECIPE__FIND__BY__RECIPE__ID--SUCCESS",
          FAIL: "RECIPE__FIND__BY__RECIPE__ID--FAIL"
        }
      },
      USER: {
        USERNAME: {
          START: "RECIPE__FIND__BY__USER__USERNAME--START",
          SUCCESS: "RECIPE__FIND__BY__USER__USERNAME--SUCCESS",
          FAIL: "RECIPE__FIND__BY__USER__USERNAME--FAIL"
        }
      }
    },
  },
  LIKE: {
    START: "RECIPE__LIKE--START",
    SUCCESS: "RECIPE__LIKE--SUCCESS",
    FAIL: "RECIPE__LIKE--FAIL",
    
    REMOVE: {
      START: "RECIPE__LIKE__REMOVE--START",
      SUCCESS: "RECIPE__LIKE__REMOVE--SUCCESS",
      FAIL: "RECIPE__LIKE__REMOVE--FAIL"

    }
  },
  CREATE: {
    START: "RECIPE__CREATE--START",
    SUCCESS: "RECIPE__CREATE--SUCCESS",
    FAIL: "RECIPE__CREATE--FAIL"
  }
}

const findAll = () => async dispatch => {
  dispatch({
    type: ACTION.FIND.ALL.START
  });
  try {
    const res = await axios().get('/recipes');
    dispatch({
      type: ACTION.FIND.ALL.SUCCESS,
      payload: {
        recipes: res.data 
      }
    });
    
  } catch (err) {
    dispatch({
      type: ACTION.FIND.ALL.FAIL,
      payload: {
        error: {
          message: err.response.data.message 
        }
      }
    });
    
  }
}

const findByRecipeId = (recipe_id) => async dispatch => {
  dispatch({
    type: ACTION.FIND.BY.RECIPE.ID.START
  });
  try {
    const res = await axios().get(`/recipes/${recipe_id}`);
    dispatch({
      type: ACTION.FIND.BY.RECIPE.ID.SUCCESS,
      payload: {
        recipe: res.data
      }
    });
    
  } catch (err) {
    dispatch({
      type: ACTION.FIND.BY.RECIPE.ID.FAIL,
      payload: {
        error: {
          message: err.response.data.message 
        }
      }
    });
    
  }
}

const like = ({recipe_id, user_id}) => async dispatch => {
  dispatch({
    type: ACTION.LIKE.START
  })

  try {
    const res = await axios().post('/recipe_likes', {recipe_id, user_id});
    dispatch({
      type: ACTION.LIKE.SUCCESS,
      payload: {
        recipe_like: res.data
      }
    })

  } catch (err) {
    dispatch({
      type: ACTION.LIKE.FAIL,
      payload: {
        error: {
          message: err.response.data.message
        }
      }
    })

  }
}

const removeLike = (recipe_like_id) => async dispatch => {
  dispatch({
    type: ACTION.LIKE.REMOVE.START
  })
  
  try {
    const res = await axios().delete(`/recipe_likes/${recipe_like_id}`);
    dispatch({
      type: ACTION.LIKE.REMOVE.SUCCESS,
      payload: {
        recipe_like_id: res.data.recipe_like_id
      }
    });

  } catch(err) {

    dispatch({
      type: ACTION.LIKE.REMOVE.FAIL,
      payload: {
        error: {
          message: err.response.data.message
        }
      }
    })

  }
}

const findByUserUsername = (username) => async dispatch => {
  dispatch({
    type: ACTION.FIND.BY.USER.USERNAME.START
  })
  try {
    const res = await axios().get('/recipes');
    
    const recipes = res.data.filter(r => r.user.username === username);
    
    dispatch({
      type: ACTION.FIND.BY.USER.USERNAME.SUCCESS,
      payload: {
        recipes
      }
    })
  } catch (err) {
    dispatch({
      type: ACTION.FIND.BY.USER.USERNAME.FAIL,
      payload: {
        error: {
          message: err.response.data.message
        }
      }
    })
  }
}

const create = (recipe) => async dispatch => {
  dispatch({
    type: ACTION.CREATE.START  
  })
  try {
    const res = await axios().post('/recipes', recipe);
    dispatch({
      type: ACTION.CREATE.SUCCESS,
      payload: {
        recipe: res.data
      }
    })
  } catch (err) {
    dispatch({
      type: ACTION.CREATE.FAIL,
      payload: {
        error: {
          message: err.response.data.message
        }
      }
    })
    
  }
}

export const RecipeAction = {
  ACTION,
  findAll,
  findByRecipeId,
  removeLike,
  like,
  findByUserUsername,
  create
}