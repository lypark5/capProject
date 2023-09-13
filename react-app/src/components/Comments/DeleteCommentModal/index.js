import { useDispatch } from 'react-redux';
// import { thunkDeleteComment, thunkGetAllCommentsByPhotoId } from '../../store/comments';
import { deleteCommentThunk } from '../../../store/comments';
import { useModal } from '../../../context/Modal';
// import { useHistory } from 'react-router-dom';

const DeleteCommentModalFunction = ({commentId, recipeId}) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  // const history = useHistory();

  const yesDeleteCommentFunction = async() => {
    await dispatch(deleteCommentThunk(commentId));
    // await dispatch(thunkGetAllCommentsByPhotoId(photoId))  // prolly dont need this
    closeModal();
    // history.push(`/photos/${photoId}`);  // i prolly dont need this cuz it's a modal
  }

  return (
    <div>
      <h3>Confirm Delete</h3>
      <div className='yes-no-buttons'>
        <button onClick={yesDeleteCommentFunction} className='yes-button'>Yes</button>
        <button onClick={closeModal} className='no-button'>No</button>
      </div>
    </div>
  )
}


export default DeleteCommentModalFunction