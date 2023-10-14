import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from '../../../context/Modal';
import { editCommentThunk } from "../../../store/comments";
import './EditCommentModal.css';


const EditCommentModalFunction = ({commentId}) => {       // this variable does not need to match name in store
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const commentBeingEdited = useSelector(state => state.comments.recipeComments[commentId]);
  const [commentTxt, setCommentTxt] = useState(commentBeingEdited.comment);
  const [errors, setErrors] = useState({});
  // add disabled stuff

  useEffect(() => {
    const errObj = {};
    if (!commentTxt) {
      errObj.commentTxt = 'Comment is required'
    }
    if (commentTxt && commentTxt.length < 255) {
      errObj.commentTxt = 'Comment must be less than 255 characters.'
    }
    setErrors(errObj);
  }, [commentTxt]);      // dependency array don't need to look at the length, every time the user changes this, it will rerender page.

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalComment = {comment: commentTxt};
    await dispatch(editCommentThunk(finalComment, commentId));
    closeModal();
  }

  // add errors
  return (
    <div className='modal' id='edit-comment-modal'>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Leave your comment here!"
          value={commentTxt}
          onChange={(e) => setCommentTxt(e.target.value)}
          type="textarea"
          id='edit-comment-input'
        />
        {/* {valObj.commentTxt && <p className="errors">{valObj.commentTxt}</p>} */}
        <div className="comment-buttons-div"> 
          <button type="submit" className="comment-button">Update</button>
          <button onClick={closeModal} className='comment-button'>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default EditCommentModalFunction














//what works for formData
///////////////////////////////////////
  // useEffect(() => {
  //   dispatch(getAllCommentsByRecipeIdThunk(recipeId))
  //   if (commentBeingEdited) {
  //     setCommentTxt(commentBeingEdited.comment);
  //     setCommentPic(commentBeingEdited.commentPic);
  //   }
  // }, [commentBeingEdited?.comment]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // const errObj = {};
  //   const editedCommentData = new FormData();
  //   editedCommentData.append("comment", commentTxt);         // first arg is real property name, need snake case
  //   editedCommentData.append("comment_pic", commentPic? commentPic : commentBeingEdited.commentPic);

  //   const updatedComment = await dispatch(editCommentThunk(editedCommentData, commentId));
  //   if (updatedComment.id) {                             // if edited recipe exists,
  //     // await dispatch(getAllCommentsByRecipeIdThunk(+recipeId))
  //     await dispatch(deleteCommentThunk(commentBeingEdited.id))
  //     // await get recipe detail thunk?
  //     setCommentTxt('')
  //     // set comment pic?
  //     closeModal();
  //   }
  // }

//   return (
//     <div>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <textarea
//           placeholder="Leave your comment here!"
//           value={commentTxt}
//           onChange={(e) => setCommentTxt(e.target.value)}
//           type="textarea"
//         />
//         <input
//           type='file'
//           placeholder='Choose your photo'
//           onChange={(e) => setCommentPic(e.target.files[0])}
//           accept="image/png, image/jpeg, image/jpg, image/gif, image/pdf"
//         />
//         {/* {valObj.commentTxt && <p className="errors">{valObj.commentTxt}</p>} */}
//         <button type="submit" disabled={disabled} id={buttonId}>Post</button>
//       </form>
//     </div>
//   )
// }

// export default EditCommentModalFunction
///////////////////////////////////////  