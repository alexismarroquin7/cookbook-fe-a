import { axiosInstance as axios } from "../../utils";

export const ACTION = {
  FIND: {
    BY: {
      USERNAME: {
        START: "USER__FIND__BY__USERNAME--START",
        SUCCESS: "USER__FIND__BY__USERNAME--SUCCESS",
        FAIL: "USER__FIND__BY__USERNAME--FAIL"
      }
    }
  }
};

const findByUsername = (username) => async dispatch => {
  dispatch({
    type: ACTION.FIND.BY.USERNAME.START
  })

  try {
    const res = await axios().get('/users');
    const [user] = res.data.filter(u => u.username === username);
    
    if(!user){
      throw Error('user does not exist');
    }

    dispatch({
      type: ACTION.FIND.BY.USERNAME.SUCCESS,
      payload: {
        user
      }
    })
  } catch (err) {
    dispatch({
      type: ACTION.FIND.BY.USERNAME.FAIL,
      payload: {
        error: {
          message: err.response ? err.response.data.message : err.message
        }
      }
    })
  }
}

export const UserAction = {
  ACTION,
  findByUsername
}