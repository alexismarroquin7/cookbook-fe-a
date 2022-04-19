import { axiosInstance as axios } from "../../utils"

const ACTION = {
  LOGIN: {
    START: "AUTH__LOGIN--START",
    SUCCESS: "AUTH__LOGIN--SUCCESS",
    FAIL: "AUTH__LOGIN--FAIL"
  }
}

const login = ({ email, password }) => async dispatch => {
  dispatch({
    type: ACTION.LOGIN.START
  })
  
  try {
    const res = await axios().post('/auth/login', {email, password});
    dispatch({
      type: ACTION.LOGIN.SUCCESS,
      payload: {
        user: res.data.user,
        token: res.data.token
      }
    })
  } catch (err) {
    dispatch({
      type: ACTION.LOGIN.FAIL,
      payload: {
        error: {
          message: err.response.data.message
        }
      }
    })
  }
}

export const AuthAction = {
  ACTION,
  login
}