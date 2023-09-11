import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { getAllUsersThunk } from "../../../store/users";
import { getAllRecipesThunk, getRecipeDetailsThunk } from "../../../store/recipes";
// import { UserBlurb } from "../UserBlurb";
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
    dispatch(getAllRecipesThunk(currentUser.id));
    // dispatch(sessionActions.thunkGetAllCommentsByPhotoId(photoId));
  }, [dispatch]);

  // if (!currentUser) return null;    // ok try it with this commented out, it will break, take notes.

  const handleClick = (e, id) => {          // where this
    e.stopPropagation();
    history.push(`/users/${id}/photos`)
  }

  // recipe["Author"] = Object.values(users).find(user => user.id === recipe.userId);
  recipe["Author"] = users.find(user => user.id === recipe.userId);     // i think it's this


  return (
    <div>
      <div>
        {/* do i need the question marks?  ↓↓ */}
        <img src={recipe?.url} alt={recipe?.title}></img>
      </div>
    </div>
  )



}


export default GetRecipeDetailsFunction