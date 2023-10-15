import { useDispatch } from 'react-redux';
import { deleteCommentThunk } from '../../../store/comments';
import { useModal } from '../../../context/Modal';
import './DeleteCommentModal.css';

const DeleteCommentModalFunction = ({commentId, recipeId}) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const yesDeleteCommentFunction = async() => {
    await dispatch(deleteCommentThunk(commentId));
    closeModal();
  }

  return (
    <div className='modal delete-modal'>
      <h1 className='confirm-title'>Confirm Delete</h1>
      <div className='yes-no-buttons-div'>
        <button onClick={yesDeleteCommentFunction} className='comment-button'>Yes</button>
        <button onClick={closeModal} className='comment-button'>No</button>
      </div>
    </div>
  )
}


export default DeleteCommentModalFunction