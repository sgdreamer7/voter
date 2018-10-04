import React from "react";
import { CreateNewPoll } from "../../views/CreateNewPoll";
import { createShallow } from "@material-ui/core/test-utils";
import polls from "../fixtures/polls";
import ListItem from "@material-ui/core/ListItem";
import Button from "../../components/CustomButtons/Button.jsx";
import Modal from "@material-ui/core/Modal";
import CardBody from "../../components/Card/CardBody.jsx";

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
  editAnswer = jest.fn((id, data) => Promise.resolve(data));
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

test("should edit answer and close modal", async () => {
  wrapper.setState({
    currentEditAnswerIndex: 1,
    id: "123",
    answers: [polls[0].answers[0], polls[1].answers[1]]
  });
  const data = {
    answer: "jhjh",
    _id: polls[1].answers[1]._id
  };
  await wrapper.instance().editAnswerInput(data);
  expect(wrapper.state("answers")[1]).toHaveProperty("answer", data.answer);
  expect(wrapper.state("openEditModal")).toBeFalsy();
});

test("should set currentEditIndex on click delete btn", () => {
  wrapper.setState({ answers: polls[0].answers });
  wrapper
    .find(ListItem)
    .at(2)
    .find(Button)
    .at(2)
    .simulate("click");
  expect(wrapper.state("currentEditAnswerIndex")).toBe(2);
});

test("should call delete answer when answer with id", () => {
  wrapper.setState({
    answers: polls[0].answers,
    currentEditAnswerIndex: 2,
    openDeleteModal: true
  });
  wrapper
    .find(Modal)
    .find(Button)
    .at(1)
    .simulate("click");
  expect(deleteAnswer).toHaveBeenCalled();
});

test("should not call delete answer when answer without id and delete answer from state", () => {
  let answer = polls[0].answers[2];
  let id = answer._id;
  delete answer._id;
  wrapper.setState({
    answers: polls[0].answers,
    currentEditAnswerIndex: 2,
    openDeleteModal: true
  });
  wrapper
    .find(Modal)
    .find(Button)
    .at(1)
    .simulate("click");
  expect(deleteAnswer).not.toHaveBeenCalled();
  let state = wrapper.state("answers").map(item => item._id);
  expect(state.indexOf(id)).toBe(-1);
});

test("modal close when click on cancel", () => {
  let answer = polls[0].answers[2];
  let id = answer._id;
  delete answer._id;
  wrapper.setState({
    answers: polls[0].answers,
    currentEditAnswerIndex: 2,
    openDeleteModal: true
  });
  wrapper
    .find(Modal)
    .find(Button)
    .at(0)
    .simulate("click");
  expect(deleteAnswer).not.toHaveBeenCalled();
  let state = wrapper.state("answers").map(item => item._id);
  expect(state.indexOf(id)).not.toBe(-1);
});

test("should add new empty answer to state", () => {
  wrapper.setState({
    answers: polls[0].answers
  });

  wrapper
    .find(CardBody)
    .find(Button)
    .last()
    .simulate("click");
  expect(wrapper.state("answers")).toEqual([
    ...polls[0].answers,
    {
      answer: "",
      order: polls[0].answers.length
    }
  ]);
});
