module.exports = function (error) {
  const errorToReturn = {};
  errorToReturn._original = error._original;
  errorToReturn.details = {};
  error.details.forEach((detail) => {
    errorToReturn.details[detail.path] = detail.message;
  });
  console.log(errorToReturn);
  return errorToReturn;
};
