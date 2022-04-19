// components
import { Grid } from "../../components";

// icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// hooks
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

// utils
import { getDurationText } from "../../utils";
import { Typography } from "@mui/material";

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
  
  const { 
    name,
    prep_duration,
    cook_duration,
    recipe_likes,
    difficulty,
    servings,
    recipe_ingredients,
    recipe_steps,
    recipe_tags,
    user
  } = recipe;

  

  return (
  <Grid
    padding="1rem"
    border="1px solid black"
    borderRadius="5px"
  >
    <Grid
      direction="column wrap"
      gap="1rem"
    >
      <Grid
        align="center"
        gap="1rem"
      >
        <AccountCircleIcon/>
        <p>@{user.username}</p>
      </Grid>

      <Grid
        align="center"
        gap="1rem"
      >

        <h4>{name}</h4> 

        <button
          onClick={() => {
            router.push(`/${user.username}/recipes/${recipe.recipe_id}`);
          }}
        >{'>'}</button>
      </Grid>
    
      <p>difficulty: {difficulty}</p>
      <p>servings: {servings}</p>
      <p>ingredients: {recipe_ingredients.length}</p>
      <p>steps: {recipe_steps.length}</p>
    </Grid>
    
    <Grid
      width="100%"
      direction="column wrap"
    >
      
      <Grid
        gap="1rem"
        border=".1rem solid black"
        borderRadius="5px"
        padding="1rem"
        align="center"
      >
        <Grid
          width="100%"
          justify="center"
        >
          <p>Duration</p>
        </Grid>
        
        <Grid
          width="100%"
          justify="center"
          gap="1rem"
        >
        
          <Grid
            direction="column wrap"
            align="center"
          >
            <p>PREP</p>
            <p>{`${getDurationText(prep_duration)}`}</p>
          </Grid>
          
          <Grid
            direction="column wrap"
            align="center"

          >
            <p>COOK</p>
            <p>{`${getDurationText(cook_duration)}`}</p>
          </Grid>

        </Grid>

      </Grid>
    
    </Grid>

    <Grid
      align="center"
      gap=".5rem"
    >      
      {new Set(recipe_likes.map(rp_like => rp_like.user.user_id)).has(auth.user.user_id) ? <FavoriteIcon/> : <FavoriteBorderIcon/>} 
      <p>{recipe_likes.length} </p>
    </Grid>
    
    <Grid
      width="100%"
      gap="1rem"
    >

      {recipe_tags.map(rp_tag => {
        return (
        <Grid
          key={rp_tag.recipe_tag_id}
          bgColor="#1976d2"
          color="white"
          borderRadius="5px"
          padding="0 .5rem"
        >
          <Typography>
            #{rp_tag.tag.text}
          </Typography>
        </Grid>
        )
      })}
    </Grid>

  </Grid>
  )
}