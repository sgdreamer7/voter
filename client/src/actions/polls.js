import axios from "axios";

import { SET_POLLS } from "./types";

export const getPolls = () => dispatch => {
  axios
    .get("polls")
    .then(res => {
      dispatch({
        type: SET_POLLS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
