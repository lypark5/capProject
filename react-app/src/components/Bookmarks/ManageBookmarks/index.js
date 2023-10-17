import { useSelector, useDispatch } from "react-redux";
import React, { useEffect} from "react";
import { getUserThunk } from "../../../store/users";
import { useParams } from "react-router-dom";
import { getAllRecipesThunk, deleteBookmarkThunk } from "../../../store/recipes";
import './ManageBookmarks.css';


const GetAllBookmarksFunction = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const singleUser = (useSelector(state => state.users.singleUser));
  const allRecipes = Object.values(useSelector(state => state.recipes.allRecipes));
  const myRecipeIds = singleUser.bookmark_recipe_ids;


  // so i filled single user slice during useEffect recipe details when i push bookmark button.
  // now i have to check if state.users.singleUser variable .bookmark_recipe_ids array has length.
  // 
  let myRecipeBookmarks = [];

  useEffect(async () => {
    await dispatch(getUserThunk(userId));
    await dispatch(getAllRecipesThunk());
  }, [dispatch]);


  if (myRecipeIds) {
    for (let recipeId of myRecipeIds) {
      for (let recipe of allRecipes) {
        if (recipe.id === recipeId) myRecipeBookmarks.push(recipe);
      }
    }
  }

  async function unBookmarkFunction (recipe) {
    await dispatch(deleteBookmarkThunk(recipe.id, userId))
    await dispatch(getUserThunk(userId));
  }


  return (
    <div id='bookmarks-overlord'>
      <div id='all-my-bookmarks-container'>
        <div>
          <h1 id='bookmark-title'>My Bookmarks</h1>
        </div>
        <div id='manage-bookmark-cards-container'>
          {myRecipeBookmarks.length ? myRecipeBookmarks.map(recipe =>
            <div id='bookmark-card'>
              <div id='bookmark-food-name'>{recipe.foodName}</div>
              <img src={recipe.url} alt={recipe.foodName} id='bookmark-pic'/>
              <div id='bookmark-button-container'>
                <button onClick={() => unBookmarkFunction(recipe)} id='unbookmark-word-button'>Unbookmark</button>
              </div>
            </div>
          ) : <p id='no-bookmarks'>No bookmarks yet</p>}
        </div>
      </div>
    </div>
  )
}


export default GetAllBookmarksFunction