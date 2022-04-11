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
    console.log('res', res);
    dispatch({
      type: ACTION.FIND.ALL.SUCCESS
    });
    
  } catch (err) {
    console.log('err', err);
    dispatch({
      type: ACTION.FIND.ALL.FAIL
    });
    
  }
}

export const RecipeAction = {
  ACTION,
  findAll
}