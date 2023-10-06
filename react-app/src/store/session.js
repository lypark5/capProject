// action type constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
// const CREATE_BOOKMARK = "session/CREATE_BOOKMARK";
// const DELETE_BOOKMARK = "session/DELETE_BOOKMARK";


// action creators
const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

// const createBookmarkAction = (bookmark) => ({
//   type: CREATE_BOOKMARK,
//   bookmark
// });

// const deleteBookmarkAction = (bookmark) => ({
//   type: DELETE_BOOKMARK,
//   bookmark
// });


// thunk action creators
// export const createBookmarkThunk = (recipeId, userId) => async (dispatch) => {
// 	const res = await fetch(`/api/bookmarks/${recipeId}/${userId}/new`, {
// 		method: 'POST',
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify({
// 			recipe_id: recipeId,
// 			user_id: userId
// 		})
// 	})

// 	if (res.ok) {
// 		const newBookmark = await res.json();
// 		if (!newBookmark['Delete']) dispatch(createBookmarkAction(newBookmark));
// 		else {
// 			dispatch(deleteBookmarkAction(newBookmark));
// 		}
// 		return newBookmark;
// 	}
// }

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (formData) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		body: formData
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};


const initialState = { user: null };
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		// case CREATE_BOOKMARK: {
		// 	const newState = {...state, user: {...state.user}};
			// console.log("i am at sessionreducerrrrrrrrr", newState.user.bookmarks)
			// newState.user.bookmarks.push(action.bookmark.bookmarkedRecipes);
			// return newState;
			// return {...newState, user: {...newState.user, bookmarks.push(action.bookmark)}}
			// recipe comments is an Object,
			// bookmarks is an Array.

			// user: {
			// 	bookmarks: [],
			// 	email: 'asdfds'

			// }
		// };
		// case DELETE_BOOKMARK: {

		// }
		default:
			return state;
	}
}