import { useEffect, useState } from "react";
import { editCommentThunk, getAllCommentsByRecipeIdThunk } from "../../../store/comments";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
// import { thunkGetSinglePhoto } from "../../store/photos";

const EditCommentModalFunction = ({commentId, userId, recipeId}) => {
  const dispatch = useDispatch();
  // const history = useHistory();
  // const comments = useSelector(state => state.comments.recipeComments);
  // const {recipeId} = useParams();
  // const user = useSelector(state => state.session.user);
  const [commentTxt, setCommentTxt] = useState('');
  const [commentPic, setCommentPic] = useState(null);
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [buttonId, setButtonId] = useState('disabled-comment-button');

  const allCommentsEver = useSelector(state => state.comments.recipeComments)
  const commentBeingEdited = useSelector(state => state.comments.recipeComments[commentId])
  console.log('all commentttsssss', allCommentsEver)
  console.log('commentIddddddddd', commentId)

  console.log('current comment being editedddd', commentBeingEdited)

  useEffect(() => {
    const errObj = {};
    setCommentTxt(commentBeingEdited.comment);
    setCommentPic(commentBeingEdited.commentPic);
    // if (commentTxt && (commentTxt.length < 3 || commentTxt.length > 100)) errObj.commentTxt = "Comments must be between 3 and 100 characters";
    // if (commentTxt.length > 3 && commentTxt.length < 100) {
    //   setDisabled(false);
    //   setButtonId('enabled-comment-button')
    // } else {
      setDisabled(false);
    // }
    setErrors(errObj);
  }, [dispatch, commentBeingEdited.commentTxt, commentBeingEdited.commentPic]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editedCommentData = new FormData();
    editedCommentData.append("comment", commentTxt);         // first arg is real property name, need snake case
    editedCommentData.append("comment_pic", commentPic);

    const updatedComment = await dispatch(editCommentThunk(editedCommentData, commentId));
    if (updatedComment.id) {                             // if edited recipe exists,
      await dispatch(getAllCommentsByRecipeIdThunk(+recipeId))
      // await get recipe detail thunk?
      setCommentTxt('')
      // set comment pic?
    }
  }
  

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <textarea
          placeholder="Leave your comment here!"
          value={commentTxt}
          onChange={(e) => setCommentTxt(e.target.value)}
          type="textarea"
        />
        <input
          type='file'
          placeholder='Choose your photo'
          onChange={(e) => setCommentPic(e.target.files[0])}
          accept="image/png, image/jpeg, image/jpg, image/gif, image/pdf"
        />
        {/* {valObj.commentTxt && <p className="errors">{valObj.commentTxt}</p>} */}
        <button type="submit" disabled={disabled} id={buttonId}>Post</button>
      </form>
    </div>
  )
}

export default EditCommentModalFunction