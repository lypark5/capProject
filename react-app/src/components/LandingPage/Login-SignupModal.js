import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";


function LoginSignupModalFunction() {
  const { closeModal } = useModal();

  return (
    <div>
      <OpenModalButton
        buttonText="Log In"
        onItemClick={closeModal}
        modalComponent={<LoginFormModal />}
      />
      <OpenModalButton
        buttonText="Sign Up"
        onItemClick={closeModal}
        modalComponent={<SignupFormModal />}
      />
    </div>
  )

}

export default LoginSignupModalFunction;
