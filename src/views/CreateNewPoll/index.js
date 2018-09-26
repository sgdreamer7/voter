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

import EditPollModal from "./EditModal";

class CreateNewPoll extends Component {
  state = {
    question: "",
    openDeleteModal: false,
    openEditModal: false,
    currentEditAnswerIndex: null,
    answers: ["This is the answer #1 for the Question"]
  };

  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onChangeAnserInput = answer => {
    this.setState(
      prevState => {
        let answers = [...prevState.answers];
        answers[prevState.currentEditAnswerIndex] = answer;
        return {
          answers
        };
      },
      () => {
        this.handleModalClose("openEditModal");
      }
    );
  };

  handleModalOpen = (modal, ind) => {
    this.setState({ [modal]: true, currentEditAnswerIndex: ind });
  };

  handleModalClose = open => {
    this.setState({ [open]: false });
  };

  deletePoll = () => {
    this.setState(
      prevState => {
        let answers = prevState.answers.slice();
        answers.splice(prevState.currentEditAnswerIndex, 1);
        return {
          answers
        };
      },
      () => {
        this.handleModalClose("openDeleteModal");
      }
    );
  };

  addAnswer = () => {
    this.setState(prevState => {
      let newAnser = "";
      return {
        answers: [...prevState.answers, newAnser]
      };
    });
  };

  movePollUp = ind => {
    this.setState(prevState => {
      let answers = prevState.answers.slice();
      let answerToMove = answers.splice(ind, 1);
      let indexMove = this.getIndex(ind - 1);
      answers.splice(indexMove, 0, answerToMove[0]);
      return {
        answers
      };
    });
  };

  movePollDown = ind => {
    this.setState(prevState => {
      let answers = prevState.answers.slice();
      let answerToMove = answers.splice(ind, 1);
      let indexMove = this.getIndex(ind + 1);
      answers.splice(indexMove, 0, answerToMove[0]);
      return {
        answers
      };
    });
  };

  getIndex = n => {
    return (n + this.state.answers.length) % this.state.answers.length;
  };

  render() {
    const { classes } = this.props;
    const styleModal = {
      top: "50%",
      left: "50%",
      position: "absolute",
      transform: "translate(-50%, -50%)",
      background: "#fff",
      border: "1px solid #ccc",
      padding: "20px"
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
                    <div
                      className="answers__text"
                      onClick={() => this.handleModalOpen("openEditModal", ind)}
                    >
                      {answer !== "" ? (
                        answer
                      ) : (
                        <span style={{ color: "gray" }}>
                          Please click to edit this field
                        </span>
                      )}
                    </div>
                    <div className="answers__controls">
                      <Button
                        justIcon
                        color="info"
                        style={{
                          padding: "12px 30px"
                        }}
                        onClick={() => this.movePollUp(ind)}
                      >
                        <ArrowUpward />
                      </Button>
                      <Button
                        justIcon
                        color="info"
                        style={{
                          padding: "12px 30px"
                        }}
                        onClick={() => this.movePollDown(ind)}
                      >
                        <ArrowDownward />
                      </Button>
                      <Button
                        justIcon
                        color="warning"
                        style={{
                          padding: "12px 30px"
                        }}
                        onClick={() =>
                          this.handleModalOpen("openDeleteModal", ind)
                        }
                      >
                        <Cancel />
                      </Button>
                    </div>
                  </ListItem>
                ))}
              </List>
            </div>
            <Button color="primary" onClick={this.addAnswer}>
              Add answer
            </Button>
          </CardBody>
        </Card>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.openDeleteModal}
          onClose={() => this.handleModalClose("openDeleteModal")}
        >
          <div style={styleModal} className={classes.paper}>
            <Typography
              variant="title"
              id="modal-title"
              style={{
                margin: "20px 0"
              }}
            >
              Are you sure you want to delete this poll?
            </Typography>
            <div
              className="buttons"
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <Button
                color="info"
                onClick={() => this.handleModalClose("openDeleteModal")}
              >
                Cancel
              </Button>
              <Button color="danger" onClick={this.deletePoll}>
                DELETE
              </Button>
            </div>
          </div>
        </Modal>
        <EditPollModal
          answer={this.state.answers[this.state.currentEditAnswerIndex]}
          key={this.state.openEditModal}
          open={this.state.openEditModal}
          handleClose={() => this.handleModalClose("openEditModal")}
          handleEdit={this.onChangeAnserInput}
        />
      </div>
    );
  }
}

CreateNewPoll.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect()(withStyles(dashboardStyle)(CreateNewPoll));
