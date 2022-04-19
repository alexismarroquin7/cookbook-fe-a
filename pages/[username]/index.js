
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
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../hooks";
import { Button, Typography } from "@mui/material";

export default function UserProfile () {

  const router = useRouter();
  
  const dispatch = useDispatch();
  
  const [storedUser] = useLocalStorage('user', { user_id: null });
  

  const { user, recipe } = useSelector(({user, recipe}) => {
    return {
      user,
      recipe
    }
  });

  useEffect(() => {
    if(!router.query.username) return;
    dispatch(UserAction.findByUsername(router.query.username));
    dispatch(RecipeAction.findByUserUsername(router.query.username));
  }, [dispatch, router.query.username])

  useEffect(() => {
    console.log('storedUser', storedUser);
  }, [storedUser])

  return (
  <Section>
    {user.item.user_id !== null && (
      <Grid
        align="center"
      >
        <AccountCircleIcon/>
        <p>@{user.item.username}</p>
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
        
        {typeof window !== 'undefined' && storedUser.username === user.item.username && (
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
              
              {new Set(rp.recipe_likes.map(rp_like => rp_like.user.user_id)).has(storedUser.user_id) ? (
                <FavoriteIcon 
                  style={{
                    color: "#fb3958"
                  }}
                  onClick={() => {
                    if(!storedUser.user_id) return;
                    const [ recipe_like ] = rp.recipe_likes.filter(rp_like => rp_like.user.user_id === storedUser.user_id);
                    dispatch(RecipeAction.removeLike(recipe_like.recipe_like_id));
                  }}
                />
              
              ) : (
                <FavoriteBorderIcon
                  style={{
                    color: "#fb3958"
                  }}
                  
                  onClick={() => {
                    if(!storedUser.user_id) return;
                    dispatch(RecipeAction.like({
                      user_id: storedUser.user_id,
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