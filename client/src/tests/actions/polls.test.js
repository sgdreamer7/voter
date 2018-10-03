import {
  SET_POLLS,
  ADD_POLL,
  EDIT_POLL,
  GET_ERRORS
} from "../../actions/types";
import {
  getPolls,
  addPollQuestion,
  editPollQuestion,
  getPollById
} from "../../actions/polls";
import polls from "../fixtures/polls";

import mockAxios from "axios";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let store;

beforeEach(() => {
  store = mockStore({});
});

test("should call set polls action request and get polls data from backend", async () => {
  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: polls
    })
  );

  await store.dispatch(getPolls());

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: SET_POLLS,
    payload: polls
  });
});

test("should add question", async () => {
  mockAxios.post.mockImplementationOnce((url, question) =>
    Promise.resolve({
      data: {
        question
      }
    })
  );

  const question = "test question";

  await store.dispatch(addPollQuestion(question));

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: ADD_POLL,
    payload: expect.objectContaining({ question })
  });
});

test("should edit question", async () => {
  mockAxios.patch.mockImplementationOnce((url, { question }) => {
    return Promise.resolve({
      data: {
        question
      }
    });
  });

  const question = "test question";
  const id = "5bae34c2b2bf9337c3b8b732";

  await store.dispatch(editPollQuestion({ question, id }));
  const actions = store.getActions();
  expect(actions).toContainEqual({
    type: EDIT_POLL,
    id,
    updates: { question }
  });
});

test("editPollQuestion should dispatch error action when request fail", async () => {
  mockAxios.patch.mockImplementationOnce(() => {
    return Promise.reject({
      response: {
        data: {}
      }
    });
  });

  const question = "test question";
  const id = "5bae34c2b2bf9337c3b8b732";

  await store.dispatch(editPollQuestion({ question, id }));
  const actions = store.getActions();
  expect(actions).toContainEqual({
    type: GET_ERRORS,
    payload: {}
  });
});

test("should return poll by id", async () => {
  mockAxios.get.mockImplementationOnce(url => {
    return Promise.resolve({
      data: polls[0]
    });
  });
  const id = "5bae34c2b2bf9337c3b8b732";
  const poll = await store.dispatch(getPollById(id));

  expect(mockAxios.get).toHaveBeenLastCalledWith(`polls/${id}`);
  expect(poll).toEqual(polls[0]);
});
