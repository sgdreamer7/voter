import validate from "../../../../validations/login";

const model = [
  {
    email: "mail@gmail.com",
    password: "123333"
  },
  {
    email: "mail@gmail.com",
    password: ""
  },
  {
    email: "",
    password: "123333"
  },
  {
    email: "sdfsdf",
    password: "123333"
  },
  {
    email: "mail@gmail.com",
    password: "123"
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
    password: "Password field is required"
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
    password: "Password must be at least 6 characters"
  });
});
