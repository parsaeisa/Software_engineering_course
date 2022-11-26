import React from "react";
import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";
import { Form } from "react-bootstrap";
import "../../styles/loginSignup.scss";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import { connect } from "react-redux";
const VerifyEmail = ({darkmode}) => {
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

  const resetPassSubmit = (e) => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);

        history.push("/login_signup");
      }, 2000);
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
        {" "}
        <h2>Account Verified!</h2>
        <div className={classes.wrapper}>
          <Button
            variant="contained"
            color="black"
            className={buttonClassname}
            disabled={loading}
            onClick={resetPassSubmit}
          >
            Ok
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </Form>
    </div></div>
  );
};
const mapStateToProps = (state) => {
  return {
    darkmode: state.dark_mode.darkmode,
  };
};

export default connect(mapStateToProps)(VerifyEmail);
