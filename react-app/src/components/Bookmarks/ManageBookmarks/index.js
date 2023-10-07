import { useSelector, useDispatch } from "react-redux";
import React, { useEffect} from "react";
import { getUserThunk } from "../../../store/users";
import { useParams } from "react-router-dom";
import { getAllRecipesThunk } from "../../../store/recipes";


const GetAllBookmarksFunction = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  // const currentUser = (useSelector(state => state.session.user));
  const singleUser = (useSelector(state => state.users.singleUser));
  const allRecipes = Object.values(useSelector(state => state.recipes.allRecipes));
  const myRecipeIds = singleUser.bookmark_recipe_ids;

  console.log('i am all recipes', allRecipes)
  console.log('myrecipe ids', myRecipeIds)

  // so i filled single user slice during useEffect recipe details when i push bookmark button.
  // now i have to check if state.users.singleUser variable .bookmark_recipe_ids array has length.
  // 
  useEffect(async () => {
    await dispatch(getUserThunk(userId));
    await dispatch(getAllRecipesThunk());
  }, [dispatch]);

  const myRecipeBookmarks = [];
  // const pickMyBookmarksFunction = ()
  if (myRecipeIds) {
    for (let recipeId of myRecipeIds) {
      for (let recipe of allRecipes) {
        if (recipe.id === recipeId) myRecipeBookmarks.push(recipe);
      }
    }
  }

  console.log('my bookmarks objects', myRecipeBookmarks)

  return (
    <div>
      <h1>i am at get all bookmarks</h1>
      {myRecipeBookmarks.length === 0 ? 
        <p>no bookmarks yet!</p> 
      : myRecipeBookmarks.map(recipe =>
        <div>
          <img src={recipe.url} />
        </div>)
      }

    </div>
  )
}


export default GetAllBookmarksFunction