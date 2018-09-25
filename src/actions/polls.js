import axios from "axios";

import { SET_POLLS } from "./types";

export const getPolls = () => dispatch => {
  axios
    .get("/polls.json")
    .then(res => {
      dispatch({
        type: SET_POLLS,
        payload: res.data.polls
      });
    })
    .catch(err => console.log(err));
};
