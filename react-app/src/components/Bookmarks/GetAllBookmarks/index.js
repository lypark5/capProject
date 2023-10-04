import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";
// import { getAllBookmarksThunk, createBookmarkThunk } from '../../store/fav';
// import { Photostream } from '../Photostream';


export default function FavPhotos() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const bookmarkedRecipes = Object.values(useSelector(state => state.bookmarks.allBookmarks));
  const allUsers = Object.values(useSelector(state => state.users.allUsers));

  useEffect(() => {
    dispatch(getAllBookmarksThunk(userId));
  }, [dispatch]);

  const handleSubmit = (userId, recipeId) => {
    dispatch(createBookmarkThunk(userId, recipeId)).then(()=>dispatch(getAllBookmarksThunk(userId)))
  }

//  already got all the favorited recipes
//  for each bookmarked recipe, add "Owner" key whose value is the whole user obj of that owner.  find the correct info by matching the recipe.userId to the user's id.


  bookmarkedRecipes.forEach(recipe => {
    recipe["Owner"] = Object.values(allUsers).find(user => user.id === recipe.userId);
  });

  return (
    <div>
      <h2>My Bookmarked Recipes</h2>
        {/* <Photostream fav={likedPhotos} like={"like"} /> */}
      <div>
        {bookmarkedRecipes?.map(recipe =>
          <div key={recipe.id} id='bookmarked-card'>
            <img src={recipe.url} alt={recipe.foodName}></img>
            <div id='bookmarked-bottom'>
              <p>{recipe.foodName}</p>
              <p onClick={() => handleSubmit(currentUser.id, photo.id)}>Favorite <i className={ currentUserFavpic.length ? "fas fa-star" : "far fa-star"}  style={{color: "#FFD700"}}></i></p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
