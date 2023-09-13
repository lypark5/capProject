// action type constants
const GET_ALL_COMMENTS = 'comments/GET_ALL_COMMENTS';


// action creators
const getAllCommentsByRecipeIdAction = (comments) => ({
  type: GET_ALL_COMMENTS,
  comments
});


// thunk action creators
export const getAllCommentsByRecipeIdThunk = (recipeId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${recipeId}`);
  if (res.ok) {
    const commentsData = await res.json();
    dispatch(getAllCommentsByRecipeIdAction(commentsData.comments));           // extra comments cuz in backend we added the keyword comments: with res as value.
    return commentsData;
  }
}


// reducer
const initialState = { recipeComments: {}, userComments: {} };  
export default function commentReducer (state = initialState, action) {
  let newState;
  switch(action.type) {
    case GET_ALL_COMMENTS: {
      newState = {...state, recipeComments: {}}
      action.comments.forEach(comment => {
        newState.recipeComments[comment.id] = comment
      })
      return newState;
    }
    default:
      return state;
  }
}
