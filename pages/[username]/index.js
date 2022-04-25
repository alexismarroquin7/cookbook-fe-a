
// components
import { Section, Grid } from "../../components";

// store
import { RecipeAction, UserAction } from "../../store";

// utils
import { getDurationText } from "../../utils";


// icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// hooks
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useToggle } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Modal, Typography } from "@mui/material";
import { 
  Person as PersonIcon,
  Check as CheckIcon
} from '@mui/icons-material';

export default function UserProfile () {

  const router = useRouter();
  
  const dispatch = useDispatch();

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
  
  const {
    active: activeUnfollowModal,
    toggleActive: toggleActiveUnfollowModal
  } = useToggle();
  
  return (
  <Section>
    {router.query.username &&
    user.item.user_id !== null && (
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
          justify="center"
        >
          
          <AccountCircleIcon/>
          

          <Grid
            direction="column wrap"
            gap="1rem"
          >
            <Grid
              width="100%"
              align="center"
              justify="space-between"
              gap="1rem"
            >
              <Typography
                variant="h6"
              >{user.item.username}</Typography>
              {auth.user.user_id && auth.user.username !== user.item.username && (
                <Grid>
                  {(new Set(
                      user.item.followers
                      .map(follower => follower.follower.follower_id)
                    )
                    .has(auth.user.user_id) === false
                  ? ( 
                    <Button
                      variant="contained"
                      onClick={() => {
                        if(!auth.user.user_id) return;
                        dispatch(UserAction.follow({follower_id: auth.user.user_id, user_id: user.item.user_id }));
                      }}
                    >FOLLOW</Button>
                  ) : (
                    <Grid>
                      <Button
                        variant="contained"
                        onClick={() => {
                          toggleActiveUnfollowModal();
                        }}
                      >
                        <PersonIcon/>
                        <CheckIcon/>
                      </Button>
                      
                      <Modal
                        open={activeUnfollowModal}
                        onClose={toggleActiveUnfollowModal}
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '50%',
                            bgcolor: 'background.paper',
                            borderRadius: '5px',
                            boxShadow: 24,
                            p: '1rem',
                            display: 'flex',
                            flexFlow: 'column wrap',
                            gap: '1rem'
                          }}
                        >
                          <Grid
                            direction="row wrap"
                            align="center"
                            gap=".1rem"
                          >
                            <Typography>Are you sure you want to unfollow</Typography>
                            <Typography color="error">@{user.item.username}</Typography>
                            <Typography>?</Typography>
                          </Grid>

                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                              const [user_follower] = user.item.followers.filter(item => item.follower.follower_id === auth.user.user_id);
                              dispatch(UserAction.deleteFollowByUserFollowerId(user_follower.user_follower_id));
                              toggleActiveUnfollowModal();
                            }}
                          >Unfollow</Button>
                          
                          <Button
                            variant="outlined"
                            onClick={toggleActiveUnfollowModal}
                          >Cancel</Button>
                        
                        </Box>
                      
                      </Modal>
                    
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
            
            <Grid
              gap="1rem"
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
              variant="body1"
            >{user.item.display_name}</Typography>
          </Grid>
        </Grid>
        
      </Grid>
    )}

    <Grid
      width="100%"
      direction="column wrap"
    >
      <Grid
        width="100%"
        justify="space-between"
        align="center"
      >
        <h3>Recipes</h3>
        
        {auth.user.user_id && auth.user.username === user.item.username && (
          <Button
            variant="outlined"
            onClick={() => {
              router.push(`/${user.item.username}/new/recipe`);
            }}
          >+</Button>
        )}
      
      </Grid>
      
      <Grid
        width="100%"
        direction="column wrap"
        gap="1rem"
      >
        {recipe.list.map(rp => {
          return (
          <Grid
            key={rp.recipe_id}
            width="100%"
            direction="column wrap"
            border="1px solid black"
            padding="1rem"
            borderRadius="5px"
          >
            <Grid
              width="100%"
              justify="space-between"
              align="center"
            >
              <h3>{rp.name}</h3>
              <button
                onClick={() => {
                  router.push(`/${rp.user.username}/recipes/${rp.recipe_id}`);
                }}
              >{'>'}</button>
            </Grid>

            <p>{rp.cuisine_type.name}</p>
            
            <p>{rp.description}</p>
            
            <Grid
              width="100%"
              justify="space-around"
            >
              <Grid
                direction="column wrap"
                align="center"
              >
                <h4>PREP</h4>
                <p>{getDurationText(rp.prep_duration)}</p>
              </Grid>
              
              <Grid
                direction="column wrap"
                align="center"
              >
                <h4>COOK</h4>
                <p>{getDurationText(rp.cook_duration)}</p>
              </Grid>
            </Grid>
            
            <Grid
              width="100%"
              justify="space-around"
            >
              <Grid
                direction="column wrap"
                align="center"
              >
                <h4>SERVINGS</h4>
                <p>{rp.servings}</p>
              </Grid>
              
              <Grid
                direction="column wrap"
                align="center"
              >
                <h4>DIFFICULTY</h4>
                <p>{rp.difficulty.toUpperCase()}</p>
              </Grid>
            </Grid>

            <Grid
              width="100%"
              justify="space-around"
            >
              <Grid
                direction="column wrap"
              >
                <h4>INGREDIENTS</h4>
                <p>{rp.recipe_ingredients.length}</p>
              </Grid>
              
              <Grid
                direction="column wrap"
              >
                <h4>STEPS</h4>
                <p>{rp.recipe_steps.length}</p>
              </Grid>
            </Grid>
            
            <Grid
              gap=".5rem"
              align="center"
            >
              
              {rp.recipe_likes && new Set(rp.recipe_likes.map(rp_like => rp_like.user.user_id)).has(auth.user.user_id) ? (
                <FavoriteIcon 
                  style={{
                    color: "#fb3958"
                  }}
                  onClick={() => {
                    if(!auth.user.user_id) return;
                    const [ recipe_like ] = rp.recipe_likes.filter(rp_like => rp_like.user.user_id === auth.user.user_id);
                    dispatch(RecipeAction.removeLike(recipe_like.recipe_like_id));
                  }}
                />
              
              ) : (
                <FavoriteBorderIcon
                  style={{
                    color: "#fb3958"
                  }}
                  
                  onClick={() => {
                    if(!auth.user.user_id) return;
                    dispatch(RecipeAction.like({
                      user_id: auth.user.user_id,
                      recipe_id: rp.recipe_id
                    }));
                  }}
                />
              
              )}
              
              <p>{rp.recipe_likes.length} {`like${rp.recipe_likes.length === 1 ? '' : 's'}`}</p>
            </Grid>

            <Grid
              width="100%"
              gap="1rem"
            >
              {rp.recipe_tags.map(rp_tag => {
                return <Grid
                  key={rp_tag.recipe_tag_id}
                  bgColor="#1976d2"
                  color="white"
                  padding="0 .5rem"
                  borderRadius="5px"
                >
                  <Typography
                    variant="body1"
                  >#{rp_tag.tag.text}</Typography>
                </Grid>
              })}
            </Grid>

          </Grid>
          )
        })}
      </Grid>

    </Grid>
    
  </Section>
  )
}
