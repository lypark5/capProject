import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { getAllUsersThunk, getUserThunk } from "../../../store/users";
import { createBookmarkThunk, deleteBookmarkThunk, getRecipeDetailsThunk } from "../../../store/recipes";
import * as sessionActions from "../../../store/comments";
import GetAllCommentsByRecipeIdFunction from "../../Comments/GetAllComments";
import CreateCommentFunction from "../../Comments/CreateComment";
import './GetRecipeDetails.css';


const GetRecipeDetailsFunction = () => {
  const dispatch = useDispatch();
  const {recipeId} = useParams();
  const users = Object.values(useSelector(state => state.users.allUsers));
  const currentUser = useSelector(state => state.session.user);
  const recipe = useSelector(state => state.recipes.singleRecipe);
  const comments = Object.values(useSelector(state => state.comments.recipeComments)).filter(comment => comment.recipeId == recipeId);
  const history = useHistory();
  const ingArr = recipe.ingredients?.split(', ');
  console.log('ingredients array', ingArr)

  useEffect(() => {
    dispatch(getRecipeDetailsThunk(recipeId));
    dispatch(getAllUsersThunk());
    dispatch(sessionActions.getAllCommentsByRecipeIdThunk(recipeId));    
  }, [dispatch]);

  recipe["Author"] = users.find(user => user.id === recipe.userId);     

  async function handleSubmit ()  {
    await dispatch(createBookmarkThunk(recipe.id, currentUser.id))
  }

  async function unBookmarkFunction () {
    await dispatch(deleteBookmarkThunk(recipe.id, currentUser.id))
  }

  function checkDidIBookmarkThis () {
    if (!recipe.bookmark_user_ids?.length) return false;
    return recipe.bookmark_user_ids.includes(currentUser.id);
  }

  console.log('recipe bookmarks', recipe?.recipe_bookmark)

// in <img> Author? needs ? or else it'll hang before getting assigned an author from useEffect.
  return (
    <div id='detail-super-mega-overlord'>
      <div id='detail-overlord'>
        <div id='recipe-div'>
          <div id='food-name-and-bookmark'>
            <h1 id='food-name'>{recipe.foodName}</h1>
            {checkDidIBookmarkThis() ? 
              <button onClick={() => unBookmarkFunction()}>Unbookmark</button>
              :
              // <button onClick={() => handleSubmit()}>Bookmark</button>
             
              <i onClick={() => handleSubmit()} class="far fa-bookmark" id='bookmark'></i>
            }          
          </div>

          <img src={recipe.url} alt={recipe.title} id='food-pic'></img>
          <div id='profile-pic-n-detail-div'>
            <img src={recipe.Author?.profilePic} alt={recipe.Author?.username} id='small-profile-pic'></img>
            <div id='details-desc'>
              <span>by: {recipe.Author?.username}</span>
              <span>{recipe.description}</span>
            </div>
          </div>
          <div id='cooking-part'>
            <div id='ing-div'>
              <ul >
                {ingArr?.map(ing => 
                  <li>{ing}</li>)}
              </ul>
            </div>
            <div id='instructions-div'>{recipe.instructions}</div>
          </div>
        </div>
        <div id='comment-div'>
          <div id='whats-this'>
            <CreateCommentFunction />
          </div>
          <div id='whats-this-2'>
            {Object.values(comments).length ? comments.toReversed().map(comment =>
              <GetAllCommentsByRecipeIdFunction comment={comment} currentUser={currentUser} recipeId={recipeId}/>
            ) : <p id='be-first'>Be the first to leave a comment!</p>}
          </div>
        </div>

        
      </div>
    </div>
  )
}


export default GetRecipeDetailsFunction
