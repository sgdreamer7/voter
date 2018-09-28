import axios from "axios";

import { GET_ERRORS } from "./types";

export const addAnswer = (poll_id, answerData) => dispatch => {
  return axios
    .post(`answers/${poll_id}`, answerData)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const editAnswer = (answ_id, data) => dispatch => {
  return axios
    .patch(`answers/${answ_id}`, data)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteAnswer = (poll_id, answ_id) => () => {
  return axios
    .delete(`answers/${poll_id}/${answ_id}`)
    .catch(err => console.log(err));
};
