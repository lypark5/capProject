import { useModal } from '../../context/Modal';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";


function LoginSignupModalFunction() {
  const { closeModal } = useModal();

  return (
    <div className='modal' id='enter-modal'>
      <OpenModalButton
        buttonText="Log In"
        onItemClick={closeModal}
        modalComponent={<LoginFormModal />}
        className='login-or-signup-button'
      />
      <p id='or'>-- or --</p>
      <OpenModalButton
        buttonText="Sign Up"
        onItemClick={closeModal}
        modalComponent={<SignupFormModal />}
        className='login-or-signup-button'
      />
    </div>
  )

}

export default LoginSignupModalFunction;
