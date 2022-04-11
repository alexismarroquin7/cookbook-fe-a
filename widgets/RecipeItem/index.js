import { Border, Grid } from "../../components";
import FavoriteIcon from '@mui/icons-material/Favorite';

export const RecipeItem = ({recipe}) => {
  
  const { 
    name,
    prep_duration,
    cook_duration,
    recipe_likes,
    difficulty,
    servings,
    recipe_ingredients,
    recipe_steps
  } = recipe;

  const getDurationText = ({hours = 0, minutes = 0}) => {
    let text = '';
    
    if(hours === 0){
      text += '';
    } else if(hours === 1){
      text += `${hours}HR`;
    } else {
      text += `${hours}HRS`;
    }

    if(minutes === 0){
      text += '';
    } else if(minutes === 1){
      text += ` ${minutes}MIN`;
    } else {
      text += ` ${minutes}MINS`;
    }
    
    return text;
  }

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
      <h4>{name}</h4>
      <p>{difficulty}</p>
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
      <FavoriteIcon/>
      <p>{recipe_likes.length} </p>
    </Grid>
    

  </Grid>
  )
}