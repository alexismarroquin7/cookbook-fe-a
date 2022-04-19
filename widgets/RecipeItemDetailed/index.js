import { Grid } from "../../components";
import { Fraction } from "fractional";

// icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// utils
import { getDurationText } from "../../utils";

// hooks
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { RecipeAction } from "../../store";
import { Typography } from "@mui/material";

const initialHidden = {
  ingredients: true,
  steps: true
}

export const RecipeItemDetailed = ({ recipe }) => {
  const {
    name,
    description,
    recipe_steps,
    recipe_ingredients,
    recipe_likes,
    servings,
    difficulty,
    prep_duration,
    cook_duration,
    user,
    recipe_tags
  } = recipe;

  const [ storedUser ] = useLocalStorage('user', { user_id: null });

  const [hidden, setHidden] = useState(initialHidden);
  
  const dispatch = useDispatch();

  const toggleHidden = (key) => setHidden({
    ...hidden,
    [key]: !hidden[key]
  });

  return (
  <Grid
    width="100%"
    direction="column wrap"
  >

    <Grid
      width="100%"
      justify="space-between"
      align="center"
    >
      <h3>{name}</h3>
      {user.user_id === storedUser.user_id && (
        <button>Edit</button>
      )}
    </Grid>

    
    <Grid
      gap="1rem"
      align="center"
    >
      <AccountCircleIcon/>
        <a
          href={`/${user.username}`}
          style={{
            textDecoration: 'underline'
          }}
        >@{user.username}</a>
    </Grid>
    
    
    <Grid
      gap=".5rem"
      align="center"
    >
      
      {new Set(recipe_likes.map(rp_like => rp_like.user.user_id)).has(storedUser.user_id) ? (
        <FavoriteIcon 
          style={{
            color: "#fb3958"
          }}
          onClick={() => {
            const [ recipe_like ] = recipe_likes.filter(rp_like => rp_like.user.user_id === storedUser.user_id);
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
              recipe_id: recipe.recipe_id
            }));
          }}
        />
      
      )}
      
      <p>{recipe_likes.length} {`like${recipe_likes.length === 1 ? '' : 's'}`}</p>
    </Grid>
    
    {description && <p>{description}</p>}
    
    <Grid
      width="100%"
      justify="space-around"
      gap="1rem"
    >
      <Grid
        direction="column wrap"
        align="center"
      >
        <h4>PREP</h4>
        <p>{getDurationText(prep_duration)}</p>
      </Grid>
      
      <Grid
        direction="column wrap"
        align="center"
      >
        <h4>COOK</h4>
        <p>{getDurationText(cook_duration)}</p>
      </Grid>

    </Grid>
    
    <Grid
      width="100%"
      justify="space-around"
      gap="1rem"
    >
      <Grid
        direction="column wrap"
        align="center"
      >
        <h4>{`SERVING${servings === 1 ? '' : 'S'}`}</h4>
        <p>{servings}</p> 
      </Grid>

      <Grid
        direction="column wrap"
        align="center"
      >
        <h4>DIFFICULTY</h4>
        <p>{difficulty.toUpperCase()}</p>
      </Grid>
    </Grid>

    <Grid
      width="100%"
    >
      
        
      <Grid
        width="100%"
        justify="space-between"
      >
        <Grid
          align="center"
          gap="1rem"
        >
          <button
            style={{
              backgroundColor: "white",
              border: '0',
              fontSize: '1.5rem',
              transform: `rotate(${hidden.ingredients ? '0' : '-45'}deg)`,
              transition: '.2s'
            }}
            onClick={() => {
              toggleHidden('ingredients');
            }}
          >+</button>
          <h4>Ingredients</h4>
        </Grid>

        <h4>{recipe_ingredients.length}</h4>
      </Grid>

      
      {!hidden.ingredients && (
        <ul
          style={{
            display: "flex",
            flexFlow: "column wrap",
            gap: "1rem"
          }}
        >
          {recipe_ingredients.map(rp_ing => {
            return (
            <Grid
              key={rp_ing.recipe_ingredient_id}
            >
              <li>{new Fraction(rp_ing.quantity).toString()} {rp_ing.measurement_unit.name} {rp_ing.ingredient.name}</li>
            </Grid>
            )
          })}
        </ul>
      )}
    </Grid>

    <Grid
      width="100%"
      justify="space-between"
      align="center"
    >
      <Grid
        gap="1rem"
        align="center"
      >
        <button
          style={{
            backgroundColor: 'white',
            border: '0',
            fontSize: '1.5rem',
            transform: `rotate(${hidden.steps ? '0' : '-45'}deg)`,
            transition: '.2s'
          }}
          onClick={() => {
            toggleHidden('steps');
          }}
        >+</button>
        <h4>Steps</h4>
      </Grid>

      <h4>{recipe_steps.length}</h4>
    </Grid>

    {!hidden.steps && (
      <ol
        style={{
          display: "flex",
          flexFlow: "column wrap",
          gap: "1rem"
        }}
      >
        {recipe_steps.map(rp_step => {
          return (
          <Grid
            key={rp_step.recipe_step_id}
          >
            <li>{rp_step.text}</li>
          </Grid>
          )
        })}
      </ol>
    )}

    <Grid
      width="100%"
      gap="1rem"
    >
      {recipe_tags.map(rp_tag => {
        return (
        <Grid
          key={rp_tag.recipe_tag_id}
        >
          <a
            href={`/explore?tag=${rp_tag.tag.text}`}
          >#{rp_tag.tag.text}</a>
        </Grid>
      )})}
    </Grid>
  </Grid>
  );
}