// components
import { Section } from "../../../../components";
import { RecipeItemDetailed } from "../../../../widgets";

// hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RecipeAction } from "../../../../store";
import { useRouter } from "next/router";

export default function UserRecipeItem() {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const recipe = useSelector(s => {
    return {
      item: s.recipe.item,
      loading: s.recipe.loading
    }
  });

  useEffect(() => {
    if(!router.query.recipe_id) return;
    dispatch(RecipeAction.findByRecipeId(router.query.recipe_id))
  }, [dispatch, router.query.recipe_id]);

  return (
  <Section>
    {recipe.item.recipe_id && (
      <RecipeItemDetailed 
        recipe={recipe.item}
        status={{loading: recipe.loading}}
      />
    )}
  </Section>
  )
}