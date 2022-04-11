import { Grid } from "../../components";
import { RecipeItem } from "../RecipeItem";

export const RecipeList = ({recipes}) => {
  return (
  <Grid>
    {recipes.map(r => {
      return <RecipeItem key={r.recipe_id} recipe={r}/>
    })}
  </Grid>
  )
}