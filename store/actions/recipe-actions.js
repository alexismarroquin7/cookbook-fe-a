import { axiosInstance as axios } from "../../utils";

const ACTION = {
  FIND: {
    ALL: {
      START: "RECIPE__FIND__ALL--START",
      SUCCESS: "RECIPE__FIND__ALL--SUCCESS",
      FAIL: "RECIPE__FIND__ALL--FAIL"
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

export const RecipeAction = {
  ACTION,
  findAll
}