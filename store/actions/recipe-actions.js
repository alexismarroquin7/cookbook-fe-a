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
    FAIL: "RECIPE__CREATE--FAIL",
    COMMENT: {
      START: "RECIPE__CREATE__COMMENT--START",
      SUCCESS: "RECIPE__CREATE__COMMENT--SUCCESS",
      FAIL: "RECIPE__CREATE__COMMENT--FAIL",
    }
  },
  UPDATE: {
    BY: {
      RECIPE: {
        ID: {
          START: "RECIPE__UPDATE__BY__RECIPE__ID--START",
          SUCCESS: "RECIPE__UPDATE__BY__RECIPE__ID--SUCCESS",
          FAIL: "RECIPE__UPDATE__BY__RECIPE__ID--FAIL"
        }
      }
    }
  },
  DELETE: {
    BY: {
      RECIPE: {
        ID: {
          START: "RECIPE__DELETE__BY__RECIPE__ID--START",
          SUCCESS: "RECIPE__DELETE__BY__RECIPE__ID--SUCCESS",
          FAIL: "RECIPE__DELETE__BY__RECIPE__ID--FAIL"
        }
      }
    },
    COMMENT: {
      START: "RECIPE__DELETE__COMMENT--START",
      SUCCESS: "RECIPE__DELETE__COMMENT--SUCCESS",
      FAIL: "RECIPE__DELETE__COMMENT--FAIL"
    }
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

const updateByRecipeId = (recipe_id, changes) => async dispatch => {
  dispatch({
    type: ACTION.UPDATE.BY.RECIPE.ID.START
  })

  try {
    const res = await axios().put(`/recipes/${recipe_id}`, changes);
    dispatch({
      type: ACTION.UPDATE.BY.RECIPE.ID.SUCCESS,
      payload: {
        recipe: res.data
      }
    })

  } catch (err) {
    dispatch({
      type: ACTION.UPDATE.BY.RECIPE.ID.FAIL,
      payload: {
        error: {
          message: err.response.data.message
        }
      }
    })
  }
}

const deleteByRecipeId = (recipe_id) => async dispatch => {
  dispatch({
    type: ACTION.DELETE.BY.RECIPE.ID.START
  })

  try {
    const res = await axios().delete(`/recipes/${recipe_id}`);
    dispatch({
      type: ACTION.DELETE.BY.RECIPE.ID.SUCCESS,
      payload: {
        recipe_id: res.data
      }
    })
  } catch (err) {
    dispatch({
      type: ACTION.DELETE.BY.RECIPE.ID.FAIL,
      payload: {
        error: {
          message: err.response.data.message
        }
      }
    })
  }
}

const comment = ({recipe_id, user_id, text = ''}) => async dispatch => {
  dispatch({
    type: ACTION.CREATE.COMMENT.START
  })

  try {
    const res = await axios().post('/recipe_comments', {recipe_id, user_id, text});
    dispatch({
      type: ACTION.CREATE.COMMENT.SUCCESS,
      payload: {
        recipe_comment: res.data
      }
    })
  } catch (err) {
    dispatch({
      type: ACTION.CREATE.COMMENT.FAIL,
      payload: {
        error: {
          message: err.response.data.message
        }
      }
    })
  }
}

const deleteComment = (recipe_comment_id) => async dispatch => {
  dispatch({
    type: ACTION.DELETE.COMMENT.START
  })

  try {
    const res = await axios().delete(`/recipe_comments/${recipe_comment_id}`);
    dispatch({
      type: ACTION.DELETE.COMMENT.SUCCESS,
      payload: {
        recipe_comment_id: res.data.recipe_comment_id
      }
    })
  } catch (err) {
    dispatch({
      type: ACTION.DELETE.COMMENT.FAIL,
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
  create,
  updateByRecipeId,
  deleteByRecipeId,
  comment,
  deleteComment
}