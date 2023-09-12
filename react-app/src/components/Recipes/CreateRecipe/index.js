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
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState({});
  const [buttonClass, setButtonClass] = useState("disabled-signup-button");



  // need to review if statements
  useEffect(() => {
    const errObj = {};
    if (foodName && foodName.length < 1) errObj.foodName = "food name is required";
    if (foodName.length > 1) {
      setDisabled(false);
      setButtonClass("enabled-signup-button")
    } else {
      setDisabled(true);
    }
    setErrors(errObj);
  }, [foodName]);

  const handleSubmit = async(e) => {                                  // when you push submit,
    e.preventDefault();
    if (formType === "Update") {                                      // for edit forms:
      const recipeData = { recipeId: recipe.id, foodName, description, url, ingredients, instructions };   // this is what the data body of the current recipe is that is being edited.
      const updatedRecipe = await dispatch(sessionActions.updateRecipeThunk(recipeData));

      if (updatedRecipe.id) {                   // if this recipe that is being edited exists,
        history.push('/recipes/manage');        // history.push to my recipes
      }

    } else {                                                          // for create form:
      const formData = new FormData();
      formData.append("food_name", foodName);         // first arg is real property name, need snake case
      formData.append("description", description);
      formData.append("url", url);
      formData.append("ingredients", ingredients);
      formData.append("instructions", instructions);
      const newRecipe = await dispatch(sessionActions.createRecipeThunk(formData));
      if (newRecipe.id) {                             // if new recipe exists,
        console.log('i am in create handle submitttttt')
        // await dispatch(sessionActions.thunkGetCurrentUserPhotos(currentUser.id));    // i don't think i need this cuz i have it as a component.
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
        <input
          type='file'
          placeholder='Choose your photo'
          onChange={(e) => setUrl(e.target.files[0])}
          required
          accept="image/png, image/jpeg, image/jpg, image/gif, image/pdf"
        />
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