import React from "react";
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import { useDispatch } from "react-redux";


function LandingPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const DemoUserLoginFunction = () => {         // function for logging in the demo user.
      const email = 'demo@aa.io';               // use these specific constants for the logging in thunk
      const password = 'password';
      return dispatch(sessionActions.login(email, password))    // after doing the login,
        .then (() => history.push('/recipes/all'))              // history.push that to get-all-recipes page.
        .catch(async (res) => {
          const data = await res.json();
        });
    }

  return (
      <div style={{backgroundImage: "url('https://recipe-capstone-project.s3.us-east-2.amazonaws.com/yellowFlowers.png')", }}>
          <span>
            <h1>This is landing page</h1>
            <button id='demo' onClick={DemoUserLoginFunction}>Demo User</button>
          </span>
      </div>
  )
}

export default LandingPage