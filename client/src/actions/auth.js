import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "./types";
import { push } from "react-router-redux";
import { setErrors } from "./errors";

const loginAction = (token, dispatch) => {
  localStorage.setItem("jwtToken", token);
  setAuthToken(token);
  const decoded = jwt_decode(token);
  dispatch(setCurrentUser(decoded));
};

//Register User
export const registerUser = userData => dispatch => {
  return axios
    .post("users/signup", userData)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      dispatch(setErrors(err.response.data));
    });
};
//Login - Get User Token

export const loginUser = userData => dispatch => {
  return axios
    .post("users/signin", userData)
    .then(res => {
      const { token } = res.data;
      loginAction(token, dispatch);
    })
    .catch(err => {
      dispatch(setErrors(err.response.data));
    });
};

export const verifyEmail = userData => dispatch => {
  return axios
    .post("users/verifyEmail", userData)
    .then(res => {
      const { token } = res.data;
      loginAction(token, dispatch);
      dispatch(push("/dashboard"));
    })
    .catch(err => {
      dispatch(setErrors(err.response.data));
    });
};

export const refreshToken = data => dispatch => {
  return axios.post("users/refreshToken", data).then(res => {
    const { refreshtoken } = res.data;
    loginAction(refreshtoken, dispatch);
  });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//Log user out
export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
