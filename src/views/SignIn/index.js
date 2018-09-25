import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="page-container">
        <Card
          style={{
            width: "70%"
          }}
        >
          <CardHeader color="primary">
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
          </CardHeader>
          <CardBody
            style={{
              marginTop: "20px"
            }}
          >
            <form
              noValidate
              className={(classes.form, "form")}
              onSubmit={this.onSubmit}
            >
              <div className="form__content">
                <TextField
                  id="email-input"
                  label="Email"
                  className={classes.textField}
                  value={this.state.email}
                  onChange={this.onChangeInput}
                  type="email"
                  name="email"
                  margin="normal"
                />
                <TextField
                  id="password-input"
                  label="Password"
                  className={classes.textField}
                  type="password"
                  name="password"
                  margin="normal"
                  value={this.state.password}
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
                  Sign in
                </Button>
              </div>
            </form>
            <Link to="/signUp">first time user? sign-up</Link>
          </CardBody>
        </Card>
      </div>
    );
  }
}
SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(SignIn);
