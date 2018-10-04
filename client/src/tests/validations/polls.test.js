import validate from "../../../../validations/polls";

const model = [
  {
    question: "question test"
  },
  {
    question: ""
  }
];

test("question valid", () => {
  const result = validate(model[0]);
  expect(result.isValid).toBeTruthy();
  expect(result.errors).toEqual({});
});

test("question empty", () => {
  const result = validate(model[1]);
  expect(result.isValid).toBeFalsy();
  expect(result.errors).toEqual({
    question: "Question field is required"
  });
});
