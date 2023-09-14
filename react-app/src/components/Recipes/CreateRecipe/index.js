import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as sessionActions from "../../../store/recipes";
import { useHistory } from "react-router-dom";


const RecipeFormFunction = ({ recipe, formType }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(state => state.session.user);
  const currentUserRecipes = useSelector(state => state.recipes.currentUserRecipes)   // why we need this?
  const [foodName, setFoodName] = useState(recipe ? recipe.foodName : '');      // if there is a recipe aka it is edit, useState should be pre-populated.  If no recipe, it is create, so set to empty.
  const [description, setDescription] = useState(recipe ? recipe.description : '');
  const [url, setUrl] = useState(recipe ? recipe.url : '');  
  const [ingredients, setIngredients] = useState(recipe ? recipe.ingredients : '');
  const [instructions, setInstructions] = useState(recipe ? recipe.instructions : '');
  // const [disabled, setDisabled] = useState(true);
  const [disabled, setDisabled] = useState(false);    // for testing
  const [errors, setErrors] = useState({});
  const [buttonClass, setButtonClass] = useState("disabled-update-button");





  // need to review if statements
  // useEffect(() => {
  //   const errObj = {};
  //   if (foodName && foodName.length < 1) errObj.foodName = "food name is required";
  //   if (foodName?.length > 1) {
  //     setDisabled(false);
  //     setButtonClass("enabled-signup-button")
  //   } else {
  //     setDisabled(true);
  //   }
  //   setErrors(errObj);
  // }, [foodName]);


  const recipeBeingEdited = useSelector(state => state.recipes.singleRecipe);

  useEffect(() => {
    const errObj = {};
    if (!Object.values(recipeBeingEdited).length) {
      dispatch(sessionActions.getRecipeDetailsThunk(recipeBeingEdited.id))}
    if (recipeBeingEdited) {
      setFoodName(recipeBeingEdited.foodName);
      setDescription(recipeBeingEdited.description);
      // setUrl(recipeBeingEdited.url);
      setIngredients(recipeBeingEdited.ingredients);
      setInstructions(recipeBeingEdited.instructions);

      if (foodName && foodName.length < 3) errObj.foodName = "Food name must be at least 3 characters long";
      // if (foodName && foodName.length >= 3) {
      //   setDisabled(false);
      //   setButtonClass('enabled-update-button')
      // } else {
      //   setDisabled(true);
      // }
      setErrors(errObj);
    }
  }, [recipeBeingEdited.foodName])

  const handleSubmit = async(e) => {                                  // when you push submit,
    e.preventDefault();
    if (formType === "Update") {                                      // for edit forms:
      const editedRecipe = new FormData();
      editedRecipe.append("food_name", foodName); 
      editedRecipe.append("description", description);
      editedRecipe.append("url", url);
      editedRecipe.append("ingredients", ingredients);
      editedRecipe.append("instructions", instructions);
      

      const updatedRecipe = await dispatch(sessionActions.updateRecipeThunk(editedRecipe, recipeBeingEdited.id));
      console.log('updated recipe do i exist?', updatedRecipe)
      console.log('i am in handle submit of updateeeeeee')
      if (updatedRecipe.id) {                   // if this recipe that is being edited exists,
        history.push('/recipes/manage');        // history.push to my recipes
      } else {
        return recipe.errors;
      }

    } else {                                                          // for create form:



      // later try to change formData to newRecipe
      const formData = new FormData();
      formData.append("food_name", foodName);         // first arg is real property name, need snake case
      formData.append("description", description);
      formData.append("url", url);
      formData.append("ingredients", ingredients);
      formData.append("instructions", instructions);
      const newRecipe = await dispatch(sessionActions.createRecipeThunk(formData));
      if (newRecipe.id) {                             // if new recipe exists,
        history.push('/recipes/manage');
      }
    }
  };

  return (
    <div>
      <h2>{recipe ? "Update Recipe" : "Upload Recipe"}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type='text'
          placeholder='Food name'
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          required
        />
        {/* {valObj.title && <p className="errors">{valObj.title}</p>} */}
        <textarea
          type='textarea'
          placeholder='Add a description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        {/* make an update version where it is not required */}
        {formType === 'Update' ?
          <input
            type='file'
            placeholder='Choose your photo'
            onChange={(e) => setUrl(e.target.files[0])}
            accept="image/png, image/jpeg, image/jpg, image/gif, image/pdf"
          />
          :
          <input
            type='file'
            placeholder='Choose your photo'
            onChange={(e) => setUrl(e.target.files[0])}
            required
            accept="image/png, image/jpeg, image/jpg, image/gif, image/pdf"
          />
        }

        <textarea
          type='textarea'
          placeholder='List your ingredients, separated by a comma and space between each'
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />
        <textarea
          type='textarea'
          placeholder='Add your instructions'
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        />
        {/* {valObj.url && <p className="errors" style={{color: "red"}}>{valObj.url}</p>} */}
        <button type='submit' disabled={disabled} className={buttonClass}>Submit</button>
      </form>
    </div>
  )

}


export default RecipeFormFunction