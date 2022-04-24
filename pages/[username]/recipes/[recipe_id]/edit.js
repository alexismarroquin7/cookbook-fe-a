// components
import { Section } from "../../../../components";
import { RecipeForm } from "../../../../widgets";

// store
import { RecipeAction } from "../../../../store";

// hooks
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// utils
import { initialValues } from "../../../../utils/recipe-form";

export default function EditRecipe(){
  
  const router = useRouter();
  const dispatch = useDispatch();
  const recipe = useSelector(s => s.recipe.item);
  const [initialValuesToUse, setInitialValuesToUse] = useState(initialValues);
  
  useEffect(() => {
    if(!router.query.recipe_id) return;
    dispatch(RecipeAction.findByRecipeId(router.query.recipe_id));
  }, [dispatch, router.query.recipe_id]);
  
  useEffect(() => {
    if(recipe.recipe_id === null) return;

    setInitialValuesToUse(iv => {
      return {
        ...iv,
        name: recipe.name,
        description: recipe.description,
        cuisine_type: recipe.cuisine_type.name,
        difficulty: recipe.difficulty,
        prep_duration: {
          ...recipe.prep_duration
        },
        cook_duration: {
          ...recipe.cook_duration
        },
        servings: recipe.servings,
        ingredients: recipe.recipe_ingredients.map(rp_ing => {
          return {
            id: rp_ing.recipe_ingredient_id,
            name: rp_ing.ingredient.name,
            quantity: rp_ing.quantity,
            measurement_unit: rp_ing.measurement_unit.name,
            index: rp_ing.index
          }
        }),
        steps: recipe.recipe_steps.map(rp_step => {
          return {
            id: rp_step.recipe_step_id,
            text: rp_step.text,
            index: rp_step.index
          }
        }),
        tags: recipe.recipe_tags.map(rp_tag => {
          return {
            id: rp_tag.recipe_tag_id,
            text: rp_tag.tag.text,
            index: rp_tag.index
          }
        })
      }
    })
  }, [recipe]);
  
  return (
  <Section>
    {initialValuesToUse.name !== '' && <RecipeForm initialValues={initialValuesToUse}/>}
  </Section>
  )
}