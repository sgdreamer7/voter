import validate from "../../../../validations/answer";

const onlyExistFields = true;
const model = [
  {
    answer: "some answer",
    order: 1
  },
  {
    answer: "some answer",
    order: "gfd"
  },
  {
    order: 1
  },
  {
    answer: "test"
  }
];

test("all fields valid", () => {
  const result = validate(model[0]);
  expect(result.isValid).toBeTruthy();
  expect(result.errors).toEqual({});
});

test("order not Number", () => {
  const result = validate(model[1]);
  expect(result.isValid).toBeFalsy();
  expect(result.errors).toEqual({
    order: "Order field must be a number"
  });
});

test("empty answer", () => {
  const result = validate(model[2]);
  expect(result.isValid).toBeFalsy();
  expect(result.errors).toEqual({
    answer: "Answer field is required"
  });
});

test("only answer", () => {
  const result = validate(model[3]);
  expect(result.isValid).toBeFalsy();
  expect(result.errors).toEqual({
    order: "Order field is required"
  });
});

test("empty", () => {
  const result = validate({});
  expect(result.isValid).toBeFalsy();
  expect(result.errors).toEqual({
    order: "Order field is required",
    answer: "Answer field is required"
  });
});

test("empty with validate onlyExistFields", () => {
  const result = validate({}, onlyExistFields);
  expect(result.isValid).toBeTruthy();
  expect(result.errors).toEqual({});
});
