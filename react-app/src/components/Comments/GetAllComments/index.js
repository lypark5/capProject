// import OpenModalButton from '../OpenModalButton'
// import { DeleteCommentsModal } from '../DeleteCommentsModal';

const GetAllCommentsByRecipeIdFunction = ({comment, currentUser, recipeId}) => {  // props passed in from get recipe detail component page

  function convertDate(date) {                                                    // function for making nice date format
    const splitData = date.split(' ')
    const cleanData = `${splitData[2]} ${splitData[1]}, ${splitData[3]}`
    return cleanData;
  }

  if (comment && comment["Author"] == undefined) return <></>
    return (
      <div>

          <div id='comment'>{comment?.comment}</div>
          {/* {currentUser.id === comment.userId &&
            <OpenModalButton
              modalComponent={<DeleteCommentsModal commentId={comment.id} userid={currentUser.id} photoId={photoId}/>}
              buttonText={<i className="fas fa-trash-alt" id='comment-trash-icon'></i>}
              id='comment-trash-button'
            />
          } */}

        <span id='commentator-item'>
          <span id='commentator-author'>{comment?.Author?.username}</span>
          <span id='comment-date'>{convertDate(comment?.createdAt)}</span>
        </span>
      </div>
    )
  }
// }

export default GetAllCommentsByRecipeIdFunction