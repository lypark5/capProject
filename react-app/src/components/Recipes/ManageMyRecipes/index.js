import { getAllRecipesThunk } from "../../../store/recipes";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory, NavLink, Link } from "react-router-dom";
import DeleteRecipeModalFunction from "../DeleteRecipeModal";
import RecipeFormFunction from "../CreateRecipe";
import OpenModalButton from "../../OpenModalButton";
import './ManageMyRecipes.css'


// useSelector grabs stuff from the new state
function GetAllRecipesOfCurrentFunction () {
  const user = useSelector(state => state.session.user);        // this is logged in user, under new state
  const allRecipes = useSelector(state => state.recipes.allRecipes)     // this is an object of all recipes objects {1:{}, 2:{}}
  const allRecipesArr = Object.values(allRecipes);                  // converts it to array so we can work with it [{}, {}]
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = user.id;
  const userRecipes = allRecipesArr.filter(recipe => recipe.userId === userId);   // find only recipes that i posted.
  
  useEffect (() => {                                        // useEffect runs after loading all the code first, makes it rerender and does it.
    dispatch(getAllRecipesThunk());
  }, [dispatch]);

  // function editButtonFunction (spotId) {                 // do this when u do edit
  //     history.push(`/spots/${spotId}/edit`)
  // }

  // modal component line, spotId is prop name variable we gave, to spot.id of each spot from array
  // need to keep update and delete buttons outside of link so that it doesn't redirect to spot id page when modal pops up and then crashes with error cuz it doesn't exist.
  // if keeping it bad, after clicking delete, the page is blank cuz this spot id page no longer exists.  
  // good way, it doesn't redirect cuz it's no longer under Link path.
  return (
    <div id='manage-overlord'>
      <div id='all-my-recipes-container'>
        <div><h2 id='manage-title'>Manage Your Recipes</h2></div>
        
        <div id='manage-cards-container'>
          {userRecipes.length ? userRecipes.map(recipe => 
            <div id='manage-card'>

              <div id='manage-food-name'>{recipe.foodName}</div>
              <Link to={`/recipes/${recipe.id}`} title={recipe.name}>
                {/* <div id='manage-card'> */}
                  <img src={recipe.url} alt={recipe.foodName} id='manage-pic'/>
                {/* </div> */}
              </Link>

              <div id='manage-buttons-container'>
                {/* <button onClick={() => RecipeFormFunction(recipe.id)} formType="Update">Update</button> */}
                <Link to={`/recipes/${recipe.id}/edit`} formType='Update'>
                  <button>Edit</button>
                </Link>
                {/* <RecipeFormFunction recipeId={recipe.id} formType="Update"/> */}
                <OpenModalButton 
                  // className='update-or-delete'
                  buttonText='Delete'
                  modalComponent={<DeleteRecipeModalFunction recipeId={recipe.id} />}
                />
              </div>
            </div>
            ) : 'No recipes yet'}
        </div>
      </div>
    </div>
  )
}


export default GetAllRecipesOfCurrentFunction;