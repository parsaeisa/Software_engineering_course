import React, { Component } from "react";
import "../../../styles/landing.scss";
const Navigation = (props) => {
  const changeDarkMode = () => {
    props.apply({
      darkmode: props.darkmode,
    });
  };
  return (
    <nav className="landing-navbar">
      <div className="darkmode-icon" onClick={changeDarkMode}>
        {props.darkmode == "day" && (
          <img className="darkmode" src="moon.svg"></img>
        )}
        {props.darkmode == "night" && (
          <img className="darkmode" src="sun.svg"></img>
        )}
      </div>
        <a href="#features"><p className="landing-navbar-items" >About Us</p></a>
        <a href="#team"><p className="landing-navbar-items" >Contact Us</p></a>    
    </nav>
  );
};

export default Navigation;
