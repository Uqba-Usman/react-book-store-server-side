const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("@hapi/joi");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "user",
  },
});

userSchema.methods.generateHashPassword = async function () {
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};

var User = mongoose.model("User", userSchema);

function validateUser(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
  });
  return schema.validate(data, { abortEarly: false });
}

function validateUserLogin(data) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
  });
  return schema.validate(data, { abortEarly: false });
}

module.exports.User = User;
module.exports.validateUser = validateUser;
module.exports.validateUserLogin = validateUserLogin;
