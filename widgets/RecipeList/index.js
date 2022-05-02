import { Grid } from "../../components";
import { RecipeItem } from "../RecipeItem";

export const RecipeList = ({recipes = []}) => {
  return (
  <Grid
    padding="2rem 0"
    width="100%"
    direction="column wrap"
    align="center"
    gap="1rem"
  >
    {recipes.length > 0 && recipes.map(r => {
      return <RecipeItem key={r.recipe_id} recipe={r}/>
    })}
  </Grid>
  )
}