import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import TextField from "@material-ui/core/TextField";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Typography from "@material-ui/core/Typography";
import Button from "components/CustomButtons/Button.jsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Modal from "@material-ui/core/Modal";

import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Cancel from "@material-ui/icons/Cancel";

import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class CreateNewPoll extends Component {
  state = {
    question: "",
    openModal: false,
    answers: [
      {
        text: "This is the answer #1 for the Question",
        order: 1
      }
    ]
  };

  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleOpen = () => {
    this.setState({ openModal: true });
  };

  handleClose = () => {
    this.setState({ openModal: false });
  };

  render() {
    const { classes } = this.props;
    const styleModal = {
      top: "50%",
      left: "50%",
      position: "absolute"
    };

    return (
      <div>
        <Card
          style={{
            width: "70%"
          }}
        >
          <CardHeader color="primary">
            <Typography
              variant="title"
              style={{
                color: "#fff",
                fontWeight: "300"
              }}
            >
              Create new poll
            </Typography>
            <p className="form__subtitle">
              Please, add your question and answers for polling
            </p>
          </CardHeader>
          <CardBody>
            <TextField
              id="question-input"
              label="Question"
              className={classes.textField}
              type="text"
              margin="normal"
              name="question"
              value={this.state.question}
              onChange={this.onChangeInput}
              style={{
                width: "100%"
              }}
            />
            <div className="answers">
              <List>
                {this.state.answers.map((answer, ind) => (
                  <ListItem
                    key={ind}
                    divider={true}
                    style={{
                      justifyContent: "space-between"
                    }}
                  >
                    <div className="answers__text">{answer.text}</div>
                    <div className="answers__controls">
                      <Button
                        justIcon
                        color="info"
                        style={{
                          padding: "12px 30px"
                        }}
                      >
                        <ArrowUpward />
                      </Button>
                      <Button
                        justIcon
                        color="info"
                        style={{
                          padding: "12px 30px"
                        }}
                      >
                        <ArrowDownward />
                      </Button>
                      <Button
                        justIcon
                        color="warning"
                        style={{
                          padding: "12px 30px"
                        }}
                        onClick={this.handleOpen}
                      >
                        <Cancel />
                      </Button>
                    </div>
                  </ListItem>
                ))}
              </List>
            </div>
            <Button color="primary">Add answer</Button>
          </CardBody>
        </Card>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.openModal}
          onClose={this.handleClose}
        >
          <div style={styleModal} className={classes.paper}>
            <Typography variant="title" id="modal-title">
              Are you sure, you wanna delete this poll?
            </Typography>
            <Button color="danger">DELETE</Button>
            <Button color="info">Cancel</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect()(withStyles(dashboardStyle)(CreateNewPoll));
