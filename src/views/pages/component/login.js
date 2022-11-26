import axios from "axios";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import serverURL from "../../../utils/serverURL";
import tokenConfig from "../../../utils/tokenConfig";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

//  import Alert from "@material-ui/lab/Alert";

import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";

import { Form, FormGroup } from "react-bootstrap";
import "../../styles/loginSignup.scss";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Fab from "@material-ui/core/Fab";
import ForwardToInbox from "@material-ui/icons/Send";
import MarkEmailRead from "@material-ui/icons/Check";

import { connect } from "react-redux";

import * as loginsignup_actions from "../../../core/login_signup/action/loginSignupAction";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -2,
    left: -2,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  alert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
const LoginC = ({ setAlertS, setAlertM, alertM, alertS }) => {
  const [username, setUserName] = useState("");
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [usernameErr, setUsernameErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();
  const setAlert = (e) => {
    setAlertM(e);
    setAlertS(true);
  };
  const alertClose = (e) => {
    setAlertS(false);
  };
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  const Login = (e) => {
    e.preventDefault();

    const out = {
      username: username,
      password: passwords.password,
    };

    const outJSON = JSON.stringify(out);

    axios
      .post(serverURL() + "user/login", outJSON, tokenConfig())
      .then((result) => {
        console.log("logged In");
        console.log(result);
        localStorage.setItem("token", result.data.token);

        // add returned data to store
        history.push("/explore");
      })
      .catch((error) => {
        console.log(error.response);
        console.log("not logged In");
        console.log(error.response.status);
        console.log(error.response.data.error);
        if (error.response.status < 500 && error.response.status > 399) {
          setAlert(error.response.data.error);
        }
      });
  };

  function validateUsername(newValue) {
    setUserName(newValue);
    let userError = "";
    if (newValue.length === 0) {
      userError = "Enter your username.";
    }
    setUsernameErr(userError);
  }
  function validatePassword(pass) {
    setPasswords({ ...passwords, password: pass });
    let userError = "";
    if (pass.length === 0) {
      userError = "Enter your password.";
    }
    setPassErr(userError);
  }
  const ErrorsOnSubmit = async () => {
    validateUsername(username);
    validatePassword(passwords.password);
    if (!!usernameErr || !!passErr) return;
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    history.push("/login_signup");

    // window.location.reload();
  };

  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const handleSubmit = () => {
    if (email == "") {
      validateEmail(email);
    } else {
      if (!emailErr) {
        if (!loading) {
          setSuccess(false);
          setLoading(true);
          timer.current = window.setTimeout(() => {
            setSuccess(true);
            setLoading(false);
            setOpen(false);
          }, 2000);
        }

        const out = {
          email: email,
        };

        const outJSON = JSON.stringify(out);
        axios
          .post(serverURL() + "user/resetpassword", outJSON, tokenConfig())
          .then((result) => {
            console.log("email sent");
            console.log(result);

            history.push("/login_signup");

            localStorage.setItem("token", result.data.token);
            // window.location.reload();
          })
          .catch((error) => {
            console.log(error.response);
            console.log("email not sent");
            if (error.response.status < 500 && error.response.status > 399) {
              setAlert(error.response.data.error);
            }
          });
      }
    }
  };
  const validemail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  function validateEmail(email) {
    setEmail(email);
    let userError = "";

    if (!validemail.test(String(email).toLowerCase())) {
      userError = "Invalid email address!";
    }
    setEmailErr(userError);
  }

  return (
    <div className="row justify-content-center">
      <Form
        className="centered"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {/* <h3>Login</h3> */}
        <Form.Group controlId="username">
          {/* <label>Username</label> */}
          <Form.Control
            className="loginforms"
            type="text"
            placeholder=" Username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            onBlur={(e) => validateUsername(e.target.value)}
            isInvalid={Boolean(usernameErr)}
          />
          <Form.Control.Feedback type="invalid">
            {usernameErr}
          </Form.Control.Feedback>
        </Form.Group>

        <FormGroup>
          {/* <label>Password</label> */}
          <Form.Control
            className="loginforms"
            type="password"
            placeholder=" Password"
            isInvalid={Boolean(passErr)}
            onChange={(e) => {
              setPasswords({ ...passwords, password: e.target.value });
            }}
            onBlur={(e) => validatePassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {passErr}
          </Form.Control.Feedback>
        </FormGroup>

        <button onClick={Login} className="loginB">
          Login
        </button>
        <p onClick={handleClickOpen} className="forgotpassword">
          Forgot password?
        </p>
        <Dialog
          open={open}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Forgot your password?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              To set a new password, please enter your email address here. If
              the email you specified exists in our system and is verified, we
              will send a password reset link to it.
            </DialogContentText>
            {/* <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
            /> */}
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(e) => {
                validateEmail(e.target.value);
              }}
              onBlur={(e) => validateEmail(e.target.value)}
              isInvalid={Boolean(emailErr)}
            />
            <Form.Control.Feedback type="invalid">
              {emailErr}
            </Form.Control.Feedback>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            {/* <Button onClick={handleSubmit} color="primary">
              Email me
            </Button> */}
            <div className={classes.root}>
              <div className={classes.wrapper}>
                <Fab
                  aria-label="save"
                  color="primary"
                  className={buttonClassname}
                  onClick={handleSubmit}
                >
                  {success ? <MarkEmailRead /> : <ForwardToInbox />}
                  {loading && (
                    <CircularProgress
                      size={60}
                      className={classes.fabProgress}
                    />
                  )}
                </Fab>
              </div>
            </div>
          </DialogActions>
        </Dialog>
        <div className={classes.alert}>
          <Collapse in={alertS}>
           {/* <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={alertClose}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }


            >  */}

              {/* {alertM}
        </Alert> */}
          </Collapse>
        </div>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    alertS: state.login_signup.alertS,
    alertM: state.login_signup.alertM,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setAlertS: (f) => dispatch(loginsignup_actions.setAlertS(f)),
    setAlertM: (f) => dispatch(loginsignup_actions.setAlertM(f)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginC);
