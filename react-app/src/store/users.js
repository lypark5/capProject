// action type constants
const GET_ALL_USERS = "users/GET_ALL_USERS";
const GET_USER = "users/GET_USER";


// action creators
export const getAllUsersAction = (users) => ({
  type: GET_ALL_USERS,
  users
});

export const getUserAction = (user) => ({
  type: GET_USER,
  user
});


// thunk action creators
export const getAllUsersThunk = () => async (dispatch) => {
  const res = await fetch('/api/users/');
  if (res.ok) {
    const users = await res.json();
    dispatch(getAllUsersAction(users.Users));       // we need to do users.users cuz backend we add the key 'users'.  it returns {'users': [user, user, user]}
    return users;
  }
};

export const getUserThunk = (userId) => async (dispatch) => {     // need to pass in userId for requesting the correct info from backend for this userId.
  const res = await fetch(`/api/users/${userId}`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  if (res.ok) {
    const data = await res.json();
    dispatch(getUserAction(data));
  } else {
    return ["An error occurred. Please try again."]
  }
};


// reducer
const initialState = {allUsers: {}, singleUser: {}};
export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case GET_ALL_USERS: {
      const newState = {...state, allUsers: {...state.allUsers}, singleUser: {}};    // first copy OG state, then spread in and fill in allUsers obj.
      action.users.forEach(user => {
        newState.allUsers[user.id] = user;
      });
      return newState;
    }
    case GET_USER:
      return {...state, singleUser: {...action.user}, allUsers: {}};                  // my version, but could be wrong.
      // return {...state, singleUser: {...action.user}, allUsers: {...state.allUsers}};   // spreading in any all users, plus single user.
    default:
      return state;
  }
}
