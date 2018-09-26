import React, { Component } from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "components/CustomButtons/Button.jsx";
import Modal from "@material-ui/core/Modal";

import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class EditPoll extends Component {
  state = {
    answer: this.props.answer
  };

  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  editPoll = () => {
    this.props.handleEdit(this.state.answer);
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
      padding: "20px",
      width: "500px"
    };

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.open}
        onClose={this.props.handleClose}
      >
        <div style={styleModal} className={classes.paper}>
          <Typography
            variant="title"
            id="modal-title"
            style={{
              margin: "20px 0"
            }}
          >
            Edit poll
          </Typography>

          <TextField
            id="answer-input"
            className={classes.textField}
            type="text"
            margin="normal"
            name="answer"
            value={this.state.answer}
            onChange={this.onChangeInput}
            style={{
              width: "100%"
            }}
          />

          <div
            className="buttons"
            style={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <Button color="info" onClick={this.props.handleClose}>
              Cancel
            </Button>
            <Button color="success" onClick={this.editPoll}>
              EDIT
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

EditPoll.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  answer: PropTypes.string,
  open: PropTypes.bool
};

export default withStyles(dashboardStyle)(EditPoll);
