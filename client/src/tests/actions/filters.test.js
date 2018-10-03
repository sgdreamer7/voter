import { setFilter } from "../../actions/filters";
import { SET_VOTE_FILTER } from "../../actions/types";

test("should call action to set filter", () => {
  const filter = { vote: true };
  expect(setFilter(filter)).toEqual({
    type: SET_VOTE_FILTER,
    payload: filter
  });
});
