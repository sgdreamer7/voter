import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class EmailVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "test@gmail.com",
      verificationCode: ""
    };
  }

  onSubmit = e => {
    e.preventDefault();
  };

  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

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
          <form
            noValidate
            className={(classes.form, "form")}
            onSubmit={this.onSubmit}
          >
            <div className="form__header">
              <Typography
                variant="headline"
                style={{
                  color: "#fff"
                }}
              >
                Email verification to finish registration with Voter App
              </Typography>
              <p className="form__subtitle">Please, confirm email address</p>
            </div>
            <div className="form__content">
              <TextField
                disabled
                id="email-input"
                label="Email address"
                className={classes.textField}
                value={this.state.email}
                type="email"
                name="email"
                margin="normal"
              />
              <TextField
                id="verification-code-input"
                label="VerificationCode"
                className={classes.textField}
                type="text"
                name="verificationCode"
                margin="normal"
                value={this.state.verificationCode}
                onChange={this.onChangeInput}
              />
              <Button
                type="submit"
                variant="raised"
                style={{
                  backgroundColor: "#9c27b0",
                  color: "white",
                  alignSelf: "flex-start",
                  marginTop: "30px",
                  marginBottom: "10px",
                  textTransform: "uppercase"
                }}
                className={classes.submit}
              >
                Verify email
              </Button>
            </div>
          </form>
          <Link to="/signUp">already have an account? sign-in</Link>
        </Paper>
      </div>
    );
  }
}
EmailVerification.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(EmailVerification);
