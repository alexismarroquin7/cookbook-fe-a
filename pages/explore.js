
// components
import { Section } from "../components";

// widgets
import { RecipeList } from "../widgets";

// hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RecipeAction } from "../store";

export default function Explore() {
  
  const recipe = useSelector(s => s.recipe);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(RecipeAction.findAll());
  }, [dispatch]);

  return (
    <Section>
      <h3>Explore</h3>
      {recipe.list.length > 0 && <RecipeList recipes={recipe.list}/>}
    </Section>
  )
}