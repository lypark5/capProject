import { useEffect } from "react";
import { getAllRecipesThunk } from "../../../store/recipes";
import { getAllUsersThunk } from "../../../store/users";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import { UserBlurb } from '../UserBlurb';


const GetAllRecipesFunction = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const recipes = useSelector(state => state.recipes.allRecipes);
  const users = useSelector(state => state.users.allUsers);
  const recipeArr = Object.values(recipes);
  const userArr = Object.values(users);
  console.log('recipessssssss =', recipes)        // empty object
  console.log('userssssss =', users)          // empty object


  useEffect(() => {
    dispatch(getAllRecipesThunk());
    dispatch(getAllUsersThunk());
  }, [dispatch]);


  // recipeArr.forEach(recipe => {
  //   recipe['Author'] = userArr.find(user => user.id === recipe.userId)        // tacking on the 'author' user obj to every recipe object.
  // });


  return (
    <div> i am at get all recipes
      <div>
        {recipeArr.map(recipe =>
          <span key={recipe.id}>
            <img src={recipe.url} alt={recipe.foodName}></img>
          </span>)}
      </div>
    </div>
  )


}

export default GetAllRecipesFunction