import React from "react";
import { useDispatch } from "react-redux";
import './LandingPage.css'
import OpenModalButton from "../OpenModalButton";
import LoginSignupModalFunction from "./Login-SignupModal";
import { useModal } from "../../context/Modal";


function LandingPage() {

  return (
      <div id='landing-pic-div'>
        <OpenModalButton 
          buttonText='Welcome to the party!'
          modalComponent={<LoginSignupModalFunction />}
          id='welcome-title'
        />
      </div>
  )
}

export default LandingPage