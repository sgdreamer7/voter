import validate from "../../../../validations/register";

const model = [
  {
    email: "mail@gmail.com",
    password: "123333",
    password2: "123333"
  },
  {
    email: "mail@gmail.com",
    password: "",
    password2: ""
  },
  {
    email: "",
    password: "123333",
    password2: "123333"
  },
  {
    email: "sdfsdf",
    password: "123333",
    password2: "123333"
  },
  {
    email: "mail@gmail.com",
    password: "123",
    password2: ""
  },
  {
    email: "mail@gmail.com",
    password: "123",
    password2: "1235556"
  }
];

test("all fields valid", () => {
  const result = validate(model[0]);
  expect(result.isValid).toBeTruthy();
  expect(result.errors).toEqual({});
});

test("password empty", () => {
  const result = validate(model[1]);
  expect(result.isValid).toBeFalsy();
  expect(result.errors).toEqual({
    password: "Password field is required",
    password2: "Confirm password field is required"
  });
});

test("email empty", () => {
  const result = validate(model[2]);
  expect(result.isValid).toBeFalsy();
  expect(result.errors).toEqual({
    email: "Email field is required"
  });
});

test("email invalid", () => {
  const result = validate(model[3]);
  expect(result.isValid).toBeFalsy();
  expect(result.errors).toEqual({
    email: "Email is invalid"
  });
});

test("password short", () => {
  const result = validate(model[4]);
  expect(result.isValid).toBeFalsy();
  expect(result.errors).toEqual({
    password: "Password must be at least 6 characters",
    password2: "Confirm password field is required"
  });
});

test("password short and do not much", () => {
  const result = validate(model[5]);
  expect(result.isValid).toBeFalsy();
  expect(result.errors).toEqual({
    password: "Password must be at least 6 characters",
    password2: "Password must much"
  });
});
