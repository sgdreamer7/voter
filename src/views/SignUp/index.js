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

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password2: ""
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
              Register with Voter App
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
                  label="Email address"
                  className={classes.textField}
                  type="email"
                  margin="normal"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChangeInput}
                />
                <TextField
                  id="password-input"
                  label="Password"
                  className={classes.textField}
                  type="password"
                  margin="normal"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChangeInput}
                />
                <TextField
                  id="password2-input"
                  label="Repeat password"
                  className={classes.textField}
                  type="password2"
                  margin="normal"
                  name="password2"
                  value={this.state.password2}
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
                  Sign up
                </Button>
              </div>
            </form>

            <Link to="/signIn">already have an account? sign-in</Link>
          </CardBody>
        </Card>
      </div>
    );
  }
}
SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(SignUp);
