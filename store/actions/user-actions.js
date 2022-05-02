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
  },
  GET: {
    FEED: {
      HOME: {
        START: "USER__GET__FEED__HOME--START",
        SUCCESS: "USER__GET__FEED__HOME--SUCCESS",
        FAIL: "USER__GET__FEED__HOME--FAIL"
      },
      ACTIVITY: {
        START: "USER__GET__FEED__ACTIVITY--START",
        SUCCESS: "USER__GET__FEED__ACTIVITY--SUCCESS",
        FAIL: "USER__GET__FEED__ACTIVITY--FAIL"
      }
    }
  },
  MARK: {
    RECIPE_LIKE: {
      AS: {
        READ: {
          START: "USER__MARK__RECIPE_LIKE__AS__READ--START",
          SUCCESS: "USER__MARK__RECIPE_LIKE__AS__READ--SUCCESS",
          FAIL: "USER__MARK__RECIPE_LIKE__AS__READ--FAIL",
        }
      }
    },
    RECIPE_COMMENT: {
      AS: {
        READ: {
          START: "USER__MARK__RECIPE_COMMENT__AS__READ--START",
          SUCCESS: "USER__MARK__RECIPE_COMMENT__AS__READ--SUCCESS",
          FAIL: "USER__MARK__RECIPE_COMMENT__AS__READ--FAIL",
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

const getHomeFeed = (user_id) => async dispatch => {
  dispatch({
    type: ACTION.GET.FEED.HOME.START
  });
  
  try {
    const res = await axios().get(`/users/${user_id}/feed/home`);
    dispatch({
      type: ACTION.GET.FEED.HOME.SUCCESS,
      payload: {
        homeFeed: res.data
      }
    });
  } catch (err) {
    dispatch({
      type: ACTION.GET.FEED.HOME.FAIL,
      payload: {
        error: {
          message: err.response.data.message
        }
      }
    });
  }
}

const getActivityFeed = (user_id) => async dispatch => {
  dispatch({
    type: ACTION.GET.FEED.ACTIVITY.START
  });
  
  try {
    const res = await axios().get(`/users/${user_id}/feed/activity`);
    
    let activities = [
      ...res.data.recipe_likes.map(it => {
        return {
          ...it,
          type: 'recipe_like'
        }
      }),
      ...res.data.recipe_comments.map(it => {
        return {
          ...it,
          type: 'recipe_comment'
        }
      })
    ];

    activities = activities.sort((a, b) => b.created_at - a.created_at);

    dispatch({
      type: ACTION.GET.FEED.ACTIVITY.SUCCESS,
      payload: {
        activityFeed: activities
      }
    });
  } catch (err) {
    dispatch({
      type: ACTION.GET.FEED.ACTIVITY.FAIL,
      payload: {
        error: {
          message: err.response.data.message
        }
      }
    });
  }
}

const markRecipeLikeAsRead = (recipe_like_id) => async dispatch => {
  dispatch({
    type: ACTION.MARK.RECIPE_LIKE.AS.READ.START
  })

  try {
    const res = await axios().put(`/recipe_likes/${recipe_like_id}`, { read: true });

    dispatch({
      type: ACTION.MARK.RECIPE_LIKE.AS.READ.SUCCESS,
      payload: {
        recipe_like: res.data
      }
    })

  } catch (err) {
    dispatch({
      type: ACTION.MARK.RECIPE_LIKE.AS.READ.FAIL,
      payload: {
        error: {
          message: err.response.data.message
        }
      }
    })
  }
}

const markRecipeCommentAsRead = (recipe_comment_id) => async dispatch => {
  dispatch({
    type: ACTION.MARK.RECIPE_COMMENT.AS.READ.START
  })

  try {
    const res = await axios().put(`/recipe_comments/${recipe_comment_id}`, { read: true });

    dispatch({
      type: ACTION.MARK.RECIPE_COMMENT.AS.READ.SUCCESS,
      payload: {
        recipe_comment: res.data
      }
    })

  } catch (err) {
    dispatch({
      type: ACTION.MARK.RECIPE_COMMENT.AS.READ.FAIL,
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
  follow,
  getHomeFeed,
  getActivityFeed,
  markRecipeLikeAsRead,
  markRecipeCommentAsRead
}