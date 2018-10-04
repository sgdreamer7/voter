import axios from "axios";
import { setErrors } from "./errors";

export const addAnswer = (poll_id, answerData) => dispatch => {
  return axios
    .post(`answers/${poll_id}`, answerData)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      dispatch(setErrors(err.response.data));
    });
};

export const editAnswer = (answ_id, data) => dispatch => {
  return axios
    .patch(`answers/${answ_id}`, data)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      dispatch(setErrors(err.response.data));
    });
};

export const deleteAnswer = (poll_id, answ_id) => () => {
  return axios
    .delete(`answers/${poll_id}/${answ_id}`)
    .catch(err => console.log(err));
};

export const vote = answ_id => dispatch => {
  return axios
    .post(`/answers/${answ_id}/vote`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      dispatch(setErrors(err.response.data));
    });
};
