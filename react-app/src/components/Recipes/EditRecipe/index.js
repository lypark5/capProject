import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getRecipeDetailsThunk } from "../../../store/recipes";
import RecipeFormFunction from "../CreateRecipe";


const EditRecipeFunction = () => {
  const dispatch = useDispatch();
  const { recipeId } = useParams();
  const recipeBeingEdited = useSelector(state => state.recipes.singleRecipe);

  useEffect(() => {
    dispatch(getRecipeDetailsThunk(recipeId));
  }, [dispatch]);

  return (
    <RecipeFormFunction recipe={recipeBeingEdited} formType={"Update"} />
  )
}

export default EditRecipeFunction
