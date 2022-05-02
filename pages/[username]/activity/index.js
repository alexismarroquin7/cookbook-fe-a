import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Section, Grid } from "../../../components";
import { UserAction } from "../../../store/actions";
import { v4 as uuid } from "uuid";
import Link from "next/link";
import { 
  AccountCircle as AccountCircleIcon,
  Circle as CircleIcon
} from "@mui/icons-material";

export default function UserActivity () {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { user, auth } = useSelector(({user, auth}) => {
    return {
      auth,
      user,
    };
  });

  useEffect(() => {
    if(!auth.loggedIn) return;
    dispatch(UserAction.getActivityFeed(auth.user.user_id));
  }, [dispatch, auth.user.user_id, auth.loggedIn]);

  return (
  <Section>
    <Grid
      direction="column wrap"
      width="100%"
    >
      {user.feed.activity.list.map((act, i) => {
        
        switch(act.type){
          case 'recipe_like':
          return (
            <Grid
              key={uuid()}
              width="100%"
              justify="space-between"
              align="center"
            >

              {i !== 0 && <Grid width="100%" border="1px solid black"></Grid>}
              
              <Grid
                align="center"
                gap=".2rem"
              >

                <AccountCircleIcon />

                <Link
                  href={`/${act.user.username}`}
                >
                  <a
                    style={{
                      fontWeight: "bold"
                    }}
                  >{act.user.username}</a>
                </Link>
                
                <p>
                  liked your recipe
                </p>

              </Grid>

              {act.read === false && (
                <CircleIcon
                  sx={{color: 'red'}}
                />
              )}
            </Grid>
          )
          case 'recipe_comment':
          return (
            <Grid
              key={uuid()}
              width="100%"
              justify="space-between"
              align="center"
            >
              {i !== 0 && <Grid width="100%" border="1px solid black"></Grid>}

              <Grid
                align="center"
                gap=".2rem"
              >
                
                <AccountCircleIcon />

                <Link
                  href={`/${act.user.username}`}
                >
                  <a
                    style={{
                      fontWeight: "bold"
                    }}
                  >{act.user.username}</a>
                </Link>
                
                <p>
                  commented on your recipe
                </p>

              </Grid>
            
              {!act.read && <CircleIcon 
                sx={{color: 'red'}}
              />}
            
            </Grid>
          )
          default:
          throw Error(`unknow activity type ${act.type}`)
        }
      })}
    </Grid>
  </Section>
  )
}