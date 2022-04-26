
// components
import { Section, Grid } from "../../components";

// store
import { RecipeAction, UserAction } from "../../store";

// icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// hooks
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useToggle } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { Button, Tab, Tabs, Typography } from "@mui/material";

import { 
  Person as PersonIcon,
  Check as CheckIcon
} from '@mui/icons-material';

import { RecipeList } from "../../widgets/RecipeList";
import { UnfollowUserModal } from "../../widgets";

export default function UserProfile () {

  const router = useRouter();
  
  const dispatch = useDispatch();

  const [tabIndex] = useState(0);

  const { user, recipe, auth } = useSelector(({user, recipe, auth}) => {
    return {
      user,
      recipe,
      auth
    }
  });

  useEffect(() => {
    if(!router.query.username) return;
    dispatch(UserAction.findByUsername(router.query.username));
    dispatch(RecipeAction.findByUserUsername(router.query.username));
  }, [dispatch, router.query.username])

  const [ownedByUser, setOnwedByUser] = useState(false);
  const [alreadyFollowing, setAlreadyFollowing] = useState(false);

  useEffect(() => {
    
    setOnwedByUser(auth.user.username === user.item.username);
    const follower_user_ids = new Set(user.item.followers.map(follower => follower.follower.user_id));
    setAlreadyFollowing(follower_user_ids.has(auth.user.user_id));
  
  }, [auth.user, user.item]);

  const {
    active: activeUnfollowModal,
    toggleActive: toggleActiveUnfollowModal
  } = useToggle();
  
  return (
  <Section>
    {user.item.user_id !== null && (
      <Grid
        width="100%"
        direction="column wrap"
        align="center"
        gap="1rem"
      >

        <Grid
          width="100%"
          gap="1rem"
          align="center"
          justify="space-between"
        >
          
          <AccountCircleIcon
            sx={{fontSize: "6rem"}}
          />
          

          <Grid
            direction="column wrap"
            gap="1rem"
          >
            <Grid
              align="center"
              gap="1rem"
            >
              <Typography
                variant="h6"
              >{user.item.username}</Typography>
              
              {ownedByUser && (
                <Grid>
                  <button>Edit</button>
                </Grid>
              )}
            
              {!ownedByUser && alreadyFollowing === false && ( 
                <Button
                  variant="contained"
                  sx={{
                    p: ".1rem .5rem"
                  }}
                  onClick={() => {
                    if(!auth.user.user_id) return;
                    dispatch(UserAction.follow({follower_id: auth.user.user_id, user_id: user.item.user_id }));
                    setAlreadyFollowing(true);
                  }}
                >FOLLOW</Button>
              )}
              
              {!ownedByUser && alreadyFollowing === true && ( 
                <Grid>
                  <Button
                    variant="outlined"
                    sx={{
                      p: ".1rem .5rem"
                    }}
                    onClick={() => {
                      toggleActiveUnfollowModal();
                    }}
                  >
                    <PersonIcon/>
                    <CheckIcon/>
                  </Button>
                  
                  <UnfollowUserModal open={activeUnfollowModal} onClose={toggleActiveUnfollowModal} />
                
                </Grid>
              )}

            </Grid>
            
            <Grid
              width="100%"
              // gap="1rem"
              justify="space-between"
            >
              <Grid
                direction="column wrap"
                align="center"
              >
                <Typography
                  variant="caption"
                >RECIPES</Typography>
                <Typography
                  variant="body1"
                >{recipe.list.length}</Typography>
              </Grid>

              <Grid
                direction="column wrap"
                align="center"
                onClick={() => {
                  const {username} = router.query;
                  router.push(`/${username}/followers`)
                }}
              >
                <Typography
                  variant="caption"
                >FOLLOWERS</Typography>
                <Typography
                  variant="body1"
                >{user.item.followers.length}</Typography>
              </Grid>
              
              <Grid
                direction="column wrap"
                align="center"
                onClick={() => {
                  const {username} = router.query;
                  router.push(`/${username}/following`)
                }}
              >
                <Typography
                  variant="caption"
                >FOLLOWING</Typography>
                <Typography
                  variant="body1"
                >{user.item.following.length}</Typography>
              </Grid>
              
            </Grid>
            
            
            <Typography
              variant="h6"
            >{user.item.display_name}</Typography>

            <Typography
              variant="body1"
            >{user.item.bio}</Typography>

          </Grid>
        </Grid>
        
        <Tabs
          value={tabIndex}
          sx={{
            width: "100%"
          }}
        >
          <Tab 
            label="Recipes"
          />
        </Tabs>

        {tabIndex === 0 && (
        <Grid
          width="100%"
          direction="column wrap"
        >
          {
            Array.isArray(recipe.list) && 
            recipe.list.length > 0 &&
            <RecipeList recipes={recipe.list} />
          }
        </Grid>
        )}
      
      </Grid>
    )}

    
    
  </Section>
  )
}
