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
