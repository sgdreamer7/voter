import authReducer from "../../reducers/auth";
import { SET_CURRENT_USER } from "../../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

test("should return initial state", () => {
  expect(authReducer(undefined, {})).toEqual(initialState);
});

test("should set current user", () => {
  const action = {
    type: SET_CURRENT_USER,
    payload: {
      id: "1",
      email: "test@gmail.com"
    }
  };

  expect(authReducer(undefined, action)).toEqual({
    ...initialState,
    isAuthenticated: true,
    user: action.payload
  });
});
