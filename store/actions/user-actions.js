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
  },
  CREATE: {
    FOLLOW: {
      START: "USER__CREATE__FOLLOW--START",
      SUCCESS: "USER__CREATE__FOLLOW--SUCCESS",
      FAIL: "USER__CREATE__FOLLOW--FAIL"
    }
  },
  DELETE: {
    FOLLOW: {
      BY: {
        USER_FOLLOWER: {
          ID: {
            START: "USER__DELETE__FOLLOW__BY__USER_FOLLOW__ID--START",
            SUCCESS: "USER__DELETE__FOLLOW__BY__USER_FOLLOW__ID--SUCCESS",
            FAIL: "USER__DELETE__FOLLOW__BY__USER_FOLLOW__ID--FAIL"
          }
        }
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

const deleteFollowByUserFollowerId = user_follower_id => async dispatch => {
  dispatch({
    type: ACTION.DELETE.FOLLOW.BY.USER_FOLLOWER.ID.START
  })

  try {
    const res = await axios().delete(`/user_followers/${user_follower_id}`);
    
    dispatch({
      type: ACTION.DELETE.FOLLOW.BY.USER_FOLLOWER.ID.SUCCESS,
      payload: {
        user_follower: res.data
      }
    })
  } catch (err) {
    dispatch({
      type: ACTION.DELETE.FOLLOW.BY.USER_FOLLOWER.ID.FAIL,
      payload: {
        error: {
          message: err.response.data.message
        }
      }
    })
  }
}

const follow = ({ follower_id, user_id }) => async dispatch => {
  dispatch({
    type: ACTION.CREATE.FOLLOW.START
  })
  
  try {
    const res = await axios().post('/user_followers', {follower_id, user_id});
    
    dispatch({
      type: ACTION.CREATE.FOLLOW.SUCCESS,
      payload: {
        user_follower: res.data
      }
    })
    
  } catch (err) {
    dispatch({
      type: ACTION.CREATE.FOLLOW.FAIL,
      payload: {
        error: {
          message: err.response.data.message
        }
      }
    })

  }
}

export const UserAction = {
  ACTION,
  findByUsername,
  deleteFollowByUserFollowerId,
  follow
}