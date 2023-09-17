import { useEffect } from "react";
import { getAllRecipesThunk } from "../../../store/recipes";
import { getAllUsersThunk } from "../../../store/users";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import './GetAllRecipes.css';


const GetAllRecipesFunction = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const recipes = useSelector(state => state.recipes.allRecipes);
  const users = useSelector(state => state.users.allUsers);
  const recipeArr = Object.values(recipes);
  const userArr = Object.values(users);


  useEffect(() => {
    dispatch(getAllRecipesThunk());
    dispatch(getAllUsersThunk());
  }, [dispatch]);


  recipeArr.forEach(recipe => {
    recipe['Author'] = userArr.find(user => user.id === recipe.userId)        // tacking on the 'author' user obj to every recipe object.  Success!
  });


  return (
    <div id='all-recipe-overlord'>
      <h1 id='discover'>Discover new recipes!</h1>
      <div>
        {recipeArr.map(recipe =>
          <NavLink to={`/recipes/${recipe.id}`} title={recipe.foodName} className='link'>
            <span key={recipe.id} id='all-recipes-card'>
              <img src={recipe.url} alt={recipe.foodName} id='all-recipes-pic'></img>
              <div id='profile-card'>
                <img src={recipe.Author?.profilePic} alt={recipe.Author?.username} id='all-recipes-profile-pic'></img>
                <div id='little-caption'>
                  <span>{recipe.foodName}</span>
                  <span>by: {recipe.Author?.username}</span>
                </div>
              </div>
            </span>
          </NavLink>
        )}
      </div>
    </div>
  )


}

export default GetAllRecipesFunction