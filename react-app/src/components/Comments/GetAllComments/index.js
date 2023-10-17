import OpenModalButton from "../../OpenModalButton";
import DeleteCommentModalFunction from "../DeleteCommentModal";
import EditCommentModalFunction from "../EditCommentModal";
import './GetAllComments.css'


const GetAllCommentsByRecipeIdFunction = ({comment, currentUser, recipeId}) => {  // props passed in from get recipe detail component page
  function convertDate(date) {                                                    // function for making nice date format
    const splitData = date.split(' ')
    const cleanData = `${splitData[2]} ${splitData[1]}, ${splitData[3]}`
    return cleanData;
  }


  return (
    <div id='each-comment-card'>
      <div id='comment-section'>
        {comment?.commentPic &&
          <img src={comment.commentPic} id='comment-pic'/>
        }
        <div id='comment-and-buttons'>
          <span id='comment-text'>{comment?.comment}</span>
          <div className='comment-buttons-div'>
            {currentUser.id === comment.userId &&
              <OpenModalButton
                modalComponent={<EditCommentModalFunction commentId={comment.id} userId={currentUser.id} recipeId={recipeId}/>}
                buttonText='edit'
                className='comment-button'
              />
            }
            {currentUser.id === comment.userId &&
              <OpenModalButton
                modalComponent={<DeleteCommentModalFunction commentId={comment.id} userId={currentUser.id} recipeId={recipeId}/>}
                buttonText='delete'
                className='comment-button'
              />
            }
          </div>
        </div>
      </div>
      <div id='commentator-item'>
        <span id='commentator-author'>{comment?.Author?.username}</span>
        <span id='comment-date'>{convertDate(comment?.createdAt)}</span>
      </div>
    </div>
  )
}


export default GetAllCommentsByRecipeIdFunction