const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTransferInput(data) {
  let errors = {};

  data.branch1 = !isEmpty(data.branch1) ? data.branch1 : "";
  data.branch2 = !isEmpty(data.branch2) ? data.branch2 : "";
  data.branch3 = !isEmpty(data.branch3) ? data.branch3 : "";

  if (Validator.equals(data.branch1, data.branch2)) {
    errors.branch1 = "Station 1 and station 2 must not same";
    errors.branch2 = "Station 2 and station 1 must not same";
  } else if (Validator.equals(data.branch1, data.branch3)) {
    errors.branch1 = "Station 1 and station 3 must not same";
    errors.branch3 = "Station 3 and station 1 must not same";
  } else if (Validator.equals(data.branch2, data.branch3)) {
    errors.branch2 = "Station 2 and station 3 must not same";
    errors.branch3 = "Station 3 and station 2 must not same";
  } else if (Validator.isEmpty(data.branch1)) {
    errors.branch1 = "branch1 field is required";
  } else if (Validator.isEmpty(data.branch2)) {
    errors.branch2 = "branch2 field is required";
  } else if (Validator.isEmpty(data.branch3)) {
    errors.branch3 = "branch3 field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
