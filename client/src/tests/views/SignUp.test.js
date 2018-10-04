import React from "react";
import { SignUp } from "../../views/SignUp";
import { createShallow } from "@material-ui/core/test-utils";

let wrapper, registerUser, errors, classes;

beforeEach(() => {
  registerUser = jest.fn();
  errors = {};
  classes = {};
  wrapper = createShallow()(
    <SignUp registerUser={registerUser} errors={errors} classes={classes} />
  );
});

test("should call registerUser on submit", () => {
  const data = {
    email: "test123@gmail.com",
    password: "123456",
    password2: "123456"
  };
  const event = {
    preventDefault: jest.fn()
  };
  wrapper.setState(data);
  wrapper.find("form").simulate("submit", event);
  expect(registerUser).toHaveBeenLastCalledWith(data);
});

test("should set email on input change", () => {
  const value = "test@gmail.com";
  wrapper.instance().onChangeInput({
    target: { value, name: "email" }
  });
  expect(wrapper.state("email")).toBe(value);
});

test("should set password on input change", () => {
  const value = "123456";
  wrapper.instance().onChangeInput({
    target: { value, name: "password" }
  });
  expect(wrapper.state("password")).toBe(value);
});

test("should set password2 on input change", () => {
  const value = "123456";
  wrapper.instance().onChangeInput({
    target: { value, name: "password2" }
  });
  expect(wrapper.state("password2")).toBe(value);
});
