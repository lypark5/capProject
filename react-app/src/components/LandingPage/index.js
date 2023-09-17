import React from "react";
// import { useHistory } from "react-router-dom";
// import * as sessionActions from '../../store/session';
import { useDispatch } from "react-redux";


function LandingPage() {
  const dispatch = useDispatch();




  return (
      <div style={{backgroundImage: "url('https://recipe-capstone-project.s3.us-east-2.amazonaws.com/yellowFlowers.png')", }}>
          <span>
            <h1>This is landing page</h1>
          </span>
      </div>
  )
}

export default LandingPage