import errorReducer from "../../reducers/errors";
import { GET_ERRORS } from "../../actions/types";

const initialState = {};

test("should return initial state", () => {
  expect(errorReducer(undefined, {})).toEqual(initialState);
});

test("should set errors", () => {
  const errors = {
    email: "error",
    password: "error"
  };
  const action = {
    type: GET_ERRORS,
    payload: errors
  };
  expect(errorReducer(undefined, action)).toEqual(errors);
});
