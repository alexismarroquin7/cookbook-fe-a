import { UserAction } from "../actions";

const { ACTION } = UserAction;

const initialState = {
  status: {
    loading: false,
    error: {
      message: ''
    }
  },
  list: [],
  item: {
    user_id: null
  }
}

export const UserReducer = (state = initialState, { type, payload }) => {
  switch(type){
    case ACTION.FIND.BY.USERNAME.START:
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
    case ACTION.FIND.BY.USERNAME.SUCCESS:
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
        item: payload.user
      }
    case ACTION.FIND.BY.USERNAME.FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.error,
            message: payload.error.message
          }
        },
      }

    default:
      return state;
  }
}