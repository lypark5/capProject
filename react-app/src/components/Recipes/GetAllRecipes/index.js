import { useEffect, useState } from "react";
import { getAllRecipesThunk, searchRecipeThunk } from "../../../store/recipes";
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
  const [searchWord, setSearchWord] = useState("");
  const [errors, setErrors] = useState({});


  useEffect(() => {
    dispatch(getAllRecipesThunk());
    dispatch(getAllUsersThunk());
  }, [dispatch]);


  recipeArr.forEach(recipe => {
    recipe['Author'] = userArr.find(user => user.id === recipe.userId)        // tacking on the 'author' user obj to every recipe object.  Success!
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorsObj = {}

    if (searchWord.trim().length === 0) {
      errorsObj.searchWord = "Please type a word before submitting"
    } else {    
      await dispatch(searchRecipeThunk(searchWord))                      // do i need a separate page for none found?
      history.push(`/recipes/all`); 
      setSearchWord('');
    }
    setErrors(errorsObj);
  };


  return (
    <div id='all-recipe-overlord'>



      <div id='food-bg-pic-div'>
        <h1 id='discover'><em>Discover new recipes!</em></h1>
      </div>

      
      <div id='search-n-cards'>
        <div id='search-div'>
          <form id="search-form" onSubmit={handleSubmit}>
            <input
              id='search-input'
              type='text'
              placeholder="pancakes, ramen, etc."
              value={searchWord}
              onChange={e => setSearchWord(e.target.value)}
            />
            <button type='submit' id='search-button'><i class="fas fa-search"></i></button>
          </form>
          {errors.searchWord && <p className='errors'>{errors.searchWord}</p>}
        </div>
        <div id='all-cards-container'>
          {recipeArr.length ? recipeArr.map(recipe =>
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
          )
        :
          <div style={{width:'850px', border:'2px solid red'}}>
            <p>No recipe matches your search.</p>
          </div>
        }
        </div>
      </div>
    </div>
  )

}

export default GetAllRecipesFunction