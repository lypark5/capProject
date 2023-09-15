import { useEffect, useState } from "react";
import { createCommentThunk, getAllCommentsByRecipeIdThunk } from "../../../store/comments";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
// import { thunkGetSinglePhoto } from "../../store/photos";

const CreateCommentFunction = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const comments = useSelector(state => state.comments.recipeComments);
  const {recipeId} = useParams();
  const user = useSelector(state => state.session.user);
  const [commentTxt, setCommentTxt] = useState('');
  const [commentPic, setCommentPic] = useState(null);
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [buttonId, setButtonId] = useState('disabled-comment-button');

   useEffect(() => {
    const errObj = {};
    if (commentTxt && (commentTxt.length < 3 || commentTxt.length > 100)) errObj.commentTxt = "Comments must be between 3 and 100 characters";
    if (commentTxt.length > 3 && commentTxt.length < 100) {
      setDisabled(false);
      setButtonId('enabled-comment-button')
    } else {
      setDisabled(true);
    }
    setErrors(errObj);
  }, [dispatch, commentTxt.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCommentData = new FormData();
    newCommentData.append("comment", commentTxt);         // first arg is real property name, need snake case
    newCommentData.append("comment_pic", commentPic);
    const newComment = await dispatch(createCommentThunk(newCommentData, recipeId));
    if (newComment.id) {                             // if new recipe exists,
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
          onChange={(e) => setCommentPic(e.target.files[0])}
          accept="image/png, image/jpeg, image/jpg, image/gif, image/pdf"
        />
        {/* {valObj.commentTxt && <p className="errors">{valObj.commentTxt}</p>} */}
        <button type="submit" disabled={disabled} id={buttonId}>Post</button>
      </form>
    </div>
  )
}

export default CreateCommentFunction