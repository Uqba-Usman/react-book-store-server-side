const express = require("express");
const router = express.Router();
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");
const { User, validateUser, validateUserLogin } = require("../../models/user");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User with given email already Exist");
  let { error } = validateUser(req.body);
  if (error) {
    let errorData = formatJoiError(error);
    return res.status(400).send({ error: errorData });
  }
  user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  await user.generateHashPassword();
  await user.save();
  let token = jwt.sign(
    { _id: user.id, name: user.name, role: user.role },
    config.get("jwtPrivateKey")
  );
  const dataToReturn = {
    name: user.name,
    email: user.email,
    token: token,
  };
  return res.send(dataToReturn);
});

router.post("/login", async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  let { error } = validateUserLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (!user) return res.status(400).send("User not registered");
  let isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(401).send("Invalid Password");
  let token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
    config.get("jwtPrivateKey")
  );
  res.send(token);
});

module.exports = router;
