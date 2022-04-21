import { Section } from "../../../components";
import { RecipeForm } from "../../../widgets/RecipeForm";
import { initialValues } from "../../../utils/recipe-form";


export default function NewRecipe() {
  
  return (
  <Section>
    <RecipeForm initialValues={initialValues}/>
  </Section>
  );
}