import OpenModalButton from "../../OpenModalButton";
import DeleteCommentModalFunction from "../DeleteCommentModal";
import EditCommentModalFunction from "../EditCommentModal";

const GetAllCommentsByRecipeIdFunction = ({comment, currentUser, recipeId}) => {  // props passed in from get recipe detail component page
  console.log('this is comment inside getallcomm', comment)
  function convertDate(date) {                                                    // function for making nice date format
    const splitData = date.split(' ')
    const cleanData = `${splitData[2]} ${splitData[1]}, ${splitData[3]}`
    return cleanData;
  }

  // if (comment && comment["Author"] == undefined) return <></>
    return (
      <div>

          <div id='comment'>{comment?.comment}</div>

          {comment?.commentPic &&
            <img src={comment.commentPic}/>
          }
          {currentUser.id === comment.userId &&
            <OpenModalButton
              modalComponent={<EditCommentModalFunction commentId={comment.id} userId={currentUser.id} recipeId={recipeId}/>}
              buttonText='edit'
            />
          }

          {currentUser.id === comment.userId &&
            <OpenModalButton
              modalComponent={<DeleteCommentModalFunction commentId={comment.id} userId={currentUser.id} recipeId={recipeId}/>}
              buttonText='delete'
            />
          }

        <span id='commentator-item'>
          <span id='commentator-author'>{comment?.Author?.username}</span>
          <span id='comment-date'>{convertDate(comment?.createdAt)}</span>
        </span>
      </div>
    )
  }
// }

export default GetAllCommentsByRecipeIdFunction