import { Grid } from "../../components";
import { RecipeItem } from "../RecipeItem";

export const RecipeList = ({recipes}) => {
  return (
  <Grid
    width="100%"
    direction="column wrap"
    gap="1rem"
  >
    {recipes.map(r => {
      return <RecipeItem key={r.recipe_id} recipe={r}/>
    })}
  </Grid>
  )
}