// action type constants
const GET_ALL_COMMENTS = 'comments/GET_ALL_COMMENTS';
const CREATE_COMMENT = 'comments/CREATE_COMMENT';
const EDIT_COMMENT = 'comments/EDIT_COMMENT';
const DELETE_COMMENT = 'comments/DELETE_COMMENT';


// action creators
const getAllCommentsByRecipeIdAction = (comments) => ({
  type: GET_ALL_COMMENTS,
  comments
});

const createCommentAction = (comment) => ({
  type: CREATE_COMMENT,
  comment
});

const editCommentAction = (comment) => ({
  type: EDIT_COMMENT,
  comment
})

const deleteCommentAction = (commentId) => ({
  type: DELETE_COMMENT,
  commentId
})


// thunk action creators
export const getAllCommentsByRecipeIdThunk = (recipeId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${recipeId}`);
  if (res.ok) {
    const commentsData = await res.json();
    dispatch(getAllCommentsByRecipeIdAction(commentsData.comments));           // extra comments cuz in backend we added the keyword comments: with res as value.
    return commentsData;
  } else {
    const data = await res.json();    // bad error
    return data;
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
  } else {
    const data = await res.json();    // bad error
    return data;
  }
}

export const editCommentThunk = (comment, commentId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${commentId}/edit`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(comment)
  });
  if (res.ok) {
    const editedComment = await res.json();
    dispatch(editCommentAction(editedComment));
    return editedComment;
  } else {
    const data = await res.json();  // this returns the error data.
    return data;
  }
}

export const deleteCommentThunk = (commentId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${commentId}/delete`, {
    method: 'DELETE'
  });
  if (res.ok) {
    dispatch(deleteCommentAction(commentId));
  } else {
    const data = await res.json();    // bad error
    return data;
  }
}


// reducer
const initialState = { recipeComments: {} };  
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
      const newState = {...state, recipeComments: {...state.recipeComments}};  // ...state is a copy of the initial state.  recipeComments: {...state.recipeComments} is copying and spreading the prev state values into there.
      newState.recipeComments[action.comment.id] = action.comment;
      return newState;
    }
    case EDIT_COMMENT: {
      const newState = {...state, recipeComments: {...state.recipeComments}};
      newState.recipeComments[action.comment.id] = {...action.comment};
      return newState;
    }
    case DELETE_COMMENT: {
      const newState = {...state, recipeComments: {...state.recipeComments}};
      delete newState.recipeComments[action.commentId];
      return newState;
    }

    default:
      return state;
  }
}






///////////////////////////////////////////////
// the formData version.  It only works when you add a new pic.  if not add, there is 0 pic.  can't grab the prev one.
// export const editCommentThunk = (formData, commentId) => async (dispatch) => {
//   const res = await fetch(`/api/comments/${commentId}/edit`, {
//     method: 'PUT',
//     body: formData
//   });
//   if (res.ok) {
//     const editedComment = await res.json();
//     dispatch(editCommentAction(editedComment));
//     return editedComment;
//   } 
//   else {
//     const data = await res.json();  // this returns the error data.
//     return data;
//   }
// }
///////////////////////////////////////////////