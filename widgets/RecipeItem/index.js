// components
import { Grid } from "../../components";

// icons
import { 
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Comment as CommentIcon
} from '@mui/icons-material';

// hooks
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

// utils
import { getDurationText } from "../../utils";
import { Paper, Typography } from "@mui/material";

export const RecipeItem = ({recipe}) => {
  const router = useRouter();

  const {
    auth
  } = useSelector(s => {
    return {
      auth: {
        loggedIn: s.auth.loggedIn,
        user: {
          user_id: s.auth.user.user_id
        }
      }
    }
  })

  return (
  <Paper
    elevation={2}
  >
    <Grid  
      width="100%"
      direction="column wrap"
      padding="1rem"
      borderRadius="5px"
    >

      <Grid
        width="100%"
        justify="space-between"
        align="center"
      >
        <Typography
          variant="h6"
        >{recipe.name}</Typography>
        <button
          onClick={() => {
            router.push(`/${recipe.user.username}/recipes/${recipe.recipe_id}`);
          }}
        >{'>'}</button>
      </Grid>

      <p>@{recipe.user.username}</p>

      <p>{recipe.cuisine_type.name}</p>
      
      <p>{recipe.description}</p>
      
      <Grid
        width="100%"
        justify="space-around"
      >
        <Grid
          direction="column wrap"
          align="center"
        >
          <h4>PREP</h4>
          <p>{getDurationText(recipe.prep_duration)}</p>
        </Grid>
        
        <Grid
          direction="column wrap"
          align="center"
        >
          <h4>COOK</h4>
          <p>{getDurationText(recipe.cook_duration)}</p>
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
          <p>{recipe.servings}</p>
        </Grid>
        
        <Grid
          direction="column wrap"
          align="center"
        >
          <h4>DIFFICULTY</h4>
          <p>{recipe.difficulty.toUpperCase()}</p>
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
          <p>{recipe.recipe_ingredients.length}</p>
        </Grid>
        
        <Grid
          direction="column wrap"
        >
          <h4>STEPS</h4>
          <p>{recipe.recipe_steps.length}</p>
        </Grid>
      </Grid>
      
      <Grid
        gap=".5rem"
        align="center"
      >
        
        {recipe.recipe_likes && new Set(recipe.recipe_likes.map(rp_like => rp_like.user.user_id)).has(auth.user.user_id) ? (
          <FavoriteIcon 
            style={{
              color: "#fb3958"
            }}
            onClick={() => {
              if(!auth.user.user_id) return;
              const [ recipe_like ] = recipe.recipe_likes.filter(rp_like => rp_like.user.user_id === auth.user.user_id);
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
                recipe_id: recipe.recipe_id
              }));
            }}
          />
        )}
        
        <p>{recipe.recipe_likes.length} {`like${recipe.recipe_likes.length === 1 ? '' : 's'}`}</p>
      </Grid>

      <Grid
        align="center"
        gap=".5rem"
      >
        <CommentIcon />
        <p>{recipe.recipe_comments.length} comments</p>
      </Grid>

      <Grid
        width="100%"
        gap="1rem"
      >
        {recipe.recipe_tags.map(rp_tag => {
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
  </Paper>
  )
}