import { GET_ERRORS } from "./types";

export const setErrors = errors => {
  return {
    type: GET_ERRORS,
    payload: errors
  };
};
