import axios from "axios";
import React from "react";
import { useState} from "react";
import { useHistory } from "react-router";
import serverURL from "../../../utils/serverURL";
import tokenConfig from "../../../utils/tokenConfig";
import Button from "@material-ui/core/Button";
import { Form } from "react-bootstrap";
import "../../styles/loginSignup.scss";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import { connect } from "react-redux";
const ResetPass = ({darkmode}) => {
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
    buttonProgress: {
      color: green[500],
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
  }));
  const [passErr, setPassErr] = useState("");

  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [confirmPassErr, setConfirmPassErr] = useState("");
  const history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  const validpass = /^((?=.*[0-9]{1,})|(?=.*[!.@#$&*-_]{1,}))(?=.*[a-z]{1,}).{8,}$/;

  function validatePassword(pass) {
    setPasswords({ ...passwords, password: pass });
    let userError = "";
    if (pass.length < 8) {
      userError = "Password must be 8 characters long.";
    } else if (!validpass.test(String(pass).toLowerCase())) {
      userError = "Invalid password!";
    }

    setPassErr(userError);
  }
  function validateConfirmPassword(cpass) {
    setPasswords({ ...passwords, confirmPassword: cpass });
    let userError = "";
    if (passwords.password !== cpass) {
      userError = "It doesn't match the password!";
    }
    setConfirmPassErr(userError);
  }

  const resetPassSubmit = (e) => {
    if (
      passwords.password == "" ||
      passwords.confirmPassword == "" ||
      passErr != ""
    ) {
      validatePassword(passwords.password);
      validateConfirmPassword(passwords.confirmPassword);
    } else {
      if (!passErr) {
        if (!loading) {
          setSuccess(false);
          setLoading(true);
          timer.current = window.setTimeout(() => {
            setSuccess(true);
            setLoading(false);
          }, 2000);
        }

        const u = window.location.href.split("?t=").reverse()[0];

        const out = {
          password: passwords.password,
          confirmPassword: passwords.confirmPassword,
          token: u,
        };

        const outJSON = JSON.stringify(out);

        console.log(outJSON);

        axios
          .put(serverURL() + "user/password", outJSON, tokenConfig())
          .then((result) => {
            console.log("pass set");
            console.log(result);
            history.push("/login_signup");

            localStorage.setItem("token", result.data.token);
          })
          .catch((error) => {
            console.log(u);
            console.log(error.response);
            console.log("pass not set");
          });
      }
    }
  };

  return (
    <div className={darkmode}>
    <div className="backgroundDiv">
      <Form
        className="centered"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Form.Control
          className="signupforms"
          type="password"
          placeholder="Password"
          isInvalid={Boolean(passErr)}
          onChange={(e) => {
            validatePassword(e.target.value);
          }}
          onBlur={(e) => validatePassword(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">{passErr}</Form.Control.Feedback>

        <Form.Control
          style={{marginTop:"10px",marginBottom:"17px"}}
          className="signupforms"
          type="password"
          placeholder="Confirm Password"
          isInvalid={Boolean(confirmPassErr)}
          onChange={(e) => {
            validateConfirmPassword(e.target.value);
          }}
          onBlur={(e) => validateConfirmPassword(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          {confirmPassErr}
        </Form.Control.Feedback>

        <div className={classes.wrapper}>
          <Button
            variant="contained"
            color="black"
            className={buttonClassname}
            disabled={loading}
            onClick={resetPassSubmit}
          >
            Set Password
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </Form>
    </div> 
     </div>
  );
};
const mapStateToProps = (state) => {
  return {
    darkmode: state.dark_mode.darkmode,
  };
};

export default connect(mapStateToProps)(ResetPass);