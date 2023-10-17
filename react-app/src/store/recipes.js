// action type constants
const GET_ALL_RECIPES = "recipes/GET_ALL_RECIPES";
const GET_RECIPE_DETAILS = "recipes/GET_RECIPE_DETAILS";
const CREATE_RECIPE = "recipes/CREATE_RECIPE";
const EDIT_RECIPE = "recipes/EDIT_RECIPE";
const DELETE_RECIPE = "recipes/DELETE_RECIPE";
const CREATE_BOOKMARK = 'bookmarks/CREATE_BOOKMARK';
const DELETE_BOOKMARK = 'bookmarks/DELETE_BOOKMARK';
const SEARCH_RECIPE = 'recipes/SEARCH_RECIPE';


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

const editRecipeAction = (recipe) => ({
  type: EDIT_RECIPE,
  recipe
})

const deleteRecipeAction = (recipeId) => ({
  type: DELETE_RECIPE,
  recipeId
})

const createBookmarkAction = (bookmarks) => ({
  type: CREATE_BOOKMARK,
  bookmarks
})

const deleteBookmarkAction = (bookmark) => ({
  type: DELETE_BOOKMARK,
  bookmark
})

const searchRecipeAction = (recipes) => ({
  type: SEARCH_RECIPE,
  recipes
})


// thunk action creators
export const getAllRecipesThunk = () => async (dispatch) => {
  const res = await fetch('/api/recipes/all');        // the backend route for fetching.
  if (res.ok) {
    const recipes = await res.json();
    dispatch(getAllRecipesAction(recipes.Recipes));
    return recipes;
  } else {
    const data = await res.json();    // bad error
    return data;
  }
}

export const getRecipeDetailsThunk = (recipeId) => async (dispatch) => {           // so take in the identifier id
  const res = await fetch(`/api/recipes/${recipeId}`);                        // go to this backend address to fetch
  if (res.ok) {
    const recipe = await res.json();
    dispatch(getRecipeDetailsAction(recipe));                                 // dispatch action
    return recipe;                                                            // then send back this recipe obj
  } else {
    const data = await res.json();    // bad error
    return data;
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
    const data = await res.json();    // bad error
    return data;
  }
}

export const editRecipeThunk = (recipe, recipeId) => async (dispatch) => {
  const res = await fetch(`/api/recipes/${recipeId}/edit`, {             // i think we use formData.id because we define it in create component line 39
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(recipe)
  });
  if (res.ok) {
    const editedRecipe = await res.json();
    dispatch(editRecipeAction(editedRecipe));
    return editedRecipe;
  } else {
    const data = await res.json();  // this returns the error data.
    return data;
  }
}

export const deleteRecipeThunk = (recipeId) => async (dispatch) => {
  const res = await fetch(`/api/recipes/${recipeId}/delete`, {
    method: 'DELETE'
  })
  if (res.ok) {
    await dispatch(deleteRecipeAction(recipeId))
  } else {
    const data = await res.json();    // bad error
    return data;
  }
}

export const createBookmarkThunk = (recipeId, userId) => async (dispatch) => {
	const res = await fetch(`/api/recipes/bookmark/${recipeId}/${userId}`, {
		method: 'POST',
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			recipe_id: recipeId,
			user_id: userId
		})
	})

	if (res.ok) {
    dispatch(getRecipeDetailsThunk(recipeId));
		return res;
	}
}

export const deleteBookmarkThunk = (recipeId, userId) => async (dispatch) => {
  const res = await fetch(`/api/recipes/${recipeId}/${userId}/unbookmark`, {
    method: 'DELETE'
  })

  if (res.ok) {
    dispatch(getRecipeDetailsThunk(recipeId));
    return res;
  }
}

export const searchRecipeThunk = (searchWord) => async (dispatch) => {
  const res = await fetch('/api/recipes/search', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
		body: JSON.stringify({'searchWord': searchWord})
  })
  if (res.ok) {
    const data = await res.json();
    dispatch(searchRecipeAction(data));
  } else {
    const data = await res.json();
    return data;
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
    case EDIT_RECIPE: {
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
    case SEARCH_RECIPE: {
      const newState = {...state, allRecipes: {}, singleRecipes: {} }
      action.recipes.Recipes?.forEach(recipe => {
        newState.allRecipes[recipe.id] = recipe                
      });
      return newState ; 
    }

    default:
      return state;
  }
}