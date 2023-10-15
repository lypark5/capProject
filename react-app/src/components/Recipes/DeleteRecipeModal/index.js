import { useDispatch } from 'react-redux';
import { deleteRecipeThunk } from '../../../store/recipes';       // get current user recipes later
import { useModal } from '../../../context/Modal';


function DeleteRecipeModalFunction({recipeId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const yesDeleteRecipeFunction = async() => {
    await dispatch(deleteRecipeThunk(recipeId));
    console.log('inside yes delete option of modal')
    closeModal();
  }

  return (
    <div className='modal delete-modal'>
      <h1 className='confirm-title'>Confirm Delete</h1>
      <div className='yes-no-buttons-div'>
        <button onClick={yesDeleteRecipeFunction} className='comment-button'>Yes</button>
        <button onClick={closeModal} className='comment-button'>No</button>
      </div>
    </div>
  )
}

export default DeleteRecipeModalFunction;