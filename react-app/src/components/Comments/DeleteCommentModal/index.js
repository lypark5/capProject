import { useDispatch } from 'react-redux';
import { deleteCommentThunk } from '../../../store/comments';
import { useModal } from '../../../context/Modal';

const DeleteCommentModalFunction = ({commentId, recipeId}) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const yesDeleteCommentFunction = async() => {
    await dispatch(deleteCommentThunk(commentId));
    closeModal();
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