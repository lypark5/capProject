import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./LoginFormModal.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});       // might need to switch to obj later
  const { closeModal } = useModal();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      history.push('/recipes/all');
      closeModal();
    }
  };


  useEffect(() => {
    const errObj = {};
    if (email && email.length < 4) {
      errObj.email = 'Username must be at least 4 characters long'
    };
    if (password && password.length < 6) {
      errObj.password = 'Password must be at least 6 characters long'
    };
    setErrors(errObj);
  }, [email.length, password.length]);


  const DemoUserLoginFunction = () => {
    const email = 'demo@aa.io';
    const password = 'password';
    return dispatch(login(email, password))
      .then (() => history.push('/recipes/all'))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
      });
  }

  
  return (
    <div id='login-modal' className="modal2">
      <h1 id='login-title'>Log In</h1>
      <form onSubmit={handleSubmit} id='login-form'>
        {/* <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul> */}
        <label>
          Email
        </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='login-input'
        />
        <label style={{marginTop:'15px'}}>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='login-input'
        />
        <div id='login-button-div'>
          <button type="submit" id='login-submit-button'>Log In</button>
        </div>
      </form>
      <div id='demo-button-div'>
        <button onClick={DemoUserLoginFunction} id='demo-button'>Demo User</button>
      </div>
    </div>
  );
}

export default LoginFormModal;
