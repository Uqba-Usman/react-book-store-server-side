const express = require("express");
const router = express.Router();
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");

const db = require("../../connection/db");
const newConn = require("../../connection/db");
const { result } = require("lodash");

router.post("/register", async (req, res, next) => {
  console.log(req.body);

  try {
    const database = newConn();
    database.query(
      "SELECT * FROM users WHERE email = ?",
      req.body.email,
      (err, res_Email) => {
        if (res_Email.length !== 0) {
          return res.status(400).send("Email already Registered");
        }

        let sql = "INSERT INTO users SET ?";
        try {
          let post = {
            fName: req.body.fName,
            lName: req.body.lName,
            email: req.body.email,
            password: req.body.password,
          };
          const database = newConn();
          database.query(sql, post, (err, result) => {
            if (err) return err;
            console.log(result);
            let token = jwt.sign(
              {
                email: req.body.email,
                name: `${req.body.fName} ${req.body.lName}`,
                role: "user",
              },
              config.get("jwtPrivateKey")
            );
            const dataToReturn = {
              name: `${req.body.fName} ${req.body.lName}`,
              email: req.body.email,
              token: token,
            };
            return res.status(200).send(dataToReturn);
          });
        } catch (error) {
          console.log("DB ERROR", error);
        }
      }
    );
  } catch (error) {
    console.log("DB ERROR", error);
    res.status(400).send("DB ERROR");
  }
});

router.post("/login", (req, res) => {
  let sql = "SELECT * FROM users where email = ?";
  const database = newConn();
  database.query(sql, req.body.email, (err, result) => {
    if (err) return console.log("DATA GETTING ERROR", err);
    console.log(result);
    if (result.length != 0) {
      console.log(result[0].password);
      let same = result[0].password === req.body.password;
      if (same) {
        console.log("Password Match");
        let token = jwt.sign(
          {
            email: result[0].email,
            name: `${result[0].fName} ${result[0].lName}`,
            role: "user",
          },
          config.get("jwtPrivateKey")
        );
        return res.status(200).send(token);
      } else {
        console.log("Password Not Match");
        return res.status(400).send("Password Not Match");
      }
    }

    if (result.length === 0) {
      console.log("EMAIL NOT REGISTERED");
      return res.status(400).send("EMAIL NOT REGISTERED");
    }
  });
});

router.get("/", (req, res) => {
  const sql = "SELECT * FROM users";
  const database = newConn();
  database.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log("RESULT", result);
    res.send(result);
  });
});

router.post("/favourites", (req, res) => {
  const sql = `SELECT * FROM book WHERE isbn IN (SELECT book_isbn FROM favourites WHERE user_email = '${req.body.email}')`;

  const database = newConn();
  try {
    database.query(sql, (err, result) => {
      if (err) console.log(err);
      console.log("FR", result);
      res.send(result);
    });
  } catch (error) {
    console.log("DB ERROR", error);
  }
});

module.exports = router;

// router.post("/login", async (req, res, next) => {
//   let user = await User.findOne({ email: req.body.email });
//   let { error } = validateUserLogin(req.body);
//   if (error) return res.status(400).send(error.details[0].message);
//   if (!user) return res.status(400).send("User not registered");
//   let isValid = await bcrypt.compare(req.body.password, user.password);
//   if (!isValid) return res.status(401).send("Invalid Password");
//   let token = jwt.sign(
//     {
//       _id: user._id,
//       email: user.email,
//       role: user.role,
//       name: user.name,
//     },
//     config.get("jwtPrivateKey")
//   );
//   res.send(token);
// });

// router.post("/register", async (req, res, next) => {
//   let user = await User.findOne({ email: req.body.email });
//   if (user) return res.status(400).send("User with given email already Exist");
//   let { error } = validateUser(req.body);
//   if (error) {
//     let errorData = formatJoiError(error);
//     return res.status(400).send({ error: errorData });
//   }
//   user = new User();
//   user.name = req.body.name;
//   user.email = req.body.email;
//   user.password = req.body.password;
//   await user.generateHashPassword();
//   await user.save();
//   let token = jwt.sign(
//     { _id: user.id, name: user.name, role: user.role },
//     config.get("jwtPrivateKey")
//   );
//   const dataToReturn = {
//     name: user.name,
//     email: user.email,
//     token: token,
//   };
//   return res.send(dataToReturn);
// });
