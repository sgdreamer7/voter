import React, { Component } from "react";
import PropTypes from "prop-types";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Typography from "@material-ui/core/Typography";

import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Poll extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
              This is poll results
            </Typography>
            <p className="form__subtitle">
              Please, choose your answer if you have not yet
            </p>
          </CardHeader>
          <CardBody
            style={{
              marginTop: "20px"
            }}
          />
        </Card>
      </div>
    );
  }
}
Poll.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Poll);
