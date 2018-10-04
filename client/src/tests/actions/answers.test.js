import {
  addAnswer,
  editAnswer,
  deleteAnswer,
  vote
} from "../../actions/answers";

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

test("should add answer", async () => {
  const answerData = {
    answer: "some answer",
    order: 1
  };
  mockAxios.post.mockImplementationOnce(url => {
    return Promise.resolve({
      data: { ...answerData, _id: "14dfgdfgdfg" }
    });
  });

  const id = "5bae34c2b2bf9337c3b8b732";
  const answer = await store.dispatch(addAnswer(id, answerData));

  expect(answer).toEqual({
    ...answerData,
    _id: expect.any(String)
  });
});

test("should edit answer", async () => {
  const updates = {
    order: 2
  };
  mockAxios.patch.mockImplementationOnce(url => {
    return Promise.resolve({
      data: {
        ...polls[0].answers[0],
        ...updates
      }
    });
  });

  const answer = await store.dispatch(editAnswer("id", updates));
  expect(answer).toEqual({
    ...polls[0].answers[0],
    ...updates
  });
});

test("should delete answer", async () => {
  const poll_id = "5bae34c2b2bf9337c3b8b732";
  const answ_id = "5bae34c9b2bf9337c3b8b733";
  await store.dispatch(deleteAnswer(poll_id, answ_id));

  expect(mockAxios.delete).toHaveBeenLastCalledWith(
    `answers/${poll_id}/${answ_id}`
  );
});

test("should vote for answer", async () => {
  const id = "5bae34c2b2bf9337c3b8b732";
  await store.dispatch(vote(id));

  expect(mockAxios.post).toHaveBeenLastCalledWith(`/answers/${id}/vote`);
});
