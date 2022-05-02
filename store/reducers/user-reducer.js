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
    user_id: null,
    display_name: "",
    username: "",
    email: "",
    followers: [],
    following: [],
    role: {
      role_id: null,
      name: ''
    }
  },
  feed: {
    home: {
      recipes: []
    },
    activity: {
      list: []
    }
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
    case ACTION.DELETE.FOLLOW.BY.USER_FOLLOWER.ID.START:
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
    case ACTION.DELETE.FOLLOW.BY.USER_FOLLOWER.ID.SUCCESS:
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
        item: {
          ...state.item,
          followers: state.item.followers.filter(f => f.user_follower_id !== payload.user_follower.user_follower_id)
        }
      }
    case ACTION.DELETE.FOLLOW.BY.USER_FOLLOWER.ID.FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.error,
            message: payload.error.message
          }
        }
      }

    case ACTION.CREATE.FOLLOW.START:
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
    case ACTION.CREATE.FOLLOW.SUCCESS:
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
        item: {
          ...state.item,
          followers: [
            ...state.item.followers,
            payload.user_follower
          ]
        }
      }
    case ACTION.CREATE.FOLLOW.FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.error,
            message: payload.error.message
          }
        }
      }

    case ACTION.GET.FEED.HOME.START:
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
      
    case ACTION.GET.FEED.HOME.SUCCESS:
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
        feed: {
          ...state.feed,
          home: {
            ...state.feed.home,
            ...payload.homeFeed
          },
          
        }
      }
      
    case ACTION.GET.FEED.HOME.FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.error,
            message: payload.error.message
          }
        }
      }
      
    case ACTION.GET.FEED.ACTIVITY.START:
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
    case ACTION.GET.FEED.ACTIVITY.SUCCESS:
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
        feed: {
          ...state.feed,
          activity: {
            ...state.feed.activity,
            list: payload.activityFeed
          }
        }
      }
    case ACTION.GET.FEED.ACTIVITY.FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.error,
            message: payload.error.message
          }
        }
      }

    default:
      return state;
  }
}