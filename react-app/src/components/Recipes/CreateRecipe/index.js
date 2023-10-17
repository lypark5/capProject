import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as sessionActions from "../../../store/recipes";
import { useHistory } from "react-router-dom";
import './CreateRecipe.css';


const RecipeFormFunction = ({ recipe, formType }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(state => state.session.user);
  const [foodName, setFoodName] = useState(recipe ? recipe.foodName : '');      // if there is a recipe aka it is edit, useState should be pre-populated.  If no recipe, it is create, so set to empty.
  const [description, setDescription] = useState(recipe ? recipe.description : '');
  const [url, setUrl] = useState(recipe ? recipe.url : '');  
  const [ingredients, setIngredients] = useState(recipe ? recipe.ingredients : '');
  const [instructions, setInstructions] = useState(recipe ? recipe.instructions : '');
  // const [disabled, setDisabled] = useState(true);
  const [disabled, setDisabled] = useState(false);    // for testing
  const [errors, setErrors] = useState({});
  const [buttonClass, setButtonClass] = useState("disabled-update-button");


  useEffect(() => {
    const errObj = {};
    // if (!Object.values(recipeBeingEdited).length) {
    //   dispatch(sessionActions.getRecipeDetailsThunk(recipeBeingEdited.id))}
    if (recipe) {
      setFoodName(recipe.foodName);
      setDescription(recipe.description);
      setIngredients(recipe.ingredients);
      setInstructions(recipe.instructions);

      if (foodName && foodName.length < 3) errObj.foodName = "Food name must be at least 3 characters long";
      // if (foodName && foodName.length >= 3) {
      //   setDisabled(false);
      //   setButtonClass('enabled-update-button')
      // } else {
      //   setDisabled(true);
      // }
      setErrors(errObj);
    }
  }, [recipe?.foodName])

  const handleSubmit = async(e) => {                                  // when you push submit,
    e.preventDefault();
    if (formType === "Update") { 
      const finalRecipe = {user_id: currentUser.id, food_name: foodName, description, ingredients, instructions};
      await dispatch(sessionActions.editRecipeThunk(finalRecipe, recipe.id));
      history.push('/recipes/manage');
    } else {                                        // for create form
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
    <div id='create-edit-mega-background'>
      <div id='form-div'>
        <h2 id='create-title'>{recipe ? "Update my recipe!" : "Let's get cookin'!"}</h2>
        {formType === 'Update'?
        <form onSubmit={handleSubmit} className='recipe-form'>
          <input
            type='text'
            placeholder='Food name'
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            required
            className='recipe-string'
          />
          {/* {valObj.title && <p className="errors">{valObj.title}</p>} */}
          <textarea
            type='textarea'
            placeholder='Add a description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className='recipe-textarea'
          />
          <textarea
            type='textarea'
            placeholder='List your ingredients, separated by a comma and space between each'
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
            className='recipe-textarea'
          />
          <textarea
            type='textarea'
            placeholder='Add your instructions'
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
            className='recipe-textarea'
          />
          {/* {valObj.url && <p className="errors" style={{color: "red"}}>{valObj.url}</p>} */}
          {/* <button type='submit' disabled={disabled} className={buttonClass}>Submit</button> */}
          <div className='recipe-buttons-div'>
            <button type='submit' className='recipe-button'>Update</button>
            <button onClick={() => history.push('/recipes/manage')} className='recipe-button'>Cancel</button>
          </div>
        </form>
        
        :
        <form onSubmit={handleSubmit} encType="multipart/form-data" className='recipe-form'>
          <input
            type='text'
            placeholder='Food name'
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            required
            className='recipe-string'
          />
          {/* {valObj.title && <p className="errors">{valObj.title}</p>} */}
          <textarea
            type='textarea'
            placeholder='Add a description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className='recipe-textarea'
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
            placeholder='List your ingredients:&#10;eg) 1 carrot, 1 onion, 1 lb beef'
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
            className='recipe-textarea'
          />
          <textarea
            type='textarea'
            placeholder='Add your instructions'
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
            className='recipe-textarea'
          />
          {/* {valObj.url && <p className="errors" style={{color: "red"}}>{valObj.url}</p>} */}
          {/* <button type='submit' disabled={disabled} className={buttonClass}>Submit</button> */}
          <div className='recipe-buttons-div'>
            <button type='submit' className='recipe-button'>Post</button>
          </div>
        </form>
        }
    </div>

    </div>
  )
}


export default RecipeFormFunction






////////////  form data update
// if (formType === "Update") {                                      // for edit forms:
//   const editedRecipe = new FormData();
//   editedRecipe.append("id", recipeBeingEdited.id);
//   editedRecipe.append("food_name", foodName); 
//   editedRecipe.append("description", description);
//   editedRecipe.append("url", url? url : recipeBeingEdited.url);     // this seems broken  :s
//   editedRecipe.append("ingredients", ingredients);
//   editedRecipe.append("instructions", instructions);
  
  
//   const updatedRecipe = await dispatch(sessionActions.updateRecipeThunk(editedRecipe, recipeBeingEdited.id));
//   console.log('updated recipe do i exist?', updatedRecipe)
//   console.log('i am in handle submit of updateeeeeee')
//   if (updatedRecipe.id) {                   // if this recipe that is being edited exists,
//     await dispatch(sessionActions.deleteRecipeThunk(recipeBeingEdited.id))
//     history.push('/recipes/manage');        // history.push to my recipes
//   } else {
//     return recipe.errors;
//   }