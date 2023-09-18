import React from "react";
import { useDispatch } from "react-redux";
import './LandingPage.css'


function LandingPage() {
  const dispatch = useDispatch();




  return (
      <div id='landing-pic-div'>
        <h1 id='welcome-title'>Welcome to the party!</h1>
      </div>
  )
}

export default LandingPage