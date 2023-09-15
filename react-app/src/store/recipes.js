// action type constants
const GET_ALL_RECIPES = "recipes/GET_ALL_RECIPES";
const GET_RECIPE_DETAILS = "recipes/GET_RECIPE_DETAILS";
const CREATE_RECIPE = "recipes/CREATE_RECIPE";
const UPDATE_RECIPE = "recipes/UPDATE_RECIPE";
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

const createRecipeAction = (recipe) => ({
  type: CREATE_RECIPE,
  recipe
})

const updateRecipeAction = (recipe) => ({
  type: UPDATE_RECIPE,
  recipe
})

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

export const createRecipeThunk = (formData) => async (dispatch) => {
  const res = await fetch('/api/recipes/new', {
    method: 'POST',
    body: formData
  })
  if (res.ok) {
    const recipe = await res.json();
    dispatch(createRecipeAction(recipe));
    return recipe;
  } else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const updateRecipeThunk = (formData, recipeId) => async (dispatch) => {
  const res = await fetch(`/api/recipes/${recipeId}/edit`, {             // i think we use formData.id because we define it in create component line 39
    method: 'PUT',
    body: formData
  });

  if (res.ok) {
    console.log('i am in res.ok of update thunkkkkkk')
    const updatedRecipe = await res.json();
    dispatch(updateRecipeAction(updatedRecipe));
    console.log('updatedREcipe ressss in thunk from backend', updatedRecipe)
    return updatedRecipe;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    console.log('i am in server error thunkkkkkkkk')
    return ["An error occurred. Please try again."];
  }
}

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
      return { 
        ...state, 
        allRecipes: {...state.allRecipes}, 
        singleRecipe: {...action.recipe}, 
        currentUserRecipes: {} 
      };
    }
    case CREATE_RECIPE: {
      return {
        ...state,
        allRecipes: {...state.allRecipes, [action.recipe.id]: action.recipe},
        singleRecipe: action.recipe, 
        currentUserRecipes: {...state.currentUserRecipes, [action.recipe.id]: action.recipe }
      }
    }
    case UPDATE_RECIPE: {
      return {
        ...state,
        allRecipes: {...state.allRecipes, [action.recipe.id]: { ...action.recipe }},
        singleRecipe: action.recipe,        
        currentUserRecipes: {...state.currentUserRecipes, [action.recipe.id]: {...action.recipe}}
      }
    }
    case DELETE_RECIPE: {
      const newState = { ...state, allRecipes: { ...state.allRecipes }, singleRecipe: { ...state.singleRecipe }, currentUserRecipes: { ...state.currentUserRecipes } }
      delete newState.allRecipes[action.recipeId]
      delete newState.currentUserRecipes[action.recipeId]
      delete newState.singleRecipe;
      return { ...newState, allRecipes: { ...newState.allRecipes }, singleRecipe: { ...newState.singleRecipe }, currentUserRecipes: { ...newState.currentUserRecipes } };
    }

    default:
      return state;
  }
}