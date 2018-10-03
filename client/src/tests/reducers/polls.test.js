import pollsReducer from "../../reducers/polls";
import { SET_POLLS, ADD_POLL, EDIT_POLL } from "../../actions/types";
import polls from "../fixtures/polls";

const initialState = [];

test("should return initial state", () => {
  expect(pollsReducer(undefined, {})).toEqual(initialState);
});

test("should set polls", () => {
  const action = {
    type: SET_POLLS,
    payload: polls
  };

  expect(pollsReducer(undefined, action)).toEqual(polls);
});

test("should add poll", () => {
  const action = {
    type: ADD_POLL,
    payload: {
      answers: [
        {
          voted: ["1", "2", "3"],
          _id: "5bae34c9b2bf9337c3b8b733",
          answer: "ahdkfhskdfh",
          order: 0,
          __v: 1
        },
        {
          voted: ["4", "5"],
          _id: "5bae34d2b2bf9337c3b8b735",
          answer: "sdfhjdfh 2",
          order: 1,
          __v: 1
        },
        {
          voted: [],
          _id: "5bae34dbb2bf9337c3b8b736",
          answer: "ansdf 3",
          order: 2,
          __v: 0
        }
      ],
      _id: "5bae34c2b2bf9337c3b8b732",
      question: "test",
      __v: 3
    }
  };

  expect(pollsReducer(polls, action)).toEqual([...polls, action.payload]);
});

test("should edit poll", () => {
  const action = {
    type: EDIT_POLL,
    id: "5bb32a9c8bdb682e946d3cb9",
    updates: {
      question: "new text"
    }
  };

  const state = pollsReducer(polls, action);

  expect(state[2].question).toBe(action.updates.question);
});
