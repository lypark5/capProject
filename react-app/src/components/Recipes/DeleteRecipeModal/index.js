import { useDispatch } from 'react-redux';
import { deleteRecipeThunk } from '../../../store/recipes';       // get current user recipes later
import { useModal } from '../../../context/Modal';


function DeleteRecipeModalFunction({recipeId, userId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const yesDeleteRecipeFunction = async() => {
    await dispatch(deleteRecipeThunk(recipeId));
    closeModal();
  }

  return (
    <div>
      <h3>Confirm Delete</h3>
      <div className='yes-no-buttons'>
        <button onClick={yesDeleteRecipeFunction} className='yes-button'>Yes</button>
        <button onClick={closeModal} className='no-button'>No</button>
      </div>
    </div>
  )
}

export default DeleteRecipeModalFunction;