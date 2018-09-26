const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePollsInput(data) {
  let errors = {};

  data.answer = !isEmpty(data.answer) ? data.answer : "";
  data.order = !isEmpty(data.order) ? data.order : "";

  if (Validator.isEmpty(data.answer)) {
    errors.answer = "Answer field is required";
  }

  if (Validator.isEmpty(data.order)) {
    errors.order = "Order field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
