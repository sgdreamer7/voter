import { SET_POLLS } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case SET_POLLS:
      return action.payload;
    default:
      return state;
  }
};
