import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { getAllUsersThunk } from "../../../store/users";
import { getAllRecipesThunk, getRecipeDetailsThunk } from "../../../store/recipes";
// import * as sessionActions from "../../store/comments";
// import GetAllCommentsByPhotoIdFunction from "../GetAllComments";
// import { CreateComments } from "../CreateComments";


const GetRecipeDetailsFunction = () => {
  const dispatch = useDispatch();
  const {recipeId} = useParams();
  const users = Object.values(useSelector(state => state.users.allUsers));
  const currentUser = useSelector(state => state.session.user);
  const recipe = useSelector(state => state.recipes.singleRecipe);
  // const comments = Object.values(useSelector(state => state.comments.photoComments)).filter(comment => comment.photoId == photoId);
  const history = useHistory();

  useEffect(() => {
    dispatch(getRecipeDetailsThunk(recipeId));
    dispatch(getAllUsersThunk());
    // dispatch(getAllRecipesThunk(currentUser.id));    // this is what broke this page.
    // dispatch(sessionActions.thunkGetAllCommentsByPhotoId(photoId));    // add this back during comments.
  }, [dispatch]);

  recipe["Author"] = users.find(user => user.id === recipe.userId);     // i think it's this, yup

// in <img> Author? needs ? or else it'll hang before getting assigned an author from useEffect.
  return (
    <div>
      <div>{recipe.foodName}</div>
      <div>
        <span>
          {/* do i need the question marks?  ↓↓ i don't think so*/}
          <img src={recipe.url} alt={recipe.title}></img>
          <span>{recipe.description}</span>
          <div>
            <img src={recipe.Author?.profilePic} alt={recipe.Author?.username}></img>
            <span>{recipe.Author?.username}</span>
          </div>
        </span>
        <span>{recipe.ingredients}</span>
      </div>
      <div>{recipe.instructions}</div>
    </div>
  )
}


export default GetRecipeDetailsFunction