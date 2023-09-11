// action type constants
const GET_ALL_RECIPES = "recipes/GET_ALL_RECIPES";
const GET_RECIPE_DETAILS = "recipes/GET_RECIPE_DETAILS";


// action creators
export const getAllRecipesAction = (recipes) => ({
  type: GET_ALL_RECIPES,
  recipes
})
// const getAllRecipesAction = (recipes) => ({
//   type: GET_ALL_RECIPES,
//   payload: recipes
// })

export const getRecipeDetailsAction = (recipe) => ({         // aperture style
  type: GET_RECIPE_DETAILS,
  recipe
})


// thunk action creators
export const getAllRecipesThunk = () => async (dispatch) => {
  const res = await fetch('/api/recipes/all');        // the backend route for fetching.

  if (res.ok) {
    const recipes = await res.json();
    dispatch(getAllRecipesAction(recipes.Recipes));
    console.log('i am inside get all recipes thunk ok part')
    return recipes;
  } else {
    return 'u failed';
  }
}

export const getRecipeDetailsThunk = (recipeId) => async (dispatch) => {           // so take in the identifier id
  const res = await fetch(`/api/recipes/${recipeId}`);                        // go to this backend address to fetch
  if (res.ok) {
    const recipe = await res.json();
    dispatch(getRecipeDetailsAction(recipe));                                 // dispatch action
    return recipe;                                                            // then send back this recipe obj
  } else {
    return 'u thought';
  }
}


// reducer
const initialState = { allRecipes: {}, singleRecipe: {}, currentUserRecipes: {} };
export default function recipeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_RECIPES: {
      const newState = { allRecipes: {...state.allRecipes}, singleRecipe: {}, currentUserRecipes: {} };  // should i add ...state?
      action.recipes.Recipes.forEach(recipe => {                // check if this works or action.recipes.recipes.forEach
        newState.allRecipes[recipe.id] = recipe;
      });
      return newState;
    }
    // case GET_ALL_RECIPES: {
    //   const newState = { allRecipes: {...state.allRecipes}, singleRecipe: {}, currentUserRecipes: {} };
    //   action.payload.recipes.forEach(recipe => {                // check if this works or action.recipes.recipes.forEach
    //     newState.allRecipes[recipe.id] = recipe;
    //   });
    //   return newState;
    // }

    case GET_RECIPE_DETAILS: {
      return { ...state, allPhotos: {...state.allPhotos}, singlePhoto: {...action.recipe}, currentUserPhotos: {} };
    }

    default:
      return state;
  }
}