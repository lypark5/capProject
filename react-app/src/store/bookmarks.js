// action type constants
const GET_ALL_BOOKMARKS = 'bookmarks/GET_ALL_BOOKMARKS';
const CREATE_BOOKMARK = 'bookmarks/CREATE_BOOKMARK';
const DELETE_BOOKMARK = 'bookmarks/DELETE_BOOKMARK';


// action creators
const getAllBookmarksAction = (bookmarks)  => ({
  type: GET_ALL_BOOKMARKS,
  bookmarks
})

const createBookmarkAction = (bookmarks) => ({
  type: CREATE_BOOKMARK,
  bookmarks
})

const deleteBookmarkAction = (bookmark) => ({
  type: DELETE_BOOKMARK,
  bookmark
})


// thunk action creators
export const getAllBookmarksThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/bookmarks/${userId}`)
  if (res.ok) {
    const bookmarksOfUser = await res.json();
    dispatch(getAllBookmarksAction(bookmarksOfUser));
  }
}

export const createBookmarkThunk = (recipeId, userId) => async (dispatch) => {
	const res = await fetch(`/api/bookmarks/${recipeId}/${userId}/new`, {
		method: 'POST',
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			recipe_id: recipeId,
			user_id: userId
		})
	})

	if (res.ok) {
		const newBookmark = await res.json();
		if (!newBookmark['Delete']) dispatch(createBookmarkAction(newBookmark));
		else {
			dispatch(deleteBookmarkAction(newBookmark));
		}
		return newBookmark;
	}
}



// export const thunkCreateFav = (userId, photoId) => async (dispatch) => {

//     const res = await fetch(`/api/fav/${userId}/${photoId}/new`, {
//         method: 'POST',
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             user_id: userId,
//             photo_id : photoId,
//         })
//     })

//     if (res.ok) {
//         const favPhoto = await res.json();
//         if (!favPhoto['Delete'])  dispatch(newFav(favPhoto));
//         else {

//             dispatch(deleteFav(favPhoto))

//         }
//         return favPhoto
//     }
// }

const initialState = {myBookmarks: {}}
export default function bookmarkReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_BOOKMARKS: {
            const newState = {myBookmarks: {}}
            action.bookmarks.favPhotos.forEach(fav => {
                newState.myBookmarks[fav.id] = fav;
            })
            return newState
        }
        case CREATE_BOOKMARK: {
            const newState = {...state, myBookmarks: {...state.myBookmarks}}
            return {...newState, myBookmarks: {...newState.myBookmarks, [action.bookmarks.bookmarkedRecipes.id]:{...action.bookmarks.bookmarkedRecipes}}}
        }
        // case Delete_Fav: {

        //     const newState = {...state, myBookmarks: {...state.myBookmarks}}
        //     delete newState.myBookmarks[action.favorite.favPhotos.id]
        //     return {...newState, myBookmarks: {...newState.myBookmarks}}
        // }

        default:
            return state
    }
}



