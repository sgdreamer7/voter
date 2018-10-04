import React from "react";
import { CreateNewPoll } from "../../views/CreateNewPoll";
import { createShallow } from "@material-ui/core/test-utils";
import polls from "../fixtures/polls";

let wrapper,
  addPollQuestion,
  editPollQuestion,
  editAnswer,
  addAnswer,
  deleteAnswer,
  errors,
  classes;

beforeEach(() => {
  addPollQuestion = jest.fn(() => Promise.resolve({ _id: "sjdfksdf123" }));
  editPollQuestion = jest.fn(() => Promise.resolve());
  addAnswer = jest.fn((id, data) => Promise.resolve(data));
  editAnswer = jest.fn(() => Promise.resolve());
  deleteAnswer = jest.fn(() => Promise.resolve());
  errors = {};
  classes = {};
  wrapper = createShallow()(
    <CreateNewPoll
      addPollQuestion={addPollQuestion}
      editPollQuestion={editPollQuestion}
      addAnswer={addAnswer}
      editAnswer={editAnswer}
      deleteAnswer={deleteAnswer}
      errors={errors}
      classes={classes}
    />
  );
});

test("should set question on input change", () => {
  const value = "test";
  wrapper.instance().onChangeInput({
    target: { value, name: "question" }
  });
  expect(wrapper.state("question")).toBe(value);
});

test("should set 'isQuestionChanged' true if value changed", () => {
  const value = "test";
  wrapper.setState({ question: value });
  wrapper.instance().onChangeInput({
    target: { value: "test edit", name: "question" }
  });
  expect(wrapper.state("isQuestionChanged")).toBeTruthy();
});

test("should not send question to server if value not change", () => {
  const value = "test";
  wrapper.setState({ question: value });
  wrapper.instance().onChangeInput({
    target: { value, name: "question" }
  });
  expect(editPollQuestion).not.toHaveBeenCalled();
});

test("should save question onChange input if not id in state", async () => {
  wrapper.instance().onChangeInput({
    target: { value: "test", name: "question" }
  });
  expect(addPollQuestion).toHaveBeenCalled();
  await expect(addPollQuestion()).resolves.toEqual({ _id: "sjdfksdf123" });
  await expect(wrapper.state("id")).toBe("sjdfksdf123");
});

test("should set changes true if not changes but input empty", () => {
  const value = "";
  wrapper.setState({ question: value });
  wrapper.instance().onChangeInput({
    target: { value: "", name: "question" }
  });
  expect(wrapper.state("isQuestionChanged")).toBeTruthy();
});

test("should save answer and close modal", async () => {
  wrapper.setState({ currentEditAnswerIndex: 0, id: "123" });
  const data = {
    answer: "jhjh",
    order: 1
  };
  await wrapper.instance().saveAnswerInput(data);
  expect(wrapper.state("answers")[0]).toHaveProperty("answer", data.answer);
  expect(wrapper.state("answers")[0]).toHaveProperty("order", data.order);
  expect(wrapper.state("openEditModal")).toBeFalsy();
});
