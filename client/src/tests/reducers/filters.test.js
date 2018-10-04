import filtersReducer from "../../reducers/filters";
import { SET_VOTE_FILTER } from "../../actions/types";

const initialState = {
  vote: false
};

test("should return initial state", () => {
  expect(filtersReducer(undefined, {})).toEqual(initialState);
});

test("should set vote filter", () => {
  const action = {
    type: SET_VOTE_FILTER,
    payload: true
  };
  expect(filtersReducer(undefined, action)).toEqual({
    vote: true
  });
});
