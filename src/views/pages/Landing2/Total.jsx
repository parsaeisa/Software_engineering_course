import React, { Component } from 'react'
import Navigation from './components/navigation';
import Header from './components/header';
import Features from './components/features';
import Team from './components/Team';
import * as darkmode_actions from "../../../core/dark_mode/action/darkModeActions";
import { connect } from "react-redux";
import "../../styles/landing.scss";
import Particles from 'react-particles-js';
import { useHistory } from "react-router";

const LandingPage = ({
  darkmode,
  setDarkMode,
}) => {
  const history = useHistory();
  const setDarkStatus = () => {
    console.log(darkmode);
    if (darkmode === "day") {
      setDarkMode("night");
    } else {
      setDarkMode("day");
    }
  };
  const openLoginSignUp = () => {
    history.push("/login_signup");
  }
  return (
    <div className={darkmode}>
    <Navigation darkmode={darkmode} apply={setDarkStatus}/>
      <Header/>
      
     <button className="landing-start-button" onClick={openLoginSignUp}>Start</button>
     <div className="mainContainer">
      {darkmode == "day" &&  <Particles

      params={{
        
        "particles": {
          "number": {
            "value": 80,
            "density": {
              "enable": true,
              "value_area": 700
            }
          },
          "color": {
            "value": "#3d3f8bf6"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#3d3f8bf6"
            },
            "polygon": {
              "nb_sides": 5
            },
          },
          "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 0.1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 3,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 10,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#3d3f8bf6",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "grab"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 140,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      
      }}
    />}
     {darkmode == "night" &&  <Particles
      className="particles-js"
      params={{
        
        "particles": {
          "number": {
            "value": 80,
            "density": {
              "enable": true,
              "value_area": 700
            }
          },
          "color": {
            "value": "#2b6faf"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#9dc1e1"
            },
            "polygon": {
              "nb_sides": 5
            },
          },
          "opacity": {
            "value": 0.5,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 0.1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 5,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 10,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#9dc1e1",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "grab"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 140,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      
      }}
    />}
    
    <Features id="features"/>
      <Team id="team"/>
 </div>
   
    
  </div>);
};

const mapStateToProps = (state) => {
  return {
    darkmode: state.dark_mode.darkmode,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setDarkMode: (av) => dispatch(darkmode_actions.setDarkMode(av)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

