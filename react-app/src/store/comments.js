// action type constants
const GET_ALL_COMMENTS = 'comments/GET_ALL_COMMENTS';
const CREATE_COMMENT = 'comments/CREATE_COMMENT';


// action creators
const getAllCommentsByRecipeIdAction = (comments) => ({
  type: GET_ALL_COMMENTS,
  comments
});

const createCommentAction = (comment) => ({
  type: CREATE_COMMENT,
  comment
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

export const createCommentThunk = (commentData, recipeId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${recipeId}/new`, {
    method: 'POST',
    body: commentData
  });
  if (res.ok) {
    const commentData = await res.json();
    dispatch(createCommentAction(commentData));
    return commentData;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
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
    case CREATE_COMMENT: {
      const newState = {...state, recipeComments: {...state.recipeComments}};
      newState.recipeComments[action.comment.id] = action.comment;
      return newState;
    }

    default:
      return state;
  }
}
