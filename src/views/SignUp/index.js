import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class SignUp extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="page-container">
        <Paper
          className={classes.paper}
          style={{
            padding: "30px",
            width: "70%"
          }}
        >
          <form noValidate className={(classes.form, "form")}>
            <div className="form__header">
              <Typography
                variant="headline"
                style={{
                  color: "#fff"
                }}
              >
                Sign into Voter App
              </Typography>
              <p className="form__subtitle">
                Please, enter your email and password
              </p>
            </div>
            <div className="form__content">
              <TextField
                id="email-input"
                label="Email"
                className={classes.textField}
                type="email"
                margin="normal"
              />
              <TextField
                id="password-input"
                label="Password"
                className={classes.textField}
                type="password"
                margin="normal"
              />
              <Button
                type="submit"
                variant="raised"
                style={{
                  backgroundColor: "#9c27b0",
                  color: "white",
                  alignSelf: "flex-start",
                  marginTop: "10px"
                }}
                className={classes.submit}
              >
                Sign in
              </Button>
            </div>
          </form>
          <Link to="/signUp">first time user? sign-up</Link>
        </Paper>
      </div>
    );
  }
}
SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(SignUp);
