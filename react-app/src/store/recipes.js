// action type constants
const GET_ALL_RECIPES = "recipes/GET_ALL_RECIPES";
const GET_RECIPE_DETAILS = "recipes/GET_RECIPE_DETAILS";
const GET_CURRENT_USER_RECIPES = "recipes/GET_CURRENT_USER_RECIPES"
const DELETE_RECIPE = "recipes/DELETE_RECIPE";


// action creators
const getAllRecipesAction = (recipes) => ({
  type: GET_ALL_RECIPES,
  recipes
})

const getRecipeDetailsAction = (recipe) => ({         // aperture style
  type: GET_RECIPE_DETAILS,
  recipe
})

// const getCurrentUserRecipesAction = (recipes) => ({
//   type: GET_CURRENT_USER_RECIPES,
//   recipes
// })

const deleteRecipeAction = (recipeId) => ({
  type: DELETE_RECIPE,
  recipeId
})


// thunk action creators
export const getAllRecipesThunk = () => async (dispatch) => {
  const res = await fetch('/api/recipes/all');        // the backend route for fetching.
  if (res.ok) {
    const recipes = await res.json();
    dispatch(getAllRecipesAction(recipes.Recipes));
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

// export const getCurrentUserRecipesThunk = (userId) => async (dispatch) => {
//   const res = await fetch(`/api/recipes/users/${userId}`)
// }

export const deleteRecipeThunk = (recipeId) => async (dispatch) => {
  const res = await fetch(`/api/recipes/${recipeId}/delete`, {
    method: 'DELETE'
  })
  if (res.ok) {
    await dispatch(deleteRecipeAction(recipeId))
  }
}


// reducer
const initialState = { allRecipes: {}, singleRecipe: {}, currentUserRecipes: {} };
export default function recipeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_RECIPES: {
      const newState = { allRecipes: {...state.allRecipes}, singleRecipe: {}, currentUserRecipes: {} };  // should i add ...state?
      action.recipes.forEach(recipe => {                // check if this works or action.recipes.recipes.forEach
        newState.allRecipes[recipe.id] = recipe;
      });
      return newState;
    }
    case GET_RECIPE_DETAILS: {
      return { ...state, allRecipes: {...state.allRecipes}, singleRecipe: {...action.recipe}, currentUserRecipes: {} };
    }
    // case DELETE_RECIPE: {
    //   const newState = { ...state, allRecipes: { ...state.allRecipes }, singleRecipe: { ...state.singleRecipe }, currentUserRecipes: { ...state.currentUserRecipes } }
    //   delete newState.allRecipes[action.payload]
    //   delete newState.currentUserRecipes[action.payload]
    //   delete newState.singleRecipe;
    //   return { ...newState, allRecipes: { ...newState.allRecipes }, singleRecipe: { ...newState.singleRecipe }, currentUserRecipes: { ...newState.currentUserRecipes } };
    // }
    case DELETE_RECIPE: {
      const newState = { ...state, allRecipes: { ...state.allRecipes }, singleRecipe: { ...state.singleRecipe }, currentUserRecipes: { ...state.currentUserRecipes } }
      delete newState.allRecipes[action.recipes]
      delete newState.currentUserRecipes[action.payload]
      delete newState.singleRecipe;
      return { ...newState, allRecipes: { ...newState.allRecipes }, singleRecipe: { ...newState.singleRecipe }, currentUserRecipes: { ...newState.currentUserRecipes } };
    }

    default:
      return state;
  }
}