import axios from "axios";

import { SET_POLLS, ADD_POLL, EDIT_POLL } from "./types";
import { setErrors } from "./errors";

export const getPolls = () => dispatch => {
  return axios
    .get("polls")
    .then(res => {
      dispatch({
        type: SET_POLLS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const addPollQuestion = question => dispatch => {
  return axios
    .post("polls/new", question)
    .then(res => {
      dispatch({
        type: ADD_POLL,
        payload: res.data
      });
      dispatch(setErrors({}));
      return res.data;
    })
    .catch(err => {
      dispatch(setErrors(err.response.data));
    });
};

export const editPollQuestion = ({ question, id }) => dispatch => {
  return axios
    .patch(`polls/${id}`, { question })
    .then(({ data }) => {
      dispatch({
        type: EDIT_POLL,
        id,
        updates: { question: data.question }
      });
    })
    .catch(err => {
      dispatch(setErrors(err.response.data));
    });
};

export const getPollById = id => () => {
  return axios
    .get(`polls/${id}`)
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err));
};
