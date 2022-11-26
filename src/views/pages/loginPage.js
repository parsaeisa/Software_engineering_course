import React from "react";
import Button from "@material-ui/core/Button";
import "../styles/loginSignup.scss";
import LoginC from "./component/login";
import SignUp from "./component/signUp";

import { connect } from "react-redux";

import * as loginsignup_actions from "../../core/login_signup/action/loginSignupAction";
import * as darkmode_actions from "../../core/dark_mode/action/darkModeActions";

const LoginSignup = ({
  change,
  setChange,
  setAlertS,
  darkmode,
  setDarkMode,
}) => {
  const setMov = (e) => {
    var thePhoto = document.getElementById("signupphoto");
    if (change) {
      thePhoto.classList.add("unchange");
      thePhoto.classList.remove("change");

      setChange(false);
      setAlertS(false);
    } else {
      thePhoto.classList.add("change");
      thePhoto.classList.remove("unchange");
      setChange(true);
      setAlertS(false);
    }
    var theSignupform = document.getElementById("signupform");
    theSignupform.classList.toggle("signupshow");
    var theLoginform = document.getElementById("loginform");
    theLoginform.classList.toggle("loginhide");
  };
  const setDarkStatus = () => {
    console.log(darkmode);
    if (darkmode === "day") {
      setDarkMode("night");
    } else {
      setDarkMode("day");
    }
  };
  return (
    <div className={darkmode}>
      <div className="backgroundDiv">
        <div className="darkmode-icon" onClick={setDarkStatus}>
        {darkmode == "day" && (
            <img  className="darkmode" src="moon.svg"></img>
          )}
          {darkmode == "night" && (
           <img  className="darkmode" src="sun.svg"></img>
          )}
                  </div>
        <div className="mainDiv centered">
          <div className="loginform" id="loginform">
            <div className="loginpage">
              <LoginC></LoginC>
            </div>
          </div>
          <div className="signupform" id="signupform">
            <div className="signuppage">
              <SignUp></SignUp>
            </div>
          </div>
          <div className="photo_login" id="signupphoto">
            <h1 className="text_header"> Sharp </h1>
            <p className="start-text1 "> E x p l o r e </p>
            <p className="start-text2 "> Y o u r </p>
            <p className="start-text3 "> M i n d </p>
            <p className="start-text4 "> O u t </p>
            <Button
              onClick={setMov}
              id="mybutton"
              size="large"
              className="buttonMain"
              variant="outlined"
            >
              Start
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    change: state.login_signup.change,
    alertS: state.login_signup.alertS,

    darkmode: state.dark_mode.darkmode,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setChange: (f) => dispatch(loginsignup_actions.setChange(f)),
    setAlertS: (f) => dispatch(loginsignup_actions.setAlertS(f)),

    setDarkMode: (av) => dispatch(darkmode_actions.setDarkMode(av)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignup);
