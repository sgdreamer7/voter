import React from "react";
import { SignUp } from "../../views/SignUp";
import { createShallow } from "@material-ui/core/test-utils";

let wrapper, registerUser, setErrors, errors, classes;
describe("sign up", () => {
  beforeEach(() => {
    registerUser = jest.fn();
    setErrors = jest.fn();
    errors = {};
    classes = {};
    wrapper = createShallow()(
      <SignUp
        registerUser={registerUser}
        setErrors={setErrors}
        errors={errors}
        classes={classes}
      />
    );
  });

  it("should call registerUser on submit", () => {
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

  it("should set email on input change", () => {
    const value = "test@gmail.com";
    wrapper.instance().onChangeInput({
      target: { value, name: "email" }
    });
    expect(wrapper.state("email")).toBe(value);
  });

  it("should set password on input change", () => {
    const value = "123456";
    wrapper.instance().onChangeInput({
      target: { value, name: "password" }
    });
    expect(wrapper.state("password")).toBe(value);
  });

  it("should set password2 on input change", () => {
    const value = "123456";
    wrapper.instance().onChangeInput({
      target: { value, name: "password2" }
    });
    expect(wrapper.state("password2")).toBe(value);
  });

  it("on mount errors should be empty object", () => {
    wrapper.instance().componentDidMount();
    expect(setErrors).toHaveBeenLastCalledWith({});
  });
});
