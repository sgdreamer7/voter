import React from "react";
import { SignIn } from "../../views/SignIn";
import { createShallow } from "@material-ui/core/test-utils";

let wrapper, loginUser, errors, classes;

beforeEach(() => {
  loginUser = jest.fn();
  errors = {};
  classes = {};
  wrapper = createShallow()(
    <SignIn loginUser={loginUser} errors={errors} classes={classes} />
  );
});

test("should call loginUser on submit", () => {
  const data = {
    email: "test123@gmail.com",
    password: "123456"
  };
  const event = {
    preventDefault: jest.fn()
  };
  wrapper.setState(data);
  wrapper.find("form").simulate("submit", event);
  expect(loginUser).toHaveBeenLastCalledWith(data);
});

test("should set email on input change", () => {
  const value = "test@gmail.com";
  wrapper
    .find("TextField")
    .at(0)
    .prop("onChange")({
    target: { value, name: "email" }
  });
  expect(wrapper.state("email")).toBe(value);
});

test("should set password on input change", () => {
  const value = "123456";
  wrapper
    .find("TextField")
    .at(1)
    .prop("onChange")({
    target: { value, name: "password" }
  });
  expect(wrapper.state("password")).toBe(value);
});
