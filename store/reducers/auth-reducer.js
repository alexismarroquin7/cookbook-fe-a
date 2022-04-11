import { AuthAction } from "../actions"

const { ACTION } = AuthAction;

const initialState = {
  status: {
    loading: false,
    error: {
      message: ''
    }
  },
  loggedIn: false,
  user: {},
  token: ''
}

export const AuthReducer = (state = initialState, action) => {
  switch(action.type){
    case ACTION.LOGIN.START:
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
    case ACTION.LOGIN.SUCCESS:
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
        user: action.payload.user,
        token: action.payload.token,
        loggedIn: true
      }
    case ACTION.LOGIN.FAIL:
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